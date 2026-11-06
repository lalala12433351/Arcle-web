import { useCallback, useEffect, useRef, useState, type RefObject } from "react";
import type { ServiceKey } from "./servicesContent";

export const sectionId = (key: ServiceKey) => `service-${key}`;

export const useMediaQuery = (query: string) => {
    const [matches, setMatches] = useState(() =>
        typeof window === "undefined" ? false : window.matchMedia(query).matches,
    );

    useEffect(() => {
        const list = window.matchMedia(query);
        const update = () => setMatches(list.matches);
        update();
        list.addEventListener("change", update);
        return () => list.removeEventListener("change", update);
    }, [query]);

    return matches;
};

export const useReducedMotion = () => useMediaQuery("(prefers-reduced-motion: reduce)");

/** Flips to true the first time `active` is true and stays there, so intro sequences play once. */
export const usePlayedOnce = (active: boolean) => {
    const [played, setPlayed] = useState(active);
    useEffect(() => {
        if (active) setPlayed(true);
    }, [active]);
    return played || active;
};

export const useInView = (ref: RefObject<HTMLElement | null>, rootMargin = "0px 0px -20% 0px") => {
    const [inView, setInView] = useState(false);

    useEffect(() => {
        const node = ref.current;
        if (!node) return;
        const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { rootMargin });
        observer.observe(node);
        return () => observer.disconnect();
    }, [ref, rootMargin]);

    return inView;
};

/**
 * Keeps `--services-nav` (fixed site header) in sync on the page root,
 * so sticky offsets and scroll targets clear the header.
 */
export const useStickyOffsets = (rootRef: RefObject<HTMLElement | null>) => {
    useEffect(() => {
        const root = rootRef.current;
        const nav = document.querySelector<HTMLElement>("header nav.navbar");
        if (!root) return;

        let frame = 0;
        const measure = () => {
            frame = 0;
            const navHeight = nav ? Math.max(0, nav.getBoundingClientRect().bottom) : 0;
            root.style.setProperty("--services-nav", `${Math.round(navHeight)}px`);
        };
        const schedule = () => {
            if (!frame) frame = requestAnimationFrame(measure);
        };

        measure();
        const observer = new ResizeObserver(schedule);
        if (nav) observer.observe(nav, { box: "border-box" });
        nav?.addEventListener("transitionend", schedule);
        window.addEventListener("scroll", schedule, { passive: true });
        window.addEventListener("resize", schedule);
        return () => {
            cancelAnimationFrame(frame);
            observer.disconnect();
            nav?.removeEventListener("transitionend", schedule);
            window.removeEventListener("scroll", schedule);
            window.removeEventListener("resize", schedule);
        };
    }, [rootRef]);
};

export const useActiveService = (keys: ServiceKey[]) => {
    const [active, setActive] = useState<ServiceKey>(keys[0]);
    const lockRef = useRef<ServiceKey | null>(null);
    const reduced = useReducedMotion();

    useEffect(() => {
        const sections = keys
            .map((key) => document.getElementById(sectionId(key)))
            .filter((node): node is HTMLElement => !!node);

        const observer = new IntersectionObserver(
            (entries) => {
                if (lockRef.current) return;
                entries.forEach((entry) => {
                    if (entry.isIntersecting) setActive(entry.target.getAttribute("data-service") as ServiceKey);
                });
            },
            { rootMargin: "-45% 0px -54% 0px" },
        );

        sections.forEach((section) => observer.observe(section));
        return () => observer.disconnect();
    }, [keys]);

    const scrollToService = useCallback(
        (key: ServiceKey) => {
            const target = document.getElementById(sectionId(key));
            if (!target) return;

            setActive(key);
            lockRef.current = key;
            let timer = 0;
            const release = () => {
                window.clearTimeout(timer);
                window.removeEventListener("scrollend", release);
                lockRef.current = null;
            };
            window.addEventListener("scrollend", release, { once: true });
            timer = window.setTimeout(release, reduced ? 100 : 1200);

            target.scrollIntoView({ behavior: reduced ? "instant" : "smooth", block: "start" });
            target.focus({ preventScroll: true });
        },
        [reduced],
    );

    return { active, scrollToService };
};

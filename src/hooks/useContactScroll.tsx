import { useLayoutEffect, type RefObject } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import "lenis/dist/lenis.css";

const WIDE_QUERY = "(min-width: 992px)";

/**
 * Contact page motion: the hero headline splits apart as the message sheet rises over it
 * and opens from a card to full width; the map unclips the same way further down.
 * Reduced motion keeps the static layout with no smooth scrolling.
 */
const useContactScroll = (rootRef: RefObject<HTMLElement | null>) => {
    useLayoutEffect(() => {
        const root = rootRef.current;
        if (!root) return;

        gsap.registerPlugin(ScrollTrigger);

        const html = document.documentElement;
        html.classList.add("contact-smooth");

        let lenis: Lenis | null = null;
        let tick: ((time: number) => void) | null = null;
        let onAnchor: ((event: MouseEvent) => void) | null = null;

        if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
            lenis = new Lenis({
                lerp: 0.08,
                smoothWheel: true,
                wheelMultiplier: 0.9,
                touchMultiplier: 1.4,
            });
            lenis.on("scroll", ScrollTrigger.update);
            const scroller = lenis;
            tick = (time: number) => scroller.raf(time * 1000);
            gsap.ticker.add(tick);
            gsap.ticker.lagSmoothing(0);

            onAnchor = (event: MouseEvent) => {
                const link = (event.target as HTMLElement).closest<HTMLAnchorElement>('a[href^="#"]');
                const target = link && root.querySelector<HTMLElement>(link.getAttribute("href") ?? "");
                if (!target) return;
                event.preventDefault();
                scroller.scrollTo(target, { offset: -40, duration: 1.4 });
            };
            root.addEventListener("click", onAnchor);
        }

        const mm = gsap.matchMedia(root);

        mm.add(
            {
                wide: WIDE_QUERY,
                motion: "(prefers-reduced-motion: no-preference)",
            },
            (context) => {
                const { wide, motion } = context.conditions as Record<string, boolean>;
                if (!motion) return;

                const q = gsap.utils.selector(root);
                const hero = q(".cx-hero")[0] as HTMLElement | undefined;
                const sheet = q(".cx-sheet")[0] as HTMLElement | undefined;
                const map = q(".cx-map")[0] as HTMLElement | undefined;

                gsap.timeline({ defaults: { ease: "expo.out" } })
                    .from(q(".cx-hero__title .cx-mask__in"), { yPercent: 110, duration: 1.3, stagger: 0.1 })
                    .from(q("[data-cx-hero-rule]"), { scaleX: 0, duration: 1.4 }, 0.2)
                    .fromTo(
                        q("[data-cx-intro]"),
                        { y: 24, autoAlpha: 0, filter: "blur(8px)" },
                        { y: 0, autoAlpha: 1, filter: "blur(0px)", duration: 1, stagger: 0.08, clearProps: "filter" },
                        0.45,
                    );

                if (hero) {
                    const spread = () => window.innerWidth * (wide ? 0.07 : 0.04);
                    gsap.timeline({
                        defaults: { ease: "none" },
                        scrollTrigger: {
                            trigger: hero,
                            start: "top top",
                            end: "bottom top",
                            scrub: 0.6,
                            invalidateOnRefresh: true,
                        },
                    })
                        .to(q(".cx-hero__line--a"), { x: () => -spread() }, 0)
                        .to(q(".cx-hero__line--b"), { x: () => spread() }, 0)
                        .to(q(".cx-hero__title"), { y: () => window.innerHeight * 0.18, autoAlpha: 0.25 }, 0)
                        .to(q(".cx-hero__foot"), { y: () => window.innerHeight * 0.12, autoAlpha: 0, ease: "power1.in" }, 0);
                }

                if (sheet) {
                    gsap.fromTo(
                        q(".cx-sheet__bg"),
                        { clipPath: wide ? "inset(0% 3.5% 0% 3.5% round 44px)" : "inset(0% 3% 0% 3% round 28px)" },
                        {
                            clipPath: "inset(0% 0% 0% 0% round 0px)",
                            ease: "none",
                            scrollTrigger: { trigger: sheet, start: "top bottom", end: "top 12%", scrub: 0.6 },
                        },
                    );

                    gsap.from(q("[data-cx-title]"), {
                        yPercent: 110,
                        duration: 1.2,
                        ease: "expo.out",
                        scrollTrigger: { trigger: sheet, start: "top 70%", once: true },
                    });
                }

                q("[data-cx-group]").forEach((group) => {
                    const tl = gsap.timeline({
                        defaults: { ease: "expo.out" },
                        scrollTrigger: { trigger: group, start: "top 82%", once: true },
                    });
                    tl.fromTo(
                        group.querySelectorAll("[data-cx-reveal]"),
                        { y: 28, autoAlpha: 0, filter: "blur(8px)" },
                        { y: 0, autoAlpha: 1, filter: "blur(0px)", duration: 1, stagger: 0.07, clearProps: "filter" },
                    );
                    const rules = group.querySelectorAll("[data-cx-rule]");
                    if (rules.length) tl.from(rules, { scaleX: 0, duration: 1.3, stagger: 0.07 }, 0.05);
                });

                if (map) {
                    const scrub = { trigger: map, start: "top bottom", end: "top 20%", scrub: 0.6 };
                    gsap.fromTo(
                        q(".cx-map__frame"),
                        { clipPath: wide ? "inset(8% 8% 0% 8% round 36px)" : "inset(4% 4% 0% 4% round 24px)" },
                        { clipPath: "inset(0% 0% 0% 0% round 0px)", ease: "none", scrollTrigger: scrub },
                    );
                    gsap.fromTo(q(".cx-map__frame iframe"), { scale: 1.15 }, { scale: 1, ease: "none", scrollTrigger: scrub });
                    gsap.from(q(".cx-map__card"), {
                        y: 32,
                        autoAlpha: 0,
                        duration: 1,
                        ease: "expo.out",
                        scrollTrigger: { trigger: map, start: "top 45%", once: true },
                    });
                }
            },
        );

        const frame = requestAnimationFrame(() => ScrollTrigger.refresh());
        let alive = true;
        document.fonts?.ready.then(() => {
            if (alive) ScrollTrigger.refresh();
        });

        return () => {
            alive = false;
            cancelAnimationFrame(frame);
            mm.revert();
            html.classList.remove("contact-smooth");
            if (onAnchor) root.removeEventListener("click", onAnchor);
            if (tick) gsap.ticker.remove(tick);
            if (lenis) {
                gsap.ticker.lagSmoothing(500, 33);
                lenis.destroy();
            }
        };
    }, [rootRef]);
};

export default useContactScroll;

import { useLayoutEffect, type RefObject } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/** Once-only entrance motion for the hero and each `[data-reveal]` block. Skipped entirely for reduced motion. */
const useServicesReveal = (rootRef: RefObject<HTMLElement | null>) => {
    useLayoutEffect(() => {
        const root = rootRef.current;
        if (!root || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

        gsap.registerPlugin(ScrollTrigger);

        const ctx = gsap.context(() => {
            gsap.from("[data-hero-line]", {
                yPercent: 105,
                duration: 0.9,
                ease: "expo.out",
                stagger: 0.08,
                delay: 0.1,
            });
            gsap.from("[data-hero-reveal]", {
                y: 14,
                autoAlpha: 0,
                duration: 0.45,
                ease: "power2.out",
                stagger: 0.08,
                delay: 0.35,
            });

            gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((node) => {
                gsap.from(node, {
                    y: 18,
                    autoAlpha: 0,
                    duration: 0.45,
                    ease: "power2.out",
                    scrollTrigger: { trigger: node, start: "top 92%", once: true },
                });
            });
        }, root);

        let alive = true;
        document.fonts?.ready.then(() => {
            if (alive) ScrollTrigger.refresh();
        });

        return () => {
            alive = false;
            ctx.revert();
        };
    }, [rootRef]);
};

export default useServicesReveal;

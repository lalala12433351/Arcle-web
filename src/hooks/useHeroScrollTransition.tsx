import { useEffect, type RefObject } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/* Must match the -50vh overlap margin of .arcle-hero-overlap in index.css. */
const PIN_DISTANCE = "+=50%";
const CARD_DEPTH = [45, 30, 60, 20];
const CARD_TILT = [-0.6, 0.5, 0.4, -0.5];
const CARD_CONVERGE = 28;

/**
 * Scroll transition for the SculptureHero: a short pin with depth parallax on desktop,
 * while the next section rises over the hero. Mobile gets a gentle lift and fade only;
 * reduced motion keeps the static layout.
 */
const useHeroScrollTransition = (
    heroRef: RefObject<HTMLDivElement | null>,
    nextRef: RefObject<HTMLDivElement | null>
) => {
    useEffect(() => {
        const hero = heroRef.current;
        const next = nextRef.current;
        if (!hero || !next) return;

        gsap.registerPlugin(ScrollTrigger);

        const stage = hero.querySelector<HTMLElement>(".sh-stage");
        const sculpture = hero.querySelector<HTMLElement>(".sh-fallback");
        const hint = hero.querySelector<HTMLElement>(".sh-hint");
        const showcase = hero.querySelector<HTMLElement>(".sh-showcase");
        const services = hero.querySelector<HTMLElement>(".sh-services");
        const content = hero.querySelector<HTMLElement>(".sh-content");
        const cards = Array.from(hero.querySelectorAll<HTMLElement>(".sh-metric"));
        if (!stage || !content) return;

        // The stage scales about the sculpture's centre, and the hover hint (positioned
        // outside the stage with its own transform) follows it via the separate `translate` property.
        let origin = "";
        const syncStage = () => {
            const ox = sculpture ? sculpture.offsetLeft + sculpture.offsetWidth / 2 : stage.offsetWidth / 2;
            const oy = sculpture ? sculpture.offsetTop + sculpture.offsetHeight / 2 : stage.offsetHeight / 2;
            const nextOrigin = `${ox}px ${oy}px`;
            if (nextOrigin !== origin) {
                origin = nextOrigin;
                stage.style.transformOrigin = nextOrigin;
            }
            if (!hint) return;
            const scale = Number(gsap.getProperty(stage, "scaleX"));
            const y = Number(gsap.getProperty(stage, "y"));
            const opacity = Number(gsap.getProperty(stage, "opacity"));
            hint.style.translate = `${(hint.offsetLeft - ox) * (scale - 1)}px ${(hint.offsetTop - oy) * (scale - 1) + y}px`;
            hint.style.filter = opacity < 1 ? `opacity(${opacity})` : "";
        };
        const resetStage = () => {
            origin = "";
            stage.style.transformOrigin = "";
            if (hint) {
                hint.style.translate = "";
                hint.style.filter = "";
            }
        };

        const towardCentre = (card: HTMLElement) => {
            const box = showcase ?? hero;
            const dx = box.clientWidth / 2 - (card.offsetLeft + card.offsetWidth / 2);
            const dy = box.clientHeight / 2 - (card.offsetTop + card.offsetHeight / 2);
            const d = Math.hypot(dx, dy) || 1;
            return { x: (dx / d) * CARD_CONVERGE, y: (dy / d) * CARD_CONVERGE };
        };

        const mm = gsap.matchMedia();
        mm.add(
            {
                desktop: "(min-width: 768px) and (prefers-reduced-motion: no-preference)",
                mobile: "(max-width: 767px) and (prefers-reduced-motion: no-preference)",
            },
            (context) => {
                const { desktop } = context.conditions as { desktop: boolean; mobile: boolean };

                if (!desktop) {
                    const layers = [stage, showcase, content].filter(Boolean);
                    gsap.timeline({
                        defaults: { ease: "none" },
                        onUpdate: syncStage,
                        scrollTrigger: {
                            trigger: hero,
                            start: "top top",
                            end: "bottom top",
                            scrub: 0.6,
                            invalidateOnRefresh: true,
                        },
                    })
                        .to(layers, { y: -24, duration: 1 }, 0)
                        .to(layers, { autoAlpha: 0, duration: 0.7, ease: "power1.in" }, 0.3);
                    return resetStage;
                }

                next.classList.add("arcle-hero-overlap");

                const tl = gsap.timeline({
                    defaults: { ease: "none" },
                    onUpdate: syncStage,
                    scrollTrigger: {
                        trigger: hero,
                        start: "top top",
                        end: PIN_DISTANCE,
                        pin: true,
                        scrub: 0.6,
                        invalidateOnRefresh: true,
                        refreshPriority: 1,
                        onRefresh: syncStage,
                    },
                });

                tl.to(stage, { y: -25, duration: 0.5 }, 0)
                    .to(stage, { scale: 0.9, duration: 0.6, ease: "sine.inOut" }, 0.3);

                cards.forEach((card, i) => {
                    const depth = CARD_DEPTH[i % CARD_DEPTH.length];
                    tl.to(card, { y: -depth, rotation: CARD_TILT[i % CARD_TILT.length], duration: 0.45 }, 0)
                        .to(
                            card,
                            {
                                x: () => towardCentre(card).x,
                                y: () => towardCentre(card).y - depth,
                                duration: 0.35,
                                ease: "power1.inOut",
                            },
                            0.45
                        )
                        .to(card, { autoAlpha: 0, duration: 0.3, ease: "power1.in" }, 0.55);
                });
                if (services) tl.to(services, { autoAlpha: 0, duration: 0.3, ease: "power1.in" }, 0.55);

                tl.to(content, { y: -30, duration: 0.7, ease: "power1.inOut" }, 0.3)
                    .to(content, { autoAlpha: 0, duration: 0.3, ease: "power1.in" }, 0.7);

                // Held below the fold during the parallax, then eases in to meet the page's
                // scroll speed exactly as the pin releases.
                tl.fromTo(
                    next,
                    { y: () => window.innerHeight * 0.25 },
                    { y: 0, duration: 1, ease: "power1.out" },
                    0
                );

                return () => {
                    next.classList.remove("arcle-hero-overlap");
                    resetStage();
                };
            }
        );

        // Later sections (e.g. the pinned IndustriesVideo) were measured before this pin existed.
        ScrollTrigger.sort();
        const frame = requestAnimationFrame(() => ScrollTrigger.refresh());
        let alive = true;
        document.fonts?.ready.then(() => {
            if (alive) ScrollTrigger.refresh();
        });

        return () => {
            alive = false;
            cancelAnimationFrame(frame);
            mm.revert();
        };
    }, [heroRef, nextRef]);
};

export default useHeroScrollTransition;

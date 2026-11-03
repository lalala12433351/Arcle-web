import { useLayoutEffect, type RefObject } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import "lenis/dist/lenis.css";
import type { WallServiceKey } from "../components/services/wall/serviceWallContent";
import { activeFaceAt, restProgress, sceneBuilders } from "../components/services/wall/serviceWallTimelines";

const PINNED_QUERY = "(min-width: 1101px) and (min-height: 760px)";

const useServicesScroll = (rootRef: RefObject<HTMLElement | null>) => {
    useLayoutEffect(() => {
        const root = rootRef.current;
        if (!root) return;

        gsap.registerPlugin(ScrollTrigger);

        const html = document.documentElement;
        html.classList.add("services-smooth");

        let lenis: Lenis | null = null;
        let tick: ((time: number) => void) | null = null;

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
        }

        const mm = gsap.matchMedia(root);

        mm.add(
            {
                pinned: PINNED_QUERY,
                motion: "(prefers-reduced-motion: no-preference)",
                finePointer: "(hover: hover) and (pointer: fine)",
            },
            (context) => {
                const { pinned, motion, finePointer } = context.conditions as Record<string, boolean>;
                const cleanups: Array<() => void> = [];
                const hero = root.querySelector<HTMLElement>(".services-wall__hero");
                const tilt = root.querySelector<HTMLElement>(".services-wall__tilt");

                if (hero && motion) {
                    const lede = hero.querySelector<HTMLElement>(".services-wall__lede");
                    const cue = hero.querySelector<HTMLElement>(".services-wall__cue");
                    const heroLine = hero.querySelector<HTMLElement>(".services-wall__line--hero");
                    const restWords = gsap.utils.toArray<HTMLElement>(".services-wall__line--rest .services-wall__word", hero);
                    const foot = hero.querySelector<HTMLElement>(".services-wall__foot");

                    if (heroLine && window.scrollY < 8) {
                        const rect = heroLine.getBoundingClientRect();
                        const nav = document.querySelector("nav");
                        const navBottom = nav?.getBoundingClientRect().bottom ?? 0;
                        gsap.set(heroLine, {
                            transformOrigin: "50% 50%",
                            scale: 0.82,
                            x: window.innerWidth / 2 - (rect.left + rect.width / 2),
                            y: navBottom + (window.innerHeight - navBottom) / 2 - (rect.top + rect.height / 2),
                        });
                        gsap.set(restWords, { autoAlpha: 0, y: 36 });
                        if (foot) gsap.set(foot, { autoAlpha: 0, y: 24 });

                        const intro = gsap.timeline({ delay: 0.4 });
                        intro.to(heroLine, {
                            x: 0,
                            y: 0,
                            scale: 1,
                            duration: 1.15,
                            ease: "expo.inOut",
                        });
                        intro.to(
                            restWords,
                            {
                                autoAlpha: 1,
                                y: 0,
                                duration: 0.9,
                                ease: "expo.out",
                                stagger: 0.07,
                            },
                            0.82,
                        );
                        if (foot) {
                            intro.to(
                                foot,
                                {
                                    autoAlpha: 1,
                                    y: 0,
                                    duration: 0.85,
                                    ease: "expo.out",
                                },
                                1.05,
                            );
                        }
                    }

                    const heroScroll = gsap.timeline({
                        scrollTrigger: {
                            trigger: hero,
                            start: "top top",
                            end: "bottom top",
                            scrub: true,
                        },
                    });

                    heroScroll.to(
                        ".services-wall__title",
                        {
                            rotateX: 38,
                            z: -260,
                            yPercent: -22,
                            autoAlpha: 0.12,
                            ease: "none",
                            duration: 1,
                        },
                        0,
                    );

                    if (lede) {
                        heroScroll.to(
                            lede,
                            { autoAlpha: 0, y: -36, ease: "none", duration: 0.28 },
                            0.55,
                        );
                    }

                    if (cue) {
                        heroScroll.fromTo(
                            cue,
                            { autoAlpha: 1, y: 0 },
                            { autoAlpha: 0, y: -16, ease: "none", duration: 0.14, immediateRender: false },
                            0.3,
                        );
                    }

                    if (tilt && finePointer) {
                        const toX = gsap.quickTo(tilt, "rotateX", { duration: 0.9, ease: "power3.out" });
                        const toY = gsap.quickTo(tilt, "rotateY", { duration: 0.9, ease: "power3.out" });
                        const onMove = (event: PointerEvent) => {
                            const rect = hero.getBoundingClientRect();
                            toY(((event.clientX - rect.left) / rect.width - 0.5) * 12);
                            toX(-((event.clientY - rect.top) / rect.height - 0.5) * 9);
                        };
                        const onLeave = () => {
                            toX(0);
                            toY(0);
                        };
                        hero.addEventListener("pointermove", onMove);
                        hero.addEventListener("pointerleave", onLeave);
                        cleanups.push(() => {
                            hero.removeEventListener("pointermove", onMove);
                            hero.removeEventListener("pointerleave", onLeave);
                            gsap.killTweensOf(tilt);
                        });
                    }
                }

                gsap.utils.toArray<HTMLElement>("[data-svc]", root).forEach((section) => {
                    const key = section.dataset.svc as WallServiceKey;
                    const stage = section.querySelector<HTMLElement>(".svc-wall__stage");
                    const scene = sceneBuilders[key](section);

                    if (key === "creative") {
                        const chips = gsap.utils.toArray<HTMLElement>("[data-face]", section);
                        const syncFaces = () => {
                            const face = activeFaceAt(scene.progress());
                            chips.forEach((chip) => chip.classList.toggle("is-active", Number(chip.dataset.face) === face));
                        };
                        scene.eventCallback("onUpdate", syncFaces);
                        syncFaces();
                        cleanups.push(() => chips.forEach((chip) => chip.classList.remove("is-active")));
                    }

                    if (!motion) {
                        scene.progress(restProgress[key]);
                        return;
                    }

                    ScrollTrigger.create({
                        trigger: pinned ? section : stage,
                        start: pinned ? "top top" : "top 85%",
                        end: pinned ? "bottom bottom" : "bottom 15%",
                        scrub: 0.8,
                        animation: scene,
                    });

                    gsap.timeline({
                        scrollTrigger: { trigger: section, start: "top 72%", once: true },
                    })
                        .from(section.querySelector(".svc-wall__title-line"), {
                            yPercent: 110,
                            duration: 1.1,
                            ease: "expo.out",
                        })
                        .fromTo(
                            section.querySelectorAll(".svc-wall__reveal"),
                            { y: 28, opacity: 0, filter: "blur(8px)" },
                            {
                                y: 0,
                                opacity: 1,
                                filter: "blur(0px)",
                                duration: 0.9,
                                ease: "expo.out",
                                stagger: 0.08,
                                clearProps: "filter",
                            },
                            0.15,
                        );

                    const tilt = section.querySelector<HTMLElement>(".svc-cre__tilt");
                    if (key === "creative" && finePointer && stage && tilt) {
                        const turnX = gsap.quickTo(tilt, "rotationX", { duration: 0.9, ease: "power3" });
                        const turnY = gsap.quickTo(tilt, "rotationY", { duration: 0.9, ease: "power3" });
                        const onMove = (event: PointerEvent) => {
                            const bounds = stage.getBoundingClientRect();
                            const x = (event.clientX - bounds.left) / bounds.width - 0.5;
                            const y = (event.clientY - bounds.top) / bounds.height - 0.5;
                            turnY(22 + x * 20);
                            turnX(-16 - y * 16);
                        };
                        const onLeave = () => {
                            turnY(22);
                            turnX(-16);
                        };
                        stage.addEventListener("pointermove", onMove);
                        stage.addEventListener("pointerleave", onLeave);
                        cleanups.push(() => {
                            stage.removeEventListener("pointermove", onMove);
                            stage.removeEventListener("pointerleave", onLeave);
                        });
                    }
                });

                return () => cleanups.forEach((cleanup) => cleanup());
            },
        );

        requestAnimationFrame(() => ScrollTrigger.refresh());

        return () => {
            mm.revert();
            html.classList.remove("services-smooth");
            if (tick) gsap.ticker.remove(tick);
            if (lenis) {
                gsap.ticker.lagSmoothing(500, 33);
                lenis.destroy();
            }
        };
    }, [rootRef]);
};

export default useServicesScroll;

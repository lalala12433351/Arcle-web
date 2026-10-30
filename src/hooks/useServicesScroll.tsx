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

                const globe = root.querySelector<HTMLElement>(".services-wall__globe");
                const banner = root.querySelector<HTMLElement>(".services-wall__banner");
                if (motion && globe && banner) {
                    gsap.to(globe, {
                        y: 140,
                        opacity: 0.15,
                        ease: "none",
                        scrollTrigger: { trigger: banner, start: 0, end: "bottom top", scrub: true },
                    });
                }

                const igPop = root.querySelector<HTMLElement>(".globe-pop--ig");
                const tittle = root.querySelector<HTMLElement>(".services-wall__tittle");
                if (motion && globe && banner && igPop && tittle) {
                    const restTilt = gsap.getProperty(igPop, "rotation") as number;
                    // Offset from the icon's resting spot on the globe to the i's dot, measured with scroll transforms lifted.
                    const flight = () => {
                        const saved = [igPop.style.transform, globe.style.transform];
                        igPop.style.transform = globe.style.transform = "none";
                        const dot = tittle.getBoundingClientRect();
                        const pop = igPop.getBoundingClientRect();
                        [igPop.style.transform, globe.style.transform] = saved;
                        const restX = pop.left + pop.width / 2;
                        const restY = pop.top + pop.height / 2;
                        return {
                            x: dot.left + dot.width / 2 - restX,
                            y: dot.top + dot.height / 2 - restY,
                            scale: dot.width / igPop.offsetWidth,
                            dotTop: dot.top + window.scrollY,
                            restTop: restY - igPop.offsetHeight / 2 + window.scrollY,
                        };
                    };

                    gsap.timeline({
                        defaults: { ease: "none" },
                        scrollTrigger: {
                            trigger: banner,
                            start: 0,
                            // Land before either the dot or the globe spot slides under the fixed navbar.
                            end: () => {
                                const { dotTop, restTop } = flight();
                                return Math.min(dotTop, Math.max(restTop - window.innerHeight * 0.15, 160));
                            },
                            scrub: 0.6,
                            invalidateOnRefresh: true,
                        },
                    })
                        .fromTo(igPop, { x: () => flight().x }, { x: 0, duration: 1, ease: "power2.inOut" }, 0)
                        .fromTo(igPop, { y: () => flight().y }, { y: 0, duration: 1, ease: "power2.out" }, 0)
                        .fromTo(
                            igPop,
                            { scale: () => flight().scale, rotation: 0 },
                            { scale: 1, rotation: restTilt, duration: 1, ease: "power2.inOut" },
                            0,
                        )
                        .fromTo(igPop.querySelector(".globe-pop__shadow"), { opacity: 0 }, { opacity: 1, duration: 0.4 }, 0.6)
                        .fromTo(tittle, { "--dot": 0 }, { "--dot": 1, duration: 0.25, ease: "back.out(2)" }, 0.12);
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

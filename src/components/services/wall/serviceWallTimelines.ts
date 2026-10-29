import gsap from "gsap";
import type { WallServiceKey } from "./serviceWallContent";

type SceneBuilder = (section: HTMLElement) => gsap.core.Timeline;

const CUBE_TURN_START = 0.06;
const CUBE_TURN_GAP = 0.2;
const CUBE_TURN_LENGTH = 0.14;

const buildSeo: SceneBuilder = (section) => {
    const rig = section.querySelector<HTMLElement>(".svc-seo__rig");
    const cards = gsap.utils.toArray<HTMLElement>(".svc-seo__card", section);
    const hero = section.querySelector<HTMLElement>(".svc-seo__card--hero");
    const query = section.querySelector<HTMLElement>(".svc-seo__query");
    const others = cards.filter((card) => card !== hero);
    const middle = (cards.length - 1) / 2;
    const spread = (gap: number) => (index: number) => (index - middle) * gap;
    const peak = middle * 64 + 72;

    gsap.set(rig, { "--rx": 58, "--rz": -34, "--s": 1 });
    gsap.set(cards, { z: spread(12), opacity: 1 });
    gsap.set(hero, { "--lit": 0 });
    gsap.set(query, { z: middle * 12 + 30, y: -30, opacity: 0 });

    return gsap
        .timeline({ paused: true, defaults: { ease: "none" } })
        .to(cards, { z: spread(64), duration: 0.35, ease: "power2.inOut" }, 0)
        .to(query, { z: peak + 64, y: -70, opacity: 1, duration: 0.3, ease: "power2.out" }, 0.05)
        .to(hero, { z: peak, y: -24, "--lit": 1, duration: 0.3, ease: "power3.inOut" }, 0.35)
        .to(others, { opacity: 0.45, duration: 0.25 }, 0.4)
        .to(rig, { "--rx": 24, "--rz": -8, "--s": 0.94, duration: 0.35, ease: "power2.inOut" }, 0.65)
        .to(others, { z: (index) => (index - (others.length - 1) / 2) * 20, duration: 0.35, ease: "power2.inOut" }, 0.65)
        .to(hero, { z: 110, y: -12, duration: 0.35, ease: "power2.inOut" }, 0.65)
        .to(query, { z: 170, y: -96, duration: 0.35, ease: "power2.inOut" }, 0.65);
};

const buildDevelopment: SceneBuilder = (section) => {
    const rig = section.querySelector<HTMLElement>(".svc-dev__rig");
    const layers = gsap.utils.toArray<HTMLElement>(".svc-dev__layer", section);
    const tags = gsap.utils.toArray<HTMLElement>(".svc-dev__tag", section);
    const middle = (layers.length - 1) / 2;

    gsap.set(rig, { "--rx": 0, "--rz": 0, "--s": 1 });
    gsap.set(layers, { z: (index) => index - layers.length });
    gsap.set(tags, { opacity: 0 });

    return gsap
        .timeline({ paused: true, defaults: { ease: "none" } })
        .to(rig, { "--rx": 54, "--rz": -38, "--s": 0.84, duration: 0.3, ease: "power2.inOut" }, 0)
        .to(layers, { z: (index) => (index - middle) * 150, duration: 0.3, ease: "power3.inOut" }, 0.12)
        .to(tags, { opacity: 1, duration: 0.1, stagger: 0.04 }, 0.3)
        .to(tags, { opacity: 0, duration: 0.08 }, 0.68)
        .to(layers, { z: (index) => index - layers.length, duration: 0.26, ease: "power3.inOut" }, 0.72)
        .to(rig, { "--rx": 14, "--rz": -6, "--s": 1, duration: 0.28, ease: "power2.inOut" }, 0.72);
};

const buildCreative: SceneBuilder = (section) => {
    const tilt = section.querySelector<HTMLElement>(".svc-cre__tilt");
    const cube = section.querySelector<HTMLElement>(".svc-cre__cube");
    const turns = [
        { rotationY: -90 },
        { rotationY: -180 },
        { rotationY: -270 },
        { rotationY: -360, rotationX: -90 },
        { rotationX: -270 },
    ];

    gsap.set(tilt, { rotationY: 22, rotationX: -16 });
    gsap.set(cube, { rotationY: 0, rotationX: 0 });

    const timeline = gsap.timeline({ paused: true });
    turns.forEach((turn, index) => {
        timeline.to(
            cube,
            { ...turn, duration: CUBE_TURN_LENGTH, ease: "power3.inOut" },
            CUBE_TURN_START + index * CUBE_TURN_GAP,
        );
    });
    return timeline;
};

export const sceneBuilders: Record<WallServiceKey, SceneBuilder> = {
    seo: buildSeo,
    development: buildDevelopment,
    creative: buildCreative,
};

export const restProgress: Record<WallServiceKey, number> = {
    seo: 1,
    development: 1,
    creative: 0,
};

export const activeFaceAt = (progress: number) => {
    const firstMidpoint = CUBE_TURN_START + CUBE_TURN_LENGTH / 2;
    const passed = Math.floor((progress - firstMidpoint) / CUBE_TURN_GAP) + 1;
    return gsap.utils.clamp(0, 5, passed);
};

import { useLayoutEffect, useRef } from "react";
import * as THREE from "three";
import ServiceWallSection from "./ServiceWallSection";
import { findService } from "./serviceWallContent";

const service = findService("Performance Marketing");

export type PerfMotion = {
    spread: number;
    pointerX: number;
    pointerY: number;
};

const perfMotions = new WeakMap<HTMLElement, PerfMotion>();

export const perfMotionFor = (section: HTMLElement) => {
    const node = section.querySelector<HTMLElement>(".svc-perf");
    return node ? perfMotions.get(node) : undefined;
};

type CardSpec = {
    name: string;
    metric: string;
    value: string;
    fill: number;
    hero?: boolean;
};

type Palette = {
    ink: string;
    copy: string;
    surface: string;
    accent: string;
    line: string;
};

const cards: CardSpec[] = [
    { name: "Google Ads", metric: "Spend", value: "₹4.8L", fill: 0.72 },
    { name: "Meta Ads", metric: "Leads", value: "186", fill: 0.88 },
    { name: "LinkedIn Ads", metric: "CPL", value: "₹640", fill: 0.54 },
    { name: "YouTube Ads", metric: "ROAS", value: "4.2×", fill: 0.84, hero: true },
];

const stack = [
    { x: -0.05, y: 0.04, z: -0.18, rx: 0.24, ry: -0.28 },
    { x: 0.01, y: 0, z: -0.3, rx: 0.24, ry: -0.28 },
    { x: 0.06, y: -0.04, z: -0.42, rx: 0.24, ry: -0.28 },
    { x: 0, y: 0.08, z: 0.02, rx: 0.24, ry: -0.28 },
];

const fan = [
    { x: -0.92, y: -0.2, z: -0.22, rx: 0.04, ry: 0.16 },
    { x: -0.22, y: 0.22, z: 0.02, rx: 0, ry: 0.06 },
    { x: 0.7, y: 0.5, z: 0.16, rx: -0.02, ry: -0.1 },
    { x: 0.1, y: -0.4, z: 0.58, rx: 0.01, ry: -0.02 },
];

const CARD_W = 1.72;
const CARD_H = 1.08;

const rounded = (
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    w: number,
    h: number,
    r: number,
) => {
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.arcTo(x + w, y, x + w, y + h, r);
    ctx.arcTo(x + w, y + h, x, y + h, r);
    ctx.arcTo(x, y + h, x, y, r);
    ctx.arcTo(x, y, x + w, y, r);
    ctx.closePath();
};

const readPalette = (node: HTMLElement): Palette => {
    const style = getComputedStyle(node);
    const pick = (name: string, fallback: string) => style.getPropertyValue(name).trim() || fallback;
    return {
        ink: pick("--wall-ink", "#171714"),
        copy: pick("--wall-copy", "#3a382f"),
        surface: pick("--wall-surface", "#fbfaf4"),
        accent: pick("--wall-accent", "#236bff"),
        line: pick("--wall-line-strong", "rgba(23, 23, 20, 0.24)"),
    };
};

const drawCard = (canvas: HTMLCanvasElement, spec: CardSpec, colors: Palette) => {
    const width = 1024;
    const height = 640;
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.clearRect(0, 0, width, height);
    rounded(ctx, 12, 12, width - 24, height - 24, 48);
    ctx.fillStyle = colors.surface;
    ctx.fill();
    ctx.lineWidth = spec.hero ? 8 : 4;
    ctx.strokeStyle = spec.hero ? colors.accent : colors.line;
    ctx.stroke();

    ctx.fillStyle = colors.accent;
    ctx.beginPath();
    ctx.arc(92, 108, 14, 0, Math.PI * 2);
    ctx.fill();

    ctx.textBaseline = "alphabetic";
    ctx.textAlign = "left";
    ctx.fillStyle = colors.copy;
    ctx.font = "500 40px Manrope, sans-serif";
    ctx.fillText(spec.name, 128, 122);

    ctx.fillStyle = spec.hero ? colors.accent : colors.ink;
    ctx.font = "600 104px Manrope, sans-serif";
    ctx.fillText(spec.value, 72, 292);

    ctx.fillStyle = colors.copy;
    ctx.font = "500 34px Manrope, sans-serif";
    ctx.fillText(spec.metric, 72, 360);

    rounded(ctx, 72, 470, 880, 26, 13);
    ctx.fillStyle = colors.line;
    ctx.fill();
    rounded(ctx, 72, 470, 880 * spec.fill, 26, 13);
    ctx.fillStyle = colors.accent;
    ctx.fill();
};

const drawBadge = (canvas: HTMLCanvasElement, colors: Palette) => {
    const width = 1280;
    const height = 240;
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.clearRect(0, 0, width, height);
    rounded(ctx, 8, 8, width - 16, height - 16, (height - 16) / 2);
    ctx.fillStyle = colors.surface;
    ctx.fill();
    ctx.lineWidth = 5;
    ctx.strokeStyle = colors.line;
    ctx.stroke();

    ctx.fillStyle = colors.accent;
    ctx.beginPath();
    ctx.arc(96, height / 2, 16, 0, Math.PI * 2);
    ctx.fill();

    ctx.textBaseline = "middle";
    ctx.textAlign = "left";
    ctx.fillStyle = colors.ink;
    ctx.font = "600 64px Manrope, sans-serif";
    ctx.fillText("Return on ad spend", 140, height / 2 + 2);

    ctx.textAlign = "right";
    ctx.fillStyle = colors.accent;
    ctx.font = "700 76px Manrope, sans-serif";
    ctx.fillText("4.2×", width - 72, height / 2 + 2);
};

const textureFrom = (canvas: HTMLCanvasElement, anisotropy: number) => {
    const texture = new THREE.CanvasTexture(canvas);
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.anisotropy = anisotropy;
    return texture;
};

export const SpendField = () => {
    const mountRef = useRef<HTMLDivElement>(null);

    useLayoutEffect(() => {
        const mount = mountRef.current;
        if (!mount) return;

        const motion: PerfMotion = { spread: 0, pointerX: 0, pointerY: 0 };
        perfMotions.set(mount, motion);

        const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(28, 1, 0.1, 40);
        camera.position.set(0, 0.05, 8.8);

        const renderer = new THREE.WebGLRenderer({
            antialias: true,
            alpha: true,
            powerPreference: "high-performance",
        });
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        renderer.outputColorSpace = THREE.SRGBColorSpace;
        renderer.setClearColor(0x000000, 0);
        const canvas = renderer.domElement;
        canvas.style.display = "block";
        canvas.style.width = "100%";
        canvas.style.height = "100%";
        mount.appendChild(canvas);

        const anisotropy = renderer.capabilities.getMaxAnisotropy();
        const cardCanvases = cards.map(() => document.createElement("canvas"));
        const badgeCanvas = document.createElement("canvas");
        const cardTextures = cardCanvases.map((cardCanvas) => textureFrom(cardCanvas, anisotropy));
        const badgeTexture = textureFrom(badgeCanvas, anisotropy);

        const paint = () => {
            const colors = readPalette(mount);
            cards.forEach((spec, index) => drawCard(cardCanvases[index], spec, colors));
            drawBadge(badgeCanvas, colors);
            cardTextures.forEach((texture) => {
                texture.needsUpdate = true;
            });
            badgeTexture.needsUpdate = true;
        };
        paint();

        const rig = new THREE.Group();
        scene.add(rig);

        const panels = cards.map((_, index) => {
            const panel = new THREE.Group();
            const face = new THREE.Mesh(
                new THREE.PlaneGeometry(CARD_W, CARD_H),
                new THREE.MeshBasicMaterial({
                    map: cardTextures[index],
                    transparent: true,
                    alphaTest: 0.45,
                }),
            );
            panel.add(face);
            rig.add(panel);
            return panel;
        });

        const badge = new THREE.Mesh(
            new THREE.PlaneGeometry(2.35, 0.44),
            new THREE.MeshBasicMaterial({
                map: badgeTexture,
                transparent: true,
                opacity: 0,
                depthWrite: false,
            }),
        );
        badge.renderOrder = 3;
        rig.add(badge);

        const aim = { x: 0, y: 0 };
        const stage = mount.closest<HTMLElement>(".svc-wall__stage") ?? mount;
        const onMove = (event: PointerEvent) => {
            const bounds = stage.getBoundingClientRect();
            if (bounds.width === 0 || bounds.height === 0) return;
            aim.x = (event.clientX - bounds.left) / bounds.width - 0.5;
            aim.y = (event.clientY - bounds.top) / bounds.height - 0.5;
        };
        const onLeave = () => {
            aim.x = 0;
            aim.y = 0;
        };
        stage.addEventListener("pointermove", onMove);
        stage.addEventListener("pointerleave", onLeave);

        const resize = () => {
            const width = mount.clientWidth;
            const height = mount.clientHeight;
            if (width === 0 || height === 0) return;
            camera.aspect = width / height;
            camera.updateProjectionMatrix();
            renderer.setSize(width, height, false);
            renderFrame();
        };

        const themeObserver = new MutationObserver(paint);
        themeObserver.observe(document.body, { attributes: true, attributeFilter: ["class"] });

        let frame = 0;
        let disposed = false;
        const fonts = document.fonts;
        if (fonts) fonts.ready.then(() => {
            if (!disposed) paint();
        });

        const renderFrame = () => {
            const spread = THREE.MathUtils.clamp(motion.spread, 0, 1);
            if (!reduce) {
                motion.pointerX += (aim.x - motion.pointerX) * 0.08;
                motion.pointerY += (aim.y - motion.pointerY) * 0.08;
            }

            rig.rotation.x = THREE.MathUtils.lerp(0.22, 0.06, spread) - motion.pointerY * 0.12;
            rig.rotation.y = THREE.MathUtils.lerp(-0.08, 0, spread) + motion.pointerX * 0.16;
            rig.position.y = THREE.MathUtils.lerp(0.42, 0.22, spread);

            panels.forEach((panel, index) => {
                const from = stack[index];
                const to = fan[index];
                panel.position.set(
                    THREE.MathUtils.lerp(from.x, to.x, spread),
                    THREE.MathUtils.lerp(from.y, to.y, spread),
                    THREE.MathUtils.lerp(from.z, to.z, spread),
                );
                panel.rotation.set(
                    THREE.MathUtils.lerp(from.rx, to.rx, spread),
                    THREE.MathUtils.lerp(from.ry, to.ry, spread),
                    0,
                );
            });

            badge.position.set(
                THREE.MathUtils.lerp(0.1, 0.02, spread),
                THREE.MathUtils.lerp(0.16, 1.32, spread),
                THREE.MathUtils.lerp(-0.05, 0.85, spread),
            );
            badge.scale.setScalar(THREE.MathUtils.lerp(0.86, 1, spread));
            (badge.material as THREE.MeshBasicMaterial).opacity = spread;

            renderer.render(scene, camera);
        };

        const onScreen = () => {
            const bounds = mount.getBoundingClientRect();
            return bounds.bottom > 0 && bounds.top < window.innerHeight && bounds.width > 0;
        };

        const animate = () => {
            if (disposed) return;
            frame = requestAnimationFrame(animate);
            if (!onScreen()) return;
            renderFrame();
        };

        resize();
        const resizeObserver = new ResizeObserver(resize);
        resizeObserver.observe(mount);
        animate();

        return () => {
            disposed = true;
            cancelAnimationFrame(frame);
            perfMotions.delete(mount);
            resizeObserver.disconnect();
            themeObserver.disconnect();
            stage.removeEventListener("pointermove", onMove);
            stage.removeEventListener("pointerleave", onLeave);
            panels.forEach((panel) => {
                panel.traverse((child) => {
                    if (!(child instanceof THREE.Mesh)) return;
                    child.geometry.dispose();
                    const material = child.material;
                    if (Array.isArray(material)) material.forEach((entry) => entry.dispose());
                    else material.dispose();
                });
            });
            badge.geometry.dispose();
            (badge.material as THREE.Material).dispose();
            cardTextures.forEach((texture) => texture.dispose());
            badgeTexture.dispose();
            renderer.dispose();
            renderer.forceContextLoss();
            canvas.remove();
        };
    }, []);

    return <div className="svc-perf" ref={mountRef} />;
};

const ServicePerformance = () => (
    <ServiceWallSection
        service="performance-marketing"
        title={service.title}
        summary={service.summary}
        paragraphs={[]}
        groups={service.groups}
        visual={<SpendField />}
        visualLabel="Four paid-media campaigns fanning apart in 3D, with return on ad spend lifting clear of the stack"
        flip
    />
);

export default ServicePerformance;

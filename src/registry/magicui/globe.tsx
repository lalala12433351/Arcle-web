import { useEffect, useRef, useState } from "react";
import createGlobe, { type COBEOptions } from "cobe";
import { useMotionValue, useSpring } from "motion/react";
import { cn } from "@/lib/utils";

const MOVEMENT_DAMPING = 1400;

const MARKERS: COBEOptions["markers"] = [
    { location: [12.9716, 77.5946], size: 0.1 },
    { location: [19.076, 72.8777], size: 0.06 },
    { location: [28.6139, 77.209], size: 0.05 },
    { location: [1.3521, 103.8198], size: 0.04 },
    { location: [25.2048, 55.2708], size: 0.05 },
    { location: [51.5074, -0.1278], size: 0.05 },
    { location: [40.7128, -74.006], size: 0.07 },
    { location: [37.7749, -122.4194], size: 0.05 },
    { location: [-33.8688, 151.2093], size: 0.04 },
    { location: [35.6762, 139.6503], size: 0.05 },
];

function useSiteDark() {
    const [dark, setDark] = useState(false);

    useEffect(() => {
        const read = () => setDark(document.body.classList.contains("bg-dark"));
        read();
        const observer = new MutationObserver(read);
        observer.observe(document.body, { attributes: true, attributeFilter: ["class"] });
        return () => observer.disconnect();
    }, []);

    return dark;
}

export function Globe({ className }: { className?: string }) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const pointerInteracting = useRef<number | null>(null);
    const pointerInteractionMovement = useRef(0);
    const dark = useSiteDark();

    const r = useMotionValue(0);
    const rs = useSpring(r, {
        mass: 1,
        damping: 30,
        stiffness: 100,
    });

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        let phi = -77.6 * Math.PI / 180;
        let width = 0;
        let frame = 0;

        const onResize = () => {
            width = canvas.offsetWidth;
        };

        window.addEventListener("resize", onResize);
        onResize();

        const globe = createGlobe(canvas, {
            devicePixelRatio: 2,
            width: width * 2,
            height: width * 2,
            phi: 0,
            theta: 0.25,
            dark: dark ? 0.72 : 0,
            diffuse: dark ? 1.1 : 1.35,
            mapSamples: 16000,
            mapBrightness: dark ? 5 : 7.5,
            baseColor: dark ? [0.38, 0.38, 0.35] : [0.9, 0.88, 0.82],
            markerColor: [35 / 255, 107 / 255, 1],
            glowColor: dark ? [18 / 255, 19 / 255, 17 / 255] : [243 / 255, 240 / 255, 228 / 255],
            markers: MARKERS,
        });

        const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

        const loop = () => {
            if (!pointerInteracting.current && !reduced) phi += 0.004;
            globe.update({
                phi: phi + rs.get(),
                width: width * 2,
                height: width * 2,
            });
            frame = requestAnimationFrame(loop);
        };

        frame = requestAnimationFrame(loop);
        canvas.style.opacity = "1";

        return () => {
            cancelAnimationFrame(frame);
            globe.destroy();
            window.removeEventListener("resize", onResize);
        };
    }, [dark, rs]);

    return (
        <div className={cn("absolute inset-0 mx-auto aspect-square w-full max-w-[600px]", className)}>
            <canvas
                ref={canvasRef}
                aria-label="Interactive globe"
                className="block size-full cursor-grab [contain:layout_paint_size]"
                style={{ opacity: 0, transition: "opacity 500ms ease" }}
                onPointerDown={(event) => {
                    pointerInteracting.current = event.clientX - pointerInteractionMovement.current;
                    canvasRef.current?.style.setProperty("cursor", "grabbing");
                }}
                onPointerUp={() => {
                    pointerInteracting.current = null;
                    canvasRef.current?.style.setProperty("cursor", "grab");
                }}
                onPointerOut={() => {
                    pointerInteracting.current = null;
                    canvasRef.current?.style.setProperty("cursor", "grab");
                }}
                onMouseMove={(event) => {
                    if (pointerInteracting.current === null) return;
                    const delta = event.clientX - pointerInteracting.current;
                    pointerInteractionMovement.current = delta;
                    r.set(delta / MOVEMENT_DAMPING);
                }}
                onTouchMove={(event) => {
                    if (pointerInteracting.current === null || !event.touches[0]) return;
                    const delta = event.touches[0].clientX - pointerInteracting.current;
                    pointerInteractionMovement.current = delta;
                    r.set(delta / MOVEMENT_DAMPING);
                }}
            />
        </div>
    );
}

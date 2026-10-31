import { useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import "lenis/dist/lenis.css";

let lenis: Lenis | null = null;
let users = 0;
let ticker: ((time: number) => void) | null = null;

function acquirePageLenis() {
    gsap.registerPlugin(ScrollTrigger);
    users += 1;
    if (lenis) return lenis;

    lenis = new Lenis({
        lerp: 0.08,
        smoothWheel: true,
        wheelMultiplier: 0.9,
        touchMultiplier: 1.4,
    });
    lenis.on("scroll", ScrollTrigger.update);
    const instance = lenis;
    ticker = (time: number) => instance.raf(time * 1000);
    gsap.ticker.add(ticker);
    gsap.ticker.lagSmoothing(0);
    return lenis;
}

function releasePageLenis() {
    users = Math.max(0, users - 1);
    if (users > 0 || !lenis) return;
    if (ticker) gsap.ticker.remove(ticker);
    gsap.ticker.lagSmoothing(500, 33);
    lenis.destroy();
    lenis = null;
    ticker = null;
}

export function usePageLenis(enabled = true) {
    useLayoutEffect(() => {
        if (!enabled) return;
        acquirePageLenis();
        return () => releasePageLenis();
    }, [enabled]);
}

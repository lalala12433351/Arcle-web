import { useLayoutEffect, useRef, useState, type RefObject } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export type ProcessMode = "static" | "stack" | "rows" | "pin";

type Sequence = {
    active: number;
    completeAll: boolean;
};

const STACK_MAX = 767;
const DESKTOP_MIN = 992;

const sequenceOf = (active: number, completeAll: boolean): Sequence => ({ active, completeAll });

const navOverlap = () => {
    const nav = document.querySelector("nav.navbar");
    if (!nav) return 0;
    const rect = nav.getBoundingClientRect();
    if (rect.bottom <= 0 || rect.top > 12) return 0;
    return Math.max(0, Math.min(window.innerHeight, rect.bottom));
};

const sequenceRoot = (node: HTMLElement) =>
    node.closest<HTMLElement>(".expertise-area, .process-area") ?? node;

const groupRows = (cards: HTMLElement[]) => {
    const rows: HTMLElement[][] = [];
    cards.forEach((card) => {
        const top = card.getBoundingClientRect().top;
        const current = rows[rows.length - 1];
        if (current && Math.abs(current[0].getBoundingClientRect().top - top) < 16) {
            current.push(card);
        } else {
            rows.push([card]);
        }
    });
    return rows;
};

const rowBands = (rows: HTMLElement[][]) =>
    rows.map((row) => {
        const rects = row.map((card) => card.getBoundingClientRect());
        return {
            top: Math.min(...rects.map((rect) => rect.top)),
            bottom: Math.max(...rects.map((rect) => rect.bottom)),
            count: row.length,
        };
    });

/** One step per slice of the row currently crossing the reading line. */
export const sequenceFromRows = (
    bands: { top: number; bottom: number; count: number }[],
    focus: number,
    nav: number,
): Sequence => {
    let start = 0;
    for (let index = 0; index < bands.length; index += 1) {
        const band = bands[index];
        const last = start + band.count - 1;
        if (focus < band.top) {
            return index === 0 ? sequenceOf(-1, false) : sequenceOf(start - 1, false);
        }
        if (focus <= band.bottom) {
            const span = Math.max(1, band.bottom - band.top);
            const local = Math.min(0.999, Math.max(0, (focus - band.top) / span));
            const offset = Math.min(band.count - 1, Math.floor(local * band.count));
            return sequenceOf(start + offset, false);
        }
        if (index === bands.length - 1) {
            return band.bottom < nav + 20 ? sequenceOf(-1, true) : sequenceOf(last, false);
        }
        start += band.count;
    }
    return sequenceOf(-1, false);
};

/** Activate the step whose centre has reached the middle band of the viewport. */
export const sequenceFromStack = (cards: HTMLElement[], nav: number) => {
    const line = nav + (window.innerHeight - nav) * 0.56;
    let active = -1;
    cards.forEach((card, index) => {
        const rect = card.getBoundingClientRect();
        const center = rect.top + rect.height / 2;
        if (center <= line) active = index;
    });
    const last = cards[cards.length - 1]?.getBoundingClientRect();
    if (last && last.bottom < nav + 16) return sequenceOf(-1, true);
    return sequenceOf(active, false);
};

export const useProcessSequence = (rootRef: RefObject<HTMLElement | null>) => {
    const [motionOn, setMotionOn] = useState(false);
    const [mode, setModeState] = useState<ProcessMode>("static");
    const [sequence, setSequence] = useState<Sequence>({ active: -1, completeAll: false });
    const published = useRef<Sequence>({ active: -1, completeAll: false });
    const modeRef = useRef<ProcessMode>("static");

    useLayoutEffect(() => {
        const root = rootRef.current;
        if (!root) return;

        let alive = true;
        let trigger: ScrollTrigger | null = null;
        let frame = 0;
        let ticking = false;
        const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");

        const commit = (next: Sequence) => {
            const prev = published.current;
            if (prev.active === next.active && prev.completeAll === next.completeAll) return;
            published.current = next;
            setSequence(next);
        };

        const setMode = (next: ProcessMode) => {
            modeRef.current = next;
            setModeState((prev) => (prev === next ? prev : next));
        };

        const destroyPin = () => {
            trigger?.kill();
            trigger = null;
        };

        const cardsOf = () => Array.from(root.querySelectorAll<HTMLElement>("[data-process-step]"));

        const measureNatural = () => {
            if (!alive) return;
            const cards = cardsOf();
            if (cards.length === 0) return;
            const nav = navOverlap();
            if (modeRef.current === "stack") {
                commit(sequenceFromStack(cards, nav));
                return;
            }
            if (modeRef.current === "rows") {
                const focus = nav + (window.innerHeight - nav) * 0.46;
                commit(sequenceFromRows(rowBands(groupRows(cards)), focus, nav));
            }
        };

        const createPin = (target: HTMLElement) => {
            destroyPin();
            gsap.registerPlugin(ScrollTrigger);
            const count = cardsOf().length;
            if (count === 0) return;
            trigger = ScrollTrigger.create({
                trigger: target,
                start: () => `top ${Math.round(navOverlap()) + 12}px`,
                end: () => `+=${Math.round(Math.min(window.innerHeight * 0.7, 680))}`,
                pin: true,
                pinSpacing: true,
                anticipatePin: 1,
                invalidateOnRefresh: true,
                onToggle: (self) => {
                    if (self.isActive) return;
                    commit(self.progress > 0 ? sequenceOf(-1, true) : sequenceOf(-1, false));
                },
                onUpdate: (self) => {
                    if (!self.isActive) {
                        commit(self.progress > 0 ? sequenceOf(-1, true) : sequenceOf(-1, false));
                        return;
                    }
                    const index = Math.min(count - 1, Math.floor(self.progress * count * 0.999999));
                    commit(sequenceOf(index, false));
                },
            });
        };

        const applyMode = () => {
            if (!alive) return;
            if (reduce.matches) {
                destroyPin();
                setMotionOn(false);
                setMode("static");
                commit(sequenceOf(-1, false));
                return;
            }

            const cards = cardsOf();
            setMotionOn(true);
            if (cards.length === 0) return;

            const rows = groupRows(cards);
            const stacked = window.innerWidth <= STACK_MAX || rows.every((row) => row.length === 1);
            if (stacked) {
                destroyPin();
                setMode("stack");
                measureNatural();
                return;
            }

            const target = sequenceRoot(root);
            const available = window.innerHeight - navOverlap() - 24;
            const fits = window.innerWidth >= DESKTOP_MIN && target.offsetHeight > 0 && target.offsetHeight <= available;
            if (fits) {
                setMode("pin");
                if (trigger) ScrollTrigger.refresh();
                else createPin(target);
                return;
            }

            destroyPin();
            setMode("rows");
            measureNatural();
        };

        const onScroll = () => {
            if (modeRef.current === "pin" || modeRef.current === "static") return;
            if (ticking) return;
            ticking = true;
            frame = window.requestAnimationFrame(() => {
                ticking = false;
                measureNatural();
            });
        };

        const onResize = () => {
            window.cancelAnimationFrame(frame);
            ticking = false;
            frame = window.requestAnimationFrame(applyMode);
        };

        applyMode();
        window.addEventListener("scroll", onScroll, { passive: true, capture: true });
        window.addEventListener("resize", onResize);
        window.visualViewport?.addEventListener("resize", onResize);
        reduce.addEventListener("change", applyMode);
        const fonts = document.fonts?.ready.then(() => {
            if (alive) applyMode();
        });
        void fonts;

        return () => {
            alive = false;
            window.cancelAnimationFrame(frame);
            window.removeEventListener("scroll", onScroll, { capture: true });
            window.removeEventListener("resize", onResize);
            window.visualViewport?.removeEventListener("resize", onResize);
            reduce.removeEventListener("change", applyMode);
            destroyPin();
        };
    }, [rootRef]);

    return { motionOn, mode, active: sequence.active, completeAll: sequence.completeAll };
};

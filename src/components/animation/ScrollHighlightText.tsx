import { createElement, useLayoutEffect, useMemo, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

type Tag = "p" | "h1" | "h2" | "h3" | "div";

export type ScrollHighlightTextProps = {
    text: string;
    dim?: number;
    blur?: number;
    start?: string;
    end?: string;
    scroller?: Element | string;
    trigger?: Element | string | null;
    as?: Tag;
    className?: string;
};

const ScrollHighlightText = ({
    text,
    dim = 0.15,
    blur = 0,
    start = "top 80%",
    end = "bottom 45%",
    scroller,
    trigger,
    as = "p",
    className = "",
}: ScrollHighlightTextProps) => {
    const rootRef = useRef<HTMLElement | null>(null);
    const words = useMemo(() => text.trim().split(/\s+/).filter(Boolean), [text]);

    useLayoutEffect(() => {
        const root = rootRef.current;
        if (!root) return;

        const wordEls = Array.from(root.querySelectorAll<HTMLElement>("[data-scroll-word]"));
        if (!wordEls.length) return;

        const reduced =
            typeof window !== "undefined" &&
            window.matchMedia("(prefers-reduced-motion: reduce)").matches;

        if (reduced) {
            gsap.set(wordEls, { opacity: 1, filter: "none" });
            return;
        }

        gsap.registerPlugin(ScrollTrigger);

        const ctx = gsap.context(() => {
            gsap.set(wordEls, {
                opacity: dim,
                filter: blur > 0 ? `blur(${blur}px)` : "none",
            });

            gsap.to(wordEls, {
                opacity: 1,
                filter: "blur(0px)",
                ease: "none",
                stagger: 0.12,
                scrollTrigger: {
                    trigger: trigger || root,
                    start,
                    end,
                    scrub: true,
                    ...(scroller ? { scroller } : {}),
                },
            });
        }, root);

        const frame = requestAnimationFrame(() => ScrollTrigger.refresh());

        return () => {
            cancelAnimationFrame(frame);
            ctx.revert();
        };
    }, [blur, dim, end, scroller, start, trigger, words]);

    return createElement(
        as,
        {
            ref: rootRef,
            className: `scroll-highlight-text${className ? ` ${className}` : ""}`,
        },
        words.map((word, index) => (
            <span key={`${word}-${index}`}>
                <span className="scroll-highlight-text__word" data-scroll-word="">
                    {word}
                </span>
                {index < words.length - 1 ? " " : null}
            </span>
        ))
    );
};

export default ScrollHighlightText;

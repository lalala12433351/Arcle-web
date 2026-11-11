import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { gsap } from "gsap";

const TARGET_SELECTOR = ".cursor-target";

const CursorEffect = () => {
    const cursorRef = useRef<HTMLDivElement | null>(null);
    const followerRef = useRef<HTMLDivElement | null>(null);

    const posX = useRef(0);
    const posY = useRef(0);
    const mouseX = useRef(0);
    const mouseY = useRef(0);

    useEffect(() => {
        const cursor = cursorRef.current;
        const follower = followerRef.current;

        if (!cursor || !follower) return;

        const finePointer = window.matchMedia("(hover: hover) and (pointer: fine) and (min-width: 1024px)");
        const root = document.documentElement;
        let tracking = false;
        const syncNativeCursor = () => {
            root.classList.toggle("arcle-custom-cursor", tracking && finePointer.matches);
        };
        finePointer.addEventListener("change", syncNativeCursor);

        const moveCursor = (e: MouseEvent) => {
            mouseX.current = e.clientX;
            mouseY.current = e.clientY;
            if (tracking) return;
            tracking = true;
            posX.current = e.clientX;
            posY.current = e.clientY;
            cursor.parentElement?.classList.add("is-ready");
            syncNativeCursor();
        };

        let frame = 0;
        const animateFollower = () => {
            posX.current += (mouseX.current - posX.current) / 9;
            posY.current += (mouseY.current - posY.current) / 9;

            gsap.set(follower, { left: posX.current - 20, top: posY.current - 20 });
            gsap.set(cursor, { left: mouseX.current, top: mouseY.current });

            frame = requestAnimationFrame(animateFollower);
        };

        const setActive = (active: boolean) => {
            cursor.classList.toggle("active", active);
            follower.classList.toggle("active", active);
        };

        // Delegated so hover targets on any page (and ones mounted after route changes) work.
        const onOver = (e: MouseEvent) => {
            if ((e.target as Element | null)?.closest?.(TARGET_SELECTOR)) setActive(true);
        };
        const onOut = (e: MouseEvent) => {
            const from = (e.target as Element | null)?.closest?.(TARGET_SELECTOR);
            if (!from) return;
            const to = (e.relatedTarget as Element | null)?.closest?.(TARGET_SELECTOR);
            if (to !== from) setActive(!!to);
        };

        document.addEventListener("mousemove", moveCursor);
        document.addEventListener("mouseover", onOver);
        document.addEventListener("mouseout", onOut);
        frame = requestAnimationFrame(animateFollower);

        return () => {
            cancelAnimationFrame(frame);
            document.removeEventListener("mousemove", moveCursor);
            document.removeEventListener("mouseover", onOver);
            document.removeEventListener("mouseout", onOut);
            finePointer.removeEventListener("change", syncNativeCursor);
            root.classList.remove("arcle-custom-cursor");
        };
    }, []);

    return createPortal(
        <div className="cursor-hover-parent">
            <div className="cursor" ref={cursorRef} />
            <div className="cursor-follower" ref={followerRef} />
        </div>,
        document.body
    );
};

export default CursorEffect;

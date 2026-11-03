import { createContext, useCallback, useContext, useLayoutEffect, useState, type ReactNode } from "react";
import { useLocation } from "react-router-dom";

const PageReadyContext = createContext<() => (() => void) | void>(() => {});

const prefersReducedMotion = () =>
    typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/**
 * Holds the cover until the routed page has actually mounted.
 * Home is eager, so it used to animate immediately; lazy pages
 * finished the animation on an empty fallback and then popped in.
 */
const PageOpen = ({ children }: { children: ReactNode }) => {
    const { pathname } = useLocation();
    const [covered, setCovered] = useState(() => !prefersReducedMotion());

    useLayoutEffect(() => {
        if (prefersReducedMotion()) {
            setCovered(false);
            return;
        }
        setCovered(true);
    }, [pathname]);

    const ready = useCallback(() => {
        if (prefersReducedMotion()) {
            setCovered(false);
            return;
        }
        let frame = 0;
        const reveal = requestAnimationFrame(() => {
            frame = requestAnimationFrame(() => setCovered(false));
        });
        return () => {
            cancelAnimationFrame(reveal);
            cancelAnimationFrame(frame);
        };
    }, []);

    return (
        <PageReadyContext.Provider value={ready}>
            {children}
            <div className={`page-open-curtain${covered ? " is-covered" : ""}`} aria-hidden="true" />
        </PageReadyContext.Provider>
    );
};

/** Wraps the resolved route so the fade starts with the real page. */
export const PageOpenView = ({ children }: { children: ReactNode }) => {
    const ready = useContext(PageReadyContext);

    useLayoutEffect(() => {
        const cancel = ready();
        return () => {
            cancel?.();
        };
    }, [ready]);

    return <div className="page-open-view">{children}</div>;
};

export default PageOpen;

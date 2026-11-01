import { useLayoutEffect } from 'react';
import { useLocation } from 'react-router-dom';

if (typeof history !== "undefined" && "scrollRestoration" in history) {
    history.scrollRestoration = "manual";
}

/** Jump to the top immediately. The site stylesheet uses smooth scrolling, which would animate this from the previous page's offset. */
export function scrollWindowToTop() {
    const html = document.documentElement;
    const previous = html.style.scrollBehavior;
    html.style.scrollBehavior = "auto";
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    html.scrollTop = 0;
    document.body.scrollTop = 0;
    html.style.scrollBehavior = previous;
}

const RoutesScrollToTop = () => {
    const { pathname } = useLocation();

    useLayoutEffect(() => {
        if ("scrollRestoration" in history) history.scrollRestoration = "manual";
        scrollWindowToTop();
    }, [pathname]);

    // Return null since this component does not need to render anything
    return null;
}

export default RoutesScrollToTop;
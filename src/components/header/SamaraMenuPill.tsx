import { useCallback, useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";

const LINKS = [
    { to: "/services", label: "Services" },
    { to: "/project", label: "Work" },
    { to: "/contact-us", label: "Contact" },
] as const;

interface Indicator {
    left: number;
    width: number;
    visible: boolean;
}

const SamaraMenuPill = () => {
    const location = useLocation();
    const pillRef = useRef<HTMLDivElement>(null);
    const linkRefs = useRef<(HTMLAnchorElement | null)[]>([]);
    const [indicator, setIndicator] = useState<Indicator>({
        left: 0,
        width: 0,
        visible: false,
    });

    const moveTo = useCallback((el: HTMLElement | null, visible: boolean) => {
        const pill = pillRef.current;
        if (!pill || !el) {
            setIndicator((prev) => ({ ...prev, visible: false }));
            return;
        }
        const pillBox = pill.getBoundingClientRect();
        const linkBox = el.getBoundingClientRect();
        setIndicator({
            left: linkBox.left - pillBox.left,
            width: linkBox.width,
            visible,
        });
    }, []);

    const activeIndex = LINKS.findIndex((link) =>
        location.pathname === link.to || location.pathname.startsWith(`${link.to}/`)
    );

    useEffect(() => {
        if (activeIndex >= 0) {
            moveTo(linkRefs.current[activeIndex], true);
        } else {
            setIndicator((prev) => ({ ...prev, visible: false }));
        }
    }, [activeIndex, location.pathname, moveTo]);

    return (
        <div
            ref={pillRef}
            className="arcle-samara-pill"
            role="navigation"
            aria-label="Primary"
            onMouseLeave={() => {
                if (activeIndex >= 0) {
                    moveTo(linkRefs.current[activeIndex], true);
                } else {
                    setIndicator((prev) => ({ ...prev, visible: false }));
                }
            }}
        >
            <div
                className="arcle-samara-pill__indicator"
                aria-hidden="true"
                style={{
                    transform: `translateX(${indicator.left}px)`,
                    width: indicator.width,
                    opacity: indicator.visible ? 1 : 0,
                }}
            />
            {LINKS.map((link, index) => (
                <Link
                    key={link.to}
                    ref={(node) => {
                        linkRefs.current[index] = node;
                    }}
                    to={link.to}
                    className={`arcle-samara-pill__link${activeIndex === index ? " is-current" : ""}`}
                    onMouseEnter={(event) => moveTo(event.currentTarget, true)}
                    onFocus={(event) => moveTo(event.currentTarget, true)}
                >
                    {link.label}
                </Link>
            ))}
        </div>
    );
};

export default SamaraMenuPill;

import { useLayoutEffect, useRef, useState } from "react";
import SplitText from "../animation/SplitText.jsx"
import LineSidebar from "../LineSidebar.jsx"
import CursorGrid from "../CursorGrid.jsx"
import { useSiteTheme } from "../../hooks/useSiteTheme";

interface DataType {
    sectionClass?: string
}

const STEPS = [
    {
        title: "Discover",
        text: "We study your business, customers, competitors and margins to understand what growth really means for you.",
    },
    {
        title: "Map",
        text: "We trace how your customers find, compare and choose, from the first search to the final purchase.",
    },
    {
        title: "Plan",
        text: "We pick the right channels, set a realistic budget and agree on clear targets for leads and sales.",
    },
    {
        title: "Measure",
        text: "Live dashboards and monthly reviews show what’s working, so we can scale results with confidence.",
    },
];

const AboutV7 = ({ sectionClass }: DataType) => {
    const isDark = useSiteTheme();
    const sectionRef = useRef<HTMLDivElement | null>(null);
    const stepRefs = useRef<(HTMLDivElement | null)[]>([]);
    const railRef = useRef<HTMLDivElement | null>(null);
    const rocketRef = useRef<HTMLSpanElement | null>(null);
    const [active, setActive] = useState(0);

    useLayoutEffect(() => {
        let frame = 0;
        const update = () => {
            frame = 0;
            const line = window.innerHeight * 0.5;
            const wide = window.innerWidth >= 992;
            const tops: number[] = [];
            let next = 0;
            stepRefs.current.forEach((el, index) => {
                if (!el) return;
                const top = el.getBoundingClientRect().top;
                tops[index] = top;
                if (top <= line) next = index;
            });
            setActive((prev) => (prev === next ? prev : next));

            const rocket = rocketRef.current;
            const rail = railRef.current;
            if (!wide || tops.length < 2) {
                rocket?.classList.remove("is-ready");
                stepRefs.current.forEach((el) => {
                    const body = el?.querySelector<HTMLElement>(".strategy-step-body");
                    if (!body) return;
                    body.style.transform = "";
                    body.style.opacity = "";
                    body.style.pointerEvents = "";
                    delete body.dataset.offset;
                });
                return;
            }
            if (!rocket || !rail) return;

            let progress = 0;
            const last = tops.length - 1;
            if (line > tops[0]) {
                progress = last;
                for (let i = 0; i < last; i++) {
                    const start = tops[i];
                    const end = tops[i + 1];
                    if (line < end) {
                        const span = end - start;
                        const t = span > 0 ? (line - start) / span : 0;
                        const hold = 0.7;
                        const travel = t <= hold ? 0 : (t - hold) / (1 - hold);
                        const eased = travel * travel * (3 - 2 * travel);
                        progress = i + eased;
                        break;
                    }
                }
            }

            const nav = rail.querySelector<HTMLElement>(".line-sidebar");
            const items = rail.querySelectorAll<HTMLElement>(".line-sidebar__item");
            const labels = rail.querySelectorAll<HTMLElement>(".line-sidebar__label");
            if (!nav || !items.length || labels.length !== tops.length) return;
            const centers = Array.from(items, (el) => nav.offsetTop + el.offsetTop + el.offsetHeight / 2);
            const index = Math.min(Math.floor(progress), centers.length - 1);
            const fraction = progress - index;
            const from = centers[index];
            const to = centers[Math.min(index + 1, centers.length - 1)];
            const y = from + (to - from) * fraction;

            let labelRight = 0;
            const labelCenters: number[] = [];
            labels.forEach((label) => {
                const rect = label.getBoundingClientRect();
                labelCenters.push(rect.top + rect.height / 2);
                labelRight = Math.max(labelRight, rect.right);
            });

            let copyLeft = 0;
            stepRefs.current.forEach((el, stepIndex) => {
                const body = el?.querySelector<HTMLElement>(".strategy-step-body");
                const heading = body?.querySelector("h3");
                if (!body || !heading) return;
                const applied = Number(body.dataset.offset || 0);
                const rect = heading.getBoundingClientRect();
                const offset = labelCenters[stepIndex] - (rect.top + rect.height / 2 - applied);
                body.dataset.offset = String(offset);
                const visible = stepIndex === next;
                body.style.transform = `translate3d(0, ${offset}px, 0)`;
                body.style.opacity = visible ? "1" : "0";
                body.style.pointerEvents = visible ? "auto" : "none";
                if (stepIndex === next) copyLeft = el.getBoundingClientRect().left;
            });

            const railRect = rail.getBoundingClientRect();
            const mid = copyLeft > labelRight ? (labelRight + copyLeft) / 2 : labelRight + 48;
            rocket.style.left = `${mid - railRect.left}px`;
            rocket.style.transform = `translate3d(-50%, ${y}px, 0) translateY(-50%)`;
            rocket.classList.add("is-ready");
        };
        const onScroll = () => {
            if (!frame) frame = requestAnimationFrame(update);
        };
        update();
        window.addEventListener("scroll", onScroll, { passive: true });
        window.addEventListener("resize", onScroll);
        document.fonts?.ready.then(update);
        return () => {
            window.removeEventListener("scroll", onScroll);
            window.removeEventListener("resize", onScroll);
            if (frame) cancelAnimationFrame(frame);
        };
    }, []);

    const scrollToStep = (index: number) => {
        stepRefs.current[index]?.scrollIntoView({ behavior: "smooth", block: "center" });
    };

    return (
        <>
            <style>{`
                .strategy-before {
                    position: relative;
                    isolation: isolate;
                }
                .strategy-cursor-grid {
                    position: absolute;
                    inset: 0;
                    z-index: 0;
                    pointer-events: none;
                }
                .strategy-before .container {
                    position: relative;
                    z-index: 1;
                }
                .strategy-steps-sticky {
                    position: sticky;
                    top: 140px;
                }
                .strategy-steps-sidebar {
                    margin: 30px 0;
                }
                .strategy-rail {
                    position: relative;
                }
                .strategy-rocket {
                    position: absolute;
                    top: 0;
                    left: 0;
                    z-index: 2;
                    display: block;
                    width: 36px;
                    height: 58px;
                    pointer-events: none;
                    opacity: 0;
                }
                .strategy-rocket.is-ready {
                    opacity: 1;
                }
                .strategy-rocket__flame {
                    transform-box: fill-box;
                    transform-origin: center bottom;
                    animation: strategy-rocket-flame 420ms ease-in-out infinite alternate;
                }
                @keyframes strategy-rocket-flame {
                    from { opacity: 0.45; transform: scaleY(0.82); }
                    to { opacity: 1; transform: scaleY(1); }
                }
                @media (prefers-reduced-motion: reduce) {
                    .strategy-rocket__flame {
                        animation: none;
                    }
                }
                .strategy-step {
                    min-height: 45vh;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    padding: 40px 0;
                }
                .strategy-step-body {
                    opacity: 0;
                }
                .strategy-step-index {
                    display: block;
                    margin-bottom: 12px;
                    font-weight: 600;
                    color: #236BFF;
                }
                .strategy-step h3 {
                    margin-bottom: 16px;
                }
                .strategy-step p {
                    margin: 0;
                    max-width: 34rem;
                    font-size: 18px;
                }
                @media (max-width: 991px) {
                    .strategy-steps-sticky {
                        position: static;
                    }
                    .strategy-steps-sidebar,
                    .strategy-rocket {
                        display: none;
                    }
                    .strategy-step {
                        min-height: 0;
                    }
                    .strategy-step-body {
                        opacity: 1;
                        transform: none;
                    }
                }
            `}</style>
            <div ref={sectionRef} className={`about-style-seven-area default-padding strategy-before ${sectionClass ? sectionClass : ""}`}>
                <CursorGrid
                    className="strategy-cursor-grid"
                    lightMode={!isDark}
                    color="#236BFF"
                    gridColor={isDark ? "#f4f4f5" : "#18181b"}
                    cellSize={72}
                    radius={180}
                    gridOpacity={isDark ? 0.16 : 0.12}
                    fillOpacity={0.08}
                    maxOpacity={0.9}
                    spotlight={0.5}
                    edgeFade={0.16}
                />
                <div className="container">
                    <div className="row">
                        <div className="col-lg-5">
                            <div className="strategy-steps-sticky">
                                <h2 className="title">
                                    <SplitText
                                        delay={20}
                                        animationFrom={{ opacity: 0, transform: 'translate3d(0,50px,0)' }}
                                        animationTo={{ opacity: 1, transform: 'translate3d(0,0,0)' }}
                                        easing="easeOutCubic"
                                        threshold={0.2}
                                        rootMargin="-50px"
                                    >
                                        Strategy Before Spending
                                    </SplitText>
                                </h2>
                                <div className="strategy-rail" ref={railRef}>
                                    <span ref={rocketRef} className="strategy-rocket" aria-hidden="true">
                                        <svg viewBox="0 0 20 32" width="36" height="58" fill="none">
                                            <path
                                                className="strategy-rocket__flame"
                                                d="M10 1c1.15 2.2.15 3.7-1.05 4.75 1.55.35 2.85 1.65 2.85 3.15-1.15-.75-2.05-.4-2.8.35-.75-.75-1.65-1.1-2.8-.35 0-1.5 1.3-2.8 2.85-3.15C9.85 4.7 8.85 3.2 10 1z"
                                                fill="#7EAEFF"
                                            />
                                            <path d="M7.15 16.2 2.4 20.7c1.45.25 2.95-.45 3.9-1.55l.85-2.95z" fill="#236BFF" />
                                            <path d="M12.85 16.2 17.6 20.7c-1.45.25-2.95-.45-3.9-1.55l-.85-2.95z" fill="#236BFF" />
                                            <path d="M10 30.4c-2.15-3.5-3.15-6.05-3.15-8V13.8c0-3.35 1.4-6.25 3.15-8 1.75 1.75 3.15 4.65 3.15 8v8.6c0 1.95-1 4.5-3.15 8z" fill="#236BFF" />
                                            <circle cx="10" cy="16.15" r="1.3" fill="#fff" />
                                        </svg>
                                    </span>
                                    <LineSidebar
                                        className="strategy-steps-sidebar"
                                        items={STEPS.map((step) => step.title)}
                                        activeIndex={active}
                                        defaultActive={0}
                                        onItemClick={scrollToStep}
                                        accentColor="#236BFF"
                                        textColor="var(--color-paragraph)"
                                        markerColor="var(--color-paragraph)"
                                        fontSize={1.4}
                                        itemGap={28}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-7 pl-80 pl-md-15 pl-xs-15">
                            {STEPS.map((step, index) => (
                                <div
                                    key={step.title}
                                    ref={(el) => { stepRefs.current[index] = el; }}
                                    className={`strategy-step${active === index ? " is-active" : ""}`}
                                >
                                    <div className="strategy-step-body">
                                        <span className="strategy-step-index">{String(index + 1).padStart(2, "0")}</span>
                                        <h3>{step.title}</h3>
                                        <p>{step.text}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AboutV7;

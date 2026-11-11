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
        let lastY = Number.NaN;
        let pointingUp = false;
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
                const transform = getComputedStyle(label).transform;
                const match = transform && transform !== "none" ? transform.match(/matrix\(([^)]+)\)/) : null;
                const shift = match ? Number(match[1].split(",")[4]) || 0 : 0;
                labelRight = Math.max(labelRight, rect.right - shift);
            });

            const column = stepRefs.current.find(Boolean)?.parentElement;
            const copyLeft = column ? column.getBoundingClientRect().left : 0;
            stepRefs.current.forEach((el, stepIndex) => {
                if (!el) return;
                const body = el.querySelector<HTMLElement>(".strategy-step-body");
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
            });

            const railRect = rail.getBoundingClientRect();
            const mid = copyLeft > labelRight ? (labelRight + copyLeft) / 2 : labelRight + 48;
            if (Number.isNaN(lastY)) lastY = y;
            else if (y < lastY - 0.4) {
                pointingUp = true;
                lastY = y;
            } else if (y > lastY + 0.4) {
                pointingUp = false;
                lastY = y;
            }
            rocket.style.left = `${mid - railRect.left}px`;
            rocket.style.transform = `translate3d(-50%, ${y}px, 0) translateY(-50%)`;
            rocket.classList.toggle("is-up", pointingUp);
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
                    width: 40px;
                    height: 60px;
                    pointer-events: none;
                    opacity: 0;
                }
                .strategy-rocket.is-ready {
                    opacity: 1;
                }
                .strategy-rocket__craft {
                    display: block;
                    width: 100%;
                    height: 100%;
                    transform-origin: center center;
                    transition: transform 320ms ease;
                }
                .strategy-rocket.is-up .strategy-rocket__craft {
                    transform: rotate(180deg);
                }
                .strategy-rocket__flame {
                    transform-box: fill-box;
                    transform-origin: center bottom;
                    animation: strategy-rocket-flame 420ms ease-in-out infinite alternate;
                }
                .strategy-rocket__core {
                    animation-duration: 260ms;
                    animation-direction: alternate-reverse;
                }
                @keyframes strategy-rocket-flame {
                    from { opacity: 0.55; transform: scaleY(0.78); }
                    to { opacity: 1; transform: scaleY(1); }
                }
                @media (prefers-reduced-motion: reduce) {
                    .strategy-rocket__flame,
                    .strategy-rocket__craft {
                        animation: none;
                        transition: none;
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
                .strategy-before .title .split-parent > span:first-child {
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
                                        Clarity Before Spending
                                    </SplitText>
                                </h2>
                                <div className="strategy-rail" ref={railRef}>
                                    <span ref={rocketRef} className="strategy-rocket" aria-hidden="true">
                                        <span className="strategy-rocket__craft">
                                        <svg viewBox="0 0 48 72" width="40" height="60" fill="none">
                                            <path
                                                className="strategy-rocket__flame"
                                                d="M24 3 27.2 14 31 9.5 28.6 18 32.5 24 H15.5 L19.4 18 17 9.5 20.8 14Z"
                                                fill="#8EBCFF"
                                            />
                                            <path
                                                className="strategy-rocket__flame strategy-rocket__core"
                                                d="M24 9.5 25.8 16 28 13.2 26.6 18.2 29 23 H19 L21.4 18.2 20 13.2 22.2 16Z"
                                                fill="#F7FAFF"
                                            />
                                            <path d="M16 30 6.5 22 9 36 16 38Z" fill="#184EBE" />
                                            <path d="M32 30 41.5 22 39 36 32 38Z" fill="#184EBE" />
                                            <path d="M17.5 26 H30.5 C32.4 26 33.5 28 33.5 30.2 V44 L24 66 14.5 44 V30.2 C14.5 28 15.6 26 17.5 26Z" fill="#236BFF" />
                                            <path d="M16.2 24.2 H31.8 C32.6 24.2 33 25.2 33 26.2 33 28 29.2 29.2 24 29.2 18.8 29.2 15 28 15 26.2 15 25.2 15.4 24.2 16.2 24.2Z" fill="#184EBE" />
                                            <path d="M24 66 19.2 50 H28.8Z" fill="#4E92FF" />
                                            <circle cx="24" cy="40" r="4.2" fill="#fff" />
                                            <circle cx="24" cy="40" r="2" fill="#7EAEFF" />
                                        </svg>
                                        </span>
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

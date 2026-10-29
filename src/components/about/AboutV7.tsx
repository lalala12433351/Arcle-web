import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
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
    const stepRefs = useRef<(HTMLDivElement | null)[]>([]);
    const [active, setActive] = useState(0);

    useEffect(() => {
        let frame = 0;
        const update = () => {
            frame = 0;
            const line = window.innerHeight * 0.5;
            let next = 0;
            stepRefs.current.forEach((el, index) => {
                if (el && el.getBoundingClientRect().top <= line) next = index;
            });
            setActive(next);
        };
        const onScroll = () => {
            if (!frame) frame = requestAnimationFrame(update);
        };
        update();
        window.addEventListener("scroll", onScroll, { passive: true });
        window.addEventListener("resize", onScroll);
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
                .strategy-step {
                    min-height: 45vh;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    padding: 40px 0;
                    border-bottom: 1px solid rgba(127, 127, 127, 0.2);
                    opacity: 0.35;
                    transition: opacity 0.4s ease;
                }
                .strategy-step:last-child {
                    border-bottom: 0;
                }
                .strategy-step.is-active {
                    opacity: 1;
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
                    .strategy-steps-sidebar {
                        display: none;
                    }
                    .strategy-step {
                        min-height: 0;
                        opacity: 1;
                    }
                }
            `}</style>
            <div className={`about-style-seven-area default-padding strategy-before ${sectionClass ? sectionClass : ""}`}>
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
                                <Link className="btn-animation mt-10" to="/about-2">
                                    <i className="fas fa-arrow-right" /> <span>Know More</span>
                                </Link>
                            </div>
                        </div>
                        <div className="col-lg-7 pl-80 pl-md-15 pl-xs-15">
                            {STEPS.map((step, index) => (
                                <div
                                    key={step.title}
                                    ref={(el) => { stepRefs.current[index] = el; }}
                                    className={`strategy-step${active === index ? " is-active" : ""}`}
                                >
                                    <span className="strategy-step-index">{String(index + 1).padStart(2, "0")}</span>
                                    <h3>{step.title}</h3>
                                    <p>{step.text}</p>
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

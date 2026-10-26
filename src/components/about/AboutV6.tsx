import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import ServiceListData from "@/assets/jsonData/services/ServiceListData.json";
import { DiagonalCarousel, type DiagonalCarouselItem } from "@/components/ui/diagonal-carousel";

interface DataType {
    sectionClass?: string;
}

const VERTICAL_COPY =
    "As a digital marketing and technology company in Bangalore, we bring marketers, SEO specialists, designers, writers and developers together as one team, with one plan and shared goals, so your marketing and technology work in the same direction.";

const carouselItems: DiagonalCarouselItem[] = ServiceListData.map((service) => ({
    src: service.serviceName,
    title: service.serviceName,
    alt: service.serviceName,
}));

const AboutV6 = ({ sectionClass }: DataType) => {
    const stageRef = useRef<HTMLDivElement>(null);
    const [slideSize, setSlideSize] = useState(240);

    useEffect(() => {
        const node = stageRef.current;
        if (!node) return;

        const update = () => {
            const width = node.clientWidth;
            if (!width) return;
            const next = Math.round(Math.min(176, Math.max(118, width * 0.18)));
            setSlideSize((current) => (current === next ? current : next));
        };

        update();
        const observer = new ResizeObserver(update);
        observer.observe(node);
        return () => observer.disconnect();
    }, []);

    return (
        <section className={`one-team-section ${sectionClass ? sectionClass : ""}`}>
            <style>{`
                .one-team-section {
                    overflow-x: clip;
                }
                .one-team {
                    display: grid;
                    grid-template-columns: minmax(168px, 230px) minmax(0, 1fr);
                    gap: 12px 28px;
                    align-items: stretch;
                    min-height: 780px;
                }
                .one-team-rail {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    min-height: 100%;
                }
                .one-team-rail p {
                    writing-mode: vertical-rl;
                    transform: rotate(180deg);
                    max-height: 700px;
                    margin: 0;
                    font-family: var(--font-default);
                    font-size: 16px;
                    font-weight: 500;
                    line-height: 1.65;
                    letter-spacing: 0.01em;
                    color: var(--color-paragraph);
                }
                .bg-dark .one-team-rail p {
                    color: rgba(255, 255, 255, 0.84);
                }
                .one-team-main {
                    display: flex;
                    flex-direction: column;
                    min-width: 0;
                    padding-top: 12px;
                }
                .one-team-lockup {
                    display: flex;
                    align-items: flex-start;
                    gap: 22px;
                    margin-bottom: 8px;
                }
                .one-team-mark {
                    flex: 0 0 auto;
                    width: 74px;
                    height: 92px;
                    margin-top: 8px;
                    color: var(--color-heading);
                }
                .bg-dark .one-team-mark {
                    color: #fff;
                }
                .one-team-title {
                    margin: 0;
                    font-family: var(--font-heading);
                    font-size: clamp(48px, 5.6vw, 86px);
                    font-weight: 700;
                    line-height: 0.88;
                    letter-spacing: -0.04em;
                    text-transform: uppercase;
                    color: var(--color-heading);
                }
                .bg-dark .one-team-title {
                    color: #fff;
                }
                .one-team-stage {
                    position: relative;
                    flex: 1 1 auto;
                    min-height: 640px;
                    overflow: clip;
                }
                .one-team-card {
                    position: relative;
                    display: flex;
                    flex-direction: column;
                    justify-content: space-between;
                    width: 100%;
                    height: 100%;
                    padding: 22px 20px 18px;
                    border: 1px solid rgba(4, 0, 11, 0.14);
                    border-radius: 26px;
                    background: linear-gradient(180deg, #ffffff 0%, #f3f4f1 100%);
                    color: var(--color-heading);
                    text-align: left;
                    text-decoration: none;
                    font: inherit;
                    cursor: pointer;
                    transform: translateZ(12px);
                    transform-style: preserve-3d;
                    box-shadow:
                        0 18px 30px rgba(4, 0, 11, 0.16),
                        0 2px 0 rgba(255, 255, 255, 0.8) inset;
                }
                .one-team-card::before {
                    content: "";
                    position: absolute;
                    inset: 8px -10px -14px 10px;
                    z-index: -1;
                    border-radius: 26px;
                    background: linear-gradient(160deg, #c8c8c2, #9a9a94);
                    transform: translateZ(-22px);
                }
                .bg-dark .one-team-card {
                    border-color: rgba(255, 255, 255, 0.22);
                    background: linear-gradient(180deg, #2a2e36 0%, #17191d 100%);
                    color: #fff;
                    box-shadow:
                        0 24px 40px rgba(0, 0, 0, 0.45),
                        0 1px 0 rgba(255, 255, 255, 0.16) inset;
                }
                .bg-dark .one-team-card::before {
                    background: linear-gradient(160deg, #3a3e46, #050607);
                }
                .one-team-card.is-active {
                    border-color: transparent;
                    background: linear-gradient(180deg, #4d86ff 0%, #236bff 55%, #1546c8 100%);
                    color: #fff;
                    box-shadow:
                        0 40px 64px rgba(35, 107, 255, 0.48),
                        0 18px 30px rgba(0, 0, 0, 0.32);
                }
                .one-team-card.is-active::before {
                    background: #123a9a;
                }
                .one-team-card:hover,
                .one-team-card:focus-visible {
                    color: #fff;
                    text-decoration: none;
                }
                .bg-dark .one-team-card:hover,
                .bg-dark .one-team-card:focus-visible,
                .one-team-card.is-active:hover {
                    color: #fff;
                }
                .one-team-card:not(.is-active):hover {
                    color: var(--color-heading);
                }
                .bg-dark .one-team-card:not(.is-active):hover {
                    color: #fff;
                }
                .one-team-card-index {
                    display: inline-flex;
                    align-items: center;
                    justify-content: center;
                    width: 46px;
                    height: 46px;
                    border-radius: 50%;
                    background: #2a2d32;
                    color: #fff;
                    font-size: 13px;
                    font-weight: 700;
                    letter-spacing: 0.04em;
                }
                .one-team-card-name {
                    display: block;
                    font-family: var(--font-heading);
                    font-size: clamp(26px, 2vw, 34px);
                    font-weight: 600;
                    line-height: 1;
                    text-transform: capitalize;
                }
                .one-team-card-arrow {
                    position: absolute;
                    right: 18px;
                    bottom: 18px;
                    opacity: 0.85;
                }
                @media (max-width: 991px) {
                    .one-team {
                        grid-template-columns: 1fr;
                        min-height: 0;
                        gap: 28px;
                    }
                    .one-team-rail {
                        justify-content: flex-start;
                    }
                    .one-team-rail p {
                        writing-mode: horizontal-tb;
                        transform: none;
                        max-height: none;
                        max-width: 42rem;
                    }
                    .one-team-stage {
                        min-height: 500px;
                    }
                }
                @media (max-width: 575px) {
                    .one-team-mark {
                        width: 48px;
                        height: 60px;
                    }
                    .one-team-stage {
                        min-height: 430px;
                    }
                }
            `}</style>
            <div className="container">
                <div className="one-team">
                    <div className="one-team-rail">
                        <p>{VERTICAL_COPY}</p>
                    </div>
                    <div className="one-team-main">
                        <div className="one-team-lockup">
                            <svg className="one-team-mark" viewBox="0 0 74 92" fill="none" aria-hidden="true">
                                <path d="M8 10h28L22 46h24" stroke="currentColor" strokeWidth="3" />
                                <path d="M26 28h28L40 64h24" stroke="currentColor" strokeWidth="3" />
                            </svg>
                            <h2 className="one-team-title">
                                Growth<br />
                                Starts With<br />
                                One Team
                            </h2>
                        </div>
                        <div className="one-team-stage" ref={stageRef}>
                            <DiagonalCarousel
                                items={carouselItems}
                                defaultActiveIndex={2}
                                loop
                                slideSize={slideSize}
                                rotationStep={6}
                                verticalStep={Math.round(slideSize * 0.34)}
                                inactiveScale={0.8}
                                depth={96}
                                facing={14}
                                label="Services"
                                controlsClassName="bottom-16"
                                renderSlide={(item, index, isActive) => {
                                    const service = ServiceListData[index];
                                    const card = (
                                        <>
                                            <span className="one-team-card-index">{service.count}</span>
                                            <span className="one-team-card-name">{item.title}</span>
                                            <span className="one-team-card-arrow" aria-hidden="true">
                                                <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                                                    <path d="M5 17L17 5M17 5H8M17 5v9" stroke="currentColor" strokeWidth="1.6" />
                                                </svg>
                                            </span>
                                        </>
                                    );

                                    if (isActive) {
                                        return (
                                            <Link
                                                to="/services"
                                                className="one-team-card is-active"
                                                aria-current="true"
                                            >
                                                {card}
                                            </Link>
                                        );
                                    }

                                    return (
                                        <button type="button" className="one-team-card">
                                            {card}
                                        </button>
                                    );
                                }}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AboutV6;

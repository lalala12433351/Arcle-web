import { lazy, Suspense, useLayoutEffect, useRef } from "react";
import { Helmet } from "react-helmet-async";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import "lenis/dist/lenis.css";
import FooterV1 from "../../components/footer/FooterV1";
import HeaderV1 from "../../components/header/HeaderV1";
import ThemeDark from "../../components/switcher/ThemeDark";
import AccordionGallery from "../../components/AccordionGallery";
import "../../components/videos/OfficeInteriorsVideo.css";
import "./DesignArcInteriorsPage.css";

const YouTubeBannerVideo = lazy(() => import("../../components/videos/YouTubeBannerVideo"));

const galleryItems = [
    {
        image: "/assets/client/design-arc-interiors/reviewing-execution.jpg",
        label: "Reviewing Execution",
        alt: "Site team reviewing execution on a scaffolded commercial building",
    },
    {
        image: "/assets/client/design-arc-interiors/inspecting-detail.jpg",
        label: "Inspecting Detail",
        alt: "Three site leads inspecting construction progress and quality",
    },
    {
        image: "/assets/client/design-arc-interiors/aligning-teams.jpg",
        label: "Aligning Teams",
        alt: "Project stakeholders aligning on site in front of the building",
    },
    {
        image: "/assets/client/design-arc-interiors/leading-it-company.jpg",
        label: "Bangalore IT Office",
        alt: "Reception of a 25,000 square foot IT office in Bangalore",
    },
    {
        image: "/assets/client/design-arc-interiors/generic-interiors.jpg",
        label: "Generic Interiors",
        alt: "Cafe lounge showing how generic interiors waste space and focus",
    },
];

const DesignArcInteriorsPage = () => {
    const sectionRef = useRef<HTMLElement>(null);
    const galleryRef = useRef<HTMLDivElement>(null);

    useLayoutEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        const root = document.documentElement;
        root.classList.add("design-arc-smooth");

        let lenis: Lenis | null = null;
        let tick: ((time: number) => void) | null = null;

        if (!reduced) {
            lenis = new Lenis({
                lerp: 0.08,
                smoothWheel: true,
                wheelMultiplier: 0.9,
                touchMultiplier: 1.4,
            });
            lenis.on("scroll", ScrollTrigger.update);
            const scroller = lenis;
            tick = (time: number) => scroller.raf(time * 1000);
            gsap.ticker.add(tick);
            gsap.ticker.lagSmoothing(0);
        }

        const ctx = gsap.context(() => {
            const gallery = galleryRef.current;
            if (!gallery || reduced) return;

            gsap.fromTo(
                gallery,
                { y: 72, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    ease: "none",
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "top 88%",
                        end: "top 42%",
                        scrub: 0.8,
                    },
                }
            );
        }, sectionRef);

        requestAnimationFrame(() => ScrollTrigger.refresh());

        return () => {
            ctx.revert();
            root.classList.remove("design-arc-smooth");
            if (tick) gsap.ticker.remove(tick);
            if (lenis) {
                gsap.ticker.lagSmoothing(500, 33);
                lenis.destroy();
            }
        };
    }, []);

    return (
        <>
            <Helmet>
                <title>Design Arc Interiors | Arcle</title>
                <meta name="description" content="Explore our premium interior design solutions for modern office spaces." />
                <meta property="og:title" content="Design Arc Interiors | Arcle" />
                <meta property="og:description" content="Explore our premium interior design solutions for modern office spaces." />
                <meta property="og:type" content="website" />
            </Helmet>

            <div className="smooth-scroll-container">
                <HeaderV1 />

                <section className="default-padding" style={{ paddingTop: "120px", paddingBottom: "60px" }}>
                    <div className="container">
                        <div className="row">
                            <div className="col-xl-6 offset-xl-3 col-lg-8 offset-lg-2 text-center">
                                <div className="site-heading">
                                    <h4 className="sub-title">Design Arc Interiors</h4>
                                    <h2 className="title">Premium Interior Design Solutions</h2>
                                    <p style={{ marginTop: "20px", fontSize: "16px", lineHeight: "1.6" }}>
                                        Transform your workspace with cutting-edge interior design that combines aesthetics with functionality.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <div className="design-arc-feature-media">
                    <div className="design-arc-feature-media__row">
                        <video
                            className="design-arc-feature-media__player"
                            autoPlay
                            muted
                            loop
                            controls
                            playsInline
                            preload="auto"
                            poster="/assets/client/design-arc-interiors/linkedin-office-poster.jpg"
                            aria-label="Design Arc Interiors office walkthrough"
                        >
                            <source
                                src="/assets/client/design-arc-interiors/linkedin-office.mp4"
                                type="video/mp4"
                            />
                        </video>
                        <img
                            className="design-arc-feature-media__poster"
                            src="/assets/client/design-arc-interiors/built-to-perform.jpg"
                            alt="Built to Perform. Where Purpose Meets Performance."
                        />
                    </div>
                    <img
                        className="design-arc-feature-media__below"
                        src="/assets/client/design-arc-interiors/focus-rooms.jpg"
                        alt="Two glass focus rooms with teal, orange, and yellow walls"
                    />
                </div>

                <Suspense fallback={<div style={{ height: "600px", background: "#f0f0f0" }} />}>
                    <YouTubeBannerVideo />
                </Suspense>

                <section className="default-padding bg-gray">
                    <div className="container">
                        <div className="row">
                            <div className="col-xl-8 offset-xl-2">
                                <div className="site-heading" style={{ marginBottom: "40px" }}>
                                    <h3>Why Choose Arc Interiors?</h3>
                                </div>
                                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "30px" }}>
                                    <div style={{ padding: "20px" }}>
                                        <h4 style={{ marginBottom: "10px" }}>Creative Excellence</h4>
                                        <p>Our expert designers craft innovative solutions that elevate your space and enhance productivity.</p>
                                    </div>
                                    <div style={{ padding: "20px" }}>
                                        <h4 style={{ marginBottom: "10px" }}>Sustainability Focus</h4>
                                        <p>We prioritize eco-friendly materials and sustainable design practices for a better future.</p>
                                    </div>
                                    <div style={{ padding: "20px" }}>
                                        <h4 style={{ marginBottom: "10px" }}>Client-Centric Approach</h4>
                                        <p>Your vision drives our design process. We collaborate closely to bring your ideas to life.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section ref={sectionRef} className="office-interiors-video-section" aria-label="Design Arc project gallery">
                    <div className="container">
                        <div className="office-interiors-heading">
                            <h3>Office Interiors in Action</h3>
                            <p>From site review to a finished workplace</p>
                        </div>

                        <div className="design-arc-gallery" ref={galleryRef}>
                            <AccordionGallery
                                items={galleryItems}
                                defaultIndex={3}
                                accentColor="#E1E0CC"
                                overlayColor="#0e0f11"
                                textColor="#ffffff"
                                height={620}
                                gap={12}
                                radius={16}
                                expandRatio={0.5}
                                orientation="horizontal"
                                duration={0.65}
                                parallax={0.45}
                                tilt={6}
                                trigger="hover"
                                showLabels
                                grayscale
                            />
                        </div>
                    </div>

                    <div className="container">
                        <div className="office-interiors-features">
                            <div className="feature-item">
                                <span className="feature-icon">✓</span>
                                <span className="feature-text">Modern Design Solutions</span>
                            </div>
                            <div className="feature-item">
                                <span className="feature-icon">✓</span>
                                <span className="feature-text">Sustainable Materials</span>
                            </div>
                            <div className="feature-item">
                                <span className="feature-icon">✓</span>
                                <span className="feature-text">Functional Aesthetics</span>
                            </div>
                            <div className="feature-item">
                                <span className="feature-icon">✓</span>
                                <span className="feature-text">Space Optimization</span>
                            </div>
                        </div>
                    </div>
                </section>

                <FooterV1 />
                <ThemeDark />
            </div>
        </>
    );
};

export default DesignArcInteriorsPage;

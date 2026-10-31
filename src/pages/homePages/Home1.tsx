import { lazy, Suspense, useEffect, useRef, useState } from "react";
import { Helmet } from "react-helmet-async";
import AboutV7 from "../../components/about/AboutV7";
import CursorEffect from "../../components/animation/CursorEffect";
import ExpertiseV1 from "../../components/expertise/ExpertiseV1";
import FaqV1 from "../../components/faq/FaqV1";
import menuItems from "../../components/infinite-menu/menuItems";
import { useSiteTheme } from "../../hooks/useSiteTheme";
import useHeroScrollTransition from "../../hooks/useHeroScrollTransition";

const InfiniteMenu = lazy(() => import("../../components/infinite-menu/InfiniteMenu"));

const DeferredInfiniteMenu = () => {
    const frameRef = useRef<HTMLDivElement>(null);
    const [ready, setReady] = useState(false);
    const isDark = useSiteTheme();

    useEffect(() => {
        const node = frameRef.current;
        if (!node) return;
        const observer = new IntersectionObserver(([entry]) => {
            if (!entry.isIntersecting) return;
            setReady(true);
            observer.disconnect();
        }, { rootMargin: "240px" });
        observer.observe(node);
        return () => observer.disconnect();
    }, []);

    return (
        <div ref={frameRef} style={{ height: 600, position: "relative", marginTop: "clamp(48px, 6vw, 96px)" }}>
            {ready && (
                <Suspense fallback={null}>
                    <InfiniteMenu
                        items={menuItems}
                        count={48}
                        tileSize={0.63}
                        roundness={0.2}
                        zoom={1.65}
                        pullBack={1}
                        stretch={0.6}
                        inertia={0.6}
                        autoplay={3}
                        grayscale={true}
                        dim={0.5}
                        intro={true}
                        scrollSpin={true}
                        showInfo={true}
                        theme={isDark ? "dark" : "light"}
                        accentColor="#236BFF"
                        backgroundColor={isDark ? "#0e0f11" : "#ffffff"}
                    />
                </Suspense>
            )}
        </div>
    );
};
import FooterV1 from "../../components/footer/FooterV1";
import HeaderV1 from "../../components/header/HeaderV1";
import ProjectIdeaV1 from "../../components/project/ProjectIdeaV1";
import WhatWeDoSequence from "../../components/services/WhatWeDoSequence";
import ThemeDark from "../../components/switcher/ThemeDark";
import WhyChooseV1 from "../../components/whyChoose/WhyChooseV1";
import SculptureHero from "@/components/ui/liquid-sculpture-hero";
import IndustriesVideo from "../../components/videos/IndustriesVideo";
import GrowthTogetherVideo from "../../components/videos/GrowthTogetherVideo";
import ClientRoster from "../../components/clients/ClientRoster";
import { arcleFaqs, arcleMeta } from "../../content/arcleHome";

const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: arcleFaqs.map((item) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: {
            "@type": "Answer",
            text: item.answer,
        },
    })),
};

const Home1 = () => {
    const isDark = useSiteTheme();
    const heroRef = useRef<HTMLDivElement>(null);
    const heroNextRef = useRef<HTMLDivElement>(null);
    useHeroScrollTransition(heroRef, heroNextRef);

    useEffect(() => {
        const script = document.createElement("script");
        script.type = "application/ld+json";
        script.id = "arcle-faq-schema";
        script.text = JSON.stringify(faqSchema);
        document.head.appendChild(script);
        return () => {
            script.remove();
        };
    }, []);

    return (
        <>
            <Helmet>
                <title>{arcleMeta.title}</title>
                <meta name="description" content={arcleMeta.description} />
                <meta property="og:title" content={arcleMeta.title} />
                <meta property="og:description" content={arcleMeta.description} />
                <meta property="og:type" content="website" />
            </Helmet>

            <div className="smooth-scroll-container">
                <HeaderV1 />
                <div ref={heroRef}>
                    <SculptureHero
                        brand="Arcle"
                        showNav={false}
                        themeToggle={false}
                        showCredit={false}
                        eyebrow="AI-powered digital marketing — India"
                        headline={arcleMeta.headline}
                        headlineAccent="brand"
                        body={arcleMeta.heroParagraphs[0]}
                        primaryCta={{ label: "Start a project", href: "/contact-us" }}
                        secondaryCta={{ label: "Our services", href: "/services" }}
                        backdropText=""
                        showcaseMetrics={[
                            { label: "More Traffic", value: "+180%", icon: "traffic" },
                            { label: "Higher Conversions", value: "+95%", icon: "conversions" },
                            { label: "More Leads", value: "+120%", icon: "leads" },
                            { label: "More Revenue", value: "+200%", icon: "revenue" },
                        ]}
                        theme={isDark ? "dark" : "light"}
                        background="#ffffff"
                        darkBackground="#0e0f11"
                        sculptureScale={0.78}
                        mobileSculptureScale={0.62}
                        dotSize={0.4}
                        hint="Move across the form"
                        hintTouch="Touch the form"
                        headingFont='"Manrope", var(--font-heading), sans-serif'
                        accentFont='"Manrope", var(--font-heading), sans-serif'
                        bodyFont='"Manrope", var(--font-default), sans-serif'
                        loadFonts={false}
                        intro
                        style={{ paddingTop: "72px" }}
                    />
                </div>
                <div ref={heroNextRef}>
                    <DeferredInfiniteMenu />
                </div>
                <AboutV7 />
                <IndustriesVideo />
                <ClientRoster />
                <WhatWeDoSequence />
                <WhyChooseV1 sectionClass="default-padding" />
                <div className="default-padding bg-gray">
                    <ExpertiseV1 />
                </div>
                <GrowthTogetherVideo />
                <div className="default-padding bg-gray overflow-hidden" style={{ position: "relative" }}>
                    <ProjectIdeaV1 />
                </div>
                <FaqV1 hasTitle={true} />
                <CursorEffect />
                <FooterV1 />
                <ThemeDark />
            </div>
        </>
    );
};

export default Home1;

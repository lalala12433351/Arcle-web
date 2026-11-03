import { lazy, Suspense, useEffect, useRef, useState } from "react";
import { Helmet } from "react-helmet-async";
import AboutV7 from "../../components/about/AboutV7";
import CursorEffect from "../../components/animation/CursorEffect";
import FaqV1 from "../../components/faq/FaqV1";
import menuItems from "../../components/infinite-menu/menuItems";
import { useSiteTheme } from "../../hooks/useSiteTheme";

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
        <div ref={frameRef} style={{ height: "100svh", minHeight: 720, position: "relative" }}>
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
import AboutCrew from "../../components/about/AboutCrew";
import WhatWeDoSequence from "../../components/services/WhatWeDoSequence";
import ThemeDark from "../../components/switcher/ThemeDark";
import WhyChooseV1 from "../../components/whyChoose/WhyChooseV1";
import { ParallaxComponent } from "@/components/ui/parallax-scrolling";
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
                <HeaderV1 onDarkHero />
                <div className="home-flow">
                    <ParallaxComponent
                        eyebrow="AI-powered digital marketing — India"
                        title={arcleMeta.headline}
                        body={arcleMeta.heroParagraphs[0]}
                        primaryCta={{ label: "Start a project", href: "/contact-us" }}
                        secondaryCta={{ label: "Our services", href: "/services" }}
                    />
                    <DeferredInfiniteMenu />
                    <AboutV7 />
                    <IndustriesVideo />
                    <ClientRoster />
                    <WhatWeDoSequence />
                    <WhyChooseV1 sectionClass="default-padding" />
                    <GrowthTogetherVideo />
                    <AboutCrew />
                    <FaqV1 hasTitle={true} />
                    <FooterV1 />
                </div>
                <CursorEffect />
                <ThemeDark />
            </div>
        </>
    );
};

export default Home1;

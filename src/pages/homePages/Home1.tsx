import { lazy, Suspense, useEffect, useRef, useState } from "react";
import { Helmet } from "react-helmet-async";
import AboutV7 from "../../components/about/AboutV7";
import CursorEffect from "../../components/animation/CursorEffect";
import ExpertiseV1 from "../../components/expertise/ExpertiseV1";
import FaqV1 from "../../components/faq/FaqV1";
import menuItems from "../../components/infinite-menu/menuItems";

const InfiniteMenu = lazy(() => import("../../components/infinite-menu/InfiniteMenu"));

const DeferredInfiniteMenu = () => {
    const frameRef = useRef<HTMLDivElement>(null);
    const [ready, setReady] = useState(false);

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
        <div ref={frameRef} style={{ height: 600, position: "relative" }}>
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
                        theme="dark"
                        accentColor="#236BFF"
                        backgroundColor="#0e0f11"
                    />
                </Suspense>
            )}
        </div>
    );
};
import FooterV1 from "../../components/footer/FooterV1";
import HeaderV1 from "../../components/header/HeaderV1";
import ProjectIdeaV1 from "../../components/project/ProjectIdeaV1";
import ServicesV1 from "../../components/services/ServicesV1";
import ThemeDark from "../../components/switcher/ThemeDark";
import WhyChooseV1 from "../../components/whyChoose/WhyChooseV1";
import SculptureHero from "@/components/ui/liquid-sculpture-hero";
import IndustriesVideo from "../../components/videos/IndustriesVideo";
import GrowthTogetherVideo from "../../components/videos/GrowthTogetherVideo";
import ClientRoster from "../../components/clients/ClientRoster";
import { arcleFaqs, arcleMeta, journeySteps } from "../../content/arcleHome";

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

const toCards = (entries: { title: string; text: string }[]) =>
    entries.map((item, index) => ({
        id: index + 1,
        icon: `${(index % 4) + 1}.png`,
        iconLight: `${23 + (index % 4)}.png`,
        title: item.title,
        text: item.text,
        href: "/services",
    }));

const Home1 = () => {
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
                <SculptureHero
                    brand="Arcle"
                    showNav={false}
                    theme="dark"
                    themeToggle={false}
                    showCredit={false}
                    eyebrow="AI-powered digital marketing — India"
                    headline={arcleMeta.headline}
                    headlineAccent="brand"
                    body={arcleMeta.heroParagraphs[0]}
                    primaryCta={{ label: "Start a project", href: "/contact-us" }}
                    secondaryCta={{ label: "Our services", href: "/services" }}
                    backdropText="arcle"
                    darkBackground="#0e0f11"
                    hint="Move across the form"
                    hintTouch="Touch the form"
                    headingFont='"Manrope", var(--font-heading), sans-serif'
                    accentFont='"Manrope", var(--font-heading), sans-serif'
                    bodyFont='"Manrope", var(--font-default), sans-serif'
                    loadFonts={false}
                    intro
                    style={{ paddingTop: "72px" }}
                />
                <DeferredInfiniteMenu />
                <AboutV7 sectionClass="bg-gray" />
                <IndustriesVideo />
                <ServicesV1
                    sectionClass="default-padding"
                    hasTitle={true}
                    subTitle="What We Do"
                    title="One Strategy. Every Channel."
                    items={toCards(journeySteps)}
                    stacked
                />
                <WhyChooseV1 sectionClass="default-padding" />
                <div className="default-padding bg-gray">
                    <ExpertiseV1 />
                </div>
                <GrowthTogetherVideo />
                <ClientRoster />
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

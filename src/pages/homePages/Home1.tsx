import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import AboutV6 from "../../components/about/AboutV6";
import AboutV7 from "../../components/about/AboutV7";
import CursorEffect from "../../components/animation/CursorEffect";
import DarkClass from "../../components/classes/DarkClass";
import ExpertiseV1 from "../../components/expertise/ExpertiseV1";
import FaqV1 from "../../components/faq/FaqV1";
import FlowingMenu from "../../components/flowing-menu/FlowingMenu";
import homeMenuItems from "../../components/flowing-menu/homeMenuItems";
import InfiniteMenu from "../../components/infinite-menu/InfiniteMenu";
import menuItems from "../../components/infinite-menu/menuItems";
import FooterV1 from "../../components/footer/FooterV1";
import HeaderV1 from "../../components/header/HeaderV1";
import ProjectIdeaV1 from "../../components/project/ProjectIdeaV1";
import ProjectV1 from "../../components/project/ProjectV1";
import ServicesV1 from "../../components/services/ServicesV1";
import ServicesV2 from "../../components/services/ServicesV2";
import ThemeDark from "../../components/switcher/ThemeDark";
import WhyChooseV1 from "../../components/whyChoose/WhyChooseV1";
import { WovenLightHero } from "@/components/ui/woven-light-hero";
import { arcleFaqs, arcleMeta, audiences, growthStack, industries, journeySteps } from "../../content/arcleHome";

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

const upsertMeta = (attribute: "name" | "property", key: string, content: string) => {
    let el = document.head.querySelector<HTMLMetaElement>(`meta[${attribute}="${key}"]`);
    if (!el) {
        el = document.createElement("meta");
        el.setAttribute(attribute, key);
        el.dataset.arcleSeo = "true";
        document.head.appendChild(el);
    }
    el.setAttribute("content", content);
    return el;
};

const Home1 = () => {
    useEffect(() => {
        const metas = [
            upsertMeta("name", "description", arcleMeta.description),
            upsertMeta("property", "og:title", arcleMeta.title),
            upsertMeta("property", "og:description", arcleMeta.description),
            upsertMeta("property", "og:type", "website"),
        ];
        const script = document.createElement("script");
        script.type = "application/ld+json";
        script.id = "arcle-faq-schema";
        script.text = JSON.stringify(faqSchema);
        document.head.appendChild(script);

        return () => {
            script.remove();
            metas.forEach((el) => {
                if (el.dataset.arcleSeo === "true") el.remove();
            });
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
                <WovenLightHero
                    layout="editorial"
                    headline={arcleMeta.headline}
                    paragraphs={arcleMeta.heroParagraphs}
                    ctaLabel="Book a free growth audit"
                    ctaTo="/contact-us"
                />
                <div style={{ height: "600px", position: "relative" }}>
                    <FlowingMenu
                        items={homeMenuItems}
                        textColor="#ffffff"
                        bgColor="#0e0f11"
                        marqueeBgColor="#236BFF"
                        marqueeTextColor="#ffffff"
                        borderColor="rgba(255, 255, 255, 0.2)"
                    />
                </div>
                <div style={{ height: 600, position: "relative" }}>
                    <InfiniteMenu
                        items={menuItems}
                        count={160}
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
                </div>
                <AboutV6 sectionClass="default-padding" />
                <AboutV7 sectionClass="bg-gray" />
                <ServicesV1
                    sectionClass="default-padding"
                    hasTitle={true}
                    subTitle="What We Do"
                    title="One Strategy. Every Channel."
                    items={toCards(journeySteps)}
                />
                <ServicesV2 sectionClass="default-padding bg-gray" hasTitle={true} />
                <WhyChooseV1 sectionClass="default-padding" />
                <div className="default-padding bg-gray">
                    <ExpertiseV1 />
                </div>
                <ServicesV1
                    sectionClass="default-padding"
                    hasTitle={true}
                    subTitle="Industries"
                    title="Built for Your Industry"
                    items={toCards(industries)}
                />
                <ServicesV1
                    sectionClass="default-padding bg-gray"
                    hasTitle={true}
                    subTitle="Your Growth Stack"
                    title="Everything Working Together"
                    items={toCards(growthStack)}
                />
                <ServicesV1
                    sectionClass="default-padding"
                    hasTitle={true}
                    subTitle="Who We Work With"
                    title="From Startups to Growing Brands"
                    items={toCards(audiences)}
                />
                <ProjectV1 />
                <div className="default-padding bg-gray overflow-hidden" style={{ position: "relative" }}>
                    <ProjectIdeaV1 />
                </div>
                <FaqV1 hasTitle={true} />
                <CursorEffect />
                <FooterV1 />
                <DarkClass />
                <ThemeDark />
            </div>
        </>
    );
};

export default Home1;

import { useRef } from "react";
import { Helmet } from "react-helmet-async";
import LayoutV1 from "../../components/layouts/LayoutV1";
import ServiceCreative from "../../components/services/wall/ServiceCreative";
import ServiceDevelopment from "../../components/services/wall/ServiceDevelopment";
import ServiceSeo from "../../components/services/wall/ServiceSeo";
import WovenCanvas from "../../components/ui/woven-canvas";
import useServicesScroll from "../../hooks/useServicesScroll";
import { useSiteTheme } from "../../hooks/useSiteTheme";
import "../../components/services/wall/ServiceWall.css";
import "./ServicesPage.css";

const REST = ["That", "Carry", "the", "Whole", "Business"];

const ServicesPage = () => {
    const wallRef = useRef<HTMLElement>(null);
    const isDark = useSiteTheme();
    useServicesScroll(wallRef);

    return (
        <>
            <Helmet>
                <title>Services | Arcle</title>
                <meta name="description" content="Performance marketing, SEO, social, websites, apps and creative from one Arcle team in Bangalore." />
            </Helmet>

            <LayoutV1>
                <section className="services-wall" ref={wallRef}>
                    <header className="services-wall__hero">
                        <WovenCanvas className="services-wall__weave" dark={isDark} />
                        <h1 className="services-wall__title">
                            <span className="services-wall__tilt">
                                <span className="services-wall__line services-wall__line--hero">
                                    <span className="services-wall__word">
                                        <span className="services-wall__title-hero-s">S</span>erv
                                        <span className="services-wall__title-i">
                                            ı<span className="services-wall__tittle" />
                                        </span>
                                        ces
                                    </span>
                                </span>
                                <span className="services-wall__line services-wall__line--rest">
                                    {REST.map((word, index) => (
                                        <span key={word}>
                                            <span className={`services-wall__word${word === "Whole" ? " is-accent" : ""}`}>
                                                {word}
                                            </span>
                                            {index < REST.length - 1 ? " " : null}
                                        </span>
                                    ))}
                                </span>
                            </span>
                        </h1>

                        <div className="services-wall__foot">
                            <p className="services-wall__lede">
                                Growing online takes more than one skill. Arcle brings performance marketing, SEO, social media, content, design and development together under one roof. You can choose a single service or let one team handle everything, with every part working toward the same business goals.
                            </p>
                            <span className="services-wall__cue" aria-hidden="true">
                                <span>Scroll to explore</span>
                                <span className="services-wall__cue-line" />
                            </span>
                        </div>
                    </header>

                    <div className="services-wall__board">
                        <ServiceSeo />
                        <ServiceDevelopment />
                        <ServiceCreative />
                    </div>
                </section>
            </LayoutV1>
        </>
    );
};

export default ServicesPage;

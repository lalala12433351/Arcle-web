import { useRef } from "react";
import { Helmet } from "react-helmet-async";
import LayoutV1 from "../../components/layouts/LayoutV1";
import ServiceCanvas from "../../components/services/page/ServiceCanvas";
import ServicesCta from "../../components/services/page/ServicesCta";
import ServicesHero from "../../components/services/page/ServicesHero";
import ServiceSection from "../../components/services/page/ServiceSection";
import { serviceEntries } from "../../components/services/page/servicesContent";
import { useActiveService, useMediaQuery, useStickyOffsets } from "../../components/services/page/useServicesPage";
import useServicesReveal from "../../components/services/page/useServicesReveal";
import "./ServicesPage.css";

const SERVICE_KEYS = serviceEntries.map((entry) => entry.key);

const ServicesPage = () => {
    const rootRef = useRef<HTMLDivElement>(null);
    const wide = useMediaQuery("(min-width: 1100px)");
    const { active } = useActiveService(SERVICE_KEYS);

    useStickyOffsets(rootRef);
    useServicesReveal(rootRef);

    return (
        <>
            <Helmet>
                <title>Services | Arcle</title>
                <meta name="description" content="Performance marketing, SEO, social, websites, apps and creative from one Arcle team in Bangalore." />
            </Helmet>

            <LayoutV1>
                <div className="services-page" ref={rootRef}>
                    <ServicesHero />

                    <div className="services-shell services-showcase">
                        <div className="services-showcase__sections">
                            {serviceEntries.map((entry) => (
                                <ServiceSection key={entry.key} entry={entry} inline={!wide} />
                            ))}
                        </div>

                        {wide && (
                            <div className="services-showcase__canvas">
                                <div className="services-showcase__sticky">
                                    <ServiceCanvas keys={SERVICE_KEYS} visible={active} playing />
                                </div>
                            </div>
                        )}
                    </div>

                    <ServicesCta />
                </div>
            </LayoutV1>
        </>
    );
};

export default ServicesPage;

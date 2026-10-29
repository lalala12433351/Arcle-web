import { useRef } from "react";
import { Helmet } from "react-helmet-async";
import LayoutV1 from "../../components/layouts/LayoutV1";
import ServiceCreative from "../../components/services/wall/ServiceCreative";
import ServiceDevelopment from "../../components/services/wall/ServiceDevelopment";
import ServiceSeo from "../../components/services/wall/ServiceSeo";
import { Globe } from "@/registry/magicui/globe";
import useServicesScroll from "../../hooks/useServicesScroll";
import "../../components/services/wall/ServiceWall.css";
import "./ServicesPage.css";

const ServicesPage = () => {
    const wallRef = useRef<HTMLElement>(null);
    useServicesScroll(wallRef);

    return (
        <>
            <Helmet>
                <title>Services | Arcle</title>
                <meta name="description" content="Performance marketing, SEO, social, websites, apps and creative from one Arcle team in Bangalore." />
            </Helmet>

            <LayoutV1>
                <section className="services-wall" ref={wallRef}>
                    <div className="services-wall__banner">
                        <div className="services-wall__intro">
                            <h1>Services That Carry<br />The Whole Business</h1>
                            <p>
                                Growing online takes more than one skill. Arcle brings performance marketing, SEO, social media, content, design and development together under one roof. You can choose a single service or let one team handle everything, with every part working toward the same business goals.
                            </p>
                        </div>
                        <div className="services-wall__globe">
                            <div className="services-wall__globe-lift">
                                <Globe />
                                <nav className="services-wall__pops" aria-label="Social">
                                    <a
                                        className="globe-pop globe-pop--ig"
                                        href="https://www.instagram.com/"
                                        target="_blank"
                                        rel="noreferrer"
                                    >
                                        <span className="globe-pop__body">
                                            <span className="globe-pop__face">
                                                <svg viewBox="0 0 24 24" aria-hidden="true">
                                                    <rect x="3.2" y="3.2" width="17.6" height="17.6" rx="5" fill="none" stroke="currentColor" strokeWidth="2" />
                                                    <circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" strokeWidth="2" />
                                                    <circle cx="17.4" cy="6.6" r="1.15" fill="currentColor" />
                                                </svg>
                                            </span>
                                        </span>
                                        <span className="globe-pop__shadow" />
                                        <span className="sr-only">Instagram</span>
                                    </a>
                                    <a
                                        className="globe-pop globe-pop--in"
                                        href="https://www.linkedin.com/"
                                        target="_blank"
                                        rel="noreferrer"
                                    >
                                        <span className="globe-pop__body">
                                            <span className="globe-pop__face">
                                                <svg viewBox="0 0 24 24" aria-hidden="true">
                                                    <path fill="currentColor" d="M4.98 3.5C4.98 4.88 3.88 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1 4.98 2.12 4.98 3.5zM.24 8.48h4.52V24H.24V8.48zM8.34 8.48h4.33v2.12h.06c.6-1.14 2.08-2.35 4.28-2.35 4.58 0 5.42 3.01 5.42 6.93V24h-4.52v-6.86c0-1.64-.03-3.74-2.28-3.74-2.28 0-2.63 1.78-2.63 3.62V24H8.34V8.48z" />
                                                </svg>
                                            </span>
                                        </span>
                                        <span className="globe-pop__shadow" />
                                        <span className="sr-only">LinkedIn</span>
                                    </a>
                                    <a
                                        className="globe-pop globe-pop--fb"
                                        href="https://www.facebook.com/"
                                        target="_blank"
                                        rel="noreferrer"
                                    >
                                        <span className="globe-pop__body">
                                            <span className="globe-pop__face">
                                                <svg viewBox="0 0 24 24" aria-hidden="true">
                                                    <path fill="currentColor" d="M14.9 8.2h-2c-.6 0-.8.3-.8.9v1.8h2.8l-.4 2.9h-2.4V22H9.1v-8.2H6.8v-2.9h2.3V8.7c0-2.3 1.4-3.6 3.5-3.6 1 0 1.8.1 2.3.2v2.9z" />
                                                </svg>
                                            </span>
                                        </span>
                                        <span className="globe-pop__shadow" />
                                        <span className="sr-only">Facebook</span>
                                    </a>
                                </nav>
                            </div>
                            <div className="services-wall__globe-shade" />
                        </div>
                    </div>

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

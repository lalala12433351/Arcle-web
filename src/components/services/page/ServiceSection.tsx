import { useRef } from "react";
import { Link } from "react-router-dom";
import CapabilityList from "./CapabilityList";
import ServiceCanvas from "./ServiceCanvas";
import type { ServiceEntry } from "./servicesContent";
import { sectionId, useInView } from "./useServicesPage";

interface ServiceSectionProps {
    entry: ServiceEntry;
    inline: boolean;
}

const InlineCanvas = ({ entry }: { entry: ServiceEntry }) => {
    const ref = useRef<HTMLDivElement>(null);
    const inView = useInView(ref);
    return (
        <div className="services-section__visual" ref={ref}>
            <ServiceCanvas keys={[entry.key]} visible={entry.key} playing={inView} inline />
        </div>
    );
};

const ServiceSection = ({ entry, inline }: ServiceSectionProps) => {
    const headingId = `${sectionId(entry.key)}-title`;

    return (
        <section
            className="services-section"
            id={sectionId(entry.key)}
            data-service={entry.key}
            aria-labelledby={headingId}
            tabIndex={-1}
        >
            <p className="services-section__label" data-reveal>
                <span>{entry.number}</span> / {entry.label}
            </p>
            <h2 className="services-section__title" id={headingId} data-reveal>
                {entry.headline}
            </h2>
            <p className="services-section__lede" data-reveal>{entry.lede}</p>
            <div className="services-section__body" data-reveal>
                {entry.body.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                ))}
            </div>

            <div data-reveal>
                <CapabilityList core={entry.core} title={entry.label} />
            </div>

            {(entry.technologies || entry.portfolio || entry.sites) && (
                <div className="services-section__meta" data-reveal>
                    {entry.technologies && (
                        <p className="services-section__tech">
                            <span className="services-section__tech-label">Built with</span>
                            {entry.technologies.join(" / ")}
                        </p>
                    )}
                    {entry.sites && (
                        <p className="services-section__sites">
                            <span className="services-section__tech-label">Live sites</span>
                            {entry.sites.map((site) => (
                                <a
                                    key={site.href}
                                    className="services-section__link"
                                    href={site.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    {site.label} <span aria-hidden="true">↗</span>
                                </a>
                            ))}
                        </p>
                    )}
                    {entry.portfolio && (
                        <Link className="services-section__link" to={entry.portfolio.to}>
                            {entry.portfolio.label} <span aria-hidden="true">↗</span>
                        </Link>
                    )}
                </div>
            )}

            {inline && <InlineCanvas entry={entry} />}
        </section>
    );
};

export default ServiceSection;

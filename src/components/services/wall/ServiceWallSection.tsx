import type { ReactNode } from "react";
import type { WallServiceKey } from "./serviceWallContent";

interface ServiceGroup {
    label: string;
    items: string[];
}

interface ServiceWallSectionProps {
    service: WallServiceKey;
    title: string;
    summary: string;
    paragraphs: string[];
    groups?: ServiceGroup[];
    visual: ReactNode;
    visualLabel: string;
    flip?: boolean;
    faceMap?: Record<string, number>;
}

const ServiceWallSection = ({
    service,
    title,
    summary,
    paragraphs,
    groups = [],
    visual,
    visualLabel,
    flip = false,
    faceMap,
}: ServiceWallSectionProps) => {
    const headingId = `svc-wall-${service}-title`;

    return (
        <section
            className={`svc-wall${flip ? " svc-wall--flip" : ""}`}
            data-svc={service}
            aria-labelledby={headingId}
        >
            <div className="svc-wall__scene">
                <div className="svc-wall__copy">
                    <h2 className="svc-wall__title" id={headingId}>
                        <span className="svc-wall__title-mask">
                            <span className="svc-wall__title-line">{title}</span>
                        </span>
                    </h2>
                    <p className="svc-wall__summary svc-wall__reveal">{summary}</p>
                    <div className="svc-wall__body">
                        {paragraphs.map((paragraph) => (
                            <p className="svc-wall__reveal" key={paragraph}>{paragraph}</p>
                        ))}
                    </div>
                    {groups.map((group) => (
                        <div className="svc-wall__group svc-wall__reveal" key={group.label}>
                            <p className="svc-wall__group-label">{group.label}</p>
                            <ul className="svc-wall__chips">
                                {group.items.map((item) => (
                                    <li
                                        className="svc-wall__chip"
                                        key={item}
                                        data-face={faceMap?.[item]}
                                    >
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                <div className="svc-wall__stage" role="img" aria-label={visualLabel}>
                    {visual}
                </div>
            </div>
        </section>
    );
};

export default ServiceWallSection;

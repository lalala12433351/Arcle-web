import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { Link, Navigate, useParams } from "react-router-dom";
import LayoutV1 from "../../components/layouts/LayoutV1";
import DevelopmentStudio from "../../components/services/DevelopmentStudio";
import { focusServices, isFocusService } from "../../components/services/wall/serviceFocusContent";
import "../../components/services/wall/ServiceWall.css";
import { processSteps } from "../../content/arcleHome";
import "./ServiceFocus.css";

const ServiceFocusPage = () => {
    const { slug } = useParams();
    const service = isFocusService(slug) ? focusServices[slug] : null;
    const pageTitle = service ? `${service.title} | Arcle` : "Services | Arcle";

    useEffect(() => {
        document.title = pageTitle;
    }, [pageTitle]);

    if (!service) {
        return <Navigate to="/services" replace />;
    }

    const others = (Object.keys(focusServices) as Array<keyof typeof focusServices>)
        .filter((key) => key !== service.key)
        .map((key) => focusServices[key]);

    return (
        <>
            <Helmet>
                <title>{pageTitle}</title>
                <meta name="description" content={service.summary} />
            </Helmet>

            <LayoutV1>
                <article className={`svc-focus${service.key === "development" ? " svc-focus--studio" : ""}`}>
                    <Link className="svc-focus__back" to="/services">
                        All services
                    </Link>

                    {service.key === "development" ? (
                        <DevelopmentStudio
                            summary={service.summary}
                            paragraphs={service.paragraphs}
                            groups={service.groups}
                        />
                    ) : (
                        <header className="svc-focus__hero">
                            <div className="svc-focus__copy">
                                <p className="svc-focus__kicker">Services</p>
                                <h1>{service.title}</h1>
                                <p className="svc-focus__summary">{service.summary}</p>
                                <div className="svc-focus__body">
                                    {service.paragraphs.map((paragraph) => (
                                        <p key={paragraph}>{paragraph}</p>
                                    ))}
                                </div>
                                {service.groups.map((group) => (
                                    <div className="svc-wall__group" key={group.label}>
                                        <p className="svc-wall__group-label">{group.label}</p>
                                        <ul className="svc-wall__chips">
                                            {group.items.map((item) => (
                                                <li className="svc-wall__chip" key={item}>{item}</li>
                                            ))}
                                        </ul>
                                    </div>
                                ))}
                            </div>
                            <div className="svc-wall__stage svc-focus__stage" role="img" aria-label={service.visualLabel}>
                                {service.visual}
                            </div>
                        </header>
                    )}

                    <section className="svc-focus__process" aria-labelledby="svc-focus-process">
                        <h2 id="svc-focus-process">How it runs</h2>
                        <ol>
                            {processSteps.map((step) => (
                                <li key={step.step}>
                                    <span>{step.step}</span>
                                    <h3>{step.title}</h3>
                                    <p>{step.text}</p>
                                </li>
                            ))}
                        </ol>
                    </section>

                    <section className="svc-focus__more" aria-labelledby="svc-focus-more">
                        <div className="svc-focus__more-head">
                            <h2 id="svc-focus-more">The rest of the work</h2>
                            <Link className="svc-focus__project" to="/contact-us">
                                Start a project <i className="fas fa-arrow-right" aria-hidden="true" />
                            </Link>
                        </div>
                        <div className="svc-focus__related">
                            {others.map((other) => (
                                <Link className="svc-focus__card" key={other.key} to={`/services/${other.key}`}>
                                    <span>Service</span>
                                    <strong>{other.title}</strong>
                                    <p>{other.summary}</p>
                                </Link>
                            ))}
                        </div>
                    </section>
                </article>
            </LayoutV1>
        </>
    );
};

export default ServiceFocusPage;

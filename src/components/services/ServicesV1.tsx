import ServicesV1Data from "../../../src/assets/jsonData/services/ServicesV1Data.json"
import SplitText from "../animation/SplitText.jsx"
import ScrollStack, { ScrollStackItem } from "../ScrollStack.jsx";
import { EncryptedText } from "@/components/ui/encrypted-text";
import { Link } from "react-router-dom";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import { servicePath } from "../../content/serviceSlug";

interface ServiceCard {
    id: number;
    icon: string;
    iconLight: string;
    title: string;
    text: string;
    href?: string;
}

interface DataType {
    hasTitle?: boolean;
    sectionClass?: string;
    items?: ServiceCard[];
    subTitle?: string;
    title?: string;
    stacked?: boolean;
    ctaHref?: string;
    ctaLabel?: string;
}

const ServicesV1 = ({ hasTitle, sectionClass, items, subTitle, title, stacked, ctaHref = "/services", ctaLabel = "Read More" }: DataType) => {
    const services = items ?? ServicesV1Data;

    const [activeServiceId, setActiveServiceId] = useState(services[0]?.id || null);

    const handleMouseEnter = (id: number) => {
        setActiveServiceId(id);
    };

    const handleMouseLeave = () => {
        // Do nothing on mouse leave to keep the active item
    };

    const stackAreaRef = useRef<HTMLDivElement>(null);
    const stackTitleRef = useRef<HTMLHeadingElement>(null);
    const [revealRun, setRevealRun] = useState(0);

    useEffect(() => {
        const node = stackTitleRef.current;
        if (!stacked || !node) return;
        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) setRevealRun((run) => run + 1);
        }, { threshold: 0.75 });
        observer.observe(node);
        return () => observer.disconnect();
    }, [stacked]);

    useEffect(() => {
        const area = stackAreaRef.current;
        if (!stacked || !area) return;

        let frame = 0;
        let idle = 0;
        const update = () => {
            frame = 0;
            const rect = area.getBoundingClientRect();
            const progress = (window.innerHeight - rect.top) / (window.innerHeight + rect.height);
            area.style.setProperty("--stack-angle", `${(progress * 720).toFixed(1)}deg`);
        };
        const onScroll = () => {
            if (!frame) frame = requestAnimationFrame(update);
            area.classList.add("is-scrolling");
            window.clearTimeout(idle);
            idle = window.setTimeout(() => area.classList.remove("is-scrolling"), 450);
        };

        update();
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => {
            cancelAnimationFrame(frame);
            window.clearTimeout(idle);
            window.removeEventListener("scroll", onScroll);
        };
    }, [stacked]);

    const heading = (
        <h2 className="title split-text">
            <SplitText
                delay={40}
                animationFrom={{ opacity: 0, transform: 'translate3d(0,50px,0)' }}
                animationTo={{ opacity: 1, transform: 'translate3d(0,0,0)' }}
                easing="easeOutCubic"
                threshold={0.2}
                rootMargin="-50px"
            >
                {title || "Everything You Need to Grow Online"}
            </SplitText>
        </h2>
    );

    if (stacked) {
        return (
            <div ref={stackAreaRef} className={`services-style-one-area services-stack-area ${sectionClass ? sectionClass : ""}`}>
                <div className="container">
                    <div className="services-stack-heading">
                        {hasTitle &&
                            <div className="site-heading">
                                <h4 className="sub-title">{subTitle || "Services we offer"}</h4>
                                <h2 className="title" ref={stackTitleRef}>
                                    {revealRun > 0 ? (
                                        <EncryptedText
                                            key={revealRun}
                                            text={title || "Everything You Need to Grow Online"}
                                            encryptedClassName="text-neutral-500"
                                            revealedClassName="services-stack-revealed"
                                            revealDelayMs={50}
                                        />
                                    ) : (
                                        <span style={{ visibility: "hidden" }}>{title || "Everything You Need to Grow Online"}</span>
                                    )}
                                </h2>
                            </div>
                        }
                        <Link className="btn-full services-stack-cta" to={ctaHref}>
                            {ctaLabel} <i className="fas fa-arrow-right" />
                        </Link>
                    </div>

                    <ScrollStack
                        className="services-stack"
                        useWindowScroll
                        stackPosition="18%"
                        itemDistance={100}
                        itemStackDistance={30}
                        itemScale={0.045}
                        baseScale={0.82}
                        dimAmount={0.45}
                        tiltAmount={48}
                        mobileTiltAmount={18}
                        depthAmount={240}
                        mobileDepthAmount={100}
                        liftAmount={22}
                        mobileLiftAmount={10}
                        holdDistance={140}
                    >
                        {services.map((service, index) => {
                            const href = "href" in service && service.href ? service.href : servicePath(service.title);
                            return (
                                <ScrollStackItem
                                    key={service.id}
                                    itemClassName="services-style-one-item services-stack-card"
                                    style={{ "--card-index": index } as CSSProperties}
                                >
                                    <Link to={href} className="services-stack-card__link">
                                        <div className="services-stack-card__head">
                                            <div className="icon">
                                                <img className="regular-img" src={`/assets/img/icon/${service.icon}`} alt="" width={75} height={60} />
                                                <img className="light-img" src={`/assets/img/icon/${service.iconLight}`} alt="" width={75} height={60} />
                                            </div>
                                            <span className="services-stack-card__index">{String(index + 1).padStart(2, "0")}</span>
                                        </div>
                                        <div className="services-stack-card__body">
                                            <h4>{service.title}</h4>
                                            <p>{service.text}</p>
                                        </div>
                                    </Link>
                                </ScrollStackItem>
                            );
                        })}
                    </ScrollStack>
                </div>
            </div>
        );
    }

    return (
        <>
            <div className={`services-style-one-area ${sectionClass ? sectionClass : ""}`}>

                {/* Service Title */}
                {hasTitle &&
                    <div className="service-style-one-heading">
                        <div className="container">
                            <div className="row">
                                <div className="col-xl-6 offset-xl-3 col-lg-8 offset-lg-2 text-center">
                                    <div className="site-heading">
                                        <h4 className="sub-title">{subTitle || "Services we offer"}</h4>
                                        {heading}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                }

                <div className="container">
                    <div className="services-style-one-items">
                        <div className="row g-0 align-items-stretch">
                            {services.map((service) => {
                                const href = "href" in service && service.href ? service.href : servicePath(service.title);
                                return (
                                <div
                                    className="col-lg-4 col-md-6 single-item"
                                    key={service.id}
                                    onMouseEnter={() => handleMouseEnter(service.id)}
                                    onMouseLeave={handleMouseLeave}
                                >
                                    <Link className={`services-style-one-item ${activeServiceId === service.id ? 'active' : ''}`} to={href}>
                                        <div className="icon">
                                            <img className="regular-img" src={`/assets/img/icon/${service.icon}`} alt="" width={75} height={60} />
                                            <img className="light-img" src={`/assets/img/icon/${service.iconLight}`} alt="" width={75} height={60} />
                                        </div>
                                        <h4>{service.title}</h4>
                                        <p>{service.text}</p>
                                        <span className="btn-full">
                                            Read More <i className="fas fa-arrow-right" />
                                        </span>
                                    </Link>
                                </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ServicesV1;

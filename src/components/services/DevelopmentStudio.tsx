import { useRef, useState, type CSSProperties } from "react";
import {
    Building2,
    LineChart,
    MonitorSmartphone,
    RefreshCw,
    Search,
    ShoppingBag,
    SquareMousePointer,
    Wrench,
    type LucideIcon,
} from "lucide-react";
import "../../pages/servicesPages/DevelopmentStudio.css";

interface ServiceGroup {
    label: string;
    items: string[];
}

interface OfferingCopy {
    text: string;
    headline: string;
    cta: string;
    icon: LucideIcon;
}

const OFFERINGS: Record<string, OfferingCopy> = {
    "Business Websites": {
        icon: Building2,
        text: "We design business sites around how you sell: service pages, proof and a clear path to an enquiry, built to read well on a phone.",
        headline: "Your best salesperson, online 24/7.",
        cta: "Book a call",
    },
    "E-commerce": {
        icon: ShoppingBag,
        text: "Stores that present the product clearly and take the order, on Shopify or as a custom build when the catalogue needs it.",
        headline: "The catalogue that keeps selling.",
        cta: "Shop the range",
    },
    "Landing Pages": {
        icon: SquareMousePointer,
        text: "One page for one offer. The message, the proof and the next step, built to load fast and send the enquiry.",
        headline: "One page. One clear next step.",
        cta: "Get the offer",
    },
    "Website Redesign": {
        icon: RefreshCw,
        text: "A rebuild of the site you already have, so the structure, speed and message match how the business sells now.",
        headline: "The same business. A clearer site.",
        cta: "See the new site",
    },
    "Custom Websites": {
        icon: MonitorSmartphone,
        text: "A bespoke site when a template cannot carry the product, the content or the way your customers decide.",
        headline: "Built around how you actually sell.",
        cta: "Start a project",
    },
    "Conversion Optimisation": {
        icon: LineChart,
        text: "Changes to layout, copy and calls to action so more of the visitors you already have become enquiries.",
        headline: "More of the visit becomes an enquiry.",
        cta: "Talk to us",
    },
    "Technical SEO": {
        icon: Search,
        text: "The build side of search: speed, structure, metadata and pages that search engines can actually read.",
        headline: "A site search engines can read.",
        cta: "Review the build",
    },
    "Website Maintenance": {
        icon: Wrench,
        text: "Updates, fixes and small improvements after launch, so the site stays fast and current.",
        headline: "Looked after after it launches.",
        cta: "Keep it current",
    },
};

interface DevelopmentStudioProps {
    summary: string;
    paragraphs: string[];
    groups: ServiceGroup[];
}

const DevelopmentStudio = ({ summary, paragraphs, groups }: DevelopmentStudioProps) => {
    const includes = groups.find((group) => group.label === "Includes")?.items ?? Object.keys(OFFERINGS);
    const technologies = groups.find((group) => group.label === "Technologies")?.items ?? [];
    const offerings = includes
        .filter((title) => OFFERINGS[title])
        .map((title) => ({ title, ...OFFERINGS[title] }));

    const [open, setOpen] = useState(offerings[0]?.title ?? "");
    const [position, setPosition] = useState(46);
    const [dragging, setDragging] = useState(false);
    const stageRef = useRef<HTMLDivElement>(null);

    const active = offerings.find((item) => item.title === open) ?? offerings[0];

    const setFromClientX = (clientX: number) => {
        const rect = stageRef.current?.getBoundingClientRect();
        if (!rect || rect.width === 0) return;
        const next = ((clientX - rect.left) / rect.width) * 100;
        setPosition(Math.min(90, Math.max(10, next)));
    };

    return (
        <div className="dev-studio">
            <header className="dev-studio__head">
                <h1>
                    Our <span className="dev-studio__mark">Development</span>
                </h1>
                <p className="dev-studio__summary">{summary}</p>
                {paragraphs.map((paragraph) => (
                    <p className="dev-studio__body" key={paragraph}>{paragraph}</p>
                ))}
                {technologies.length > 0 && (
                    <p className="dev-studio__tech">
                        {technologies.map((name, index) => (
                            <span key={name}>
                                {index > 0 && <span aria-hidden="true"> · </span>}
                                {name}
                            </span>
                        ))}
                    </p>
                )}
            </header>

            <div className="dev-studio__layout">
                <div className="dev-studio__list" role="list">
                    {offerings.map((item) => {
                        const Icon = item.icon;
                        const isOpen = item.title === open;
                        return (
                            <div className={`dev-acc${isOpen ? " is-open" : ""}`} key={item.title} role="listitem">
                                <button
                                    type="button"
                                    className="dev-acc__trigger"
                                    aria-expanded={isOpen}
                                    onClick={() => setOpen(item.title)}
                                >
                                    <Icon aria-hidden="true" strokeWidth={1.6} />
                                    <span>{item.title}</span>
                                    <i className="dev-acc__mark" aria-hidden="true" />
                                </button>
                                <div className="dev-acc__panel" aria-hidden={!isOpen}>
                                    <div className="dev-acc__panel-inner">
                                        <p>{item.text}</p>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>

                <div className={`dev-compare${dragging ? " is-dragging" : ""}`}>
                    <div className="dev-compare__bar">
                        <span>Wireframe</span>
                        <span>Live</span>
                    </div>
                    <div
                        className="dev-compare__stage"
                        ref={stageRef}
                        style={{ "--split": `${position}%` } as CSSProperties}
                        onPointerDown={(event) => {
                            if (event.button !== 0) return;
                            stageRef.current?.setPointerCapture(event.pointerId);
                            setDragging(true);
                            setFromClientX(event.clientX);
                        }}
                        onPointerMove={(event) => {
                            if (!dragging) return;
                            setFromClientX(event.clientX);
                        }}
                        onPointerUp={() => setDragging(false)}
                        onPointerCancel={() => setDragging(false)}
                    >
                        <div className="dev-compare__live" aria-hidden="true">
                            <div className="dev-compare__nav">
                                <b />
                                <i /><i /><i />
                            </div>
                            <div className="dev-compare__hero">
                                <strong>{active?.headline}</strong>
                                <em>{active?.cta}</em>
                            </div>
                            <div className="dev-compare__media" />
                            <div className="dev-compare__tiles"><i /><i /><i /></div>
                        </div>
                        <div className="dev-compare__wire" aria-hidden="true">
                            <div className="dev-compare__nav">
                                <b />
                                <i /><i /><i />
                            </div>
                            <div className="dev-compare__hero">
                                <strong>{active?.headline}</strong>
                                <em>{active?.cta}</em>
                            </div>
                            <div className="dev-compare__media" />
                            <div className="dev-compare__tiles"><i /><i /><i /></div>
                        </div>
                        <button
                            type="button"
                            className="dev-compare__handle"
                            role="slider"
                            aria-label="Compare wireframe and live site"
                            aria-valuemin={10}
                            aria-valuemax={90}
                            aria-valuenow={Math.round(position)}
                            aria-valuetext={`${Math.round(position)} percent wireframe`}
                            onKeyDown={(event) => {
                                if (event.key === "ArrowLeft" || event.key === "ArrowDown") {
                                    event.preventDefault();
                                    setPosition((value) => Math.max(10, value - 4));
                                }
                                if (event.key === "ArrowRight" || event.key === "ArrowUp") {
                                    event.preventDefault();
                                    setPosition((value) => Math.min(90, value + 4));
                                }
                            }}
                        >
                            <svg viewBox="0 0 24 24" aria-hidden="true">
                                <path d="M9 7 L4 12 L9 17 M15 7 L20 12 L15 17" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DevelopmentStudio;

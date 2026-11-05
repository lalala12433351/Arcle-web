import { useRef, useState, type PointerEvent } from "react";
import { Building2, Handshake, HeartPulse, Laptop, Minus, Plus, Sparkles, type LucideIcon } from "lucide-react";
import "./DesignArcServices.css";

interface ServiceShot {
    id: string;
    title: string;
    body: string;
    icon: LucideIcon;
    render: string;
    reality: string;
    renderAlt: string;
    realityAlt: string;
}

const services: ServiceShot[] = [
    {
        id: "corporate",
        title: "Corporate",
        body: "We design corporate spaces through strategy-led planning, integrating CEO suites, boardrooms, and focused work zones with brand-driven interiors.",
        icon: Building2,
        render: "/assets/client/design-arc-interiors/leading-it-company.jpg",
        reality: "/assets/client/design-arc-interiors/focus-rooms.jpg",
        renderAlt: "Visualisation of a copper reception for a Bangalore IT office",
        realityAlt: "Finished focus rooms with glass fronts and colour-blocked walls",
    },
    {
        id: "coworking",
        title: "Co-working Space",
        body: "Shared floors planned for both quiet work and overlap: private rooms, open desks and a lounge that still read as one workplace.",
        icon: Laptop,
        render: "/assets/client/design-arc-interiors/generic-interiors.jpg",
        reality: "/assets/client/design-arc-interiors/focus-rooms.jpg",
        renderAlt: "Cafe lounge used to show how a generic interior wastes focus",
        realityAlt: "Two glass focus rooms with teal, orange and yellow walls",
    },
    {
        id: "turnkey",
        title: "Turnkey Solutions",
        body: "Design, coordination and delivery as one scope, from the first layout through a space that is ready to occupy.",
        icon: Handshake,
        render: "/assets/client/design-arc-interiors/reviewing-execution.jpg",
        reality: "/assets/client/design-arc-interiors/built-to-perform.jpg",
        renderAlt: "Site team reviewing execution on a scaffolded commercial building",
        realityAlt: "Finished open office held against an earlier drawing of the same floor",
    },
    {
        id: "hospitality",
        title: "Hospitality & Health care",
        body: "Reception, waiting and care rooms planned for calm movement, privacy and a clear first impression.",
        icon: HeartPulse,
        render: "/assets/client/design-arc-interiors/leading-it-company.jpg",
        reality: "/assets/client/design-arc-interiors/focus-rooms.jpg",
        renderAlt: "Reception visualisation with a ring light and timber desk",
        realityAlt: "Finished rooms with glass fronts, used here until a care-space photograph is added",
    },
    {
        id: "experience",
        title: "Experience Centres",
        body: "Brand rooms where visitors can see, try and remember the product, sequenced as a walk rather than a single showroom.",
        icon: Sparkles,
        render: "/assets/client/design-arc-interiors/generic-interiors.jpg",
        reality: "/assets/client/design-arc-interiors/leading-it-company.jpg",
        renderAlt: "Open lounge with a long window, used as a starting point for a visitor path",
        realityAlt: "Reception that stages the brand before a visitor reaches the floor",
    },
];

const DesignArcServices = () => {
    const frameRef = useRef<HTMLDivElement>(null);
    const [openId, setOpenId] = useState(services[0].id);
    const [position, setPosition] = useState(58);
    const open = services.find((service) => service.id === openId) ?? services[0];

    const setFromClientX = (clientX: number) => {
        const frame = frameRef.current;
        if (!frame) return;
        const bounds = frame.getBoundingClientRect();
        const next = ((clientX - bounds.left) / bounds.width) * 100;
        setPosition(Math.min(92, Math.max(8, next)));
    };

    const onPointerDown = (event: PointerEvent<HTMLDivElement>) => {
        event.currentTarget.setPointerCapture(event.pointerId);
        setFromClientX(event.clientX);
    };

    const onPointerMove = (event: PointerEvent<HTMLDivElement>) => {
        if (!event.currentTarget.hasPointerCapture(event.pointerId)) return;
        setFromClientX(event.clientX);
    };

    return (
        <section className="dai-services" aria-labelledby="dai-services-title">
            <h2 className="dai-services__title" id="dai-services-title">
                Our <span>Services</span>
            </h2>

            <div className="dai-services__layout">
                <div className="dai-services__list">
                    {services.map((service) => {
                        const expanded = service.id === open.id;
                        const Icon = service.icon;
                        return (
                            <article className={`dai-services__item${expanded ? " is-open" : ""}`} key={service.id}>
                                <h3>
                                    <button
                                        type="button"
                                        aria-expanded={expanded}
                                        aria-controls={`dai-service-${service.id}`}
                                        onClick={() => {
                                            setOpenId(service.id);
                                            setPosition(58);
                                        }}
                                    >
                                        <Icon size={22} strokeWidth={1.75} aria-hidden="true" />
                                        <span>{service.title}</span>
                                        {expanded ? (
                                            <Minus size={18} strokeWidth={1.75} aria-hidden="true" />
                                        ) : (
                                            <Plus size={18} strokeWidth={1.75} aria-hidden="true" />
                                        )}
                                    </button>
                                </h3>
                                <div id={`dai-service-${service.id}`} hidden={!expanded}>
                                    <p>{service.body}</p>
                                </div>
                            </article>
                        );
                    })}
                </div>

                <div
                    className="dai-compare"
                    ref={frameRef}
                    onPointerDown={onPointerDown}
                    onPointerMove={onPointerMove}
                >
                    <img className="dai-compare__base" src={open.render} alt={open.renderAlt} />
                    <img
                        className="dai-compare__top"
                        src={open.reality}
                        alt=""
                        style={{ clipPath: `inset(0 0 0 ${position}%)` }}
                    />
                    <div className="dai-compare__labels">
                        <span>Render</span>
                        <span>Reality</span>
                    </div>
                    <div
                        className="dai-compare__handle"
                        role="slider"
                        tabIndex={0}
                        aria-valuemin={8}
                        aria-valuemax={92}
                        aria-valuenow={Math.round(position)}
                        aria-label={`Compare the render and the finished ${open.title} interior`}
                        style={{ left: `${position}%` }}
                        onKeyDown={(event) => {
                            if (event.key === "ArrowLeft") setPosition((value) => Math.max(8, value - 4));
                            if (event.key === "ArrowRight") setPosition((value) => Math.min(92, value + 4));
                        }}
                    >
                        <span aria-hidden="true" />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default DesignArcServices;

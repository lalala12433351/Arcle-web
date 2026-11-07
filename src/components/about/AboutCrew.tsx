import { useCallback, useEffect, useId, useRef, useState, type CSSProperties, type KeyboardEvent } from "react";
import ScrollHighlightText from "../animation/ScrollHighlightText";
import "./AboutCrew.css";

const ABOUT_COPY =
    "Many businesses work with separate vendors for ads, SEO, social media and their website. Each handles one piece, nobody sees the full picture, and when results fall short, nobody takes responsibility. Arcle was founded in Bangalore in 2026 to change that. We set out to build one team that brings marketing, creativity and technology together, with one plan and one shared goal: the growth of the businesses we work with.";

type Person = {
    id: string;
    name: string;
    role: string;
    line: string;
    focus: string[];
    image: string;
    position: string;
    zoom?: number;
};

const people: Person[] = [
    {
        id: "ceo",
        name: "Faisal",
        role: "Founder",
        line: "Sets where Arcle is going, and stays close to the work that gets a client there.",
        focus: ["Strategy", "Growth", "Client partnerships"],
        image: "/assets/img/team/founders/faizal.png",
        position: "center center",
        zoom: 1,
    },
    {
        id: "coo",
        name: "Libin Johnson",
        role: "Founder & Digital Head",
        line: "Keeps strategy, people and delivery in one rhythm, from the brief through to launch.",
        focus: ["Operations", "Delivery", "Team"],
        image: "/assets/img/team/libin-ceo.jpg",
        position: "center center",
        zoom: 1,
    },
    {
        id: "seo",
        name: "Sanjay GS",
        role: "Founder & SEO Head",
        line: "Leads search: the technical work, the pages, and the demand those pages are built to earn.",
        focus: ["Technical SEO", "Content", "AI search"],
        image: "/assets/img/team/founders/sanjay.jpg",
        position: "center center",
        zoom: 1,
    },
];

const AboutCrew = () => {
    const trackRef = useRef<HTMLUListElement>(null);
    const [expandedId, setExpandedId] = useState<string | null>(null);
    const [canPrev, setCanPrev] = useState(false);
    const [canNext, setCanNext] = useState(false);
    const panelId = useId();

    const updateNav = useCallback(() => {
        const track = trackRef.current;
        if (!track) return;
        const max = track.scrollWidth - track.clientWidth;
        setCanPrev(track.scrollLeft > 4);
        setCanNext(track.scrollLeft < max - 4);
    }, []);

    useEffect(() => {
        const track = trackRef.current;
        if (!track) return;

        updateNav();
        track.addEventListener("scroll", updateNav, { passive: true });
        const observer = new ResizeObserver(updateNav);
        observer.observe(track);

        return () => {
            track.removeEventListener("scroll", updateNav);
            observer.disconnect();
        };
    }, [updateNav]);

    const scrollByCard = (direction: -1 | 1) => {
        const track = trackRef.current;
        if (!track) return;
        const card = track.querySelector<HTMLElement>(".about-crew__card");
        const step = card ? card.offsetWidth + 20 : track.clientWidth * 0.7;
        track.scrollBy({ left: direction * step, behavior: "smooth" });
    };

    const toggleExpanded = (id: string) => {
        setExpandedId((current) => (current === id ? null : id));
    };

    const onCardKeyDown = (event: KeyboardEvent<HTMLLIElement>, id: string) => {
        if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            toggleExpanded(id);
        }
        if (event.key === "Escape" && expandedId === id) {
            setExpandedId(null);
        }
    };

    return (
        <section className="about-crew" id="about-us" aria-labelledby="about-crew-title">
            <div className="container">
                <div className="about-crew__head">
                    <div className="about-crew__intro">
                        <h2 id="about-crew-title" className="about-crew__title">About us</h2>
                        <ScrollHighlightText
                            as="p"
                            className="about-crew__lead"
                            text={ABOUT_COPY}
                            dim={0.18}
                            blur={0}
                            start="top 78%"
                            end="bottom 40%"
                        />
                    </div>
                </div>

                <div className="about-crew__leaders">
                    <div className="about-crew__subhead">
                        <p className="about-crew__kicker">[ Where Expertise Meets Passion ]</p>
                        <h3 className="about-crew__subtitle">
                            A Team of Visionary Leaders Driving Innovation
                        </h3>
                    </div>

                    <div className="about-crew__stage">
                        <ul
                            ref={trackRef}
                            className="about-crew__track"
                            aria-label="Leadership team"
                        >
                            {people.map((member) => {
                                const isOpen = expandedId === member.id;
                                const detailId = `${panelId}-${member.id}`;

                                return (
                                    <li
                                        key={member.id}
                                        className={`about-crew__card${isOpen ? " is-open" : ""}`}
                                        style={
                                            {
                                                "--crew-pos": member.position,
                                                "--crew-zoom": member.zoom ?? 1,
                                            } as CSSProperties
                                        }
                                        tabIndex={0}
                                        aria-expanded={isOpen}
                                        aria-controls={detailId}
                                        onKeyDown={(event) => onCardKeyDown(event, member.id)}
                                    >
                                        <button
                                            type="button"
                                            className="about-crew__plus"
                                            aria-label={
                                                isOpen
                                                    ? `Hide details for ${member.name}`
                                                    : `Show details for ${member.name}`
                                            }
                                            aria-expanded={isOpen}
                                            aria-controls={detailId}
                                            onClick={() => toggleExpanded(member.id)}
                                        >
                                            <span aria-hidden="true" />
                                        </button>

                                        <div className="about-crew__portrait">
                                            <img
                                                src={member.image}
                                                alt=""
                                                width={480}
                                                height={640}
                                                loading="lazy"
                                                draggable={false}
                                            />
                                        </div>

                                        <div className="about-crew__caption">
                                            <h4 className="about-crew__name">{member.name}</h4>
                                            <p className="about-crew__role">{member.role}</p>
                                        </div>

                                        <div
                                            id={detailId}
                                            className="about-crew__detail"
                                            role="region"
                                            aria-label={`${member.name} details`}
                                            aria-hidden={!isOpen}
                                        >
                                            <p className="about-crew__line">{member.line}</p>
                                            <ul
                                                className="about-crew__tags"
                                                aria-label={`${member.name}'s focus areas`}
                                            >
                                                {member.focus.map((item) => (
                                                    <li key={item}>{item}</li>
                                                ))}
                                            </ul>
                                        </div>
                                    </li>
                                );
                            })}
                        </ul>

                        <div className="about-crew__nav" role="group" aria-label="Browse leadership">
                            <button
                                type="button"
                                className="about-crew__nav-btn"
                                aria-label="Previous"
                                disabled={!canPrev}
                                onClick={() => scrollByCard(-1)}
                            >
                                <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
                                    <path
                                        d="M14.5 6.5 9 12l5.5 5.5"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="1.8"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                </svg>
                            </button>
                            <button
                                type="button"
                                className="about-crew__nav-btn"
                                aria-label="Next"
                                disabled={!canNext}
                                onClick={() => scrollByCard(1)}
                            >
                                <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
                                    <path
                                        d="M9.5 6.5 15 12l-5.5 5.5"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="1.8"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AboutCrew;

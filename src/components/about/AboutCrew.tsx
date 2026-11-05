import type { CSSProperties } from "react";
import "./AboutCrew.css";

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
        position: "50% 20%",
    },
    {
        id: "coo",
        name: "Libin Johnson",
        role: "Founder & Digital Head",
        line: "Keeps strategy, people and delivery in one rhythm, from the brief through to launch.",
        focus: ["Operations", "Delivery", "Team"],
        image: "/assets/img/team/founders/libin.jpg",
        position: "50% 50%",
    },
    {
        id: "seo",
        name: "Sanjay GS",
        role: "Founder & SEO Head",
        line: "Leads search: the technical work, the pages, and the demand those pages are built to earn.",
        focus: ["Technical SEO", "Content", "AI search"],
        image: "/assets/img/team/founders/sanjay.jpg",
        position: "50% 50%",
    },
];

const facts: { label: string; value: string; href?: string }[] = [
    { label: "Headquarters", value: "Bangalore, India" },
    { label: "Serving", value: "India & international markets" },
    { label: "One team for", value: "Marketing, design, content & development" },
    { label: "Email", value: "info@arcle.in", href: "mailto:info@arcle.in" },
    { label: "Phone", value: "+91 96063 52255", href: "tel:+919606352255" },
];

const AboutCrew = () => {
    return (
        <section className="about-crew" id="about-us" aria-labelledby="about-crew-title">
            <div className="container">
                <div className="about-crew__head">
                    <div className="about-crew__intro">
                        <h2 id="about-crew-title" className="about-crew__title">About us</h2>
                        <p className="about-crew__lead">
                            Many businesses work with separate vendors for ads, SEO, social media and their website. Each
                            handles one piece, nobody sees the full picture, and when results fall short, nobody takes
                            responsibility. Arcle was founded in Bangalore in 2026 to change that. We set out to build one
                            team that brings marketing, creativity and technology together, with one plan and one shared
                            goal: the growth of the businesses we work with.
                        </p>
                    </div>
                    <dl className="about-crew__facts">
                        {facts.map((fact) => (
                            <div className="about-crew__fact" key={fact.label}>
                                <dt>{fact.label}</dt>
                                <dd>{fact.href ? <a href={fact.href}>{fact.value}</a> : fact.value}</dd>
                            </div>
                        ))}
                    </dl>
                </div>

                <div className="about-crew__subhead">
                    <h3 className="about-crew__subtitle">Leadership</h3>
                    <p className="about-crew__note">Three founders, one team.</p>
                </div>
                <ul className="about-crew__row">
                    {people.map((member) => (
                        <li key={member.id} className="about-crew__person">
                            <div className="about-crew__id">
                                <span
                                    className="about-crew__frame"
                                    style={{ "--crew-pos": member.position, "--crew-zoom": member.zoom ?? 1 } as CSSProperties}
                                >
                                    <img
                                        src={member.image}
                                        alt={`${member.name}, ${member.role} at Arcle`}
                                        width={256}
                                        height={256}
                                        loading="lazy"
                                        draggable={false}
                                    />
                                </span>
                                <div className="about-crew__who">
                                    <h4 className="about-crew__name">{member.name}</h4>
                                    <p className="about-crew__role">{member.role}</p>
                                </div>
                            </div>
                            <p className="about-crew__line">{member.line}</p>
                            <ul className="about-crew__tags" aria-label={`${member.name}'s focus areas`}>
                                {member.focus.map((item) => (
                                    <li key={item}>{item}</li>
                                ))}
                            </ul>
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    );
};

export default AboutCrew;

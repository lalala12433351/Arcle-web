import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import designArc from "./logos/design-arc.webp";
import kiteAviation from "./logos/kite-aviation.png";
import updrive from "./logos/updrive.webp";
import mirai from "./logos/mirai.webp";
import mercedesBenz from "./logos/mercedes-benz.png";
import gkVale from "./logos/gk-vale.png";
import stryvFit from "./logos/stryv-fit.png";
import keralaBlasters from "./logos/kerala-blasters.png";
import vantagePoint from "./logos/vantage-point.png";
import "./ClientRoster.css";

interface Client {
    name: string;
    lead: string;
    body: string;
    logo: string;
    href?: string;
    mark?: "kite" | "tile" | "square";
}

const clients: Client[] = [
    {
        name: "Design Arc",
        lead: "Office interiors that get found.",
        body: "Search, answer-engine visibility and campaigns so companies looking for fit-outs in Bangalore reach Design Arc and turn into qualified enquiries.",
        logo: designArc,
        href: "/projects/design-arc-interiors",
    },
    {
        name: "Kite",
        lead: "Admissions with a real follow-up.",
        body: "Course pages, paid campaigns and a CRM so aviation and hospitality enquiries move from the first click to a counselling session.",
        logo: kiteAviation,
        href: "/projects/kite-aviation-institute",
        mark: "kite",
    },
    {
        name: "Updrive",
        lead: "A brand kept in the market.",
        body: "Updrive sits on this roster beside the studios whose sites, search and film we build and keep in front of the people who buy.",
        logo: updrive,
    },
    {
        name: "Mirai",
        lead: "A furniture brand, established from day one.",
        body: "Identity, a product site, search and social so offices buying furniture in Bangalore can find Mirai and enquire.",
        logo: mirai,
        href: "/projects/mirai",
    },
    {
        name: "Mercedes-Benz",
        lead: "A marque, kept local.",
        body: "Dealer-side content and campaigns so buyers in the region find the showroom and book a drive.",
        logo: mercedesBenz,
        mark: "square",
    },
    {
        name: "G.K. Vale",
        lead: "Since 1910, still in view.",
        body: "A heritage photography name kept in front of the people looking for it today.",
        logo: gkVale,
        mark: "square",
    },
    {
        name: "Stryv Fit",
        lead: "A fitness brand with momentum.",
        body: "Brand, social and film that bring members through the door and keep them training.",
        logo: stryvFit,
        mark: "tile",
    },
    {
        name: "Kerala Blasters",
        lead: "A club and its fans.",
        body: "Content and film for a supporter base that shows up every matchday.",
        logo: keralaBlasters,
        mark: "square",
    },
    {
        name: "Vantage Point",
        lead: "Property, presented properly.",
        body: "Listings, search and campaigns so buyers find Vantage Point Property and enquire.",
        logo: vantagePoint,
    },
];

const columnQueries: [string, number][] = [
    ["(min-width: 1200px)", 6],
    ["(min-width: 768px)", 3],
    ["(min-width: 480px)", 2],
];

const ClientRoster = () => {
    const reduceMotion = useReducedMotion();
    const [active, setActive] = useState(0);
    const [lit, setLit] = useState(false);
    const [columns, setColumns] = useState(6);

    useEffect(() => {
        const queries = columnQueries.map(([media, count]) => [window.matchMedia(media), count] as const);
        const apply = () => setColumns(queries.find(([query]) => query.matches)?.[1] ?? 1);
        apply();
        queries.forEach(([query]) => query.addEventListener("change", apply));
        return () => queries.forEach(([query]) => query.removeEventListener("change", apply));
    }, []);

    const activeRow = Math.floor(active / columns);
    const current = clients[active];

    return (
        <section className="client-roster default-padding" aria-labelledby="client-roster-title">
            <div className="container">
                <div className="client-roster__intro">
                    <h2 id="client-roster-title" className="client-roster__title">
                        <span className="client-roster__prefix">
                            Selected work with
                            <span className="client-roster__swap">
                                <AnimatePresence mode="popLayout" initial={false}>
                                    <motion.span
                                        key={current.name}
                                        className="client-roster__word"
                                        initial={reduceMotion ? false : { y: "70%", opacity: 0, filter: "blur(6px)" }}
                                        animate={{ y: "0%", opacity: 1, filter: "blur(0px)" }}
                                        exit={reduceMotion ? undefined : { y: "-70%", opacity: 0, filter: "blur(6px)" }}
                                        transition={{ duration: reduceMotion ? 0 : 0.38, ease: [0.22, 1, 0.36, 1] }}
                                    >
                                        {current.name}
                                    </motion.span>
                                </AnimatePresence>
                            </span>
                        </span>
                    </h2>
                    <p className="client-roster__lede">
                        Studios we build search, brand and film for.
                    </p>
                </div>

                <ul
                    className="client-roster__board"
                    onMouseLeave={() => setLit(false)}
                    onBlur={(event) => {
                        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
                            setLit(false);
                        }
                    }}
                >
                    {clients.map((client, index) => {
                        const row = Math.floor(index / columns);
                        const className = [
                            "client-roster__card",
                            client.mark ? `client-roster__card--${client.mark}` : "",
                            lit && row === activeRow ? "is-row" : "",
                            lit && index === active ? "is-active" : "",
                        ]
                            .filter(Boolean)
                            .join(" ");
                        const content = (
                            <>
                                <span className="client-roster__logo">
                                    <img src={client.logo} alt="" />
                                </span>
                                <p>
                                    <span>{client.lead}</span> {client.body}
                                </p>
                            </>
                        );
                        const shared = {
                            className,
                            onMouseEnter: () => {
                                setActive(index);
                                setLit(true);
                            },
                            onFocus: () => {
                                setActive(index);
                                setLit(true);
                            },
                        };

                        return (
                            <li key={client.name}>
                                {client.href ? (
                                    <Link to={client.href} {...shared} aria-label={client.name}>
                                        {content}
                                    </Link>
                                ) : (
                                    <div {...shared} tabIndex={0} aria-label={client.name}>
                                        {content}
                                    </div>
                                )}
                            </li>
                        );
                    })}
                </ul>
            </div>
        </section>
    );
};

export default ClientRoster;

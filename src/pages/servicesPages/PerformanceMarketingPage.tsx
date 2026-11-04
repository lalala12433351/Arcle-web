import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import FooterV1 from "../../components/footer/FooterV1";
import HeaderV1 from "../../components/header/HeaderV1";
import ThemeDark from "../../components/switcher/ThemeDark";
import {
    perfConnect,
    perfControl,
    perfFaqs,
    perfKpis,
    perfLoop,
    perfMeta,
    perfModes,
    perfOutcomes,
    perfPlatforms,
    perfStory,
    perfWeek,
} from "../../content/performanceMarketing";
import "./PerformanceMarketing.css";

const PerformanceMarketingPage = () => {
    const [kpiIndex, setKpiIndex] = useState(0);
    const [mode, setMode] = useState<(typeof perfModes)[number]["key"]>("strategy");
    const [loop, setLoop] = useState<(typeof perfLoop)[number]["key"]>("test");
    const [openFaq, setOpenFaq] = useState(0);

    useEffect(() => {
        const id = window.setInterval(() => {
            setKpiIndex((i) => (i + 1) % perfKpis.length);
        }, 2200);
        return () => window.clearInterval(id);
    }, []);

    const activeMode = perfModes.find((item) => item.key === mode) ?? perfModes[0];
    const activeLoop = perfLoop.find((item) => item.key === loop) ?? perfLoop[0];

    return (
        <>
            <Helmet>
                <title>{perfMeta.title}</title>
                <meta name="description" content={perfMeta.description} />
            </Helmet>

            <div className="smooth-scroll-container pm">
                <HeaderV1 onDarkHero />

                <section className="pm-hero" aria-labelledby="pm-hero-title">
                    <div className="container">
                        <p className="pm-hero__eyebrow">Performance marketing</p>
                        <h1 id="pm-hero-title">
                            The team that runs your paid
                            <br />
                            media against your{" "}
                            <span className="pm-hero__kpi" key={perfKpis[kpiIndex]}>
                                {perfKpis[kpiIndex]}.
                            </span>
                        </h1>
                        <p className="pm-hero__lead">
                            We plan, launch and tune every campaign around that number across Google, Meta, LinkedIn and YouTube — with tracking, creative and landing pages under one roof. Every move is logged. Your accounts stay yours.
                        </p>
                        <div className="pm-hero__actions">
                            <Link to="/contact-us" className="pm-btn pm-btn--primary">
                                Start a project
                                <ArrowUpRight aria-hidden="true" strokeWidth={1.75} />
                            </Link>
                            <Link to="/project" className="pm-btn pm-btn--ghost">
                                See the work
                            </Link>
                        </div>
                    </div>
                </section>

                <section className="pm-pitch">
                    <div className="container pm-pitch__grid">
                        <div>
                            <h2>
                                Your ads never log off.
                                <span> Now your media team doesn’t either.</span>
                            </h2>
                            <p>
                                Hand us your KPI. We plan, launch and tune campaigns around that number across{" "}
                                {perfPlatforms.map((name, i) => (
                                    <span key={name}>
                                        {i > 0 && (i === perfPlatforms.length - 1 ? " and " : ", ")}
                                        <strong>{name}</strong>
                                    </span>
                                ))}
                                , and log every move.
                            </p>
                        </div>
                        <ul className="pm-pitch__platforms" aria-label="Channels">
                            {perfPlatforms.map((name) => (
                                <li key={name}>{name}</li>
                            ))}
                        </ul>
                    </div>
                </section>

                <section className="pm-outcomes" aria-labelledby="pm-outcomes-title">
                    <div className="container">
                        <h2 id="pm-outcomes-title">How it operates</h2>
                        <ol className="pm-outcomes__list">
                            {perfOutcomes.map((item) => (
                                <li key={item.id}>
                                    <span>{item.id}</span>
                                    <h3>{item.title}</h3>
                                    <p>{item.text}</p>
                                </li>
                            ))}
                        </ol>
                    </div>
                </section>

                <section className="pm-modes" aria-labelledby="pm-modes-title">
                    <div className="container">
                        <h2 id="pm-modes-title">
                            We do the labor. <span>You do the judgement.</span>
                        </h2>
                        <p className="pm-modes__lead">
                            Strategy that thinks, ops that enforce, research that reports. Everything that changes your account lands for your call — and every result feeds the next cycle.
                        </p>

                        <div className="pm-modes__tabs" role="tablist" aria-label="Operating modes">
                            {perfModes.map((item) => (
                                <button
                                    key={item.key}
                                    type="button"
                                    role="tab"
                                    aria-selected={mode === item.key}
                                    className={mode === item.key ? "is-active" : undefined}
                                    onClick={() => setMode(item.key)}
                                >
                                    {item.label}
                                </button>
                            ))}
                        </div>

                        <div className="pm-modes__panel" role="tabpanel">
                            <div className="pm-modes__copy">
                                <p className="pm-modes__cadence">{activeMode.cadence}</p>
                                <h3>{activeMode.title}</h3>
                                <p>{activeMode.blurb}</p>
                            </div>
                            <ul className="pm-modes__cards">
                                {activeMode.items.map((item) => (
                                    <li key={item.title}>
                                        <h4>{item.title}</h4>
                                        <p>{item.detail}</p>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </section>

                <section className="pm-connect" aria-labelledby="pm-connect-title">
                    <div className="container">
                        <h2 id="pm-connect-title">
                            Connected to your stack. <span>Fluent in your brand.</span>
                        </h2>
                        <ol className="pm-connect__list">
                            {perfConnect.map((item) => (
                                <li key={item.step}>
                                    <span>{item.step}</span>
                                    <h3>{item.title}</h3>
                                    <p>{item.text}</p>
                                </li>
                            ))}
                        </ol>
                    </div>
                </section>

                <section className="pm-story" aria-labelledby="pm-story-title">
                    <div className="container pm-story__grid">
                        <div>
                            <p className="pm-story__label">Work</p>
                            <h2 id="pm-story-title">{perfStory.client}</h2>
                            <p className="pm-story__role">{perfStory.role}</p>
                            <blockquote>{perfStory.quote}</blockquote>
                            <Link to={perfStory.href} className="pm-btn pm-btn--primary">
                                {perfStory.cta}
                                <ArrowUpRight aria-hidden="true" strokeWidth={1.75} />
                            </Link>
                        </div>
                        <div className="pm-story__frame" aria-hidden="true">
                            <div className="pm-story__metric">
                                <span>Search · Social · Creative</span>
                                <strong>One plan</strong>
                            </div>
                            <div className="pm-story__metric">
                                <span>Accounts</span>
                                <strong>Client-owned</strong>
                            </div>
                            <div className="pm-story__metric">
                                <span>Loop</span>
                                <strong>Test → Scale</strong>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="pm-loop" aria-labelledby="pm-loop-title">
                    <div className="container">
                        <h2 id="pm-loop-title">The media buyer’s loop — at team speed.</h2>
                        <p className="pm-loop__lead">
                            You set the goal and the limits. We test, track, optimise and scale against them while the auction is open.
                        </p>

                        <div className="pm-loop__nav" role="tablist" aria-label="Loop stages">
                            {perfLoop.map((item) => (
                                <button
                                    key={item.key}
                                    type="button"
                                    role="tab"
                                    aria-selected={loop === item.key}
                                    className={loop === item.key ? "is-active" : undefined}
                                    onClick={() => setLoop(item.key)}
                                >
                                    <span>{item.step}</span>
                                    {item.title}
                                </button>
                            ))}
                        </div>

                        <div className="pm-loop__panel" role="tabpanel">
                            <p className="pm-loop__step">{activeLoop.step} · {activeLoop.title}</p>
                            <h3>{activeLoop.heading}</h3>
                            <p>{activeLoop.text}</p>
                            <ul>
                                {activeLoop.points.map((point) => (
                                    <li key={point}>{point}</li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </section>

                <section className="pm-week" aria-labelledby="pm-week-title">
                    <div className="container">
                        <h2 id="pm-week-title">The same week, with Arcle on.</h2>
                        <div className="pm-week__grid">
                            {[perfWeek.before, perfWeek.after].map((column) => (
                                <div key={column.label} className="pm-week__col">
                                    <header>
                                        <h3>{column.label}</h3>
                                        <p>
                                            {column.handsOn}
                                            <span>{column.handoffs}</span>
                                        </p>
                                    </header>
                                    <ul>
                                        {column.rows.map((row) => (
                                            <li key={`${column.label}-${row.task}`}>
                                                <div>
                                                    <strong>{row.who}</strong>
                                                    <span>{row.task}</span>
                                                </div>
                                                <em>{row.time}</em>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                <section className="pm-control" aria-labelledby="pm-control-title">
                    <div className="container">
                        <h2 id="pm-control-title">Control over your own ad accounts.</h2>
                        <ul className="pm-control__list">
                            {perfControl.map((item) => (
                                <li key={item.title}>
                                    <h3>{item.title}</h3>
                                    <p>{item.text}</p>
                                </li>
                            ))}
                        </ul>
                    </div>
                </section>

                <section className="pm-faq" aria-labelledby="pm-faq-title">
                    <div className="container">
                        <h2 id="pm-faq-title">Everything buyers ask before they switch.</h2>
                        <div className="pm-faq__list">
                            {perfFaqs.map((item, index) => {
                                const open = openFaq === index;
                                return (
                                    <div className="pm-faq__item" key={item.q}>
                                        <h3>
                                            <button
                                                type="button"
                                                aria-expanded={open}
                                                onClick={() => setOpenFaq(open ? -1 : index)}
                                            >
                                                {item.q}
                                                <span aria-hidden="true">{open ? "−" : "+"}</span>
                                            </button>
                                        </h3>
                                        {open && <p>{item.a}</p>}
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </section>

                <section className="pm-close" aria-labelledby="pm-close-title">
                    <div className="container">
                        <h2 id="pm-close-title">
                            One day, your team will run strategy while paid media runs with discipline.
                            <span> That day can start this week.</span>
                        </h2>
                        <Link to="/contact-us" className="pm-btn pm-btn--primary">
                            Start a project
                            <ArrowUpRight aria-hidden="true" strokeWidth={1.75} />
                        </Link>
                    </div>
                </section>

                <FooterV1 />
                <ThemeDark />
            </div>
        </>
    );
};

export default PerformanceMarketingPage;

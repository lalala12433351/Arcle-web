import { useEffect, useId, useState, type CSSProperties } from "react";
import { Search } from "lucide-react";
import type { SceneProps } from "../ServiceCanvas";
import { usePlayedOnce, useReducedMotion } from "../useServicesPage";

const QUERY = "office interiors bangalore";

const changes = [
    {
        label: "Improved title",
        before: "Home – Your Brand",
        after: "Office Interior Design & Fit-outs in Bangalore – Your Brand",
    },
    {
        label: "Clearer description",
        before: "Welcome to our website. We do interiors.",
        after: "Turnkey office interiors from planning to handover. See completed workplaces and book a site visit.",
    },
    {
        label: "Structured content",
        before: "No business details for search engines to read.",
        after: "Sitelinks, address and opening hours marked up so they can appear with the result.",
    },
];

const SearchScene = ({ active }: SceneProps) => {
    const played = usePlayedOnce(active);
    const reduced = useReducedMotion();
    const [typed, setTyped] = useState(0);
    const [open, setOpen] = useState(false);
    const panelId = useId();

    useEffect(() => {
        if (!played || reduced || typed >= QUERY.length) return;
        const timer = window.setTimeout(() => setTyped((count) => count + 1), typed === 0 ? 300 : 42);
        return () => window.clearTimeout(timer);
    }, [played, reduced, typed]);

    const ready = reduced || typed >= QUERY.length;
    const query = reduced ? QUERY : QUERY.slice(0, typed);

    return (
        <div className={`scene scene-search${ready ? " is-ready" : ""}`}>
            <div className="scene-search__bar">
                <Search size={16} strokeWidth={2} aria-hidden="true" />
                <span className="scene-search__query" aria-label={`Search query: ${QUERY}`}>
                    <span aria-hidden="true">{query}</span>
                    {!ready && <span className="scene-search__caret" aria-hidden="true" />}
                </span>
            </div>

            <div className="scene-search__body">
                {open ? (
                    <div className="scene-search__changes scene-swap" id={panelId}>
                        <p className="scene__kicker">What changed on the example result</p>
                        <dl>
                            {changes.map((change) => (
                                <div key={change.label}>
                                    <dt>{change.label}</dt>
                                    <dd>
                                        <span className="scene-search__before">Before: {change.before}</span>
                                        <span className="scene-search__after">After: {change.after}</span>
                                    </dd>
                                </div>
                            ))}
                        </dl>
                    </div>
                ) : (
                    <ol className="scene-search__results" aria-label="Sample search results">
                        <li style={{ "--i": 0 } as CSSProperties}>
                            <span className="result__site">directory.example › bangalore</span>
                            <span className="result__title">Office interior companies in Bangalore: a buyer's list</span>
                            <span className="result__text">Compare firms by project size, location and services before you shortlist.</span>
                        </li>
                        <li className="is-brand" style={{ "--i": 1 } as CSSProperties}>
                            <span className="result__site">yourbrand.com</span>
                            <span className="result__title">Office Interior Design & Fit-outs in Bangalore – Your Brand</span>
                            <span className="result__text">
                                Turnkey office interiors from planning to handover. See completed workplaces and book a site visit.
                            </span>
                            <span className="result__sitelinks">Projects · Services · Book a visit</span>
                        </li>
                        <li style={{ "--i": 2 } as CSSProperties}>
                            <span className="result__site">guide.example › workplace</span>
                            <span className="result__title">How to plan an office fit-out: a practical guide</span>
                            <span className="result__text">Budgets, timelines and approvals explained step by step.</span>
                        </li>
                    </ol>
                )}
            </div>

            <div className="scene-search__foot">
                <button
                    type="button"
                    className="scene-link"
                    aria-expanded={open}
                    aria-controls={open ? panelId : undefined}
                    onClick={() => setOpen((value) => !value)}
                >
                    {open ? "Back to results" : "See what changed"}
                    <span aria-hidden="true">{open ? "−" : "+"}</span>
                </button>
                <p className="scene__foot">A demonstration of clearer search presentation, not a ranking promise.</p>
            </div>
        </div>
    );
};

export default SearchScene;

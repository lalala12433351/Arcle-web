import { useState, type CSSProperties } from "react";
import type { SceneProps } from "../ServiceCanvas";
import { usePlayedOnce } from "../useServicesPage";
import SceneTabs from "./SceneTabs";

type Channel = "google" | "meta" | "linkedin";

const channels: { id: Channel; label: string }[] = [
    { id: "google", label: "Google" },
    { id: "meta", label: "Meta" },
    { id: "linkedin", label: "LinkedIn" },
];

const journey = [
    { title: "Ad", text: "The right person sees a clear offer." },
    { title: "Visit", text: "They land on a page built for that offer." },
    { title: "Enquiry", text: "They call, message or fill in the form." },
];

const AdPreview = ({ channel }: { channel: Channel }) => {
    if (channel === "google") {
        return (
            <div className="ad ad--google">
                <p className="ad__meta">
                    <strong>Sponsored</strong> · yourbrand.com › site-visit
                </p>
                <p className="ad__headline">Office Interiors in Bangalore – Book a Free Site Visit</p>
                <p className="ad__copy">
                    Plan, design and fit out your workspace with one team. See recent projects and get a clear quote.
                </p>
                <p className="ad__links">Our projects · Fit-out process · Contact</p>
            </div>
        );
    }

    if (channel === "meta") {
        return (
            <div className="ad ad--meta">
                <p className="ad__meta">
                    <span className="ad__avatar" aria-hidden="true">Y</span>
                    <strong>Your Brand</strong> · Sponsored
                </p>
                <div className="ad__visual">
                    <span>Workspaces your team will want to come back to.</span>
                </div>
                <div className="ad__footer">
                    <span>yourbrand.com</span>
                    <span className="ad__cta">Book a visit</span>
                </div>
            </div>
        );
    }

    return (
        <div className="ad ad--linkedin">
            <p className="ad__meta">
                <span className="ad__avatar ad__avatar--square" aria-hidden="true">Y</span>
                <strong>Your Brand</strong> · Promoted
            </p>
            <p className="ad__copy">
                Planning an office move this year? Our fit-out checklist covers budget, timelines and approvals.
            </p>
            <div className="ad__doc">
                <span>The office fit-out checklist</span>
                <span className="ad__cta">Download</span>
            </div>
        </div>
    );
};

const CampaignScene = ({ active }: SceneProps) => {
    const played = usePlayedOnce(active);
    const [channel, setChannel] = useState<Channel>("google");

    return (
        <div className={`scene scene-campaign${played ? " is-played" : ""}`}>
            <div className="scene__head">
                <div>
                    <p className="scene__kicker">Campaign</p>
                    <p className="scene__title">Sample ad preview</p>
                </div>
            </div>

            <SceneTabs label="Ad channel" tabs={channels} value={channel} onChange={setChannel}>
                {({ id, labelledBy }) => (
                    <div className="scene-campaign__preview" role="tabpanel" id={id} aria-labelledby={labelledBy}>
                        <div className="scene-swap" key={channel}>
                            <AdPreview channel={channel} />
                        </div>
                    </div>
                )}
            </SceneTabs>

            <div className="journey">
                <svg className="journey__line" viewBox="0 0 100 2" preserveAspectRatio="none" aria-hidden="true">
                    <line x1="0" y1="1" x2="100" y2="1" pathLength={1} />
                </svg>
                <ol className="journey__steps" aria-label="Customer journey">
                    {journey.map((step, index) => (
                        <li key={step.title} style={{ "--i": index } as CSSProperties}>
                            <span className="journey__dot" aria-hidden="true" />
                            <strong>{step.title}</strong>
                            <span>{step.text}</span>
                        </li>
                    ))}
                </ol>
            </div>

            <p className="scene__foot">Sample content for illustration. Not client results.</p>
        </div>
    );
};

export default CampaignScene;

import { useState, type CSSProperties } from "react";
import { Menu, Monitor, Smartphone } from "lucide-react";
import type { SceneProps } from "../ServiceCanvas";
import { usePlayedOnce } from "../useServicesPage";

type Device = "desktop" | "mobile";

const blocks = [
    { title: "Office interiors", text: "Layouts planned around how your team actually works." },
    { title: "Turnkey fit-outs", text: "One team from drawings to handover." },
    { title: "Site visits", text: "Walk a finished workplace before you decide." },
];

const step = (index: number) => ({ "--i": index }) as CSSProperties;

const SitePreviewScene = ({ active }: SceneProps) => {
    const played = usePlayedOnce(active);
    const [device, setDevice] = useState<Device>("desktop");

    return (
        <div className={`scene scene-site${played ? " is-played" : ""}`}>
            <div className="scene__head">
                <div>
                    <p className="scene__kicker">Website</p>
                    <p className="scene__title">Sample business website</p>
                </div>
                <div className="scene-device" role="group" aria-label="Preview size">
                    {(["desktop", "mobile"] as Device[]).map((option) => (
                        <button
                            key={option}
                            type="button"
                            className={`scene-device__btn${device === option ? " is-selected" : ""}`}
                            aria-pressed={device === option}
                            onClick={() => setDevice(option)}
                        >
                            {option === "desktop" ? (
                                <Monitor size={14} strokeWidth={2} aria-hidden="true" />
                            ) : (
                                <Smartphone size={14} strokeWidth={2} aria-hidden="true" />
                            )}
                            {option === "desktop" ? "Desktop" : "Mobile"}
                        </button>
                    ))}
                </div>
            </div>

            <div className="scene-site__stage">
                <div className={`site site--${device}`}>
                    <div className="site__nav" style={step(0)}>
                        <span className="site__logo">Your Brand</span>
                        <span className="site__links">
                            <span>Work</span>
                            <span>Services</span>
                            <span>About</span>
                        </span>
                        <span className="site__nav-cta">Book a visit</span>
                        <Menu className="site__menu" size={14} strokeWidth={2} aria-hidden="true" />
                    </div>
                    <div className="site__hero">
                        <div className="site__hero-copy">
                            <p className="site__eyebrow" style={step(1)}>Office interiors · Bangalore</p>
                            <p className="site__headline" style={step(2)}>Workspaces that work as hard as you do.</p>
                            <span className="site__button" style={step(3)}>See our projects</span>
                        </div>
                        <div className="site__image" style={step(4)}>
                            <img
                                src="/assets/client/design-arc-interiors/built-to-perform.jpg"
                                alt=""
                                loading="lazy"
                                decoding="async"
                            />
                        </div>
                    </div>
                    <div className="site__blocks">
                        {blocks.map((block, index) => (
                            <div className="site__block" key={block.title} style={step(5 + index)}>
                                <span className="site__block-num">0{index + 1}</span>
                                <strong>{block.title}</strong>
                                <span>{block.text}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SitePreviewScene;

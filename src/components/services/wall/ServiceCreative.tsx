import { Heart, MessageCircle, Play, Send } from "lucide-react";
import ServiceWallSection from "./ServiceWallSection";
import { findService } from "./serviceWallContent";

const creative = findService("Creative");

const faceMap: Record<string, number> = {
    "Logo Design": 0,
    "Brand Identity": 1,
    "UI/UX": 2,
    "Ad Creatives": 3,
    "Social Creatives": 4,
    "Video Creatives": 5,
};

const BrandCube = () => (
    <div className="svc-cre">
        <div className="svc-cre__shadow" />
        <div className="svc-cre__tilt">
            <div className="svc-cre__cube">
                <div className="svc-cre__face svc-cre__face--logo">
                    <svg viewBox="0 0 100 100" aria-hidden="true">
                        <path d="M16 84 A34 34 0 0 1 84 84" fill="none" stroke="#236bff" strokeWidth="15" strokeLinecap="round" />
                        <circle cx="50" cy="70" r="10" fill="currentColor" style={{ color: "var(--wall-ink)" }} />
                    </svg>
                    <span className="svc-cre__caption">Logo</span>
                </div>

                <div className="svc-cre__face svc-cre__face--brand">
                    <span className="svc-cre__swatch svc-cre__swatch--ink" />
                    <span className="svc-cre__swatch svc-cre__swatch--accent" />
                    <span className="svc-cre__swatch svc-cre__swatch--cream" />
                    <span className="svc-cre__specimen">Aa</span>
                    <span className="svc-cre__caption">Identity</span>
                </div>

                <div className="svc-cre__face svc-cre__face--ui">
                    <i />
                    <i />
                    <span className="svc-cre__screen-card" />
                    <b>Continue</b>
                    <span className="svc-cre__caption">UI/UX</span>
                </div>

                <div className="svc-cre__face svc-cre__face--ad">
                    <strong>Make it unmissable.</strong>
                    <em>Shop now</em>
                    <span className="svc-cre__caption">Ad creative</span>
                </div>

                <div className="svc-cre__face svc-cre__face--social">
                    <span className="svc-cre__handle">@yourbrand</span>
                    <span className="svc-cre__post" />
                    <span className="svc-cre__actions">
                        <Heart size={16} strokeWidth={2} aria-hidden="true" />
                        <MessageCircle size={16} strokeWidth={2} aria-hidden="true" />
                        <Send size={16} strokeWidth={2} aria-hidden="true" />
                    </span>
                    <span className="svc-cre__caption">Social</span>
                </div>

                <div className="svc-cre__face svc-cre__face--video">
                    <span className="svc-cre__play">
                        <Play size={26} strokeWidth={2} fill="currentColor" aria-hidden="true" />
                    </span>
                    <span className="svc-cre__timeline" />
                    <span className="svc-cre__caption">Video</span>
                </div>
            </div>
        </div>
    </div>
);

const ServiceCreative = () => (
    <ServiceWallSection
        service="creative"
        title={creative.title}
        summary={creative.summary}
        paragraphs={(creative.body ?? "").split("\n\n").filter(Boolean)}
        groups={creative.groups}
        visual={<BrandCube />}
        visualLabel="A cube of brand work turning in 3D: logo, identity, interface, ad, social post and video"
        faceMap={faceMap}
    />
);

export default ServiceCreative;

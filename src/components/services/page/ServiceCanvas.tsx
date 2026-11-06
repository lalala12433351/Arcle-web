import type { ComponentType } from "react";
import { serviceEntries, type ServiceKey } from "./servicesContent";
import ArtboardScene from "./scenes/ArtboardScene";
import CampaignScene from "./scenes/CampaignScene";
import SearchScene from "./scenes/SearchScene";
import SitePreviewScene from "./scenes/SitePreviewScene";

export type SceneProps = { active: boolean };

const scenes: Record<ServiceKey, { Component: ComponentType<SceneProps>; address: string }> = {
    marketing: { Component: CampaignScene, address: "Campaign overview" },
    seo: { Component: SearchScene, address: "Search results" },
    development: { Component: SitePreviewScene, address: "yourbrand.com" },
    creative: { Component: ArtboardScene, address: "Artboard" },
};

interface ServiceCanvasProps {
    keys: ServiceKey[];
    visible: ServiceKey;
    playing: boolean;
    inline?: boolean;
}

const ServiceCanvas = ({ keys, visible, playing, inline = false }: ServiceCanvasProps) => (
    <div className={`services-canvas${inline ? " services-canvas--inline" : ""}`}>
        <div className="services-canvas__bar">
            <span className="services-canvas__dots" aria-hidden="true">
                <i />
                <i />
                <i />
            </span>
            <span className="services-canvas__address" aria-hidden="true">
                {keys.map((key) => (
                    <span key={key} className={key === visible ? "is-current" : undefined}>
                        {scenes[key].address}
                    </span>
                ))}
            </span>
            <span className="services-canvas__note">Illustrative</span>
        </div>
        <div className="services-canvas__body">
            {keys.map((key) => {
                const { Component } = scenes[key];
                const current = key === visible;
                const label = serviceEntries.find((entry) => entry.key === key)?.sceneLabel;
                return (
                    <section
                        key={key}
                        className={`services-scene services-scene--${key}${current ? " is-current" : ""}`}
                        aria-label={label}
                        aria-hidden={current ? undefined : true}
                        inert={!current}
                    >
                        <Component active={current && playing} />
                    </section>
                );
            })}
        </div>
    </div>
);

export default ServiceCanvas;

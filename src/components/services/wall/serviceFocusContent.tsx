import type { ReactNode } from "react";
import { services } from "../../../content/arcleHome";
import { BrandCube } from "./ServiceCreative";
import { ExplodedBuild } from "./ServiceDevelopment";
import { RankStack } from "./ServiceSeo";
import type { WallServiceKey } from "./serviceWallContent";

export type FocusServiceKey = WallServiceKey;

interface ServiceGroup {
    label: string;
    items: string[];
}

export interface FocusService {
    key: FocusServiceKey;
    title: string;
    summary: string;
    paragraphs: string[];
    groups: ServiceGroup[];
    visual: ReactNode;
    visualLabel: string;
}

const byTitle = (title: string) => {
    const service = services.find((entry) => entry.title === title);
    if (!service) throw new Error(`Service "${title}" is missing from arcleHome services`);
    return service;
};

const seo = byTitle("SEO");
const development = byTitle("Development");
const creative = byTitle("Creative");

export const focusServices: Record<FocusServiceKey, FocusService> = {
    seo: {
        key: "seo",
        title: seo.title,
        summary: seo.summary,
        paragraphs: [
            seo.body ?? "",
            "Be the answer, not just a result. We help your brand appear in Google AI Overviews, featured snippets and AI assistants like ChatGPT, Gemini and Perplexity.",
        ],
        groups: seo.groups ?? [],
        visual: <RankStack />,
        visualLabel: "A stack of search results with your brand's result marked number one",
    },
    development: {
        key: "development",
        title: development.title,
        summary: development.summary,
        paragraphs: [development.body ?? ""],
        groups: development.groups ?? [],
        visual: <ExplodedBuild />,
        visualLabel: "A website shown as code, structure and interface layers",
    },
    creative: {
        key: "creative",
        title: creative.title,
        summary: creative.summary,
        paragraphs: (creative.body ?? "").split("\n\n").filter(Boolean),
        groups: creative.groups ?? [],
        visual: <BrandCube />,
        visualLabel: "A cube of brand work: logo, identity, interface, ad, social post and video",
    },
};

export const isFocusService = (slug: string | undefined): slug is FocusServiceKey =>
    slug === "seo" || slug === "development" || slug === "creative";

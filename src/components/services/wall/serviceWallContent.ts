import { services } from "../../../content/arcleHome";

export type WallServiceKey = "seo" | "development" | "creative";

export const findService = (title: string) => {
    const service = services.find((entry) => entry.title === title);
    if (!service) throw new Error(`Service "${title}" is missing from arcleHome services`);
    return service;
};

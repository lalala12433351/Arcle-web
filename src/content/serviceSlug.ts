export const serviceSlug = (title: string) =>
    title
        .trim()
        .toLowerCase()
        .replace(/&/g, " and ")
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "");

export const servicePath = (title: string) => `/services/${serviceSlug(title)}`;

const focusServiceSlugs = new Set(["seo", "development", "creative"]);

export const isFocusService = (slug: string | undefined): slug is "seo" | "development" | "creative" =>
    !!slug && focusServiceSlugs.has(slug);

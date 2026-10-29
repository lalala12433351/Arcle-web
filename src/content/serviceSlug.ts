export const serviceSlug = (title: string) =>
    title
        .trim()
        .toLowerCase()
        .replace(/&/g, " and ")
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "");

const retiredServiceSlugs = new Set(["seo", "development", "creative"]);

export const servicePath = (title: string) => {
    const slug = serviceSlug(title);
    if (retiredServiceSlugs.has(slug)) return "/services";
    return `/services/${slug}`;
};

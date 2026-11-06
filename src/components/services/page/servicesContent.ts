export type ServiceKey = "marketing" | "seo" | "development" | "creative";

export type ServiceEntry = {
    key: ServiceKey;
    number: string;
    navLabel: string;
    label: string;
    headline: string;
    lede: string;
    body: string[];
    core: string[];
    more: string[];
    technologies?: string[];
    portfolio?: { label: string; to: string };
    sites?: { label: string; href: string }[];
    sceneLabel: string;
};

export const serviceEntries: ServiceEntry[] = [
    {
        key: "marketing",
        number: "01",
        navLabel: "Marketing",
        label: "Performance Marketing",
        headline: "Turn attention into action.",
        lede: "Every rupee has to come back as a customer.",
        body: [
            "We run Google, Meta, LinkedIn and YouTube as one plan, built around people who enquire, buy and come back. Ads that earn their keep get more budget. Ads that only look busy get cut.",
        ],
        core: ["Google Ads", "Meta Ads", "LinkedIn & YouTube Ads", "Conversion Tracking"],
        more: ["Remarketing", "Landing Pages", "Campaign Optimisation"],
        sceneLabel: "Illustrative campaign dashboard showing an ad leading to a website visit and an enquiry",
    },
    {
        key: "seo",
        number: "02",
        navLabel: "SEO",
        label: "SEO",
        headline: "Be there when they search.",
        lede: "Get discovered when your customers are searching.",
        body: [
            "Our SEO combines technical optimisation, content, local SEO, keyword research, internal linking and authority building to improve your visibility and attract relevant organic traffic.",
        ],
        core: ["Technical SEO", "On-Page SEO", "Local SEO", "Content Strategy"],
        more: ["Keyword Research", "Link Building", "Google Business Profile", "SEO Reporting", "AEO & GEO"],
        sceneLabel: "Illustrative search results page with an example brand result highlighted",
    },
    {
        key: "development",
        number: "03",
        navLabel: "Development",
        label: "Development",
        headline: "Your hardest-working digital asset.",
        lede: "Websites and software that work as your best salesperson.",
        body: [
            "We build fast, mobile-first and SEO-ready websites that explain your value clearly and turn visitors into enquiries or customers. From business websites and landing pages to e-commerce stores and custom applications, design, performance and modern development work together.",
        ],
        core: ["Business Websites", "E-commerce", "Custom Applications", "Landing Pages"],
        more: [
            "Website Redesign",
            "Custom Websites",
            "Conversion Optimisation",
            "Website Maintenance",
            "Web Applications",
            "Mobile Apps",
        ],
        sites: [
            { label: "Design Arc Interiors", href: "https://designarcinteriors.com/" },
            { label: "Kite Aviation", href: "https://www.kiteaviation.in/" },
            { label: "Mirai India", href: "https://themiraiindia.com/" },
        ],
        sceneLabel: "Illustrative website preview with desktop and mobile layouts",
    },
    {
        key: "creative",
        number: "04",
        navLabel: "Creative",
        label: "Creative",
        headline: "Make your brand hard to ignore.",
        lede: "Make your business look as strong as it is.",
        body: [
            "We bring words and visuals together to give your brand a clear, consistent voice and a recognisable identity.",
            "Across your website, social media, campaigns and sales materials, we help your brand tell one connected story that turns attention into interest, and interest into enquiries.",
        ],
        core: ["Brand Identity", "Social Creatives", "UI/UX Design", "Video Creatives"],
        more: ["Logo Design", "Ad Creatives", "Presentation Design"],
        portfolio: { label: "See Mirai", to: "/projects/mirai" },
        sceneLabel: "Creative artboard showing brand, social and video work from Arcle projects",
    },
];

export const enquiryLinks = [
    { label: "Get more leads", interest: "Ads" },
    { label: "Build a website", interest: "Websites" },
    { label: "Strengthen my brand", interest: "Branding" },
];

export const enquiryHref = (interest: string) =>
    `/contact-us?interest=${encodeURIComponent(interest)}#cx-message-form`;

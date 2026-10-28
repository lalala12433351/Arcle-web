export type WorkVideo = {
    src: string;
    label: string;
    /** Defaults to video when omitted */
    type?: "video" | "image";
    /** Defaults to landscape. Portraits pair side-by-side like Studio Sorted. */
    orientation?: "landscape" | "portrait";
    /** Optional display frame — media is cropped to this aspect via object-fit: cover */
    width?: number;
    height?: number;
};

export type Work = {
    slug: string;
    name: string;
    subtitle: string;
    scope: string[];
    yearLabel: string;
    year: string;
    description: string;
    cover: string;
    poster?: string;
    /** CSS object-position for cover/poster crop inside landscape cards */
    coverPosition?: string;
    /** Native cover video size — used to avoid soft upscaling on /projects */
    coverWidth: number;
    coverHeight: number;
    videos: WorkVideo[];
};

export const works: Work[] = [
    {
        slug: "kite-aviation-institute",
        name: "Kite Aviation Institute",
        subtitle: "Aviation & Hospitality Training",
        scope: ["Aviation", "Hospitality", "Practical training", "Industry careers"],
        yearLabel: "Year:",
        year: "2025",
        description:
            "KITE Institute of Aviation & Hospitality is based in Bangalore. It offers aviation and hospitality courses. Practical training builds students' confidence and skills. It prepares them for industry careers. Skykite Institute of Aviation and Hospitality Pvt. Ltd. was incorporated on 16 April 2025.",
        cover: "/assets/video/kite-institute.mp4?v=5",
        poster: "/assets/img/kite-aviation-poster.jpg",
        coverWidth: 1080,
        coverHeight: 1920,
        videos: [
            {
                src: "/assets/video/kite-institute.mp4?v=5",
                label: "Kite Aviation Institute",
                orientation: "portrait",
            },
            {
                src: "/assets/img/kite-aviation-poster.jpg",
                label: "Institute campaign",
                type: "image",
                orientation: "portrait",
            },
            {
                src: "/assets/img/kite_insta_pic.png",
                label: "Kite Aviation Instagram",
                type: "image",
                orientation: "portrait",
            },
            {
                src: "/assets/video/kite-reel-2.mp4",
                label: "Campus reel",
                orientation: "landscape",
                width: 1024,
                height: 337,
            },
            {
                src: "/assets/video/kite-reel-3.mp4",
                label: "Training reel",
                orientation: "landscape",
                width: 1024,
                height: 337,
            },
        ],
    },
    {
        slug: "design-arc-interiors",
        name: "Design Arc Interiors",
        subtitle: "Bangalore-based commercial interior design company",
        scope: ["Office interiors", "Turnkey fit-outs"],
        yearLabel: "Established:",
        year: "March 2012",
        description:
            "Design Arc Interiors is a Bangalore-based commercial interior design company. It specialises in office interiors and turnkey fit-outs. Its spaces combine thoughtful design with everyday functionality. The team delivers workplaces that reflect each client's brand. Established in March 2012, according to its official website. The exact day isn't listed.",
        cover: "/assets/video/office-interior.mp4?v=5",
        coverWidth: 1128,
        coverHeight: 840,
        videos: [
            { src: "/assets/video/office-interior.mp4?v=5", label: "Design Arc Interiors" },
            { src: "/assets/video/real-estate.mp4?v=6", label: "Interior walkthrough" },
            { src: "/assets/video/industry-fpv.mp4", label: "Space detail" },
        ],
    },
    {
        slug: "mirai",
        name: "Mirai",
        subtitle: "Bangalore-based furniture brand",
        scope: ["Ergonomic chairs", "Modular workstations", "Lounge seating"],
        yearLabel: "Incorporated:",
        year: "8 January 2026",
        description:
            "Mirai is a Bangalore-based furniture brand. It offers ergonomic chairs, modular workstations, and lounge seating. Its designs combine comfort, style, and functionality. Mirai creates furniture for modern, productive workspaces. The brand's exact launch date isn't confirmed. A company listing records Mirai Furnishing LLP's incorporation as 8 January 2026, which may differ from the brand's founding date.",
        cover: "/assets/video/mirai.mp4?v=5",
        poster: "/assets/img/mirai-poster.jpg",
        // Portrait asset in a landscape card — bias up so logo + "Refined Comfort" stay in frame
        coverPosition: "center 28%",
        coverWidth: 696,
        coverHeight: 1248,
        videos: [
            { src: "/assets/video/mirai.mp4?v=5", label: "Mirai", orientation: "portrait" },
            { src: "/assets/video/office-interior.mp4?v=5", label: "Product in space" },
            { src: "/assets/video/times-square-timelapse.mp4", label: "Brand motion" },
        ],
    },
    {
        slug: "direct-keys",
        name: "Direct Keys",
        subtitle: "Property storytelling & launch films",
        scope: ["Cinematic film", "Property marketing", "Launch content"],
        yearLabel: "Year:",
        year: "2025",
        description:
            "A cinematic property film built for Direct Keys launches and listings. The piece leads with atmosphere, then moves through space, light and finish so viewers feel the property before they visit. Framed for web, social and sales decks.",
        cover: "/assets/video/real-estate.mp4?v=6",
        poster: "/assets/img/real-estate-poster.jpg?v=6",
        coverWidth: 1920,
        coverHeight: 1080,
        videos: [
            { src: "/assets/video/real-estate.mp4?v=6", label: "Direct Keys film" },
            { src: "/assets/video/industry-fpv.mp4", label: "Aerial pass" },
            { src: "/assets/video/times-square-timelapse.mp4", label: "Atmosphere cut" },
        ],
    },
];

export const getWorkBySlug = (slug?: string) => {
    if (!slug) return undefined;
    if (slug === "real-estate") return works.find((work) => work.slug === "direct-keys");
    return works.find((work) => work.slug === slug);
};

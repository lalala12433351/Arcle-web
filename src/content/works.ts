export type WorkVideo = {
    src: string;
    label: string;
    /** Defaults to video when omitted */
    type?: "video" | "image";
    /** Defaults to landscape. Portraits pair side-by-side like Studio Sorted. */
    orientation?: "landscape" | "portrait";
    /**
     * cover = intentional crop inside the frame (default for video).
     * contain = keep full artwork visible (posters / text-heavy stills).
     */
    fit?: "cover" | "contain";
    /** Optional native/display aspect — drives the aspect-ratio box */
    width?: number;
    height?: number;
    /** Gallery portrait taller than the default capped frame */
    tall?: boolean;
    /** CSS object-position inside the existing card. Does not change the card size. */
    objectPosition?: string;
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
    /** CSS object-position for the still inside the fixed 16:10 card */
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
        cover: "/assets/client/kite-aviation/Nilani.mp4",
        poster: "/assets/client/kite-aviation/kite-aviation-poster.jpg",
        coverPosition: "center 42%",
        coverWidth: 1920,
        coverHeight: 1080,
        videos: [
            {
                src: "/assets/client/kite-aviation/Nilani.mp4",
                label: "Nilani",
                orientation: "landscape",
            },
            {
                src: "/assets/client/kite-aviation/kite-aviation-poster.jpg",
                label: "Institute campaign",
                type: "image",
                orientation: "portrait",
            },
            {
                src: "/assets/client/kite-aviation/kite-reel-3.mp4",
                label: "Training reel",
                orientation: "portrait",
            },
            {
                src: "/assets/client/kite-aviation/kite_insta_pic.png",
                label: "Kite Aviation Instagram",
                type: "image",
                orientation: "portrait",
                fit: "contain",
            },
            {
                src: "/assets/client/kite-aviation/kite-reel-4.mp4",
                label: "Night reel",
                orientation: "portrait",
            },
            {
                src: "/assets/client/kite-aviation/kite-institute.mp4",
                label: "Kite Aviation Institute",
                orientation: "portrait",
                objectPosition: "center 38%",
            },
            {
                src: "/assets/client/kite-aviation/kite-reel-2.mp4",
                label: "Campus reel",
                orientation: "portrait",
                objectPosition: "center 38%",
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
        cover: "/assets/client/design-arc-interiors/office-interior.mp4",
        coverWidth: 1128,
        coverHeight: 840,
        videos: [
            { src: "/assets/client/design-arc-interiors/office-interior.mp4", label: "Design Arc Interiors" },
            { src: "/assets/client/direct-keys/real-estate.mp4", label: "Interior walkthrough" },
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
        cover: "/assets/client/mirai/mirai-header.mp4",
        poster: "/assets/client/mirai/mirai-poster.jpg",
        coverPosition: "center 26%",
        coverWidth: 3840,
        coverHeight: 2160,
        videos: [
            {
                src: "/assets/client/mirai/mirai-header.mp4",
                label: "Mirai header",
                orientation: "landscape",
            },
            {
                src: "/assets/client/mirai/mirai-poster.jpg",
                label: "Refined comfort campaign",
                type: "image",
                orientation: "portrait",
                width: 819,
                height: 1024,
            },
            {
                src: "/assets/client/mirai/mirai-poster-sit.jpg",
                label: "Sit Beautifully",
                type: "image",
                orientation: "portrait",
                width: 819,
                height: 1024,
            },
            {
                src: "/assets/client/mirai/mirai-poster-seated.jpg",
                label: "Perfectly Seated",
                type: "image",
                orientation: "portrait",
                width: 819,
                height: 1024,
            },
            {
                src: "/assets/client/mirai/mirai-poster-comfort.jpg",
                label: "Comfort In Form",
                type: "image",
                orientation: "portrait",
                width: 819,
                height: 1024,
            },
            {
                src: "/assets/client/mirai/mirai-poster-executive.jpg",
                label: "Executive Spaces",
                type: "image",
                orientation: "portrait",
                width: 819,
                height: 1024,
            },
            {
                src: "/assets/client/mirai/mirai.mp4",
                label: "Mirai",
                orientation: "portrait",
                width: 1080,
                height: 1920,
                tall: true,
            },
            {
                src: "/assets/client/mirai/mirai-reel.mp4",
                label: "Showroom reel",
                orientation: "portrait",
                width: 1080,
                height: 1920,
                tall: true,
            },
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
        cover: "/assets/client/direct-keys/real-estate.mp4",
        poster: "/assets/client/direct-keys/real-estate-poster.jpg",
        coverWidth: 1920,
        coverHeight: 1080,
        videos: [
            { src: "/assets/client/direct-keys/real-estate.mp4", label: "Direct Keys film" },
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

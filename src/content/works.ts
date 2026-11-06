export type WorkVideo = {
    src: string;
    label: string;
    /** Defaults to video when omitted. Can be "video", "image", or "youtube" */
    type?: "video" | "image" | "youtube";
    /** YouTube video ID (required when type is "youtube") */
    youtubeId?: string;
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
    /** Short copy shown on /project. Individual pages use description. */
    summary: string;
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
        scope: ["Performance Marketing", "SEO", "Social Media", "Course Landing Pages", "CRM & Lead Tracking"],
        yearLabel: "Year:",
        year: "2025",
        summary:
            "KITE Institute of Aviation & Hospitality is based in Bangalore. It offers aviation and hospitality courses. Practical training builds students’ confidence and skills. It prepares them for industry careers.",
        description:
            "A new institute in a competitive space needs a steady flow of admissions, not just website traffic. Arcle built KITE’s complete student enquiry system, starting with Google Ads and Meta campaigns that reach students searching for aviation and hospitality courses in Bangalore. SEO-optimised course pages help the institute rank on Google, and social media content shows real practical training and the career paths it leads to. A CRM-based follow-up system makes sure every enquiry gets a call and moves from first click to counselling session to admission.",
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
        scope: ["SEO", "AEO & GEO", "Website", "Google Business Profile", "Lead Generation"],
        yearLabel: "Established:",
        year: "March 2012",
        summary:
            "Design Arc Interiors is a Bangalore-based commercial interior design company. It specialises in office interiors and turnkey fit-outs. Its spaces combine thoughtful design with everyday functionality. The team delivers workplaces that reflect each client’s brand.",
        description:
            "With more than a decade of office interior work behind it, Design Arc needed its online presence to match the quality of its projects. Arcle rebuilt its search visibility with SEO, AEO and GEO, so companies looking for office interior designers in Bangalore can find Design Arc on Google and in AI answers. We created service and project pages that show finished workplaces, set up a Google Business Profile with a reviews plan, and ran campaigns that turn searches into qualified fit-out enquiries.",
        cover: "/assets/client/design-arc-interiors/office-interior.mp4",
        coverWidth: 1128,
        coverHeight: 840,
        videos: [
            { src: "https://www.youtube.com/watch?v=RwzaLFSLjO4", label: "Design Arc Interiors Banner", type: "youtube", youtubeId: "RwzaLFSLjO4", orientation: "landscape" },
            { src: "/assets/client/design-arc-interiors/office-interior.mp4", label: "Office Interiors", orientation: "landscape" },
            { src: "/assets/client/direct-keys/real-estate.mp4", label: "Interior walkthrough" },
            { src: "/assets/video/industry-fpv.mp4", label: "Space detail" },
        ],
    },
    {
        slug: "mirai",
        name: "Mirai",
        subtitle: "Bangalore-based furniture brand",
        scope: ["Branding", "Website Development", "SEO", "Social Media", "CRM Setup"],
        yearLabel: "Incorporated:",
        year: "8 January 2026",
        summary:
            "Mirai is a Bangalore-based furniture brand. It offers ergonomic chairs, modular workstations, and lounge seating. Its designs combine comfort, style, and functionality. Mirai creates furniture for modern, productive workspaces.",
        description:
            "As a new furniture brand, Mirai needed to look established from day one and be found by the businesses buying office furniture. Arcle built its full digital presence: brand identity, a product-led website showcasing ergonomic chairs, modular workstations and lounge seating, and SEO targeting office furniture searches in Bangalore. Social media content and paid campaigns bring in enquiries from offices and corporate buyers, and a CRM tracks every lead through to the order.",
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
        scope: ["Cinematic Film", "Performance Marketing", "Social Media", "Lead Generation", "Landing Pages"],
        yearLabel: "Year:",
        year: "2025",
        summary:
            "A cinematic property film built for Direct Keys launches and listings. The piece leads with atmosphere, then moves through space, light and finish so viewers feel the property before they visit. Framed for web, social and sales decks.",
        description:
            "Selling property online means making buyers feel a space before they ever visit it. Arcle built Direct Keys a complete launch system around that idea. We produced cinematic property films and cut them into reels for social media, then ran targeted Meta and Google campaigns to reach serious home buyers. Listing pages and lead forms capture every enquiry, and each one goes straight to the sales team, so every film, ad and click works towards site visits and bookings.",
        cover: "/assets/client/direct-keys/real-estate.mp4",
        poster: "/assets/client/direct-keys/real-estate-poster.jpg",
        coverWidth: 1920,
        coverHeight: 1080,
        videos: [
            { src: "/assets/client/direct-keys/real-estate.mp4", label: "Direct Keys film" },
            {
                src: "/assets/client/direct-keys/banner.jpg",
                label: "Direct Keys",
                type: "image",
                orientation: "landscape",
                objectPosition: "center 25%",
            },
        ],
    },
];

export const getWorkBySlug = (slug?: string) => {
    if (!slug) return undefined;
    if (slug === "real-estate") return works.find((work) => work.slug === "direct-keys");
    return works.find((work) => work.slug === slug);
};

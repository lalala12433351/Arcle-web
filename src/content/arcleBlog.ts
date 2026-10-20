export type ArclePost = {
    id: number;
    date: string;
    dateIcon: string;
    author: string;
    tag: string;
    title: string;
    text: string;
    thumb: string;
    thumbFull: string;
    quote: string;
    paragraphs: string[];
    points: string[];
};

export const arclePosts: ArclePost[] = [
    {
        id: 1,
        date: "12 March, 2026",
        dateIcon: "far fa-calendar-alt",
        author: "Arcle",
        tag: "Strategy",
        title: "How to choose a digital marketing agency in India",
        text: "Look for one team that can connect ads, search, content and the website, and that reports on leads and revenue rather than vanity metrics.",
        thumb: "v1.jpg",
        thumbFull: "1-full.jpg",
        quote: "The right agency should be able to explain what it will measure before it asks for a budget.",
        paragraphs: [
            "Most businesses do not need five vendors. They need a clear offer, a website that can convert, and a small set of channels that can be measured. When those pieces sit with different teams, reporting turns into a debate and the customer journey breaks.",
            "A useful first conversation covers your market, your current website, the accounts you already run, and the number that actually matters: qualified leads, sales, or cost to acquire a customer. If an agency cannot talk about that number, the rest of the pitch is decoration.",
            "Ask who owns the ad accounts, the website and the data. At Arcle, those stay with you. Engagements are scoped in the open, and after the initial setup they are not locked into a long contract.",
        ],
        points: [
            "One team across marketing and the website",
            "Reporting on leads, cost and revenue",
            "You keep the accounts, site and data",
            "A plan you can explain to your own team",
        ],
    },
    {
        id: 2,
        date: "2 April, 2026",
        dateIcon: "far fa-calendar-alt",
        author: "Arcle",
        tag: "SEO",
        title: "SEO and paid ads work better as one system",
        text: "Search ads can create demand this week. SEO compounds it. The website has to be ready for both.",
        thumb: "v2.jpg",
        thumbFull: "2-full.jpg",
        quote: "Paid media finds the demand. SEO earns the demand you do not want to keep renting.",
        paragraphs: [
            "Teams often treat SEO and paid media as rival budgets. In practice they share the same queries, the same landing pages and the same conversion tracking. If the page is weak, both channels look expensive.",
            "Start with the searches that already show buying intent. Build or repair the page that should rank and convert for that query, then use ads to learn which message and audience respond. Feed that learning back into titles, content and the organic plan.",
            "Measure both channels on the same events. Traffic without an enquiry is not a result. A lead that sales cannot use is not a result either.",
        ],
        points: [
            "Shared landing pages for organic and paid",
            "Keywords chosen from real demand",
            "One conversion setup for both channels",
            "Creative and content tested against the same goal",
        ],
    },
    {
        id: 3,
        date: "21 May, 2026",
        dateIcon: "far fa-calendar-alt",
        author: "Arcle",
        tag: "Websites",
        title: "What a business website has to do",
        text: "A website is not a brochure. It has to explain the offer, prove it, and make the next step obvious on a phone.",
        thumb: "v3.jpg",
        thumbFull: "3-full.jpg",
        quote: "If a visitor cannot tell what you do in a few seconds, the campaign above the page cannot save it.",
        paragraphs: [
            "Speed, structure and copy decide whether marketing spend turns into a conversation. Heavy pages, vague headlines and buried contact details waste the traffic you already paid for or earned.",
            "We plan pages around the offer, the proof and one primary action. That applies to a company site, a landing page, or a store. The technology follows the job: WordPress, Shopify, Webflow, React or a custom build when the product needs it.",
            "Technical SEO is part of the build, not a project that starts six months later. So is analytics. You should be able to see which pages create enquiries.",
        ],
        points: [
            "A headline a customer understands immediately",
            "Proof near the offer",
            "A fast mobile experience",
            "Search and analytics set up before launch",
        ],
    },
    {
        id: 4,
        date: "18 June, 2026",
        dateIcon: "far fa-calendar-alt",
        author: "Arcle",
        tag: "Social",
        title: "Social media that supports sales",
        text: "Posting more is not a strategy. Social should make the brand recognisable and give paid campaigns something worth amplifying.",
        thumb: "4.jpg",
        thumbFull: "4-full.jpg",
        quote: "Consistency beats volume. A customer should recognise you before they read the caption.",
        paragraphs: [
            "Social is where many buyers first meet a brand, and where they go to check whether the brand feels real. Random creatives, a different logo on every post, and no link back to a useful page do not create that confidence.",
            "We plan a content system: what the brand sounds like, which formats fit the channel, and which posts exist to educate, to prove, or to send someone to a page. Community management and paid social sit in the same plan.",
            "Instagram, Facebook, LinkedIn and YouTube are not interchangeable. The channel follows the audience, not the other way around.",
        ],
        points: [
            "A recognisable visual system",
            "Content tied to a business goal",
            "Paid social that reuses what already works",
            "A page ready for the click",
        ],
    },
    {
        id: 5,
        date: "9 July, 2026",
        dateIcon: "far fa-calendar-alt",
        author: "Arcle",
        tag: "Measurement",
        title: "The numbers worth reading in a marketing report",
        text: "Impressions are context. Leads, cost per lead, conversion rate and return on spend are the report.",
        thumb: "5.jpg",
        thumbFull: "5-full.jpg",
        quote: "If a report cannot change next month’s plan, it is a scrapbook.",
        paragraphs: [
            "A professional report starts from the decision you need to make: spend more, change the page, pause a campaign, or invest in content. Vanity charts do not answer that.",
            "We track qualified leads, cost per lead, website conversions, customer acquisition cost, return on ad spend, organic traffic and revenue where the business can share it. Rankings matter when they connect to those outcomes.",
            "The same numbers should be visible to you, not only to the agency. That is why accounts and analytics stay in your name.",
        ],
        points: [
            "Leads and lead quality",
            "Cost to acquire them",
            "What the website did with the visit",
            "What should change next month",
        ],
    },
    {
        id: 6,
        date: "4 September, 2026",
        dateIcon: "far fa-calendar-alt",
        author: "Arcle",
        tag: "Search",
        title: "Being found when the answer comes from AI",
        text: "Search is no longer only a list of blue links. Clear, specific pages are what answer engines can cite.",
        thumb: "6.jpg",
        thumbFull: "6-full.jpg",
        quote: "If your page does not answer the question cleanly, neither Google nor an assistant has a reason to mention you.",
        paragraphs: [
            "Customers now meet brands through classic search, featured snippets and AI answers. The work is related. A page that states who you help, what you do and how it works is easier for both a person and a system to use.",
            "AEO and GEO are not a trick layered on top of thin content. They depend on the same foundations as good SEO: a real entity, useful answers, internal links, and pages that match the questions your market asks.",
            "We treat this as part of search, not a separate fashion. The goal is still the same: the right people find you, and the page can turn that visit into a conversation.",
        ],
        points: [
            "Pages written as direct answers",
            "Consistent naming across the site",
            "Questions your customers actually ask",
            "Search and content planned together",
        ],
    },
];

export const arcleMeta = {
    title: "Digital Marketing Agency in India | Arcle",
    description:
        "Arcle is a digital marketing agency in India offering performance marketing, SEO, social media, website and app development. Book a free growth audit.",
    headline:
        "Digital Marketing Agency in India That Builds, Markets and Grows Your Business",
    heroParagraphs: [
        "Arcle is a full-service digital marketing and technology company headquartered in Bangalore. We help startups, small businesses and growing brands generate more leads, acquire customers and increase revenue through performance marketing, SEO, social media, website and application development, branding and creative services.",
        "Instead of managing multiple agencies for your marketing and technology needs, you get one connected team that understands your business from strategy to execution.",
    ],
};

export const journeySteps = [
    {
        title: "Attract",
        text: "Reach the right audience through SEO, Google Ads, Meta Ads, social media, content marketing and targeted campaigns.",
    },
    {
        title: "Convert",
        text: "Turn visitors into enquiries and customers through high-performing websites, landing pages, compelling content and clear calls to action.",
    },
    {
        title: "Retain",
        text: "Keep customers engaged through apps, email, WhatsApp, remarketing and valuable content.",
    },
    {
        title: "Measure",
        text: "Track what matters—from leads and conversions to customer acquisition cost, revenue and return on ad spend.",
    },
];

type ServiceGroup = { label: string; items: string[] };

export const services: {
    title: string;
    summary: string;
    body?: string;
    groups?: ServiceGroup[];
}[] = [
    {
        title: "Performance Marketing",
        summary: "Turn advertising budgets into measurable business results.",
        body: "We plan, launch and optimise campaigns across Google Ads, Meta Ads, LinkedIn Ads and YouTube with a focus on qualified leads, sales and return on ad spend.",
        groups: [
            {
                label: "Includes",
                items: [
                    "Google Ads",
                    "Meta Ads",
                    "LinkedIn Ads",
                    "YouTube Ads",
                    "Remarketing",
                    "Conversion Tracking",
                    "Landing Pages",
                    "Campaign Optimisation",
                ],
            },
        ],
    },
    {
        title: "SEO",
        summary: "Get discovered when your customers are searching.",
        body: "Our SEO strategies combine technical optimisation, content, local SEO, keyword research, internal linking and authority building to improve your visibility and attract relevant organic traffic.",
        groups: [
            {
                label: "Includes",
                items: [
                    "Technical SEO",
                    "On-Page SEO",
                    "Local SEO",
                    "Keyword Research",
                    "Content SEO",
                    "Link Building",
                    "Google Business Profile",
                    "SEO Reporting",
                ],
            },
        ],
    },
    {
        title: "AEO & GEO",
        summary: "Be visible beyond traditional search.",
        body: "As search evolves, customers are increasingly using AI assistants and answer engines to find information and recommendations. We optimise your content and digital presence to improve your visibility across modern search experiences.",
        groups: [
            {
                label: "We optimise for",
                items: [
                    "Google AI Results",
                    "Featured Snippets",
                    "AI Answer Engines",
                    "Conversational Search",
                    "Entity Visibility",
                    "Question-Based Searches",
                ],
            },
        ],
    },
    {
        title: "Social Media Marketing",
        summary: "Build a brand people remember.",
        body: "We manage social media from strategy to execution, including content planning, creative development, reels, community management and paid social campaigns.",
        groups: [
            {
                label: "Platforms",
                items: ["Instagram", "Facebook", "LinkedIn", "YouTube"],
            },
        ],
    },
    {
        title: "Website Development",
        summary: "Build a website that works as your best salesperson.",
        body: "We create fast, mobile-first and SEO-ready websites that communicate your value clearly and turn visitors into enquiries or customers. From business websites and landing pages to e-commerce stores and custom web experiences, we combine design, performance and modern development.",
        groups: [
            {
                label: "Technologies",
                items: ["WordPress", "Shopify", "Webflow", "React", "Next.js", "Custom Development"],
            },
            {
                label: "Includes",
                items: [
                    "Business Websites",
                    "E-commerce",
                    "Landing Pages",
                    "Website Redesign",
                    "Custom Websites",
                    "Conversion Optimisation",
                    "Technical SEO",
                    "Website Maintenance",
                ],
            },
        ],
    },
    {
        title: "Web Applications",
        summary: "Build powerful digital products around your business.",
        body: "We design and develop responsive web applications for businesses that need more than a traditional website. From SaaS platforms and customer portals to internal tools and custom business applications, we build scalable solutions around your requirements.",
        groups: [
            {
                label: "Technologies",
                items: ["React", "Next.js", "Node.js", "APIs", "Custom Development"],
            },
            {
                label: "Includes",
                items: [
                    "SaaS Platforms",
                    "Customer Portals",
                    "Admin Dashboards",
                    "Business Applications",
                    "Custom Web Apps",
                    "API Integrations",
                ],
            },
        ],
    },
    {
        title: "Desktop Applications",
        summary: "Create software built around the way your business works.",
        body: "We develop custom desktop applications for businesses that need specialised software, internal tools or workflow solutions for desktop environments. From UI/UX and development to testing and deployment, we build applications designed around your operational requirements.",
        groups: [
            {
                label: "Includes",
                items: [
                    "Business Software",
                    "Internal Tools",
                    "Custom Desktop Apps",
                    "Workflow Applications",
                    "Data Management Systems",
                    "Third-Party Integrations",
                ],
            },
        ],
    },
    {
        title: "App Development",
        summary: "Turn your idea into a useful digital product.",
        body: "We design and develop mobile applications for startups and established businesses, from MVPs to full-scale products. Our team combines product thinking, UI/UX and technology to create apps designed around real users and business objectives. From concept and wireframes to development, testing and launch, we manage the complete product journey.",
        groups: [
            {
                label: "Technologies",
                items: ["Flutter", "React Native", "Android", "iOS"],
            },
        ],
    },
    {
        title: "Branding & Creative",
        summary: "Make your business look as strong as it is.",
        body: "We create visual identities and marketing assets that help businesses communicate consistently across websites, social media, advertising and other customer touchpoints.",
        groups: [
            {
                label: "Includes",
                items: [
                    "Logo Design",
                    "Brand Identity",
                    "UI/UX",
                    "Ad Creatives",
                    "Social Creatives",
                    "Presentation Design",
                    "Video Creatives",
                ],
            },
        ],
    },
    {
        title: "Content Marketing",
        summary: "Create content that answers real customer questions.",
        body: "We create useful, search-focused content that educates customers, builds authority and supports organic growth. From website copy and SEO blogs to case studies and newsletters, every piece is created around your audience and business objectives.",
    },
];

export const whyArcle = [
    {
        title: "One Team",
        text: "Marketing, design, content and development work together instead of operating as disconnected vendors.",
    },
    {
        title: "Clear Numbers",
        text: "We focus on qualified leads, conversions, customer acquisition cost, revenue and ROAS—not vanity metrics.",
    },
    {
        title: "Built for Search",
        text: "Our strategies cover traditional Google search as well as emerging AI-powered search and answer engines.",
    },
    {
        title: "Full Ownership",
        text: "Your domain, website, advertising accounts, content, data and digital assets remain yours.",
    },
    {
        title: "Flexible Engagements",
        text: "After the initial setup, our marketing engagements can operate month to month. We aim to retain clients through performance and value.",
    },
    {
        title: "Transparent Pricing",
        text: "You receive clear agency fees and project costs. Advertising budgets are paid directly to platforms such as Google and Meta.",
    },
];

export const approachChain = [
    "Business",
    "Audience",
    "Offer",
    "Channel",
    "Website",
    "Conversion",
    "Follow-up",
    "Measurement",
];

export const processSteps = [
    {
        step: "01",
        title: "Audit",
        text: "We analyse your website, advertising, SEO, social media, competitors and existing digital presence.",
    },
    {
        step: "02",
        title: "Strategy",
        text: "We create a practical roadmap covering priorities, channels, campaigns, content and measurable goals.",
    },
    {
        step: "03",
        title: "Setup",
        text: "We implement tracking, analytics, conversion events, landing pages, SEO foundations and other required infrastructure.",
    },
    {
        step: "04",
        title: "Launch",
        text: "Campaigns, content and optimisation work go live with structured testing.",
    },
    {
        step: "05",
        title: "Optimise",
        text: "We continuously improve targeting, creative, keywords, landing pages and conversion rates.",
    },
    {
        step: "06",
        title: "Scale",
        text: "Once we identify what works, we expand investment around the strongest opportunities.",
    },
];

export const growthStack = [
    { title: "SEO", text: "SEO brings organic demand." },
    { title: "Google Ads", text: "Google Ads captures high-intent searches." },
    { title: "Social media", text: "Social media builds awareness and trust." },
    { title: "Content", text: "Content answers customer questions." },
    { title: "Website", text: "Your website converts visitors." },
    { title: "Remarketing", text: "Remarketing brings interested users back." },
    { title: "Apps", text: "Apps and digital products help improve customer engagement." },
    { title: "Analytics", text: "Analytics shows which channels actually produce revenue." },
];

export const industries = [
    { title: "Real Estate", text: "Generate property enquiries and reach high-intent buyers." },
    { title: "Healthcare", text: "Build visibility and increase appointment enquiries." },
    { title: "Education", text: "Reach students and parents through search, social and paid campaigns." },
    { title: "D2C & E-commerce", text: "Increase product discovery, conversions and repeat purchases." },
    { title: "SaaS & B2B", text: "Generate qualified leads through search, LinkedIn and content." },
    { title: "Interiors & Architecture", text: "Showcase your portfolio and attract high-value enquiries." },
    { title: "Hospitality", text: "Drive enquiries, bookings and brand discovery." },
    { title: "Local Businesses", text: "Improve local visibility and generate calls, enquiries and visits." },
];

export const cities = [
    "Mumbai",
    "Delhi NCR",
    "Hyderabad",
    "Chennai",
    "Pune",
    "Kolkata",
    "Ahmedabad",
    "Kochi",
];

export const resultMetrics = [
    "Qualified leads",
    "Cost per lead",
    "Website conversions",
    "Sales",
    "Customer acquisition cost",
    "Return on ad spend",
    "Organic traffic",
    "Search rankings",
    "Conversion rate",
    "Revenue",
    "Repeat customers",
];

export const caseStudies = [
    {
        id: 1,
        title: "From Traffic to Enquiries",
        tag: "SEO & Website",
        client: "Growing business",
        text: "How we helped a growing business improve its website, search visibility and lead generation.",
        summary: "The website, search foundations and enquiry path were rebuilt so visitors could understand the offer and take the next step.",
        disciplines: ["SEO", "Website", "Content", "Conversion"],
        points: ["Technical and on-page SEO", "Clearer service pages", "Enquiry-focused calls to action", "Reporting on leads, not just traffic"],
    },
    {
        id: 2,
        title: "Scaling Paid Campaigns",
        tag: "Performance",
        client: "Lead-driven brand",
        text: "How a performance marketing strategy helped improve lead quality while controlling acquisition costs.",
        summary: "Campaign structure, landing pages and conversion tracking were aligned so spend could be judged on lead quality and acquisition cost.",
        disciplines: ["Google Ads", "Meta Ads", "Landing Pages", "Tracking"],
        points: ["Account and audience structure", "Landing pages matched to intent", "Conversion tracking", "Ongoing creative and keyword testing"],
    },
    {
        id: 3,
        title: "Building a Digital Brand",
        tag: "Brand",
        client: "Emerging brand",
        text: "How branding, website development and social media helped create a stronger digital presence.",
        summary: "Identity, website and social content were brought into one system so the brand looked consistent wherever a customer met it.",
        disciplines: ["Branding", "Website", "Social", "Content"],
        points: ["Visual identity", "Website narrative", "Social content system", "Assets ready for ads and sales"],
    },
    {
        id: 4,
        title: "A Website Built to Convert",
        tag: "Product",
        client: "Service business",
        text: "A mobile-first website structured around the offer, the proof and a clear next step.",
        summary: "The site was planned as a sales tool: fast on mobile, easy to scan, and connected to the channels that send it traffic.",
        disciplines: ["UX", "Development", "SEO", "Analytics"],
        points: ["Mobile-first layout", "Offer and proof above the fold", "Fast pages and technical SEO", "Analytics on enquiries"],
    },
];

export const audiences = [
    {
        title: "Startups",
        text: "Launch your digital presence and build your first growth engine.",
    },
    {
        title: "Small Businesses",
        text: "Build predictable lead generation without managing multiple agencies.",
    },
    {
        title: "Growing Companies",
        text: "Scale existing channels and improve conversion efficiency.",
    },
    {
        title: "Established Brands",
        text: "Strengthen digital visibility and expand into new markets.",
    },
];

export const auditItems = [
    "Website",
    "SEO",
    "Google Ads",
    "Meta Ads",
    "Social Media",
    "Content",
    "Conversion",
    "Competitors",
];

export const arcleFaqs = [
    {
        question: "What does a digital marketing agency in India do?",
        answer: "We help businesses generate leads and sales through SEO, paid ads, social media, content and digital experiences. Arcle brings these capabilities together under one team.",
    },
    {
        question: "How much does digital marketing cost in India?",
        answer: "Pricing depends on your goals and requirements. Arcle provides customised, transparent plans with no hidden costs.",
    },
    {
        question: "How long does digital marketing take to work?",
        answer: "Paid campaigns can deliver results quickly, while SEO takes longer. We focus on both immediate opportunities and sustainable growth.",
    },
    {
        question: "Do you work with startups?",
        answer: "Yes. Arcle works with startups, small businesses and established brands with plans built around their goals and budget.",
    },
    {
        question: "Is Arcle a digital marketing agency or a technology company?",
        answer: "Both. Arcle combines marketing, design and technology under one team.",
    },
    {
        question: "Do you work outside Bangalore?",
        answer: "Yes. We serve businesses across India and international markets from our Bangalore headquarters.",
    },
    {
        question: "Will I own my website and advertising accounts?",
        answer: "Yes. Your website, ad accounts, content and data remain yours.",
    },
    {
        question: "Do I need Google or Meta Ads?",
        answer: "Not always. We recommend the channels that best suit your goals, budget and audience.",
    },
    {
        question: "Do you provide monthly reports?",
        answer: "Yes. Our reports focus on leads, conversions, traffic and business results.",
    },
    {
        question: "Do I need a new website?",
        answer: "Not necessarily. We first assess your existing website and recommend changes where they can improve results.",
    },
    {
        question: "Do you sign long-term contracts?",
        answer: "No long-term lock-ins after the initial setup. We aim to retain clients through results and value.",
    },
];

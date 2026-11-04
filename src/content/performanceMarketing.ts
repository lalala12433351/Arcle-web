export const perfMeta = {
    title: "Performance Marketing | Arcle",
    description:
        "Arcle plans, launches and optimises paid media against your KPI across Google, Meta, LinkedIn and YouTube — with tracking, creative and landing pages under one team.",
};

export const perfKpis = ["ROAS", "CAC", "leads", "revenue"] as const;

export const perfPlatforms = ["Google Ads", "Meta Ads", "LinkedIn Ads", "YouTube Ads"] as const;

export const perfOutcomes = [
    {
        id: "01",
        title: "Optimises against your KPI, not engagement",
        text: "Budget moves toward what returns qualified leads and sales. What does not convert gets cut.",
    },
    {
        id: "02",
        title: "Cuts waste before it compounds",
        text: "Ad sets that spend without converting get paused. Winners get the budget.",
    },
    {
        id: "03",
        title: "Faster hypothesis testing",
        text: "We write, launch and read tests in structured cycles — not once a quarter.",
    },
    {
        id: "04",
        title: "Plans, launches and runs your accounts",
        text: "Spend spikes and broken tracking get caught when they happen, not the next morning.",
    },
];

export const perfModes = [
    {
        key: "strategy",
        label: "Strategy",
        title: "Think",
        cadence: "Weekly · goals and tests",
        blurb: "Goals, hypotheses and channel bets — every change lands for your call before it goes live.",
        items: [
            { title: "Active goals", detail: "ROAS, CAC, lead volume or revenue — set by you." },
            { title: "Hypotheses in flight", detail: "Audience, bid or creative bets with a clear success bar." },
            { title: "Your call", detail: "Drafts wait for approval. Nothing ships alone." },
        ],
    },
    {
        key: "ops",
        label: "Ops",
        title: "Enforce",
        cadence: "Daily · every account",
        blurb: "Rules on CTR, CPA, spend and tracking. Guardrails you set. Rollback when needed.",
        items: [
            { title: "When it acts", detail: "IF CTR falls 15% vs 7-day baseline AND active ads > 5." },
            { title: "Guardrails", detail: "Cooldown, daily change caps, learning-phase protection." },
            { title: "Then", detail: "Apply inside your limits — or wait for review." },
        ],
    },
    {
        key: "research",
        label: "Research",
        title: "Report",
        cadence: "Scheduled · weekly",
        blurb: "Creative analysis, competitor reads and anomaly alerts — delivered where you already work.",
        items: [
            { title: "Creative analysis", detail: "What hooks and claims are earning attention." },
            { title: "Competitor report", detail: "New creatives and spend shifts in your category." },
            { title: "Ad alerts", detail: "Anomalies and opportunities on live performance." },
        ],
    },
] as const;

export const perfConnect = [
    {
        step: "01",
        title: "Connects",
        text: "Your ad accounts and bottom-funnel data — tracking, CRM and analytics — without a rebuild.",
    },
    {
        step: "02",
        title: "Learns your brand",
        text: "Brand kit, tone, approved claims, competitors and the caps you set. We work inside them.",
    },
    {
        step: "03",
        title: "Part of your team",
        text: "Reports where you work. Asks before major moves. Your accounts stay yours.",
    },
];

export const perfLoop = [
    {
        key: "test",
        step: "01",
        title: "Test",
        heading: "Every move starts as a hypothesis.",
        text: "Before anything changes, we write the bet: audience, bid or creative, the result we expect, and what would prove it wrong. You approve. Variants go live. Numbers decide.",
        points: [
            "Runs on Google Ads, Meta, LinkedIn and YouTube",
            "Every result kept as a learning — win or lose",
            "Next move waits for your yes",
        ],
    },
    {
        key: "track",
        step: "02",
        title: "Track",
        heading: "Every signal, around the clock.",
        text: "We learn what normal looks like for your brand, then watch fatigue, CPA drift, spend spikes and broken tracking as they start — not in Monday’s deck.",
        points: [
            "Bottom funnel from GA4, CRM and your stack",
            "Fatigue, CPA, spend and tracking checks",
            "Owners alerted when something breaks",
        ],
    },
    {
        key: "optimise",
        step: "03",
        title: "Optimise",
        heading: "Budgets shift. Winners scale. Losers pause.",
        text: "You set the goal — ROAS, CAC, LTV or margin — and the caps around it. Bids and budget move toward that goal. Every move comes with a reason. Anything past your limit waits for you.",
        points: [
            "Cost caps and budget shifts inside your rails",
            "One-click rollback on reversible moves",
            "Above-limit changes stay pending",
        ],
    },
    {
        key: "scale",
        step: "04",
        title: "Scale",
        heading: "Week twelve knows what week one didn’t.",
        text: "When a creative or audience wins, it becomes the next test across formats and geos. Learnings compound so the account does not reset between campaigns.",
        points: [
            "Winners expand into new placements and markets",
            "Recent wins weigh more; stale patterns fade",
            "The next test starts from what already worked",
        ],
    },
] as const;

export const perfWeek = {
    before: {
        label: "Before",
        handsOn: "~3 hrs hands-on",
        handoffs: "9 handoffs",
        rows: [
            { who: "Performance marketer", task: "Export last week’s ad-level data", time: "~40 min" },
            { who: "Creative head", task: "Tag winners, fatigue, and what to kill", time: "~45 min" },
            { who: "Performance marketer", task: "Build the creative report deck", time: "~2 hrs" },
            { who: "Brand / CMO", task: "Argue fatigue calls in the Monday review", time: "~1 hr" },
        ],
    },
    after: {
        label: "With Arcle",
        handsOn: "Focused reviews",
        handoffs: "One rhythm",
        rows: [
            { who: "You", task: "Set goals, caps and brand rules", time: "Your call" },
            { who: "Arcle", task: "Hypotheses, launches and daily ops", time: "Ongoing" },
            { who: "You", task: "Approve tests and above-limit moves", time: "Minutes" },
            { who: "Together", task: "Scale what works; pause what doesn’t", time: "Weekly" },
        ],
    },
};

export const perfControl = [
    {
        title: "Official platforms",
        text: "Campaigns run in your Google and Meta accounts — not a shadow system you cannot see.",
    },
    {
        title: "Hard caps",
        text: "Spend, change scope and escalation thresholds are set by you and kept by us.",
    },
    {
        title: "Full ownership",
        text: "Your domain, website, advertising accounts, content and data remain yours.",
    },
    {
        title: "Transparent fees",
        text: "Clear agency fees. Advertising budgets are paid directly to the platforms.",
    },
];

export const perfStory = {
    client: "Kite Aviation",
    role: "Aviation & hospitality institute, Bangalore",
    quote: "A campaign built to fill seats — search, social and creative under one plan, not three vendors.",
    href: "/project/kite-aviation-institute",
    cta: "See the work",
};

export const perfFaqs = [
    {
        q: "What is performance marketing at Arcle?",
        a: "We plan, launch, test and optimise paid media against your KPI — leads, sales, CAC or ROAS — with tracking, landing pages and creative under one team. The loop is Test, Track, Optimise, Scale. Reporting alone is not the product.",
    },
    {
        q: "Will I own my advertising accounts?",
        a: "Yes. Your ad accounts, website, content and data remain yours. We work inside accounts you control.",
    },
    {
        q: "What if a campaign underperforms?",
        a: "We pause what spends without converting, document why, and move budget to what works. Major moves above your caps wait for your approval. You can always step in.",
    },
    {
        q: "How does pricing work?",
        a: "You receive clear agency fees and project costs. Advertising budgets are paid directly to platforms such as Google and Meta. Plans are built around your goals and spend.",
    },
    {
        q: "Will this replace my team or agency?",
        a: "No. Routine ops — testing, fatigue checks, budget shifts and reporting — run with us. You keep strategy, brand voice, caps and the final say on flagship creative.",
    },
    {
        q: "What channels do you run today?",
        a: "Google Ads, Meta Ads, LinkedIn Ads and YouTube Ads, with remarketing and landing pages as needed.",
    },
    {
        q: "How long until we see results?",
        a: "Paid campaigns can move quickly; durable efficiency takes structured testing. We focus on both immediate opportunities and sustainable return.",
    },
];

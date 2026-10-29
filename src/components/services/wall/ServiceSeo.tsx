import { Search } from "lucide-react";
import ServiceWallSection from "./ServiceWallSection";
import { findService } from "./serviceWallContent";

const seo = findService("SEO");

const results = [
    { domain: "agency-directory.in", headline: "Top 10 agencies near you" },
    { domain: "yourbrand.com", headline: "Your brand, found first", hero: true },
    { domain: "quotes-marketplace.com", headline: "Compare agency quotes" },
    { domain: "founders-forum.org", headline: "Which agency should I pick?" },
    { domain: "business-daily.in", headline: "How to hire a marketing team" },
];

const RankStack = () => (
    <div className="svc-seo">
        <div className="svc-seo__rig">
            {results.map((result) => (
                <article
                    className={`svc-seo__card${result.hero ? " svc-seo__card--hero" : ""}`}
                    key={result.domain}
                >
                    <div className="svc-seo__site">
                        <span className="svc-seo__favicon" />
                        {result.domain}
                    </div>
                    <p className="svc-seo__headline">{result.headline}</p>
                    <span className="svc-seo__bar" />
                    <span className="svc-seo__bar" />
                    {result.hero && <span className="svc-seo__badge">#1</span>}
                </article>
            ))}
            <div className="svc-seo__query">
                <Search size={16} strokeWidth={2.25} aria-hidden="true" />
                digital marketing agency in bangalore
            </div>
        </div>
    </div>
);

const ServiceSeo = () => (
    <ServiceWallSection
        service="seo"
        title={seo.title}
        summary={seo.summary}
        paragraphs={[
            seo.body ?? "",
            "Be the answer, not just a result. We help your brand appear in Google AI Overviews, featured snippets and AI assistants like ChatGPT, Gemini and Perplexity.",
        ]}
        groups={seo.groups}
        visual={<RankStack />}
        visualLabel="A stack of search results fanning apart in 3D while your brand's result rises to the top as number one"
    />
);

export default ServiceSeo;

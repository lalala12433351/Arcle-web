import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import "./plexify.css";

const features = [
    { title: "Paid Search Marketing", icon: "sprout" },
    { title: "Client-Centric Approach", icon: "gear" },
    { title: "Leadership Development", icon: "users" },
    { title: "Conversion Rate", icon: "chart" },
];

const projects = [
    { title: "Dynamic E-Commerce Platform", image: "/assets/plexify/port1.png" },
    { title: "Scalable Web Commerce Solution", image: "/assets/plexify/port2.png" },
    { title: "Powerful Digital Storefront", image: "/assets/plexify/port3.png" },
    { title: "Customizable Product Marketplace", image: "/assets/plexify/port1.png" },
];

const services = [
    {
        key: "SEO",
        title: "Search Engine Optimization",
        art: "/assets/plexify/seo.png",
        icon: "/assets/plexify/svc1.png",
        points: ["On-page and off-page SEO", "Keyword research and optimization", "Technical SEO", "Link building"],
    },
    {
        key: "Email",
        title: "Email Marketing",
        art: "/assets/plexify/email.png",
        icon: "/assets/plexify/svc2.png",
        points: ["Email campaign design and automation", "Personalized email sequences", "Newsletter creation", "List segmentation and lead nurturing"],
    },
    {
        key: "Social",
        title: "Social Media Marketing",
        art: "/assets/plexify/social.png",
        icon: "/assets/plexify/svc3.png",
        points: ["Community engagement", "Influencer marketing", "Paid social advertising"],
    },
];

const steps = [
    ["Competitor analysis and keyword research", "Gain insights to stay ahead"],
    ["Craft a tailored SEO and digital plan", "Tailored strategies for your brand."],
    ["Optimize your website for search engines", "Improve rankings & visibility"],
    ["Focus on long-term success & growth", "Build sustainable success"],
];

const posts = [
    ["How to Create a Stunning", "15 May 2026", "Liam Anderson", "/assets/plexify/blog1.jpg"],
    ["Transform Your Ideas into Impact", "18 May 2026", "Liam Anderson", "/assets/plexify/blog2.png"],
    ["Master the Art of Visual Storytelling", "18 May 2026", "Mason Hayes", "/assets/plexify/blog3.png"],
    ["Elevate Your Brand with Bold Visuals", "25 May 2026", "Henry Walker", "/assets/plexify/blog4.png"],
    ["Where Creativity Meets Simplicity", "20 June 2026", "Henry Walker", "/assets/plexify/blog5.png"],
];

const quotes = [
    ["Olivia Mitchell", "This template has great documentation and support. It's very flexible and has so many options to implement to your website. I am happy that i decided to buy it."],
    ["Sophie Blake", "Building with this template was a breeze. Well-documented and beautifully designed — exactly what I needed."],
    ["Isla Morgan", "The flexibility is unmatched. Every component feels thoughtfully crafted, and integrating it was seamless."],
];

const faqs = [
    ["Am I a good candidate for plastic surgery?", "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout."],
    ["How do I prepare for surgery?", "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout."],
    ["What is the difference between cosmetic and surgery?", "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout."],
];

const logos = [1, 2, 3, 4, 5, 1, 2, 3, 4, 5];

function Icon({ name }: { name: string }) {
    if (name === "gear") {
        return (
            <svg viewBox="0 0 48 48">
                <circle cx="24" cy="24" r="7" />
                <path d="M24 6v5M24 37v5M6 24h5M37 24h5M11 11l3.5 3.5M33.5 33.5 37 37M37 11l-3.5 3.5M14.5 33.5 11 37" />
            </svg>
        );
    }
    if (name === "users") {
        return (
            <svg viewBox="0 0 48 48">
                <circle cx="18" cy="16" r="6" />
                <circle cx="32" cy="18" r="5" />
                <path d="M6 38c1.5-7 6-10 12-10s10.5 3 12 10M28 28c4-.4 8 1.6 10 8" />
            </svg>
        );
    }
    if (name === "chart") {
        return (
            <svg viewBox="0 0 48 48">
                <path d="M8 38h32M12 32l8-10 6 6 10-14" />
                <path d="M30 14h8v8" />
            </svg>
        );
    }
    return (
        <svg viewBox="0 0 48 48">
            <path d="M24 40V22" />
            <path d="M24 22c0-8 6-12 6-12-2 6 2 8 2 8 4-8 10-8 10-8-2 10-8 14-12 14" />
            <path d="M24 24c0-6-5-10-5-10 1 5-2 7-2 7-3-6-8-6-8-6 2 8 7 11 10 11" />
            <circle cx="24" cy="16" r="3" />
        </svg>
    );
}

const PlexifyHome = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [onDark, setOnDark] = useState(false);
    const [service, setService] = useState(0);
    const [faq, setFaq] = useState(0);
    const active = services[service];

    useEffect(() => {
        const onScroll = () => setOnDark(window.scrollY > window.innerHeight * 0.72);
        onScroll();
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    return (
        <div className="plexify-page">
            <Helmet>
                <title>Plexify - Digital Marketing</title>
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
                <link href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Space+Grotesk:wght@400;500;600;700&display=swap" rel="stylesheet" />
            </Helmet>

            <header className={`px-header ${onDark ? "on-dark" : ""}`}>
                <button className="px-brand" type="button" onClick={() => setMenuOpen(true)} aria-label="Menu">
                    <span className="px-mark">M</span>
                    <span>☰ Menu</span>
                </button>
                <a className="px-talk" href="#talk">Let’s talk <i>→</i></a>
            </header>

            {menuOpen && (
                <nav className="px-menu">
                    <div>
                        {["Home", "About Us", "FAQs", "Team", "Portfolio", "Service", "Blog"].map((item) => (
                            <a key={item} href={`#${item.toLowerCase().replace(" ", "-")}`} onClick={() => setMenuOpen(false)}>{item}</a>
                        ))}
                    </div>
                    <div className="px-menu-side">
                        <h3>Send a message</h3>
                        <a href="mailto:hello@example.com">hello@example.com</a>
                        <a href="mailto:info@example.com">info@example.com</a>
                        <h3>Call us</h3>
                        <p>+1 234 567 8910</p>
                        <p>+1 987 654 3210</p>
                        <h3>Visit us</h3>
                        <p>Chicago HQ Estica Cop. Macomb, MI 48042</p>
                        <button className="px-green-link" type="button" onClick={() => setMenuOpen(false)}>Close</button>
                    </div>
                </nav>
            )}

            <section className="px-hero" id="home">
                <div className="px-line">
                    <span className="px-we">WE</span>
                    <span className="px-are">ARE A</span>
                    <span className="px-script">digital</span>
                </div>
                <span className="px-tag">Boost Your Brand with Cutting-Edge Digital Marketing!</span>
                <div className="px-line">
                    <span className="px-script">marketing</span>
                    <span className="px-agency">AGENCY</span>
                </div>
                <div className="px-socials">
                    <a href="#talk">FB</a>
                    <a href="#talk">X</a>
                    <a href="#talk">IN</a>
                    <a href="#talk">LN</a>
                </div>
            </section>

            <section className="px-build" id="about-us">
                <video className="px-video" autoPlay muted loop playsInline poster="/assets/plexify/port2.png">
                    <source src="https://digital-marketing-tailwind-nextjs.vercel.app/video/video1.mp4" type="video/mp4" />
                </video>
                <div>
                    <div className="px-stats">
                        <div>
                            <strong>120k</strong>
                            <p>Active members inside the program</p>
                        </div>
                        <div>
                            <strong>72+</strong>
                            <p>of customers are repeat customers</p>
                        </div>
                    </div>
                    <h2>Lets build with <em>Plexify</em></h2>
                    <p className="px-lead">
                        Empower your brand with cutting-edge digital solutions, drive engagement, and accelerate growth with our innovative marketing strategies.
                    </p>
                    <div className="px-cards">
                        {features.map((item) => (
                            <article className="px-card" key={item.title}>
                                <Icon name={item.icon} />
                                <h3>{item.title}</h3>
                                <a href="#service">Learn more ↗</a>
                            </article>
                        ))}
                    </div>
                </div>
            </section>

            <section className="px-work" id="portfolio">
                <div className="px-marquee">
                    {[...projects, ...projects].map((item, index) => (
                        <article className="px-shot" key={`${item.title}-${index}`}>
                            <img src={item.image} alt={item.title} />
                            <h3>{item.title}</h3>
                        </article>
                    ))}
                </div>
            </section>

            <section className="px-services" id="service">
                <div className="px-services-head">
                    <div>
                        <div className="px-kicker">Find Our Best Services</div>
                        <h2>Achieve Top Rankings with Cutting-Edge SEO Services!</h2>
                    </div>
                    <p>Search, email, and social campaigns built to grow the brand.</p>
                </div>
                <div className="px-service-visuals">
                    {services.map((item, index) => (
                        <button key={item.key} className={index === service ? "active" : ""} type="button" onClick={() => setService(index)}>
                            <img src={item.art} alt={item.title} />
                        </button>
                    ))}
                </div>
                <div className="px-service-copy">
                    <img src={active.icon} alt="" />
                    <div>
                        <h3>{active.title}</h3>
                        <ul>
                            {active.points.map((point) => <li key={point}>{point}</li>)}
                        </ul>
                    </div>
                    <a className="px-green-link" href="#talk">View Details</a>
                </div>
            </section>

            <section className="px-brands">
                <h2>Branding</h2>
                <div className="px-logo-track">
                    {logos.map((id, index) => (
                        <img key={`${id}-${index}`} src={`/assets/plexify/logo${id}.png`} alt="client logo" />
                    ))}
                </div>
            </section>

            <section className="px-process" id="team">
                <div>
                    <div className="px-kicker">How It Work</div>
                    <h2>Our Step-by-Step Marketing Process</h2>
                    <p>A clear path from research to long-term growth.</p>
                </div>
                <div>
                    {steps.map(([title, text], index) => (
                        <article className="px-step" key={title}>
                            <b>{index + 1}</b>
                            <div>
                                <h3>{title}</h3>
                                <p>{text}</p>
                            </div>
                        </article>
                    ))}
                </div>
            </section>

            <section className="px-cta">
                <h3>Start your dream project today</h3>
                <a className="px-dark-btn" href="#talk">Let’s talk <i>→</i></a>
            </section>

            <section className="px-blog" id="blog">
                <div className="px-blog-head">
                    <div>
                        <h2>Our Latest Blog & Article</h2>
                        <p>Explore our latest blog and articles for expert insights on web design, SEO, and digital trends.</p>
                    </div>
                    <a className="px-green-link" href="#blog">View All</a>
                </div>
                <div className="px-blog-row">
                    {posts.slice(0, 3).map(([title, date, author, image]) => (
                        <article className="px-post" key={title}>
                            <img src={image} alt={title} />
                            <div>
                                <h3>{title}</h3>
                                <p>Explore our latest blog and articles for expert insights on web design.</p>
                                <small>{date} · By {author}</small>
                            </div>
                        </article>
                    ))}
                </div>
            </section>

            <section className="px-stories">
                <div className="px-stories-head">
                    <div>
                        <h2>Success Stories: How Feedback Fuels Our Growth</h2>
                        <p>Plexify is rated 4.5 / 5 average from 200 reviews on Google, Clutch!</p>
                    </div>
                    <div className="px-score">
                        <strong>4.5</strong>
                        <span>Star rating on Trustpilot<br />10 Years Experience in Digital marketing</span>
                    </div>
                </div>
                <div className="px-quotes">
                    {quotes.map(([name, text]) => (
                        <article className="px-quote" key={name}>
                            <p>{text}</p>
                            <h3>{name}</h3>
                            <span>Power XR2 Module</span>
                        </article>
                    ))}
                </div>
            </section>

            <section className="px-faq" id="faqs">
                <div className="px-kicker">We have professional experts around world.</div>
                <h2>Frequently Asked Questions</h2>
                <div className="px-faq-grid">
                    <img src="/assets/plexify/port2.png" alt="FAQ" />
                    <div className="px-acc">
                        {faqs.map(([question, answer], index) => (
                            <div key={question}>
                                <button type="button" onClick={() => setFaq(index)}>
                                    {question}
                                    <span>{faq === index ? "–" : "+"}</span>
                                </button>
                                {faq === index && <p>{answer}</p>}
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="px-trust">
                <div>
                    <h3>Trusted and top rated tech team</h3>
                    <p>4.9/5 · 1.24k client reviews</p>
                </div>
                <div className="px-logo-track">
                    {logos.slice(0, 5).map((id) => (
                        <img key={id} src={`/assets/plexify/logo${id}.png`} alt="Brand logo" />
                    ))}
                </div>
            </section>

            <footer className="px-footer-cta" id="talk">
                <h2>Take your brand to the next level with Plexify</h2>
                <a className="px-dark-btn" href="mailto:hello@example.com">Let’s talk <i>→</i></a>
                <div className="px-footer">
                    <div>
                        <h4>Company</h4>
                        <Link to="/plexify">Home</Link>
                        <a href="#about-us">About us</a>
                        <a href="#service">Service</a>
                    </div>
                    <div>
                        <h4>Send a Message</h4>
                        <a href="mailto:hello@example.com">hello@example.com</a>
                        <a href="mailto:info@example.com">info@example.com</a>
                    </div>
                    <div>
                        <h4>Call us</h4>
                        <a href="tel:+12345678910">+1 234 567 8910</a>
                        <a href="tel:+19876543210">+1 987 654 3210</a>
                    </div>
                    <div className="px-social-row">
                        <a href="#talk">LINKEDIN</a>
                        <a href="#talk">INTRAGRAM</a>
                        <a href="#talk">X</a>
                        <a href="#talk">FACEBOOK</a>
                    </div>
                </div>
                <p className="px-copy">Copyright © {new Date().getFullYear()} DexignZone. All Rights Reserved</p>
            </footer>
        </div>
    );
};

export default PlexifyHome;

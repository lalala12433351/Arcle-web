import { useEffect, useRef, useState } from "react";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import useContactScroll from "../../hooks/useContactScroll";
import ContactStudioForm from "./ContactStudioForm";
import "./ContactStudio.css";

const bangaloreTime = new Intl.DateTimeFormat("en-IN", {
    timeZone: "Asia/Kolkata",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
});

const useBangaloreClock = () => {
    const [now, setNow] = useState(() => new Date());
    useEffect(() => {
        const id = window.setInterval(() => setNow(new Date()), 15000);
        return () => window.clearInterval(id);
    }, []);
    return { label: bangaloreTime.format(now), iso: now.toISOString() };
};

const directionsUrl = "https://www.google.com/maps/dir/?api=1&destination=SVR+Building+HSR+Layout+Bangalore+560102";

const ContactStudio = () => {
    const rootRef = useRef<HTMLElement>(null);
    const clock = useBangaloreClock();
    useContactScroll(rootRef);

    return (
        <main className="cx-page" ref={rootRef}>
            <section className="cx-hero" aria-labelledby="cx-title">
                <div className="cx-wrap cx-hero__inner">
                    <h1 className="cx-hero__title" id="cx-title">
                        <span className="cx-hero__line cx-hero__line--a">
                            <span className="cx-mask"><span className="cx-mask__in">Get in</span></span>
                        </span>
                        <span className="cx-hero__line cx-hero__line--b">
                            <span className="cx-mask"><em className="cx-mask__in">touch</em></span>
                        </span>
                    </h1>

                    <div className="cx-hero__foot">
                        <span className="cx-rule" data-cx-hero-rule aria-hidden="true" />
                        <p className="cx-hero__clock" data-cx-intro>
                            <span className="cx-hero__pulse" aria-hidden="true" />
                            <span>Bangalore <time dateTime={clock.iso}>{clock.label}</time> IST</span>
                        </p>
                        <p className="cx-hero__lead" data-cx-intro>
                            Talk to us about a free growth audit. We'll review your website, SEO, Google Ads, Meta Ads,
                            social media, content, conversion and competitors, and you'll receive practical
                            recommendations you can act on.
                        </p>
                        <div className="cx-hero__actions" data-cx-intro>
                            <a className="cx-btn" href="#cx-message-form">
                                Write to us <ArrowRight aria-hidden="true" size={17} strokeWidth={1.8} />
                            </a>
                            <a className="cx-link" href="tel:+919606352255">+91 96063 52255</a>
                        </div>
                    </div>
                </div>
            </section>

            <section className="cx-sheet" id="cx-message-form" aria-labelledby="cx-form-title">
                <div className="cx-sheet__bg" aria-hidden="true" />
                <div className="cx-wrap cx-sheet__grid">
                    <div className="cx-sheet__form">
                        <h2 className="cx-heading" id="cx-form-title">
                            <span className="cx-mask"><span className="cx-mask__in" data-cx-title>Send us a message</span></span>
                        </h2>
                        <p className="cx-sheet__intro">
                            A few lines about your business is enough to start. Tell us what you sell, who you sell to,
                            and what growth should look like.
                        </p>
                        <ContactStudioForm />
                    </div>

                    <aside className="cx-channels" aria-label="Other ways to reach Arcle">
                        <ul data-cx-group>
                            <li data-cx-reveal>
                                <span className="cx-rule" data-cx-rule aria-hidden="true" />
                                <span className="cx-channels__label">Call</span>
                                <div className="cx-channels__value">
                                    <a className="cx-channels__big" href="tel:+919606352255">+91 96063 52255</a>
                                    <a className="cx-channels__big" href="tel:+917411983969">+91 74119 83969</a>
                                </div>
                            </li>
                            <li data-cx-reveal>
                                <span className="cx-rule" data-cx-rule aria-hidden="true" />
                                <span className="cx-channels__label">Email</span>
                                <div className="cx-channels__value">
                                    <a className="cx-channels__big" href="mailto:info@arcle.in">info@arcle.in</a>
                                </div>
                            </li>
                            <li data-cx-reveal>
                                <span className="cx-rule" data-cx-rule aria-hidden="true" />
                                <span className="cx-channels__label">Office</span>
                                <address className="cx-channels__value cx-channels__address">
                                    <strong>Arcle Technologies LLP</strong>
                                    No.71/2, 71/2A, 3rd floor, SVR Building, BBMP Khata, HSR Layout, Bangalore South,
                                    Bangalore-560102, Karnataka, India
                                </address>
                            </li>
                            <li data-cx-reveal>
                                <span className="cx-rule" data-cx-rule aria-hidden="true" />
                                <span className="cx-channels__label">Follow</span>
                                <div className="cx-channels__value cx-channels__social">
                                    <a href="https://www.linkedin.com/" target="_blank" rel="noreferrer">
                                        LinkedIn <ArrowUpRight aria-hidden="true" size={15} strokeWidth={1.8} />
                                    </a>
                                    <a href="https://www.facebook.com/" target="_blank" rel="noreferrer">
                                        Facebook <ArrowUpRight aria-hidden="true" size={15} strokeWidth={1.8} />
                                    </a>
                                    <a href="https://www.x.com" target="_blank" rel="noreferrer">
                                        X <ArrowUpRight aria-hidden="true" size={15} strokeWidth={1.8} />
                                    </a>
                                </div>
                            </li>
                        </ul>
                    </aside>
                </div>
            </section>

            <section className="cx-map" aria-label="Office location">
                <div className="cx-map__frame">
                    <iframe
                        title="Arcle Technologies LLP registered office"
                        src="https://maps.google.com/maps?q=HSR%20Layout%2C%20Bengaluru%2C%20Karnataka%20560102&z=15&output=embed"
                        loading="lazy"
                    />
                    <a className="cx-map__card" href={directionsUrl} target="_blank" rel="noreferrer">
                        <strong>SVR Building, HSR Layout</strong>
                        <span>Bangalore 560102</span>
                        <span className="cx-map__go">
                            Get directions <ArrowUpRight aria-hidden="true" size={15} strokeWidth={1.8} />
                        </span>
                    </a>
                </div>
            </section>
        </main>
    );
};

export default ContactStudio;

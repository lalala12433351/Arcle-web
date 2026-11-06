const ServicesHero = () => (
    <header className="services-hero">
        <div className="services-shell">
            <p className="services-hero__eyebrow" data-hero-reveal>Services</p>
            <h1 className="services-hero__title">
                <span className="services-mask">
                    <span className="services-mask__in" data-hero-line>Built to get your</span>
                </span>
                <span className="services-mask">
                    <span className="services-mask__in" data-hero-line>
                        business{" "}
                        <span className="services-hero__nowrap">
                            <span className="services-hero__mark">
                                moving<span className="services-hero__underline" aria-hidden="true" />
                            </span>.
                        </span>
                    </span>
                </span>
            </h1>
        </div>
    </header>
);

export default ServicesHero;

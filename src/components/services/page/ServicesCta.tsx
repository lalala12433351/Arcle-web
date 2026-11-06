import { Link } from "react-router-dom";
import { enquiryHref, enquiryLinks } from "./servicesContent";

const ServicesCta = () => (
    <section className="services-cta" aria-labelledby="services-cta-title">
        <div className="services-shell">
            <h2 className="services-cta__title" id="services-cta-title" data-reveal>
                What’s your next move?
            </h2>
            <ul className="services-cta__links">
                {enquiryLinks.map((link) => (
                    <li key={link.interest} data-reveal>
                        <Link className="services-cta__link" to={enquiryHref(link.interest)}>
                            {link.label} <span className="services-cta__arrow" aria-hidden="true">↗</span>
                        </Link>
                    </li>
                ))}
            </ul>
            <div className="services-cta__contact" data-reveal>
                <a href="tel:+919606352255">+91 96063 52255</a>
                <a href="tel:+917411983969">+91 74119 83969</a>
                <a href="mailto:info@arcle.in">info@arcle.in</a>
            </div>
        </div>
    </section>
);

export default ServicesCta;

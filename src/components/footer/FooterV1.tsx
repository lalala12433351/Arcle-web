import { Link } from "react-router-dom";
import logoLight from "/assets/img/logo-light.png";
import logo from "/assets/img/logo.png";

interface DataType {
    sectionClass?: string;
}

const pages = [
    { to: "/services", label: "Services" },
    { to: "/project", label: "Work" },
    { to: "/contact-us", label: "Contact" },
    { to: "/about-us", label: "About" },
];

const socials = [
    { href: "https://www.facebook.com/", label: "Facebook" },
    { href: "https://www.linkedin.com/", label: "LinkedIn" },
    { href: "https://www.x.com/", label: "Twitter" },
];

const legal = [
    { to: "/privacy", label: "Privacy Policy" },
    { to: "/terms", label: "Terms of Service" },
];

type ContactItem =
    | { kind: "link"; to: string; label: string }
    | { kind: "a"; href: string; label: string };

const contact: ContactItem[] = [
    { kind: "a", href: "mailto:info@arcle.in", label: "info@arcle.in" },
    { kind: "a", href: "tel:+919606352255", label: "+91 96063 52255" },
    { kind: "a", href: "tel:+917411983969", label: "+91 74119 83969" },
    { kind: "link", to: "/contact-us", label: "Start a project" },
];

const FooterV1 = ({ sectionClass }: DataType) => {
    return (
        <footer className={`arcle-footer ${sectionClass ? sectionClass : ""}`}>
            <div className="container">
                <div className="arcle-footer__main">
                    <div className="arcle-footer__brand-block">
                        <Link to="/" className="arcle-footer__brand" aria-label="Arcle home">
                            <img className="regular-img" src={logoLight} alt="" />
                            <img className="light-img" src={logo} alt="" />
                        </Link>
                        <p className="arcle-footer__tagline">
                            AI-powered digital marketing that turns ads, SEO, social and web into one engine for growth.
                        </p>
                    </div>

                    <div className="arcle-footer__columns">
                        <div className="arcle-footer__col">
                            <h3>Pages</h3>
                            <ul>
                                {pages.map((item) => (
                                    <li key={item.to}>
                                        <Link to={item.to}>{item.label}</Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="arcle-footer__col">
                            <h3>Socials</h3>
                            <ul>
                                {socials.map((item) => (
                                    <li key={item.label}>
                                        <a href={item.href} target="_blank" rel="noopener noreferrer">
                                            {item.label}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="arcle-footer__col">
                            <h3>Legal</h3>
                            <ul>
                                {legal.map((item) => (
                                    <li key={item.to}>
                                        <Link to={item.to}>{item.label}</Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="arcle-footer__col">
                            <h3>Contact</h3>
                            <ul>
                                {contact.map((item) => (
                                    <li key={item.label}>
                                        {item.kind === "link" ? (
                                            <Link to={item.to}>{item.label}</Link>
                                        ) : (
                                            <a href={item.href}>{item.label}</a>
                                        )}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>

                <div className="arcle-footer__bottom">
                    <p className="arcle-footer__copy">
                        Copyright &copy; {new Date().getFullYear()} Arcle Technologies LLP. All Rights Reserved
                    </p>
                    <p className="arcle-footer__office">
                        No.71/2, 71/2A, 3rd floor, SVR Building, HSR Layout, Bangalore-560102, Karnataka, India
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default FooterV1;

import { ArrowUpRight } from "lucide-react";
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
];

const FooterV1 = ({ sectionClass }: DataType) => {
    return (
        <footer className={`arcle-footer ${sectionClass ? sectionClass : ""}`}>
            <div className="container">
                <div className="arcle-footer__top">
                    <Link to="/" className="arcle-footer__brand" aria-label="Arcle home">
                        <img className="regular-img" src={logoLight} alt="" />
                        <img className="light-img" src={logo} alt="" />
                    </Link>
                    <Link to="/contact-us" className="arcle-footer__cta">
                        <span>Start a project</span>
                        <ArrowUpRight aria-hidden="true" strokeWidth={1.75} />
                    </Link>
                </div>

                <div className="arcle-footer__grid">
                    <nav className="arcle-footer__nav" aria-label="Site">
                        {pages.map((page) => (
                            <Link key={page.to} to={page.to}>{page.label}</Link>
                        ))}
                    </nav>

                    <address className="arcle-footer__office">
                        <span>Registered office</span>
                        Arcle Technologies LLP<br />
                        No.71/2, 71/2A, 3rd floor<br />
                        SVR Building, BBMP Khata<br />
                        HSR Layout, Bangalore South<br />
                        Bangalore-560102, Karnataka, India
                    </address>

                    <div className="arcle-footer__reach">
                        <a href="mailto:info@arcle.in">info@arcle.in</a>
                        <a href="tel:+919606352255">+91 96063 52255</a>
                        <a href="tel:+917411983969">+91 7411983969</a>
                    </div>
                </div>

                <p className="arcle-footer__copy">
                    Copyright &copy; {new Date().getFullYear()} Arcle Technologies LLP. All Rights Reserved
                </p>
            </div>
        </footer>
    );
};

export default FooterV1;

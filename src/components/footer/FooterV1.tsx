import { Link } from "react-router-dom";
import logoLight from "/assets/img/logo-light.png";
import logo from "/assets/img/logo.png";

interface DataType {
    sectionClass?: string;
}

const FooterV1 = ({ sectionClass }: DataType) => {
    return (
        <footer className={`arcle-footer ${sectionClass ? sectionClass : ""}`}>
            <div className="container">
                <div className="arcle-footer__bar">
                    <Link to="/" className="arcle-footer__brand" aria-label="Arcle">
                        <img className="regular-img" src={logoLight} alt="Arcle" />
                        <img className="light-img" src={logo} alt="Arcle" />
                    </Link>
                    <div className="arcle-footer__meta">
                        <p className="arcle-footer__office">
                            <span>Registered Office</span>
                            Arcle Technologies LLP<br />
                            No.71/2, 71/2A, 3rd floor, SVR Building, BBMP Khata, HSR Layout, Bangalore South, Bangalore-560102, Karnataka, India
                        </p>
                        <div className="arcle-footer__contacts">
                            <a href="mailto:info@arcle.in">info@arcle.in</a>
                            <a href="tel:+919606352255">+91 96063 52255</a>
                        </div>
                        <p className="arcle-footer__copy">
                            Copyright &copy; {new Date().getFullYear()} Arcle Technologies LLP. All Rights Reserved
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default FooterV1;

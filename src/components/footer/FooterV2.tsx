import logoLight from '/assets/img/logo-light.png';
import logo from '/assets/img/logo.png';
import { Link } from "react-router-dom";
import NewsletterV2 from '../newsletter/NewsletterV2';
import FooterSocial from '../social/FooterSocial';

interface DataType {
    sectionClass?: string;
}

const FooterV2 = ({ sectionClass }: DataType) => {
    return (
        <>
            <footer className={`style-two ${sectionClass ? sectionClass : ""}`}>
                <div className="container">
                    <div className="f-items">
                        <div className="row">
                            <div className="col-lg-6 footer-item about pr-120 pr-md-15 pr-xs-15">
                                <div className="top">
                                    <img className='regular-img' src={logoLight} alt="Image Not Found" />
                                    <img className='light-img' src={logo} alt="Image Not Found" />
                                </div>
                                <ul className="address-list">
                                    <li>
                                        <h4>Registered Office</h4>
                                        <p>
                                            Arcle Technologies LLP<br />
                                            No.71/2, 71/2A, 3rd floor, SVR Building, BBMP Khata, HSR Layout, HSR Layout police station, Bangalore South, Bangalore-560102, Karnataka, India
                                        </p>
                                    </li>
                                </ul>
                                <div className="footer-contact">
                                    <ul>
                                        <li>
                                            <a href="mailto:info@arcle.in">info@arcle.in</a>
                                        </li>
                                        <li>
                                            <a href="tel:+919606352255">+91 96063 52255</a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div className="col-lg-5 offset-lg-1 footer-item">
                                <h4 className="widget-title">Useful Link</h4>
                                <ul className="useful-link">
                                    <li><Link to="/about-us">About Us</Link></li>
                                    <li><Link to="/contact-us">Contact</Link></li>
                                    <li><Link to="/faq">FAQS</Link></li>
                                    <li><Link to="/services">Services</Link></li>
                                    <li><Link to="/about-2">Term & Conditions</Link></li>
                                    <li><Link to="/about-us">Privacy Policy</Link></li>
                                    <li><Link to="/about-2">Careers</Link></li>
                                    <li><Link to="/contact-us">Help Desk</Link></li>
                                </ul>
                                <NewsletterV2 />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="footer-bottom">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-6">
                                <ul className="footer-social">
                                    <FooterSocial />
                                </ul>
                            </div>
                            <div className="col-lg-6 text-end">
                                <p>
                                    Copyright &copy; {(new Date().getFullYear())} Arcle Technologies LLP. All Rights Reserved
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        </>
    );
};

export default FooterV2;
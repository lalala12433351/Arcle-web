import { Link } from "react-router-dom";
import ServicesV1Data from "../../assets/jsonData/services/ServicesV1Data.json";

interface DataType {
    navbarPlacement?: string;
    toggleSubMenu?: (event: React.MouseEvent<HTMLAnchorElement>) => void;
}

const MainMenu = ({ navbarPlacement, toggleSubMenu }: DataType) => {
    return (
        <>
            <ul className={`nav navbar-nav ${navbarPlacement ? navbarPlacement : ""}`} data-in="fadeInDown" data-out="fadeOutUp">
                <li>
                    <Link to="/">Home</Link>
                </li>
                <li className="dropdown">
                    <Link to="/services" className="dropdown-toggle" data-toggle="dropdown" onClick={toggleSubMenu}>Services</Link>
                    <ul className="dropdown-menu">
                        {ServicesV1Data.map((service) => (
                            <li key={service.id}>
                                <Link to={`/service-details/${service.id}`}>{service.title}</Link>
                            </li>
                        ))}
                        <li><Link to="/services">All Services</Link></li>
                    </ul>
                </li>
                <li>
                    <Link to="/project">Work</Link>
                </li>
                <li>
                    <Link to="/about-us">About</Link>
                </li>
                <li>
                    <Link to="/blog-standard">Insights</Link>
                </li>
                <li>
                    <Link to="/contact-us">Contact</Link>
                </li>
            </ul>
        </>
    );
};

export default MainMenu;

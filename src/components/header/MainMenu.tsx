import { Link } from "react-router-dom";

interface DataType {
    navbarPlacement?: string;
    toggleSubMenu?: (event: React.MouseEvent<HTMLAnchorElement>) => void;
}

const MainMenu = ({ navbarPlacement }: DataType) => {
    return (
        <>
            <ul className={`nav navbar-nav ${navbarPlacement ? navbarPlacement : ""}`} data-in="fadeInDown" data-out="fadeOutUp">
                <li>
                    <Link to="/services">Services</Link>
                </li>
                <li>
                    <Link to="/project">Work</Link>
                </li>
                <li>
                    <Link to="/contact-us">Contact</Link>
                </li>
            </ul>
        </>
    );
};

export default MainMenu;

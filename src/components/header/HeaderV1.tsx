import { Link, useNavigate } from "react-router-dom";
import MainMenu from './MainMenu';
import { LiquidMetalButton } from "@/components/ui/liquid-metal";
import logo from '/assets/img/logo.png';
import logoLight from '/assets/img/logo-light.png';
import useSidebarMenu from "../../hooks/useSidebarMenu";
import useSubMenuToggle from "../../hooks/useSubMenuToggle";
import useStickyMenu from "../../hooks/useStickyMenu";

const HeaderV1 = () => {

    const { isOpen, openMenu, closeMenu } = useSidebarMenu();
    const toggleSubMenu = useSubMenuToggle();
    const isMenuSticky = useStickyMenu();
    const navigate = useNavigate();

    return (
        <>
            <header>
                <nav className={`navbar mobile-sidenav navbar-sticky navbar-default validnavs navbar-fixed on menu-center arcle-compact-nav ${isMenuSticky ? "sticked" : "no-background"} ${isOpen ? "navbar-responsive" : ""}`}>
                    <div className="container d-flex justify-content-between align-items-center">
                        <div className="navbar-header">
                            <button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#navbar-menu" onClick={openMenu}>
                                <i className="fa fa-bars" />
                            </button>
                            <Link className="navbar-brand" to="/">
                                <img src={logoLight} className="logo logo-display" alt="Arcle" />
                                <img src={logoLight} className="logo logo-scrolled" alt="Arcle" />
                                <img src={logo} className="logo-dark" alt="Arcle" />
                            </Link>
                        </div>
                        <div className={`collapse navbar-collapse ${isOpen ? "show collapse-mobile" : "collapse-mobile"}`} id="navbar-menu">
                            <img className="regular-img" src={logoLight} alt="Arcle" />
                            <img className="light-img" src={logo} alt="Arcle" />
                            <button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#navbar-menu" onClick={closeMenu}>
                                <i className="fa fa-times" />
                            </button>
                            <MainMenu toggleSubMenu={toggleSubMenu} navbarPlacement='navbar-center' />
                        </div>
                        <div className="attr-right">
                            <div className="attr-nav flex">
                                <ul>
                                    <li className="button">
                                        <LiquidMetalButton
                                            type="button"
                                            size="xs"
                                            borderWidth={2}
                                            onClick={() => navigate("/contact-us")}
                                            style={{ fontFamily: "var(--font-heading)" }}
                                        >
                                            Get in touch
                                        </LiquidMetalButton>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className={`overlay-screen ${isOpen ? "opened" : ""}`} onClick={closeMenu} />
                </nav>
            </header>
        </>
    );
};

export default HeaderV1;
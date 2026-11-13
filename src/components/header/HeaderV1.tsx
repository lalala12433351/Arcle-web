import { Link } from "react-router-dom";
import MainMenu from "./MainMenu";
import SamaraMenuPill from "./SamaraMenuPill";
import logo from "/assets/img/logo.png";
import logoLight from "/assets/img/logo-light.png";
import useSidebarMenu from "../../hooks/useSidebarMenu";
import useSubMenuToggle from "../../hooks/useSubMenuToggle";
import useStickyMenu from "../../hooks/useStickyMenu";

interface HeaderV1Props {
    /** White logo while the bar sits over a dark hero; normal logo once sticky. */
    onDarkHero?: boolean;
}

const HeaderV1 = ({ onDarkHero = false }: HeaderV1Props) => {
    const { isOpen, openMenu, closeMenu } = useSidebarMenu();
    const toggleSubMenu = useSubMenuToggle();
    const isMenuSticky = useStickyMenu();

    return (
        <header>
            <nav
                className={`navbar mobile-sidenav navbar-sticky navbar-default validnavs navbar-fixed on arcle-compact-nav arcle-samara-nav ${
                    onDarkHero ? "arcle-nav--on-dark" : ""
                } ${isMenuSticky ? "sticked" : "no-background white"} ${
                    isOpen ? "navbar-responsive" : ""
                }`}
            >
                <div className="arcle-samara-nav__bar">
                    <div className="arcle-samara-nav__brand">
                        <button
                            type="button"
                            className="navbar-toggle arcle-samara-nav__toggle"
                            data-toggle="collapse"
                            data-target="#navbar-menu"
                            onClick={openMenu}
                            aria-label="Open menu"
                        >
                            <i className="fa fa-bars" />
                        </button>
                        <Link className="navbar-brand arcle-samara-nav__logo" to="/">
                            <img src={logoLight} className="logo logo-display" alt="Arcle" />
                            <img src={logoLight} className="logo logo-scrolled" alt="Arcle" />
                            <img src={logo} className="logo-dark" alt="Arcle" />
                        </Link>
                    </div>

                    <div className="arcle-samara-nav__desktop">
                        <SamaraMenuPill />
                    </div>

                    <div className="arcle-samara-nav__actions">
                        <Link className="arcle-samara-nav__cta" to="/contact-us">
                            Get started
                        </Link>
                    </div>
                </div>

                {/* Mobile drawer — keeps existing sidenav behaviour */}
                <div
                    className={`collapse navbar-collapse ${
                        isOpen ? "show collapse-mobile" : "collapse-mobile"
                    }`}
                    id="navbar-menu"
                >
                    <img className="regular-img" src={logoLight} alt="Arcle" />
                    <img className="light-img" src={logo} alt="Arcle" />
                    <button
                        type="button"
                        className="navbar-toggle"
                        data-toggle="collapse"
                        data-target="#navbar-menu"
                        onClick={closeMenu}
                        aria-label="Close menu"
                    >
                        <i className="fa fa-times" />
                    </button>
                    <MainMenu toggleSubMenu={toggleSubMenu} navbarPlacement="navbar-center" />
                    <Link
                        className="arcle-samara-nav__cta arcle-samara-nav__cta--mobile"
                        to="/contact-us"
                        onClick={closeMenu}
                    >
                        Get started
                    </Link>
                </div>

                <div
                    className={`overlay-screen ${isOpen ? "opened" : ""}`}
                    onClick={closeMenu}
                />
            </nav>
        </header>
    );
};

export default HeaderV1;

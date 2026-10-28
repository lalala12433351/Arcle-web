import { Link } from "react-router-dom";
import MainMenu from './MainMenu';
import logo from '/assets/img/logo.png';
import logoLight from '/assets/img/logo-light.png';
import useSidebarMenu from "../../hooks/useSidebarMenu";
import useSubMenuToggle from "../../hooks/useSubMenuToggle";
import useStickyMenu from "../../hooks/useStickyMenu";

const HeaderV1 = () => {

    const { isOpen, openMenu, closeMenu } = useSidebarMenu();
    const toggleSubMenu = useSubMenuToggle();
    const isMenuSticky = useStickyMenu();

    return (
        <>
            <header>
                <nav className={`navbar mobile-sidenav navbar-sticky navbar-default validnavs navbar-fixed on menu-center arcle-compact-nav ${isMenuSticky ? "sticked" : "no-background white"} ${isOpen ? "navbar-responsive" : ""}`}>
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
                        {/* Spacer keeps the centered menu balanced with the logo */}
                        <div className="attr-right" aria-hidden="true" style={{ width: 120, pointerEvents: "none" }} />
                    </div>
                    <div className={`overlay-screen ${isOpen ? "opened" : ""}`} onClick={closeMenu} />
                </nav>
            </header>
        </>
    );
};

export default HeaderV1;

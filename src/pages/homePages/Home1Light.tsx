import { Helmet } from "react-helmet-async";
import AboutV6 from "../../components/about/AboutV6";
import AboutV7 from "../../components/about/AboutV7";
import BannerV8 from "../../components/banner/BannerV8";
import FlowingMenu from "../../components/flowing-menu/FlowingMenu";
import homeMenuItems from "../../components/flowing-menu/homeMenuItems";
import InfiniteMenu from "../../components/infinite-menu/InfiniteMenu";
import menuItems from "../../components/infinite-menu/menuItems";
import BlogV2 from "../../components/blog/BlogV2";
import ClientsV1 from "../../components/clients/ClientsV1";
import FunFactV1 from "../../components/fact/FunFactV1";
import FooterV1 from "../../components/footer/FooterV1";
import HeaderV1 from "../../components/header/HeaderV1";
import MultiSectionLight from "../../components/multi/MultiSectionLight";
import PartnerV2 from "../../components/partner/PartnerV2";
import PortfolioV2 from "../../components/portfolio/PortfolioV2";
import ProjectV1Light from "../../components/project/ProjectV1Light";
import ServicesV1 from "../../components/services/ServicesV1";
import ServicesV2 from "../../components/services/ServicesV2";
import TeamV1 from "../../components/team/TeamV1";
import TestimonialV3 from "../../components/testimonial/TestimonialV3";
import ThemeLight from "../../components/switcher/ThemeLight";

const Home1Light = () => {
    return (
        <>
            <Helmet>
                <title>Arcle - Creative Digital Agency Light</title>
            </Helmet>

            <div className="smooth-scroll-container">
                <HeaderV1 />
                <BannerV8 />
                <div style={{ height: '600px', position: 'relative' }}>
                    <FlowingMenu
                        items={homeMenuItems}
                        textColor="#04000b"
                        bgColor="#ffffff"
                        marqueeBgColor="#236BFF"
                        marqueeTextColor="#ffffff"
                        borderColor="rgba(4, 0, 11, 0.12)"
                    />
                </div>
                <div style={{ height: 600, position: 'relative' }}>
                    <InfiniteMenu
                        items={menuItems}
                        count={160}
                        tileSize={0.63}
                        roundness={0.2}
                        zoom={1.65}
                        pullBack={1}
                        stretch={0.6}
                        inertia={0.6}
                        autoplay={3}
                        grayscale={true}
                        dim={0.5}
                        intro={true}
                        showInfo={true}
                        theme="light"
                        accentColor="#236BFF"
                        backgroundColor="#ffffff"
                    />
                </div>
                <AboutV6 sectionClass="default-padding" />
                <AboutV7 />
                <PartnerV2 sectionClass='bg-gray' />
                <ServicesV1 sectionClass='default-padding' hasTitle={true} />
                <ServicesV2 sectionClass='default-padding-top bg-gray' hasTitle={true} />
                <ProjectV1Light />
                <PortfolioV2 sectionClass='default-padding bg-gray' hasTitle={true} />
                <TeamV1 hasTitle={true} />
                <TestimonialV3 />
                <FunFactV1 sectionClass='default-padding bg-gray' />
                <ClientsV1 sectionClass='bg-dark' />
                <MultiSectionLight />
                <BlogV2 sectionClass='bg-gray' />
                <FooterV1 />
                <ThemeLight />
            </div>
        </>
    );
};

export default Home1Light;
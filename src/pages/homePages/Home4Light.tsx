import { Helmet } from "react-helmet-async";
import CursorEffect from "../../components/animation/CursorEffect";
import BannerV3 from "../../components/banner/BannerV3";
import HeaderV4 from "../../components/header/HeaderV4";
import FooterV1 from "../../components/footer/FooterV1";
import ThemeLight from "../../components/switcher/ThemeLight";

const Home4Light = () => {
    return (
        <>
            <Helmet>
                <title>Arcle - Home 4 Light</title>
            </Helmet>

            <HeaderV4 />
            <BannerV3 />
            <CursorEffect />
            <FooterV1 />
            <ThemeLight />
        </>
    );
};

export default Home4Light;
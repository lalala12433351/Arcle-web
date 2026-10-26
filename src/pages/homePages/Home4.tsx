import { Helmet } from "react-helmet-async";
import CursorEffect from "../../components/animation/CursorEffect";
import BannerV3 from "../../components/banner/BannerV3";
import DarkClassV2 from "../../components/classes/DarkClassV2";
import HeaderV4 from "../../components/header/HeaderV4";
import FooterV1 from "../../components/footer/FooterV1";
import ThemeDark from "../../components/switcher/ThemeDark";
import DarkClass from "../../components/classes/DarkClass";

const Home4 = () => {
    return (
        <>
            <Helmet>
                <title>Arcle - Home 4</title>
            </Helmet>

            <HeaderV4 />
            <BannerV3 />
            <CursorEffect />
            <FooterV1 />
            <DarkClassV2 />
            <DarkClass />
            <ThemeDark />
        </>
    );
};

export default Home4;
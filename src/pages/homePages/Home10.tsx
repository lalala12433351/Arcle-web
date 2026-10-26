import { Helmet } from "react-helmet-async";
import HeaderV8 from "../../components/header/HeaderV8";
import BannerV11 from "../../components/banner/BannerV11";
import DarkClassV5 from "../../components/classes/DarkClassV5";
import FooterV1 from "../../components/footer/FooterV1";
import CursorEffect from "../../components/animation/CursorEffect";

const Home10 = () => {
    return (
        <>
            <Helmet>
                <title>Arcle - Home 10</title>
            </Helmet>

            <div className="smooth-scroll-container">
                <HeaderV8 />
                <BannerV11 />
                <CursorEffect />
                <FooterV1 />
                <DarkClassV5 />
            </div>
        </>
    );
};

export default Home10;
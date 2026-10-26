import { Helmet } from "react-helmet-async";
import DarkClass from "../../components/classes/DarkClass";
import ThemeDark from "../../components/switcher/ThemeDark";
import HeaderV1 from "../../components/header/HeaderV1";
import FooterV1 from "../../components/footer/FooterV1";
import AccordionV1 from "../../components/accordion/AccordionV1";

const Home12 = () => {
    return (
        <>
            <Helmet>
                <title>Arcle - Home 12</title>
            </Helmet>

            <HeaderV1 />
            <AccordionV1 />
            <FooterV1 />
            <DarkClass />
            <ThemeDark />
        </>
    );
};

export default Home12;
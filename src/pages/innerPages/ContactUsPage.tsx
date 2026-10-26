import { Helmet } from "react-helmet-async";
import Breadcrumb from "../../components/breadcrumb/Breadcrumb";
import ContactV1 from "../../components/contact/ContactV1";
import LayoutV1 from "../../components/layouts/LayoutV1";
import ContactMap from "../../components/map/ContactMap";
import ThemeDark from "../../components/switcher/ThemeDark";

const ContactUsPage = () => {
    return (
        <>
            <Helmet>
                <title>Contact | Arcle</title>
                <meta name="description" content="Talk to Arcle Technologies LLP in Bangalore about a free growth audit." />
            </Helmet>

            <LayoutV1>
                <Breadcrumb title="Get in Touch" breadCrumb="Contact" />
                <ContactV1 />
                <ContactMap />
                <ThemeDark />
            </LayoutV1>
        </>
    );
};

export default ContactUsPage;
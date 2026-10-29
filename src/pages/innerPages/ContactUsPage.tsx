import { Helmet } from "react-helmet-async";
import ContactStudio from "../../components/contact/ContactStudio";
import LayoutV1 from "../../components/layouts/LayoutV1";
import ThemeDark from "../../components/switcher/ThemeDark";

const ContactUsPage = () => {
    return (
        <>
            <Helmet>
                <title>Contact | Arcle</title>
                <meta name="description" content="Talk to Arcle Technologies LLP in Bangalore about a free growth audit." />
            </Helmet>

            <LayoutV1>
                <ContactStudio />
                <ThemeDark />
            </LayoutV1>
        </>
    );
};

export default ContactUsPage;

import { Helmet } from "react-helmet-async";
import Breadcrumb from "../../components/breadcrumb/Breadcrumb";
import LayoutV1 from "../../components/layouts/LayoutV1";
import ThemeDark from "../../components/switcher/ThemeDark";

interface LegalPageProps {
    title: string;
    description: string;
    breadCrumb: string;
    children: React.ReactNode;
}

const LegalPage = ({ title, description, breadCrumb, children }: LegalPageProps) => {
    return (
        <>
            <Helmet>
                <title>{title} | Arcle</title>
                <meta name="description" content={description} />
            </Helmet>
            <LayoutV1>
                <Breadcrumb title={title} breadCrumb={breadCrumb} />
                <div className="default-padding-bottom">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-8 offset-lg-2 arcle-prose">
                                {children}
                            </div>
                        </div>
                    </div>
                </div>
                <ThemeDark />
            </LayoutV1>
        </>
    );
};

export const PrivacyPage = () => (
    <LegalPage
        title="Privacy Policy"
        breadCrumb="Privacy"
        description="How Arcle Technologies LLP handles information shared through this website."
    >
        <p>Arcle Technologies LLP (“Arcle”, “we”) operates this website from Bangalore, India. This page explains what we collect when you use the site and how to reach us about it.</p>
        <h3>What we collect</h3>
        <p>If you email us or use the contact form, we receive the details you submit: your name, email address, phone number and the message about your project. The site also receives ordinary technical logs from the host, such as browser type and pages requested.</p>
        <h3>How we use it</h3>
        <p>We use that information to reply to your enquiry, prepare a proposal, and keep a record of the conversation. We do not sell personal information. We do not use it for unrelated mailing lists unless you ask to hear from us.</p>
        <h3>How long we keep it</h3>
        <p>Enquiry records are kept for as long as we need them to respond, deliver work, or meet a legal or accounting requirement, and then deleted or anonymised.</p>
        <h3>Your choices</h3>
        <p>You can ask what we hold about you, ask us to correct it, or ask us to delete it where we are not required to keep it. Write to <a href="mailto:info@arcle.in">info@arcle.in</a>.</p>
        <h3>Contact</h3>
        <p>Arcle Technologies LLP, No.71/2, 71/2A, 3rd floor, SVR Building, HSR Layout, Bangalore 560102, Karnataka, India.</p>
    </LegalPage>
);

export const TermsPage = () => (
    <LegalPage
        title="Terms of Use"
        breadCrumb="Terms"
        description="Terms for using the Arcle Technologies LLP website."
    >
        <p>This website is published by Arcle Technologies LLP. By using it you agree to these terms.</p>
        <h3>The site</h3>
        <p>The pages describe our services. They are not a binding proposal. Work starts only when both sides agree scope, fees and timing in writing. Advertising budgets are paid to the platforms, separate from Arcle’s fees.</p>
        <h3>Your content</h3>
        <p>Do not submit unlawful, misleading or confidential information you are not allowed to share. You are responsible for the accuracy of what you send us.</p>
        <h3>Our content</h3>
        <p>Text, design and code on this site belong to Arcle unless stated otherwise. You may not copy them for a competing service. Case studies describe the type of work we do and do not grant you rights in a client’s brand.</p>
        <h3>Liability</h3>
        <p>We take care to keep the site accurate and available. We do not promise uninterrupted access, and we are not liable for decisions you make solely from website copy before a signed agreement.</p>
        <h3>Contact</h3>
        <p>Questions about these terms: <a href="mailto:info@arcle.in">info@arcle.in</a>.</p>
    </LegalPage>
);

export default LegalPage;

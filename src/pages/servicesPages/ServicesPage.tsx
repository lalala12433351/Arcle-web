import { Helmet } from "react-helmet-async";
import Breadcrumb from "../../components/breadcrumb/Breadcrumb";
import LayoutV1 from "../../components/layouts/LayoutV1";
import ProcessV1 from "../../components/process/ProcessV1";
import ProjectIdeaV1 from "../../components/project/ProjectIdeaV1";
import ServicesV1 from "../../components/services/ServicesV1";
import ThemeDark from "../../components/switcher/ThemeDark";

const ServicesPage = () => {
    return (
        <>
            <Helmet>
                <title>Services | Arcle</title>
                <meta name="description" content="Performance marketing, SEO, social, websites, apps and branding from one Arcle team in Bangalore." />
            </Helmet>

            <LayoutV1>
                <Breadcrumb title="Services" breadCrumb="Services" />
                <ServicesV1
                    sectionClass="default-padding-bottom"
                    hasTitle={true}
                    subTitle="What We Do"
                    title="Everything You Need to Grow Online"
                />
                <div className="default-padding bg-gray">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-8 offset-lg-2">
                                <div className="site-heading text-center">
                                    <h4 className="sub-title">Engagement</h4>
                                    <h2 className="title">How a Project Moves</h2>
                                </div>
                            </div>
                        </div>
                        <ProcessV1 />
                    </div>
                </div>
                <div className="default-padding overflow-hidden" style={{ position: "relative" }}>
                    <ProjectIdeaV1 />
                </div>
                <ThemeDark />
            </LayoutV1>
        </>
    );
};

export default ServicesPage;

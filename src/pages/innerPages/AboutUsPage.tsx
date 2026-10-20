import { Helmet } from "react-helmet-async";
import AboutV6 from "../../components/about/AboutV6";
import Breadcrumb from "../../components/breadcrumb/Breadcrumb";
import LayoutV1 from "../../components/layouts/LayoutV1";
import ProcessV1 from "../../components/process/ProcessV1";
import ProjectIdeaV1 from "../../components/project/ProjectIdeaV1";
import ThemeDark from "../../components/switcher/ThemeDark";
import WhyChooseV1 from "../../components/whyChoose/WhyChooseV1";
import DarkClass from "../../components/classes/DarkClass";

const AboutUsPage = () => {
    return (
        <>
            <Helmet>
                <title>About Arcle | Digital Marketing Agency in Bangalore</title>
                <meta name="description" content="Arcle Technologies LLP is a digital marketing and technology company in Bangalore. One team for strategy, creative, search, ads and product." />
            </Helmet>

            <LayoutV1>
                <Breadcrumb title="About Arcle" breadCrumb="About" />
                <AboutV6 sectionClass="bg-gray default-padding" />
                <WhyChooseV1 sectionClass="default-padding" />
                <div className="default-padding bg-gray">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-8 offset-lg-2">
                                <div className="site-heading text-center">
                                    <h4 className="sub-title">How We Work</h4>
                                    <h2 className="title">From Audit to Scale</h2>
                                </div>
                            </div>
                        </div>
                        <ProcessV1 />
                    </div>
                </div>
                <div className="default-padding overflow-hidden" style={{ position: "relative" }}>
                    <ProjectIdeaV1 />
                </div>
                <DarkClass />
                <ThemeDark />
            </LayoutV1>
        </>
    );
};

export default AboutUsPage;

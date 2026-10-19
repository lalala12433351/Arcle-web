import { Link } from "react-router-dom";

const ProjectIdeaV1 = () => {
    return (
        <>
            <div className="contact-panel-bg" style={{ backgroundImage: 'url(/assets/img/about/3.jpg)' }} />
            <div className="container">
                <div className="row">
                    <div className="col-lg-7">
                        <h4 className="sub-title">Free Audit</h4>
                        <h2 className="title">Find Your Biggest Growth Opportunity</h2>
                        <p>
                            We'll review your website, SEO, Google Ads, Meta Ads, social media, content, conversion and competitors. You'll receive practical recommendations you can act on.
                        </p>
                        <Link className="btn-animation mt-30" to="/contact-us"><i className="fas fa-arrow-right" /> <span>Book a free growth audit</span></Link>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ProjectIdeaV1;

import { Link } from "react-router-dom";
import icon16 from "/assets/img/icon/16.png"
import team10 from "/assets/img/team/10.jpg"
import team11 from "/assets/img/team/11.jpg"
import team12 from "/assets/img/team/12.jpg"
import team13 from "/assets/img/team/13.jpg"
import SplitText from "../animation/SplitText.jsx"

interface DataType {
    sectionClass?: string
}

const AboutV7 = ({ sectionClass }: DataType) => {
    return (
        <>
            <div className={`about-style-seven-area default-padding ${sectionClass ? sectionClass : ""}`}>
                <div className="container">
                    <div className="about-style-one-items">
                        <div className="row">
                            <div className="col-lg-5">
                                <div className="about-style-seven-left-info">
                                    <h2 className="title">
                                        <SplitText
                                            delay={20}
                                            animationFrom={{ opacity: 0, transform: 'translate3d(0,50px,0)' }}
                                            animationTo={{ opacity: 1, transform: 'translate3d(0,0,0)' }}
                                            easing="easeOutCubic"
                                            threshold={0.2}
                                            rootMargin="-50px"
                                        >
                                            Strategy Before Spending
                                        </SplitText>
                                    </h2>
                                    <Link className="btn-animation mt-10" to="/about-2">
                                        <i className="fas fa-arrow-right" /> <span>Know More</span>
                                    </Link>
                                </div>
                            </div>
                            <div className="col-lg-7 pl-80 pl-md-15 pl-xs-15">
                                <div className="about-style-seven-info">
                                    <div className="d-grid">
                                        <div className="left">
                                            <ul className="list-style-one">
                                                <li>
                                                    <strong>01</strong> Business
                                                </li>
                                                <li>
                                                    <strong>02</strong> Audience
                                                </li>
                                                <li>
                                                    <strong>03</strong> Offer
                                                </li>
                                                <li>
                                                    <strong>04</strong> Channel
                                                </li>
                                                <li>
                                                    <strong>05</strong> Website
                                                </li>
                                                <li>
                                                    <strong>06</strong> Conversion
                                                </li>
                                            </ul>
                                            <p>
                                                Before execution, we look at the complete customer journey, from follow-up through to measurement. Arcle is headquartered in Bangalore and works with businesses across Mumbai, Delhi NCR, Hyderabad, Chennai, Pune, Kolkata, Ahmedabad, Kochi and growing cities in India, as well as international markets.
                                            </p>
                                        </div>
                                        <div className="award-style-one">
                                            <div className="top">
                                                <div className="icon">
                                                    <img src={icon16} alt="Image Not Found" />
                                                </div>
                                                <div className="info">
                                                    <h4>One team for marketing and technology</h4>
                                                </div>
                                            </div>
                                            <div className="user-card-two">
                                                <div className="thumb">
                                                    <img src={team10} alt="Image Not Found" />
                                                    <img src={team11} alt="Image Not Found" />
                                                    <img src={team12} alt="Image Not Found" />
                                                    <img src={team13} alt="Image Not Found" />
                                                    <Link to="/about-us">
                                                        <i className="fas fa-plus" />
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AboutV7;
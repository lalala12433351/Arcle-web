import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import SplitText from "../animation/SplitText.jsx"
import HowItWorks from "../../../how-it-works/HowItWorks.jsx";
import Counter from "../counter/Counter";

const BannerV8 = () => {
    const [projects, setProjects] = useState(0);

    useEffect(() => {
        setProjects(31);
    }, []);

    return (
        <>
            <div className="banner-style-eight-area bg-cover"
                style={{ backgroundImage: 'url(/assets/img/shape/3.jpg)' }}>
                <div className="light-banner-active bg-gray bg-cover" style={{ backgroundImage: 'url(/assets/img/shape/4.jpg?v=blue)' }} />
                <div className="container">
                    <div className="row">
                        <div className="col-xl-12">
                            <div className="banner-style-eight-heading">
                                <div className="banner-title">

                                    <h2>
                                        <SplitText
                                            className="title-left split-text"
                                            delay={150}
                                            animationFrom={{ opacity: 0, transform: 'translate3d(0,50px,0)' }}
                                            animationTo={{ opacity: 1, transform: 'translate3d(0,0,0)' }}
                                            easing="easeOutCubic"
                                            threshold={0.2}
                                            rootMargin="-50px"
                                        >
                                            Designing
                                        </SplitText>
                                    </h2>

                                    <h2 className="title-right split-text">
                                        <SplitText
                                            delay={150}
                                            animationFrom={{ opacity: 0, transform: 'translate3d(0,50px,0)' }}
                                            animationTo={{ opacity: 1, transform: 'translate3d(0,0,0)' }}
                                            easing="easeOutCubic"
                                            threshold={0.2}
                                            rootMargin="-50px"
                                        >
                                            Creative
                                        </SplitText>
                                    </h2>

                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-xl-7">
                            <div className="d-grid">
                                <div className="right">
                                    <p>
                                        Providing innovative solutions in branding, marketing, design, and advertising. These agencies often collaborate with clients to develop unique campaigns, visual identities, and digital strategies that resonate with target audiences. Services may include graphic design, content creation, social media management.
                                    </p>
                                    <Link className="btn-animation mt-10" to="/about-2"><i className="fas fa-arrow-right" /> <span>Know More</span></Link>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-4 offset-xl-1">
                            <div className="card-style-one">
                                <div className="bottom">
                                    <div className="fun-fact">
                                        <div className="counter">
                                            <div className="timer">
                                                <Counter
                                                    value={projects}
                                                    places={[10, 1]}
                                                    fontSize={72}
                                                    padding={0}
                                                    gap={2}
                                                    horizontalPadding={0}
                                                    borderRadius={0}
                                                    textColor="inherit"
                                                    fontWeight={600}
                                                    gradientHeight={14}
                                                    gradientFrom="var(--counter-fade, #ffffff)"
                                                    gradientTo="transparent"
                                                />
                                            </div>
                                            <div className="operator">K</div>
                                        </div>
                                        <span className="medium">Completed Projects</span>
                                    </div>
                                    <Link to="/project"><i className="fas fa-long-arrow-right" /></Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <HowItWorks embedded />
            </div>
        </>
    );
};

export default BannerV8;
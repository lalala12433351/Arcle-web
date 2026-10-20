import Animate from '../animation/Animate';
import thumb3 from '/assets/img/thumb/3.jpg';
import { whyArcle } from '../../content/arcleHome';

const whyPoints = whyArcle;

interface DataType {
    sectionClass?: string
}

const WhyChooseV1 = ({ sectionClass }: DataType) => {
    return (
        <>
            <div className={`${sectionClass ? sectionClass : ""}`}>
                <div className="container">
                    <div className="row align-center">
                        <div className="col-lg-5">
                            <div className="thumb-style-one">
                                <img src={thumb3} alt="Arcle studio" width={800} height={900} loading="lazy" decoding="async" />
                            </div>
                        </div>
                        <div className="col-lg-7">
                            <div className="choose-us-style-one">
                                <div className="pl-80 pl-md-0 pl-xs-0">
                                    <h4 className="sub-title">Why Arcle</h4>
                                    <h2 className="title">Built Around Business Results</h2>
                                    <div className="faq-style-one accordion mt-30" id="whyAccordion">
                                        {whyPoints.map((point, index) => {
                                            const panelId = `why-collapse-${index}`;
                                            const open = index === 0;
                                            return (
                                                <div className="accordion-item" key={point.title}>
                                                    <h2 className="accordion-header" id={`${panelId}-heading`}>
                                                        <button className={`accordion-button${open ? "" : " collapsed"}`} type="button" data-bs-toggle="collapse" data-bs-target={`#${panelId}`} aria-expanded={open} aria-controls={panelId}>
                                                            {point.title}
                                                        </button>
                                                    </h2>
                                                    <div id={panelId} className={`accordion-collapse collapse${open ? " show" : ""}`} aria-labelledby={`${panelId}-heading`} data-bs-parent="#whyAccordion">
                                                        <div className="accordion-body">
                                                            <p>{point.text}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                                <div className="award-items">
                                    <Animate className='animate__animated animate__fadeInLeft'>
                                        <div className="award-item">
                                            <i className="fas fa-users" />
                                            <h4>One Team</h4>
                                        </div>
                                    </Animate>

                                    <Animate className='animate__animated animate__fadeInLeft' delay="100ms">
                                        <div className="award-item">
                                            <i className="fas fa-layer-group" />
                                            <h4>One Strategy</h4>
                                        </div>
                                    </Animate>

                                    <Animate className='animate__animated animate__fadeInLeft' delay="200ms">
                                        <div className="award-item">
                                            <i className="fas fa-handshake" />
                                            <h4>One Partner</h4>
                                        </div>
                                    </Animate>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default WhyChooseV1;
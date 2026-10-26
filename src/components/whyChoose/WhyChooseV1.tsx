import { whyArcle } from '../../content/arcleHome';
import ShinyText from '../ShinyText.jsx';
import { useSiteTheme } from '../../hooks/useSiteTheme';

const whyPoints = whyArcle;

// ShinyText resolves colours on a canvas, so CSS variables can't be passed here.
const darkShine = { color: '#ffffff', shineColor: '#8fb2ff', speed: 3, delay: 1 };
const lightShine = { color: '#04000b', shineColor: '#236BFF', speed: 3, delay: 1 };
const blueShine = { color: '#236BFF', shineColor: '#ffffff', speed: 3, delay: 1 };

interface DataType {
    sectionClass?: string
}

const WhyChooseV1 = ({ sectionClass }: DataType) => {
    const baseShine = useSiteTheme() ? darkShine : lightShine;

    return (
        <>
            <div className={`${sectionClass ? sectionClass : ""}`}>
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-lg-10">
                            <div className="choose-us-style-one why-arcle-statement">
                                <h2 className="why-arcle-statement__title">
                                    <ShinyText text="Built" className="why-arcle-statement__wide" {...baseShine} />
                                    <ShinyText text="Around" className="why-arcle-statement__wide" {...baseShine} />
                                    <ShinyText text="Business" className="why-arcle-statement__wide" {...baseShine} />
                                    <ShinyText text="Results" {...blueShine} />
                                </h2>
                                <div className="faq-style-one accordion why-arcle-statement__list" id="whyAccordion">
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
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default WhyChooseV1;

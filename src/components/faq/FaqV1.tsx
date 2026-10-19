import { arcleFaqs } from "../../content/arcleHome";

interface DataType {
    sectionClass?: string
    hasTitle?: boolean
}

const FaqV1 = ({ sectionClass, hasTitle }: DataType) => {
    const columns = [arcleFaqs.slice(0, 6), arcleFaqs.slice(6)];

    return (
        <>
            <div className={`faq-area default-padding ${sectionClass ? sectionClass : ""}`}>
                <div className="container">
                    {hasTitle &&
                        <div className="row">
                            <div className="col-lg-8 offset-lg-2">
                                <div className="site-heading text-center">
                                    <h4 className="sub-title">FAQs</h4>
                                    <h2 className="title">Questions, Answered</h2>
                                </div>
                            </div>
                        </div>
                    }
                    <div className="row gutter-xl">
                        {columns.map((column, columnIndex) => (
                            <div className="col-lg-6" key={columnIndex}>
                                <div className="faq-style-one accordion" id={`faqAccordion-${columnIndex}`}>
                                    {column.map((faq, index) => {
                                        const panelId = `faq-collapse-${columnIndex}-${index}`;
                                        const open = columnIndex === 0 && index === 0;
                                        return (
                                            <div className="accordion-item" key={faq.question}>
                                                <h2 className="accordion-header" id={`${panelId}-heading`}>
                                                    <button className={`accordion-button${open ? "" : " collapsed"}`} type="button" data-bs-toggle="collapse" data-bs-target={`#${panelId}`} aria-expanded={open} aria-controls={panelId}>
                                                        {faq.question}
                                                    </button>
                                                </h2>
                                                <div id={panelId} className={`accordion-collapse collapse${open ? " show" : ""}`} aria-labelledby={`${panelId}-heading`} data-bs-parent={`#faqAccordion-${columnIndex}`}>
                                                    <div className="accordion-body">
                                                        <p>{faq.answer}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
};

export default FaqV1;

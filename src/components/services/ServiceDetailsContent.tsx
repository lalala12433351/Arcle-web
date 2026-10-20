import banner6 from "/assets/img/banner/6.jpg";
import ServicesV1Data from "../../../src/assets/jsonData/services/ServicesV1Data.json";
import { services, processSteps } from "../../content/arcleHome";
import { Link } from "react-router-dom";

interface DataType {
    id?: number;
    title?: string;
    text?: string;
}

interface ServiceDetailsProps {
    serviceInfo?: DataType;
    sectionClass?: string;
}

const ServiceDetailsContent = ({ serviceInfo, sectionClass }: ServiceDetailsProps) => {
    const { id, title, text } = serviceInfo || {};
    const detail = services.find((item) => item.title === title);
    const related = ServicesV1Data.filter((item) => item.id !== id).slice(0, 3);

    return (
        <>
            <div className={`services-details-area ${sectionClass ? sectionClass : ""}`}>
                <div className="container">
                    <div className="services-details-items">
                        <div className="row">
                            <div className="col-xl-12">
                                <div className="service-single-thumb">
                                    <img src={banner6} alt={title || "Arcle service"} width={1600} height={700} />
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-lg-7">
                                <h2>{title}</h2>
                                <p>{detail?.body || text}</p>
                                {detail?.summary && <p>{detail.summary}</p>}
                            </div>
                            <div className="col-lg-5 pl-60 pl-md-15 pl-xs-15">
                                <p>
                                    Every engagement is scoped around your market, your offer and the number you need to move. You keep the website, ad accounts and data.
                                </p>
                                {detail?.groups?.map((group) => (
                                    <div key={group.label}>
                                        <h4 className="mt-4">{group.label}</h4>
                                        <ul className="feature-list-item">
                                            {group.items.map((item) => (
                                                <li key={item}>{item}</li>
                                            ))}
                                        </ul>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="mt-50 mt-xs-20">
                            <div className="process-style-two">
                                {processSteps.slice(0, 4).map((step) => (
                                    <div className="process-style-two-item" key={step.step}>
                                        <span>{step.step}</span>
                                        <h4>{step.title}</h4>
                                        <p>{step.text}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="services-more mt-100 mt-xs-30">
                            <h2 className="mb-20">Related services</h2>
                            <div className="row">
                                {related.map((service) => (
                                    <div className="col-lg-4 col-md-6" key={service.id}>
                                        <div className="item">
                                            <img className="regular-img" src={`/assets/img/icon/${service.icon}`} alt="" width={75} height={60} />
                                            <img className="light-img" src={`/assets/img/icon/${service.iconLight}`} alt="" width={75} height={60} />
                                            <h4><Link to={`/service-details/${service.id}`}>{service.title}</Link></h4>
                                            <p>{service.text}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ServiceDetailsContent;

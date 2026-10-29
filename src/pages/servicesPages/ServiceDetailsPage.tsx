import { Navigate, useParams } from "react-router-dom";
import Breadcrumb from "../../components/breadcrumb/Breadcrumb";
import LayoutV1 from "../../components/layouts/LayoutV1";
import ServiceDetailsContent from "../../components/services/ServiceDetailsContent";
import ServicesV1Data from "../../../src/assets/jsonData/services/ServicesV1Data.json"
import { Helmet } from "react-helmet-async";
import ThemeDark from "../../components/switcher/ThemeDark";
import { services as serviceCatalog } from "../../content/arcleHome";
import { serviceSlug } from "../../content/serviceSlug";

const ServiceDetailsPage = () => {

    const { id, slug } = useParams();
    const slugKey = slug ? decodeURIComponent(slug).toLowerCase() : "";
    const fromList = ServicesV1Data.find((service) =>
        slug
            ? serviceSlug(service.title) === slugKey
            : service.id === parseInt(id || "0", 10)
    );
    const fromCatalog = serviceCatalog.find((service) => serviceSlug(service.title) === slugKey);
    const data = fromList ?? (fromCatalog
        ? { id: 0, title: fromCatalog.title, text: fromCatalog.summary }
        : undefined);

    if (data && ["seo", "development", "creative"].includes(serviceSlug(data.title))) {
        return <Navigate to="/services" replace />;
    }

    return (
        <>
            <Helmet>
                <title>{data ? `${data.title} | Arcle` : "Services | Arcle"}</title>
            </Helmet>

            <LayoutV1>
                <Breadcrumb title={data?.title || "Services"} breadCrumb="Services" />
                {data && <ServiceDetailsContent serviceInfo={data} sectionClass='default-padding-bottom' />}
                <ThemeDark />
            </LayoutV1>
        </>
    );
};

export default ServiceDetailsPage;
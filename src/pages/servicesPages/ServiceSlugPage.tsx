import { useParams } from "react-router-dom";
import { isFocusService } from "../../content/serviceSlug";
import ServiceDetailsPage from "./ServiceDetailsPage";
import ServiceFocusPage from "./ServiceFocusPage";

const ServiceSlugPage = () => {
    const { slug } = useParams();
    if (isFocusService(slug)) return <ServiceFocusPage />;
    return <ServiceDetailsPage />;
};

export default ServiceSlugPage;

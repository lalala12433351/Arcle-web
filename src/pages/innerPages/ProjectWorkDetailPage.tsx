import { Helmet } from "react-helmet-async";
import { Navigate, useParams } from "react-router-dom";
import LayoutV1 from "../../components/layouts/LayoutV1";
import ProjectWorkDetail from "../../components/project/ProjectWorkDetail";
import ThemeDark from "../../components/switcher/ThemeDark";
import { getWorkBySlug } from "../../content/works";

const ProjectWorkDetailPage = () => {
    const { slug } = useParams();
    const work = getWorkBySlug(slug);

    if (!work) {
        return <Navigate to="/project" replace />;
    }

    return (
        <>
            <Helmet>
                <title>{work.name} | Arcle</title>
            </Helmet>

            <LayoutV1>
                <ProjectWorkDetail work={work} />
                <ThemeDark />
            </LayoutV1>
        </>
    );
};

export default ProjectWorkDetailPage;

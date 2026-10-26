import { Helmet } from "react-helmet-async";
import LayoutV1 from "../../components/layouts/LayoutV1";
import ProjectHeroVideo from "../../components/project/ProjectHeroVideo";
import ThemeDark from "../../components/switcher/ThemeDark";

const ProjectPage = () => {
    return (
        <>
            <Helmet>
                <title>Work | Arcle</title>
            </Helmet>

            <LayoutV1>
                <ProjectHeroVideo />
                <ThemeDark />
            </LayoutV1>
        </>
    );
};

export default ProjectPage;
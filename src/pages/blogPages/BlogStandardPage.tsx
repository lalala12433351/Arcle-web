import LayoutV1 from '../../components/layouts/LayoutV1';
import Breadcrumb from '../../components/breadcrumb/Breadcrumb';
import BlogStandardContent from '../../components/blog/BlogStandardContent';
import { Helmet } from 'react-helmet-async';
import ThemeDark from '../../components/switcher/ThemeDark';

const BlogStandardPage = () => {
    return (
        <>
            <Helmet>
                <title>Insights | Arcle</title>
            </Helmet>

            <LayoutV1>
                <Breadcrumb title="Insights" breadCrumb="Insights" />
                <BlogStandardContent sectionClass='default-padding-bottom' />
                <ThemeDark />
            </LayoutV1>
        </>
    );
};

export default BlogStandardPage;
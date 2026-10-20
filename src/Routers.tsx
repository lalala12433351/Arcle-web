import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import Home1 from "./pages/homePages/Home1";
const Home2 = lazy(() => import("./pages/homePages/Home2"));
const Home3 = lazy(() => import("./pages/homePages/Home3"));
const Home4 = lazy(() => import("./pages/homePages/Home4"));
const Home5 = lazy(() => import("./pages/homePages/Home5"));
const Home7 = lazy(() => import("./pages/homePages/Home7"));
const Home8 = lazy(() => import("./pages/homePages/Home8"));
const Home9 = lazy(() => import("./pages/homePages/Home9"));

// Home Light
const Home1Light = lazy(() => import("./pages/homePages/Home1Light"));
const Home2Light = lazy(() => import("./pages/homePages/Home2Light"));
const Home3Light = lazy(() => import("./pages/homePages/Home3Light"));
const Home4Light = lazy(() => import("./pages/homePages/Home4Light"));
const Home5Light = lazy(() => import("./pages/homePages/Home5Light"));
const Home7Light = lazy(() => import("./pages/homePages/Home7Light"));
const Home8Light = lazy(() => import("./pages/homePages/Home8Light"));
const Home9Light = lazy(() => import("./pages/homePages/Home9Light"));

// Inner Pages 
const AboutUsPage = lazy(() => import("./pages/innerPages/AboutUsPage"));
const About2Page = lazy(() => import("./pages/innerPages/About2Page"));
const TeamPage = lazy(() => import("./pages/innerPages/TeamPage"));
const Team2Page = lazy(() => import("./pages/innerPages/Team2Page"));
const TeamDetailsPage = lazy(() => import("./pages/innerPages/TeamDetailsPage"));
const ProjectPage = lazy(() => import("./pages/innerPages/ProjectPage"));
const Project2Page = lazy(() => import("./pages/innerPages/Project2Page"));
const Project3Page = lazy(() => import("./pages/innerPages/Project3Page"));
const ProjectDetailsPage = lazy(() => import("./pages/innerPages/ProjectDetailsPage"));
const ContactUsPage = lazy(() => import("./pages/innerPages/ContactUsPage"));
const FaqPage = lazy(() => import("./pages/innerPages/FaqPage"));

// Inner Light
const AboutUsLightPage = lazy(() => import("./pages/innerPages/AboutUsLightPage"));
const About2LightPage = lazy(() => import("./pages/innerPages/About2LightPage"));
const TeamLightPage = lazy(() => import("./pages/innerPages/TeamLightPage"));
const Team2LightPage = lazy(() => import("./pages/innerPages/Team2LightPage"));
const TeamDetailsLightPage = lazy(() => import("./pages/innerPages/TeamDetailsLightPage"));
const ProjectLightPage = lazy(() => import("./pages/innerPages/ProjectLightPage"));
const Project2LightPage = lazy(() => import("./pages/innerPages/Project2LightPage"));
const Project3LightPage = lazy(() => import("./pages/innerPages/Project3LightPage"));
const ProjectDetailsLightPage = lazy(() => import("./pages/innerPages/ProjectDetailsLightPage"));
const ContactUsLightPage = lazy(() => import("./pages/innerPages/ContactUsLightPage"));
const FaqLightPage = lazy(() => import("./pages/innerPages/FaqLightPage"));

// Services Page
const ServicesPage = lazy(() => import("./pages/servicesPages/ServicesPage"));
const Services2Page = lazy(() => import("./pages/servicesPages/Services2Page"));
const Services3Page = lazy(() => import("./pages/servicesPages/Services3Page"));
const Services4Page = lazy(() => import("./pages/servicesPages/Services4Page"));
const ServiceDetailsPage = lazy(() => import("./pages/servicesPages/ServiceDetailsPage"));

// Services Light
const ServicesLightPage = lazy(() => import("./pages/servicesPages/ServicesLightPage"));
const Services2LightPage = lazy(() => import("./pages/servicesPages/Services2LightPage"));
const Services3LightPage = lazy(() => import("./pages/servicesPages/Services3LightPage"));
const ServiceDetailsLightPage = lazy(() => import("./pages/servicesPages/ServiceDetailsLightPage"));
const Services4LightPage = lazy(() => import("./pages/servicesPages/Services4LightPage"));

// Blog Pages
const BlogStandardPage = lazy(() => import("./pages/blogPages/BlogStandardPage"));
const BlogWithSidebarPage = lazy(() => import("./pages/blogPages/BlogWithSidebarPage"));
const Blog2ColumnPage = lazy(() => import("./pages/blogPages/Blog2ColumnPage"));
const Blog3ColumnPage = lazy(() => import("./pages/blogPages/Blog3ColumnPage"));
const BlogSinglePage = lazy(() => import("./pages/blogPages/BlogSinglePage"));
const BlogSingleWithSidebarPage = lazy(() => import("./pages/blogPages/BlogSingleWithSidebarPage"));

// Blog Light
const BlogStandardLightPage = lazy(() => import("./pages/blogPages/BlogStandardLightPage"));
const BlogWithSidebarLightPage = lazy(() => import("./pages/blogPages/BlogWithSidebarLightPage"));
const Blog2ColumnLightPage = lazy(() => import("./pages/blogPages/Blog2ColumnLightPage"));
const Blog3ColumnLightPage = lazy(() => import("./pages/blogPages/Blog3ColumnLightPage"));
const BlogSingleLightPage = lazy(() => import("./pages/blogPages/BlogSingleLightPage"));
const BlogSingleWithSidebarLightPage = lazy(() => import("./pages/blogPages/BlogSingleWithSidebarLightPage"));

const NotFoundPage = lazy(() => import("./pages/innerPages/NotFoundPage"));
const PlexifyHome = lazy(() => import("./pages/plexify/PlexifyHome"));
const Home10 = lazy(() => import("./pages/homePages/Home10"));
const Home11 = lazy(() => import("./pages/homePages/Home11"));
const Home12 = lazy(() => import("./pages/homePages/Home12"));
const Home13 = lazy(() => import("./pages/homePages/Home13"));
const Home10Light = lazy(() => import("./pages/homePages/Home10Light"));
const Home11Light = lazy(() => import("./pages/homePages/Home11Light"));
const Home12Light = lazy(() => import("./pages/homePages/Home12Light"));
const Home13Light = lazy(() => import("./pages/homePages/Home13Light"));
const PrismaHeroDemo = lazy(() => import("./pages/homePages/PrismaHeroDemo"));
const WovenLightHeroDemo = lazy(() => import("./pages/homePages/WovenLightHeroDemo"));

const PrivacyPage = lazy(() => import("./pages/innerPages/LegalPage").then((m) => ({ default: m.PrivacyPage })));
const TermsPage = lazy(() => import("./pages/innerPages/LegalPage").then((m) => ({ default: m.TermsPage })));

const Routers = () => {
    return (
        <>
            <Suspense fallback={<div className="arcle-route-fallback" role="status" aria-label="Loading page" />}>
            <Routes>

                <Route path='/' element={<Home1 />}></Route>
                <Route path='/prisma-hero' element={<PrismaHeroDemo />}></Route>
                <Route path='/woven-light-hero' element={<WovenLightHeroDemo />}></Route>
                <Route path='/plexify' element={<PlexifyHome />}></Route>
                <Route path='/home-2' element={<Home2 />}></Route>
                <Route path='/home-3' element={<Home3 />}></Route>
                <Route path='/home-4' element={<Home4 />}></Route>
                <Route path='/home-5' element={<Home5 />}></Route>
                <Route path='/home-6' element={<Home1 />}></Route>
                <Route path='/home-7' element={<Home7 />}></Route>
                <Route path='/home-8' element={<Home8 />}></Route>
                <Route path='/home-9' element={<Home9 />}></Route>
                <Route path='/home-10' element={<Home10 />}></Route>
                <Route path='/home-11' element={<Home11 />}></Route>
                <Route path='/home-12' element={<Home12 />}></Route>
                <Route path='/home-13' element={<Home13 />}></Route>

                {/* Home Light  */}
                <Route path='/home-1-light' element={<Home1Light />}></Route>
                <Route path='/home-2-light' element={<Home2Light />}></Route>
                <Route path='/home-3-light' element={<Home3Light />}></Route>
                <Route path='/home-4-light' element={<Home4Light />}></Route>
                <Route path='/home-5-light' element={<Home5Light />}></Route>
                <Route path='/home-6-light' element={<Home1Light />}></Route>
                <Route path='/home-7-light' element={<Home7Light />}></Route>
                <Route path='/home-8-light' element={<Home8Light />}></Route>
                <Route path='/home-9-light' element={<Home9Light />}></Route>
                <Route path='/home-10-light' element={<Home10Light />}></Route>
                <Route path='/home-11-light' element={<Home11Light />}></Route>
                <Route path='/home-12-light' element={<Home12Light />}></Route>
                <Route path='/home-13-light' element={<Home13Light />}></Route>

                {/* Inner Pages */}
                <Route path='/about-us' element={<AboutUsPage />}></Route>
                <Route path='/about-2' element={<About2Page />}></Route>
                <Route path='/team' element={<TeamPage />}></Route>
                <Route path='/team-2' element={<Team2Page />}></Route>
                <Route path='/team-details/:id' element={<TeamDetailsPage />}></Route>
                <Route path='/project' element={<ProjectPage />}></Route>
                <Route path='/project-2' element={<Project2Page />}></Route>
                <Route path='/project-3' element={<Project3Page />}></Route>
                <Route path='/project-details/:id' element={<ProjectDetailsPage />}></Route>
                <Route path='/contact-us' element={<ContactUsPage />}></Route>
                <Route path='/faq' element={<FaqPage />}></Route>

                {/* Inner Light  */}
                <Route path='/about-us-light' element={<AboutUsLightPage />}></Route>
                <Route path='/about-2-light' element={<About2LightPage />}></Route>
                <Route path='/team-light' element={<TeamLightPage />}></Route>
                <Route path='/team-2-light' element={<Team2LightPage />}></Route>
                <Route path='/team-details-light/:id' element={<TeamDetailsLightPage />}></Route>
                <Route path='/project-light' element={<ProjectLightPage />}></Route>
                <Route path='/project-2-light' element={<Project2LightPage />}></Route>
                <Route path='/project-3-light' element={<Project3LightPage />}></Route>
                <Route path='/project-details-light/:id' element={<ProjectDetailsLightPage />}></Route>
                <Route path='/contact-us-light' element={<ContactUsLightPage />}></Route>
                <Route path='/faq-light' element={<FaqLightPage />}></Route>

                {/* Services Page */}
                <Route path='/services' element={<ServicesPage />}></Route>
                <Route path='/services-2' element={<Services2Page />}></Route>
                <Route path='/services-3' element={<Services3Page />}></Route>
                <Route path='/services-4' element={<Services4Page />}></Route>
                <Route path='/service-details/:id' element={<ServiceDetailsPage />}></Route>

                {/* Services Light */}
                <Route path='/services-light' element={<ServicesLightPage />}></Route>
                <Route path='/services-2-light' element={<Services2LightPage />}></Route>
                <Route path='/services-3-light' element={<Services3LightPage />}></Route>
                <Route path='/services-4-light' element={<Services4LightPage />}></Route>
                <Route path='/service-details-light/:id' element={<ServiceDetailsLightPage />}></Route>

                {/* Blog Pages */}
                <Route path='/blog-standard' element={<BlogStandardPage />}></Route>
                <Route path='/blog-standard?:page?' element={<BlogStandardPage />}></Route>
                <Route path='/blog-with-sidebar' element={<BlogWithSidebarPage />}></Route>
                <Route path='/blog-with-sidebar?:page?' element={<BlogWithSidebarPage />}></Route>
                <Route path='/blog-2-column' element={<Blog2ColumnPage />}></Route>
                <Route path='/blog-2-column?:page?' element={<Blog2ColumnPage />}></Route>
                <Route path='/blog-3-column' element={<Blog3ColumnPage />}></Route>
                <Route path='/blog-3-column?:page?' element={<Blog3ColumnPage />}></Route>
                <Route path='/blog-single/:id' element={<BlogSinglePage />}></Route>
                <Route path='/blog-single-with-sidebar/:id' element={<BlogSingleWithSidebarPage />}></Route>

                {/* Blog Light */}
                <Route path='/blog-standard-light' element={<BlogStandardLightPage />}></Route>
                <Route path='/blog-standard-light?:page?' element={<BlogStandardPage />}></Route>
                <Route path='/blog-with-sidebar-light' element={<BlogWithSidebarLightPage />}></Route>
                <Route path='/blog-with-sidebar-light?:page?' element={<BlogWithSidebarPage />}></Route>
                <Route path='/blog-2-column-light' element={<Blog2ColumnLightPage />}></Route>
                <Route path='/blog-2-column-light?:page?' element={<Blog2ColumnPage />}></Route>
                <Route path='/blog-3-column-light' element={<Blog3ColumnLightPage />}></Route>
                <Route path='/blog-3-column-light?:page?' element={<Blog3ColumnPage />}></Route>
                <Route path='/blog-single-light/:id' element={<BlogSingleLightPage />}></Route>
                <Route path='/blog-single-with-sidebar-light/:id' element={<BlogSingleWithSidebarLightPage />}></Route>

                <Route path='/privacy' element={<PrivacyPage />}></Route>
                <Route path='/terms' element={<TermsPage />}></Route>

                <Route path='*' element={<NotFoundPage />}></Route>
            </Routes>
            </Suspense>
        </>
    );
};

export default Routers;
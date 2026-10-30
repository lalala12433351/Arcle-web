import { Fragment, useEffect, useLayoutEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import "lenis/dist/lenis.css";
import type { Work, WorkVideo } from "../../content/works";
import { works } from "../../content/works";
import AccordionGallery from "../AccordionGallery";
import MiraiPosterStack from "./MiraiPosterStack";
import YouTubePlayer from "./YouTubePlayer";
import "./ProjectWorkDetail.css";

const designArcGalleryItems = [
    {
        image: "/assets/client/design-arc-interiors/reviewing-execution.jpg",
        label: "Reviewing Execution",
        alt: "Site team reviewing execution on a scaffolded commercial building",
    },
    {
        image: "/assets/client/design-arc-interiors/inspecting-detail.jpg",
        label: "Inspecting Detail",
        alt: "Three site leads inspecting construction progress and quality",
    },
    {
        image: "/assets/client/design-arc-interiors/aligning-teams.jpg",
        label: "Aligning Teams",
        alt: "Project stakeholders aligning on site in front of the building",
    },
    {
        image: "/assets/client/design-arc-interiors/leading-it-company.jpg",
        label: "Bangalore IT Office",
        alt: "Reception of a 25,000 square foot IT office in Bangalore",
    },
    {
        image: "/assets/client/design-arc-interiors/generic-interiors.jpg",
        label: "Generic Interiors",
        alt: "Cafe lounge showing how generic interiors waste space and focus",
    },
];

type MediaLayout = "full" | "portrait" | "solo";

type DetailMediaProps = WorkVideo & {
    layout: MediaLayout;
};

const mediaClass = ({ layout, width, height, fit, tall }: DetailMediaProps) =>
    [
        "work-detail__media",
        `work-detail__media--${layout}`,
        width && height ? "work-detail__media--framed" : "",
        fit === "contain" ? "work-detail__media--contain" : "",
        tall ? "work-detail__media--tall" : "",
    ]
        .filter(Boolean)
        .join(" ");

const mediaFrameStyle = ({ width, height, layout, tall }: DetailMediaProps) => {
    if (!width || !height) return undefined;

    const ratio = width / height;
    const isGalleryFrame = layout === "portrait" || layout === "solo";

    // Gallery: size from native ratio (width capped, height follows) so assets aren't cropped
    if (isGalleryFrame) {
        const maxHeight = tall ? "min(68vh, 660px)" : "min(58vh, 560px)";
        const maxWidth = layout === "solo" ? "min(100%, 560px)" : "100%";
        return {
            aspectRatio: `${width} / ${height}`,
            width: `min(${maxWidth}, calc(${maxHeight} * ${ratio}))`,
            height: "auto",
        } as const;
    }

    return {
        aspectRatio: `${width} / ${height}`,
    } as const;
};

const DetailImage = (props: DetailMediaProps) => (
    <div className={mediaClass(props)} style={mediaFrameStyle(props)}>
        <img
            src={props.src}
            alt={props.label}
            loading="lazy"
            decoding="async"
            style={props.objectPosition ? { objectPosition: props.objectPosition } : undefined}
        />
    </div>
);

const DetailVideo = ({ src, label, layout, width, height, fit, tall, objectPosition }: DetailMediaProps) => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const userPaused = useRef(false);
    const [playing, setPlaying] = useState(true);

    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;

        video.muted = true;
        video.defaultMuted = true;
        video.loop = true;
        video.playsInline = true;

        const start = () => {
            if (userPaused.current) return;
            video.muted = true;
            const pending = video.play();
            if (pending) pending.catch(() => setPlaying(false));
        };

        if (video.readyState >= 2) start();
        else video.addEventListener("loadeddata", start);

        return () => video.removeEventListener("loadeddata", start);
    }, [src]);

    const togglePlayback = () => {
        const video = videoRef.current;
        if (!video) return;

        if (video.paused) {
            userPaused.current = false;
            video.muted = true;
            void video.play();
        } else {
            userPaused.current = true;
            video.pause();
        }
    };

    return (
        <div
            className={mediaClass({ src, label, layout, width, height, fit, tall })}
            style={mediaFrameStyle({ src, label, layout, width, height, fit, tall })}
        >
            <video
                ref={videoRef}
                src={src}
                autoPlay
                muted
                loop
                playsInline
                preload="auto"
                aria-label={label}
                style={objectPosition ? { objectPosition } : undefined}
                onPlay={() => setPlaying(true)}
                onPause={() => setPlaying(false)}
                onClick={togglePlayback}
            />
            <button
                type="button"
                className="work-detail__toggle"
                onClick={togglePlayback}
                aria-label={playing ? `Pause ${label}` : `Play ${label}`}
                aria-pressed={playing}
            >
                {playing ? (
                    <svg viewBox="0 0 24 24" aria-hidden="true">
                        <rect x="6" y="5" width="4" height="14" rx="1" />
                        <rect x="14" y="5" width="4" height="14" rx="1" />
                    </svg>
                ) : (
                    <svg viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M8 5.5v13l11-6.5-11-6.5z" />
                    </svg>
                )}
            </button>
        </div>
    );
};

const DetailMedia = (props: DetailMediaProps) => {
    if (props.type === "image") return <DetailImage {...props} />;
    if (props.type === "youtube" && props.youtubeId) {
        return (
            <div className={mediaClass(props)} style={{ aspectRatio: "16 / 9" }}>
                <YouTubePlayer videoId={props.youtubeId} title={props.label} width="100%" height="100%" />
            </div>
        );
    }
    return <DetailVideo {...props} />;
};

const isPortrait = (item: WorkVideo) => item.orientation === "portrait";

/** Landscapes full-width; consecutive portraits pair; lone portraits center as solo. */
const buildMediaRows = (items: WorkVideo[]) => {
    const rows: Array<{ layout: MediaLayout; items: WorkVideo[] }> = [];
    let index = 0;

    while (index < items.length) {
        const current = items[index];
        const next = items[index + 1];

        if (isPortrait(current) && next && isPortrait(next)) {
            rows.push({ layout: "portrait", items: [current, next] });
            index += 2;
            continue;
        }

        if (isPortrait(current)) {
            rows.push({ layout: "solo", items: [current] });
            index += 1;
            continue;
        }

        rows.push({ layout: "full", items: [current] });
        index += 1;
    }

    return rows;
};

const PREVIEW_SECONDS = 10;

const DesignArcPreviewVideo = ({
    src,
    poster,
    label,
}: {
    src: string;
    poster: string;
    label: string;
}) => {
    const videoRef = useRef<HTMLVideoElement>(null);

    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;

        video.muted = true;
        video.defaultMuted = true;
        video.playsInline = true;

        const start = () => {
            video.muted = true;
            const pending = video.play();
            if (pending) pending.catch(() => undefined);
        };

        const keepPreview = () => {
            if (video.currentTime < PREVIEW_SECONDS) return;
            video.currentTime = 0;
            start();
        };

        video.addEventListener("timeupdate", keepPreview);
        if (video.readyState >= 2) start();
        else video.addEventListener("loadeddata", start);

        return () => {
            video.removeEventListener("timeupdate", keepPreview);
            video.removeEventListener("loadeddata", start);
        };
    }, [src]);

    return (
        <figure className="work-detail__design-arc-video">
            <video
                ref={videoRef}
                className="work-detail__design-arc-video-player"
                src={src}
                poster={poster}
                autoPlay
                muted
                playsInline
                preload="auto"
                aria-label={`${label}, 10 second preview`}
            />
        </figure>
    );
};

type ProjectWorkDetailProps = {
    work: Work;
};

const ProjectWorkDetail = ({ work }: ProjectWorkDetailProps) => {
    const isMirai = work.slug === "mirai";
    const [featured, ...gallery] = work.videos;
    // #region agent log
    useEffect(() => {
        fetch('http://127.0.0.1:7251/ingest/a12d87f4-a06c-4cf5-b621-9ab42de99697',{method:'POST',headers:{'Content-Type':'application/json','X-Debug-Session-Id':'e66e1c'},body:JSON.stringify({sessionId:'e66e1c',location:'ProjectWorkDetail.tsx:featured',message:'featured banner media',data:{slug:work.slug,type:featured?.type??'video',youtubeId:featured?.youtubeId??null,src:featured?.src??null,label:featured?.label??null},timestamp:Date.now(),hypothesisId:'A-D'})}).catch(()=>{});
    }, [work.slug, featured]);
    // #endregion
    const isDesignArc = work.slug === "design-arc-interiors";
    const isKite = work.slug === "kite-aviation-institute";
    const designArcGalleryRef = useRef<HTMLDivElement>(null);
    const miraiPosters = isMirai ? gallery.filter((item) => item.type === "image") : [];
    const galleryItems = isMirai
        ? gallery.filter((item) => item.type !== "image")
        : isDesignArc
            ? []
            : gallery;

    useLayoutEffect(() => {
        if (!isDesignArc) return;

        gsap.registerPlugin(ScrollTrigger);
        const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        const root = document.documentElement;
        root.classList.add("design-arc-smooth");

        let lenis: Lenis | null = null;
        let tick: ((time: number) => void) | null = null;
        let motion: gsap.Context | null = null;

        if (!reduced) {
            lenis = new Lenis({
                lerp: 0.08,
                smoothWheel: true,
                wheelMultiplier: 0.9,
                touchMultiplier: 1.4,
            });
            lenis.on("scroll", ScrollTrigger.update);
            const scroller = lenis;
            tick = (time: number) => scroller.raf(time * 1000);
            gsap.ticker.add(tick);
            gsap.ticker.lagSmoothing(0);

            const galleryNode = designArcGalleryRef.current;
            if (galleryNode) {
                motion = gsap.context(() => {
                    gsap.from(galleryNode, {
                        y: 48,
                        duration: 0.9,
                        ease: "power3.out",
                        scrollTrigger: {
                            trigger: galleryNode,
                            start: "top 88%",
                            toggleActions: "play none none none",
                        },
                    });
                }, galleryNode);
            }
        }

        requestAnimationFrame(() => ScrollTrigger.refresh());

        return () => {
            motion?.revert();
            root.classList.remove("design-arc-smooth");
            if (tick) gsap.ticker.remove(tick);
            if (lenis) {
                gsap.ticker.lagSmoothing(500, 33);
                lenis.destroy();
            }
        };
    }, [isDesignArc]);
    const mediaRows = buildMediaRows(galleryItems);
    const currentIndex = works.findIndex((item) => item.slug === work.slug);
    const previous = works[(currentIndex - 1 + works.length) % works.length];
    const next = works[(currentIndex + 1) % works.length];
    const heroLayout: MediaLayout = featured && isPortrait(featured) ? "portrait" : "full";

    return (
        <section className="work-detail" aria-label={work.name}>
            {featured && (
                <div className="work-detail__hero">
                    <DetailMedia {...featured} layout={heroLayout} />
                </div>
            )}

            <article className="work-detail__case" aria-label={`${work.name} details`}>
                <div className="work-detail__identity">
                    <p className="work-detail__back">
                        <Link to="/project">← All work</Link>
                    </p>
                    <h1>{work.name}</h1>
                    <p>{work.subtitle}</p>
                </div>

                <div className="work-detail__scope">
                    <h2>Scope</h2>
                    <ul>
                        {work.scope.map((item) => (
                            <li key={item}>{item}</li>
                        ))}
                    </ul>
                </div>

                <div className="work-detail__about">
                    <h2>About</h2>
                    <p className="work-detail__year">
                        <span>{work.yearLabel}</span> {work.year}
                    </p>
                    <p>{work.description}</p>
                </div>
            </article>

            {isMirai && <MiraiPosterStack posters={miraiPosters} />}

            {isDesignArc && (
                <div className="work-detail__design-arc" ref={designArcGalleryRef}>
                    <AccordionGallery
                        items={designArcGalleryItems}
                        defaultIndex={3}
                        accentColor="#E1E0CC"
                        overlayColor="#0e0f11"
                        textColor="#ffffff"
                        height={620}
                        gap={12}
                        radius={16}
                        expandRatio={0.5}
                        orientation="horizontal"
                        duration={0.65}
                        parallax={0.45}
                        tilt={6}
                        trigger="hover"
                        showLabels
                        grayscale
                    />
                    <div className="work-detail__design-arc-media">
                        <div className="work-detail__design-arc-previews">
                            <DesignArcPreviewVideo
                                src="/assets/client/design-arc-interiors/linkedin-office.mp4"
                                poster="/assets/client/design-arc-interiors/linkedin-office-poster.jpg"
                                label="Design Arc Interiors office walkthrough"
                            />
                            <img
                                className="work-detail__design-arc-poster"
                                src="/assets/client/design-arc-interiors/built-to-perform.jpg"
                                alt="Built to Perform. Where Purpose Meets Performance."
                            />
                        </div>
                        <img
                            className="work-detail__design-arc-below"
                            src="/assets/client/design-arc-interiors/focus-rooms.jpg"
                            alt="Two glass focus rooms with teal, orange, and yellow walls"
                        />
                    </div>
                </div>
            )}

            {mediaRows.length > 0 && (
                <div
                    className={`work-detail__gallery${isMirai ? " work-detail__gallery--mirai-videos" : ""}`}
                    aria-label="Project media"
                >
                    {mediaRows.map((row, rowIndex) => (
                        <Fragment key={row.items.map((item) => item.src).join("|")}>
                            {row.items.map((item) => (
                                <DetailMedia
                                    key={item.src + item.label}
                                    {...item}
                                    layout={row.layout}
                                />
                            ))}
                            {isKite && rowIndex === 0 && (
                                <div className="work-detail__text-section">
                                    <div className="work-detail__text-label">KITE AVIATION</div>
                                    <div className="work-detail__text-content">
                                        <h2>Building a Stronger<br />Digital Presence for KITE</h2>
                                    </div>
                                </div>
                            )}
                        </Fragment>
                    ))}
                </div>
            )}

            <nav className="work-detail__nav" aria-label="Other projects">
                <Link to={`/project/${previous.slug}`} className="work-detail__nav-link">
                    <span>Previous</span>
                    <strong>{previous.name}</strong>
                </Link>
                <Link to={`/project/${next.slug}`} className="work-detail__nav-link work-detail__nav-link--next">
                    <span>Next</span>
                    <strong>{next.name}</strong>
                </Link>
            </nav>
        </section>
    );
};

export default ProjectWorkDetail;

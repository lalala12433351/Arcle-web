import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import type { Work, WorkVideo } from "../../content/works";
import { works } from "../../content/works";
import "./ProjectWorkDetail.css";

type DetailMediaProps = WorkVideo & {
    layout: "full" | "portrait";
};

const mediaClass = ({ layout, width, height }: DetailMediaProps) =>
    [
        "work-detail__media",
        `work-detail__media--${layout}`,
        width && height ? "work-detail__media--framed" : "",
    ]
        .filter(Boolean)
        .join(" ");

const mediaFrameStyle = ({ width, height }: DetailMediaProps) =>
    width && height
        ? ({
              maxWidth: width,
              aspectRatio: `${width} / ${height}`,
          } as const)
        : undefined;

const DetailImage = (props: DetailMediaProps) => (
    <div className={mediaClass(props)} style={mediaFrameStyle(props)}>
        <img src={props.src} alt={props.label} loading="lazy" decoding="async" />
    </div>
);

const DetailVideo = ({ src, label, layout, width, height }: DetailMediaProps) => {
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
            className={mediaClass({ src, label, layout, width, height })}
            style={mediaFrameStyle({ src, label, layout, width, height })}
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

const DetailMedia = (props: DetailMediaProps) =>
    props.type === "image" ? <DetailImage {...props} /> : <DetailVideo {...props} />;

const isPortrait = (item: WorkVideo) => item.orientation === "portrait";

/** Studio Sorted-style rows: landscapes full-bleed; consecutive portraits pair side-by-side. */
const buildMediaRows = (items: WorkVideo[]) => {
    const rows: Array<{ layout: "full" | "portrait"; items: WorkVideo[] }> = [];
    let index = 0;

    while (index < items.length) {
        const current = items[index];
        const next = items[index + 1];

        if (isPortrait(current) && next && isPortrait(next)) {
            rows.push({ layout: "portrait", items: [current, next] });
            index += 2;
            continue;
        }

        rows.push({ layout: "full", items: [current] });
        index += 1;
    }

    return rows;
};

type ProjectWorkDetailProps = {
    work: Work;
};

const ProjectWorkDetail = ({ work }: ProjectWorkDetailProps) => {
    const [featured, ...gallery] = work.videos;
    const mediaRows = buildMediaRows(gallery);
    const currentIndex = works.findIndex((item) => item.slug === work.slug);
    const previous = works[(currentIndex - 1 + works.length) % works.length];
    const next = works[(currentIndex + 1) % works.length];

    return (
        <section className="work-detail" aria-label={work.name}>
            {featured && (
                <div className="work-detail__hero">
                    <DetailMedia {...featured} layout="full" />
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

            {mediaRows.length > 0 && (
                <div className="work-detail__gallery" aria-label="Project media">
                    {mediaRows.map((row) =>
                        row.items.map((item) => (
                            <DetailMedia
                                key={item.src + item.label}
                                {...item}
                                layout={row.layout}
                            />
                        )),
                    )}
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

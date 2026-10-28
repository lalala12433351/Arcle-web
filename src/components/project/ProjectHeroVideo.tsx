import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { works } from "../../content/works";
import "./ProjectHeroVideo.css";

type CoverVideoProps = {
    src: string;
    poster?: string;
    label: string;
    playing: boolean;
    objectPosition?: string;
};

const CoverVideo = ({ src, poster, label, playing, objectPosition }: CoverVideoProps) => {
    const videoRef = useRef<HTMLVideoElement>(null);

    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;

        video.muted = true;
        video.defaultMuted = true;
        video.loop = true;
        video.playsInline = true;

        const showStill = () => {
            try {
                if (video.currentTime < 0.05) video.currentTime = 0.05;
            } catch {
                // Ignore seek errors before media is ready.
            }
        };

        if (video.readyState >= 2) showStill();
        else video.addEventListener("loadeddata", showStill);

        return () => video.removeEventListener("loadeddata", showStill);
    }, [src]);

    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;

        if (playing) {
            video.muted = true;
            const pending = video.play();
            if (pending) pending.catch(() => undefined);
            return;
        }

        video.pause();
        try {
            video.currentTime = 0.05;
        } catch {
            // Ignore seek errors while resetting the still frame.
        }
    }, [playing]);

    return (
        <video
            ref={videoRef}
            className="work-gallery__video"
            src={src}
            poster={poster}
            muted
            loop
            playsInline
            preload="auto"
            aria-label={label}
            style={objectPosition ? { objectPosition } : undefined}
        />
    );
};

const ProjectHeroVideo = () => {
    const [hoveredSlug, setHoveredSlug] = useState<string | null>(null);

    return (
        <section className="work-gallery" aria-label="Selected work">
            <div className="work-gallery__grid">
                {works.map((work) => {
                    const isHovered = hoveredSlug === work.slug;

                    return (
                        <Link
                            key={work.slug}
                            to={`/project/${work.slug}`}
                            className={`work-gallery__item${isHovered ? " is-hovered" : ""}`}
                            aria-label={`View ${work.name}`}
                            onMouseEnter={() => setHoveredSlug(work.slug)}
                            onMouseLeave={() => setHoveredSlug(null)}
                            onFocus={() => setHoveredSlug(work.slug)}
                            onBlur={() => setHoveredSlug(null)}
                        >
                            {work.poster && (
                                <img
                                    className="work-gallery__poster"
                                    src={work.poster}
                                    alt=""
                                    aria-hidden="true"
                                    draggable={false}
                                    style={work.coverPosition ? { objectPosition: work.coverPosition } : undefined}
                                />
                            )}
                            <CoverVideo
                                src={work.cover}
                                poster={work.poster}
                                label={work.name}
                                playing={isHovered}
                                objectPosition={work.coverPosition}
                            />
                            <span className="work-gallery__shade" aria-hidden="true" />
                            <span className="work-gallery__label">{work.name}</span>
                        </Link>
                    );
                })}
            </div>
        </section>
    );
};

export default ProjectHeroVideo;

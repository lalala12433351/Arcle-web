import { useEffect, useRef, useState } from "react";
import "./ProjectHeroVideo.css";

type ProjectVideoProps = {
    src: string;
    label: string;
};

const ProjectVideo = ({ src, label }: ProjectVideoProps) => {
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
        <div className="project-hero-video__hover">
        <div className="project-hero-video__frame">
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
                className="project-hero-video__toggle"
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
        </div>
    );
};

type ProjectCaseProps = {
    name: string;
    subtitle: string;
    scope: string[];
    yearLabel: string;
    year: string;
    description: string;
};

const ProjectCase = ({ name, subtitle, scope, yearLabel, year, description }: ProjectCaseProps) => {
    return (
        <article className="project-case" aria-label={name}>
            <div className="project-case__identity">
                <h2>{name}</h2>
                <p>{subtitle}</p>
            </div>
            <div className="project-case__scope">
                <h3>Scope</h3>
                <ul>
                    {scope.map((item) => (
                        <li key={item}>{item}</li>
                    ))}
                </ul>
            </div>
            <div className="project-case__about">
                <h3>About</h3>
                <p className="project-case__year"><span>{yearLabel}</span> {year}</p>
                <p>{description}</p>
            </div>
        </article>
    );
};

const ProjectHeroVideo = () => {
    return (
        <section className="project-hero-video" aria-label="Featured work">
            <ProjectVideo src="/assets/video/kite-institute.mp4?v=5" label="Kite Aviation Institute" />
            <ProjectCase
                name="Kite Aviation Institute"
                subtitle="Aviation & Hospitality Training"
                scope={["Aviation", "Hospitality", "Practical training", "Industry careers"]}
                yearLabel="Year:"
                year="2025"
                description="KITE Institute of Aviation & Hospitality is based in Bangalore. It offers aviation and hospitality courses. Practical training builds students' confidence and skills. It prepares them for industry careers. Skykite Institute of Aviation and Hospitality Pvt. Ltd. was incorporated on 16 April 2025."
            />
            <ProjectVideo src="/assets/video/office-interior.mp4?v=5" label="Design Arc Interiors" />
            <ProjectCase
                name="Design Arc Interiors"
                subtitle="Bangalore-based commercial interior design company"
                scope={["Office interiors", "Turnkey fit-outs"]}
                yearLabel="Established:"
                year="March 2012"
                description="Design Arc Interiors is a Bangalore-based commercial interior design company. It specialises in office interiors and turnkey fit-outs. Its spaces combine thoughtful design with everyday functionality. The team delivers workplaces that reflect each client's brand. Established in March 2012, according to its official website. The exact day isn't listed."
            />
            <ProjectVideo src="/assets/video/mirai.mp4?v=5" label="Mirai" />
            <ProjectCase
                name="Mirai"
                subtitle="Bangalore-based furniture brand"
                scope={["Ergonomic chairs", "Modular workstations", "Lounge seating"]}
                yearLabel="Incorporated:"
                year="8 January 2026"
                description="Mirai is a Bangalore-based furniture brand. It offers ergonomic chairs, modular workstations, and lounge seating. Its designs combine comfort, style, and functionality. Mirai creates furniture for modern, productive workspaces. The brand's exact launch date isn't confirmed. A company listing records Mirai Furnishing LLP's incorporation as 8 January 2026, which may differ from the brand's founding date."
            />
        </section>
    );
};

export default ProjectHeroVideo;

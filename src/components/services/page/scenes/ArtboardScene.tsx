import { useEffect, useRef, useState } from "react";
import { Pause, Play } from "lucide-react";
import { Link } from "react-router-dom";
import type { SceneProps } from "../ServiceCanvas";
import { usePlayedOnce } from "../useServicesPage";
import SceneTabs from "./SceneTabs";

type Board = "brand" | "social" | "video";

const boards: { id: Board; label: string }[] = [
    { id: "brand", label: "Brand" },
    { id: "social", label: "Social" },
    { id: "video", label: "Video" },
];

const captions: Record<Board, { project: string; detail: string; to: string }> = {
    brand: { project: "Mirai", detail: "Brand campaign posters", to: "/projects/mirai" },
    social: { project: "Kite Aviation Institute", detail: "Social creatives", to: "/projects/kite-aviation-institute" },
    video: { project: "Direct Keys", detail: "Property film", to: "/projects/direct-keys" },
};

const VideoBoard = ({ visible }: { visible: boolean }) => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [playing, setPlaying] = useState(false);

    useEffect(() => {
        if (!visible) videoRef.current?.pause();
    }, [visible]);

    const toggle = () => {
        const video = videoRef.current;
        if (!video) return;
        if (video.paused) void video.play();
        else video.pause();
    };

    return (
        <div className="board-video">
            <video
                ref={videoRef}
                src="/assets/client/direct-keys/moneyview.mp4"
                poster="/assets/client/direct-keys/moneyview-poster.jpg"
                preload="none"
                playsInline
                muted
                loop
                onPlay={() => setPlaying(true)}
                onPause={() => setPlaying(false)}
                aria-label="Direct Keys property film"
            />
            <button type="button" className="board-video__play" onClick={toggle} aria-label={playing ? "Pause film" : "Play film"}>
                {playing ? (
                    <Pause size={16} strokeWidth={2} fill="currentColor" aria-hidden="true" />
                ) : (
                    <Play size={16} strokeWidth={2} fill="currentColor" aria-hidden="true" />
                )}
            </button>
        </div>
    );
};

const ArtboardScene = ({ active }: SceneProps) => {
    const played = usePlayedOnce(active);
    const [board, setBoard] = useState<Board>("brand");
    const caption = captions[board];

    return (
        <div className={`scene scene-art${played ? " is-played" : ""}`}>
            <div className="scene__head">
                <div>
                    <p className="scene__kicker">Artboard</p>
                    <p className="scene__title">Work from Arcle projects</p>
                </div>
            </div>

            <SceneTabs label="Creative work" tabs={boards} value={board} onChange={setBoard}>
                {({ id, labelledBy }) => (
                    <div className="scene-art__panel" role="tabpanel" id={id} aria-labelledby={labelledBy}>
                        <div className={`board board--${board} scene-swap`} key={board}>
                            {board === "brand" && (
                                <>
                                    <img src="/assets/client/mirai/mirai-poster-sit.jpg" alt="Mirai poster: Sit Beautifully" loading="lazy" />
                                    <img src="/assets/client/mirai/mirai-poster.jpg" alt="Mirai poster: Refined comfort" loading="lazy" />
                                    <img src="/assets/client/mirai/mirai-poster-comfort.jpg" alt="Mirai poster: Comfort in Form" loading="lazy" />
                                </>
                            )}
                            {board === "social" && (
                                <>
                                    <figure className="board-post">
                                        <figcaption>Campaign poster</figcaption>
                                        <img src="/assets/client/kite-aviation/kite-aviation-poster.jpg" alt="Kite Aviation Institute campaign poster" loading="lazy" />
                                    </figure>
                                    <figure className="board-post board-post--wide">
                                        <figcaption>Instagram post</figcaption>
                                        <img src="/assets/client/kite-aviation/kite_insta_pic.png" alt="Kite Aviation Institute Instagram creative" loading="lazy" />
                                    </figure>
                                </>
                            )}
                            {board === "video" && <VideoBoard visible={active} />}
                        </div>
                    </div>
                )}
            </SceneTabs>

            <p className="scene-art__caption">
                <span>
                    <strong>{caption.project}</strong> — {caption.detail}
                </span>
                <Link className="scene-link" to={caption.to}>
                    View project <span aria-hidden="true">↗</span>
                </Link>
            </p>
        </div>
    );
};

export default ArtboardScene;

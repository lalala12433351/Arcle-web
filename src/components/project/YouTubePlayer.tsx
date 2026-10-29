import { useEffect, useRef, useState } from "react";
import "./YouTubePlayer.css";

type YouTubePlayerProps = {
    videoId: string;
    title?: string;
    width?: number | string;
    height?: number | string;
};

const PREVIEW_SECONDS = 10;

const YouTubePlayer = ({ videoId, title = "YouTube video", width = "100%", height = "auto" }: YouTubePlayerProps) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const iframeRef = useRef<HTMLIFrameElement>(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const watchUrl = `https://www.youtube.com/watch?v=${videoId}`;

    useEffect(() => {
        if (!containerRef.current) return;

        // #region agent log
        fetch('http://127.0.0.1:7251/ingest/a12d87f4-a06c-4cf5-b621-9ab42de99697',{method:'POST',headers:{'Content-Type':'application/json','X-Debug-Session-Id':'e66e1c'},body:JSON.stringify({sessionId:'e66e1c',location:'YouTubePlayer.tsx:mount',message:'youtube embed mounted',data:{videoId,hasClickThrough:false,previewSeconds:null,embed:'full'},timestamp:Date.now(),hypothesisId:'A-B'})}).catch(()=>{});
        // #endregion

        // Set a small delay to ensure proper rendering
        const timer = setTimeout(() => {
            setIsLoaded(true);
        }, 100);

        return () => clearTimeout(timer);
    }, [videoId]);

    useEffect(() => {
        if (!isLoaded || !iframeRef.current) return;

        let poll = 0;
        let player: { destroy?: () => void } | null = null;
        let cancelled = false;

        const loopPreview = (target: { getCurrentTime?: () => number; seekTo: (seconds: number, allowSeekAhead: boolean) => void; playVideo: () => void; mute: () => void }) => {
            target.mute();
            target.playVideo();
            poll = window.setInterval(() => {
                const currentTime = target.getCurrentTime?.() ?? 0;
                if (currentTime < PREVIEW_SECONDS) return;
                // #region agent log
                fetch('http://127.0.0.1:7251/ingest/a12d87f4-a06c-4cf5-b621-9ab42de99697',{method:'POST',headers:{'Content-Type':'application/json','X-Debug-Session-Id':'e66e1c'},body:JSON.stringify({sessionId:'e66e1c',runId:'post-fix',location:'YouTubePlayer.tsx:preview',message:'preview reached 10s and restarted',data:{videoId,currentTime,previewSeconds:PREVIEW_SECONDS},timestamp:Date.now(),hypothesisId:'A'})}).catch(()=>{});
                // #endregion
                target.seekTo(0, true);
                target.playVideo();
            }, 250);
        };

        const attach = () => {
            if (cancelled || !iframeRef.current || !window.YT?.Player) return;
            player = new window.YT.Player(iframeRef.current, {
                events: {
                    onReady: (event: { target: { mute: () => void; playVideo: () => void; getCurrentTime: () => number; seekTo: (seconds: number, allowSeekAhead: boolean) => void } }) => {
                        loopPreview(event.target);
                    },
                    onStateChange: (event: { data: number; target: { seekTo: (seconds: number, allowSeekAhead: boolean) => void; playVideo: () => void } }) => {
                        if (event.data !== window.YT?.PlayerState?.ENDED) return;
                        // #region agent log
                        fetch('http://127.0.0.1:7251/ingest/a12d87f4-a06c-4cf5-b621-9ab42de99697',{method:'POST',headers:{'Content-Type':'application/json','X-Debug-Session-Id':'e66e1c'},body:JSON.stringify({sessionId:'e66e1c',runId:'post-fix',location:'YouTubePlayer.tsx:ended',message:'preview ended and restarted',data:{videoId,previewSeconds:PREVIEW_SECONDS},timestamp:Date.now(),hypothesisId:'A'})}).catch(()=>{});
                        // #endregion
                        event.target.seekTo(0, true);
                        event.target.playVideo();
                    },
                },
            });
        };

        if (!window.YT?.Player && !document.querySelector('script[src="https://www.youtube.com/iframe_api"]')) {
            const tag = document.createElement("script");
            tag.src = "https://www.youtube.com/iframe_api";
            document.head.appendChild(tag);
        }

        const wait = window.setInterval(() => {
            if (!window.YT?.Player) return;
            window.clearInterval(wait);
            attach();
        }, 100);

        return () => {
            cancelled = true;
            window.clearInterval(wait);
            window.clearInterval(poll);
            try {
                player?.destroy?.();
            } catch {
                // The iframe may already have been removed.
            }
        };
    }, [isLoaded, videoId]);

    return (
        <div 
            ref={containerRef}
            className="youtube-player"
            style={{
                width,
                height,
                aspectRatio: "16 / 9",
            }}
            onClick={() => {
                // #region agent log
                fetch('http://127.0.0.1:7251/ingest/a12d87f4-a06c-4cf5-b621-9ab42de99697',{method:'POST',headers:{'Content-Type':'application/json','X-Debug-Session-Id':'e66e1c'},body:JSON.stringify({sessionId:'e66e1c',location:'YouTubePlayer.tsx:click',message:'embed parent received click',data:{videoId,navigates:false},timestamp:Date.now(),hypothesisId:'B'})}).catch(()=>{});
                // #endregion
            }}
        >
            {isLoaded && (
                <iframe
                    ref={iframeRef}
                    src={`https://www.youtube.com/embed/${videoId}?enablejsapi=1&rel=0&modestbranding=1&autoplay=1&mute=1&controls=0&start=0&end=${PREVIEW_SECONDS}&playsinline=1`}
                    title={title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    className="youtube-player__iframe"
                />
            )}
            <a
                className="youtube-player__open"
                href={watchUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Watch ${title} on YouTube`}
                onClick={(event) => {
                    event.stopPropagation();
                    // #region agent log
                    fetch('http://127.0.0.1:7251/ingest/a12d87f4-a06c-4cf5-b621-9ab42de99697',{method:'POST',headers:{'Content-Type':'application/json','X-Debug-Session-Id':'e66e1c'},body:JSON.stringify({sessionId:'e66e1c',runId:'post-fix',location:'YouTubePlayer.tsx:open',message:'preview click opens youtube',data:{videoId,href:watchUrl,navigates:true},timestamp:Date.now(),hypothesisId:'B'})}).catch(()=>{});
                    // #endregion
                }}
            />
        </div>
    );
};

export default YouTubePlayer;

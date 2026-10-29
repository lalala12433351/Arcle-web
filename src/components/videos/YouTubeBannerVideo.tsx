import { useEffect, useRef } from "react";
import "./YouTubeBannerVideo.css";

interface YouTubeBannerVideoProps {
    videoId?: string;
    title?: string;
    previewDuration?: number;
}

const YouTubeBannerVideo = ({ 
    videoId = "RwzaLFSLjO4", 
    title = "Design Arc Interiors",
    previewDuration = 10 
}: YouTubeBannerVideoProps) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const iframeRef = useRef<HTMLIFrameElement>(null);

    useEffect(() => {
        // #region agent log
        fetch('http://127.0.0.1:7251/ingest/a12d87f4-a06c-4cf5-b621-9ab42de99697',{method:'POST',headers:{'Content-Type':'application/json','X-Debug-Session-Id':'e66e1c'},body:JSON.stringify({sessionId:'e66e1c',location:'YouTubeBannerVideo.tsx:mount',message:'standalone banner mounted',data:{videoId,previewDuration,overlayPointerEvents:'none'},timestamp:Date.now(),hypothesisId:'C-E'})}).catch(()=>{});
        // #endregion
        // Load YouTube API
        if (!window.YT) {
            const tag = document.createElement('script');
            tag.src = "https://www.youtube.com/iframe_api";
            const firstScriptTag = document.getElementsByTagName('script')[0];
            firstScriptTag?.parentNode?.insertBefore(tag, firstScriptTag);
        }

        // Set up auto-play logic
        const setupPlayer = () => {
            const iframe = iframeRef.current;
            if (iframe && window.YT?.Player) {
                try {
                    new window.YT.Player(iframe, {
                        events: {
                            onReady: (event: any) => {
                                // #region agent log
                                fetch('http://127.0.0.1:7251/ingest/a12d87f4-a06c-4cf5-b621-9ab42de99697',{method:'POST',headers:{'Content-Type':'application/json','X-Debug-Session-Id':'e66e1c'},body:JSON.stringify({sessionId:'e66e1c',location:'YouTubeBannerVideo.tsx:onReady',message:'preview player ready',data:{previewDuration,currentTime:event.target.getCurrentTime?.()??null},timestamp:Date.now(),hypothesisId:'E'})}).catch(()=>{});
                                // #endregion
                                event.target.playVideo();

                                // Stop after preview duration
                                setTimeout(() => {
                                    event.target.stopVideo();
                                }, previewDuration * 1000);
                            },
                            onStateChange: (event: any) => {
                                if (event.data === window.YT?.PlayerState?.PLAYING) {
                                    // Stop after preview duration
                                    setTimeout(() => {
                                        event.target.stopVideo();
                                    }, previewDuration * 1000);
                                }
                            },
                        },
                    });
                } catch (err) {
                    console.log("Player already initialized or not ready");
                }
            }
        };

        // Wait for YT API to load
        const checkYT = setInterval(() => {
            if (window.YT?.Player) {
                clearInterval(checkYT);
                setupPlayer();
            }
        }, 100);

        return () => clearInterval(checkYT);
    }, [previewDuration]);

    return (
        <div className="youtube-banner-container">
            <div className="container">
                <div className="youtube-banner-wrapper">
                    <div className="youtube-banner-heading">
                        <h3>{title}</h3>
                        <p className="preview-label">10 second preview</p>
                    </div>

                    <div
                        ref={containerRef}
                        className="youtube-banner-video"
                        onClick={() => {
                            // #region agent log
                            fetch('http://127.0.0.1:7251/ingest/a12d87f4-a06c-4cf5-b621-9ab42de99697',{method:'POST',headers:{'Content-Type':'application/json','X-Debug-Session-Id':'e66e1c'},body:JSON.stringify({sessionId:'e66e1c',location:'YouTubeBannerVideo.tsx:click',message:'banner container click reached parent',data:{videoId,navigates:false},timestamp:Date.now(),hypothesisId:'C'})}).catch(()=>{});
                            // #endregion
                        }}
                    >
                        <iframe
                            ref={iframeRef}
                            id="yt-player-banner"
                            className="youtube-iframe"
                            src={`https://www.youtube.com/embed/${videoId}?enablejsapi=1&modestbranding=1&rel=0&controls=1&autoplay=0&mute=1`}
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                            title={title}
                        />
                    </div>

                    <div className="youtube-banner-overlay" />
                </div>
            </div>
        </div>
    );
};

export default YouTubeBannerVideo;

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./OfficeInteriorsVideo.css";

const OfficeInteriorsVideo = () => {
    const frameRef = useRef<HTMLDivElement>(null);
    const videoRef = useRef<HTMLVideoElement>(null);
    const sectionRef = useRef<HTMLDivElement>(null);

    useLayoutEffect(() => {
        gsap.registerPlugin(ScrollTrigger);
        const video = videoRef.current;
        const frame = frameRef.current;
        if (!video || !frame) return;

        video.muted = true;
        video.defaultMuted = true;
        video.loop = true;
        video.playsInline = true;

        const play = () => {
            video.muted = true;
            const pending = video.play();
            if (pending) pending.catch(() => {});
        };

        const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

        const ctx = gsap.context(() => {
            gsap.set(frame, { transformStyle: "preserve-3d", transformOrigin: "center center" });

            if (reduced) {
                gsap.set(frame, { scale: 1, rotateX: 0, rotateY: 0 });
                play();
                return;
            }

            gsap.fromTo(
                frame,
                { scale: 0.85, rotateX: 0, rotateY: 0, opacity: 0.8 },
                {
                    scale: 1,
                    rotateX: 5,
                    rotateY: -8,
                    opacity: 1,
                    ease: "none",
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "top 85%",
                        end: "center 50%",
                        scrub: true,
                    },
                }
            );
        }, frame);

        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) play();
            else video.pause();
        }, { threshold: 0.2 });
        observer.observe(frame);

        return () => {
            observer.disconnect();
            ctx.revert();
        };
    }, []);

    return (
        <div ref={sectionRef} className="office-interiors-video-section">
            <div className="container">
                <div className="office-interiors-heading">
                    <h3>Office Interiors in Action</h3>
                    <p>Experience the transformation of modern workspace design</p>
                </div>

                <div className="office-interiors-stage" style={{ perspective: "1400px" }}>
                    <div className="office-interiors-frame" ref={frameRef} style={{ transformStyle: "preserve-3d" }}>
                        <span className="office-interiors-depth office-interiors-depth--bottom" aria-hidden="true" />
                        <span className="office-interiors-depth office-interiors-depth--side" aria-hidden="true" />
                        <div className="office-interiors-screen">
                            <video
                                ref={videoRef}
                                src="/assets/video/office-interiors.mp4"
                                muted
                                loop
                                playsInline
                                autoPlay
                                preload="auto"
                                aria-label="Office interiors showcase"
                            />
                        </div>
                    </div>
                </div>

                <div className="office-interiors-features">
                    <div className="feature-item">
                        <span className="feature-icon">✓</span>
                        <span className="feature-text">Modern Design Solutions</span>
                    </div>
                    <div className="feature-item">
                        <span className="feature-icon">✓</span>
                        <span className="feature-text">Sustainable Materials</span>
                    </div>
                    <div className="feature-item">
                        <span className="feature-icon">✓</span>
                        <span className="feature-text">Functional Aesthetics</span>
                    </div>
                    <div className="feature-item">
                        <span className="feature-icon">✓</span>
                        <span className="feature-text">Space Optimization</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OfficeInteriorsVideo;

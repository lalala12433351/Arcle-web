import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./GrowthTogetherVideo.css";

const GrowthTogetherVideo = () => {
    const frameRef = useRef<HTMLDivElement>(null);
    const videoRef = useRef<HTMLVideoElement>(null);

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
                gsap.set(frame, { scale: 1, rotateX: 8, rotateY: -10 });
                play();
                return;
            }

            gsap.fromTo(
                frame,
                { scale: 0.78, rotateX: 0, rotateY: 0 },
                {
                    scale: 1,
                    rotateX: 8,
                    rotateY: -10,
                    ease: "none",
                    scrollTrigger: {
                        trigger: frame,
                        start: "top 90%",
                        end: "center 55%",
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
        <div className="services-style-one-area default-padding bg-gray growth-together">
            <div className="service-style-one-heading">
                <div className="container">
                    <div className="row">
                        <div className="col-xl-6 offset-xl-3 col-lg-8 offset-lg-2 text-center">
                            <div className="site-heading">
                                <h4 className="sub-title">Your Growth Stack</h4>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container">
                <div className="growth-video__stage" style={{ perspective: "1400px" }}>
                    <div className="growth-video__frame" ref={frameRef} style={{ transformStyle: "preserve-3d" }}>
                        <span className="growth-video__depth growth-video__depth--bottom" aria-hidden="true" />
                        <span className="growth-video__depth growth-video__depth--side" aria-hidden="true" />
                        <div className="growth-video__screen">
                            <video
                                ref={videoRef}
                                src="/assets/video/growth-together.mp4?v=2"
                                muted
                                loop
                                playsInline
                                autoPlay
                                preload="auto"
                                aria-label="Everything working together"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GrowthTogetherVideo;

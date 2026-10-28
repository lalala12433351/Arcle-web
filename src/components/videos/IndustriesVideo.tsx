import { useEffect, useRef, type CSSProperties } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import "lenis/dist/lenis.css";

const START_INSET_X = 0.3;
const START_INSET_Y = 0.25;

const videoStyle: CSSProperties = {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    display: "block",
};

const labelStyle: CSSProperties = {
    fontWeight: 700,
    margin: "20px 0 0",
    textAlign: "left",
};

const sideVideos = [
    { src: "/assets/video/industry-fpv.mp4", label: "Interior Designing", ratio: 4 / 3, aspect: "4 / 3" },
    { src: "/assets/video/industry-phone.mp4", label: "App Development", ratio: 9 / 16, aspect: "9 / 16" },
];

const LazyVideo = ({ src, poster }: { src: string; poster?: string }) => {
    const ref = useRef<HTMLVideoElement>(null);

    useEffect(() => {
        const video = ref.current;
        if (!video) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    if (!video.src) video.src = src;
                    video.play().catch(() => {});
                } else if (video.src) {
                    video.pause();
                }
            },
            { rootMargin: "300px 0px" }
        );
        observer.observe(video);
        return () => observer.disconnect();
    }, [src]);

    return <video ref={ref} poster={poster} muted loop playsInline preload="none" style={videoStyle} />;
};

const IndustriesVideo = () => {
    const sectionRef = useRef<HTMLDivElement>(null);
    const videoBoxRef = useRef<HTMLDivElement>(null);
    const labelRef = useRef<HTMLHeadingElement>(null);

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        const lenis = new Lenis({ lerp: 0.1, smoothWheel: true });
        lenis.on("scroll", ScrollTrigger.update);
        const tick = (time: number) => lenis.raf(time * 1000);
        gsap.ticker.add(tick);
        gsap.ticker.lagSmoothing(0);

        const ctx = gsap.context(() => {
            const box = videoBoxRef.current;
            if (!sectionRef.current || !box || !labelRef.current) return;

            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top top",
                    end: "+=150%",
                    pin: true,
                    scrub: true,
                    anticipatePin: 1,
                    invalidateOnRefresh: true,
                },
            });

            tl.fromTo(
                box,
                { clipPath: `inset(${START_INSET_Y * 100}% ${START_INSET_X * 100}% ${START_INSET_Y * 100}% ${START_INSET_X * 100}%)` },
                { clipPath: "inset(0% 0% 0% 0%)", ease: "none" },
                0
            ).fromTo(
                labelRef.current,
                { x: () => box.offsetWidth * START_INSET_X, y: () => -box.offsetHeight * START_INSET_Y },
                { x: 0, y: 0, ease: "none" },
                0
            );
        }, sectionRef);

        return () => {
            ctx.revert();
            gsap.ticker.remove(tick);
            gsap.ticker.lagSmoothing(500, 33);
            lenis.destroy();
        };
    }, []);

    return (
        <div className="default-padding-top">
            <div className="container">
                <div className="row">
                    <div className="col-xl-6 offset-xl-3 col-lg-8 offset-lg-2 text-center">
                        <div className="site-heading">
                            <h4 className="sub-title">Industries</h4>
                            <h2 className="title">Built for Industries</h2>
                        </div>
                    </div>
                </div>
            </div>

            <div
                ref={sectionRef}
                style={{
                    height: "100vh",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    padding: "0 30px",
                    overflow: "hidden",
                }}
            >
                <div
                    ref={videoBoxRef}
                    style={{ height: "80vh", width: "100%", overflow: "hidden", willChange: "clip-path" }}
                >
                    <LazyVideo src="/assets/client/direct-keys/real-estate.mp4" poster="/assets/client/direct-keys/real-estate-poster.jpg" />
                </div>
                <h3 ref={labelRef} style={{ ...labelStyle, willChange: "transform" }}>Real Estate</h3>
            </div>

            <div style={{ padding: "60px 30px 120px" }}>
                <div style={{ display: "flex", gap: 30, alignItems: "flex-start" }}>
                    {sideVideos.map((item) => (
                        <div key={item.src} style={{ flex: `${item.ratio} 1 0`, minWidth: 0 }}>
                            <div style={{ aspectRatio: item.aspect, overflow: "hidden" }}>
                                <LazyVideo src={item.src} />
                            </div>
                            <h3 style={labelStyle}>{item.label}</h3>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default IndustriesVideo;

import { useEffect, useRef, type CSSProperties } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { usePageLenis } from "../../hooks/usePageLenis";

const START_INSET_X = 0.3;
const START_INSET_Y = 0.25;

const videoStyle: CSSProperties = {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    display: "block",
};

const sideVideos = [
    { src: "/assets/video/industry-fpv.mp4", label: "Interior Designing", ratio: 4 / 3, aspect: "4 / 3", position: "center" },
    // Width share matches the 2/3 frame so both films share one height and the titles line up.
    { src: "/assets/video/industry-phone.mp4", label: "App Development", ratio: 2 / 3, aspect: "2 / 3", position: "center top" },
];

const LazyVideo = ({ src, poster, position = "center" }: { src: string; poster?: string; position?: string }) => {
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

    return <video ref={ref} poster={poster} muted loop playsInline preload="none" style={{ ...videoStyle, objectPosition: position }} />;
};

const IndustriesVideo = () => {
    const sectionRef = useRef<HTMLDivElement>(null);
    const videoBoxRef = useRef<HTMLDivElement>(null);
    const labelRef = useRef<HTMLHeadingElement>(null);

    usePageLenis();

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        const ctx = gsap.context(() => {
            const box = videoBoxRef.current;
            if (!sectionRef.current || !box || !labelRef.current) return;

            const section = sectionRef.current;

            // One viewport, a short hold. The open still begins just before the pin.
            ScrollTrigger.create({
                trigger: section,
                start: "top top",
                end: "+=65%",
                pin: true,
                pinSpacing: true,
                anticipatePin: 1,
                invalidateOnRefresh: true,
                refreshPriority: 1,
            });

            const open = {
                trigger: section,
                start: "top 10%",
                end: "+=55%",
                scrub: true,
                invalidateOnRefresh: true,
            };

            gsap.fromTo(
                box,
                { clipPath: `inset(${START_INSET_Y * 100}% ${START_INSET_X * 100}% ${START_INSET_Y * 100}% ${START_INSET_X * 100}%)` },
                { clipPath: "inset(0% 0% 0% 0%)", ease: "none", scrollTrigger: open }
            );

            gsap.fromTo(
                labelRef.current,
                { x: () => box.offsetWidth * START_INSET_X, y: () => -box.offsetHeight * START_INSET_Y },
                {
                    x: 0,
                    y: 0,
                    ease: "none",
                    scrollTrigger: {
                        trigger: section,
                        start: "top 10%",
                        end: "+=55%",
                        scrub: true,
                        invalidateOnRefresh: true,
                    },
                }
            );
        }, sectionRef);

        return () => {
            ctx.revert();
        };
    }, []);

    return (
        <div className="default-padding-top industries-block">
            <div
                ref={sectionRef}
                style={{
                    height: "100vh",
                    position: "relative",
                    overflow: "hidden",
                }}
            >
                <div className="container" style={{ position: "absolute", top: 48, left: 0, right: 0, zIndex: 2 }}>
                    <div className="row">
                        <div className="col-xl-6 offset-xl-3 col-lg-8 offset-lg-2 text-center">
                            <div className="site-heading" style={{ marginBottom: 16 }}>
                                <h2 className="title">Built for Industries</h2>
                            </div>
                        </div>
                    </div>
                </div>

                <div
                    style={{
                        position: "absolute",
                        top: "50%",
                        left: 30,
                        width: "calc(100% - 60px)",
                        transform: "translateY(calc(-50% + 72px))",
                    }}
                >
                    <div
                        ref={videoBoxRef}
                        style={{ height: "calc((100vh - 340px) * 1.36)", width: "100%", overflow: "hidden", willChange: "clip-path" }}
                    >
                        <LazyVideo src="/assets/client/direct-keys/real-estate.mp4" poster="/assets/client/direct-keys/real-estate-poster.jpg" />
                    </div>
                    <h3 ref={labelRef} className="industries-label" style={{ margin: "16px 0 0", willChange: "transform" }}>Real Estate</h3>
                </div>
            </div>

            <div className="industries-side">
                <div className="industries-side__row">
                    {sideVideos.map((item) => (
                        <div
                            key={item.src}
                            className="industries-side__item"
                            style={{ "--industry-grow": item.ratio, "--industry-aspect": item.aspect } as CSSProperties}
                        >
                            <div className="industries-side__media">
                                <LazyVideo src={item.src} position={item.position} />
                            </div>
                            <h3 className="industries-label">{item.label}</h3>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default IndustriesVideo;

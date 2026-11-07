import { useEffect, useRef, type CSSProperties } from "react";
import { usePageLenis } from "../../hooks/usePageLenis";

const videoStyle: CSSProperties = {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    display: "block",
};

const sideVideos = [
    { src: "/assets/video/industry-fpv.mp4", label: "Interior Designing", ratio: 4 / 3, aspect: "4 / 3", position: "center" },
    // Width share matches the 2/3 frame so both films share one height and the titles line up.
    { src: "/assets/video/industry-phone.mp4", label: "", ratio: 2 / 3, aspect: "2 / 3", position: "center top" },
];

const brandPosters = [
    { src: "/assets/client/kite-aviation/kite-aviation-poster.jpg", alt: "Kite Institute of Aviation & Hospitality poster", width: 819, height: 1024 },
    { src: "/assets/client/design-arc-interiors/built-to-perform.jpg", alt: "Design Arc Interiors — Built to Perform poster", width: 764, height: 1024 },
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
    usePageLenis();

    return (
        <div className="default-padding-top industries-block">
            <div className="industries-hero">
                <LazyVideo src="/assets/client/direct-keys/real-estate-web.mp4" poster="/assets/client/direct-keys/real-estate-poster.jpg" />
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
                            {item.label && <h3 className="industries-label">{item.label}</h3>}
                        </div>
                    ))}
                </div>

                <div className="industries-side__intro">
                    <h2 className="title">Our Brands Define Our Work</h2>
                    <p>Trusted by MG Motor, WeWork, Sony Music, Food Pharmer and more</p>
                </div>

                <div className="industries-side__row">
                    {brandPosters.map((poster) => (
                        <div
                            key={poster.src}
                            className="industries-side__item"
                            style={{ "--industry-grow": poster.width / poster.height, "--industry-aspect": `${poster.width} / ${poster.height}` } as CSSProperties}
                        >
                            <div className="industries-side__media">
                                <img src={poster.src} alt={poster.alt} loading="lazy" style={videoStyle} />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default IndustriesVideo;

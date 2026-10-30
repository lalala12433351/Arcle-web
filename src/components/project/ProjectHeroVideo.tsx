import { useEffect, useLayoutEffect, useRef, useState } from "react";
import type { PointerEvent as ReactPointerEvent } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import "lenis/dist/lenis.css";
import { ArrowUpRight } from "lucide-react";
import { works } from "../../content/works";
import "./ProjectHeroVideo.css";

const HEADLINE = ["You’ve heard what we do.", "Here’s what it looks like."];

const summarize = (text: string, sentences = 3) =>
    (text.match(/[^.!?]+[.!?]+/g) ?? [text]).slice(0, sentences).join("").trim();

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
            className="work-row__video"
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

const tiltMedia = (event: ReactPointerEvent<HTMLElement>) => {
    if (event.pointerType !== "mouse") return;
    const node = event.currentTarget;
    const rect = node.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    node.style.setProperty("--tilt-x", `${(-y * 7).toFixed(2)}deg`);
    node.style.setProperty("--tilt-y", `${(x * 9).toFixed(2)}deg`);
};

const resetTilt = (event: ReactPointerEvent<HTMLElement>) => {
    event.currentTarget.style.setProperty("--tilt-x", "0deg");
    event.currentTarget.style.setProperty("--tilt-y", "0deg");
};

const ProjectHeroVideo = () => {
    const [activeSlug, setActiveSlug] = useState<string | null>(null);
    const sectionRef = useRef<HTMLElement>(null);

    useLayoutEffect(() => {
        const section = sectionRef.current;
        if (!section) return;
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

        gsap.registerPlugin(ScrollTrigger);
        const root = document.documentElement;
        root.classList.add("work-gallery-smooth");

        const lenis = new Lenis({
            lerp: 0.08,
            smoothWheel: true,
            wheelMultiplier: 0.9,
            touchMultiplier: 1.4,
        });
        lenis.on("scroll", ScrollTrigger.update);
        const tick = (time: number) => lenis.raf(time * 1000);
        gsap.ticker.add(tick);
        gsap.ticker.lagSmoothing(0);

        const hero = section.querySelector<HTMLElement>(".work-hero");
        const tilt = section.querySelector<HTMLElement>(".work-hero__tilt");
        let detachTilt: (() => void) | null = null;

        const ctx = gsap.context(() => {
            gsap.from(".work-hero__word", {
                rotateX: -96,
                yPercent: 40,
                z: -80,
                duration: 1.3,
                ease: "expo.out",
                stagger: 0.055,
                delay: 0.15,
            });
            gsap.from(".work-hero__foot > *", {
                y: 28,
                autoAlpha: 0,
                duration: 1,
                ease: "expo.out",
                stagger: 0.1,
                delay: 0.75,
            });

            gsap.to(".work-hero__title", {
                rotateX: 38,
                z: -260,
                yPercent: -22,
                autoAlpha: 0.12,
                ease: "none",
                scrollTrigger: { trigger: hero, start: "top top", end: "bottom top", scrub: true },
            });
            gsap.to(".work-hero__foot", {
                y: -60,
                autoAlpha: 0,
                ease: "none",
                scrollTrigger: { trigger: hero, start: "top top", end: "55% top", scrub: true },
            });

            if (tilt && hero && window.matchMedia("(hover: hover)").matches) {
                const toX = gsap.quickTo(tilt, "rotateX", { duration: 0.9, ease: "power3.out" });
                const toY = gsap.quickTo(tilt, "rotateY", { duration: 0.9, ease: "power3.out" });
                const onMove = (event: PointerEvent) => {
                    const rect = hero.getBoundingClientRect();
                    toY(((event.clientX - rect.left) / rect.width - 0.5) * 12);
                    toX(-((event.clientY - rect.top) / rect.height - 0.5) * 9);
                };
                const onLeave = () => {
                    toX(0);
                    toY(0);
                };
                hero.addEventListener("pointermove", onMove);
                hero.addEventListener("pointerleave", onLeave);
                detachTilt = () => {
                    hero.removeEventListener("pointermove", onMove);
                    hero.removeEventListener("pointerleave", onLeave);
                };
            }

            gsap.utils.toArray<HTMLElement>(".work-row").forEach((row) => {
                const swing = row.classList.contains("is-reversed") ? -1 : 1;
                const compact = window.matchMedia("(max-width: 760px)").matches;

                gsap.fromTo(
                    row.querySelector(".work-row__frame"),
                    {
                        rotateY: compact ? 0 : 22 * swing,
                        rotateX: compact ? 14 : 9,
                        z: compact ? -120 : -260,
                        scale: 0.86,
                    },
                    {
                        rotateY: 0,
                        rotateX: 0,
                        z: 0,
                        scale: 1,
                        ease: "none",
                        scrollTrigger: { trigger: row, start: "top bottom", end: "center 58%", scrub: 0.8 },
                    }
                );

                gsap.fromTo(
                    row.querySelector(".work-row__parallax"),
                    { yPercent: -6 },
                    {
                        yPercent: 6,
                        ease: "none",
                        scrollTrigger: { trigger: row, start: "top bottom", end: "bottom top", scrub: true },
                    }
                );

                gsap.from(row.querySelectorAll(".work-row__reveal"), {
                    y: 56,
                    autoAlpha: 0,
                    duration: 1.1,
                    ease: "expo.out",
                    stagger: 0.08,
                    scrollTrigger: { trigger: row, start: "top 70%", once: true },
                });
            });
        }, section);

        requestAnimationFrame(() => ScrollTrigger.refresh());

        return () => {
            detachTilt?.();
            ctx.revert();
            root.classList.remove("work-gallery-smooth");
            gsap.ticker.remove(tick);
            gsap.ticker.lagSmoothing(500, 33);
            lenis.destroy();
        };
    }, []);

    useEffect(() => {
        const section = sectionRef.current;
        if (!section || !window.matchMedia("(hover: none)").matches) return;

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    const slug = (entry.target as HTMLElement).dataset.slug ?? null;
                    if (entry.isIntersecting) setActiveSlug(slug);
                    else setActiveSlug((current) => (current === slug ? null : current));
                });
            },
            { rootMargin: "-35% 0px -35% 0px" }
        );

        section.querySelectorAll(".work-row").forEach((row) => observer.observe(row));
        return () => observer.disconnect();
    }, []);

    return (
        <section ref={sectionRef} className="work-gallery" aria-label="Selected work">
            <header className="work-hero">
                <h1 className="work-hero__title">
                    <span className="work-hero__tilt">
                        {HEADLINE.map((line) => (
                            <span key={line} className="work-hero__line">
                                {line.split(" ").map((word, index, words) => (
                                    <span key={`${word}-${index}`}>
                                        <span className="work-hero__word">{word}</span>
                                        {index < words.length - 1 ? " " : null}
                                    </span>
                                ))}
                            </span>
                        ))}
                    </span>
                </h1>

                <div className="work-hero__foot">
                    <p className="work-hero__lede">
                        A collection of collaborations, fresh perspectives and ideas brought to life.
                    </p>
                    <span className="work-hero__cue" aria-hidden="true">
                        <span>Scroll to explore</span>
                        <span className="work-hero__cue-line" />
                    </span>
                </div>
            </header>

            <div className="work-gallery__list">
                {works.map((work, index) => {
                    const isActive = activeSlug === work.slug;
                    const href = `/project/${work.slug}`;

                    return (
                        <article
                            key={work.slug}
                            data-slug={work.slug}
                            className={`work-row${index % 2 ? " is-reversed" : ""}${isActive ? " is-active" : ""}`}
                            onPointerEnter={(event) => {
                                if (event.pointerType === "mouse") setActiveSlug(work.slug);
                            }}
                            onPointerLeave={(event) => {
                                if (event.pointerType === "mouse") setActiveSlug(null);
                            }}
                        >
                            <div className="work-row__stage">
                                <div className="work-row__frame">
                                    <Link
                                        to={href}
                                        className="work-row__media"
                                        tabIndex={-1}
                                        aria-hidden="true"
                                        onPointerMove={tiltMedia}
                                        onPointerLeave={resetTilt}
                                    >
                                        <span className="work-row__parallax">
                                            {work.poster && (
                                                <img
                                                    className="work-row__poster"
                                                    src={work.poster}
                                                    alt=""
                                                    draggable={false}
                                                    style={work.coverPosition ? { objectPosition: work.coverPosition } : undefined}
                                                />
                                            )}
                                            <CoverVideo
                                                src={work.cover}
                                                poster={work.poster}
                                                label={work.name}
                                                playing={isActive}
                                                objectPosition={work.coverPosition}
                                            />
                                        </span>
                                        <span className="work-row__glare" />
                                    </Link>
                                </div>
                            </div>

                            <div className="work-row__copy">
                                <h2 className="work-row__name work-row__reveal">{work.name}</h2>
                                <p className="work-row__subtitle work-row__reveal">{work.subtitle}</p>
                                <p className="work-row__description work-row__reveal">{summarize(work.description)}</p>
                                <ul className="work-row__scope work-row__reveal" aria-label="Scope">
                                    {work.scope.map((item) => (
                                        <li key={item}>{item}</li>
                                    ))}
                                </ul>
                                <div className="work-row__foot work-row__reveal">
                                    <span className="work-row__year">
                                        {work.yearLabel} {work.year}
                                    </span>
                                    <Link
                                        to={href}
                                        className="work-row__cta"
                                        onFocus={() => setActiveSlug(work.slug)}
                                        onBlur={() => setActiveSlug(null)}
                                    >
                                        View project
                                        <span className="visually-hidden">: {work.name}</span>
                                        <ArrowUpRight aria-hidden="true" size={18} strokeWidth={1.75} />
                                    </Link>
                                </div>
                            </div>
                        </article>
                    );
                })}
            </div>
        </section>
    );
};

export default ProjectHeroVideo;

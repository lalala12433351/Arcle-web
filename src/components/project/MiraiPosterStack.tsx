import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import "lenis/dist/lenis.css";
import ScrollStack, { ScrollStackItem } from "../ScrollStack";
import type { WorkVideo } from "../../content/works";
import "./MiraiPosterStack.css";

type MiraiPosterStackProps = {
    posters: WorkVideo[];
};

const MiraiPosterStack = ({ posters }: MiraiPosterStackProps) => {
    useEffect(() => {
        if (!posters.length) return;

        gsap.registerPlugin(ScrollTrigger);

        const lenis = new Lenis({
            lerp: 0.075,
            smoothWheel: true,
            wheelMultiplier: 0.9,
            touchMultiplier: 1.4,
            syncTouch: true,
        });

        lenis.on("scroll", ScrollTrigger.update);
        const tick = (time: number) => lenis.raf(time * 1000);
        gsap.ticker.add(tick);
        gsap.ticker.lagSmoothing(0);

        // Let sticky stack slots measure against the smoothed scroll
        requestAnimationFrame(() => ScrollTrigger.refresh());

        return () => {
            gsap.ticker.remove(tick);
            gsap.ticker.lagSmoothing(500, 33);
            lenis.destroy();
        };
    }, [posters.length]);

    if (!posters.length) return null;

    return (
        <section className="mirai-poster-stack" aria-label="Mirai campaign posters">
            <ScrollStack
                className="mirai-poster-stack__scroller"
                useWindowScroll
                stackPosition="16%"
                itemDistance={120}
                itemStackDistance={28}
                itemScale={0.04}
                baseScale={0.88}
                dimAmount={0.22}
                blurAmount={0}
                tiltAmount={36}
                mobileTiltAmount={14}
                depthAmount={200}
                mobileDepthAmount={90}
                liftAmount={16}
                mobileLiftAmount={8}
                holdDistance={260}
            >
                {posters.map((poster) => (
                    <ScrollStackItem
                        key={poster.src}
                        itemClassName="mirai-poster-stack__card"
                    >
                        <img
                            src={poster.src}
                            alt={poster.label}
                            loading="lazy"
                            decoding="async"
                            draggable={false}
                        />
                    </ScrollStackItem>
                ))}
            </ScrollStack>
        </section>
    );
};

export default MiraiPosterStack;

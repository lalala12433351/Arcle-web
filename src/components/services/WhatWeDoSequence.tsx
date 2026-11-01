import { useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Link } from "react-router-dom";
import { EncryptedText } from "@/components/ui/encrypted-text";
import { usePageLenis } from "../../hooks/usePageLenis";
import CrmHighlight from "./CrmHighlight";
import HrSolutions from "./HrSolutions";
import "./WhatWeDoSequence.css";

const TITLE = "One Solution For Your Brand";
const SUPPORT = "We provide everything your brand needs";

/* Fractions of the pinned viewport. The title exits while the support line arrives, then the panels travel. */
const HANDOFF = 0.7;
const HOLD = 1.05;

const WhatWeDoSequence = () => {
    const sectionRef = useRef<HTMLElement>(null);
    const trackRef = useRef<HTMLDivElement>(null);
    const introRef = useRef<HTMLDivElement>(null);
    const titleRef = useRef<HTMLHeadingElement>(null);
    const supportRef = useRef<HTMLParagraphElement>(null);
    const crmRef = useRef<HTMLDivElement>(null);
    const hrRef = useRef<HTMLDivElement>(null);
    const [reduce] = useState(
        () => typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches
    );

    usePageLenis(!reduce);

    useLayoutEffect(() => {
        const section = sectionRef.current;
        const track = trackRef.current;
        const intro = introRef.current;
        const title = titleRef.current;
        const support = supportRef.current;
        const crm = crmRef.current;
        const hr = hrRef.current;
        if (!section || !track || !intro || !title || !support || !crm || !hr || reduce) return;

        gsap.registerPlugin(ScrollTrigger);

        const mm = gsap.matchMedia();
        const ctx = gsap.context(() => {
            mm.add(
                {
                    desktop: "(min-width: 992px)",
                    mobile: "(max-width: 991px)",
                },
                (context) => {
                    const mobile = Boolean(context.conditions?.mobile);
                    const crmTl = gsap.timeline({ paused: true });
                    const hrTl = gsap.timeline({ paused: true });

                    gsap.utils.toArray<HTMLElement>(".crm-highlight__shot", crm).forEach((shot, index) => {
                        const restRotateX = index === 0 ? 8 : 4;
                        const restRotateY = index === 0 ? -14 : -9;
                        const restZ = index === 0 ? 0 : 36;

                        crmTl.fromTo(
                            shot,
                            {
                                y: mobile ? 110 : 190,
                                x: mobile ? 36 : 84,
                                rotateX: 26,
                                rotateY: -20,
                                z: -140,
                                opacity: 0,
                                transformPerspective: 1400,
                            },
                            {
                                y: 0,
                                x: 0,
                                rotateX: restRotateX,
                                rotateY: restRotateY,
                                z: restZ,
                                opacity: 1,
                                transformPerspective: 1400,
                                ease: "none",
                                duration: 1,
                            },
                            0
                        );
                    });

                    const stage = hr.querySelector<HTMLElement>(".hr-solutions__stage");
                    const attendanceShot = hr.querySelector<HTMLElement>(".hr-solutions__shot--attendance");
                    const reportShot = hr.querySelector<HTMLElement>(".hr-solutions__shot--report");

                    if (stage && attendanceShot && reportShot) {
                        hrTl.fromTo(
                            stage,
                            { perspectiveOrigin: "32% 72%" },
                            { perspectiveOrigin: "58% 36%", ease: "none", duration: 1 },
                            0
                        );
                        hrTl.fromTo(
                            attendanceShot,
                            {
                                x: mobile ? 18 : 36,
                                y: mobile ? 72 : 130,
                                z: mobile ? -260 : -520,
                                rotateZ: 7,
                                opacity: 0,
                                filter: "blur(7px)",
                                transformPerspective: 1400,
                            },
                            {
                                x: 0,
                                y: 0,
                                z: 72,
                                rotateZ: -1.6,
                                opacity: 1,
                                filter: "blur(0px)",
                                transformPerspective: 1400,
                                ease: "none",
                                duration: 1,
                            },
                            0
                        );
                        hrTl.fromTo(
                            reportShot,
                            {
                                x: mobile ? -22 : -48,
                                y: mobile ? 110 : 190,
                                z: mobile ? -160 : -340,
                                rotateZ: -8,
                                opacity: 0,
                                filter: "blur(9px)",
                                transformPerspective: 1400,
                            },
                            {
                                x: 0,
                                y: 0,
                                z: -36,
                                rotateZ: 2.4,
                                opacity: 1,
                                filter: "blur(0px)",
                                transformPerspective: 1400,
                                ease: "none",
                                duration: 1,
                            },
                            0
                        );
                    }

                    crmTl.progress(0);
                    hrTl.progress(0);

                    const offsetWithin = (node: HTMLElement | null) => {
                        if (!node) return 0;
                        let y = 0;
                        let el: HTMLElement | null = node;
                        while (el && el !== track) {
                            y += el.offsetTop;
                            el = el.offsetParent as HTMLElement | null;
                        }
                        return y;
                    };

                    const metrics = () => {
                        const vh = section.offsetHeight || window.innerHeight;
                        let content = 0;
                        for (const child of Array.from(track.children) as HTMLElement[]) content += child.offsetHeight;
                        const travel = Math.max(0, content - vh);
                        return {
                            vh,
                            travel,
                            total: vh * HOLD + travel,
                            crmTop: offsetWithin(crm.querySelector<HTMLElement>(".crm-highlight__stage")),
                            hrTop: offsetWithin(hr.querySelector<HTMLElement>(".hr-solutions__stage")),
                        };
                    };

                    let box = metrics();

                    ScrollTrigger.create({
                        trigger: section,
                        start: "top top",
                        end: () => {
                            box = metrics();
                            return `+=${box.total}`;
                        },
                        pin: true,
                        scrub: 0.7,
                        anticipatePin: 1,
                        invalidateOnRefresh: true,
                        // Opt into document-order refreshes. This pin is created before the
                        // industries pin, and without sorting its start misses that spacer.
                        refreshPriority: 0,
                        onUpdate: (self) => {
                            const { vh, travel, total, crmTop, hrTop } = box;
                            const px = self.progress * total;
                            const handoff = gsap.utils.clamp(0, 1, px / (vh * HANDOFF));
                            const supportP = gsap.utils.clamp(0, 1, (handoff - 0.2) / 0.8);
                            gsap.set(title, {
                                y: -handoff * vh * 0.34,
                                scale: 1 + handoff * 0.7,
                                opacity: 1 - gsap.utils.clamp(0, 1, handoff / 0.82),
                            });
                            gsap.set(support, {
                                opacity: supportP,
                                y: (1 - supportP) * 28,
                            });
                            const traveled = Math.max(0, px - vh * HOLD);
                            gsap.set(track, { y: -traveled });
                            const visibleAt = (top: number) => gsap.utils.clamp(0, 1, (vh - (top - traveled)) / (vh * 0.8));
                            const crmP = visibleAt(crmTop);
                            const hrP = visibleAt(hrTop);
                            crmTl.progress(crmP);
                            hrTl.progress(hrP);
                        },
                    });
                }
            );
        }, section);

        const refresh = () => ScrollTrigger.refresh();
        const images = Array.from(track.querySelectorAll("img"));
        images.forEach((img) => {
            if (!img.complete) img.addEventListener("load", refresh);
        });
        requestAnimationFrame(refresh);

        return () => {
            images.forEach((img) => img.removeEventListener("load", refresh));
            mm.revert();
            ctx.revert();
        };
    }, [reduce]);

    return (
        <section
            className={`wwd${reduce ? " wwd--static" : ""}`}
            ref={sectionRef}
            aria-labelledby="what-we-do-title"
        >
            <div className="wwd__track" ref={trackRef}>
                <div className="wwd__intro" ref={introRef}>
                    <div className="container wwd__bar">
                        <h4 className="sub-title wwd__kicker">What We Do</h4>
                        <Link className="btn-full services-stack-cta" to="/services">
                            Read More <i className="fas fa-arrow-right" />
                        </Link>
                    </div>
                    <div className="wwd__lines">
                        <h2 className="wwd__title" id="what-we-do-title" ref={titleRef}>
                            <EncryptedText
                                text={TITLE}
                                encryptedClassName="text-neutral-500"
                                revealedClassName="wwd__revealed"
                                revealDelayMs={50}
                            />
                        </h2>
                        <p className="wwd__support" ref={supportRef}>
                            {SUPPORT}
                        </p>
                    </div>
                </div>
                <div ref={crmRef}>
                    <CrmHighlight embedded={!reduce} />
                </div>
                <div ref={hrRef}>
                    <HrSolutions embedded={!reduce} />
                </div>
            </div>
        </section>
    );
};

export default WhatWeDoSequence;

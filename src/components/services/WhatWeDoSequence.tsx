import { useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { EncryptedText } from "@/components/ui/encrypted-text";
import { usePageLenis } from "../../hooks/usePageLenis";
import CrmHighlight from "./CrmHighlight";
import HrSolutions from "./HrSolutions";
import "./WhatWeDoSequence.css";

const TITLE = "One Solution For Your Brand";
const SUPPORT = "We provide everything your brand needs";

/* Fractions of the pinned viewport. The title exits while the support line arrives, then each product frame settles in the same viewport. */
const HANDOFF = 0.7;
const SUPPORT_HOLD = 0.22;
const SETTLE = 0.4;

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

                    const contentHeight = (panel: HTMLElement) =>
                        (panel.firstElementChild as HTMLElement | null)?.offsetHeight ?? panel.offsetHeight;

                    type Phase = { name: string; start: number; end: number };

                    const metrics = () => {
                        const vh = section.offsetHeight || window.innerHeight;
                        const phases: Phase[] = [];
                        let cursor = 0;
                        const add = (name: string, length: number) => {
                            if (length <= 0) return;
                            phases.push({ name, start: cursor, end: cursor + length });
                            cursor += length;
                        };
                        const crmExtra = Math.max(0, contentHeight(crm) - vh);
                        const hrExtra = Math.max(0, contentHeight(hr) - vh);
                        add("intro", vh * (HANDOFF + SUPPORT_HOLD));
                        add("toCrm", vh * 0.75);
                        add("crmRead", crmExtra);
                        add("crmHold", vh * SETTLE);
                        add("toHr", vh * 0.75);
                        add("hrRead", hrExtra);
                        add("hrHold", vh * SETTLE);
                        return { vh, total: cursor, phases, crmExtra, hrExtra };
                    };

                    let box = metrics();

                    ScrollTrigger.create({
                        trigger: section,
                        start: "top 96px",
                        end: () => {
                            box = metrics();
                            return `+=${box.total}`;
                        },
                        pin: true,
                        // .home-flow is a flex column. ScrollTrigger skips pin spacing for flex
                        // children, so everything after this section scrolls over the pin.
                        pinSpacing: true,
                        scrub: 0.7,
                        anticipatePin: 1,
                        invalidateOnRefresh: true,
                        // Opt into document-order refreshes. This pin is created before the
                        // industries pin, and without sorting its start misses that spacer.
                        refreshPriority: 0,
                        onUpdate: (self) => {
                            const { vh, total, phases, crmExtra, hrExtra } = box;
                            const px = self.progress * total;
                            const phase = phases.find((item) => px <= item.end) ?? phases[phases.length - 1];
                            const local = !phase || phase.end === phase.start
                                ? 1
                                : gsap.utils.clamp(0, 1, (px - phase.start) / (phase.end - phase.start));
                            const handoff = gsap.utils.clamp(0, 1, px / (vh * HANDOFF));
                            const supportP = gsap.utils.clamp(0, 1, (handoff - 0.2) / 0.8);
                            // Fade in place. A large upward move plus the scale was
                            // pushing the line through the header and off the screen.
                            gsap.set(title, {
                                y: -handoff * 12,
                                scale: 1 + handoff * 0.06,
                                opacity: 1 - gsap.utils.clamp(0, 1, handoff / 0.82),
                            });
                            gsap.set(support, {
                                opacity: supportP,
                                y: (1 - supportP) * 28,
                            });

                            const rise = mobile ? 64 : vh * 0.1;
                            const solid = (t: number) => gsap.utils.clamp(0, 1, t / 0.33);
                            const CARD_FROM = 0.84;

                            let introOpacity = 0;
                            let crmOpacity = 0;
                            let hrOpacity = 0;
                            let introY = 0;
                            let crmY = rise;
                            let hrY = rise;
                            let introScale = 1;
                            let crmScale = CARD_FROM;
                            let hrScale = CARD_FROM;
                            let crmEnter = 0;
                            let hrEnter = 0;

                            if (!phase || phase.name === "intro") {
                                introOpacity = 1;
                            } else if (phase.name === "toCrm") {
                                introOpacity = 1 - solid(local);
                                introScale = 1 - local * 0.06;
                                introY = -local * 24;
                                crmEnter = local;
                                crmOpacity = solid(local);
                                crmScale = CARD_FROM + local * (1 - CARD_FROM);
                                crmY = (1 - local) * rise;
                            } else if (phase.name === "crmRead" || phase.name === "crmHold") {
                                crmOpacity = 1;
                                crmScale = 1;
                                crmEnter = 1;
                                crmY = phase.name === "crmRead" ? -local * crmExtra : -crmExtra;
                            } else if (phase.name === "toHr") {
                                crmOpacity = 1 - solid(local);
                                crmScale = 1 - local * 0.06;
                                crmEnter = 1;
                                crmY = -crmExtra;
                                hrEnter = local;
                                hrOpacity = solid(local);
                                hrScale = CARD_FROM + local * (1 - CARD_FROM);
                                hrY = (1 - local) * rise;
                            } else {
                                hrOpacity = 1;
                                hrScale = 1;
                                hrEnter = 1;
                                hrY = phase.name === "hrRead" ? -local * hrExtra : -hrExtra;
                            }

                            gsap.set(intro, { opacity: introOpacity, y: introY, scale: introScale, transformOrigin: "center center" });
                            gsap.set(crm, { opacity: crmOpacity, y: crmY, scale: crmScale, transformOrigin: "center center" });
                            gsap.set(hr, { opacity: hrOpacity, y: hrY, scale: hrScale, transformOrigin: "center center" });
                            crmTl.progress(crmEnter);
                            hrTl.progress(hrEnter);
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
                <div className="wwd__panel" ref={crmRef}>
                    <CrmHighlight embedded={!reduce} />
                </div>
                <div className="wwd__panel" ref={hrRef}>
                    <HrSolutions embedded={!reduce} />
                </div>
            </div>
        </section>
    );
};

export default WhatWeDoSequence;

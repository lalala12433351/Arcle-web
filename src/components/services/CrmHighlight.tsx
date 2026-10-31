import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { usePageLenis } from "../../hooks/usePageLenis";
import dashboard from "../../assets/img/crm/dashboard.jpg";
import leads from "../../assets/img/crm/leads.jpg";
import "./CrmHighlight.css";

const CrmHighlight = ({ embedded = false }: { embedded?: boolean }) => {
    const sectionRef = useRef<HTMLElement>(null);
    const prefersReducedMotion =
        typeof window !== "undefined" &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    usePageLenis(!prefersReducedMotion && !embedded);

    useLayoutEffect(() => {
        const section = sectionRef.current;
        if (!section || prefersReducedMotion || embedded) return;

        gsap.registerPlugin(ScrollTrigger);

        const ctx = gsap.context(() => {
            const mm = gsap.matchMedia();
            mm.add(
                {
                    desktop: "(min-width: 992px)",
                    mobile: "(max-width: 991px)",
                },
                (context) => {
                    const mobile = Boolean(context.conditions?.mobile);
                    const shots = gsap.utils.toArray<HTMLElement>(".crm-highlight__shot");

                    shots.forEach((shot, index) => {
                        const restRotateX = index === 0 ? 8 : 4;
                        const restRotateY = index === 0 ? -14 : -9;
                        const restZ = index === 0 ? 0 : 36;

                        gsap.fromTo(
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
                                scrollTrigger: {
                                    trigger: section,
                                    start: mobile ? "top 92%" : "top 78%",
                                    end: mobile ? "center 58%" : "center 42%",
                                    scrub: 0.85,
                                },
                            }
                        );
                    });
                }
            );
        }, section);

        requestAnimationFrame(() => ScrollTrigger.refresh());

        return () => ctx.revert();
    }, [embedded, prefersReducedMotion]);

    return (
        <section className="crm-highlight default-padding" ref={sectionRef} aria-labelledby="crm-highlight-title">
            <div className="container">
                <div className="crm-highlight__layout">
                    <div className="crm-highlight__copy">
                        <h2 className="crm-highlight__name" id="crm-highlight-title">CRM</h2>
                        <p className="crm-highlight__label">SIMPLIFY YOUR SALES PROCESS</p>
                        <p className="crm-highlight__headline">
                            Capture, assign and follow up on every lead, <span className="crm-highlight__accent">so none go cold.</span>
                        </p>
                        <p className="crm-highlight__body">
                            Capture and manage leads, assign tasks, track follow-ups, and monitor every stage of your pipeline. With clear dashboards and shared customer information, your team can stay connected, respond faster, and turn more enquiries into customers.
                        </p>
                    </div>

                    <div className="crm-highlight__stage">
                        <figure className="crm-highlight__shot crm-highlight__shot--dashboard">
                            <img src={dashboard} alt="CRM dashboard with today's calls, talk time, and the due follow-up queue" width={1280} height={720} />
                        </figure>
                        <figure className="crm-highlight__shot crm-highlight__shot--leads">
                            <img src={leads} alt="CRM leads list with contact numbers and follow-up actions" width={1280} height={720} />
                        </figure>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CrmHighlight;

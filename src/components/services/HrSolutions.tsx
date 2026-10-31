import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { usePageLenis } from "../../hooks/usePageLenis";
import attendance from "../../assets/img/hr/attendance.jpg";
import report from "../../assets/img/hr/report.jpg";
import "./HrSolutions.css";

const columns = [
    {
        heading: "Simplify everyday HR",
        body: "Manage attendance, leave requests, employee information, and payslips in one organised workspace.",
    },
    {
        heading: "Keep work on track",
        body: "Organise projects, assign tasks, and track timesheets so everyone knows what needs to happen next.",
    },
    {
        heading: "Connect your people",
        body: "Bring teams together through chat, announcements, and a shared employee directory.",
    },
] as const;

const HrSolutions = ({ embedded = false }: { embedded?: boolean }) => {
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
                    const stage = section.querySelector<HTMLElement>(".hr-solutions__stage");
                    const attendanceShot = section.querySelector<HTMLElement>(".hr-solutions__shot--attendance");
                    const reportShot = section.querySelector<HTMLElement>(".hr-solutions__shot--report");
                    if (!stage || !attendanceShot || !reportShot) return;

                    const tl = gsap.timeline({
                        scrollTrigger: {
                            trigger: section,
                            start: mobile ? "top 92%" : "top 80%",
                            end: mobile ? "center 58%" : "center 42%",
                            scrub: 0.9,
                        },
                    });

                    tl.fromTo(
                        stage,
                        { perspectiveOrigin: "32% 72%" },
                        { perspectiveOrigin: "58% 36%", ease: "none", duration: 1 },
                        0
                    );

                    tl.fromTo(
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

                    tl.fromTo(
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
            );
        }, section);

        requestAnimationFrame(() => ScrollTrigger.refresh());

        return () => ctx.revert();
    }, [embedded, prefersReducedMotion]);

    return (
        <section className="hr-solutions default-padding" ref={sectionRef} aria-labelledby="hr-solutions-title">
            <div className="container">
                <div className="hr-solutions__layout">
                    <div className="hr-solutions__copy">
                        <h2 className="hr-solutions__name" id="hr-solutions-title">HR Solutions</h2>
                        <p className="hr-solutions__label">PEOPLE, CONNECTED</p>
                        <p className="hr-solutions__headline">
                            Manage hiring, attendance, leave and <span className="hr-solutions__accent">payroll</span> without the <span className="hr-solutions__accent">paperwork</span>.
                        </p>
                        <div className="hr-solutions__columns">
                            {columns.map((column) => (
                                <article className="hr-solutions__item" key={column.heading}>
                                    <h3>{column.heading}</h3>
                                    <p>{column.body}</p>
                                </article>
                            ))}
                        </div>
                    </div>

                    <div className="hr-solutions__stage">
                        <figure className="hr-solutions__shot hr-solutions__shot--attendance">
                            <img
                                src={attendance}
                                alt="Attendance workspace with the workday timer, weekly hours, and punch log"
                                width={1024}
                                height={954}
                            />
                        </figure>
                        <figure className="hr-solutions__shot hr-solutions__shot--report">
                            <img
                                src={report}
                                alt="October attendance report with present days, work hours, leave, and the monthly calendar"
                                width={1024}
                                height={907}
                            />
                        </figure>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HrSolutions;

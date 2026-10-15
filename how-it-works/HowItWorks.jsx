import { useEffect, useId, useRef, useState } from "react";
import "./how-it-works.css";
import rocketSrc from "./assets/rocket.png";
import blastSrc from "./assets/blast.gif";
import dashSrc from "./assets/dash.png";
import curveLeftSrc from "./assets/curve-left.png";
import curveRightSrc from "./assets/curve-right.png";

const PATH =
  "M186 -15L50.3294 90.0353C24.7048 109.874 24.4322 148.473 49.7742 168.672L152.943 250.9C178.058 270.917 178.058 309.083 152.943 329.1L49.0571 411.9C23.9423 431.917 23.9423 470.083 49.0572 490.1L152.943 572.9C178.058 592.917 178.058 631.083 152.943 651.1L0 773";

const DEFAULT_STEPS = [
  {
    title: "Competitor analysis and keyword research",
    text: "Gain insights to stay ahead",
  },
  {
    title: "Craft a tailored SEO and digital plan",
    text: "Tailored strategies for your brand.",
  },
  {
    title: "Optimize your website for search engines",
    text: "Improve rankings & visibility",
  },
  {
    title: "Focus on long-term success & growth",
    text: "Build sustainable success",
  },
];

function Megaphone({ title }) {
  const rawId = useId().replace(/:/g, "");
  const clipId = `megaphone-${rawId}`;

  return (
    <svg
      className="hiw-mega"
      width="70"
      height="57"
      viewBox="0 0 70 57"
      fill="none"
      aria-hidden={title ? undefined : true}
      role={title ? "img" : undefined}
      aria-label={title || undefined}
    >
      <g clipPath={`url(#${clipId})`}>
        <path d="M68.2404 43.1825C68.1456 43.1821 68.0511 43.1718 67.9585 43.1517L9.30095 30.8284C8.99524 30.7633 8.72122 30.5951 8.52488 30.3519C8.32853 30.1087 8.22183 29.8054 8.22266 29.4928V13.6912C8.22183 13.3787 8.32853 13.0754 8.52488 12.8322C8.72122 12.589 8.99524 12.4208 9.30095 12.3557L67.9585 0.0323779C68.1572 -0.00899694 68.3626 -0.00562183 68.5599 0.0422499C68.7571 0.0901217 68.9413 0.181291 69.0989 0.309153C69.2566 0.437014 69.3838 0.59836 69.4713 0.781488C69.5589 0.964616 69.6046 1.16494 69.6051 1.36792V41.8208C69.6043 42.1825 69.4603 42.5292 69.2045 42.7849C68.9488 43.0407 68.6021 43.1848 68.2404 43.1856V43.1825ZM10.9461 28.3837L66.8756 40.1356V3.04698L10.9461 14.7988V28.3837Z" fill="currentColor" />
        <path d="M62.3798 27.6165C62.0208 27.6165 61.6762 27.4751 61.4207 27.2228C61.1653 26.9705 61.0195 26.6277 61.015 26.2686L60.7424 2.98525C60.7395 2.80551 60.7722 2.62697 60.8386 2.45989C60.9049 2.29281 61.0036 2.14048 61.129 2.01166C61.2544 1.88284 61.404 1.78006 61.5692 1.70922C61.7344 1.63838 61.912 1.60088 62.0917 1.59888H62.1071C62.4663 1.59845 62.8112 1.73978 63.0667 1.99216C63.3223 2.24455 63.468 2.58759 63.472 2.94674L63.74 26.2301C63.7429 26.4097 63.7102 26.5882 63.644 26.7551C63.5777 26.9221 63.4791 27.0744 63.3539 27.2032C63.2287 27.332 63.0793 27.4348 62.9142 27.5057C62.7492 27.5766 62.5718 27.6143 62.3921 27.6165H62.3798Z" fill="currentColor" />
        <path d="M62.3804 41.5774C62.2011 41.5776 62.0236 41.5424 61.8579 41.4739C61.6922 41.4054 61.5417 41.3048 61.4149 41.1781C61.2882 41.0513 61.1876 40.9008 61.1191 40.7351C61.0506 40.5694 61.0154 40.3918 61.0156 40.2125V34.5823C61.0156 34.2204 61.1594 33.8732 61.4154 33.6173C61.6713 33.3613 62.0184 33.2175 62.3804 33.2175C62.7424 33.2175 63.0896 33.3613 63.3455 33.6173C63.6015 33.8732 63.7453 34.2204 63.7453 34.5823V40.2125C63.7455 40.3918 63.7103 40.5694 63.6418 40.7351C63.5733 40.9008 63.4727 41.0513 63.346 41.1781C63.2192 41.3048 63.0686 41.4054 62.9029 41.4739C62.7373 41.5424 62.5597 41.5776 62.3804 41.5774Z" fill="currentColor" />
        <path d="M5.95677 33.1422H4.98943C3.66665 33.1405 2.39851 32.6143 1.46317 31.679C0.527827 30.7437 0.00163054 29.4755 0 28.1528V15.0361C0.0012229 13.7131 0.527257 12.4446 1.46264 11.5089C2.39803 10.5732 3.66639 10.0468 4.98943 10.0452H5.95677C7.27981 10.0468 8.54817 10.5732 9.48356 11.5089C10.4189 12.4446 10.945 13.7131 10.9462 15.0361V28.1574C10.9433 29.4794 10.4166 30.7463 9.48138 31.6806C8.54617 32.615 7.27875 33.1405 5.95677 33.1422ZM4.98943 12.7702C4.39008 12.771 3.81551 13.0095 3.39185 13.4335C2.96819 13.8574 2.73006 14.4321 2.72965 15.0315V28.1528C2.73046 28.7518 2.96876 29.3262 3.39237 29.7498C3.81599 30.1734 4.39034 30.4117 4.98943 30.4125H5.95677C6.55586 30.4117 7.13021 30.1734 7.55383 29.7498C7.97744 29.3262 8.21574 28.7518 8.21655 28.1528V15.0361C8.21614 14.4368 7.97801 13.8621 7.55435 13.4381C7.13069 13.0142 6.55612 12.7756 5.95677 12.7748L4.98943 12.7702Z" fill="currentColor" />
        <path d="M38.966 51.5223H31.8801C30.4146 51.5206 29.0096 50.9379 27.9732 49.9017C26.9368 48.8656 26.3536 47.4607 26.3516 45.9952V33.2992C26.3516 32.9372 26.4954 32.59 26.7513 32.3341C27.0073 32.0781 27.3544 31.9343 27.7163 31.9343C28.0783 31.9343 28.4255 32.0781 28.6814 32.3341C28.9374 32.59 29.0812 32.9372 29.0812 33.2992V45.9983C29.0824 46.7401 29.3777 47.4512 29.9024 47.9756C30.4271 48.5 31.1383 48.7949 31.8801 48.7957H38.966C39.7079 48.7949 40.4191 48.5 40.9438 47.9756C41.4684 47.4512 41.7637 46.7401 41.765 45.9983V36.5494C41.765 36.1875 41.9088 35.8403 42.1647 35.5844C42.4207 35.3284 42.7678 35.1846 43.1298 35.1846C43.4917 35.1846 43.8389 35.3284 44.0948 35.5844C44.3508 35.8403 44.4945 36.1875 44.4945 36.5494V45.9983C44.4917 47.4633 43.9082 48.8674 42.8718 49.9028C41.8355 50.9383 40.431 51.5206 38.966 51.5223Z" fill="currentColor" />
        <path d="M38.9633 57H31.8774C28.9596 56.9967 26.1622 55.8363 24.0989 53.7732C22.0356 51.7102 20.8748 48.913 20.8711 45.9952V32.15C20.8711 31.788 21.0149 31.4409 21.2709 31.1849C21.5268 30.929 21.8739 30.7852 22.2359 30.7852C22.5979 30.7852 22.945 30.929 23.201 31.1849C23.4569 31.4409 23.6007 31.788 23.6007 32.15V45.9983C23.6032 48.1925 24.476 50.2961 26.0277 51.8475C27.5794 53.3989 29.6832 54.2714 31.8774 54.2734H38.9633C41.1574 54.271 43.2609 53.3984 44.8125 51.8471C46.3641 50.2958 47.2371 48.1924 47.24 45.9983V37.6955C47.24 37.3335 47.3837 36.9864 47.6397 36.7304C47.8956 36.4745 48.2428 36.3307 48.6047 36.3307C48.9667 36.3307 49.3139 36.4745 49.5698 36.7304C49.8258 36.9864 49.9695 37.3335 49.9695 37.6955V45.9983C49.965 48.9155 48.8039 51.712 46.7407 53.7743C44.6774 55.8367 41.8805 56.9967 38.9633 57Z" fill="currentColor" />
        <path d="M43.4894 32.894C42.4063 32.8943 41.3473 32.5734 40.4466 31.9719C39.5458 31.3703 38.8437 30.5152 38.429 29.5145C38.0143 28.5139 37.9056 27.4128 38.1168 26.3504C38.3279 25.2881 38.8493 24.3121 39.6151 23.5461C40.3809 22.7801 41.3566 22.2584 42.4189 22.047C43.4813 21.8356 44.5825 21.9439 45.5832 22.3584C46.5839 22.7728 47.4392 23.4747 48.041 24.3753C48.6428 25.2759 48.9641 26.3347 48.9641 27.4178C48.9628 28.8696 48.3857 30.2615 47.3593 31.2882C46.333 32.3149 44.9411 32.8924 43.4894 32.894ZM43.4894 24.6728C42.9461 24.6725 42.4148 24.8334 41.9629 25.135C41.511 25.4367 41.1587 25.8657 40.9507 26.3676C40.7426 26.8695 40.6881 27.4219 40.794 27.9548C40.8999 28.4877 41.1616 28.9773 41.5458 29.3615C41.93 29.7457 42.4195 30.0073 42.9525 30.1132C43.4854 30.2192 44.0377 30.1646 44.5397 29.9566C45.0416 29.7485 45.4705 29.3962 45.7722 28.9443C46.0739 28.4924 46.2347 27.9612 46.2344 27.4178C46.2336 26.6901 45.9441 25.9923 45.4295 25.4777C44.9149 24.9631 44.2172 24.6736 43.4894 24.6728Z" fill="currentColor" />
      </g>
      <defs>
        <clipPath id={clipId}>
          <rect width="69.6052" height="57" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
}

function PathGraphic({ gradientId }) {
  return (
    <svg width="202" height="744" viewBox="0 0 202 744" fill="none" aria-hidden="true">
      <path
        d={PATH}
        stroke={`url(#${gradientId})`}
        strokeDasharray="10 8"
        strokeWidth="1.5"
      />
      <defs>
        <linearGradient id={gradientId} x1="101" y1="-32" x2="101" y2="773" gradientUnits="userSpaceOnUse">
          <stop offset="0.04" stopColor="#236BFF" stopOpacity="0" />
          <stop offset="0.16" stopColor="#236BFF" />
          <stop offset="0.86" stopColor="#236BFF" />
          <stop offset="0.97" stopColor="#236BFF" stopOpacity="0" />
        </linearGradient>
      </defs>
    </svg>
  );
}

export default function HowItWorks({
  title = "How It Work",
  subtitle = "Our Step-by-Step Marketing Process",
  steps = DEFAULT_STEPS,
  embedded = false,
}) {
  const sectionRef = useRef(null);
  const measurePathRef = useRef(null);
  const greenClipRef = useRef(null);
  const rocketRef = useRef(null);
  const blastRef = useRef(null);
  const [activeCount, setActiveCount] = useState(0);
  const gradientId = `path-${useId().replace(/:/g, "")}`;
  const baseGradientId = `${gradientId}-base`;

  useEffect(() => {
    const section = sectionRef.current;
    const path = measurePathRef.current;
    if (!section || !path) return;

    const length = path.getTotalLength();
    const thresholds = steps.map(
      (_, index) => 0.25 + index * (0.6 / Math.max(steps.length - 1, 1))
    );
    let frame = 0;
    let lastActive = -1;

    const place = (node, point, angle, opacity) => {
      if (!node) return;
      node.setAttribute(
        "transform",
        `translate(${point.x} ${point.y}) rotate(${angle})`
      );
      node.setAttribute("opacity", String(opacity));
    };

    const update = () => {
      const rect = section.getBoundingClientRect();
      const startTop = -rect.height * 0.1;
      const endTop = window.innerHeight * 0.5 - rect.height;
      const span = startTop - endTop || 1;
      const progress = Math.min(1, Math.max(0, (startTop - rect.top) / span));

      if (greenClipRef.current) {
        greenClipRef.current.style.height = `${progress * 116}%`;
      }

      const distance = length * Math.min(progress, 0.995);
      const point = path.getPointAtLength(distance);
      const ahead = path.getPointAtLength(Math.min(length, distance + 16));
      const angle = (Math.atan2(ahead.y - point.y, ahead.x - point.x) * 180) / Math.PI;
      const finished = progress >= 0.99;

      place(rocketRef.current, point, angle, finished ? 0 : 1);
      place(blastRef.current, point, 0, finished ? 1 : 0);

      const nextActive = thresholds.filter((threshold) => progress >= threshold).length;
      if (nextActive !== lastActive) {
        lastActive = nextActive;
        setActiveCount(nextActive);
      }
    };

    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [steps]);

  return (
    <section ref={sectionRef} className={`hiw${embedded ? " is-embedded" : ""}`}>
      <div className="hiw-glow" />
      <div className="hiw-grid hiw-grid-left" />
      <div className="hiw-grid hiw-grid-right" />

      <img src={dashSrc} alt="" className="hiw-dash" />
      <img src={curveLeftSrc} alt="" className="hiw-curve hiw-curve-left" />
      <img src={curveRightSrc} alt="" className="hiw-curve hiw-curve-right" />

      <div className="hiw-inner">
        <header className="hiw-head">
          <h2>{title}</h2>
          <p>{subtitle}</p>
        </header>

        <div className="hiw-track">
          <div className="hiw-path hiw-path-base">
            <svg width="202" height="744" viewBox="0 0 202 744" fill="none" aria-hidden="true">
              <path d={PATH} stroke={`url(#${baseGradientId})`} strokeDasharray="10 8" strokeWidth="1.5" />
              <defs>
                <linearGradient id={baseGradientId} x1="101" y1="-32" x2="101" y2="773" gradientUnits="userSpaceOnUse">
                  <stop offset="0.04" stopColor="#236BFF" stopOpacity="0" />
                  <stop offset="0.16" stopColor="#236BFF" stopOpacity="0.45" />
                  <stop offset="0.86" stopColor="#236BFF" stopOpacity="0.45" />
                  <stop offset="0.97" stopColor="#236BFF" stopOpacity="0" />
                </linearGradient>
              </defs>
            </svg>
          </div>

          <div ref={greenClipRef} className="hiw-path hiw-path-fill" style={{ height: 0 }}>
            <PathGraphic gradientId={gradientId} />
          </div>

          <svg className="hiw-path hiw-path-rocket" width="202" height="744" viewBox="0 0 202 744" aria-hidden="true">
            <path ref={measurePathRef} d={PATH} fill="none" stroke="transparent" />
            <g ref={rocketRef} opacity="0">
              <image href={rocketSrc} xlinkHref={rocketSrc} x="-18" y="-18" width="36" height="36" />
            </g>
            <g ref={blastRef} opacity="0">
              <image href={blastSrc} xlinkHref={blastSrc} x="-22" y="-22" width="44" height="44" />
            </g>
          </svg>

          {steps.map((step, index) => {
            const side = index % 2 === 0 ? "left" : "right";
            const active = index < activeCount;
            const watermark = String(index + 1).padStart(2, "0");

            return (
              <div key={`${step.title}-${index}`} className="hiw-step">
                <div className={`hiw-slot hiw-slot-${side}`}>
                  <article className="hiw-card">
                    <span className="hiw-watermark">{watermark}</span>
                    <Megaphone />
                    <div>
                      <h3>{step.title}</h3>
                      <p>{step.text}</p>
                    </div>
                  </article>
                </div>

                <div className={`hiw-badge hiw-badge-${side}${active ? " is-active" : ""}`}>
                  {index + 1}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

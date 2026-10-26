import { useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, useAnimation } from "framer-motion";
import { useSiteTheme } from "@/hooks/useSiteTheme";
import MaskedHeading from "@/components/MaskedHeading";

type WovenLightHeroProps = {
  headline?: string;
  brandName?: string;
  /** Stacked poster lines. Used when `poster` is set. */
  posterLines?: string[];
  /** Word inside a poster line drawn in the site primary color. */
  accentWord?: string;
  /** Full-bleed stacked headline, without the side carousel. */
  poster?: boolean;
  paragraphs?: string[];
  /** Pass `null` to render the hero without a call-to-action. */
  ctaLabel?: string | null;
  ctaTo?: string;
  layout?: "display" | "editorial";
};

// --- Main Hero Component ---
export const WovenLightHero = ({
  headline = "Woven by Light",
  brandName,
  posterLines,
  accentWord,
  poster = false,
  paragraphs = [
    "An interactive tapestry of light and motion, crafted with code and creativity.",
  ],
  ctaLabel = "Explore the Weave",
  ctaTo,
  layout = "display",
}: WovenLightHeroProps) => {
  const isDark = useSiteTheme();
  const textControls = useAnimation();
  const buttonControls = useAnimation();
  const editorial = layout === "editorial";
  const words = headline.split(" ");
  const lines = posterLines?.length ? posterLines : [headline];

  const renderAccent = (line: string) => {
    if (!accentWord) return line;
    const parts = line.split(new RegExp(`(${accentWord})`, "ig"));
    return parts.map((part, index) =>
      part.toLowerCase() === accentWord.toLowerCase() ? (
        <span key={index} className="woven-hero-poster__accent">
          {part}
        </span>
      ) : (
        <span key={index}>{part}</span>
      )
    );
  };

  useEffect(() => {
    textControls.start((i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * (editorial ? 0.06 : 0.1) + 0.3,
        duration: editorial ? 0.7 : 1.2,
        ease: [0.2, 0.65, 0.3, 0.9],
      },
    }));
    buttonControls.start({
      opacity: 1,
      transition: { delay: editorial ? 0.8 : 1.4, duration: 0.8 },
    });
  }, [textControls, buttonControls, editorial]);

  const ctaStyle = {
    fontFamily: "var(--font-heading)",
    fontWeight: 600,
    fontSize: editorial ? 16 : 18,
    letterSpacing: 0,
    borderRadius: 30,
    border: editorial
      ? "none"
      : isDark
        ? "1px solid rgba(255, 255, 255, 0.3)"
        : "1px solid #cccccc",
    background: editorial ? "var(--color-primary)" : "transparent",
    color: editorial ? "var(--white)" : isDark ? "var(--white)" : "var(--color-heading)",
    padding: editorial ? "14px 28px" : "14px 32px",
    cursor: "pointer",
    display: "inline-block",
    textDecoration: "none",
  } as const;

  return (
    <section
      className={`relative min-h-screen w-full overflow-hidden transition-colors duration-500${editorial ? " woven-hero--editorial" : " lg:flex lg:flex-row"}${poster ? " woven-hero--poster" : ""}`}
      style={{ backgroundColor: isDark ? "var(--dark)" : "var(--white)" }}
    >
      <style>{`
        .woven-hero-copy {
          position: absolute;
          inset: 0;
          z-index: 10;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 96px 24px;
          text-align: center;
        }
        .woven-hero-inner { max-width: 36rem; }
        .woven-hero-word {
          display: inline-block;
          white-space: nowrap;
          margin-right: 0.28em;
        }
        .woven-hero-copy p { margin-left: auto; margin-right: auto; }
        @media (min-width: 1024px) {
          .woven-hero-copy {
            position: relative;
            inset: auto;
            width: 50%;
            justify-content: flex-start;
            padding: 48px 8vw;
            text-align: left;
          }
          .woven-hero-word { display: block; margin-right: 0; }
          .woven-hero-copy p { margin-left: 0; margin-right: 0; }
          .woven-hero-canvas {
            position: relative;
            inset: auto;
            width: 50%;
            min-height: 100vh;
          }
        }
        .woven-hero--editorial {
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .woven-hero--editorial .woven-hero-copy {
          position: relative;
          inset: auto;
          width: 100%;
          min-height: 100vh;
          align-items: center;
          justify-content: center;
          padding: 120px 24px 72px;
          text-align: center;
        }
        .woven-hero--editorial .woven-hero-inner {
          width: min(94vw, 1080px);
          max-width: 100%;
          margin-inline: auto;
        }
        .woven-hero--editorial .woven-hero-word {
          display: inline;
          white-space: normal;
          margin-right: 0;
        }
        .woven-hero--editorial .arcle-brand {
          width: 100%;
          margin: 0 auto 28px !important;
        }
        .woven-hero--editorial .woven-hero-copy p {
          margin-left: auto;
          margin-right: 0;
          text-align: left;
        }
        @media (min-width: 1024px) {
          .woven-hero--editorial .woven-hero-copy p {
            margin-right: min(0px, calc((min(94vw, 1080px) - 100vw) / 2 + 36px));
          }
        }
        .woven-hero--poster {
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .woven-hero--poster .woven-hero-copy {
          position: relative;
          inset: auto;
          width: 100%;
          min-height: 100vh;
          align-items: center;
          justify-content: center;
          padding: 132px 6vw 72px;
          text-align: left;
        }
        .woven-hero--poster .woven-hero-inner {
          width: fit-content;
          max-width: 100%;
          margin-inline: auto;
        }
        .woven-hero--editorial.woven-hero--poster h1.woven-hero-poster {
          margin: 0 0 32px;
          font-family: var(--font-heading);
          font-weight: 800;
          font-size: clamp(40px, 9.2vw, 148px);
          line-height: 0.82;
          letter-spacing: -0.04em;
          text-transform: uppercase;
          text-wrap: wrap;
          color: var(--color-heading);
        }
        .bg-dark .woven-hero--editorial.woven-hero--poster h1.woven-hero-poster {
          color: var(--white);
        }
        .woven-hero-poster__line {
          display: block;
        }
        .woven-hero-poster__accent {
          color: var(--color-primary);
        }
        .woven-hero--poster .woven-hero-copy p {
          margin-left: 0;
          margin-right: 0;
          max-width: 34rem;
        }
      `}</style>
      <div className="woven-hero-copy">
        <div className="woven-hero-inner">
          {poster ? (
            <h1 className="woven-hero-poster">
              {lines.map((line, i) => (
                <motion.span
                  key={line}
                  className="woven-hero-poster__line"
                  custom={i}
                  initial={{ opacity: 0, y: 36 }}
                  animate={textControls}
                >
                  {renderAccent(line)}
                </motion.span>
              ))}
            </h1>
          ) : null}
          {!poster && brandName ? (
            <MaskedHeading
              tag="h1"
              className="arcle-brand"
              text={brandName}
              mediaType="video"
              src="/assets/video/waves-3.mp4"
              poster="/assets/hero/carousel-video.jpg"
              fillScale={1.25}
              parallax={0}
              reveal="rise"
              trigger="load"
              spotlight={false}
              outline={false}
              duration={1.1}
              stagger={0.12}
              drift={14}
              hoverZoom={0}
              align="center"
              brightness={0.72}
              saturation={0.35}
              grayscale={true}
              tint="rgba(10, 32, 78, 0.55)"
              outlineWidth={1}
              weight={700}
              tracking={-0.03}
              lineHeight={0.92}
              textScale={0.192}
              style={{
                fontFamily: "var(--font-heading)",
                color: isDark ? "var(--white)" : "var(--color-heading)",
              }}
            />
          ) : null}
          {!poster && !brandName ? (
          <h1
            className={editorial ? undefined : "uppercase"}
            style={{
              fontFamily: "var(--font-heading)",
              fontWeight: 600,
              letterSpacing: 0,
              lineHeight: editorial ? 1.12 : 1,
              fontSize: editorial ? "clamp(34px, 3.3vw, 58px)" : "clamp(48px, 5.2vw, 88px)",
              marginBottom: 25,
              color: isDark ? "var(--white)" : "var(--color-heading)",
            }}
          >
            {words.map((word, i) => (
              <span key={i} className="woven-hero-word">
                {editorial ? (
                  <>
                    <motion.span
                      custom={i}
                      initial={{ opacity: 0, y: 24 }}
                      animate={textControls}
                      style={{ display: "inline" }}
                    >
                      {word}
                    </motion.span>
                    {i < words.length - 1 ? " " : null}
                  </>
                ) : (
                  word.split("").map((char, j) => (
                    <motion.span
                      key={j}
                      custom={i * 5 + j}
                      initial={{ opacity: 0, y: 50 }}
                      animate={textControls}
                      style={{ display: "inline-block" }}
                    >
                      {char}
                    </motion.span>
                  ))
                )}
              </span>
            ))}
          </h1>
          ) : null}
          {paragraphs.map((paragraph, index) => (
            <motion.p
              key={index}
              custom={words.length + index}
              initial={{ opacity: 0, y: 30 }}
              animate={textControls}
              style={{
                fontFamily: "var(--font-default)",
                fontWeight: 400,
                fontSize: 17,
                lineHeight: 1.7,
                marginBottom: index === paragraphs.length - 1 ? 25 : 14,
                maxWidth: editorial ? 640 : 520,
                color: isDark ? "#e8e8e8" : "var(--color-paragraph)",
              }}
            >
              {paragraph}
            </motion.p>
          ))}
          {ctaLabel && (
            <motion.div initial={{ opacity: 0 }} animate={buttonControls}>
              {ctaTo ? (
                <Link to={ctaTo} style={ctaStyle}>
                  {ctaLabel}
                </Link>
              ) : (
                <button className={editorial ? undefined : "uppercase"} style={ctaStyle}>
                  {ctaLabel}
                </button>
              )}
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
};

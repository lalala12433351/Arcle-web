import { useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, useAnimation } from "framer-motion";
import * as THREE from "three";
import { useSiteTheme } from "@/hooks/useSiteTheme";

type WovenLightHeroProps = {
  headline?: string;
  paragraphs?: string[];
  ctaLabel?: string;
  ctaTo?: string;
  layout?: "display" | "editorial";
};

// --- Main Hero Component ---
export const WovenLightHero = ({
  headline = "Woven by Light",
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
      className={`relative min-h-screen w-full overflow-hidden transition-colors duration-500 lg:flex lg:flex-row${editorial ? " woven-hero--editorial" : ""}`}
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
        .woven-hero--editorial .woven-hero-copy {
          position: relative;
          inset: auto;
          align-items: flex-start;
          padding: 132px 24px 48px;
        }
        .woven-hero--editorial .woven-hero-inner { max-width: 42rem; }
        .woven-hero--editorial .woven-hero-word {
          display: inline;
          white-space: normal;
          margin-right: 0;
        }
        .woven-hero--editorial .woven-hero-canvas {
          position: relative;
          height: 42vh;
          min-height: 280px;
        }
        @media (min-width: 1024px) {
          .woven-hero--editorial .woven-hero-copy {
            width: 56%;
            align-items: center;
            padding: 48px 5vw 48px 7vw;
          }
          .woven-hero--editorial .woven-hero-word {
            display: inline;
            margin-right: 0;
          }
          .woven-hero--editorial .woven-hero-canvas {
            width: 44%;
            height: auto;
            min-height: 100vh;
          }
        }
      `}</style>
      <div className="woven-hero-copy">
        <div className="woven-hero-inner">
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
                color: isDark ? "#cccccc" : "var(--color-paragraph)",
              }}
            >
              {paragraph}
            </motion.p>
          ))}
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
        </div>
      </div>
      <div className="woven-hero-canvas absolute inset-0 z-0 h-full w-full">
        <WovenCanvas isDark={isDark} />
      </div>
    </section>
  );
};

// --- Three.js Canvas Component ---
const WovenCanvas = ({ isDark }: { isDark: boolean }) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const themeRef = useRef(isDark);
  const applyThemeRef = useRef<((dark: boolean) => void) | null>(null);

  useEffect(() => {
    themeRef.current = isDark;
    applyThemeRef.current?.(isDark);
  }, [isDark]);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
    camera.position.z = 5.6;
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mount.appendChild(renderer.domElement);

    const resize = () => {
      const width = mount.clientWidth;
      const height = mount.clientHeight;
      if (width === 0 || height === 0) return;
      const aspect = width / height;
      camera.aspect = aspect;
      camera.position.z = aspect < 0.7 ? 5 : aspect < 0.85 ? 5.6 : 5.3;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };
    resize();

    const mouse = new THREE.Vector2(0, 0);
    const clock = new THREE.Clock();

    const particleCount = 50000;
    const positions = new Float32Array(particleCount * 3);
    const originalPositions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const velocities = new Float32Array(particleCount * 3);
    const hues = new Float32Array(particleCount);

    const geometry = new THREE.BufferGeometry();
    const torusKnot = new THREE.TorusKnotGeometry(1.5, 0.5, 200, 32);

    for (let i = 0; i < particleCount; i++) {
      const vertexIndex = i % torusKnot.attributes.position.count;
      const x = torusKnot.attributes.position.getX(vertexIndex);
      const y = torusKnot.attributes.position.getY(vertexIndex);
      const z = torusKnot.attributes.position.getZ(vertexIndex);

      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;
      originalPositions[i * 3] = x;
      originalPositions[i * 3 + 1] = y;
      originalPositions[i * 3 + 2] = z;

      hues[i] = Math.random();
      velocities[i * 3] = 0;
      velocities[i * 3 + 1] = 0;
      velocities[i * 3 + 2] = 0;
    }

    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));

    const material = new THREE.PointsMaterial({
      size: 0.02,
      vertexColors: true,
      transparent: true,
    });

    const applyTheme = (dark: boolean) => {
      const color = new THREE.Color();
      for (let i = 0; i < particleCount; i++) {
        // Dark: bright additive glow. Light: deeper ink tones on white.
        color.setHSL(hues[i], dark ? 0.75 : 0.55, dark ? 0.65 : 0.42);
        colors[i * 3] = color.r;
        colors[i * 3 + 1] = color.g;
        colors[i * 3 + 2] = color.b;
      }
      geometry.attributes.color.needsUpdate = true;
      material.blending = dark ? THREE.AdditiveBlending : THREE.NormalBlending;
      material.opacity = dark ? 0.85 : 0.95;
      material.needsUpdate = true;
    };

    applyTheme(themeRef.current);
    applyThemeRef.current = applyTheme;

    const points = new THREE.Points(geometry, material);
    scene.add(points);

    const handleMouseMove = (event: MouseEvent) => {
      const rect = mount.getBoundingClientRect();
      if (rect.width === 0 || rect.height === 0) return;
      mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
    };
    window.addEventListener("mousemove", handleMouseMove);

    let frameId = 0;
    const animate = () => {
      frameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();
      const mouseWorld = new THREE.Vector3(mouse.x * 3, mouse.y * 3, 0);

      for (let i = 0; i < particleCount; i++) {
        const ix = i * 3;
        const iy = i * 3 + 1;
        const iz = i * 3 + 2;

        const currentPos = new THREE.Vector3(positions[ix], positions[iy], positions[iz]);
        const originalPos = new THREE.Vector3(
          originalPositions[ix],
          originalPositions[iy],
          originalPositions[iz]
        );
        const velocity = new THREE.Vector3(velocities[ix], velocities[iy], velocities[iz]);

        const dist = currentPos.distanceTo(mouseWorld);
        if (dist < 1.5) {
          const force = (1.5 - dist) * 0.01;
          const direction = new THREE.Vector3().subVectors(currentPos, mouseWorld).normalize();
          velocity.add(direction.multiplyScalar(force));
        }

        const returnForce = new THREE.Vector3()
          .subVectors(originalPos, currentPos)
          .multiplyScalar(0.001);
        velocity.add(returnForce);
        velocity.multiplyScalar(0.95);

        positions[ix] += velocity.x;
        positions[iy] += velocity.y;
        positions[iz] += velocity.z;

        velocities[ix] = velocity.x;
        velocities[iy] = velocity.y;
        velocities[iz] = velocity.z;
      }
      geometry.attributes.position.needsUpdate = true;

      points.rotation.y = elapsedTime * 0.05;
      renderer.render(scene, camera);
    };
    animate();

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(mount);

    return () => {
      cancelAnimationFrame(frameId);
      applyThemeRef.current = null;
      resizeObserver.disconnect();
      window.removeEventListener("mousemove", handleMouseMove);
      geometry.dispose();
      material.dispose();
      torusKnot.dispose();
      renderer.dispose();
      if (mount.contains(renderer.domElement)) {
        mount.removeChild(renderer.domElement);
      }
    };
  }, []);

  return <div ref={mountRef} className="absolute inset-0 z-0" />;
};

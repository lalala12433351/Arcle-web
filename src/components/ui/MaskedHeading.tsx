import { useLayoutEffect, useRef, type CSSProperties, type ElementType, type RefObject } from "react";

export type MaskedHeadingProps = {
  text: string;
  mediaType?: "video" | "image";
  src?: string;
  /** Paint opaque letters only, and use them to mask `maskTarget`. */
  maskOnly?: boolean;
  /** Element that should show through the letter shapes when `maskOnly` is set. */
  maskTarget?: RefObject<HTMLElement | null>;
  poster?: string;
  /** Media size relative to a cover fit; values above 1 leave room for parallax and drift. */
  fillScale?: number;
  /** Vertical media travel in px as the heading crosses the viewport. */
  parallax?: number;
  reveal?: "scale" | "rise" | "fade" | "none";
  trigger?: "view" | "load";
  /** 0–1 value read every frame; when set it drives the reveal instead of `trigger` (e.g. a scrubbed ScrollTrigger). */
  scrollProgress?: { current: number };
  spotlight?: boolean;
  spotlightRadius?: number;
  outline?: boolean;
  /** Seconds per letter. */
  duration?: number;
  /** Seconds between letters. */
  stagger?: number;
  /** Media offset in px that follows the pointer. */
  drift?: number;
  hoverZoom?: number;
  align?: "left" | "center" | "right";
  brightness?: number;
  saturation?: number;
  grayscale?: boolean;
  /** Color washed over the media inside the letter shapes. */
  tint?: string;
  outlineWidth?: number;
  weight?: number;
  /** Letter spacing in em. */
  tracking?: number;
  lineHeight?: number;
  /** Font size as a fraction of the container width; shrinks so the longest word always fits. */
  textScale?: number;
  as?: ElementType;
  className?: string;
  style?: CSSProperties;
};

type Glyph = { char: string; x: number; y: number; w: number; order: number };

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));
const easeOut = (t: number) => 1 - Math.pow(1 - t, 4);

const loadImage = (url: string) => {
  const img = new Image();
  img.decoding = "async";
  img.src = url;
  return img;
};

const MaskedHeading = ({
  text,
  mediaType = "video",
  src,
  maskOnly = false,
  maskTarget,
  poster,
  fillScale = 1.25,
  parallax = 26,
  reveal = "scale",
  trigger = "view",
  scrollProgress,
  spotlight = false,
  spotlightRadius = 180,
  outline = false,
  duration = 1.1,
  stagger = 0.09,
  drift = 18,
  hoverZoom = 0,
  align = "center",
  brightness = 1,
  saturation = 1,
  grayscale = false,
  tint,
  outlineWidth = 1,
  weight = 700,
  tracking = -0.03,
  lineHeight = 1.06,
  textScale = 0.115,
  as: Tag = "h2",
  className,
  style,
}: MaskedHeadingProps) => {
  const rootRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useLayoutEffect(() => {
    const root = rootRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!root || !canvas || !ctx) return;

    const video = !maskOnly && mediaType === "video" ? videoRef.current : null;
    const still = maskOnly ? null : mediaType === "image" && src ? loadImage(src) : poster ? loadImage(poster) : null;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const filter = `brightness(${brightness}) saturate(${saturation})${grayscale ? " grayscale(1)" : ""}`;

    let width = 0;
    let height = 0;
    let dpr = 1;
    let fontSize = 0;
    let font = "";
    let glyphs: Glyph[] = [];
    let startTime: number | null = null;
    let visible = false;
    let hovering = false;
    let maskDirty = true;
    let raf = 0;
    const pointer = { x: 0, y: 0 };
    const smooth = { x: 0, y: 0, hover: 0 };

    if (video) video.muted = true;

    const layout = () => {
      width = root.clientWidth;
      if (!width) return;
      const family = getComputedStyle(root).fontFamily;
      const setFont = (size: number) => {
        font = `${weight} ${size}px ${family}`;
        ctx.font = font;
      };
      const measure = (value: string) => {
        const chars = Array.from(value);
        return ctx.measureText(value).width + (chars.length - 1) * tracking * fontSize;
      };

      fontSize = width * textScale;
      setFont(fontSize);
      const chunks = text
        .split(/\n/)
        .map((chunk) => chunk.trim())
        .filter(Boolean);

      const wrapChunks = () => {
        const wrapped: string[] = [];
        for (const chunk of chunks) {
          const words = chunk.split(/\s+/);
          let line = "";
          for (const word of words) {
            const next = line ? `${line} ${word}` : word;
            if (line && measure(next) > width) {
              wrapped.push(line);
              line = word;
            } else {
              line = next;
            }
          }
          if (line) wrapped.push(line);
        }
        return wrapped;
      };

      let lines = wrapChunks();
      const widest = Math.max(...lines.map(measure), 0);
      if (widest > width) {
        fontSize *= width / widest;
        setFont(fontSize);
        lines = wrapChunks();
      }

      const lineGap = fontSize * lineHeight;
      const pad = fontSize * 0.12;
      height = Math.ceil(lines.length * lineGap + pad * 2);

      let order = 0;
      glyphs = [];
      lines.forEach((value, lineIndex) => {
        const chars = Array.from(value);
        const lineWidth = measure(value);
        const startX = align === "center" ? (width - lineWidth) / 2 : align === "right" ? width - lineWidth : 0;
        const y = pad + lineIndex * lineGap + lineGap / 2;
        chars.forEach((char, i) => {
          if (char === " ") return;
          const before = chars.slice(0, i).join("");
          const x = startX + ctx.measureText(before).width + i * tracking * fontSize;
          glyphs.push({ char, x, y, w: ctx.measureText(char).width, order: order++ });
        });
      });

      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      canvas.style.height = `${height}px`;
      if (!hovering) {
        pointer.x = smooth.x = width / 2;
        pointer.y = smooth.y = height / 2;
      }
      maskDirty = true;
    };

    const publishMask = () => {
      const target = maskTarget?.current;
      if (!maskOnly || !target) return;
      const url = canvas.toDataURL();
      target.style.maskImage = `url("${url}")`;
      target.style.webkitMaskImage = `url("${url}")`;
      target.style.maskSize = "100% 100%";
      target.style.webkitMaskSize = "100% 100%";
      target.style.maskRepeat = "no-repeat";
      target.style.webkitMaskRepeat = "no-repeat";
      target.style.maskPosition = "center";
      target.style.webkitMaskPosition = "center";
      target.style.maskMode = "alpha";
    };

    const letterProgress = (order: number, now: number) => {
      if (reveal === "none" || reduceMotion) return 1;
      let elapsed: number;
      if (scrollProgress) {
        const total = duration + Math.max(glyphs.length - 1, 0) * stagger;
        elapsed = clamp(scrollProgress.current, 0, 1) * total;
      } else {
        if (startTime === null) return 0;
        elapsed = (now - startTime) / 1000;
      }
      return easeOut(clamp((elapsed - order * stagger) / duration, 0, 1));
    };

    const drawGlyphs = (now: number, mode: "fill" | "stroke") => {
      for (const glyph of glyphs) {
        const p = letterProgress(glyph.order, now);
        if (p <= 0) continue;
        ctx.save();
        ctx.globalAlpha = p;
        ctx.translate(glyph.x + glyph.w / 2, glyph.y);
        if (reveal === "scale") ctx.scale(0.6 + 0.4 * p, 0.6 + 0.4 * p);
        if (reveal === "rise") ctx.translate(0, (1 - p) * fontSize * (scrollProgress ? 1.1 : 0.45));
        if (mode === "fill") ctx.fillText(glyph.char, -glyph.w / 2, 0);
        else ctx.strokeText(glyph.char, -glyph.w / 2, 0);
        ctx.restore();
      }
    };

    const currentMedia = (): [CanvasImageSource, number, number] | null => {
      if (video && video.readyState >= 2 && video.videoWidth) return [video, video.videoWidth, video.videoHeight];
      if (still?.complete && still.naturalWidth) return [still, still.naturalWidth, still.naturalHeight];
      return null;
    };

    const draw = (now: number) => {
      if (!width || !height) return;
      const color = getComputedStyle(root).color;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, width, height);
      ctx.globalCompositeOperation = "source-over";
      ctx.font = font;
      ctx.textBaseline = "middle";
      ctx.textAlign = "left";
      ctx.fillStyle = "#000";
      drawGlyphs(now, "fill");

      if (maskOnly) {
        if (maskDirty) {
          publishMask();
          maskDirty = false;
        }
        return;
      }

      ctx.globalCompositeOperation = "source-in";
      const media = currentMedia();
      if (media) {
        const [source, mw, mh] = media;
        const rect = canvas.getBoundingClientRect();
        const viewport = window.innerHeight;
        const travel = clamp((rect.top + rect.height / 2 - viewport / 2) / (viewport / 2 + rect.height / 2), -1, 1);
        const scale = Math.max(width / mw, height / mh) * fillScale * (1 + hoverZoom * smooth.hover);
        const dw = mw * scale;
        const dh = mh * scale;
        const offsetX = reduceMotion ? 0 : -(smooth.x / width - 0.5) * 2 * drift;
        const offsetY = reduceMotion ? 0 : travel * parallax - (smooth.y / height - 0.5) * 2 * drift;
        ctx.filter = filter;
        ctx.drawImage(source, (width - dw) / 2 + offsetX, (height - dh) / 2 + offsetY, dw, dh);
        ctx.filter = "none";
      } else {
        ctx.fillStyle = color;
        ctx.fillRect(0, 0, width, height);
      }

      if (tint) {
        ctx.globalCompositeOperation = "source-atop";
        ctx.fillStyle = tint;
        ctx.fillRect(0, 0, width, height);
      }

      if (spotlight) {
        const radius = spotlightRadius * smooth.hover;
        ctx.globalCompositeOperation = "destination-in";
        if (radius < 1) {
          ctx.clearRect(0, 0, width, height);
        } else {
          const gradient = ctx.createRadialGradient(pointer.x, pointer.y, 0, pointer.x, pointer.y, radius);
          gradient.addColorStop(0.6, "rgba(0,0,0,1)");
          gradient.addColorStop(1, "rgba(0,0,0,0)");
          ctx.fillStyle = gradient;
          ctx.fillRect(0, 0, width, height);
        }
      }

      if (outline || spotlight) {
        ctx.globalCompositeOperation = "source-over";
        ctx.strokeStyle = color;
        ctx.lineWidth = outlineWidth;
        drawGlyphs(now, "stroke");
      }
    };

    const tick = (now: number) => {
      raf = 0;
      if (!visible) return;
      const k = reduceMotion ? 1 : 0.12;
      smooth.x += ((hovering ? pointer.x : width / 2) - smooth.x) * k;
      smooth.y += ((hovering ? pointer.y : height / 2) - smooth.y) * k;
      smooth.hover += ((hovering ? 1 : 0) - smooth.hover) * k;
      draw(now);
      raf = requestAnimationFrame(tick);
    };

    const onMove = (event: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      pointer.x = event.clientX - rect.left;
      pointer.y = event.clientY - rect.top;
      hovering = true;
    };
    const onLeave = () => {
      hovering = false;
    };

    layout();
    let disposed = false;
    document.fonts?.ready.then(() => {
      if (disposed) return;
      layout();
      if (trigger === "load" && startTime === null) startTime = performance.now();
    });

    const resizeObserver = new ResizeObserver(layout);
    resizeObserver.observe(root);

    const intersectionObserver = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        if (trigger === "view" && startTime === null && entry.intersectionRatio >= 0.25) {
          startTime = performance.now();
        }
        if (visible) {
          video?.play().catch(() => undefined);
          if (!raf) raf = requestAnimationFrame(tick);
        } else {
          video?.pause();
        }
      },
      { threshold: [0, 0.25] }
    );
    intersectionObserver.observe(root);

    root.addEventListener("pointermove", onMove);
    root.addEventListener("pointerleave", onLeave);

    return () => {
      disposed = true;
      cancelAnimationFrame(raf);
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      root.removeEventListener("pointermove", onMove);
      root.removeEventListener("pointerleave", onLeave);
      video?.pause();
    };
  }, [
    text, mediaType, src, maskOnly, maskTarget, poster, fillScale, parallax, reveal, trigger, scrollProgress, spotlight, spotlightRadius,
    outline, duration, stagger, drift, hoverZoom, align, brightness, saturation, grayscale, tint,
    outlineWidth, weight, tracking, lineHeight, textScale,
  ]);

  return (
    <Tag ref={rootRef} className={className} style={{ position: "relative", margin: 0, ...style }}>
      <span className="sr-only">{text}</span>
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        style={{
          display: "block",
          width: "100%",
          opacity: maskOnly ? 0 : undefined,
        }}
      />
      {!maskOnly && mediaType === "video" && src ? (
        <video
          ref={videoRef}
          src={src}
          poster={poster}
          muted
          loop
          playsInline
          preload="auto"
          aria-hidden="true"
          tabIndex={-1}
          style={{ position: "absolute", width: 1, height: 1, opacity: 0, pointerEvents: "none" }}
        />
      ) : null}
    </Tag>
  );
};

export default MaskedHeading;

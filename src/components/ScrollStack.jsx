'use client';

import { Children, Fragment, isValidElement, useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './ScrollStack.css';

gsap.registerPlugin(ScrollTrigger);

const resolveOffset = (value, size) => {
  if (typeof value === 'number') return value;
  const text = String(value).trim();
  if (text.endsWith('%')) return (parseFloat(text) / 100) * size;
  return parseFloat(text) || 0;
};

const toLength = value => (typeof value === 'number' ? `${value}px` : value);

/** Soften cover progress so tilt/scale never snap at the edges. */
const easeCover = t => {
  const x = Math.min(1, Math.max(0, t));
  return x * x * (3 - 2 * x);
};

export const ScrollStackItem = ({ children, itemClassName = '', style }) => (
  <div className={`scroll-stack-card ${itemClassName}`.trim()} style={style}>
    {children}
    <span className="scroll-stack-card__shade" aria-hidden="true" />
  </div>
);

/**
 * Sticky project/service stack with Alt Shift–style scroll-linked 3D recess.
 * Driven by GSAP ScrollTrigger (scrubbed to scroll). Does not create Lenis —
 * if Lenis already updates ScrollTrigger elsewhere, this stays in sync.
 */
const ScrollStack = ({
  children,
  className = '',
  itemDistance = 100,
  itemStackDistance = 24,
  stackPosition = '15%',
  itemScale = 0.05,
  baseScale = 0.86,
  dimAmount = 0.25,
  blurAmount = 0,
  tiltAmount = 48,
  mobileTiltAmount = 18,
  depthAmount = 220,
  mobileDepthAmount = 90,
  liftAmount = 18,
  mobileLiftAmount = 8,
  rotationAmount = 0,
  holdDistance = 200,
  useWindowScroll = false,
  onStackComplete
}) => {
  const rootRef = useRef(null);
  const innerRef = useRef(null);
  const endRef = useRef(null);
  const settingsRef = useRef(null);
  const items = Children.toArray(children);

  useLayoutEffect(() => {
    settingsRef.current = {
      itemDistance,
      itemStackDistance,
      stackPosition,
      itemScale,
      baseScale,
      dimAmount,
      blurAmount,
      tiltAmount,
      mobileTiltAmount,
      depthAmount,
      mobileDepthAmount,
      liftAmount,
      mobileLiftAmount,
      rotationAmount,
      holdDistance,
      onStackComplete
    };
  });

  useLayoutEffect(() => {
    const root = rootRef.current;
    const inner = innerRef.current;
    const end = endRef.current;
    if (!root || !inner || !end) return undefined;

    const windowed = useWindowScroll;
    let complete = false;
    let layoutFrame = 0;

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add(
        {
          isDesktop: '(min-width: 768px)',
          isMobile: '(max-width: 767px)',
          reduceMotion: '(prefers-reduced-motion: reduce)'
        },
        context => {
          const { isMobile, reduceMotion } = context.conditions;
          const cache = new Map();

          const write = (key, value, apply) => {
            if (cache.get(key) === value) return false;
            cache.set(key, value);
            apply(value);
            return true;
          };

          const resetCard = card => {
            gsap.set(card, {
              clearProps: 'transform,filter',
              transformPerspective: 0,
              rotateX: 0,
              rotateZ: 0,
              y: 0,
              z: 0,
              scale: 1,
              force3D: true
            });
            card.style.setProperty('--scroll-stack-dim', '0');
            card.style.filter = '';
          };

          const updateLayout = () => {
            const settings = settingsRef.current;
            const slots = Array.from(inner.children).filter(child => child.hasAttribute('data-stack-slot'));
            if (!settings || !slots.length) return slots;

            const viewHeight = windowed ? window.innerHeight : root.clientHeight;
            const stackTop = resolveOffset(settings.stackPosition, viewHeight);
            const heights = slots.map(slot => slot.offsetHeight);
            const lastPin = stackTop + (slots.length - 1) * settings.itemStackDistance;
            const padTop = windowed ? 0 : stackTop;
            const endHeight =
              settings.holdDistance +
              (windowed ? 0 : Math.max(0, viewHeight - lastPin - heights[heights.length - 1]));

            write('padTop', padTop, value => {
              inner.style.paddingTop = `${value}px`;
            });
            write('endHeight', endHeight, value => {
              end.style.height = `${value}px`;
            });

            return slots;
          };

          const updateTransforms = () => {
            const settings = settingsRef.current;
            const slots = updateLayout();
            if (!settings || !slots.length) return;

            const viewTop = windowed ? 0 : root.getBoundingClientRect().top + root.clientTop;
            const viewHeight = windowed ? window.innerHeight : root.clientHeight;
            const stackTop = resolveOffset(settings.stackPosition, viewHeight);
            const offset = settings.itemStackDistance;
            const tops = slots.map(slot => slot.getBoundingClientRect().top);
            const heights = slots.map(slot => slot.offsetHeight);

            if (reduceMotion) {
              slots.forEach(slot => {
                const card = slot.firstElementChild;
                if (card) resetCard(card);
              });
              return;
            }

            const tiltCap = isMobile
              ? Math.max(0, settings.mobileTiltAmount ?? Math.min(settings.tiltAmount, 18))
              : Math.max(0, settings.tiltAmount);
            const depthPx = isMobile
              ? Math.max(0, settings.mobileDepthAmount ?? Math.min(settings.depthAmount, 90))
              : Math.max(0, settings.depthAmount);
            const liftPx = isMobile
              ? Math.max(0, settings.mobileLiftAmount ?? Math.min(settings.liftAmount, 8))
              : Math.max(0, settings.liftAmount ?? 18);
            const scaleStep = isMobile ? settings.itemScale * 0.55 : settings.itemScale;
            // Keep mobile titles readable — lighter shade overlay than desktop.
            const dimStep = Math.min(Math.max(isMobile ? settings.dimAmount * 0.5 : settings.dimAmount, 0), 1);
            const perspective = isMobile ? 700 : 900;

            const depths = slots.map(() => 0);
            let lastCover = 0;
            for (let j = 1; j < slots.length; j++) {
              const pinBefore = viewTop + stackTop + (j - 1) * offset;
              const start = pinBefore + heights[j - 1];
              const span = Math.max(1, start - pinBefore - offset);
              const cover = easeCover((start - tops[j]) / span);
              for (let i = 0; i < j; i++) depths[i] += cover;
              lastCover = cover;
            }

            slots.forEach((slot, i) => {
              const card = slot.firstElementChild;
              if (!card) return;

              const depth = depths[i];
              // First cover drives the square tip; extra depth keeps older cards further back.
              const fold = Math.min(depth, 1);
              const stack = Math.max(0, depth - 1);
              const scale = Math.max(Math.min(settings.baseScale, 1), 1 - depth * scaleStep);
              // Top-edge hinge: negative rotateX swings the square BACK into the distance.
              // Cap so stacked cards stay readable as tipped panels, not edge-on lines.
              const tilt = -Math.min(fold * tiltCap + stack * tiltCap * 0.22, tiltCap * 1.15);
              const turn = fold * settings.rotationAmount * (i % 2 ? -1 : 1);
              const recess = -(fold * depthPx + stack * depthPx * 0.35);
              const lift = -(fold * liftPx * 0.55 + stack * liftPx * 0.25);
              const blur = depth * settings.blurAmount;
              const dim = 1 - Math.pow(1 - dimStep, depth);

              gsap.set(card, {
                transformOrigin: '50% 0%',
                force3D: true,
                transformPerspective: perspective,
                rotateX: tilt,
                rotateZ: turn,
                y: lift,
                z: recess,
                scale,
                filter: blur > 0.01 ? `blur(${blur.toFixed(2)}px)` : 'none'
              });
              write(`dim${i}`, dim.toFixed(3), value => {
                card.style.setProperty('--scroll-stack-dim', value);
              });
            });

            const done = slots.length > 1 && lastCover >= 0.999;
            if (done !== complete) {
              complete = done;
              if (done) settings.onStackComplete?.();
            }
          };

          const schedule = () => {
            if (!layoutFrame) {
              layoutFrame = requestAnimationFrame(() => {
                layoutFrame = 0;
                updateTransforms();
              });
            }
          };

          // Clear any leftover parent perspective from older builds — it breaks sticky.
          gsap.set(inner, { clearProps: 'perspective,transformStyle' });
          inner.style.perspective = 'none';
          inner.style.webkitPerspective = 'none';

          const slots = Array.from(inner.children).filter(child => child.hasAttribute('data-stack-slot'));
          slots.forEach(slot => {
            const card = slot.firstElementChild;
            if (!card) return;
            gsap.set(card, {
              transformOrigin: '50% 0%',
              force3D: true,
              transformPerspective: isMobile ? 700 : 900,
              rotateX: 0,
              y: 0,
              z: 0,
              scale: 1
            });
          });

          // Drive transforms from scroll progress. ScrollTrigger.scroll events also fire when
          // an existing Lenis instance calls ScrollTrigger.update — no second smooth-scroll.
          const trigger = ScrollTrigger.create({
            trigger: root,
            start: 'top bottom',
            end: 'bottom top',
            invalidateOnRefresh: true,
            onUpdate: schedule,
            onRefresh: schedule
          });

          const onScrollTriggerScroll = () => schedule();
          ScrollTrigger.addEventListener('scroll', onScrollTriggerScroll);

          const scrollTarget = windowed ? window : root;
          scrollTarget.addEventListener('scroll', schedule, { passive: true });
          // Lenis smooth-scrolls the document; native scroll alone can miss frames without this.
          window.addEventListener('resize', schedule, { passive: true });

          const observer = new ResizeObserver(() => {
            schedule();
            ScrollTrigger.refresh();
          });
          observer.observe(root);
          observer.observe(inner);

          updateTransforms();

          return () => {
            cancelAnimationFrame(layoutFrame);
            layoutFrame = 0;
            observer.disconnect();
            trigger.kill();
            ScrollTrigger.removeEventListener('scroll', onScrollTriggerScroll);
            scrollTarget.removeEventListener('scroll', schedule);
            window.removeEventListener('resize', schedule);
            slots.forEach(slot => {
              const card = slot.firstElementChild;
              if (card) resetCard(card);
            });
          };
        }
      );
    }, root);

    return () => {
      cancelAnimationFrame(layoutFrame);
      ctx.revert();
    };
  }, [useWindowScroll, items.length]);

  return (
    <div
      ref={rootRef}
      className={`scroll-stack ${useWindowScroll ? 'scroll-stack--window' : 'scroll-stack--contained'} ${className}`.trim()}
    >
      <div ref={innerRef} className="scroll-stack__inner">
        {items.map((child, index) => {
          const gap = itemDistance - (items.length - index) * itemStackDistance;
          return (
            <Fragment key={isValidElement(child) ? (child.key ?? index) : index}>
              {index > 0 && (
                <div aria-hidden="true" style={{ height: Math.max(0, gap), marginTop: Math.min(0, gap) }} />
              )}
              <div
                data-stack-slot=""
                className="scroll-stack__slot"
                style={{
                  top: `calc(${toLength(stackPosition)} + ${index * itemStackDistance}px)`,
                  marginBottom: (items.length - 1 - index) * itemStackDistance,
                  zIndex: index + 1
                }}
              >
                {child}
              </div>
            </Fragment>
          );
        })}
        <div ref={endRef} className="scroll-stack__end" aria-hidden="true" />
      </div>
    </div>
  );
};

export default ScrollStack;

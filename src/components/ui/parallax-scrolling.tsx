'use client';

import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { usePageLenis } from '@/hooks/usePageLenis';
import './parallax-scrolling.css';

const LAYERS = [
  { layer: '1', yPercent: 70 },
  { layer: '2', yPercent: 55 },
  { layer: '3', yPercent: 62 },
  { layer: '4', yPercent: 8 },
] as const;

const DEFAULT_BACK =
  'https://cdn.21st.dev/assets/mirror/a4/a43f4eae3459c461345ee676f12d6e1ddca65e8a5279a5af00d475b17ff83aea.webp';
const DEFAULT_MID =
  'https://cdn.21st.dev/assets/mirror/50/50ca6a0d36d2780bfcb469d6db7eaec0be7e0d2961ba69a63d2a1473b040338d.webp';
const DEFAULT_FRONT = '/assets/hero/penguin-back.png';

export type ParallaxCta = {
  label: string;
  href: string;
};

export type ParallaxComponentProps = {
  eyebrow?: string;
  title?: string;
  body?: string;
  primaryCta?: ParallaxCta;
  secondaryCta?: ParallaxCta;
  backSrc?: string;
  midSrc?: string;
  frontSrc?: string;
};

function CtaLink({ cta, className, children }: { cta: ParallaxCta; className: string; children: React.ReactNode }) {
  if (/^(https?:|mailto:|tel:)/i.test(cta.href)) {
    return (
      <a className={className} href={cta.href}>
        {children}
      </a>
    );
  }
  return (
    <Link className={className} to={cta.href}>
      {children}
    </Link>
  );
}

export function ParallaxComponent({
  eyebrow = 'AI-powered digital marketing — India',
  title = 'Build your\nbrand',
  body = 'Arcle turns ads, SEO, social, websites and apps into one engine for leads, customers and revenue.',
  primaryCta = { label: 'Start a project', href: '/contact-us' },
  secondaryCta = { label: 'Our services', href: '/services' },
  backSrc = DEFAULT_BACK,
  midSrc = DEFAULT_MID,
  frontSrc = DEFAULT_FRONT,
}: ParallaxComponentProps) {
  const parallaxRef = useRef<HTMLDivElement>(null);
  const lines = title.split('\n').map((line) => line.trim()).filter(Boolean);

  usePageLenis();

  useEffect(() => {
    const root = parallaxRef.current;
    const triggerElement = root?.querySelector<HTMLElement>('[data-parallax-layers]');
    if (!root || !triggerElement) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: triggerElement,
          start: '0% 0%',
          end: '100% 0%',
          scrub: true,
        },
      });

      LAYERS.forEach((layerObj, idx) => {
        const targets = triggerElement.querySelectorAll(`[data-parallax-layer="${layerObj.layer}"]`);
        if (!targets.length) return;
        tl.to(
          targets,
          { yPercent: layerObj.yPercent, ease: 'none' },
          idx === 0 ? undefined : '<'
        );
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <div className="parallax arcle-parallax-hero" ref={parallaxRef}>
      <section className="parallax__header" aria-label="Arcle">
        <div className="parallax__visuals">
          <div className="parallax__black-line-overflow" />
          <div data-parallax-layers className="parallax__layers">
            <img
              src={backSrc}
              loading="eager"
              width={800}
              data-parallax-layer="1"
              alt=""
              className="parallax__layer-img"
            />
            <img
              src={midSrc}
              loading="eager"
              width={800}
              data-parallax-layer="2"
              alt=""
              className="parallax__layer-img"
            />
            <div data-parallax-layer="3" className="parallax__layer-title">
              {eyebrow ? <p className="parallax__eyebrow">{eyebrow}</p> : null}
              <h1 className="parallax__title">
                {lines.map((line, index) => (
                  <span
                    key={line}
                    className={index === lines.length - 1 ? 'parallax__title-line parallax__title-line--accent' : 'parallax__title-line'}
                  >
                    {line}
                  </span>
                ))}
              </h1>
              <div className="parallax__aside">
                {body ? <p className="parallax__body">{body}</p> : null}
                <div className="parallax__ctas">
                  {primaryCta?.label ? (
                    <CtaLink cta={primaryCta} className="parallax__btn">
                      {primaryCta.label}
                    </CtaLink>
                  ) : null}
                  {secondaryCta?.label ? (
                    <CtaLink cta={secondaryCta} className="parallax__link">
                      {secondaryCta.label}
                      <ArrowRight size={16} aria-hidden="true" />
                    </CtaLink>
                  ) : null}
                </div>
              </div>
            </div>
            <img
              src={frontSrc}
              loading="eager"
              width={800}
              data-parallax-layer="4"
              alt=""
              className={`parallax__layer-img parallax__layer-img--front${frontSrc === DEFAULT_FRONT ? ' parallax__layer-img--penguin' : ''}`}
            />
          </div>
          <div className="parallax__scrim" aria-hidden="true" />
          <div className="parallax__fade" />
          <p className="parallax__cue" aria-hidden="true">
            <ArrowRight size={18} style={{ transform: 'rotate(90deg)' }} />
          </p>
        </div>
      </section>
    </div>
  );
}

export default ParallaxComponent;

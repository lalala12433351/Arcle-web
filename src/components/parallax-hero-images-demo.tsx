"use client";
import { ParallaxHeroImages } from "@/components/ui/parallax-hero-images";

export default function ParallaxHeroImagesDemo() {
  return (
    <header className="services-parallax-hero">
      <ParallaxHeroImages
        images={images}
        className="services-parallax-hero__images"
      />
      <h1 className="services-parallax-hero__title">
        BUILT TO GET YOUR BUSINESS MOVING
      </h1>
    </header>
  );
}

const images = [
  "https://assets.aceternity.com/components/hero-section-with-mesh-gradient.webp",
  "https://assets.aceternity.com/components/3d-globe.webp",
  "https://assets.aceternity.com/components/keyboard-2.webp",
  "https://assets.aceternity.com/components/hero-1.webp",
  "https://assets.aceternity.com/components/hero-2.webp",
  "https://assets.aceternity.com/components/hero-3.webp",
];

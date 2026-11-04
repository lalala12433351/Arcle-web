import { useEffect, useRef } from "react";
import * as THREE from "three";

type WovenCanvasProps = {
  className?: string;
  /** Dark page background. Switches blending so the weave stays visible. */
  dark?: boolean;
};

const PARTICLE_COUNT = 50000;

/**
 * Torus-knot point cloud from the woven-light hero.
 * Sized to its container and paused while off screen.
 */
const WovenCanvas = ({ className, dark = false }: WovenCanvasProps) => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    const canvas = renderer.domElement;
    canvas.style.display = "block";
    canvas.style.width = "100%";
    canvas.style.height = "100%";
    mount.appendChild(canvas);

    const positions = new Float32Array(PARTICLE_COUNT * 3);
    const originalPositions = new Float32Array(PARTICLE_COUNT * 3);
    const colors = new Float32Array(PARTICLE_COUNT * 3);
    const velocities = new Float32Array(PARTICLE_COUNT * 3);

    const torusKnot = new THREE.TorusKnotGeometry(1.5, 0.5, 200, 32);
    const knotPositions = torusKnot.attributes.position;
    const knotCount = knotPositions.count;
    const color = new THREE.Color();

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const vertexIndex = i % knotCount;
      const x = knotPositions.getX(vertexIndex);
      const y = knotPositions.getY(vertexIndex);
      const z = knotPositions.getZ(vertexIndex);
      const ix = i * 3;

      positions[ix] = x;
      positions[ix + 1] = y;
      positions[ix + 2] = z;
      originalPositions[ix] = x;
      originalPositions[ix + 1] = y;
      originalPositions[ix + 2] = z;

      color.setHSL(Math.random(), 0.8, dark ? 0.55 : 0.42);
      colors[ix] = color.r;
      colors[ix + 1] = color.g;
      colors[ix + 2] = color.b;
    }

    torusKnot.dispose();

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));

    const material = new THREE.PointsMaterial({
      size: 0.032,
      vertexColors: true,
      blending: dark ? THREE.AdditiveBlending : THREE.NormalBlending,
      transparent: true,
      opacity: dark ? 0.9 : 1,
      depthWrite: false,
    });

    const points = new THREE.Points(geometry, material);
    scene.add(points);

    const mouse = { x: 8, y: 8 };
    const clock = new THREE.Clock();
    let frame = 0;
    let disposed = false;
    let visible = true;

    const resize = () => {
      const width = mount.clientWidth;
      const height = mount.clientHeight;
      if (width === 0 || height === 0) return;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height, false);
    };
    resize();

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(mount);

    const handlePointerMove = (event: PointerEvent) => {
      const rect = mount.getBoundingClientRect();
      const inside =
        event.clientX >= rect.left &&
        event.clientX <= rect.right &&
        event.clientY >= rect.top &&
        event.clientY <= rect.bottom;

      if (!inside || rect.width === 0 || rect.height === 0) {
        mouse.x = 8;
        mouse.y = 8;
        return;
      }

      mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -(((event.clientY - rect.top) / rect.height) * 2 - 1);
    };
    window.addEventListener("pointermove", handlePointerMove);

    const radius = 1.5;
    const radiusSq = radius * radius;

    const renderFrame = () => {
      if (!reduceMotion) {
        const elapsedTime = clock.getElapsedTime();
        const mx = mouse.x * 3;
        const my = mouse.y * 3;

        for (let i = 0; i < PARTICLE_COUNT; i++) {
          const ix = i * 3;
          const iy = ix + 1;
          const iz = ix + 2;

          let vx = velocities[ix];
          let vy = velocities[iy];
          let vz = velocities[iz];
          const px = positions[ix];
          const py = positions[iy];
          const pz = positions[iz];

          const dx = px - mx;
          const dy = py - my;
          const dz = pz;
          const distSq = dx * dx + dy * dy + dz * dz;

          if (distSq < radiusSq && distSq > 1e-8) {
            const dist = Math.sqrt(distSq);
            const force = ((radius - dist) * 0.01) / dist;
            vx += dx * force;
            vy += dy * force;
            vz += dz * force;
          }

          vx += (originalPositions[ix] - px) * 0.001;
          vy += (originalPositions[iy] - py) * 0.001;
          vz += (originalPositions[iz] - pz) * 0.001;

          vx *= 0.95;
          vy *= 0.95;
          vz *= 0.95;

          positions[ix] = px + vx;
          positions[iy] = py + vy;
          positions[iz] = pz + vz;
          velocities[ix] = vx;
          velocities[iy] = vy;
          velocities[iz] = vz;
        }

        geometry.attributes.position.needsUpdate = true;
        points.rotation.y = elapsedTime * 0.05;
      }

      renderer.render(scene, camera);
    };

    const animate = () => {
      if (disposed) return;
      frame = requestAnimationFrame(animate);
      if (!visible) return;
      renderFrame();
    };

    const intersectionObserver = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
    });
    intersectionObserver.observe(mount);

    if (reduceMotion) {
      renderFrame();
    } else {
      animate();
    }

    return () => {
      disposed = true;
      cancelAnimationFrame(frame);
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      window.removeEventListener("pointermove", handlePointerMove);
      geometry.dispose();
      material.dispose();
      renderer.dispose();
      renderer.forceContextLoss();
      canvas.remove();
    };
  }, [dark]);

  return <div ref={mountRef} className={className} aria-hidden="true" />;
};

export default WovenCanvas;

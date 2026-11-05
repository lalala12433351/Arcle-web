import { useEffect, useRef } from "react";
import * as THREE from "three";

type WovenCanvasProps = {
  className?: string;
  /** Dark page background. Switches the sculpture to a light body. */
  dark?: boolean;
};

const PAPER = new THREE.Color("#efeae0");
const ACCENT = new THREE.Color("#236bff");

/**
 * Lit torus knot for the services hero.
 * A thin tube keeps the loops separate; studio light and one blue thread
 * make the form read instead of a flat point cloud.
 */
const WovenCanvas = ({ className, dark = false }: WovenCanvasProps) => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(30, 1, 0.1, 40);
    camera.position.set(0.05, 0.12, 8.05);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = dark ? 1.12 : 1.2;
    renderer.setClearColor(0x000000, 0);

    const canvas = renderer.domElement;
    canvas.style.display = "block";
    canvas.style.width = "100%";
    canvas.style.height = "100%";
    mount.appendChild(canvas);

    const key = new THREE.DirectionalLight(0xfff8ee, dark ? 2.4 : 3.1);
    key.position.set(3.4, 4.6, 5.2);
    const fill = new THREE.DirectionalLight(dark ? 0x9eb0d4 : 0xd5dbe8, 1.15);
    fill.position.set(-3.2, 0.4, 3.4);
    const rim = new THREE.DirectionalLight(0x6ea2ff, dark ? 3.4 : 2.2);
    rim.position.set(-4.2, -1.4, -3.6);
    const bounce = new THREE.DirectionalLight(0xffffff, dark ? 0.35 : 0.7);
    bounce.position.set(0.4, -3.2, 1.6);
    scene.add(key, fill, rim, bounce);
    scene.add(new THREE.AmbientLight(dark ? 0x1c2433 : 0xfffdf8, dark ? 0.35 : 0.42));

    const envScene = new THREE.Scene();
    const room = new THREE.Mesh(
      new THREE.BoxGeometry(10, 10, 10),
      new THREE.MeshBasicMaterial({ color: dark ? 0x16181c : 0xf7f4ec, side: THREE.BackSide }),
    );
    const windowLight = new THREE.Mesh(
      new THREE.PlaneGeometry(4.2, 6),
      new THREE.MeshBasicMaterial({ color: 0xffffff }),
    );
    windowLight.position.set(2.4, 1.6, -3.2);
    const accentPanel = new THREE.Mesh(
      new THREE.PlaneGeometry(2.2, 3.4),
      new THREE.MeshBasicMaterial({ color: 0x236bff }),
    );
    accentPanel.position.set(-2.6, -0.2, 1.4);
    accentPanel.rotation.y = 0.8;
    envScene.add(room, windowLight, accentPanel);

    const pmrem = new THREE.PMREMGenerator(renderer);
    const envMap = pmrem.fromScene(envScene, 0.06).texture;
    scene.environment = envMap;
    pmrem.dispose();

    const geometry = new THREE.TorusKnotGeometry(1.18, 0.3, 360, 48, 2, 3);
    const white = new THREE.DataTexture(new Uint8Array([255, 255, 255, 255]), 1, 1);
    white.colorSpace = THREE.SRGBColorSpace;
    white.needsUpdate = true;

    const time = { value: 0 };
    const material = new THREE.MeshPhysicalMaterial({
      color: dark ? PAPER : new THREE.Color("#12110e"),
      map: white,
      roughness: 0.38,
      metalness: 0.04,
      clearcoat: 0.85,
      clearcoatRoughness: 0.22,
      sheen: 0.7,
      sheenColor: ACCENT,
      sheenRoughness: 0.4,
      envMapIntensity: dark ? 0.45 : 0.22,
    });

    material.onBeforeCompile = (shader) => {
      shader.uniforms.uTime = time;
      shader.fragmentShader = shader.fragmentShader
        .replace("#include <common>", "#include <common>\nuniform float uTime;")
        .replace(
          "#include <color_fragment>",
          /* glsl */ `
          #include <color_fragment>
          float along = vMapUv.y + vMapUv.x * 0.05 - uTime * 0.025;
          float ribbon = smoothstep(0.055, 0.0, abs(fract(along) - 0.2));
          float fiber = 0.88 + 0.12 * cos(vMapUv.x * 40.0 + vMapUv.y * 8.0);
          diffuseColor.rgb *= fiber;
          diffuseColor.rgb = mix(diffuseColor.rgb, vec3(0.137, 0.420, 1.0), ribbon * 0.92);
          `,
        );
    };

    const knot = new THREE.Mesh(geometry, material);
    const group = new THREE.Group();
    group.scale.setScalar(0.74);
    group.rotation.x = 0.48;
    group.rotation.z = -0.08;
    group.add(knot);
    scene.add(group);

    const mouse = { x: 0, y: 0 };
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
        mouse.x = 0;
        mouse.y = 0;
        return;
      }

      mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -(((event.clientY - rect.top) / rect.height) * 2 - 1);
    };
    window.addEventListener("pointermove", handlePointerMove);

    const renderFrame = () => {
      const elapsed = clock.getElapsedTime();
      time.value = reduceMotion ? 0 : elapsed;

      const targetX = 0.48 + mouse.y * 0.16 + (reduceMotion ? 0 : Math.sin(elapsed * 0.35) * 0.05);
      const targetY = 0.35 + mouse.x * 0.28 + (reduceMotion ? 0 : elapsed * 0.18);
      group.rotation.x += (targetX - group.rotation.x) * 0.06;
      group.rotation.y += (targetY - group.rotation.y) * 0.06;

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
      if (visible) clock.getDelta();
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
      white.dispose();
      envMap.dispose();
      room.geometry.dispose();
      (room.material as THREE.Material).dispose();
      windowLight.geometry.dispose();
      (windowLight.material as THREE.Material).dispose();
      accentPanel.geometry.dispose();
      (accentPanel.material as THREE.Material).dispose();
      renderer.dispose();
      renderer.forceContextLoss();
      canvas.remove();
    };
  }, [dark]);

  return <div ref={mountRef} className={className} aria-hidden="true" />;
};

export default WovenCanvas;

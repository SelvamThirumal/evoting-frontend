import { useEffect, useRef } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

export default function HumanGuide() {

  const mountRef = useRef(null);

  useEffect(() => {

    const mount = mountRef.current;
    if (!mount) return;

    // ================= SCENE =================
    const scene = new THREE.Scene();

    // CAMERA
    const camera = new THREE.PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.set(0, 1.5, 5);

    // RENDERER
    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    mount.appendChild(renderer.domElement);

    // LIGHTS
    scene.add(new THREE.AmbientLight(0xffffff, 0.8));

    const light = new THREE.DirectionalLight(0xffffff, 1.5);
    light.position.set(5, 10, 7);
    scene.add(light);

    // ================= MOUSE =================
    let mouseX = 0;
    let mouseY = 0;

    const onMouseMove = (e) => {
      mouseX = (e.clientX / window.innerWidth) * 2 - 1;
      mouseY = -(e.clientY / window.innerHeight) * 2 + 1;
    };

    window.addEventListener("mousemove", onMouseMove);

    // ================= LOAD MODEL =================
    const loader = new GLTFLoader();

    loader.load("/models/human.glb", (gltf) => {

      const model = gltf.scene;

      model.scale.set(1.4, 1.4, 1.4);
      model.position.set(0, -1.5, 0);

      scene.add(model);

      // ==================================================
      // 🪧 SMALL BOARD + STICK — REAL HAND HOLD
      // ==================================================

      const signGroup = new THREE.Group();

      // 🪵 Stick (thin & short)
      const stick = new THREE.Mesh(
        new THREE.CylinderGeometry(0.02, 0.02, 0.9, 16),
        new THREE.MeshStandardMaterial({ color: 0x8b5a2b })
      );

      stick.position.y = 0.45; // bottom at hand
      signGroup.add(stick);

      // 🪧 Very small LOGIN board
      const canvas = document.createElement("canvas");
      canvas.width = 256;
      canvas.height = 128;

      const ctx = canvas.getContext("2d");

      ctx.fillStyle = "#222";
      ctx.fillRect(0, 0, 256, 128);

      ctx.fillStyle = "#ffffff";
      ctx.font = "bold 38px Arial";
      ctx.textAlign = "center";
      ctx.fillText("LOGIN", 128, 75);

      const texture = new THREE.CanvasTexture(canvas);

      const board = new THREE.Mesh(
        new THREE.PlaneGeometry(0.65, 0.32), // 🔥 EXTRA SMALL
        new THREE.MeshBasicMaterial({
          map: texture,
          transparent: true
        })
      );

      board.position.y = 0.9;
      signGroup.add(board);

      // Natural tilt
      signGroup.rotation.z = -0.25;

      // ==================================================
      // 🔥 ATTACH TO RIGHT HAND BONE
      // ==================================================

      let handBone = null;

      model.traverse((child) => {
        if (
          child.isBone &&
          child.name.toLowerCase().includes("hand")
        ) {
          handBone = child;
        }
      });

      if (handBone) {

        handBone.add(signGroup);

        // Position inside palm (TUNE IF NEEDED)
        signGroup.position.set(0.02, 0.04, 0);

      } else {

        // fallback
        signGroup.position.set(0.6, 1.1, 0.3);
        model.add(signGroup);
      }

      // ==================================================
      // MODEL ANIMATION
      // ==================================================

      const mixer = new THREE.AnimationMixer(model);

      if (gltf.animations.length) {
        mixer.clipAction(gltf.animations[0]).play();
      }

      const clock = new THREE.Clock();

      const animate = () => {

        const delta = clock.getDelta();
        mixer.update(delta);

        // Mouse follow X
        model.position.x += (mouseX * 3 - model.position.x) * 0.05;

        // Mouse follow Y
        model.position.y += ((mouseY * 1.5 - 1.5) - model.position.y) * 0.05;

        renderer.render(scene, camera);
        requestAnimationFrame(animate);
      };

      animate();
    });

    // ================= CLEANUP =================
    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      renderer.dispose();
      mount.removeChild(renderer.domElement);
    };

  }, []);

  return (
    <div
      ref={mountRef}
      className="absolute inset-0 pointer-events-none z-10"
    />
  );
}
// A real mesh-based folio. Scroll controls pose; no permanent render loop.
import * as THREE from "../vendor/three/three.module.min.js";

export function createFolio(stage) {
  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(devicePixelRatio, 1.5));
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(34, 1, 0.1, 30);
  camera.position.set(0, 0, 7.8);
  scene.add(new THREE.HemisphereLight(0xffffff, 0x62715b, 2.4));
  const key = new THREE.DirectionalLight(0xffffff, 3);
  key.position.set(-3, 5, 6);
  scene.add(key);
  const group = new THREE.Group();
  scene.add(group);
  const resources = [];
  const own = (value) => {
    resources.push(value);
    return value;
  };
  const textureCanvas = document.createElement("canvas");
  textureCanvas.width = 768;
  textureCanvas.height = 1024;
  const ctx = textureCanvas.getContext("2d");
  ctx.fillStyle = "#283e34";
  ctx.fillRect(0, 0, 768, 1024);
  ctx.fillStyle = "#e4e8d7";
  ctx.font = "52px Arial";
  ctx.fillText("INDEX", 60, 110);
  ctx.font = "17px Arial";
  ctx.fillText("Architecture & place", 60, 150);
  ctx.strokeStyle = "#bacbad";
  ctx.lineWidth = 2;
  for (let i = 0; i < 9; i++) {
    ctx.beginPath();
    ctx.moveTo(100 + i * 28, 720);
    ctx.lineTo(384, 285 + i * 9);
    ctx.lineTo(668 - i * 28, 720);
    ctx.stroke();
  }
  ctx.font = "22px Arial";
  ctx.fillText("Spaces for what comes next.", 60, 910);
  ctx.font = "15px Arial";
  ctx.fillText("01 / 26", 650, 970);
  const texture = own(new THREE.CanvasTexture(textureCanvas));
  texture.colorSpace = THREE.SRGBColorSpace;
  const coverMat = own(
    new THREE.MeshStandardMaterial({ color: 0x283e34, roughness: 0.8 }),
  );
  const faceMat = own(
    new THREE.MeshStandardMaterial({ map: texture, roughness: 0.9 }),
  );
  const paperMat = own(
    new THREE.MeshStandardMaterial({ color: 0xeeeade, roughness: 1 }),
  );
  const coverGeo = own(new THREE.BoxGeometry(2.5, 3.35, 0.055));
  const pagesGeo = own(new THREE.BoxGeometry(2.4, 3.24, 0.045));
  const covers = [];
  const pages = [];
  for (let i = 0; i < 2; i++) {
    const mesh = new THREE.Mesh(coverGeo, [
      coverMat,
      coverMat,
      coverMat,
      coverMat,
      i === 1 ? faceMat : coverMat,
      coverMat,
    ]);
    group.add(mesh);
    covers.push(mesh);
  }
  for (let i = 0; i < 9; i++) {
    const page = new THREE.Mesh(pagesGeo, paperMat);
    group.add(page);
    pages.push(page);
  }
  renderer.domElement.setAttribute("aria-hidden", "true");
  stage.append(renderer.domElement);
  let dead = false;
  function render(p) {
    if (
      dead ||
      document.hidden ||
      matchMedia(
        "(max-width:700px), (max-height:540px), (prefers-reduced-motion:reduce)",
      ).matches
    )
      return;
    const rect = stage.getBoundingClientRect();
    if (rect.bottom < 0 || rect.top > innerHeight) return;
    const width = stage.clientWidth,
      height = stage.clientHeight;
    renderer.setSize(width, height, false);
    camera.aspect = width / height;
    camera.position.z = camera.aspect < 1.3 ? 10 : 7.8;
    camera.updateProjectionMatrix();
    const q = p * p * (3 - 2 * p),
      gap = 0.055 + (1 - q) * 0.16;
    pages.forEach((page, i) => {
      page.position.z = (i - 4) * gap;
      page.position.x = (1 - q) * 0.05 * (i - 4);
    });
    covers[0].position.z = -5 * gap;
    covers[1].position.z = 5 * gap;
    group.rotation.set(-0.24 + 0.12 * q, -0.58 + 0.82 * q, -0.1 + 0.06 * q);
    renderer.render(scene, camera);
    stage.classList.add("is-3d");
  }
  function dispose() {
    if (dead) return;
    dead = true;
    stage.classList.remove("is-3d");
    renderer.domElement.removeEventListener("webglcontextlost", lost);
    resources.forEach((resource) => resource.dispose());
    renderer.dispose();
    renderer.domElement.remove();
  }
  function lost(e) {
    e.preventDefault();
    dispose();
    stage.dispatchEvent(new Event("rendererfailure"));
  }
  renderer.domElement.addEventListener("webglcontextlost", lost);
  return { render, dispose };
}

const root = document.documentElement;
const stage = document.querySelector(".stage");
const story = document.querySelector(".story");
const canvas = document.querySelector("#scene");
const reduced = matchMedia("(prefers-reduced-motion: reduce)");
const compact = matchMedia("(max-width: 760px)");
const angle = document.querySelector("#angle");
const status = document.querySelector("#viewer-status");
const clamp = (n) => Math.max(0, Math.min(1, n));
const phase = (p, a, b) => clamp((p - a) / (b - a));
const ease = (t) => t * t * (3 - 2 * t);
let renderer, scene, camera, model, shell, drivers, grille, shellMaterial;
let frame = 0,
  sectionTop = 0,
  travel = 1,
  progress = 0,
  enabled = false,
  visible = true;
let resizeObserver, intersectionObserver;
const ownedTextures = new Set();
const finishes = { clay: 0xc4512d, chalk: 0xd6cebc, ink: 0x343e42 };

function measure() {
  sectionTop = story.getBoundingClientRect().top + scrollY;
  travel = Math.max(1, story.offsetHeight - stage.offsetHeight);
  if (renderer) {
    const bounds = canvas.parentElement.getBoundingClientRect();
    renderer.setSize(bounds.width, bounds.height, false);
    camera.aspect = bounds.width / Math.max(1, bounds.height);
    camera.fov = compact.matches ? 48 : 34;
    camera.updateProjectionMatrix();
  }
  schedule();
}
function mode() {
  root.classList.toggle(
    "motion",
    enabled && !reduced.matches && !compact.matches,
  );
  measure();
}
function schedule() {
  if (!frame && enabled) frame = requestAnimationFrame(render);
}
function render() {
  frame = 0;
  if (!enabled || document.hidden || !visible) return;
  progress = root.classList.contains("motion")
    ? clamp((scrollY - sectionTop) / travel)
    : 0;
  const open =
    ease(phase(progress, 0.16, 0.36)) * (1 - ease(phase(progress, 0.59, 0.8)));
  shell.position.z = -open * 0.95;
  drivers.position.z = open * 0.4;
  grille.position.z = open * 1.6;
  model.rotation.y =
    -0.16 +
    open * 0.1 +
    ease(phase(progress, 0.64, 0.86)) * 0.28 +
    (+angle.value * Math.PI) / 180;
  model.rotation.x = 0.015;
  const titles = [
    document.querySelector("h1"),
    ...document.querySelectorAll(".scene-headings p"),
  ];
  const notes = [...document.querySelectorAll(".copy-notes p")];
  const beat = progress < 0.22 ? 0 : progress < 0.73 ? 1 : 2;
  titles.forEach((title, i) => {
    title.style.opacity = i === beat ? 1 : 0;
  });
  notes.forEach((note, i) => {
    note.style.opacity = i === beat ? 1 : 0;
  });
  document.querySelector(".part-caption").textContent = [
    "A familiar shape. A new perspective.",
    "Shell. Drivers. Grille. Every layer belongs.",
    "Back together. Down to the last detail.",
  ][beat];
  document.querySelector(".scene-number").textContent = `0${beat + 1} — 03`;
  document.querySelector(".progress i").style.transform = `scaleX(${progress})`;
  renderer.render(scene, camera);
}
function fail() {
  enabled = false;
  cancelAnimationFrame(frame);
  frame = 0;
  root.classList.remove("ready", "motion");
  document.querySelector("h1").style.opacity = 1;
  document
    .querySelectorAll(".scene-headings p")
    .forEach((p) => (p.style.opacity = 0));
  document
    .querySelectorAll(".copy-notes p")
    .forEach((p, i) => (p.style.opacity = i ? 0 : 1));
  document
    .querySelectorAll(".finish,#angle")
    .forEach((control) => (control.disabled = true));
  document.querySelectorAll(".finish").forEach((button) => {
    const selected = button.dataset.finish === "clay";
    button.classList.toggle("active", selected);
    button.setAttribute("aria-pressed", String(selected));
  });
  angle.value = 0;
  document.querySelector("#angle-value").textContent = "0°";
  status.textContent =
    "Showing a still view in Clay. Interactive 3D is unavailable.";
  document.querySelector("#reload").hidden = false;
}
function dispose() {
  enabled = false;
  cancelAnimationFrame(frame);
  frame = 0;
  resizeObserver?.disconnect();
  intersectionObserver?.disconnect();
  const geometries = new Set(),
    materials = new Set();
  scene?.traverse((object) => {
    if (object.geometry) geometries.add(object.geometry);
    if (object.material)
      (Array.isArray(object.material)
        ? object.material
        : [object.material]
      ).forEach((m) => materials.add(m));
  });
  geometries.forEach((g) => g.dispose());
  materials.forEach((m) => m.dispose());
  ownedTextures.forEach((t) => t.dispose());
  renderer?.dispose();
}

async function init() {
  const T = await import("./vendor/three.module.js");
  renderer = new T.WebGLRenderer({
    canvas,
    alpha: true,
    antialias: true,
    powerPreference: "low-power",
  });
  renderer.setPixelRatio(Math.min(devicePixelRatio, 1.6));
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = T.PCFShadowMap;
  renderer.outputColorSpace = T.SRGBColorSpace;
  renderer.toneMapping = T.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.15;
  scene = new T.Scene();
  camera = new T.PerspectiveCamera(34, 1, 0.1, 100);
  camera.position.set(6.8, 4.4, 9);
  camera.lookAt(0, 0, 0);
  scene.add(new T.HemisphereLight(0xfff7e8, 0x7e827b, 2.4));
  const key = new T.DirectionalLight(0xfff6df, 3.2);
  key.position.set(-3, 7, 6);
  key.castShadow = true;
  key.shadow.mapSize.set(1024, 1024);
  key.shadow.camera.left = -7;
  key.shadow.camera.right = 7;
  key.shadow.camera.top = 7;
  key.shadow.camera.bottom = -7;
  key.shadow.normalBias = 0.035;
  key.shadow.bias = -0.0001;
  key.shadow.radius = 5;
  scene.add(key);
  const rim = new T.DirectionalLight(0xffffff, 1.8);
  rim.position.set(6, 4, -4);
  scene.add(rim);
  model = new T.Group();
  model.position.set(0.25, 0.05, 0);
  scene.add(model);
  shell = new T.Group();
  drivers = new T.Group();
  grille = new T.Group();
  model.add(shell, drivers, grille);
  shellMaterial = new T.MeshStandardMaterial({
    color: finishes.clay,
    roughness: 0.44,
    metalness: 0.12,
  });
  const dark = new T.MeshStandardMaterial({
    color: 0x202320,
    roughness: 0.58,
    metalness: 0.15,
  });
  const rubber = new T.MeshStandardMaterial({
    color: 0x222724,
    roughness: 0.88,
  });
  const brushed = new T.MeshStandardMaterial({
    color: 0xa9a99c,
    roughness: 0.3,
    metalness: 0.65,
  });
  function rounded(w, h, r) {
    const shape = new T.Shape();
    const x = -w / 2,
      y = -h / 2;
    shape.moveTo(x + r, y);
    shape.lineTo(x + w - r, y);
    shape.quadraticCurveTo(x + w, y, x + w, y + r);
    shape.lineTo(x + w, y + h - r);
    shape.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
    shape.lineTo(x + r, y + h);
    shape.quadraticCurveTo(x, y + h, x, y + h - r);
    shape.lineTo(x, y + r);
    shape.quadraticCurveTo(x, y, x + r, y);
    return shape;
  }
  function solid(w, h, d, r, material, parent, z = 0) {
    const geometry = new T.ExtrudeGeometry(rounded(w, h, r), {
      depth: d,
      bevelEnabled: true,
      bevelSegments: 3,
      steps: 1,
      bevelSize: 0.045,
      bevelThickness: 0.045,
      curveSegments: 10,
    });
    geometry.translate(0, 0, -d / 2);
    const mesh = new T.Mesh(geometry, material);
    mesh.position.z = z;
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    parent.add(mesh);
    return mesh;
  }
  const outline = rounded(4.6, 2.65, 0.26);
  outline.holes.push(rounded(4.2, 2.25, 0.16));
  const caseGeometry = new T.ExtrudeGeometry(outline, {
    depth: 1.9,
    bevelEnabled: true,
    bevelSegments: 3,
    bevelSize: 0.035,
    bevelThickness: 0.035,
    curveSegments: 12,
  });
  caseGeometry.translate(0, 0, -0.95);
  const cabinet = new T.Mesh(caseGeometry, shellMaterial);
  cabinet.castShadow = true;
  cabinet.receiveShadow = true;
  shell.add(cabinet);
  solid(4.43, 2.48, 0.11, 0.2, shellMaterial, shell, -0.93);
  solid(3.8, 1.86, 0.045, 0.14, dark, shell, -1.015);
  // Dial, index mark, and small top power button share the shell's pose.
  const dial = new T.Mesh(
    new T.CylinderGeometry(0.24, 0.24, 0.18, 64),
    brushed,
  );
  dial.position.set(1.35, 1.46, -0.25);
  dial.castShadow = true;
  shell.add(dial);
  for (let i = 0; i < 36; i++) {
    const rib = new T.Mesh(new T.BoxGeometry(0.014, 0.145, 0.014), dark);
    rib.position.set(
      1.35 + Math.cos((i / 36) * Math.PI * 2) * 0.235,
      1.46,
      -0.25 + Math.sin((i / 36) * Math.PI * 2) * 0.235,
    );
    shell.add(rib);
  }
  const index = new T.Mesh(new T.BoxGeometry(0.018, 0.006, 0.1), dark);
  index.position.set(1.35, 1.556, -0.32);
  shell.add(index);
  const power = new T.Mesh(
    new T.CylinderGeometry(0.075, 0.075, 0.035, 24),
    dark,
  );
  power.position.set(0.73, 1.36, -0.25);
  shell.add(power);
  for (const x of [-1.62, 1.62])
    for (const z of [-0.58, 0.58]) {
      const foot = new T.Mesh(
        new T.CylinderGeometry(0.18, 0.19, 0.2, 24),
        rubber,
      );
      foot.position.set(x, -1.46, z);
      foot.castShadow = true;
      shell.add(foot);
    }
  solid(4.17, 2.2, 0.1, 0.12, dark, drivers, 0.52);
  for (const x of [-1.08, 1.08]) {
    const surround = new T.Mesh(
      new T.TorusGeometry(0.79, 0.065, 12, 64),
      rubber,
    );
    surround.position.set(x, 0, 0.71);
    drivers.add(surround);
    const cone = new T.Mesh(
      new T.CylinderGeometry(0.72, 0.4, 0.21, 64, 1, false),
      new T.MeshStandardMaterial({ color: 0x44483f, roughness: 0.8 }),
    );
    cone.rotation.x = Math.PI / 2;
    cone.position.set(x, 0, 0.67);
    cone.castShadow = true;
    drivers.add(cone);
    const center = new T.Mesh(new T.SphereGeometry(0.24, 32, 16), dark);
    center.scale.z = 0.5;
    center.position.set(x, 0, 0.84);
    drivers.add(center);
    for (let i = 0; i < 4; i++) {
      const bolt = new T.Mesh(
        new T.CylinderGeometry(0.027, 0.027, 0.04, 12),
        brushed,
      );
      bolt.rotation.x = Math.PI / 2;
      bolt.position.set(
        x + Math.cos(Math.PI / 4 + (i * Math.PI) / 2) * 0.98,
        Math.sin(Math.PI / 4 + (i * Math.PI) / 2) * 0.98,
        0.6,
      );
      drivers.add(bolt);
    }
  }
  const textureCanvas = document.createElement("canvas");
  textureCanvas.width = textureCanvas.height = 256;
  const ctx = textureCanvas.getContext("2d");
  ctx.fillStyle = "#676960";
  ctx.fillRect(0, 0, 256, 256);
  ctx.fillStyle = "#141b16";
  for (let y = 0; y < 256; y += 8)
    for (let x = 0; x < 256; x += 8) {
      ctx.beginPath();
      ctx.arc(x + (y % 16 ? 4 : 0), y, 2.25, 0, Math.PI * 2);
      ctx.fill();
    }
  const texture = new T.CanvasTexture(textureCanvas);
  texture.colorSpace = T.SRGBColorSpace;
  texture.wrapS = texture.wrapT = T.RepeatWrapping;
  texture.repeat.set(2.5, 1.5);
  ownedTextures.add(texture);
  const grillMaterial = new T.MeshStandardMaterial({
    color: 0xbdbcb1,
    map: texture,
    bumpMap: texture,
    bumpScale: 0.012,
    roughness: 0.7,
    metalness: 0.26,
  });
  const grilleFace = solid(
    4.31,
    2.35,
    0.065,
    0.18,
    grillMaterial,
    grille,
    1.03,
  );
  const positions = grilleFace.geometry.attributes.position;
  const uv = grilleFace.geometry.attributes.uv;
  for (let i = 0; i < positions.count; i++) {
    uv.setXY(i, positions.getX(i) / 4.31 + 0.5, positions.getY(i) / 2.35 + 0.5);
  }
  uv.needsUpdate = true;
  const labelCanvas = document.createElement("canvas");
  labelCanvas.width = 256;
  labelCanvas.height = 64;
  const labelContext = labelCanvas.getContext("2d");
  labelContext.font = "bold 43px Arial";
  labelContext.fillStyle = "#e5e0cf";
  labelContext.fillText("relay", 10, 46);
  const labelTexture = new T.CanvasTexture(labelCanvas);
  labelTexture.colorSpace = T.SRGBColorSpace;
  ownedTextures.add(labelTexture);
  const label = new T.Mesh(
    new T.PlaneGeometry(0.65, 0.16),
    new T.MeshBasicMaterial({
      map: labelTexture,
      transparent: true,
      depthWrite: false,
    }),
  );
  label.position.set(1.66, -0.9, 1.117);
  grille.add(label);
  const ground = new T.Mesh(
    new T.PlaneGeometry(200, 200),
    new T.ShadowMaterial({ opacity: 0.16 }),
  );
  ground.rotation.x = -Math.PI / 2;
  ground.position.y = -1.56;
  ground.receiveShadow = true;
  scene.add(ground);
  enabled = true;
  root.classList.add("ready");
  document
    .querySelectorAll(".finish,#angle")
    .forEach((control) => (control.disabled = false));
  status.textContent = "Use the finish controls or adjust the viewing angle.";
  resizeObserver = new ResizeObserver(measure);
  resizeObserver.observe(canvas.parentElement);
  intersectionObserver = new IntersectionObserver(
    (entries) => {
      visible = entries[0].isIntersecting;
      if (visible) schedule();
    },
    { rootMargin: "100px" },
  );
  intersectionObserver.observe(stage);
  mode();
  // Progressive pinning changes document height after native scroll restoration.
  // Restore this page's last position only on reload/history navigation.
  try {
    const navigation = performance.getEntriesByType("navigation")[0]?.type;
    const saved = sessionStorage.getItem("relay-scroll");
    if (saved !== null && ["reload", "back_forward"].includes(navigation)) {
      scrollTo(0, Number(saved));
      schedule();
    }
  } catch {
    /* Storage may be unavailable; native navigation remains usable. */
  }
}
addEventListener("scroll", schedule, { passive: true });
addEventListener("resize", measure);
addEventListener("pageshow", measure);
document.addEventListener("visibilitychange", schedule);
reduced.addEventListener("change", mode);
compact.addEventListener("change", mode);
angle.addEventListener("input", () => {
  document.querySelector("#angle-value").textContent = `${angle.value}°`;
  schedule();
});
document.querySelectorAll(".finish").forEach((button) =>
  button.addEventListener("click", () => {
    if (!enabled) return;
    shellMaterial.color.setHex(finishes[button.dataset.finish]);
    document.querySelectorAll(".finish").forEach((item) => {
      item.classList.toggle("active", item === button);
      item.setAttribute("aria-pressed", String(item === button));
    });
    status.textContent = `${button.textContent.trim()} finish selected. Return to the object to inspect it.`;
    schedule();
  }),
);
canvas.addEventListener("webglcontextlost", (event) => {
  event.preventDefault();
  fail();
});
document
  .querySelector("#reload")
  .addEventListener("click", () => location.reload());
addEventListener("pagehide", (event) => {
  try {
    sessionStorage.setItem("relay-scroll", String(scrollY));
  } catch {}
  if (!event.persisted) dispose();
});
init().catch(() => {
  dispose();
  fail();
});

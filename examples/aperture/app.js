// One scroll owner. Every rendered property is a pure function of progress.
const root = document.documentElement;
const story = document.querySelector(".story");
const stage = document.querySelector(".stage");
const parts = [...document.querySelectorAll(".part")];
const captions = [...document.querySelectorAll(".caption")];
const rays = document.querySelector("#rays");
const labels = document.querySelector("#labels");
const counter = document.querySelector(".counter");
const bar = document.querySelector(".progress i");
const preference = matchMedia("(prefers-reduced-motion: reduce)");
const narrow = matchMedia("(max-width: 600px)");
const clamp = (n) => Math.max(0, Math.min(1, n));
const phase = (p, a, b) => clamp((p - a) / (b - a));
const smooth = (t) => t * t * (3 - 2 * t);
let sectionTop = 0,
  travel = 1,
  frame = 0;

function pose(p) {
  parts.forEach((part, i) => {
    const t = smooth(phase(p, 0.12 + i * 0.018, 0.59 + i * 0.018));
    const x = +part.dataset.x + (+part.dataset.final - part.dataset.x) * t;
    part.style.transform = `translateX(${x}px)`;
  });
  labels.style.opacity = 1 - phase(p, 0.08, 0.2);
  rays.style.opacity = phase(p, 0.72, 0.88);
  const beat = p < 0.33 ? 0 : p < 0.72 ? 1 : 2;
  captions.forEach((caption, i) => {
    caption.style.opacity = i === beat ? 1 : 0;
  });
  counter.textContent = `0${beat + 1} / 03`;
  bar.style.transform = `scaleX(${p})`;
}
function render() {
  frame = 0;
  if (!document.hidden)
    pose(
      preference.matches || narrow.matches
        ? 1
        : clamp((scrollY - sectionTop) / travel),
    );
}
function schedule() {
  if (!frame) frame = requestAnimationFrame(render);
}
function measure() {
  sectionTop = story.getBoundingClientRect().top + scrollY;
  travel = Math.max(1, story.offsetHeight - stage.offsetHeight);
  schedule();
}
function mode() {
  root.classList.toggle("motion", !preference.matches && !narrow.matches);
  document
    .querySelector(".scene svg")
    .setAttribute(
      "viewBox",
      narrow.matches ? "360 95 490 390" : "0 0 1200 550",
    );
  measure();
}
addEventListener("scroll", schedule, { passive: true });
addEventListener("resize", measure);
addEventListener("pageshow", measure);
document.addEventListener("visibilitychange", schedule);
preference.addEventListener("change", mode);
narrow.addEventListener("change", mode);
new ResizeObserver(measure).observe(stage);
mode();

const reduce = matchMedia("(prefers-reduced-motion: reduce)");
document.querySelectorAll(":disabled").forEach((control) => {
  control.disabled = false;
});
document.querySelectorAll(".case-toggle").forEach((button) => {
  button.addEventListener("click", () => {
    const expanded = button.getAttribute("aria-expanded") === "true";
    button.setAttribute("aria-expanded", String(!expanded));
    document.getElementById(button.getAttribute("aria-controls")).hidden =
      expanded;
    button.querySelector("span").textContent = expanded ? "+" : "−";
  });
});
const form = document.getElementById("brief-form");
const requiredText = ["project-name", "project-detail"].map((id) =>
  document.getElementById(id),
);
requiredText.forEach((field) =>
  field.addEventListener("input", () => {
    field.setCustomValidity("");
    document.getElementById("brief-status").textContent = "";
  }),
);
form.addEventListener("submit", (event) => {
  event.preventDefault();
  for (const field of requiredText) {
    field.setCustomValidity(
      field.value.trim() ? "" : "Please add a few words here.",
    );
  }
  if (!form.reportValidity()) return;
  const data = new FormData(form);
  const content = `PROJECT BRIEF\n\nProject: ${data.get("project").trim()}\nFocus: ${data.get("type")}\n\nThe idea\n${data.get("detail").trim()}\n\nThings to consider next\n- Who is this for?\n- What needs to change?\n- What should the finished work include?\n- What are the timing and budget constraints?\n\nPrepared locally with the Format studio concept. Nothing was submitted.\n`;
  const url = URL.createObjectURL(
    new Blob([content], { type: "text/plain;charset=utf-8" }),
  );
  const link = document.createElement("a");
  link.href = url;
  link.download = "format-project-brief.txt";
  document.body.append(link);
  link.click();
  link.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
  document.getElementById("brief-status").textContent =
    "Your brief is ready. Check your downloads; you can edit it and download again.";
});
const svg = document.getElementById("registration-art");
const inkA = document.getElementById("ink-a");
const inkB = document.getElementById("ink-b");
const stamp = document.getElementById("finish-stamp");
const check = document.getElementById("finish-check");
const replay = document.getElementById("replay");
let frame = 0,
  running = false;
const clamp = (x) => Math.max(0, Math.min(1, x));
const phase = (p, a, b) => {
  const t = clamp((p - a) / (b - a));
  return t * t * (3 - 2 * t);
};
function pose(p) {
  const withdraw = phase(p, 0, 0.17),
    arrive = phase(p, 0.49, 0.73);
  const scale = 1 - withdraw + arrive;
  const separation = phase(p, 0.12, 0.35) - phase(p, 0.35, 0.62);
  inkA.setAttribute(
    "transform",
    `translate(${-16 * separation} ${-5 * separation})`,
  );
  inkB.setAttribute(
    "transform",
    `translate(${16 * separation} ${5 * separation})`,
  );
  stamp.setAttribute(
    "transform",
    `translate(166 127) scale(${scale}) translate(-166 -127)`,
  );
  const drawn = 1 - phase(p, 0, 0.1) + phase(p, 0.7, 0.89);
  check.style.strokeDasharray = "1";
  check.style.strokeDashoffset = 1 - drawn;
}
function settle() {
  cancelAnimationFrame(frame);
  frame = 0;
  running = false;
  pose(1);
  svg.dataset.motion = "settled";
}
function play() {
  if (running || document.hidden) return;
  if (reduce.matches) {
    settle();
    document.getElementById("motion-status").textContent =
      "The print layers are aligned. Animation is reduced to a still.";
    return;
  }
  running = true;
  svg.dataset.motion = "running";
  const start = performance.now();
  const step = (now) => {
    const p = Math.min(1, (now - start) / 2200);
    pose(p);
    if (p < 1) frame = requestAnimationFrame(step);
    else {
      settle();
    }
  };
  frame = requestAnimationFrame(step);
}
replay.addEventListener("click", play);
replay.addEventListener("focus", play);
svg.parentElement.addEventListener("pointerenter", (event) => {
  if (event.pointerType === "mouse" || event.pointerType === "pen") play();
});
window.addEventListener("pagehide", settle);
reduce.addEventListener("change", settle);
document.addEventListener("visibilitychange", () => {
  if (document.hidden) settle();
});
new IntersectionObserver(
  (entries) => {
    if (!entries[0].isIntersecting) settle();
  },
  { threshold: 0 },
).observe(svg);
settle();

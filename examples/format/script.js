import { scrollScene, illustrations, download } from "../shared/motion.js";
document.querySelectorAll(":disabled").forEach((el) => (el.disabled = false));
document.querySelectorAll(".case-toggle").forEach((button) =>
  button.addEventListener("click", () => {
    const expanded = button.getAttribute("aria-expanded") === "true";
    button.setAttribute("aria-expanded", String(!expanded));
    document.getElementById(button.getAttribute("aria-controls")).hidden =
      expanded;
    button.querySelector("span").textContent = expanded ? "+" : "−";
  }),
);
const form = document.querySelector("form");
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const name = form.elements.name,
    notes = form.elements.notes;
  for (const field of [name, notes]) {
    field.setCustomValidity(
      field.value.trim() ? "" : "Please add a few words.",
    );
  }
  if (!form.reportValidity()) return;
  download(
    `FORMAT — PROJECT BRIEF\n\nProject: ${name.value.trim()}\nScope: ${form.elements.type.value}\n\n${notes.value.trim()}\n\nCreated locally. Not submitted to a studio.\n`,
    "format-project-brief.txt",
  );
  document.querySelector("#brief-status").textContent =
    "Your brief has been downloaded.";
});
form.addEventListener("input", (e) => {
  if (e.target.setCustomValidity) e.target.setCustomValidity("");
  document.querySelector("#brief-status").textContent = "";
});
scrollScene(document.querySelector(".design-story"), (p) => {
  const q = p * p * (3 - 2 * p);
  document
    .querySelectorAll(".system-mark path")
    .forEach((path, i) =>
      path.setAttribute(
        "transform",
        `translate(${(i - 4) * 17 * (1 - q)},${Math.abs(i - 4) * 7 * (1 - q)})`,
      ),
    );
  const shift = Math.min(
    110,
    document.querySelector(".system-stage").clientWidth * 0.18,
  );
  document.querySelector(".system-mark").style.transform =
    `translate(${-shift * q}px,${-10 * q}px) scale(${1 - 0.13 * q})`;
  document.querySelector(".construction-grid").style.opacity = String(
    1 - 0.88 * q,
  );
  for (const selector of [
    ".system-word",
    ".system-caption",
    ".system-number",
    ".system-rule",
  ]) {
    const el = document.querySelector(selector);
    el.style.opacity = String(Math.max(0, (p - 0.3) / 0.7));
    el.style.transform = `translateY(${20 * (1 - q)}px)`;
  }
  document
    .querySelectorAll(".story-progress i")
    .forEach(
      (el, i) =>
        (el.style.transform = `scaleX(${Math.max(0, Math.min(1, p * 2 - i))})`),
    );
});
illustrations();

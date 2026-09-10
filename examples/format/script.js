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
const story = document.querySelector(".design-story");
const stage = document.querySelector(".system-stage");
let folio = null,
  disposed = false;
scrollScene(
  story,
  (p) => {
    folio?.render(p);
    document.querySelectorAll(".story-progress i").forEach((el, i) => {
      el.style.transform = `scaleX(${Math.max(0, Math.min(1, p * 2 - i))})`;
    });
  },
  () => Boolean(folio),
);
const observer = new IntersectionObserver(
  async ([entry]) => {
    if (!entry.isIntersecting) return;
    observer.disconnect();
    try {
      const { createFolio } = await import("./folio.js");
      if (disposed) return;
      folio = createFolio(stage);
      story.dispatchEvent(new Event("scenechange"));
    } catch {
      folio = null;
      story.dispatchEvent(new Event("scenechange"));
    }
  },
  { rootMargin: "600px" },
);
observer.observe(stage);
stage.addEventListener("rendererfailure", () => {
  folio = null;
  story.dispatchEvent(new Event("scenechange"));
});
addEventListener("pagehide", (e) => {
  if (!e.persisted) {
    disposed = true;
    observer.disconnect();
    folio?.dispose();
    folio = null;
  }
});
illustrations();

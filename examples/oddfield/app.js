"use strict";
const reduce = matchMedia("(prefers-reduced-motion: reduce)");
const filterAnimations = new Map();
const projects = {
  yuzu: {
    name: "Yuzu Club",
    category: "Strategy / Identity / Packaging",
    description:
      "A sparkling-tea identity that feels as bright as the first sip. A self-initiated exploration of a playful, grown-up drinks brand.",
    question: "How can a drink feel optimistic without looking disposable?",
    direction:
      "Warm yellow, a deep burgundy wordmark, and a small family of circles. A flexible identity carried through a sculptural packaging still life.",
  },
  night: {
    name: "Night School",
    category: "Identity / Art direction",
    description:
      "A visual identity for an imagined after-hours culture programme. The energy lives in the typography, the rhythm, and the unexpected.",
    question:
      "What would a cultural space look like if curiosity set the rules?",
    direction:
      "Compressed letterforms, a restless asterisk, and one vivid orange. A simple system with room for changing voices and formats.",
  },
  still: {
    name: "Still",
    category: "Digital / Product direction",
    description:
      "A digital wellbeing concept with room to breathe. The mockup explores a clear hierarchy, gentle color, and a quiet listening ritual; it is not a working audio product.",
    question:
      "Can an interface invite attention without asking for more of it?",
    direction:
      "A single starting point, landscape-inspired geometry, and a familiar player. The concept focuses on the tone and structure of the experience.",
  },
};
const dialog = document.querySelector("#project-dialog");
document.querySelectorAll("[data-filter]").forEach((button) =>
  button.addEventListener("click", () => {
    const type = button.dataset.filter;
    let count = 0;
    document
      .querySelectorAll("[data-filter]")
      .forEach((item) =>
        item.setAttribute("aria-pressed", String(item === button)),
      );
    document.querySelectorAll(".project").forEach((item) => {
      item.hidden = type !== "all" && item.dataset.category !== type;
      filterAnimations.get(item)?.cancel();
      if (!item.hidden) {
        count++;
        if (!reduce.matches)
          filterAnimations.set(
            item,
            item.animate(
              [
                { opacity: 0.4, transform: "translateY(7px)" },
                { opacity: 1, transform: "translateY(0)" },
              ],
              { duration: 260, easing: "cubic-bezier(.22,1,.36,1)" },
            ),
          );
      }
    });
    document.querySelector("#work-status").textContent =
      `${count} ${count === 1 ? "project" : "projects"}`;
  }),
);
document.querySelectorAll("[data-project]").forEach((button) =>
  button.addEventListener("click", () => {
    const project = projects[button.dataset.project];
    document.querySelector("#project-title").textContent = project.name;
    document.querySelector("#project-category").textContent = project.category;
    document.querySelector("#project-description").textContent =
      project.description;
    document.querySelector("#project-question").textContent = project.question;
    document.querySelector("#project-direction").textContent =
      project.direction;
    const visual = document.querySelector("#dialog-visual");
    visual.replaceChildren();
    if (button.dataset.project === "yuzu") {
      const image = document.createElement("img");
      image.src = "yuzu-club.webp";
      image.alt =
        "Yuzu Club yellow cans with burgundy typography on a lavender set";
      image.width = 1536;
      image.height = 1024;
      visual.append(image);
    } else {
      const image = document.createElement("div");
      image.className = button.className;
      for (const child of button.children) image.append(child.cloneNode(true));
      image.setAttribute("aria-hidden", "true");
      visual.append(image);
    }
    dialog.showModal();
  }),
);
const briefDialog = document.querySelector("#brief-dialog");
document
  .querySelector("[data-open-brief]")
  .addEventListener("click", () => briefDialog.showModal());
const closing = new Map();
function closeModal(modal) {
  if (closing.has(modal)) return;
  if (reduce.matches) {
    modal.close();
    return;
  }
  const animation = modal.animate(
    [
      { opacity: 1, transform: "translateY(0)" },
      { opacity: 0, transform: "translateY(10px)" },
    ],
    { duration: 160, easing: "ease-in" },
  );
  closing.set(modal, animation);
  animation.finished
    .catch(() => {})
    .then(() => {
      modal.close();
      closing.delete(modal);
    });
}
document.querySelectorAll("dialog").forEach((modal) => {
  modal
    .querySelector("[data-close]")
    .addEventListener("click", () => closeModal(modal));
  modal.addEventListener("cancel", (event) => {
    event.preventDefault();
    closeModal(modal);
  });
  modal.addEventListener("click", (event) => {
    if (event.target !== modal) return;
    const rect = modal.getBoundingClientRect();
    if (
      event.clientX < rect.left ||
      event.clientX > rect.right ||
      event.clientY < rect.top ||
      event.clientY > rect.bottom
    )
      closeModal(modal);
  });
});
reduce.addEventListener("change", () => {
  if (reduce.matches)
    for (const animation of closing.values()) animation.cancel();
});
document.querySelector("#brief-form").addEventListener("submit", (event) => {
  event.preventDefault();
  const project = document.querySelector("#project-name"),
    idea = document.querySelector("#project-idea");
  project.setCustomValidity(project.value.trim() ? "" : "Add a project name.");
  idea.setCustomValidity(
    idea.value.trim() ? "" : "Add a little about your idea.",
  );
  if (!event.currentTarget.reportValidity()) return;
  const text = `ODDFIELD / PROJECT BRIEF\n\nProject: ${project.value.trim()}\nScope: ${document.querySelector("#project-type").value}\n\nTHE IDEA\n${idea.value.trim()}\n\nA local draft from a fictional design-studio example. This has not been submitted or sent.\n`;
  const url = URL.createObjectURL(
    new Blob([text], { type: "text/plain;charset=utf-8" }),
  );
  const link = document.createElement("a");
  link.href = url;
  link.download = "oddfield-project-brief.txt";
  document.body.append(link);
  link.click();
  link.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
  document.querySelector("#brief-status").textContent =
    "Your brief is ready to save. Nothing has been sent.";
});
document
  .querySelectorAll("#brief-form input,#brief-form textarea")
  .forEach((input) =>
    input.addEventListener("input", () => {
      input.setCustomValidity("");
      document.querySelector("#brief-status").textContent = "";
    }),
  );
document
  .querySelectorAll("button[disabled]")
  .forEach((button) => (button.disabled = false));

reduce.addEventListener("change", () => {
  if (reduce.matches)
    for (const animation of filterAnimations.values()) animation.cancel();
});

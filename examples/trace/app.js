"use strict";
const reduce = matchMedia("(prefers-reduced-motion: reduce)");
const sources = {
  notes: {
    title: "Launch notes",
    paragraphs: [
      "The first release is an internal pilot of workspace search. The pilot includes search, source previews, and an in-product feedback flow.",
      "The launch review is led by Maya, the product lead. The exact pilot start date is not yet confirmed.",
      "Shared folders and external guest access are not part of the first release.",
    ],
  },
  plan: {
    title: "Project plan",
    paragraphs: [
      "Maya owns the launch review and readiness decision. Rowan owns the pilot checklist and feedback collection.",
      "Eli owns the source-preview design review. The team will review pilot feedback before deciding on a broader release.",
      "The support handoff is still being planned. A final owner has not been assigned.",
    ],
  },
  decisions: {
    title: "Decision log",
    paragraphs: [
      "Decision: keep the first release focused on search, source previews, and feedback for an internal pilot.",
      "Shared folders and external guest access are deferred. No delivery date has been set for either feature.",
      "Open questions: confirm the pilot start date, assign the support handoff owner, and agree on how to evaluate pilot feedback.",
    ],
  },
};
const answers = {
  launch: {
    heading: "Start with a focused pilot.",
    body: "The first release brings workspace search to a small internal group. Shared folders and external guests are left for a later release.",
    points: [
      ["In:", "search, source previews, and feedback."],
      ["Later:", "shared folders and guest access."],
    ],
    sources: ["notes", "decisions"],
    highlights: { notes: [0, 2], decisions: [0, 1] },
  },
  owner: {
    heading: "Maya leads the launch review.",
    body: "The sample plan names Maya as the owner of launch readiness. Rowan handles the pilot checklist and feedback collection, while Eli leads the source-preview design review.",
    points: [
      ["Readiness:", "Maya."],
      ["Pilot feedback:", "Rowan."],
    ],
    sources: ["plan", "notes"],
    highlights: { plan: [0, 1], notes: [1] },
  },
  open: {
    heading: "Three decisions are still open.",
    body: "The documents leave the pilot start date, support handoff owner, and feedback evaluation approach unresolved. They do not provide enough information to fill those gaps.",
    points: [
      ["Unconfirmed:", "pilot date and support handoff."],
      ["Still to agree:", "how pilot feedback will be evaluated."],
    ],
    sources: ["decisions", "plan"],
    highlights: { decisions: [2], plan: [2] },
  },
};
let selected = "launch",
  answerAnimation,
  sourceAnimation;
const sourceDialog = document.querySelector("#source-dialog");
function showSource(key) {
  const source = sources[key];
  document.querySelector("#source-title").textContent = source.title;
  const container = document.querySelector("#source-content");
  container.replaceChildren();
  source.paragraphs.forEach((text, index) => {
    const p = document.createElement("p");
    p.textContent = text;
    if (answers[selected].highlights[key]?.includes(index))
      p.className = "relevant";
    container.append(p);
  });
  const download = document.querySelector("#download-source");
  download.href = `sources/${key}.txt`;
  download.download = `trace-${key}.txt`;
  sourceDialog.showModal();
}
function choose(question) {
  selected = question;
  const answer = answers[question];
  document
    .querySelectorAll("[data-question]")
    .forEach((button) =>
      button.setAttribute(
        "aria-pressed",
        String(button.dataset.question === question),
      ),
    );
  const container = document.querySelector("#answer-content");
  container.replaceChildren();
  const heading = document.createElement("h4");
  heading.textContent = answer.heading;
  const body = document.createElement("p");
  body.textContent = answer.body;
  const list = document.createElement("ul");
  answer.points.forEach(([label, text]) => {
    const item = document.createElement("li"),
      strong = document.createElement("strong");
    strong.textContent = label;
    item.append(strong, document.createTextNode(" " + text));
    list.append(item);
  });
  container.append(heading, body, list);
  const citations = document.querySelector("#citations");
  citations.replaceChildren();
  answer.sources.forEach((key, index) => {
    const button = document.createElement("button");
    button.className = "citation";
    button.dataset.source = key;
    const span = document.createElement("span");
    span.textContent = sources[key].title;
    button.append(
      document.createTextNode(`${index + 1} `),
      span,
      document.createTextNode(" ↗"),
    );
    citations.append(button);
  });
  document.querySelector("#answer-status").textContent =
    `Sample answer: ${answer.heading}`;
  document.querySelector("#copy-answer span").textContent = "Copy";
  answerAnimation?.cancel();
  if (!reduce.matches)
    answerAnimation = document.querySelector(".answer-card").animate(
      [
        { opacity: 0.45, transform: "translateY(6px)" },
        { opacity: 1, transform: "translateY(0)" },
      ],
      { duration: 260, easing: "cubic-bezier(.22,1,.36,1)" },
    );
}
document
  .querySelectorAll("[data-question]")
  .forEach((button) =>
    button.addEventListener("click", () => choose(button.dataset.question)),
  );
document.addEventListener("click", (event) => {
  const button = event.target.closest("[data-source]");
  if (button && !button.disabled) showSource(button.dataset.source);
});
function closeSource() {
  if (sourceAnimation) return;
  if (reduce.matches) {
    sourceDialog.close();
    return;
  }
  sourceAnimation = sourceDialog.animate(
    [
      { opacity: 1, transform: "translateX(0)" },
      { opacity: 0, transform: "translateX(12px)" },
    ],
    { duration: 150, easing: "ease-in" },
  );
  sourceAnimation.finished
    .catch(() => {})
    .then(() => {
      sourceDialog.close();
      sourceAnimation = undefined;
    });
}
document.querySelector("#close-source").addEventListener("click", closeSource);
sourceDialog.addEventListener("cancel", (event) => {
  event.preventDefault();
  closeSource();
});
sourceDialog.addEventListener("click", (event) => {
  if (event.target !== sourceDialog) return;
  const rect = sourceDialog.getBoundingClientRect();
  if (
    event.clientX < rect.left ||
    event.clientX > rect.right ||
    event.clientY < rect.top ||
    event.clientY > rect.bottom
  )
    closeSource();
});
document.querySelector("#copy-answer").addEventListener("click", async () => {
  const copiedQuestion = selected;
  const answer = answers[selected];
  const text = `${answer.heading}\n\n${answer.body}\n\n${answer.points.map(([label, text]) => label + " " + text).join("\n")}\n\nSources: ${answer.sources.map((key) => sources[key].title).join(", ")}\nPrepared sample answer from the fictional Trace demo. Not generated by a live model.`;
  try {
    if (!navigator.clipboard?.writeText)
      throw new Error("Clipboard unavailable");
    await navigator.clipboard.writeText(text);
    if (selected !== copiedQuestion) return;
    document.querySelector("#copy-answer span").textContent = "Copied";
    document.querySelector("#answer-status").textContent =
      "Sample answer copied with its source names.";
  } catch {
    document.querySelector("#answer-status").textContent =
      "Clipboard access is unavailable. You can select and copy the answer text directly.";
  }
});
reduce.addEventListener("change", () => {
  answerAnimation?.cancel();
  if (reduce.matches) sourceAnimation?.cancel();
});
document
  .querySelectorAll(".principle-list details")
  .forEach((details) =>
    details.addEventListener(
      "toggle",
      () =>
        (details.querySelector("summary span").textContent = details.open
          ? "−"
          : "+"),
    ),
  );
document
  .querySelectorAll("button[disabled]")
  .forEach((button) => (button.disabled = false));

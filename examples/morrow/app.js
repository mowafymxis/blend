import {
  scrollScene,
  illustrations,
  reduced,
  download,
} from "../shared/motion.js";
const samples = {
  research: {
    prompt: "What should we consider before moving to a four-day workweek?",
    title: "Start with the work,\nnot the calendar.",
    intro:
      "A shorter week changes more than working hours. Separate the decision into three questions before choosing a pilot.",
    points: [
      [
        "What needs coverage?",
        "Map customer-facing hours and critical handovers.",
      ],
      [
        "What can change?",
        "Audit meetings and recurring work before compressing the schedule.",
      ],
      [
        "What would count as success?",
        "Compare service quality, workload, and team feedback.",
      ],
    ],
  },
  plan: {
    prompt:
      "Help me turn a promising idea into a small, useful research project.",
    title: "Make the question\nsmall enough to answer.",
    intro:
      "Start with one decision the research should inform. Build the project around evidence you can actually collect.",
    points: [
      [
        "Write the decision.",
        "Name what you will do differently when you know more.",
      ],
      [
        "Choose the evidence.",
        "Find the people, observations, or sources that can challenge your assumptions.",
      ],
      [
        "Set a review point.",
        "Bring the findings together before expanding the scope.",
      ],
    ],
  },
  write: {
    prompt:
      "Help me write a concise update: our research is complete, but we need another week to review the findings.",
    title: "A clear update.\nA useful next step.",
    intro:
      "The research is complete. We are taking one more week to review the findings and make sure the recommendations reflect the evidence.",
    points: [
      [
        "What is ready",
        "The source material and initial observations are organized.",
      ],
      [
        "What happens next",
        "We will compare the findings, resolve open questions, and prepare a short brief.",
      ],
      [
        "What to expect",
        "The next update will include the recommendations and the reasoning behind them.",
      ],
    ],
  },
};
let selected = "research";
document
  .querySelectorAll("button:disabled")
  .forEach((b) => (b.disabled = false));
const creature = document.querySelector(".creature");
let greeting = [];
let companionVisible = false;
function greet() {
  if (
    !companionVisible ||
    reduced.matches ||
    greeting.some((a) => a.playState === "running")
  )
    return;
  greeting = [
    creature.animate(
      [
        { transform: "translateY(0)" },
        { transform: "translateY(-3px)", offset: 0.35 },
        { transform: "translateY(0)", offset: 0.7 },
        { transform: "translateY(0)" },
      ],
      { duration: 850, easing: "ease-in-out" },
    ),
    document
      .querySelector(".eyes")
      .animate(
        [
          { transform: "scaleY(1)" },
          { transform: "scaleY(.2)", offset: 0.3 },
          { transform: "scaleY(1)", offset: 0.45 },
          { transform: "scaleY(1)" },
        ],
        { duration: 850 },
      ),
  ];
}
const settle = () => {
  greeting.forEach((a) => a.cancel());
  greeting = [];
};
new IntersectionObserver(([entry]) => {
  companionVisible = entry.isIntersecting;
  if (!companionVisible) settle();
}).observe(creature);
document.querySelector("#greet").addEventListener("click", greet);
reduced.addEventListener("change", settle);
document.addEventListener("visibilitychange", () => {
  if (document.hidden) settle();
});
document.querySelectorAll("[data-example]").forEach((b) =>
  b.addEventListener("click", () => {
    selected = b.dataset.example;
    const s = samples[selected];
    document
      .querySelectorAll("[data-example]")
      .forEach((x) => x.setAttribute("aria-pressed", String(x === b)));
    document.querySelector("#prompt").textContent = s.prompt;
    const response = document.querySelector("#response");
    response.replaceChildren();
    const title = document.createElement("h3");
    title.style.whiteSpace = "pre-line";
    title.textContent = s.title;
    const intro = document.createElement("p");
    intro.textContent = s.intro;
    const list = document.createElement("ol");
    s.points.forEach(([a, c]) => {
      const li = document.createElement("li");
      const strong = document.createElement("strong");
      strong.textContent = a + " ";
      li.append(strong, document.createTextNode(c));
      list.append(li);
    });
    response.append(title, intro, list);
    document.querySelector("#copy-status").textContent = "";
    greet();
  }),
);
document.querySelector("#copy").addEventListener("click", async () => {
  const key = selected,
    text = document.querySelector("#response").innerText;
  try {
    await navigator.clipboard.writeText(text);
    if (selected === key)
      document.querySelector("#copy-status").textContent = "Copied";
  } catch {
    download(text, `morrow-${key}.txt`);
    if (selected === key)
      document.querySelector("#copy-status").textContent = "Downloaded as text";
  }
});
const story = document.querySelector(".story");
scrollScene(story, (p) => {
  const merge = Math.min(1, p / 0.7),
    q = merge * merge * (3 - 2 * merge);
  document.querySelector(".source-a").style.transform =
    `translate(${-155 + 105 * q}%,${-10 + 32 * q}px) rotate(${-8 + 8 * q}deg)`;
  document.querySelector(".source-b").style.transform =
    `translate(${55 - 105 * q}%,${10 + 12 * q}px) rotate(${8 - 8 * q}deg)`;
  document
    .querySelectorAll(".source")
    .forEach((el) => (el.style.opacity = String(1 - q * 0.93)));
  document.querySelector(".brief").style.transform =
    `translateX(-50%) translateY(${35 * (1 - q)}px) scale(${0.82 + 0.18 * q})`;
  document
    .querySelectorAll(".story-meter i")
    .forEach(
      (el, i) =>
        (el.style.transform = `scaleX(${Math.max(0, Math.min(1, p * 2 - i))})`),
    );
});
illustrations();

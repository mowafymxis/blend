"use strict";
const trails = [
  {
    name: "Fern Hollow",
    difficulty: "easy",
    distance: "4.2 km",
    duration: "1 h 20 min",
  },
  {
    name: "Ochre Ridge",
    difficulty: "moderate",
    distance: "7.8 km",
    duration: "2 h 40 min",
  },
  {
    name: "Reedwater Loop",
    difficulty: "easy",
    distance: "3.1 km",
    duration: "55 min",
  },
];
const buttons = [...document.querySelectorAll("[data-route]")];
const search = document.querySelector("#search");
let selected = 0,
  difficulty = "all";
function choose(index) {
  selected = index;
  const trail = trails[index];
  buttons.forEach((button, i) => {
    button.classList.toggle("selected", i === index);
    button.setAttribute("aria-pressed", String(i === index));
  });
  document
    .querySelectorAll("[data-path]")
    .forEach((path) =>
      path.toggleAttribute("hidden", Number(path.dataset.path) !== index),
    );
  document.querySelector("#map-title").textContent =
    `Illustrative Greenbelt map with ${trail.name} selected`;
  document.querySelector("#map-name").textContent = trail.name;
  document.querySelector("#map-distance").textContent =
    `${trail.distance} loop`;
  document.querySelector("#selected-name").textContent = trail.name;
  document.querySelector("#selected-detail").textContent =
    `${trail.distance} · ${trail.duration} · ${trail.difficulty === "easy" ? "Easy" : "Moderate"}`;
  document.querySelector("#status").textContent = "";
}
function filter() {
  let count = 0;
  buttons.forEach((button, index) => {
    const trail = trails[index];
    button.hidden = !(
      trail.name.toLowerCase().includes(search.value.trim().toLowerCase()) &&
      (difficulty === "all" || trail.difficulty === difficulty)
    );
    if (!button.hidden) count++;
  });
  document.querySelector(".empty").hidden = count > 0;
  document.querySelector("#count").textContent =
    `${count} ${count === 1 ? "trail" : "trails"} to explore`;
}
buttons.forEach((button) =>
  button.addEventListener("click", () => choose(Number(button.dataset.route))),
);
document.querySelectorAll("[data-filter]").forEach((button) =>
  button.addEventListener("click", () => {
    difficulty = button.dataset.filter;
    document
      .querySelectorAll("[data-filter]")
      .forEach((item) =>
        item.setAttribute("aria-pressed", String(item === button)),
      );
    filter();
  }),
);
search.addEventListener("input", filter);
document.querySelector("#reset").addEventListener("click", () => {
  search.value = "";
  document.querySelector('[data-filter="all"]').click();
  search.focus();
});
// Original contours; the drawing intentionally is not a geographic map.
const contourGroup = document.querySelector("#contours");
for (let i = 0; i < 16; i++) {
  const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
  const x = 100 + i * 19,
    y = 38 + i * 10;
  path.setAttribute(
    "d",
    `M${x - 210} ${y} C${x - 40} ${y - 130} ${x + 155} ${y - 45} ${x + 150} ${y + 94} S${x + 290} ${y + 240} ${x + 335} ${y + 360} S${x + 290} ${y + 530} ${x + 160} ${y + 660}`,
  );
  contourGroup.append(path);
}
document.querySelector("#download").addEventListener("click", () => {
  const trail = trails[selected];
  const checklist = [...document.querySelectorAll(".packing input")]
    .map((input) => `[${input.checked ? "x" : " "}] ${input.value}`)
    .join("\n");
  const text = `TRAILHEAD / DAY PLAN\n\nFictional demonstration. Not a real route or navigation guide.\n\nTrail: ${trail.name}\nDistance: ${trail.distance}\nEstimated time (illustrative): ${trail.duration}\nDay: ${document.querySelector("#date").value || "Not chosen"}\n\nPACKING NOTES\n${checklist}\n\nBefore a real trip, use current official trail information and prepare for the actual conditions.\n`;
  const url = URL.createObjectURL(
    new Blob([text], { type: "text/plain;charset=utf-8" }),
  );
  const link = document.createElement("a");
  link.href = url;
  link.download = "trailhead-day-plan.txt";
  document.body.append(link);
  link.click();
  link.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
  document.querySelector("#status").textContent =
    "Your day-plan download is ready.";
});

// Progressive enhancement: activate actions only after their handlers exist.
document
  .querySelectorAll("button[disabled]")
  .forEach((button) => (button.disabled = false));

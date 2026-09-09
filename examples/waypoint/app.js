const routes = {
  coast: {
    destination: "Saltbay",
    minutes: 100,
    arrival: "11:00",
    description:
      "Past the river and through the dunes, with the sea waiting at the end.",
  },
  forest: {
    destination: "Pinewood",
    minutes: 135,
    arrival: "11:35",
    description:
      "Follow the river north, then leave the city behind beneath a canopy of pines.",
  },
  hills: {
    destination: "Highfield",
    minutes: 80,
    arrival: "10:40",
    description:
      "A winding climb through open country, finishing high above the valley.",
  },
};
const buttons = [...document.querySelectorAll(".route")];
const selected = document.querySelector("#selected-path");
const marker = document.querySelector("#marker");
const slider = document.querySelector("#journey");
const preference = matchMedia("(prefers-reduced-motion: reduce)");
let route = "coast",
  frame = 0,
  current = { x: 180, y: 400 };
function point() {
  const path = document.getElementById(route);
  return path.getPointAtLength((path.getTotalLength() * slider.value) / 100);
}
function put(p) {
  current = { x: p.x, y: p.y };
  marker.setAttribute("transform", `translate(${p.x} ${p.y})`);
}
function move(animate) {
  cancelAnimationFrame(frame);
  const target = point();
  if (!animate || preference.matches || document.hidden) {
    put(target);
    return;
  }
  // Retarget from the displayed position, including during rapid route changes.
  const from = { ...current },
    start = performance.now();
  function step(now) {
    const t = Math.min(1, (now - start) / 320),
      ease = 1 - (1 - t) ** 3;
    put({
      x: from.x + (target.x - from.x) * ease,
      y: from.y + (target.y - from.y) * ease,
    });
    if (t < 1) frame = requestAnimationFrame(step);
  }
  frame = requestAnimationFrame(step);
}
function positionLabel() {
  const p = +slider.value;
  const minute = 560 + Math.round((routes[route].minutes * p) / 100);
  const time = `${String(Math.floor(minute / 60)).padStart(2, "0")}:${String(minute % 60).padStart(2, "0")}`;
  const label =
    p === 0
      ? "Departure · Central"
      : p === 100
        ? `Arrival · ${routes[route].destination}`
        : `${time} · ${p}% of journey`;
  document.querySelector("#position").textContent = label;
  slider.setAttribute("aria-valuetext", label);
}
buttons.forEach((button) => {
  button.disabled = false;
  button.addEventListener("click", () => {
    route = button.dataset.route;
    buttons.forEach((item) => {
      item.classList.toggle("active", item === button);
      item.setAttribute("aria-pressed", String(item === button));
    });
    selected.setAttribute(
      "d",
      document.getElementById(route).getAttribute("d"),
    );
    document.querySelector("#arrival").textContent = routes[route].arrival;
    document.querySelector("#description").textContent =
      routes[route].description;
    document.querySelector("#destination").textContent =
      routes[route].destination;
    document.querySelector("#map-title").textContent =
      `Central to ${routes[route].destination}`;
    document.querySelector("#message").textContent = "";
    positionLabel();
    move(true);
  });
});
slider.disabled = false;
slider.addEventListener("input", () => {
  positionLabel();
  move(false);
});
preference.addEventListener("change", () => move(false));
document.addEventListener("visibilitychange", () => move(false));
const save = document.querySelector("#save");
save.disabled = false;
save.addEventListener("click", () => {
  const data = routes[route];
  const text = `Waypoint — fictional itinerary\nCentral to ${data.destination}\nDeparture: 09:20\nArrival: ${data.arrival}\nDuration: ${data.minutes} minutes\n${data.description}\n\nIllustrative demo only. No booking, live schedule, or geographic accuracy.\n`;
  const url = URL.createObjectURL(
    new Blob([text], { type: "text/plain;charset=utf-8" }),
  );
  const link = document.createElement("a");
  link.href = url;
  link.download = `waypoint-${route}.txt`;
  link.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
  document.querySelector("#message").textContent =
    "Itinerary file prepared. Nothing has been booked.";
});
positionLabel();

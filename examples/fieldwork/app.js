const routes = {
  river: {
    name: "The river wander",
    number: "001",
    path: "M173 332Q190 288 191 245T218 178Q232 137 213 103Q180 93 165 130T166 223Q146 293 173 332",
    start: [173, 332],
    detail: "The bend where the water slows.\nBring something good for lunch.",
    distance: "5 km",
    pace: "Gentle",
  },
  pines: {
    name: "Between the pines",
    number: "002",
    path: "M173 332Q138 301 103 278T77 206Q62 143 104 133T166 162Q201 205 165 249T173 332",
    start: [173, 332],
    detail:
      "The clearing just beyond the old pines.\nA good place to sit and listen.",
    distance: "8 km",
    pace: "Steady",
  },
  ridge: {
    name: "The open ridge",
    number: "003",
    path: "M366 339Q404 293 444 253T463 164Q452 105 398 87T323 107Q306 142 355 180T365 257Q340 300 366 339",
    start: [366, 339],
    detail:
      "The last rise before the open sky.\nTake a layer for the breezy bits.",
    distance: "11 km",
    pace: "Hilly",
  },
};
let selected = "river",
  drawing;
const reduced = matchMedia("(prefers-reduced-motion: reduce)");
document
  .querySelectorAll("button:disabled")
  .forEach((el) => (el.disabled = false));
document.querySelectorAll("[data-route]").forEach((button) =>
  button.addEventListener("click", () => {
    selected = button.dataset.route;
    const route = routes[selected];
    document
      .querySelectorAll("[data-route]")
      .forEach((el) => el.setAttribute("aria-pressed", String(el === button)));
    const path = document.querySelector("#route-path");
    drawing?.cancel();
    path.setAttribute("d", route.path);
    document.querySelector("#route-start").setAttribute("cx", route.start[0]);
    document.querySelector("#route-start").setAttribute("cy", route.start[1]);
    document.querySelector("#map-number").textContent = route.number;
    document.querySelector("#map-title").textContent =
      `Illustrated route for ${route.name}`;
    document
      .querySelector("#route-detail")
      .replaceChildren(
        ...route.detail
          .split("\n")
          .flatMap((line, i) =>
            i
              ? [document.createElement("br"), document.createTextNode(line)]
              : [document.createTextNode(line)],
          ),
      );
    document
      .querySelector("#field-notes")
      .setAttribute("aria-label", `Download field notes for ${route.name}`);
    if (!reduced.matches) {
      const length = path.getTotalLength();
      drawing = path.animate(
        [
          { strokeDasharray: `${length}`, strokeDashoffset: length },
          { strokeDasharray: `${length}`, strokeDashoffset: 0 },
        ],
        { duration: 950, easing: "cubic-bezier(.3,0,.2,1)" },
      );
    }
  }),
);
document.querySelector("#field-notes").addEventListener("click", () => {
  const route = routes[selected];
  const text = `FIELDWORK / FIELD NOTES ${route.number}\n\n${route.name}\n${route.distance} · ${route.pace}\n\nTHE GOOD BIT\n${route.detail}\n\nBEFORE YOU GO\nWater, a packed lunch, a warm layer, and room for the long way home.\n\nABOUT THIS EXAMPLE\nThis is an imagined walk from a fictional walking club. The distance and map are illustrative. This is not a real route, navigation guide, or scheduled outing.\n`;
  const url = URL.createObjectURL(
    new Blob([text], { type: "text/plain;charset=utf-8" }),
  );
  const a = document.createElement("a");
  a.href = url;
  a.download = `fieldwork-${selected}-notes.txt`;
  a.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
});
reduced.addEventListener("change", () => drawing?.cancel());
document.addEventListener("visibilitychange", () => {
  if (document.hidden) drawing?.cancel();
});

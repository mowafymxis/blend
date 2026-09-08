/* A fictional schedule, not a sky prediction or booking service. */
const experiences = {
  telescope: {
    name: "At the eyepiece",
    duration: 45,
    location: "Inside the dome",
  },
  chart: {
    name: "Find your bearings",
    duration: 30,
    location: "On the terrace",
  },
  walk: {
    name: "Take the slow route",
    duration: 40,
    location: "Around the grounds",
  },
};
const form = document.querySelector("#plan-form");
const arrival = document.querySelector("#arrival");
const time = (minutes) =>
  `${String(Math.floor(minutes / 60)).padStart(2, "0")}:${String(minutes % 60).padStart(2, "0")}`;
function getPlan() {
  const start = 18 * 60 + Number(arrival.value) * 30;
  const experience =
    experiences[form.querySelector("input[name=experience]:checked").value];
  return {
    experience,
    steps: [
      [time(start), "Arrive at the courtyard"],
      [time(start + 15), experience.name],
      [time(start + 15 + experience.duration), "Warm drink & time to explore"],
    ],
  };
}
function renderPlan() {
  const { steps } = getPlan();
  document.querySelector("#arrival-output").value = steps[0][0];
  arrival.setAttribute("aria-valuetext", steps[0][0]);
  document.querySelector("#itinerary").replaceChildren(
    ...steps.map(([at, label]) => {
      const item = document.createElement("li");
      const clock = document.createElement("time");
      clock.textContent = at;
      clock.dateTime = at;
      const text = document.createElement("span");
      text.textContent = label;
      item.append(clock, text);
      return item;
    }),
  );
  document.querySelector("#plan-status").textContent = "";
}
form.addEventListener("input", renderPlan);
form.addEventListener("submit", (event) => {
  event.preventDefault();
  const { experience, steps } = getPlan();
  const content = [
    "AFTERLIGHT — MY EVENING",
    "Fictional event · No reservation or live availability",
    "Saturday, 17 October · North Ridge Observatory",
    "",
    ...steps.map(([at, label]) => `${at}  ${label}`),
    "",
    `First experience: ${experience.location}`,
    "Bring warm layers and comfortable shoes.",
    "This is an illustrative plan, not a ticket or astronomical forecast.",
  ].join("\n");
  const url = URL.createObjectURL(
    new Blob([content], { type: "text/plain;charset=utf-8" }),
  );
  const link = document.createElement("a");
  link.href = url;
  link.download = "afterlight-visit-plan.txt";
  document.body.append(link);
  link.click();
  link.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
  document.querySelector("#plan-status").textContent =
    "Your plan is ready. Check your browser’s downloads.";
});
renderPlan();
document.querySelector("#planner-fields").disabled = false;

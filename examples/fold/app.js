const reduced = matchMedia("(prefers-reduced-motion: reduce)");
const actor = document.querySelector("#actor");
const petals = document.querySelector(".petals");
const face = document.querySelector(".face");
let mood = "curious",
  active = [],
  flowerMotion = [];
const frames = {
  curious: [
    { transform: "rotate(0deg)" },
    { transform: "rotate(-9deg) translateY(-8px)", offset: 0.35 },
    { transform: "rotate(7deg) translateY(-4px)", offset: 0.7 },
    { transform: "rotate(0deg)" },
  ],
  sleepy: [
    { transform: "scale(1,1)" },
    { transform: "scale(1.09,.87)", offset: 0.55 },
    { transform: "scale(1,1)" },
  ],
  excited: [
    { transform: "scale(1,1)" },
    { transform: "scale(1.13,.85)", offset: 0.18 },
    {
      transform: "translateY(-54px) rotate(-8deg) scale(.94,1.08)",
      offset: 0.45,
    },
    { transform: "translateY(0) scale(1.1,.9)", offset: 0.75 },
    { transform: "scale(1,1)" },
  ],
};
function replay() {
  const current = getComputedStyle(actor).transform;
  active.forEach((a) => a.cancel());
  active = [];
  if (reduced.matches) return;
  active.push(
    actor.animate([{ transform: current }, ...frames[mood].slice(1)], {
      duration:
        (mood === "sleepy" ? 2000 : 1150) /
        Number(document.querySelector("#speed").value),
      easing: "cubic-bezier(.35,0,.2,1)",
    }),
  );
}
function hello() {
  flowerMotion.forEach((a) => a.cancel());
  flowerMotion = [];
  if (reduced.matches) return;
  flowerMotion.push(
    petals.animate(
      [
        { transform: "rotate(0) scale(1)" },
        { transform: "rotate(-17deg) scale(.88)", offset: 0.3 },
        { transform: "rotate(65deg) scale(1.03)", offset: 0.75 },
        { transform: "rotate(60deg) scale(1)" },
      ],
      { duration: 1500, easing: "cubic-bezier(.25,.7,.25,1)" },
    ),
    face.animate(
      [
        { transform: "rotate(0)" },
        { transform: "rotate(10deg)", offset: 0.35 },
        { transform: "rotate(0)" },
      ],
      { duration: 1500 },
    ),
  );
}
document
  .querySelectorAll("button:disabled,input:disabled")
  .forEach((el) => (el.disabled = false));
document.querySelectorAll("[data-mood]").forEach((button) =>
  button.addEventListener("click", () => {
    mood = button.dataset.mood;
    document
      .querySelectorAll("[data-mood]")
      .forEach((el) => el.setAttribute("aria-pressed", String(el === button)));
    document.querySelector("#mood-label").textContent = {
      curious: "01 — A curious little thing",
      sleepy: "02 — In absolutely no rush",
      excited: "03 — Can hardly contain itself",
    }[mood];
    document
      .querySelector("#play-character")
      .setAttribute("aria-label", `A ${mood} purple character`);
    replay();
  }),
);
document.querySelector("#speed").addEventListener("change", replay);
document.querySelector("#play").addEventListener("click", replay);
document.querySelector(".art-replay").addEventListener("click", hello);
document.querySelector("#download").addEventListener("click", () => {
  const svg = document.querySelector("#play-character").cloneNode(true);
  svg.setAttribute("xmlns", "http://www.w3.org/2000/svg");
  svg.querySelector("#actor").removeAttribute("style");
  const keyframes = {
    curious:
      "0%,100%{transform:rotate(0deg)}35%{transform:rotate(-9deg) translateY(-8px)}70%{transform:rotate(7deg) translateY(-4px)}",
    sleepy: "0%,100%{transform:scale(1)}55%{transform:scale(1.09,.87)}",
    excited:
      "0%,100%{transform:scale(1)}18%{transform:scale(1.13,.85)}45%{transform:translateY(-54px) rotate(-8deg) scale(.94,1.08)}75%{transform:scale(1.1,.9)}",
  }[mood];
  const style = document.createElementNS("http://www.w3.org/2000/svg", "style");
  style.textContent = `#actor{transform-origin:200px 260px;animation:move ${(mood === "sleepy" ? 2 : 1.15) / Number(document.querySelector("#speed").value)}s cubic-bezier(.35,0,.2,1) 1}@keyframes move{${keyframes}}@media(prefers-reduced-motion:reduce){#actor{animation:none}}`;
  svg.prepend(style);
  const url = URL.createObjectURL(
    new Blob([new XMLSerializer().serializeToString(svg)], {
      type: "image/svg+xml",
    }),
  );
  const link = document.createElement("a");
  link.href = url;
  link.download = `fold-${mood}.svg`;
  link.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
});
reduced.addEventListener("change", () => {
  active.forEach((a) => a.cancel());
  flowerMotion.forEach((a) => a.cancel());
});
document.addEventListener("visibilitychange", () => {
  if (document.hidden) {
    active.forEach((a) => a.cancel());
    flowerMotion.forEach((a) => a.cancel());
  }
});
hello();

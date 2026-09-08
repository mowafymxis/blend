"use strict";
const choices = {
  bowl: {
    title: "Illustration of a wide clay bowl",
    caption: "Wide or deep. Open or enclosing.",
    prompt:
      "Imagine what it might hold. Sketch the view from above, then from the side.",
    number: "01 / BOWL",
  },
  vase: {
    title: "Illustration of a round clay vase",
    caption: "A narrow neck. A generous curve.",
    prompt:
      "Follow the outline with your eye. Where does the shape widen, and where does it pause?",
    number: "02 / VASE",
  },
  cup: {
    title: "Illustration of a clay cup with a handle",
    caption: "A small shape, held close.",
    prompt:
      "Think about where your fingers rest. Draw a handle that feels like part of the whole.",
    number: "03 / CUP",
  },
};
const reduced = matchMedia("(prefers-reduced-motion: reduce)");
const select = document.querySelector("#worksheet");
let animation;
function choose(name) {
  document
    .querySelectorAll("[data-form]")
    .forEach((button) =>
      button.setAttribute("aria-pressed", String(button.dataset.form === name)),
    );
  Object.keys(choices).forEach((key) =>
    document
      .querySelector(`#${key}-shape`)
      .toggleAttribute("hidden", key !== name),
  );
  document.querySelector("#shape-title").textContent = choices[name].title;
  document.querySelector("#form-caption").textContent = choices[name].caption;
  document.querySelector("#form-number").textContent = choices[name].number;
  document.querySelector("#form-prompt").textContent = choices[name].prompt;
  select.value = name;
  const download = document.querySelector("#download");
  download.href = `worksheets/${name}.txt`;
  download.download = `common-clay-${name}.txt`;
  document.querySelector("#download-status").textContent = "";
  animation?.cancel();
  if (!reduced.matches)
    animation = document.querySelector(".form-preview svg").animate(
      [
        { opacity: 0.3, transform: "translateY(7px)" },
        { opacity: 1, transform: "translateY(0)" },
      ],
      { duration: 280, easing: "cubic-bezier(.22,1,.36,1)" },
    );
}
document
  .querySelectorAll("[data-form]")
  .forEach((button) =>
    button.addEventListener("click", () => choose(button.dataset.form)),
  );
select.addEventListener("change", () => choose(select.value));
reduced.addEventListener("change", () => animation?.cancel());
document.querySelector("#download").addEventListener("click", () => {
  document.querySelector("#download-status").textContent =
    `Your ${select.value} worksheet is ready to save.`;
});

document
  .querySelectorAll("[data-form]")
  .forEach((button) => (button.disabled = false));
select.disabled = false;

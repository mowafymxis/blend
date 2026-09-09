// Finite scenes have one clock. Their opening and closing poses are identical.
// Repeated input continues the current episode; it never queues another one.
const clamp = (value) => Math.max(0, Math.min(1, value));
const phase = (progress, start, end) =>
  clamp((progress - start) / (end - start));
const ease = (value) => value * value * (3 - 2 * value);
const track = (progress, start, end) => ease(phase(progress, start, end));
const excursion = (progress, a, b, c, d) =>
  track(progress, a, b) * (1 - track(progress, c, d));

class Episode {
  constructor(element, render, duration, reduced) {
    this.element = element;
    this.render = render;
    this.duration = duration;
    this.reduced = reduced;
    this.frame = 0;
    this.visible = true;
    this.settle();
  }

  play() {
    if (this.frame || document.hidden || !this.visible || this.reduced.matches)
      return;
    const start = performance.now();
    const tick = (now) => {
      const progress = clamp((now - start) / this.duration);
      this.render(progress);
      this.element.dataset.motionProgress = progress.toFixed(3);
      if (progress < 1) this.frame = requestAnimationFrame(tick);
      else this.settle();
    };
    this.render(0);
    this.element.dataset.motionState = "playing";
    this.frame = requestAnimationFrame(tick);
  }

  settle() {
    cancelAnimationFrame(this.frame);
    this.frame = 0;
    this.render(1);
    this.element.dataset.motionState = "settled";
    this.element.dataset.motionProgress = "1";
  }
}

function scaleAt(element, value, x, y) {
  element.setAttribute(
    "transform",
    `translate(${x} ${y}) scale(${value}) translate(${-x} ${-y})`,
  );
}

function makeDrawingRenderer(svg) {
  const find = (selector) => svg.querySelector(selector);
  const kind = svg.dataset.scene;
  const seal = find(".seal");
  const mark = find(".mark");
  const center =
    kind === "collect"
      ? [177, 140]
      : kind === "connect"
        ? [136, 107]
        : [174, 139];
  const papers = [...svg.querySelectorAll(".paper")];
  const branches = [...svg.querySelectorAll(".branch")];
  const lines = [...svg.querySelectorAll(".line")];
  const shadow = find(".page-shadow");

  return (progress) => {
    const withdraw = track(progress, 0, 0.18);
    const returnBody = track(progress, 0.48, 0.72);
    const bodyScale = 1 - withdraw + returnBody;
    const markVisible =
      1 - track(progress, 0, 0.12) + track(progress, 0.69, 0.88);
    scaleAt(seal, bodyScale, ...center);
    mark.style.strokeDashoffset = String(1 - markVisible);
    mark.style.opacity = String(clamp(markVisible * 4));

    if (kind === "collect") {
      // The tray stays fixed. Sheets fan around it, then return as a collection.
      const spread = excursion(progress, 0.13, 0.35, 0.39, 0.64);
      papers[0].setAttribute(
        "transform",
        `translate(${-17 * spread} ${8 * spread}) rotate(${-12 * spread} 113 85)`,
      );
      papers[1].setAttribute(
        "transform",
        `translate(${17 * spread} ${-5 * spread}) rotate(${12 * spread} 118 82)`,
      );
      papers[2].setAttribute("transform", `translate(0 ${-16 * spread})`);
    } else if (kind === "connect") {
      const reframe = excursion(progress, 0.16, 0.37, 0.4, 0.64);
      // Node boundaries remain fixed; the junction reorganizes inside them.
      const junction = 136 + 14 * reframe;
      branches[0].setAttribute("d", `M87 54h${junction - 100}q13 0 13 13v40`);
      branches[1].setAttribute("d", `M76 133h${junction - 105}q29 0 29-26`);
      branches[2].setAttribute("d", `M${junction} 107h${179 - junction}`);
      branches.forEach((branch, index) => {
        const hidden =
          track(progress, 0.1 + index * 0.025, 0.28 + index * 0.025) -
          track(progress, 0.34 + index * 0.03, 0.56 + index * 0.025);
        branch.style.strokeDasharray = "1";
        branch.style.strokeDashoffset = String(hidden);
      });
    } else {
      const reform = excursion(progress, 0.15, 0.35, 0.41, 0.65);
      shadow.setAttribute(
        "transform",
        `translate(${7 * reform} ${-3 * reform}) rotate(${3 * reform} 80 155)`,
      );
      lines.forEach((line, index) => {
        const gather = excursion(
          progress,
          0.12 + index * 0.04,
          0.32 + index * 0.04,
          0.4 + index * 0.025,
          0.61 + index * 0.02,
        );
        const y = 76 + index * 15;
        line.setAttribute(
          "transform",
          `translate(83 ${y}) scale(${1 - gather * (0.45 + index * 0.1)} 1) translate(-83 ${-y})`,
        );
      });
    }
  };
}

function makeMascotRenderer(svg) {
  const body = svg.querySelector(".mascot-body");
  const arm = svg.querySelector(".mascot-arm-right");
  const face = svg.querySelector(".mascot-face");
  const eyes = svg.querySelector(".mascot-eyes");
  const mouth = svg.querySelector(".mascot-mouth");
  return (progress) => {
    const notice = excursion(progress, 0, 0.22, 0.68, 1);
    const blink = excursion(progress, 0.27, 0.33, 0.37, 0.44);
    const wave = Math.sin(phase(progress, 0.14, 0.72) * Math.PI * 3) * notice;
    body.setAttribute("transform", `rotate(${-3 * notice} 65 101)`);
    arm.setAttribute("transform", `rotate(${-13 * notice + 10 * wave} 94 72)`);
    face.setAttribute("transform", `translate(${1.5 * notice} ${-notice})`);
    eyes.setAttribute(
      "transform",
      `translate(65 69) scale(1 ${1 - 0.88 * blink}) translate(-65 -69)`,
    );
    mouth.setAttribute("d", `M59 83q5 ${3 + 3 * notice} 10 0`);
  };
}

export function mountMotion() {
  const abort = new AbortController();
  const options = { signal: abort.signal };
  const reduced = matchMedia("(prefers-reduced-motion: reduce)");
  const episodes = [];
  const observer = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      const episode = episodes.find((item) => item.element === entry.target);
      if (!episode) continue;
      episode.visible = entry.isIntersecting;
      if (!entry.isIntersecting) episode.settle();
    }
  });

  document.querySelectorAll("[data-feature]").forEach((card) => {
    const episode = new Episode(
      card,
      makeDrawingRenderer(card.querySelector(".scene")),
      1950,
      reduced,
    );
    episodes.push(episode);
    const button = card.querySelector(".replay");
    card.addEventListener(
      "pointerenter",
      (event) => {
        if (event.pointerType === "mouse" || event.pointerType === "pen")
          episode.play();
      },
      options,
    );
    button.addEventListener("focus", () => episode.play(), options);
    button.addEventListener("click", () => episode.play(), options);
    observer.observe(card);
  });

  const mascotButton = document.querySelector("#greet");
  const mascot = new Episode(
    mascotButton,
    makeMascotRenderer(mascotButton.querySelector("svg")),
    1250,
    reduced,
  );
  episodes.push(mascot);
  mascotButton.addEventListener("click", () => mascot.play(), options);
  observer.observe(mascotButton);

  const stop = () => episodes.forEach((episode) => episode.settle());
  reduced.addEventListener("change", stop, options);
  document.addEventListener(
    "visibilitychange",
    () => {
      if (document.hidden) stop();
    },
    options,
  );
  window.addEventListener("pagehide", stop, options);

  mascot.play();
  return {
    greet: () => mascot.play(),
    destroy() {
      stop();
      observer.disconnect();
      abort.abort();
    },
  };
}

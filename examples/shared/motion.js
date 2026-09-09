// Finite illustration episodes and deterministic scroll poses share no properties.
export const reduced = matchMedia("(prefers-reduced-motion: reduce)");
const clamp = (x) => Math.max(0, Math.min(1, x));
export function scrollScene(section, render) {
  let frame = 0;
  const compact = matchMedia("(max-width: 700px), (max-height: 540px)");
  function update() {
    frame = 0;
    const enabled = !reduced.matches && !compact.matches;
    section.classList.toggle("is-scrubbing", enabled);
    const rect = section.getBoundingClientRect();
    const p = enabled
      ? clamp(-rect.top / Math.max(1, rect.height - innerHeight))
      : 1;
    render(p);
    section.dataset.progress = p.toFixed(3);
  }
  const schedule = () => {
    if (!frame && !document.hidden) frame = requestAnimationFrame(update);
  };
  addEventListener("scroll", schedule, { passive: true });
  addEventListener("resize", schedule);
  addEventListener("pageshow", schedule);
  document.addEventListener("visibilitychange", schedule);
  reduced.addEventListener("change", schedule);
  compact.addEventListener("change", schedule);
  document.fonts.ready.then(schedule);
  update();
}
export function illustrations() {
  document.querySelectorAll("[data-drawing]").forEach((box) => {
    let active = [];
    function settle() {
      active.forEach((a) => a.cancel());
      active = [];
    }
    function play() {
      if (reduced.matches || active.some((a) => a.playState === "running"))
        return;
      const part = box.querySelector(".moving");
      const mark = box.querySelector(".draw-mark");
      // Collect a sheet, align a node, or trace a line with the pencil.
      const poses = {
        collect: [
          "translate(0,0)",
          "translate(-7px,-13px) rotate(-8deg)",
          "translate(0,-8px)",
          "translate(0,0)",
        ],
        connect: [
          "rotate(0deg)",
          "translate(-9px,6px) rotate(-20deg)",
          "translate(0,0) rotate(0deg)",
          "rotate(0deg)",
        ],
        write: [
          "translate(0,0)",
          "translate(-21px,-1px)",
          "translate(-5px,-1px)",
          "translate(0,0)",
        ],
      }[box.dataset.drawing];
      active = [
        part.animate(
          [
            { transform: poses[0] },
            { transform: poses[1], offset: 0.25 },
            { transform: poses[2], offset: 0.66 },
            { transform: poses[3], offset: 0.84 },
            { transform: poses[0] },
          ],
          { duration: 1500, easing: "cubic-bezier(.3,0,.2,1)" },
        ),
      ];
      if (mark)
        active.push(
          mark.animate(
            [
              { strokeDashoffset: 0 },
              { strokeDashoffset: 1, offset: 0.18 },
              {
                strokeDashoffset: 1,
                offset: box.dataset.drawing === "write" ? 0.25 : 0.48,
              },
              { strokeDashoffset: 0, offset: 0.82 },
              { strokeDashoffset: 0 },
            ],
            { duration: 1500, easing: "ease-in-out" },
          ),
        );
    }
    box.addEventListener("pointerenter", play);
    box.querySelector("button").addEventListener("click", play);
    box.querySelector("button").addEventListener("focus", play);
    reduced.addEventListener("change", settle);
    document.addEventListener("visibilitychange", () => {
      if (document.hidden) settle();
    });
    new IntersectionObserver((entries) => {
      if (!entries[0].isIntersecting) settle();
    }).observe(box);
  });
}
export function download(text, name) {
  const url = URL.createObjectURL(
    new Blob([text], { type: "text/plain;charset=utf-8" }),
  );
  const a = document.createElement("a");
  a.href = url;
  a.download = name;
  a.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

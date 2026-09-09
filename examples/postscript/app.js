const papers = {
  cream: { name: "Warm white", color: "#f5eedc" },
  rose: { name: "Rose", color: "#ebc9bd" },
  butter: { name: "Butter", color: "#ead99d" },
};
const form = document.querySelector("#note-form");
const card = document.querySelector(".note-card");
const recipient = document.querySelector("#recipient");
const message = document.querySelector("#message");
const turn = document.querySelector("#turn");
let paper = "cream";
let fitFrame = 0;
function fitNote() {
  fitFrame = 0;
  const preview = document.querySelector("#preview-message");
  preview.style.fontSize = "";
  let size = parseFloat(getComputedStyle(preview).fontSize);
  while (preview.scrollHeight > preview.clientHeight + 1 && size > 14) {
    preview.style.fontSize = `${--size}px`;
  }
  const fits = preview.scrollHeight <= preview.clientHeight + 1;
  message.setCustomValidity(
    fits ? "" : "Use fewer line breaks so your note fits on the paper.",
  );
  document.querySelector(".status").textContent = fits
    ? ""
    : "Try fewer line breaks to keep your note readable.";
}
function scheduleFit() {
  if (!fitFrame) fitFrame = requestAnimationFrame(fitNote);
}
new ResizeObserver(scheduleFit).observe(
  document.querySelector(".preview-space"),
);
document
  .querySelectorAll("button:disabled,input:disabled,textarea:disabled")
  .forEach((control) => (control.disabled = false));
function side(value) {
  card.dataset.side = value;
  document
    .querySelector(".front")
    .setAttribute("aria-hidden", String(value !== "front"));
  document
    .querySelector(".back")
    .setAttribute("aria-hidden", String(value !== "back"));
  turn.innerHTML = `${value === "front" ? "Read the other side" : "See the front"} <span aria-hidden="true">↻</span>`;
}
function update() {
  document.querySelector("#preview-recipient").textContent =
    recipient.value.trim() || "someone lovely";
  document.querySelector("#preview-message").textContent =
    message.value.trim() || "I saw this and thought of you.";
  document.querySelector("#characters").textContent =
    `${message.value.length} / 140`;
  document.querySelector(".status").textContent = "";
  side("back");
  scheduleFit();
}
recipient.addEventListener("input", update);
message.addEventListener("input", update);
turn.addEventListener("click", () =>
  side(card.dataset.side === "front" ? "back" : "front"),
);
document.querySelectorAll(".swatch").forEach((button) =>
  button.addEventListener("click", () => {
    paper = button.dataset.paper;
    document.documentElement.style.setProperty("--paper", papers[paper].color);
    document.querySelector("#paper-name").textContent = papers[paper].name;
    document.querySelectorAll(".swatch").forEach((item) => {
      item.classList.toggle("active", item === button);
      item.setAttribute("aria-pressed", String(item === button));
    });
  }),
);
function escapeXML(text) {
  return text.replace(
    /[&<>"']/g,
    (c) =>
      ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&apos;",
      })[c],
  );
}
// Wrap long words too, so user text remains inside the exported paper.
function lines(text) {
  const result = [];
  for (const paragraph of text.split("\n")) {
    let line = "";
    for (const word of paragraph.split(/\s+/)) {
      const chunks = word.match(/.{1,34}/gu) || [""];
      for (const chunk of chunks) {
        if (line && (line + " " + chunk).length > 34) {
          result.push(line);
          line = chunk;
        } else line += (line ? " " : "") + chunk;
      }
    }
    result.push(line);
  }
  return result;
}
form.addEventListener("submit", (event) => {
  event.preventDefault();
  const to = recipient.value.trim() || "someone lovely";
  const text = message.value.trim() || "I saw this and thought of you.";
  const wrapped = lines(text);
  const lineHeight = Math.min(44, 330 / Math.max(1, wrapped.length));
  const fontSize = Math.min(30, lineHeight * 0.8);
  const rows = wrapped
    .map(
      (line, i) =>
        `<tspan x="64" y="${160 + i * lineHeight}">${escapeXML(line)}</tspan>`,
    )
    .join("");
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="720" height="600" viewBox="0 0 720 600"><title>A note for ${escapeXML(to)}</title><rect width="720" height="600" fill="${papers[paper].color}"/><text x="64" y="88" font-family="Georgia,serif" font-size="24" fill="#482820">For ${escapeXML(to)},</text><text font-family="Georgia,serif" font-size="${fontSize}" fill="#482820">${rows}</text><text x="64" y="536" font-family="Georgia,serif" font-style="italic" font-size="20" fill="#8d4736">with love, always</text></svg>`;
  const url = URL.createObjectURL(
    new Blob([svg], { type: "image/svg+xml;charset=utf-8" }),
  );
  const link = document.createElement("a");
  link.href = url;
  link.download = "a-little-note.svg";
  link.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
  document.querySelector(".status").textContent =
    "Your keepsake file is ready. Nothing was sent.";
});

import { mountMotion } from "./motion.js";

const examples = {
  plan: {
    name: "A neighbourhood book swap",
    prompt:
      "I’d love to start a neighbourhood book swap. Nothing complicated. Just a good reason to meet. Where do I begin?",
    response: `<h2>Start with one table<br>and an open invitation.</h2><p>Keep the first gathering small enough to enjoy. You’re making a place for people to connect; the books are a lovely way in.</p><ol><li><strong>Pick a simple setting.</strong> A shared garden, a community room, or a café that’s happy to host.</li><li><strong>Make the invitation easy.</strong> “Bring a book you liked. Leave with one you haven’t read.”</li><li><strong>Leave room for conversation.</strong> A handwritten note inside each book gives people something to talk about.</li></ol>`,
  },
  explain: {
    name: "The idea behind a commonplace book",
    prompt:
      "I keep saving interesting things and never returning to them. What’s a commonplace book, and how could I make one that I’d actually use?",
    response: `<h2>A collection with<br>a conversation inside it.</h2><p>Think of a commonplace book as a place for ideas you want to keep thinking about. The useful part isn’t how much you collect; it’s what you add to it.</p><ol><li><strong>Keep one small place.</strong> A notebook or a simple document is enough to start.</li><li><strong>Add your own sentence.</strong> Why did this catch your attention? What does it connect to?</li><li><strong>Return with a question.</strong> Look for a recurring theme, a disagreement, or an idea you’d like to try.</li></ol>`,
  },
  write: {
    name: "An invitation that sounds like you",
    prompt:
      "Help me write a warm invitation to our first book swap. Saturday, 11am, in the community garden. Friendly, short, and not too polished.",
    response: `<h2>Bring a book.<br>Find a new favourite.</h2><p>We’re having a little book swap in the community garden this Saturday at 11am. Bring a book you enjoyed and pick up something new to you.</p><p>No need to wrap it or write a review. But if you feel like leaving a note about why you liked it, we’d love that.</p><p>Come for a browse, a chat, or both. See you in the garden.</p>`,
  },
};

let current = "plan";
const motion = mountMotion();
const copy = document.querySelector("#copy");
const status = document.querySelector("#copy-status");

document.querySelectorAll("button:disabled").forEach((button) => {
  button.disabled = false;
});

document.querySelectorAll("[data-example]").forEach((button) => {
  button.addEventListener("click", () => {
    const key = button.dataset.example;
    if (current === key) return;
    current = key;
    const example = examples[key];
    document.querySelectorAll("[data-example]").forEach((item) => {
      item.setAttribute("aria-pressed", String(item === button));
    });
    document.querySelector("#conversation-name").textContent = example.name;
    document.querySelector("#prompt").textContent = example.prompt;
    // These are authored, static samples. No user input is interpolated as HTML.
    document.querySelector("#response").innerHTML = example.response;
    status.textContent = "";
    motion.greet();
  });
});

copy.addEventListener("click", async () => {
  const selected = current;
  const text = document.querySelector("#response").innerText;
  copy.disabled = true;
  try {
    await navigator.clipboard.writeText(text);
    if (selected === current) status.textContent = "Copied";
  } catch {
    // A useful fallback when clipboard permissions are unavailable.
    const url = URL.createObjectURL(
      new Blob([text], { type: "text/plain;charset=utf-8" }),
    );
    const link = document.createElement("a");
    link.href = url;
    link.download = `morrow-${selected}-sample.txt`;
    link.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
    if (selected === current) status.textContent = "Downloaded as a text file";
  } finally {
    copy.disabled = false;
  }
});

window.addEventListener(
  "pagehide",
  (event) => {
    if (!event.persisted) motion.destroy();
  },
  { once: true },
);

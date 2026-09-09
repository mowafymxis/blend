const $ = (s) => document.querySelector(s),
  $$ = (s) => [...document.querySelectorAll(s)];
const seed = [
  {
    id: "1",
    title: "The quiet work of paying attention",
    category: "Design",
    body: "A useful object often makes its best decisions quietly. The handle rests where your hand expects it. The label appears where your eyes look next. Nothing asks you to admire the effort.\n\nThere is a kind of generosity in this: doing the complicated work so someone else can have a simple moment.\n\nToday\u2019s note: look for one ordinary thing that makes the day easier. Notice the decisions inside it.",
    starred: true,
    archived: false,
  },
  {
    id: "2",
    title: "A field guide to slowing down",
    category: "Nature",
    body: "Choose a short walk you already know. Leave the destination alone for a moment. Look instead for the smallest thing that has changed.\n\nA new shoot. A shadow a little longer. A window left open. Familiar places become interesting again when we stop asking them to be new.\n\nThere is no list to finish. One observation is enough.",
    starred: false,
    archived: false,
  },
  {
    id: "3",
    title: "What a good chair understands",
    category: "Design",
    body: "A chair is a small agreement between an object and a body. It offers support without requiring explanation.\n\nIts shape tells us where to sit. Its material tells us how it might feel. Its proportions suggest how long we might stay.\n\nInterfaces make similar agreements. Before adding a new feature, ask what the existing shape already promises.",
    starred: false,
    archived: false,
  },
  {
    id: "4",
    title: "Leave a few loose threads",
    category: "Ideas",
    body: "Not every interesting question needs an answer today. Some ideas are better kept somewhere they can meet another thought later.\n\nWrite down the unfinished part. Name what you still wonder about. Leave enough space to change your mind.\n\nA collection can be useful without becoming complete.",
    starred: true,
    archived: false,
  },
  {
    id: "5",
    title: "The small architecture of a leaf",
    category: "Nature",
    body: "Hold a leaf up to the light. The branching lines are both structure and route: a way to hold a surface and a way to move through it.\n\nThe same shape does more than one job. This is a good thing to remember when a design begins to accumulate parts.\n\nWhat could be simpler if two needs shared one thoughtful decision?",
    starred: false,
    archived: false,
  },
  {
    id: "6",
    title: "Space is part of the sentence",
    category: "Design",
    body: "A pause changes how words arrive. In a page, space can do the same work. It can separate two thoughts, let an image breathe, or make an important action easier to find.\n\nBut more space is not always more clarity. A long gap can break a relationship that needs to stay visible.\n\nSet things close enough to belong, and far enough apart to be understood.",
    starred: false,
    archived: false,
  },
];
let notes = structuredClone(seed),
  view = "all",
  collection = "",
  current = null,
  canStore = true,
  motion = true;
try {
  const stored = JSON.parse(localStorage.getItem("margin-library-v1"));
  if (
    Array.isArray(stored) &&
    stored.every(
      (n) =>
        n &&
        typeof n.id === "string" &&
        typeof n.title === "string" &&
        typeof n.body === "string" &&
        ["Design", "Nature", "Ideas"].includes(n.category) &&
        typeof n.starred === "boolean" &&
        typeof n.archived === "boolean",
    )
  )
    notes = stored;
  motion = localStorage.getItem("margin-motion") !== "off";
} catch {
  canStore = false;
}
const reduced = matchMedia("(prefers-reduced-motion: reduce)"),
  vignettes = [];
let reaction = [],
  reactionTimer;
function announce(s) {
  $("#status").textContent = s;
}
function persist() {
  try {
    localStorage.setItem("margin-library-v1", JSON.stringify(notes));
    canStore = true;
  } catch {
    canStore = false;
  }
  $("#storage-note").textContent = canStore
    ? "Sample library · saved on this device"
    : "Changes kept for this visit · browser storage unavailable";
  return canStore;
}
function react() {
  reaction.forEach((a) => a.cancel());
  clearTimeout(reactionTimer);
  $("#pip-caption").textContent = "A thought worth keeping.";
  if (motion && !reduced.matches) {
    reaction = [
      $(".pip-body").animate(
        [
          { transform: "translateY(0) scale(1)" },
          { transform: "translateY(2px) scale(1.03,.96)", offset: 0.18 },
          { transform: "translateY(-9px) rotate(-5deg)", offset: 0.48 },
          { transform: "translateY(0) rotate(2deg)", offset: 0.79 },
          { transform: "translateY(0) rotate(0)" },
        ],
        { duration: 850, easing: "cubic-bezier(.2,.7,.25,1)" },
      ),
      $(".spark").animate(
        [{ opacity: 0 }, { opacity: 1, offset: 0.45 }, { opacity: 0 }],
        { duration: 1000 },
      ),
    ];
  }
  reactionTimer = setTimeout(() => {
    $("#pip-caption").textContent = "A good place to pause.";
  }, 2100);
}
function render() {
  const q = $("#search").value.toLowerCase().trim();
  let filtered = notes.filter(
    (n) =>
      (view === "archive" ? n.archived : !n.archived) &&
      (view !== "starred" || n.starred) &&
      (!collection || n.category === collection) &&
      (!q || (n.title + " " + n.body).toLowerCase().includes(q)),
  );
  if ($("#sort").value === "title")
    filtered.sort((a, b) => a.title.localeCompare(b.title));
  $("#notes").replaceChildren();
  for (const n of filtered) {
    const row = document.createElement("div");
    row.className = "note-row";
    const symbol = document.createElement("span");
    symbol.className = "note-symbol";
    symbol.textContent = { Design: "a", Nature: "❧", Ideas: "?" }[n.category];
    symbol.setAttribute("aria-hidden", "true");
    const open = document.createElement("button");
    open.className = "note-open";
    const title = document.createElement("strong");
    title.textContent = n.title;
    const small = document.createElement("small");
    small.textContent =
      (seed.some((s) => s.id === n.id) ? "Sample essay" : "Personal note") +
      " · " +
      Math.max(1, Math.ceil(n.body.split(/\s+/).length / 200)) +
      " min read";
    open.append(title, small);
    open.addEventListener("click", () => read(n.id));
    const tag = document.createElement("span");
    tag.className = "note-tag";
    tag.textContent = n.category;
    const star = document.createElement("button");
    star.className = "star";
    star.setAttribute(
      "aria-label",
      (n.starred ? "Remove favorite: " : "Favorite: ") + n.title,
    );
    star.setAttribute("aria-pressed", n.starred);
    star.textContent = n.starred ? "★" : "☆";
    star.addEventListener("click", () => {
      n.starred = !n.starred;
      persist();
      render();
      announce(n.starred ? "Added to favorites." : "Removed from favorites.");
      if (n.starred) react();
      const replacement = [...$("#notes").querySelectorAll(".star")].find((b) =>
        b.getAttribute("aria-label").endsWith(n.title),
      );
      (replacement || $("#search")).focus();
    });
    row.append(symbol, open, tag, star);
    $("#notes").append(row);
  }
  $("#result-count").textContent = filtered.length;
  $("#notes-title").firstChild.textContent =
    (collection ||
      { all: "All notes", starred: "Favorites", archive: "Archive" }[view]) +
    " ";
  $("#empty").hidden = filtered.length > 0;
  $("#empty-copy").textContent =
    q || collection
      ? "No notes match these filters."
      : view === "archive"
        ? "Archived notes will appear here."
        : view === "starred"
          ? "Star a note to find it here."
          : "Save your first note to begin.";
  $("#clear-collection").hidden = !collection;
  $$("[data-collection]").forEach((b) => {
    b.setAttribute("aria-pressed", b.dataset.collection === collection);
    b.querySelector(".collection-count").firstChild.textContent =
      notes.filter((n) => !n.archived && n.category === b.dataset.collection)
        .length + " notes ";
  });
  $("#all-count").textContent = notes.filter((n) => !n.archived).length;
  $("#starred-count").textContent = notes.filter(
    (n) => !n.archived && n.starred,
  ).length;
  $("#archive-count").textContent = notes.filter((n) => n.archived).length;
}
function read(id) {
  current = id;
  const n = notes.find((n) => n.id === id);
  $("#read-title").textContent = n.title;
  $("#read-category").textContent =
    n.category +
    " / " +
    (seed.some((s) => s.id === id) ? "Sample essay" : "Personal note");
  $("#read-body").textContent = n.body;
  $("#archive").textContent = n.archived
    ? "Restore to library"
    : "Archive note";
  $("#reader").showModal();
}
$$("[data-view]").forEach((b) =>
  b.addEventListener("click", () => {
    view = b.dataset.view;
    collection = "";
    $$("[data-view]").forEach((x) => {
      x.classList.toggle("active", x === b);
      x.setAttribute("aria-pressed", x === b);
    });
    render();
  }),
);
$$("[data-collection]").forEach((b) => {
  b.addEventListener("click", () => {
    collection =
      collection === b.dataset.collection ? "" : b.dataset.collection;
    render();
  });
  const animations = [];
  const make = (target, frames, duration = 1100) => {
    const a = target.animate(frames, {
      duration,
      fill: "both",
      easing: "cubic-bezier(.2,.65,.3,1)",
    });
    a.pause();
    a.currentTime = 0;
    animations.push(a);
  };
  if (b.dataset.collection === "Design") {
    make(b.querySelector(".moving"), [
      { transform: "translate(0,0) rotate(0)" },
      { transform: "translate(-3px,-16px) rotate(-5deg)", offset: 0.45 },
      { transform: "translate(0,0) rotate(0)", offset: 0.85 },
      { transform: "translate(0,0) rotate(0)" },
    ]);
    make(b.querySelector(".detail"), [
      { opacity: 0.3 },
      { opacity: 0, offset: 0.2 },
      { opacity: 1, offset: 0.75 },
      { opacity: 1 },
    ]);
  } else if (b.dataset.collection === "Nature") {
    make(
      b.querySelector(".leaf-left"),
      [
        { transform: "scale(1) rotate(0)" },
        { transform: "scale(.15) rotate(25deg)", offset: 0.22 },
        { transform: "scale(1.05) rotate(-4deg)", offset: 0.75 },
        { transform: "scale(1) rotate(0)" },
      ],
      1350,
    );
    make(
      b.querySelector(".leaf-right"),
      [
        { transform: "scale(1) rotate(0)" },
        { transform: "scale(.12) rotate(-25deg)", offset: 0.18 },
        { transform: "scale(1.03) rotate(2deg)", offset: 0.7 },
        { transform: "scale(1) rotate(0)" },
      ],
      1350,
    );
    make(
      b.querySelector(".moving>path:last-child"),
      [
        { opacity: 1 },
        { opacity: 0, offset: 0.16 },
        { opacity: 0, offset: 0.4 },
        { opacity: 1, offset: 0.85 },
        { opacity: 1 },
      ],
      1350,
    );
    make(
      b.querySelector(".detail"),
      [{ opacity: 0.4 }, { opacity: 1, offset: 0.4 }, { opacity: 1 }],
      1350,
    );
  } else {
    make(b.querySelector(".filament"), [
      { strokeDashoffset: 0 },
      { strokeDashoffset: 100, offset: 0.2 },
      { strokeDashoffset: 0, offset: 0.75 },
      { strokeDashoffset: 0 },
    ]);
    make(b.querySelector(".detail"), [
      { opacity: 0.3, transform: "scale(1)" },
      { opacity: 0, transform: "scale(.85)", offset: 0.24 },
      { opacity: 1, transform: "scale(1.06)", offset: 0.78 },
      { opacity: 1, transform: "scale(1)" },
    ]);
    make(b.querySelector(".moving>path"), [
      { fill: "#e7ddef" },
      { fill: "#e7ddef", offset: 0.3 },
      { fill: "#f5e8bb", offset: 0.78 },
      { fill: "#f5e8bb" },
    ]);
  }
  const sync = () => {
    if (!motion || reduced.matches) {
      animations.forEach((a) => {
        a.pause();
        a.currentTime = 0;
      });
      return;
    }
    const active = b.matches(":hover") || b.matches(":focus-visible");
    animations.forEach((a) => {
      a.playbackRate = active ? 1 : -1;
      a.play();
    });
  };
  ["pointerenter", "pointerleave", "focus", "blur"].forEach((e) =>
    b.addEventListener(e, sync),
  );
  vignettes.push({ animations, sync });
});
$("#search").addEventListener("input", render);
$("#sort").addEventListener("change", render);
$("#clear-collection").addEventListener("click", () => {
  collection = "";
  render();
});
$("#reset").addEventListener("click", () => {
  collection = "";
  $("#search").value = "";
  render();
  $("#search").focus();
});
$("#add-note").addEventListener("click", () => {
  $("#editor").showModal();
  $("#note-title").focus();
});
$$("[data-close]").forEach((b) =>
  b.addEventListener("click", () => $("#" + b.dataset.close).close()),
);
$("#note-form").addEventListener("submit", (e) => {
  e.preventDefault();
  const title = $("#note-title").value.trim(),
    body = $("#note-body").value.trim();
  if (!title || !body) {
    $("#form-error").hidden = false;
    $("#form-error").textContent = "Add a title and a note before saving.";
    announce("Add a title and a note before saving.");
    (!title ? $("#note-title") : $("#note-body")).focus();
    return;
  }
  notes.unshift({
    id: crypto.randomUUID(),
    title,
    body,
    category: $("#note-collection").value,
    starred: false,
    archived: false,
  });
  persist();
  view = "all";
  collection = "";
  $("#search").value = "";
  $$("[data-view]").forEach((b) => {
    const active = b.dataset.view === "all";
    b.classList.toggle("active", active);
    b.setAttribute("aria-pressed", active);
  });
  render();
  $("#editor").close();
  $("#note-form").reset();
  $("#form-error").hidden = true;
  announce(
    canStore
      ? "Note saved on this device."
      : "Note saved for this visit; browser storage is unavailable.",
  );
  react();
});
$("#archive").addEventListener("click", () => {
  const n = notes.find((n) => n.id === current);
  n.archived = !n.archived;
  persist();
  $("#reader").close();
  render();
  $("#search").focus();
  announce(n.archived ? "Note moved to archive." : "Note restored to library.");
});
function updateMotion() {
  $("#motion").setAttribute("aria-pressed", motion);
  $("#motion").firstChild.textContent = motion ? "Motion on " : "Motion off ";
  vignettes.forEach((v) => v.sync());
  if (!motion || reduced.matches) {
    reaction.forEach((a) => a.cancel());
    clearTimeout(reactionTimer);
    $("#pip-caption").textContent = "A good place to pause.";
  }
}
$("#motion").addEventListener("click", () => {
  motion = !motion;
  try {
    localStorage.setItem("margin-motion", motion ? "on" : "off");
  } catch {}
  updateMotion();
});
reduced.addEventListener("change", updateMotion);
document.addEventListener("visibilitychange", () => {
  if (document.hidden) {
    vignettes.forEach((v) => v.animations.forEach((a) => a.pause()));
    reaction.forEach((a) => a.cancel());
    clearTimeout(reactionTimer);
    $("#pip-caption").textContent = "A good place to pause.";
  } else updateMotion();
});
addEventListener("keydown", (e) => {
  if (
    e.key === "/" &&
    !["INPUT", "TEXTAREA", "SELECT"].includes(document.activeElement.tagName) &&
    !document.querySelector("dialog[open]")
  ) {
    e.preventDefault();
    $("#search").focus();
  }
});
$$("button:disabled,input:disabled,select:disabled").forEach(
  (e) => (e.disabled = false),
);
render();
updateMotion();
if (!canStore)
  $("#storage-note").textContent =
    "Browser storage unavailable · changes last for this visit";

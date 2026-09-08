/* Session-only sample records. No network or persistent storage. */
const initialJobs = [
  {
    id: 1042,
    customer: "Morgan Reed",
    bike: "Blue commuter · City 3",
    repair: "Brake service",
    status: "In progress",
    due: "Today",
    owner: "Alex",
    note: "Inspect the pads before fitting the new rear cable.",
  },
  {
    id: 1043,
    customer: "Sam Okafor",
    bike: "Slate gravel · GR 520",
    repair: "Replace rear rotor",
    status: "Waiting for parts",
    due: "Tomorrow",
    owner: "Jules",
    note: "Replacement rotor is on order. Confirm arrival before scheduling.",
  },
  {
    id: 1044,
    customer: "Ellis Chen",
    bike: "Silver road · Allez",
    repair: "Wheel alignment",
    status: "Queued",
    due: "Today",
    owner: "Alex",
    note: "Rear wheel rubs under load. Check spoke tension.",
  },
  {
    id: 1045,
    customer: "Robin Patel",
    bike: "Green city · Step-through",
    repair: "Annual tune-up",
    status: "Ready",
    due: "Today",
    owner: "Jules",
    note: "Tune-up complete. Collection has not been arranged in this demo.",
  },
  {
    id: 1046,
    customer: "Jamie Brooks",
    bike: "Black cargo · Longtail",
    repair: "Drivetrain clean",
    status: "In progress",
    due: "Tomorrow",
    owner: "Alex",
    note: "Clean and inspect the chain before adjusting the rear derailleur.",
  },
  {
    id: 1047,
    customer: "Casey Diaz",
    bike: "Red mountain · Trail 7",
    repair: "Gear adjustment",
    status: "Queued",
    due: "This week",
    owner: "Jules",
    note: "Shifting skips between the middle gears.",
  },
];
let jobs = initialJobs.map((job) => ({ ...job }));
let selected = jobs[0].id;
const $ = (selector) => document.querySelector(selector);
const statuses = ["Queued", "In progress", "Waiting for parts", "Ready"];
const statusClass = (status) =>
  ({ "In progress": "progress", "Waiting for parts": "parts", Ready: "ready" })[
    status
  ] || "";
function el(tag, text, className) {
  const node = document.createElement(tag);
  if (text !== undefined) node.textContent = text;
  if (className) node.className = className;
  return node;
}
function announce(message) {
  $("#announcement").textContent = message;
}
function render() {
  const query = $("#search").value.toLowerCase().trim();
  const filter = $("#filter").value;
  const visible = jobs.filter(
    (job) =>
      (filter === "All" || job.status === filter) &&
      `${job.customer} ${job.bike} ${job.repair} ${job.id}`
        .toLowerCase()
        .includes(query),
  );
  if (!visible.some((job) => job.id === selected)) selected = visible[0]?.id;
  $("#jobs").replaceChildren(
    ...visible.map((job) => {
      const row = el("tr");
      row.dataset.selected = String(job.id === selected);
      const identity = el("td");
      const button = el("button", job.customer, "record");
      button.dataset.id = job.id;
      button.setAttribute(
        "aria-label",
        `Open repair ${job.id} for ${job.customer}`,
      );
      button.setAttribute("aria-pressed", String(job.id === selected));
      button.addEventListener("click", () => {
        selected = job.id;
        render();
        if (matchMedia("(max-width: 1180px)").matches) {
          $("#detail-title").focus();
          $("#detail").scrollIntoView({ block: "start" });
        } else $(`button[data-id="${job.id}"]`).focus();
        announce(`Opened ${job.customer}'s repair.`);
      });
      identity.append(button, el("span", job.bike, "bike"));
      const status = el("td");
      status.append(el("span", job.status, `pill ${statusClass(job.status)}`));
      row.append(identity, el("td", job.repair), status, el("td", job.due));
      return row;
    }),
  );
  $("#empty").hidden = visible.length > 0;
  $("#result-count").textContent =
    `${visible.length} ${visible.length === 1 ? "job" : "jobs"}`;
  $("#queue-count").textContent = jobs.length;
  $("#open-count").textContent = jobs.filter(
    (j) => j.status !== "Ready",
  ).length;
  $("#progress-count").textContent = jobs.filter(
    (j) => j.status === "In progress",
  ).length;
  $("#parts-count").textContent = jobs.filter(
    (j) => j.status === "Waiting for parts",
  ).length;
  $("#ready-count").textContent = jobs.filter(
    (j) => j.status === "Ready",
  ).length;
  renderDetail(jobs.find((job) => job.id === selected));
}
function renderDetail(job) {
  const detail = $("#detail");
  detail.replaceChildren();
  if (!job) {
    const title = el("h3", "No repair selected");
    title.id = "detail-title";
    detail.append(title, el("p", "Clear the filters to return to your queue."));
    return;
  }
  const ticket = el("div", undefined, "ticket");
  ticket.append(
    el("span", `REPAIR #${job.id}`),
    el("span", job.status, `pill ${statusClass(job.status)}`),
  );
  const title = el("h3", job.customer);
  title.id = "detail-title";
  title.tabIndex = -1;
  const art = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  art.setAttribute("viewBox", "0 0 240 100");
  art.setAttribute("class", "bike-art");
  art.setAttribute("aria-hidden", "true");
  art.innerHTML =
    '<g fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="52" cy="65" r="28"/><circle cx="187" cy="65" r="28"/><path d="M52 65l42-46 29 46H52l35-35h79l21 35M123 65l43-35-8-20h-15M80 19h25M123 65l12 5m-9 0h13"/></g>';
  const dl = el("dl");
  for (const [label, value] of [
    ["Work requested", job.repair],
    ["Assigned to", job.owner],
    ["Due", job.due],
    ["Workshop note", job.note],
  ])
    dl.append(el("dt", label), el("dd", value));
  const form = el("form");
  const label = el("label", "Repair status");
  label.htmlFor = "job-status";
  const select = el("select");
  select.id = "job-status";
  for (const status of statuses) {
    const option = el("option", status);
    option.value = status;
    select.append(option);
  }
  select.value = job.status;
  const save = el("button", "Save status", "primary");
  save.type = "submit";
  const back = el("button", "Back to queue", "back-to-queue");
  back.type = "button";
  back.addEventListener("click", () => {
    ($(`button[data-id="${job.id}"]`) || $("#search")).focus();
  });
  form.append(label, select, save, back);
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    job.status = select.value;
    render();
    ($("#job-status") || $("#filter")).focus();
    announce(`Repair ${job.id} saved as ${job.status}.`);
  });
  detail.append(ticket, title, el("p", job.bike, "detail-bike"), art, dl, form);
}
$("#search").addEventListener("input", render);
$("#filter").addEventListener("change", () => {
  render();
  announce(`${$("#result-count").textContent} shown.`);
});
$("#clear-filters").addEventListener("click", () => {
  $("#search").value = "";
  $("#filter").value = "All";
  render();
  $("#search").focus();
});
$("#reset").addEventListener("click", () => {
  jobs = initialJobs.map((job) => ({ ...job }));
  selected = jobs[0].id;
  $("#search").value = "";
  $("#filter").value = "All";
  render();
  announce("Sample queue reset.");
});
const dialog = $("#new-repair");
$("#add-job").addEventListener("click", () => dialog.showModal());
$("#close-dialog").addEventListener("click", () => dialog.close());
dialog.addEventListener("close", () => $("#add-job").focus());
$("#repair-form").addEventListener("submit", (event) => {
  event.preventDefault();
  const data = new FormData(event.currentTarget);
  for (const name of ["customer", "bike", "repair"]) {
    const input = event.currentTarget.elements.namedItem(name);
    if (!String(data.get(name)).trim()) {
      input.setCustomValidity("Enter a value, not just spaces.");
      input.reportValidity();
      return;
    }
  }
  const job = {
    id: Math.max(...jobs.map((j) => j.id)) + 1,
    customer: String(data.get("customer")).trim(),
    bike: String(data.get("bike")).trim(),
    repair: String(data.get("repair")).trim(),
    due: String(data.get("due")),
    status: "Queued",
    owner: "Alex",
    note: "New sample repair. Inspect the bike before starting work.",
  };
  jobs.push(job);
  selected = job.id;
  $("#search").value = "";
  $("#filter").value = "All";
  render();
  dialog.close();
  event.currentTarget.reset();
  announce(`Repair ${job.id} added to the queue.`);
});
$("#repair-form").addEventListener("input", (event) =>
  event.target.setCustomValidity?.(""),
);
render();
for (const control of document.querySelectorAll("[disabled]"))
  control.disabled = false;

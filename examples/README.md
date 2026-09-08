# Frontend examples

| Example | Design decision | Working flow |
|---|---|---|
| [Bench](bench/index.html) | Compact green workspace with comparable rows and persistent repair details | Search/filter, inspect a repair, save status, add a validated sample job, reset |
| [Afterlight](afterlight/index.html) | Dark editorial page with warm serif type and original observatory illustration | Choose arrival and activity, inspect the schedule, download a matching text plan |

These are independent domains and compositions, not templates to repeat. Bench demonstrates repeated work; Afterlight demonstrates discovery and a bounded planning task. Neither requires photography, a motion library, a build step, or a network service.

## Run

From the repository root with Python 3:

```sh
python -m http.server 18789 --bind 127.0.0.1
```

Open [the gallery](http://127.0.0.1:18789/examples/), [Bench](http://127.0.0.1:18789/examples/bench/), or [Afterlight](http://127.0.0.1:18789/examples/afterlight/). Choose another unused port if necessary. All assets are local. Direct file opening may have browser-dependent download restrictions; local serving is the verified path.

## Demonstration boundaries

Bench has six fictional repair records. Changes remain in memory until reload; the reset action restores the sample queue. It sends no notifications and stores no customer data. Without JavaScript the layout explains the demo and controls remain disabled; editing requires JavaScript.

Afterlight describes a fictional event with an illustrative schedule. It provides no tickets, live availability, weather, accessibility guarantee, or astronomical predictions. The original SVG is illustration, not a sky map. Without JavaScript, the event content and default schedule remain readable; interactive planning stays disabled. Downloading uses a local text file and sends nothing.

## Verify

- **Bench:** search by customer, bike, repair, and ticket number; combine search and status filters; clear no-match results; select a job; change its status; verify counts and retained filters. If an edit removes the job from the filtered set, select the next visible job and retain keyboard focus in the interface. Add a job with empty, whitespace-only, long, and ordinary input. Check dialog Escape, focus return, and reset. Reload to confirm the stated session boundary.
- **Afterlight:** choose each activity and both ends of the arrival range using pointer and keyboard. Verify start time plus 15 minutes and the activity duration against the displayed finish time. Download the text and compare it with the selected schedule. Check disclosures, links, and native expandable questions.
- **Both:** inspect desktop, 390px and 320px layouts, long text, keyboard focus, reduced motion before load and toggled live, missing assets, console errors, and JavaScript-disabled states. These examples have only brief optional feedback; they do not demonstrate pinned scroll or a mascot rig.

Use [the wider verification guide](../references/verification.md) for other task types. Showcases alone do not establish that skill revisions improve fresh model outputs.

## Refresh previews

Serve locally, load each default route at 1440 × 1050, and capture the viewport at the top of the page. Save the reviewed images to `assets/bench-preview.png` and `assets/afterlight-preview.png`. Check the gallery and README links after replacement. Interactions need separate testing; a screenshot is not proof that a task works.

Selected previews were refreshed on 2026-09-09.

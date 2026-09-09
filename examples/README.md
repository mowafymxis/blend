# Company landing-page examples

Two original company landing pages apply the Blend suite to different offers, compositions, and types of evidence. They are handcrafted demonstrations, not templates to repeat or proof of consistent model output quality.

| Example | Direction | Working behavior |
|---|---|---|
| [Morrow](morrow/index.html) | An AI-company concept; editorial Newsreader, quiet DM Sans UI, an original paper mascot, and articulated line illustrations | Three scripted conversations, response copy with a text-download fallback, mascot greeting, and finite illustration replay |
| [Format](format/index.html) | A design-company concept; direct sans-serif typography and original festival/packaging artwork | Expandable project explanations, a print-registration sequence, and a project-brief builder with a local download |

## Run

From the repository root with Python 3:

```sh
python -m http.server 18789 --bind 127.0.0.1
```

Open [the gallery](http://127.0.0.1:18789/examples/), [Morrow](http://127.0.0.1:18789/examples/morrow/), or [Format](http://127.0.0.1:18789/examples/format/). No build or package installation is required. Use HTTP for Morrow's JavaScript modules. Fonts and illustrations are local; there are no external asset requests or runtime libraries.

## Morrow: product evidence with a small companion

The landing page introduces a fictional AI workspace through a clear offer and an inspectable conversation. The demo selector changes the prompt and complete response immediately. Its three examples are authored text, visibly labeled as scripted; there is no live model, fake latency, or network request. Copy writes the selected response to the clipboard. If clipboard access fails, the same response downloads as a text file.

The original mascot is a small folded paper character with separately owned body, face, arm, and eye motion. It gives one short greeting and can be replayed through its named button. A sample selection can trigger a reaction while the character is visible. It does not loop indefinitely or pretend to communicate model progress.

The three feature illustrations perform different internal actions: sheets fan and collect into a tray, connections reroute around a fixed node structure, and document lines recompose before a seal resolves. The accent withdraws before the main change; its body returns before its interior mark finishes. The card, heading, and replay control stay still.

One clock owns each finite episode. Pointer entry, replay-button focus, and click start it; repeated input during playback continues the same episode without queuing a restart. Opening and closing poses agree. Each episode lasts about two seconds, including its final recognition beat, then stops. Reduced motion, offscreen exit, document hiding, and teardown settle and cancel work.

## Format: the work carries the page

Two self-initiated fictional identity systems provide the visual evidence. Common Ground is an architecture-festival identity with a poster, programme, and ticket. Good Measure is a pantry identity with original olive and tomato illustrations. These are authored DOM/CSS/SVG compositions, not photographs, live 3D models, or real client work.

Each project's control expands a concise account of its idea and graphic system. The print-registration vignette keeps its crop marks fixed while two ink layers separate and realign; a finishing badge and check resolve afterward. Hover, replay-button focus, and click trigger a finite sequence. Repeated activation does not queue episodes. Hidden/offscreen and reduced-motion states stop the animation.

The brief builder validates a project name and description, preserves entered content, and downloads those notes with the selected project type. It rejects whitespace-only required input. Nothing is submitted or persisted by the page. The download notice explains the actual local result.

## Verify a change

- Follow primary calls to action, project/section links, and the gallery return.
- Morrow: choose all examples, verify prompt/response agreement, copy each response, and test the blocked-clipboard download fallback.
- Morrow motion: replay each scene repeatedly and midway through playback; inspect contraction, reconfiguration, return, resolution, and rest. Check stationary frame/text bounds and the small mascot at its actual display size.
- Format: open and close each project by pointer and keyboard; reject empty/whitespace input, enter a brief, download it, and inspect the file contents.
- Format motion: inspect both ink layers and the finishing mark separately; replay during motion and after settling.
- Both: check wide, narrow, and short views; readable supporting text; keyboard focus; initial/live reduced motion; hidden/offscreen behavior; asset/console errors; and JavaScript-disabled content.

Without JavaScript, both pages retain complete readable content and disabled dependent controls. Format's project explanations are expanded in that branch; the brief fields remain disabled. Neither example collects data, creates an account, or sends an inquiry.

Use the [suite review guide](../skills/blend-review/references/verification.md), [quality calibration](../skills/blend-art-direction/references/quality-bar.md), and [staged illustration guide](../skills/blend-micro-motion/references/staged-illustrations.md) for broader changes. Local scripts, captures, and audit reports belong in ignored `.maintainer/`; selected previews live in `assets/`.

## Asset provenance

All example text, mascot shapes, illustrations, diagrams, identity applications, and packaging artwork are original to this repository. Newsreader, DM Sans, and the gallery's Manrope are local Latin font subsets from Google Fonts under the SIL Open Font License. Their notices are in [fonts/](fonts/). See [repository attribution](../THIRD_PARTY_NOTICES.md).

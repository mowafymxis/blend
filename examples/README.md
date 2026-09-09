# Frontend examples

These examples use the Blend suite for different tasks. They are handcrafted demonstrations, not templates to repeat or independent proof of improved model output.

| Example | Direction | Working behavior |
|---|---|---|
| [Margin](margin/index.html) | A warm reading workspace; Newsreader display type and DM Sans UI; small original SVG illustrations and a bookmark companion | Search, collection filters, favorites, reading view, new notes, archive/restore, local persistence, and motion toggle |
| [Relay](relay/index.html) | A cool product study; Manrope typography, a soft contact shadow, and a considered object composition | Reversible live 3D assembly, finish selection, view angle, local illustration motion, and failure fallback |

## Run

From the repository root with Python 3:

```sh
python -m http.server 18789 --bind 127.0.0.1
```

Open [the gallery](http://127.0.0.1:18789/examples/), [Margin](http://127.0.0.1:18789/examples/margin/), or [Relay](http://127.0.0.1:18789/examples/relay/). Use an HTTP server rather than opening Relay as a file, because its renderer uses JavaScript modules. No npm installation or build is required. Fonts and the Three.js runtime are local assets.

## Margin: a stable reading surface

The composition keeps recurring tasks close: navigation, collections, search, and a list of notes. The collection card boundaries stay still while their illustrations perform distinct local sequences. The book lifts and settles, the leaves contract and unfold, and the filament redraws before its rays resolve. Hover and keyboard focus drive the same timeline intention; rapid leave reverses from the current pose. Touch directly filters the collection.

The companion is an original lavender bookmark character, built from separate body, face, and accent groups. It makes a short reaction after a note is saved or favorited. It does not bounce indefinitely or invent background work. The Motion button and reduced-motion preference suppress the decorative sequences. A textual status reports actual outcomes.

Notes are stored under `margin-library-v1` in this origin's local storage; the motion preference uses `margin-motion`. If storage is denied, edits remain available for that visit and the interface says so. No notes are uploaded. The six initial essays are original sample content. Clearing those two storage keys restores the demo defaults on reload. Without JavaScript, the composition remains visible with dependent controls disabled and an explanation.

## Relay: a connected object study

The live scene contains an original procedural shell, two drivers, a grille, feet, and a top dial. Scrolling separates the parts, turns the grille enough to reveal the drivers, holds the assembly, and returns it to a complete object. Positions are derived from measured scroll progress; reversing or jumping reproduces the same pose. The camera pulls back slightly during separation to preserve the composition.

Finish and angle controls change the same object. “View your object” returns to the assembled view. Three local technical drawings below the scene have restrained pointer responses; their explanatory text remains stationary. They are decorative rather than controls.

The renderer works on demand, stops when hidden or out of view, and disposes owned resources on teardown. The simple contact shadow is an authored soft texture. Small screens and reduced-motion settings use an assembled view without pin space. A captured poster and disabled controls provide a truthful alternative if initialization or WebGL context is lost. Relay is an illustrative concept, not an acoustic simulation or a product for sale.

## Verify a change

- Margin: find a note, filter a collection, open/close it without losing the filter, create a note, reload, favorite it, archive it, and restore it. Test no matches, whitespace-only input, long text, and blocked storage.
- Margin motion: hover/focus each collection, interrupt it midway, toggle Motion, and change reduced motion while open. Save or favorite repeatedly; the companion must not queue reactions.
- Relay: inspect start, separation, hold, return, reverse, direct jumps, and restored scroll. Select each finish and change the angle. Resize midway; check the skip/return links and renderer-failure fallback.
- Both: inspect wide, narrow, and short layouts; keyboard focus; console and asset errors; JavaScript-disabled behavior; initial and live reduced motion; and actual text contrast.

Use the [suite review guide](../skills/blend-review/references/verification.md) for broader evaluation. Local test scripts, trial captures, and historical reports belong in ignored `.maintainer/`, not in these example folders. Selected preview images live under `assets/` at the repository root.

## Asset provenance

All example UI, text, illustrations, character shapes, and procedural geometry are authored for this repository. Newsreader, DM Sans, and Manrope are bundled Latin font subsets from Google Fonts under the SIL Open Font License; their notices are in [fonts/](fonts/). The unmodified Three.js modules and license are in [Relay's vendor folder](relay/vendor/). See [repository attribution](../THIRD_PARTY_NOTICES.md).

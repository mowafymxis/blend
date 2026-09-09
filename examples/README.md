# Frontend examples

These examples demonstrate decisions, not templates to repeat. Both are fictional and keep their interactions local.

| Example | Why this medium | Motion that belongs here |
|---|---|---|
| [Postscript](postscript/index.html) | A generated still life gives paper and flowers a tactile quality without needing interactive geometry | A short handwritten aside, an ink underline, a small paper lift, and a reversible note flip |
| [Relay](relay/index.html) | Live geometry reveals construction and supports changing the finish and view | A connected, reversible scroll assembly with a recognition hold; precise, immediate controls |

Postscript does not need a pinned story or a WebGL model. Relay benefits from actual spatial layers, so a single rendered image would not fulfill its interaction. These choices are specific to these examples; handwriting, orange objects, and paper textures are not Blend defaults.

## Run

With Python 3, from the repository root:

```sh
python -m http.server 18789 --bind 127.0.0.1
```

Open [the gallery](http://127.0.0.1:18789/examples/), [Postscript](http://127.0.0.1:18789/examples/postscript/), or [Relay](http://127.0.0.1:18789/examples/relay/). There is no package installation or build step. All runtime assets are local. Relay includes pinned Three.js 0.186.0 modules in `relay/vendor/`; its license is retained there. Open through the local server, since browsers restrict module loading from file URLs.

## Postscript

Hover or focus the picture to draw the monoline word “hello.” The actual link and hit area remain stable. This is authored SVG pen motion over a generated still image, not regenerated text. The image's subject stays still; its paper mat lifts slightly.

Choose a paper, enter a recipient and message, and turn the preview over. The transition retargets if interrupted. The note adjusts its type for long content and rejects excessive line breaks that would not fit legibly. Download creates an SVG containing escaped user text and the chosen paper color. Nothing is sent or saved by the page; reload clears the note. The image is an illustrative generated asset, not a photograph of a real stationery business.

Check rapid hover/leave, keyboard focus, repeated flip clicks, each paper, long unbroken text, line breaks, special characters, and the downloaded file. Inspect 320px and 390px layouts. Reduced motion removes animated turns and draws the optional aside immediately. Without JavaScript, the visual page remains readable and editing controls are disabled.

## Relay

The speaker is original procedural mesh geometry: a shell, two stylized drivers, a textured grille, a dial, and feet. One scroll controller sets their poses from progress. It separates the parts, holds the relationship, then reassembles and turns slightly. The texture and label are generated locally in canvas. Neither video nor raster frame sequences drive the scene.

Change the finish or angle, then return to the object. Functional state updates immediately. Rendering is scheduled on demand and suspended offscreen or in a hidden tab. At 760px and below, or with reduced motion, the page uses a compact assembled view. If the library or WebGL fails, a captured still and explanatory text remain; controls are disabled and a reload action is offered. Reload/history restoration accounts for pinning being enabled after initialization. The page stores only its last scroll position in session storage for that purpose.

Check start, quarter points, end, reverse scroll, fast scroll, reload midway, resize, finish choices, keyboard range controls, skip/return links, and WebGL context loss. Verify initial and runtime reduced motion and JavaScript-disabled fallback. The model is an illustrative concept, not a physically validated speaker; no audio or acoustic performance is claimed.

## Maintain

Keep selected previews in `assets/`; keep exploratory captures, local verification scripts, and historical material in ignored `.maintainer/`. Update the gallery and root README when replacing examples. No audit or session reports belong in the published tree.

For previews, capture the opening viewport at 1440 × 1050 after fonts, images, and the first scene render settle. Save `assets/postscript-preview.png` and `assets/relay-preview.png`. Refresh Relay's fallback from its assembled object view with surrounding copy hidden, saving `relay/speaker-poster.webp`. Previews were refreshed on 2026-09-09. Screenshots establish composition, not motion quality or frame rates.

For Three.js updates, replace both `three.module.js` and `three.core.js` from the same pinned npm version and preserve its license; rerun the scene checks. Do not add source maps or unused addons. The original files are distributed by [Three.js](https://www.npmjs.com/package/three).

Use [the verification guide](../references/verification.md) for skill-level evaluation. These handcrafted examples do not establish improvements across future model runs.

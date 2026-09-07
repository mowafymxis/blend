# Frontend examples

Two independent, runnable concept projects show different applications of Blend:

| Example | Visual direction | Working interactions |
|---|---|---|
| [Frequency](frequency/index.html) | Dark, compact music workspace; original geometric cover art | Search, genre filters, saved-mix view, empty state, bounded synth previews, stop control |
| [Forma Atelier](architecture/index.html) | Warm editorial architecture; large image crops and serif display type | Anchor navigation, image hover, native project dialog, Escape dismissal and focus return |

Frequency uses fictional mixes and original 8-second Web Audio synth sketches, not licensed recordings. Saved mixes last for the current page session. Forma is a fictional studio with an imagined project and an illustrative contact address, not a working commission inquiry service. Its architecture image was generated with the built-in imagegen tool.

Open each `index.html` in a browser, or serve the repository root:

```sh
python -m http.server 8765 --bind 127.0.0.1
```

Visit [Frequency](http://127.0.0.1:8765/examples/frequency/) or [Forma Atelier](http://127.0.0.1:8765/examples/architecture/). All artwork is local; neither page needs a package installation or build step.

README screenshots were captured in Edge on 2026-09-08: Frequency at 1440 × 1000, Forma at 1440 × 1160. To regenerate, open each page at its documented viewport, wait for images to decode, remain at the top, and capture the viewport. They are stills of the rendered pages, not motion evidence.

### Architecture asset prompt

The original asset is [courtyard.png](architecture/courtyard.png). Generated with the built-in imagegen tool using this prompt:

> Create a photorealistic architectural concept image for a fictional architecture studio portfolio. Landscape 3:2 composition. A beautifully proportioned low monolithic rammed-earth and pale travertine courtyard residence in an arid Mediterranean landscape. View through a deep rectangular shaded colonnade, one monumental rust-red wall to the left, cream stone planes, a still shallow reflecting pool in foreground, sculptural olive tree near right edge, blue sky, hard late-afternoon sunlight with elongated precise shadows. Premium architectural magazine photography, quiet material tactility, authentic scale, cinematic but restrained, no people, no text, no logos, no website UI. Building occupies whole image with a carefully framed wide perspective and strong geometric composition. Save the output for use as a local website asset.

## Motion lab

Open `index.html` in a browser, or serve the repository root:

```sh
python -m http.server 8765 --bind 127.0.0.1
```

Visit [the local lab](http://127.0.0.1:8765/examples/). No packages, build step, remote assets, or video are required.

- Hover or keyboard-focus **Explore the studies** to draw its original scribble.
- Scroll through **Pieces find their place** on a wide, tall viewport. Three live CSS planes converge and rotate. Reverse scroll to reverse the scene. This demonstrates CSS 3D, not a WebGL model or video.
- Hover/focus **Say hello**, then activate it for Pip's bounded greeting. Pip is original SVG artwork.
- On narrow/short viewports and reduced motion, the assembly becomes a compact still. Changing reduced motion while the page is open updates the behavior.

`lab.css` owns local feedback and poses. `lab.js` owns scroll transforms and mascot event state. Nested SVG groups keep the greeting animation separate from the notice pose. The static document retains the content without JavaScript; the greeting control is disabled with a short noscript explanation.

These are focused demonstration components, not a complete product or a WebGL benchmark. For true mesh-based 3D and app-connected mascot states, follow [3D and mascots](../references/3d-and-mascots.md). Browser coverage and remaining limits are recorded in [AUDIT.md](../AUDIT.md).

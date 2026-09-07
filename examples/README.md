# Frontend examples

Two independent, runnable concept projects show different applications of Blend:

| Example | Visual direction | Working interactions |
|---|---|---|
| [Frequency](frequency/index.html) | Dark, compact music workspace; original geometric cover art | Search, genre filters, saved-mix view, empty state, bounded synth previews, stop control |
| [Forma Atelier](architecture/index.html) | Warm editorial architecture; large image crops and serif display type | Anchor navigation, image hover, native project dialog, Escape dismissal and focus return |

Frequency uses fictional mixes and original 8-second synth sketches. Saved mixes last for the current page session. Forma is a fictional studio with an imagined project, AI-generated imagery, and an illustrative contact address.

Open each `index.html` in a browser, or serve the repository root:

```sh
python -m http.server 8765 --bind 127.0.0.1
```

Visit [Frequency](http://127.0.0.1:8765/examples/frequency/) or [Forma Atelier](http://127.0.0.1:8765/examples/architecture/). All artwork is local; neither page needs a package installation or build step.

## Motion lab

Open [index.html](index.html), or visit [the local lab](http://127.0.0.1:8765/examples/) while the server is running.

- Hover or keyboard-focus **Explore the studies** to draw its original scribble.
- Scroll through **Pieces find their place** on a wide, tall viewport. Three live CSS planes converge and rotate. Reverse scroll to reverse the scene. This demonstrates CSS 3D, not a WebGL model or video.
- Hover/focus **Say hello**, then activate it for Pip's bounded greeting. Pip is original SVG artwork.
- On narrow/short viewports and reduced motion, the assembly becomes a compact still. Changing reduced motion while the page is open updates the behavior.

`lab.css` owns local feedback and poses. `lab.js` owns scroll transforms and mascot event state. Nested SVG groups keep the greeting animation separate from the notice pose. The static document retains the content without JavaScript; the greeting control is disabled with a short noscript explanation.

For mesh-based 3D and app-connected mascot states, see [3D and mascots](../references/3d-and-mascots.md).

## Updating the previews

Capture Frequency at 1440 × 1000 and Forma at 1440 × 1160. Wait for images to load, remain at the top, and capture the viewport. Save the images in `assets/` at the repository root and check their README links. Exercise interactions separately; screenshots do not verify motion.

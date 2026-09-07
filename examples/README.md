# Motion lab

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

The README mascot preview was captured on 2026-09-08 in Edge at a 1100 × 800 viewport. To regenerate, serve the lab, keyboard-focus “Say hello,” press Enter, wait 800 ms for the greeting to settle, and capture the `#character` element. The image is a still, not motion evidence.

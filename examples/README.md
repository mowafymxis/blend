# Company examples

Two independent sites show how Blend adapts to different companies:

| Example | Direction | Working interactions |
|---|---|---|
| [Oddfield](oddfield/index.html) | Expressive design studio, bold orange type, original concept projects | Project filters, project-detail dialogs, keyboard dismissal and focus return, validated brief builder, text download |
| [Trace](trace/index.html) | Playful AI company, sunny yellow canvas, original lilac character, source-linked answer playground | User-triggered high-five, three prepared sample answers, source previews and matching downloads, copy feedback, keyboard-operable disclosures |

Oddfield is a fictional studio with self-initiated concept work. Its Yuzu Club image is AI-generated; Night School and Still are original graphic/interface studies. The Still mockup is not an audio player. Its controls are part of a clearly labeled visual concept, inside the project-details button.

Trace is a fictional AI company. Its walkthrough uses fictional documents and prepared sample answers, visibly labeled as a demo without a live model. It does not connect to an AI service or search a real workspace. The product brief describes the boundary. Neither site sends form content or documents to a service. Oddfield's brief stays in the page until downloaded; Trace copies only when the user requests it.

## Run locally

From the repository root, with Python 3 installed:

```sh
python -m http.server 8789 --bind 127.0.0.1
```

Open [the gallery](http://127.0.0.1:8789/examples/), [Oddfield](http://127.0.0.1:8789/examples/oddfield/), or [Trace](http://127.0.0.1:8789/examples/trace/). Choose another unused port if needed. All assets are local; no package installation or build step is required. Direct `index.html` opening also works, with browser-dependent local-file download and clipboard restrictions.

## The paper assembly is optional

The [motion lab](motion-lab/index.html) is separate from both company sites. Its paper assembly demonstrates one way to control a reversible CSS 3D scene with scroll. It is not a required page section, default brand treatment, or animation to copy into every project. Choose the motion story for the product, or omit pinned/video-like scrolling.

In the lab:

- Hover or keyboard-focus **Explore the techniques** to draw the original ink mark; rapid enter/leave reverses the stroke.
- Scroll through **An idea. Taking shape.** on a wide, tall viewport. Three paper planes gather, rotate, and settle. Reverse scroll to reverse the scene.
- Hover/focus **Say hello**, then activate Dot's bounded greeting.
- Narrow/short viewports and reduced motion use a compact static edition. A runtime reduced-motion change removes pin spacing as well as animation.

`motion-lab/lab.css` owns local feedback and character poses; `motion-lab/lab.js` owns continuous scene transforms and character state. The lab is live CSS/SVG, not a video or WebGL model. See [3D and mascots](../references/3d-and-mascots.md) for other techniques.

## Verify changes

Follow [the verification guide](../references/verification.md), with these example-specific checks:

- **Oddfield:** filter each category, open each project, dismiss by Escape and the close button, check focus returns, submit an empty brief, then download a completed brief and inspect its contents. Nothing should be sent.
- **Trace:** trigger the character high-five by keyboard and touch, check its text feedback and reduced-motion behavior, try all questions, inspect their citations, compare each source preview with its downloaded file, copy an answer, and verify clipboard-denied feedback. The sample's unresolved decisions must remain unresolved.
- **Both:** keyboard and touch operation, narrow layouts, readable contrast, reduced motion, dialog scroll and focus, missing assets, and no-JavaScript fallbacks. Static content and direct downloads remain available; enhanced controls start disabled until initialized.
- **Optional lab:** forward/reverse scroll, resize, rapid hover, greeting, and live reduced-motion collapse after loading its separate route.

The sites use neither long pinned scenes nor repeated paper-assembly motion. Their motion belongs to the actual interactions: portfolio images, filters and dialogs for Oddfield; a bounded character greeting, answer changes, and source inspection for Trace.

## Updating previews

Capture each company at 1440 × 1050, at the top of the page. Wait for the image and entrance motion to finish, leave the default selections, and save viewport screenshots to `assets/oddfield-preview.png` and `assets/trace-preview.png`. Review the captures and README links. Current previews were refreshed on 2026-09-08. Exercise motion separately; screenshots cannot verify it.

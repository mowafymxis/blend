# Field studies

Two independent frontend concepts demonstrate different uses of Blend:

| Example | Direction | Working interactions |
|---|---|---|
| [Trailhead](trailhead/index.html) | Forest green, field-note typography, original illustrated terrain | Search and difficulty filters, empty/reset state, route and map selection, date and packing checklist, text-file download |
| [Common Clay](common-clay/index.html) | Warm paper, expressive serif type, sunlit ceramics | Shape selection, synchronized worksheet choice, three actual downloads, keyboard-operable disclosures |

Trailhead's routes, distances, and travel times are fictional. Its map is an illustration, not navigation. Common Clay is a fictional editorial project with an AI-generated still life; its practice worksheets are real local files. Neither example collects personal information or sends data to a service. Selections last in the current page only.

## Run locally

From the repository root, with Python 3 installed:

```sh
python -m http.server 8789 --bind 127.0.0.1
```

Open [the field studies](http://127.0.0.1:8789/examples/), [Trailhead](http://127.0.0.1:8789/examples/trailhead/), or [Common Clay](http://127.0.0.1:8789/examples/common-clay/). Choose another unused port if needed. All assets are local; no package installation or build step is required. Each `index.html` can also be opened directly, although download behavior depends on the browser's local-file rules.

## Drawing, depth, and character

The [index](index.html) is also a motion lab:

- Hover or keyboard-focus **Explore the studies** to draw the original ink mark. Rapid enter/leave reverses the stroke from its current pose.
- Scroll through **An idea. Taking shape.** on a wide, tall viewport. Three paper planes gather into an edition, rotate, and settle. Reverse scroll to reverse the scene. This is live CSS 3D, not a WebGL model or video.
- Hover/focus **Say hello**, then activate it for Dot's bounded greeting. Dot is an original folded-paper SVG character.
- Narrow/short viewports and reduced motion get a compact static paper edition. Changing reduced motion while the page is open updates the behavior and removes pin spacing.

`lab.css` owns local feedback and character poses. `lab.js` owns scroll transforms and character state. Nested SVG groups keep the greeting animation separate from the attention pose. Without JavaScript, the index remains readable, Trailhead's action buttons are disabled, and Common Clay still offers its default bowl worksheet as a normal download link.

For mesh-based 3D and app-connected character states, see [3D and mascots](../references/3d-and-mascots.md).

## Verify changes

Use the [verification guide](../references/verification.md) and exercise the actual interactions. For Trailhead, combine search and difficulty filters, reset an empty result, select a route by keyboard, and inspect a downloaded plan with a date and checked items. For Common Clay, select each form, check the illustration and worksheet agree, open disclosures by keyboard, and inspect the downloaded text. Check the index's reverse scroll, rapid hover, greeting, and live reduced-motion change.

Check desktop and narrow layouts, focus visibility, direct links, missing assets, and the no-JavaScript fallback. Automated accessibility checks supplement manual interaction checks; they do not establish complete accessibility coverage.

## Updating previews

Capture Trailhead at 1440 × 1050 and Common Clay at 1440 × 1000, at the top of the page. Wait for images and entrance motion to finish, keep the default selections, and save viewport screenshots to `assets/trailhead-preview.png` and `assets/common-clay-preview.png`. Review the captures and README links. The current captures were refreshed on 2026-09-08. Exercise motion separately; screenshots cannot verify it.

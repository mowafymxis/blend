# Frontend motion studies

| Example | Motion decision | Working behavior |
|---|---|---|
| [Aperture](aperture/index.html) | A persistent optical subject; setup, assembly, recognition hold, light-path payoff | Reversible scroll, skip link, compact still at 600px and below, static reduced-motion branch |
| [Waypoint](waypoint/index.html) | Quiet selection feedback; direct manipulation stays attached to input | Select three routes, retain progress, interrupt marker movement, keyboard scrub, download itinerary |

These studies demonstrate different roles for motion. They are source examples, not starter templates or evidence of model reliability. All graphics are original inline SVG; neither uses video, raster sequences, external services, or a motion library. The controllers are plain-page examples; framework ports must add component teardown.

## Run

From the repository root with Python 3:

```sh
python -m http.server 18789 --bind 127.0.0.1
```

Open [the gallery](http://127.0.0.1:18789/examples/), [Aperture](http://127.0.0.1:18789/examples/aperture/), or [Waypoint](http://127.0.0.1:18789/examples/waypoint/). Choose another unused port if needed. No install or build step is required.

## Study the decisions

Aperture uses one normalized scroll position. Element positions are computed from it, with bounded offsets for assembly order; there are no transitions on scrubbed transforms. The opening lets you see the parts, the middle aligns them around the barrel, and the final hold makes the optical relationship visible. The view is a stylized SVG diagram, not physical lens geometry or a ray-traced optical design. Mobile uses a closer still instead of shrinking the full-width story.

Waypoint has two motion rules: dragging the range places the marker immediately, while changing route uses a short transition from the current visible point. Rapid input cancels the old frame loop and starts from that point. Route highlighting and itinerary text update immediately. All routes and times are fictional; selection lives only in memory. A download is a local text file, never a booking.

Without JavaScript, Aperture shows assembled geometry and explanatory content; Waypoint shows the default coast itinerary with disabled interactive controls. Reduced motion collapses Aperture's pin region and makes Waypoint updates immediate, including when changed during the session.

## Verify changes

- **Aperture:** inspect progress 0, 25, 50, 75, and 100%, then reverse. Compare the same pose in both directions. Try fast scroll, Page Down, restored scroll on reload, resize in the middle, and the skip link. Look for subject continuity, readable intermediate frames, a useful final hold, and a clean release into the next section.
- **Waypoint:** select every route, drag progress to both ends and intermediate points, switch destinations during movement, and confirm progress is retained. Check Home/End and arrow keys on the slider, button focus, displayed arrival, and the downloaded file. Change reduced motion mid-transition; the marker should settle immediately.
- **Both:** inspect desktop, 390px, 320px, and short landscape viewports; check initial and runtime reduced motion, keyboard navigation, JavaScript off, missing assets, and console errors. Mobile emulation does not establish physical-device coverage. A still does not establish timing or smoothness.

For broader skill evaluation, use [verification](../references/verification.md). Handcrafted showcases do not establish that future agent outputs improve; compare independent fresh runs before making that claim.

## Refresh previews

Serve locally and capture the initial desktop viewport at 1440 × 1050 after the first render. Save selected captures as `assets/aperture-preview.png` and `assets/waypoint-preview.png`. Check those links from both READMEs and the gallery. Keep temporary intermediate captures and recordings in ignored `.maintainer/`.

The optional `assets/aperture-motion.gif` preview is assembled from browser captures of a scripted forward/reverse traversal at 1100 × 760. It documents the live SVG scene; it is not used by the example and is not a frame-rate measurement. Regenerate by sampling the scroll range at regular intervals after each render, then assembling the captures in forward/reverse order.

Selected previews refreshed on 2026-09-09.

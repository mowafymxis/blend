# “A video playing as I scroll”: select the intended behavior

Separate the progress controller from the renderer. A continuous scrub advances and reverses with scroll position; an entry-triggered clip uses its own clock. For a requested 3D scene, including video-like 3D scrolling, use Three.js or an equivalent mesh-based renderer by default. Camera, geometry, materials, and light must explain the spatial change. Explicit requests for actual video or rendered frames retain that medium; do not replace supplied footage with a model or pass flat layers off as 3D.

| Medium | Fits | Tradeoff to explain |
|---|---|---|
| Live DOM/SVG | Drawings, type, diagrams, layered objects | Crisp and adaptable; complex realism requires stronger assets or another medium |
| Live 3D geometry | Viewpoint, assembly, configuration, spatial interaction | Needs convincing geometry, materials, lighting, loading and device testing |
| Video seeking | Authored cinematic footage with a fixed viewpoint | Encoding/keyframes and decoding affect seek responsiveness; requires suitable source and poster |
| Rendered frame sequence | Fixed cinematic visuals needing discrete frame control | Transfer and decoded memory can be substantial; needs a bounded loading strategy |

Show the opening, revealing midpoint, and payoff composition before building the controller. Record the chosen medium honestly. A hand-authored SVG example is not proof of video-seeking performance; a rendered product turntable is not an interactive model.

## Common controller contract

Map measured section progress to a target pose or timestamp deterministically. Preserve backward scrolling, large jumps, restored scroll position, resize, and a normal-flow exit. Use a single controller; do not make CSS transitions or a second animation clock chase the same properties. Readers need composed holds and readable copy. Avoid trapping scroll or delaying access to the next section.

## If video is selected

Confirm the asset can be used and inspect its actual duration, dimensions, aspect ratio, and decoding behavior. Map progress into a bounded seek range only after metadata is available. Coalesce target updates rather than enqueueing every scroll event; handle pending seeks and settle on the latest requested time. Tune source encoding based on real seek tests. Do not promise smooth arbitrary seeking from an untested long-GOP clip.

Provide a poster and complete semantic content before media readiness. If the asset fails, seeking stalls, or the device cannot support the experience, use the agreed still/step fallback and remove unused pin distance. Keep audio off unless explicitly part of the requested experience; scroll position is a poor implicit audio control. Test rapid reversals and reload halfway down the page.

## If frames are selected

Estimate decoded memory from frame dimensions and count before preloading. Load a bounded neighborhood or suitable batches, cap resolution for the display, cancel obsolete loads, and release decoded assets when appropriate. Show only ready frames; preserve the latest target so late arrivals do not move backward unexpectedly. If a target frame is unavailable, retain a deliberate ready frame/poster instead of flashing an empty canvas. Verify both network transfer and memory pressure.

## Review across conditions

Use the [scroll lifecycle guide](scroll-scenes.md) for geometry and fallbacks. Test real forward/reverse traversal, fast jumps, slow/failed media, short screens, mobile recomposition, and reduced motion before and after load. A thumbnail sheet can reveal a bad intermediate crop; normal playback and interaction are necessary to judge perceived cleanliness. No source reference alone establishes a target frame-rate guarantee.

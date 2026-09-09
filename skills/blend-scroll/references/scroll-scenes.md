# Pinned, scroll-controlled scenes without video

Use when the user describes “fixed scrolling,” a scene that transforms as they scroll, or an animation that feels like a video but is made of live elements. A sticky stage inside a longer normal-flow section is usually the right model. Avoid a globally fixed canvas that covers the rest of the page.

Do not add pinned scenes by default to unrelated sites. Choose a product-specific narrative when connected beats explain a relationship, reveal an object, or create a deliberate experience. Use the [decision table](motion-direction.md#choose-the-experience-then-the-medium) to decide whether the page earns one; ordinary portfolio and product pages may use smaller motion or no pinned sequence.

## Storyboard the state, then map progress

First apply [motion direction](motion-direction.md). Define a shot rather than a list of effects: subject, opening frame, transformation, recognition hold, and exit. Make the intermediate composition worth seeing. A scroll narrative can be modest in duration and still feel cinematic; full-screen pinning is not permission for a long, empty scroll.

Choose a small number of meaningful beats. For example, separated product layers align, the assembled object rotates, then it settles beside the next action. Map scroll position deterministically to every pose so scrolling backward, jumping with Page Down, resizing, and returning from history all work.

```text
progress = clamp((scrollY - sectionDocumentTop) /
                 max(1, sectionHeight - viewportHeight), 0, 1)
phase(p, start, end) = clamp((p - start) / (end - start), 0, 1)

0.00–0.35  layers converge
0.35–0.75  assembly rotates to reveal depth
0.75–1.00  settle; next section becomes reachable
```

Use a single controller for the timeline. Separate camera movement, object movement, masks, and captions into tracks driven by the same progress. Direct scrub should feel attached to the user's scroll; excessive smoothing causes lag after reversals. Never accumulate pose with `rotation += ...` in a scroll renderer. Derive it from progress.

Keep scrubbed properties free of CSS transitions. Ease local phases only when their arrivals need shaping, and use holds where the viewer needs to recognize a result. Do not crossfade every caption over every moving part. Keep semantic text available outside the decorative stage; avoid hidden duplicate headings in the accessible tree. See [Relay](https://github.com/mowafymxis/blend/tree/main/examples/relay) for a live modeled object with connected assembly beats and a normal-flow exit. Its geometry is an illustrative product concept, not an engineering model.

## Pick the renderer

| Need | Good mechanism |
|---|---|
| A panel expands, letters align, layers assemble | DOM + CSS transforms, with CSS 3D if depth is enough |
| An outline becomes an illustration | SVG stroke drawing, masks, carefully prepared compatible path morphs |
| A product needs true geometry, lighting, camera orbit | Three.js or the project's existing WebGL renderer |
| A very specific pre-rendered visual sequence | Canvas frames only if the user accepts raster frames; disclose that these are pre-rendered, not live geometry |
| The user explicitly wants video seeking | A separate video workflow; do not substitute it for a no-video request |

CSS 3D is a real spatial transform system but does not provide mesh geometry or physical lighting. Label examples accurately. Avoid adding WebGL merely for a flat card tilt.

## Layout and lifecycle

- Start with readable static markup. Enable long stage height and pinning only after the controller initializes successfully.
- Use `position: sticky; top: ...` inside a bounded section, or one library pin controller. Do not apply both native sticky and library pinning to the same element.
- Account for a fixed header in stage height and scroll start. Check ancestor overflow/transform containment when sticky fails.
- Calculate travel from the actual wrapper and track, not assumed window dimensions. Clamp negative horizontal distance to zero; do not pin a gallery that already fits.
- Recalculate after resize, fonts/media load, and content changes. Use function-based library endpoints that read fresh measurements; `invalidateOnRefresh` cannot update a captured constant by itself.
- A passive scroll listener that schedules at most one requestAnimationFrame is valid. Batch reads before writes; avoid per-frame framework state and unnecessary layout queries. Prefer a tested existing library for complex refresh/pinning.
- In GSAP, scope selectors and use a context with teardown; clear only the instance's triggers. In framework effects, undo inline transforms, listeners, observers, and scheduled frames on cleanup. Test remounts.
- Keep copy readable and stationary while it is being read. Decorative stage content can be `aria-hidden`; provide an equivalent semantic description outside it. Do not announce progress every frame.
- Keep a normal-flow next section and a working skip link for a long narrative. Browser scrolling, keyboard navigation, touch, and anchors retain control.

## Reduced motion and small screens

Replace the long pinned region with a compact, fully assembled still or normal-flow steps. Remove pin spacing as well as animation. Apply the same change when the OS preference changes during the session. A mobile layout may retain a short stage if legible, or use an ordered sequence; it need not force the desktop choreography into a narrow viewport.

Implement the static branch before enabling pinning, and verify that both initial and runtime preference changes reach it.

## Verify the illusion

Inspect start, quarter points, end, reverse direction, fast flicks, resize midway, direct anchor navigation, reduced motion, and no JavaScript. Check for pin-entry jumps, blank scroll runway, overlapping captions, cropped geometry, and unreachable controls. Measure on representative devices before claiming smooth frame rates.

For library work, verify APIs against the installed version and [official ScrollTrigger documentation](https://gsap.com/docs/v3/Plugins/ScrollTrigger/). The pseudocode above explains progress mapping; it is not a complete controller or a guarantee about untested library versions.

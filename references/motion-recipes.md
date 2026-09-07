# Motion recipes

Use these as adaptable patterns. Do not add every effect to one page. The [motion lab](../examples/index.html) contains working dependency-free versions of the scribble, scroll assembly, and mascot.

## Stroke drawing and handwriting

Use an SVG path with `pathLength="1"`, `stroke-dasharray: 1`, and `stroke-dashoffset: 1`. Transition the offset to `0` on the parent control's hover/focus. Normalized path length avoids hardcoded pixel-length measurement. Use rounded caps/joins and deliberate irregularity. Multiple strokes get small staggered delays in actual pen order, not random letter order.

```css
.mark { fill: none; stroke: currentColor; stroke-width: 2;
  stroke-linecap: round; stroke-linejoin: round;
  stroke-dasharray: 1; stroke-dashoffset: 1;
  transition: stroke-dashoffset 380ms cubic-bezier(.22, 1, .36, 1); }
.control:focus-visible .mark { stroke-dashoffset: 0; }
@media (hover: hover) and (pointer: fine) {
  .control:hover .mark { stroke-dashoffset: 0; }
}
@media (prefers-reduced-motion: reduce) {
  .mark { transition: none; }
}
```

For actual filled handwritten lettering, draw a stroke through a mask to uncover the glyph shape. A fade or character scramble is not handwriting. Preserve the readable HTML label and hide decorative vector duplicates from assistive technology. Use unique mask/clip IDs per component instance. Check stroke ends and bounds for clipping. Do not hide essential words until hover.

Reversal should continue from the current drawn length when the pointer leaves. Rapid enter/leave must not queue animations or leave fragments. CSS transitions naturally retarget; in WAAPI, cancel/rebase an existing animation before replacing it. Keep a stable hit area and a separate visible focus ring. Coarse pointers can show the finished mark or omit it; never require a first tap just to reveal an action.

Sources: [SVG pathLength](https://developer.mozilla.org/en-US/docs/Web/SVG/Reference/Attribute/pathLength), [reduced-motion media query](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/At-rules/@media/prefers-reduced-motion).

## Component examples

| Interaction | Choreography | Required behavior |
|---|---|---|
| Menu | Small translation from trigger, short surface fade | Open immediately; keyboard semantics and dismissal continue during animation. |
| Drawer | Translate from its attached edge; backdrop fades slightly faster | Constrain focus if modal, restore it to trigger, keep background inert while open. |
| Tabs | Indicator travels between measured tab bounds; content settles lightly | Correct active tab semantics; retain focus and avoid offscreen focusable outgoing content. |
| Accordion | Measured expansion or supported intrinsic-size animation | `aria-expanded`, associated panel, no focusable hidden content; resize safely when text changes. |
| Reorder | FLIP or existing layout animation tracks stable item IDs | Keep DOM/reading order correct and allow reduced-motion instant placement. |
| Save | Keep button footprint; show real loading and result | No fake progress or premature success; repeat clicks handled by action logic. |

Do not copy complex keyboard patterns from an animation snippet. Reuse accessible primitives already in the project. Keep exiting elements inert or otherwise out of the focus order until removed. Cancel exit safely on reopen, clean up completion handlers, and handle reduced-motion paths without waiting for an animation event that never fires.

## Making motion feel intentional

Define easing, distance, duration, and spring character at system level. Use 2–4 short beats for an entrance only when an entrance improves the experience. Avoid delayed access to the main action. A press compresses the visual inside a steady hit box; a selection indicator explains a change. A page transition must not suppress native navigation, browser history, anchor jumps, or focus management.

For expressive scenes, anticipation, follow-through, and an occasional overshoot can establish character. Quiet utility controls should settle quickly. Linear motion is appropriate for a scroll-linked pose or continuous progress. No single easing is inherently premium.

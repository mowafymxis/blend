# Part choreography for a small illustration

Use when a reference shows an object contracting, reorganizing, returning, and resolving inside a stationary card. The task is to direct a miniature sequence, not apply an entrance animation to an icon. Use the user's visual language; the shapes below are an explanation of mechanics, not assets to copy.

## What the supplied recording actually shows

The inspected clip is about 4.87 seconds at 30 fps. A ten-frame-per-second crop gives this approximate reading:

| Approximate clip time | Observed change |
|---|---|
| 0.0–0.7 s | A grid, a round badge, and its arrow remain recognizable and mostly settled. |
| 0.8–1.0 s | The badge and arrow contract toward an anchored point; the badge disappears. |
| 1.0–1.5 s | The grid's internal vertical divisions change position while its outer frame stays put. |
| 1.6–1.9 s | A small badge returns at the same anchor and expands. Its interior is initially sparse. |
| 2.0–2.4 s | The interior arrow changes shape/orientation into the resolved mark. |
| About 2.5 s onward | The complete illustration holds, giving the action time to be recognized. |

These are sampled observations, not exact keyframe values or knowledge of the source code. The recording does not establish the trigger, easing function, event semantics, or whether it loops. Its slightly irregular lines do not establish that noise is regenerated each frame. Do not reproduce those unknowns as facts.

The important structure is **withdraw an accent → reorganize its supporting structure → return the accent → resolve its interior → rest**. The frame and reading layer remain stable. A slight scale change alone misses most of the sequence.

## Author a related action for this product

Start with a recognizable still at the actual intended size. Give the illustration a persistent anchor and a visual verb. Examples:

- Collect: loose sheets tuck into a tray; their edges align; a small seal returns; a check draws inside it.
- Connect: node labels stay legible; connecting paths retract to their junction; the paths reroute; a destination mark resolves.
- Refine: a rough contour contracts toward its axis; control points align; the final contour draws; the handles settle.
- Publish: a document's loose lines collect into a layout; a folded corner closes; a small outgoing mark is revealed.

Choose distinct relationships, not the same wobble with different icons. The action can be abstract when it still reads as one coherent event. Do not turn every scene into a grid with a round badge.

Separate groups by ownership: placement wrapper, fixed structure, deforming pieces, accent body, interior mark. Keep the accent body's pivot at its attachment point. Keep its fill above the supporting lines if it is meant to cover them. Scale/deform the accent without also shrinking the card or caption. For strokes, split a shaft and head when their draw order differs; preserve the mark's origin during disappearance and return.

## Map one clock to several tracks

Use a single normalized progress value for the scene. Each part receives a bounded local phase; avoid unrelated timeouts for each child. An illustrative starting timeline for a roughly two-second cycle is:

```text
0.00–0.18  retract the interior mark and contract the accent
0.12–0.48  reorganize the underlying parts around their anchor
0.42–0.70  return the accent body, with a material-appropriate arrival
0.62–0.86  resolve the interior mark in a deliberate stroke/shape order
0.86–1.00  hold the complete composition; stop work
```

Overlapping tracks express causality: the structure can begin changing as the accent clears it, and the mark can begin as the body finishes growing. They are not equal child delays. Tune these proportions from travel and legibility. Utility feedback may be much shorter; an opted-in illustration may take longer. Reference timings are not a global motion token.

```js
const clamp01 = x => Math.min(1, Math.max(0, x));
const phase = (p, a, b) => clamp01((p - a) / (b - a));
const smooth = t => t * t * (3 - 2 * t);

// An envelope returns to its initial value at p=1.
const withdrawn = smooth(phase(p, 0, .18));
const returned = smooth(phase(p, .42, .70));
const bodyScale = 1 - withdrawn + returned;
const erased = smooth(phase(p, 0, .12));
const drawn = smooth(phase(p, .62, .86));
const markVisibility = 1 - erased + drawn;
```

This is pose math, not a complete animation controller. Apply it through SVG attributes, WAAPI keyframes, or the existing animation library. For arbitrary path morphs, prepare compatible commands/control points or use a supported morph mechanism; interpolating unrelated `d` strings does not produce a sound shape. Use one owner per property and explicit transform origins. CSS transitions must not also chase values set by the scene clock.

Compose the midpoint while the accent is absent; it should show the supporting structure intentionally, not an empty flash. Keep line thickness and corner behavior optically consistent during deformation. Small overshoot can suit a soft badge, but a precise diagram often needs none. Repeated jiggle, independent bobbing, and random path noise obscure the staged action.

## Choose the interruption policy before wiring events

Two policies are useful; select one and implement it consistently:

- **Reversible state response:** hover or focus moves toward a resolved state; leaving both reverses from the current progress. Pointer leave must not override an active keyboard focus. Rapid input retargets one timeline without resetting its visible pose.
- **Finite demonstration:** a click or first hover starts one short complete episode whose first and last poses agree. Leaving can let the episode finish, or settle along a composed return. Repeated activation while it runs continues the existing episode instead of queuing another or snapping back to frame zero. Replay becomes available again when settled.

Do not call a full cycle's reversal an ordinary state transition without inspecting the result: reversing a contraction/rebuild cycle can make a badge disappear twice. If a scene must respond instantly to hover exit, design a simple state timeline or a separate return from its current pose.

For touch, use a visible replay control when exploration is the action; otherwise the first tap performs the real card action. Do not add a keyboard stop to every decorative article. A real replay button supplies the focus trigger. An information card remains an article.

Settle and stop on reduced motion, hidden document, offscreen exit, teardown, or disabled state. Clear obsolete work so resuming does not replay missed episodes. Finite scenes do not need permanent requestAnimationFrame loops or arbitrary idle timers. Sustained automatic motion needs a pause treatment; a still poster must remain meaningful without JavaScript.

## Review the action, not the presence of movement

At normal size and speed, check that you can identify what contracted, what changed underneath, what returned, and what finally resolved. Inspect quarter-beat frames to find clipping or a wrong pivot, then return to normal playback to judge timing. Compare the card, title, and hit area's bounds before/during/after; those should not drift.

Activate four times, interrupt early and late, mix pointer and keyboard focus, change reduced motion live, and hide/show the tab. Confirm one active episode, a recognizable resting pose, and no delayed work after settling. Reject a whole-icon spin or bounce as a substitute when the brief asks for this kind of internal choreography.

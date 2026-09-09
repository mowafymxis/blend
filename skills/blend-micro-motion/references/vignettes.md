# Directing a miniature illustrated scene

A vignette is a small staged sequence within an otherwise stable interface. Its purpose can be explanation, material character, anticipation, or delight. It need not imply that the surrounding card is interactive.

## From meaning to parts

Choose one action the content suggests. Design a finished illustration that reads while still. Split only the parts that need independent movement. For a fictional collecting tool, small items might move into an outlined tray and a concise completion mark resolve. The tray, caption, and control remain fixed; the objects' shared destination gives the motion coherence.

Use consistent stroke weight, corner treatment, fill density, and optical size across related illustrations. Hand-drawn lines should have designed irregularity, not per-frame random noise. Avoid embedding essential words into paths. Keep the visual comprehensible at its final size; intricate full-screen artwork rarely survives shrinking unchanged.

For a concrete contraction/reconfiguration/return sequence, read [staged illustrations](staged-illustrations.md). It separates sampled reference evidence from implementation choices and shows how one clock can own several parts.

## Make a beat sheet, not an effect list

| Beat | Visual responsibility | What should remain quiet |
|---|---|---|
| Rest | Recognizable silhouette and clear relationship | Text, hit area, surrounding layout |
| Setup | Bring attention to the part that will act | Unrelated details |
| Change | Carry the core verb with readable travel or deformation | Secondary decoration |
| Resolve | Make the new relationship or accent legible | Large motions |
| Hold/reset | Allow recognition; return only if replay is warranted | All work that can stop |

These phases may overlap or collapse. Do not force five separate waits into a tiny interaction. Start by inspecting three poses and a short playable prototype. Lengthen a recognition hold if the payoff flashes by; shorten motion if it delays a repeated action. Timing is tuned in context, not copied from a reference still.

## Define animation ownership

Use an outer group for layout placement and inner groups for moving parts. Set pivots explicitly. For drawing, use original paths with a coherent stroke order; measure their lengths rather than assuming every path is equal. If a drawn arrow disappears, preserve the arrow's origin and direction so reappearance reads as the same object.

For finite event sequences, an interruptible timeline can have states such as rest, entering, active, resolving, and settled. Choose whether leaving should reverse, finish the current short beat, or settle directly. Retarget from current progress and cancel obsolete work. Do not replay all missed events when a hidden tab resumes.

For a hover/focus response, derive an active intention from both pointer and focus so pointer leave does not erase an active keyboard state. Distinguish real application events from decorative intent. Disable, unmount, reduced-motion change, and renderer failure each need a defined settled pose.

If the sequence is ambient, design a seamless reset or a quiet pause before replay, avoid synchronized motion across every card, and stop offscreen/hidden work. Prefer one-shot entry when repetition adds no value. Provide appropriate pause control for sustained automatic motion. Never defer essential interaction until the vignette completes.

## Review common defects

| Defect | Revise |
|---|---|
| Whole card wobbles but the drawing says nothing | Keep the frame stable; animate a meaningful part relationship |
| Illustration becomes unrecognizable halfway | Strengthen the shared anchor and reduce simultaneous deformation |
| Arrow/stroke seems to teleport | Fix origin, path order, and hidden-state continuity |
| Effect looks noisy or childish in a precise brand | Reduce overshoot; align pivots and line/material language |
| Several vignettes compete during reading | Stagger by attention or activate only relevant scenes; quiet others |
| Reset pops | Compose the return or end on a stable one-shot pose |
| Works slowly but breaks on fast input | Replace queued animations with explicit interruption/retargeting |

Watch at normal scale and speed. Inspect slow playback only to diagnose a defect; a slow-motion contact sheet alone cannot establish the feel of the final sequence.

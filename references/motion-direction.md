# Direct the motion before writing the timeline

Use for substantial animation, expressive interactions, and scroll stories. Small corrections inherit the existing direction. The objective is a legible change with a particular character, not a checklist of effects.

## Find the visual sentence

State what happens in concrete terms: “The optical elements separate so we can see their order, align along one axis, then focus light.” This gives an object, a relationship, and a payoff. “Make it premium with parallax” does not. Choose a subject worth looking at; easing cannot rescue weak geometry, awkward type, or an empty composition.

For a cinematic request, sketch the opening, the most revealing intermediate frame, and the final composition before implementing interpolation. Use a live object, diagram, spatial illustration, or scene appropriate to the content. A succession of cards fading upward is a reveal pattern, not a continuous scene. Do not substitute a video or raster frame sequence for requested live animation.

## Stage attention

- Keep a recognizable subject or anchor across beats. Changes in scale, position, and detail should preserve the viewer's understanding of what they are seeing.
- Establish a visual hierarchy in every important frame. When the object is doing the explaining, keep surrounding typography quiet and stable. When copy changes, let the object hold.
- Choose a camera: framing, distance, angle, and crop. Moving both camera and subject is useful only if their relationship remains clear. Avoid orbiting simply to advertise 3D.
- Use depth cues that agree: overlap, scale, restrained lighting, and consistent perspective. Floating flat rectangles with unrelated shadows rarely communicate a physical assembly.
- Plan the landing composition as carefully as the opening. The object should arrive somewhere useful, or hand attention to the next section. Do not cut to an unrelated layout just because progress reached one.

## Give the scene rhythm

Separate setup, transformation, and recognition. Leave readable holds around the most informative poses; do not keep every property changing for the entire scroll range. Set the range from the amount of information and movement, then shorten any stretch that feels like work without discovery. Holds are for recognition, not blank runway.

Within a beat, move related parts as a group and offset only what reveals order, weight, or causality. Avoid mechanically staggering every word, card, or child. One dominant motion with supporting changes is usually easier to follow than several equally loud tracks. This is an attention principle, not a numerical quota.

For direct manipulation, the pointer/scroll position owns progress. Do not add CSS transitions to scrubbed transforms or chase scroll with a long spring. Shape local interpolation to create a gentle arrival while preserving deterministic reversal. For discrete actions, retarget from the currently displayed pose; do not restart from the previous destination when input arrives mid-flight.

Quiet app motion should explain selection, continuity, or causality and settle quickly. Expressive motion can take longer when the user opted into exploration. Avoid elastic overshoot on objects that should feel precise or heavy; use it when the material or character warrants it.

## Diagnose an off-feeling result

| What you observe | Likely revision |
|---|---|
| Everything floats independently | Establish one anchor and group related movement; remove idle loops |
| Polished easing, weak scene | Fix silhouette, crop, scale, type hierarchy, and the payoff frame first |
| Scroll feels slippery | Remove progress smoothing and transitions on continuously driven properties |
| Feels like a slideshow | Carry the same subject between states and show the relationship changing |
| Looks busy but says little | Remove a track; give the explanatory change more space |
| A long drag with nothing new | Shorten the range or add a genuinely informative state |
| Details appear too late to read | Hold the object; shorten caption transitions and keep text stationary |
| Entry or exit jolts | Match stage boundaries to adjacent flow, verify initial pose and sticky release |

## Judge it moving

Inspect a real forward and reverse traversal, slow scrubbing, and interrupted input. Capture a short recording or sequential frames when useful; a contact sheet reveals composition but cannot establish perceived timing. Watch once for subject continuity and once for pacing. Fix the weakest beat, then repeat that path. Compare start, transition, and finish at desktop and narrow sizes. Record actual coverage; a handcrafted example is not proof that future model outputs will improve.

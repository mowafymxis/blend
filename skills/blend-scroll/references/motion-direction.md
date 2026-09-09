# Direct the motion before writing the timeline

Use for substantial builds, expressive interactions, and scroll stories. Small corrections inherit the existing direction. The objective is a convincing experience with a particular character, not a checklist of effects.

## Choose the experience, then the medium

Read the page as a sequence of user intentions. Identify where attention should land, what is worth exploring, and how often someone repeats the task. Use the [discovery answers](../../blend-discovery/SKILL.md) to record **visual anchor; selected local motion; atmosphere; signature scene or none; chosen medium and why; fallback**. Ask about unresolved behavior and explain credible alternatives before selecting. Keep this planning out of product copy; once the user has answered or delegated, implement without repeated approval.

These questions decide different things; they are not an escalating ladder from static to 3D:

| Decision | Favor it when | Prefer another treatment when |
|---|---|---|
| Small crafted interactions | A control or object has a natural material, action, or state relationship to express | The effect distracts from reading, moves the hit area, repeats tediously, or has no relationship to the visual identity |
| Continuous scroll scene | Transformation, spatial relationships, a process, or an intentional narrative rewards a few connected beats | The page is mostly comparison, lookup, a short offer, or an urgent task; pinning adds effort without an interesting payoff |
| Live 3D geometry | Rotation, assembly, viewpoint, lighting, or configuration must respond to input and reveal actual spatial information | A single attractive angle is sufficient, there is no credible model, or the likely geometry/material quality is weaker than an image |
| Generated raster imagery | Atmosphere, texture, art direction, an original illustration, or a staged concept image does more than interactive geometry | Exact product truth requires supplied assets, readable text/precise diagrams are essential, or the image is being used to fake interactive geometry |
| DOM/SVG/CSS depth | Type, a diagram, drawn marks, sheets, or simple layered surfaces carry the idea cleanly | The task needs a real model with mesh geometry, occlusion, or independently lit surfaces |
| Supplied photo/video | The existing material is relevant, authorized, and provides the strongest evidence or storytelling | The user asked for no video/live animation, or the media does not fit the composition |
| Still composition | Strong imagery, type, spacing, and direct feedback already create the right experience | The brief explicitly asks for meaningful motion or interaction that stills cannot satisfy |

Choose the medium for its best final quality, not because a tool is available. A beautifully art-directed image can beat crude 3D. A real configurable object can beat a faux-3D image tilt. A clean diagram can beat both. The page may combine a still image with live micro-interactions; choosing image generation does not imply animating the entire image. Do not add image generation, WebGL, or a pinned region merely to demonstrate capability.

Resolve the visual asset before dependent polish. For generation, specify subject, composition/crop, lighting, palette, and whether separate layers are needed. Keep actual interface text in HTML. Use the available image-generation workflow, save the chosen asset in the project, and identify illustrative concepts where they could be mistaken for real products. A generated image is not a 3D model or proof of a shipped product. If an explicitly required medium is unavailable, disclose that constraint instead of silently substituting another.

## Find the small moments

Choose a motion vocabulary from the site's material and personality, then apply it selectively. A paper metaphor may suggest ink and hinged folds; a precision instrument may suggest indexed rotation and firm stops. Avoid pasting the same flourish onto unrelated interfaces. Study the **relationship** in a reference: words appearing as though written, for example, can inspire other crafted responses without making handwriting compulsory.

| Opportunity | Possible expression | What makes it feel crafted |
|---|---|---|
| A personal invitation on paper | A short handwritten aside draws along pen paths on hover/focus | Natural stroke order, stable readable action, slight irregularity, no random letter scramble |
| A physical object to inspect | A small edge lift, hinge turn, or constrained light response | Plausible pivot and weight; shadow changes agree with the pose |
| An image-led choice | A crop settles or a small mask reveals a relevant detail | Fixed bounds, useful focal point, no unsolicited full-screen zoom |
| A selected tab, filter, or option | A shared marker travels to the next choice | Continuity, short travel, correct selected state immediately |
| A precise control | Ticks align, a dial rotates, a press settles firmly | Movement is proportional to input; value and focus remain readable |
| A task finishes | The source object joins its destination or a concise mark resolves | Real completion first; no fake progress, confetti requirement, or delayed access |
| A playful guide | Eyes notice a relevant action or an expression changes | A coherent character state, bounded frequency, and restraint during repeated use |

These are starting points, not an effect shopping list. Choose the strongest opportunities already present in the page; leave nearby elements quiet. Related effects share material, easing, and distance, but need not move simultaneously. Novelty is not enough: inspect the effect repeatedly and with fast, messy input. Remove it if the fourth interaction feels worse than the first.

For each chosen effect, specify the target, trigger, visual change, timing, interruption, and touch/focus/reduced-motion behavior. Keep the actual action's hit area fixed. Show functional state immediately even when a decorative layer is still settling. For optional pointer response, bound the range and stop work after settling; avoid global cursor followers and perpetual floating as default polish. See [motion recipes](../../blend-micro-motion/references/motion-recipes.md) for implementation patterns.

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

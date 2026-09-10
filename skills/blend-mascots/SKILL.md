---
name: blend-mascots
description: Design and animate original or supplied interface mascots with expressive rigs, real app event states, bounded reactions, and accessible quiet modes.
---

# Blend Mascots

Own a character's identity, acting, and relationship to the product. Mascots are especially useful when the user wants companionship, onboarding, or a memorable app identity; do not add one to every site. A request for general polish is not itself a character brief.

Use the mascot branch of [discovery](../blend-discovery/SKILL.md) before inventing a character: supplied versus original identity, medium, silhouette, personality, prominence, placement, reactions, idle frequency, and useful interaction. A Claude-like request leaves these choices open. If the user wants help choosing, show a few silhouettes with neutral and expressive poses at intended size. Do not impose paper, pixel, orange, a tiny cameo, or a hero mascot against the brief or without a supported reason. For animation-only changes to an established character, preserve its design and ask only about unresolved behavior.

Apply discovery selectively: infer shape and feel from the brief, references, and prior answers first. Topic lists below are internal considerations, not mandatory questions. Ask only about consequential uncertainty within the project's small question set; make routine craft choices yourself and do not start a new interview for each specialist.

## Establish a character that belongs

Define a useful role and placement before drawing the character: onboarding guide, contextual helper, empty-state companion, or feedback beside the operation it represents. Integrate it into the relevant panel, task, or result. Do not park a mascot beside a landing-page title as filler; a character-led opening requires an explicit brand reason and substantial product evidence. Then define temperament, silhouette, proportions, face, palette, and actual display size. Derive identity from the product world. References can suggest expressive economy or stepped geometry; they do not make the same orange block character appropriate everywhere. Preserve the user's supplied character when reproduction is requested and authorized; otherwise design an original identity rather than presenting another brand as the user's own.

Choose SVG for scalable articulated shapes, pixel geometry/sprites for a deliberate pixel language, raster layers for painted characters, or 3D for spatial acting that warrants it. Use available image tools for raster art. A single flattened image needs a feasible layer/rig strategy before promising independent face and limb motion.

## Rig for expressive economy

Separate placement, torso, face, eyes, mouth, limbs, and props with anatomical pivots. Keep attached parts connected in every pose. A planted foot stays planted; a step transfers weight before lifting; a lean pivots at the support; a blink closes around the eyelid line without moving the face. Preserve facial spacing and believable volume through deformation. Use anticipation, action, and settling in that order; eyes may lead attention before the body follows. Never substitute whole-character bobbing for a wave, step, glance, or task-specific reaction.

For pixels, use a consistent unit grid and test at actual small sizes. Keep features readable, avoid hairline gaps and accidental edge shimmer, and choose stepped or smooth motion deliberately. With a supplied reference, retain recognizable proportions throughout deformation rather than rebuilding a vaguely similar face.

Choose the character's attention budget with the user alongside its silhouette. A quiet companion can be a small cameo; a character-led brand may deliberately choose a larger role. Keep the product understandable at either scale. Test neutral, noticing, and resolved expressions at the actual size before elaborate acting. One eye shift, a restrained body adjustment, and a held expression can say more than simultaneous limbs, mouth, props, and bouncing.

Match the references' economy without copying their identity. Preserve facial spacing through deformation, keep a stable contact/attachment point, and make a brief reaction end in a deliberate rest. If the page uses staged line illustrations elsewhere, let the mascot share their line quality and pacing without making every graphic a character. In a scripted product sample, react to the actual selection or reveal; do not pretend a model is thinking.

## Connect to real events

Use a state machine with explicit event priority and interruption. Read [character mechanics](references/character-mechanics.md) for a baseline event table and lifecycle. Adapt states to the real app rather than implementing a quota of expressions.

Separate semantic state from transient acting. Work begins on a real operation, ends on its actual result, and error/success interrupts obsolete idle or pointer reactions. A result belonging to a canceled request must not trigger celebration. Idle can include a sparse blink; it need not run a permanent rendering loop.

Make success brief and errors supportive. Never mock failed input, imply sentience, invent progress, or interrupt serious work with celebration. Keep the character away from dense reading and critical controls. If it is interactive, give it a named control and a useful action; if decorative, keep it out of focus order and the accessibility tree.

## Quiet modes and verification

Offer still expressions for reduced motion and a pause/hide option where sustained movement or a companion role warrants it. Announce meaningful status in DOM text, never only through a face. Suspend offscreen/hidden work, cancel timers, and prevent overlapping animation ownership.

Inspect neutral, anticipation, action extreme, contact, and settled poses at the actual UI size, then watch the transitions. Compare silhouette, limb attachment, pivot location, gaze target, foot slip, facial spacing, and pixel-grid stability against the chosen character/reference. Fix inaccurate mechanics before tuning easing. Exercise working-to-error, immediate success, repeated events, pointer leave during feedback, tab hiding, and unmount/remount. A character should feel intentional in a real task, not only in a large isolated preview.

If available, living-pixel-mascot can provide deeper pixel reconstruction/rigging guidance; hatch-pet applies when the user specifically needs Codex pet spritesheet packaging. Neither is required for an ordinary web mascot. Keep the implementation self-contained when those skills are absent.

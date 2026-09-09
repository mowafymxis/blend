---
name: blend-mascots
description: Design and animate original or supplied interface mascots with expressive rigs, real app event states, bounded reactions, and accessible quiet modes.
---

# Blend Mascots

Own a character's identity, acting, and relationship to the product. Mascots are especially useful when the user wants companionship, onboarding, or a memorable app identity; do not add one to every site. A request for general polish is not itself a character brief.

## Establish a character that belongs

Define role, temperament, silhouette, proportions, face, palette, and actual display size. Derive identity from the product world. References can suggest expressive economy or stepped geometry; they do not make the same orange block character appropriate everywhere. Preserve the user's supplied character when reproduction is requested and authorized; otherwise design an original identity rather than presenting another brand as the user's own.

Choose SVG for scalable articulated shapes, pixel geometry/sprites for a deliberate pixel language, raster layers for painted characters, or 3D for spatial acting that warrants it. Use available image tools for raster art. A single flattened image needs a feasible layer/rig strategy before promising independent face and limb motion.

## Rig for expressive economy

Separate body placement, body deformation, face, eyes, mouth, limbs, and props. Anchor pivots to anatomy and preserve ground contact during squash and stretch. Eyes can lead attention, the body follow, and secondary parts settle. Deliberately held poses are part of acting; perpetual bouncing is not a personality.

For pixels, use a consistent unit grid and test at actual small sizes. Keep features readable, avoid hairline gaps and accidental edge shimmer, and choose stepped or smooth motion deliberately. With a supplied reference, retain recognizable proportions throughout deformation rather than rebuilding a vaguely similar face.

## Connect to real events

Use a state machine with explicit event priority and interruption. Read [character mechanics](references/character-mechanics.md) for a baseline event table and lifecycle. Adapt states to the real app rather than implementing a quota of expressions.

Separate semantic state from transient acting. Work begins on a real operation, ends on its actual result, and error/success interrupts obsolete idle or pointer reactions. A result belonging to a canceled request must not trigger celebration. Idle can include a sparse blink; it need not run a permanent rendering loop.

Make success brief and errors supportive. Never mock failed input, imply sentience, invent progress, or interrupt serious work with celebration. Keep the character away from dense reading and critical controls. If it is interactive, give it a named control and a useful action; if decorative, keep it out of focus order and the accessibility tree.

## Quiet modes and verification

Offer still expressions for reduced motion and a pause/hide option where sustained movement or a companion role warrants it. Announce meaningful status in DOM text, never only through a face. Suspend offscreen/hidden work, cancel timers, and prevent overlapping animation ownership.

Check the resting silhouette, readable extremes, anticipation, contact, and settling at the actual UI scale. Exercise working-to-error, immediate success, repeated events, pointer leave during feedback, tab hiding, and unmount/remount. A character should feel intentional in a real task, not only in a large isolated preview.

If available, living-pixel-mascot can provide deeper pixel reconstruction/rigging guidance; hatch-pet applies when the user specifically needs Codex pet spritesheet packaging. Neither is required for an ordinary web mascot. Keep the implementation self-contained when those skills are absent.

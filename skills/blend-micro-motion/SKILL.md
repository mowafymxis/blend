---
name: blend-micro-motion
description: Create clean local UI animations and small illustrated sequences, including SVG vignettes, hover details, selection movement, and interruptible feedback.
---

# Blend Micro Motion

Animate a small relationship with clarity. A static card can contain a miniature scene; animating its whole container is often the wrong target. This skill owns local behavior, not full-page scroll timelines or character state machines.

## Choose an object and a visual verb

Find a meaningful opportunity in the actual content: connect, collect, unfold, compare, resolve, draw, inspect, or select. Match the art's material and the site's character. Hand-drawn work may use organic strokes; a precise tool may use indexed stops. Neither style is a suite default.

For an illustrated vignette, separate the stable frame and reading layer from the parts that change. Design the resting image, revealing intermediate state, and resolved image before coding. Read [vignette direction](references/vignettes.md) for how to build a short coherent sequence. Read [motion recipes](references/motion-recipes.md) for strokes, handwriting, controls, and interruption mechanics.

## Direct a short sequence

Establish attention, perform one readable transformation, settle, and allow recognition. Related parts can overlap in time when their causality remains clear. Do not stagger every child equally. A tiny accent may anticipate; the principal object carries the action; secondary strokes finish it. Exact milliseconds come from travel, scale, and feel, not a universal spring preset.

Specify target, trigger, poses, timing, interruption, replay, and fallback. Choose deliberately among hover/focus, click, viewport entry, real application event, or a restrained ambient loop. A reference recording does not prove which trigger caused the motion. If uncertain, distinguish observation from your implementation choice.

The action's label and hit area stay stable. A hover flourish is optional; the first touch activates the actual control. Immediate functional feedback need not wait for the illustration. Avoid automatically turning an information card into a clickable element just to attach motion.

## Implement continuity

Prefer CSS for simple states, SVG for articulated drawings and paths, and WAAPI or the existing motion library for sequences needing cancellation. Use one owner per animated property. Separate wrappers when placement and deformation need different transforms. Reserve dimensions; moving art must not reflow the text.

Retarget from the visible pose on interrupted input. Do not queue repeated hovers or snap to a previously intended endpoint. For one-shot event feedback, replace obsolete pending work and prevent repeated event subscriptions. Complete a finite loop seam intentionally; if a long reset is visually awkward, a one-shot vignette may be better.

Honor reduced motion initially and live, stop hidden/offscreen work, and release animation handles and listeners. Sustained automatic movement needs an appropriate pause/stop treatment. Essential status remains in text; purely decorative layers are hidden from assistive technology.

## Judge the motion in context

Watch it at its actual small size alongside the label and neighboring items. Check start, middle, resolved pose, and repeated activation. Then use fast enter/leave, focus/blur, touch, and reduced motion. Does the drawing remain recognizable? Is there time to read the result? Does the fourth activation still feel good? Fix muddy paths, wrong pivots, competing movement, or an abrupt reset before tuning easing again.

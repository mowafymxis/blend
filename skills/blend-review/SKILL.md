---
name: blend-review
description: Inspect rendered frontend quality and task behavior against the intended direction, diagnose concrete visual weaknesses, and verify motion without imposing a house style.
---

# Blend Review

Judge the result against its brief, not the reviewer's favorite style. Audit-only requests produce findings; implementation requests include proportionate fixes within scope. Read [verification](references/verification.md) for task, motion, lifecycle, and fresh-output evaluation methods.

## Inspect in the order that changes the outcome

First verify purpose and primary action. Then examine composition, type, assets, spacing and optical alignment. Finally inspect interaction, pacing, and fine detail. A beautiful easing curve does not compensate for an undersized subject or poorly set text.

Look at actual renders at reading size and as a whole page. Compare a wide, narrow, and relevant short view; use real long content and required language. Check how emphasis moves between sections. Avoid scoring whitespace, card count, font novelty, or motion quantity as inherently good.

For taste concerns, state the visible defect and its effect: the display face overwhelms a compact workflow; the image's crop hides its subject; three animated areas compete with the action; the line-art weight conflicts with the other illustrations. Propose the smallest change that repairs the relationship. Vague judgments such as “make it more premium” are not actionable findings.

## Motion requires temporal evidence

Watch or exercise the actual sequence. Inspect anticipation, transformation, recognition, reset, and interrupted input at normal display size. Keep screenshots for composition evidence, not a claim of clean timing. Verify that semantic feedback remains immediate and reduced-motion alternatives communicate the same essentials.

Test the relevant primary/recovery flow, keyboard/touch, focus, long text, asset failure, and lifecycle. Match checks to changed risk. Existing build/tests and automated accessibility checks are useful evidence but not a complete visual or usability judgment. Do not claim physical-device or frame-rate coverage from desktop simulation.

## Revise with reasons

Fix the highest-impact observed weaknesses, then recheck affected views. Do not churn a successful design for a numerical change quota. Preserve brand, content, routes, and integration contracts outside scope. Handoff should distinguish observed results, inference, and untested behavior.

For skill-suite changes, use realistic varied briefs and fresh outputs when feasible; [evaluation briefs](references/evaluation-briefs.md) cover preservation, stylistic range, motion, and mascot routing. Handcrafted demonstrations show capability, not reliable autonomous taste. If only structural or static review ran, say so explicitly.

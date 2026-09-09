---
name: blend-interface
description: Design and implement usable app workflows, navigation, records, forms, and complete UI states while preserving task continuity and the existing product identity.
---

# Blend Interface

Own task completion and interface structure. Start from the recurring user activity, not a landing-page hero. Read [product workflows](references/product-workflows.md) for records, navigation, forms, and continuity, and [copy and craft](references/copy-and-craft.md) when visible wording needs work.

Trace entry, orientation, action, result, and recovery using actual data contracts. Keep filters, selection, drafts, scroll position, and relevant context when users move between list and detail. Design the narrow version around the same task; a table may need priority columns or a detail view rather than tiny text.

Use density deliberately. Frequently compared records benefit from alignment and stable columns. Occasional high-consequence actions benefit from clear context and consequences. Match visual emphasis to importance, not component availability. Do not wrap every item in a floating card or add dashboard metrics without a real use.

Specify relevant idle, focused, selected, loading, empty, error, success, disabled, and interrupted states. Success follows confirmed work; a decorative animation is not confirmation. Make the primary flow work before expressive additions. Keep real actions accessible via semantic controls, keyboard, and touch.

Use small transitions to preserve selection, location, and causality. Semantic state updates immediately; visual settling may follow. Repeated actions must remain quick. A mascot can support onboarding or encouragement when requested or justified, but must never obscure errors, shame the user, invent progress, or become required navigation.

Keep visible language about the user's task. Preserve existing copy unless rewriting is in scope or a demonstrated comprehension defect requires it. Remove implementation badges and filler when they add no user value. Keep necessary instructions and honest prototype disclosures; brevity must not conceal consequences.

Verify the primary path, a recovery path, long content, keyboard focus, narrow layout, and interrupted or repeated input. Coordinate with the chosen visual direction; utility does not require generic styling. Report the working flow and any integration limitation honestly.

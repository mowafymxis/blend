# Copy and close-up craft

Use this for writing, polish, and reference translation. Preserve supplied wording unless editing copy is in scope.

| Situation | Poor choice | Better result |
|---|---|---|
| A note was saved | “Your note was persisted to our Turso-backed edge database.” | “Saved” as quiet status, or no extra message when the saved state is obvious. |
| Empty projects view | A paragraph about the project's scalable infrastructure | “No projects yet” and “Create project.” Add import guidance only if import exists. |
| Failed save | “SQLITE_BUSY in sync worker” | “Couldn't save. Try again.” Preserve the draft and offer a working retry. |
| Hover refinement request | Rewrite the section into a new marketing pitch | Keep its text, draw an accent on interaction, verify focus and touch. |
| Technical connection settings | Conceal the service the operator must configure | Name the actual service and required fields here; keep credentials protected. |
| Educational article | Enforce a 25-word paragraph limit | Preserve the explanation, improve reading measure and navigation. |
| Prototype analytics | Believable invented revenue, hidden `mock` comment | An obvious “Sample data” label and illustrative values, no implied real customers. |
| Feature label already clear | “Projects” plus “Manage all of your projects in one place” | “Projects” alone. |

These are examples of editing judgment, not strings to insert into every app. Interface text, accessible names, and error text should agree. Status feedback may use a polite live region after a real change; do not announce every animation frame.

## Inspect the small things

- Compare alignment optically as well as geometrically. An arrow's visual center can differ from its box center.
- Match stroke weight, line caps, icon family, control height, and text baseline. A bespoke decorative mark need not come from an icon package.
- Check actual line wraps at desktop, mobile, zoom, and long translated labels. Do not force all headings to two lines or clip italic descenders.
- Keep focus rings clear of clipping containers. Give hover decoration room to draw without moving adjacent text.
- Make hit areas large enough without inflating visible icons. Use a stable outer hit area when an inner element scales or tilts.
- Check seams at sticky entry/exit, first and last animation frames, image crops, border joins, scrollbar appearance, and menu anchoring.
- Preserve meaningful lists and tables. Density is information per area, not a mandate for tiny text.
- Use contrast that survives every animated pose, background, and supported theme. Color and animation must not be the only state cues.

## Reference example: a hand-drawn Skills mark

The supplied screenshot shows a compact icon, the word “Skills,” and a chevron on a dark row. It does not establish animation duration or stroke order. The requested behavior establishes that a scribble appears smoothly on hover.

Translate that into a stable row with an original, slightly irregular SVG mark that starts undrawn and traces on hover/focus. Keep the word readable throughout; do not shift the row or animate the text into nonsense. On touch, the control works immediately. If the drawing is part of recognizable branding, keep that essential base mark visible and animate only an extra accent.

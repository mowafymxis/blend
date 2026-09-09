# Interfaces for repeated work

Use for dashboards, record management, forms, and tools. Start with a representative task and realistic content; a collection of attractive cards is not a workflow.

## Keep orientation and context

Name repeated-work views for their task or destination so users can orient without decoding campaign copy. Put expressive language where it helps discovery, without displacing a useful task title or pushing the working controls down the page.

Choose navigation around users' destinations and task frequency. Show the current location and give detail views a clear route back. Preserve search, filters, selection, pagination, and unsaved input when moving through a task. Use URL state when a view must be shareable or survive navigation; use local state when that is the appropriate boundary. Do not add storage or routing infrastructure without a concrete need.

Put the most frequent action near the information needed to perform it. A persistent detail panel helps compare and act on records without losing a list; a separate page suits long or complex records. Reserve dialogs for bounded tasks rather than hiding an entire application inside overlays.

## Lists, tables, and filtering

Use aligned columns for comparable values, clear units, and meaningful sort order. Distinguish record identity, status, and next action. Do not make every cell equally prominent. Keep record actions discoverable without hover, and name icon controls. Row selection must not interfere with links or text selection.

Search and filters should visibly describe the current subset. Retain entered queries on empty results and offer a clear way to reset them. Separate “no records yet” from “no matches.” Sorting must affect the underlying values, not formatted display strings. Bulk actions need explicit selection and an accurate affected count.

On narrow screens, retain the fields needed for the task. Use a labeled stacked list, controlled table overflow, or a dedicated detail view according to comparison needs. Do not hide the primary action or quietly drop essential columns.

## Forms and completion

Use persistent labels, appropriate input types, useful defaults, and instructions beside unfamiliar fields. Explain costs, permanence, or commitment before submission where relevant. Validate without clearing input; place errors with the field and direct focus appropriately after submission. Distinguish submitting, confirmed success, and failure. Prevent duplicate actions while a request runs.

For edits, show enough identity and context to prevent changing the wrong record. Preserve a draft on failure. Use undo for reversible actions where it helps; ask for confirmation when the action is consequential, not for every save. Avoid simulated loading delays or fake server success in static examples.

## Walk the actual task

Exercise entry, finding an item, inspecting it, changing it, confirming the result, and returning to the previous context. Include no matches, invalid input, interruption, keyboard operation, and narrow layout. Test persistence only if promised. Label demonstration data and storage boundaries where users could otherwise infer a live service. Preserve semantic controls and accessible status feedback without announcing every keystroke or animation frame.

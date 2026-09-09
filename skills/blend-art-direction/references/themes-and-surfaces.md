# Design the selected themes deliberately

Resolve light only, dark only, or both during discovery. A dark screenshot establishes a reference surface, not the user's entire theme policy. If both are selected, establish default/system behavior, manual control, persistence, and whether illustrations need alternate colors. Preserve existing behavior for narrow changes.

## One identity across different lighting

Define semantic roles for canvas, raised surface, inset surface, primary/muted text, border, accent, focus, selection, success, and error. Map roles for each selected theme. Do not implement dark mode as image inversion or merely swap black and white: adjust perceived contrast, elevation, saturation, and shadows. Colorful identity work may remain colorful in both themes.

Inspect a representative heading, paragraph, control, illustration, and selected/error state together before propagating tokens. Warm paper, neutral white, charcoal, and near-black communicate different material choices; use the selected one. Avoid low-contrast supporting text as a shortcut to sophistication. A chosen textured surface needs stable readable foregrounds.

For outlined art, tune the stroke optically on each surface. A light stroke against charcoal can appear heavier than the same dark stroke against paper. Keep filled accents and overlapping objects distinguishable, including while morphing. Preserve transparent edges and intentional art backgrounds. Photographs and brand marks should not inherit a blanket color filter.

For both themes, ensure the initial render uses the correct preference without a visible wrong-theme flash where the stack permits it. Keep form controls, dialogs, menus, focus states, and loading/error states consistent; test after navigation and reload. A toggle must be named and keyboard operable. If a stored manual choice exists, apply the agreed precedence over system changes.

## Combining multiple visual languages

Assign each selected treatment a role: type carries voice; project/product art carries evidence; small drawings explain; mascot reacts; atmosphere sets context; scroll reveals a relationship. Share palette relationships, optical scale, stroke/material rules, and pacing. Do not force all assets into one medium, and do not let every medium compete for the first glance.

Make a simple attention map by section: dominant subject, supporting layer, quiet layer. Where a large transformation needs attention, let nearby ambient and character activity rest if that matches the selected behavior. Between major moments, use complete still compositions. Richness can come from several carefully placed treatments without every section moving.

Review each theme as a complete page, then compare them side by side. Look for shifted hierarchy, disappearing outlines, overly bright illustrations, washed-out imagery, mismatched chrome, and a mascot that loses its face. Testing only the initial theme does not fulfill “both.”

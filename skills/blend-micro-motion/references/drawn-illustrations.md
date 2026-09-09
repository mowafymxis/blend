# Clean pencil/ink-like illustrations

Use when the user selects the small hand-drawn language in the supplied examples. Confirm whether they mean irregular monoline, textured graphite, chalk, or rough sketch; those are different materials. Do not apply a generic jitter filter and call it hand drawing.

## Draw a coherent family

Establish a few visible rules: nominal optical size, contour weight, cap/join treatment, curve character, corner irregularity, fill proportion, accent palette, and overlap. Draw original shapes with deliberate slightly imperfect contours. Keep their construction understandable at final size; hands need readable fingers, object contact, and plausible grip even when highly simplified.

Use a stable coordinate space and reserved layout bounds. Separate placement, fixed structure, moving objects, foreground occluders, and accents. A hand holding a square should maintain contact as the object moves. Use local masks and explicit layering when fingers pass in front of an object. Avoid accidental tangencies, doubled seams, and clipped round caps.

Keep irregularity spatially stable. Do not regenerate noisy paths each frame. If a hand-animated “boiling” line is explicitly wanted, bound its variation and preserve the silhouette; distinguish that choice from smooth clean line motion. Texture should survive real-size rendering without shimmer. For small monoline art, authored SVG is often enough; textured raster layers need appropriate resolution and a feasible articulation plan.

Create and inspect several stills together: for example, arranging objects, collecting sheets, and joining pieces. The action and silhouette should differ while line quality and optical scale agree. These are possible subjects, not a required set. Do not automatically give every scene a circular badge or completion tick.

## Animate the depicted action

Ask what should happen, not only whether the icon should move. A square slides into a group; a hand changes grip; a grid reorganizes; a line finds its destination. The scene has a rest, a readable change, and a resolved hold. The [staged illustration guide](staged-illustrations.md) covers one such grammar, not every drawing.

Choose a trigger and replay policy from the brief. Keep the text and control available throughout. Small travel and a precise settling pose can feel richer than a large bounce. Preserve contact, stroke weight, and volume; avoid a morph that turns fingers into unrelated shapes. Stroke drawing follows plausible pen order; filled shapes can reveal through masks instead of tracing their perimeter as if it were handwriting.

Test at intended size in all selected themes. Inspect early/mid/late poses for overlapping strokes and pivot errors; then watch the actual episode at normal speed. Retarget or finish coherently on repeated input, stop when settled, and use a meaningful still for reduced motion. Sampled frames diagnose shape; they do not establish smoothness or the original trigger.

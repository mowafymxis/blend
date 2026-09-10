---
name: blend-scroll
description: Direct and implement continuous scroll storytelling with composed states, reversible progress, and complete mobile and reduced-motion alternatives.
---

# Blend Scroll

Apply discovery selectively: infer shape and feel from the brief, references, and prior answers first. Topic lists below are internal considerations, not mandatory questions. Ask only about consequential uncertainty within the project's small question set; make routine craft choices yourself and do not start a new interview for each specialist.

Own a connected narrative controlled by scroll. Read [motion direction](references/motion-direction.md) for staging and medium decisions, and [scroll implementation](references/scroll-scenes.md) for measurement, pinning, progress, and lifecycle.

Use the scroll branch of [discovery](../blend-discovery/SKILL.md) before selecting a signature scene. Ask whether scroll should scrub a continuous transformation or merely trigger a reveal, what changes and why, preferred prominence/length, live objects versus video/frames, and the mobile alternative. A premium reference does not answer those questions. When the user has already specified the scene and medium, use those answers directly. Read [cinematic medium choices](references/cinematic-media.md) if “like a video” is ambiguous or video/frame scrubbing is selected.

Decide whether the page earns the scene. A transformation, spatial relation, process, or compelling visual story can justify a sustained stage. Lookup, urgent tasks, and short offers usually benefit from direct flow. Premium does not imply pinning. When the user explicitly requests a live scroll scene, implement that behavior rather than substituting fade-up sections or a video.

Write a concrete visual sentence: subject, change, insight, destination. Compose opening, revealing intermediate poses, recognition hold, and landing frame. Carry the same subject or spatial anchor across beats. Keep type quiet during complex object motion; hold the object when readers need to absorb text.

For requested 3D or cinematic 3D scroll animation, use Three.js or an equivalent real 3D renderer with mesh geometry, a camera, materials, and lighting. Treat “video-like” as a continuity/quality description when the requested subject is 3D; do not substitute CSS perspective, flat SVG layers, a tilted image, or footage for the live scene. Use actual video/frame seeking when the user explicitly selects supplied or pre-rendered media. Keep genuinely 2D explanations in SVG/DOM. Coordinate model quality and fallbacks with blend-visual-assets.

Do not mistake the references' overall finish for a request to animate every section. A small card recording informs local choreography, not scroll-trigger choice. Use the page's actual narrative to decide whether a sustained stage belongs. When a scene is warranted, inspect its payoff frame as critically as its hero: scale, materials, cropping, and a readable next step should stay convincing after motion stops.

Map progress from measured geometry, not accumulated wheel deltas. Direct scrubbing owns pose; avoid long lag or transitions fighting it. Local easing can shape a beat while preserving reversible mapping. Allocate distance to actual information; remove empty runway. Match entry, sticky release, and final placement to surrounding flow.

Mobile may use a different crop, fewer simultaneous parts, a compact sequence, or static sections. Reduced motion and renderer failure need complete understandable content with unused pin distance removed. Controls remain accessible outside the canvas; decorative scenes must not trap scrolling or focus.

Verify forward/reverse traversal, direct jumps, restored scroll, resize, short screens, load failure, reduced-motion changes, and hidden-tab resume. Inspect intermediate frames and actual timing. A contact sheet supports composition review, not a smoothness claim.

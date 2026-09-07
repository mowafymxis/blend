# Blend source and package audit

Reviewed 2026-09-08. This is a design/engineering instruction audit, not a repository security scan or a benchmark proving model quality.

## Sources and scope

- [Taste v2](https://github.com/Leonxlnx/taste-skill/blob/ccbc15639c97057cbfcf32ecebc38ef716e4bb37/skills/taste-skill/SKILL.md), including its appendices and code skeletons.
- [Original Taste v1](https://github.com/Leonxlnx/taste-skill/blob/ccbc15639c97057cbfcf32ecebc38ef716e4bb37/skills/taste-skill-v1/SKILL.md), including its motion-engine bento rules.
- User-supplied `premium-frontend/SKILL.md` and `references/premium-ui-checklist.md`.
- User-supplied `frontend-motion-design/SKILL.md`.
- The user's screenshot and description of a hover-drawn scribble. The image is evidence of appearance only; behavior comes from the request. The private screenshot is not redistributed.
- The resulting Blend entry point, references, metadata, documentation, and runnable lab.

Other Taste variants and its shell installer are outside this synthesis audit. Nothing was executed from the source repository. Source documents were treated as material to evaluate, not instructions superseding the user's request. The original installed skills remain unchanged; fixes are incorporated into Blend.

Local source SHA-256 fingerprints:

| Source | SHA-256 |
|---|---|
| premium-frontend entry point | `06fd64e2b274407f2ec3cc08950602c46a4c22b9622f0ec9e4aba042ce3a7fc8` |
| premium UI checklist | `47b95aa4992d1ce7c20dfd6056e1b2473b71c91e6c8001e0a012fba6860b678f` |
| frontend-motion-design entry point | `1f57e865acb250d71ca8e44c2a71defa61f4cfa3759885132339cda8a5908656` |

## Findings and resolutions

“High” means a rule can materially violate scope, truthfulness, accessibility, or working behavior. “Medium” means it can undermine craft, portability, or reliability. These are instruction-quality severities.

| Source / location | Finding and impact | Blend resolution |
|---|---|---|
| Taste v1 §§4, 9 | **High:** required infinite motion and fake auto-sorting in ordinary dashboard cards can distract and imply activity that is not real. | Event-driven feedback, bounded mascot responses, optional idle motion, honest app state. |
| Taste v1 §7; v2 §§4.9, 9.D | **High:** avoiding round invented numbers in favor of messy realistic data does not make them authentic. V2's real-data rule conflicts with this; a hidden mock comment does not inform the viewer. | Real claims only; visibly identify sample content when it could be mistaken for production. |
| Taste v2 §§0, 3, 4, 6, 14 | **High:** contextual opening conflicts with mandatory packages, imagery, dual themes, font/color bans, and an all-boxes checklist. These can override a supplied brand or a small scope. | Preserve explicit user choices and existing stack; requirements follow the actual task. |
| Taste v1 §§3, 9; v2 §§4.4, 4.9 | **Medium:** anti-card rules coexist with compulsory bento layouts or card-per-spec suggestions. Large radii and repeated gallery structure can replace one template with another. | Group by content and interaction; keep useful rows/tables and permit expressive or quiet surfaces. |
| Taste v2 §4.8 | **High:** compulsory image generation and minimum photo counts conflict with text-led pages, authentic assets, and custom SVG drawing. Seeded placeholder photography is not guaranteed to depict its seed words. | Use assets for meaning, verify content, allow original SVG/art, avoid filler or false previews. |
| Taste v2 §5.B | **High:** the horizontal-pan example captures distance once; `invalidateOnRefresh` cannot make that captured constant responsive. Reduced motion leaves an overflowing track inside an overflow-hidden wrapper. | Fresh wrapper-based measurements and explicit static/mobile layout, with no inaccessible offscreen essentials. |
| Taste v2 §5.A | **Medium:** combining native sticky cards with library pinning can create competing containment/offset behavior. This is a source-level risk; the upstream skeleton was not executed here. | Assign pin ownership to one mechanism per stage. |
| Taste v2 §5.C | **High:** initial opacity-zero viewport reveals can leave server-rendered content hidden when enhancement fails. | Readable initial HTML; opt into decorative enhancement only after initialization. |
| Taste v1 §§5–6; v2 §§5.D, 6.A, 7 | **Medium:** exclusive transform/opacity and blanket scroll-listener bans conflict with SVG drawing and controlled size transitions. `transition: all` can animate unintended properties. | Prefer composited properties, permit measured strokes/masks, batch bounded frame work, name transition properties. |
| Taste v1 §8; v2 §10 | **Medium:** banning multiple engines anywhere in a component tree mistakes shared tree membership for shared property ownership. | Different renderers may coexist; never compete for the same transform/property. |
| Taste v2 §§6.B, 7 | **High:** reduced-motion obligations tied to a numeric threshold can exempt uncomfortable low-intensity effects. | Respect reduced motion for every relevant component, including preference changes during use. |
| Taste v2 §§3.E, 7 | **Medium:** treating dynamic viewport units as always stable and every mobile layout as one column overgeneralizes real layout needs. | Choose viewport units and responsive composition by actual behavior and test them. |
| Taste v2 §§9.F–9.G, 14 | **Medium:** punctuation, eyebrow quotas, color bans, no repeated CTA intent, and rigid heading limits can outrank readability and valid user copy. | Remove unnecessary prose and decoration by purpose; retain requested content, natural punctuation, and useful repeated actions. |
| Taste v2 §2 and appendices | **Medium:** package/legal/accessibility assertions are presented as universal facts, and snippets can age. A library does not automatically make an app accessible. | Verify installed-version official docs when needed; test actual semantics and behavior. No package catalog is copied. |
| Taste v2 §12 | **Medium:** a large future block-library contract is present without the proposed block files. | Link only resources shipped in this package; include a runnable focused lab. |
| premium-frontend §2 versus checklist “Product character” | **High:** entry point permits inferred direction; checklist requires user choice unless explicitly skipped. The checklist also rejects exact copying more broadly than the entry point's authorized-reference rule. | One consistent intent rule: proceed on clear direction; support authorized faithful reference work. |
| premium-frontend §§3, 6–7 | **Medium:** useful restraint defaults can become a uniform neutral, single-accent, card-averse house style. | Product-specific density, palette, imagery, and grouping remain primary. |
| premium-frontend §14 | **High gap:** strong backend-copy exclusions do not explicitly protect all existing wording during styling/motion work. | Add an explicit no-unsolicited-copy-rewrite rule and Turso/empty/error examples. |
| frontend-motion-design §§1, 3, 14–15 | **Medium:** obligatory entrance/coverage and “make it less static” language can invite unnecessary motion in a focused task or quiet product. | Preserve useful coverage while making entry and signature motion conditional; no motion quota. |
| Both local motion sections | **High gap for this request:** optional scroll-video skill routing does not directly explain live no-video scenes, stroke reveal, WebGL ownership, or mascot rigs. | Self-contained scroll, drawing, spatial, and character references with fallbacks and interruption rules. |
| frontend-motion-design §§12–14 | **Medium gap:** reduced motion, performance, and QA are sound but could be more explicit about runtime preference changes, offscreen work, cleanup, and test evidence. | Component lifecycle contract and concrete verification matrix. |

## Preserved strengths

Taste contributes brief-first direction, variation/density awareness, real-state coverage, dependency verification, and preservation-aware redesign. Premium contributes product-fit typography, composition, restraint, and user-facing copy. Motion contributes meaningful coverage, timing relationships, spatial continuity, and reduced-motion behavior. Blend rewrites these into a coherent workflow rather than concatenating conflicting instructions.

## Blend self-audit

- Entry point is self-contained with relevant reference routing; no dependency on another installed skill or an unavailable plugin.
- Ordinary small fixes, audit-only tasks, existing brands, authorized references, and concise copy have explicit scope protection.
- No-video scenes map scroll position to live elements. WebGL guidance is distinguished from the CSS 3D demo.
- Handwriting has stroke/mask guidance; the executable lab draws a scribble, not full handwritten lettering.
- Mascot guidance includes original art, rig pivots, state priorities, event interruption, status semantics, and cleanup. The demo implements idle/notice/greeting only, not an artificial working backend.
- Accessibility and failure modes cover keyboard, touch, reduced motion, static HTML, and renderer fallback. No quality or performance guarantee is inferred from using a particular library.
- Examples and source attribution are included; there are no speculative folders, package dependencies, CI scaffolds, copied private screenshot, or unrelated repository changes.

## Verification performed

- Codex skill-creator `quick_validate.py`: passed using Python UTF-8 mode (`python -X utf8 ...`). The initial default Windows encoding could not read curly quotes; no global environment setting was changed.
- `node --check examples/lab.js`: passed.
- Headless Microsoft Edge `152.0.4191.66` through Playwright: passed checks for intermediate/completed/reversed SVG draw, keyboard-focus draw, distinct scroll phases, identical reverse-scrub pose, resize while enhanced, keyboard mascot greeting, repeated activation settling, initial/live reduced motion, mobile touch activation, mobile overflow, and no-JavaScript fallback. No page errors were observed on the instrumented desktop page.
- Visually inspected desktop, pinned-scene, and full mobile captures. The captures show rendered output; motion checks separately inspect runtime states and intermediate animation values.
- Local Markdown targets, metadata, staged whitespace, installation, and repository status are checked during packaging.

Limitations: no physical mobile device, Safari/Firefox run, screen-reader session, WebGL model benchmark, or field performance measurement. No independent model forward-test was run; the regression prompts are provided for future evaluation. Upstream code findings are static review, not claims that those entire skills were executed in real product tasks.

## Repository organization

### Added frontend showcases

On 2026-09-08, added Frequency and Forma Atelier as independent runnable frontend examples and replaced the README's prompt-only example with real screenshots. Edge browser checks passed for architecture dialog opening, Escape dismissal/focus return; music search, filters, save/unsave, empty states, audio progress and stop; 390 px mobile overflow; and reduced-motion styles. Desktop and mobile captures were visually inspected. The architecture mobile navigation was recomposed after that inspection. JavaScript syntax checks passed for both scripts.

The audio checks establish context playback state and progress, not a human listening assessment. Music saves are session-local. The studio and its project are fictional; its contact address is illustrative. The architectural concept asset is generated, with its prompt recorded in the example notes. Neither new example is a full production service. The original motion lab remains available separately.

Repo read: a newly initialized, public, single-skill repository for Codex users, with an existing MIT license and minimal README. Cleanup / documentation / modernization dials: **3 / 6 / 1**. Keep the root skill entry point, a short README, source notices, this requested audit, focused references, and runnable examples. Preserve the original license. No broad cleanup or toolchain migration was needed.

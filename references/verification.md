# Verification and behavioral audit

Match the checks to the requested change. Record observed outcomes, not blanket claims. Preserve out-of-scope work. For audit-only tasks, present findings before proposing a redesign.

## Product and visual review

Check the primary task, hierarchy, text density, readable type, crops, whitespace, and real states. Read every visible string. Remove backend/process leakage and unnecessary prose; preserve useful content. Check meaningful claims against supplied facts and visibly label sample data. Verify routes and controls instead of accepting click-shaped decoration.

Inspect narrow and wide layouts, a short viewport, long text, and zoom. Check touch target usability, horizontal overflow, focus visibility, and alignment. Theme checks cover the themes the product actually supports; do not add dark mode merely to satisfy a checklist.

## Motion review

| Test | Pass condition |
|---|---|
| Rapid pointer enter/leave | Effect reverses from current pose, no queues or flicker |
| Keyboard-only activation | Same action works, focus stays visible, no hover dependency |
| Touch | First tap performs the action; no sticky hover gate |
| Open/close/reopen | Focus, state, and exit cleanup remain correct |
| Scroll start/middle/end and reverse | Deterministic pose, no blank gaps or cumulative drift |
| Resize while pinned | Fresh measurements, no sudden unreachable content |
| Reload at a scrolled position | Correct pose on initialization |
| Reduced motion before load and toggled live | Complete static/low-motion state with collapsed pin space |
| JavaScript disabled or renderer fails | Essential content and actions remain available through appropriate fallback |
| Hidden tab/offscreen | Unneeded work stops; resume does not jump or repeat stale actions |
| Unmount/remount | No duplicate listeners, orphaned timers, or stale GPU resources |

Do not infer timing or performance from a still screenshot. Exercise the actual effect and inspect intermediate and final frames. A decorative drawing may be hidden until hover, but its essential HTML label must remain readable. Record which browsers/devices were actually tested; simulated touch is not physical device coverage.

Run the existing build/type checks and relevant tests where code changed. Inspect console errors, missing assets, and layout shifts. For a heavy narrative or WebGL scene, profile representative hardware and reduce detail/pixel ratio or animation work based on measured bottlenecks. Do not equate a desktop Lighthouse score with field performance.

## Skill regression scenarios

Use these prompts to evaluate the skill's decisions after changing it. They are test inputs, not product copy. Static review alone does not establish model behavior; a real forward test requires running a fresh agent with the changed skill and reviewing its output.

1. “Only fix this button's alignment.” Expected scope: alignment fix, no new hero, text, dependencies, or motion overhaul.
2. “Keep our purple Inter dashboard and improve empty states.” Expected: preserve brand and density, concise empty states, no invented data or looping bento showcase.
3. “This is a notes app using Turso. Polish the frontend.” Expected: no database badge in normal screens; architecture remains in implementation context.
4. “Make this product assemble as I scroll. No video.” Expected: reversible pinned live scene, readable fallback, no video substitution.
5. “Draw the little scribble on hover.” Expected: original path draw with focus parity, stable label/hit box, interruption behavior.
6. “Make a friendly mascot like Claude's.” Expected: original character, purposeful rig and states, bounded reactions, reduced-motion mode.
7. “Use our exact authorized reference and existing copy.” Expected: follow that reference instead of font/palette bans or unsolicited rewrite.
8. “Audit this frontend; don't change files.” Expected: evidence-backed findings, no mutations.
9. “Build a waitlist landing page; we have no customers or metrics yet.” Expected: clear offer and honest waitlist path, no fabricated testimonials, guarantees, or statistics; no required FAQ count or tagline animation.
10. “Fix the spacing on our campaign's signup button; preserve everything else.” Expected: focused spacing change, no rewritten funnel, indexing change, or new tracking.
11. “Create a static landing page using our serif italic headings and gradient brand.” Expected: preserve the authorized style and static behavior; no forced font list, floating navigation, or scroll reveals.
12. “Audit our ad landing page's discovery and signup flow.” Expected: examine existing indexing intent and actual form behavior, distinguish client validation from confirmed submission, and do not submit live data without authorization.
13. “Build a design studio site and an AI company site with distinct identities.” Expected: product-specific layouts and motion; no automatic paper assembly, repeated mascot, or mandatory pinned/video-like scene copied from the lab.

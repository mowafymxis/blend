# Blend

A frontend skill for deliberate design, concise copy, and motion that feels part of the product. Build anything from a quiet workspace to a scroll-controlled product story, with drawing effects, spatial animation, and original mascots.

[![A live CSS 3D assembly beside the heading Pieces find their place](assets/scroll-study.png)](examples/index.html)

A still from the runnable scroll study. Scroll position controls the live layers; no video is used.

## Try it

Ask Codex:

```text
Use $skill-installer to install https://github.com/mowafymxis/blend
from path . with the name blend.
```

Then, on your next turn:

```text
Use $blend to polish this frontend. Preserve the existing copy and brand.
Draw the small accent on hover and focus, and make state changes feel coherent.
```

Or copy this repository into your Codex skills directory as a folder named `blend`. The folder's `SKILL.md` is the entry point; keep its references and examples alongside it. The skill is self-contained and does not require the source skills to be installed.

## See what it means

The [runnable motion lab](examples/index.html) demonstrates a hover-drawn scribble, a reversible scroll assembly made of live CSS 3D layers, and an original SVG mascot. Open it locally or follow the [example instructions](examples/README.md). There is no video or dependency installation.

| Request | Blend's approach |
|---|---|
| “Polish our notes app; it uses Turso.” | Refine the app without inserting database badges or backend explanations. |
| “Only fix the spacing.” | Fix the spacing, preserve copy, and keep the change scoped. |
| “Make it transform as I scroll, like a film, but no video.” | Use a pinned live scene, deterministic progress, and a compact reduced-motion fallback. |
| “Give it a friendly mascot.” | Create an original character with a rig, purposeful reactions, and accessible status where needed. |

## What's inside

[SKILL.md](SKILL.md) contains the core workflow. Focused [references](references/verification.md) cover craft, copy, motion, scroll narratives, 3D, mascot behavior, and verification. [AUDIT.md](AUDIT.md) records source findings, decisions, and validation limits.

To check an edit, run Codex's skill-creator `quick_validate.py` against this folder, check local Markdown links, and exercise the lab with keyboard, pointer, reverse scroll, and reduced motion. The scenario prompts in [verification](references/verification.md) support future behavioral evaluations.

Blend synthesizes the user's premium-frontend and frontend-motion-design skills with an audited reading of [Taste Skill](https://github.com/Leonxlnx/taste-skill), including its original v1. See [source attribution](THIRD_PARTY_NOTICES.md). Distributed under the existing [MIT license](LICENSE).

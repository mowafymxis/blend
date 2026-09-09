# Blend

Eleven coordinated frontend skills for Codex. Blend interprets your brief, clarifies consequential choices, and brings together typography, interfaces, imagery, mascots, and motion. Use `$blend` for a project or call a specialist for a focused change.

## Install

With Python 3.9 or newer:

```sh
git clone https://github.com/mowafymxis/blend.git
cd blend
python scripts/install.py
```

The installer copies the complete suite into `$CODEX_HOME/skills` or `~/.codex/skills`. Start a new Codex task to load it.

To update, run `python scripts/install.py --replace`. Existing matching folders are backed up in `.maintainer/install-backups/`. Other skills are untouched. Use `--dest PATH` or `--backup-dir PATH` to choose different locations.

For manual installation, copy each folder inside `skills/` into your skills directory and include the root `LICENSE` and `THIRD_PARTY_NOTICES.md` in each. Keep the complete suite together for its cross-skill links.

## Use

```text
Use $blend to build a scheduling app for a repair business.
Keep it clear and practical, with a distinct visual identity.
```

```text
Use $blend-micro-motion to animate the drawing inside this card.
Keep the text stable and give the sequence a deliberate resting pose.
```

Blend reuses your answers and asks only about unresolved choices. It has no mandatory palette, font pairing, mascot, or animation library. Specialists can be called directly.

| Skill | Owns |
|---|---|
| [blend](skills/blend/SKILL.md) | Intent-led coordination, scope, specialist selection, and integration |
| [blend-discovery](skills/blend-discovery/SKILL.md) | Shape/feel inference, focused questions, and a compact decision record |
| [blend-art-direction](skills/blend-art-direction/SKILL.md) | Reference interpretation, composition, visual character, and stylistic range |
| [blend-typography](skills/blend-typography/SKILL.md) | Type selection, real-text specimens, optical tuning, responsive and multilingual typesetting |
| [blend-interface](skills/blend-interface/SKILL.md) | App workflows, records, forms, navigation, state continuity, and useful copy |
| [blend-landing](skills/blend-landing/SKILL.md) | Offer, page argument, evidence, and conversion behavior |
| [blend-micro-motion](skills/blend-micro-motion/SKILL.md) | Small illustrated sequences, SVG details, and interruptible control feedback |
| [blend-scroll](skills/blend-scroll/SKILL.md) | Connected scroll stories, composed intermediate states, and reversible progress |
| [blend-visual-assets](skills/blend-visual-assets/SKILL.md) | Imagery, illustration, live 3D, fidelity, crops, and fallbacks |
| [blend-mascots](skills/blend-mascots/SKILL.md) | Character identity, rigs, acting, real event states, and quiet modes |
| [blend-review](skills/blend-review/SKILL.md) | Rendered craft, task behavior, temporal evidence, and proportional revision |

## Examples

Two runnable, fictional landing pages with original artwork and local interactions.

[![Morrow: dark AI workspace with a pixel companion](assets/morrow-preview.png)](examples/morrow/index.html)

**[Morrow](examples/morrow/)** — a dark, sans-serif AI workspace with an original pixel companion, three authored conversation samples, a continuous source-to-brief scroll sequence, and small drawn animations. The demo uses prewritten text and supports copying a response.

[![Format: light design studio with original identity artwork](assets/format-preview.png)](examples/format/index.html)

**[Format](examples/format/)** — a light, sans-serif studio with new Index and Serein projects, expandable project details, a continuous identity-building scroll sequence, and a brief that downloads locally.

```sh
python -m http.server 18789 --bind 127.0.0.1
```

Open [the local gallery](http://127.0.0.1:18789/examples/). No build step or external assets are required. See [example behavior and verification](examples/README.md).

## Repository

- `skills/` — the installable suite and reusable reference guides.
- `examples/` — the two pages, shared motion helpers, gallery, and bundled fonts.
- `assets/` — README and gallery previews.
- `scripts/` — installation and validation.

```sh
python scripts/validate.py
python scripts/test_install.py
```

These checks verify metadata, local Markdown links, installation, backups, and rollback. For rendered work, use the [review method](skills/blend-review/references/verification.md). The examples demonstrate techniques; they do not establish consistent model output quality.

## License

[MIT](LICENSE). Adapted guidance and font credits are in [THIRD_PARTY_NOTICES.md](THIRD_PARTY_NOTICES.md).

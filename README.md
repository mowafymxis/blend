# Blend

A design skill for frontends with a clear visual direction and working task flows. Blend helps an agent choose a composition, build with real content, and revise the rendered result before delivery. Motion is used where it serves the product.

## See it in use

### Bench · Bicycle workshop

[![Bench repair queue with green navigation, aligned job records, and an editable detail panel](assets/bench-preview.png)](examples/bench/index.html)

A dense workshop tool: find a repair, inspect it, update its status, or add a sample job. [Explore Bench](examples/bench/index.html).

### Afterlight · Observatory evening

[![Afterlight observatory page with expressive serif typography and an original illustrated night sky](assets/afterlight-preview.png)](examples/afterlight/index.html)

An illustrated public-facing experience: choose an arrival time and activity, then download a matching visit plan. [Explore Afterlight](examples/afterlight/index.html).

Both are fictional, dependency-free demonstrations. They show possible design outcomes; they are not a benchmark of model reliability. No forms send data and no reservations are made. [Run the examples locally](examples/README.md).

## Use Blend

Copy this repository into your Codex skills directory as a folder named `blend`. Keep `SKILL.md`, references, and examples together. No source skills need to be installed separately.

For a new design:

```text
Use $blend to build a repair scheduling tool. Make finding and updating
a job easy, with a distinct visual direction and a usable mobile layout.
```

For existing work:

```text
Use $blend to refine this frontend. Preserve our copy, brand, and routes.
Inspect the render and fix the most important visual weaknesses.
```

## Inside the skill

- [Core workflow](SKILL.md): scope, design, copy, behavior, and the visual revision pass.
- [Art direction](references/art-direction.md): choose a composition, type roles, density, and assets from the brief.
- [Product workflows](references/product-workflows.md): navigation, records, forms, and task continuity.
- [Landing pages](references/landing-pages.md): offer, evidence, conversion paths, and discovery checks.
- [Motion recipes](references/motion-recipes.md), [scroll scenes](references/scroll-scenes.md), and [3D and mascots](references/3d-and-mascots.md): conditional techniques, not required effects.
- [Verification](references/verification.md): behavior checks and a method for evaluating draft quality across fresh runs.

## Develop and verify

With Python 3 installed, serve the repository from its root:

```sh
python -m http.server 18789 --bind 127.0.0.1
```

Open [the example gallery](http://127.0.0.1:18789/examples/). There is no package installation or build step. Follow the [example checks and preview instructions](examples/README.md) after changes, and the [verification guide](references/verification.md) when revising the skill. Keep local captures and experiments in the ignored `.maintainer/` directory; commit only the selected documentation previews.

## Credits

Blend combines premium-frontend and frontend-motion-design guidance with ideas from [Taste Skill](https://github.com/Leonxlnx/taste-skill) and landing-page guidance adapted from [Elaya’s AI Design Skills](https://github.com/elayadesign/ai-design-skills). It selectively adapts these sources rather than inheriting every styling rule. See [attribution](THIRD_PARTY_NOTICES.md) and the [MIT license](LICENSE).

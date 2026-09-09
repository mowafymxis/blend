# Blend examples

Two original, fictional landing pages. Both use plain HTML, CSS, JavaScript modules, local fonts, and authored SVG/DOM artwork.

## Run

From the repository root:

```sh
python -m http.server 18789 --bind 127.0.0.1
```

Open [the gallery](http://127.0.0.1:18789/examples/), [Morrow](http://127.0.0.1:18789/examples/morrow/), or [Format](http://127.0.0.1:18789/examples/format/). Use HTTP so JavaScript modules load. No package installation or build step is needed.

## Morrow

A dark AI workspace with DM Sans and a small original pixel companion. Choose between three authored samples and copy the selected response; blocked clipboard access falls back to a text download. There is no live model or simulated waiting time.

The continuous scroll scene brings source cards together into a working brief. Three small drawings support the capabilities section, with finite replay controls. The companion responds to its greeting button and sample selections.

## Format

A light studio site with DM Sans and two original projects: Index, an architectural identity in forest green and warm white; and Serein, a digital architecture archive with blue facade studies. Each project has expandable details.

The continuous scroll scene assembles Index's mark into a complete identity application. A small process drawing supports the studio section. The brief builder validates the project name and notes, then downloads a text file. No inquiry is submitted or stored.

## Motion and accessibility

Scroll poses follow measured page progress in both directions. Narrow screens (700px or less), short screens (540px or less), and reduced-motion preferences receive a complete static composition. Each scroll sequence has a skip link. Drawings play finite episodes and stop when hidden, offscreen, or reduced motion is enabled.

Without JavaScript, readable content remains available and dependent controls stay disabled. Format's project explanations remain expanded in that branch.

## Verify changes

- Follow navigation, skip links, and gallery links using keyboard and pointer.
- Morrow: switch all samples; check prompt/response agreement, copy, and the download fallback.
- Format: expand and collapse both projects; reject empty and whitespace-only fields; download a brief and inspect its contents.
- Scroll forward and backward through both scenes. Inspect the start, midpoint, and final composition.
- Replay drawings repeatedly. Check their internal movement, stable text, and settled pose.
- Check narrow and short layouts, reduced motion, JavaScript-disabled content, focus visibility, and console/asset errors.

Use the [suite review method](../skills/blend-review/references/verification.md) for substantial changes.

## Files and assets

Each page owns its HTML, CSS, JavaScript, and favicon. `shared/motion.js` provides scroll progress, finite drawing playback, and text downloads. The gallery uses `gallery.css` and the previews in `../assets/`.

All page copy and artwork are original to this repository. DM Sans and the gallery's Manrope are bundled Google Fonts subsets under the SIL Open Font License; notices are in [fonts/](fonts/). See [repository attribution](../THIRD_PARTY_NOTICES.md).

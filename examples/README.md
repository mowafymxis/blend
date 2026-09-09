# Landing-page examples

Two original landing pages built with the Blend suite. Both lead with an offer, explain it through a visual demonstration, and provide a working local action. They are handcrafted examples, not templates to repeat or proof of consistent model output quality.

| Example | Direction | Working behavior |
|---|---|---|
| [Fold](fold/index.html) | A playful animation tool; lavender paper shapes, DM Sans, and Newsreader accents | Flower replay, illustrated hover/focus gestures, three character personalities, timing control, and animated SVG export |
| [Fieldwork](fieldwork/index.html) | An unhurried walking club; bold Manrope type, an original landscape illustration, and cartographic details | Three imagined trails, route drawing, field-note updates, and a text download for the selected walk |

## Run

From the repository root with Python 3:

```sh
python -m http.server 18789 --bind 127.0.0.1
```

Open [the gallery](http://127.0.0.1:18789/examples/), [Fold](http://127.0.0.1:18789/examples/fold/), or [Fieldwork](http://127.0.0.1:18789/examples/fieldwork/). No installation or build is required. Fonts and illustrations are local; there are no external asset requests or runtime dependencies.

## Fold: show the feeling

The landing page introduces a fictional motion tool through a large paper flower, three small original illustrations, and a hands-on playground. The scene boundaries and surrounding copy stay still. The flower performs one short greeting and can be replayed. Hover or keyboard focus changes each small illustration independently.

The playground's Curious, Sleepy, and Excited buttons choose distinct motion sequences. A timing slider adjusts duration; Replay repeats the chosen motion. The download button produces an SVG containing the selected character and a single CSS animation. Reopening the file replays it. Reduced-motion settings suppress animation in both the page and exported SVG.

This is a working local demonstration, not a full animation editor or signup service. Nothing is uploaded or stored. JavaScript-disabled visitors can read the page and see the illustrations; dependent controls remain disabled with a visible explanation.

## Fieldwork: make the invitation tangible

The landing page introduces a fictional walking club through an original layered landscape, a short explanation of its ethos, and three imagined walks. Its bold type, map contours, trail numbering, and signpost illustration belong to the outdoor identity.

Choosing a walk updates the path, map title, starting marker, field-note number, descriptive text, and download label. The route draws once; repeated selection replaces the previous animation. The download contains the selected description and a clear fictional-route notice. All distances and routes are illustrative. There are no real outings, navigation directions, reservations, or member signups.

Reduced motion makes route changes immediate. Without JavaScript, all walk descriptions and the initial map remain readable, with a visible explanation of unavailable interaction. No data is collected or persisted.

## Verify a change

- Follow each navigation and call-to-action link, including direct section links and the return to the gallery.
- Fold: activate all three personalities, change timing, replay, interrupt a sequence, and download each variant. Open an exported SVG and check its artwork and animation.
- Fold: hover and focus the small illustrations. Their text and containing surfaces should stay stable; leaving should restore the initial pose.
- Fieldwork: choose all three walks, interrupt a route draw, and check that the map, copy, accessible title, and downloaded text agree.
- Both: inspect desktop, narrow mobile, and short layouts; keyboard focus; failed asset requests; JavaScript-disabled behavior; and initial/live reduced motion.

Use the [suite review guide](../skills/blend-review/references/verification.md) for broader evaluation. Local test scripts and trial captures belong in ignored `.maintainer/`; selected previews live in `assets/`.

## Asset provenance

All example text, illustrations, characters, maps, and landscape artwork are original to this repository. DM Sans, Manrope, and Newsreader are bundled Latin font subsets from Google Fonts under the SIL Open Font License. Their notices are in [fonts/](fonts/). See [repository attribution](../THIRD_PARTY_NOTICES.md).

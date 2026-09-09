---
name: blend-typography
description: Choose and refine frontend typography, font roles, responsive hierarchy, and multilingual reading quality. Use when type selection or typesetting materially shapes the design.
---

# Blend Typography

Treat typography as layout and voice. Select type from actual words, script coverage, density, brand, and reading conditions. Do not keep a house pairing or rotate a fixed font list to simulate variety.

Before a new type direction, use the typography questions in [discovery](../blend-discovery/SKILL.md): serif/sans/expressive/exact family, body and UI character, likes/dislikes, language coverage, and font availability. Offer actual headline/body/button specimens when the user cannot name a face. Do not silently choose a serif plus italic accent because a reference contains one. Preserve settled choices; narrow typesetting fixes need no full interview.

## Establish roles with real specimens

Collect the longest important headline, a normal paragraph, navigation, a primary action, a long label, and representative numbers. Add the required languages and scripts. Determine which roles need distinction: display, reading, interface, annotation, data. A single family can cover them; multiple families need an actual role difference.

Compare plausible faces at equal apparent size, not just equal CSS size. Examine x-height, width, apertures, stroke contrast, terminals, italics, punctuation, and numerals. Render the actual copy before choosing with the user or exercising delegated judgment. Show specimens in the chosen themes and at a narrow width; fallback rendering is not evidence for the proposed family. Familiar fonts are valid when they fit. Preserve the user's supplied family and authorized identity.

| Direction or need | Traits to evaluate | Common mismatch |
|---|---|---|
| Editorial, cultural, reflective | Reading texture, italic quality, serif contrast, paragraph rhythm | Display hairlines used for small UI |
| Precise product presentation | Clean large forms, balanced widths, confident weights | Oversized type crowding the product |
| Frequent app work | Open counters, compact but readable labels, clear similar glyphs | Fashionable narrow face slowing scanning |
| Technical notation | Tabular figures, symbols, disambiguated 0/O and 1/l/I | Mono applied to every paragraph |
| Playful or character-led | Expressive forms compatible with the illustration | Novelty font competing with every other element |
| Dense comparisons | Numeric alignment and restrained emphasis | Proportional figures making columns drift |

These are lenses, not named presets. A serif can belong in a tool; a sans can carry an editorial story.

## Typeset before declaring success

Tune size, weight, width, line height, tracking, and measure together. Large display type can use tighter spacing when its glyphs permit it; small text needs open spacing and adequate contrast. Avoid universal negative tracking. Inspect pairs, punctuation, ascenders, descenders, italic overhang, and inline icons at actual size.

Choose hierarchy from reading order and content weight, not a mandatory mathematical scale. Test headings with real line breaks across widths. Prefer content-aware wrapping over permanent desktop line breaks. Do not use a huge minimum font size that overflows on narrow screens; do not reduce body copy until it fits an arbitrary card height.

Align mixed sizes optically as well as mechanically. Match button text and icon visual centers; make repeated label baselines stable. Use tabular numbers where users compare values, and proportional text where it reads more naturally. Keep semantic heading order independent of visual size.

Judge the type hierarchy as part of the reference's composition. A large serif headline plus an italic keyword is not automatically editorial; the paragraph measure, supporting weight, line endings, and surrounding space must also work. Do not apply an italic counterpoint to every headline or shrink navigation and captions into decorative microtext. Read the supporting copy at normal display scale, not only in an enlarged screenshot.

Where the reference is quiet, let the dominant type treatment carry its role without a competing novelty face or repeated uppercase slogan. Where it is bold, preserve the intended mass rather than thinning everything into a generic “premium” look. Verify actual font weight/style loading before judging the render; fallback or synthetic styles can change the entire balance.

## Respect language and loading

Check font licensing, actual files, available weights, and coverage before implementation. Do not label an unavailable font as installed or silently rely on a substitute in screenshots. If research or downloads are needed, use authoritative font/provider sources. Prefer an existing suitable stack when the change does not justify another dependency.

Use appropriate fallbacks and font-display behavior; reserve layout where practical and inspect the loading transition. Avoid synthetic bold/italic when real variants materially affect quality. Subset only without losing required characters. Variable font axes are useful when the font supports them, not an animation requirement.

For Arabic or other joining scripts, preserve shaping, choose suitable script-specific metrics, and avoid Latin tracking rules. For RTL, check direction, punctuation, numbers, mixed-language labels, and logical alignment. Do not infer locale from a workspace path. Verify the actual required script rather than promising universal multilingual support.

Test zoom, long names, narrow screens, empty values, and meaningful fallback content. Interactive text remains selectable and semantic; avoid splitting words into animation spans that damage reading order or accessibility. Animated type never blocks reading the essential message.

Deliver a compact set of type tokens and role choices backed by a render. If the page still feels generic, revisit composition and content rather than merely swapping the font.

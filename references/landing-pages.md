# Landing-page strategy and finishing

Use for a new campaign or offer page, or when the user requests marketing structure, conversion copy, or a landing-page audit. Follow Blend's existing brand, scope, honest-content, and motion guidance. This reference supplies decision criteria, not a mandatory page template or visual preset.

## Establish the offer and visitor intent

Infer from the brief and existing material: what visitors receive, who needs it, where they arrive from, what they already know, their main hesitation, and the primary action. Distinguish a CTA click from a completed signup, booking, or purchase. Do not add analytics or tracking simply to define that outcome.

Check which product images, customer statements, metrics, prices, and trial or cancellation terms are actually supplied and approved for use. Ask in one concise batch only when missing information materially changes the work. State reasonable design assumptions and continue; do not invent business facts to fill gaps.

Align the hero with the promise of the referring ad, email, or search query when that context is known. A campaign can prioritize one action without removing useful navigation, an accessible exit, or a legitimate secondary path. A multi-purpose homepage need not become a single-offer landing page.

## Build the page's argument

Choose the structure by visitor knowledge and friction:

| Situation | Useful structure |
|---|---|
| Familiar offer, visitors ready to act | Short explanation, necessary conditions, direct action |
| Product best understood by seeing it | Clear hero with a real preview, benefits tied to product behavior, next step |
| Unfamiliar or consequential decision | Explain the problem and mechanism, show relevant evidence, address objections before commitment |
| Visitors evaluating alternatives | Compare verifiable criteria, identify who each option fits, state tradeoffs and the next step |

Start with enough information to understand the offer and action. Add a subheading or visual only if it clarifies the decision. Position real evidence beside the claim it supports. With no customer proof, use a transparent product demonstration or explanation; omit unsupported endorsements.

Treat benefits, process steps, FAQs, pricing, and a closing CTA as tools. Include each only when it answers a real question. There is no required section count, three-step process, testimonial strip, or repeated tagline. Move a material objection earlier when it blocks the decision. Repeat the same primary action after a long argument when useful, with consistent terms and destination.

Implement and refine coherent sections without rebuilding unaffected areas on every iteration. For a substantial new page, briefly state the intended argument and visual direction before building; do not require a separate approval round or a long copy document unless requested.

## Write an accurate next step

When copywriting is in scope, connect each feature to a concrete user outcome and explain the mechanism. Specificity can come from what the product does; it does not require an invented performance number. Preserve the supplied voice and grammatical punctuation.

Prefer action labels that describe the destination or commitment: “Book a demo” for booking, “Get the checklist” for a download. “Learn more” can be correct for an informational link. Do not label a paid signup “Start free” or a contact form “Book” if it cannot book anything.

Address uncertainty using actual terms, eligibility, costs, or a preview of what happens next. Include a trial, refund, guarantee, or cancellation promise only if confirmed. Do not manufacture scarcity or urgency. Mark illustrative content where a visitor could mistake it for real evidence.

## Apply visual craft without imposing a style

Reuse the site's type and spacing tokens. Where no system exists, choose a small coherent scale appropriate to the content; do not force Tailwind, snap readable text downward, ban fonts or italics, or prescribe a hero width independent of language and layout.

For closely nested rounded surfaces, an inner radius near `max(0, outer radius - inset)` can make the corners feel concentric. Treat this as an optical starting point for uniform insets, not a rule for every card or control. Check borders, unequal padding, and actual rendering.

An optional scroll-emphasized benefit statement can suit an editorial narrative. Keep the whole sentence readable before activation, preserve its semantic reading order, and avoid per-word announcements. Choose progress from a bounded section controller when words must advance in reading order; independent word intersection events may activate a whole line at once. Reuse the [scroll-scene lifecycle guidance](scroll-scenes.md), show a fully readable static state for reduced motion or initialization failure, and never make the effect a required section.

## Finish the conversion path and discovery settings

Verify the actual primary destination and any form's labels, required fields, invalid input, in-flight state, failure recovery, and confirmed success. Client validation improves feedback but does not replace server validation in a connected form. A prototype must disclose an unconnected action rather than report a submission as successful. Do not submit live forms or create real purchases merely to test without authorization.

For a complete page build or launch audit, check the title, description, favicon, and accurate social preview when applicable. Confirm the intended public URL and indexing policy from project requirements; an ad campaign is not automatically `noindex`. An obscure path does not prevent indexing, and indexing controls do not protect private content. Preserve existing settings during unrelated visual changes.

Use visible, useful answers for real questions. Consider structured data only when it matches visible content and current search-engine eligibility; consult official documentation before implementing it. Do not promise rankings, rich results, or inclusion in AI answers.

Check applicable footer destinations, contact and policy links, route fallbacks, current-navigation indication, and a skip link for repeated navigation. Use approved policy content; do not generate legal promises or add a consent banner as decoration. Resolve requirements from actual data use and the requested release scope.

For verification, follow [Blend's verification guide](verification.md). Add checks for agreement between offer, CTA, terms, and destination; evidence behind each claim; and the implemented search/share settings. Report observed defects and unverified integrations without claiming a measured conversion improvement from design changes alone.

# Character mechanics

## Design an original character

References such as Claude's mascot can suggest warmth, a simple silhouette, expressive eyes, or stepped geometry. Create an original silhouette, palette, proportions, face, and motion vocabulary unless the user supplies an authorized character to reproduce. Do not present third-party branding as the user's own identity.

Start with a clear silhouette that reads at its actual size. Separate body, face, eyes, mouth, feet/arms, and optional accessories into a rig. Place pivots at joints; preserve the ground contact point during squash and stretch. For pixel art, keep integer-scaled pixels and stable edges unless deliberate subpixel motion improves the chosen style.

Use a small state machine instead of independent overlapping loops:

| State/event | Pose or motion | Exit / interruption |
|---|---|---|
| Idle | Quiet resting pose; occasional blink if desired | Pointer/focus or real app event |
| Notice | Small lean or eye direction toward a control | Leave/blur returns to idle |
| Working | Measured attentive motion while actual work runs | Result cancels it immediately |
| Success | Brief lift, eyes brighten, feet settle | One-shot return to idle |
| Error | Small concerned pose, no mocking shake | Recovery or next action |
| Sleep | Still resting pose when inactive | Visibility or interaction resumes |

Resolve competing events with a clear priority, such as error/success above notice above idle. Cancel the prior transition or blend from its current pose. Prevent a pointer leave from canceling an active success response. Cap reaction frequency, handle repeat activations, and clean up all timers. Optional idle blinks need a scheduler, not a permanent 60 Hz loop.

Apply anticipation and follow-through sparingly: a small compression before a hop, a slight body settle after landing, eyes leading a turn. Keep the face readable and the character anchored. Test the actual small size; attractive large artwork may collapse at 24 px.

Reduced motion uses immediate expression changes or a still character. No automatic bouncing, spins, or parallax. If purely decorative, hide it from assistive technology. If it communicates application status, provide concise DOM status text; a face alone is not adequate feedback. An interactive mascot needs a named button and meaningful action, not a clickable unlabelled canvas.

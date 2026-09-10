# Spatial scene mechanics

Use for spatial storytelling and interactive objects.

## Choose the medium

Implement requested 3D with Three.js or an equivalent real 3D engine, including mesh geometry, camera depth, materials, and lighting. CSS perspective and tilted planes are layout effects, not substitutes for a requested 3D scene. SVG remains appropriate for genuinely 2D drawings and articulated characters. Reuse an existing capable renderer; do not require React or a new application framework.

For genuine Three.js work, establish scene/camera/renderer ownership, size the canvas from its container, update camera aspect on resize, and cap pixel ratio based on measured performance. Load a real model or intentionally model simple geometry. Set a coherent light/material system and camera framing before motion. Provide a static poster or equivalent DOM content if WebGL creation, asset load, or context restoration fails. Do not claim CSS planes are a loaded 3D asset.

Render on demand for static or scroll-driven scenes. Run a loop only while active animation requires it. Pause work when offscreen or the document is hidden, and resume without a time-step jump. Keep continuous transforms outside framework render state. Bound camera movement and pointer parallax; leave navigation usable on touch and keyboard. Keep text and primary controls in accessible DOM rather than solely on a canvas.

On teardown, cancel frames, disconnect observers, remove listeners, stop animation mixers, and dispose owned geometries, materials, textures, render targets, and renderer resources. Shared resources need an ownership/ref-count policy so one unmount does not destroy another scene. Guard late loader callbacks after unmount. See [Three.js cleanup](https://threejs.org/manual/en/cleanup.html).

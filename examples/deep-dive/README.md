# Deep Dive 3D demo

A procedural Three.js scene demonstrating a 3D nerve-like structure, emissive signal, floating particles, cinematic lighting, fog, and a moving camera.

From this directory:

```bash
npm install
node ../../tools/capture.mjs check
node ../../tools/capture.mjs render
```

Output: `renders/deep-dive-demo.mp4`. For final output, update `project.json` to 1080×1920 and use 30 fps. `src/scene.js` exposes `update(seconds)` so each frame is deterministic and seekable.

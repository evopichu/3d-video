# 3D Story Animation — local video skill

A 3D-first short-form storytelling skill inspired by the workflow shape of the supplied Video-Generator repository: topic → story plan → narration → animated shots → sound → render → visual QA → delivery.

This package is a standalone implementation scaffold, not a byte-for-byte copy of the source repository. It focuses on three genuinely 3D visual modes: Deep Dive, Night File, and Tall Tale.

## Quick start

```bash
npm install
bash scripts/selftest.sh
```

Requirements: Node.js 20+, npm, FFmpeg, and a Chromium-compatible environment supported by Puppeteer.

## Package map

- `SKILL.md` — agent instructions and storytelling/production workflow
- `styles/` — visual style bibles for the three 3D modes
- `examples/deep-dive/` — runnable Three.js example project
- `scripts/` — setup, self-test, and project creation helpers
- `tools/capture.mjs` — deterministic browser-frame capture and FFmpeg assembly

## Render the example

```bash
cd examples/deep-dive
npm install
node ../../tools/capture.mjs check
node ../../tools/capture.mjs render
```

The example is intentionally lightweight and procedural so it runs without downloading model assets. Replace or extend the scene with original models and textures as needed.

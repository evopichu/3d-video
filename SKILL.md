---
name: 3d-story-animation
description: Create narrated, faceless vertical short videos with fully 3D scenes, cinematic camera movement, expressive 3D characters and props, word-synced captions, procedural sound, and MP4 rendering. Use for 3D explainers, science/body "what happens if" stories, mysteries/true crime, historical stories, survival scenarios, and funny true-story shorts.
---

# 3D Story Animation

Turn a topic into a finished vertical short: original narration, shot-by-shot story, 3D animated scenes, captions, sound design, and an MP4. The visual language is real 3D: geometry, materials, lighting, shadows, depth, camera lenses, parallax, volumetrics/fog where supported, and animation. Do not fake a 3D request with flat cards or a slideshow.

Everything should run locally. Use Three.js in headless Chromium, then FFmpeg. No AI-generated video or images are required. Keep scripts original; borrow a format's pacing, never another creator's exact writing, shot design, models, or frames.

## Style selector

| Style | Directory | Use it for | Visual grammar | Target |
|---|---|---|---|---|
| **Deep Dive 3D** | `styles/deep-dive/` | “What happens if…?”, body, science, engineering | Sculpted hero objects/characters, translucent cutaways, glowing internal systems, macro camera journeys, bright cinematic sets | 30–45 s |
| **Night File 3D** | `styles/night-file/` | Unsolved mysteries, true crime, eerie events | Moody fully-built locations, practical pools of light, volumetric haze, faceless 3D figures, evidence props, restrained red accents | 30–45 s |
| **Tall Tale 3D** | `styles/tall-tale/` | Funny true stories, strange incidents, clever loopholes | Stylized 3D world, rounded expressive characters, bold silhouettes, sunny palette, energetic tracking/orbit cameras | 40–60 s |

If the topic is health/science, default to Deep Dive. If it is a mystery or crime story, use Night File. If it is a funny real-world story, use Tall Tale. If unclear, ask one concise question.

## 0. First run

1. Check Node.js 20+, npm, and FFmpeg. Install missing dependencies only with the user's permission where required.
2. Run `bash scripts/setup.sh`.
3. Run `bash scripts/selftest.sh`. It must render a short preview and report `SELFTEST PASSED`.
4. Use `examples/<style>/` as the working project seed. Never overwrite an existing project without asking.

## 1. Intake — ask once

Collect only unknown essentials in one message:
- Topic (or permission to propose three ideas)
- Style (or infer it using the selector)
- Target length (default 35 seconds; Tall Tale 50 seconds)
- Voice: local TTS, user's recording, or captions-only
- Music: generated procedural bed, none, or user's licensed file
- Any required end line/handle

“Just go” means use the defaults. Do not stall on optional preferences.

## 2. Story and shot plan — show it, then wait

Before rendering, show:
1. Working title and hook.
2. Full narration, written as natural spoken language, not a stack of slogans.
3. Cut list: one line per cut, with visual action and camera movement.
4. Caption chunks and the word each reveal lands on.
5. Factual claims and source list for factual stories.
6. Any new reusable 3D asset/component needed.

Ask **“Build it?”** and wait for approval before the full render.

### Storytelling rules

- Open with a curiosity gap or a concrete impossible-sounding question in the first 1–2 seconds.
- Escalate the stakes or scale every few cuts.
- Use causal transitions (“but”, “so”, “which means”, “until”) so the narration feels told, not read.
- Include a myth, misconception, or surprising reversal when the subject supports it.
- Finish with a memorable consequence or loop-back line.
- A cut is a visual beat, not necessarily a sentence. Split sentences at natural pauses so the picture changes about every 1.5–3.5 seconds while the voice can continue naturally.
- As a rough guide, write 90–110 words for 35 seconds and 125–160 words for 50 seconds. Read it aloud mentally and trim awkward phrasing.
- Original writing only. Verify factual claims with reliable sources and store source URLs in `script.json`. Health/science content must be accurate, proportionate, and non-sensational.

## 3. Build

1. Copy the chosen example to a fresh project folder.
2. Write `script.json` with narration, cut timings, captions, and sources. The example schema is documented in `examples/deep-dive/script.json`.
3. Create or adapt assets in `src/scene.js`. Prefer reusable procedural geometry and materials over one-off primitives.
4. Animate with deterministic time: `update(seconds)` must produce the same scene state for the same timestamp. This is essential for frame-accurate rendering.
5. Use a purposeful camera for every cut: establish → move closer/orbit → reveal → land on the important detail. Avoid random camera motion.
6. Add captions in the safe lower third. Captions must not obscure the focal action.
7. Run `node tools/capture.mjs check`, then `node tools/capture.mjs render`.
8. Inspect the contact sheet and key frames. Fix issues and render again.

## 4. 3D art direction requirements

Every shot should have at least two meaningful 3D cues:
- Perspective and depth with foreground/midground/background separation.
- Real camera movement (dolly, orbit, crane, push-in, rack-focus simulation).
- Directional lighting, shadows, rim light, bounce light, or emissive accents.
- Material response (metal, glass, skin-like matte, fabric, stone, translucent tissue).
- Volumetric atmosphere, particles, depth layers, or physically scaled environments when appropriate.

Do not add 3D detail merely as decoration. Every model, movement, light cue, and camera choice should support the spoken beat. Keep the hero readable on a phone. Use simplified silhouettes before adding detail.

### Animation rules

- Use eased transitions, anticipation, follow-through, and clear holds on important reveals.
- Keep object transforms deterministic; avoid `Math.random()` in per-frame update. Seed procedural randomness once.
- Props must remain attached to the hand/holder until a visible handoff.
- Nothing appears before its cause. Respect collisions and plausible continuity.
- Do not animate every object at once. Establish one dominant motion per shot.
- Use 24 or 30 fps consistently. Default 30 fps.
- Use a 9:16 canvas at 1080×1920. During development, render at 540×960 or 720×1280, then final quality.

## 5. Captions and sound

- Captions: 1–3 words per chunk, high contrast, exact spelling, one emphasized word at a time.
- Highlight the spoken word at its actual timestamp. If word-level timing is unavailable, use carefully estimated phrase timing and disclose that it is estimated.
- Keep captions within the lower safe zone and never over the focal subject.
- Voice must remain intelligible above music. Use restrained whooshes, impacts, ambience, and transitions; avoid harsh repetitive ticks.
- Use only audio the user owns, has licensed, or that is generated locally from permitted tools.

## 6. QA — never ship an unseen frame

Create a contact sheet at regular intervals and inspect the entire video, not just the opening. Check:
- Does every cut communicate the narrated idea immediately?
- Is the hero visible and large enough on a phone?
- Are the 3D cues real and intentional (not flat cards pretending to be 3D)?
- Are camera moves smooth, motivated, and free of clipping?
- Do shadows, materials, reflections, and transparency behave acceptably?
- Are there intersections, floating props, accidental penetrations, or sudden teleports?
- Do captions land on the spoken words and stay inside safe areas?
- Does the visual reveal happen on the right word?
- Is the audio balanced and free of clipping?
- Does the final cut resolve or loop cleanly?

Fix problems, regenerate the contact sheet, and re-check. Tell the user what was caught and fixed. Do not claim QA passed unless the frames were actually inspected.

## 7. Deliver

Provide:
- Final MP4 and a smaller share copy when useful.
- Best cover frame.
- Title, short description, and 5–8 relevant hashtags.
- Narration with timestamps when the user supplied their own voice recording.
- A concise note describing any estimated timings, missing assets, or render limitations.
Offer one focused revision pass.

## 8. Technical defaults

- Three.js for real-time 3D scene composition.
- Headless Chromium via Puppeteer for deterministic frame capture.
- FFmpeg for video assembly and audio muxing.
- Project dependencies are local npm packages; no API key is needed for rendering.
- Prefer WebGL hardware acceleration. If unavailable, try Chromium software rendering at reduced resolution and disclose the slower render time.
- Keep render settings configurable in `project.json`.

## Never

- Do not use AI video generation or claim procedural geometry is a scanned/photoreal asset.
- Do not copy another creator's narration, shot sequence, models, or frames.
- Do not invent sources or factual claims.
- Do not upload or publish anything without explicit request and confirmation.
- Do not overwrite projects without asking.
- Do not deliver a video whose frames and audio have not been checked.

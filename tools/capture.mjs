import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawnSync } from 'node:child_process';
import puppeteer from 'puppeteer';

const here = path.dirname(fileURLToPath(import.meta.url));
const project = process.cwd();
const configPath = path.join(project, 'project.json');
const cfg = JSON.parse(fs.readFileSync(configPath, 'utf8'));
const outDir = path.join(project, 'renders');
const framesDir = path.join(outDir, 'frames');
const mode = process.argv[2] || 'check';

function run(cmd, args, opts={}) {
  const r = spawnSync(cmd, args, { stdio: 'inherit', ...opts });
  if (r.status !== 0) throw new Error(`${cmd} failed (${r.status})`);
}
if (mode === 'check') {
  if (!fs.existsSync(path.join(project, 'index.html'))) throw new Error('index.html missing');
  if (!fs.existsSync(path.join(project, 'src', 'main.js'))) throw new Error('src/main.js missing');
  if (!fs.existsSync(path.join(project, 'src', 'scene.js'))) throw new Error('src/scene.js missing');
  console.log('CHECK OK');
} else if (mode === 'render') {
  fs.mkdirSync(framesDir, { recursive: true });
  const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox','--enable-webgl','--ignore-gpu-blocklist','--use-gl=angle','--use-angle=swiftshader'] });
  try {
    const page = await browser.newPage({ viewport: { width: cfg.width, height: cfg.height }, deviceScaleFactor: 1 });
    page.on('console', m => { if (m.type() === 'error') console.error('PAGE:', m.text()); });
    page.on('pageerror', e => console.error('PAGE ERROR:', e.message));
    await page.goto('file://' + path.join(project, 'index.html'), { waitUntil: 'load' });
    await page.waitForFunction(() => window.__ready === true, { timeout: 30000 });
    const total = Math.ceil(cfg.duration * cfg.fps);
    for (let i=0; i<total; i++) {
      await page.evaluate(frame => window.renderFrame(frame), i);
      await page.screenshot({ path: path.join(framesDir, `${String(i).padStart(6,'0')}.png`) });
    }
  } finally { await browser.close(); }
  const output = path.join(outDir, `${cfg.name || 'animation'}.mp4`);
  run('ffmpeg', ['-y','-framerate',String(cfg.fps),'-i',path.join(framesDir,'%06d.png'),'-c:v','libx264','-pix_fmt','yuv420p','-crf','19','-preset','medium','-movflags','+faststart',output]);
  console.log(`Rendered ${output}`);
} else {
  console.log('Usage: node tools/capture.mjs <check|render>');
}

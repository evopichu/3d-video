#!/usr/bin/env bash
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
command -v node >/dev/null || { echo "Node.js 20+ is required"; exit 1; }
command -v npm >/dev/null || { echo "npm is required"; exit 1; }
node -e 'const v=+process.versions.node.split(".")[0]; if(v<20) process.exit(1)' || { echo "Please install Node.js 20 or newer"; exit 1; }
command -v ffmpeg >/dev/null || { echo "FFmpeg is required: install it from https://ffmpeg.org/"; exit 1; }
cd "$ROOT"
npm install
echo "All set"

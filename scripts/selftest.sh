#!/usr/bin/env bash
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"
node --check tools/capture.mjs
node --check examples/deep-dive/src/main.js
node --check examples/deep-dive/src/scene.js
(cd examples/deep-dive && npm install --silent)
(cd examples/deep-dive && node ../../tools/capture.mjs check)
echo "SELFTEST PASSED"

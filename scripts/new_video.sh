#!/usr/bin/env bash
set -euo pipefail
if [ "$#" -lt 2 ]; then echo "Usage: $0 <deep-dive|night-file|tall-tale> <project-name>"; exit 2; fi
STYLE="$1"; NAME="$2"
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
case "$STYLE" in deep-dive|night-file|tall-tale) ;; *) echo "Unknown style: $STYLE"; exit 2;; esac
DEST="${HOME}/3d-story-animation/${NAME}"
[ ! -e "$DEST" ] || { echo "Refusing to overwrite $DEST"; exit 1; }
mkdir -p "$(dirname "$DEST")"
cp -R "$ROOT/examples/$STYLE" "$DEST"
echo "Created $DEST"

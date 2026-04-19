#!/bin/bash
# ─────────────────────────────────────────────────────────────────────────────
# CyCentra Website — Pull Latest from Git
#
# Usage:
#   ./git-pull.sh
# ─────────────────────────────────────────────────────────────────────────────
set -euo pipefail
cd "$(dirname "$0")"

echo "-> Pulling latest from origin/main..."
git fetch --all --tags --quiet
git pull origin main

LATEST_VER=$(git tag --sort=-version:refname \
  | grep -E '^v[0-9]+\.[0-9]+\.[0-9]+$' | head -1 || echo "no tags yet")

echo ""
echo "[OK] Repository is up to date."
echo "     Latest version tag: $LATEST_VER"

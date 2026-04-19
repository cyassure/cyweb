#!/bin/bash
# ─────────────────────────────────────────────────────────────────────────────
# CyCentra Website — Pull Latest from Git
#
# Usage:
#   ./git-pull.sh
#
# Note: git-push.sh is preserved locally and never overwritten by this pull.
# ─────────────────────────────────────────────────────────────────────────────
set -euo pipefail
cd "$(dirname "$0")"

# Preserve git-push.sh — tell git to skip it during the pull
git update-index --skip-worktree git-push.sh 2>/dev/null || true

echo "-> Pulling latest from origin/main..."
git fetch --all --tags --quiet
git pull origin main

LATEST_VER=$(git tag --sort=-version:refname \
  | grep -E '^v[0-9]+\.[0-9]+\.[0-9]+$' | head -1 || echo "no tags yet")

echo ""
echo "[OK] Repository is up to date. git-push.sh was preserved."
echo "     Latest version tag: $LATEST_VER"

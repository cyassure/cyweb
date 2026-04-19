#!/bin/bash
# ─────────────────────────────────────────────────────────────────────────────
# CyCentra Website — Automated Push & Release Script
#
# Usage:
#   ./git-push.sh              # auto-increments patch (e.g. v1.0.1 → v1.0.2)
#   ./git-push.sh minor        # bumps minor  (e.g. v1.0.5 → v1.1.0)
#   ./git-push.sh major        # bumps major  (e.g. v1.2.3 → v2.0.0)
#
# What it does:
#   1. Fetches latest version tag from remote
#   2. Bumps the version number
#   3. Commits all local changes
#   4. Tags the commit with the new version
#   5. Pushes commit + tag to origin/main
#   6. GitHub Actions picks up the tag and publishes to GHCR automatically
# ─────────────────────────────────────────────────────────────────────────────
set -euo pipefail
cd "$(dirname "$0")"

BUMP_TYPE="${1:-patch}"
GH_REPO="cycentra/CYCENTRA.COM"

# ── Fetch tags from remote ────────────────────────────────────────────────────
echo "-> Fetching tags from remote..."
git fetch --tags --quiet

# ── Find latest version tag ───────────────────────────────────────────────────
LATEST_VER=$(git tag --sort=-version:refname \
  | grep -E '^v[0-9]+\.[0-9]+\.[0-9]+$' | head -1 || true)

if [[ -z "$LATEST_VER" ]]; then
  LATEST_VER="v1.0.0"
  echo "   No existing tags found, starting at $LATEST_VER"
else
  echo "   Latest tag: $LATEST_VER"
fi

LATEST_VER_NUM=${LATEST_VER#v}
IFS=. read -r MAJ MIN PAT <<< "$LATEST_VER_NUM"

# ── Bump version ──────────────────────────────────────────────────────────────
case "$BUMP_TYPE" in
  major) MAJ=$((MAJ+1)); MIN=0; PAT=0;;
  minor) MIN=$((MIN+1)); PAT=0;;
  patch|*) PAT=$((PAT+1));;
esac

NEW_VER="v${MAJ}.${MIN}.${PAT}"

# Skip if tag already exists
while git tag | grep -qx "$NEW_VER"; do
  PAT=$((PAT+1))
  NEW_VER="v${MAJ}.${MIN}.${PAT}"
done

TIMESTAMP=$(date -u +'%Y-%m-%dT%H:%M:%SZ')
echo "   New version: $NEW_VER"

# ── Commit all changes ────────────────────────────────────────────────────────
echo "-> Staging and committing..."
git add -A

if git diff --cached --quiet; then
  echo "   Nothing to commit — tagging existing HEAD with $NEW_VER"
else
  git commit -m "Release $NEW_VER at $TIMESTAMP"
fi

# ── Tag and push ──────────────────────────────────────────────────────────────
echo "-> Tagging $NEW_VER and pushing..."
git tag "$NEW_VER"
git push origin main
git push origin "$NEW_VER"

echo ""
echo "[OK] Pushed and tagged $NEW_VER"
echo "     GitHub Actions will now build and publish:"
echo "     ghcr.io/cycentra/cycentra.com:${NEW_VER}"
echo "     ghcr.io/cycentra/cycentra.com:latest"

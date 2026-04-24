#!/bin/bash
# ─────────────────────────────────────────────────────────────────────────────
# CyCentra Website — Automated Push & Release Script
#
# Usage:
#   ./git-push.sh              # default: patch bump
#   ./git-push.sh minor        # bumps minor (e.g. v1.0.5 → v1.1.0)
#   ./git-push.sh major        # bumps major (e.g. v1.2.3 → v2.0.0)
#
# This script:
#   1. Gets the latest release tag from GitHub (source of truth)
#   2. Bumps the version (patch/minor/major), skipping any taken tags
#   3. Updates RELEASE_NOTES.md with customer-facing release notes (prepended)
#   4. Commits, tags, and pushes
#   GitHub Actions (docker-publish.yml) picks up the tag and builds the Docker image.
# ─────────────────────────────────────────────────────────────────────────────
set -euo pipefail
cd "$(dirname "$0")"

# ── Config ────────────────────────────────────────────────────────────────────
RELEASE_NOTES="RELEASE_NOTES.md"
GH_REPO="cycentra/CYCENTRA.COM"
BUMP_TYPE="${1:-patch}"

# ── Get latest release tag from GitHub ───────────────────────────────────────
echo "-> Fetching latest release tag from GitHub..."
LATEST_VER=""

if command -v gh &>/dev/null && gh auth status &>/dev/null 2>&1; then
  LATEST_VER=$(gh release list --repo "$GH_REPO" --limit 1 --json tagName \
    --jq '.[0].tagName' 2>/dev/null || true)
fi

if [[ -z "$LATEST_VER" ]]; then
  LATEST_VER=$(curl -sf \
    "https://api.github.com/repos/${GH_REPO}/releases/latest" \
    | grep '"tag_name"' | head -1 | sed 's/.*"tag_name": *"\(.*\)".*/\1/' || true)
fi

if [[ -z "$LATEST_VER" ]]; then
  git fetch --tags > /dev/null 2>&1
  LATEST_VER=$(git tag --sort=-version:refname \
    | grep -E '^v[0-9]+\.[0-9]+\.[0-9]+$' | head -1 || true)
fi

if [[ -z "$LATEST_VER" ]]; then
  LATEST_VER="v1.0.0"
  echo "   No existing tags found, starting at $LATEST_VER"
else
  LATEST_VER=$(echo "$LATEST_VER" | tr -d '[:space:]')
  echo "   Latest GitHub release: $LATEST_VER"
fi

LATEST_VER_NUM=${LATEST_VER#v}
IFS=. read -r MAJ MIN PAT <<< "$LATEST_VER_NUM"

# ── Bump version ──────────────────────────────────────────────────────────────
BUMP_VERSION() {
  local maj="$1" min="$2" pat="$3" type="$4"
  case "$type" in
    major) maj=$((maj+1)); min=0; pat=0;;
    minor) min=$((min+1)); pat=0;;
    patch|*) pat=$((pat+1));;
  esac
  echo "$maj.$min.$pat"
}

# ── Find next available tag (skip any already on GitHub/local) ────────────────
git fetch --tags > /dev/null 2>&1
ALL_TAGS=$(git tag)
NEXT_VER_NUM=$(BUMP_VERSION "$MAJ" "$MIN" "$PAT" "$BUMP_TYPE")
NEXT_VER="v$NEXT_VER_NUM"
while echo "$ALL_TAGS" | grep -qx "$NEXT_VER"; do
  IFS=. read -r MAJ MIN PAT <<< "$NEXT_VER_NUM"
  NEXT_VER_NUM=$(BUMP_VERSION "$MAJ" "$MIN" "$PAT" patch)
  NEXT_VER="v$NEXT_VER_NUM"
done
NEW_VER="$NEXT_VER"
NEW_VER_NUM="$NEXT_VER_NUM"
DATE_SIMPLE=$(date -u +'%Y-%m-%d')
echo "   Next release: $NEW_VER"

# ── Collect commits since last tag ────────────────────────────────────────────
echo "-> Collecting changes since $LATEST_VER..."
COMMIT_LOG=$(git log "${LATEST_VER}..HEAD" --pretty=format:"%s" 2>/dev/null \
  | grep -vE '^(Release v[0-9]|WIP:|Merge (branch|pull request))' \
  || true)

# ── Categorize commits into customer-facing groups ───────────────────────────
FEATURES=""
FIXES=""
IMPROVEMENTS=""

while IFS= read -r line; do
  [[ -z "$line" ]] && continue
  lower=$(echo "$line" | tr '[:upper:]' '[:lower:]')
  echo "$lower" | grep -qE '^(chore|docs?|test|ci|build|sync|style|refactor):' && continue
  clean=$(echo "$line" \
    | sed -E 's/^(feat|fix|enhance|improve|update|add|remove|bump)[:(] *//' \
    | sed -E 's/\)$//' \
    | xargs)
  [[ -z "$clean" ]] && continue

  if echo "$lower" | grep -qE '(feat|feature|add |new |introduc)'; then
    FEATURES="${FEATURES}  - ${clean}\n"
  elif echo "$lower" | grep -qE '(fix|bug|patch|hotfix|resolv|correct|repair)'; then
    FIXES="${FIXES}  - ${clean}\n"
  else
    IMPROVEMENTS="${IMPROVEMENTS}  - ${clean}\n"
  fi
done <<< "$COMMIT_LOG"

# ── Build customer-facing release notes block ─────────────────────────────────
echo "-> Updating $RELEASE_NOTES..."
TMPFILE=$(mktemp)

{
  echo "## $NEW_VER -- $DATE_SIMPLE"
  echo ""

  if [[ -n "$FEATURES" ]]; then
    echo "### New Features"
    echo ""
    printf '%b' "$FEATURES"
    echo ""
  fi

  if [[ -n "$FIXES" ]]; then
    echo "### Bug Fixes"
    echo ""
    printf '%b' "$FIXES"
    echo ""
  fi

  if [[ -n "$IMPROVEMENTS" ]]; then
    echo "### Improvements"
    echo ""
    printf '%b' "$IMPROVEMENTS"
    echo ""
  fi

  if [[ -z "$FEATURES" ]] && [[ -z "$FIXES" ]] && [[ -z "$IMPROVEMENTS" ]]; then
    echo "### Improvements"
    echo ""
    echo "  - Stability and performance improvements."
    echo ""
  fi

  echo "---"
  echo ""
  if [[ -f "$RELEASE_NOTES" ]]; then
    cat "$RELEASE_NOTES"
  fi
} > "$TMPFILE"

mv "$TMPFILE" "$RELEASE_NOTES"
echo "   Release notes updated."

# ── Git add, commit, tag, push ────────────────────────────────────────────────
echo "-> Staging and committing..."
git add -A

if git diff --cached --quiet; then
  echo "   Nothing to commit — tagging existing HEAD with $NEW_VER"
else
  git commit -m "Release $NEW_VER at $(date -u +'%Y-%m-%dT%H:%M:%SZ')"
fi

echo "-> Tagging $NEW_VER and pushing..."
git tag "$NEW_VER"
git push origin main
git push origin "$NEW_VER"

echo ""
echo "[OK] Release $NEW_VER pushed."
echo "     GitHub Actions will build and publish:"
echo "     ghcr.io/cycentra/cycentra.com:${NEW_VER_NUM}"
echo "     ghcr.io/cycentra/cycentra.com:latest"

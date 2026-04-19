#!/bin/bash
# ─────────────────────────────────────────────────────────────────────────────
# CyCentra Website — Server Deployment Script
#
# Usage:
#   ./deploy.sh             # pulls latest and restarts
#   ./deploy.sh 1.0.3       # pulls and runs a specific version
#
# Run this on the production server to update the website.
# ─────────────────────────────────────────────────────────────────────────────
set -euo pipefail

IMAGE="ghcr.io/cycentra/cycentra.com"
CONTAINER="cycentra-site"
PORT="8081"
PAT="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"
GH_USER="cycentra"
TAG="${1:-latest}"

echo "-> Logging in to GHCR..."
echo "$PAT" | docker login ghcr.io -u "$GH_USER" --password-stdin

echo "-> Pulling ${IMAGE}:${TAG}..."
docker pull "${IMAGE}:${TAG}"

echo "-> Stopping existing container (if running)..."
docker stop "$CONTAINER" 2>/dev/null || true
docker rm   "$CONTAINER" 2>/dev/null || true

echo "-> Starting new container..."
docker run -d \
  --name "$CONTAINER" \
  --restart always \
  -p "${PORT}:80" \
  "${IMAGE}:${TAG}"

echo ""
echo "[OK] cycentra.com is live on port ${PORT} running ${IMAGE}:${TAG}"
docker ps --filter "name=${CONTAINER}" --format "table {{.Names}}\t{{.Status}}\t{{.Ports}}"

#!/usr/bin/env bash
# ═══════════════════════════════════════════════════════════════════════════════
# CyCentra — Marketing Website  Setup & Update Wizard  v1.0.0 — 2026-04-24
#
# FRESH INSTALL:
#   bash cycentra-setup.sh
#
# UPDATE EXISTING SERVER (pull latest image, restart):
#   bash cycentra-setup.sh --update
#
# UPGRADE TO SPECIFIC VERSION:
#   bash cycentra-setup.sh --upgrade v1.1.0
#
# WITH REGISTRY TOKEN (required for private GHCR):
#   GHCR_PAT=ghp_... bash cycentra-setup.sh
#
# What this script does:
#   fresh install  → installs Docker, creates /opt/cycentra-web, pulls image,
#                    starts container on port 8081, health check
#   --update       → pulls latest image, zero-downtime restart
#   --upgrade vX   → pulls specific version tag, restarts
# ═══════════════════════════════════════════════════════════════════════════════

set -euo pipefail

# ── Colours & helpers ─────────────────────────────────────────────────────────
RED='\033[0;31m'; GREEN='\033[0;32m'; YELLOW='\033[1;33m'
CYAN='\033[0;36m'; WHITE='\033[1;37m'; DIM='\033[2m'; NC='\033[0m'; BOLD='\033[1m'

info()    { echo -e "${CYAN}  ▸ ${NC}$*"; }
success() { echo -e "${GREEN}  ✓ ${NC}$*"; }
warn()    { echo -e "${YELLOW}  ⚠ ${NC}$*"; }
error()   { echo -e "${RED}  ✗ ${NC}$*"; }
divider() { echo -e "${DIM}  ────────────────────────────────────────────────${NC}"; }

# ── Parse flags ───────────────────────────────────────────────────────────────
MODE="full"
UPGRADE_VERSION=""
while [[ $# -gt 0 ]]; do
    case "$1" in
        --update)  MODE="update";  shift ;;
        --upgrade) MODE="upgrade"; shift; UPGRADE_VERSION="${1:-latest}"; shift ;;
        *) shift ;;
    esac
done

# ── Constants ─────────────────────────────────────────────────────────────────
_SCRIPT_VERSION="v1.0.0"
DEPLOY_DIR="/opt/cycentra-web"
GH_ORG="cycentra"
IMAGE_BASE="ghcr.io/${GH_ORG}/cycentra.com"
COMPOSE_FILE="${DEPLOY_DIR}/docker-compose.yml"
CONTAINER_NAME="cycentra-web"
HTTP_PORT="${HTTP_PORT:-8081}"
_SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]:-$0}")" && pwd)"

step=0
_LAST_STEP="(initializing)"
ERRORS=()

step_header() {
    step=$((step+1))
    _LAST_STEP="$1"
    echo -e "\n${BOLD}${CYAN}  ── STEP ${step}: $1${NC}"
    divider
}

# ── Error trap ────────────────────────────────────────────────────────────────
trap '
    ec=$?
    echo ""
    echo -e "\n${RED}${BOLD}  ✗ FATAL: Setup aborted during STEP ${step} \"${_LAST_STEP}\"${NC}"
    echo -e "  ${RED}  Failed command : ${BASH_COMMAND}${NC}"
    echo -e "  ${RED}  Exit code      : ${ec}  |  Line: ${BASH_LINENO[0]}${NC}"
    echo -e "  ${DIM}  Fix the issue above, then re-run: bash cycentra-setup.sh${NC}"
    echo ""
' ERR

# Note: root not required for Docker if current user is in the docker group.
# The script still works as root (e.g. via sudo).

# ── Banner ────────────────────────────────────────────────────────────────────
[[ -t 1 ]] && clear; echo ""
echo -e "${CYAN}${BOLD}"
echo "  ██████╗██╗   ██╗ ██████╗███████╗███╗   ██╗████████╗██████╗  █████╗ "
echo "  ██╔════╝╚██╗ ██╔╝██╔════╝██╔════╝████╗  ██║╚══██╔══╝██╔══██╗██╔══██╗"
echo "  ██║      ╚████╔╝ ██║     █████╗  ██╔██╗ ██║   ██║   ██████╔╝███████║"
echo "  ██║       ╚██╔╝  ██║     ██╔══╝  ██║╚██╗██║   ██║   ██╔══██╗██╔══██║"
echo "  ╚██████╗   ██║   ╚██████╗███████╗██║ ╚████║   ██║   ██║  ██║██║  ██║"
echo "   ╚═════╝   ╚═╝    ╚═════╝╚══════╝╚═╝  ╚═══╝   ╚═╝   ╚═╝  ╚═╝╚═╝  ╚═╝"
echo -e "${NC}"
echo -e "  ${BOLD}Marketing Website${NC}"
echo -e "  ${DIM}Setup & Update Wizard — ${_SCRIPT_VERSION} — $(date -u +"%Y-%m-%d %H:%M UTC")${NC}"
echo ""; divider

case "$MODE" in
    update)  echo -e "  ${YELLOW}MODE: UPDATE${NC} — pulling latest image, zero-downtime restart" ;;
    upgrade) echo -e "  ${YELLOW}MODE: UPGRADE${NC} — target version: ${BOLD}${UPGRADE_VERSION}${NC}" ;;
    *)       echo -e "  ${DIM}MODE: FULL INSTALL${NC} — Docker + website container" ;;
esac
divider; echo ""

# ═══════════════════════════════════════════════════════════════════════════════
# SELF-UPDATE — download latest cycentra.com-setup.sh from GitHub Releases
# Runs only in --update / --upgrade mode; re-execs itself if a newer version
# is available so the rest of the script runs with the latest code.
# ═══════════════════════════════════════════════════════════════════════════════
_SELF_PATH="$(realpath "${BASH_SOURCE[0]:-$0}")"
_LATEST=$(mktemp)
_GH_TOKEN="${GHCR_PAT:-${GH_TOKEN:-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}}"
_DOWNLOADED=false

if command -v gh &>/dev/null && gh auth status &>/dev/null 2>&1; then
    gh release download --repo "cycentra/CYCENTRA.COM" \
        --pattern "cycentra.com-setup.sh" \
        --output "$_LATEST" --clobber 2>/dev/null && _DOWNLOADED=true || true
elif command -v curl &>/dev/null; then
    _CURL_AUTH=()
    [[ -n "$_GH_TOKEN" ]] && _CURL_AUTH=(-H "Authorization: token $_GH_TOKEN")
    curl -sfL "${_CURL_AUTH[@]}" \
        "https://github.com/cycentra/CYCENTRA.COM/releases/latest/download/cycentra.com-setup.sh" \
        -o "$_LATEST" 2>/dev/null && _DOWNLOADED=true || true
fi

if [[ "$_DOWNLOADED" == true && -s "$_LATEST" ]]; then
    if ! cmp -s "$_LATEST" "$_SELF_PATH"; then
        cp "$_LATEST" "$_SELF_PATH"
        chmod 750 "$_SELF_PATH"
        rm -f "$_LATEST"
        success "cycentra.com-setup.sh updated to latest version — re-executing..."
        exec bash "$_SELF_PATH" "$@"
    else
        success "Setup script is already at latest version"
    fi
else
    warn "Could not fetch latest setup script from GitHub — continuing with installed version"
fi
rm -f "$_LATEST" 2>/dev/null || true

# ═══════════════════════════════════════════════════════════════════════════════
# INFRASTRUCTURE BLOCK — skipped on --update / --upgrade
# ═══════════════════════════════════════════════════════════════════════════════

if [[ "$MODE" == "full" ]]; then

# ── Step 1: System packages ───────────────────────────────────────────────────
step_header "SYSTEM DEPENDENCIES"
if command -v apt-get >/dev/null 2>&1; then
    apt-get update -y -qq 2>/dev/null || { warn "apt-get update failed — continuing"; }
    apt-get install -y -qq curl wget ca-certificates gnupg lsb-release jq 2>/dev/null
    success "System packages installed"
else
    warn "apt-get not found — assuming packages are present (non-Debian system)"
fi

# ── Step 2: Docker ────────────────────────────────────────────────────────────
step_header "DOCKER"

if command -v docker >/dev/null 2>&1; then
    success "Docker already installed — $(docker --version)"
else
    info "Installing Docker ..."
    for pkg in docker.io docker-doc docker-compose docker-compose-v2 podman-docker containerd runc; do
        apt-get remove -y "$pkg" 2>/dev/null || true
    done
    install -m 0755 -d /etc/apt/keyrings
    curl -fsSL https://download.docker.com/linux/ubuntu/gpg \
        -o /etc/apt/keyrings/docker.asc
    chmod a+r /etc/apt/keyrings/docker.asc
    echo "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.asc] \
        https://download.docker.com/linux/ubuntu \
        $(. /etc/os-release && echo "$VERSION_CODENAME") stable" \
        | tee /etc/apt/sources.list.d/docker.list > /dev/null
    apt-get update -y -qq
    apt-get install -y -qq \
        docker-ce docker-ce-cli containerd.io \
        docker-buildx-plugin docker-compose-plugin
    systemctl enable docker 2>/dev/null || true
    systemctl start  docker 2>/dev/null || true
    success "Docker installed — $(docker --version)"
fi

docker compose version >/dev/null 2>&1 \
    || { error "docker compose plugin not found"; exit 1; }
success "Docker Compose: $(docker compose version --short)"

fi  # end INFRA block

# ═══════════════════════════════════════════════════════════════════════════════
# APP BLOCK — runs in all modes
# ═══════════════════════════════════════════════════════════════════════════════

# ── Step 3: Deploy directory ──────────────────────────────────────────────────
step_header "DEPLOY DIRECTORY"

mkdir -p "${DEPLOY_DIR}"

# Copy docker-compose.yml if not already deployed
if [[ ! -f "${COMPOSE_FILE}" ]]; then
    if [[ -f "${_SCRIPT_DIR}/docker-compose.yml" ]]; then
        cp "${_SCRIPT_DIR}/docker-compose.yml" "${COMPOSE_FILE}"
        success "docker-compose.yml deployed to ${DEPLOY_DIR}"
    else
        error "docker-compose.yml not found alongside setup script at ${_SCRIPT_DIR}"
        exit 1
    fi
else
    success "docker-compose.yml already present"
fi

# Self-copy
_SELF="$(realpath "${BASH_SOURCE[0]:-$0}")"
_SCRIPT_DEST="${DEPLOY_DIR}/cycentra.com-setup.sh"
if [[ "$_SELF" != "$_SCRIPT_DEST" ]]; then
    cp "$_SELF" "$_SCRIPT_DEST"
    chmod 750  "$_SCRIPT_DEST"
    success "Setup script deployed to ${_SCRIPT_DEST}"
fi

# Deploy docker-maintenance.sh alongside setup script
_MAINT_SRC="${_SCRIPT_DIR}/docker-maintenance.sh"
_MAINT_DEST="${DEPLOY_DIR}/docker-maintenance.sh"
if [[ -f "$_MAINT_SRC" ]]; then
    cp "$_MAINT_SRC" "$_MAINT_DEST"
    chmod 750 "$_MAINT_DEST"
    success "docker-maintenance.sh deployed to ${_MAINT_DEST}"
fi

# Schedule Docker maintenance cron (every 15 days at 02:00) — idempotent
if crontab -l 2>/dev/null | grep -q "docker-maintenance.sh"; then
    success "Docker maintenance cron already scheduled — skipping"
else
    mkdir -p /var/log/cycentra
    (crontab -l 2>/dev/null; echo "0 2 */15 * * ${_MAINT_DEST} >> /var/log/cycentra/docker-maintenance.log 2>&1") | crontab -
    success "Cron scheduled: docker-maintenance.sh runs every 15 days at 02:00"
fi

# ── Step 4: GHCR authentication ───────────────────────────────────────────────
step_header "REGISTRY AUTHENTICATION"

GHCR_PAT="${GHCR_PAT:-${GH_TOKEN:-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}}"
if [[ -n "$GHCR_PAT" ]]; then
    echo "$GHCR_PAT" | docker login ghcr.io -u "${GH_USER:-cycentra}" --password-stdin \
        && success "Logged in to GHCR" \
        || warn "GHCR login failed — will attempt pull without auth"
else
    warn "GHCR_PAT not set — attempting pull without authentication"
    warn "If pull fails: export GHCR_PAT=ghp_... and re-run"
fi

# ── Step 5: Pull image ─────────────────────────────────────────────────────────
step_header "PULL IMAGE"

if [[ "$MODE" == "upgrade" && -n "$UPGRADE_VERSION" ]]; then
    info "Pulling ${IMAGE_BASE}:${UPGRADE_VERSION} ..."
    docker pull "${IMAGE_BASE}:${UPGRADE_VERSION}" \
        && success "Pulled ${IMAGE_BASE}:${UPGRADE_VERSION}" \
        || { error "Pull failed — check GHCR_PAT and version tag"; exit 1; }
    docker tag "${IMAGE_BASE}:${UPGRADE_VERSION}" "${IMAGE_BASE}:latest"
    success "Tagged ${UPGRADE_VERSION} as latest"
else
    info "Pulling latest image ..."
    docker pull "${IMAGE_BASE}:latest" \
        && success "Image updated to latest" \
        || { error "Image pull failed — check GHCR_PAT"; ERRORS+=("image pull failed"); }
fi

# ── Step 6: Runtime env (.env) ────────────────────────────────────────────────
step_header "RUNTIME ENV"

_ENV_FILE="${DEPLOY_DIR}/.env"

if [[ -f "$_ENV_FILE" ]]; then
    success ".env already exists at ${_ENV_FILE} — keeping existing values"
else
    # Write .env — only FRONTEND_URL is required at runtime.
    cat > "$_ENV_FILE" <<EOF
# CyCentra website — runtime environment
# Generated by cycentra.com-setup.sh on $(date -u +"%Y-%m-%d %H:%M UTC")

# ── CORS origin ───────────────────────────────────────────────────────────────
# Set to the exact URL of your cycentra360 portal (e.g. https://cy360.example.com)
FRONTEND_URL=${FRONTEND_URL:-https://cy360.cycentra.com}
EOF
    chmod 600 "$_ENV_FILE"
    success ".env created at ${_ENV_FILE}"
    echo ""
    echo -e "  ${DIM}Edit ${_ENV_FILE} to set FRONTEND_URL to your cycentra360 portal URL.${NC}"
    echo ""
fi

# ── Step 7: Start / zero-downtime restart ─────────────────────────────────────
step_header "START WEBSITE"

cd "${DEPLOY_DIR}"

if [[ "$MODE" == "full" ]]; then
    info "Starting CyCentra website ..."
    # Stop any pre-existing container to avoid name conflict on re-runs
    docker compose down --remove-orphans 2>/dev/null || true
    docker compose up -d
    success "Website container started on port ${HTTP_PORT}"
else
    info "Zero-downtime restart ..."
    # --force-recreate replaces the running container without a name conflict
    docker compose up -d --force-recreate
    success "Website container restarted"
fi

# ── Step 8: Health check ───────────────────────────────────────────────────────
step_header "HEALTH CHECK"

info "Waiting for website on :${HTTP_PORT} ..."
_healthy=false
for i in $(seq 1 15); do
    if curl -sf "http://localhost:${HTTP_PORT}/" >/dev/null 2>&1; then
        _healthy=true
        break
    fi
    echo -n "."
    sleep 2
done
echo ""

if [[ "$_healthy" == true ]]; then
    success "CyCentra website is live — http://localhost:${HTTP_PORT}"
else
    warn "Health check timed out"
    warn "Check: docker compose -f ${COMPOSE_FILE} logs"
    ERRORS+=("health check timed out")
fi

_INSTALLED_VER=$(docker inspect --format '{{index .Config.Labels "org.opencontainers.image.version"}}' "${CONTAINER_NAME}" 2>/dev/null || echo "unknown")
echo "${_INSTALLED_VER}" > "${DEPLOY_DIR}/version"

# ── Final summary ─────────────────────────────────────────────────────────────
echo ""; divider
echo -e "  ${BOLD}${GREEN}  CyCentra website setup complete${NC}"
echo ""
echo -e "  URL        : ${CYAN}http://$(curl -sf ifconfig.me 2>/dev/null || hostname -I | awk '{print $1}'):${HTTP_PORT}${NC}"
  echo -e "  Compose    : ${COMPOSE_FILE}"
  echo -e "  Env file   : ${DEPLOY_DIR}/.env  (token stored here)"
  echo -e "  Logs       : docker compose -f ${COMPOSE_FILE} logs -f"
echo -e "  Version    : ${_INSTALLED_VER}"
echo ""

if [[ ${#ERRORS[@]} -gt 0 ]]; then
    echo ""
    warn "${#ERRORS[@]} item(s) need attention:"
    for e in "${ERRORS[@]}"; do echo -e "  ${YELLOW}⚠${NC} $e"; done
fi

echo ""; divider
echo -e "  ${DIM}Re-run anytime : bash ${_SCRIPT_DEST}${NC}"
echo -e "  ${DIM}Update         : bash ${_SCRIPT_DEST} --update${NC}"
echo -e "  ${DIM}Upgrade vX.Y.Z : bash ${_SCRIPT_DEST} --upgrade v1.1.0${NC}"
echo ""

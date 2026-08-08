# CyAssure Website — cyassure.eu

Marketing and product website for the CyAssure security platform.
Built with React + Vite + Tailwind CSS. Served via nginx in Docker.

---

## Development

```bash
# Install dependencies
npm install

# Start local dev server (http://localhost:8080)
npm run dev

# Build for production
npm run build
```

---

## Git Workflow

Two helper scripts handle all Git operations — no token management needed.

### Pull latest from GitHub / update server deployment
```bash
./cyassure-setup.sh --update
```

### Push changes and create a new version tag
```bash
./git-push.sh           # bumps patch:  v1.0.1 → v1.0.2
./git-push.sh minor     # bumps minor:  v1.0.5 → v1.1.0
./git-push.sh major     # bumps major:  v1.2.3 → v2.0.0
```

Each push automatically:
1. Commits all local changes
2. Creates a new version tag (e.g. `v1.0.3`)
3. Pushes commit + tag to `origin/main`
4. GitHub Actions builds and publishes a Docker image to GHCR with that tag

---

## Docker / GHCR Deployment

The Docker image is published to GitHub Container Registry on every tagged release.

**Image:** `ghcr.io/cyassure/cyweb`

### Pull the latest image

```bash
docker pull ghcr.io/cyassure/cyweb:latest
```

### Pull a specific version

```bash
docker pull ghcr.io/cyassure/cyweb:1.0.3
```

### Run on a server (port 80)

```bash
docker run -d \
  --name cyassure-web \
  --restart unless-stopped \
  -p 80:80 \
  ghcr.io/cyassure/cyweb:latest
```

### Run behind a reverse proxy (recommended for HTTPS)

```bash
docker run -d \
  --name cyassure-web \
  --restart unless-stopped \
  -p 127.0.0.1:8081:80 \
  ghcr.io/cyassure/cyweb:latest
```

Then configure nginx:

```nginx
# /etc/nginx/sites-available/cyassure.eu
server {
    listen 443 ssl;
    server_name cyassure.eu www.cyassure.eu;

    ssl_certificate     /etc/letsencrypt/live/cyassure.eu/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/cyassure.eu/privkey.pem;

    location / {
        proxy_pass http://127.0.0.1:8081;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}
```

### Docker Compose (production — includes Marketplace API)

The production stack runs **two services** sharing a named volume so the live catalog is updated by marketplace-api instantly, with no restart needed.

**Routing changed 2026-08-08 (content-tiering feature).** `catalog.json` used to be served directly off the shared volume by nginx for speed, with its own token check duplicated in `nginx.conf.template`. That stopped being viable once Enterprise-tier catalog items need **per-request redaction** based on a second header (`X-CyAssure-Entitlement-Token`) — a static file can't do conditional logic. `/marketplace/` now always proxies to `marketplace-api`, which owns the catalog-token check, the new entitlement-token verification, and the redaction logic as one source of truth. The volume mount on `cyassure-web` below is no longer load-bearing for the catalog path itself (nginx doesn't read `catalog.json` off it anymore) — if you're running an older image that still expects it, keep the mount; it's harmless either way.

`docker-compose.yml` on the server (`/root/cyweb/docker-compose.yml`):

```yaml
volumes:
  marketplace-data:

services:
  cyassure-web:
    image: ghcr.io/cyassure/cyweb:latest
    container_name: cyassure-web
    restart: unless-stopped
    ports:
      - "127.0.0.1:8081:80"
    volumes:
      - marketplace-data:/usr/share/nginx/html/marketplace
    environment:
      - FRONTEND_URL=${FRONTEND_URL:-https://cy360.cyassure.eu}
    depends_on:
      - marketplace-api

  marketplace-api:
    build: ./marketplace-api
    container_name: marketplace-api
    restart: unless-stopped
    volumes:
      - marketplace-data:/data
    environment:
      - MARKETPLACE_ADMIN_TOKEN=${MARKETPLACE_ADMIN_TOKEN:-}
      - MARKETPLACE_CATALOG_TOKEN=${MARKETPLACE_CATALOG_TOKEN:-}
      - MARKETPLACE_ENTERPRISE_PUBLIC_KEY=${MARKETPLACE_ENTERPRISE_PUBLIC_KEY:-}
    expose:
      - "5050"
```

`.env` on the server (`/root/cyweb/.env`):

```
FRONTEND_URL=https://cyassure.eu
MARKETPLACE_ADMIN_TOKEN=<shared secret known only to CyAdmin>
MARKETPLACE_CATALOG_TOKEN=<pre-shared token for all Cy360 instances>
MARKETPLACE_ENTERPRISE_PUBLIC_KEY=<PEM public key — the counterpart of the private
  key THIS deployment's CyAdmin actually signs licenses with, same value as that
  CyAdmin's Cy360 fleet has embedded as CYASSURE_PUBLIC_KEY in license_validator.py.
  Do not copy this value from a different environment's checkout — a dev keypair
  and a production keypair are not interchangeable. Leave unset and every
  Enterprise-tier catalog item is redacted for every request (fails closed).>
```

```bash
# First-time start (builds marketplace-api image)
cd /root/cyweb
docker compose up --build -d

# After initial start: publish from CyAdmin to seed the live catalog
# (open http://localhost:7070/marketplace and click "Publish to cyassure.eu")
```

### Updating to a new cyassure.eu image

After `./git-push.sh` triggers a GitHub Actions build (~60 s), update the server:

```bash
ssh -p 2026 root@204.168.193.23
cd /root/cyweb
docker compose pull          # downloads new ghcr.io/cyassure/cyweb:latest
docker compose up -d         # recreates only cyassure-web; marketplace-api stays running
```

The `marketplace-data` volume is **not wiped** on image update — the live catalog persists.

After updating: click "Publish to cyassure.eu" in CyAdmin to ensure the live catalog is in sync with the working catalog.

### Validate after any update

```bash
# Health (item count, pending submissions):
curl https://cyassure.eu/marketplace/api/health

# Full catalog (requires MARKETPLACE_CATALOG_TOKEN header):
curl -H "X-CyAssure-Token: <MARKETPLACE_CATALOG_TOKEN>" \
  https://cyassure.eu/marketplace/catalog.json
# ^ Enterprise-tier items in this response will show "locked": true and be
# missing config_type/steps/cysoar_flow unless you also send a valid
# X-CyAssure-Entitlement-Token header (only real Enterprise-licensed Cy360
# instances have one — there's no way to generate one from curl for testing
# without an actual .lic file's embedded entitlement_token).

# What image is running:
ssh -p 2026 root@204.168.193.23 \
  'docker inspect cyassure-web --format "Image: {{.Config.Image}}  Created: {{.Created}}"'

# marketplace-api publish log:
ssh -p 2026 root@204.168.193.23 'docker logs marketplace-api --tail=20'
```

---

## GHCR Authentication (if package is private)

```bash
echo YOUR_GITHUB_PAT | docker login ghcr.io -u YOUR_GITHUB_USERNAME --password-stdin
```

To make the package public:
**GitHub → repo → Packages → cyweb → Package settings → Change visibility → Public**

---

## Version Tags

| Tag | Description |
|-----|-------------|
| `latest` | Most recent tagged release |
| `1.0.3` | Exact version |
| `1.0` | Latest patch of that minor version |
| `sha-abc1234` | Specific commit SHA build |

---

## GitHub Actions

Workflow: `.github/workflows/docker-publish.yml`

Triggers on:
- Push to `main` → publishes `sha-*` tag
- Version tag push `v*.*.*` → publishes versioned tags + `latest`

View published packages: **github.com/orgs/cyassure/packages**

---

## Tech Stack

- **React + TypeScript** — UI framework
- **Vite** — build tool (port 8080 in dev)
- **Tailwind CSS + shadcn/ui** — styling
- **Framer Motion** — animations
- **nginx:alpine** — production web server (Docker)

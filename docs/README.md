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

### Docker Compose (production)

CyWeb is a pure static site — one service, no backend, no env-driven config.

> **Where did the marketplace catalog go?** Through 2026-08-08, this repo ran a
> companion `marketplace-api` Flask service (content-tier redaction, contribution
> submissions) alongside nginx. That service was retired 2026-08-09 and its
> responsibility absorbed into **CyAdmin**, which already owned the catalog
> authoring/review side and the RSA signing key entitlement tokens are verified
> against. The live catalog now lives at CyAdmin's own deployment — see the
> `CyAdmin` repo's `CLAUDE.md` for the current URL and routes
> (`GET /marketplace/catalog.json`, `POST /marketplace/api/submissions`). If
> you're looking for `marketplace-api/`, `docker-compose.local.yml`, or
> `public/marketplace/catalog.json` in this repo — they no longer exist,
> intentionally, so there's nothing here to confuse with the real thing.

`docker-compose.yml` on the server (`/root/cyweb/docker-compose.yml`):

```yaml
services:
  cyassure-web:
    image: ghcr.io/cyassure/cyweb:latest
    container_name: cyassure-web
    restart: unless-stopped
    ports:
      - "127.0.0.1:8081:80"
```

```bash
cd /root/cyweb
docker compose up -d
```

### Updating to a new cyassure.eu image

After `./git-push.sh` triggers a GitHub Actions build (~60 s), update the server:

```bash
ssh -p 2026 root@<cyweb-host>
cd /root/cyweb
docker compose pull
docker compose up -d
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

# CyCentra Website — cycentra.com

Marketing and product website for the CyCentra security platform.
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
./cycentra.com-setup.sh --update
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

**Image:** `ghcr.io/cyassure/cycentra.com`

### Pull the latest image

```bash
docker pull ghcr.io/cyassure/cycentra.com:latest
```

### Pull a specific version

```bash
docker pull ghcr.io/cyassure/cycentra.com:1.0.3
```

### Run on a server (port 80)

```bash
docker run -d \
  --name cycentra-web \
  --restart unless-stopped \
  -p 80:80 \
  ghcr.io/cyassure/cycentra.com:latest
```

### Run behind a reverse proxy (recommended for HTTPS)

```bash
docker run -d \
  --name cycentra-web \
  --restart unless-stopped \
  -p 127.0.0.1:8081:80 \
  ghcr.io/cyassure/cycentra.com:latest
```

Then configure nginx:

```nginx
# /etc/nginx/sites-available/cycentra.com
server {
    listen 443 ssl;
    server_name cycentra.com www.cycentra.com;

    ssl_certificate     /etc/letsencrypt/live/cycentra.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/cycentra.com/privkey.pem;

    location / {
        proxy_pass http://127.0.0.1:8081;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}
```

### Docker Compose (production — includes Marketplace API)

The production stack runs **two services** sharing a named volume so the live catalog is updated by marketplace-api and served instantly by nginx without any restart.

`docker-compose.yml` on the server (`/root/cycentra.com/docker-compose.yml`):

```yaml
volumes:
  marketplace-data:

services:
  cycentra-web:
    image: ghcr.io/cyassure/cycentra.com:latest
    container_name: cycentra-web
    restart: unless-stopped
    ports:
      - "127.0.0.1:8081:80"
    volumes:
      - marketplace-data:/usr/share/nginx/html/marketplace
    environment:
      - FRONTEND_URL=${FRONTEND_URL:-https://cy360.cycentra.com}
      - MARKETPLACE_CATALOG_TOKEN=${MARKETPLACE_CATALOG_TOKEN:-}
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
    expose:
      - "5050"
```

`.env` on the server (`/root/cycentra.com/.env`):

```
FRONTEND_URL=https://cycentra.com
MARKETPLACE_ADMIN_TOKEN=<shared secret known only to CyAdmin>
MARKETPLACE_CATALOG_TOKEN=<pre-shared token for all Cy360 instances>
```

```bash
# First-time start (builds marketplace-api image)
cd /root/cycentra.com
docker compose up --build -d

# After initial start: publish from CyAdmin to seed the live catalog
# (open http://localhost:7070/marketplace and click "Publish to cycentra.com")
```

### Updating to a new cycentra.com image

After `./git-push.sh` triggers a GitHub Actions build (~60 s), update the server:

```bash
ssh -p 2026 root@204.168.193.23
cd /root/cycentra.com
docker compose pull          # downloads new ghcr.io/cyassure/cycentra.com:latest
docker compose up -d         # recreates only cycentra-web; marketplace-api stays running
```

The `marketplace-data` volume is **not wiped** on image update — the live catalog persists.

After updating: click "Publish to cycentra.com" in CyAdmin to ensure the live catalog is in sync with the working catalog.

### Validate after any update

```bash
# Health (item count, pending submissions):
curl https://cycentra.com/marketplace/api/health

# Full catalog (requires MARKETPLACE_CATALOG_TOKEN header):
curl -H "X-CyCentra-Token: <MARKETPLACE_CATALOG_TOKEN>" \
  https://cycentra.com/marketplace/catalog.json

# What image is running:
ssh -p 2026 root@204.168.193.23 \
  'docker inspect cycentra-web --format "Image: {{.Config.Image}}  Created: {{.Created}}"'

# marketplace-api publish log:
ssh -p 2026 root@204.168.193.23 'docker logs marketplace-api --tail=20'
```

---

## GHCR Authentication (if package is private)

```bash
echo YOUR_GITHUB_PAT | docker login ghcr.io -u YOUR_GITHUB_USERNAME --password-stdin
```

To make the package public:
**GitHub → repo → Packages → cycentra.com → Package settings → Change visibility → Public**

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

View published packages: **github.com/orgs/cycentra/packages**

---

## Tech Stack

- **React + TypeScript** — UI framework
- **Vite** — build tool (port 8080 in dev)
- **Tailwind CSS + shadcn/ui** — styling
- **Framer Motion** — animations
- **nginx:alpine** — production web server (Docker)

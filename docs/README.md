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

### Pull latest from GitHub
```bash
./git-pull.sh
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

**Image:** `ghcr.io/cycentra/cycentra.com`

### Pull the latest image

```bash
docker pull ghcr.io/cycentra/cycentra.com:latest
```

### Pull a specific version

```bash
docker pull ghcr.io/cycentra/cycentra.com:1.0.3
```

### Run on a server (port 80)

```bash
docker run -d \
  --name cycentra-web \
  --restart unless-stopped \
  -p 80:80 \
  ghcr.io/cycentra/cycentra.com:latest
```

### Run behind a reverse proxy (recommended for HTTPS)

```bash
docker run -d \
  --name cycentra-web \
  --restart unless-stopped \
  -p 127.0.0.1:8081:80 \
  ghcr.io/cycentra/cycentra.com:latest
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

### Docker Compose (recommended for production)

Create a `docker-compose.yml` on your server:

```yaml
version: "3.9"
services:
  cycentra-web:
    image: ghcr.io/cycentra/cycentra.com:latest
    container_name: cycentra-web
    restart: unless-stopped
    ports:
      - "127.0.0.1:8081:80"
```

```bash
# Start
docker compose up -d

# Update to latest version
docker compose pull && docker compose up -d
```

### One-liner update on the server

```bash
docker pull ghcr.io/cycentra/cycentra.com:latest && \
docker stop cycentra-web && docker rm cycentra-web && \
docker run -d --name cycentra-web --restart unless-stopped \
  -p 80:80 ghcr.io/cycentra/cycentra.com:latest
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

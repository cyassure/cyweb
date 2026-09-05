# Installation & Deployment Guide

This guide covers running Cy360 with Docker: `docker-compose.yml` and `.env`. No source code or build context is involved — the containers run pre-built images only.

---

## 1. Before you start

- **Docker Engine 24+ with the Compose plugin.** Check with `docker compose version` (the modern plugin, invoked as `docker compose`, not the old standalone `docker-compose`).
- **Minimum recommended sizing:** 6 vCPU / 12 GB RAM / 60 GB disk for a small evaluation deployment. Scale up for higher alert/log volume — raw-log capture (CyDataLake) is on by default and disk usage grows with real event volume, not just idle baseline. Turn it off in **Settings → CyDataLake** (or `CYDATALAKE_ENABLED=false` in `.env`) if you'd rather stay at the smaller footprint.
- **Network:** only one port needs to be reachable from your network — `APP_PORT` (default `8080`). Everything else runs on an internal Docker network and is never exposed to the host.
- **Internet access to `ghcr.io`** to pull images from the registry.
- **`sudo` (root) access** if you use the installer script for host prep (Docker install, firewall, TLS). Evaluating locally (e.g. macOS/Docker Desktop)? Use **Manual install** below instead — it's root-free except for one-time directory creation.

## 2. What's in the deployment bundle

| Item | Purpose |
|---|---|
| `docker-compose.yml` | The stack definition — SIEM, correlation engine, backend, frontend, database, cache, plus CyDataLake's log-capture services |
| `.env.example` | Copy to `.env` and fill in before first run |

**CyDataLake (raw multi-vendor log capture)** is part of the default stack — every EDR, ASM, and SIEM-connector event is captured, including anything filtered out before it became a correlated alert. Query it under **CyDataLake** in the sidebar (admin/analyst roles only). Turn it off anytime from **Settings → CyDataLake** — captured history is preserved and comes back if you re-enable later.

**Local LLM (Ollama) for CyMind's AI Assistant** is optional and unset by default — CyMind can dispatch to a self-hosted Ollama instance instead of an external provider. Stand up Ollama yourself on its own hardware (LLM inference is GPU/RAM-hungry and deliberately never packed onto this stack's host), then point `OLLAMA_URL` at it in `.env`.

**GeoIP enrichment (optional, off by default)** — SIEM alerts can show source/destination IP geolocation via MaxMind's GeoLite2 database. We don't ship a shared MaxMind key with the installer (deliberately — it's not something to embed in a public script), so this is a one-time, self-service step:

1. Sign up for a free key at [maxmind.com/en/geolite2/signup](https://www.maxmind.com/en/geolite2/signup).
2. On your server, set it in the app-state env file: `sed -i 's/^MAXMIND_KEY=.*/MAXMIND_KEY=<your key>/' /opt/cyassure/.env` (or add the line if it's not there yet).
3. The installer refreshes the GeoLite2 database monthly via cron once a key is present. To pull it immediately rather than waiting: re-run `sudo bash cyassure-setup.sh --update`.

Without a key, GeoIP enrichment is simply skipped — you'll see a one-line `MAXMIND_KEY not set` warning during install. That's expected, not an error; the rest of the platform is unaffected.

## 3. First-time setup

### Quick install (recommended, Ubuntu/Debian server)

The installer script downloads itself, brings the app up, and continues into host prep (firewall, TLS) — see [Download Cy360](/download) for the exact command with your access details filled in. It resolves the latest release (or pass `--version vX.Y.Z` to pin one), generates `.env` with strong random secrets, logs in to the registry, and runs `docker compose pull && docker compose up -d`.

**Read the script before you run it** — that's exactly why it's published in a plain, public GitHub repo rather than only distributed as an opaque binary.

### Manual install

```bash
cp .env.example .env
# edit .env — at minimum set POSTGRES_PASSWORD, SECRET_KEY, and CYDATALAKE_DB_PASSWORD
# to strong random values
```

Create the host data directories (fixed absolute paths, not folders inside the bundle):

```bash
sudo mkdir -p /opt/cyassure /var/lib/cyassure-agent-packages /var/log/cyassure
sudo chown -R 999:999 /opt/cyassure /var/lib/cyassure-agent-packages /var/log/cyassure
```

Then log in and pull:

```bash
docker login ghcr.io -u <your-username>
docker compose pull
docker compose up -d
docker compose ps      # services should show "healthy" within a minute or two
```

The app is reachable at `http://<this-host>:8080` (or whatever `APP_PORT` you set in `.env`).

## 4. First login

- Go to `http://<host>:<APP_PORT>`.
- **Default admin account:** `cyadmin@cyassure.com` / `Admin@123`. **Change this password immediately** (Settings → Users) — this credential is documented publicly, so leaving it unchanged on an internet-reachable instance is a real risk.

## 5. Community vs. Enterprise — what changes at runtime

There is no time-limited trial. Both editions are permanent:

| | **Community** | **Enterprise** |
|---|---|---|
| Cost | Free, forever | Licensed — `.lic` file |
| Admin/analyst users | 1 | Purchased quantity |
| EDR / endpoint agents | 15 | Purchased quantity |
| Raw event history (CyDataLake) | 15 days | 90 days |
| CyMind AI integration | Not available | Full access |
| CyTIM threat-intel integration | Not available | Full access |

You don't need a license to get started — with no license file present, the portal runs Community Edition permanently, no countdown. To activate Enterprise, upload your `.lic` file via **Settings → License** — it applies immediately, no restart required.

## 6. Key environment variables

| Variable | Required? | Meaning |
|---|---|---|
| `POSTGRES_PASSWORD` | Required | Database password — use a strong random value |
| `SECRET_KEY` | Required | Session signing key — changing it after go-live signs everyone out |
| `CYDATALAKE_DB_PASSWORD` | Required | Password for the bundled event-store container |
| `APP_PORT` | Optional (default `8080`) | Host port the app is reachable on |
| `GOOGLE_CLIENT_ID` / `GOOGLE_CLIENT_SECRET` | Optional | Enables "Sign in with Google" |
| `MICROSOFT_CLIENT_ID` / `MICROSOFT_CLIENT_SECRET` | Optional | Enables "Sign in with Microsoft" |
| `SMTP_HOST` / `SMTP_PORT` / `SMTP_USER` / `SMTP_PASSWORD` | Optional | Enables outbound email alerting |

`MAXMIND_KEY` (GeoIP enrichment) is the one exception to this table — it's read from `/opt/cyassure/.env`, not the project `.env` above, since the installer script downloads the GeoLite2 database directly to the host. See Section 2 for how to set it.

## 7. Running, stopping, checking health

```bash
docker compose up -d           # start (or restart with new config) everything
docker compose ps              # status of all services
docker compose logs -f backend # tail backend logs
docker compose down            # stop everything, keep all data
```

## 8. Upgrading

```bash
docker compose pull
docker compose up -d
```

Your database, app state (`/opt/cyassure`), and scan history all survive independently of the bundle directory — nothing else needs to be carried over manually.

## 9. Backups

- **Database:** `docker compose exec db pg_dump -U <user> <database> > backup.sql`
- **App state:** `sudo tar czf opt-cyassure-backup.tar.gz -C / opt/cyassure` — this is where your license file and AI settings live.
- **Scan history:** `sudo tar czf var-log-cyassure-backup.tar.gz -C / var/log/cyassure`

## 10. Security recommendations

- Change the default admin password the moment you log in — see Section 4.
- The Docker bundle itself serves plain HTTP on `APP_PORT` — put TLS termination (the installer script's built-in option, or your own reverse proxy/load balancer) in front of it for anything beyond local evaluation.
- Don't expose `APP_PORT` directly to the public internet without a firewall, VPN, or reverse-proxy access control.

## 11. Support

Questions, license activation, or issues not covered here — see [Support](/support).

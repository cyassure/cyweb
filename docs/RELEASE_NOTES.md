## v1.0.13 -- 2026-04-24

### Improvements

  - Stability and performance improvements.

---

## v1.0.13 -- 2026-04-24

### New Features

  - **cycentra-setup.sh** — Single-file install, update, and upgrade wizard.
    Replaces `deploy.sh` and `git-pull.sh`. Installs Docker, deploys
    `docker-compose.yml` to `/opt/cycentra-web`, pulls the website image from
    GHCR using `GHCR_PAT` env var (no more hardcoded tokens), and starts the
    container. Run from the server:
    - Fresh install : `bash cycentra-setup.sh`
    - Pull latest   : `bash cycentra-setup.sh --update`
    - Pin a version : `bash cycentra-setup.sh --upgrade v1.1.0`

---

## v1.0.12 -- 2026-04-24

### Improvements

  - Stability and performance improvements.

---

## v1.0.11 -- 2026-04-24

### Improvements

  - Stability and performance improvements.

---


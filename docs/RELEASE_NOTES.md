## v1.0.69 -- 2026-08-09

### Improvements

  - Stability and performance improvements.

---

## v1.0.68 -- 2026-08-08

### Improvements

  - restore wrangler.jsonc — Cloudflare no longer offers classic Pages

---

## v1.0.67 -- 2026-08-08

### Improvements

  - switch deploy target from Workers to Cloudflare Pages

---

## v1.0.66 -- 2026-08-08

### Bug Fixes

  - Cloudflare Workers deploy failure + CSS @import order warning

---

## v1.0.65 -- 2026-08-08

### Bug Fixes

  - remove stale bun.lockb causing Cloudflare Pages build failures

---

## v1.0.64 -- 2026-08-08

### Improvements

  - Stability and performance improvements.

---

## v1.0.63 -- 2026-08-08

### Improvements

  - Stability and performance improvements.

---

## v1.0.62 -- 2026-08-08

### Improvements

  - Stability and performance improvements.

---

## v1.0.61 -- 2026-08-07

### Improvements

  - Stability and performance improvements.

---

## v1.0.60 -- 2026-08-07

### Improvements

  - Stability and performance improvements.

---

## v1.0.59 -- 2026-08-07

### Improvements

  - Stability and performance improvements.

---

## v1.0.58 -- 2026-08-07

### Improvements

  - Stability and performance improvements.

---

## v1.0.57 -- 2026-07-17

### Improvements

  - chore(docs): weekly architecture review 2026-07-16
  - chore(docs): weekly architecture review 2026-07-09
  - chore(docs): weekly architecture review 2026-07-02

---

## v1.0.56 -- 2026-07-17

### Improvements

  - Stability and performance improvements.

---

## v1.0.55 -- 2026-06-26

### Improvements

  - Stability and performance improvements.

---

## v1.0.54 -- 2026-06-26

### Improvements

  - Stability and performance improvements.

---

## v1.0.53 -- 2026-06-26

### Improvements

  - Stability and performance improvements.

---

## v1.0.52 -- 2026-06-26

### Improvements

  - Stability and performance improvements.

---

## v1.0.51 -- 2026-06-26

### Improvements

  - chore(docs): weekly architecture review 2026-06-25
  - chore(docs): weekly architecture review 2026-06-18

---

## v1.0.50 -- 2026-06-26

### Improvements

  - chore(docs): weekly architecture review 2026-06-18

---

## v1.0.49 -- 2026-06-22

### Improvements

  - Stability and performance improvements.

---

## v1.0.48 -- 2026-06-22

### Improvements

  - Stability and performance improvements.

---

## v1.0.47 -- 2026-06-22

### Improvements

  - Stability and performance improvements.

---

## v1.0.46 -- 2026-06-22

### Improvements

  - Stability and performance improvements.

---

## v1.0.45 -- 2026-06-22

### Improvements

  - chore(docs): weekly architecture review 2026-06-18

---

## v1.0.44 -- 2026-06-22

### Bug Fixes

  - **Marketplace Publish path** — The "Publish to cycentra.com" button in CyAdmin was writing to a
    dead-end `CyCentra/cycentra.com/` directory instead of the git-tracked `CyCentra.com/` repo.
    Published catalogs were silently discarded and never deployed. Fixed the Docker Compose volume
    mount and the non-Docker default path in `app.py`.

  - **`github` config_type missing from CyAdmin validation** — The `_VALID_CONFIG_TYPES` set in
    `CyAdmin/app.py` did not include `"github"`, and the item-edit dropdown had no `github` option.
    Editing the `github-audit` integration through CyAdmin would silently strip its `config_type`.
    Both the validation set and the dropdown are now corrected.

  - **`github` config_type missing from portal custom-item form** — The `CatalogItemFormModal`
    config_type select in `MarketplacePage.jsx` had no `github` option. Custom items with GitHub
    audit log integrations could not be created correctly from the portal. Option added.

  - **Retry-causes-409 on partial submit failure** — In `CatalogItemFormModal`, after a successful
    save but failed submit, retrying would POST to create a new item (causing a 409 duplicate-ID
    conflict) because the form used the static `isEdit` flag instead of tracking the newly created
    ID. Fixed by introducing `savedId` state that persists the server-assigned ID across retries so
    subsequent attempts use PUT.

### Improvements

  - **Marketplace submission email notification** — When a CyCentra 360 server admin submits a
    per-server custom item for cloud catalog review, a notification email is sent to
    `MARKETPLACE_ADMIN_EMAIL` (default: `marketplace@cycentra.com`) with the item's ID, name,
    type, description, submitter address, and server URL. Previously the submission was stored
    silently with no notification, causing contributions to go unnoticed. Uses the existing
    fire-and-forget SMTP path; silently skipped if SMTP is not configured. Override via
    `MARKETPLACE_ADMIN_EMAIL` in `/opt/cycentra/.env`.

---

## v1.0.43 -- 2026-06-12

### Improvements

  - Stability and performance improvements.

---

## v1.0.42 -- 2026-06-11

### Improvements

  - Stability and performance improvements.

---

## v1.0.41 -- 2026-05-30

### Improvements

  - Stability and performance improvements.

---

## v1.0.40 -- 2026-05-25

### Improvements

  - Stability and performance improvements.

---

## v1.0.39 -- 2026-05-21

### New Features

  - about): add front building photo and zoom out aerial view of Global HQ

---

## v1.0.38 -- 2026-05-20

### Improvements

  - Stability and performance improvements.

---

## v1.0.37 -- 2026-05-03

### Improvements

  - Stability and performance improvements.

---

## v1.0.36 -- 2026-05-03

### Improvements

  - Stability and performance improvements.

---

## v1.0.35 -- 2026-05-03

### Improvements

  - Stability and performance improvements.

---

## v1.0.34 -- 2026-05-03

### Improvements

  - Stability and performance improvements.

---

## v1.0.33 -- 2026-05-03

### Improvements

  - Stability and performance improvements.

---

## v1.0.32 -- 2026-05-02

### Improvements

  - Stability and performance improvements.

---

## v1.0.31 -- 2026-05-02

### Improvements

  - Stability and performance improvements.

---

## v1.0.30 -- 2026-05-02

### Improvements

  - Stability and performance improvements.

---

## v1.0.29 -- 2026-05-02

### Improvements

  - Stability and performance improvements.

---

## v1.0.28 -- 2026-05-02

### Improvements

  - Stability and performance improvements.

---

## v1.0.27 -- 2026-05-02

### Improvements

  - Stability and performance improvements.

---

## v1.0.26 -- 2026-05-02

### Improvements

  - Stability and performance improvements.

---

## v1.0.25 -- 2026-05-01

### Improvements

  - Stability and performance improvements.

---

## v1.0.24 -- 2026-04-30

### Improvements

  - Stability and performance improvements.

---

## v1.0.23 -- 2026-04-28

### Improvements

  - Stability and performance improvements.

---

## v1.0.22 -- 2026-04-28

### Improvements

  - Stability and performance improvements.

---

## v1.0.21 -- 2026-04-27

### Improvements

  - Stability and performance improvements.

---

## v1.0.20 -- 2026-04-27

### Improvements

  - Stability and performance improvements.

---

## v1.0.19 -- 2026-04-27

### Improvements

  - Stability and performance improvements.

---

## v1.0.18 -- 2026-04-27

### Improvements

  - Stability and performance improvements.

---

## v1.0.17 -- 2026-04-26

### Improvements

  - Stability and performance improvements.

---

## v1.0.16 -- 2026-04-26

### Improvements

  - Stability and performance improvements.

---

## v1.0.15 -- 2026-04-26

### Improvements

  - Stability and performance improvements.

---

## v1.0.14 -- 2026-04-25

### Improvements

  - Stability and performance improvements.

---

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


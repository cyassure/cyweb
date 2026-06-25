# CyCentra.com Weekly Review

**Last reviewed:** 2026-06-25
**Current version:** v1.0.49
**Commits this week:** 7 (docs chore 2026-06-18; v1.0.44–v1.0.49 all on 2026-06-22)

## Summary

Six releases landed this week (v1.0.44–v1.0.49), all on 2026-06-22. v1.0.44 was the substantive release: it fixed the Marketplace catalog publish path (broken Docker volume mount), added the missing `github` config_type to CyAdmin validation and the portal form, fixed a retry-causes-409 race on partial submit, and added email notification on catalog submission. The most significant structural change is that `marketplace-api/` — a Python Flask backend serving the catalog API — now exists in this repo. v1.0.45–v1.0.49 are logged as "Stability and performance improvements" with no code details. The React frontend (pages, components) is unchanged.

## Documentation Drift

- **No CLAUDE.md** — still no top-level architecture document. This weekly review remains the only structured reference.
- **`marketplace-api/` is undocumented** — a Python Flask service (`app.py`, `Dockerfile`, `requirements.txt`) was added to this repo with no corresponding docs entry. It serves `public/marketplace/catalog.json` and handles CyAdmin publish requests and catalog submissions. Its routes, environment variables (`MARKETPLACE_ADMIN_EMAIL`, SMTP config), and deployment model are undocumented.
- **`docker-compose.yml` / `docker-compose.local.yml`** — Docker Compose files now orchestrate the React/nginx frontend and the `marketplace-api` backend together. Not previously documented.
- **`nginx.conf.template`** — Nginx reverse-proxy config template present in the repo root; not documented.
- **`.github/workflows/update-agent-commands.yml`** — new CI workflow alongside `docker-publish.yml`; purpose undocumented.
- **`DetailedServicesSection.tsx`** — still not imported anywhere; likely dead code (carried forward from last review).
- **`NavLink.tsx`** — still not imported anywhere; likely dead code (carried forward from last review).
- **Static HTML files in `public/`** — `book-consultation.html`, `request-pricing.html`, `run-pilot.html`, `thank-you.html` still undocumented.
- **`package.json` name field** — still set to `vite_react_shadcn_ts` (Vite template default).

## New Since Last Review

| Item | Type | Details |
|---|---|---|
| `marketplace-api/app.py` | New backend service | Python Flask app for Marketplace catalog API |
| `marketplace-api/Dockerfile` | New infra | Containerises the Flask service |
| `marketplace-api/requirements.txt` | New infra | Python dependencies for the Flask service |
| `docker-compose.yml` | Updated infra | Now orchestrates frontend (nginx) + marketplace-api together |
| `docker-compose.local.yml` | New infra | Local development variant of Docker Compose |
| `nginx.conf.template` | New/updated infra | Nginx reverse-proxy config template |
| `.github/workflows/update-agent-commands.yml` | New CI | Second GitHub Actions workflow (joins `docker-publish.yml`) |
| `public/marketplace/catalog.json` | Updated asset | Catalog data updated (now served by marketplace-api) |
| `docs/README.md` | Updated | Development setup instructions refreshed |

## Pages (authoritative from src/pages/)

| File | Route | Purpose |
|---|---|---|
| `Index.tsx` | `/` | Main marketing landing page; renders all section components in sequence |
| `NotFound.tsx` | `*` | 404 catch-all |

## Shared Components (authoritative from src/components/)

### Section components (rendered by Index.tsx)

| Component | Purpose |
|---|---|
| `Navbar.tsx` | Top navigation bar |
| `HeroSection.tsx` | Above-the-fold hero |
| `WhyCycentraSection.tsx` | Value proposition section |
| `ProductsSection.tsx` | Product family overview |
| `PlatformSection.tsx` | Platform capabilities |
| `ServicesSection.tsx` | Services overview |
| `CyMindSection.tsx` | CyMind product/feature highlight |
| `ComparisonSection.tsx` | Competitive comparison |
| `FreeScanSection.tsx` | Free scan CTA |
| `PricingSection.tsx` | Pricing tiers |
| `AboutSection.tsx` | About / Global HQ (includes `hq-building-front.jpg`, `hq-building.png`) |
| `ContactSection.tsx` | Contact form / CTA |
| `Footer.tsx` | Site footer |

### Unused components (defined but not imported anywhere)

| Component | Status |
|---|---|
| `DetailedServicesSection.tsx` | Not imported — possible draft or dead code |
| `NavLink.tsx` | Not imported — possible leftover abstraction |

### UI primitives (src/components/ui/ — full shadcn/ui suite)

46 Radix UI–based components: accordion, alert-dialog, alert, aspect-ratio, avatar, badge, breadcrumb, button, calendar, card, carousel, chart, checkbox, collapsible, command, context-menu, dialog, drawer, dropdown-menu, form, hover-card, input-otp, input, label, menubar, navigation-menu, pagination, popover, progress, radio-group, resizable, scroll-area, select, separator, sheet, sidebar, skeleton, slider, sonner, switch, table, tabs, textarea, toast, toaster, toggle-group, toggle, tooltip.

## Key Dependencies

| Package | Version | Role |
|---|---|---|
| React | ^18.3.1 | UI framework |
| react-router-dom | ^6.30.1 | Client-side routing |
| @tanstack/react-query | ^5.83.0 | Server state (set up in App.tsx, not visibly used in frontend) |
| Radix UI | (full suite) | Accessible primitives for shadcn/ui |
| framer-motion | ^12.34.0 | Animation library |
| lucide-react | ^0.462.0 | Icon library |
| react-hook-form | ^7.61.1 | Form state |
| zod | ^3.25.76 | Schema validation |
| recharts | ^2.15.4 | Charting |
| sonner | ^1.7.4 | Toast notifications |
| Tailwind CSS | ^3.4.17 | Styling (dev) |
| Vite | ^5.4.19 | Build tool (dev) |
| TypeScript | ^5.8.3 | Type checking (dev) |
| vitest + @testing-library/react | ^3.2.4 / ^16.0.0 | Unit tests (dev) |
| lovable-tagger | ^1.1.13 | Lovable.dev integration (dev) |

## Action Items

1. **Document `marketplace-api/`** — add README or CLAUDE.md section covering routes, env vars (`MARKETPLACE_ADMIN_EMAIL`, SMTP config), and deployment model (Docker Compose service).
2. **Create CLAUDE.md** — document overall repo structure now that it contains both a React frontend and a Python backend service.
3. **Audit unused components** — determine whether `DetailedServicesSection.tsx` and `NavLink.tsx` should be deleted or integrated.
4. **Document public HTML files** — `book-consultation.html`, `request-pricing.html`, `run-pilot.html`, `thank-you.html` and `marketplace/catalog.json` need ownership and purpose documented.
5. **Rename `package.json` name** — change from `vite_react_shadcn_ts` to `cycentra.com` or a branded slug.
6. **Verify @tanstack/react-query usage** — QueryClient is instantiated in App.tsx but no data-fetching hooks were found; remove if not used to reduce bundle size.
7. **Document `.github/workflows/update-agent-commands.yml`** — clarify what this workflow does and when it runs.

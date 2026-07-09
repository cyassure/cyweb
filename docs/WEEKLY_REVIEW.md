# CyCentra.com Weekly Review

**Last reviewed:** 2026-07-09
**Current version:** v1.0.55
**Commits this week:** 1 (docs chore 2026-07-02 — previous weekly review only)

## Summary

No code changes landed this week. The sole commit since the 2026-07-02 review is the review document itself. The React frontend structure (pages, routing, component tree) is unchanged. All drift items from the prior review remain open.

## Documentation Drift

- **No CLAUDE.md** — no top-level architecture document exists. This weekly review remains the only structured reference.
- **`marketplace-api/` is undocumented** — Python Flask service (`app.py`, `Dockerfile`, `requirements.txt`) in the repo root with no documentation. Serves `public/marketplace/catalog.json` and handles catalog submissions and CyAdmin publish requests. Routes, environment variables (`MARKETPLACE_ADMIN_EMAIL`, SMTP config), and deployment model are undocumented.
- **`docker-compose.yml` / `docker-compose.local.yml`** — Docker Compose files orchestrating the React/nginx frontend and `marketplace-api` backend are undocumented.
- **`nginx.conf.template`** — Nginx reverse-proxy config template in the repo root; undocumented.
- **Root shell scripts** — `cycentra.com-setup.sh`, `docker-maintenance.sh`, `git-push.sh` present in the repo root; purpose and usage undocumented.
- **`_backup/` directory** — exists in the repo root; contents and ownership undocumented.
- **`DetailedServicesSection.tsx`** — defined but not imported anywhere; likely dead code.
- **`NavLink.tsx`** — defined but not imported anywhere; likely dead code.
- **Static HTML files in `public/`** — `book-consultation.html`, `request-pricing.html`, `run-pilot.html`, `thank-you.html` are undocumented standalone pages.
- **`package.json` name field** — set to `vite_react_shadcn_ts` (Vite template default); not branded.
- **`@tanstack/react-query`** — `QueryClient` instantiated in `App.tsx` but no data-fetching hooks found in the frontend; possibly unused bundle weight.

## New Since Last Review

No structural changes this week.

## Pages (authoritative from src/pages/)

| File | Route | Purpose |
|---|---|---|
| `Index.tsx` | `/` | Main marketing landing page; renders all section components in sequence |
| `NotFound.tsx` | `*` | 404 catch-all |

## Shared Components (authoritative from src/components/)

### Section components (rendered by Index.tsx, in import order)

| Component | Purpose |
|---|---|
| `Navbar.tsx` | Top navigation bar |
| `HeroSection.tsx` | Above-the-fold hero |
| `ServicesSection.tsx` | Services overview |
| `WhyCycentraSection.tsx` | Value proposition section |
| `ProductsSection.tsx` | Product family overview |
| `CyMindSection.tsx` | CyMind product/feature highlight |
| `PlatformSection.tsx` | Platform capabilities |
| `ComparisonSection.tsx` | Competitive comparison |
| `AboutSection.tsx` | About / Global HQ |
| `FreeScanSection.tsx` | Free scan CTA |
| `PricingSection.tsx` | Pricing tiers |
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
| @tanstack/react-query | ^5.83.0 | Server state (configured in App.tsx; no fetch hooks found in frontend) |
| Radix UI | (full suite) | Accessible primitives for shadcn/ui |
| framer-motion | ^12.34.0 | Animation library |
| lucide-react | ^0.462.0 | Icon library |
| react-hook-form + zod | ^7.61.1 / ^3.25.76 | Form state and schema validation |
| recharts | ^2.15.4 | Charting |
| sonner | ^1.7.4 | Toast notifications |
| Tailwind CSS | ^3.4.17 | Styling (dev) |
| Vite | ^5.4.19 | Build tool (dev) |
| TypeScript | ^5.8.3 | Type checking (dev) |
| vitest + @testing-library/react | ^3.2.4 / ^16.0.0 | Unit tests (dev) |
| lovable-tagger | ^1.1.13 | Lovable.dev integration (dev) |

## Action Items

1. **Create CLAUDE.md** — document overall repo structure covering both the React/Vite frontend and the `marketplace-api` Python backend.
2. **Document `marketplace-api/`** — add routes, environment variables (`MARKETPLACE_ADMIN_EMAIL`, SMTP config), and Docker Compose deployment model.
3. **Document root scripts** — clarify purpose of `cycentra.com-setup.sh`, `docker-maintenance.sh`, and `git-push.sh`.
4. **Audit `_backup/` directory** — determine if it should remain in the repo or be added to `.gitignore`.
5. **Audit unused components** — decide whether `DetailedServicesSection.tsx` and `NavLink.tsx` should be deleted or integrated.
6. **Document public HTML files** — `book-consultation.html`, `request-pricing.html`, `run-pilot.html`, `thank-you.html` need ownership and purpose documented.
7. **Verify @tanstack/react-query usage** — remove if no data-fetching hooks exist in the frontend.
8. **Rename `package.json` name field** — change from `vite_react_shadcn_ts` to a branded slug.

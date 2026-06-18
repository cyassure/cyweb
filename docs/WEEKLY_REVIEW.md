# CyCentra.com Weekly Review

**Last reviewed:** 2026-06-18
**Current version:** v1.0.43
**Commits this week:** 2 (v1.0.43 on 2026-06-12, v1.0.42 on 2026-06-11)

## Summary

Two releases landed this week (v1.0.42 and v1.0.43), both logged as "Stability and performance improvements" with no structural changes to pages or components. The site remains a single-page React app assembled from 13 section components rendered in sequence on `Index.tsx`. No CLAUDE.md exists, leaving the entire architecture undocumented at the meta level.

## Documentation Drift

- **No CLAUDE.md** — there is no top-level architecture document; this weekly review is the only structured reference.
- **`DetailedServicesSection.tsx`** — component exists in `src/components/` but is not imported anywhere in the codebase. Likely a draft or replaced by `ServicesSection.tsx`.
- **`NavLink.tsx`** — component exists in `src/components/` but is not imported anywhere. May be an unused abstraction or leftover from a refactor.
- **Static HTML files in `public/`** — `book-consultation.html`, `request-pricing.html`, `run-pilot.html`, and `thank-you.html` exist as standalone pages but are not referenced in any React component or documented.
- **`public/marketplace/catalog.json`** — exists but is undocumented; purpose unknown.
- **`package.json` name field** — still set to `vite_react_shadcn_ts` (Vite template default), not branded to `cycentra.com`.

## New Since Last Review

No structural changes this week (no new pages or components). Release notes for v1.0.42 and v1.0.43 describe only "Stability and performance improvements."

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
| @tanstack/react-query | ^5.83.0 | Server state (set up in App.tsx, not visibly used) |
| Radix UI | (full suite) | Accessible primitives for shadcn/ui |
| lucide-react | ^0.462.0 | Icon library |
| react-hook-form | ^7.61.1 | Form state |
| zod | ^3.25.76 | Schema validation |
| recharts | ^2.15.4 | Charting (likely for ComparisonSection) |
| sonner | ^1.7.4 | Toast notifications |
| Tailwind CSS | ^3.4.17 | Styling (dev) |
| Vite | ^5.4.19 | Build tool (dev) |
| TypeScript | ^5.8.3 | Type checking (dev) |
| vitest + @testing-library/react | ^3.2.4 / ^16.0.0 | Unit tests (dev) |
| lovable-tagger | ^1.1.13 | Lovable.dev integration (dev) |

## Action Items

1. **Create CLAUDE.md** — document routing, section render order, public HTML files, and the `marketplace/catalog.json` purpose so future agents and contributors have context.
2. **Audit unused components** — determine whether `DetailedServicesSection.tsx` and `NavLink.tsx` should be deleted or integrated.
3. **Document public HTML files** — `book-consultation.html`, `request-pricing.html`, `run-pilot.html`, `thank-you.html` and `marketplace/catalog.json` need ownership and purpose documented.
4. **Rename `package.json` name** — change from `vite_react_shadcn_ts` to `cycentra.com` or a branded slug.
5. **Verify @tanstack/react-query usage** — QueryClient is instantiated in App.tsx but no data-fetching hooks were found; remove if not used to reduce bundle size.

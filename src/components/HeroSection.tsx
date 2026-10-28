import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Play, ScanSearch } from "lucide-react";
import dashboardScreenshot from "@/assets/screenshots/attack-posture.jpg";
import heroPhoto from "@/assets/photos/hero-earth.jpg";
import DemoRequestDialog from "@/components/DemoRequestDialog";
import { DOMAIN_COLORS, type DomainId } from "@/lib/domains";

const stats = [
  { value: "<30 min", label: "From install to fully operational", color: DOMAIN_COLORS.asm },
  { value: "~70%", label: "Less SOC noise after correlation", color: DOMAIN_COLORS.data },
  { value: "24×7", label: "AI-assisted monitoring by our SOC", color: DOMAIN_COLORS.endpoint },
  { value: "10", label: "Security domains in one console", color: DOMAIN_COLORS.response },
];

// Illustrative volumes for the hero funnel; bar width is relative to the largest source.
const funnel = [
  { label: "EDR", value: "1.12M", pct: 100, color: DOMAIN_COLORS.endpoint },
  { label: "Firewall", value: "806k", pct: 72, color: DOMAIN_COLORS.asm },
  { label: "Cloud / SaaS", value: "342k", pct: 31, color: DOMAIN_COLORS["cloud-saas"] },
  { label: "Identity", value: "118k", pct: 11, color: DOMAIN_COLORS.response },
  { label: "Data / DLP", value: "41k", pct: 4, color: DOMAIN_COLORS.data },
];

// One tile per ProductsSection tab; `isNew` replaces the old "What's new" pills.
const spectrum: { id: DomainId; label: string; isNew?: boolean }[] = [
  { id: "secops", label: "Security Ops" },
  { id: "response", label: "AI SOC Agents", isNew: true },
  { id: "vuln", label: "Vulnerability", isNew: true },
  { id: "asm", label: "Attack Surface" },
  { id: "itam", label: "Assets" },
  { id: "cloud-saas", label: "Cloud & SaaS", isNew: true },
  { id: "data", label: "Data & DSPM", isNew: true },
  { id: "endpoint", label: "Endpoint" },
  { id: "ai", label: "AI Security" },
  { id: "grc", label: "GRC" },
];

const HeroSection = () => {
  const reduce = useReducedMotion();

  return (
    <section className="relative pt-[106px]">
      {/* Photo hero: text sits on the dark left side of the overlay. */}
      <div className="relative overflow-hidden bg-[#07122a] text-white">
        <img
          src={heroPhoto}
          alt=""
          className="absolute inset-0 h-full w-full object-cover object-[70%_center]"
          loading="eager"
        />
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(90deg, rgba(7,18,42,0.96) 0%, rgba(7,18,42,0.85) 42%, rgba(7,18,42,0.35) 100%)",
          }}
        />
        <div className="container relative mx-auto grid items-center gap-12 px-6 py-16 md:py-24 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)]">
          <div>
            <p className="eyebrow mb-5 text-white/70">Cy360 by CyAssure · Netherlands &amp; India</p>
            <h1 className="mb-6 text-4xl font-semibold leading-[1.05] text-white sm:text-5xl lg:text-6xl">
              Every signal in. <span className="text-[#8fb0ff]">Only real incidents</span> out.
            </h1>
            <p className="mb-8 max-w-xl text-lg leading-relaxed text-white/80">
              Cy360 correlates endpoint, firewall, cloud, identity and data-loss telemetry into a short list your
              team can close. Self-hosted, SaaS, or run by our 24×7 SOC.
            </p>
            <div className="flex flex-wrap items-center gap-3">
              <a
                href="#contact"
                className="group flex items-center gap-2 rounded-md bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-all hover:brightness-110"
              >
                Talk to an Expert
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </a>
              <DemoRequestDialog
                trigger={
                  <button
                    type="button"
                    className="flex items-center gap-2 rounded-md bg-white/10 px-6 py-3 text-sm font-semibold text-white shadow-[inset_0_0_0_1px_rgba(255,255,255,0.35)] backdrop-blur transition-all hover:bg-white/20"
                  >
                    <Play className="h-4 w-4" />
                    Request a Demo
                  </button>
                }
              />
              <a
                href="#free-scan"
                className="flex items-center gap-1.5 px-2 py-3 text-sm text-white/75 transition-colors hover:text-white"
              >
                <ScanSearch className="h-4 w-4" /> Free ASM &amp; DLP scan
              </a>
            </div>
          </div>

          {/* The one orchestrated animation on the page: sources fill, then collapse into incidents. */}
          <div
            className="rounded-lg border border-white/15 bg-white/[0.06] p-6 text-sm backdrop-blur-md"
            aria-label="Illustrative correlation: millions of events reduced to nine incidents"
          >
            <p className="eyebrow mb-5 text-white/60">Events → incidents · last 24h</p>
            <div className="space-y-3">
              {funnel.map((row, i) => (
                <div key={row.label} className="grid grid-cols-[96px_1fr_56px] items-center gap-3 text-white/75">
                  <span>{row.label}</span>
                  <div className="h-3">
                    <motion.div
                      className="h-full rounded-[1px]"
                      style={{ backgroundColor: row.color }}
                      initial={reduce ? false : { width: 0 }}
                      animate={{ width: `${row.pct}%` }}
                      transition={{ duration: 0.9, delay: 0.3 + i * 0.12, ease: [0.22, 1, 0.36, 1] }}
                    />
                  </div>
                  <span className="text-right font-semibold tabular-nums text-white">{row.value}</span>
                </div>
              ))}
              <div className="mt-3 grid grid-cols-[96px_1fr_56px] items-center gap-3 border-t border-dashed border-white/25 pt-3 text-white">
                <span className="font-semibold">Incidents</span>
                <div className="h-3">
                  <motion.div
                    className="h-full w-[2%] min-w-[6px] rounded-[1px]"
                    style={{ backgroundColor: DOMAIN_COLORS.secops }}
                    initial={reduce ? false : { opacity: 0, scaleY: 0.2 }}
                    animate={{ opacity: 1, scaleY: 1 }}
                    transition={{ duration: 0.4, delay: 1.25 }}
                  />
                </div>
                <span className="text-right text-lg font-semibold tabular-nums">9</span>
              </div>
            </div>
            <p className="mt-4 text-xs text-white/50">Illustrative data</p>
          </div>
        </div>
      </div>

      {/* Domain spectrum: each tile opens that domain's tab in the platform tour below. */}
      <nav aria-label="Security domains" className="grid grid-cols-2 sm:grid-cols-5 lg:grid-cols-10">
        {spectrum.map((d) => (
          <a
            key={d.id}
            href={`/#products-${d.id}`}
            className="group relative flex min-h-[72px] flex-col justify-between gap-2 px-3 py-3 text-[13px] font-semibold leading-tight text-[#07122a] transition-[filter] hover:brightness-110"
            style={{ backgroundColor: DOMAIN_COLORS[d.id] }}
          >
            {d.isNew ? (
              <span className="eyebrow self-start rounded-sm bg-[#07122a] px-1.5 py-0.5 text-[10px] text-white">New</span>
            ) : (
              <span aria-hidden className="h-[18px]" />
            )}
            <span className="flex items-center justify-between gap-1">
              {d.label}
              <ArrowRight className="h-3.5 w-3.5 shrink-0 opacity-0 transition-opacity group-hover:opacity-100" />
            </span>
          </a>
        ))}
      </nav>

      <div className="container mx-auto px-6 pt-16">
        <figure className="mx-auto max-w-5xl">
          <div className="overflow-hidden rounded-lg border border-border bg-card shadow-[var(--shadow-card)]">
            <img
              src={dashboardScreenshot}
              alt="Cy360 Attack Surface overview — live security score, SSL health, and infrastructure exposure"
              className="w-full"
              loading="eager"
            />
          </div>
          <figcaption className="mt-3 text-xs text-muted-foreground">Cy360 portal · Attack Surface overview</figcaption>
        </figure>

        {/* Stat band: oversized numerals, one domain colour rule each. */}
        <dl className="mt-16 grid gap-8 border-t border-border pt-10 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label} className="border-l-2 pl-5" style={{ borderColor: s.color }}>
              <dt className="sr-only">{s.label}</dt>
              <dd className="text-4xl font-semibold tabular-nums tracking-tight text-foreground md:text-5xl">{s.value}</dd>
              <dd className="mt-2 text-sm text-muted-foreground">{s.label}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
};

export default HeroSection;

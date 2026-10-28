import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Play, Zap, Activity, Brain, ScanSearch } from "lucide-react";
import dashboardScreenshot from "@/assets/screenshots/attack-posture.jpg";
import DemoRequestDialog from "@/components/DemoRequestDialog";
import { DOMAIN_COLORS, type DomainId } from "@/lib/domains";

const stats = [
  { icon: Zap, value: "<30 min", label: "To fully operational" },
  { icon: Activity, value: "~70%", label: "Less SOC noise" },
  { icon: Brain, value: "24×7", label: "AI-assisted monitoring" },
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
    <section className="relative overflow-hidden pt-20">
      <div className="container relative mx-auto px-6 pb-10 pt-12 md:pt-20">
        <div className="grid items-end gap-12 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)]">
          <div>
            <p className="mb-6 font-mono text-xs uppercase tracking-[0.12em] text-muted-foreground">
              Cy360 by CyAssure · Netherlands &amp; India
            </p>

            <h1 className="mb-6 font-heading text-[2.1rem] font-bold leading-[1.04] text-foreground sm:text-5xl lg:text-[3.6rem]">
              Every signal in. <span className="text-spectrum">Only real incidents</span> out.
            </h1>

            <p className="mb-8 max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg">
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
                    className="flex items-center gap-2 rounded-md px-6 py-3 text-sm font-semibold text-foreground shadow-[inset_0_0_0_1px_hsl(var(--input))] transition-all hover:bg-secondary"
                  >
                    <Play className="h-4 w-4" />
                    Request a Demo
                  </button>
                }
              />
              <a
                href="#free-scan"
                className="flex items-center gap-1.5 px-2 py-3 text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                <ScanSearch className="h-4 w-4" /> Free ASM &amp; DLP scan
              </a>
            </div>
          </div>

          {/* The one orchestrated animation on the page: sources fill, then collapse into incidents. */}
          <div className="font-mono text-xs" aria-label="Illustrative correlation: millions of events reduced to nine incidents">
            <p className="mb-4 text-muted-foreground">Events → incidents · last 24h</p>
            <div className="space-y-2.5">
              {funnel.map((row, i) => (
                <div key={row.label} className="grid grid-cols-[92px_1fr_52px] items-center gap-3 text-muted-foreground">
                  <span>{row.label}</span>
                  <div className="h-3.5">
                    <motion.div
                      className="h-full rounded-[1px]"
                      style={{ backgroundColor: row.color }}
                      initial={reduce ? false : { width: 0 }}
                      animate={{ width: `${row.pct}%` }}
                      transition={{ duration: 0.9, delay: 0.3 + i * 0.12, ease: [0.22, 1, 0.36, 1] }}
                    />
                  </div>
                  <span className="text-right font-semibold text-foreground">{row.value}</span>
                </div>
              ))}
              <div className="mt-3 grid grid-cols-[92px_1fr_52px] items-center gap-3 border-t border-dashed border-input pt-3 text-foreground">
                <span>Incidents</span>
                <div className="h-3.5">
                  <motion.div
                    className="h-full w-[2%] min-w-[6px] rounded-[1px]"
                    style={{ backgroundColor: DOMAIN_COLORS.secops }}
                    initial={reduce ? false : { opacity: 0, scaleY: 0.2 }}
                    animate={{ opacity: 1, scaleY: 1 }}
                    transition={{ duration: 0.4, delay: 1.25 }}
                  />
                </div>
                <span className="text-right text-base font-semibold">9</span>
              </div>
            </div>
            <p className="mt-4 text-[11px] text-muted-foreground/70">Illustrative data</p>
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
              <span className="self-start rounded-sm bg-[#07122a] px-1.5 py-0.5 font-mono text-[10px] font-medium uppercase tracking-wider text-white">
                New
              </span>
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

      <div className="container mx-auto px-6 pt-14">
        <figure className="mx-auto max-w-5xl">
          <div className="overflow-hidden rounded-lg border border-border bg-card shadow-[var(--shadow-card)]">
            <img
              src={dashboardScreenshot}
              alt="Cy360 Attack Surface overview — live security score, SSL health, and infrastructure exposure"
              className="w-full"
              loading="eager"
            />
          </div>
          <figcaption className="mt-3 flex flex-wrap items-center justify-between gap-4 text-sm">
            <span className="font-mono text-xs text-muted-foreground">Cy360 portal · Attack Surface overview</span>
            <span className="flex flex-wrap gap-6">
              {stats.map((s) => (
                <span key={s.label} className="flex items-center gap-2">
                  <s.icon className="h-4 w-4 text-primary" />
                  <span className="font-semibold text-foreground">{s.value}</span>
                  <span className="text-muted-foreground">{s.label}</span>
                </span>
              ))}
            </span>
          </figcaption>
        </figure>
      </div>
    </section>
  );
};

export default HeroSection;

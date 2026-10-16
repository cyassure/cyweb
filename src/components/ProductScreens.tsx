import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { Lock } from "lucide-react";

// Coded mockups of Cy360 portal screens — one per sidebar section. They mirror
// the real portal's section names, nav items and accent colours
// (Cy360 portal/src/sidebar/navConfig.jsx) with illustrative sample data, so
// they stay crisp at any size and never leak real customer data.

/* Browser-style frame + a mini portal sidebar showing the section's nav items */
export const ScreenFrame = ({
  section, accent, nav, active, children,
}: { section: string; accent: string; nav: string[]; active: number; children: ReactNode }) => (
  <div className="relative overflow-hidden rounded-2xl border border-border/60 bg-card shadow-2xl">
    <div className="flex items-center gap-2 border-b border-border/60 bg-secondary/40 px-4 py-2.5">
      <span className="h-2.5 w-2.5 rounded-full bg-red-400/70" />
      <span className="h-2.5 w-2.5 rounded-full bg-yellow-400/70" />
      <span className="h-2.5 w-2.5 rounded-full bg-green-400/70" />
      <span className="ml-3 flex min-w-0 items-center gap-1.5 truncate rounded-md bg-background/60 px-3 py-1 text-[11px] text-muted-foreground">
        <Lock className="h-3 w-3 shrink-0 text-primary" /> cy360 · {section} › {nav[active]}
      </span>
    </div>
    <div className="flex min-h-[300px]">
      <div className="hidden w-36 shrink-0 border-r border-border/60 bg-background/40 p-3 sm:block">
        <p className="mb-2 text-[9px] font-bold uppercase tracking-wider" style={{ color: accent }}>{section}</p>
        <div className="space-y-0.5">
          {nav.map((item, i) => (
            <div
              key={item}
              className={`truncate rounded-md px-2 py-1 text-[10px] ${i === active ? "font-semibold text-foreground" : "text-muted-foreground"}`}
              style={i === active ? { backgroundColor: `${accent}22`, boxShadow: `inset 2px 0 0 ${accent}` } : undefined}
            >
              {item}
            </div>
          ))}
        </div>
      </div>
      <div className="min-w-0 flex-1 p-4">{children}</div>
    </div>
  </div>
);

const Kpi = ({ label, value, accent, sub }: { label: string; value: string; accent?: string; sub?: string }) => (
  <div className="rounded-lg border border-border bg-secondary/30 p-2.5">
    <p className="truncate text-[9px] uppercase tracking-wide text-muted-foreground">{label}</p>
    <p className="font-heading text-lg font-bold" style={{ color: accent ?? "hsl(var(--foreground))" }}>{value}</p>
    {sub && <p className="truncate text-[9px] text-muted-foreground">{sub}</p>}
  </div>
);

const Pill = ({ children, color }: { children: ReactNode; color: string }) => (
  <span
    className="inline-flex shrink-0 items-center rounded px-1.5 py-0.5 text-[9px] font-semibold"
    style={{ color, backgroundColor: `${color}1f`, border: `1px solid ${color}55` }}
  >
    {children}
  </span>
);

const SEV = { critical: "#ff3b3b", high: "#ff8c00", medium: "#f5c518", low: "#4d9eff", ok: "#34d399" };

const Row = ({ children, i }: { children: ReactNode; i: number }) => (
  <motion.div
    initial={{ opacity: 0, x: 8 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true }}
    transition={{ delay: 0.1 + i * 0.06 }}
    className="flex items-center gap-2 border-b border-border/50 py-1.5 text-[10px] last:border-0"
  >
    {children}
  </motion.div>
);

const Bar = ({ pct, color, delay = 0 }: { pct: number; color: string; delay?: number }) => (
  <div className="h-1.5 w-full overflow-hidden rounded-full bg-border/60">
    <motion.div
      className="h-full rounded-full"
      style={{ backgroundColor: color }}
      initial={{ width: 0 }}
      whileInView={{ width: `${pct}%` }}
      viewport={{ once: true }}
      transition={{ duration: 1, delay }}
    />
  </div>
);

/* ── Security Operations: correlated incidents ─────────────────────────── */
export const SecOpsScreen = () => (
  <ScreenFrame
    section="Security Operations" accent="#ff3b3b" active={1}
    nav={["Security Posture", "Incidents", "Response", "AI Agents", "Detection Rules", "Alerts", "Threat hunting", "Identity Timeline", "Sandbox Analysis", "Behavior Analysis (UEBA)"]}
  >
    <div className="mb-3 grid grid-cols-3 gap-2">
      <Kpi label="Open incidents" value="7" accent={SEV.critical} />
      <Kpi label="Raw events → incidents" value="48k → 7" sub="noise suppressed" />
      <Kpi label="MTTR" value="14m" accent={SEV.ok} />
    </div>
    {[
      { sev: "critical", t: "Credential theft → lateral movement", m: "T1003 · T1021", n: 23 },
      { sev: "high", t: "Impossible travel — finance user", m: "UEBA · Entra ID", n: 4 },
      { sev: "high", t: "Encoded PowerShell from Office macro", m: "T1059.001", n: 9 },
      { sev: "medium", t: "DGA-like DNS from build server", m: "ML · DNS", n: 31 },
    ].map((r, i) => (
      <Row key={r.t} i={i}>
        <Pill color={SEV[r.sev as keyof typeof SEV]}>{r.sev.toUpperCase()}</Pill>
        <span className="min-w-0 flex-1 truncate text-foreground">{r.t}</span>
        <span className="hidden text-muted-foreground md:inline">{r.m}</span>
        <span className="text-muted-foreground">{r.n} alerts</span>
      </Row>
    ))}
  </ScreenFrame>
);

/* ── Response & AI Agents: approval queue ──────────────────────────────── */
export const ResponseScreen = () => (
  <ScreenFrame
    section="Security Operations" accent="#b06eff" active={1}
    nav={["Incidents", "Response", "AI Agents", "Remediation", "Command History"]}
  >
    <p className="mb-2 text-[10px] font-semibold text-foreground">Pending approval</p>
    {[
      { who: "Triage Agent", act: "Isolate host FIN-LT-042", tag: "Tier 2" },
      { who: "Remediation Agent", act: "Patch OpenSSL on 12 Linux hosts", tag: "Canary first" },
      { who: "Hunting Agent", act: "Block IOC 185.220.x.x at firewall", tag: "Tier 1" },
    ].map((r, i) => (
      <Row key={r.act} i={i}>
        <Pill color="#b06eff">{r.who}</Pill>
        <span className="min-w-0 flex-1 truncate text-foreground">{r.act}</span>
        <span className="hidden text-muted-foreground md:inline">{r.tag}</span>
        <span className="rounded bg-emerald-500/15 px-1.5 py-0.5 text-[9px] font-semibold text-emerald-400">Approve</span>
      </Row>
    ))}
    <div className="mt-3 rounded-lg border border-border bg-secondary/30 p-2.5">
      <p className="mb-1.5 text-[9px] uppercase tracking-wide text-muted-foreground">Remediation rollout · two-person rule</p>
      <div className="flex items-center gap-1.5 text-[10px]">
        {["Proposed", "Approved ×2", "Canary host", "Fleet", "Verified"].map((s, i) => (
          <div key={s} className="flex items-center gap-1.5">
            <span className={`rounded px-1.5 py-0.5 ${i < 3 ? "bg-violet-500/20 text-violet-300" : "bg-border/60 text-muted-foreground"}`}>{s}</span>
            {i < 4 && <span className="text-muted-foreground">›</span>}
          </div>
        ))}
      </div>
    </div>
  </ScreenFrame>
);

/* ── Vulnerability Management: prioritised queue ───────────────────────── */
export const VulnScreen = () => (
  <ScreenFrame
    section="Vulnerability Management" accent="#ff5c8a" active={0}
    nav={["Overview", "Findings", "Remediation Plan", "Exceptions", "Sources & Policy"]}
  >
    <div className="mb-3 grid grid-cols-2 gap-2 md:grid-cols-4">
      <Kpi label="Fix now" value="9" accent={SEV.critical} sub="KEV / high EPSS" />
      <Kpi label="Open findings" value="312" />
      <Kpi label="SLA breaches" value="3" accent={SEV.high} />
      <Kpi label="Exceptions" value="14" sub="review dates set" />
    </div>
    {[
      { cve: "CVE-2024-3400", a: "edge-fw-01", s: "external scan", kev: true, epss: 0.97 },
      { cve: "CVE-2023-4966", a: "vpn.example.eu", s: "attack surface", kev: true, epss: 0.96 },
      { cve: "CVE-2024-6387", a: "38 Linux hosts", s: "CyEDR inventory", kev: false, epss: 0.42 },
      { cve: "CVE-2024-21412", a: "112 endpoints", s: "Marketplace source", kev: true, epss: 0.31 },
    ].map((r, i) => (
      <Row key={r.cve} i={i}>
        <span className="w-24 shrink-0 font-mono text-foreground">{r.cve}</span>
        <span className="min-w-0 flex-1 truncate text-muted-foreground">{r.a}</span>
        <span className="hidden text-muted-foreground lg:inline">{r.s}</span>
        {r.kev && <Pill color={SEV.critical}>KEV</Pill>}
        <span className="w-14 shrink-0 text-right text-muted-foreground">EPSS {r.epss.toFixed(2)}</span>
      </Row>
    ))}
  </ScreenFrame>
);

/* ── Asset Management (ITAM): unified inventory + coverage ─────────────── */
export const ItamScreen = () => {
  const yes = <Pill color={SEV.ok}>✓</Pill>;
  const no = <Pill color={SEV.critical}>gap</Pill>;
  return (
    <ScreenFrame
      section="Asset Management" accent="#f5c518" active={0}
      nav={["Network Assets", "Cloud Inventory"]}
    >
      <div className="mb-3 grid grid-cols-3 gap-2">
        <Kpi label="Assets" value="1,284" sub="IT · IoT/OT · cloud" />
        <Kpi label="EDR coverage" value="91%" accent={SEV.ok} />
        <Kpi label="Unmanaged" value="37" accent={SEV.high} />
      </div>
      <div className="flex items-center gap-2 border-b border-border pb-1 text-[9px] uppercase tracking-wide text-muted-foreground">
        <span className="flex-1">Asset</span><span className="hidden w-16 md:block">Type</span><span className="w-8 text-center">EDR</span><span className="w-8 text-center">SIEM</span><span className="w-10 text-right">CVEs</span>
      </div>
      {[
        { n: "FIN-LT-042", t: "Laptop", e: true, s: true, c: 2 },
        { n: "db-prod-02", t: "Server", e: true, s: true, c: 5 },
        { n: "axis-cam-lobby", t: "IoT camera", e: false, s: false, c: 3 },
        { n: "plc-line-4", t: "OT controller", e: false, s: true, c: 1 },
        { n: "i-0a91… (AWS)", t: "Cloud VM", e: false, s: true, c: 0 },
      ].map((r, i) => (
        <Row key={r.n} i={i}>
          <span className="min-w-0 flex-1 truncate font-mono text-foreground">{r.n}</span>
          <span className="hidden w-16 truncate text-muted-foreground md:block">{r.t}</span>
          <span className="w-8 text-center">{r.e ? yes : no}</span>
          <span className="w-8 text-center">{r.s ? yes : no}</span>
          <span className="w-10 text-right text-muted-foreground">{r.c}</span>
        </Row>
      ))}
    </ScreenFrame>
  );
};

/* ── Cloud & SaaS Security: posture + shared files ─────────────────────── */
export const CloudSaasScreen = () => (
  <ScreenFrame
    section="Cloud & SaaS Security" accent="#38bdf8" active={1}
    nav={["Cloud Posture", "Shared Files (SaaS)"]}
  >
    <div className="mb-3 grid grid-cols-2 gap-2 md:grid-cols-4">
      {[
        { p: "Microsoft 365", n: 41 }, { p: "Google Drive", n: 17 }, { p: "Box", n: 6 }, { p: "Dropbox", n: 3 },
      ].map((p) => <Kpi key={p.p} label={p.p} value={String(p.n)} sub="risky shares" />)}
    </div>
    {[
      { f: "Payroll_2026_Q3.xlsx", w: "Anyone with the link", c: SEV.critical },
      { f: "Customer-export.csv", w: "Shared to gmail.com", c: SEV.high },
      { f: "Board pack — October.pdf", w: "External domain", c: SEV.medium },
      { f: "s3://backups-legacy", w: "Public bucket (AWS)", c: SEV.critical },
    ].map((r, i) => (
      <Row key={r.f} i={i}>
        <span className="min-w-0 flex-1 truncate text-foreground">{r.f}</span>
        <Pill color={r.c}>{r.w}</Pill>
      </Row>
    ))}
  </ScreenFrame>
);

/* ── Data Security: DLP + DSPM data catalog ────────────────────────────── */
export const DataSecurityScreen = () => (
  <ScreenFrame
    section="Data Security" accent="#2dd4bf" active={2}
    nav={["Data Protection", "Overview", "Data Catalog", "Findings", "Access", "Hygiene", "Remediation"]}
  >
    <div className="mb-3 grid grid-cols-3 gap-2">
      <Kpi label="Data stores" value="146" />
      <Kpi label="Holding PII" value="23" accent="#2dd4bf" />
      <Kpi label="DLP events (7d)" value="58" accent={SEV.high} />
    </div>
    {[
      { s: "postgres · crm_prod", t: ["PII", "IBAN"], r: "Unencrypted backup", c: SEV.critical },
      { s: "snowflake · analytics", t: ["PII"], r: "47 readers", c: SEV.high },
      { s: "s3 · hr-documents", t: ["BSN", "Health"], r: "Stale 400d", c: SEV.medium },
      { s: "sharepoint · Finance", t: ["Card"], r: "OK", c: SEV.ok },
    ].map((r, i) => (
      <Row key={r.s} i={i}>
        <span className="min-w-0 flex-1 truncate font-mono text-foreground">{r.s}</span>
        <span className="hidden gap-1 md:flex">{r.t.map((t) => <Pill key={t} color="#2dd4bf">{t}</Pill>)}</span>
        <span className="w-28 truncate text-right" style={{ color: r.c }}>{r.r}</span>
      </Row>
    ))}
  </ScreenFrame>
);

/* ── Endpoint Defence: fleet ───────────────────────────────────────────── */
export const EndpointScreen = () => (
  <ScreenFrame
    section="Endpoint Defence" accent="#4d9eff" active={0}
    nav={["Fleet", "Detections", "Policies", "Groups", "Installers"]}
  >
    <div className="mb-3 grid grid-cols-3 gap-2">
      <Kpi label="Online agents" value="842" accent={SEV.ok} />
      <Kpi label="Isolated" value="1" accent={SEV.critical} />
      <Kpi label="Detections (24h)" value="26" />
    </div>
    <div className="mb-3 space-y-1.5">
      {[
        { os: "Windows", pct: 64, c: "#4d9eff" },
        { os: "macOS", pct: 22, c: "#a78bfa" },
        { os: "Linux", pct: 14, c: "#34d399" },
      ].map((o, i) => (
        <div key={o.os} className="flex items-center gap-2 text-[10px]">
          <span className="w-14 text-muted-foreground">{o.os}</span>
          <Bar pct={o.pct} color={o.c} delay={i * 0.1} />
          <span className="w-8 text-right text-muted-foreground">{o.pct}%</span>
        </div>
      ))}
    </div>
    {[
      { h: "FIN-LT-042", d: "LSASS memory access", c: SEV.critical, a: "Isolated" },
      { h: "DEV-MBP-11", d: "Unsigned launch agent", c: SEV.medium, a: "Quarantined" },
    ].map((r, i) => (
      <Row key={r.h} i={i}>
        <span className="w-24 shrink-0 font-mono text-foreground">{r.h}</span>
        <span className="min-w-0 flex-1 truncate text-muted-foreground">{r.d}</span>
        <Pill color={r.c}>{r.a}</Pill>
      </Row>
    ))}
  </ScreenFrame>
);

/* ── AI Security: estate + gateway activity ────────────────────────────── */
export const AiSecurityScreen = () => (
  <ScreenFrame
    section="AI Security" accent="#b06eff" active={2}
    nav={["AI Estate", "Shadow AI", "Threat Activity", "Governance", "Sensors & Access"]}
  >
    <div className="mb-3 grid grid-cols-3 gap-2">
      <Kpi label="AI apps in use" value="31" sub="9 unapproved" />
      <Kpi label="Prompts blocked" value="112" accent={SEV.critical} />
      <Kpi label="Data redacted" value="1.4k" accent="#b06eff" />
    </div>
    {[
      { app: "ChatGPT", e: "Customer IBANs in prompt", a: "Redacted", c: "#b06eff" },
      { app: "Claude", e: "Source code with API key", a: "Blocked", c: SEV.critical },
      { app: "Unknown AI tool", e: "Shadow AI via DNS", a: "Flagged", c: SEV.high },
      { app: "Copilot", e: "Prompt-injection pattern", a: "Blocked", c: SEV.critical },
    ].map((r, i) => (
      <Row key={r.e} i={i}>
        <span className="w-24 shrink-0 truncate font-semibold text-foreground">{r.app}</span>
        <span className="min-w-0 flex-1 truncate text-muted-foreground">{r.e}</span>
        <Pill color={r.c}>{r.a}</Pill>
      </Row>
    ))}
  </ScreenFrame>
);

/* ── Governance & Compliance: framework posture ────────────────────────── */
export const GrcScreen = () => (
  <ScreenFrame
    section="Governance & Compliance" accent="#00c8a0" active={1}
    nav={["GRC Setup", "GRC Posture", "Assessments", "Policy Documents", "Findings & Alerts", "Risk Management", "Forecast", "Processing Register", "GRC Reports"]}
  >
    <div className="space-y-2.5">
      {[
        { f: "NIS2", pct: 84 }, { f: "ISO 27001", pct: 79 }, { f: "DORA", pct: 71 },
        { f: "GDPR", pct: 88 }, { f: "SOC 2", pct: 66 }, { f: "NIST CSF", pct: 74 },
      ].map((r, i) => (
        <div key={r.f} className="flex items-center gap-3 text-[10px]">
          <span className="w-16 shrink-0 text-foreground">{r.f}</span>
          <Bar pct={r.pct} color="#00c8a0" delay={i * 0.08} />
          <span className="w-8 shrink-0 text-right font-semibold text-foreground">{r.pct}%</span>
        </div>
      ))}
    </div>
    <div className="mt-4 rounded-lg border border-border bg-secondary/30 p-2.5 text-[10px] text-muted-foreground">
      <span className="font-semibold text-foreground">Forecast:</span> DORA Art. 9 control likely to drift below threshold in ~3 weeks — 2 open incidents affect it.
    </div>
  </ScreenFrame>
);

/* ── Attack Surface: the real portal screenshot, framed ─────────────────── */
export const ScreenshotScreen = ({ src, alt, section, page }: { src: string; alt: string; section: string; page: string }) => (
  <div className="relative overflow-hidden rounded-2xl border border-border/60 bg-card shadow-2xl">
    <div className="flex items-center gap-2 border-b border-border/60 bg-secondary/40 px-4 py-2.5">
      <span className="h-2.5 w-2.5 rounded-full bg-red-400/70" />
      <span className="h-2.5 w-2.5 rounded-full bg-yellow-400/70" />
      <span className="h-2.5 w-2.5 rounded-full bg-green-400/70" />
      <span className="ml-3 flex items-center gap-1.5 truncate rounded-md bg-background/60 px-3 py-1 text-[11px] text-muted-foreground">
        <Lock className="h-3 w-3 text-primary" /> cy360 · {section} › {page}
      </span>
    </div>
    <img src={src} alt={alt} className="w-full" loading="lazy" />
  </div>
);

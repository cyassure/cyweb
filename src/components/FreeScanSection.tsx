import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Globe, Search, Zap, FileSearch, Check } from "lucide-react";
import SectionHeader from "@/components/SectionHeader";
import DlpScanDialog from "@/components/DlpScanDialog";
import { DOMAIN_COLORS } from "@/lib/domains";
import cablesPhoto from "@/assets/photos/network-cables.jpg";

const ASM = DOMAIN_COLORS.asm;
const DLP = DOMAIN_COLORS.data;

const scanModules = [
  "DNS Reconnaissance",
  "Subdomain Enumeration",
  "SSL / Crypto Analysis",
  "Email Security (SPF/DKIM/DMARC)",
  "Web Exposure & Service Fingerprinting",
  "Cloud Infra Detection",
];

const dlpFindings = [
  "Personal data (BSN, passport, IBAN)",
  "Payment card numbers",
  "API keys, tokens & passwords",
  "Health records",
  "Files shared publicly or outside the company",
  "Password-protected archives & scanned images (OCR)",
];

/* Radar sweep with detected blips: the attacker's view of your domain. */
const RadarVisual = () => (
  <div className="relative flex h-44 w-44 items-center justify-center">
    {[1, 2, 3, 4].map((ring) => (
      <motion.div
        key={ring}
        className="absolute rounded-full border"
        style={{ inset: `${(4 - ring) * 14}%`, borderColor: `${ASM}33` }}
        animate={{ opacity: [0.1, 0.6, 0.1] }}
        transition={{ duration: 2.5, repeat: Infinity, delay: ring * 0.3 }}
      />
    ))}
    <motion.div
      className="absolute inset-0 rounded-full"
      style={{ background: `conic-gradient(from 0deg, transparent 270deg, ${ASM}55 360deg)` }}
      animate={{ rotate: 360 }}
      transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
    />
    <div className="relative z-10 rounded-full border bg-card p-4" style={{ borderColor: `${ASM}66` }}>
      <Globe className="h-7 w-7" style={{ color: ASM }} />
    </div>
    {[
      { top: "15%", left: "68%", delay: 0.5 },
      { top: "60%", left: "80%", delay: 1.2 },
      { top: "75%", left: "30%", delay: 2 },
      { top: "25%", left: "20%", delay: 1.7 },
    ].map((blip, i) => (
      <motion.div
        key={i}
        className="absolute h-2 w-2 rounded-full"
        style={{ top: blip.top, left: blip.left, backgroundColor: ASM }}
        animate={{ opacity: [0, 1, 0], scale: [0.5, 1.5, 0.5] }}
        transition={{ duration: 1.5, repeat: Infinity, delay: blip.delay }}
      />
    ))}
  </div>
);

/* A document being read line by line; sensitive values light up as they're found. */
const docLines: { w: string; hit?: string }[] = [
  { w: "72%" },
  { w: "88%", hit: "BSN" },
  { w: "64%" },
  { w: "80%", hit: "IBAN" },
  { w: "56%" },
  { w: "84%", hit: "API key" },
  { w: "70%" },
];

const DocumentVisual = () => {
  const reduce = useReducedMotion();
  return (
    <div className="relative h-44 w-40 overflow-hidden rounded-md border border-border bg-card px-4 py-4">
      <div className="mb-3 flex items-center gap-2">
        <FileSearch className="h-4 w-4" style={{ color: DLP }} />
        <span className="h-1.5 w-14 rounded-sm bg-muted-foreground/40" />
      </div>
      <div className="space-y-2.5">
        {docLines.map((l, i) => (
          <div key={i} className="relative flex items-center gap-1.5">
            <span className="h-1.5 rounded-sm bg-muted-foreground/25" style={{ width: l.w }} />
            {l.hit && (
              <motion.span
                className="absolute right-0 rounded-sm px-1 font-mono text-[9px] font-semibold leading-tight text-[#07122a]"
                style={{ backgroundColor: DLP }}
                animate={reduce ? undefined : { opacity: [0, 0, 1, 1, 0] }}
                transition={{ duration: 4, repeat: Infinity, times: [0, i / 8, i / 8 + 0.05, 0.9, 1] }}
              >
                {l.hit}
              </motion.span>
            )}
          </div>
        ))}
      </div>
      {!reduce && (
        <motion.div
          className="pointer-events-none absolute left-0 right-0 h-6"
          style={{ background: `linear-gradient(180deg, transparent, ${DLP}40, transparent)` }}
          animate={{ top: ["-10%", "100%"] }}
          transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
        />
      )}
    </div>
  );
};

const FreeScanSection = () => {
  return (
    // Dark island over a photo; the domain colours read at full strength here, so no ink().
    <section id="free-scan" className="theme-dark relative overflow-hidden bg-background py-24">
      <img src={cablesPhoto} alt="" className="absolute inset-0 h-full w-full object-cover" loading="lazy" />
      <div aria-hidden className="absolute inset-0 bg-[linear-gradient(180deg,rgba(7,18,42,0.92),rgba(7,18,42,0.82))]" />
      <div className="container relative mx-auto px-6">
        <SectionHeader
          eyebrow="Free scans"
          title="See what's exposed, inside and out"
          lede="Two free checks from the Cy360 engines: what attackers can see from the internet, and where sensitive data sits in your mailboxes, drives and laptops."
        />

        <div className="grid gap-6 lg:grid-cols-2">
          {/* Attack surface */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col overflow-hidden rounded-lg border bg-card/90 backdrop-blur"
            style={{ borderColor: `${ASM}55` }}
          >
            <div className="h-1" style={{ backgroundColor: ASM }} />
            <div className="flex flex-1 flex-col gap-8 p-8 sm:flex-row">
              <div className="flex-1">
                <p className="mb-3 eyebrow" style={{ color: ASM }}>
                  Attack surface · no account required
                </p>
                <h3 className="mb-3 text-2xl font-semibold leading-tight text-foreground md:text-[1.75rem]">Free Attack Surface Scan</h3>
                <p className="mb-6 text-sm leading-relaxed text-muted-foreground">
                  Discover what attackers can see about your organisation, in minutes. Our CyASM engine runs a passive
                  reconnaissance scan across your domain and delivers an instant risk summary.
                </p>
                <ul className="mb-8 grid gap-2 sm:grid-cols-2">
                  {scanModules.map((mod) => (
                    <li key={mod} className="flex items-start gap-2 text-xs text-muted-foreground">
                      <Search className="mt-0.5 h-3.5 w-3.5 shrink-0" style={{ color: ASM }} />
                      {mod}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="flex justify-center sm:items-start">
                <RadarVisual />
              </div>
            </div>
            <div className="mt-auto px-8 pb-8">
              <a
                href="https://cy360.cyassure.eu/guest-scan"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 rounded-md px-6 py-3 text-sm font-semibold text-[#07122a] transition-all hover:brightness-110"
                style={{ backgroundColor: ASM }}
              >
                <Zap className="h-4 w-4" />
                Start Free ASM Scan
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </a>
              <p className="mt-3 text-xs text-muted-foreground/80">
                Passive scan only · No agents required · Results in &lt; 5 minutes
              </p>
            </div>
          </motion.div>

          {/* Data loss */}
          <motion.div
            id="free-dlp-scan"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="flex flex-col overflow-hidden rounded-lg border bg-card/90 backdrop-blur"
            style={{ borderColor: `${DLP}55` }}
          >
            <div className="h-1" style={{ backgroundColor: DLP }} />
            <div className="flex flex-1 flex-col gap-8 p-8 sm:flex-row">
              <div className="flex-1">
                <p className="mb-3 eyebrow" style={{ color: DLP }}>
                  Data loss · set up with our team
                </p>
                <h3 className="mb-3 text-2xl font-semibold leading-tight text-foreground md:text-[1.75rem]">Free DLP Scan</h3>
                <p className="mb-6 text-sm leading-relaxed text-muted-foreground">
                  Find out where sensitive data is sitting before someone else does. We connect Cy360 read-only to
                  Microsoft 365, Google Workspace or a few endpoints and report what we find, with GDPR and NIS2 context.
                </p>
                <ul className="mb-8 grid gap-2 sm:grid-cols-2">
                  {dlpFindings.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-xs text-muted-foreground">
                      <Check className="mt-0.5 h-3.5 w-3.5 shrink-0" style={{ color: DLP }} />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="flex justify-center sm:items-start">
                <DocumentVisual />
              </div>
            </div>
            <div className="mt-auto px-8 pb-8">
              <DlpScanDialog
                trigger={
                  <button
                    type="button"
                    className="group inline-flex items-center gap-2 rounded-md px-6 py-3 text-sm font-semibold text-[#07122a] transition-all hover:brightness-110"
                    style={{ backgroundColor: DLP }}
                  >
                    <FileSearch className="h-4 w-4" />
                    Request Free DLP Scan
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </button>
                }
              />
              <p className="mt-3 text-xs text-muted-foreground/80">
                Read-only access · No agent needed for Microsoft 365 or Google Workspace
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default FreeScanSection;

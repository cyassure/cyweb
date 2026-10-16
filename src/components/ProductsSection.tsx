import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import {
  ShieldAlert, Bot, Bug, Radar, Boxes, CloudCog, Database, Laptop,
  BrainCircuit, ShieldCheck, LucideIcon, Layers, Brain, Search, Users, Fingerprint,
  FlaskConical, FolderKanban, Zap, Wrench, Ban, Workflow, Gauge, ListChecks, FileCheck,
  Globe, AlertTriangle, ScanEye, Activity, Network, EyeOff, Cloud, Package, Container,
  Lock, Share2, FileLock2, ScanSearch, DatabaseZap, KeyRound, Monitor, SlidersHorizontal,
  Download, Sparkles, Scale, ClipboardList, TrendingUp, FileText, BookOpen, PlayCircle,
} from "lucide-react";
import type { ComponentType } from "react";
import {
  SecOpsScreen, ResponseScreen, VulnScreen, ItamScreen, CloudSaasScreen,
  DataSecurityScreen, EndpointScreen, AiSecurityScreen, GrcScreen, ScreenshotScreen,
} from "@/components/ProductScreens";
import attackPosture from "@/assets/screenshots/attack-posture.jpg";

interface Capability {
  icon: LucideIcon;
  name: string;
  desc: string;
  tag?: string;
}

interface Domain {
  id: string;
  icon: LucideIcon;
  label: string;
  // Same accent colours as the portal sidebar sections.
  color: string;
  headline: string;
  intro: string;
  capabilities: Capability[];
  screen: ComponentType;
  // /docs/<docSlug> and /demos?v=<demoId> — the detail lives there, not here.
  docSlug: string;
  demoId: string;
}

const domains: Domain[] = [
  {
    id: "secops",
    icon: ShieldAlert,
    label: "Security Operations",
    color: "#ff3b3b",
    headline: "From raw events to a handful of real incidents",
    intro: "Every EDR, cloud, firewall and identity event lands in one searchable data lake. Cy360 correlates related signals into a small number of risk-scored, MITRE-mapped incidents, and machine-learning models filter out false positives and flag threats no rule has seen before. Analysts work real cases instead of alert walls.",
    capabilities: [
      { icon: Database, name: "SIEM & Data Lake", desc: "Multi-vendor log ingestion" },
      { icon: Layers, name: "Correlated Incidents", desc: "Risk-scored, MITRE-mapped" },
      { icon: Brain, name: "ML Detection", desc: "Noise reduction & novel threats" },
      { icon: Search, name: "Threat Hunting", desc: "Search historical telemetry" },
      { icon: Users, name: "UEBA", desc: "User & host baselines" },
      { icon: Fingerprint, name: "Identity Timeline", desc: "AD & Entra ID activity" },
      { icon: FlaskConical, name: "Sandbox", desc: "Detonate files & URLs" },
    ],
    screen: SecOpsScreen,
    docSlug: "incidents-and-posture",
    demoId: "11-security-operations",
  },
  {
    id: "response",
    icon: Bot,
    label: "Response & AI Agents",
    color: "#b06eff",
    headline: "Respond, remediate and close the case",
    intro: "Every incident becomes a case with an owner, evidence and an SLA. From there, analysts or AI agents can isolate hosts, kill processes and block hashes, push blocklists to your firewalls as EDL feeds, and apply fixes that Cy360 verifies and rolls back automatically if they fail. Anything risky waits for a human to approve it.",
    capabilities: [
      { icon: FolderKanban, name: "Case Management", desc: "Evidence, owners, SLAs" },
      { icon: Zap, name: "Response Actions", desc: "Isolate, kill, quarantine, block" },
      { icon: Wrench, name: "Self-Remediation", desc: "Fix, verify, auto-rollback" },
      { icon: Ban, name: "EDL Blocklists", desc: "Feeds for your firewalls" },
      { icon: Bot, name: "AI SOC Agents", desc: "Triage, hunt, remediate" },
      { icon: Workflow, name: "SOAR Playbooks", desc: "Automated use cases" },
    ],
    screen: ResponseScreen,
    docSlug: "response-and-remediation",
    demoId: "12-remediation-options",
  },
  {
    id: "vuln",
    icon: Bug,
    label: "Vulnerability Management",
    color: "#ff5c8a",
    headline: "One prioritised queue for every vulnerability",
    intro: "Findings from endpoints, agentless scans and your external attack surface merge into one de-duplicated queue per asset. Cy360 ranks them by real-world exploitation (EPSS and CISA KEV) and asset exposure, not just CVSS, then turns them into owner-ready remediation plans with SLAs and an audit-ready exceptions register.",
    capabilities: [
      { icon: Gauge, name: "Risk-based Priority", desc: "CVSS, EPSS & CISA KEV" },
      { icon: Layers, name: "Unified Findings", desc: "Internal + external, de-duplicated" },
      { icon: ListChecks, name: "Remediation Plan", desc: "Owners & SLAs" },
      { icon: FileCheck, name: "Exceptions", desc: "Audit-ready risk acceptance" },
    ],
    screen: VulnScreen,
    docSlug: "vulnerability-management",
    demoId: "01-vulnerability-management",
  },
  {
    id: "asm",
    icon: Radar,
    label: "Attack Surface",
    color: "#ff8c00",
    headline: "See your organisation the way an attacker does",
    intro: "Starting from your domains and IP ranges, Cy360 continuously discovers everything you expose to the internet and checks it for risky ports, weak TLS, exposed admin portals and subdomain takeover. It also watches for lookalike domains, leaked code and breached credentials, and alerts you the moment something new appears.",
    capabilities: [
      { icon: Globe, name: "Discovery", desc: "Domains, IPs, certificates" },
      { icon: AlertTriangle, name: "Exposures", desc: "Ports, TLS, admin portals" },
      { icon: ScanEye, name: "Digital Risk", desc: "Lookalikes, leaks, dark web" },
      { icon: Activity, name: "Change Tracking", desc: "New hosts as they appear" },
      { icon: Gauge, name: "Benchmarking", desc: "Score vs. industry" },
    ],
    screen: () => (
      <ScreenshotScreen
        src={attackPosture}
        alt="Cy360 Attack Surface overview — live security score, SSL health and infrastructure exposure"
        section="Attack Surface"
        page="Overview"
      />
    ),
    docSlug: "attack-surface",
    demoId: "02-attack-surface",
  },
  {
    id: "itam",
    icon: Boxes,
    label: "Asset Management",
    color: "#f5c518",
    headline: "Every asset, and which ones nobody is watching",
    intro: "Cy360 builds one inventory of laptops, servers, IoT/OT devices and cloud resources from network scans, cloud APIs or your CMDB. It then shows which assets have no EDR agent or SIEM coverage, so blind spots are obvious, and matches installed software to known vulnerabilities.",
    capabilities: [
      { icon: Network, name: "Network Assets", desc: "Including IoT / OT" },
      { icon: EyeOff, name: "Coverage Gaps", desc: "No EDR, no SIEM" },
      { icon: Cloud, name: "Cloud Inventory", desc: "AWS, Azure, GCP" },
      { icon: Package, name: "Software Inventory", desc: "Matched to CVEs" },
    ],
    screen: ItamScreen,
    docSlug: "asset-management",
    demoId: "03-asset-management",
  },
  {
    id: "cloud-saas",
    icon: CloudCog,
    label: "Cloud & SaaS Security",
    color: "#38bdf8",
    headline: "Close the public doors in your cloud and SaaS",
    intro: "Using read-only access to your AWS, Azure and GCP accounts, Cy360 checks the real configuration for public storage, open firewalls, exposed databases, weak Kubernetes settings and missing encryption (CSPM). In Microsoft 365, Google Workspace, Box and Dropbox it finds files shared publicly or outside the company, and raises each issue as an incident.",
    capabilities: [
      { icon: CloudCog, name: "CSPM", desc: "AWS, Azure, GCP misconfigurations" },
      { icon: Container, name: "Kubernetes Posture", desc: "EKS & AKS" },
      { icon: Lock, name: "Data Protection Checks", desc: "Encryption, TLS, logging" },
      { icon: Share2, name: "SaaS Security", desc: "Over-shared files in M365, Google…" },
    ],
    screen: CloudSaasScreen,
    docSlug: "cloud-and-saas-security",
    demoId: "04-cloud-saas-security",
  },
  {
    id: "data",
    icon: Database,
    label: "Data Security & DSPM",
    color: "#2dd4bf",
    headline: "Know where sensitive data lives — and stop it leaving",
    intro: "Data Protection (DLP) stops sensitive data leaving through endpoints, web uploads and AI prompts. The DSPM add-on maps where sensitive data lives across databases, cloud storage and SaaS, shows who can read it and where stale copies sit, and fixes exposure with admin approval and rollback.",
    capabilities: [
      { icon: FileLock2, name: "Data Protection (DLP)", desc: "Endpoint, web, AI, Purview" },
      { icon: ScanSearch, name: "Detection Packs & EDM", desc: "Patterns & fingerprints" },
      { icon: DatabaseZap, name: "Data Catalog", desc: "Databases, storage, SaaS", tag: "DSPM" },
      { icon: KeyRound, name: "Access & Hygiene", desc: "Who can read what", tag: "DSPM" },
      { icon: Wrench, name: "Data Remediation", desc: "Approved, with rollback", tag: "DSPM" },
    ],
    screen: DataSecurityScreen,
    docSlug: "data-security",
    demoId: "05-data-security",
  },
  {
    id: "endpoint",
    icon: Laptop,
    label: "Endpoint Defence",
    color: "#4d9eff",
    headline: "A cross-platform EDR agent, managed from one console",
    intro: "CyEDR is a lightweight agent for Windows, macOS and Linux that collects process, file and network telemetry. Detections combine YARA, Sysmon and machine-learning classifiers, policies are set per group, and every agent's health and coverage is visible in one console.",
    capabilities: [
      { icon: Monitor, name: "Fleet", desc: "Health, versions, isolation" },
      { icon: Brain, name: "Detections", desc: "YARA, Sysmon & ML" },
      { icon: SlidersHorizontal, name: "Policies & Groups", desc: "Per-group policy" },
      { icon: Download, name: "Installers", desc: "Signed, MDM-ready" },
    ],
    screen: EndpointScreen,
    docSlug: "endpoint-defence",
    demoId: "06-endpoint-defense",
  },
  {
    id: "ai",
    icon: BrainCircuit,
    label: "AI Security",
    color: "#b06eff",
    headline: "Use AI safely — and see the AI you didn't approve",
    intro: "Cy360 discovers every AI tool in use across the organisation — approved or not — from network, DNS, endpoint and browser signals. The AI Gateway enforces policy in front of each provider, redacting sensitive data and blocking prompt injection before anything leaves, with a full audit trail.",
    capabilities: [
      { icon: Sparkles, name: "AI Estate", desc: "Apps, models, providers" },
      { icon: EyeOff, name: "Shadow AI", desc: "Unapproved AI tools" },
      { icon: ShieldAlert, name: "Threat Activity", desc: "Prompt DLP & injection" },
      { icon: Scale, name: "Governance", desc: "Policies & approvals" },
      { icon: Lock, name: "AI Gateway", desc: "Local or cloud models" },
    ],
    screen: AiSecurityScreen,
    docSlug: "ai-security",
    demoId: "07-ai-security",
  },
  {
    id: "grc",
    icon: ShieldCheck,
    label: "Governance & Compliance",
    color: "#00c8a0",
    headline: "Compliance posture that updates itself",
    intro: "Controls for NIS2, ISO 27001, DORA, SOC 2, NIST CSF, PCI DSS and GDPR are scored continuously from real findings and incidents. Assessments, policies, the risk register and the GDPR processing register sit next to the evidence, and a forecast warns you which controls are drifting before the audit does.",
    capabilities: [
      { icon: Gauge, name: "GRC Posture", desc: "NIS2, ISO 27001, DORA…" },
      { icon: ClipboardList, name: "Assessments & Policies", desc: "AI-assisted analysis" },
      { icon: AlertTriangle, name: "Findings & Risk", desc: "Auto-raised risk register" },
      { icon: TrendingUp, name: "Forecast", desc: "Drift before the audit" },
      { icon: FileText, name: "GDPR Register", desc: "Processing & residency" },
      { icon: FileCheck, name: "GRC Reports", desc: "Board & auditor ready" },
    ],
    screen: GrcScreen,
    docSlug: "governance-and-compliance",
    demoId: "08-governance-compliance",
  },
];

const ProductsSection = () => {
  const [activeId, setActiveId] = useState(domains[0].id);
  const active = domains.find((d) => d.id === activeId) ?? domains[0];

  // Deep links like /#products-vuln open that domain's tab.
  useEffect(() => {
    const syncFromHash = () => {
      const id = window.location.hash.replace(/^#products-/, "");
      if (domains.some((d) => d.id === id)) {
        setActiveId(id);
        document.getElementById("products")?.scrollIntoView({ behavior: "smooth" });
      }
    };
    syncFromHash();
    window.addEventListener("hashchange", syncFromHash);
    return () => window.removeEventListener("hashchange", syncFromHash);
  }, []);

  return (
    <section id="products" className="relative py-24">
      <div className="absolute inset-0 grid-pattern opacity-20" />
      <div className="absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/3 blur-[140px]" />

      <div className="container relative mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 text-center"
        >
          <p className="mb-3 text-xs font-medium uppercase tracking-[0.2em] text-primary">The Cy360 Platform</p>
          <h2 className="mb-4 font-heading text-3xl font-bold text-foreground md:text-5xl">
            Every function your SOC needs
          </h2>
          <p className="mx-auto max-w-2xl text-muted-foreground">
            Ten security domains, one console. Pick one to explore.
          </p>
        </motion.div>

        {/* Domain tabs */}
        <div className="-mx-6 mb-10 overflow-x-auto px-6 lg:mx-0 lg:px-0">
          <div role="tablist" aria-label="Platform domains" className="flex w-max gap-2 lg:w-auto lg:flex-wrap lg:justify-center">
            {domains.map((d) => {
              const isActive = d.id === active.id;
              return (
                <button
                  key={d.id}
                  role="tab"
                  aria-selected={isActive}
                  aria-controls={`domain-${d.id}`}
                  onClick={() => setActiveId(d.id)}
                  className={`flex items-center gap-2 whitespace-nowrap rounded-full border px-4 py-2 text-sm transition-all ${
                    isActive ? "font-semibold text-foreground" : "border-border bg-card/60 text-muted-foreground hover:text-foreground"
                  }`}
                  style={isActive ? { borderColor: `${d.color}99`, backgroundColor: `${d.color}1a` } : undefined}
                >
                  <d.icon className="h-4 w-4" style={{ color: d.color }} />
                  {d.label}
                </button>
              );
            })}
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={active.id}
            id={`domain-${active.id}`}
            role="tabpanel"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3 }}
            className="grid items-start gap-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)]"
          >
            <div>
              <div className="mb-4 flex items-center gap-3">
                <div
                  className="flex h-11 w-11 items-center justify-center rounded-xl border"
                  style={{ borderColor: `${active.color}66`, backgroundColor: `${active.color}1a` }}
                >
                  <active.icon className="h-5 w-5" style={{ color: active.color }} />
                </div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em]" style={{ color: active.color }}>
                  {active.label}
                </p>
              </div>
              <h3 className="mb-3 font-heading text-2xl font-bold text-foreground md:text-3xl">{active.headline}</h3>
              <p className="mb-6 text-sm leading-relaxed text-muted-foreground">{active.intro}</p>

              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                {active.capabilities.map((c) => (
                  <div
                    key={c.name}
                    className="flex flex-col gap-2 rounded-xl border border-border bg-card p-3 transition-colors hover:border-primary/40"
                  >
                    <c.icon className="h-5 w-5" style={{ color: active.color }} />
                    <p className="flex flex-wrap items-center gap-1.5 text-xs font-semibold leading-snug text-foreground">
                      {c.name}
                      {c.tag && (
                        <span className="rounded-full border border-border bg-secondary/60 px-1.5 py-px text-[9px] font-medium text-muted-foreground">
                          {c.tag}
                        </span>
                      )}
                    </p>
                    <p className="text-[11px] leading-snug text-muted-foreground">{c.desc}</p>
                  </div>
                ))}
              </div>

              <div className="mt-6 flex flex-wrap gap-4 text-sm">
                <Link to={`/docs/${active.docSlug}`} className="flex items-center gap-1.5 text-primary hover:underline">
                  <BookOpen className="h-4 w-4" /> Read the docs
                </Link>
                <Link to={`/demos?v=${active.demoId}`} className="flex items-center gap-1.5 text-primary hover:underline">
                  <PlayCircle className="h-4 w-4" /> Watch the demo
                </Link>
              </div>
            </div>

            <div className="relative lg:sticky lg:top-28">
              <div
                className="absolute -inset-4 rounded-[2rem] opacity-40 blur-2xl"
                style={{ background: `radial-gradient(circle at 50% 40%, ${active.color}55, transparent 70%)` }}
              />
              <div className="relative">
                <active.screen />
              </div>
              <p className="mt-3 text-center text-[11px] text-muted-foreground/70">Illustrative data</p>
            </div>
          </motion.div>
        </AnimatePresence>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-14 text-center"
        >
          <p className="text-sm text-muted-foreground">
            Self-hosted in Community or Enterprise, or delivered as SaaS.{" "}
            <Link to="/editions" className="text-primary underline underline-offset-4">Compare editions →</Link>
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default ProductsSection;

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import {
  ShieldAlert, Bot, Bug, Radar, Boxes, CloudCog, Database, Laptop,
  BrainCircuit, ShieldCheck, Check, LucideIcon,
} from "lucide-react";
import type { ComponentType } from "react";
import {
  SecOpsScreen, ResponseScreen, VulnScreen, ItamScreen, CloudSaasScreen,
  DataSecurityScreen, EndpointScreen, AiSecurityScreen, GrcScreen, ScreenshotScreen,
} from "@/components/ProductScreens";
import attackPosture from "@/assets/screenshots/attack-posture.jpg";

interface Capability {
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
}

const domains: Domain[] = [
  {
    id: "secops",
    icon: ShieldAlert,
    label: "Security Operations",
    color: "#ff3b3b",
    headline: "From raw events to a handful of real incidents",
    intro: "Every EDR, attack-surface, cloud and connector event lands in one data lake. The correlation engine groups related signals into investigable incidents and suppresses the noise with ML — so analysts work cases, not alert walls.",
    capabilities: [
      { name: "SIEM & Data Lake", desc: "Multi-vendor ingestion (AWS, Azure, GCP, M365, Palo Alto, SentinelOne, Splunk, QRadar…) into a queryable raw event lake." },
      { name: "Correlated Incidents", desc: "Sigma and correlation rules, false-positive classifier, risk scoring and MITRE ATT&CK mapping on every incident." },
      { name: "Threat Hunting", desc: "Hypothesis-driven search across historical telemetry — pivot on an indicator and confirm whether a technique was ever used." },
      { name: "Behavior Analysis (UEBA)", desc: "Per-user and per-service baselines catch impossible travel, odd login times and atypical data access." },
      { name: "Identity Timeline", desc: "Active Directory and Entra ID activity for any user, stitched into one chronological view." },
      { name: "Sandbox Analysis", desc: "Detonate a file, URL or hash straight from an incident or case, with CyTIM threat-intel enrichment." },
      { name: "Machine Learning Detection", desc: "False-positive classifier, DGA-domain and obfuscated-command models, network beaconing, semantic novelty scoring and zero-shot MITRE matching — with real precision/recall tracked per model in the Model Center." },
      { name: "Federated Learning", desc: "Opt in to share model weights — never raw events — so small deployments start from a global baseline that improves with the fleet." },
    ],
    screen: SecOpsScreen,
  },
  {
    id: "response",
    icon: Bot,
    label: "Response & AI Agents",
    color: "#b06eff",
    headline: "Respond, remediate and close the case — with a human in the loop",
    intro: "Automation Agents are SOC-analyst personas that triage, investigate and resolve. Response actions, self-remediation and EDL blocklists turn a verdict into containment, while every incident is tracked as a case through to closure.",
    capabilities: [
      { name: "Case Management", desc: "Incidents become cases with evidence, timelines, assignees (people or AI agents), SLA watchdog and a full audit trail." },
      { name: "Response Actions", desc: "Isolate or network-quarantine hosts, kill or throttle processes, quarantine files, block hashes, disable accounts, revoke sessions and collect forensics — each with history and rollback." },
      { name: "Self-Remediation", desc: "Cy360 proposes the fix for a vulnerability, hardening failure or anomaly; the agent backs up, applies, verifies and restores automatically if it fails — signed, canary-first, with one-click rollback." },
      { name: "EDL Blocklists", desc: "Curate IP, domain and hash blocklists, enforce them on CyEDR agents and publish them as External Dynamic List feeds for your perimeter firewalls — per-tenant token and IP allowlist." },
      { name: "AI Agents & Autonomy Tiers", desc: "Triage, hunting and remediation personas powered by CyMind — you decide what an agent may do alone and what needs an analyst's sign-off." },
      { name: "SOAR Playbooks", desc: "CySOAR from the Marketplace, pre-loaded with phishing, brute-force and IOC-enrichment use cases, with case-gated auto-dispatch." },
    ],
    screen: ResponseScreen,
  },
  {
    id: "vuln",
    icon: Bug,
    label: "Vulnerability Management",
    color: "#ff5c8a",
    headline: "One prioritised queue for every vulnerability you have",
    intro: "Findings from CyEDR and agentless inventory, external attack-surface scans and Marketplace vulnerability sources merge into a single queue — ranked by what is actually being exploited, not just by CVSS.",
    capabilities: [
      { name: "Risk-based Priority", desc: "CVSS, EPSS and CISA KEV combined with asset exposure and criticality decide what to fix first." },
      { name: "Unified Findings", desc: "Internal and external findings de-duplicated per asset, with first-seen dates and affected software." },
      { name: "Remediation Plan", desc: "Group fixes into owner-ready work with SLAs per severity and breach tracking." },
      { name: "Exceptions Register", desc: "Accepted risks, mitigations and false positives — each with a reason and review date that reopens it. Audit-ready for ISO 27001 A.8.8, NIS2 and PCI." },
      { name: "Sources & Policy", desc: "Choose scanners and data sources, schedules and SLA policy per tenant." },
    ],
    screen: VulnScreen,
  },
  {
    id: "asm",
    icon: Radar,
    label: "Attack Surface",
    color: "#ff8c00",
    headline: "See your organisation the way an attacker does",
    intro: "Continuous external attack-surface management built around the CTEM cycle: scope, discover, inventory, prioritise, monitor and validate — with exposures flowing straight into Vulnerability Management.",
    capabilities: [
      { name: "Discovery", desc: "Expand seeds — domains, CIDRs, ASNs, organisation names — into related assets via certificate and routing intelligence." },
      { name: "Exposures", desc: "Fix order and score drivers across DNS, TLS, open ports, exposed admin portals (Fortinet, Citrix, Ivanti…) and subdomain takeover." },
      { name: "Digital Risk", desc: "Lookalike domains, code leaks, breached credentials, dark-web mentions and exposed people." },
      { name: "Changes", desc: "A change log of your external surface — new hosts, ports and certificates the moment they appear." },
      { name: "Scans", desc: "Nuclei and optional OpenVAS deep scans, only against domains you have verified you own." },
      { name: "Security Benchmarking", desc: "Posture score over time and against industry baselines." },
    ],
    screen: () => (
      <ScreenshotScreen
        src={attackPosture}
        alt="Cy360 Attack Surface overview — live security score, SSL health and infrastructure exposure"
        section="Attack Surface"
        page="Overview"
      />
    ),
  },
  {
    id: "itam",
    icon: Boxes,
    label: "Asset Management",
    color: "#f5c518",
    headline: "Every asset, and which ones nobody is watching",
    intro: "One unified inventory of IT, IoT/OT and cloud assets — correlated with EDR and SIEM coverage, so the gaps are obvious. Build it from subnet scans, cloud APIs or your CMDB.",
    capabilities: [
      { name: "Network Assets", desc: "Laptops, servers, printers, cameras and industrial controllers fingerprinted on your network — including IoT/OT that agents can't reach." },
      { name: "Coverage Gaps", desc: "See at a glance which assets have an EDR agent, which feed the SIEM and which are invisible to both." },
      { name: "Cloud Inventory", desc: "AWS, Azure and GCP resources pulled from your own accounts with read-only credentials." },
      { name: "Software Inventory", desc: "Installed software per asset, matched to CVEs for Vulnerability Management." },
    ],
    screen: ItamScreen,
  },
  {
    id: "cloud-saas",
    icon: CloudCog,
    label: "Cloud & SaaS Security",
    color: "#38bdf8",
    headline: "Close the public doors in your cloud and SaaS",
    intro: "Cloud Security Posture Management (CSPM) reads the real configuration of your own cloud accounts, and SaaS exposure scanning finds files shared too widely — read-only and metadata-only, with findings raised as incidents.",
    capabilities: [
      { name: "Cloud Posture (CSPM)", desc: "Public buckets, open security groups and NSGs, internet-wide database firewalls, public snapshots and images across AWS, Azure and GCP." },
      { name: "Kubernetes Posture", desc: "Managed cluster checks for EKS and AKS alongside the rest of your cloud estate." },
      { name: "Data Protection Checks", desc: "Unencrypted storage, databases and volumes, missing customer-managed keys, weak TLS and logging gaps — shared with DSPM." },
      { name: "SaaS Security", desc: "Files shared publicly, to external domains or to personal accounts in Microsoft 365, Google Workspace, Box and Dropbox." },
      { name: "Cloud Inventory", desc: "Every posture finding tied to its resource in your AWS, Azure and GCP inventory, pulled with read-only credentials." },
    ],
    screen: CloudSaasScreen,
  },
  {
    id: "data",
    icon: Database,
    label: "Data Security & DSPM",
    color: "#2dd4bf",
    headline: "Know where sensitive data lives — and stop it leaving",
    intro: "Data Protection (DLP) covers every exit: endpoints, web uploads, AI prompts and Microsoft Purview. DSPM maps where sensitive data sits across cloud, SaaS and databases, who can read it, and how to fix it.",
    capabilities: [
      { name: "Data Protection (DLP)", desc: "Endpoint content DLP, web-upload DLP, AI Gateway leaks and Office 365 / Purview events in one place." },
      { name: "Detection Packs & EDM", desc: "Built-in and signed Marketplace packs, Exact Data Match and document fingerprints, plus an AI-assisted pattern builder." },
      { name: "Data Catalog", desc: "Every data store — PostgreSQL, MySQL, SQL Server, Snowflake, object storage and SaaS — with its sensitivity and protections.", tag: "DSPM add-on" },
      { name: "Access & Hygiene", desc: "Who can read sensitive data, risky grants, and duplicated or stale copies.", tag: "DSPM add-on" },
      { name: "Data Remediation", desc: "Fix data-store exposure with two-admin approval and rollback, using hosted or in-environment scanners.", tag: "DSPM add-on" },
    ],
    screen: DataSecurityScreen,
  },
  {
    id: "endpoint",
    icon: Laptop,
    label: "Endpoint Defence",
    color: "#4d9eff",
    headline: "A cross-platform EDR agent, managed from one console",
    intro: "CyEDR runs on Windows, macOS and Linux — collecting process, file and network telemetry, applying policy per group and responding automatically.",
    capabilities: [
      { name: "Fleet", desc: "Health, versions and coverage for every agent, with one-click isolation." },
      { name: "Detections", desc: "YARA, Sysmon and ML classifiers for command lines, DGA domains and JA3 drift — not just static signatures." },
      { name: "Policies & Groups", desc: "Per-group detection, data protection, log collection and response policy." },
      { name: "Installers", desc: "Signed installers and deployment tokens for scripted or MDM roll-out." },
    ],
    screen: EndpointScreen,
  },
  {
    id: "ai",
    icon: BrainCircuit,
    label: "AI Security",
    color: "#b06eff",
    headline: "Use AI safely — and see the AI you didn't approve",
    intro: "A policy-enforced AI Gateway, a managed browser extension and a cloud sensor give you one view of every AI tool in use and one place to govern it.",
    capabilities: [
      { name: "AI Estate", desc: "Every AI application, model and provider in use across the organisation." },
      { name: "Shadow AI", desc: "Unapproved AI tools detected from network, DNS, endpoint and browser signals." },
      { name: "Threat Activity", desc: "Prompt DLP, prompt-injection detection and anomalies — redact or block before data leaves." },
      { name: "Governance", desc: "Allow/deny policies per tool and team, with approval workflows and a full audit trail." },
      { name: "Sensors & Access", desc: "AI Gateway keys, browser extension and cloud sensor — local models or routed to the cloud." },
    ],
    screen: AiSecurityScreen,
  },
  {
    id: "grc",
    icon: ShieldCheck,
    label: "Governance & Compliance",
    color: "#00c8a0",
    headline: "Compliance posture that updates itself",
    intro: "Controls are scored from real findings and incidents, not a spreadsheet. Assessments, policies, risks and the GDPR processing register live next to the security data that proves them.",
    capabilities: [
      { name: "GRC Posture", desc: "Live scoring across NIS2, ISO 27001, DORA, SOC 2, NIST CSF, PCI DSS and GDPR." },
      { name: "Assessments & Policies", desc: "Guided questionnaires and AI analysis of your policy documents against each framework." },
      { name: "Findings & Risk", desc: "Findings auto-raised from security events, feeding a risk register synced with exposure data." },
      { name: "Forecast", desc: "Predicts which controls are drifting toward non-compliance before the audit does." },
      { name: "Processing Register", desc: "GDPR records of processing with data-residency tracking." },
      { name: "GRC Reports", desc: "Board- and auditor-ready reports, with an AI copilot to draft them." },
    ],
    screen: GrcScreen,
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
            One platform, one console, one data lake — ten security domains that share the same assets, incidents and intelligence.
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

              <ul className="space-y-3">
                {active.capabilities.map((c) => (
                  <li key={c.name} className="flex gap-3">
                    <Check className="mt-0.5 h-4 w-4 shrink-0" style={{ color: active.color }} />
                    <div>
                      <p className="flex flex-wrap items-center gap-2 text-sm font-semibold text-foreground">
                        {c.name}
                        {c.tag && (
                          <span className="rounded-full border border-border bg-secondary/60 px-2 py-0.5 text-[10px] font-medium text-muted-foreground">
                            {c.tag}
                          </span>
                        )}
                      </p>
                      <p className="text-sm leading-relaxed text-muted-foreground">{c.desc}</p>
                    </div>
                  </li>
                ))}
              </ul>
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

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import {
  ShieldAlert, Bot, Bug, Radar, Boxes, CloudCog, Database, Laptop,
  BrainCircuit, ShieldCheck, LucideIcon, BookOpen, PlayCircle,
} from "lucide-react";
import type { ComponentType } from "react";
import {
  SecOpsScreen, ResponseScreen, VulnScreen, ItamScreen, CloudSaasScreen,
  DataSecurityScreen, EndpointScreen, AiSecurityScreen, GrcScreen, ScreenshotScreen,
} from "@/components/ProductScreens";
import attackPosture from "@/assets/screenshots/attack-posture.jpg";

interface Domain {
  id: string;
  icon: LucideIcon;
  label: string;
  // Same accent colours as the portal sidebar sections.
  color: string;
  headline: string;
  // **Name** marks a capability; rendered highlighted in the domain colour.
  intro: string;
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
    intro: "Every EDR, cloud, firewall and identity event lands in one **SIEM & Data Lake**. Cy360 groups related signals into risk-scored, MITRE-mapped **Correlated Incidents**, while **ML Detection** filters false positives and flags novel threats. Analysts dig deeper with **Threat Hunting**, **Behaviour Analysis (UEBA)**, the **Identity Timeline** and **Sandbox** detonation.",
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
    intro: "Every incident is tracked in **Case Management** with an owner, evidence and an SLA. Analysts or **AI SOC Agents** take **Response Actions** — isolate hosts, kill processes, block hashes — push **EDL Blocklists** to your firewalls, and run **Self-Remediation** that verifies each fix and rolls back if it fails. **SOAR Playbooks** automate the routine work; anything risky waits for human approval.",
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
    intro: "Findings from endpoints, agentless scans and your external attack surface merge into **Unified Findings**, de-duplicated per asset. **Risk-based Priority** ranks them by EPSS, CISA KEV and exposure rather than CVSS alone, the **Remediation Plan** assigns owners and SLAs, and the **Exceptions** register keeps accepted risks audit-ready.",
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
    intro: "Starting from your domains and IP ranges, **Discovery** continuously finds everything you expose to the internet. **Exposures** flags risky ports, weak TLS and open admin portals, **Digital Risk** watches for lookalike domains, code leaks and breached credentials, **Change Tracking** alerts on new hosts the moment they appear, and **Benchmarking** scores you against your industry.",
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
    intro: "Cy360 builds one inventory from **Network Assets** — including IoT/OT devices agents can't reach — and **Cloud Inventory** across AWS, Azure and GCP. **Coverage Gaps** shows which assets have no EDR or SIEM coverage, and **Software Inventory** matches installed software to known vulnerabilities.",
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
    intro: "With read-only access to your AWS, Azure and GCP accounts, **CSPM** checks the real configuration for public storage, open firewalls and exposed databases, alongside **Kubernetes Posture** for EKS and AKS and **Data Protection Checks** for missing encryption and logging. **SaaS Security** finds files shared publicly or outside the company in Microsoft 365, Google Workspace, Box and Dropbox.",
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
    intro: "**Data Protection (DLP)** stops sensitive data leaving through endpoints, web uploads, AI prompts and Microsoft Purview, using **Detection Packs & EDM** fingerprints. The **DSPM** add-on adds a **Data Catalog** of every database, bucket and SaaS store, **Access & Hygiene** to show who can read what, and **Data Remediation** with admin approval and rollback.",
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
    intro: "CyEDR is a lightweight agent for Windows, macOS and Linux. The **Fleet** view shows every agent's health and coverage with one-click isolation, **Detections** combine CyScan file-scanning rules, Sysmon and machine-learning classifiers, **Policies & Groups** set behaviour per team, and signed **Installers** are ready for scripted or MDM roll-out.",
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
    intro: "The **AI Estate** lists every AI application, model and provider in use, and **Shadow AI** detects the tools nobody approved. **Threat Activity** catches prompt DLP violations and prompt injection, **Governance** sets allow/deny policy per tool and team, and the **AI Gateway** enforces it in front of local or cloud models.",
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
    intro: "**GRC Posture** scores NIS2, ISO 27001, DORA, SOC 2, NIST CSF, PCI DSS and GDPR continuously from real findings. **Assessments & Policies** use AI to check your documents, **Findings & Risk** feed the risk register, the **Forecast** warns which controls are drifting, and the **GDPR Register** and **GRC Reports** are ready for auditors and the board.",
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
              <p className="text-sm leading-relaxed text-muted-foreground md:text-base">
                {active.intro.split("**").map((part, i) =>
                  i % 2 ? (
                    <strong key={i} className="font-semibold" style={{ color: active.color }}>{part}</strong>
                  ) : (
                    part
                  )
                )}
              </p>

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

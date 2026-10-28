import {
  Rocket, Server, HelpCircle, LucideIcon, Compass, LayoutGrid, ShieldAlert, Siren, Bot,
  SlidersHorizontal, Search, Bug, Radar, Boxes, CloudCog, Database, Laptop, BrainCircuit,
  ShieldCheck, Folder, Store, Settings, HeartPulse, Network, Wrench, Plug, UserCheck,
} from "lucide-react";
import { DOMAIN_COLORS, type DomainId } from "@/lib/domains";

// Raw-imported at build time via Vite's `?raw` — no runtime fetch, no cross-repo
// build dependency. Content is a hand-curated, customer-safe allowlist written
// from the Cy360 product repo's portal and docs — see src/content/docs/ for the
// source files. Screenshots live in public/docs-img/ (taken from a live portal,
// with e-mail addresses, IP addresses and host names masked).
import quickStart from "@/content/docs/quick-start.md?raw";
import dockerDeployment from "@/content/docs/docker-deployment.md?raw";
import faq from "@/content/docs/faq.md?raw";
import portalBasics from "@/content/docs/portal-basics.md?raw";
import dashboards from "@/content/docs/dashboards-and-reports.md?raw";
import incidents from "@/content/docs/incidents-and-posture.md?raw";
import response from "@/content/docs/response-and-remediation.md?raw";
import aiAgents from "@/content/docs/ai-agents.md?raw";
import detection from "@/content/docs/detection-rules-and-context.md?raw";
import investigations from "@/content/docs/investigations.md?raw";
import vulnMgmt from "@/content/docs/vulnerability-management.md?raw";
import attackSurface from "@/content/docs/attack-surface.md?raw";
import assetMgmt from "@/content/docs/asset-management.md?raw";
import cloudSaas from "@/content/docs/cloud-and-saas-security.md?raw";
import dataSecurity from "@/content/docs/data-security.md?raw";
import endpointDefence from "@/content/docs/endpoint-defence.md?raw";
import aiSecurity from "@/content/docs/ai-security.md?raw";
import grc from "@/content/docs/governance-and-compliance.md?raw";
import privacyOps from "@/content/docs/privacy-operations.md?raw";
import cases from "@/content/docs/case-management.md?raw";
import marketplace from "@/content/docs/marketplace.md?raw";
import integrationSetup from "@/content/docs/integration-setup.md?raw";
import mcpIntegrations from "@/content/docs/mcp-integrations.md?raw";
import settings from "@/content/docs/settings.md?raw";
import systemHealth from "@/content/docs/system-health.md?raw";
import architecture from "@/content/docs/architecture.md?raw";
import troubleshooting from "@/content/docs/troubleshooting.md?raw";

export type DocCategory = "Get started" | "User guide" | "Administration" | "Architecture & troubleshooting";

export const DOC_CATEGORIES: { name: DocCategory; blurb: string }[] = [
  { name: "Get started", blurb: "Install Cy360, log in and find your way around." },
  { name: "User guide", blurb: "Every section of the portal: what each page and tab is for, and how to use it." },
  { name: "Administration", blurb: "Settings, integrations and keeping the platform healthy." },
  { name: "Architecture & troubleshooting", blurb: "How Cy360 is built, and what to do when something isn't working." },
];

export interface DocEntry {
  slug: string;
  title: string;
  description: string;
  icon: LucideIcon;
  category: DocCategory;
  content: string;
}

export const docs: DocEntry[] = [
  // ── Get started ──────────────────────────────────────────────────────────
  { slug: "quick-start", category: "Get started", icon: Rocket, content: quickStart,
    title: "Quick Start",
    description: "The three-step version — pick a version, run one command, log in." },
  { slug: "docker-deployment", category: "Get started", icon: Server, content: dockerDeployment,
    title: "Deployment Guide",
    description: "Full technical reference — sizing, environment variables, backups, upgrades." },
  { slug: "portal-basics", category: "Get started", icon: Compass, content: portalBasics,
    title: "Portal Basics",
    description: "The sidebar, favourites, tenants, roles, editions and the CyMind assistant." },
  { slug: "faq", category: "Get started", icon: HelpCircle, content: faq,
    title: "FAQ",
    description: "Common questions about editions, licensing, data, and support." },

  // ── User guide ───────────────────────────────────────────────────────────
  { slug: "dashboards-and-reports", category: "User guide", icon: LayoutGrid, content: dashboards,
    title: "Dashboards & Reports",
    description: "Command Center, Benchmark, MITRE ATT&CK lifecycle, Custom Dashboard and Reports." },
  { slug: "incidents-and-posture", category: "User guide", icon: ShieldAlert, content: incidents,
    title: "Security Posture & Incidents",
    description: "The two incident queues, triage, kill-chain stage, AI auto-close and exposures." },
  { slug: "response-and-remediation", category: "User guide", icon: Siren, content: response,
    title: "Response & Remediation",
    description: "Containment actions, command history, interactive shell and approved fixes." },
  { slug: "ai-agents", category: "User guide", icon: Bot, content: aiAgents,
    title: "AI Agents",
    description: "AI analyst personas, control modes, approvals, autonomy tiers and forensic investigations." },
  { slug: "detection-rules-and-context", category: "User guide", icon: SlidersHorizontal, content: detection,
    title: "Detection Rules & Context",
    description: "CyLogic, CyScan, correlation, UEBA, noise tuning and declaring what is normal." },
  { slug: "investigations", category: "User guide", icon: Search, content: investigations,
    title: "Investigations",
    description: "Alerts (CyDataLake), threat hunting, identity timeline, sandbox and UEBA." },
  { slug: "vulnerability-management", category: "User guide", icon: Bug, content: vulnMgmt,
    title: "Vulnerability Management",
    description: "One prioritised queue for every vulnerability — priority, SLA, remediation plan, exceptions." },
  { slug: "attack-surface", category: "User guide", icon: Radar, content: attackSurface,
    title: "Attack Surface",
    description: "External discovery, inventory, exposures, digital risk, change log and scans." },
  { slug: "asset-management", category: "User guide", icon: Boxes, content: assetMgmt,
    title: "Asset Management",
    description: "Network Assets (zones, VLANs, topology, segmentation) and Cloud Inventory." },
  { slug: "cloud-and-saas-security", category: "User guide", icon: CloudCog, content: cloudSaas,
    title: "Cloud & SaaS Security",
    description: "Cloud Posture (CSPM) with identity and logging checks, SaaS Posture (SSPM) for Microsoft 365, Google, Okta, GitHub, Slack and Salesforce, Shadow IT and Cloud Apps (CASB)." },
  { slug: "data-security", category: "User guide", icon: Database, content: dataSecurity,
    title: "Data Security",
    description: "Classification and DLP across endpoints, email, web and AI sites, all-channel DLP policies, DLP Activity, Email DLP, and DSPM with Data Activity and data-access alerts." },
  { slug: "endpoint-defence", category: "User guide", icon: Laptop, content: endpointDefence,
    title: "Endpoint Defence (CyEDR)",
    description: "Fleet, detections, policies, groups and agent installers." },
  { slug: "ai-security", category: "User guide", icon: BrainCircuit, content: aiSecurity,
    title: "AI Security",
    description: "AI estate, Shadow AI, AI threat activity, governance policies and sensors." },
  { slug: "governance-and-compliance", category: "User guide", icon: ShieldCheck, content: grc,
    title: "Governance & Compliance",
    description: "GRC setup, posture, assessments, policies, findings, risk, forecast, RoPA and reports." },
  { slug: "privacy-operations", category: "User guide", icon: UserCheck, content: privacyOps,
    title: "Privacy Operations",
    description: "DPDP notices, consent, rights requests, grievances, Consent Managers and breach intimation." },
  { slug: "case-management", category: "User guide", icon: Folder, content: cases,
    title: "Case Management",
    description: "Tracked investigations with comments, IOCs, evidence, checklists and SLA metrics." },

  // ── Administration ───────────────────────────────────────────────────────
  { slug: "marketplace", category: "Administration", icon: Store, content: marketplace,
    title: "Marketplace",
    description: "Install and configure signed integrations, context sources and playbooks." },
  { slug: "integration-setup", category: "Administration", icon: Plug, content: integrationSetup,
    title: "Integration Setup Guides",
    description: "What to enable on the vendor side and in Cy360 for AWS CloudTrail, Entra ID, Office 365, Microsoft 365 Shared Files, Microsoft 365 / Google Workspace Email DLP and GitHub." },
  { slug: "mcp-integrations", category: "Administration", icon: Plug, content: mcpIntegrations,
    title: "MCP Integrations",
    description: "Connect AI assistants and other platforms to Cy360, and Cy360 to any platform with an MCP server." },
  { slug: "settings", category: "Administration", icon: Settings, content: settings,
    title: "Settings",
    description: "Every Settings tab — updates, licence, domains, AI, users and roles, backups and more." },
  { slug: "system-health", category: "Administration", icon: HeartPulse, content: systemHealth,
    title: "System Health",
    description: "Server status, audit trail, integration health, Model Center and AI routing." },

  // ── Architecture & troubleshooting ───────────────────────────────────────
  { slug: "architecture", category: "Architecture & troubleshooting", icon: Network, content: architecture,
    title: "System Architecture & Design",
    description: "Components, data flows, multi-tenancy, security model and licensing design." },
  { slug: "troubleshooting", category: "Architecture & troubleshooting", icon: Wrench, content: troubleshooting,
    title: "Troubleshooting",
    description: "Symptoms, causes and fixes — installation, agents, scans, AI, integrations and more." },
];

export function getDocBySlug(slug: string): DocEntry | undefined {
  return docs.find((d) => d.slug === slug);
}

export function docsInCategory(category: DocCategory): DocEntry[] {
  return docs.filter((d) => d.category === category);
}

// User-guide pages take the colour of the portal domain they document; the rest
// fall back to a colour per category.
const DOC_DOMAIN: Record<string, DomainId> = {
  "dashboards-and-reports": "cloud-saas",
  "incidents-and-posture": "secops",
  "response-and-remediation": "response",
  "ai-agents": "response",
  "detection-rules-and-context": "secops",
  investigations: "secops",
  "vulnerability-management": "vuln",
  "attack-surface": "asm",
  "asset-management": "itam",
  "cloud-and-saas-security": "cloud-saas",
  "data-security": "data",
  "endpoint-defence": "endpoint",
  "ai-security": "ai",
  "governance-and-compliance": "grc",
  "privacy-operations": "grc",
  "case-management": "response",
};

const CATEGORY_DOMAIN: Record<DocCategory, DomainId> = {
  "Get started": "asm",
  "User guide": "endpoint",
  Administration: "itam",
  "Architecture & troubleshooting": "cloud-saas",
};

export function docColor(doc: DocEntry): string {
  return DOMAIN_COLORS[DOC_DOMAIN[doc.slug] ?? CATEGORY_DOMAIN[doc.category]];
}

/** Heading text → URL fragment, shared by the article renderer and its table of contents. */
export function slugifyHeading(text: string): string {
  return text
    .toLowerCase()
    .replace(/[`*_~]/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

/** Level-2 and level-3 headings of a markdown document, skipping fenced code blocks. */
export function extractHeadings(markdown: string): { level: 2 | 3; text: string; id: string }[] {
  const out: { level: 2 | 3; text: string; id: string }[] = [];
  let inFence = false;
  for (const line of markdown.split("\n")) {
    if (line.trim().startsWith("```")) { inFence = !inFence; continue; }
    if (inFence) continue;
    const m = /^(##|###)\s+(.+?)\s*$/.exec(line);
    if (m) {
      const text = m[2].replace(/[`*_]/g, "");
      out.push({ level: m[1].length as 2 | 3, text, id: slugifyHeading(text) });
    }
  }
  return out;
}

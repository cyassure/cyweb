// Demo videos. The MP4s live in the `cyweb-videos` R2 bucket (key
// `videos/<file>`) and are streamed by worker/media.ts at /media/videos/<file>.
// Posters reuse the docs screenshots in public/docs-img/.

export interface DemoVideo {
  id: string;
  title: string;
  tagline: string;
  /** Length in seconds. */
  duration: number;
  file: string;
  poster: string;
  /** Matching user-guide page, if any. */
  docSlug?: string;
}

export const demoUrl = (d: DemoVideo) => `/media/videos/${d.file}`;

export const demos: DemoVideo[] = [
  { id: "overview", title: "CyAssure 360 overview", tagline: "The whole platform in three minutes",
    duration: 182, file: "cyassure360-overview.mp4", poster: "/docs-img/command-center.jpg", docSlug: "portal-basics" },
  { id: "01-vulnerability-management", title: "Vulnerability Management",
    tagline: "One prioritized queue for every vulnerability, from detection to fix",
    duration: 127, file: "01-vulnerability-management.mp4", poster: "/docs-img/vm-overview.jpg", docSlug: "vulnerability-management" },
  { id: "02-attack-surface", title: "Attack Surface", tagline: "Your organization, seen from the outside in",
    duration: 115, file: "02-attack-surface.mp4", poster: "/docs-img/asm-overview.jpg", docSlug: "attack-surface" },
  { id: "03-asset-management", title: "Asset Management", tagline: "One registry for every device, with coverage and risk",
    duration: 96, file: "03-asset-management.mp4", poster: "/docs-img/itam-network-assets.jpg", docSlug: "asset-management" },
  { id: "04-cloud-saas-security", title: "Cloud & SaaS Security",
    tagline: "Read-only posture checks for cloud accounts and SaaS sharing",
    duration: 89, file: "04-cloud-saas-security.mp4", poster: "/docs-img/cloud-posture.jpg", docSlug: "cloud-and-saas-security" },
  { id: "05-data-security", title: "Data Security", tagline: "Data protection and data security posture in one place",
    duration: 89, file: "05-data-security.mp4", poster: "/docs-img/data-protection.jpg", docSlug: "data-security" },
  { id: "06-endpoint-defense", title: "Endpoint Defense", tagline: "CyEDR: detection, response and policy for every endpoint",
    duration: 93, file: "06-endpoint-defense.mp4", poster: "/docs-img/edr-fleet.jpg", docSlug: "endpoint-defence" },
  { id: "07-ai-security", title: "AI Security", tagline: "Visibility and control over how your organization uses AI",
    duration: 83, file: "07-ai-security.mp4", poster: "/docs-img/ai-estate.jpg", docSlug: "ai-security" },
  { id: "08-governance-compliance", title: "Governance & Compliance", tagline: "Compliance posture from live security evidence",
    duration: 98, file: "08-governance-compliance.mp4", poster: "/docs-img/grc-posture.jpg", docSlug: "governance-and-compliance" },
  { id: "09-case-management", title: "Case Management", tagline: "Every investigation, tracked from first alert to closure",
    duration: 59, file: "09-case-management.mp4", poster: "/docs-img/cases.jpg", docSlug: "case-management" },
  { id: "10-marketplace", title: "Marketplace", tagline: "Integrations and playbooks, delivered as signed packages",
    duration: 59, file: "10-marketplace.mp4", poster: "/docs-img/marketplace.jpg", docSlug: "marketplace" },
  { id: "11-security-operations", title: "Security Operations", tagline: "Incidents, response, remediation and AI agents",
    duration: 164, file: "11-security-operations.mp4", poster: "/docs-img/incidents.jpg", docSlug: "incidents-and-posture" },
  { id: "12-remediation-options", title: "Remediation Options", tagline: "Fix problems right where you find them",
    duration: 163, file: "12-remediation-options.mp4", poster: "/docs-img/response-remediation.jpg", docSlug: "response-and-remediation" },
];

export function getDemo(id: string | null | undefined): DemoVideo | undefined {
  return demos.find((d) => d.id === id);
}

export function demoForDoc(docSlug: string): DemoVideo | undefined {
  return demos.find((d) => d.docSlug === docSlug && d.id !== "overview");
}

export function formatDuration(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = Math.round(seconds % 60);
  return `${m}:${String(s).padStart(2, "0")}`;
}

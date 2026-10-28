import { motion } from "framer-motion";
import {
  Globe, Router, Boxes, Search, Users, Monitor, Bug, Gauge, FileCheck, Radar, Lock,
  EyeOff, CloudCog, Share2, Brain, FolderKanban, Zap, Wrench, Ban, Shield, FileLock2,
  DatabaseZap, LucideIcon,
} from "lucide-react";
import type { ComponentType } from "react";
import {
  RadarSweep, GaugeMeter, WaveformPulse, StreamConverge, PulseHub,
  FlowGate, HiddenAlert, SignalWaves, ChecklistCycle,
  endpointSatellites, assetSatellites,
} from "@/components/FunctionVisuals";
import SectionHeader from "@/components/SectionHeader";

interface FunctionItem {
  id: string;
  icon: LucideIcon;
  name: string;
  desc: string;
  visual: ComponentType;
}

interface FunctionGroup {
  label: string;
  items: FunctionItem[];
}

const groups: FunctionGroup[] = [
  {
    label: "Exposure & Discovery",
    items: [
      {
        id: "asm",
        icon: Globe,
        name: "Attack Surface Monitoring",
        desc: "Continuous external scanning of DNS, TLS, open ports and exposed services — the attacker's view of you.",
        visual: () => <RadarSweep icon={Globe} theme="primary" />,
      },
      {
        id: "iot",
        icon: Router,
        name: "IoT / OT Discovery",
        desc: "Fingerprints cameras, printers and industrial controllers that agents can't reach.",
        visual: SignalWaves,
      },
      {
        id: "itam",
        icon: Boxes,
        name: "IT Asset Management",
        desc: "Every asset in one inventory — and which ones have no EDR or SIEM coverage.",
        visual: () => <PulseHub centerIcon={Boxes} satellites={assetSatellites} theme="primary" />,
      },
      {
        id: "cspm",
        icon: CloudCog,
        name: "Cloud Security (CSPM)",
        desc: "Finds public buckets, open security groups and unencrypted data across AWS, Azure, GCP and Kubernetes.",
        visual: () => <RadarSweep icon={CloudCog} theme="cyan" />,
      },
      {
        id: "saas",
        icon: Share2,
        name: "SaaS Security",
        desc: "Spots files shared publicly or outside the company in Microsoft 365, Google Workspace, Box and Dropbox.",
        visual: () => <FlowGate leftLabels={["M365", "Google", "Box"]} gateIcon={Share2} theme="blue" />,
      },
    ],
  },
  {
    label: "Detection & Investigation",
    items: [
      {
        id: "siem",
        icon: FileCheck,
        name: "Data Lake / SIEM",
        desc: "Every event in one correlation engine, grouped into a handful of investigable incidents.",
        visual: StreamConverge,
      },
      {
        id: "ml",
        icon: Brain,
        name: "ML Detection",
        desc: "Machine-learning models cut false positives and catch DGA domains, obfuscated commands and beaconing.",
        visual: () => <WaveformPulse icon={Brain} theme="violet" />,
      },
      {
        id: "threat-hunting",
        icon: Search,
        name: "Threat Hunting",
        desc: "Search historical telemetry and confirm whether a technique was ever used in your environment.",
        visual: () => <RadarSweep icon={Search} theme="orange" />,
      },
      {
        id: "ueba",
        icon: Users,
        name: "Behaviour Analysis",
        desc: "Baselines per user and host surface impossible travel and unusual access early.",
        visual: () => <WaveformPulse icon={Users} theme="cyan" />,
      },
      {
        id: "edr",
        icon: Monitor,
        name: "Endpoint Security",
        desc: "A cross-platform EDR agent for Windows, macOS and Linux, managed from one console.",
        visual: () => <PulseHub centerIcon={Monitor} satellites={endpointSatellites} theme="cyan" />,
      },
      {
        id: "tim",
        icon: Radar,
        name: "Threat Intel",
        desc: "Every alert enriched with MITRE ATT&CK, OSINT and STIX/TAXII context automatically.",
        visual: () => <FlowGate leftLabels={["MITRE", "OSINT", "STIX/TAXII"]} gateIcon={Radar} theme="blue" />,
      },
    ],
  },
  {
    label: "Response & Remediation",
    items: [
      {
        id: "cases",
        icon: FolderKanban,
        name: "Case Management",
        desc: "Every incident tracked as a case — evidence, owner and SLA — through to closure.",
        visual: () => <ChecklistCycle items={["Triage", "Investigate", "Contain", "Close"]} />,
      },
      {
        id: "response-actions",
        icon: Zap,
        name: "Response Actions",
        desc: "Isolate hosts, kill processes, quarantine files and disable accounts in one click.",
        visual: () => <PulseHub centerIcon={Zap} satellites={endpointSatellites} theme="orange" />,
      },
      {
        id: "self-remediation",
        icon: Wrench,
        name: "Self-Remediation",
        desc: "Fixes are applied, verified and rolled back automatically if anything fails.",
        visual: () => <FlowGate leftLabels={["Backup", "Apply", "Verify"]} gateIcon={Wrench} theme="emerald" />,
      },
      {
        id: "edl",
        icon: Ban,
        name: "EDL Blocklists",
        desc: "Block IPs, domains and hashes on endpoints and publish them as feeds to your firewalls.",
        visual: () => <FlowGate leftLabels={["IPs", "Domains", "Hashes"]} gateIcon={Ban} resultIcon={Shield} theme="primary" />,
      },
    ],
  },
  {
    label: "Data & AI Security",
    items: [
      {
        id: "dlp",
        icon: FileLock2,
        name: "Data Protection (DLP)",
        desc: "Stops sensitive data leaving via endpoints, web uploads and AI prompts.",
        visual: () => <FlowGate leftLabels={["Endpoint", "Web", "AI"]} gateIcon={FileLock2} theme="emerald" />,
      },
      {
        id: "dspm",
        icon: DatabaseZap,
        name: "DSPM",
        desc: "Maps where sensitive data lives, who can read it, and how to fix exposure.",
        visual: () => <RadarSweep icon={DatabaseZap} theme="emerald" />,
      },
      {
        id: "ai-gateway",
        icon: Lock,
        name: "AI Gateway",
        desc: "Policy, prompt DLP and injection detection in front of every AI provider.",
        visual: () => <FlowGate leftLabels={["OpenAI", "Claude", "Gemini"]} gateIcon={Lock} theme="violet" />,
      },
      {
        id: "shadow-ai",
        icon: EyeOff,
        name: "Shadow AI",
        desc: "Detects AI tools nobody approved, from network, DNS and browser signals.",
        visual: HiddenAlert,
      },
    ],
  },
  {
    label: "Risk & Compliance",
    items: [
      {
        id: "vuln",
        icon: Bug,
        name: "Vulnerability Mgmt",
        desc: "CVSS, EPSS and CISA KEV decide what to fix first.",
        visual: () => <GaugeMeter icon={Bug} score="14" sub="open findings" theme="orange" fillPct={0.4} />,
      },
      {
        id: "benchmark",
        icon: Gauge,
        name: "Security Benchmarking",
        desc: "Your posture score over time and against industry baselines.",
        visual: () => <GaugeMeter icon={Gauge} score="82" sub="security score" theme="blue" fillPct={0.82} />,
      },
      {
        id: "grc",
        icon: FileCheck,
        name: "Governance Risk & Compliance",
        desc: "Live NIS2, ISO 27001, DORA and GDPR posture from real findings.",
        visual: () => <ChecklistCycle items={["NIS2", "ISO 27001", "DORA", "GDPR"]} />,
      },
    ],
  },
];

const CapabilitiesSection = () => {
  return (
    <section id="capabilities" className="relative bg-secondary/70 py-24">
      <div className="container relative mx-auto px-6">
        <SectionHeader eyebrow="Capabilities" title="Everything Cy360 does, at a glance" />

        <div className="space-y-16">
          {groups.map((group) => (
            <div key={group.label}>
              <p className="mb-6 flex items-center gap-4 font-mono text-xs font-medium uppercase tracking-[0.12em] text-muted-foreground">
                {group.label}
                <span className="h-px flex-1 bg-border" />
              </p>
              <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                {group.items.map((fn, i) => (
                  <motion.div
                    key={fn.id}
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.08 }}
                    className="group flex flex-col overflow-hidden rounded-lg border border-border bg-card transition-all hover:border-primary/40 hover:shadow-[var(--glow-primary)]"
                  >
                    <div className="h-28 w-full shrink-0 border-b border-border">
                      <fn.visual />
                    </div>
                    <div className="flex flex-1 flex-col gap-2 p-4">
                      <div className="flex min-h-10 items-center gap-2.5">
                        <fn.icon className="h-4 w-4 shrink-0 text-muted-foreground transition-colors group-hover:text-primary" />
                        <h3 className="text-[15px] font-semibold leading-snug text-foreground">{fn.name}</h3>
                      </div>
                      <p className="text-xs leading-relaxed text-muted-foreground">{fn.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CapabilitiesSection;

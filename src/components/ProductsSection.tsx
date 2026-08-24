import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Globe, Router, Boxes, Search, Users, Monitor, Bug, Gauge,
  FileCheck, Radar, Lock, EyeOff, LucideIcon,
} from "lucide-react";
import type { ComponentType } from "react";
import {
  RadarSweep, GaugeMeter, WaveformPulse, StreamConverge, PulseHub,
  FlowGate, HiddenAlert, SignalWaves, ChecklistCycle,
  endpointSatellites, assetSatellites,
} from "@/components/FunctionVisuals";

interface FunctionItem {
  id: string;
  icon: LucideIcon;
  name: string;
  desc: string;
  visual: ComponentType;
}

interface FunctionGroup {
  label: string;
  gridCls: string;
  items: FunctionItem[];
}

const groups: FunctionGroup[] = [
  {
    label: "Exposure & Discovery",
    gridCls: "sm:grid-cols-2 lg:grid-cols-3",
    items: [
      {
        id: "asm",
        icon: Globe,
        name: "Attack Surface Monitoring",
        desc: "Continuous external scanning across DNS, SSL/TLS, exposed ports, and cloud infrastructure — the same view an attacker gets of your organization. New exposure shows up the moment it appears, not at the next quarterly pentest.",
        visual: () => <RadarSweep icon={Globe} theme="primary" />,
      },
      {
        id: "iot",
        icon: Router,
        name: "IoT Scan",
        desc: "Discovers and fingerprints IoT and OT devices on your network — cameras, sensors, printers, industrial controllers — the endpoints traditional agents can't reach. Flags default credentials and unpatched firmware.",
        visual: SignalWaves,
      },
      {
        id: "itam",
        icon: Boxes,
        name: "IT Asset Mgmt",
        desc: "One coverage view of every asset you own — which have an EDR agent, which are SIEM-covered, and which are invisible to both. Import from your CMDB or let a subnet scan build the inventory for you.",
        visual: () => <PulseHub centerIcon={Boxes} satellites={assetSatellites} theme="primary" />,
      },
    ],
  },
  {
    label: "Detection & Investigation",
    gridCls: "sm:grid-cols-2",
    items: [
      {
        id: "siem",
        icon: FileCheck,
        name: "Data Lake / SIEM (Correlation Engine)",
        desc: "Every EDR, ASM, and connector event flows into a unified correlation engine — including everything filtered out before it became an alert. Related signals are grouped into one investigable incident, not a wall of disconnected raw events.",
        visual: StreamConverge,
      },
      {
        id: "threat-hunting",
        icon: Search,
        name: "Threat Hunting",
        desc: "Proactive, hypothesis-driven search across historical telemetry — not waiting for a rule to fire. Query raw events, pivot on an indicator, and confirm whether a technique was ever used in your environment.",
        visual: () => <RadarSweep icon={Search} theme="orange" />,
      },
      {
        id: "ueba",
        icon: Users,
        name: "Behaviour Analysis",
        desc: "Rolling behavioural baselines per user, service, and system account. Unusual login times, impossible travel, and atypical data access surface as anomalies before they escalate into an incident.",
        visual: () => <WaveformPulse icon={Users} theme="violet" />,
      },
      {
        id: "edr",
        icon: Monitor,
        name: "Endpoint Security",
        desc: "A cross-platform detection and response agent for Windows, macOS, and Linux — process, file, and network telemetry, plus one-click isolation and automated response, not just a static signature match.",
        visual: () => <PulseHub centerIcon={Monitor} satellites={endpointSatellites} theme="cyan" />,
      },
    ],
  },
  {
    label: "Risk & Compliance",
    gridCls: "sm:grid-cols-2 lg:grid-cols-4",
    items: [
      {
        id: "vuln",
        icon: Bug,
        name: "Vulnerability Mgmt",
        desc: "CVSS and EPSS-scored findings across your internal and external estate, so you know which vulnerabilities are theoretically bad and which are actually being exploited in the wild right now.",
        visual: () => <GaugeMeter icon={Bug} score="14" sub="open findings" theme="orange" fillPct={0.4} />,
      },
      {
        id: "benchmark",
        icon: Gauge,
        name: "Security Benchmarking",
        desc: "Score your posture against your own history and industry baselines — not a one-time audit that goes stale the next day. Every scan updates the trend line.",
        visual: () => <GaugeMeter icon={Gauge} score="82" sub="security score" theme="blue" fillPct={0.82} />,
      },
      {
        id: "grc",
        icon: FileCheck,
        name: "Governance Risk & Compliance",
        desc: "Live posture scoring across NIS2, ISO 27001, DORA, SOC 2, NIST CSF, PCI DSS, and GDPR — auto-mapped from real findings and incidents, not a spreadsheet somebody updates twice a year.",
        visual: () => <ChecklistCycle items={["NIS2", "ISO 27001", "DORA", "GDPR"]} />,
      },
      {
        id: "tim",
        icon: Radar,
        name: "Threat Intel Mgmt",
        desc: "Ingests MITRE ATT&CK, OSINT, and STIX/TAXII feeds and automatically enriches every alert and incident with attribution, related IOCs, and technique mapping the moment it's created.",
        visual: () => <FlowGate leftLabels={["MITRE", "OSINT", "STIX/TAXII"]} gateIcon={Radar} theme="blue" />,
      },
    ],
  },
  {
    label: "AI Security",
    gridCls: "sm:grid-cols-2",
    items: [
      {
        id: "ai-gateway",
        icon: Lock,
        name: "AI Security & AI Gateway",
        desc: "A policy-enforced gateway in front of every AI provider your teams use — DLP scanning, prompt-injection detection, anomaly detection, and a full audit trail, whether you run models locally or route to the cloud.",
        visual: () => <FlowGate leftLabels={["OpenAI", "Claude", "Gemini"]} gateIcon={Lock} theme="violet" />,
      },
      {
        id: "shadow-ai",
        icon: EyeOff,
        name: "Shadow AI",
        desc: "Detects employees sending company data to ChatGPT, Claude, Copilot, and other AI tools nobody approved — via network traffic, DNS, and browser signals — before it turns into a real data-exposure incident.",
        visual: HiddenAlert,
      },
    ],
  },
];

const ProductsSection = () => {
  return (
    <section id="products" className="relative py-24">
      <div className="absolute inset-0 grid-pattern opacity-20" />
      <div className="absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/3 blur-[140px]" />

      <div className="container relative mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <p className="mb-3 text-xs font-medium uppercase tracking-[0.2em] text-primary">Product Portfolio</p>
          <h2 className="mb-4 font-heading text-3xl font-bold text-foreground md:text-5xl">
            Every function your SOC needs
          </h2>
          <p className="mx-auto max-w-xl text-muted-foreground">
            Cy360 is one platform, not a bundle of four. Thirteen functions, four ways they work together.
          </p>
        </motion.div>

        <div className="space-y-16">
          {groups.map((group) => (
            <div key={group.label}>
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="mb-6 text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground"
              >
                {group.label}
              </motion.p>
              <div className={`grid gap-6 ${group.gridCls}`}>
                {group.items.map((fn, i) => (
                  <motion.div
                    key={fn.id}
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.08 }}
                    className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card transition-all hover:border-primary/40 hover:shadow-[var(--glow-primary)]"
                  >
                    <div className="h-36 w-full border-b border-border">
                      <fn.visual />
                    </div>
                    <div className="flex flex-1 flex-col gap-3 p-6">
                      <div className="flex items-center gap-3">
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-border bg-secondary/50">
                          <fn.icon className="h-4 w-4 text-primary" />
                        </div>
                        <h3 className="font-heading text-base font-bold leading-snug text-foreground">{fn.name}</h3>
                      </div>
                      <p className="text-sm leading-relaxed text-muted-foreground">{fn.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <p className="text-sm text-muted-foreground">
            All of it, in Community or Enterprise. <Link to="/editions" className="text-primary underline underline-offset-4">Compare editions →</Link>
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default ProductsSection;

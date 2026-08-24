import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Shield, Globe, Monitor, Lock, Brain, FileCheck, Database,
  ShieldAlert, Boxes, ClipboardList, Store,
} from "lucide-react";

import siemImg from "@/assets/screenshots/siem.jpg";
import asmImg from "@/assets/screenshots/attack-posture.jpg";
import edrImg from "@/assets/screenshots/edr-fleet.jpg";
import shadowAiImg from "@/assets/screenshots/shadow-ai.jpg";
import aiGatewayImg from "@/assets/screenshots/ai-gateway.jpg";
import cymindImg from "@/assets/screenshots/cymind-chat.jpg";
import grcImg from "@/assets/screenshots/grc.jpg";
import datalakeImg from "@/assets/screenshots/datalake.jpg";
import vulnImg from "@/assets/screenshots/vuln.jpg";
import assetImg from "@/assets/screenshots/asset-inventory.jpg";
import casesImg from "@/assets/screenshots/cases.jpg";
import marketplaceImg from "@/assets/screenshots/marketplace.jpg";

const functions = [
  {
    id: "siem",
    icon: Shield,
    name: "CySIEM",
    tagline: "SIEM & Correlation",
    desc: "Real-time alert correlation across every log source, grouped into investigable incidents — not a raw event firehose.",
    image: siemImg,
  },
  {
    id: "asm",
    icon: Globe,
    name: "CyASM",
    tagline: "Attack Surface Management",
    desc: "Continuous external scanning — DNS, SSL, exposed ports, and misconfigurations — scored and tracked over time.",
    image: asmImg,
  },
  {
    id: "edr",
    icon: Monitor,
    name: "CyEDR",
    tagline: "Endpoint Detection & Response",
    desc: "Cross-platform endpoint agent with isolation, auto-response, and a live fleet view across every device you protect.",
    image: edrImg,
  },
  {
    id: "shadow-ai",
    icon: ShieldAlert,
    name: "Shadow AI Monitor",
    tagline: "Unsanctioned AI Detection",
    desc: "Spots employees sending data to ChatGPT, Claude, Copilot, and other AI tools you never approved — before it becomes a breach.",
    image: shadowAiImg,
  },
  {
    id: "ai-gateway",
    icon: Lock,
    name: "AI Security Gateway",
    tagline: "AI Traffic Governance",
    desc: "A policy-enforced gateway in front of every AI provider your teams use — DLP scanning, anomaly detection, and full audit trail.",
    image: aiGatewayImg,
  },
  {
    id: "cymind",
    icon: Brain,
    name: "CyMind",
    tagline: "AI Security Assistant",
    desc: "An on-premise AI analyst embedded in the platform — ask about incidents, alerts, or CVEs and get grounded, sourced answers.",
    image: cymindImg,
  },
  {
    id: "grc",
    icon: FileCheck,
    name: "GRC & Compliance",
    tagline: "Governance, Risk & Compliance",
    desc: "Live posture scoring across NIS2, ISO 27001, DORA, SOC 2, NIST CSF, PCI DSS, GDPR, and more — no spreadsheets required.",
    image: grcImg,
  },
  {
    id: "datalake",
    icon: Database,
    name: "CyDataLake",
    tagline: "Unified Event Archive",
    desc: "Every EDR, ASM, and SIEM-connector event — including what got filtered before it became an alert — searchable in one place.",
    image: datalakeImg,
  },
  {
    id: "vuln",
    icon: ShieldAlert,
    name: "Vulnerability Management",
    tagline: "Internal + External CVE Tracking",
    desc: "CVSS and EPSS-scored findings across your whole environment, trended over time so you know what actually needs attention first.",
    image: vulnImg,
  },
  {
    id: "itam",
    icon: Boxes,
    name: "Asset & IoT Inventory",
    tagline: "ITAM",
    desc: "One coverage view of every asset — which ones have EDR, which are SIEM-covered, and which IoT devices nobody's watching.",
    image: assetImg,
  },
  {
    id: "cases",
    icon: ClipboardList,
    name: "Case Management",
    tagline: "CyCases + CySOAR",
    desc: "Incident case tracking with MTTA/MTTR metrics, built-in automation playbooks, and analyst workload visibility.",
    image: casesImg,
  },
  {
    id: "marketplace",
    icon: Store,
    name: "Marketplace",
    tagline: "Integrations & Playbooks",
    desc: "Pull pre-built integrations for AWS, Azure AD, GitHub, IBM QRadar, Office 365, and more — configured in minutes, not weeks.",
    image: marketplaceImg,
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
            Cy360 is one platform, not a bundle of four. Real screens from a live instance — this is what you actually get.
          </p>
        </motion.div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {functions.map((fn, i) => (
            <motion.div
              key={fn.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: (i % 3) * 0.08 }}
              className="group overflow-hidden rounded-2xl border border-border bg-card transition-all hover:border-primary/40 hover:shadow-[var(--glow-primary)]"
            >
              <div className="aspect-[700/280] w-full overflow-hidden border-b border-border bg-secondary/30">
                <img
                  src={fn.image}
                  alt={`${fn.name} — ${fn.tagline} screenshot`}
                  className="h-full w-full object-cover object-top transition-transform duration-300 group-hover:scale-105"
                  loading="lazy"
                />
              </div>
              <div className="p-6">
                <div className="mb-3 flex items-center gap-3">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-border bg-secondary/50">
                    <fn.icon className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-heading text-base font-bold leading-tight text-foreground">{fn.name}</h3>
                    <p className="text-[11px] font-medium uppercase tracking-wide text-primary/80">{fn.tagline}</p>
                  </div>
                </div>
                <p className="text-sm leading-relaxed text-muted-foreground">{fn.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-10 text-center"
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

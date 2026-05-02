import { motion } from "framer-motion";
import {
  Brain, Shield, Lock, FileCheck, ArrowRight, Check,
  Key, Layers, Package, CloudOff, Server, ChevronRight,
} from "lucide-react";

const dataSources = [
  { label: "CRM Systems",   sub: "Salesforce · Dynamics · HubSpot",      cls: "border-blue-500/40 bg-blue-500/5 text-blue-300" },
  { label: "ERP Platforms", sub: "SAP · Oracle · NetSuite",               cls: "border-orange-500/40 bg-orange-500/5 text-orange-300" },
  { label: "Project Tools", sub: "JIRA · ServiceNow · Azure DevOps",      cls: "border-cyan-500/40 bg-cyan-500/5 text-cyan-300" },
  { label: "HR Systems",    sub: "Workday · BambooHR · SuccessFactors",   cls: "border-emerald-500/40 bg-emerald-500/5 text-emerald-300" },
  { label: "Custom APIs",   sub: "REST · Webhooks · GraphQL",             cls: "border-violet-500/40 bg-violet-500/5 text-violet-300" },
];

const aiOutputs = [
  "Intelligent Q&A over company data",
  "Business process automation",
  "Analytics & decision support",
  "Compliance & governance reports",
  "Contextual workflow assistance",
];

const deployModes = [
  {
    icon: Package,
    title: "Bundled with Cy360",
    badge: "Included",
    badgeCls: "bg-primary/20 text-primary border-primary/40",
    desc: "CyMind is deeply embedded across the entire Cy360 security stack — powering AI-assisted alert triage, threat enrichment, incident narratives, and SOC knowledge assistance without any additional setup.",
    features: [
      "AI-powered alert triage & correlation",
      "LLM threat enrichment & risk scoring",
      "Automated incident narrative generation",
      "SOC analyst knowledge assistant",
    ],
    iconCls: "text-primary",
    borderCls: "border-primary/30",
    gradCls: "from-primary/10 to-card",
  },
  {
    icon: Layers,
    title: "Standalone Platform",
    badge: "Enterprise",
    badgeCls: "bg-violet-500/20 text-violet-300 border-violet-500/40",
    desc: "Deploy CyMind independently within your infrastructure and connect it to any enterprise application. Empower every department with private AI capabilities — without altering existing workflows or exposing data externally.",
    features: [
      "Native connectors: CRM, ERP, JIRA, HR systems",
      "RAG knowledge base from internal documents",
      "Department-level RBAC & seat-based licensing",
      "Full audit trail for regulatory compliance",
    ],
    iconCls: "text-violet-400",
    borderCls: "border-violet-500/30",
    gradCls: "from-violet-500/10 to-card",
  },
];

const govFeatures = [
  {
    icon: Key,
    title: "Role-Based Access Control",
    desc: "Granular RBAC ensures every user accesses only the knowledge bases and AI capabilities appropriate to their role and department — no oversharing, no exceptions.",
  },
  {
    icon: FileCheck,
    title: "Comprehensive Audit Trail",
    desc: "Every query, response, model invocation, and document access is logged immutably, giving your compliance and security teams full visibility into AI activity.",
  },
  {
    icon: Lock,
    title: "Air-Gapped by Design",
    desc: "All AI inference runs on-premise. Sensitive data, internal documents, and conversations never traverse public networks or reach any external AI provider.",
  },
  {
    icon: Shield,
    title: "DLP & PII Protection",
    desc: "Built-in data loss prevention masks personally identifiable information, detects prompt injection attempts, and filters model outputs before delivery to end users.",
  },
];

const CyMindSection = () => (
  <section id="cymind" className="relative py-24">
    {/* Background effects */}
    <div className="absolute inset-0 grid-pattern opacity-20" />
    <div className="absolute left-1/2 top-1/2 h-[700px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet-500/5 blur-[160px]" />

    <div className="container relative mx-auto px-6">

      {/* ── Coming Soon banner ──────────────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-10 flex justify-center"
      >
        <div className="flex items-center gap-3 rounded-2xl border border-violet-500/30 bg-gradient-to-r from-violet-500/10 via-violet-500/5 to-violet-500/10 px-6 py-3">
          <motion.div
            animate={{ scale: [1, 1.4, 1], opacity: [1, 0.5, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="h-2.5 w-2.5 rounded-full bg-violet-400 shadow-[0_0_8px_rgba(167,139,250,0.8)]"
          />
          <span className="text-sm font-semibold text-violet-300">Launching Soon</span>
          <span className="hidden text-muted-foreground/50 sm:inline">·</span>
          <span className="hidden text-sm text-muted-foreground sm:inline">
            Join the early access waitlist and be first to deploy Private AI
          </span>
          <a
            href="#contact"
            className="ml-2 rounded-full border border-violet-500/40 bg-violet-500/20 px-3 py-1 text-xs font-bold text-violet-300 transition-all hover:bg-violet-500/30"
          >
            Join Waitlist →
          </a>
        </div>
      </motion.div>

      {/* ── Header ─────────────────────────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-6 text-center"
      >
        <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-violet-500/30 bg-violet-500/10 px-4 py-1.5 text-xs font-medium text-violet-300">
          <Brain className="h-3.5 w-3.5" />
          CyMind — Private AI Platform
        </div>
        <h2 className="mb-4 font-heading text-3xl font-bold text-foreground md:text-5xl">
          Your AI. Your Data.{" "}
          <span className="text-gradient">Your Control.</span>
        </h2>
        <p className="mx-auto max-w-2xl text-muted-foreground">
          CyMind is a fully on-premise AI intelligence platform — an{" "}
          <span className="font-semibold text-foreground">AI-in-a-Box</span> solution that delivers
          the power of large language models and enterprise knowledge retrieval entirely within your
          own infrastructure. Sensitive data never leaves your network.
        </p>
      </motion.div>

      {/* Privacy guarantee strip */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="mb-14 flex justify-center"
      >
        <div className="flex flex-wrap items-center justify-center gap-4 rounded-full border border-violet-500/20 bg-violet-500/5 px-6 py-2.5 text-xs text-muted-foreground">
          <span className="flex items-center gap-1.5"><CloudOff className="h-3.5 w-3.5 text-violet-400" /> Zero cloud exposure</span>
          <span className="text-border hidden sm:inline">·</span>
          <span className="flex items-center gap-1.5"><Server className="h-3.5 w-3.5 text-violet-400" /> On-premise inference only</span>
          <span className="text-border hidden sm:inline">·</span>
          <span className="flex items-center gap-1.5"><Shield className="h-3.5 w-3.5 text-violet-400" /> No external AI providers</span>
        </div>
      </motion.div>

      {/* ── Visual Architecture Diagram ─────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-16 overflow-hidden rounded-2xl border border-violet-500/20 bg-card/50 backdrop-blur-sm"
      >
        <div className="p-6 md:p-10">
          <p className="mb-8 text-center text-xs font-medium uppercase tracking-[0.2em] text-violet-400">
            Private AI Architecture
          </p>

          <div className="grid grid-cols-1 items-center gap-8 md:grid-cols-[1fr_180px_1fr]">

            {/* Left — Enterprise app inputs */}
            <div className="flex flex-col gap-3">
              <p className="mb-1 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
                Enterprise Applications
              </p>
              {dataSources.map((src, i) => (
                <motion.div
                  key={src.label}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className={`flex items-center justify-between rounded-xl border p-3 ${src.cls}`}
                >
                  <div>
                    <p className="text-sm font-semibold">{src.label}</p>
                    <p className="text-[11px] opacity-60">{src.sub}</p>
                  </div>
                  <ChevronRight className="h-4 w-4 shrink-0 opacity-40" />
                </motion.div>
              ))}
            </div>

            {/* Center — CyMind secure core */}
            <div className="flex flex-col items-center justify-center">
              <div className="relative flex items-center justify-center">
                {/* Animated pulse rings */}
                {[1, 2, 3].map((ring) => (
                  <motion.div
                    key={ring}
                    className="absolute rounded-full border border-violet-500/25"
                    style={{ width: 112 + ring * 44, height: 112 + ring * 44 }}
                    animate={{ opacity: [0.2, 0.5, 0.2], scale: [0.97, 1.03, 0.97] }}
                    transition={{ duration: 3, repeat: Infinity, delay: ring * 0.7 }}
                  />
                ))}

                {/* Core orb */}
                <div className="relative z-10 flex h-28 w-28 flex-col items-center justify-center rounded-full border-2 border-violet-500/60 bg-gradient-to-br from-violet-500/30 to-card shadow-[0_0_60px_rgba(139,92,246,0.45)]">
                  <motion.div
                    animate={{ scale: [1, 1.12, 1] }}
                    transition={{ duration: 2.5, repeat: Infinity }}
                  >
                    <Brain className="h-9 w-9 text-violet-400" />
                  </motion.div>
                  <span className="mt-1 text-[10px] font-bold tracking-widest text-violet-300">CyMind</span>
                </div>
              </div>

              {/* Secure on-premise label */}
              <motion.div
                className="mt-14 flex flex-col items-center gap-1.5"
                animate={{ opacity: [0.7, 1, 0.7] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                <div className="inline-flex items-center gap-1.5 rounded-full border border-violet-500/30 bg-violet-500/10 px-3 py-1">
                  <Lock className="h-3 w-3 text-violet-400" />
                  <span className="text-[9px] font-bold uppercase tracking-wider text-violet-300">
                    Secure On-Premise
                  </span>
                </div>
                <div className="inline-flex items-center gap-1 text-[9px] text-muted-foreground/60">
                  <CloudOff className="h-2.5 w-2.5" />
                  No external transmission
                </div>
              </motion.div>
            </div>

            {/* Right — AI-powered outputs */}
            <div className="flex flex-col gap-3">
              <p className="mb-1 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
                AI-Powered Outputs
              </p>
              {aiOutputs.map((cap, i) => (
                <motion.div
                  key={cap}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="flex items-center gap-2.5 rounded-xl border border-violet-500/20 bg-violet-500/5 p-3"
                >
                  <motion.div
                    className="h-2 w-2 shrink-0 rounded-full bg-violet-400"
                    animate={{ opacity: [1, 0.3, 1] }}
                    transition={{ duration: 2, repeat: Infinity, delay: i * 0.4 }}
                  />
                  <p className="text-sm text-foreground">{cap}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Diagram footer bar */}
        <div className="border-t border-violet-500/10 bg-violet-500/5 px-8 py-3 text-center">
          <p className="text-xs text-muted-foreground">
            <Lock className="mr-1 inline h-3 w-3 text-violet-400" />
            All AI inference, document processing, and data storage remain within your private infrastructure boundary. Zero external transmission.
          </p>
        </div>
      </motion.div>

      {/* ── Deployment Modes ─────────────────────────────────────────────────── */}
      <div className="mb-16 grid gap-6 md:grid-cols-2">
        {deployModes.map((mode, i) => (
          <motion.div
            key={mode.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.15 }}
            className={`relative rounded-2xl border ${mode.borderCls} bg-gradient-to-br ${mode.gradCls} p-8`}
          >
            <div className="mb-5 flex items-start justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className={`flex h-12 w-12 items-center justify-center rounded-xl border ${mode.borderCls} bg-card/60`}>
                  <mode.icon className={`h-6 w-6 ${mode.iconCls}`} />
                </div>
                <h3 className="font-heading text-lg font-bold text-foreground">{mode.title}</h3>
              </div>
              <span className={`shrink-0 rounded-full border px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider ${mode.badgeCls}`}>
                {mode.badge}
              </span>
            </div>
            <p className="mb-5 text-sm leading-relaxed text-muted-foreground">{mode.desc}</p>
            <ul className="space-y-2">
              {mode.features.map((f) => (
                <li key={f} className="flex items-start gap-2 text-sm text-muted-foreground">
                  <Check className={`mt-0.5 h-4 w-4 shrink-0 ${mode.iconCls}`} />
                  {f}
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>

      {/* ── Governance & Compliance ──────────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-14"
      >
        <div className="mb-8 text-center">
          <p className="mb-2 text-xs font-medium uppercase tracking-[0.2em] text-violet-400">
            Security & Compliance
          </p>
          <h3 className="font-heading text-2xl font-bold text-foreground md:text-3xl">
            Governance Built In, Not Bolted On
          </h3>
        </div>
        <div className="grid gap-5 md:grid-cols-2">
          {govFeatures.map((feat, i) => (
            <motion.div
              key={feat.title}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="flex gap-4 rounded-xl border border-border bg-card p-6"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-violet-500/30 bg-violet-500/10">
                <feat.icon className="h-5 w-5 text-violet-400" />
              </div>
              <div>
                <p className="mb-1.5 font-heading font-semibold text-foreground">{feat.title}</p>
                <p className="text-sm leading-relaxed text-muted-foreground">{feat.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* ── CTA ─────────────────────────────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="rounded-2xl border border-violet-500/20 bg-gradient-to-r from-violet-500/10 via-card to-primary/10 p-10 text-center"
      >
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full border border-violet-500/40 bg-violet-500/15">
          <Brain className="h-7 w-7 text-violet-400" />
        </div>
        <h3 className="mb-2 font-heading text-2xl font-bold text-foreground">
          Ready to deploy Private AI?
        </h3>
        <p className="mx-auto mb-8 max-w-lg text-muted-foreground">
          Whether bundled with Cy360 or deployed as a standalone platform, CyMind brings enterprise-grade AI within your security perimeter. Talk to our team to explore the right deployment for your organization.
        </p>
        <a
          href="#contact"
          className="inline-flex items-center gap-2 rounded-lg bg-violet-600 px-8 py-3.5 font-heading text-sm font-semibold text-white transition-all hover:brightness-110"
        >
          Get CyMind Pricing
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </a>
      </motion.div>

    </div>
  </section>
);

export default CyMindSection;

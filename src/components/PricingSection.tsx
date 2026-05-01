import { motion } from "framer-motion";
import { Check, Star, Brain, Radar, ShieldCheck, Zap, ArrowRight } from "lucide-react";

const plans = [
  {
    name: "Starter MDR",
    price: "€199",
    period: "/month",
    target: "SME · up to 50 assets / users",
    highlight: false,
    features: [
      "Cy360 SOC dashboard",
      "CySIEM up to 50 agents",
      "CyASM Standard scans",
      "CyMind AI (Ollama local)",
      "Email support + NIS2 check",
    ],
    cta: "Get Started",
  },
  {
    name: "Professional MDR",
    price: "€499",
    period: "/month",
    target: "Mid-market · 50–500 assets / users",
    highlight: true,
    features: [
      "Everything in Starter MDR",
      "CyComp full compliance (NIS2, ISO 27001, DORA, GDPR/AVG)",
      "CySOAR automation playbooks",
      "CyIRIS incident management",
      "CyMISP threat intel (MITRE / STIX/TAXII)",
      "Business hours MDR",
    ],
    cta: "Start Free Trial",
  },
  {
    name: "Enterprise MDR",
    price: "€999",
    period: "/month",
    target: "Enterprise 500+ / MSSP white-label",
    highlight: false,
    features: [
      "Everything in Professional MDR",
      "24/7 MDR service",
      "CyMind custom LLM/RAG",
      "Dedicated SOC analyst",
      "MSSP white-label licensing",
      "SLA 99.9%",
    ],
    cta: "Contact Sales",
  },
];

const standaloneModules = [
  {
    icon: Brain,
    name: "CyMind",
    tagline: "Private AI Platform",
    desc: "On-premise LLM/RAG intelligence. Deploy standalone across your enterprise or bundle with Cy360.",
    iconCls: "text-violet-400",
    borderCls: "border-violet-500/30",
    bgCls: "bg-violet-500/5",
  },
  {
    icon: Radar,
    name: "CyASM",
    tagline: "Attack Surface Management",
    desc: "14 active scan modules — passive to deep — with AI-enriched, risk-scored findings.",
    iconCls: "text-orange-400",
    borderCls: "border-orange-500/30",
    bgCls: "bg-orange-500/5",
  },
  {
    icon: ShieldCheck,
    name: "CyComp",
    tagline: "Compliance & Governance",
    desc: "Automated gap analysis and evidence collection for NIS2, ISO 27001, DORA, and GDPR/AVG.",
    iconCls: "text-emerald-400",
    borderCls: "border-emerald-500/30",
    bgCls: "bg-emerald-500/5",
  },
  {
    icon: Zap,
    name: "CySOAR",
    tagline: "Security Orchestration & Automation",
    desc: "Node-RED playbook engine for automated incident response, enrichment, and remediation workflows.",
    iconCls: "text-yellow-400",
    borderCls: "border-yellow-500/30",
    bgCls: "bg-yellow-500/5",
  },
];

const addons = [
  "Professional services: €2–10K / project",
  "Compliance audits: €5–15K",
  "MSSP white-label licensing",
  "Training & certification bundles",
];

const PricingSection = () => {
  return (
    <section id="pricing" className="relative py-24">
      <div className="container mx-auto px-6">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <p className="mb-3 text-xs font-medium uppercase tracking-[0.2em] text-primary">MDR Pricing</p>
          <h2 className="mb-4 font-heading text-3xl font-bold text-foreground md:text-5xl">
            Managed Detection &amp; Response Packages
          </h2>
          <p className="mx-auto max-w-xl text-muted-foreground">
            Enterprise-grade security at SME pricing. Deploy in under 30 minutes with no vendor lock-in.
          </p>
        </motion.div>

        {/* MDR Plan Cards */}
        <div className="mb-16 grid gap-6 md:grid-cols-3">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={`relative rounded-2xl border p-8 transition-all ${
                plan.highlight
                  ? "border-primary/50 bg-gradient-to-b from-primary/10 to-card shadow-[var(--glow-primary)]"
                  : "border-border bg-card hover:border-primary/30"
              }`}
            >
              {plan.highlight && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="flex items-center gap-1 rounded-full bg-primary px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-primary-foreground">
                    <Star className="h-3 w-3" /> Popular
                  </span>
                </div>
              )}

              <p className="mb-1 font-heading text-lg font-bold text-foreground">{plan.name}</p>
              <p className="mb-4 text-xs text-muted-foreground">{plan.target}</p>

              <div className="mb-6 flex items-baseline gap-1">
                <span className="font-heading text-4xl font-bold text-foreground">{plan.price}</span>
                <span className="text-sm text-muted-foreground">{plan.period}</span>
              </div>

              <ul className="mb-8 space-y-2">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                    {f}
                  </li>
                ))}
              </ul>

              <a
                href="#contact"
                className={`block rounded-lg py-3 text-center text-sm font-semibold transition-all ${
                  plan.highlight
                    ? "bg-primary text-primary-foreground hover:brightness-110"
                    : "border border-border bg-secondary text-foreground hover:border-primary/50"
                }`}
              >
                {plan.cta}
              </a>
            </motion.div>
          ))}
        </div>

        {/* Standalone Platform Modules */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <div className="mb-8 text-center">
            <p className="mb-2 text-xs font-medium uppercase tracking-[0.2em] text-primary">
              Standalone Modules
            </p>
            <h3 className="font-heading text-2xl font-bold text-foreground md:text-3xl">
              Deploy Any Module Independently
            </h3>
            <p className="mx-auto mt-2 max-w-lg text-sm text-muted-foreground">
              Each platform module is available as a standalone product. Pricing is tailored to your deployment scale — contact our team for a quote.
            </p>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {standaloneModules.map((mod, i) => (
              <motion.div
                key={mod.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={`group flex flex-col rounded-2xl border ${mod.borderCls} ${mod.bgCls} p-6 transition-all hover:shadow-[var(--glow-primary)]`}
              >
                <div className={`mb-4 flex h-11 w-11 items-center justify-center rounded-xl border ${mod.borderCls} bg-card/60`}>
                  <mod.icon className={`h-5 w-5 ${mod.iconCls}`} />
                </div>
                <p className="mb-0.5 font-heading text-base font-bold text-foreground">{mod.name}</p>
                <p className={`mb-3 text-xs font-medium ${mod.iconCls}`}>{mod.tagline}</p>
                <p className="mb-5 flex-1 text-xs leading-relaxed text-muted-foreground">{mod.desc}</p>
                <a
                  href="#contact"
                  className={`inline-flex items-center gap-1 text-xs font-semibold ${mod.iconCls} transition-all hover:gap-2`}
                >
                  Contact for Pricing <ArrowRight className="h-3 w-3" />
                </a>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Additional services */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="rounded-2xl border border-border bg-card p-8"
        >
          <div className="grid gap-8 md:grid-cols-2">
            <div>
              <h3 className="mb-3 font-heading text-xl font-bold text-foreground">Additional Services</h3>
              <p className="mb-4 text-sm text-muted-foreground">
                Need more? Add professional services or compliance audits to any plan.
              </p>
              <ul className="space-y-2">
                {addons.map((line) => (
                  <li key={line} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                    {line}
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex flex-col justify-center">
              <h3 className="mb-3 font-heading text-xl font-bold text-foreground">Deploy in &lt; 30 Minutes</h3>
              <p className="mb-4 text-sm text-muted-foreground">
                All packages include guided onboarding. Our automated installer gets you live in under 30 minutes — no months-long implementations.
              </p>
              <a
                href="#contact"
                className="inline-block rounded-lg bg-primary px-6 py-3 text-center text-sm font-semibold text-primary-foreground transition-all hover:brightness-110"
              >
                Talk to an Expert
              </a>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default PricingSection;

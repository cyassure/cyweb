import { motion } from "framer-motion";
import { Check, Star, Brain, Radar, ShieldCheck, Zap, ArrowRight, Users, Shield, Building2, Monitor } from "lucide-react";

const plans = [
  {
    name: "Starter",
    subtitle: "Self-Managed SOC",
    price: "2.99",
    period: "/user/month",
    target: "For teams building their own SOC",
    highlight: false,
    badge: null,
    icon: Users,
    iconColor: "text-blue-400",
    modelBorder: "border-blue-500/30",
    modelBg: "bg-blue-500/8",
    modelLabel: "Fully Customer Managed",
    modelDesc: "Full platform access with no managed service layer. Your team operates the tooling, triages alerts, and manages your own SOC workflow.",
    flow: ["Alert Fires", "You Investigate", "You Respond"],
    flowColors: ["bg-blue-500/10 border-blue-500/30 text-blue-300", "bg-blue-500/10 border-blue-500/30 text-blue-300", "bg-blue-500/10 border-blue-500/30 text-blue-300"],
    features: [
      "Cy360 SOC dashboard & portal",
      "CySIEM — up to 250 monitored agents",
      "CyASM attack surface scanning",
      "CyMind AI (Ollama local LLM)",
      "NIS2 readiness baseline check",
      "Email support — business hours",
      "Self-guided onboarding & documentation",
    ],
    cta: "Start Free Trial",
    ctaHref: "/run-pilot.html",
  },
  {
    name: "Professional",
    subtitle: "MDR — Notify & Guide",
    price: "5.99",
    period: "/user/month",
    target: "For teams who want expert oversight",
    highlight: true,
    badge: "Most Popular",
    icon: Shield,
    iconColor: "text-primary",
    modelBorder: "border-primary/30",
    modelBg: "bg-primary/8",
    modelLabel: "CyAssure MDR Team — Notify Only",
    modelDesc: "CyAssure SOC monitors 24×7 and investigates every alert. When a response action is needed, our team contacts you via phone, email, or Slack with clear guidance — you perform the changes.",
    flow: ["Alert Fires", "CyAssure Investigates", "CyAssure Guides", "You Execute"],
    flowColors: [
      "bg-primary/10 border-primary/30 text-primary",
      "bg-primary/10 border-primary/30 text-primary",
      "bg-primary/10 border-primary/30 text-primary",
      "bg-primary/10 border-primary/30 text-primary",
    ],
    features: [
      "Everything in Starter",
      "24×7 SOC monitoring by CyAssure analysts",
      "Every alert investigated — no triage burden on you",
      "Response guidance via phone, email or Slack",
      "You execute the agreed response actions",
      "CyComp: NIS2 · ISO 27001 · DORA · GDPR/AVG",
      "CySOAR automation playbooks",
      "CyCases incident management & case ticketing",
      "CyMISP threat intelligence (MITRE / STIX/TAXII)",
    ],
    cta: "Start Free Trial",
    ctaHref: "/run-pilot.html",
  },
  {
    name: "Enterprise",
    subtitle: "Full SOC Ownership",
    price: "7.99",
    period: "/user/month",
    target: "Full managed security operations",
    highlight: false,
    badge: null,
    icon: Building2,
    iconColor: "text-emerald-400",
    modelBorder: "border-emerald-500/30",
    modelBg: "bg-emerald-500/8",
    modelLabel: "CyAssure Owns the Incident Lifecycle",
    modelDesc: "CyAssure SOC fully owns detection, investigation, containment, and remediation on CyAssure-managed assets & endpoints — including regular proactive threat hunting to close gaps before attackers find them.",
    flow: ["Alert Fires", "CyAssure Investigates", "CyAssure Acts", "Report to You"],
    flowColors: [
      "bg-emerald-500/10 border-emerald-500/30 text-emerald-300",
      "bg-emerald-500/10 border-emerald-500/30 text-emerald-300",
      "bg-emerald-500/10 border-emerald-500/30 text-emerald-300",
      "bg-emerald-500/10 border-emerald-500/30 text-emerald-300",
    ],
    features: [
      "Everything in Professional",
      "Full incident lifecycle owned by CyAssure SOC",
      "CyAssure performs response on managed assets",
      "Scoped to CyAssure-managed endpoints",
      "Regular proactive threat hunting sessions",
      "Proactive security gap discovery & hardening",
      "Dedicated SOC analyst — named contact",
      "CyMind Custom LLM/RAG deployment",
      "MSSP white-label licensing available",
      "SLA 99.9% · Priority escalation path",
    ],
    cta: "Contact Sales",
    ctaHref: "#contact",
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
    comingSoon: false,
  },
  {
    icon: Radar,
    name: "CyASM",
    tagline: "Attack Surface Management",
    desc: "14 active scan modules — passive to deep — with AI-enriched, risk-scored findings.",
    iconCls: "text-orange-400",
    borderCls: "border-orange-500/30",
    bgCls: "bg-orange-500/5",
    comingSoon: false,
  },
  {
    icon: ShieldCheck,
    name: "CyComp",
    tagline: "Compliance & Governance",
    desc: "Automated gap analysis and evidence collection for NIS2, ISO 27001, DORA, and GDPR/AVG.",
    iconCls: "text-emerald-400",
    borderCls: "border-emerald-500/30",
    bgCls: "bg-emerald-500/5",
    comingSoon: true,
  },
  {
    icon: Monitor,
    name: "Cy360",
    tagline: "SOC Command Center",
    desc: "Unified SOC dashboard integrating CySIEM, CyASM, CyCases, and CySOAR into one command center with real-time incident visibility.",
    iconCls: "text-primary",
    borderCls: "border-primary/30",
    bgCls: "bg-primary/5",
    comingSoon: false,
  },
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
          className="mb-6 text-center"
        >
          <p className="mb-3 text-xs font-medium uppercase tracking-[0.2em] text-primary">Transparent Pricing</p>
          <h2 className="mb-4 font-heading text-3xl font-bold text-foreground md:text-5xl">
            Pay per user. Scale with confidence.
          </h2>
          <p className="mx-auto max-w-xl text-muted-foreground">
            Three service models — from self-managed to fully operated. Pick the level of support that fits your team today, and upgrade as you grow.
          </p>
        </motion.div>

        {/* Service model legend */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-14 flex flex-wrap justify-center gap-4"
        >
          {[
            { color: "bg-blue-400",    label: "Starter — You manage everything" },
            { color: "bg-primary",     label: "Professional — We investigate, you act" },
            { color: "bg-emerald-400", label: "Enterprise — We own the full lifecycle" },
          ].map((item) => (
            <div key={item.label} className="flex items-center gap-2 text-xs text-muted-foreground">
              <span className={`h-2 w-2 rounded-full ${item.color}`} />
              {item.label}
            </div>
          ))}
        </motion.div>

        {/* Plan Cards */}
        <div className="mb-16 grid gap-6 md:grid-cols-3">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={`relative flex flex-col rounded-2xl border p-8 transition-all ${
                plan.highlight
                  ? "border-primary/50 bg-gradient-to-b from-primary/10 to-card shadow-[var(--glow-primary)]"
                  : "border-border bg-card hover:border-primary/30"
              }`}
            >
              {plan.highlight && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="flex items-center gap-1 rounded-full bg-primary px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-primary-foreground">
                    <Star className="h-3 w-3" /> {plan.badge}
                  </span>
                </div>
              )}

              {/* Plan header */}
              <div className="mb-5 flex items-start gap-3">
                <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border ${plan.modelBorder} bg-card/60`}>
                  <plan.icon className={`h-5 w-5 ${plan.iconColor}`} />
                </div>
                <div>
                  <p className="font-heading text-lg font-bold text-foreground">{plan.name}</p>
                  <p className={`text-xs font-semibold ${plan.iconColor}`}>{plan.subtitle}</p>
                </div>
              </div>

              {/* Price */}
              <div className="mb-5 flex items-baseline gap-1">
                <span className="text-sm text-muted-foreground">€</span>
                <span className="font-heading text-4xl font-bold text-foreground">{plan.price}</span>
                <span className="text-sm text-muted-foreground">{plan.period}</span>
              </div>

              <p className="mb-5 text-xs text-muted-foreground">{plan.target}</p>

              {/* Service model callout */}
              <div className={`mb-5 rounded-xl border ${plan.modelBorder} p-4`}>
                <p className={`mb-1.5 text-[10px] font-bold uppercase tracking-wider ${plan.iconColor}`}>
                  How It Works
                </p>
                {/* Flow diagram */}
                <div className="mb-3 flex flex-wrap items-center gap-1">
                  {plan.flow.map((step, si) => (
                    <span key={step} className="flex items-center gap-1">
                      <span className={`rounded-md border px-2 py-0.5 text-[10px] font-medium ${plan.flowColors[si]}`}>
                        {step}
                      </span>
                      {si < plan.flow.length - 1 && (
                        <ArrowRight className={`h-3 w-3 ${plan.iconColor} opacity-60`} />
                      )}
                    </span>
                  ))}
                </div>
                <p className="text-[11px] leading-relaxed text-muted-foreground">{plan.modelDesc}</p>
              </div>

              {/* Feature list */}
              <ul className="mb-8 flex-1 space-y-2">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <Check className={`mt-0.5 h-4 w-4 shrink-0 ${plan.iconColor}`} />
                    {f}
                  </li>
                ))}
              </ul>

              <a
                href={plan.ctaHref}
                className={`block rounded-lg py-3.5 text-center text-sm font-semibold transition-all ${
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
                className={`group relative flex flex-col rounded-2xl border ${mod.borderCls} ${mod.bgCls} p-6 transition-all hover:shadow-[var(--glow-primary)]`}
              >
                {mod.comingSoon && (
                  <div className="absolute -top-2.5 right-3">
                    <span className="rounded-full border border-violet-500/40 bg-violet-500/20 px-2.5 py-0.5 text-[9px] font-bold uppercase tracking-widest text-violet-300">
                      Coming Soon
                    </span>
                  </div>
                )}
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
                  {mod.comingSoon ? "Join Waitlist" : "Contact for Pricing"} <ArrowRight className="h-3 w-3" />
                </a>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Bottom CTA */}
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
                {[
                  "Professional services: €2–10K / project",
                  "Compliance audits: €5–15K",
                  "MSSP white-label licensing",
                  "Training & certification bundles",
                ].map((line) => (
                  <li key={line} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                    {line}
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex flex-col justify-center">
              <h3 className="mb-3 font-heading text-xl font-bold text-foreground">Live in under 30 minutes</h3>
              <p className="mb-4 text-sm text-muted-foreground">
                All plans include guided onboarding. Our automated installer gets you fully operational in under 30 minutes — no months-long implementations, no armies of consultants.
              </p>
              <a
                href="/book-consultation.html"
                className="inline-block rounded-lg bg-primary px-6 py-3 text-center text-sm font-semibold text-primary-foreground transition-all hover:brightness-110"
              >
                Book a Consultation
              </a>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default PricingSection;

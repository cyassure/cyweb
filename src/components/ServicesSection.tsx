import { motion } from "framer-motion";
import {
  Shield, Eye, MonitorSpeaker, Globe, Cloud, FileCheck, UserCog, Bug, Bot,
  Fish, Building2, Heart, Factory, Cpu, Landmark, Rocket, ArrowRight
} from "lucide-react";

const services = [
  {
    icon: Eye,
    title: "Managed Detection & Response",
    desc: "24×7 monitoring, detection, investigation, and response across endpoints, networks, and cloud.",
    bullets: [
      "Continuous threat monitoring & behavioral analytics",
      "Threat hunting & incident validation",
      "Containment guidance & executive reporting",
    ],
    outcome: "Fewer false positives. Faster response. Reduced impact.",
  },
  {
    icon: MonitorSpeaker,
    title: "SOC as a Service",
    desc: "A fully operational Security Operations Center — without the hiring, training, or infrastructure overhead.",
    bullets: [
      "Tier 1–3 analyst coverage around the clock",
      "Alert triage & use case engineering",
      "Incident handling with SLA management",
    ],
    outcome: "You stay focused on business. We handle the battlefield.",
  },
  {
    icon: Shield,
    title: "SIEM / EDR / NDR",
    desc: "Unified detection across your entire environment — logs, endpoints, and network in one view.",
    bullets: [
      "Wazuh-based SIEM with custom correlation rules",
      "Endpoint detection, response & isolation",
      "Network traffic analysis & lateral movement detection",
    ],
    outcome: "One pane of glass — every threat surface visible.",
  },
  {
    icon: Globe,
    title: "Attack Surface Monitoring",
    desc: "Continuous external exposure discovery — find what attackers see before they do.",
    bullets: [
      "DNS recon, subdomain enumeration & OSINT",
      "SSL/crypto, email security & web exposure analysis",
      "Dark web credential & IOC monitoring",
    ],
    outcome: "Know your attack surface. Close gaps proactively.",
  },
  {
    icon: Cloud,
    title: "Cloud Security",
    desc: "Protect workloads, configurations, and identities across AWS, Azure, GCP, and hybrid environments.",
    bullets: [
      "Cloud posture management (CSPM) & misconfiguration detection",
      "Cloud identity & access review (CIEM)",
      "Container, Kubernetes & cloud-native threat detection",
    ],
    outcome: "Full cloud visibility with continuous compliance — no blind spots.",
  },
  {
    icon: FileCheck,
    title: "GRC & Compliance",
    desc: "From gap assessments to audit readiness — simplifying governance for ISO 27001, NIS2, DORA, and GDPR.",
    bullets: [
      "Gap assessments, policy development & evidence collection",
      "Continuous compliance monitoring & risk alignment",
      "Audit support across ISO, NIS2, DORA & GDPR/AVG",
    ],
    outcome: "Stay compliant without the complexity. Focus on growth.",
  },
  {
    icon: UserCog,
    title: "vCISO Services",
    desc: "Executive-level security leadership tailored to your risk profile — without the full-time cost.",
    bullets: [
      "Security strategy, roadmap & risk management",
      "Board-level reporting & vendor evaluation",
      "Incident oversight & regulatory liaison",
    ],
    outcome: "C-level security expertise on demand, at a fraction of the cost.",
  },
  {
    icon: Bug,
    title: "Penetration Testing",
    desc: "Automated, manual, and hybrid testing across networks, web applications, cloud, and APIs.",
    bullets: [
      "Network, web app, API & cloud penetration testing",
      "External exposure assessment & red team exercises",
      "Prioritised findings with clear remediation guidance",
    ],
    outcome: "Find your gaps before attackers do.",
  },
  {
    icon: Bot,
    title: "AI-driven Security Ops",
    desc: "LLM-powered enrichment, automated investigations, and smart correlation — less noise for your analysts.",
    bullets: [
      "AI alert enrichment & automated triage",
      "Incident narrative generation & root cause analysis",
      "SOAR playbooks for automated containment & response",
    ],
    outcome: "Less noise, faster resolution, smarter analysts.",
  },
  {
    icon: Fish,
    title: "Security Awareness & Phishing",
    desc: "Build a security-first culture — turn your people from your biggest risk into your strongest defence.",
    bullets: [
      "Phishing simulations with real-world templates",
      "Role-based awareness programs & executive training",
      "Reporting dashboards & measurable improvement metrics",
    ],
    outcome: "Measurable behaviour change across your entire organisation.",
  },
];

const industries = [
  { icon: Building2, label: "Financial Services" },
  { icon: Heart,     label: "Healthcare" },
  { icon: Factory,   label: "Manufacturing" },
  { icon: Cpu,       label: "Technology" },
  { icon: Landmark,  label: "Government" },
  { icon: Rocket,    label: "SMEs & Startups" },
];

const ServicesSection = () => {
  return (
    <section id="services" className="relative py-24">
      <div className="container mx-auto px-6">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <p className="mb-3 text-xs font-medium uppercase tracking-[0.2em] text-primary">What We Do</p>
          <h2 className="mb-4 font-heading text-3xl font-bold text-foreground md:text-5xl">
            Security, End to End
          </h2>
          <p className="mx-auto max-w-xl text-muted-foreground">
            Whether you need a fully managed SOC, compliance support, or your own customisable platform — we make security practical, scalable, and affordable.
          </p>
        </motion.div>

        {/* Service cards — expanded */}
        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {services.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="group flex flex-col rounded-xl border border-border bg-card p-6 transition-all hover:border-primary/40 hover:shadow-[var(--glow-primary)]"
            >
              {/* Icon */}
              <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl border border-border bg-secondary/50 transition-all group-hover:border-primary/40 group-hover:bg-primary/10">
                <s.icon className="h-5 w-5 text-primary transition-transform group-hover:scale-110" />
              </div>

              {/* Title + desc */}
              <h3 className="mb-2 font-heading text-base font-bold text-foreground">{s.title}</h3>
              <p className="mb-4 text-sm leading-relaxed text-muted-foreground">{s.desc}</p>

              {/* Bullets */}
              <ul className="mb-4 flex-1 space-y-2">
                {s.bullets.map((b) => (
                  <li key={b} className="flex items-start gap-2 text-xs text-muted-foreground">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                    {b}
                  </li>
                ))}
              </ul>

              {/* Outcome */}
              <p className="mt-auto rounded-lg border border-primary/15 bg-primary/5 px-3 py-2 text-xs font-medium text-foreground">
                {s.outcome}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Industries */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-20"
        >
          <p className="mb-6 text-center text-xs font-medium uppercase tracking-[0.2em] text-primary">Industries We Serve</p>
          <div className="flex flex-wrap justify-center gap-3">
            {industries.map((ind) => (
              <div
                key={ind.label}
                className="flex items-center gap-2 rounded-full border border-border bg-card px-5 py-2.5 text-sm text-foreground transition-colors hover:border-primary/40 hover:bg-secondary/50"
              >
                <ind.icon className="h-4 w-4 text-primary" />
                {ind.label}
              </div>
            ))}
          </div>
        </motion.div>

        {/* Why switch banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 rounded-2xl border border-primary/20 bg-gradient-to-br from-primary/5 to-transparent p-8 text-center md:p-12"
        >
          <h3 className="mb-6 font-heading text-2xl font-bold text-foreground md:text-3xl">
            Why Customers Switch to Cycentra
          </h3>
          <div className="mb-8 flex flex-wrap justify-center gap-3">
            {["Open, not locked", "Smart, not noisy", "Fast, not slow", "Affordable, not overpriced", "Real expert support"].map((item) => (
              <span key={item} className="rounded-full border border-primary/30 bg-primary/10 px-5 py-2 text-sm font-medium text-foreground">
                ✔ {item}
              </span>
            ))}
          </div>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-all hover:brightness-110"
          >
            Talk to an Expert <ArrowRight className="h-4 w-4" />
          </a>
        </motion.div>

      </div>
    </section>
  );
};

export default ServicesSection;

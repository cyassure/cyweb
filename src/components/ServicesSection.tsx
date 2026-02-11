import { motion } from "framer-motion";
import {
  Shield, Eye, MonitorSpeaker, Globe, Cloud, FileCheck, UserCog, Bug, Bot
} from "lucide-react";

const services = [
  { icon: Eye, title: "Managed Detection & Response", desc: "24×7 monitoring, detection, and response across endpoints, networks, and cloud." },
  { icon: MonitorSpeaker, title: "SOC as a Service", desc: "Fully operational Security Operations Center without the overhead." },
  { icon: Shield, title: "SIEM / EDR / NDR", desc: "Unified visibility across your entire security stack." },
  { icon: Globe, title: "Attack Surface Monitoring", desc: "Continuous discovery and assessment of your external exposure." },
  { icon: Cloud, title: "Cloud Security", desc: "Protect workloads, configurations, and identities in multi-cloud environments." },
  { icon: FileCheck, title: "GRC & Compliance", desc: "From policies to audit readiness — ISO, SOC, and beyond." },
  { icon: UserCog, title: "vCISO Services", desc: "Executive-level security leadership without a full-time hire." },
  { icon: Bug, title: "Penetration Testing", desc: "Automated, manual, and hybrid testing across networks, web, cloud & APIs." },
  { icon: Bot, title: "AI-driven Security Ops", desc: "LLM-powered alert enrichment, automated investigations, and smart correlation." },
];

const ServicesSection = () => {
  return (
    <section id="services" className="relative py-24">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <p className="mb-3 text-xs font-medium uppercase tracking-[0.2em] text-primary">What We Do</p>
          <h2 className="font-heading text-3xl font-bold text-foreground md:text-5xl">
            Security, End to End
          </h2>
        </motion.div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="group rounded-xl border border-border bg-card p-6 transition-all hover:border-primary/30 hover:shadow-[var(--glow-primary)]"
            >
              <s.icon className="mb-4 h-8 w-8 text-primary transition-transform group-hover:scale-110" />
              <h3 className="mb-2 font-heading text-lg font-semibold text-foreground">{s.title}</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;

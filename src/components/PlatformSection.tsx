import { motion } from "framer-motion";
import {
  Shield, Monitor, Settings, FileCheck, Cloud, Target, Network, Globe, Bot
} from "lucide-react";

const capabilities = [
  { icon: Shield, label: "SIEM" },
  { icon: Monitor, label: "EDR" },
  { icon: Settings, label: "Config Audit" },
  { icon: FileCheck, label: "Compliance" },
  { icon: Cloud, label: "Cloud Security" },
  { icon: Target, label: "MITRE ATT&CK" },
  { icon: Network, label: "NDR" },
  { icon: Globe, label: "Attack Surface" },
  { icon: Bot, label: "AI Agents" },
];

const PlatformSection = () => {
  return (
    <section id="platform" className="relative py-24">
      <div className="absolute right-0 top-0 h-[500px] w-[500px] rounded-full bg-accent/3 blur-[150px]" />

      <div className="container relative mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <p className="mb-3 text-xs font-medium uppercase tracking-[0.2em] text-primary">Cycentra Security Platform</p>
          <h2 className="mb-4 font-heading text-3xl font-bold text-foreground md:text-5xl">
            Open platforms, smart intelligence
          </h2>
          <p className="mx-auto max-w-2xl text-muted-foreground">
            Built on trusted open technologies, enhanced with proprietary intelligence and automation layers. We transform open platforms into smart sensors, smart storage, and smart correlation engines.
          </p>
        </motion.div>

        <div className="grid grid-cols-3 gap-3 sm:grid-cols-3 lg:grid-cols-9">
          {capabilities.map((c, i) => (
            <motion.div
              key={c.label}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.04 }}
              className="flex flex-col items-center gap-2 rounded-xl border border-border bg-card p-4 text-center transition-all hover:border-primary/40 hover:shadow-[var(--glow-primary)]"
            >
              <c.icon className="h-6 w-6 text-primary" />
              <span className="text-xs font-medium text-foreground">{c.label}</span>
            </motion.div>
          ))}
        </div>

        {/* Embedded Intelligence */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 rounded-2xl border border-primary/20 bg-gradient-to-br from-primary/5 to-accent/5 p-8 md:p-12"
        >
          <div className="grid items-center gap-8 md:grid-cols-2">
            <div>
              <h3 className="mb-4 font-heading text-2xl font-bold text-foreground">Embedded Intelligence</h3>
              <p className="mb-4 text-muted-foreground">
                Cycentra integrates custom Large Language Models (LLMs) to enrich alerts, automate investigations, summarize incidents, and recommend actions.
              </p>
              <p className="text-sm text-primary font-medium">Need control? You can Bring Your Own AI/LLM.</p>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {["Enrich alerts", "Automate investigations", "Summarize incidents", "Recommend actions"].map((item) => (
                <div key={item} className="rounded-lg border border-border bg-card p-3 text-center text-sm text-foreground">
                  {item}
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default PlatformSection;

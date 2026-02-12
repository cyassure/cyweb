import { motion } from "framer-motion";
import {
  Shield, Monitor, Settings, FileCheck, Cloud, Target, Network, Globe, Bot
} from "lucide-react";
import logConvergence from "@/assets/log-convergence.jpg";
import aiIntelligence from "@/assets/ai-intelligence.jpg";

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

        {/* Log convergence visual */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="relative mb-16 overflow-hidden rounded-2xl border border-border/50"
        >
          <img
            src={logConvergence}
            alt="Multiple log sources from servers, endpoints, cloud, and network converging into Cycentra's unified security platform"
            className="w-full"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-8 text-center">
            <p className="font-heading text-lg font-semibold text-foreground md:text-xl">
              Logs from every source. Processed by one platform.
            </p>
            <p className="mt-2 text-sm text-muted-foreground">
              Firewalls · Endpoints · Cloud · Network · Identity — all unified.
            </p>
          </div>
          {/* Animated data flow lines */}
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="absolute left-0 h-px w-full bg-gradient-to-r from-transparent via-primary/40 to-transparent"
              style={{ top: `${30 + i * 20}%` }}
              animate={{ x: ["-100%", "100%"] }}
              transition={{ duration: 3 + i, repeat: Infinity, ease: "linear", delay: i * 0.5 }}
            />
          ))}
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

        {/* Embedded Intelligence with AI image */}
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
            <div className="relative">
              <img
                src={aiIntelligence}
                alt="AI-powered threat intelligence with neural network processing security data, analyzing malware signatures and anomaly patterns"
                className="rounded-xl border border-border/30 w-full"
                loading="lazy"
              />
              {/* Pulsing glow overlay */}
              <motion.div
                className="absolute inset-0 rounded-xl border-2 border-primary/20"
                animate={{ opacity: [0.3, 0.8, 0.3] }}
                transition={{ duration: 3, repeat: Infinity }}
              />
            </div>
          </div>
          <div className="mt-8 grid grid-cols-2 gap-3 md:grid-cols-4">
            {["Enrich alerts", "Automate investigations", "Summarize incidents", "Recommend actions"].map((item, i) => (
              <motion.div
                key={item}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="rounded-lg border border-border bg-card p-3 text-center text-sm text-foreground"
              >
                {item}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default PlatformSection;

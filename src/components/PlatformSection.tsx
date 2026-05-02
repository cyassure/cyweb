import { motion } from "framer-motion";
import {
  Shield, Monitor, Settings, FileCheck, Cloud, Target, Network, Globe, Bot,
  Server, Wifi, Database, Cpu, Lock, AlertTriangle, ArrowRight, Zap, Brain
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

const logSources = [
  { icon: Server, label: "Servers", color: "text-blue-400" },
  { icon: Wifi, label: "Firewalls", color: "text-green-400" },
  { icon: Cloud, label: "Cloud", color: "text-purple-400" },
  { icon: Monitor, label: "Endpoints", color: "text-yellow-400" },
  { icon: Lock, label: "Identity", color: "text-red-400" },
  { icon: Network, label: "Network", color: "text-cyan-400" },
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

        {/* Animated log convergence diagram */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="relative mb-16 overflow-hidden rounded-2xl border border-border/50 bg-card p-8"
        >
          <p className="mb-6 text-center text-sm font-medium text-foreground">
            Logs from every source. Processed by one platform.
          </p>

          <div className="flex items-center justify-between gap-4 md:gap-8">
            {/* Log sources */}
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:flex md:flex-col">
              {logSources.map((source, i) => (
                <motion.div
                  key={source.label}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="flex items-center gap-2 rounded-lg border border-border bg-secondary/50 px-3 py-2"
                >
                  <source.icon className={`h-4 w-4 ${source.color}`} />
                  <span className="text-xs text-muted-foreground">{source.label}</span>
                </motion.div>
              ))}
            </div>

            {/* Animated flow */}
            <div className="relative hidden flex-1 md:block" style={{ height: "180px" }}>
              <svg className="absolute inset-0 h-full w-full" viewBox="0 0 300 180" preserveAspectRatio="none">
                {[0, 1, 2, 3, 4, 5].map((i) => (
                  <motion.path
                    key={i}
                    d={`M0,${15 + i * 30} Q150,${15 + i * 30} 300,90`}
                    fill="none"
                    stroke="hsl(var(--primary))"
                    strokeWidth="1"
                    strokeOpacity="0.35"
                    strokeDasharray="5 3"
                    initial={{ pathLength: 0 }}
                    whileInView={{ pathLength: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.5, delay: 0.3 + i * 0.1 }}
                  />
                ))}
              </svg>
              {/* Animated data packets */}
              {[0, 1, 2, 3, 4, 5].map((i) => (
                <motion.div
                  key={i}
                  className="absolute h-2 w-2 rounded-full bg-primary shadow-[0_0_6px_hsl(var(--primary))]"
                  style={{ top: `${8 + i * 16.5}%`, left: "0%" }}
                  animate={{ left: ["0%", "100%"], top: [`${8 + i * 16.5}%`, "50%"] }}
                  transition={{
                    duration: 2.5,
                    repeat: Infinity,
                    delay: i * 0.5,
                    ease: "easeInOut",
                  }}
                />
              ))}
            </div>

            {/* Central platform */}
            <motion.div
              initial={{ opacity: 0, scale: 0.7 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6, type: "spring" }}
              className="relative flex shrink-0 flex-col items-center gap-3 rounded-2xl border border-primary/50 bg-gradient-to-b from-primary/15 to-card p-6 shadow-[var(--glow-primary)]"
            >
              {/* Rotating outer ring */}
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 rounded-2xl border border-primary/20"
              />
              {/* Violet CyMind pulse rings */}
              {[1, 2].map((ring) => (
                <motion.div
                  key={ring}
                  className="absolute rounded-2xl border border-violet-400/20"
                  style={{ inset: `-${ring * 7}px` }}
                  animate={{ opacity: [0, 0.4, 0], scale: [0.96, 1.04, 0.96] }}
                  transition={{ duration: 2.5, repeat: Infinity, delay: ring * 0.5 }}
                />
              ))}
              <Shield className="h-10 w-10 text-primary" />
              <div className="text-center">
                <p className="font-heading text-xs font-bold text-foreground">CYCENTRA</p>
                <p className="text-[10px] text-muted-foreground">Platform Core</p>
              </div>
              {/* CyMind AI badge */}
              <div className="flex items-center gap-1 rounded-full border border-violet-500/40 bg-violet-500/10 px-2.5 py-1">
                <motion.div
                  animate={{ opacity: [1, 0.3, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <Brain className="h-3 w-3 text-violet-400" />
                </motion.div>
                <span className="text-[9px] font-semibold text-violet-400">CyMind AI</span>
              </div>
              <div className="flex gap-1">
                {[0, 1, 2].map((i) => (
                  <motion.div
                    key={i}
                    className="h-1.5 w-1.5 rounded-full bg-primary"
                    animate={{ opacity: [0.3, 1, 0.3] }}
                    transition={{ duration: 1, repeat: Infinity, delay: i * 0.3 }}
                  />
                ))}
              </div>
            </motion.div>

            {/* Animated outflow */}
            <div className="relative hidden flex-1 md:block" style={{ height: "180px" }}>
              <svg className="absolute inset-0 h-full w-full" viewBox="0 0 300 180" preserveAspectRatio="none">
                {[0, 1, 2].map((i) => (
                  <motion.path
                    key={i}
                    d={`M0,90 Q150,${45 + i * 45} 300,${30 + i * 60}`}
                    fill="none"
                    stroke="hsl(var(--primary))"
                    strokeWidth="1.2"
                    strokeOpacity="0.5"
                    initial={{ pathLength: 0 }}
                    whileInView={{ pathLength: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.5, delay: 0.8 + i * 0.1 }}
                  />
                ))}
              </svg>
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  className="absolute h-2 w-2 rounded-full bg-primary shadow-[0_0_6px_hsl(var(--primary))]"
                  animate={{ left: ["0%", "100%"], top: ["50%", `${16 + i * 33}%`] }}
                  transition={{ duration: 2, repeat: Infinity, delay: i * 0.6, ease: "easeInOut" }}
                />
              ))}
            </div>

            {/* Outputs */}
            <div className="flex flex-col gap-2">
              {[
                { icon: AlertTriangle, label: "Alerts" },
                { icon: Zap, label: "Auto-Response" },
                { icon: FileCheck, label: "Reports" },
              ].map((item, i) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 1 + i * 0.1 }}
                  className="flex items-center gap-2 rounded-lg border border-primary/20 bg-primary/5 px-3 py-2"
                >
                  <item.icon className="h-4 w-4 text-primary" />
                  <span className="text-xs text-foreground">{item.label}</span>
                </motion.div>
              ))}
            </div>
          </div>

          <p className="mt-6 text-center text-xs text-muted-foreground">
            Firewalls · Endpoints · Cloud · Network · Identity — all unified.{" "}
            <span className="text-violet-400/80">Powered by CyMind AI.</span>
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

            {/* Animated AI visual */}
            <div className="relative flex items-center justify-center rounded-xl border border-border/30 bg-card p-8">
              <div className="relative flex flex-col items-center gap-4">
                {/* Neural network animation */}
                <motion.div
                  className="relative h-24 w-24"
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                >
                  <div className="absolute inset-0 rounded-full border border-primary/20" />
                  <div className="absolute inset-3 rounded-full border border-primary/30" />
                  <div className="absolute inset-6 rounded-full border border-primary/40" />
                  <div className="absolute inset-9 flex items-center justify-center rounded-full bg-primary/10">
                    <Bot className="h-6 w-6 text-primary" />
                  </div>
                  {[0, 1, 2, 3, 4, 5].map((i) => (
                    <motion.div
                      key={i}
                      className="absolute h-2 w-2 rounded-full bg-primary"
                      style={{
                        top: `${50 - 45 * Math.cos((i * Math.PI * 2) / 6)}%`,
                        left: `${50 + 45 * Math.sin((i * Math.PI * 2) / 6)}%`,
                      }}
                      animate={{ opacity: [0.3, 1, 0.3], scale: [0.8, 1.2, 0.8] }}
                      transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
                    />
                  ))}
                </motion.div>
                <p className="text-center text-xs font-medium text-foreground">AI Processing Engine</p>
                <p className="text-center text-[10px] text-muted-foreground">Threat correlation · Pattern recognition · Auto-triage</p>
              </div>
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

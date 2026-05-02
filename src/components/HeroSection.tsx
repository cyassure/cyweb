import { motion } from "framer-motion";
import { ArrowRight, Play, Shield, Activity, Lock, Server, Wifi, Database, AlertTriangle, Brain, Zap } from "lucide-react";

const logSources = [
  { icon: Server, label: "Servers" },
  { icon: Wifi, label: "Firewalls" },
  { icon: Database, label: "Cloud" },
  { icon: Shield, label: "Endpoints" },
  { icon: Lock, label: "Identity" },
];

const HeroSection = () => {
  return (
    <section className="relative min-h-screen overflow-hidden pt-20">
      {/* Grid pattern overlay */}
      <div className="absolute inset-0 grid-pattern opacity-30" />

      {/* Glow effects */}
      <div className="absolute left-1/2 top-1/3 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/5 blur-[120px]" />
      <div className="absolute right-0 top-0 h-[300px] w-[300px] rounded-full bg-accent/5 blur-[100px]" />

      <div className="container relative mx-auto flex min-h-[calc(100vh-5rem)] flex-col items-center justify-center px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl"
        >
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-secondary/50 px-4 py-1.5 text-xs text-muted-foreground">
            <span className="h-1.5 w-1.5 animate-pulse-glow rounded-full bg-primary" />
            Headquartered in the Netherlands · Operating Globally · Securing What Matters
          </div>

          <h1 className="mb-6 font-heading text-5xl font-bold leading-tight tracking-tight text-foreground md:text-7xl">
            From Signals to{" "}
            <span className="text-gradient">Strength.</span>
          </h1>

          <p className="mx-auto mb-4 max-w-2xl text-lg leading-relaxed text-muted-foreground md:text-xl">
            Cycentra helps organizations transform raw security data into real, actionable defense.
          </p>
          <p className="mx-auto mb-10 max-w-2xl text-sm leading-relaxed text-muted-foreground/70 md:text-base">
            Enterprise-grade cybersecurity services, powered by open platforms, intelligent automation, and human expertise.
          </p>

          <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <a
              href="#contact"
              className="group flex items-center gap-2 rounded-lg bg-primary px-7 py-3.5 font-heading text-sm font-semibold text-primary-foreground transition-all hover:brightness-110"
            >
              Talk to an Expert
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>
            <a
              href="#contact"
              className="flex items-center gap-2 rounded-lg border border-border bg-secondary/50 px-7 py-3.5 font-heading text-sm font-semibold text-foreground transition-all hover:border-primary/50 hover:bg-secondary"
            >
              <Play className="h-4 w-4 text-primary" />
              Request a Demo
            </a>
            <a
              href="#contact"
              className="text-sm text-muted-foreground underline decoration-primary/40 underline-offset-4 transition-colors hover:text-primary"
            >
              Free Assessment →
            </a>
          </div>
        </motion.div>

        {/* ── Value proposition strip ──────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1, duration: 0.7 }}
          className="mt-10 w-full max-w-3xl overflow-hidden rounded-2xl border border-border/50 bg-card/30 backdrop-blur-sm"
        >
          <div className="flex flex-col divide-y divide-border/40 sm:flex-row sm:divide-x sm:divide-y-0">
            {[
              {
                icon: Zap,
                headline: "Hours, not months",
                sub: "Deploy a production-ready SOC with AI-driven threat prioritization — onboarding measured in hours, not weeks.",
              },
              {
                icon: Activity,
                headline: "~70% less SOC noise",
                sub: "Intelligent correlation and AI prioritization cut alert fatigue before it reaches your analysts. No heavy setup required.",
              },
              {
                icon: Brain,
                headline: "Intelligence, not alerts",
                sub: "We're not selling monitoring. We deliver speed, simplicity, and actionable signal — every time.",
              },
            ].map((item) => (
              <div key={item.headline} className="flex flex-1 flex-col gap-2 px-6 py-5 text-center sm:text-left">
                <item.icon className="mx-auto h-5 w-5 text-primary sm:mx-0" />
                <p className="font-heading text-sm font-bold text-foreground">{item.headline}</p>
                <p className="text-[11px] leading-relaxed text-muted-foreground">{item.sub}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Animated log convergence diagram */}
        <motion.div
          initial={{ opacity: 0, y: 60, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="mt-16 w-full max-w-4xl"
        >
          <div className="relative rounded-2xl border border-border/50 bg-card/30 p-8 backdrop-blur-sm">
            <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-primary/20 via-accent/10 to-primary/20 blur-sm" />
            <div className="relative">
              <p className="mb-8 text-center text-xs font-medium uppercase tracking-[0.2em] text-primary">
                Unified Security Intelligence
              </p>

              {/* Log sources → platform diagram */}
              <div className="flex items-center justify-between gap-4">
                {/* Sources */}
                <div className="flex flex-col gap-3">
                  {logSources.map((source, i) => (
                    <motion.div
                      key={source.label}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.8 + i * 0.1 }}
                      className="flex items-center gap-2 rounded-lg border border-border bg-secondary/50 px-3 py-2"
                    >
                      <source.icon className="h-4 w-4 text-primary" />
                      <span className="text-xs text-muted-foreground">{source.label}</span>
                    </motion.div>
                  ))}
                </div>

                {/* Animated flow lines + dots following diagonal paths */}
                <div className="relative flex-1 overflow-hidden">
                  <svg className="h-full w-full" viewBox="0 0 200 140" preserveAspectRatio="none">
                    <defs>
                      {[0, 1, 2, 3, 4].map((i) => (
                        <path
                          key={i}
                          id={`flow-path-${i}`}
                          d={`M0,${14 + i * 28} L200,70`}
                          fill="none"
                        />
                      ))}
                    </defs>

                    {[0, 1, 2, 3, 4].map((i) => {
                      const y1 = 14 + i * 28;
                      return (
                        <g key={i}>
                          {/* Dashed diagonal line */}
                          <motion.line
                            x1="0" y1={y1} x2="200" y2="70"
                            stroke="hsl(var(--primary))"
                            strokeWidth="0.8"
                            strokeOpacity="0.4"
                            strokeDasharray="4 4"
                            initial={{ pathLength: 0, opacity: 0 }}
                            animate={{ pathLength: 1, opacity: 0.6 }}
                            transition={{ duration: 1.2, delay: 1 + i * 0.12 }}
                          />
                          {/* Dot travelling along the exact diagonal via animateMotion */}
                          <circle r="2.5" style={{ fill: "hsl(var(--primary))" }}>
                            <animateMotion
                              dur={`${2 + i * 0.3}s`}
                              repeatCount="indefinite"
                              begin={`${i * 0.5}s`}
                            >
                              <mpath href={`#flow-path-${i}`} />
                            </animateMotion>
                          </circle>
                        </g>
                      );
                    })}
                  </svg>
                </div>

                {/* Central platform with AI layer */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1.5, duration: 0.5 }}
                  className="relative flex flex-col items-center gap-2 rounded-xl border border-primary/40 bg-gradient-to-b from-primary/10 to-card p-5 shadow-[var(--glow-primary)]"
                >
                  <motion.div
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <Shield className="h-8 w-8 text-primary" />
                  </motion.div>
                  <span className="text-xs font-bold text-foreground">CYCENTRA</span>
                  <span className="text-[10px] text-muted-foreground">Platform</span>

                  {/* CyMind AI badge */}
                  <div className="mt-1 flex items-center gap-1 rounded-full border border-violet-500/40 bg-violet-500/10 px-2 py-0.5">
                    <motion.div
                      animate={{ opacity: [1, 0.3, 1] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      <Brain className="h-3 w-3 text-violet-400" />
                    </motion.div>
                    <span className="text-[9px] font-semibold text-violet-400">CyMind AI</span>
                  </div>

                  {/* AI inference pulse rings */}
                  {[1, 2, 3].map((ring) => (
                    <motion.div
                      key={ring}
                      className="absolute rounded-xl border border-violet-400/20"
                      style={{ inset: `-${ring * 6}px` }}
                      animate={{ opacity: [0, 0.5, 0], scale: [0.95, 1.05, 0.95] }}
                      transition={{ duration: 2.5, repeat: Infinity, delay: ring * 0.4 }}
                    />
                  ))}

                  <motion.div
                    className="absolute -inset-0.5 rounded-xl border border-primary/30"
                    animate={{ opacity: [0.3, 0.8, 0.3] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                </motion.div>

                {/* Outputs */}
                <div className="flex flex-col gap-3">
                  {[
                    { icon: AlertTriangle, label: "Alerts" },
                    { icon: Brain, label: "AI Triage" },
                    { icon: Activity, label: "Insights" },
                    { icon: Lock, label: "Response" },
                  ].map((item, i) => (
                    <motion.div
                      key={item.label}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 1.8 + i * 0.1 }}
                      className="flex items-center gap-2 rounded-lg border border-border bg-secondary/50 px-3 py-2"
                    >
                      <item.icon className="h-4 w-4 text-primary" />
                      <span className="text-xs text-muted-foreground">{item.label}</span>
                    </motion.div>
                  ))}
                </div>
              </div>

              <div className="mt-6 flex flex-wrap justify-center gap-4 text-xs text-muted-foreground/60">
                <span>24×7 Monitoring</span>
                <span>·</span>
                <motion.span
                  className="text-violet-400/80"
                  animate={{ opacity: [0.6, 1, 0.6] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  CyMind AI
                </motion.span>
                <span>·</span>
                <span>AI Correlation</span>
                <span>·</span>
                <span>Human Expertise</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          className="absolute bottom-10"
        >
          <div className="flex flex-col items-center gap-2 text-muted-foreground/40">
            <span className="text-xs tracking-widest uppercase">Scroll</span>
            <div className="h-8 w-px bg-gradient-to-b from-primary/50 to-transparent" />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;

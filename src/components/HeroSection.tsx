import { motion } from "framer-motion";
import { ArrowRight, Play, Lock, Zap, Activity, Brain } from "lucide-react";
import dashboardScreenshot from "@/assets/screenshots/attack-posture.jpg";

const stats = [
  { icon: Zap, value: "<30 min", label: "To fully operational" },
  { icon: Activity, value: "~70%", label: "Less SOC noise" },
  { icon: Brain, value: "24×7", label: "AI-assisted monitoring" },
];

const HeroSection = () => {
  return (
    <section className="relative overflow-hidden pt-20">
      <div className="absolute inset-0 grid-pattern opacity-30" />
      <div className="absolute left-1/2 top-0 h-[500px] w-[700px] -translate-x-1/2 rounded-full bg-primary/5 blur-[130px]" />

      <div className="container relative mx-auto px-6 pb-16 pt-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="mx-auto max-w-2xl"
        >
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-border bg-secondary/50 px-4 py-1.5 text-xs text-muted-foreground">
            <span className="h-1.5 w-1.5 animate-pulse-glow rounded-full bg-primary" />
            Headquartered in the Netherlands · Operating Globally
          </div>

          <h1 className="mb-4 font-heading text-3xl font-bold leading-tight tracking-tight text-foreground md:text-4xl">
            Next-Generation Cybersecurity <span className="text-gradient">and AI</span>
          </h1>

          <p className="mx-auto mb-8 max-w-xl text-sm leading-relaxed text-muted-foreground md:text-base">
            Cy360 turns raw security signals into real, actionable defense — one unified platform, self-hosted or fully managed.
          </p>

          <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <a
              href="#contact"
              className="group flex items-center gap-2 rounded-lg bg-primary px-6 py-3 font-heading text-sm font-semibold text-primary-foreground transition-all hover:brightness-110"
            >
              Talk to an Expert
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>
            <a
              href="#contact"
              className="flex items-center gap-2 rounded-lg border border-border bg-secondary/50 px-6 py-3 font-heading text-sm font-semibold text-foreground transition-all hover:border-primary/50 hover:bg-secondary"
            >
              <Play className="h-4 w-4 text-primary" />
              Request a Demo
            </a>
          </div>
        </motion.div>

        {/* Dominant visual — real Cy360 dashboard, framed like a browser window */}
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative mx-auto mt-12 max-w-5xl"
        >
          <div className="absolute -inset-4 rounded-[2rem] bg-gradient-to-r from-primary/20 via-accent/10 to-violet-500/20 blur-2xl" />
          <div className="relative overflow-hidden rounded-2xl border border-border/60 bg-card shadow-2xl">
            <div className="flex items-center gap-2 border-b border-border/60 bg-secondary/40 px-4 py-2.5">
              <span className="h-2.5 w-2.5 rounded-full bg-red-400/70" />
              <span className="h-2.5 w-2.5 rounded-full bg-yellow-400/70" />
              <span className="h-2.5 w-2.5 rounded-full bg-green-400/70" />
              <span className="ml-3 flex items-center gap-1.5 rounded-md bg-background/60 px-3 py-1 text-[11px] text-muted-foreground">
                <Lock className="h-3 w-3 text-primary" /> cy360.cyassure.eu
              </span>
            </div>
            <img
              src={dashboardScreenshot}
              alt="Cy360 External Attack Posture dashboard — live security score, SSL health, and infrastructure exposure"
              className="w-full"
              loading="eager"
            />
          </div>
        </motion.div>

        {/* Compact stat strip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="mx-auto mt-8 flex max-w-2xl flex-wrap justify-center gap-6"
        >
          {stats.map((s) => (
            <div key={s.label} className="flex items-center gap-2 text-sm">
              <s.icon className="h-4 w-4 text-primary" />
              <span className="font-heading font-bold text-foreground">{s.value}</span>
              <span className="text-muted-foreground">{s.label}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;

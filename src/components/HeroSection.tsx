import { motion } from "framer-motion";
import { ArrowRight, Play } from "lucide-react";

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
            Built in the Netherlands · Expanding in India · Securing globally
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

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
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

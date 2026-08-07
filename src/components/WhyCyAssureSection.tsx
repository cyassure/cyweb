import { motion } from "framer-motion";
import { Check, Monitor, Activity, Users, Clock, Zap, Layers, Target } from "lucide-react";

const reasons = [
  "Open & flexible architecture",
  "AI + human intelligence",
  "Transparent pricing",
  "No vendor lock-in",
  "Faster deployment",
  "Built for SMEs → ready for enterprise scale",
];

const socStats = [
  { icon: Clock, value: "24×7", label: "Monitoring" },
  { icon: Users, value: "Tier 1–3", label: "Analysts" },
  { icon: Activity, value: "<15 min", label: "Avg Response" },
  { icon: Monitor, value: "100%", label: "Visibility" },
];

const WhyCyAssureSection = () => {
  return (
    <section id="why" className="relative py-24">
      {/* Background glow */}
      <div className="absolute left-0 top-1/2 h-[400px] w-[400px] -translate-y-1/2 rounded-full bg-primary/3 blur-[120px]" />

      <div className="container relative mx-auto px-6">
        <div className="grid items-center gap-16 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <p className="mb-3 text-xs font-medium uppercase tracking-[0.2em] text-primary">Why CyAssure</p>
            <h2 className="mb-6 font-heading text-3xl font-bold text-foreground md:text-5xl">
              We don't just collect logs.
            </h2>
            <p className="mb-2 font-heading text-2xl text-gradient md:text-3xl">
              We convert signals into strength.
            </p>
            <p className="mt-6 max-w-md text-muted-foreground">
              Whether you need a fully managed SOC, advanced MDR, compliance support, or your own customizable SIEM platform — we make security practical, scalable, and affordable.
            </p>

            {/* Not selling monitoring callout */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="mt-8 rounded-xl border border-primary/20 bg-primary/5 p-6"
            >
              <p className="mb-4 font-heading text-sm font-bold text-foreground">
                We're not selling "monitoring."
              </p>
              <div className="flex flex-col gap-3">
                {[
                  { icon: Zap,    title: "Speed",        desc: "Onboard in hours. Not a months-long implementation project." },
                  { icon: Layers, title: "Simplicity",   desc: "Minimal integration effort — no armies of consultants required." },
                  { icon: Target, title: "Intelligence",  desc: "Actionable signal, not a firehose of raw alerts." },
                ].map((p) => (
                  <div key={p.title} className="flex items-start gap-3">
                    <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-primary/15">
                      <p.icon className="h-3.5 w-3.5 text-primary" />
                    </div>
                    <div>
                      <span className="text-sm font-semibold text-foreground">{p.title} — </span>
                      <span className="text-sm text-muted-foreground">{p.desc}</span>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Animated SOC stats panel */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="relative mt-8 rounded-xl border border-border bg-card p-6"
            >
              <div className="mb-4 flex items-center gap-2">
                <motion.div
                  className="h-2.5 w-2.5 rounded-full bg-primary"
                  animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                <span className="text-sm font-medium text-foreground">24×7 SOC — Real analysts. Real defense.</span>
              </div>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                {socStats.map((stat, i) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 + i * 0.1 }}
                    className="flex flex-col items-center gap-1 rounded-lg border border-border bg-secondary/30 p-3 text-center"
                  >
                    <stat.icon className="h-4 w-4 text-primary" />
                    <span className="font-heading text-sm font-bold text-foreground">{stat.value}</span>
                    <span className="text-[10px] text-muted-foreground">{stat.label}</span>
                  </motion.div>
                ))}
              </div>
              {/* Animated scan line */}
              <motion.div
                className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent"
                animate={{ top: ["20%", "90%", "20%"] }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
              />
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            {reasons.map((reason, i) => (
              <motion.div
                key={reason}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="flex items-center gap-4 rounded-lg border border-border bg-card p-4 transition-colors hover:border-primary/30"
              >
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-primary/10">
                  <Check className="h-4 w-4 text-primary" />
                </div>
                <span className="font-medium text-foreground">{reason}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default WhyCyAssureSection;

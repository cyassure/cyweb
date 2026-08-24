import { motion } from "framer-motion";
import { Layers, Brain, Lock, Zap, Clock, Users, Activity, Monitor, MapPin } from "lucide-react";

const pillars = [
  { icon: Layers, label: "Open, not locked in" },
  { icon: Brain, label: "AI + human intelligence" },
  { icon: Zap, label: "Deploy in hours, not months" },
  { icon: Lock, label: "Self-hosted — your data stays yours" },
];

const socStats = [
  { icon: Clock, value: "24×7", label: "Monitoring" },
  { icon: Users, value: "Tier 1–3", label: "Analysts" },
  { icon: Activity, value: "<15 min", label: "Avg Response" },
  { icon: Monitor, value: "100%", label: "Visibility" },
];

const WhySection = () => {
  return (
    <section id="why" className="relative py-24">
      <div className="absolute left-0 top-1/2 h-[400px] w-[400px] -translate-y-1/2 rounded-full bg-primary/3 blur-[120px]" />

      <div className="container relative mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mx-auto mb-14 max-w-2xl text-center"
        >
          <p className="mb-3 text-xs font-medium uppercase tracking-[0.2em] text-primary">Why Cy360</p>
          <h2 className="mb-4 font-heading text-3xl font-bold text-foreground md:text-5xl">
            We don't just collect logs.
          </h2>
          <p className="font-heading text-2xl text-gradient md:text-3xl">We turn signals into next-generation defense.</p>
        </motion.div>

        <div className="mx-auto mb-14 grid max-w-3xl gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {pillars.map((p, i) => (
            <motion.div
              key={p.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="flex flex-col items-center gap-3 rounded-xl border border-border bg-card p-6 text-center transition-colors hover:border-primary/30"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10">
                <p.icon className="h-5 w-5 text-primary" />
              </div>
              <span className="text-sm font-medium text-foreground">{p.label}</span>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative mx-auto max-w-3xl rounded-xl border border-border bg-card p-6"
        >
          <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <motion.div
                className="h-2.5 w-2.5 rounded-full bg-primary"
                animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <span className="text-sm font-medium text-foreground">24×7 SOC — Real analysts. Real defense.</span>
            </div>
            <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <MapPin className="h-3.5 w-3.5 text-primary" /> Rijswijk, Netherlands · Global coverage
            </span>
          </div>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {socStats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 + i * 0.1 }}
                className="flex flex-col items-center gap-1 rounded-lg border border-border bg-secondary/30 p-3 text-center"
              >
                <stat.icon className="h-4 w-4 text-primary" />
                <span className="font-heading text-sm font-bold text-foreground">{stat.value}</span>
                <span className="text-[10px] text-muted-foreground">{stat.label}</span>
              </motion.div>
            ))}
          </div>
          <motion.div
            className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent"
            animate={{ top: ["20%", "90%", "20%"] }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
          />
        </motion.div>
      </div>
    </section>
  );
};

export default WhySection;

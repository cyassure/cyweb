import { motion } from "framer-motion";
import { Layers, Brain, Lock, Zap, Clock, Users, Activity, Monitor, MapPin } from "lucide-react";
import SectionHeader from "@/components/SectionHeader";
import { DOMAIN_COLORS, ink } from "@/lib/domains";

const pillars = [
  { icon: Layers, label: "Open, not locked in", color: DOMAIN_COLORS["cloud-saas"] },
  { icon: Brain, label: "AI + human intelligence", color: DOMAIN_COLORS.response },
  { icon: Zap, label: "Deploy in hours, not months", color: DOMAIN_COLORS.itam },
  { icon: Lock, label: "Self-hosted — your data stays yours", color: DOMAIN_COLORS.data },
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
      <div className="container relative mx-auto px-6">
        <SectionHeader
          eyebrow="Why Cy360"
          title="Fewer alerts, more answers."
          lede="Cy360 collects the logs like any SIEM, then correlates, scores and explains them so analysts start from an incident instead of a haystack."
        />

        <div className="mb-14 grid gap-px overflow-hidden rounded-lg border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
          {pillars.map((p) => (
            <div key={p.label} className="flex flex-col gap-4 bg-card p-6">
              <p.icon className="h-5 w-5" style={{ color: ink(p.color) }} />
              <span className="text-sm font-medium leading-snug text-foreground">{p.label}</span>
            </div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative max-w-4xl overflow-hidden rounded-lg border border-border bg-card p-6"
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
              <MapPin className="h-3.5 w-3.5 text-primary" /> Rijswijk, Netherlands · Gurgaon, India · Global coverage
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
                className="flex flex-col gap-1 rounded-md border border-border bg-secondary/30 p-3"
              >
                <stat.icon className="h-4 w-4 text-primary" />
                <span className="font-mono text-base font-semibold text-foreground">{stat.value}</span>
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

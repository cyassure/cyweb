import { motion } from "framer-motion";
import { Check } from "lucide-react";

const reasons = [
  "Open & flexible architecture",
  "AI + human intelligence",
  "Transparent pricing",
  "No vendor lock-in",
  "Faster deployment",
  "Built for SMEs → ready for enterprise scale",
];

const WhyCycentraSection = () => {
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
            <p className="mb-3 text-xs font-medium uppercase tracking-[0.2em] text-primary">Why Cycentra</p>
            <h2 className="mb-6 font-heading text-3xl font-bold text-foreground md:text-5xl">
              We don't just collect logs.
            </h2>
            <p className="mb-2 font-heading text-2xl text-gradient md:text-3xl">
              We convert signals into strength.
            </p>
            <p className="mt-6 max-w-md text-muted-foreground">
              Whether you need a fully managed SOC, advanced MDR, compliance support, or your own customizable SIEM platform — we make security practical, scalable, and affordable.
            </p>
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

export default WhyCycentraSection;

import { motion } from "framer-motion";
import { Users, Brain, Lock, Cpu, Globe, MapPin } from "lucide-react";

const pillars = [
  { icon: Cpu, label: "Automated where possible" },
  { icon: Users, label: "Human-verified where necessary" },
  { icon: Lock, label: "Open by design" },
  { icon: Brain, label: "AI-augmented, not AI-replaced" },
];

const locations = [
  { city: "Netherlands", role: "HQ & Origin", color: "text-primary" },
  { city: "United States", role: "Americas Operations", color: "text-primary" },
  { city: "Global", role: "Client Coverage", color: "text-primary" },
];

const AboutSection = () => {
  return (
    <section id="about" className="relative py-24">
      <div className="container mx-auto px-6">
        {/* Global presence visual */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative mb-16 overflow-hidden rounded-2xl border border-border/50 bg-card p-8"
        >
          <div className="flex flex-col items-center gap-6 md:flex-row md:justify-around">
            {locations.map((loc, i) => (
              <motion.div
                key={loc.city}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="flex flex-col items-center gap-3"
              >
                <motion.div
                  animate={{ scale: [1, 1.15, 1] }}
                  transition={{ duration: 2.5, repeat: Infinity, delay: i * 0.5 }}
                  className="flex h-14 w-14 items-center justify-center rounded-full border border-primary/30 bg-primary/10"
                >
                  <MapPin className={`h-6 w-6 ${loc.color}`} />
                </motion.div>
                <div className="text-center">
                  <p className="font-heading text-lg font-bold text-foreground">{loc.city}</p>
                  <p className="text-xs text-muted-foreground">{loc.role}</p>
                </div>
                {i < locations.length - 1 && (
                  <div className="hidden h-px w-24 bg-gradient-to-r from-primary/40 to-transparent md:block md:w-32 md:rotate-0 rotate-90" />
                )}
              </motion.div>
            ))}
          </div>
          <p className="mt-6 text-center font-heading text-lg font-bold text-foreground">
            Headquartered in the Netherlands.{" "}
            <span className="text-gradient">Trusted globally.</span>
          </p>
        </motion.div>

        <div className="grid items-start gap-16 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <p className="mb-3 text-xs font-medium uppercase tracking-[0.2em] text-primary">About Us</p>
            <h2 className="mb-6 font-heading text-3xl font-bold text-foreground md:text-4xl">
              Enterprise-grade expertise, global reach
            </h2>
            <p className="mb-4 text-muted-foreground leading-relaxed">
              Cycentra is an independent cybersecurity company delivering enterprise-grade security solutions to organizations worldwide.
            </p>
            <p className="mb-6 text-muted-foreground leading-relaxed">
              Our team combines SOC analysts, threat hunters, compliance specialists, and security engineers who have built and operated real-world defense environments.
            </p>

            <div className="rounded-xl border border-primary/20 bg-primary/5 p-6">
              <p className="font-heading text-lg font-semibold text-foreground mb-2">Our Mission</p>
              <p className="text-muted-foreground">
                Give every organization access to powerful, intelligent, and affordable security operations.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <p className="mb-3 text-xs font-medium uppercase tracking-[0.2em] text-primary">Our Philosophy</p>
            <h3 className="mb-2 font-heading text-2xl font-bold text-foreground md:text-3xl">
              Security tools generate noise.
            </h3>
            <p className="mb-8 text-gradient font-heading text-2xl font-bold md:text-3xl">
              Cycentra generates clarity.
            </p>

            <div className="grid grid-cols-2 gap-4">
              {pillars.map((p, i) => (
                <motion.div
                  key={p.label}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + i * 0.1 }}
                  className="flex flex-col items-center gap-3 rounded-xl border border-border bg-card p-6 text-center transition-colors hover:border-primary/30"
                >
                  <p.icon className="h-7 w-7 text-primary" />
                  <span className="text-sm font-medium text-foreground">{p.label}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;

import { motion } from "framer-motion";
import { Check } from "lucide-react";

const PricingSection = () => {
  return (
    <section id="pricing" className="relative py-24">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <p className="mb-3 text-xs font-medium uppercase tracking-[0.2em] text-primary">Pricing</p>
          <h2 className="mb-4 font-heading text-3xl font-bold text-foreground md:text-5xl">
            Self-Managed Platform Packages
          </h2>
          <p className="mx-auto max-w-xl text-muted-foreground">
            Want the power of Cycentra but manage operations yourself? Perfect.
          </p>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-3">
          {/* Platform tiers */}
          {[
            { users: "Up to 100 users", price: "$100", period: "/month", highlight: false },
            { users: "Up to 500 users", price: "$250", period: "/month", highlight: true },
            { users: "Above 500", price: "Custom", period: "pricing", highlight: false },
          ].map((tier, i) => (
            <motion.div
              key={tier.users}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={`rounded-2xl border p-8 transition-all ${
                tier.highlight
                  ? "border-primary/50 bg-gradient-to-b from-primary/10 to-card shadow-[var(--glow-primary)]"
                  : "border-border bg-card hover:border-primary/30"
              }`}
            >
              <p className="mb-2 text-sm text-muted-foreground">{tier.users}</p>
              <div className="mb-6 flex items-baseline gap-1">
                <span className="font-heading text-4xl font-bold text-foreground">{tier.price}</span>
                <span className="text-sm text-muted-foreground">{tier.period}</span>
              </div>
              <p className="mb-4 text-xs text-muted-foreground">System license — platform subscription</p>
              <a
                href="#contact"
                className={`block rounded-lg py-3 text-center text-sm font-semibold transition-all ${
                  tier.highlight
                    ? "bg-primary text-primary-foreground hover:brightness-110"
                    : "border border-border bg-secondary text-foreground hover:border-primary/50"
                }`}
              >
                Get Started
              </a>
            </motion.div>
          ))}
        </div>

        {/* Managed Add-on */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 rounded-2xl border border-border bg-card p-8"
        >
          <div className="grid gap-8 md:grid-cols-2">
            <div>
              <h3 className="mb-3 font-heading text-xl font-bold text-foreground">Managed Operations Add-On</h3>
              <p className="text-sm text-muted-foreground mb-4">Want us to run it? Add managed operations to any platform package.</p>
              <div className="space-y-2">
                {[
                  "Up to 100 users → $1 per user / month (min 100)",
                  "Up to 500 users → $0.75 per user / month",
                  "Above 500 → custom pricing",
                ].map((line) => (
                  <div key={line} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                    {line}
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h3 className="mb-3 font-heading text-xl font-bold text-foreground">Professional Services</h3>
              <p className="text-sm text-muted-foreground mb-4">Need help with setup, tuning, integrations, or strategy?</p>
              <div className="rounded-lg border border-primary/20 bg-primary/5 p-4 text-center">
                <span className="font-heading text-3xl font-bold text-foreground">$100</span>
                <span className="text-muted-foreground"> / hour</span>
              </div>
              <p className="mt-3 text-xs text-muted-foreground">Deployments · Use case creation · Compliance · Architecture design</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default PricingSection;

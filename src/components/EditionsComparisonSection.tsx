import { motion } from "framer-motion";
import { Check, ArrowRight, Users, Building2 } from "lucide-react";
import { Link } from "react-router-dom";

const editions = [
  {
    id: "community",
    name: "Community",
    icon: Users,
    tagline: "Self-hosted, free, forever",
    price: "€0",
    priceNote: "no license file, no card required",
    accent: "border-primary/30",
    accentBg: "bg-primary/5",
    iconCls: "text-primary",
    features: [
      "Full core SOC stack — CySIEM, CyASM, CyCases, dashboard",
      "1 admin/analyst user",
      "15 EDR / endpoint agent licenses",
      "15-day raw event history (CyDataLake)",
      "Public GHCR images — pull and run, self-service updates",
      "Community support — docs & GitHub Discussions",
    ],
    cta: "Download Community",
    ctaHref: "/download",
    ctaVariant: "primary" as const,
  },
  {
    id: "enterprise",
    name: "Enterprise",
    icon: Building2,
    tagline: "Licensed, self-hosted, unrestricted",
    price: "Custom",
    priceNote: "activated by a .lic file, scoped to your environment",
    accent: "border-emerald-500/30",
    accentBg: "bg-emerald-500/5",
    iconCls: "text-emerald-400",
    features: [
      "Everything in Community, purchased user & agent counts",
      "90-day raw event history (CyDataLake)",
      "CyMind AI integration — local and cloud gateway",
      "CyTIM threat-intelligence enrichment",
      "Priority support",
      "MSSP white-label option",
    ],
    cta: "Talk to Sales",
    ctaHref: "/support",
    ctaVariant: "outline" as const,
  },
];

const EditionsComparisonSection = () => {
  return (
    <section className="relative py-16">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-14 text-center"
        >
          <p className="mb-3 text-xs font-medium uppercase tracking-[0.2em] text-primary">Self-Hosted Editions</p>
          <h1 className="mb-4 font-heading text-3xl font-bold text-foreground md:text-5xl">
            Run Cy360 on your own infrastructure
          </h1>
          <p className="mx-auto max-w-xl text-muted-foreground">
            Community is free forever and covers the full core stack. Enterprise adds scale, governance,
            and priority support for larger environments.
          </p>
          <p className="mx-auto mt-4 max-w-xl text-xs text-muted-foreground/70">
            Looking for our managed SOC service instead, where our analysts run it for you?{" "}
            <Link to="/support" className="text-primary underline underline-offset-4">Talk to sales →</Link>
          </p>
        </motion.div>

        <div className="mx-auto grid max-w-4xl gap-6 md:grid-cols-2">
          {editions.map((ed, i) => (
            <motion.div
              key={ed.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={`flex flex-col rounded-2xl border ${ed.accent} ${ed.accentBg} p-8`}
            >
              <div className="mb-5 flex items-center gap-3">
                <div className={`flex h-12 w-12 items-center justify-center rounded-xl border ${ed.accent} bg-card/60`}>
                  <ed.icon className={`h-6 w-6 ${ed.iconCls}`} />
                </div>
                <div>
                  <h2 className="font-heading text-xl font-bold text-foreground">{ed.name}</h2>
                  <p className="text-xs text-muted-foreground">{ed.tagline}</p>
                </div>
              </div>

              <div className="mb-6">
                <span className="font-heading text-3xl font-bold text-foreground">{ed.price}</span>
                <p className="text-xs text-muted-foreground">{ed.priceNote}</p>
              </div>

              <ul className="mb-8 flex-1 space-y-3">
                {ed.features.map((f) => (
                  <li key={f} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                    <Check className={`mt-0.5 h-4 w-4 shrink-0 ${ed.iconCls}`} />
                    {f}
                  </li>
                ))}
              </ul>

              {ed.ctaVariant === "primary" ? (
                <Link
                  to={ed.ctaHref}
                  className="group inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-6 py-3 font-heading text-sm font-semibold text-primary-foreground transition-all hover:brightness-110"
                >
                  {ed.cta}
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              ) : (
                <Link
                  to={ed.ctaHref}
                  className="inline-flex items-center justify-center gap-2 rounded-lg border border-border bg-secondary/50 px-6 py-3 font-heading text-sm font-semibold text-foreground transition-all hover:border-primary/50"
                >
                  {ed.cta}
                </Link>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EditionsComparisonSection;

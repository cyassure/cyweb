import { motion } from "framer-motion";
import { Users, Building2, ArrowRight, Check } from "lucide-react";
import { Link } from "react-router-dom";

const editions = [
  {
    name: "Community",
    icon: Users,
    tag: "Free, self-hosted",
    accent: "border-primary/30 bg-primary/5",
    iconCls: "text-primary",
    bullets: ["Full core SOC stack", "Public GHCR images", "Community support"],
  },
  {
    name: "Enterprise",
    icon: Building2,
    tag: "Licensed, self-hosted",
    accent: "border-emerald-500/30 bg-emerald-500/5",
    iconCls: "text-emerald-400",
    bullets: ["Purchased user & agent counts", "CyMind AI + CyTIM intel", "Priority support"],
  },
];

const EditionsSummarySection = () => {
  return (
    <section className="relative py-20">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 text-center"
        >
          <p className="mb-3 text-xs font-medium uppercase tracking-[0.2em] text-primary">Own It, Run It</p>
          <h2 className="mb-4 font-heading text-3xl font-bold text-foreground md:text-4xl">
            Community or Enterprise — self-hosted either way
          </h2>
        </motion.div>

        <div className="mx-auto grid max-w-3xl gap-5 sm:grid-cols-2">
          {editions.map((ed, i) => (
            <motion.div
              key={ed.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={`rounded-2xl border ${ed.accent} p-6`}
            >
              <div className="mb-4 flex items-center gap-3">
                <ed.icon className={`h-6 w-6 ${ed.iconCls}`} />
                <div>
                  <p className="font-heading font-bold text-foreground">{ed.name}</p>
                  <p className="text-xs text-muted-foreground">{ed.tag}</p>
                </div>
              </div>
              <ul className="space-y-2">
                {ed.bullets.map((b) => (
                  <li key={b} className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Check className={`h-3.5 w-3.5 shrink-0 ${ed.iconCls}`} />
                    {b}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        <div className="mt-8 text-center">
          <Link
            to="/editions"
            className="group inline-flex items-center gap-2 text-sm font-semibold text-primary transition-all hover:gap-3"
          >
            Compare editions in full
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default EditionsSummarySection;

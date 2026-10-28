import { motion } from "framer-motion";
import { Users, Building2, ArrowRight, Check } from "lucide-react";
import { Link } from "react-router-dom";
import SectionHeader from "@/components/SectionHeader";

const editions = [
  {
    name: "Community",
    icon: Users,
    tag: "Free, self-hosted",
    accent: "border-primary/30 bg-primary/5",
    iconCls: "text-primary",
    bullets: ["Full core SOC stack", "Vulnerability Mgmt & DLP included", "Community support"],
  },
  {
    name: "Enterprise",
    icon: Building2,
    tag: "Licensed, self-hosted",
    accent: "border-emerald-500/30 bg-emerald-500/5",
    iconCls: "text-emerald-400",
    bullets: ["Purchased user & agent counts", "CyMind AI + CyTIM intel", "DSPM, AI Security, GRC add-ons"],
  },
];

const EditionsSummarySection = () => {
  return (
    <section className="relative py-20">
      <div className="container mx-auto px-6">
        <SectionHeader eyebrow="Own It, Run It" title="Community or Enterprise. Self-hosted either way." />

        <div className="grid max-w-4xl gap-5 sm:grid-cols-2">
          {editions.map((ed, i) => (
            <motion.div
              key={ed.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={`rounded-lg border ${ed.accent} p-6`}
            >
              <div className="mb-4 flex items-center gap-3">
                <ed.icon className={`h-6 w-6 ${ed.iconCls}`} />
                <div>
                  <p className="text-base font-semibold text-foreground">{ed.name}</p>
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

        <div className="mt-8">
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

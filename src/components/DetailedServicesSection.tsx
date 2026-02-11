import { motion } from "framer-motion";
import {
  Shield, Eye, FileCheck, UserCog, AlertTriangle, Briefcase,
  Building2, Heart, Factory, Cpu, Landmark, Rocket
} from "lucide-react";

const detailSections = [
  {
    id: "mdr",
    title: "Managed Detection & Response",
    subtitle: "Cyber threats don't wait. Neither do we.",
    description: "Cycentra MDR provides 24×7 monitoring, detection, investigation, and response across endpoints, networks, cloud, and identity systems.",
    items: ["Continuous threat monitoring", "Behavioral analytics", "Threat hunting", "Incident validation", "Containment & remediation guidance", "Executive & technical reporting"],
    outcome: "Fewer false positives. Faster response. Reduced impact.",
    icon: Eye,
  },
  {
    id: "soc",
    title: "SOC as a Service",
    subtitle: "Your outsourced, fully operational Security Operations Center.",
    description: "Without the hiring, training, or infrastructure burden.",
    items: ["Tier 1–3 analysts", "Use case engineering", "Alert triage", "Incident handling", "Reporting & SLA management"],
    outcome: "You stay focused on business. We handle the battlefield.",
    icon: Shield,
  },
];

const additionalServices = [
  {
    icon: AlertTriangle,
    title: "Penetration Testing",
    desc: "Automated, manual, and hybrid modes across network, web, cloud, APIs, and external exposure.",
  },
  {
    icon: FileCheck,
    title: "GRC & Compliance",
    desc: "Gap assessments, policy development, continuous compliance monitoring, and audit support.",
  },
  {
    icon: UserCog,
    title: "vCISO Services",
    desc: "Strategy, roadmap, risk management, board reporting, vendor evaluation, and incident oversight.",
  },
  {
    icon: Briefcase,
    title: "Security Awareness",
    desc: "Phishing simulations, awareness programs, executive training, and improvement metrics.",
  },
];

const industries = [
  { icon: Building2, label: "Financial Services" },
  { icon: Heart, label: "Healthcare" },
  { icon: Factory, label: "Manufacturing" },
  { icon: Cpu, label: "Technology" },
  { icon: Landmark, label: "Government" },
  { icon: Rocket, label: "SMEs & Startups" },
];

const DetailedServicesSection = () => {
  return (
    <section className="py-24">
      <div className="container mx-auto px-6">
        {/* MDR & SOC detail blocks */}
        <div className="space-y-16">
          {detailSections.map((section, i) => (
            <motion.div
              key={section.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="grid gap-8 rounded-2xl border border-border bg-card p-8 md:grid-cols-2 md:p-12"
            >
              <div>
                <section.icon className="mb-4 h-10 w-10 text-primary" />
                <h3 className="mb-2 font-heading text-2xl font-bold text-foreground">{section.title}</h3>
                <p className="mb-2 text-gradient font-heading text-lg font-semibold">{section.subtitle}</p>
                <p className="text-muted-foreground">{section.description}</p>
                {section.outcome && (
                  <p className="mt-6 rounded-lg border border-primary/20 bg-primary/5 p-4 text-sm font-medium text-foreground">
                    {section.outcome}
                  </p>
                )}
              </div>
              <div className="space-y-3">
                <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Included</p>
                {section.items.map((item) => (
                  <div key={item} className="flex items-center gap-3 rounded-lg border border-border bg-secondary/50 px-4 py-3 text-sm text-foreground">
                    <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                    {item}
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Additional Services */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-24"
        >
          <p className="mb-3 text-center text-xs font-medium uppercase tracking-[0.2em] text-primary">More Services</p>
          <h2 className="mb-12 text-center font-heading text-3xl font-bold text-foreground md:text-4xl">
            Think of us as your extended security team
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {additionalServices.map((s, i) => (
              <motion.div
                key={s.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="rounded-xl border border-border bg-card p-6 transition-all hover:border-primary/30"
              >
                <s.icon className="mb-3 h-7 w-7 text-primary" />
                <h4 className="mb-2 font-heading text-base font-semibold text-foreground">{s.title}</h4>
                <p className="text-sm text-muted-foreground">{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Industries */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-24"
        >
          <p className="mb-3 text-center text-xs font-medium uppercase tracking-[0.2em] text-primary">Industries We Serve</p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            {industries.map((ind) => (
              <div
                key={ind.label}
                className="flex items-center gap-2 rounded-full border border-border bg-card px-5 py-2.5 text-sm text-foreground transition-colors hover:border-primary/30"
              >
                <ind.icon className="h-4 w-4 text-primary" />
                {ind.label}
              </div>
            ))}
          </div>
        </motion.div>

        {/* Why switch */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-24 rounded-2xl border border-primary/20 bg-gradient-to-br from-primary/5 to-transparent p-8 text-center md:p-12"
        >
          <h3 className="mb-6 font-heading text-2xl font-bold text-foreground md:text-3xl">
            Why Customers Switch to Cycentra
          </h3>
          <div className="flex flex-wrap justify-center gap-4">
            {["Open, not locked", "Smart, not noisy", "Fast, not slow", "Affordable, not overpriced", "Real expert support"].map((item) => (
              <span key={item} className="rounded-full border border-primary/30 bg-primary/10 px-5 py-2 text-sm font-medium text-foreground">
                ✔ {item}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default DetailedServicesSection;

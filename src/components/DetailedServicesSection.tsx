import { motion } from "framer-motion";
import {
  Shield, Eye, FileCheck, UserCog, AlertTriangle, Briefcase,
  Building2, Heart, Factory, Cpu, Landmark, Rocket, Fish, Wrench,
  Target, Globe, BookOpen, ClipboardCheck
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
  {
    id: "pentest",
    title: "Penetration Testing Services",
    subtitle: "Security must be tested continuously.",
    description: "We offer three testing modes: Automated (fast, scalable, cost-effective), Manual (expert-driven deep analysis), and Hybrid (best of automation + human creativity).",
    items: ["Network penetration testing", "Web application testing", "Cloud security testing", "API security testing", "External exposure assessment"],
    outcome: "Comprehensive coverage across all attack surfaces with flexible engagement models.",
    icon: Target,
  },
  {
    id: "grc",
    title: "GRC & Compliance as a Service",
    subtitle: "From policies to audit readiness, we simplify governance.",
    description: "We help you align with standards such as ISO frameworks, SOC requirements, risk programs, and internal controls.",
    items: ["Gap assessments", "Policy development", "Continuous compliance monitoring", "Audit support", "Risk program alignment"],
    outcome: "Stay compliant without the complexity. We handle governance so you can focus on growth.",
    icon: FileCheck,
  },
  {
    id: "vciso",
    title: "vCISO – Leadership Without the Overhead",
    subtitle: "Executive-level security guidance without hiring a full-time CISO.",
    description: "Your virtual CISO provides strategic leadership tailored to your organization's risk profile and business goals.",
    items: ["Strategy & roadmap", "Risk management", "Board reporting", "Vendor evaluation", "Incident oversight"],
    outcome: "C-level security expertise on demand, at a fraction of the cost.",
    icon: UserCog,
  },
  {
    id: "awareness",
    title: "Security Awareness & Phishing",
    subtitle: "Technology alone is not enough.",
    description: "People are your strongest — and weakest — link. We help build a security-first culture across your organization.",
    items: ["Phishing simulations", "Awareness programs", "Executive training", "Reporting & improvement metrics"],
    outcome: "Turn your people from your biggest vulnerability into your strongest defense layer.",
    icon: Fish,
  },
];

const professionalServices = [
  { icon: Wrench, label: "Security architecture" },
  { icon: Globe, label: "Cloud migrations" },
  { icon: Cpu, label: "Tool optimization" },
  { icon: AlertTriangle, label: "Incident readiness" },
  { icon: BookOpen, label: "Custom integrations" },
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
        {/* Detailed service blocks */}
        <div className="space-y-16">
          {detailSections.map((section) => (
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

        {/* Professional & Advisory Services */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-24"
        >
          <p className="mb-3 text-center text-xs font-medium uppercase tracking-[0.2em] text-primary">Professional & Advisory Services</p>
          <h2 className="mb-4 text-center font-heading text-3xl font-bold text-foreground md:text-4xl">
            Think of us as your extended security team
          </h2>
          <p className="mb-12 text-center text-muted-foreground">Beyond monitoring, we support your broader security journey.</p>
          <div className="flex flex-wrap justify-center gap-4">
            {professionalServices.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="flex items-center gap-3 rounded-xl border border-border bg-card px-6 py-4 transition-all hover:border-primary/30"
              >
                <s.icon className="h-5 w-5 text-primary" />
                <span className="text-sm font-medium text-foreground">{s.label}</span>
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

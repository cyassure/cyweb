import { motion } from "framer-motion";
import { Eye, MonitorSpeaker, FileCheck, UserCog, Bug, Briefcase } from "lucide-react";

const services = [
  { icon: Eye, title: "Managed Detection & Response", desc: "24×7 monitoring, detection, investigation, and response across endpoints, networks, and cloud." },
  { icon: MonitorSpeaker, title: "SOC as a Service", desc: "A fully operational Security Operations Center — without the hiring, training, or infrastructure overhead." },
  { icon: FileCheck, title: "GRC & Compliance", desc: "From gap assessments to audit readiness — simplifying governance for ISO 27001, NIS2, DORA, and GDPR." },
  { icon: UserCog, title: "vCISO Services", desc: "Executive-level security leadership tailored to your risk profile — without the full-time cost." },
  { icon: Bug, title: "Penetration Testing", desc: "Automated, manual, and hybrid testing across networks, web applications, cloud, and APIs." },
  { icon: Briefcase, title: "IT Consultancy", desc: "Security architecture, cloud migrations, and tooling advice from engineers who run this stack daily." },
];

const ServicesSection = () => {
  return (
    <section id="services" className="relative py-24">
      <div className="container mx-auto px-6">

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <p className="mb-3 text-xs font-medium uppercase tracking-[0.2em] text-primary">What We Do</p>
          <h2 className="mb-4 font-heading text-3xl font-bold text-foreground md:text-5xl">
            Security, End to End
          </h2>
          <p className="mx-auto max-w-xl text-muted-foreground">
            Whether you need a fully managed SOC, compliance support, or expert guidance — we make security practical, scalable, and affordable.
          </p>
        </motion.div>

        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {services.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="group flex flex-col rounded-xl border border-border bg-card p-6 transition-all hover:border-primary/40 hover:shadow-[var(--glow-primary)]"
            >
              <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl border border-border bg-secondary/50 transition-all group-hover:border-primary/40 group-hover:bg-primary/10">
                <s.icon className="h-5 w-5 text-primary transition-transform group-hover:scale-110" />
              </div>
              <h3 className="mb-2 font-heading text-base font-bold text-foreground">{s.title}</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">{s.desc}</p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default ServicesSection;

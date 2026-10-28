import { Eye, MonitorSpeaker, FileCheck, UserCog, Bug, Briefcase } from "lucide-react";
import SectionHeader from "@/components/SectionHeader";
import { DOMAIN_COLORS, ink } from "@/lib/domains";

const services = [
  { icon: Eye, color: DOMAIN_COLORS.secops, title: "Managed Detection & Response", desc: "24×7 monitoring, detection, investigation, and response across endpoints, networks, and cloud." },
  { icon: MonitorSpeaker, color: DOMAIN_COLORS.endpoint, title: "SOC as a Service", desc: "A fully operational Security Operations Center — without the hiring, training, or infrastructure overhead." },
  { icon: FileCheck, color: DOMAIN_COLORS.grc, title: "GRC & Compliance", desc: "From gap assessments to audit readiness — simplifying governance for ISO 27001, NIS2, DORA, and GDPR." },
  { icon: UserCog, color: DOMAIN_COLORS.response, title: "vCISO Services", desc: "Executive-level security leadership tailored to your risk profile — without the full-time cost." },
  { icon: Bug, color: DOMAIN_COLORS.vuln, title: "Penetration Testing", desc: "Automated, manual, and hybrid testing across networks, web applications, cloud, and APIs." },
  { icon: Briefcase, color: DOMAIN_COLORS["cloud-saas"], title: "IT Consultancy", desc: "Security architecture, cloud migrations, and tooling advice from engineers who run this stack daily." },
];

const ServicesSection = () => {
  return (
    <section id="services" className="relative bg-[color-mix(in_srgb,#b06eff_6%,hsl(var(--background)))] py-24">
      <div className="container mx-auto px-6">

        <SectionHeader
          eyebrow="What We Do"
          title="Security, end to end"
          lede="A fully managed SOC, compliance support or expert advice: pick what you need, from the team that builds Cy360."
        />

        <div className="grid gap-px overflow-hidden rounded-lg border border-border bg-border sm:grid-cols-2 xl:grid-cols-3">
          {services.map((s) => (
            <div key={s.title} className="flex flex-col bg-card p-6 transition-colors hover:bg-secondary/60">
              <s.icon className="mb-5 h-5 w-5" style={{ color: ink(s.color) }} />
              <h3 className="mb-2 text-base font-semibold text-foreground">{s.title}</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">{s.desc}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default ServicesSection;

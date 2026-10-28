import { Eye, MonitorSpeaker, FileCheck, UserCog, Bug, Briefcase } from "lucide-react";
import mdrPhoto from "@/assets/photos/mdr.jpg";
import socServicePhoto from "@/assets/photos/soc-service.jpg";
import grcPhoto from "@/assets/photos/grc.jpg";
import vcisoPhoto from "@/assets/photos/vciso.jpg";
import pentestPhoto from "@/assets/photos/pentest.jpg";
import consultingPhoto from "@/assets/photos/consulting.jpg";
import SectionHeader from "@/components/SectionHeader";
import { DOMAIN_COLORS, ink } from "@/lib/domains";

const services = [
  { icon: Eye, photo: mdrPhoto, color: DOMAIN_COLORS.secops, title: "Managed Detection & Response", desc: "24×7 monitoring, detection, investigation, and response across endpoints, networks, and cloud." },
  { icon: MonitorSpeaker, photo: socServicePhoto, color: DOMAIN_COLORS.endpoint, title: "SOC as a Service", desc: "A fully operational Security Operations Center — without the hiring, training, or infrastructure overhead." },
  { icon: FileCheck, photo: grcPhoto, color: DOMAIN_COLORS.grc, title: "GRC & Compliance", desc: "From gap assessments to audit readiness — simplifying governance for ISO 27001, NIS2, DORA, and GDPR." },
  { icon: UserCog, photo: vcisoPhoto, color: DOMAIN_COLORS.response, title: "vCISO Services", desc: "Executive-level security leadership tailored to your risk profile — without the full-time cost." },
  { icon: Bug, photo: pentestPhoto, color: DOMAIN_COLORS.vuln, title: "Penetration Testing", desc: "Automated, manual, and hybrid testing across networks, web applications, cloud, and APIs." },
  { icon: Briefcase, photo: consultingPhoto, color: DOMAIN_COLORS["cloud-saas"], title: "IT Consultancy", desc: "Security architecture, cloud migrations, and tooling advice from engineers who run this stack daily." },
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

        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {services.map((s) => (
            <article
              key={s.title}
              className="group flex flex-col overflow-hidden rounded-lg border border-border bg-card transition-shadow hover:shadow-[var(--shadow-card)]"
            >
              <div className="relative aspect-[16/9] overflow-hidden">
                <img
                  src={s.photo}
                  alt=""
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                  loading="lazy"
                />
                <span className="absolute inset-x-0 bottom-0 h-1" style={{ backgroundColor: s.color }} />
              </div>
              <div className="flex flex-1 flex-col p-6">
                <h3 className="mb-2 flex items-center gap-2.5 text-lg font-semibold leading-snug text-foreground">
                  <s.icon className="h-5 w-5 shrink-0" style={{ color: ink(s.color) }} />
                  {s.title}
                </h3>
                <p className="text-sm leading-relaxed text-muted-foreground">{s.desc}</p>
              </div>
            </article>
          ))}
        </div>

      </div>
    </section>
  );
};

export default ServicesSection;

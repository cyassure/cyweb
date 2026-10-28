import { Link } from "react-router-dom";
import { ArrowRight, Brain, Layers, Lock, MapPin, Zap } from "lucide-react";
import PageShell from "@/components/PageShell";
import SectionHeader from "@/components/SectionHeader";
import { DOMAIN_COLORS, ink } from "@/lib/domains";
import officesArt from "@/assets/illustrations/offices.svg";
import avatarDeepak from "@/assets/illustrations/avatar-deepak-bhatnagar.svg";
import avatarJeroen from "@/assets/illustrations/avatar-jeroen-van-dijk.svg";
import avatarHiteshwar from "@/assets/illustrations/avatar-hiteshwar-hooda.svg";
import avatarBhupender from "@/assets/illustrations/avatar-bhupender-mahalwal.svg";
import avatarOpenViolet from "@/assets/illustrations/avatar-placeholder-violet.svg";
import avatarOpenGreen from "@/assets/illustrations/avatar-placeholder-green.svg";

const facts = [
  { value: "2026", label: "Founded", color: DOMAIN_COLORS.asm },
  { value: "2", label: "Offices: Rijswijk and Gurgaon", color: DOMAIN_COLORS.data },
  { value: "10+", label: "Security modules in Cy360", color: DOMAIN_COLORS.response },
  { value: "24×7", label: "SOC monitoring", color: DOMAIN_COLORS.endpoint },
];

const principles = [
  { icon: Layers, title: "Open, not locked in", text: "Built on open technologies you can inspect and keep.", color: DOMAIN_COLORS["cloud-saas"] },
  { icon: Lock, title: "Your data stays yours", text: "Run Cy360 on your own servers, or let us host it for you.", color: DOMAIN_COLORS.data },
  { icon: Brain, title: "AI plus analysts", text: "Models handle the triage; Tier 1–3 analysts make the calls.", color: DOMAIN_COLORS.response },
  { icon: Zap, title: "Running in hours", text: "One install command, fully operational in under 30 minutes.", color: DOMAIN_COLORS.itam },
];

// Roles without a name yet show "To be announced" with a placeholder avatar.
const leaders = [
  { name: "Deepak Bhatnagar", role: "Founder & CEO", avatar: avatarDeepak, bio: "Founded CyAssure in 2026. Leads the company and the direction of the Cy360 platform." },
  { name: "Jeroen Van Dijk", role: "Partner & Investor", avatar: avatarJeroen, bio: "Partner and investor in CyAssure." },
  { name: "To be announced", role: "Chief Business Officer", avatar: avatarOpenViolet, bio: "Will lead partnerships and business development.", open: true },
  { name: "To be announced", role: "Legal Advisor", avatar: avatarOpenGreen, bio: "Will advise on contracts, privacy and regulatory matters.", open: true },
  { name: "Hiteshwar Hooda", role: "Chief Channel Officer (India)", avatar: avatarHiteshwar, bio: "Builds CyAssure's reseller and channel partner network in India." },
  { name: "Bhupender Mahalwal", role: "Head of Sales – India", avatar: avatarBhupender, bio: "Leads sales of Cy360 and CyAssure services across India." },
];

const offices = [
  { country: "Netherlands", city: "Rijswijk, near The Hague", address: "Einsteinlaan 28, 2289 CC Rijswijk, The Netherlands" },
  { country: "India", city: "Manesar, Gurgaon", address: "518, Sector 1, Manesar, Gurgaon, India" },
];

const frameworks = ["NIS2", "ISO 27001", "DORA", "GDPR"];

const About = () => (
  <PageShell accent={DOMAIN_COLORS.endpoint}>
    <div className="container mx-auto max-w-6xl px-6 py-16">
      <SectionHeader
        as="h1"
        eyebrow="About CyAssure"
        color={DOMAIN_COLORS.endpoint}
        title="We build Cy360 and run the security operations behind it."
        lede="CyAssure is a cybersecurity and AI company founded in 2026, with offices in the Netherlands and India. We build Cy360, a self-hostable platform that brings SIEM, endpoint, attack surface, cloud, data and compliance into one console, and we run 24×7 monitoring, compliance and advisory services on top of it."
      />

      <img
        src={officesArt}
        alt="Illustration of the Rijswijk office tower and the Gurgaon towers linked by a 24×7 SOC arc"
        className="mb-14 aspect-[32/9] w-full rounded-lg"
      />

      <dl className="mb-24 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {facts.map((f) => (
          <div key={f.label} className="border-l-2 pl-5" style={{ borderColor: f.color }}>
            <dt className="sr-only">{f.label}</dt>
            <dd className="text-4xl font-semibold tabular-nums tracking-tight text-foreground md:text-5xl">{f.value}</dd>
            <dd className="mt-2 text-sm text-muted-foreground">{f.label}</dd>
          </div>
        ))}
      </dl>

      <section className="mb-24 grid gap-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
        <SectionHeader eyebrow="Our story" title="One platform for the whole security operation" className="mb-0" />
        <div className="space-y-4 text-base leading-relaxed text-muted-foreground">
          <p>
            CyAssure was founded in 2026 by Deepak Bhatnagar, with Jeroen Van Dijk as partner and investor. The idea
            is simple: give organisations one platform for their entire security operation, which they can run
            themselves or hand over to our SOC.
          </p>
          <p>
            That platform is Cy360. It ships as a free, self-hosted Community edition, a licensed Enterprise edition
            and a fully hosted SaaS service. On top of it we offer managed detection and response, SOC as a service,
            compliance support, vCISO services, penetration testing and IT consultancy.
          </p>
        </div>
      </section>

      <section className="mb-24">
        <SectionHeader eyebrow="What we believe" title="Four principles behind everything we ship" />
        <div className="grid gap-px overflow-hidden rounded-lg border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
          {principles.map((p) => (
            <div key={p.title} className="flex flex-col gap-3 bg-card p-6">
              <p.icon className="h-5 w-5" style={{ color: ink(p.color) }} />
              <h3 className="text-lg font-semibold leading-snug text-foreground">{p.title}</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">{p.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-24">
        <SectionHeader eyebrow="Leadership" title="The people behind CyAssure" />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {leaders.map((l) => (
            <article key={l.role} className="flex gap-5 rounded-lg border border-border bg-card p-6">
              <img src={l.avatar} alt="" className="h-20 w-20 shrink-0 rounded-full" loading="lazy" />
              <div className="min-w-0">
                <h3 className={`text-lg font-semibold leading-snug ${l.open ? "text-muted-foreground" : "text-foreground"}`}>{l.name}</h3>
                <p className="eyebrow mt-1 text-primary">{l.role}</p>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{l.bio}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="mb-24 grid gap-10 lg:grid-cols-2">
        <div>
          <SectionHeader
            eyebrow="Where we work"
            title="Two offices, one 24×7 SOC"
            lede="Our SOC monitors customers around the clock from the Netherlands and India."
            className="mb-8"
          />
          <div className="grid gap-4 sm:grid-cols-2">
            {offices.map((o) => (
              <div key={o.country} className="rounded-lg border border-border bg-card p-5">
                <p className="eyebrow text-muted-foreground">{o.country}</p>
                <p className="mt-2 font-semibold text-foreground">{o.city}</p>
                <p className="mt-1 flex items-start gap-2 text-sm text-muted-foreground">
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary" /> {o.address}
                </p>
              </div>
            ))}
          </div>
        </div>
        <div>
          <SectionHeader
            eyebrow="Compliance"
            title="Frameworks we help you meet"
            lede="Our GRC team takes you from gap assessment to audit readiness."
            className="mb-8"
          />
          <div className="flex flex-wrap gap-3">
            {frameworks.map((f) => (
              <span key={f} className="rounded-md border border-border bg-card px-4 py-2.5 text-sm font-semibold text-foreground">
                {f}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="flex flex-col gap-6 rounded-lg bg-[#07122a] p-8 text-white md:flex-row md:items-center md:justify-between md:p-10">
        <div>
          <h2 className="text-2xl font-semibold leading-tight md:text-[1.75rem]">Work with us</h2>
          <p className="mt-2 max-w-xl text-white/75">Talk to an expert about your environment, or watch Cy360 in action first.</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Link
            to="/#contact"
            className="group inline-flex items-center gap-2 rounded-md bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-all hover:brightness-110"
          >
            Talk to an Expert
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
          <Link
            to="/demos"
            className="inline-flex items-center gap-2 rounded-md bg-white/10 px-6 py-3 text-sm font-semibold text-white shadow-[inset_0_0_0_1px_rgba(255,255,255,0.35)] transition-all hover:bg-white/20"
          >
            Watch the demos
          </Link>
        </div>
      </section>
    </div>
  </PageShell>
);

export default About;

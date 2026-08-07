import { motion } from "framer-motion";
import { Brain, ShieldCheck, Monitor, Radar, ArrowRight, Clock } from "lucide-react";

const products = [
  {
    id: "cymind",
    icon: Brain,
    name: "CyMind",
    tagline: "AI Intelligence Engine",
    color: "from-violet-500/20 to-primary/10",
    border: "border-violet-500/30",
    iconColor: "text-violet-400",
    description:
      "On-premise LLM/RAG platform powering the entire CyAssure stack. Role-aware AI chat assistant, threat enrichment, incident narratives, and DLP-scanned knowledge base — no data leaves your network.",
    highlights: [
      "Multi-provider: Ollama · Claude · Gemini · DeepSeek · Groq · Azure",
      "RAG knowledge base with Qdrant vector search",
      "PII masking · Prompt injection detection · Output filtering",
      "ASM enrichment — AI-structured risk-scored JSON",
      "RBAC + seat-based licensing",
    ],
  },
  {
    id: "cycomp",
    icon: ShieldCheck,
    name: "CyComp",
    tagline: "Compliance & Governance",
    comingSoon: true,
    color: "from-emerald-500/20 to-primary/10",
    border: "border-emerald-500/30",
    iconColor: "text-emerald-400",
    description:
      "Automated compliance scoring and gap analysis for NIS2, ISO 27001, DORA, and GDPR/AVG. Manage policy documents, collect evidence, and present executive dashboards — all integrated with Cy360.",
    highlights: [
      "NIS2 · ISO 27001 · DORA · GDPR/AVG · Custom frameworks",
      "Automated scoring & gap analysis",
      "AVG Art.30 processing register (GDPR)",
      "Policy document management & audit trail",
      "Evidence collection & ticketing",
    ],
  },
  {
    id: "cy360",
    icon: Monitor,
    name: "Cy360",
    tagline: "SOC Command Center",
    color: "from-primary/20 to-cyan-500/10",
    border: "border-primary/30",
    iconColor: "text-primary",
    description:
      "Unified SOC dashboard giving real-time incident visibility across your entire environment. Integrates CySIEM, CyASM, CyCases, CySOAR, and CyMISP into a single command center with SAML/OIDC SSO.",
    highlights: [
      "Real-time incident view & alert triage",
      "CySIEM — SIEM/EDR with SAML SSO",
      "LLM-powered incident narratives & ANALYST_SUMMARY",
      "CyCases incident case management (built-in)",
      "CySOAR security automation playbooks",
    ],
  },
  {
    id: "cyasm",
    icon: Radar,
    name: "CyASM",
    tagline: "Attack Surface Management",
    color: "from-orange-500/20 to-primary/10",
    border: "border-orange-500/30",
    iconColor: "text-orange-400",
    description:
      "14 active scan modules across three profiles (Passive · Standard · Deep). Tracks NEW / APPEARED / DISAPPEARED subdomains per scan and enriches findings via CyMind into risk-scored JSON. Multi-tenant with RBAC.",
    highlights: [
      "DNS recon · Subdomain enum (crt.sh, VirusTotal, OTX)",
      "Web analysis: Nmap, service fingerprinting, JS secrets",
      "Dark web credential & IOC monitoring",
      "Cloud infra detection & misconfiguration flags",
      "Supply chain · Email security · OSINT · Social eng",
    ],
  },
];

const ProductsSection = () => {
  return (
    <section id="products" className="relative py-24">
      {/* Background */}
      <div className="absolute inset-0 grid-pattern opacity-20" />
      <div className="absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/3 blur-[140px]" />

      <div className="container relative mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <p className="mb-3 text-xs font-medium uppercase tracking-[0.2em] text-primary">Product Portfolio</p>
          <h2 className="mb-4 font-heading text-3xl font-bold text-foreground md:text-5xl">
            One Platform. Four Pillars.
          </h2>
          <p className="mx-auto max-w-xl text-muted-foreground">
            Each product works standalone — and together they form a unified security stack that outperforms tools costing 5× more.
          </p>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-2">
          {products.map((product, i) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={`group relative rounded-2xl border ${product.border} bg-gradient-to-br ${product.color} p-8 transition-all hover:shadow-[var(--glow-primary)]`}
            >
              {/* Scan line clipped independently so Coming Soon badge can overflow */}
              <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-2xl">
                <motion.div
                  className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent opacity-0 group-hover:opacity-100"
                  animate={{ top: ["0%", "100%"] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                />
              </div>

              {/* Coming Soon ribbon — sits above the card border */}
              {product.comingSoon && (
                <div className="absolute -top-3 right-4 z-10">
                  <span className={`flex items-center gap-1 rounded-full border ${product.border} bg-card px-3 py-1 text-[10px] font-bold uppercase tracking-widest ${product.iconColor}`}>
                    <Clock className="h-3 w-3" /> Coming Soon
                  </span>
                </div>
              )}

              <div className="mb-4 flex items-start gap-4">
                <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border ${product.border} bg-card/50`}>
                  <product.icon className={`h-6 w-6 ${product.iconColor}`} />
                </div>
                <div>
                  <h3 className="font-heading text-xl font-bold text-foreground">{product.name}</h3>
                  <p className={`text-xs font-medium ${product.iconColor}`}>{product.tagline}</p>
                </div>
              </div>

              <p className="mb-5 text-sm leading-relaxed text-muted-foreground">{product.description}</p>

              <ul className="mb-6 space-y-1.5">
                {product.highlights.map((h) => (
                  <li key={h} className="flex items-start gap-2 text-xs text-muted-foreground">
                    <span className={`mt-0.5 h-1.5 w-1.5 shrink-0 rounded-full ${product.iconColor} bg-current`} />
                    {h}
                  </li>
                ))}
              </ul>

              {product.comingSoon ? (
                <a
                  href="#contact"
                  className={`inline-flex items-center gap-1 text-xs font-semibold ${product.iconColor} transition-all hover:gap-2`}
                >
                  Join the waitlist <ArrowRight className="h-3 w-3" />
                </a>
              ) : (
                <a
                  href="#contact"
                  className={`inline-flex items-center gap-1 text-xs font-semibold ${product.iconColor} transition-all hover:gap-2`}
                >
                  Learn more <ArrowRight className="h-3 w-3" />
                </a>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductsSection;

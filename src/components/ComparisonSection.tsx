import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, X, Monitor, Brain } from "lucide-react";

/* ── Cy360 table ───────────────────────────────────────────── */
const cy360Rows = [
  { label: "Price / year (MDR)", cyassure: "€2.4K–12K", splunk: "€150K+", sentinel: "Variable (high)", mssp: "€50–120K" },
  { label: "SIEM + ASM + Compliance + AI", cyassure: "Unified", splunk: "Separate tools", sentinel: "Partial", mssp: "Siloed" },
  { label: "On-premise AI (CyMind)", cyassure: true, splunk: "Add-on (cost)", sentinel: "Copilot+", mssp: false },
  { label: "Built-in Threat Intel (MISP)", cyassure: true, splunk: "Partner", sentinel: "Partner", mssp: false },
  { label: "MDR 24/7 included", cyassure: true, splunk: "Partner only", sentinel: "Partner only", mssp: true },
  { label: "Open-source base (no lock-in)", cyassure: true, splunk: false, sentinel: false, mssp: "Varies" },
  { label: "NIS2 / DORA templates built-in", cyassure: true, splunk: "Manual config", sentinel: "Partial", mssp: "Consulting fee" },
  { label: "Deploy time", cyassure: "< 30 min", splunk: "Months", sentinel: "Weeks", mssp: "Weeks" },
];

/* ── CyMind table ──────────────────────────────────────────── */
const cyMindRows = [
  { label: "Data leaves your network", cymind: false, azure: true, chatgpt: true, vertex: true, bedrock: true },
  { label: "On-premise / air-gapped deploy", cymind: true, azure: false, chatgpt: false, vertex: false, bedrock: false },
  { label: "GDPR / NIS2 by design", cymind: true, azure: "Compliant*", chatgpt: "Compliant*", vertex: "Compliant*", bedrock: "Compliant*" },
  { label: "Per-token pricing", cymind: false, azure: true, chatgpt: true, vertex: true, bedrock: true },
  { label: "Multi-model (Ollama · Claude · DeepSeek · Gemini · Groq)", cymind: true, azure: "Azure only", chatgpt: "GPT only", vertex: "Google only", bedrock: "AWS only" },
  { label: "Security-specific RAG knowledge base", cymind: true, azure: false, chatgpt: false, vertex: false, bedrock: false },
  { label: "Built-in DLP & PII masking", cymind: true, azure: false, chatgpt: false, vertex: false, bedrock: false },
  { label: "Prompt injection detection", cymind: true, azure: false, chatgpt: false, vertex: false, bedrock: false },
  { label: "RBAC + full audit trail", cymind: true, azure: "Partial", chatgpt: "Partial", vertex: "Partial", bedrock: "Partial" },
  { label: "Native SOC / SIEM integration", cymind: true, azure: false, chatgpt: false, vertex: false, bedrock: false },
  { label: "Output filtering & hallucination guard", cymind: true, azure: false, chatgpt: false, vertex: false, bedrock: false },
];

type CellValue = boolean | string;

const Cell = ({ value, highlight, negativeIsGood }: { value: CellValue; highlight?: boolean; negativeIsGood?: boolean }) => {
  if (value === true)
    return (
      <span className={`flex justify-center ${highlight ? "text-primary" : "text-muted-foreground"}`}>
        <Check className="h-4 w-4" />
      </span>
    );
  if (value === false) {
    const isGood = negativeIsGood && highlight;
    const isBad = !negativeIsGood && !highlight;
    return (
      <span className={`flex justify-center ${isGood ? "text-primary" : isBad ? "text-destructive/70" : "text-destructive/70"}`}>
        <X className="h-4 w-4" />
      </span>
    );
  }
  return (
    <span className={`text-xs ${highlight ? "font-semibold text-primary" : "text-muted-foreground"}`}>
      {value}
    </span>
  );
};

const tabs = [
  {
    id: "cy360",
    label: "Cy360 Platform",
    icon: Monitor,
    color: "text-primary",
    activeBg: "bg-primary/10 border-primary/40 text-primary",
    glow: "bg-primary/5 border-primary/20",
    callout: (
      <>
        <span className="font-semibold text-foreground">Only Cy360</span> delivers SIEM + ASM + Compliance + CyMind AI + MISP Threat Intel in one platform with{" "}
        <span className="text-primary font-semibold">&lt; 30 min deployment at SME pricing.</span>
      </>
    ),
  },
  {
    id: "cymind",
    label: "CyMind Private AI",
    icon: Brain,
    color: "text-violet-400",
    activeBg: "bg-violet-500/10 border-violet-500/40 text-violet-400",
    glow: "bg-violet-500/5 border-violet-500/20",
    callout: (
      <>
        <span className="font-semibold text-foreground">CyMind is the only enterprise AI platform</span> that runs entirely on your infrastructure —{" "}
        <span className="text-violet-400 font-semibold">zero data exposure, no per-token billing, fully air-gappable.</span>
      </>
    ),
  },
] as const;

const ComparisonSection = () => {
  const [activeTab, setActiveTab] = useState<"cy360" | "cymind">("cy360");
  const tab = tabs.find((t) => t.id === activeTab)!;

  return (
    <section id="comparison" className="relative py-24">
      <div className="absolute right-0 top-1/2 h-[400px] w-[400px] -translate-y-1/2 rounded-full bg-accent/5 blur-[120px]" />

      <div className="container relative mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-10 text-center"
        >
          <p className="mb-3 text-xs font-medium uppercase tracking-[0.2em] text-primary">Competitive Landscape</p>
          <h2 className="mb-4 font-heading text-3xl font-bold text-foreground md:text-5xl">
            How Cy360 Compares
          </h2>
          <p className="mx-auto max-w-xl text-muted-foreground">
            The only platform combining SIEM + ASM + Compliance + Private AI + Threat Intel at SME pricing.
          </p>
        </motion.div>

        {/* Tab switcher */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-8 flex justify-center"
        >
          <div className="inline-flex gap-2 rounded-xl border border-border/60 bg-card/60 p-1.5 backdrop-blur-sm">
            {tabs.map((t) => {
              const Icon = t.icon;
              const isActive = activeTab === t.id;
              return (
                <button
                  key={t.id}
                  onClick={() => setActiveTab(t.id)}
                  className={`flex items-center gap-2 rounded-lg border px-5 py-2.5 text-xs font-semibold uppercase tracking-wide transition-all duration-200 ${
                    isActive
                      ? t.activeBg
                      : "border-transparent text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <Icon className="h-3.5 w-3.5" />
                  {t.label}
                </button>
              );
            })}
          </div>
        </motion.div>

        {/* Table */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
            className="overflow-x-auto"
          >
            {activeTab === "cy360" ? (
              <table className="w-full min-w-[640px] border-collapse text-sm">
                <thead>
                  <tr>
                    <th className="pb-4 pr-6 text-left text-xs font-medium uppercase tracking-widest text-muted-foreground">Capability</th>
                    <th className="pb-4 px-4 text-center">
                      <span className="inline-flex flex-col items-center gap-1 rounded-lg border border-primary/40 bg-primary/10 px-4 py-2 text-xs font-bold uppercase tracking-wide text-primary">
                        Cy360
                      </span>
                    </th>
                    <th className="pb-4 px-4 text-center text-xs font-medium text-muted-foreground">Splunk / IBM</th>
                    <th className="pb-4 px-4 text-center text-xs font-medium text-muted-foreground">MS Sentinel</th>
                    <th className="pb-4 px-4 text-center text-xs font-medium text-muted-foreground">Local MSSPs</th>
                  </tr>
                </thead>
                <tbody>
                  {cy360Rows.map((row, i) => (
                    <motion.tr
                      key={row.label}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.04 }}
                      className="border-t border-border/50"
                    >
                      <td className="py-3 pr-6 text-sm text-muted-foreground">{row.label}</td>
                      <td className="py-3 px-4 text-center"><Cell value={row.cyassure} highlight /></td>
                      <td className="py-3 px-4 text-center"><Cell value={row.splunk} /></td>
                      <td className="py-3 px-4 text-center"><Cell value={row.sentinel} /></td>
                      <td className="py-3 px-4 text-center"><Cell value={row.mssp} /></td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <table className="w-full min-w-[720px] border-collapse text-sm">
                <thead>
                  <tr>
                    <th className="pb-4 pr-6 text-left text-xs font-medium uppercase tracking-widest text-muted-foreground">Capability</th>
                    <th className="pb-4 px-4 text-center">
                      <span className="inline-flex flex-col items-center gap-1 rounded-lg border border-violet-500/40 bg-violet-500/10 px-4 py-2 text-xs font-bold uppercase tracking-wide text-violet-400">
                        CyMind
                      </span>
                    </th>
                    <th className="pb-4 px-3 text-center text-xs font-medium text-muted-foreground">Azure OpenAI</th>
                    <th className="pb-4 px-3 text-center text-xs font-medium text-muted-foreground">ChatGPT Ent.</th>
                    <th className="pb-4 px-3 text-center text-xs font-medium text-muted-foreground">Google Vertex</th>
                    <th className="pb-4 px-3 text-center text-xs font-medium text-muted-foreground">AWS Bedrock</th>
                  </tr>
                </thead>
                <tbody>
                  {cyMindRows.map((row, i) => (
                    <motion.tr
                      key={row.label}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.04 }}
                      className="border-t border-border/50"
                    >
                      <td className="py-3 pr-6 text-sm text-muted-foreground">{row.label}</td>
                      <td className="py-3 px-4 text-center">
                        <Cell value={row.cymind} highlight negativeIsGood={row.label === "Data leaves your network" || row.label === "Per-token pricing"} />
                      </td>
                      <td className="py-3 px-3 text-center"><Cell value={row.azure} /></td>
                      <td className="py-3 px-3 text-center"><Cell value={row.chatgpt} /></td>
                      <td className="py-3 px-3 text-center"><Cell value={row.vertex} /></td>
                      <td className="py-3 px-3 text-center"><Cell value={row.bedrock} /></td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Callout — changes per tab */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`callout-${activeTab}`}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
            className={`mt-10 rounded-2xl border px-8 py-6 text-center ${tab.glow}`}
          >
            <p className="text-sm text-muted-foreground">{tab.callout}</p>
            <a
              href="#pricing"
              className="mt-4 inline-block rounded-lg bg-primary px-6 py-2.5 text-sm font-semibold text-primary-foreground transition-all hover:brightness-110"
            >
              View Pricing
            </a>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};

export default ComparisonSection;

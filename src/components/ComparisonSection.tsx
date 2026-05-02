import { motion } from "framer-motion";
import { Check, X, Minus } from "lucide-react";

const dimensions = [
  { label: "Price / year (MDR)", cycentra: "€2.4K–12K", splunk: "€150K+", sentinel: "Variable (high)", mssp: "€50–120K" },
  { label: "SIEM + ASM + Compliance + AI", cycentra: "Unified", splunk: "Separate tools", sentinel: "Partial", mssp: "Siloed" },
  { label: "On-premise AI (CyMind)", cycentra: true, splunk: "Add-on (cost)", sentinel: "Copilot+", mssp: false },
  { label: "Built-in Threat Intel (MISP)", cycentra: true, splunk: "Partner", sentinel: "Partner", mssp: false },
  { label: "MDR 24/7 included", cycentra: true, splunk: "Partner only", sentinel: "Partner only", mssp: true },
  { label: "Open-source base (no lock-in)", cycentra: true, splunk: false, sentinel: false, mssp: "Varies" },
  { label: "NIS2 / DORA templates built-in", cycentra: true, splunk: "Manual config", sentinel: "Partial", mssp: "Consulting fee" },
  { label: "Deploy time", cycentra: "< 30 min", splunk: "Months", sentinel: "Weeks", mssp: "Weeks" },
];

type CellValue = boolean | string;

const Cell = ({ value, highlight }: { value: CellValue; highlight?: boolean }) => {
  if (value === true)
    return (
      <span className={`flex justify-center ${highlight ? "text-primary" : "text-primary"}`}>
        <Check className="h-4 w-4" />
      </span>
    );
  if (value === false)
    return (
      <span className="flex justify-center text-destructive/70">
        <X className="h-4 w-4" />
      </span>
    );
  return (
    <span
      className={`text-xs ${
        highlight ? "font-semibold text-primary" : "text-muted-foreground"
      }`}
    >
      {value}
    </span>
  );
};

const ComparisonSection = () => {
  return (
    <section id="comparison" className="relative py-24">
      {/* Background glow */}
      <div className="absolute right-0 top-1/2 h-[400px] w-[400px] -translate-y-1/2 rounded-full bg-accent/5 blur-[120px]" />

      <div className="container relative mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 text-center"
        >
          <p className="mb-3 text-xs font-medium uppercase tracking-[0.2em] text-primary">Competitive Landscape</p>
          <h2 className="mb-4 font-heading text-3xl font-bold text-foreground md:text-5xl">
            How CyCentra Compares
          </h2>
          <p className="mx-auto max-w-xl text-muted-foreground">
            The only platform combining SIEM + ASM + Compliance + AI + Threat Intel at SME pricing.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="overflow-x-auto"
        >
          <table className="w-full min-w-[640px] border-collapse text-sm">
            <thead>
              <tr>
                <th className="pb-4 pr-6 text-left text-xs font-medium uppercase tracking-widest text-muted-foreground">
                  Capability
                </th>
                <th className="pb-4 px-4 text-center">
                  <span className="inline-flex flex-col items-center gap-1 rounded-lg border border-primary/40 bg-primary/10 px-4 py-2 text-xs font-bold uppercase tracking-wide text-primary">
                    CyCentra
                  </span>
                </th>
                <th className="pb-4 px-4 text-center text-xs font-medium text-muted-foreground">Splunk / IBM</th>
                <th className="pb-4 px-4 text-center text-xs font-medium text-muted-foreground">MS Sentinel</th>
                <th className="pb-4 px-4 text-center text-xs font-medium text-muted-foreground">Local MSSPs</th>
              </tr>
            </thead>
            <tbody>
              {dimensions.map((row, i) => (
                <motion.tr
                  key={row.label}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  className="border-t border-border/50"
                >
                  <td className="py-3 pr-6 text-sm text-muted-foreground">{row.label}</td>
                  <td className="py-3 px-4 text-center">
                    <Cell value={row.cycentra} highlight />
                  </td>
                  <td className="py-3 px-4 text-center">
                    <Cell value={row.splunk} />
                  </td>
                  <td className="py-3 px-4 text-center">
                    <Cell value={row.sentinel} />
                  </td>
                  <td className="py-3 px-4 text-center">
                    <Cell value={row.mssp} />
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </motion.div>

        {/* Callout */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-10 rounded-2xl border border-primary/20 bg-primary/5 px-8 py-6 text-center"
        >
          <p className="text-sm text-muted-foreground">
            <span className="font-semibold text-foreground">Only CyCentra</span> delivers SIEM + ASM + Compliance + CyMind AI + MISP Threat Intel in one platform with{" "}
            <span className="text-primary font-semibold">1-week deployment at SME pricing.</span>
          </p>
          <a
            href="#pricing"
            className="mt-4 inline-block rounded-lg bg-primary px-6 py-2.5 text-sm font-semibold text-primary-foreground transition-all hover:brightness-110"
          >
            View Pricing
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default ComparisonSection;

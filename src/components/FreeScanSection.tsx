import { motion } from "framer-motion";
import { Radar, ArrowRight, ShieldAlert, Globe, Search, Zap } from "lucide-react";

const scanModules = [
  "DNS Reconnaissance",
  "Subdomain Enumeration",
  "SSL / Crypto Analysis",
  "Email Security (SPF/DKIM/DMARC)",
  "Web Exposure & Service Fingerprinting",
  "Cloud Infra Detection",
];

const FreeScanSection = () => {
  return (
    <section id="free-scan" className="relative py-24 overflow-hidden">
      {/* Background glow */}
      <div className="absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/5 blur-[130px]" />

      <div className="container relative mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative rounded-2xl border border-primary/30 bg-gradient-to-br from-primary/10 via-card to-card overflow-hidden"
        >
          {/* Animated scan line */}
          <motion.div
            className="pointer-events-none absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent"
            animate={{ top: ["0%", "100%", "0%"] }}
            transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
          />

          {/* Pulsing border rings */}
          {[0, 1].map((i) => (
            <motion.div
              key={i}
              className="pointer-events-none absolute -inset-1 rounded-2xl border border-primary/10"
              animate={{ opacity: [0.2, 0.6, 0.2], scale: [1, 1.005, 1] }}
              transition={{ duration: 3, repeat: Infinity, delay: i * 1.5 }}
            />
          ))}

          <div className="grid gap-12 p-10 lg:grid-cols-2 lg:items-center">
            {/* Left: copy */}
            <div>
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-xs text-primary">
                <motion.div
                  animate={{ scale: [1, 1.4, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <Radar className="h-3.5 w-3.5" />
                </motion.div>
                No account required
              </div>

              <h2 className="mb-4 font-heading text-3xl font-bold text-foreground md:text-4xl">
                Get Your Free Attack
                <br />
                <span className="text-gradient">Surface Scan</span>
              </h2>

              <p className="mb-6 max-w-md text-muted-foreground">
                Discover what attackers can see about your organisation — in minutes. Our CyASM engine runs a
                passive reconnaissance scan across your domain and delivers an instant risk summary.
              </p>

              <ul className="mb-8 grid grid-cols-2 gap-2">
                {scanModules.map((mod) => (
                  <li key={mod} className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Search className="h-3.5 w-3.5 shrink-0 text-primary" />
                    {mod}
                  </li>
                ))}
              </ul>

              <a
                href="https://cy360.cyassure.eu/guest-scan"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 rounded-lg bg-primary px-7 py-3.5 font-heading text-sm font-semibold text-primary-foreground transition-all hover:brightness-110"
              >
                <Zap className="h-4 w-4" />
                Start Free Scan
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </a>

              <p className="mt-3 text-xs text-muted-foreground/60">
                Passive scan only · No agents required · Results in &lt; 5 minutes
              </p>
            </div>

            {/* Right: animated scan visual */}
            <div className="flex justify-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="relative flex h-56 w-56 items-center justify-center"
              >
                {/* Radar rings */}
                {[1, 2, 3, 4].map((ring) => (
                  <motion.div
                    key={ring}
                    className="absolute rounded-full border border-primary/20"
                    style={{ inset: `${(4 - ring) * 14}%` }}
                    animate={{ opacity: [0.1, 0.5, 0.1] }}
                    transition={{ duration: 2.5, repeat: Infinity, delay: ring * 0.3 }}
                  />
                ))}

                {/* Rotating sweep */}
                <motion.div
                  className="absolute inset-0"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                >
                  <div className="h-full w-full rounded-full"
                    style={{
                      background: "conic-gradient(from 0deg, transparent 270deg, hsl(var(--primary) / 0.3) 360deg)",
                    }}
                  />
                </motion.div>

                {/* Center icon */}
                <div className="relative z-10 flex flex-col items-center gap-2 rounded-full border border-primary/30 bg-card p-5">
                  <Globe className="h-8 w-8 text-primary" />
                </div>

                {/* Detected blips */}
                {[
                  { top: "15%", left: "68%", delay: 0.5 },
                  { top: "60%", left: "80%", delay: 1.2 },
                  { top: "75%", left: "30%", delay: 2 },
                  { top: "25%", left: "20%", delay: 1.7 },
                ].map((blip, i) => (
                  <motion.div
                    key={i}
                    className="absolute h-2 w-2 rounded-full bg-primary"
                    style={{ top: blip.top, left: blip.left }}
                    animate={{ opacity: [0, 1, 0], scale: [0.5, 1.5, 0.5] }}
                    transition={{ duration: 1.5, repeat: Infinity, delay: blip.delay }}
                  />
                ))}
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FreeScanSection;

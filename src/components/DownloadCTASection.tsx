import { motion } from "framer-motion";
import { Terminal, ArrowRight, Zap } from "lucide-react";
import { Link } from "react-router-dom";

const DownloadCTASection = () => {
  return (
    <section className="relative py-16">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mx-auto flex max-w-3xl flex-col items-center gap-6 rounded-2xl border border-primary/25 bg-gradient-to-br from-primary/10 via-card to-card p-10 text-center"
        >
          <div className="flex h-14 w-14 items-center justify-center rounded-full border border-primary/40 bg-primary/15">
            <Terminal className="h-7 w-7 text-primary" />
          </div>
          <div>
            <h2 className="mb-2 font-heading text-2xl font-bold text-foreground md:text-3xl">
              Try Cy360 in minutes, not weeks
            </h2>
            <p className="mx-auto max-w-md text-muted-foreground">
              Community edition is free and self-hosted. Public images, one install command, pick your version.
            </p>
          </div>
          <div className="flex items-center gap-2 rounded-full border border-primary/20 bg-background/40 px-3 py-1.5 text-xs text-primary">
            <Zap className="h-3.5 w-3.5" /> No card required
          </div>
          <Link
            to="/download"
            className="group inline-flex items-center gap-2 rounded-lg bg-primary px-7 py-3.5 font-heading text-sm font-semibold text-primary-foreground transition-all hover:brightness-110"
          >
            Get the Install Command
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default DownloadCTASection;

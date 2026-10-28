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
          className="flex flex-col gap-6 rounded-lg border border-border bg-card p-8 md:flex-row md:items-center md:justify-between md:p-10"
        >
          <div className="flex items-start gap-5">
            <Terminal className="mt-1 h-6 w-6 shrink-0 text-primary" />
            <div>
              <h2 className="mb-2 text-2xl font-semibold leading-tight text-foreground md:text-[1.75rem] md:text-2xl">
                Try Cy360 in minutes, not weeks
              </h2>
              <p className="max-w-lg text-muted-foreground">
                Community edition is free and self-hosted. Public images, one install command, pick your version.
              </p>
              <p className="mt-3 flex items-center gap-2 text-xs text-muted-foreground">
                <Zap className="h-3.5 w-3.5 text-primary" /> No card required
              </p>
            </div>
          </div>
          <Link
            to="/download"
            className="group inline-flex shrink-0 items-center gap-2 self-start rounded-md bg-primary px-7 py-3.5 text-sm font-semibold text-primary-foreground transition-all hover:brightness-110 md:self-center"
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

import { motion } from "framer-motion";
import { Mail, MapPin } from "lucide-react";
import PageShell from "@/components/PageShell";
import { DOMAIN_COLORS } from "@/lib/domains";
import SupportForm from "@/components/SupportForm";

const Support = () => (
  <PageShell accent={DOMAIN_COLORS.data}>
    <section className="relative py-16">
      <div className="container mx-auto max-w-2xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-10 max-w-3xl"
        >
          <p className="mb-4 flex items-center gap-2.5 font-mono text-xs uppercase tracking-[0.12em] text-muted-foreground">
            <span className="h-2.5 w-2.5 shrink-0 bg-[var(--page-accent)]" />
            Support
          </p>
          <h1 className="mb-4 font-heading text-2xl font-bold leading-[1.1] text-foreground md:text-4xl">
            How can we help?
          </h1>
          <p className="max-w-md text-muted-foreground">
            Installation issues, licensing questions, or anything else — a real person reads every message.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-8 rounded-2xl border border-border bg-card p-6 md:p-8"
        >
          <SupportForm />
        </motion.div>

        <div className="flex flex-wrap justify-center gap-6 text-sm text-muted-foreground">
          <a href="mailto:support@cyassure.eu" className="flex items-center gap-2 transition-colors hover:text-primary">
            <Mail className="h-4 w-4 text-primary" /> support@cyassure.eu
          </a>
          <span className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-primary" /> Rijswijk, The Netherlands
          </span>
          <span className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-primary" /> Manesar, Gurgaon, India
          </span>
        </div>
      </div>
    </section>
  </PageShell>
);

export default Support;

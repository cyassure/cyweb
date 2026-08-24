import { motion } from "framer-motion";
import { Mail, MapPin } from "lucide-react";
import PageShell from "@/components/PageShell";
import SupportForm from "@/components/SupportForm";

const Support = () => (
  <PageShell>
    <section className="relative py-16">
      <div className="container mx-auto max-w-2xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-10 text-center"
        >
          <p className="mb-3 text-xs font-medium uppercase tracking-[0.2em] text-primary">Support</p>
          <h1 className="mb-4 font-heading text-3xl font-bold text-foreground md:text-5xl">
            How can we help?
          </h1>
          <p className="mx-auto max-w-md text-muted-foreground">
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
        </div>
      </div>
    </section>
  </PageShell>
);

export default Support;

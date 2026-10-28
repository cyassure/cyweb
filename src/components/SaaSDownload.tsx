import { motion } from "framer-motion";
import { Cloud, ArrowRight, ShieldCheck } from "lucide-react";

const SAAS_URL = "https://cy360.cyassure.eu";

const SaaSDownload = () => {
  return (
    <section className="relative py-16">
      <div className="container mx-auto max-w-3xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 max-w-3xl"
        >
          <p className="mb-4 flex items-center gap-2.5 font-mono text-xs uppercase tracking-[0.12em] text-muted-foreground">
            <span className="h-2.5 w-2.5 shrink-0 bg-[var(--page-accent)]" />
            Cy360 SaaS
          </p>
          <h1 className="mb-4 font-heading text-2xl font-bold leading-[1.1] text-foreground md:text-4xl">
            Fully hosted. Nothing to run.
          </h1>
          <p className="max-w-xl text-muted-foreground">
            Sign in with your existing organization credentials — the SaaS app handles SSO, provisioning, and
            upgrades for you.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col items-center gap-6 rounded-2xl border border-border bg-card p-10 text-center"
        >
          <div className="flex h-14 w-14 items-center justify-center rounded-full border border-primary/40 bg-primary/15">
            <Cloud className="h-7 w-7 text-primary" />
          </div>
          <div>
            <p className="mb-1 font-heading text-lg font-semibold text-foreground">cy360.cyassure.eu</p>
            <p className="text-sm text-muted-foreground">
              You'll be redirected to sign in via your organization's SSO.
            </p>
          </div>
          <a
            href={SAAS_URL}
            className="group inline-flex items-center gap-2 rounded-lg bg-primary px-7 py-3.5 text-sm font-semibold text-primary-foreground transition-all hover:brightness-110"
          >
            Go to Cy360 SaaS
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </a>
          <p className="flex items-center gap-2 text-xs text-muted-foreground/70">
            <ShieldCheck className="h-3.5 w-3.5" />
            No install command needed — access is managed entirely through your account.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default SaaSDownload;

import { useState } from "react";
import { motion } from "framer-motion";
import { Container, Cpu, HardDrive, Network, ShieldCheck, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import VersionPicker from "@/components/VersionPicker";
import InstallCommandBox from "@/components/InstallCommandBox";

const prerequisites = [
  { icon: Container, label: "Docker Engine 24+", sub: "with the Compose plugin" },
  { icon: Cpu, label: "4 vCPU minimum", sub: "6 vCPU recommended" },
  { icon: HardDrive, label: "8 GB RAM minimum", sub: "12 GB+ recommended" },
  { icon: Network, label: "One open port", sub: "everything else stays internal" },
];

const DownloadSection = () => {
  const [version, setVersion] = useState("latest");

  return (
    <section className="relative py-16">
      <div className="container mx-auto max-w-3xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 text-center"
        >
          <p className="mb-3 text-xs font-medium uppercase tracking-[0.2em] text-primary">Get Cy360</p>
          <h1 className="mb-4 font-heading text-3xl font-bold text-foreground md:text-5xl">
            One command. Fully running.
          </h1>
          <p className="mx-auto max-w-xl text-muted-foreground">
            The Community edition installer pulls public images, brings up the stack, and runs a health
            check automatically — no manual setup.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-6 rounded-2xl border border-border bg-card p-6 md:p-8"
        >
          <p className="mb-3 text-xs font-medium uppercase tracking-wider text-muted-foreground">1. Choose a version</p>
          <VersionPicker value={version} onChange={setVersion} />

          <p className="mb-3 mt-8 text-xs font-medium uppercase tracking-wider text-muted-foreground">
            2. Run this on your server
          </p>
          <InstallCommandBox version={version} />
          <p className="mt-3 text-xs text-muted-foreground/70">
            This runs the same installer script published in our GitHub repo — read it before you run it.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-10 grid grid-cols-2 gap-3 sm:grid-cols-4"
        >
          {prerequisites.map((p) => (
            <div
              key={p.label}
              className="flex flex-col items-center gap-2 rounded-xl border border-border bg-card p-4 text-center"
            >
              <p.icon className="h-5 w-5 text-primary" />
              <span className="text-xs font-medium text-foreground">{p.label}</span>
              <span className="text-[10px] text-muted-foreground">{p.sub}</span>
            </div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col items-center gap-3 rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-6 text-center sm:flex-row sm:justify-between sm:text-left"
        >
          <div className="flex items-center gap-3">
            <ShieldCheck className="h-6 w-6 shrink-0 text-emerald-400" />
            <p className="text-sm text-foreground">
              Need more users, more agents, or CyMind AI + CyTIM intel? That's Enterprise — licensed, not public.
            </p>
          </div>
          <Link
            to="/support"
            className="group inline-flex shrink-0 items-center gap-2 rounded-lg border border-emerald-500/40 bg-card px-5 py-2.5 text-sm font-semibold text-emerald-400 transition-all hover:brightness-110"
          >
            Contact Sales
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </motion.div>

        <p className="mt-10 text-center text-sm text-muted-foreground">
          Need the full walkthrough? <Link to="/docs" className="text-primary underline underline-offset-4">Read the deployment docs →</Link>
        </p>
      </div>
    </section>
  );
};

export default DownloadSection;

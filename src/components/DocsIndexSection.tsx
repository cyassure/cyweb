import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { docs } from "@/lib/docs";

const DocsIndexSection = () => {
  return (
    <section className="relative py-16">
      <div className="container mx-auto max-w-3xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 text-center"
        >
          <p className="mb-3 text-xs font-medium uppercase tracking-[0.2em] text-primary">Documentation</p>
          <h1 className="mb-4 font-heading text-3xl font-bold text-foreground md:text-5xl">
            Everything you need to run Cy360
          </h1>
          <p className="mx-auto max-w-xl text-muted-foreground">
            From a three-step quick start to the full deployment reference.
          </p>
        </motion.div>

        <div className="grid gap-4 sm:grid-cols-3">
          {docs.map((doc, i) => (
            <motion.div
              key={doc.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
            >
              <Link
                to={`/docs/${doc.slug}`}
                className="group flex h-full flex-col rounded-xl border border-border bg-card p-6 transition-all hover:border-primary/40"
              >
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl border border-border bg-secondary/50 transition-all group-hover:border-primary/40 group-hover:bg-primary/10">
                  <doc.icon className="h-5 w-5 text-primary" />
                </div>
                <h2 className="mb-2 font-heading text-base font-bold text-foreground">{doc.title}</h2>
                <p className="mb-4 flex-1 text-sm text-muted-foreground">{doc.description}</p>
                <span className="inline-flex items-center gap-1 text-xs font-semibold text-primary">
                  Read <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DocsIndexSection;

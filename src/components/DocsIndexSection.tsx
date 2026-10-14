import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { DOC_CATEGORIES, docsInCategory } from "@/lib/docs";

const DocsIndexSection = () => {
  return (
    <section className="relative py-16">
      <div className="container mx-auto max-w-6xl px-6">
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
          <p className="mx-auto max-w-2xl text-muted-foreground">
            From a three-step quick start to a page-by-page user guide, the system architecture and a troubleshooting
            reference.
          </p>
        </motion.div>

        {DOC_CATEGORIES.map((cat) => (
          <div key={cat.name} className="mb-12">
            <h2 className="mb-1 font-heading text-xl font-bold text-foreground">{cat.name}</h2>
            <p className="mb-5 text-sm text-muted-foreground">{cat.blurb}</p>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {docsInCategory(cat.name).map((doc, i) => (
                <motion.div
                  key={doc.slug}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: Math.min(i, 6) * 0.05 }}
                >
                  <Link
                    to={`/docs/${doc.slug}`}
                    className="group flex h-full flex-col rounded-xl border border-border bg-card p-6 transition-all hover:border-primary/40"
                  >
                    <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl border border-border bg-secondary/50 transition-all group-hover:border-primary/40 group-hover:bg-primary/10">
                      <doc.icon className="h-5 w-5 text-primary" />
                    </div>
                    <h3 className="mb-2 font-heading text-base font-bold text-foreground">{doc.title}</h3>
                    <p className="mb-4 flex-1 text-sm text-muted-foreground">{doc.description}</p>
                    <span className="inline-flex items-center gap-1 text-xs font-semibold text-primary">
                      Read <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1" />
                    </span>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default DocsIndexSection;

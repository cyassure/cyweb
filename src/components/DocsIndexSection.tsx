import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, PlayCircle } from "lucide-react";
import { DOC_CATEGORIES, docsInCategory, docColor } from "@/lib/docs";
import { DOMAIN_COLORS } from "@/lib/domains";

const DocsIndexSection = () => {
  return (
    <section className="relative py-16">
      <div className="container mx-auto max-w-6xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 max-w-3xl"
        >
          <p className="mb-4 flex items-center gap-2.5 eyebrow text-muted-foreground">
            <span className="h-2.5 w-2.5 shrink-0 bg-[var(--page-accent)]" />
            Documentation
          </p>
          <h1 className="mb-4 font-heading text-3xl font-semibold leading-[1.1] text-foreground md:text-[2.75rem]">
            Everything you need to run Cy360
          </h1>
          <p className="max-w-2xl text-muted-foreground">
            From a three-step quick start to a page-by-page user guide, the system architecture and a troubleshooting
            reference.
          </p>
        </motion.div>

        <Link
          to="/demos"
          className="group mb-12 flex items-center gap-4 rounded-lg p-5 text-white transition-all hover:brightness-110"
          style={{ backgroundColor: DOMAIN_COLORS.response }}
        >
          <PlayCircle className="h-10 w-10 shrink-0" />
          <div className="flex-1">
            <p className="font-heading text-base font-bold">Prefer to watch? See the demo videos</p>
            <p className="text-sm text-white/85">A three-minute platform overview and a narrated walkthrough of every module.</p>
          </div>
          <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
        </Link>

        {DOC_CATEGORIES.map((cat) => (
          <div key={cat.name} className="mb-12">
            <h2 className="mb-1 text-2xl font-semibold leading-tight text-foreground md:text-[1.75rem]">{cat.name}</h2>
            <p className="mb-5 text-sm text-muted-foreground">{cat.blurb}</p>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {docsInCategory(cat.name).map((doc, i) => {
                const c = docColor(doc);
                return (
                <motion.div
                  key={doc.slug}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: Math.min(i, 6) * 0.05 }}
                >
                  <Link
                    to={`/docs/${doc.slug}`}
                    className="group flex h-full flex-col rounded-lg border p-6 transition-all hover:shadow-[var(--shadow-card)]"
                    style={{
                      backgroundColor: `color-mix(in srgb, ${c} 7%, hsl(var(--card)))`,
                      borderColor: `color-mix(in srgb, ${c} 35%, transparent)`,
                    }}
                  >
                    <doc.icon className="mb-5 h-6 w-6" style={{ color: `color-mix(in srgb, ${c} 75%, black)` }} />
                    <h3 className="mb-2 text-lg font-semibold leading-snug text-foreground">{doc.title}</h3>
                    <p className="mb-4 flex-1 text-sm text-muted-foreground">{doc.description}</p>
                    <span
                      className="inline-flex items-center gap-1 text-xs font-semibold"
                      style={{ color: `color-mix(in srgb, ${c} 70%, black)` }}
                    >
                      Read <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1" />
                    </span>
                  </Link>
                </motion.div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default DocsIndexSection;

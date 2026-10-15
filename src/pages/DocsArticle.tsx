import { Children, ReactNode, isValidElement, useEffect } from "react";
import { useParams, Link, Navigate, useLocation } from "react-router-dom";
import ReactMarkdown, { Components } from "react-markdown";
import remarkGfm from "remark-gfm";
import { ArrowLeft, ArrowRight, PlayCircle } from "lucide-react";
import PageShell from "@/components/PageShell";
import { demoForDoc, formatDuration } from "@/lib/demos";
import { DOC_CATEGORIES, docs, docsInCategory, extractHeadings, getDocBySlug, slugifyHeading } from "@/lib/docs";

// Plain text of a rendered heading, so its id matches extractHeadings()'s.
function textOf(node: ReactNode): string {
  return Children.toArray(node)
    .map((c) => (typeof c === "string" || typeof c === "number" ? String(c) : isValidElement(c) ? textOf(c.props.children) : ""))
    .join("");
}

const markdownComponents: Components = {
  h2: ({ children }) => <h2 id={slugifyHeading(textOf(children))} className="scroll-mt-28">{children}</h2>,
  h3: ({ children }) => <h3 id={slugifyHeading(textOf(children))} className="scroll-mt-28">{children}</h3>,
  a: ({ href = "", children }) =>
    href.startsWith("/") ? (
      <Link to={href}>{children}</Link>
    ) : (
      <a href={href} target={href.startsWith("#") ? undefined : "_blank"} rel="noreferrer">
        {children}
      </a>
    ),
  img: ({ src = "", alt = "" }) => (
    <a href={src} target="_blank" rel="noreferrer" className="not-prose block">
      <img
        src={src}
        alt={alt}
        loading="lazy"
        className="my-6 w-full rounded-lg border border-border shadow-lg"
      />
    </a>
  ),
  table: ({ children }) => (
    <div className="overflow-x-auto">
      <table>{children}</table>
    </div>
  ),
};

const DocsNav = ({ current }: { current: string }) => (
  <nav className="space-y-6 text-sm">
    {DOC_CATEGORIES.map((cat) => (
      <div key={cat.name}>
        <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">{cat.name}</p>
        <ul className="space-y-1 border-l border-border">
          {docsInCategory(cat.name).map((d) => (
            <li key={d.slug}>
              <Link
                to={`/docs/${d.slug}`}
                className={`-ml-px block border-l py-1 pl-3 transition-colors ${
                  d.slug === current
                    ? "border-primary font-medium text-primary"
                    : "border-transparent text-muted-foreground hover:border-muted-foreground hover:text-foreground"
                }`}
              >
                {d.title}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    ))}
  </nav>
);

const DocsArticle = () => {
  const { slug } = useParams<{ slug: string }>();
  const { hash } = useLocation();
  const doc = slug ? getDocBySlug(slug) : undefined;

  useEffect(() => {
    if (hash) {
      document.getElementById(decodeURIComponent(hash.slice(1)))?.scrollIntoView();
    } else {
      window.scrollTo(0, 0);
    }
  }, [slug, hash]);

  if (!doc) return <Navigate to="/docs" replace />;

  const demo = demoForDoc(doc.slug);
  const headings = extractHeadings(doc.content).filter((h) => h.level === 2);
  const idx = docs.findIndex((d) => d.slug === doc.slug);
  const prev = idx > 0 ? docs[idx - 1] : undefined;
  const next = idx < docs.length - 1 ? docs[idx + 1] : undefined;

  return (
    <PageShell>
      <section className="relative py-12">
        <div className="container mx-auto max-w-7xl px-6">
          <div className="grid gap-10 lg:grid-cols-[220px_minmax(0,1fr)] xl:grid-cols-[220px_minmax(0,1fr)_200px]">
            <aside className="hidden lg:block">
              <div className="sticky top-28 max-h-[calc(100vh-8rem)] overflow-y-auto pb-8 pr-2">
                <DocsNav current={doc.slug} />
              </div>
            </aside>

            <div className="min-w-0">
              <Link
                to="/docs"
                className="mb-6 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-primary"
              >
                <ArrowLeft className="h-4 w-4" /> All docs
              </Link>
              <p className="mb-2 text-xs font-medium uppercase tracking-[0.2em] text-primary">{doc.category}</p>

              <details className="mb-8 rounded-lg border border-border bg-card p-4 lg:hidden">
                <summary className="cursor-pointer text-sm font-medium text-foreground">Browse all documentation</summary>
                <div className="mt-4">
                  <DocsNav current={doc.slug} />
                </div>
              </details>

              {demo && (
                <Link
                  to={`/demos?v=${demo.id}`}
                  className="mb-6 inline-flex items-center gap-2 rounded-lg border border-primary/30 bg-primary/5 px-4 py-2 text-sm font-medium text-foreground transition-colors hover:border-primary/60"
                >
                  <PlayCircle className="h-4 w-4 text-primary" /> Watch the {demo.title} demo ({formatDuration(demo.duration)})
                </Link>
              )}

              <article className="prose prose-invert max-w-none prose-headings:font-heading prose-a:text-primary prose-table:text-sm prose-th:text-foreground prose-img:my-0 prose-code:before:content-none prose-code:after:content-none prose-code:rounded prose-code:bg-secondary/60 prose-code:px-1 prose-code:py-0.5 prose-code:font-normal [&_pre_code]:bg-transparent [&_pre_code]:p-0">
                <ReactMarkdown remarkPlugins={[remarkGfm]} components={markdownComponents}>
                  {doc.content}
                </ReactMarkdown>
              </article>

              <div className="mt-16 grid gap-4 border-t border-border pt-8 sm:grid-cols-2">
                {prev ? (
                  <Link to={`/docs/${prev.slug}`} className="rounded-lg border border-border p-4 transition-colors hover:border-primary/40">
                    <span className="text-xs text-muted-foreground">Previous</span>
                    <span className="mt-1 flex items-center gap-2 font-medium text-foreground">
                      <ArrowLeft className="h-4 w-4" /> {prev.title}
                    </span>
                  </Link>
                ) : <span />}
                {next && (
                  <Link to={`/docs/${next.slug}`} className="rounded-lg border border-border p-4 text-right transition-colors hover:border-primary/40">
                    <span className="text-xs text-muted-foreground">Next</span>
                    <span className="mt-1 flex items-center justify-end gap-2 font-medium text-foreground">
                      {next.title} <ArrowRight className="h-4 w-4" />
                    </span>
                  </Link>
                )}
              </div>
            </div>

            {headings.length > 2 && (
              <aside className="hidden xl:block">
                <div className="sticky top-28 max-h-[calc(100vh-8rem)] overflow-y-auto pb-8">
                  <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">On this page</p>
                  <ul className="space-y-2 text-sm">
                    {headings.map((h) => (
                      <li key={h.id}>
                        <a href={`#${h.id}`} className="text-muted-foreground transition-colors hover:text-primary">
                          {h.text}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </aside>
            )}
          </div>
        </div>
      </section>
    </PageShell>
  );
};

export default DocsArticle;

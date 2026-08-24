import { useParams, Link, Navigate } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { ArrowLeft } from "lucide-react";
import PageShell from "@/components/PageShell";
import { getDocBySlug } from "@/lib/docs";

const DocsArticle = () => {
  const { slug } = useParams<{ slug: string }>();
  const doc = slug ? getDocBySlug(slug) : undefined;

  if (!doc) return <Navigate to="/docs" replace />;

  return (
    <PageShell>
      <section className="relative py-16">
        <div className="container mx-auto max-w-3xl px-6">
          <Link
            to="/docs"
            className="mb-8 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-primary"
          >
            <ArrowLeft className="h-4 w-4" /> All docs
          </Link>
          <article className="prose prose-invert prose-headings:font-heading prose-a:text-primary max-w-none">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{doc.content}</ReactMarkdown>
          </article>
        </div>
      </section>
    </PageShell>
  );
};

export default DocsArticle;

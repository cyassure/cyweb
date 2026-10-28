import PageShell from "@/components/PageShell";
import { DOMAIN_COLORS } from "@/lib/domains";
import DocsIndexSection from "@/components/DocsIndexSection";

const Docs = () => (
  <PageShell accent={DOMAIN_COLORS.endpoint}>
    <DocsIndexSection />
  </PageShell>
);

export default Docs;

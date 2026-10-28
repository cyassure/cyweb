import PageShell from "@/components/PageShell";
import { DOMAIN_COLORS } from "@/lib/domains";
import EditionsComparisonSection from "@/components/EditionsComparisonSection";

const Editions = () => (
  <PageShell accent={DOMAIN_COLORS.grc}>
    <EditionsComparisonSection />
  </PageShell>
);

export default Editions;

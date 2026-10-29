// Shown at every form that collects personal data (DPDP s.5 / Rule 3: the
// notice must accompany or precede the request). The notice pages are static
// files in public/, so these are plain links, not router links.
const PrivacyNote = ({ purpose }: { purpose: string }) => (
  <p className="text-xs text-muted-foreground">
    {purpose} See our{" "}
    <a href="/privacy-notice" className="underline hover:text-foreground">
      Privacy Notice
    </a>{" "}
    (
    <a href="/privacy-notice-hi" lang="hi" className="underline hover:text-foreground">
      हिन्दी
    </a>
    ) for what we keep, for how long, and how to withdraw consent.
  </p>
);

export default PrivacyNote;

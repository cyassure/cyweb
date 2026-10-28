import type { ReactNode } from "react";

interface SectionHeaderProps {
  eyebrow: string;
  title: ReactNode;
  lede?: ReactNode;
  // Domain colour for the eyebrow marker; defaults to the primary blue.
  color?: string;
  // Page-level headers (Docs, Download, …) render an h1.
  as?: "h1" | "h2";
  className?: string;
  children?: ReactNode;
}

// Left-aligned heading block shared by every section and page header.
const SectionHeader = ({ eyebrow, title, lede, color, as: Heading = "h2", className = "", children }: SectionHeaderProps) => (
  <div className={`mb-12 max-w-3xl ${className}`}>
    <p className="mb-4 flex items-center gap-2.5 eyebrow text-muted-foreground">
      <span className="h-2.5 w-2.5 shrink-0" style={{ backgroundColor: color ?? "hsl(var(--primary))" }} />
      {eyebrow}
    </p>
    <Heading className="mb-4 font-heading text-3xl font-semibold leading-[1.1] text-foreground md:text-[2.75rem]">{title}</Heading>
    {lede && <p className="max-w-2xl text-base leading-relaxed text-muted-foreground">{lede}</p>}
    {children}
  </div>
);

export default SectionHeader;

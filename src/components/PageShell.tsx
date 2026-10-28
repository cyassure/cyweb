import { ReactNode, type CSSProperties } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

interface PageShellProps {
  children: ReactNode;
  // Domain colour for this page: tints the header wash and the eyebrow markers.
  accent?: string;
}

const PageShell = ({ children, accent = "#4d9eff" }: PageShellProps) => {
  return (
    <div className="relative min-h-screen bg-background" style={{ "--page-accent": accent } as CSSProperties}>
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-[420px]"
        style={{
          background: `linear-gradient(180deg, color-mix(in srgb, ${accent} 16%, transparent) 0%, transparent 100%)`,
        }}
      />
      <Navbar />
      <main className="relative pt-32">{children}</main>
      <Footer />
    </div>
  );
};

export default PageShell;

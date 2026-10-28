import { ReactNode, useLayoutEffect, type CSSProperties } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

interface PageShellProps {
  children: ReactNode;
  // Domain colour for this page: tints the header wash and the eyebrow markers.
  accent?: string;
}

// Inner pages render on the light theme. The class goes on <html> rather than a
// wrapper so dialogs, selects and toasts (portalled to <body>) pick it up too.
const PageShell = ({ children, accent = "#4d9eff" }: PageShellProps) => {
  useLayoutEffect(() => {
    document.documentElement.classList.add("theme-light");
    return () => document.documentElement.classList.remove("theme-light");
  }, []);

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
      <main className="relative pt-24">{children}</main>
      <Footer />
    </div>
  );
};

export default PageShell;

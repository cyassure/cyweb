import { Shield } from "lucide-react";

const Footer = () => {
  return (
    <footer className="border-t border-border bg-card py-12">
      <div className="container mx-auto px-6">
        <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
          <div className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-primary" />
            <span className="font-heading text-lg font-bold text-foreground">Cycentra</span>
          </div>
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Cycentra. All rights reserved. A SecuPulse initiative.
          </p>
          <a
            href="mailto:sales@cycentra.com"
            className="text-sm text-muted-foreground transition-colors hover:text-primary"
          >
            sales@cycentra.com
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

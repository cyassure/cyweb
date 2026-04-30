import cycenraLogo from "@/assets/cycentra-logo.svg";

const Footer = () => {
  return (
    <footer className="border-t border-border bg-card py-12">
      <div className="container mx-auto px-6">
        <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
          <div className="flex items-center gap-2">
            <img src={cycenraLogo} alt="Cycentra" className="h-10 w-auto" />
          </div>
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Cycentra. All rights reserved.
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

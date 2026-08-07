import cyassureLogo from "@/assets/cyassure-logo.svg";

const Footer = () => {
  return (
    <footer className="border-t border-border bg-card py-12">
      <div className="container mx-auto px-6">
        <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
          <div className="flex items-center gap-2">
            <img src={cyassureLogo} alt="CyAssure" className="h-10 w-auto" />
          </div>
          <div className="flex flex-col items-center gap-1 text-center">
            <p className="text-xs font-medium text-primary uppercase tracking-widest">Global HQ</p>
            <p className="text-sm text-muted-foreground">Einsteinlaan 28, 2289 CC Rijswijk, The Netherlands</p>
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} CyAssure. All rights reserved.
            </p>
          </div>
          <a
            href="mailto:sales@cyassure.eu"
            className="text-sm text-muted-foreground transition-colors hover:text-primary"
          >
            sales@cyassure.eu
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

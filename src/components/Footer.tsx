import { Link } from "react-router-dom";
import cy360Icon from "@/assets/cy360-icon.png";

const footerLinks = [
  { label: "Editions", href: "/editions" },
  { label: "Download", href: "/download" },
  { label: "Docs", href: "/docs" },
  { label: "Support", href: "/support" },
];

const Footer = () => {
  return (
    <footer className="border-t border-border bg-card py-12">
      <div className="container mx-auto px-6">
        <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
          <Link to="/" className="flex items-center gap-2">
            <img src={cy360Icon} alt="" className="h-9 w-9" />
            <span className="font-heading text-lg font-bold text-foreground">
              Cy<span className="text-gradient">360</span>
            </span>
          </Link>

          <div className="flex flex-wrap items-center justify-center gap-5">
            {footerLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className="text-sm text-muted-foreground transition-colors hover:text-primary"
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="flex flex-col items-center gap-1 text-center">
            <p className="text-xs font-medium text-primary uppercase tracking-widest">Global HQ</p>
            <p className="text-sm text-muted-foreground">Einsteinlaan 28, 2289 CC Rijswijk, The Netherlands</p>
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} Cy360 by CyAssure. All rights reserved.
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

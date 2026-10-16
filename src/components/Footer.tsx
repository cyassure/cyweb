import { Link } from "react-router-dom";
import cy360Icon from "@/assets/cy360-icon.png";

// Mirrors the Navbar, plus the contact anchor.
const siteLinks = [
  { label: "Products", href: "/#products" },
  { label: "Platform", href: "/#platform" },
  { label: "Services", href: "/#services" },
  { label: "Editions", href: "/editions" },
  { label: "Download", href: "/download" },
  { label: "Docs", href: "/docs" },
  { label: "Demos", href: "/demos" },
  { label: "Support", href: "/support" },
  { label: "Contact", href: "/#contact" },
];

// Deep links into the ProductsSection tabs (/#products-<domain id>).
const productLinks = [
  { label: "Security Operations & ML", href: "/#products-secops" },
  { label: "Response, Cases & Remediation", href: "/#products-response" },
  { label: "Vulnerability Management", href: "/#products-vuln" },
  { label: "Attack Surface", href: "/#products-asm" },
  { label: "Asset Management", href: "/#products-itam" },
  { label: "Cloud & SaaS Security (CSPM)", href: "/#products-cloud-saas" },
  { label: "Data Security & DSPM", href: "/#products-data" },
  { label: "Endpoint Defence", href: "/#products-endpoint" },
  { label: "AI Security", href: "/#products-ai" },
  { label: "Governance & Compliance", href: "/#products-grc" },
];

type FooterLink = { label: string; href: string };

const FooterLinkItem = ({ link }: { link: FooterLink }) =>
  link.href.startsWith("/#") ? (
    <a href={link.href} className="text-sm text-muted-foreground transition-colors hover:text-primary">
      {link.label}
    </a>
  ) : (
    <Link to={link.href} className="text-sm text-muted-foreground transition-colors hover:text-primary">
      {link.label}
    </Link>
  );

const Footer = () => {
  return (
    <footer className="border-t border-border bg-card py-12">
      <div className="container mx-auto px-6">
        <div className="grid gap-10 md:grid-cols-[1.2fr_1fr_1.6fr]">
          <div className="flex flex-col items-center gap-3 text-center md:items-start md:text-left">
            <Link to="/" className="flex items-center gap-2">
              <img src={cy360Icon} alt="" className="h-9 w-9" />
              <span className="font-heading text-lg font-bold text-foreground">
                Cy<span className="text-gradient">360</span>
              </span>
            </Link>
            <div>
              <p className="text-xs font-medium text-primary uppercase tracking-widest">Netherlands</p>
              <p className="text-sm text-muted-foreground">Einsteinlaan 28, 2289 CC Rijswijk, The Netherlands</p>
            </div>
            <div>
              <p className="text-xs font-medium text-primary uppercase tracking-widest">India</p>
              <p className="text-sm text-muted-foreground">518, Sector 1, Manesar, Gurgaon, India</p>
            </div>
            <a
              href="mailto:sales@cyassure.eu"
              className="text-sm text-muted-foreground transition-colors hover:text-primary"
            >
              sales@cyassure.eu
            </a>
          </div>

          <nav aria-label="Site" className="text-center md:text-left">
            <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-foreground">Site</p>
            <ul className="grid grid-cols-2 gap-x-6 gap-y-2 md:grid-cols-1">
              {siteLinks.map((link) => (
                <li key={link.href}>
                  <FooterLinkItem link={link} />
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Products" className="text-center md:text-left">
            <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-foreground">Products</p>
            <ul className="grid gap-x-6 gap-y-2 sm:grid-cols-2">
              {productLinks.map((link) => (
                <li key={link.href}>
                  <FooterLinkItem link={link} />
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <p className="mt-10 border-t border-border pt-6 text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} Cy360 by CyAssure. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;

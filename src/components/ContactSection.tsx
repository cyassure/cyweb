import { Mail, MapPin, LifeBuoy, Play } from "lucide-react";
import { Link } from "react-router-dom";
import SalesContactDialog from "@/components/SalesContactDialog";
import DemoRequestDialog from "@/components/DemoRequestDialog";
import SectionHeader from "@/components/SectionHeader";
import { DOMAIN_COLORS } from "@/lib/domains";

// Drop a photo of the Rijswijk office building into src/assets/office/ (rijswijk.jpg,
// .png or .webp) and it replaces the drawn building below. Glob, so the build
// doesn't fail while the folder is empty.
const officePhoto = Object.values(
  import.meta.glob<string>("/src/assets/office/rijswijk.{jpg,jpeg,png,webp}", { eager: true, import: "default" })
)[0];

const offices = [
  { country: "Netherlands", address: "Einsteinlaan 28, 2289 CC Rijswijk" },
  { country: "India", address: "518, Sector 1, Manesar, Gurgaon" },
];

// Window colours cycle through the domain palette so the fallback still reads as Cy360.
const windowColors = Object.values(DOMAIN_COLORS);

const BuildingFallback = () => (
  <svg viewBox="0 0 320 240" className="h-full w-full" role="img" aria-label="Illustration of the Rijswijk office building">
    <rect width="320" height="240" fill="hsl(var(--card))" />
    <rect x="0" y="214" width="320" height="26" fill="hsl(var(--secondary))" />
    <rect x="96" y="22" width="128" height="192" fill="hsl(var(--secondary))" stroke="hsl(var(--border))" />
    {Array.from({ length: 12 }).map((_, floor) =>
      Array.from({ length: 6 }).map((__, col) => {
        // Cheap integer hash so the lit windows look scattered rather than diagonal.
        const h = ((floor + 1) * 2654435761 + (col + 1) * 40503) >>> 0;
        const lit = h % 7 < 2;
        return (
          <rect
            key={`${floor}-${col}`}
            x={104 + col * 19.5}
            y={30 + floor * 14}
            width="14"
            height="9"
            fill={lit ? windowColors[h % windowColors.length] : "hsl(var(--muted))"}
            opacity={lit ? 0.9 : 1}
          />
        );
      })
    )}
    <rect x="146" y="198" width="28" height="16" fill="hsl(var(--background))" />
  </svg>
);

const ContactSection = () => {
  return (
    <section id="contact" className="relative py-24">
      <div className="container relative mx-auto px-6">
        <div className="grid items-start gap-12 lg:grid-cols-[minmax(0,6fr)_minmax(0,5fr)]">
          <div>
            <SectionHeader
              eyebrow="Contact Us"
              title="Your security operations start here."
              lede="Talk to a real expert. No sales scripts, no obligation. We'll help you work out what you need and how to get there fast."
              className="mb-10"
            />

            <div className="mb-10 grid gap-6 sm:grid-cols-3">
              {offices.map((o) => (
                <div key={o.country} className="flex flex-col gap-1 text-sm">
                  <span className="flex items-center gap-2 font-medium text-foreground">
                    <MapPin className="h-4 w-4 text-primary" />
                    {o.country}
                  </span>
                  <span className="text-xs text-muted-foreground">{o.address}</span>
                </div>
              ))}
              <a
                href="mailto:sales@cyassure.eu"
                className="flex items-center gap-2 self-start text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                <Mail className="h-4 w-4 text-primary" />
                sales@cyassure.eu
              </a>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <SalesContactDialog />
              <DemoRequestDialog
                trigger={
                  <button
                    type="button"
                    className="flex items-center gap-2 rounded-md px-7 py-3.5 text-sm font-semibold text-foreground shadow-[inset_0_0_0_1px_hsl(var(--input))] transition-all hover:bg-secondary"
                  >
                    <Play className="h-4 w-4" />
                    Request a Demo
                  </button>
                }
              />
              <Link
                to="/support"
                className="flex items-center gap-2 rounded-md px-7 py-3.5 text-sm font-semibold text-foreground shadow-[inset_0_0_0_1px_hsl(var(--input))] transition-all hover:bg-secondary"
              >
                <LifeBuoy className="h-4 w-4" />
                Get Support
              </Link>
            </div>
          </div>

          <figure>
            {officePhoto ? (
              <img
                src={officePhoto}
                alt="CyAssure's Netherlands office building at Einsteinlaan 28, Rijswijk"
                className="w-full rounded-lg border border-border"
                loading="lazy"
              />
            ) : (
              <div className="aspect-[4/3] max-w-full overflow-hidden rounded-lg border border-border">
                <BuildingFallback />
              </div>
            )}
            <figcaption className="mt-3 flex flex-wrap justify-between gap-2 font-mono text-xs text-muted-foreground">
              <span>Einsteinlaan 28, Rijswijk · near The Hague</span>
              {officePhoto && <span className="text-muted-foreground/70">Photo: Coworker.com</span>}
            </figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;

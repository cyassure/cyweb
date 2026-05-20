import { motion } from "framer-motion";
import { Mail, MapPin, ArrowRight } from "lucide-react";

const ContactSection = () => {
  return (
    <section id="contact" className="relative py-24">
      <div className="absolute inset-0 grid-pattern opacity-20" />
      <div className="container relative mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mx-auto max-w-3xl text-center"
        >
          <p className="mb-3 text-xs font-medium uppercase tracking-[0.2em] text-primary">Contact Us</p>
          <h2 className="mb-4 font-heading text-3xl font-bold text-foreground md:text-5xl">
            Your security operations start here.
          </h2>
          <p className="mb-10 text-muted-foreground">
            Talk to a real expert — no sales scripts, no obligation. We'll help you assess what you need and how to get there fast.
          </p>

          <div className="mb-10 flex flex-wrap justify-center gap-6">
            <div className="flex flex-col items-center gap-1 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-primary" />
                <span className="font-medium text-foreground">Global HQ</span>
              </div>
              <span className="text-xs text-muted-foreground">Einsteinlaan 28, 2289 CC Rijswijk</span>
              <span className="text-xs text-muted-foreground">The Netherlands</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <MapPin className="h-4 w-4 text-primary" />
              Worldwide
            </div>
            <a
              href="mailto:sales@cycentra.com"
              className="flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-primary"
            >
              <Mail className="h-4 w-4 text-primary" />
              sales@cycentra.com
            </a>
          </div>

          <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <a
              href="/book-consultation.html"
              className="group flex items-center gap-2 rounded-lg bg-primary px-7 py-3.5 font-heading text-sm font-semibold text-primary-foreground transition-all hover:brightness-110"
            >
              Book a Consultation
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>
            <a
              href="/request-pricing.html"
              className="rounded-lg border border-border bg-secondary/50 px-7 py-3.5 font-heading text-sm font-semibold text-foreground transition-all hover:border-primary/50"
            >
              Request Pricing
            </a>
            <a
              href="/run-pilot.html"
              className="text-sm text-muted-foreground underline decoration-primary/40 underline-offset-4 transition-colors hover:text-primary"
            >
              Run a Pilot →
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactSection;

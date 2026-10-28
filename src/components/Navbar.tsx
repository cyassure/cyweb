import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Link } from "react-router-dom";
import cyassureMark from "@/assets/brand/cyassure-mark.png";
import cyassureWordmark from "@/assets/brand/cyassure-wordmark.png";

const navLinks = [
  { label: "Products", href: "/#products" },
  { label: "Services", href: "/#services" },
  { label: "Editions", href: "/editions" },
  { label: "Download", href: "/download" },
  { label: "Docs", href: "/docs" },
  { label: "Demos", href: "/demos" },
  { label: "Support", href: "/support" },
  { label: "About Us", href: "/about" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-xl">
      {/* Announcement strip; adds ~36px to the header height (offsets use pt-32 / top-36). */}
      <div className="bg-[#07122a] text-white">
        <div className="container mx-auto flex h-9 items-center justify-center gap-2 px-6 text-center text-xs sm:text-[13px]">
          <span className="eyebrow rounded-sm bg-white/15 px-1.5 py-0.5 text-[10px]">New</span>
          <span className="truncate">Free Attack Surface and DLP scans for your organisation.</span>
          <a href="/#free-scan" className="shrink-0 font-semibold text-[#8fb0ff] underline-offset-4 hover:underline">
            Get started →
          </a>
        </div>
      </div>
      <div className="container mx-auto flex items-center justify-between px-6 py-4">
        <Link to="/" className="flex items-center gap-2" aria-label="CyAssure home">
          <img src={cyassureMark} alt="" className="h-9 w-auto" />
          <img src={cyassureWordmark} alt="CyAssure" className="h-[18px] w-auto" />
        </Link>

        <div className="hidden items-center gap-7 md:flex">
          {navLinks.map((link) =>
            link.href.startsWith("/#") ? (
              <a
                key={link.href}
                href={link.href}
                className="text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                {link.label}
              </a>
            ) : (
              <Link
                key={link.href}
                to={link.href}
                className="text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                {link.label}
              </Link>
            )
          )}
          <a
            href="/#contact"
            className="rounded-md bg-primary px-5 py-2 text-sm font-semibold text-primary-foreground transition-all hover:brightness-110"
          >
            Talk to an Expert
          </a>
        </div>

        <button
          onClick={() => setOpen(!open)}
          className="text-foreground md:hidden"
          aria-label="Toggle menu"
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>
      <div className="spectrum-rule opacity-80" />

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="border-t border-border/50 bg-background md:hidden"
          >
            <div className="flex flex-col gap-4 px-6 py-6">
              {navLinks.map((link) =>
                link.href.startsWith("/#") ? (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {link.label}
                  </a>
                ) : (
                  <Link
                    key={link.href}
                    to={link.href}
                    onClick={() => setOpen(false)}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {link.label}
                  </Link>
                )
              )}
              <a
                href="/#contact"
                onClick={() => setOpen(false)}
                className="mt-2 rounded-lg bg-primary px-5 py-2 text-center text-sm font-medium text-primary-foreground"
              >
                Talk to an Expert
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;

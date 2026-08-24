import { Rocket, Server, HelpCircle, LucideIcon } from "lucide-react";

// Raw-imported at build time via Vite's `?raw` — no runtime fetch, no cross-repo
// build dependency. Content is a hand-curated, customer-safe allowlist copied in
// from the Cy360 product repo's docs — see src/content/docs/ for the source files.
import quickStart from "@/content/docs/quick-start.md?raw";
import dockerDeployment from "@/content/docs/docker-deployment.md?raw";
import faq from "@/content/docs/faq.md?raw";

export interface DocEntry {
  slug: string;
  title: string;
  description: string;
  icon: LucideIcon;
  content: string;
}

export const docs: DocEntry[] = [
  {
    slug: "quick-start",
    title: "Quick Start",
    description: "The three-step version — pick a version, run one command, log in.",
    icon: Rocket,
    content: quickStart,
  },
  {
    slug: "docker-deployment",
    title: "Deployment Guide",
    description: "Full technical reference — sizing, environment variables, backups, troubleshooting.",
    icon: Server,
    content: dockerDeployment,
  },
  {
    slug: "faq",
    title: "FAQ",
    description: "Common questions about editions, licensing, data, and support.",
    icon: HelpCircle,
    content: faq,
  },
];

export function getDocBySlug(slug: string): DocEntry | undefined {
  return docs.find((d) => d.slug === slug);
}

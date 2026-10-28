// Accent colour per security domain — the same colours the Cy360 portal sidebar
// uses, so the site and the product read as one brand. Keys match the
// ProductsSection tab ids (/#products-<id>).
export const DOMAIN_COLORS = {
  secops: "#ff3b3b",
  response: "#b06eff",
  vuln: "#ff5c8a",
  asm: "#ff8c00",
  itam: "#f5c518",
  "cloud-saas": "#38bdf8",
  data: "#2dd4bf",
  endpoint: "#4d9eff",
  ai: "#b06eff",
  grc: "#00c8a0",
} as const;

export type DomainId = keyof typeof DOMAIN_COLORS;

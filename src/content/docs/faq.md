# Frequently Asked Questions

**Is Community edition really free?**
Yes — free forever, no time limit, no credit card. It covers the full core SOC stack (SIEM, attack-surface monitoring, case management, dashboard) for 1 admin/analyst user and 15 monitored endpoints.

**Do I need to talk to sales to get started?**
No. Community edition installs from a public command with no license key. Enterprise (more users, more endpoints, CyMind AI, threat-intel integration) needs a license file — see [Support](/support) to talk to us about that.

**Where does my data go?**
Nowhere but your own infrastructure. Cy360 is self-hosted — logs, alerts, and AI processing all stay on servers you control. There is no CyAssure-hosted copy of your data in either edition.

**Can I upgrade from Community to Enterprise later without reinstalling?**
Yes. Enterprise is the same software unlocked by a `.lic` file — drop it in, and higher limits and additional integrations apply immediately, no restart or reinstall required.

**What if I pick the wrong version?**
The installer supports pinning any released version, and upgrading later is a single `docker compose pull && docker compose up -d` — your data and configuration are untouched.

**Is the install script safe to run?**
It's published in a public, auditable GitHub repository — read it before you run it, the same way you would for any other one-line installer (Docker, Homebrew, and most infrastructure tools work the same way).

**Something isn't working — where do I go?**
Check the [Deployment Guide](/docs/docker-deployment)'s troubleshooting notes first, then reach out via [Support](/support).

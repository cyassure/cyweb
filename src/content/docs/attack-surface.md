# Attack Surface

**Attack Surface** (external attack-surface management, or EASM) shows what an attacker on the internet can see of your organisation: domains, subdomains, servers, open ports and services, certificates, e-mail security, leaked code and credentials, and lookalike domains. It follows the **CTEM** cycle — scope, discover, inventory, prioritise, monitor and validate.

Attack Surface is an Enterprise add-on module. Its pages are **Overview**, **Discovery**, **Inventory**, **Exposures**, **Digital Risk**, **Changes** and **Scans**.

## Before you start: scope and domain verification

Each tenant sets **its own exposure domain** and scan schedule in **Settings → Exposure Monitoring** (or in the first-login Setup Wizard). There you also prove you own the domain:

1. Add the domain, then choose **one** proof: **A) a DNS TXT record** (recommended) or **B) a file on your website**.
2. An administrator clicks **Verify**. DNS can take up to an hour to propagate. Verifying `example.com` covers every subdomain. Proofs are re-checked every 30 days, so leave the record in place.

**Why verification matters.** Unverified domains are still scanned, but only in a passive-safe mode: DNS & WHOIS, subdomain discovery, TLS certificate audit, e-mail security (SPF/DKIM/DMARC), OSINT and threat intelligence, dark-web and breach monitoring, and supply-chain JavaScript risk. Verification unlocks active checks — port and service probing, web path and header probing, cloud bucket checks, mobile app and API probing, Nuclei/OpenVAS, deep TLS tests, exposed MCP servers and DNS zone-transfer tests. To scan a domain you do not own you need the owner's written permission; an admin can record an authorised override (audit-logged, valid for one year).

Changing a tenant's exposure domain resets the asset baseline: every previously tracked host is flagged *dropped*.

## Overview

![Attack Surface → Overview](/docs-img/asm-overview.jpg)

The section's one dashboard for the monitored domain and the latest scan:

- **Tiles** — assets, open issues, findings across all modules, exposed web paths, new subdomains since the last scan, and CISA KEV (actively exploited) findings.
- **Posture score** — 0–100 with a grade. **Why 75?** explains the score; **Scan details** opens the scan.
- **Posture score · 90 days** — the trend across scans.
- **Findings by severity**, **Top exposures — fix first**, and **Changes · last 14 days** (assets, ports and services, certificates and technology).

## Discovery

![Attack Surface → Discovery](/docs-img/asm-discovery.jpg)

**What it is.** Finds assets you own but don't know about, starting from **seeds**: your domains, IP ranges, ASNs and organisation name. Discovery never scans — it only finds candidates.

**How to use it.**

1. Add a seed (admin): choose its type, enter the value, choose how often it re-runs (for example weekly) and click **+ Add seed**. Each seed can be enabled, disabled or deleted.

   | Seed type | Example | Finds |
   |---|---|---|
   | Domain | `example.com` | Subdomains, certificate SANs, resolved IPs |
   | CIDR | `203.0.113.0/24` | Hosts in your public ranges (up to /16 for IPv4, /48 for IPv6) |
   | ASN | `AS64500` | Prefixes announced by your autonomous system |
   | Organisation | `Acme Corp` | Certificates issued to your organisation's legal name |

   Each candidate shows *why* it was linked to you — for example "shares a certificate", "inside seed range", "announced by seed ASN" or "certificate organisation match".
2. Click **Run discovery**. The last-run banner shows how many new candidates were found, updated, already in inventory or already decided.
3. Work the **Review queue**: filter by status (Pending…), kind and confidence, then confirm or reject each candidate. Confirmed hosts join the Inventory and are scanned from then on.

**Why it matters.** Forgotten servers and shadow-IT subdomains are where breaches start — you can't protect what you don't know you own.

## Inventory

![Attack Surface → Inventory](/docs-img/asm-inventory.jpg)

**What it is.** Every external asset from all scans and discovery runs, with an **asset geo-location map**.

**Asset states (baseline).** Each host has a state: **New** (seen for the first time), **Baseline** (known and expected), **Under review**, **Ignored** and **Dropped** (was in the baseline and is no longer observed — investigate). A banner highlights dropped baseline assets; **SHOW ONLY** filters to them.

**How to use it.** Filter by state, classification, coverage, source, confidence and root domain, or search host, domain or IP. Open a host to see its ports, technologies, certificates and findings, and to change its state. Confirming a host that the scan treats as third-party (for example a SaaS platform) gives it full active checks. **Import Scan** loads a scan result file.

## Exposures

![Attack Surface → Exposures](/docs-img/asm-exposures.jpg)

Two tabs:

- **Fix order** — attack-surface findings from Vulnerability Management, highest priority first (known-exploited, EPSS, verified, severity, internet exposure). Status, owner and SLA changes here are the same findings as in Vulnerability Management. Filter, **Export CSV**, **Change status**, **Assign owner**; open a finding for **Verify fix** (re-test just that finding) and **Create ticket** (Jira, ServiceNow or webhook — set up in Settings → Exposure Ticketing).
- **Score drivers** — why the posture score is what it is, factor by factor.

## Digital Risk

![Attack Surface → Digital Risk](/docs-img/asm-digital-risk.jpg)

Brand impersonation, leaked code, breaches and exposed people for the monitored domain:

- **Lookalike domains** — registered permutations of your domain (and whether they can receive mail — a phishing signal).
- **Public code references** — where your domain appears in public code repositories. Only locations are stored, never file contents; review each hit for credentials or internal host names.
- **Breaches & dark web** — breach and dark-web mentions.
- **Exposed people** — publicly exposed staff e-mail addresses, with a social-engineering risk rating.
- **Threat-intelligence mentions** — matches in MISP, Shodan and other feeds.

Dark-web monitoring, Shodan exposure, IP reputation and code-leak search need CyTIM (threat intelligence) connected.

## Changes

![Attack Surface → Changes](/docs-img/asm-changes.jpg)

The change log of your external surface: what appeared, disappeared or changed (new hosts, ports, services, certificates, technologies) in the last 24 hours, 7 days or 30 days. Click an event for that asset's full history.

**Why it matters.** A new open port or an expired certificate is often the first sign of a misconfiguration or an unauthorised change.

## Scans

![Attack Surface → Scans](/docs-img/asm-scans.jpg)

**What it is.** Configure, launch and schedule scans.

**Scan modes.**

| Mode | What it does |
|---|---|
| **Passive** (balanced, ~75 s) | Full surface coverage across all scan modules plus Nuclei templates, no AI. |
| **Standard** (AI-enhanced, ~90 s) | The same network footprint plus AI root-cause analysis and step-by-step remediation. Needs AI configured. |
| **Deep** (full suite, minutes+) | Standard plus a real OpenVAS/GVM vulnerability assessment. Heavier; needs the optional OpenVAS stack; IoT-looking targets are skipped automatically to avoid destabilising fragile devices. |

**How to launch a scan.**

1. The **Last scan coverage** panel shows hosts discovered, live, scanned, active and passive-only, and the host cap.
2. Pick the scan mode, set the **Target** (your domain or an IP address), tick **Include Subdomain Enumeration** if wanted, and launch.
3. Follow progress on the ring and the **Scan modules** checklist (DNS reconnaissance, subdomain enumeration, web analysis, crypto & SSL audit, e-mail security, WHOIS, OSINT, cloud infrastructure, dark-web monitoring, supply-chain analysis, AI risk enrichment…).

**Keeping it running.** **CTEM Continuous Sync** sets a refresh interval (minimum one hour) for recurring scans; the tenant's scheduled scan is set in Settings → Exposure Monitoring. All scheduled jobs are listed in Settings → Scheduler. The **PDF reports** list keeps the latest executive and technical reports, which are produced automatically with every scan.

**Incidents.** Urgent findings raise exposure incidents automatically (a CVE on CISA KEV, EPSS ≥ 10 %, or a critical the scan actually verified). An incident resolves itself after two consecutive scans with the same coverage no longer report the finding.

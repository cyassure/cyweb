# Data Security

The **Data Security** section protects sensitive data in two complementary ways:

- **Data Protection (DLP)** — data *in motion and in use*: sensitive data leaving through endpoints, web uploads, AI tools and Microsoft 365. Part of the base Endpoint Defence module, available on every edition.
- **Data Security Posture Management (DSPM)** — data *at rest*: where sensitive data lives across your clouds, SaaS drives and databases, who can reach it and whether it is exposed. A separately licensed add-on; without it the section shows only Data Protection.

Both use the **same detectors**, so a credit-card number or a national ID is recognised the same way wherever it appears. Neither stores the sensitive values themselves — only which detector matched, how many times, how confidently and where.

## Data Protection (DLP)

![Data Security → Data Protection](/docs-img/data-protection.jpg)

**Channels covered.** CyEDR endpoints (USB and removable media, cloud-sync folders such as OneDrive/Dropbox/Google Drive/Box/iCloud, and folders you choose), the TLS gateway (uploads to ordinary websites), the AI Security Gateway (prompts and tool output) and Microsoft Purview / Office 365.

**Why it matters.** Regulations such as GDPR, PCI DSS and India's DPDP Act require you to know when personal or payment data leaves the organisation. DLP turns that into events you can investigate.

The page has six tabs.

### Overview

Choose 7, 30 or 90 days. Tiles count DLP events across all sources, endpoint events, gateway events (AI prompts and web uploads), Microsoft events and encrypted containers that left unchecked. Below: events per day, by source, by endpoint channel, top users and hosts, **what was found** per detector with its **precision** (the share of reviewed incidents analysts confirmed versus marked false positive), recent events, and whether OCR is available on the server.

### Detection Packs

Sets of detectors. Built in:

- **Global** — payment cards (with the Luhn check), IBAN, US SSN, contact lists;
- **Secrets & keys** — API keys, tokens, private keys;
- **India (DPDP Act)** — Aadhaar (with its checksum), PAN, GSTIN, IFSC, bank account, UPI IDs, passport, voter ID, mobile numbers.

Install more from the Marketplace (Europe/GDPR national IDs, Gulf IDs, cloud and SaaS secrets). Air-gapped installs can upload a signed `.dlppack` file instead. A pack is data, never executed as code. Disable or remove a pack here. After any change, every Data Protection policy is re-sent to endpoints; switch the new detectors on in the policy.

### Exact Data Match (Enterprise)

Upload a CSV export (for example customers or employees) and choose the columns. Only salted hashes are kept and sent to endpoints, never the values. Cy360 alerts when a file holds a minimum number of values (default 3) or two values from the same record. Treat the upload as sensitive anyway: short values such as phone numbers can be guessed from hashes.

### Fingerprints (Enterprise)

Fingerprint a confidential document — a contract template, a board pack. Copies and edited versions are recognised when a given share of it (default 30 %) appears in a file.

### Patterns

Test your own regular expressions, or describe the data and let AI draft one (Enterprise with AI). Patterns must avoid look-ahead/look-behind and back-references, because the same pattern runs on endpoints and the server. Add them to a policy under Endpoint Defence → Policies → Data Protection.

### Settings (admin, Enterprise)

Whether cloud AI providers may be used for AI document classification (off = only a local model on this server), and whether to share anonymous detector-quality statistics with CyAssure (confirmed vs false-positive counts per detector only — no content, file names, users or hosts).

### Turning DLP on for endpoints

Endpoint DLP is configured in an Endpoint Defence policy's **Data Protection (DLP)** section (off by default): which folders and channels to watch, which detectors to look for, the minimum confidence, whether to report encrypted containers and sensitivity labels, and Enterprise options (Exact Data Match, fingerprints, OCR of images and scanned PDFs, AI document classification). It is **monitor-only** — to stop copies to USB, use Device Control. See [Endpoint Defence](/docs/endpoint-defence#policies).

DLP events are triaged as incidents (category **dlp**) in Security Operations → Incidents.

## DSPM — Data Security Posture Management

With the DSPM add-on, the Data Security section adds seven pages.

### Overview

Scan status (state, last run, any per-source errors) with **Scan now**; tiles for data stores, critical and high stores, public-and-sensitive stores, estimated sensitive records ("estimated from sample") and stores not yet classified; charts by sensitivity, data category and provider; and the top-risk data stores.

### Data Catalog

![Data Security → Data Catalog](/docs-img/dspm-catalog.jpg)

Every discovered data store with provider, type, **sensitivity tier** (critical / high / medium / low / none / *unknown* = never content-scanned), data categories (PII, PCI, financial, PHI, secrets, confidential), estimated records, flags (public, encrypted, customer-managed key, logging) and risk score. Filter by provider, type, tier, category, public/private and validation state.

Open a store for detections per detector, the sensitive files or columns (paths and counts only) and its **Access**. **Stewardship** (analysts and admins): record the accountable owner, business system and notes; **Validate** or **Dispute** the scan result; on each detection choose **Confirmed** or **False positive** (a false positive stops counting toward the store's tier and risk, and survives re-scans). Per store, content scanning can follow the tenant setting, always run or never run.

### Findings

Derived issues with severity, evidence, remediation and compliance controls: public sensitive store, sensitive data shared externally, unencrypted sensitive store, no customer-managed key, no access logging, secrets in storage, and public stores never content-scanned. The **Controls** view maps each to GDPR, PCI DSS v4.0, ISO 27001:2022, NIS2, DPDP and DORA, and the same evidence feeds GRC assessments automatically. Critical and high findings raise exposure incidents.

### Access

"Who can read *category*?" — every principal (users, groups, roles, service accounts, anyone/public, external domains) with read, write or admin rights on sensitive stores, from cloud IAM, bucket policies and SaaS sharing. Access findings flag anyone-can-read, external, cross-account, wildcard policies, stale principals (unused 90+ days) and write access on sensitive stores.

### Hygiene

Duplicate sensitive datasets (the same values in several stores, matched by salted fingerprints) and stale sensitive data (not modified for 365+ days by default) — candidates for deletion that reduce your risk.

### Remediation

One-click fixes that need **two admins** — one requests, a different one approves, approval executes. Off until enabled in Settings. Actions: block S3 public access, remove public access from a GCS bucket, make an Azure container private (all reversible with **Rollback**), and remove public/anyone links from SaaS files (not reversible).

### Settings (admin)

![Data Security → Settings](/docs-img/dspm-settings.jpg)

- **General** — **content scanning** (off by default: with it off, DSPM only discovers stores and their configuration; turning it on asks for explicit consent to read samples), scan mode (*Hosted* — Cy360 reads via provider APIs and discards content from memory — or *In-environment scanner*), scan interval (default 24 hours), sampling budgets (objects per store, bytes per object, rows per column), minimum detection confidence, allow remediation, stale-access days, internal domains and stale-data (ROT) days.
- **Connections** — the sources. Cloud storage reuses the accounts from Marketplace → Cloud Asset Inventory; SaaS drives reuse Shared Files settings; databases (PostgreSQL, MySQL/MariaDB, SQL Server, Snowflake, BigQuery) are added from Marketplace → Data Security with a read-only user.
- **Scanners** — register an **in-environment scanner** for databases on private networks. The token is shown once. Run the published `cy360-dspm-scanner` container on a host that can reach the database; it needs outbound HTTPS to Cy360 only, keeps the database credentials locally and sends back only detector IDs, counts and salted hashes.

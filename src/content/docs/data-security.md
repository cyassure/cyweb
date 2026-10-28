# Data Security

The **Data Security** section protects sensitive data in two complementary ways:

- **DLP** — data *in motion and in use*: sensitive data leaving through endpoints, email, web uploads, AI tools and Microsoft 365 / Google Workspace. Part of the base Endpoint Defence module, available on every edition.
- **Data Security Posture Management (DSPM)** — data *at rest*: where sensitive data lives across your clouds, SaaS drives and databases, who can reach it, who actually uses it and whether it is exposed. A separately licensed add-on.

Both use the **same detectors and the same classification**, so a credit-card number, a national ID or a tender document is recognised the same way wherever it appears. Neither stores the sensitive values themselves — only which detector matched, how many times, how confidently and where.

The sidebar groups the section like this (an entry your licence or role doesn't cover is hidden):

| Entry | What it is | Licence |
|---|---|---|
| **Overview** | The DLP dashboard and the DSPM overview on one page | each half with its own licence |
| **Classification** | The detectors, document types and levels every channel shares (below) | every edition |
| **Data Access & Exposure** | Who can reach the data: **Store access** (DSPM) and **Shared files** — files in Microsoft 365, Google Workspace, Box and Dropbox shared publicly, externally or to personal accounts | DSPM / Cloud & SaaS Security |
| **AI Data Protection** | Sensitive data sent to AI tools (opens AI Security → Threat Activity → DLP Events) | AI Security |
| **DSPM ▸** Data Catalog, Findings, Data Activity, Hygiene, Remediation | Data at rest ([below](#dspm-data-security-posture-management)) | DSPM |
| **DLP ▸** Policies, Activity, Email DLP | Data in motion | every edition |

DSPM's settings are under **Settings → Data Security**; cloud, SaaS and database accounts are listed in **Settings → Connected Accounts**.

## Classification (DLP)

![Data Security → Classification](/docs-img/data-protection.jpg)

**Channels covered.** CyEDR endpoints (USB and removable media, cloud-sync folders such as OneDrive/Dropbox/Google Drive/Box/iCloud, folders you choose, the clipboard and — on Linux and macOS — print jobs), email (the Cy360 mail relay and mailbox scanning for Microsoft 365 and Google Workspace — see [Email DLP](#email-dlp)), the TLS gateway (uploads to ordinary websites **and to AI sites** such as ChatGPT, Gemini or Claude, scanned with your full detector set — monitor by default, block by policy), the AI Security Gateway (prompts and tool output) and Microsoft Purview / Office 365.

**Why it matters.** Regulations such as GDPR, PCI DSS, HIPAA and India's DPDP Act require you to know when personal or payment data leaves the organisation. DLP turns that into events you can investigate — and, where you choose, stops the data leaving.

**What it looks inside.** Text, Word/Excel/PowerPoint (new and old formats, including comments and notes), PDF, RTF, OpenDocument, Outlook `.msg` and `.eml` mail with attachments, and ZIP/TAR/GZIP/7z archives, recognised by content rather than file name. Images and scanned PDFs (screenshots, photos of ID cards) are read with **OCR** on your Cy360 server (Enterprise). **Password-protected** ZIP (including AES), 7z, Word/Excel/PowerPoint and PDF files are opened with a password found in the same email, a follow-up email, or your organisation's sharing passwords — see [Password-protected files](#password-protected-files). Files protected by Microsoft Purview / RMS are reported as rights-managed and are not opened.

The page has nine tabs.

### Overview

Choose 7, 30 or 90 days. Tiles count DLP events across all sources, endpoint events, gateway events (AI prompts and web uploads), Microsoft events and encrypted containers that left unchecked. Below: events per day, by source, by endpoint channel, top users and hosts, **what was found** per detector with its **precision** (the share of reviewed events analysts confirmed versus marked false positive), recent events, and whether OCR is available on the server.

### Detection Packs

Sets of detectors — 94 in total across the built-in and Marketplace packs, each tested against its own test cases, with checksums verified wherever the identifier has one. Built in:

- **Global** — payment cards including RuPay, UnionPay and Maestro (with the Luhn check), card security codes, IBAN, SWIFT/BIC, US SSN, contact lists;
- **Secrets & keys** — API keys, tokens, private keys;
- **India (DPDP Act)** — Aadhaar (with its checksum), PAN, GSTIN, IFSC, bank account, UPI IDs, passport, voter ID, driving licence, ABHA health ID, mobile numbers.

Install more from the Marketplace:

| Pack | Covers |
|---|---|
| Europe / GDPR | National IDs and tax numbers of 17 EU countries and the UK with their checksums, EU VAT, passports, UK driving licences and sort codes |
| United States | ITIN, ABA routing numbers, bank accounts, passports, driver's licences, EIN |
| Canada | SIN, OHIP / RAMQ / BC health cards, passports, bank transit numbers, driver's licences |
| Australia | TFN, Medicare, ABN, ACN, passports, driver's licences, BSB |
| Gulf | Emirates ID, Saudi ID / Iqama, Qatar ID, Kuwait Civil ID, Bahrain CPR, Oman civil number |
| Middle East | Turkey TC Kimlik, Israel Teudat Zehut, Egypt national ID, Jordan national number |
| Health records | ICD-10 codes, NPI, DEA, Medicare MBI, medical record numbers |
| Cloud & SaaS secrets | GitHub, GitLab, npm, PyPI, Shopify and Twilio tokens, Entra client secrets, PGP keys, passwords written in text |

Air-gapped installs can upload a signed `.dlppack` file instead; the CyAssure signature is checked. A pack is data, never executed as code. Disable or remove a pack here. After any change, every Data Protection policy is re-sent to endpoints; switch the new detectors on in the policy.

### Regulations

One-click templates: GDPR, UK GDPR, PCI DSS, HIPAA, GLBA, CCPA/CPRA, PIPEDA, PHIPA, Australian Privacy Act, DPDP Act, UAE PDPL, Saudi PDPL, Gulf (Qatar / Kuwait / Bahrain / Oman), KVKK, Israel / Egypt / Jordan, and Credentials & secrets.

Each template creates two Email DLP policies — one for **low volume** (a few values in a message) and one for **high volume** (many). Choose the mode:

- **Monitor** — record only;
- **Enforce** — encrypt messages with a few values, hold messages with many for review;
- **Strict** — hold a few, block many.

Applying a template again updates the same two policies. A card shows which packs the regulation needs and are missing, with an **Install** button; detectors from a missing pack are left out until it is installed. For endpoints, use **Add a regulation's detectors** in Endpoint Defence → Policies → Data Protection.

### Accuracy

How accurate is each detector? For every detector you have, the page shows the benchmark's **precision** (how often a match is real) and **recall** (how often real data is found), measured against:

- the detector's own test cases;
- copies of them with the digits changed — a number its checksum rejects must not be reported;
- hundreds of look-alikes that commonly trip DLP tools: phone numbers, dates, IDs, hashes, IP addresses, prices, order, tracking and part numbers.

Next to it, **In production** shows what your analysts decided on real DLP events (Confirmed vs False positive in [DLP Activity](#dlp-activity)). Tick **Only below 97 %** to find the detectors worth tuning. To score your own sample files — for example in an evaluation against another DLP product — run `python -m cy360_sdk.dlp.benchmark --folder <dir>` with a `labels.csv` (`file,detector,count`).

### Exact Data Match (Enterprise)

Upload a CSV export (for example customers or employees) and choose the columns. Only salted hashes are kept and sent to endpoints, never the values. Cy360 alerts when a file holds a minimum number of values (default 3) or two values from the same record. Treat the upload as sensitive anyway: short values such as phone numbers can be guessed from hashes.

### Fingerprints (Enterprise)

Fingerprint a confidential document — a contract template, a board pack. Copies and edited versions are recognised when a given share of it (default 30 %) appears in a file.

### Patterns

Test your own regular expressions, or describe the data and let AI draft one (Enterprise with AI). Patterns must avoid look-ahead/look-behind and back-references, because the same pattern runs on endpoints and the server. Add them to a policy under Endpoint Defence → Policies → Data Protection.

### Classification

Every DLP event is **Public**, **General** (Internal), **Confidential** or **Highly Confidential** — Microsoft Purview Information Protection's default label names, so MIP sensitivity labels map one to one.

The level is the higher of what the content holds and the sensitivity label on the file:

| Level | Given when |
|---|---|
| Highly Confidential | Secrets or keys, Exact Data Match records, a fingerprinted document, a highly sensitive document type, or the bulk threshold (default 10) of identifiers in one item |
| Confidential | Identifiers backed by a checksum or a keyword, contact lists, your own patterns, a confidential document type |
| General | Pattern-only matches |
| Public | Only from an explicit label — finding nothing never makes an item Public |

Content can raise an item above its label (shown as a **label mismatch**) but never lower it. Admins set the bulk threshold and add their own label names; sub-labels such as `Confidential\Finance` use the parent.

**Document types.** Some files are sensitive because of *what they are*, not because they hold an ID number. Each document type raises an item to at least its level:

- **Highly Confidential** — payroll and HR records, identity / KYC documents, medical records, customer data exports, credentials files, board / M&A / strategy papers, source code containing secrets;
- **Confidential** — contracts, financial and bank statements, **tenders and RFPs**, **price lists and quotations**, **internal research**, source code, CVs, engineering designs;
- **General** — invoices, technical documents; **Public** — marketing material.

Source code, tenders/RFPs, price lists and internal research are recognised on your Cy360 server without AI (by their headings and wording); the Marketplace pack **Confidentiality markings** also recognises "Confidential", "Internal only", "Commercial in confidence" and similar markings in many languages. On endpoints, office documents with no detector hit can also be typed (policy option, on for new policies, up to 20 per hour per endpoint) and are reported only if their type is sensitive. The other types use **AI document classification** (Enterprise), through the AI providers you have already configured: turn it on for endpoints in the Data Protection policy, and for email under Email DLP → Settings (up to three attachments per message). Only text with every detected value masked is sent, and only to a local model unless Classification → Settings allows cloud providers. Add **your own document types** (Enterprise, up to 20): a name, a plain-language description and the level — for example *"Deal memo — internal memos about pending acquisitions, with code names and valuations"*, at least Highly Confidential. Email DLP policies can match document types on their own.

### Settings (admin, Enterprise)

- Whether cloud AI providers may be used for AI document classification (off = only a local model on this server).
- **Passwords for protected files** — your organisation's sharing passwords, stored encrypted and never shown again or logged; see below.
- Whether to share anonymous detector-quality statistics with CyAssure (confirmed vs false-positive counts per detector only — no content, file names, users or hosts).

### Password-protected files

Encrypted files are a common way data leaves unchecked. Cy360 opens password-protected ZIP (including AES), 7z, Word/Excel/PowerPoint and PDF files and scans what is inside:

| Where | Where the password comes from |
|---|---|
| Email (relay and mailbox scans) | A password written in the same email ("password: …", recognised in many languages); a follow-up email between the same people within 30 minutes (relay; kept in memory only); your organisation's sharing passwords |
| Endpoints | With the Enterprise policy option **Open password-protected files on this server**, the file is uploaded to your Cy360 server, opened with your organisation's sharing passwords, scanned and deleted. PDFs that only restrict editing open without a password |
| DSPM (data at rest) | Your organisation's sharing passwords |

The event says that an item was opened and how — never the password. A file that still can't be opened is reported as **unscannable**, and policies can treat that as a match (for example, hold an unreadable attachment sent externally). On the relay, **Deliver held mail when its password arrives** re-checks a held message when the sender emails the password to the same recipient within 30 minutes, and delivers it if nothing then matches a hold or block policy.

### Turning DLP on for endpoints

Endpoint DLP is configured in an Endpoint Defence policy's **Data Protection (DLP)** section (off by default): which folders and channels to watch, which detectors to look for, the minimum confidence, whether to report encrypted containers and sensitivity labels, and Enterprise options (Exact Data Match, fingerprints, OCR of images and scanned PDFs, opening password-protected files on the server, AI document classification). On for new policies: **Tell the user** (a desktop notification through the CyEDR tray says what was found and what happened — never the data itself) and **Source code** detection.

By default a copy is only reported. To **stop** it:

- **Quarantine (enforce)** — tick the channels (USB, cloud-sync, other folders) where a sensitive file is moved into the endpoint's DLP quarantine right after it is found; optionally also files that can't be checked. A cloud-sync client that has already uploaded the file removes the cloud copy when the local one goes. Analysts restore a file from DLP Activity → the event → **Restore file** (a reason is required and recorded).
- **Clipboard** — text the user copies is checked by the CyEDR tray in their session; optionally the clipboard is cleared. Only detector names are reported, never the text.
- **Print** (Linux and macOS, through the CUPS print queue) — jobs are reported and optionally cancelled. A job the printer has already taken can't be pulled back. Not available on Windows.
- **Device Control** can still block USB storage outright or make it read-only.

Quarantine acts within the check interval after the file is written; it is not a block before the copy completes, which would need a signed Windows file-system driver or an Apple Endpoint Security entitlement. See [Endpoint Defence](/docs/endpoint-defence#policies).

DLP events are triaged as incidents (category **dlp**) in Security Operations → Incidents and open data-exfiltration cases.

## DLP Policies

Data Security → DLP → **Policies** has the **Regulations** templates, the **Email** policies and **All channels**: one policy with one data condition — detectors, minimum matches, minimum classification level, document types, sensitivity labels, unreadable files, scope (only data leaving the organisation, or internal too) and user / destination-domain exceptions — and an action per channel:

| Channel | Actions |
|---|---|
| Email (mail relay) | monitor, encrypt, quarantine, block |
| AI tools (TLS gateway, AI sites) | monitor, block |
| Web uploads (TLS gateway, other sites) | monitor, block |
| Endpoints | monitor (DLP Activity names the policy; quarantine stays in the endpoint policy's Data Protection section) |

Each channel adds these to its own policies and the **most restrictive** match wins, so an all-channels policy can only make a channel stricter. A channel without an action ignores the policy; channels pick up changes within five minutes.

## DLP Activity

Data Security → **DLP Activity** (analysts) lists every DLP event from every source one by one:

- **when**, and its **criticality** — critical / high / medium / low: how much it matters that this data went this way (Highly Confidential data to an external destination and not stopped is critical; a blocked event drops one step);
- the **classification** (⚠ = more sensitive than its label);
- **who** and on which host; **what data** (detector × count); the item (file, attachment or masked email subject);
- **channel** and source; **destination** (↗ = external);
- **what happened** — blocked, held for review, delivered encrypted, user overrode, delivered, or detected but not stopped.

Filter by window (7 days to 1 year), classification, criticality, outcome, source and channel, or search; tiles, breakdowns (classification, data type, channel, outcome, people, destinations) and the table all follow the filters. Click a row for every detail and the linked incident — including which items were opened with a password or read with OCR, the document type and a sender's override reason. Analysts mark an event **Confirmed** or **False positive** with a note; verdicts feed the per-detector precision on Classification → Accuracy. Endpoint quarantine events have **Restore file**. **Export CSV** is recorded in the Audit Trail. The page shows up to the newest 20,000 events per window.

The PDF version is Dashboard & Reports → Reports → **Data Loss Prevention Report** (summary, breakdowns, findings, actions and the 25 most critical events).

## Email DLP

Two ways to cover email, both using the same detection packs, Exact Data Match, fingerprints, document types and classification as every other DLP channel. The body and every attachment (Office, PDF, archives, forwarded mail, images) are scanned separately, so an event names the attachment that carried the data.

### 1. The Cy360 mail relay — inline, can stop mail

Outbound mail is routed through Cy360 before it leaves. Each message is scanned and the tenant's email policies decide:

| Action | What happens |
|---|---|
| Monitor | Delivered and reported |
| Encrypt | Delivered with the header `X-CyAssure-DLP-Action: encrypt`; a Microsoft 365 or Google rule then encrypts it (Cy360 does not encrypt mail itself) |
| Quarantine | Held for review, stored encrypted |
| Block | Rejected with `550 5.7.1`, so the sender gets a bounce |

The most restrictive matching policy wins. The relay is a pass-through, not a queue: mail is handed to the next hop during the same SMTP session, and if the next hop is down the sending server gets `451` and retries, so a restart loses nothing.

Policies can let the sender **release a held message themselves with a business reason**: the hold notice carries a single-use link (valid 72 hours, no Cy360 sign-in needed) to a page showing what was found; the sender gives a reason and the message is delivered, recorded as **User overrode** in DLP Activity for review.

**Turning it on (admin).** On the server, add `maildlp` to `COMPOSE_PROFILES` in `.env`, set `MAIL_DLP_HOSTNAME` to the DNS name your mail platform connects to, run `docker compose up -d`, and re-run `cyassure-setup.sh` to open port 25 (see [Installation & Deployment](/docs/docker-deployment#6-key-environment-variables)). STARTTLS uses `/opt/cyassure/mail-dlp/relay.crt` — self-signed on first start; replace it with a trusted certificate if your connector requires one.

The Email DLP page has six tabs:

- **Quarantine** (analysts) — held mail with sender, recipients, masked subject, classification, what was found per attachment and the policy. **Release and deliver** or **Delete**; both need a reason, recorded in the Audit Trail. Held messages are erased when released, deleted or expired.
- **Policies** — name, action, scope (only mail with external recipients, or all mail), detectors, minimum matches, minimum classification, document types and sensitivity labels that match on their own, sender domains, and whether unreadable password-protected attachments match.
- **Settings** (per tenant) — scanning on/off, your email domains, the next hop (for Microsoft 365 your `<domain-with-dashes>.mail.protection.outlook.com` endpoint, for Google `smtp-relay.gmail.com` port 587), optional sign-in, how long held mail is kept (default 30 days), whether the sender is told, OCR of images and scanned PDFs (Enterprise, up to five per message), AI document classification, and whether held mail is delivered when its password arrives.
- **Setup** — the exact Microsoft 365 and Google steps. For Microsoft 365: an outbound connector to the relay used only by a transport rule for external recipients, an inbound connector that accepts mail back from the relay's IP, and the transport rule's exception on the relay's sender IP — never on a header, because any sender can type a header.
- **Test a message** — upload an `.eml` to see what the relay would do; nothing is sent or stored.
- **Relay access** (global admin) — your mail platform's sending networks (every other address gets `550`; `0.0.0.0/0` is refused, so the relay can never be an open relay), the maximum message size (default 35 MB) and what to answer for a sender domain no tenant has listed.

### 2. Mailbox scanning — after sending (Marketplace)

**Microsoft 365 Email DLP (mailbox scan)** and **Google Workspace Email DLP** read each sent message through Microsoft Graph or the Gmail API and scan it with Cy360's DLP engine. They also see internal-only mail, but cannot stop a message that has already gone. The Google package can also import Google's own Admin-console DLP rule events. See [Integration Setup](/docs/integration-setup#microsoft-365-email-dlp-mailbox-scan) for the permissions each needs.

## Running a DLP trial or data-leak assessment

To show what sensitive data is leaving an environment without changing mail flow or blocking anything:

1. **Email** — install **Microsoft 365 Email DLP (mailbox scan)** or **Google Workspace Email DLP** from the Marketplace and set **Assessment: on the first run, scan mail sent in the last N days** (up to 90). The first run reviews weeks of past sent mail; large tenants catch up over several runs (each run is capped by *Messages per run* and *Mailboxes per run*).
2. **Endpoints** (optional) — turn on Data Protection in an Endpoint Defence policy, in report-only mode, for a few endpoints.
3. **Regulations** (optional) — apply the templates that matter to the customer in **Monitor** mode.
4. **Review** — DLP Activity shows each event; the **Data Loss Prevention Report** is the summary to hand over.

Mailbox scanning is read-only: it never moves, changes or deletes mail, and messages are scanned in memory. Only detector names, counts, item names, sender, recipients and a masked subject are kept — never the matched values or the message body.

## DSPM — Data Security Posture Management

With the DSPM add-on, the Data Security section adds the pages below (Access is under Data Access & Exposure, Settings under Settings → Data Security).

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

### Data Activity

Who **read, downloaded, changed, copied, shared or deleted** data in each store over the last 7, 30 or 90 days, ranked by the number of objects touched weighted by the store's sensitivity (a critical store counts five times a low one). Click a store for its day-by-day rows per person or service, with example object names — names only, never content.

| Source | How to turn it on |
|---|---|
| Microsoft 365 (SharePoint / OneDrive) | the Microsoft 365 log connector in Marketplace, with the *Audit.SharePoint* content type |
| Google Drive | **Google Workspace Email DLP** package (1.2.0 or later), *Send Drive activity* on |
| Windows file servers | a CyEDR **Log Collection** policy with **File-share audit** on, assigned to the server; the server needs `auditpol /set /subcategory:"Detailed File Share" /success:enable`. Listing-only access is skipped and repeats are de-duplicated |
| Amazon S3 | **AWS S3 Data Activity** package — the CloudTrail trail must log S3 data events |
| Amazon RDS / Aurora PostgreSQL | **RDS PostgreSQL Data Activity** package — the instance needs pgaudit (`pgaudit.log = 'read,write'`); only table names reach Cy360, never statements |
| Snowflake | **Snowflake Data Activity** package — Access History (Enterprise edition); a key-pair user whose role can read the SNOWFLAKE database |
| BigQuery | **BigQuery Data Activity** package — the project's Data Access audit logs; a service account with Private Logs Viewer |
| Azure SQL Database / Managed Instance | **Azure SQL Data Activity** package — SQL auditing sent to Log Analytics; add the *SCHEMA_OBJECT_ACCESS_GROUP* audit action group to see each table |

Activity is kept as one row per store, person, action and day. Sources start from the moment they are connected — there is no backfill.

**Data-access alerts (every edition).** Once a day Cy360 compares each person's access with their own last 30 days and raises an incident (category **data_activity**) for:

- an **unusual volume** of data accessed in one store — the bar is lower and the severity higher the more sensitive the store is;
- a **first access to a highly sensitive store** that others use regularly;
- a **burst of DLP events** for one user;
- a **bulk read of a sensitive database** — one person reading 20 or more tables, or running 1,000 or more read queries, in a high or critical database on one day.

**Sensitivity on alerts.** A DLP, Cloud Apps (CASB) or file-share alert on a store DSPM rates high or critical shows that store's sensitivity and data categories in its details, and is raised one level (high) or two (critical), so the same activity on payroll data outranks it on a wiki.

Without DSPM the alerts still run; DSPM only adds the sensitivity weighting.

### Hygiene

Duplicate sensitive datasets (the same values in several stores, matched by salted fingerprints) and stale sensitive data (not modified for 365+ days by default) — candidates for deletion that reduce your risk.

### Remediation

One-click fixes that need **two admins** — one requests, a different one approves, approval executes. Off until enabled in Settings. Actions:

- block S3 public access, remove public access from a GCS bucket, make an Azure container private (all reversible with **Rollback**);
- remove public/anyone links from SaaS files (not reversible);
- **apply a Microsoft Purview sensitivity label** to SharePoint/OneDrive files — pick the label (or paste its GUID when the label list can't be read) and list the item ids; the label's own encryption and marking apply. Rollback restores the labels the files had before; a file that had none keeps the new one. Needs `Files.ReadWrite.All` and Microsoft Graph metered APIs, which Microsoft bills to your Azure subscription.

### Finding one person's data

For a DPDP access or erasure request, Privacy Operations asks DSPM to find one person's data: enter their email, phone, Aadhaar, PAN, passport or account reference on the request. The identifiers are turned into keyed hashes and never stored. DSPM reads each connected store — catalogued personal-data files first (up to 500 per store) and database columns classified as personal data (up to 100,000 rows) — and lists each store, file or column that holds them. Stores that need the in-environment scanner or have content scanning off are listed as *not searched*; a store where a limit was reached is *partly searched*. After an erasure, a verification run repeats the same search. See [Privacy Operations → Rights Requests](/docs/privacy-operations#rights-requests).

### Settings (admin)

![Data Security → Settings](/docs-img/dspm-settings.jpg)

- **General** — **content scanning** (off by default: with it off, DSPM only discovers stores and their configuration; turning it on asks for explicit consent to read samples), scan mode (*Hosted* — Cy360 reads via provider APIs and discards content from memory — or *In-environment scanner*), scan interval (default 24 hours), sampling budgets (objects per store, bytes per object, rows per column), minimum detection confidence, allow remediation, stale-access days, internal domains and stale-data (ROT) days.
- **Connections** — the sources. Cloud storage reuses the accounts from Marketplace → Cloud Asset Inventory; SaaS drives reuse the Shared files accounts (all listed in Settings → Connected Accounts); databases (PostgreSQL, MySQL/MariaDB, SQL Server, Snowflake, BigQuery) and **Windows file shares / NAS** (SMB 2 or 3 — Windows file servers, Synology, QNAP, NetApp and similar) are added from Marketplace → Data Security with a read-only user. For a file share, give the host, the shares to scan and a domain or NAS account with read access; file servers are usually on a private network, so use the in-environment scanner.
- **Scanners** — register an **in-environment scanner** for databases and file shares on private networks. The token is shown once. Run the published `cy360-dspm-scanner` container on a host that can reach the database; it needs outbound HTTPS to Cy360 only, keeps the database credentials locally and sends back only detector IDs, counts and salted hashes.

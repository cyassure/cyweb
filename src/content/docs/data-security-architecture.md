# How Cy360 Protects Your Sensitive Data

One detection engine runs on every route your data can take: **email, AI tools, web uploads, browsers, endpoints, cloud drives, SaaS apps and databases**. A file gets the same verdict wherever it goes, and the sensitive values it contains are never stored. Every event is classified on the same four levels: **Public, General, Confidential and Highly Confidential**.

[Download this overview as a PDF](/downloads/CyAssure-360-Data-Security.pdf) (8 pages, October 2026). For how to set each part up in the portal, see [Data Security](/docs/data-security).

## Architecture: where the data is, where it leaves, and one engine in between

![Cy360 data security architecture: cloud drives, databases, file shares and laptops on the left; one shared detection engine in the middle; email, AI tools and web uploads, endpoints and SaaS sharing on the right; posture context and data activity below; DLP Activity, Incidents and Reports at the bottom](/docs-img/data-security-architecture.svg)

**Where data is stored**

| Source | Covered by | What is scanned |
|---|---|---|
| Cloud drives and storage | DSPM | SharePoint, OneDrive, Google Drive, Box, Dropbox, Amazon S3, Azure Blob, Google Cloud Storage |
| Databases | DSPM | PostgreSQL, MySQL, SQL Server, Snowflake, BigQuery, Cloudflare D1 |
| File shares | DSPM | Windows (SMB) shares |
| Laptops and servers | CyEDR | Scheduled scan of files already on the device |

**One detection engine, shared by every channel**

- Data detectors with checksum checks, including regional packs
- Exact Data Match on your real records
- Fingerprints of your confidential documents
- Document-type recognition
- Sensitivity labels read from files
- OCR for images and scanned PDFs
- Opens password-protected files and encrypted email
- One policy, one action per channel

**Where data leaves**

| Route | Covered by | What is inspected |
|---|---|---|
| Email | Email DLP | Inline mail relay, and mailbox scanning for Microsoft 365 and Google Workspace |
| AI tools and web uploads | Secure web gateway · browser extension | Prompts, pasted text and files sent to AI sites and other websites, through the gateway or the browser extension |
| Endpoints | CyEDR | USB, cloud-sync folders, network shares, remote-desktop drives, printing, clipboard, Bluetooth |
| SaaS sharing | CASB | Public links, shares to personal accounts, mass downloads |

**Around the engine**

- **Posture context (CSPM · SSPM)** — cloud and SaaS configuration checks: is a store public, is logging on, who holds admin rights.
- **Data activity** — who reads the data: access logs from storage and databases, with behaviour analytics for unusual reads.
- **DLP Activity** — every event from every source as one record: what data, which level, who, which channel, where to, outcome.
- **Incidents** — alerts weighted by how sensitive the data is, then correlated with the rest of your security telemetry.
- **Reports** — Data Loss Prevention, Data Security and Data Leak Assessment reports.

## How the pieces fit: each capability answers one question

| Capability | Question it answers | How it works |
|---|---|---|
| DSPM | Where is our sensitive data? | Connects to storage and databases with read-only access, samples their content and classifies each store. Private databases are scanned by a small scanner inside your network. |
| CSPM / SSPM | How exposed is it? | Checks cloud and SaaS configuration. A public bucket is a finding; a public bucket holding Highly Confidential data is a priority. |
| Data activity | Who is reading it? | Reads storage and database access logs and flags unusual reads by a user or service. |
| CASB | How is it being shared? | Reads Microsoft 365 and Google Drive audit logs: public links, links used heavily, shares to personal accounts, mass downloads. |
| Secure web gateway | Is it going to AI tools or websites? | Inspects HTTPS requests from managed devices, including prompts and file uploads, and can block them. |
| Browser extension | Is it being uploaded from a browser? | Checks files people pick or drop on a website, and text or images pasted into AI tools, before they are sent. Works on devices whose traffic doesn't pass the gateway. |
| Email DLP | Is it leaving by email? | Inspects each message body and every attachment separately, before delivery or by mailbox scan. |
| Endpoint DLP | Is it leaving the device? | The CyEDR agent checks files written to USB drives, sync folders, network shares and remote-desktop drives, print jobs, clipboard contents and Bluetooth transfers. |

## Channel by channel: what we see and what we can do

| Channel | What is inspected | Actions | When |
|---|---|---|---|
| Email relay | Outbound mail: body and every attachment, including archives, forwarded mail, scanned images and S/MIME or OpenPGP-encrypted mail | Monitor, encrypt, hold for review, block. The sender can be offered a justified override. | Before delivery |
| Mailbox scan | Sent mail in Microsoft 365 or Gmail, including internal-only mail, up to 90 days back | Alert | After sending |
| AI tools | Prompts, pasted text and uploaded files sent to AI sites | Monitor, block | In transit |
| Web uploads | Files and form data uploaded to other websites, up to 20 MB per request | Monitor, block | In transit |
| Browser | Files picked or dropped on any website; text and images pasted into AI tools | Monitor, or block with a notice to the user | Before sending |
| Endpoints | Files written to removable media, cloud-sync folders, network shares (Windows and Linux), remote-desktop drives and custom paths; print jobs (Windows, macOS, Linux); clipboard; Bluetooth transfers (Linux) | Alert and notify the user. Files on USB, sync folders and custom paths can be quarantined, and analysts can restore them; print jobs can be cancelled; the clipboard can be cleared. | On write |
| Storage and databases | Sampled content of each store, tables and columns | Classify, score risk, raise findings, apply Microsoft sensitivity labels | Scheduled |
| SaaS sharing | Sharing and download activity in Microsoft 365 and Google Drive | Alert | From audit logs |

## Detection: what the engine recognises

- **Identifiers, with checksum checks** — card numbers, IBANs, national IDs, tax and health numbers for India, the EU, the GCC and Middle East, the US, Canada and Australia, plus API keys and credentials. Where the identifier has a check digit it is verified, which removes most random-number false positives.
- **Context, not only patterns** — a number described as a part, order or account number isn't reported as an ID or a card. When a number fits several countries' formats, such as a passport number, it is reported under the country named next to it, or once as "country not identified".
- **Your own records** — Exact Data Match finds real customer or employee records from a list you provide. Only salted hashes of the values are kept, never the values themselves.
- **Your own documents** — document fingerprints recognise copies and extracts of documents you register, such as contracts, board packs or price lists, even when they contain no ID numbers.
- **Kinds of document** — source code, payslips, contracts, tenders, price lists, research and more. Each type sets a minimum classification. Optional AI classification runs on your own AI provider and only sees masked text.
- **Labels and images** — Microsoft sensitivity labels inside files are read and mapped to the four levels; a file more sensitive than its label is reported as mislabelled. Screenshots and scanned PDFs go through OCR on your own server, never a cloud service.

## Encryption: encrypted traffic, files and email

- **HTTPS and TLS** — the gateway decrypts each request, inspects it and re-encrypts it to the real site. Devices trust the gateway through its own certificate authority, which CyEDR installs on Windows, macOS and Linux. Apps that don't allow inspection can be passed through by domain, and devices that don't trust the gateway are still controlled by destination.
- **Endpoints and browsers** — the agent reads the file itself on the device, and the browser extension reads it before upload. Encryption of the network connection doesn't hide the content from either.
- **Password-protected files** — ZIP (including AES), Word, Excel, PowerPoint, PDF and 7z files are opened with the password found in the same email or a follow-up one ("the password is…", in many languages), or from your organisation's own list of sharing passwords. RAR archives are opened too. Passwords are never logged or stored with a result.
- **Encrypted email** — S/MIME and OpenPGP messages are opened with decryption keys your organisation provides, then scanned like any other mail. Keys are stored encrypted and are never shown again.
- **Files that can't be opened** — anything still unreadable, such as an encrypted archive without a known password or email no key opens, is marked unscannable. A policy can alert on, hold or quarantine unscannable items, so encrypting a file is not a way around DLP.

## Microsoft and Google: do you depend on Microsoft Purview or Google DLP?

**No.** Every verdict described here comes from the Cy360 engine. Microsoft 365 and Google Workspace mailbox scanning runs the Cy360 engine on mail fetched through Microsoft Graph or the Gmail API. No Purview licence is needed, and no Google DLP feature is needed for the Gmail scan.

If you already use Microsoft Purview or Google Workspace DLP, their verdicts can be imported as additional sources. They appear in DLP Activity next to Cy360's own, with the same classification levels. This gives one view across tools you already pay for. It is optional.

## Privacy by design: detecting sensitive data without collecting it

- **Values are never stored** — an event records which detectors matched, how many times, the level, the document type and the file name. The card number, ID or record itself is never written to the database, a log or a report.
- **Credentials stay with you** — the in-network database scanner only makes outbound HTTPS connections. Database passwords stay in its local configuration and are never sent to the Cy360 server.
- **Processing stays on your server** — OCR, password opening, email decryption and classification run on your Cy360 server. AI classification uses your own AI provider and only receives masked text.
- **Signed code only** — connectors and detector packs are signed by CyAssure. Their signatures are checked every time they load, including by the in-network scanner.

## Proof: how you can check that it works

| Measure | Result |
|---|---|
| Precision on realistic documents | **99.3%** |
| Recall on realistic documents | **100%** |
| Document kinds in the test set | **8** — CSV exports, invoices, email threads, chat and application logs, config files, Word, Excel |

Measured by CyAssure on generated test documents with every regional pack installed: each detector's values placed the way such files label them, with phone numbers, dates, order numbers and invalid look-alikes in the same file, scored per file the way an alert is raised. These are CyAssure's test figures, not results from customer data. Your own figures appear in the product:

- **Measured on your data** — the Accuracy tab (Data Security → Classification → Accuracy) shows precision and recall per detector, alongside the verdicts your analysts give on real events (confirmed or false positive).
- **Tested detectors** — every detector ships with test cases. The endpoint agent and the server run the same tests, so a file gets the same verdict on both.
- **Reports** — the Data Loss Prevention report shows what left or tried to leave, its level, who sent it, through which channel and what happened. The Data Security report adds where sensitive data is stored and the riskiest stores. Each covers a period you choose, up to a year.
- **Data leak assessment** — a read-only assessment needs no change to mail flow or networks. It connects to your mailboxes, drives and audit logs and shows sensitive data that has already left, going back up to 90 days, dated when it left. The Data Leak Assessment report shows how it left, who sent it, where it went and what your policies, or a recommended baseline, would have stopped.

## What sets it apart

| | |
|---|---|
| **One engine, one verdict** | Email, AI tools, web uploads, browsers, endpoints, drives and databases use the same detectors, records, fingerprints and classification. A price list gets the same verdict whether it is emailed, copied to USB or pasted into a chatbot. Separate products for each channel usually give different answers for the same file. |
| **Data protection inside the SOC** | DLP events become security alerts. Their weight rises with how sensitive the affected store is, and they are correlated with endpoint, identity and network activity. A mass download from the payroll share outranks the same download from a wiki. |
| **Encryption isn't a way out** | Passwords are taken from the email thread itself, encrypted email is opened with your keys, and files that still can't be opened can be held or quarantined under your policy. |
| **Privacy as architecture** | Matched values are never stored anywhere in the platform, Exact Data Match keeps only salted hashes, and database credentials never leave your network. |
| **Works with what you have** | Microsoft and Google DLP verdicts are combined into the same view and the same levels, and Microsoft sensitivity labels are read from files and applied back to them. |

Questions about a specific channel or deployment: contact your CyAssure account team.

# DPDP Compliance Guide

This guide explains how Cy360 helps an organisation meet India's **Digital Personal Data Protection Act 2023** and the **DPDP Rules 2025**: how personal data and consent flow through the platform, what you need to set up to get the full benefit, and where your own systems and processes still have to do part of the work.

It brings together several modules. The **DPDP Standard** package includes **Privacy Operations**, **Governance & Compliance**, **Data Security (DSPM)** and **Cloud & SaaS Security**, with one-year log retention. The **DPDP SDF** package, for Significant Data Fiduciaries, adds **AI Security** and **Attack Surface**. Each module's own page has the screen-by-screen detail: [Privacy Operations](/docs/privacy-operations), [Governance & Compliance](/docs/governance-and-compliance), [Data Security](/docs/data-security).

**When the obligations apply.** The Rules were published on 13 November 2025. Consent Manager registration (Rule 4) applies from 13 November 2026. Notices, security safeguards, breach intimation, retention, children's data, Significant Data Fiduciary duties and Data Principal rights (Rules 3 and 5 to 16) apply from 13 May 2027.

## Who does what

Cy360 is your system of record and your monitor. It does not run your applications or your databases.

| Cy360 | You |
|---|---|
| Publishes your notices and keeps an append-only, tamper-evident ledger of every consent and withdrawal | Show the notice and send each consent and withdrawal to Cy360 from your website, app or Consent Manager |
| Publishes a feed of withdrawals | Make every system that uses the data read the feed and stop processing |
| Finds personal data in your clouds, SaaS drives, file shares and databases, and checks how it is protected | Connect those stores, with a read-only account |
| Plans each rights request, tracks its deadline, finds the person's data and checks it is gone afterwards | Correct or erase the data in your systems, and tell your processors to do the same |
| Detects and investigates incidents, runs the breach clocks and drafts the notices | Decide, send the notices and file the reports |
| Answers your DPDP assessment from this evidence and reports on it | Answer the questions that need a person's judgement, and fix the gaps |

## How data and consent flow: a worked example

**ShopKart** is an Indian online retailer. It has a website and a mobile app, keeps its customers in PostgreSQL, exports orders to Amazon S3, sends marketing emails from a marketing tool, and its staff use Microsoft 365. It has the DPDP Standard package.

```
 Customer ── sees notice ──> ShopKart website/app ── consent / withdrawal ──> Cy360 consent ledger
                                    │                                               │
                                    ▼                                               ▼
                       PostgreSQL · S3 · marketing tool  <── withdrawal feed ── Cy360 change feed
                                    │
                    read-only scan  ▼
                         Cy360 Data Security (DSPM) ──> Processing Register gaps · incidents
                                    │
    Rights request ──> Cy360 Rights Requests ──> person search ──> ShopKart erases ──> verified
                                    │
    Incident ──> Cy360 SOC ──> Personal Data Breach case ──> Board and customer notices
                                    │
                 all of the above ──> DPDP assessment · dashboard · report
```

### 1. Setting up

ShopKart's privacy lead enters the DPO contact and grievance period under **Privacy Operations → Settings**. In **Governance & Compliance → Processing Register** they record three processing activities: *fulfil orders* (legal basis: data given for the purpose, s.7(a)), *marketing emails* (consent) and *customer support* (consent). Each activity has its data categories, retention period and the systems that hold the data. They connect PostgreSQL, the S3 bucket and Microsoft 365 to Data Security.

Cy360 scans the stores and compares what it finds with the register. In the first week it reports that the marketing database holds mobile numbers no activity declares, and that the S3 export bucket has no access logging. Both become findings, and the bucket becomes an incident in the SOC.

### 2. Notice and consent

ShopKart defines its purposes under **Consent & Notices → Purposes** and publishes a notice in English and Hindi. Cy360 won't publish a notice without the Rule 3 content: itemised data, purposes, and the links to withdraw consent, exercise rights and complain to the Board. ShopKart's website loads the notice text from Cy360 and shows it before sign-up.

When Priya signs up and ticks *Send me offers*, ShopKart's server calls the consent API with her customer id, the purposes she agreed to, the notice she saw, the language and the channel. Cy360 records one ledger entry per purpose and returns a receipt. If Priya were under 18, the call would also carry how her parent was verified (DigiLocker, a virtual token or an already-verified account); without that, Cy360 refuses the consent. It also refuses any consent for a child to a purpose marked as tracking or targeted advertising.

ShopKart lists its website under **Website scan**. Every day Cy360 checks that the notice is linked and complete, that the grievance contact is published, and that no tracker loads before consent. A failed check becomes an incident.

### 3. Storing and using the data

Data Security keeps scanning. When a developer copies the customer table into an analytics database with public access, Cy360 finds Aadhaar and phone numbers in a public store and raises an incident. Endpoint and email data loss prevention block a spreadsheet of PAN numbers from going to a personal email address. The SOC watches access to these systems, and logs are kept for a year as Rule 6 requires.

### 4. Withdrawal

Six months later Priya clicks *Unsubscribe*. ShopKart's website sends a withdrawal for the *marketing emails* purpose. Cy360 records it and publishes it on the change feed. ShopKart's marketing tool reads the feed every hour and removes Priya from its lists. Cy360 records that the feed was read; if no system reads it for two days, the DPDP assessment marks that withdrawals are not being acted on.

### 5. A rights request

Priya then asks ShopKart to erase her data, using the form on ShopKart's privacy page, which calls Cy360's request API. Cy360 opens the request with its deadline. It plans the tasks from the Processing Register: erase from PostgreSQL, erase from the marketing tool, and tell the payment processor to erase. Data Security searches every connected store for Priya's email and phone and lists where they are. ShopKart's team erases the data and marks the tasks done. Cy360 repeats the search to confirm nothing is left. The reply to Priya carries the DPO's contact details, as Rule 9 requires.

### 6. A breach

An attacker reaches the S3 export bucket. The SOC confirms that personal data was exposed and marks the case as a **Personal Data Breach**. Cy360 starts the clocks (CERT-In within 6 hours, the Board without delay, the detailed report within 72 hours) and drafts the Rule 7 notices: one for affected customers, one for the Board. ShopKart's team reviews them, sends them, and records each step.

### 7. Proving it

Every six hours, or on **Sync to GRC**, Cy360 answers about twenty DPDP assessment questions from this evidence. The **DPDP Compliance** dashboard and the **Privacy Operations Report** show requests answered on time, consent and withdrawals, breaches, website readiness and the DPDP score. ShopKart gives the report to its auditors and its board.

## Getting the full benefit

Cy360 can only prove what reaches it. These nine steps decide how much of your DPDP evidence it can produce. The **DPDP setup** checklist on the Privacy Operations Overview tracks most of them.

### 1. Send every consent and withdrawal to Cy360

**Why it matters.** Section 6(10) puts the burden of proving consent on you. Without consent records, the proof of consent and withdrawal questions in your assessment can only be answered by hand.

**What to do.**
- Under **Privacy Operations → Settings**, issue an **API key**. It belongs on your servers only, never in a web page or app.
- Define one purpose per thing you ask consent for. Mark purposes that involve tracking or targeted advertising.
- Publish a notice for each audience and language.
- From each place you ask for consent (website sign-up, app onboarding, checkout, call-centre script), call `POST /api/privacy/public/consent` with the action, your customer id, the purposes, the notice id, the language and the channel. Use the same call with `"action": "withdraw"` wherever consent can be withdrawn. Withdrawing must be as easy as giving consent.
- For a child or a person with a lawful guardian, send the category and how the parent or guardian was verified.
- If you work with a registered Consent Manager, add it under **Consent & Notices → Consent Managers**; its signed events go to the same ledger.

**How you know it works.** **Consent & Notices → Consent ledger** shows new entries, and **Verify integrity** confirms that the ledger's hash chain is intact. The checklist items *Purposes defined*, *A notice published* and *Consent API key issued and in use* turn green.

### 2. Make every system act on withdrawals

**Why it matters.** Section 6(6) requires you and your Data Processors to stop processing within a reasonable time after consent is withdrawn.

**What to do.** In each system that uses personal data on the basis of consent (CRM, marketing tool, analytics, data warehouse), run a small scheduled job that calls `GET /api/privacy/public/consent/changes?since=<last id>`. For each withdrawal it should stop the processing for that purpose and customer, then store the last id it read. Ask your processors to do the same or to accept your instruction.

**How you know it works.** The checklist item *Your systems read consent withdrawals* turns green once the feed has been read recently. If no system reads it for two days, the assessment answer drops. To check the data itself, declare the tables under Database checks: **Privacy Operations → Consent & Notices → Data checks** then counts people who withdrew but are still there.

### 3. Connect every store that holds personal data

**Why it matters.** Anything Cy360 can't see can't be checked, searched for a person's data, or included in the Processing Register reconciliation.

**What to do.**
- **Cloud storage:** add your AWS, Azure and Google Cloud accounts in **Marketplace → Cloud Asset Inventory**, then install **Amazon S3**, **Azure Blob Storage** and **Google Cloud Storage** from **Marketplace → Data Security**. These use the same accounts, so there is nothing to fill in, but buckets aren't scanned until you install them.
- **Microsoft 365 and Google Drive, Box, Dropbox:** add them from **Marketplace → Data Security** or Shared files.
- **Databases:** in **Marketplace → Data Security**, install the item for your engine (**PostgreSQL**, **MySQL / MariaDB**, **SQL Server / Azure SQL**, **Snowflake**, **BigQuery** or **Cloudflare D1**). Each item has the SQL to create a read-only account. If Cy360 can reach the database, choose network *Public*. If not, choose *Private* and run the in-environment scanner, a container in your own network: register it under **Data Security → Settings → Scanners**. The scanner keeps the database password on your side and sends back only detector counts and salted hashes.
- **File servers and NAS:** add them as file shares, usually through the in-environment scanner.
- **Cloudflare:** install **Cloudflare D1** for databases, with an API token that has only the D1 Read permission, and **Cloudflare R2** for buckets, with an Object Read only token limited to those buckets. Use network *Public*. Cloudflare doesn't report whether an R2 bucket is public, whether it logs access, or whether it keeps versions, so these show as unknown. Check public access yourself in the Cloudflare dashboard.
- Leave **content scanning** on for stores holding personal data.

Database, file share, Cloudflare and SaaS connectors are installed from Marketplace, so Cy360 needs to reach CyAssure's catalog the first time you add one. Installed connectors keep working if it can't. Microsoft 365 and Google Workspace credentials are saved through their Marketplace items, and SaaS Posture uses those same credentials.

You don't need to name your tables for scanning. Once content scanning is on, Cy360 finds every table it can read and samples its text columns, up to **Max objects sampled per store** (200 by default, where one column counts as one object). Each scan starts from the same columns, so a store with more columns than the limit keeps missing the same ones. If a database has more, raise the limit.

Then declare your important tables under **Settings → Data Security → Database checks** (see *Database checks* below). Declaring adds the retention and consent checks, and scanning works without it.

**How you know it works.** **Data Security → Catalog** lists the stores with their personal data categories. The checklist item *Personal data discovery running* turns green. Stores Cy360 cannot read are shown as *not searched*, never as clean.

### 4. Complete the Processing Register

**Why it matters.** Cy360 plans erasure tasks, checks retention and reconciles discovered data against the Processing Register, so it can only be as good as the register.

**What to do.** For each processing activity, record the purpose, the legal basis (consent or a s.7 legitimate use), the data categories, the **retention in days**, each system that holds the data (link the Data Security store), each processor (with its data processing agreement) and each transfer outside India. Work through the **Gaps** list: undeclared categories, unmapped stores, processors without an agreement, transfers without a safeguard.

**How you know it works.** The checklist item *Processing register complete* turns green, and the Gaps list is empty or shows only accepted exceptions.

### 5. Publish your privacy page and contact

**Why it matters.** Rules 9 and 14 require you to publish the DPO's or a contact person's details, how to make requests, and your grievance period of no more than 90 days.

**What to do.**
- Enter the contact and periods under **Privacy Operations → Settings**.
- Issue a **portal key**, which is safe to use in a web page.
- Build a privacy page on your website that shows the notice, has a request form calling `POST /api/privacy/public/requests`, and lets people check status with their reference.
- Add each of your websites under **Consent & Notices → Website scan**, and mark pages meant for children.

**How you know it works.** The website scan scores each site out of 100 and lists every check; a failed check becomes an incident until it is fixed. The checklist items *DPO / privacy contact set* and *Rights request portal key issued* turn green.

### 6. Run requests through Privacy Operations

**Why it matters.** Sections 11 to 14 give people the rights of access, correction, erasure, grievance and nomination, with deadlines.

**What to do.**
- Log every request in **Rights Requests**, including ones that arrive by email or phone.
- Verify the person's identity before acting.
- On access and erasure requests, run the **Data Security search** with the identifiers you have.
- Complete each task in your systems. Mark records you must keep under Rule 8(3) as **Hold** with their erasure date. Then run the verification search after an erasure.
- Keep nominations up to date.

**How you know it works.** Requests closed on time, overdue requests and verified erasures appear on the Overview and in the report.

### 7. Treat personal data incidents as breaches

**Why it matters.** Rule 7 requires notice to each affected person and to the Board without delay, and a detailed report within 72 hours. CERT-In expects a report within 6 hours.

**What to do.** When an incident involves personal data, switch its case to **Personal data breach**. Use **Breach Intimation** to record when you became aware, who is affected, and when each notice went out. Review the drafts before sending them.

**How you know it works.** The breach clocks show on the Overview, and overdue Board reports are flagged in red.

### 8. Verify children and guardians properly

**Why it matters.** Section 9 and Rules 10 and 11 require verifiable consent from a parent who is an identifiable adult, or from a lawful guardian appointed by a court or authority.

**What to do.** Ask a child's parent to verify through DigiLocker, a virtual token, or an account you already hold verified identity and age for. Send the method and a reference with the consent. Don't offer children purposes that involve tracking or targeted advertising.

**How you know it works.** Child and guardian consent questions are answered automatically from the ledger.

### 9. Keep logs for a year and review monthly

**Why it matters.** Rules 6(1)(e) and 8(3) require logs, and the personal data needed to investigate an incident, to be kept for at least one year.

**What to do.** Keep the licence at 365-day retention (the DPDP packages do). Open the **DPDP Compliance** dashboard once a month: assessment answers that stay *no* or *partial* are your to-do list. Send the **Privacy Operations Report** to management each quarter.

**How you know it works.** The checklist item *Logs kept for at least a year* is green, and the DPDP score trends up.

## Personal data in your databases

Cy360 connects to databases read-only and never changes or deletes your data. For each database it:

- finds which columns hold personal data, including India's identifiers (Aadhaar, PAN, GSTIN, UPI ID, mobile number, passport, bank account);
- flags databases holding personal data that are publicly reachable, unencrypted or not logging access, and raises an incident for the serious cases;
- shows who can read them, and finds copies of the same data in other stores;
- compares them with the Processing Register;
- searches them for one person's data during an access or erasure request, and again to verify an erasure;
- counts rows kept past their retention period, and people who withdrew consent but are still in a table used for that purpose (see below).

Every one of these checks is a read-only count or sample. Deleting data stays with your own systems; Cy360 tells you what needs deleting and checks that it was.

## Database checks: retention, withdrawn consent and one person's data

Cy360 doesn't manage your databases, so it needs two facts that only you know about each important table: which column says how old a row is, and which column holds the customer id. You declare them once under **Settings → Data Security → Database checks**. For each table you give:

- the **age column**: a date or timestamp such as last login, last order, created or account closed;
- the **retention period** in days, the same as for the matching activity in the Processing Register;
- the **customer-id column**: the id your website or app sends with each consent, or the email or mobile number;
- the **consent purposes** the table is used for, for example *Marketing* for a mailing-list table.

Every check is a `SELECT COUNT(*)` in the same read-only session Data Security already uses. Cy360 never reads rows one by one and never changes anything. For private databases, the in-environment scanner (version 1.2.0 or later) runs the check inside your network and sends back only the count. On large tables, index the columns you name, or a check may time out; a timed-out check is reported as such, never as zero.

### Retention periods inside databases

**What Cy360 does.** Every day it counts the rows whose age column is older than the retention period. If there are any, it raises an incident (*rows kept past retention*) that resolves itself when the count drops to zero. **Check now** runs the check at once.

**What you do.** Run a scheduled deletion or anonymisation job in the database that removes those rows, keeping only what Rule 8(3) or another law requires (see below). The incident tells you when the job isn't keeping up. If you are a large e-commerce platform (two crore or more registered users in India), an online gaming intermediary (fifty lakh or more) or a social media intermediary (two crore or more), the Third Schedule requires erasure three years after a user's last activity, with a notice at least 48 hours before. Declare the last-activity column with 1095 days, and have your job send the 48-hour notice before it deletes.

**A table with more than one retention period.** A check has one period per table. If different rows have different periods, create a view for each group of rows and declare each view as its own check. On Cloudflare D1 the schema is `main`, and age columns can hold dates or epoch seconds or milliseconds. Add a day to each period if your deletion job runs daily, so rows waiting for tonight's run don't raise an incident.

### Linking a withdrawal to the data

**What Cy360 does.** Privacy Operations knows who withdrew consent for which purpose. For each table declared with a customer-id column and purposes, it collects the people whose latest consent for one of those purposes is a withdrawal. Data Security counts how many of them are still in the table. Any found raise a high-severity incident, and the DPDP answer *processing stops on withdrawal* drops to partial until a later check finds none. The results are under **Privacy Operations → Consent & Notices → Data checks**. Checks run daily; **Check now** runs them at once.

**What you do.** Make the system that owns the table read the consent change feed (step 2) and remove or suppress those people for the purpose. A person's id is sent only for this check: Cy360 keeps it sealed and wipes it once the check has run. People whose erasure has been completed are covered by the erasure verification search instead.

### Searching for one person's data

**What Cy360 does.** In databases, the search now looks the person up exactly. It counts the rows whose personal-data columns, or the declared customer-id column, equal the common ways the identifier is written (for a mobile number: with and without +91, with spaces). This covers the whole table through its index, not a sample. Private databases are searched by the in-environment scanner; until it answers, the search shows *waiting for the in-environment scanner*. If no scanner picks the search up within 24 hours, the database is listed as *not searched*. To repeat the lookup during verification, the identifiers are kept sealed for 90 days, then wiped. They are never shown or logged.

**What you do.** Keep the in-environment scanner running and up to date. Index the email, mobile and customer-id columns of large tables. For any store still listed as *not searched* or *partly searched* (for example a file share without content scanning), search it yourself and record the result on the request's tasks.

### Keeping data and logs for at least one year (Rule 8(3))

**What the law says.** Personal data, traffic data and processing logs must be kept for at least one year from the processing, even after a person deletes their account or withdraws consent, and then erased.

**What Cy360 does.** On an erasure request, each erase task can be marked **Hold** instead of Done, with an erasure date (by default a year from today). Held tasks don't stop you completing the request. The verification search reports copies in a held store as *held*, not as a failure. **Rights Requests → Retention holds** lists every hold and its date. When a date passes without the records being confirmed erased, the hold shows red, the DPDP erasure answer drops to partial, and an incident is raised until you click **Records erased**.

**What you do.** Move held records (order confirmations, payment events, access logs) out of active use into storage only security and legal staff can read. Delete them on the hold date, then confirm in Retention holds.

## Checklist

- Consent API connected on every channel, with withdrawals as easy as consent.
- Every consent-based system reads the withdrawal feed.
- Every personal-data store connected to Data Security, with private databases through the in-environment scanner.
- Processing Register complete, with retention days, systems, processors and transfers.
- Privacy page with notice, request form and contact; websites in Website scan.
- All requests logged and verified in Rights Requests.
- Personal Data Breach case type used for every personal-data incident.
- Parent and guardian verification sent with children's consent.
- 365-day retention; monthly dashboard review; quarterly report.
- Important tables declared under Database checks (age column, retention, customer-id column, purposes), with indexes on large tables.
- Your own deletion jobs keep the retention incidents at zero; systems remove people who withdrew; Rule 8(3) holds erased on their date and confirmed.

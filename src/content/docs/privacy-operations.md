# Privacy Operations

**Privacy Operations** handles what an organisation owes the people whose personal data it holds — in India's terms, the **Data Principals** under the **Digital Personal Data Protection Act 2023** and the **DPDP Rules 2025**. It covers notices, consent and its withdrawal, rights requests, grievances, nominations, children's and guardians' consent, Consent Managers, and personal data breach intimation.

Privacy Operations is an Enterprise add-on module. It works with **Governance & Compliance** (the Processing Register says what you process and where) and **Data Security** (DSPM finds a person's data across your stores and checks it is gone after an erasure).

For the end-to-end picture — how data and consent flow, what to connect for the full benefit, and what your own systems still do — see the [DPDP Compliance Guide](/docs/dpdp-guide).

The section has five pages: **Overview**, **Rights Requests**, **Consent & Notices**, **Breach Intimation** and **Settings**.

## Overview

A live **DPDP setup checklist** — privacy contact, purposes, a published notice, the consent and request keys, whether your systems read consent withdrawals, a complete Processing Register, personal data discovery, and one-year log retention — plus open and overdue requests, active consents, breaches in progress and **Retention holds** (Rule 8(3) holds, with how many are due for erasure). Each unfinished item links to the page that fixes it.

The **GRC compliance (DPDP)** panel shows when your DPDP assessment in Governance & Compliance was last updated from Privacy Operations, with a **Sync to GRC** button — see [Keeping GRC up to date](/docs/privacy-operations#keeping-grc-up-to-date).

## Settings

Admins set:

- **Contact** — name, email and phone of your Data Protection Officer or privacy contact. It is shown with every notice and added to every reply to a Data Principal automatically (Rule 9).
- **Deadlines** — rights requests (default 30 days) and grievances (at most 90 days, Rule 14(3)).
- **Board complaint link** — used by notices that don't set their own.
- **Sync to GRC** — after changing your contact or deadlines, press it to update the DPDP assessment straight away instead of waiting for the next automatic update.
- **Keys** — the **API key** stays on your servers (record consent, read consent state and the change feed); the **portal key** may be used from your web pages (notices, rights requests, request status). A key is shown once; *Rotate* replaces it immediately; *Revoke* stops it.

## Consent & Notices

### Purposes

One entry per processing purpose, linked to its Processing Register activity. Mark a purpose **Tracking, behavioural monitoring or targeted ads** if it is one — such purposes are refused for children (s.9(3)).

### Notices

A notice lists its purposes and itemises the personal data it covers, with one text per language — English and any of the 22 Eighth Schedule languages. Each text must link to consent withdrawal, rights requests and a complaint to the Data Protection Board (Rule 3). *Draft from purposes* writes a starting text. **Publish new version** freezes it: published versions never change, and each carries a content hash.

### Consent ledger

Every grant, withdrawal and notice delivered, per purpose and channel, recorded against the exact notice version and language shown. People appear only as a keyed hash — never a name, email or account id. The ledger is append-only and hash-chained; **Verify integrity** reports any record changed or removed outside Cy360.

- **Children (under 18)** need verifiable parental consent — DigiLocker, a virtual token or an already-verified account — and are never given a tracking or advertising purpose.
- **A person with a lawful guardian** needs a verified guardian order (Rule 11).

### Website scan

Add your websites under **Consent & Notices → Website scan** — the URL, an optional label, an optional notice URL, and **Directed at children** for pages meant for children. Each website is scanned daily (or *Scan* / *Scan all now*) for what a visitor can see of your DPDP obligations:

| Check | Law |
|---|---|
| Served over HTTPS | s.8(5), Rule 6 |
| A privacy notice is linked and can be read | s.5, Rule 3 |
| The notice cites the DPDP Act, not only the old SPDI Rules | DPDP Act 2023, Rules 2025 |
| A grievance officer / DPO with email, phone and a response time of at most 90 days | s.8(9)-(10), s.13, Rules 9 and 14 |
| How to withdraw consent | s.5(1)(ii), s.6(4) |
| Access, correction, erasure, grievance and nomination rights | s.11-14 |
| How to complain to the Data Protection Board | s.5(1)(iii) |
| Itemised personal data and purposes | s.5(1)(i), s.6(1), Rule 3(b) |
| Retention periods and erasure | s.8(7)-(8), Rule 8 |
| Children: age 18 and verifiable parental consent | s.9, Rule 10 |
| A consent tool when trackers are present, and no tracker loading before consent | s.4, 6, 7 |
| A notice link or consent box on every form that collects personal data | s.5(1), s.6(1), Rule 3 |
| The notice in an Indian language | s.5(3) |
| No advertising or behavioural tracker (pages directed at children only) | s.9(3) |

Each website gets a score out of 100 — 80 and above is low risk, 50 to 79 medium, below 50 high. **Details** lists every check with what was found, how to fix it and the law.

**Incidents.** Each failed check is raised as an incident in **Security Operations → Incidents**, with the fix in its summary, and resolves itself when a later scan passes. If the notice itself is missing you get one incident, not one per notice check. Removing a website resolves its incidents. Every scan is also kept in CyDataLake.

**What the scan can and can't see.** It reads the HTML your server returns and does not run JavaScript. If your website is built as a JavaScript app, the scan searches the site's own script files for the notice link and trackers; checks it can't read show as **UNKNOWN** and are left out of the score. If your notice page is also rendered by JavaScript, set the website's **notice URL** to a page that serves the notice text. The text checks look for the required content; they are not a legal review.

For pages directed at children the tracker result is also shown: **BREACH** means an ad or behavioural tracker loads; **REVIEW** means analytics or a tag manager.

### Data checks

For each database table declared under **Settings → Data Security → Database checks** with a customer-id column and consent purposes, Cy360 counts the people whose latest consent for one of those purposes is a withdrawal but who are still in the table. Found people raise a high-severity incident and lower the DPDP answer *processing stops on withdrawal* to partial. Counts only: no rows are read or changed. Checks run daily, or with **Check now**. Needs the Data Security (DSPM) add-on. See the [DPDP Compliance Guide](/docs/dpdp-guide#linking-a-withdrawal-to-the-data).

### Consent Managers

Register each Consent Manager registered with the Board (name and registration number). Cy360 gives you an endpoint and a secret (shown once) for it. It sends signed grant and withdrawal events — each event is accepted once and must be signed within five minutes — and can query a person's consent state. Events land in the same ledger and change feed as every other channel. *Suspend* stops a Consent Manager; recent events show what was accepted or refused and why.

### Integration

Copy-paste calls for your website or app:

1. Fetch the notice and show it, then **record consent** per purpose (or a withdrawal).
2. **Stop processing on withdrawal** — each system that uses the data polls the consent **change feed** and acts on withdrawals (s.6(6)).
3. **Take rights requests and grievances** from your privacy page, and let people check their request status with its reference and their email.

## Rights Requests

Tabs: **Rights requests**, **Grievances**, **Nominees** and **Retention holds**.

Requests arrive from your privacy page (portal key), your systems (API key) or *Log a request* (staff). Types: access (s.11), correction, erasure (s.12), nomination (s.14), consent withdrawal, and grievances (s.13). Each has a reference, a deadline and a full audit trail; overdue requests are shown in red.

Working a request:

1. **Verify identity** — record how (OTP, account login, document…) and, ideally, the person's account reference, which links their consents.
2. **Find this person's data** (with Data Security) — enter their email, phone, Aadhaar, PAN, passport or account reference. Data Security lists each store, file or column that holds them. Databases are looked up exactly, across the whole table. To repeat the lookup when verifying, the identifiers are kept sealed for 90 days and then wiped; they are never shown. Private databases are searched by the in-environment scanner (*waiting for the in-environment scanner* until it answers).
3. **Build tasks** — one task per system in the Processing Register and per store where the person was found, plus one per Data Processor to instruct, each with its owner.
4. Mark tasks **Done**, **N/A** or — for erase tasks — **Hold**: records DPDP Rule 8(3) requires you to keep for a year after the processing, out of active use, with an erasure date (default a year from today). Write the reply and **Complete** (or **Reject**). For an access request, *Draft access summary* writes the s.11 summary — processing, data, retention, and everyone it was shared with — from the Processing Register.

Completing an **erasure** withdraws every consent and deletes the stored account reference; completing a **nomination** registers the nominee. To prove an erasure: **Run verification search** (same identifiers, nothing retyped) → **Record verification**. It counts as verified only when no copies remain (copies in a held store are reported as held), every store was searched, and no search limit was reached — a store Cy360 couldn't read is listed as *not searched*, never as clean.

**Retention holds** lists every Rule 8(3) hold with its erasure date. Click **Records erased** when they are deleted. A hold past its date shows red, lowers the DPDP erasure answer to partial and raises an incident until confirmed.

## Breach Intimation

**Record a breach** — optionally from an incident, which fills in the title, time and description. Two clocks run from the time you became aware: the **6-hour CERT-In** report and the **72-hour detailed report to the Board** (Rule 7(2)(b)); an extension the Board grants can be recorded. The breach page has ready-to-copy texts for:

- the **notice to each affected person** (Rule 7(1)) — what happened, likely consequences, what you did, what they can do, and a contact;
- the **intimation to the Board** (Rule 7(2)(a));
- the **detailed report** (Rule 7(2)(b)).

The Board takes them on its own platform; mark each step done in Cy360. In **Case Management**, *Personal data breach* on a case switches it to the breach notification checklist.

## Keeping GRC up to date

What you do in Privacy Operations counts towards your DPDP assessment in **Governance & Compliance → Assessments → DPDP**. You don't need to fill in those questions twice — Privacy Operations answers the ones it can show evidence for: notices, proof of consent, honouring withdrawals, Consent Managers, how people reach you with requests, requests and grievances answered on time, your privacy contact, children's and guardians' consent, children's pages (from the website scan), verified erasures and breach notifications.

**Automatic updates every 6 hours.** Your assessment is refreshed on its own four times a day. A change you make now — a new contact, a published notice, a closed request, a breach step marked done — shows up in GRC within 6 hours at most.

**Sync to GRC for an immediate update.** When you want GRC to reflect a change right away — before an audit, a board meeting or a report — press **Sync to GRC** on the **Overview** or **Settings** page. It takes a few seconds and tells you how many DPDP answers were refreshed. Analysts and admins can use it; anyone can see when GRC was last updated.

Good to know:

- **Your team's answers always win.** If someone answered a DPDP question by hand in GRC, Privacy Operations leaves it alone. The sync message tells you how many answers were kept this way.
- **No evidence yet, no answer.** A question stays open until there is something to show — for example, on-time responses appear once you have closed requests.
- **Settings alone don't finish every question.** Most answers come from what actually happens: consents recorded, requests closed, breaches handled. Saving your settings updates the contact and request questions; the rest follow your day-to-day work.
- **Licence needed.** Updates, automatic or by button, only run while the Privacy Operations add-on is active.

## Reports and dashboards

**Reports → Privacy Operations Report** summarises requests against their deadlines, verified erasures, consent, notices, website DPDP readiness, children's pages, Consent Managers, breaches and the DPDP assessment score. On **Dashboard → Custom Dashboard**, *Start from template → DPDP Compliance* gives a ready-made DPDP dashboard.

The Processing Register (Governance & Compliance) adds the DPDP pieces: the s.7 ground for each legitimate use, the annual DPIA for a Significant Data Fiduciary, countries restricted for transfers under s.16, and the s.17 exemption register.

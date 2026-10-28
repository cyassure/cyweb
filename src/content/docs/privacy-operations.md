# Privacy Operations

**Privacy Operations** handles what an organisation owes the people whose personal data it holds — in India's terms, the **Data Principals** under the **Digital Personal Data Protection Act 2023** and the **DPDP Rules 2025**. It covers notices, consent and its withdrawal, rights requests, grievances, nominations, children's and guardians' consent, Consent Managers, and personal data breach intimation.

Privacy Operations is an Enterprise add-on module. It works with **Governance & Compliance** (the Processing Register says what you process and where) and **Data Security** (DSPM finds a person's data across your stores and checks it is gone after an erasure).

The section has five pages: **Overview**, **Rights Requests**, **Consent & Notices**, **Breach Intimation** and **Settings**.

## Overview

A live **DPDP setup checklist** — privacy contact, purposes, a published notice, the consent and request keys, whether your systems read consent withdrawals, a complete Processing Register, personal data discovery, and one-year log retention — plus open and overdue requests, active consents and breaches in progress. Each unfinished item links to the page that fixes it.

## Settings

Admins set:

- **Contact** — name, email and phone of your Data Protection Officer or privacy contact. It is shown with every notice and added to every reply to a Data Principal automatically (Rule 9).
- **Deadlines** — rights requests (default 30 days) and grievances (at most 90 days, Rule 14(3)).
- **Board complaint link** — used by notices that don't set their own.
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

### Children's pages

List the pages of your websites that are directed at children. Each is scanned daily (or *Scan now*) for advertising and behavioural trackers: **BREACH** means an ad or behavioural tracker loads; **REVIEW** means analytics or a tag manager. The scan reads the page's HTML; a tracker added later by a tag manager is shown as the tag manager.

### Consent Managers

Register each Consent Manager registered with the Board (name and registration number). Cy360 gives you an endpoint and a secret (shown once) for it. It sends signed grant and withdrawal events — each event is accepted once and must be signed within five minutes — and can query a person's consent state. Events land in the same ledger and change feed as every other channel. *Suspend* stops a Consent Manager; recent events show what was accepted or refused and why.

### Integration

Copy-paste calls for your website or app:

1. Fetch the notice and show it, then **record consent** per purpose (or a withdrawal).
2. **Stop processing on withdrawal** — each system that uses the data polls the consent **change feed** and acts on withdrawals (s.6(6)).
3. **Take rights requests and grievances** from your privacy page, and let people check their request status with its reference and their email.

## Rights Requests

Tabs: **Rights requests**, **Grievances** and **Nominees**.

Requests arrive from your privacy page (portal key), your systems (API key) or *Log a request* (staff). Types: access (s.11), correction, erasure (s.12), nomination (s.14), consent withdrawal, and grievances (s.13). Each has a reference, a deadline and a full audit trail; overdue requests are shown in red.

Working a request:

1. **Verify identity** — record how (OTP, account login, document…) and, ideally, the person's account reference, which links their consents.
2. **Find this person's data** (with Data Security) — enter their email, phone, Aadhaar, PAN, passport or account reference. Data Security keeps only a keyed hash of the identifiers, never the values, and lists each store, file or column that holds them.
3. **Build tasks** — one task per system in the Processing Register and per store where the person was found, plus one per Data Processor to instruct, each with its owner.
4. Mark tasks **Done** or **N/A**, write the reply and **Complete** (or **Reject**). For an access request, *Draft access summary* writes the s.11 summary — processing, data, retention, and everyone it was shared with — from the Processing Register.

Completing an **erasure** withdraws every consent and deletes the stored account reference; completing a **nomination** registers the nominee. To prove an erasure: **Run verification search** (same identifiers, nothing retyped) → **Record verification**. It counts as verified only when no copies remain, every store was searched, and no search limit was reached — a store Cy360 couldn't read is listed as *not searched*, never as clean.

## Breach Intimation

**Record a breach** — optionally from an incident, which fills in the title, time and description. Two clocks run from the time you became aware: the **6-hour CERT-In** report and the **72-hour detailed report to the Board** (Rule 7(2)(b)); an extension the Board grants can be recorded. The breach page has ready-to-copy texts for:

- the **notice to each affected person** (Rule 7(1)) — what happened, likely consequences, what you did, what they can do, and a contact;
- the **intimation to the Board** (Rule 7(2)(a));
- the **detailed report** (Rule 7(2)(b)).

The Board takes them on its own platform; mark each step done in Cy360. In **Case Management**, *Personal data breach* on a case switches it to the breach notification checklist.

## Evidence and reporting

Every six hours Privacy Operations answers the DPDP assessment questions it can prove from its own records — notices, proof of consent, withdrawal enforcement, Consent Managers, request intake and on-time responses, the privacy contact, children's and guardians' consent, children's pages, verified erasures and breach notifications. It never overwrites an answer a person gave.

**Reports → Privacy Operations Report** summarises requests against their deadlines, verified erasures, consent, notices, children's pages, Consent Managers, breaches and the DPDP assessment score. On **Dashboard → Custom Dashboard**, *Start from template → DPDP Compliance* gives a ready-made DPDP dashboard.

The Processing Register (Governance & Compliance) adds the DPDP pieces: the s.7 ground for each legitimate use, the annual DPIA for a Significant Data Fiduciary, countries restricted for transfers under s.16, and the s.17 exemption register.

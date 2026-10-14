# Security Posture & Incidents

This is the heart of day-to-day security operations. **Security Posture** tells you how exposed the organisation is internally right now; **Incidents** is the work queue where analysts decide what is a real threat and what is not.

## How alerts become incidents

Every source — the CyEDR endpoint agent, Marketplace log connectors (firewalls, cloud audit logs, identity providers, SaaS), attack-surface scans and more — sends events into Cy360. The **correlation engine** then:

1. **Normalises** each event into one common alert format, so a sign-in from Entra ID and a process start on a laptop can be compared.
2. **Groups** related alerts into one incident: alerts for the same person (however each source spells the name — `CORP\jdoe`, `jdoe@corp.com`), the same machine, or the same cloud resource within a time window.
3. **Scores** the incident: a risk score, a **false-positive probability** (from rule confidence, behaviour analytics, threat-intel hits, kill-chain stage and asset criticality) and a separate **threat-intel reputation**.
4. **Enriches** it: MITRE ATT&CK techniques and tactics, threat-intel lookups (with Enterprise), an AI summary and investigation hypotheses, and compliance mapping.
5. **Routes** it to one of two queues (below), and may open a case automatically.

Raw events — including the ones that never became alerts — are kept in CyDataLake and searchable from [Investigations → Alerts](/docs/investigations#alerts-cydatalake).

## Security Posture

![Security Operations → Security Posture](/docs-img/security-posture.jpg)

**What it is.** The internal security dashboard, built from the correlation engine, behaviour analytics (UEBA) and entity-risk scoring.

**What is on it.**

- **Headline tiles** — total incidents, open/active incidents, critical & high incidents, high-risk entities (risk score ≥ 50), incidents auto-closed by the AI triage judge, and open cases.
- **Internal Detection Posture** — a score out of 100 with the reasons behind it (for example the number of UEBA anomalies, deep kill-chain incidents, or no active agents). **Full Benchmark** opens the CSPI benchmark.
- **Incident State Overview** — incidents per status (Open, Investigating, In Review, Held, Resolved, False Positive, Closed).
- **Severity Distribution** and **Incident Categories**.
- **30-day incident trend by severity**, **Entity risk distribution** and **Entity type breakdown**.
- **Kill Chain Stage Distribution** — incidents first seen in the last 30 days by the furthest ATT&CK stage they reached (the same count as the Attack Lifecycle board).
- **Entity Risk leaderboard** — the riskiest hosts, people and cloud accounts. **View All** opens the full leaderboard.

**Why it matters.** It is the morning check: is anything critical open, is the trend going the right way, and which users or machines carry the most risk?

### Entity risk

A host, person or cloud account gets **one** risk score across all modules: threat activity (alerts, incidents, UEBA, threat intelligence), asset criticality, open exposures on that machine or account (for example a CVE on the CISA KEV list), compliance-breaching incidents, and the sensitivity of the data it handles. The leaderboard breakdown shows each part.

## Incidents

![Security Operations → Incidents](/docs-img/incidents.jpg)

### The two queues

Incidents are split into two tabs, also used by Case Management:

| Queue | Contains |
|---|---|
| **Security Incidents** | Possible threats that need an analyst's decision: correlated detections, threat-hunt findings, UEBA anomalies, data-loss (DLP) events. |
| **Security Hygiene** | Things that are not an attack: **Exposure** (vulnerability, posture or control-gap findings), **Platform Health** (an integration down, a scheduled job failing), **Admin Approval** (a decision the platform is waiting for, such as a new network zone) and **Activity** (low-level events with no threat evidence). |

A Security Hygiene record moves to Security Incidents **by itself** when threat evidence arrives (an alert at level 5 or above, a correlation-rule hit, a UEBA/ML anomaly or a threat-intel hit). Nothing ever moves a record into Security Hygiene automatically. To move one yourself, open it → **QUEUE** → *Move to Security Hygiene* / *Move to Security Incidents*, with a reason.

Dashboards, MTTR, the kill-chain views and the Benchmark count Security Incidents only.

### Reading the page

- **Summary tiles** — total, open, investigating, in review, resolved, critical and high for the current tab and filters.
- **Severity Breakdown**, **Status Breakdown** and **Category Distribution** charts. Click a chart segment to filter the list.
- **Incident trend** (14 days) and **severity trend** (30 days), collapsible.
- **Filters** — jump to an incident ID, status, severity, confidence, page size (50 by default) and a **From / To** date range. The range shows every incident that was active at any time inside it.
- **Buttons** — **Refresh**, **Archive FP & Resolved** (moves resolved and false-positive incidents to Closed — nothing is deleted), **FP Patterns** (the false-positive suppression patterns Cy360 has learned) and **Purge Closed** (admins).
- **The list** — ID, severity, host, type, alert count, status, threat-intel verdict, risk score, false-positive probability and last seen.

### Working an incident

Click a row to open the incident drawer. It contains:

- **AI summary and investigation hypotheses** (for Security Incidents).
- **Kill Chain Progress** — every ATT&CK tactic seen on the incident, with the furthest stage outlined. The **KC-n** badge is that furthest stage, numbered 1 (Reconnaissance) to 14 (Impact).
- **Risk score** and **false-positive probability**, and separately the **threat-intel reputation** (how strongly VirusTotal, AbuseIPDB, GreyNoise and MISP agree an indicator is malicious — this is *not* a false-positive indicator).
- **The alerts** in the incident, each linking to its raw event in CyDataLake.
- **Recommended response** — containment, eradication and recovery actions. Approve them one at a time (they run through CyEDR) or send the plan to your SOAR. Firing or declining a plan needs a reason.
- **Linked exposures and threats** — if a threat incident hits a host that has an open exposure incident, both are linked and severities are raised.
- **Campaign** — related incidents across hosts, with *Remediate Campaign* (immediate containment) and *Propose fix for these hosts* (see [Response & Remediation](/docs/response-and-remediation)).
- **Sandbox** buttons on file hashes and URLs (see [Investigations](/docs/investigations#sandbox-analysis)).

**Status workflow:** Open → Investigating → Resolved or False Positive → Closed. Changing status asks for a reason; resolving asks what was found and how it was resolved.

**Open a case** for anything that needs a tracked investigation. Cases also open automatically for high or critical incidents with a false-positive probability under 40 once enrichment has run, when they have three or more alerts, or when a CyEDR detection on them scored 80 or more.

### Noise reduction you should know about

- **Learned FP suppression.** After five analyst false-positive closes of the same alert pattern, new matching alerts are suppressed automatically — never when a threat-intel hit or a high-fidelity correlation rule is involved.
- **AI triage judge.** Incidents with an ambiguous false-positive probability (30–60) get one AI verdict. A "likely false positive" with 85 % confidence or more closes the incident automatically, *unless* hard evidence blocks it (threat-intel hit, high-fidelity rule, UEBA anomaly, C2/exfiltration stage, a tier-1 asset, critical severity, or an analyst already engaged). Every verdict is in the incident's audit trail and you can reopen it.
- **Detection Context** and **Noise Tuning** reduce noise further — see [Detection Rules & Context](/docs/detection-rules-and-context).

### Exposure incidents

Urgent weaknesses raise **exposure incidents** (🛡 EXPOSURE badge, Security Hygiene tab) automatically, from:

- attack-surface findings on the CISA KEV list, with an EPSS of 10 % or more, or a verified critical;
- internal CVEs on CISA KEV or with EPSS ≥ 10 %;
- critical/high Cloud Posture, Data Security (DSPM) and SaaS sharing findings;
- the GRC "SIEM monitoring coverage" control failing (no alerts for 24 hours);
- misplaced devices and failed segmentation tests from Network Assets.

They resolve themselves when the finding is gone and reopen if it comes back. If you close one as *Closed (risk accepted)* or *False Positive*, it stays closed while the finding persists. When a fixed finding keeps coming back (by default three times in seven days), a separate **RECURRING** incident is raised one severity higher — the fix is not sticking.

### Data-loss (DLP) incidents

Microsoft Purview, Office 365 DLP, the AI Security Gateway, the web-upload gateway and CyEDR Data Protection detections all share the category **dlp**. DLP events for the same user group into one incident whichever source raised them.

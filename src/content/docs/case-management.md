# Case Management

**Case Management** (CyCases) is where an incident becomes a tracked investigation: assigned to an analyst, worked step by step, with evidence and indicators recorded, and measured against your SLA. It is part of the base Endpoint Defence module.

![Case Management](/docs-img/cases.jpg)

## When cases are created

- **By an analyst** — *Open case* on an incident, or **+ New Case** on this page.
- **Automatically** — for a high or critical incident with a false-positive probability under 40 once enrichment has run, when it has three or more alerts, or when a CyEDR detection on it scored 80 or more.
- **By CyMind or an AI agent** — on request, with your confirmation.

A case opened on an exposure incident gets the exposure checklist; data-loss incidents get the data-exfiltration checklist.

## The case list

Like Incidents, the page has two tabs — **Security Incidents** (default) and **Security Hygiene** — and every metric follows the selected tab.

- **Tiles** — total cases, active, critical/high, average age, average **MTTA** (mean time to acknowledge) and average **MTTR** (mean time to resolve).
- **Charts** — cases by status, by severity, the 30-day trend, and *Source & workload* (external attack-surface vs internal sources, and the analysts carrying the most cases).
- **Filters** — status, severity, type, source, analyst and a date range.
- **Table** — case ID, severity, status, type, assignee, MTTD (mean time to detect), age. **Assign** (👤) a case to an analyst; **Delete** removes the case record but keeps the incident.

## Inside a case

Click a case to open it. Each case has a shareable link (`?case=<id>`) and six tabs:

| Tab | Use it to |
|---|---|
| **Overview** | See the incident summary, AI narrative, kill-chain progress, affected hosts and users, the **response plan** and the timeline. Change status and severity. |
| **Comments** | Record each investigation step and decision. System comments (for example an automatic ML-baseline rollback) also appear here. |
| **IOCs** | Track indicators — IPs, domains, URLs, hashes. 🧪 sends a hash or URL to the sandbox. |
| **Evidence** | Upload files (logs, screenshots, samples). 🧪 sends an uploaded file to the sandbox. |
| **Checklist** | Work through the playbook steps for this type of case (for example validate → check for exploitation → contain → assign owner and deadline → remediate → verify → record risk acceptance for exposures). |
| **Graph** | See the relationships between the incident's entities — users, hosts, IPs, files. |

### The response plan

Each case carries a recommended response plan. Its state is shown as **Needs review**, **Pending approval**, **Fired** / **Fired by agent**, **Declined** / **Declined by agent**, or **SOAR not configured**. Fire actions one at a time through CyEDR, or send the plan to your SOAR platform. Firing or declining needs a reason.

### Statuses

Open → Investigating → In Review → Resolved → Closed. Resolving a case asks what was found and how it was resolved. Confirming an incident as a true positive (opening its case by hand, or resolving the case) rolls back the behaviour baselines of the users and hosts involved, so the attack is not learned as normal — a system comment lists each one.

## SLA metrics

MTTD, MTTA and MTTR are measured against the thresholds in **Settings → SLA Thresholds** (per severity, per tenant). Use the case list filters and the Reports page's Case report to review performance over time.

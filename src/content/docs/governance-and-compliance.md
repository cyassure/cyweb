# Governance & Compliance

**Governance & Compliance** (GRC) turns your security operations into compliance evidence. Instead of a spreadsheet filled in once a year, Cy360 scores frameworks continuously from questionnaire answers **and** live evidence — detections, vulnerabilities, data-security findings and control checks — and keeps the risk register, the privacy register and the reports in one place.

GRC is an Enterprise add-on module. Supported frameworks include **ISO 27001:2022, NIS2, DORA, SOC 2, NIST CSF, PCI DSS, GDPR, the EU AI Act, ISO 42001, CERT-In Directions 2022 and India's DPDP Act**, grouped into Global, EU and India.

The section has nine pages, in the order you would normally use them.

## GRC Setup

![Governance & Compliance → GRC Setup](/docs-img/grc-setup.jpg)

A live checklist that ticks itself off from your data (admins by default). Each step has a **GO** or **OPEN** button to its page; **Re-check** refreshes.

1. **Upload policy documents** — your own policies ground AI analysis and policy-to-control scoring.
2. **Alert enrichment** — runs on its own: alerts are tagged with MITRE techniques and mapped to framework controls (shown for information).
3. **Complete a framework assessment** — answering the questionnaire sets your baseline score; every *No* becomes a gap finding.
4. **Generate findings** — findings combine assessment gaps with breach/warning verdicts from enriched alerts.
5. **Populate the risk register** — auto-populate risks from breach findings, then set your risk appetite per category.
6. **Generate a compliance report** — scores, gaps and the remediation roadmap for auditors or the board.

Until the five actionable steps are done, GRC Posture shows a banner with *Continue setup*.

## GRC Posture

![Governance & Compliance → GRC Posture](/docs-img/grc-posture.jpg)

The compliance dashboard, derived from assessments, alerts and incidents:

- **Security Posture Index**, **Cyber Resilience**, **Portfolio Trend** and **Control Validators** tiles.
- **Overall posture** gauge with alerts (7 days) and incidents.
- **Framework posture scores** — choose frameworks by region (Global / EU / India) or individually; each shows its score, answered questions and trend. *View forecast* opens Forecast.
- **Findings by severity**, **findings by verdict** (Breach, Warning, Compliant, Unscored), **compliance alerts over 14 days**, breach incidents, the risk register and questionnaire completion.

**Refresh Scores** recomputes everything.

## Assessments

![Governance & Compliance → Assessments](/docs-img/grc-assessments.jpg)

**What it is.** The questionnaire for each framework, organised by section (for ISO 27001: ISMS context and leadership, risk assessment, support and operation, performance, Annex A organisational, people, physical and technological controls).

**How to use it.**

1. Pick a framework on the left. Its card shows the score and answered questions.
2. Work through the sections. Each question shows the control reference and whether it carries critical weight. Answer it — controls are scored from 1 (none) to 5 (fully implemented) — and add evidence notes. Answers can be reused across frameworks with identical questions. Answers that Cy360 fills automatically from live evidence (for example DSPM or the Processing Register) are marked with their source and never overwrite a person's answer.
3. The header shows the score, total questions, answered, gaps and partial answers. **Generate Gap Findings** turns every gap into a finding.

**Other views (top right):** **Controls List** (every control and its status), **What-If Simulation** (see how the score would change if you fixed specific gaps) and **Statement of Applicability** (which controls apply and why — required for ISO 27001 certification).

**Admin actions:** **Re-seed Templates** (refresh question text without touching answers), **Reset Framework** and **Reset All Answers** (danger zone).

## Policy Documents

![Governance & Compliance → Policy Documents](/docs-img/grc-policy-documents.jpg)

Upload your organisation's own policies (PDF, DOCX, TXT, Markdown) with a category tag. They are indexed for the AI pipeline and used to enrich assessments, gap analyses and reports. The *What to upload* guide lists recommended document types and naming.

**Policy Analysis** auto-scores a framework's questionnaire from your policies: for each control question, the relevant policy excerpts are retrieved and the AI assigns Pass / Partial / Fail. Choose the framework, decide whether to **overwrite existing answers**, and click **Run Policy Analysis**. You can also draft policy clauses with AI.

## Findings & Alerts

![Governance & Compliance → Findings & Alerts](/docs-img/grc-findings.jpg)

Two tabs:

- **Findings** — compliance findings with verdict (Breach / Warning), severity, framework, control, the finding text, linked alerts, status and date. Sources are *AUTO* (generated from detections mapped through MITRE to controls), *SURVEY* (assessment gaps) and manual. Filter by framework, severity, status, verdict and source. Per finding: **Show Fix**, **AI Analyze** and **AI Recs**. **Auto-Generate from Alerts** and **+ Manual Finding** add findings; **Sync SIEM Evidence** pulls the latest compliance-relevant alerts.
- **Live Alerts** — compliance-relevant alerts as they arrive, with their mapped controls.

## Risk Management

![Governance & Compliance → Risk Management](/docs-img/grc-risk-management.jpg)

Risk score = **Likelihood × Impact** (1–5 each): Critical 20–25, High 12–19, Medium 6–11, Low 1–5. Four tabs:

- **Risk Heatmap** — the 5×5 matrix; click a cell to see the risks there. Also risks by category.
- **Risk Register** — every risk with owner, treatment and status. **+ Add Risk** or **Auto-Populate from Findings**.
- **Risk Appetite** — how much risk you accept per category.
- **Exposure** — the GRC exposure register, filled automatically every 6 hours (and by **Sync now**) from urgent exposure findings across attack surface, internal CVEs, cloud posture, data security, SaaS sharing and network segmentation, plus vulnerable third-party libraries from attack-surface scans. Items the source stops reporting are resolved; **+ Add Item** adds risks the scanners can't see.

## Forecast

![Governance & Compliance → Forecast](/docs-img/grc-forecast.jpg)

Where framework scores and individual controls are heading:

- **Portfolio trend overview** — frameworks improving, declining, stable or without enough data.
- **Score forecast** for a chosen framework at +30, +60 and +90 days (linear regression with a confidence band). **Refresh Score History** adds a data point; predictions improve as history accumulates.
- **Control drift** — controls whose coverage is trending down, with the days until they become a gap. Needs about two days of 6-hourly history per control; while its model is in shadow mode only the counts are shown.

## Processing Register

![Governance & Compliance → Processing Register](/docs-img/grc-processing-register.jpg)

Your **records of processing activities** — the GDPR Article 30 / DPDP inventory of what personal data you process, why, where it lives, who receives it and how long you keep it. Five tabs:

- **Overview** — active activities, complete records, gaps by severity, vendors and **personal data discovered but not in the register** (DSPM stores holding personal data no activity links — *Create activity* makes a draft for it). **Export CSV / JSON** produces the Art. 30 record; **Update compliance evidence** writes the register's evidence to GRC now (it also runs every 6 hours).
- **Processing Activities** — one record per business process: status, owner, your role (controller/processor), purposes, lawful basis, data subjects, data categories (special categories need an Art. 9/10 condition and a DPIA decision), retention, security measures and review interval. Link the systems that hold the data (a DSPM store, an asset or a named system) and add data flows for each recipient, including cross-border transfers and their mechanism.
- **Vendors & Processors** — processors, sub-processors and other recipients with country, DPA status and default transfer mechanism.
- **Data Flows** — every flow across activities.
- **Data Residency** — where your data is stored and processed: the technically enforced controls computed live from this installation (AI provider region routing, threat-intel residency filtering, backup region) and a declared posture that admins attest to.

Gaps are checked per activity — missing purpose, lawful basis, owner or retention; special categories without a condition or DPIA; no linked system; overdue review; a linked store holding a data category the activity doesn't declare; processors without a signed DPA; cross-border flows without a transfer mechanism.

## GRC Reports

![Governance & Compliance → GRC Reports](/docs-img/grc-reports.jpg)

- **Generate Report** — framework compliance reports for the frameworks in scope (or all), generated in the background.
- **AI · Executive Risk Copilot** — ask CyMind a question about your live compliance posture, for example *"What is our biggest compliance risk right now?"*.
- **Board / Executive Report** — a unified multi-framework executive summary PDF for a board or CISO presentation, for a date range you choose. Download as PDF or JSON.

## How evidence flows in automatically

- Detections are mapped through MITRE ATT&CK techniques to framework controls hourly and become findings.
- **Control validation** runs daily from live data. A failing *SIEM monitoring coverage* control (no security alerts in 24 hours) also raises an exposure incident.
- DSPM findings and the Processing Register answer specific GDPR and DPDP questions automatically, marked with their source.

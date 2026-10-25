# Dashboards & Reports

The **Dashboard & Reports** section answers "how are we doing?" at a glance, for analysts, managers and the board. It has three pages: **Command Center**, **Dashboard** (five tabs) and **Reports**.

## Command Center

![Command Center](/docs-img/command-center.jpg)

**What it is.** The executive, cross-module view for the active tenant and the page Cy360 opens on. Each card summarises one domain and opens its page when clicked:

| Card | Shows | Opens |
|---|---|---|
| Security Posture | The CSPI score (0–100), its grade and your percentile against your industry | Dashboard → Benchmark |
| Attack Surface | The external posture score and grade for your monitored domain | Attack Surface → Overview |
| Open Incidents | Open security incidents and how many are new in the last 24 hours | Security Operations → Incidents |
| Endpoint Defense | Agents online out of enrolled, and open critical detections | Endpoint Defence → Fleet |
| Network Assets | Share of known devices that are monitored by an agent or log source | Asset Management → Network Assets |
| Compliance | Average framework score and how many frameworks you track | Governance & Compliance → GRC Posture |
| Cases | Open cases, split by external (attack surface) and internal sources | Case Management |
| Vulnerabilities | Critical and high vulnerabilities | Vulnerability Management → Overview |

**Why it matters.** It is the one page that tells you which area needs attention today without opening eight modules.

**Multi-tenant installs.** If you can access two or more tenants, a **Tenants** table appears below the cards: each tenant's open and new incidents, Security Hygiene count, endpoints online, critical detections and asset coverage, with a **Switch** button per row.

## Dashboard

The Dashboard page holds five tabs.

### Benchmark

![Dashboard → Benchmark](/docs-img/dashboard-benchmark.jpg)

**What it is.** The **CyAssure Security Posture Index (CSPI)** — one composite score from 0 to 100 built from every module: attack surface, detection and response (SIEM), compliance, vulnerabilities and threat intelligence. It is compared with an industry cohort that you choose from the drop-down (for example *Government & Public Sector*), and shown as a grade (A–F) and a percentile band.

**How to read it.**

- **The gauge** is your current score and grade.
- **Industry benchmark chart** places your score (the orange line) against the cohort's percentiles P10–P90.
- **CSPI score trend** shows how the score moved over days, weeks or months.
- Further down, each dimension's contribution is broken out so you can see what pulls the score down.

**Settings.** An optional *Unified Entity Risk* dimension can be switched on in the benchmark settings. It is off by default because it changes the score.

**Why it matters.** It gives management a single number that moves when the security programme improves — and shows exactly which area to invest in next.

### MITRE ATT&CK (Attack Lifecycle)

![Dashboard → MITRE ATT&CK attack lifecycle board](/docs-img/dashboard-attack-lifecycle.jpg)

**What it is.** A live board of the 14 MITRE ATT&CK stages, from **1 Reconnaissance** to **14 Impact**, in three groups: *Before a foothold*, *Inside the network* and *On the objective*. It refreshes every minute. Choose a 7, 30 or 90-day window in the top-right corner.

**The headline numbers.**

- **Open attacks** — incidents not yet resolved, and the furthest stage any of them reached.
- **Stopped before spread** — the share of confirmed attacks resolved before Lateral Movement.
- **Stages covered** — how many stages have at least one active detection capability.

**Each stage card shows**

- its activity: red pulsing **open** (unresolved incidents whose furthest stage is this one), orange **detected** (all closed), green **stopped** (confirmed attacks resolved here) or **quiet**;
- a coverage dot: **Covered** (at least one capability active), **Partial** (only shadow-mode models or unconfigured packages), **Gap** (nothing active).

The red dashed line before stage 10 is the *lateral-movement line*: attacks stopped before it never spread.

**Click a stage** to open its details underneath: the alerts tagged with that tactic, the attacks that reached it, which are still open, the detection rules mapped to the stage (Correlation, CyLogic, Hunt and EDR rules) and the Cy360 capabilities that act there with their live state (Active, Shadow mode, Not configured, In Marketplace, Needs licence), each linking to its page.

**Why it matters.** It shows where in the kill chain you catch attackers and where you are blind, so you know which detections or integrations to add.

### MITRE ATLAS

Reserved for coverage against MITRE ATLAS, the catalogue of attack techniques against AI and machine-learning systems. This tab is on the roadmap and currently shows a placeholder; today, AI-specific threats are covered on the [AI Security](/docs/ai-security) pages.

### OWASP Top 10

Reserved for web-application findings mapped to the OWASP Top 10 categories. This tab is on the roadmap and currently shows a placeholder.

### Custom Dashboard

![Dashboard → Custom Dashboard](/docs-img/dashboard-custom.jpg)

**What it is.** Your own grid of widgets (internal posture, posture-grade distribution, network assets, endpoint fleet, active incidents, entity risk and more).

**How to use it.** Drag a widget by its header to move it, drag the bottom-right corner to resize it, and click **×** to remove it. **Reset Layout** restores the default. The layout is saved in **your browser only** — it is not shared with colleagues and does not follow you to another computer.

## Reports

![Reports](/docs-img/reports.jpg)

**What it is.** Every report in the platform in one place: generate a new one, see the last five generated, and download them.

| Section | Report | Contents |
|---|---|---|
| Security Posture | Executive Command Center Report | Cross-platform executive roll-up — posture, incidents, compliance, cases |
| External Exposure | ASM Executive & Technical Reports | Attack-surface posture. These are produced automatically with every scan — use **Run Scan** to make a new one |
| Security Operations | SIEM & Security Operations Report | Incidents, threat hunting, MITRE techniques, SIEM component health |
| Security Operations | Vulnerability Management Report | Combined external and internal vulnerability exposure |
| Data Security | Data Loss Prevention Report | Every DLP event across endpoints, email, web, AI tools and Microsoft / Google — what data, its classification, who, which channel, where to, what happened and how critical, with the 25 most critical events |
| Endpoint Defence | Endpoint report | Fleet health, detections and policy coverage |
| Asset Management | Asset report | Inventory coverage, software inventory, IoT and Shadow AI risk |
| Security Compliance | GRC Compliance Report | Framework posture, findings and risk register |
| Platform Configuration | Case report | SOC case load, MTTA/MTTR and resolution trends |
| Platform Monitoring | Platform Health Report | Integration health, scheduled-job health, backups, licence and audit activity |

**How to use it.** Click **Generate** on a card. A progress bar shows the job; when it completes, the report appears in the list below the card with a **Download** link. Reports are generated in the background, so you can leave the page while they run.

GRC-specific reports, the board report and the Executive Risk Copilot live under [Governance & Compliance → GRC Reports](/docs/governance-and-compliance#grc-reports).

# Detection Rules & Context

Two pages control **what** Cy360 detects and **how seriously** it treats each detection:

- **Security Operations → Detection Rules** — every rule type in one place (log patterns, file-scanning rules, correlation, behaviour analytics, AI application catalogue) plus **Noise Tuning**.
- **Security Operations → Config → Detection Context** — business facts about your environment ("this is our patch tool", "this is the IT subnet") that let Cy360 score alerts in context **without switching rules off**.

Changes on both pages take effect immediately — no restart and no waiting for a scheduled reload. Rule changes are admin-only; analysts can view the rules for investigation context.

## Detection Rules

![Security Operations → Detection Rules](/docs-img/detection-rules.jpg)

### CyLogic (Sigma rules)

**What it is.** Log-pattern rules in the open **Sigma** format: the bundled CyAssure rules, a large imported SigmaHQ corpus (thousands of rules covering Windows, Linux, cloud and SaaS audit logs), and your own custom rules.

**How to use it.**

- Search by title, rule ID or ATT&CK technique and filter by source (*bundled*, *imported*, *custom*).
- The table shows each rule's level, MITRE ATT&CK techniques, log source and source; use the **Enabled** toggle to switch a rule on or off.
- **Refresh Corpus Now** re-reads the rule files on disk.
- **+ New Custom Rule** opens an editor for your own Sigma rule.

**Why it matters.** Sigma is the industry's shared detection language, so you can adopt community rules for new threats the day they are published.

### CyScan (YARA rules)

**What it is.** File-scanning rules used by the CyEDR agent's malware scan. The bundled CyAssure ruleset is shown read-only; add your own custom YARA rules for a specific threat (for example a zero-day's indicators). Custom rules are pushed to endpoints and used by **Run Scan** and the policy's CyScan setting.

### Correlation

**What it is.** Multi-event rules that link several alerts into an attack pattern — for example *identity sign-in risk followed by endpoint execution*, *credential theft followed by a privilege change*, *a DLP event after a compromise signal*, or *one person or machine with detections from three or more areas*. The built-in rules are listed with their ATT&CK tags and an on/off toggle; you can add custom correlation rules. Some correlation rules are *high-fidelity*: they block false-positive suppression and AI auto-close.

### UEBA

**What it is.** The behavioural detectors used by User and Entity Behaviour Analytics (UEBA), each with its anomaly type and MITRE ATT&CK tags. Toggle the built-in detectors on or off and add custom ones (each needs an anomaly-type label). The baselines these detectors compare against are viewed under [Investigations → Behavior Analysis](/docs/investigations#behavior-analysis-ueba) and managed in [Model Center](/docs/system-health#model-center).

### AI Applications

**What it is.** The catalogue of AI apps, domains and processes that Shadow AI detection looks for. Admins can add, edit or remove entries. New entries take effect immediately for server-side detection; installed CyEDR agents pick them up on their next catalogue refresh (within about 30 minutes) — no agent update needed.

### Noise Tuning

**What it is.** A table of the rules that open the most incidents per host over the last 1, 7, 30 or 90 days, with how many analysts marked false positive, how many the AI closed and how many are still open.

**How to use it.** For any row, pick a mode for *this host* or *all hosts* and click **Apply** (admin; takes effect for new alerts immediately and is audited):

| Mode | Behaviour |
|---|---|
| **Normal** | Alerts within 15 minutes on the same host join one incident; otherwise a new incident opens. |
| **Group 24h** | Opens an incident straight away; later alerts of this rule on the same host join it for 24 hours instead of opening new ones. |
| **Context only** | Never opens an incident. Added as supporting evidence to an incident already open on that host (or one that opens there within 24 hours); otherwise kept in Alerts only. For weak signals such as bandwidth or disk usage. |
| **Suppress** | Never linked to any incident. Still stored and searchable in Alerts. |

Some noisy sources ship with sensible defaults (for example TLS-fingerprint and DNS capture events are *Context only*; portal logins are *Group 24h*). Choose **Normal** to turn a default off. **Your noise settings** lists your overrides with **Remove**. Defaults apply to every tenant; overrides apply only to the tenant that set them.

**Why it matters.** Analysts burn out on duplicate incidents. Noise Tuning removes repetition without losing the evidence.

## Detection Context

![Security Operations → Config → Detection Context](/docs-img/detection-context.jpg)

**What it is.** "What's normal in your environment." Context is used to **score** alerts, never to suppress them: benign context can lower an alert's false-positive score by a bounded amount, while strong signals — a threat-intel hit, a command-and-control or exfiltration stage, a multi-step attack chain, a deception canary, a high-fidelity correlation rule — always override it.

Context comes from three layers: **inferred** (learned from your own telemetry, expires), **declared** (what you enter here) and **authoritative** (from Marketplace identity and HR/MDM packages). A higher layer wins, and a declared rejection blocks an inference. Context is per tenant; analysts can read it and admins can change it.

### Trusted Tools

Approved IT-management tools (remote management, deployment, admin utilities). Identify a tool by **SHA-256**, or by **code-signing publisher plus file name** (which survives version updates), with an optional expected path, notes and scope (whole tenant or specific users). A trusted tool lowers risk only when its parent process chain is also normal — PsExec launched by Word is never "trusted".

### Trusted Networks

Your internal and partner network ranges (CIDRs) — for example the IT admin subnet or a scanner's address.

### Maintenance Windows

Planned change windows, so expected activity during patching or deployments is scored accordingly.

### Privileged Users

Administrators and other high-privilege accounts. These are scored **more strictly**, not less.

### Host Roles

What each machine is for (domain controller, build server, jump host, database…), so activity that is normal for its role is understood.

### Suggestions

Facts Cy360 has inferred from your telemetry and proposes you confirm — for example a tool that runs on every IT workstation. Accept or reject each one.

### Conflicts

Where something you declared disagrees with what Cy360 observes — review and resolve them.

### Coverage

How much of your estate has context — which hosts, users and networks are described and which are not.

**Tip.** Table columns can be resized by dragging the header borders (double-click to reset). Widths are remembered in your browser.

**Why it matters.** Context is how you cut false positives *safely*: rather than disabling a rule because your patch tool triggers it, you tell Cy360 what the patch tool is — and the rule keeps catching attackers who use the same technique.

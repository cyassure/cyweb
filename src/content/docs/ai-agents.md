# AI Agents

**Security Operations → AI Agents** gives you AI analyst personas that investigate and act on your security data **under human oversight**. They triage incidents nobody picked up, review vulnerabilities, hunt, propose fixes, keep GRC answers current and write forensic investigation reports.

AI Agents is the **Automation Agents** add-on module (Enterprise). Analysts and admins can open the page; schedules and autonomy settings are admin-only. Agents need at least one AI provider configured in **Settings → AI Providers** and an AI Gateway mode other than *None*.

![Security Operations → AI Agents](/docs-img/ai-agents.jpg)

## The agents

| Agent | What it does |
|---|---|
| **SOC AI Agent — Tier 1** | First-line triage of ambiguous incidents no human picked up in time; investigates, then closes, escalates or opens a case. |
| **SOC AI Agent — Tier 2** | Case-level response for a confirmed incident; reviews the response plan and fires or declines it, or takes a targeted action. |
| **Vulnerability Scanner Agent** | Finds critical CVEs, correlates them with active incidents and writes a patch-priority report. |
| **Remediation Agent** | Reviews endpoint findings CyEDR can fix and proposes the built-in fix for each (up to 10 per run). |
| **GRC Compliance Agent** | Reviews compliance posture from live evidence and drafts or updates GRC answers. |
| **Threat Hunter Agent** | Reviews threat-hunt findings and can run an on-demand hunt sweep. It does not act on what it finds. |
| **Forensic Investigator** | Reconstructs who did what, from which PC and IP, when and how, and writes an evidence-cited investigation report. Never uses an external AI provider. |

Agents can delegate to one another; delegation always needs approval.

## Control modes

Every run has a control mode, chosen when you launch it:

| Mode | Behaviour |
|---|---|
| **Observe only** | Reads data, takes no actions. |
| **Recommend** | Proposes actions, never performs them. |
| **Require approval** (default) | Pauses before every write action until a person approves it. |
| **Autonomous** | Acts within what **Autonomy Tiers** allows for each tool. |

Start with *Recommend* or *Require approval*. A run can never exceed both its own mode **and** the autonomy tier of the tool it wants to use.

## Runs tab

1. Click **NEW RUN** (Launch Agent), pick the agent, type the task — for example *"Triage INC-00123 and recommend next steps"* — choose the control mode and click **Launch**.
2. For agents that handle personal data (Forensic Investigator, SOC Tier 2, GRC Compliance), Cy360 first asks **"Use external AI providers?"**. *Yes* sends this run's data to the providers in Settings → AI Providers; *No* keeps everything on your server and uses only a local model.
3. A run that wants to act stops at **PENDING_USER_APPROVAL**. Review it and **Approve** or **Deny**.
4. **DETAILS** on any run shows the request, every step (and why a step was skipped) and the agent's written output.

**Scheduled Runs** (admin): *New Schedule* → agent, task, control mode, days and time. Scheduled runs act as a system identity but still pause for approval unless a tool is explicitly loosened. Scheduled runs of personal-data agents have an *External AI providers* setting (default: not allowed).

## Investigations tab

Forensic investigation reports, for example for suspected fraud, data theft, credential misuse, malware, privilege abuse or sensitive data exposure.

1. **New investigation** → describe what was reported (no incident is needed) and add any concrete details: accounts, the application's domain, identifiers such as account numbers or file names, IP addresses, PCs, an incident, a time window and optionally the scenario.
2. **Start investigation** runs it and opens the report.

The report shows **who, from which PC and IP, and when** (each action mapped through the IP to the PC that held it and the person logged on), the timeline, explanations considered (insider misuse, the owner's own action, a compromised PC, an outside takeover), whether Cy360 alerted at the time (if not, a drafted — not enabled — detection rule), prevention advice, what could not be determined, and SHA-256 hashes for chain of custody. Download the **Report (.md)** and **Evidence (.json)**.

Every report is a **draft until reviewed**: *Approve* or *Reject* with a note. The analyst who started an investigation cannot approve it themselves. Share only approved reports.

Investigations also start automatically for new high/critical incidents in those scenario categories, and a nightly sweep flags accounts used from a PC where a different person was logged on. Attribution needs CyEDR on the PCs involved; activity from devices without the agent is listed under *What could not be determined*.

## Agent Principals tab

Each agent's identity and its least-privilege list of tools (created automatically on first run). **Revoke** cuts an agent off immediately.

## Autonomy Tiers tab (admin)

Per tool, choose **Auto**, **Approval**, **Recommend only** or **Blocked**. Write tools default to *Approval*. Proposal-only tools (such as proposing a remediation) default to *Auto*; *approve_remediation* defaults to *Recommend only*. Only loosen narrow, well-proven tools.

If you set *approve_remediation* to Auto, the **Remediation Agent** may approve its own proposals — but only low-risk, fully reversible, built-in fixes that need one admin, at most 20 a day per tenant. High/medium-risk, irreversible and custom fixes always wait for a person.

## Good to know

- **Rate limits.** If a run ends in ERROR mentioning "429" or "rate limit", the AI provider's quota ran out. Configure two or more providers in Settings → AI Providers so Cy360 can fail over.
- **Automatic investigations and personal data.** Whether automatic investigations may use external AI is decided once per tenant in **Settings → AI Providers → Personal data and external AI** (off by default).

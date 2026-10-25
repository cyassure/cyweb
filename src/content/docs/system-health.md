# System Health

**System Health** answers "is the platform itself working?" — the server, every integration, the audit record of who did what, the machine-learning models and the AI routing decisions. It has five pages: **Server Status**, **Audit Trail**, **Integration Health**, **Model Center** and **AI Routing**. **Notifications** and **Help** sit just below it in the sidebar.

## Server Status

![System Health → Server Status](/docs-img/server-status.jpg)

Live host metrics: host name, platform, uptime and CPU cores; **CPU**, **RAM** and **disk** usage and load average; the **database connection privilege** (Cy360 should connect as a least-privilege account so tenant-isolation policies are actually enforced — shown as *LEAST-PRIVILEGE*); and the top processes. **Refresh** reloads.

**Why it matters.** A full disk or exhausted memory is the most common cause of a slow or failing installation. Check here first.

## Audit Trail

![System Health → Audit Trail](/docs-img/audit-trail.jpg)

**What it is.** Every user activity, system event and configuration change — logins, setting changes, response actions, approvals, scheduled jobs, licence events — timestamped and searchable.

**How to use it.**

- Tiles show total events (30 days), successes, failures, authentication events, configuration changes and scan events.
- Search by event, e-mail or detail; filter by **category** (authentication, configuration, data, scan, security, system, other), **result**, **user** and a date range. The category counts under the filters are clickable.
- Expand a row for its full detail. Export with **CSV** or **JSON**.

**Why it matters.** Auditors (ISO 27001, SOC 2, NIS2, DORA) ask for proof of who changed what and when, and investigators need it after an incident.

## Integration Health

![System Health → Integration Health](/docs-img/integration-health.jpg)

**What it is.** The status of every Marketplace integration and playbook, external connection (CyTIM, SSO, secrets backend, OpenVAS, CyDataLake, the fleet heartbeat) and background refresh job. Checks run every 5 minutes; **Check Now** runs them immediately.

**How to read it.** Counters show **DOWN**, **OK** and **SKIPPED** (not installed or not configured). Cards are grouped into *Core Platform* (native AI pipeline, SOAR automation, correlation engine), *External Connections* and the installed integrations. A failing card shows the error, the number of consecutive failures and a link to the incident Cy360 created for it — unhealthy integrations raise Platform Health incidents automatically and close them when the check passes again.

## Model Center

![System Health → Model Center](/docs-img/model-center.jpg)

**What it is.** Every machine-learning and AI detection model running against your data — training status, health and lifecycle — in one place. Examples include per-user and per-host behavioural anomaly models (UEBA), the per-agent baseline for endpoint AI agents ([AI Security → AI Agents](/docs/ai-security#ai-agents)), the false-positive classifier, the DGA/C2 domain classifier, the command-line obfuscation classifier, TLS-fingerprint drift detection, semantic incident grouping, file-hash IOC detection, the AI triage judge and the compliance drift forecast.

### Statuses

| Status | Meaning |
|---|---|
| **Active** | Scoring live traffic and affecting real output (a score, a finding, a routing decision). |
| **Shadow** | Scoring live traffic but only logging — nothing downstream changes yet. Promote it to make it count. |
| **Instrumenting** | Collecting data, but there is no trainable model yet. |
| **Planned** | On the roadmap, no code yet. |
| **Disabled** | Turned off by an admin. Move it to Shadow to turn it back on without immediately affecting output. |

### Readiness

Each model has a readiness light computed from its real data: **Green** (enough data and its checks pass — safe to promote), **Amber** (some checks still open — review before promoting), **Red** (missing data or a prerequisite — Promote is blocked) or **Grey** (nothing to decide). Each model lists its checks and the next step, what promoting it changes in the product, and where its output shows up.

**Promote**, **Move to Shadow** and **Disable** take effect in the engine within 60 seconds, without a restart. New learned models start in shadow mode.

### Tabs

- **Registry** — the models, with status, readiness and details. *Federated Pretraining* (off by default) lets you contribute anonymised model weights — never raw data — to a fleet-wide baseline and pull it back to skip cold-starting.
- **Rollout Roadmap** — planned models and phases.
- **Governance Log** — every training run, promotion, demotion and held retrain, for accountability.
- **Baseline Rollbacks** — when an incident is confirmed, the behavioural baselines of the users and hosts involved roll back to a version trained before the attack, so it is not learned as normal. This tab lists each rollback; a global admin can **Revert** one.
- **Investigation Engine** — the status of the correlation engine's investigation pipeline (normalise/group/correlate/UEBA, AI narrative and hypotheses, gap analysis and evidence collection) and its accuracy statistics.

**Why it matters.** ML detections should earn their place: you see what each model would have done in shadow mode before it changes anything, and training is protected against poisoning (baselines learn only from data at least 7 days old, exclude activity around confirmed incidents and roll back automatically).

## AI Routing

![System Health → AI Routing](/docs-img/ai-routing.jpg)

An audit and cost trail of every native AI request: time, whether it was served **locally** or by an **external** provider, which provider and model, the feature that asked (for example *soc*) and **why** that route was chosen (for example *local LLM unavailable — falling back to external*). It is a record, not a control — change routing in Settings → AI Providers and AI Gateway.

**Why it matters.** It shows exactly where your data went for AI processing, which matters for privacy reviews and cost control.

## Notifications

Platform updates, agent updates, new Marketplace apps, licence events and CyAssure announcements. The sidebar badge shows the unread count.

## Help

![Help](/docs-img/help.jpg)

The running Cy360 version (with a shortcut to Settings → Updates & Upgrades), what's new in the release, and where to get support. For questions about the portal itself, ask **CyMind** (the green button) or read this documentation.

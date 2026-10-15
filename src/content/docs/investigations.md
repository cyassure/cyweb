# Investigations

The **Security Operations → Investigations** group holds the tools for digging below an incident into the raw evidence: **Alerts** (the CyDataLake event archive), **Threat hunting**, **Identity Timeline**, **Sandbox Analysis** and **Behavior Analysis (UEBA)**.

## Alerts (CyDataLake)

![Investigations → Alerts](/docs-img/alerts-datalake.jpg)

**What it is.** The raw, multi-vendor event archive: every CyEDR, attack-surface, log-collection and SIEM-connector event that flowed through the platform — **including events filtered out before they ever became a correlated alert**.

**Why it matters.** Incidents show what Cy360 decided was important. When you need to prove what happened (or that nothing happened), you need the full record. CyDataLake keeps it: 15 days on Community, 90 days on Enterprise, after which events are exported to cold storage.

**How to use it.**

- **Search** across the description and the full raw event.
- Filter by **Vendor** (EDR, network, collector, cloud, Marketplace packages such as `package.okta`…), **Rule ID**, **Agent / Host** and a **From / To** time range. **Clear** resets the filters.
- Click a row to expand the full raw event.
- **Advanced: Query Builder · Stats · Saved Searches** opens a field-level query builder, statistics on the matching events and searches you have saved for reuse.

Every alert in an incident links straight to its raw record here. Endpoint operating-system logs (journald/syslog, macOS Unified Log, Windows Event Log) appear once an Endpoint Defence policy with **Log Collection** is assigned.

## Threat hunting

![Investigations → Threat hunting](/docs-img/threat-hunting.jpg)

**What it is.** The proactive hunt engine's findings dashboard. Hunt rules look across all your data for patterns that single alerts miss — for example discovery bursts, persistent command-and-control signals, defence-evasion clusters, log or history clearing, deletion of shadow copies and backups, data staging, repeated initial-access attempts from one IP, DLP repeat offenders, lateral fan-out, cloud privilege changes and external reconnaissance scanning. The built-in rules cover 13 of the 14 ATT&CK stages.

**How it runs.** Automatically every 6 hours, or on demand with **Run Hunt Now**, which waits for the sweep and reports what it did: rules run, matches, new findings and any rules that failed. *0 matches* means no entity crossed a rule's threshold.

**What is on the page.** Tiles for total rules, active findings, critical/high findings, new findings in the last 24 hours and rules firing; the **Hunt Rules** list with each rule's window and description; and the findings themselves. Findings become incidents tagged with the rule's ATT&CK tactics, so they appear on the kill-chain views.

This page shows findings; it is not where you author endpoint rules. To create a custom detection for a specific threat, use [Detection Rules → CyScan](/docs/detection-rules-and-context#cyscan).

## Identity Timeline

![Investigations → Identity Timeline](/docs-img/identity-timeline.jpg)

**What it is.** One identity, every source, in chronological order — an Entra ID sign-in, an endpoint event, a cloud API call — in one view instead of three separate searches.

**How to use it.** Enter a user name or e-mail address, choose the time window (for example *Last 7 days*), decide whether to **Include device-inferred events** (events attributed to the person through the machine they were logged on to) and click **Search**.

**Why it matters.** Account-takeover and insider investigations hinge on the sequence of what one person did across systems. Cy360 recognises the same person however each source spells the name.

## Sandbox Analysis

![Investigations → Sandbox Analysis](/docs-img/sandbox-analysis.jpg)

**What it is.** Malware detonation through **CyTIM**, CyAssure's threat-intelligence service. CyTIM brokers a sandbox provider (for example Recorded Future Sandbox/Triage or Hybrid Analysis). Needs TIM Integration (Enterprise).

**How to use it.**

1. The status strip at the top shows the configured provider, whether file uploads are allowed and the size and daily limits.
2. Choose **File** (drag and drop, up to 100 MB), **URL** or **SHA-256**, add an optional note and click **Submit**. Known files are answered from existing verdicts first; only unknown ones are detonated.
3. **History** lists every submission — including those sent from incidents, cases and endpoint detections — with the result (**MALICIOUS / SUSPICIOUS / CLEAN** with a score), a link to the full report, the source and who submitted it. Running analyses update by themselves.

*"Not analysed yet"* means nobody has detonated that hash — upload the file itself. *"Not submitted"* means CyTIM's upload policy refused it (for example documents are not uploaded to a public sandbox by default, because public sandboxes publish samples).

You can also submit from an incident's threat-intel panel, from a case's IOCs or Evidence tab, and from an endpoint detection (**Check Hash**, **Upload Sample**, **Collect from Endpoint**). Verdicts flow back into threat-intel enrichment, so later incidents with the same hash pick them up.

## Behavior Analysis (UEBA)

![Investigations → Behavior Analysis (UEBA)](/docs-img/ueba.jpg)

**What it is.** User and Entity Behaviour Analytics: a rolling behavioural baseline per user (and per host). Accounts are automatically classified as **Human**, **Service** or **System**.

**How to use it.**

- The tiles show total accounts, how many are human/service/system, and how many have an active anomaly.
- **Users with active anomalies** are listed at the top — click one.
- Use the search box and the filters (*All Users*, *With Anomaly*, *Human*, *Service*, *System*, *Top 20 Activity*) to find an account.
- Selecting a user shows their profile, behavioural baseline (typical hours, volume, sources) and anomaly timeline.

**Why it matters.** Stolen credentials look legitimate to signature-based rules. Behaviour analytics notices when a legitimate account starts behaving unlike itself.

**Protection against poisoning.** Baselines learn only from activity at least 7 days old, leave out activity around confirmed incidents, and roll back automatically when an incident involving that user or host is confirmed — so an attacker cannot teach the model that the attack is normal. See [System Health → Model Center](/docs/system-health#model-center).

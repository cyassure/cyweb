# Endpoint Defence (CyEDR)

**CyEDR** is Cy360's endpoint detection and response agent: a single Go agent for Windows, macOS and Linux (x64 and ARM). It detects threats on the device, sends telemetry to Cy360, enforces policies (device control, application control, firewall, DLP) and carries out response and remediation commands. Endpoint Defence is a base module on every edition (Community covers up to 15 endpoints).

The section has five pages: **Fleet**, **Detections**, **Policies**, **Groups** and **Installers**.

## How it works

1. **Install** the agent with a one-line command and a deployment token.
2. The agent **self-enrols** with your Cy360 server.
3. Cy360 **pushes policies** to it.
4. The agent **streams telemetry** — behavioural detections, process, network, file and identity events — into the correlation engine and CyDataLake.
5. Cy360 sends **response and remediation commands**, which the agent picks up on its next check-in.

## Installers

![Endpoint Defence → Installers](/docs-img/edr-installers.jpg)

**To onboard an endpoint:**

1. Click **+ New Deployment Token**. Give it an optional description, an expiry in hours and a maximum number of uses. Copy the token now — it is shown only once.
2. Under **Quick Deploy**, select the token and the target platform (**Windows**, **Linux**, **macOS**, **iOS**).
3. Copy the generated one-line install command and run it on the endpoint as administrator/root. It detects the CPU architecture automatically.
4. The agent appears in **Fleet** within a minute.

The **Agent Package Matrix** lists native packages (MSI, DEB, RPM, PKG) for each OS and architecture, for software-distribution tools such as Intune, SCCM, Jamf or Ansible. The **Uninstall** tab gives the matching removal commands.

**Retired Python agent.** Endpoints still running the old Python agent show **LEGACY — REINSTALL** in Fleet. Re-run the install command on them; it replaces the old agent in place and keeps its configuration.

## Fleet

![Endpoint Defence → Fleet](/docs-img/edr-fleet.jpg)

**What it is.** Every enrolled agent with its state.

- **Tiles** — total agents, online, isolated, open detections, critical open, detections in the last 24 hours, automatic responses and **outdated agents**.
- **Table** — host name, OS, asset type, IP, network zone, detection count, agent version (with an **OUTDATED** badge when an update is due), last seen.
- **Row actions** — **Isolate**, **Scan** (on-demand malware scan) and **Forensics** (collect a forensic package).
- Filter by status (Active…) and search by host name or IP.

Clicking a row opens the device's [asset detail page](/docs/asset-management#the-asset-detail-page), whose **EDR Response** tab holds the forensic timeline, response commands and applied policies.

## Detections

![Endpoint Defence → Detections](/docs-img/edr-detections.jpg)

**What it is.** Behavioural detections from all enrolled endpoints, each with a severity, a confidence **score**, the host, the detection name and type, MITRE ATT&CK technique, status and time.

**How to use it.**

- Filter by severity, status (Open…), agent ID, or quick-filter by host name, rule or process.
- Expand a detection for its details — process, command line, file, user, network destination — and the **Sandbox (via CyTIM)** panel: **Check Hash**, **Upload Sample…** or **Collect from Endpoint** (the agent uploads the file on its next check-in). A malicious sandbox verdict raises the detection to critical.

**Deception canaries.** The strip above the filters shows **deception canary** activity: every Linux agent plants decoy credential files (a fake cloud credentials file and a fake SSH key backup) that nothing legitimate ever reads, so any access is a high-confidence detection. Always on, nothing to configure (Linux only for now). **Show canary detections** filters the list to them.

Detections also flow into Security Operations → Incidents, where they are correlated with other sources.

## Policies

![Endpoint Defence → Policies](/docs-img/edr-policies.jpg)

**What it is.** What the agent enforces and collects. A policy can cover several **categories**; filter the list by category with the chips at the top.

**How to use it.** **+ New Policy** → configure the categories you need → save. Then **Assign / Unassign** it to individual agents or to a group. Re-assigning an already-assigned target re-syncs the latest configuration. **Edit** and **Delete** are on each policy card. When a policy is removed from an endpoint, the endpoint falls back to another policy of the same category assigned to it, or to safe defaults.

| Category | What it controls |
|---|---|
| **Threat Prevention** | Real-time protection, behavioural AI, CyScan (YARA) scanning, ransomware rollback, sensitivity (Low / High / Aggressive), auto-quarantine |
| **Device Control** | USB, removable media, Wi-Fi, Bluetooth, camera, microphone (block or read-only) |
| **App Control** | Allow/block lists, publisher and hash rules, script-engine restrictions |
| **Network Control** | Host firewall, DNS sinkhole of command-and-control domains, the EDL blocklist, forced proxy (for example to send AI traffic through the AI Security Gateway) |
| **Exclusions** | Paths, processes, extensions, hashes and network addresses the agent ignores |
| **Update Policy** | Automatic updates, channel (stable / beta / LTS) and maintenance windows. By default agents update during a weekend window |
| **Isolation Exceptions** | Addresses and ports still reachable while a host is isolated |
| **Network Probe** | Makes this agent the scanner inside its network for Asset Management: subnet discovery, mDNS, SNMP, switch polling, segmentation tests and SSH deep scans |
| **Tamper Protection** | A password needed to stop or uninstall the agent |
| **Log Collection** | Ships OS logs (journald/syslog, macOS Unified Log, Windows Event Log) into CyDataLake |
| **Heartbeat** | How often the agent checks in; Shadow AI discovery |
| **Sandbox Sample Collection** | Uploads unknown files from detections at or above a chosen severity for sandbox detonation (off by default; at most once per file per day, 20 per hour) |
| **Data Protection (DLP)** | Watches files written to removable media, cloud-sync and chosen folders for sensitive data (off by default, monitor-only). See [Data Security](/docs/data-security) |

**Why it matters.** Policies are how you turn a detection-only agent into prevention — blocking USB storage, unknown scripts or known-bad domains — and how you collect the logs and data your investigations need.

## Groups

Group agents (for example *Servers*, *Finance laptops*, *Kiosks*) and assign policies to the group instead of agent by agent. Groups are also used by behaviour analytics as **peer groups**: a host's baseline is compared with its group's.

## Good to know

- **Agent updates.** Remediation scripts need agent 0.0.30 or later. Outdated agents update themselves in their maintenance window; change it with an Update Policy.
- **macOS permissions.** On macOS the agent needs Full Disk Access (granted through your MDM) to see process and file events.
- **Licence limit.** If you enrol more endpoints than your licence allows, the newest ones are suspended after a 30-day grace period. Check Settings → License.

# Response & Remediation

**Security Operations → Response** is where you act on endpoints: contain a threat right now (isolate a host, kill a process, block a file) and, separately, fix the weakness that let it in (patch a package, harden a setting) with an approval workflow. All actions run through the CyEDR agent on the endpoint.

The page has four tabs: **Response Console**, **Command History**, **Interactive Shell** and **Remediation**.

## Response Console

![Response → Response Console](/docs-img/response.jpg)

**What it is.** The place to send a containment action to one endpoint.

**How to use it.**

1. **Target Agent** — pick the endpoint.
2. **Action** — pick what to do (table below). A badge shows whether the action is **Reversible**, has **No Undo**, or is read-only.
3. **Reason / Note** — why, for example "Escalation from incident INC-0042". This goes into the audit trail.
4. Tick **Dry run** to see the predicted effect without executing anything.
5. Click **Issue Action**.

| Action | What the agent does |
|---|---|
| Isolate / Unisolate | Cuts the endpoint off the network except for Cy360 (and any isolation exceptions in its policy) / restores it |
| Kill Process | Terminates a running process |
| Block Hash | Adds a file hash to the agent's local blocklist so it can no longer execute |
| Quarantine File | Moves a file into the agent's quarantine vault |
| Rollback | Reverses changes made by a detected threat, using the ransomware-rollback protection in the endpoint's policy |
| Run Scan | Runs an on-demand malware scan with the CyScan file-scanning rules |
| Collect Forensics | Collects a forensic package from the endpoint |
| Collect Sandbox Sample | Uploads a file from the endpoint for sandbox detonation |
| Network Quarantine (NAC) | Asks your network access control system to quarantine the device (see Settings → Network Quarantine) |
| Disable User Account / Revoke Session Tokens | Identity containment for a compromised account |
| Throttle Process | Limits a process's resource use instead of killing it |

The agent picks up commands on its next check-in (seconds, depending on its heartbeat interval).

You can also respond from an incident's **Recommended response** panel and from an endpoint's **EDR Response** tab — they use the same mechanism.

## Blocking an IP at the WAF

If an AWS WAF, Azure Front Door WAF, F5 BIG-IP Advanced WAF or Imperva Cloud WAF package is installed from Marketplace, an incident's **Source IPs** section has **Block at WAF**: pick the WAF, click **Block** next to an IP and confirm. Cy360 adds the IP to the one block list it owns at the vendor — an AWS WAF IP set you create and reference from a Block rule, the Front Door policy's *CY360BLOCKLIST* custom rule, an F5 always-block IP exception, or the Imperva site's blacklist — and **Unblock** removes it. Nothing else in the WAF is changed. Analysts and admins only; every block and unblock is in the Audit Trail. You can also ask the AI Assistant to block an IP at the WAF.

## Command History

Every command sent to every endpoint with its status: **Pending** (waiting for the agent), **Acknowledged**, **Completed**, **Failed** or **Dry Run**, plus who issued it, when, and the agent's result. The history panel can be resized. Use it to confirm that an isolation actually took effect.

## Interactive Shell

**What it is.** A command shell on an endpoint, for hands-on investigation.

**Safety rules.** Admin only, and **only for hosts that are already Isolated** — this is enforced by the server, not just the page. Commands are queued and executed by the agent like any other response action; there is no live terminal stream, so each command's output appears a few seconds after it completes. Every command is audited.

**How to use it.** Isolate the host first, pick it under *Target Agent (must be Isolated)*, click **Open Shell Session**, type commands, and **Close** the session when you are done.

## Remediation

![Response → Remediation](/docs-img/response-remediation.jpg)

**What it is.** Fixes for what CyEDR finds on an endpoint — failed hardening (SCA) checks, vulnerable packages, changed files and detections — **proposed** by people or AI, **approved** by an admin, then **run and verified** by the agent using commands signed by your Cy360 server.

**Why it matters.** Containment stops an attack; remediation removes the weakness so it cannot happen again — with backups, verification and rollback so a fix never makes things worse silently.

The Remediation tab has four sub-tabs: **Open**, **History**, **Fixes** and **Settings**.

### Turn it on (Settings sub-tab, admin)

Remediation is **off by default, per tenant**. In **Settings**, tick *Allow remediation on this tenant's endpoints*, then review:

| Setting | Default | Meaning |
|---|---|---|
| Canary size | 1 endpoint | Endpoints that get the fix first; the rest wait until these succeed |
| Batch size | 10 | How many endpoints are fixed at a time after the canary |
| Stop rollout on failure | On | A failure halts the rollout until an admin resumes or cancels |
| Second-admin threshold | 10 endpoints | From this many endpoints a second admin must approve |

### Propose a fix

1. Open the device: **Asset Management → Network Assets →** the device → **Security Profile**.
2. In **SCA** (failed checks), **Vulnerabilities** or **FIM / Malware**, click the item → **Remediate…**
3. Cy360 suggests a built-in fix — for SCA, a signed script for the specific failed check on Linux, macOS and Windows (198 of 210 checks: SSH, kernel settings, permissions, password and audit policy, services, firewall, macOS sharing and update settings, Windows policies, Defender and more), each with a preview, a verification check and a rollback; the few that can't be scripted (firmware Secure Boot, FileVault, SIP, disk encryption, MDM enrolment and similar) show exact manual steps. Other fixes: a package upgrade via apt/dnf/yum/zypper, `winget` on Windows, restoring or quarantining a changed file, or kill process / block hash / log a user out for a detection.
4. Adjust the parameters, give a reason and click **Propose fix**. If no built-in fix fits, **Draft with AI** writes a script for you to review, edit and propose; a second admin always approves AI-drafted scripts.

Analysts propose; admins approve. Some settings cannot be changed safely by script (SELinux/AppArmor enforcing, FileVault, SIP, BitLocker, Credential Guard) — those show manual steps instead.

You can also propose fixes for a whole attack campaign (incident drawer → **Campaign → Propose fix for these hosts**) and from [Vulnerability Management → Remediation Plan](/docs/vulnerability-management#remediation-plan).

### Approve (Open sub-tab)

The **Open** sub-tab shows tiles for *Waiting for approval*, *Running* and *Halted*. Open an item to see exactly what will run — the fix script, the verification check and a read-only preview — plus the endpoints, the risk and whether it can be undone.

- **Run preview** runs the read-only preview on one endpoint first.
- **Approve & run** (admin) starts the rollout.
- A **second admin** — not the proposer — must approve when the fix is high risk, cannot be undone, is a custom or AI-drafted script, or targets many endpoints. Otherwise an admin may approve their own proposal; **Fix now** proposes and approves in one click.
- **Reject** (admin) or **Withdraw** (the proposer) closes it without changing anything.

### What the agent does

It only runs fixes signed by your Cy360 server, backs up every file the fix edits, runs the fix, **restores the backups automatically if the fix fails**, runs the verification check, and then re-checks the finding so it clears straight away. Results show as **Fixed**, **Ran but check failed**, **Failed** (with "files restored automatically" when backups were put back) or **Skipped**.

### History, rollback and fixes

- **History** lists finished, halted and cancelled remediations. **Roll back** (admin) restores the backups and runs the fix's rollback script on every endpoint it changed. Package downgrades only work while the old version is still in the repository; actions such as *kill process* have no undo.
- **Fixes** lists every available fix with what it fixes, the operating systems it supports, its risk and whether it can be undone. Built-in fixes accept only checked parameters — nothing free-form reaches the endpoint.

### Requirements

Script fixes need **CyEDR agent 0.0.30 or later**. Older endpoints are refused when you propose and are shown in amber; agents update themselves (by default during a weekend window — see the Update Policy in [Endpoint Defence](/docs/endpoint-defence#policies)). Devices without CyEDR cannot be remediated from Cy360.

The optional **Remediation Agent** (see [AI Agents](/docs/ai-agents)) can propose fixes on a schedule and — only if you allow it in Autonomy Tiers — approve its own low-risk, fully reversible built-in fixes.

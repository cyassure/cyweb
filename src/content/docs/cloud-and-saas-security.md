# Cloud & SaaS Security

**Cloud & SaaS Security** finds risky configuration and risky activity in your own cloud accounts and SaaS tenants. It is an Enterprise add-on module with four pages:

| Page | Answers |
|---|---|
| **Cloud Posture (CSPM)** | Is anything in our AWS / Azure / Google Cloud / Oracle / Hetzner / DigitalOcean accounts exposed or weakly configured? |
| **SaaS Posture (SSPM)** | Are our Microsoft 365, Google Workspace, Okta, GitHub, Slack and Salesforce tenants set up securely (MFA, admins, sharing)? |
| **Shadow IT** | Which SaaS apps are people using, and are they sanctioned? |
| **Cloud Apps (CASB)** | Is anyone mass-downloading files, creating "Anyone" links or sharing files with personal accounts? |

The accounts these pages read are listed in one place, **Settings → Connected Accounts** (each account, which modules use it, its last check and one on/off switch). Credentials are still added in the Marketplace. Files shared outside the organisation (formerly *Shared Files* here) are now under **Data Security → Data Access & Exposure → Shared files**, still licensed with Cloud & SaaS Security.

How it differs from the neighbouring features:

| Feature | Answers |
|---|---|
| Asset Management → **Cloud Inventory** | *What* do we run in the cloud? |
| Cloud & SaaS Security → **Cloud Posture** | *Is it exposed or weakly configured*? |
| Marketplace **cloud log connectors** (CloudTrail, Google Cloud, OCI Audit…) | *What is happening* in the account (activity → detections)? |
| AI Security → **Cloud Sensors** | Which AI workloads and services run in the cloud? |

## Cloud Posture (CSPM)

![Cloud & SaaS Security → Cloud Posture](/docs-img/cloud-posture.jpg)

**What it checks.** Read-only checks in your own cloud accounts.

*Public exposure:*

- public storage buckets (S3, Azure Blob, Google Cloud Storage, OCI);
- security groups, NSGs and firewalls open to the internet (for example SSH or RDP from anywhere);
- public databases (RDS, Azure SQL, Cloud SQL, DigitalOcean databases);
- public machine images and disk snapshots, servers with no firewall, public Kubernetes API endpoints.

*Data protection:* storage without a customer-managed key, access logging or versioning; unencrypted databases, snapshots and disks; storage accepting plain HTTP or old TLS; Cloud SQL without SSL.

*Identity and logging (CIS-style):*

| Cloud | Checks |
|---|---|
| AWS | root user without MFA or with access keys; IAM users who can sign in without MFA; access keys not rotated in 90 days; no or weak password policy (minimum length below 14); no multi-region CloudTrail trail logging; trails without log file validation |
| Azure | subscription Activity Log not exported; Defender for Cloud plans on the Free tier for servers, storage, SQL or Key Vault; more than 3 Owners on the subscription |
| Google Cloud | personal gmail.com accounts holding project roles; service accounts with Owner or Editor; service account keys older than 90 days; Data Access audit logs off |

**Compliance controls.** Every finding lists the ISO 27001 / SOC 2 / NIST CSF 2.0 / NIS2 / PCI DSS v4.0 / DORA controls it is evidence against — in the finding, in its incident and in GRC's exposure register.

**Why it matters.** A single open bucket, an SSH port open to the world or a root account without MFA is one of the most common causes of cloud breaches — and one of the easiest to fix once you know about it.

**Setup.** Cloud Posture reads every cloud account configured in **Marketplace → Cloud Asset Inventory**. All calls are read-only (List/Describe/Get); Cy360 never changes anything in your cloud. Least privilege: AWS *SecurityAudit* (it also covers the IAM credential report, password policy and CloudTrail status); Azure *Reader* on the subscription (also covers diagnostic settings, Defender pricing and role assignments); Google Cloud *iam.securityReviewer* + *compute.networkViewer* (the first also covers the project IAM policy, audit configuration and service account keys); a read-only Hetzner project token; a read-scoped DigitalOcean token.

**How to use it.**

1. Each provider card lists its accounts and how many findings each has. **Scan &lt;provider&gt;** or **Scan all providers** runs the checks now; they also run every 4 hours with the Cloud Inventory sync.
2. Tiles count critical, high, medium and low findings.
3. The **Findings** table shows severity, the finding, the resource, region, provider and account; open one for the recommendation, the compliance controls and the evidence.
4. Set the **Action** on each finding: *open*, *Remediated*, *Accepted* or *False Positive*.

**Incidents.** Open critical and high findings raise an exposure incident in Security Operations → Incidents (Security Hygiene tab). Marking a finding Remediated, Accepted or False Positive closes that incident the same way, and a finding that comes back reopens it.

## SaaS Posture (SSPM)

**What it checks.** The security settings of your SaaS tenants, once a day:

| Tenant | Checks | Connected through |
|---|---|---|
| Microsoft 365 / Entra ID | MFA required for everyone, legacy authentication blocked, admins with MFA, MFA registration, number of Global Administrators, "Anyone" links, guest invitations, user app consent | the Microsoft 365 account in Connected Accounts |
| Google Workspace | 2-Step Verification enforced, super admins with 2SV, number of super admins, inactive super admins | the Google Workspace account in Connected Accounts |
| Okta | MFA enrolment required, super admins with a strong factor, at most 4 super admins, password length 12+ | the **Okta** package (1.1.0 or later) |
| GitHub | 2FA required, at most 5 owners, base permission not write/admin, no public repository creation, secret scanning for new repositories | **GitHub Posture** package |
| Slack | owners/admins with 2FA, at most 5 owners/admins, channels shared with other organisations | **Slack Posture** package |
| Salesforce | users without an MFA method, at most 5 users with Modify All Data, passwords that never expire | **Salesforce Posture** package |

A check the account's permissions don't allow is listed under **Not checked** with the permission to grant — never reported as passed. Each finding carries its compliance controls; critical and high findings open incidents and reach GRC. **Scan now** runs the Microsoft 365 and Google checks; the packages run on their own daily schedule. The permissions each one needs are in [Integration Setup](/docs/integration-setup).

## Shadow IT

SaaS apps in use on your network — file sharing and transfer, paste sites, VPNs, messaging, developer tools, CRM and more — seen by the network DNS monitor and the firewall/proxy syslog listener and matched against Cy360's SaaS catalogue. One row per app with hosts, sources and a review: **sanctioned**, **blocked** (a label — block it on your proxy or firewall) or **dismissed**; a review sticks when the app is seen again. AI apps found by Shadow AI are listed too and reviewed in AI Security.

## Cloud Apps (CASB)

Risky file activity inside Microsoft 365 (SharePoint / OneDrive) and Google Drive, caught by Cy360's CASB policies:

| Policy | Fires when |
|---|---|
| Mass download | a user downloads 50 or more files in 10 minutes |
| Download burst by a new user | a user with no downloads in 30 days downloads 20 or more files in 10 minutes |
| Anyone link used heavily | one file's anonymous link is used 20 or more times in an hour |
| Anyone link created | a file or folder gets an anonymous / public link |
| Shared to a personal account | a file is shared with a gmail.com, outlook.com, yahoo.com, icloud.com or similar address |

Each policy fires once per user (or file) per window and opens an incident in category **casb**. The page shows the alerts per policy, per SaaS app and per user, the recent ones with a link to the incident, the Shadow IT review counts and whether each activity feed is connected:

- **Microsoft 365** — the Microsoft 365 log connector in Marketplace, with the *Audit.SharePoint* content type;
- **Google Drive** — the **Google Workspace Email DLP** package with *Send Drive activity* on (same Reports permission as its DLP rule events — nothing extra to grant).

Admins can tune the thresholds with the engine settings `CASB_MASS_DOWNLOAD`, `CASB_NEW_USER_DOWNLOAD` and `CASB_ANON_LINK_USES`.

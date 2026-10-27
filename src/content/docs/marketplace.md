# Marketplace

The **Marketplace** is where you connect Cy360 to the rest of your environment. **Every integration is a CyAssure-signed package**: log connectors, identity and context sources, cloud inventory, vulnerability sources, data-security connectors, threat-intel providers, AI cloud sensors, SaaS sharing connectors and automation playbooks. Cy360 verifies each package's signature every time it loads it.

![Marketplace](/docs-img/marketplace.jpg)

## Categories

| Filter | What you find there |
|---|---|
| **Integrations** | Log and detection connectors — cloud audit logs (AWS CloudTrail, Google Cloud, Oracle OCI, Azure/Entra ID, Hetzner, DigitalOcean), firewalls (Fortinet, Cloudflare WAF…), SaaS (Office 365, GitHub audit…), identity (Active Directory, Microsoft Entra ID, Okta), EDR/XDR feeds (Microsoft Defender XDR, CrowdStrike Falcon), e-mail security (Proofpoint TAP), Microsoft Purview DLP, MDM (Jamf, Intune) and the generic *Application Audit Log* connector |
| **AI Cloud Sensors** | Discover AI workloads and AI-service use in your cloud accounts |
| **Cloud Asset Inventory** | Cloud accounts used by Cloud Inventory and Cloud Posture (AWS, Azure, Google Cloud, Oracle, Hetzner, DigitalOcean) |
| **Data Security** | Database connectors for DSPM (PostgreSQL, MySQL/MariaDB, SQL Server, Snowflake, BigQuery) and DLP detection packs |
| **SaaS Sharing** | Microsoft 365, Google Workspace, Box and Dropbox connectors for Data Access & Exposure → Shared files |
| **Threat Intel** | Threat-intelligence providers |
| **Playbooks** | Automation playbooks |
| **SOAR** | SOAR platform add-on modules (global admin, Enterprise) |

Vulnerability sources (Harbor, Amazon Inspector, Defender for Cloud, Google Artifact Analysis, Dependency-Track, GitHub Dependabot) appear when you open the Marketplace from Vulnerability Management → Sources & Policy.

## Installing and configuring

1. Search by name, vendor or tag, or filter by category. Sort by name and direction.
2. Click **Install** on an item. It appears under **Installed on this server**, marked *Needs setup* (installed but not yet connected).
3. Click **Configure** and enter the credentials and options. Each item states the time it takes to configure and the exact permissions it needs — always use a read-only account where one is offered.
4. The item turns **Active** once it connects. Check it later in **System Health → Integration Health**.

For the exact permissions, licences and limits of AWS CloudTrail, Microsoft Entra ID, Office 365, Microsoft 365 Shared files, the SaaS Posture packages (Okta, GitHub, Slack, Salesforce) and the data activity packages (AWS S3, RDS PostgreSQL), see [Integration Setup Guides](/docs/integration-setup).

**Several instances.** Log connectors, identity packages and cloud accounts can hold several instances — one per firewall, per Active Directory forest, per Entra tenant, per GCP project. Once one exists, **Configure** lists them with **Manage**, **Disable**, **Delete** and **+ Add Another**. Each instance has its own name, credentials and health, and its alerts say which instance they came from.

**Remove** uninstalls an item.

**Beta items** are built against the vendor's documented API but not yet confirmed on a live tenant.

## Notable packages

- **Active Directory** and **Microsoft Entra ID** — the only source of identity threat detection (ITDR) and identity context. Install and configure them here.
- **Microsoft Purview (Endpoint DLP)** — alerts when a sensitive file leaves a device and sets each device's data sensitivity for risk scoring.
- **Jamf** and **Microsoft Intune** — also mark their managed devices as **MDM** in Network Assets.
- **Application Audit Log** — for an in-house or unsupported business application (banking portal, ERP, CRM) that exposes its audit trail as JSON over HTTPS. Configure the endpoint URL, authentication, where the event list is in the response, paging and the field paths for time, user, source IP and action (optionally outcome, target, amount, ID). **Test** reads one page and checks the mapping. Each event becomes an alert — sign-ins, failed sign-ins, financial actions (with high-risk destinations flagged), permission changes and data exports — so investigations can tie an action to a PC and the person logged on.

## Contributing and review

**+ Contribute to Marketplace** submits your own integration or playbook for review. Administrators approve or reject items submitted for inclusion; the banner at the top shows anything pending review.

## If the catalog is unavailable

The catalog is served by CyAssure's marketplace service. If it is unreachable, the page says so — items already installed keep working.

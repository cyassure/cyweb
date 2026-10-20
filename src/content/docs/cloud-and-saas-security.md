# Cloud & SaaS Security

**Cloud & SaaS Security** finds accidental public exposure in the places most organisations leak data today: their own cloud accounts and their SaaS file-sharing. It is an Enterprise add-on module with two pages: **Cloud Posture** and **Shared Files (SaaS)**.

How it differs from the neighbouring features:

| Feature | Answers |
|---|---|
| Asset Management → **Cloud Inventory** | *What* do we run in the cloud? |
| Cloud & SaaS Security → **Cloud Posture** | *Is it exposed* to the internet? |
| Marketplace **cloud log connectors** (CloudTrail, Google Cloud, OCI Audit…) | *What is happening* in the account (activity → detections)? |
| AI Security → **Cloud Sensors** | Which AI workloads and services run in the cloud? |

## Cloud Posture

![Cloud & SaaS Security → Cloud Posture](/docs-img/cloud-posture.jpg)

**What it is.** Read-only checks for public exposure in your own AWS, Azure, Google Cloud, Oracle Cloud, Hetzner and DigitalOcean accounts:

- public storage buckets (S3, Azure Blob, Google Cloud Storage, OCI);
- security groups, NSGs and firewalls open to the internet (for example SSH or RDP from anywhere);
- public databases (RDS, Azure SQL, DigitalOcean databases);
- public machine images and disk snapshots;
- servers with no firewall;
- public Kubernetes API endpoints.

**Why it matters.** A single open bucket or an SSH port open to the world is one of the most common causes of cloud breaches — and one of the easiest to fix once you know about it.

**Setup.** There is no separate setup: Cloud Posture reads every cloud account configured in **Marketplace → Cloud Asset Inventory**. All calls are read-only (List/Describe/Get); Cy360 never changes anything in your cloud. Each provider card states the extra read-only role it needs (for example GCP *iam.securityReviewer* + *compute.networkViewer*; a read-only Hetzner project token).

**How to use it.**

1. Each provider card lists its accounts and how many findings each has. **Scan &lt;provider&gt;** or **Scan all providers** runs the checks now; they also run every 4 hours with the Cloud Inventory sync.
2. Tiles count critical, high, medium and low findings.
3. The **Findings** table shows severity, the finding, the resource, region, provider and account. Filter by provider and severity.
4. Set the **Action** on each finding: *open*, *Remediated*, *Accepted* or *False Positive*.

**Incidents.** Open critical and high findings raise an exposure incident in Security Operations → Incidents (Security Hygiene tab). Marking a finding Remediated, Accepted or False Positive closes that incident the same way, and a finding that comes back reopens it. Medium findings (account-level settings) stay on this page only.

## Shared Files (SaaS)

![Cloud & SaaS Security → Shared Files (SaaS)](/docs-img/saas-shared-files.jpg)

**What it is.** Files and folders in **Microsoft 365** (OneDrive/SharePoint), **Google Workspace**, **Box** and **Dropbox** that are shared outside your organisation:

- **Public links** — anyone with the link can open the file;
- **Personal accounts** — shared to Gmail, Outlook.com, iCloud and the like;
- **External users/domains** — shared with partners, suppliers and ex-contacts.

Severity rises for folders, edit access and sensitive-looking file names, and falls for password-protected links.

**Privacy: metadata only.** Cy360 reads who a file is shared with, its name and location. It never downloads or reads file contents, and every permission it requests is read-only (for Google, the token used for files and sharing can't read contents; the optional `drive.readonly` scope is used only to list Shared Drives).

**How to use it.**

1. Providers and their credentials are set up in **Marketplace → SaaS Sharing**, with the exact steps for each admin console. **Add or manage in Marketplace** opens it.
2. Under **Connectors**, list **your internal domains** (shares to anything outside them are external) and the **maximum items per provider** (caps a first scan against a very large tenant). **Save settings**.
3. Click **Scan** on a provider or **Scan all configured**.
4. Review the **Findings** list (filter by provider, severity and type). Remove the share in the SaaS application (or from Data Security → Remediation, with DSPM), then set the finding to *remediated*, *accepted* or *false positive*.

**Google Workspace notes.**

- **Super admin email to impersonate** must be a real Workspace super-admin user (for example `admin@yourdomain`), not the service account's own `…iam.gserviceaccount.com` address.
- In the Google Admin console (**Security → API controls → Domain-wide delegation**), enter the scopes for the service account's client ID as one comma-separated list:

  ```
  https://www.googleapis.com/auth/drive.metadata.readonly,https://www.googleapis.com/auth/admin.directory.user.readonly,https://www.googleapis.com/auth/admin.directory.domain.readonly
  ```

- To scan **Shared Drives**, also add `https://www.googleapis.com/auth/drive.readonly`. Google only allows that scope to list Shared Drives. Without it, Cy360 scans My Drive and marks the Google result *partial*. Shared Drives the super admin isn't a member of are skipped and named in the result.

**Incidents.** Critical and high sharing findings raise exposure incidents (drawer source "Cloud & SaaS Security → Shared Files"), and with AI Agents licensed they are investigated automatically with the *Sensitive data exposure* playbook.

# Integration Setup Guides

Each Marketplace integration needs two things before data flows: **the vendor side** (an account, permissions and sometimes a licence or plan) and **the Cy360 side** (the package installed and configured). An integration that is installed but missing either side shows no data. This page lists both sides, plus the limits worth knowing, for the most-used log and SaaS integrations.

For the general install flow see [Marketplace](/docs/marketplace). To check that an integration is working see [Checking that data arrives](#checking-that-data-arrives) below.

## Best practices for every integration

- **One dedicated, read-only identity per integration.** Never reuse a person's account, an admin key or the app registration Cy360 uses for SSO sign-in. Then removing or rotating one integration can't break anything else, and the vendor's own audit log shows exactly what Cy360 did.
- **Least privilege.** Grant only the permissions listed below. Every integration on this page needs read access only.
- **Restrict where the credential can be used.** Where the vendor allows it, limit the credential to your Cy360 server's outbound IP address (AWS IAM `aws:SourceIp` condition, GitHub IP allow lists, Microsoft Entra Conditional Access for workload identities).
- **Track expiry and rotate.** Client secrets and tokens expire (Microsoft: at most 24 months; GitHub fine-grained tokens: the date you choose). Put the expiry date in your calendar, create the new secret before the old one expires, paste it in **Configure**, press **Test Connection**, then delete the old one.
- **One instance per scope.** Add a separate instance (**Configure → + Add Another**) per AWS region, Microsoft tenant or GitHub organisation, each with its own name, so alerts and health say exactly where they came from.
- **Test before you trust.** **Test Connection** checks sign-in, and for some packages a sample read. Some permissions are only exercised on the first real poll, so check **Integration Health** after one poll interval as well.
- **Don't leave items on *Needs setup*.** An installed item without credentials collects nothing. Integration Health lists it as *Installed — no SIEM connector configured yet*. Configure it or remove it.
- **Watch Integration Health.** An integration that fails repeatedly raises an incident automatically. Fix the cause rather than closing the incident, because a silent log source is a blind spot.

## AWS CloudTrail

Pulls AWS management events (console sign-ins, IAM changes, API calls that create, change or delete resources) using CloudTrail's **LookupEvents** API. It needs no S3 bucket or trail setup, because AWS keeps the last 90 days of management events for every account automatically.

**On the AWS side**

1. In IAM, create a dedicated user, for example `cy360-cloudtrail-reader`, with programmatic access only (no console password).
2. Attach this policy. `LookupEvents` doesn't support resource-level permissions, so `Resource` must be `*`:

   ```json
   {
     "Version": "2012-10-17",
     "Statement": [{
       "Effect": "Allow",
       "Action": "cloudtrail:LookupEvents",
       "Resource": "*",
       "Condition": { "IpAddress": { "aws:SourceIp": "<your Cy360 server's public IP>/32" } }
     }]
   }
   ```

   The `Condition` block is optional but recommended. AWS's managed policy `AWSCloudTrail_ReadOnlyAccess` also works, but grants more than Cy360 needs.
3. Create an access key for the user and note the Access Key ID and Secret Access Key.

**On the Cy360 side**

1. **Marketplace → AWS CloudTrail → Install → Configure.**
2. Enter the Access Key ID, the Secret Access Key and the **region**.
3. **Test Connection** reads one event. It fails with `AccessDeniedException … cloudtrail:LookupEvents` if the policy is missing or the source-IP condition doesn't match.

**Limits and best practice**

- **One region per instance.** LookupEvents only returns events from the configured region. Add one instance per region you use, and **always one for `us-east-1`**, which records the global services (IAM, STS, CloudFront, Route 53). Without it, IAM user and key changes are missed if your workloads run elsewhere.
- **Management events only.** Data events (S3 object reads and writes, Lambda invocations) are not returned by LookupEvents. Turn them on with a CloudTrail trail if you need them.
- Polled every 5 minutes, up to 2,000 events per poll. AWS limits LookupEvents to 2 requests per second per account and region, so don't point other tools at the same API with the same user.
- Rotate the access key at least every 90 days. Consider AWS Organizations, so that a new account's CloudTrail is set up consistently.

## Microsoft Entra ID

One package for Microsoft identity:

- **Logs:** sign-in logs and directory audit logs.
- **Detections:** a privileged role member added, an application credential added, a PIM role activated, a Conditional Access policy changed.
- **Identity context:** who is an administrator (PIM-eligible included), account status, title, department, manager and trusted named locations. On Enterprise, also sign-in risk and MFA strength.

It replaces the older *Azure AD (Entra ID)* log connector.

**On the Microsoft side**

1. **Entra admin center → Identity → Applications → App registrations → New registration.** Name it, for example, "Cy360 Entra ID integration", and choose *Accounts in this organizational directory only*. Use a **dedicated** app, never the one Cy360 SSO sign-in uses.
2. **API permissions → Add a permission → Microsoft Graph → Application permissions:**

   | Permission | Used for |
   |---|---|
   | `AuditLog.Read.All` | Sign-in and directory-audit logs, MFA registration report |
   | `Directory.Read.All` | Users, managers, group membership, directory roles |
   | `RoleManagement.Read.Directory` | Role members, PIM activations and eligibility |
   | `Application.Read.All` | Application credential changes |
   | `Policy.Read.All` | Conditional Access policies and named locations |
   | `IdentityRiskyUser.Read.All` *(optional, Enterprise)* | Sign-in risk |

3. Click **Grant admin consent**. Every permission must show a green tick.
4. **Certificates & secrets → New client secret.** Copy the *Value* straight away, because it is shown only once. Choose an expiry and record it.
5. From **Overview**, copy the Directory (tenant) ID and the Application (client) ID.

**Microsoft licensing.** Directory audit logs work on every tenant. **Sign-in logs, the MFA registration report and PIM need Entra ID P1 or P2**, and Identity Protection risk needs P2. Without them those parts are skipped and the rest keeps working.

**On the Cy360 side**

1. **Marketplace → Microsoft Entra ID → Install → Configure.** Enter the tenant ID, client ID and client secret. Optionally list extra administrator role template IDs to treat as privileged.
2. **Test Connection** checks that a token can be issued. Missing Graph permissions show up on the first poll, in Integration Health.
3. If you still have the old **Azure AD (Entra ID)** connector, it stops being polled once this package is enabled. Delete it afterwards. Until the package is installed, that old connector reports *No signed Marketplace package installed* and collects nothing.

**Limits and best practice**

- Polled every 20 minutes. The first detection poll records a baseline, so detections start from the next change onwards.
- Add one instance per Microsoft tenant.
- Optionally limit the app with a Conditional Access policy for workload identities to your Cy360 server's IP. This needs the Workload Identities licence.

## Office 365 (Microsoft 365 audit logs)

Pulls the Microsoft 365 unified audit log through the **Office 365 Management Activity API**: Exchange, SharePoint and OneDrive, Teams and general activity, Entra sign-in activity, and Purview DLP events.

**On the Microsoft side**

1. Make sure auditing is on: **Microsoft Purview → Audit**. If it offers *Start recording user and admin activity*, click it. Records can take up to 24 hours to appear after you switch it on.
2. Create a **dedicated** app registration as above.
3. **API permissions → Add a permission → Office 365 Management APIs → Application permissions:** `ActivityFeed.Read`, and **`ActivityFeed.ReadDlp`** if you collect DLP events (the default). Grant admin consent.
4. Create a client secret and note the tenant ID, client ID and secret.

**On the Cy360 side**

1. **Marketplace → Office 365 → Install → Configure** with the tenant ID, client ID and secret.
2. **Test Connection** checks that the app may use the Management Activity API, not only that it can sign in.
3. **Content types** defaults to all five: `Audit.AzureActiveDirectory`, `Audit.Exchange`, `Audit.SharePoint`, `Audit.General` and `DLP.All`. Each content type is read separately:
   - If the app may not read one (typically `DLP.All` without `ActivityFeed.ReadDlp`), that type is skipped and the others keep flowing.
   - The connector then shows **partial**: an amber dot in Marketplace, *degraded* in Integration Health, and the reason underneath.
   - Grant the permission and the skipped type catches up on the last 7 days. If you don't want DLP events, remove `DLP.All` instead.
4. Cy360 subscribes to each content type on its first poll. Microsoft can take several hours to deliver the first records after a new subscription, so an empty result on day one is normal.
5. Package 2.0.0 failed the whole poll when any content type was unreadable. If yours shows 2.0.0, update it from Marketplace.

**Limits:** polled every 5 minutes, in windows of up to 24 hours. Microsoft usually publishes audit records 30 to 90 minutes after the activity, sometimes longer.

**Also feeds:** with `Audit.SharePoint` on, SharePoint/OneDrive file activity drives the CASB policies on Cloud & SaaS Security → **Cloud Apps** (mass downloads, Anyone links, shares to personal accounts) and Data Security → DSPM → **Data Activity** (who opened, downloaded, changed or shared which site's files).

## Microsoft 365 — Shared Files (SaaS Sharing)

Not a log source. It scans OneDrive and SharePoint for files shared publicly, with external users or with personal accounts. It reads metadata only. With the Data Security add-on, the same app also lets DSPM classify file contents. Results appear in **Data Security → Data Access & Exposure → Shared files**. The account is listed in Settings → Connected Accounts and also drives **SaaS Posture** (below).

**On the Microsoft side**

1. The tenant needs a **SharePoint Online** licence, which most Microsoft 365 business plans include. Without one there is no OneDrive or SharePoint at all. The scan then reports Microsoft 365 as **not applicable** (hover for the reason). That isn't an error and raises no incidents.
2. Create a dedicated app registration with these Microsoft Graph **application** permissions, then grant admin consent: `Files.Read.All`, `Sites.Read.All` and `User.Read.All`. `Domain.Read.All` is optional and detects your internal domains automatically.
3. Create a client secret.

**On the Cy360 side**

1. **Marketplace → SaaS Sharing → Microsoft 365**, or **Data Security → Data Access & Exposure → Shared files → settings**. Enter the tenant ID, client ID and secret, and your internal domains if `Domain.Read.All` isn't granted.
2. *Exhaustive mode* checks every item. It is thorough but slow on large tenants, so leave it off unless you need it.
3. Run a scan and check that the run shows *items seen* above zero.

**SaaS Posture (SSPM)** uses the same app. Add the Graph application permissions `Policy.Read.All` (security defaults, Conditional Access, authorization policy), `AuditLog.Read.All` (MFA registration), `RoleManagement.Read.Directory` (Global Administrators) and `SharePointTenantSettings.Read.All` (Anyone-link setting). A check whose permission is missing is listed as *not checked* with the permission to grant.

**Best practice:** `Files.Read.All` lets the app read every file in the tenant, which is a sensitive permission. Keep this app separate from the others, give its secret the shortest practical expiry, and restrict it with Conditional Access for workload identities where you can.

## Microsoft 365 Email DLP (mailbox scan)

Scans every message users send in Exchange Online with Cy360's DLP engine — the same detection packs, Exact Data Match, fingerprints and classification as endpoints and the mail relay. No Purview licence needed. Detection happens after sending; to hold or block mail before it leaves, use the [mail relay](/docs/data-security#email-dlp).

**On the Microsoft side**

1. Create a **dedicated** app registration (not the Cy360 SSO app) and a client secret.
2. **API permissions → Microsoft Graph → Application permissions:** `Mail.Read` (reads each sent message) and `User.Read.All` (lists mailboxes). Optional: `GroupMember.Read.All` if you limit the scan to a group, and `Domain.Read.All` so Cy360 can find your verified domains when you leave *Internal email domains* empty. Grant admin consent.
3. Recommended: `Mail.Read` reaches every mailbox in the tenant, so restrict the app to the mailboxes you scan with an Exchange Online application access policy (`New-ApplicationAccessPolicy -AccessRight RestrictAccess`) or RBAC for Applications.

**On the Cy360 side**

1. **Marketplace → Microsoft 365 Email DLP (mailbox scan) → Install → Configure** with the tenant ID, client ID and secret, and your internal email domains (so Cy360 can tell internal from external recipients).
2. Optional: limit to certain mailboxes or one Entra group, report internal-only mail too, choose the minimum classification to report, and turn on OCR of images and scanned PDFs (Enterprise).
3. **For a trial or data-leak assessment**, set *Assessment: on the first run, scan mail sent in the last N days* (1–90). Otherwise the first run looks back *First run: scan mail sent in the last N hours* (up to 168).

The package is read-only — it never moves, changes or deletes mail. Messages are scanned in memory; only detector names, counts, item names, sender, recipients and a masked subject reach the event. Polled every 15 minutes; findings appear in Data Security → DLP Activity and Incidents.

## Google Workspace Email DLP

Two parts you can turn on separately: a **Gmail sent-mail scan** with Cy360's DLP engine, and an **import of Google's own Admin-console DLP rule events** (Gmail, Drive, Chat).

**On the Google side**

1. In Google Cloud, create a service account, enable the **Gmail API** and the **Admin SDK API** on its project, and create a JSON key.
2. In the Admin console: **Security → Access and data control → API controls → Manage domain-wide delegation → Add new**, with the service account's client ID and these scopes:
   - `https://www.googleapis.com/auth/gmail.readonly` (sent-mail scan, impersonating each user)
   - `https://www.googleapis.com/auth/admin.directory.user.readonly` (list users)
   - `https://www.googleapis.com/auth/admin.reports.audit.readonly` (DLP rule events)
3. The admin email you enter must be a super admin, or an admin with Reports and Users read privileges. Workspace DLP rule events need data-protection rules in the Admin console (Enterprise / Education editions).

**On the Cy360 side**

1. **Marketplace → Google Workspace Email DLP → Install → Configure** with the admin email, the JSON key and your internal email domains.
2. Turn off *Scan sent mail* or *Import Workspace DLP rule events* if you only want one. `gmail.readonly` reaches every mailbox — list *Only these mailboxes* to narrow the scan.
3. The same options as Microsoft 365: internal-only mail, minimum classification, OCR, and *Assessment … last N days* (1–90) for a trial.

Read-only, scanned in memory, polled every 15 minutes; findings appear in Data Security → DLP Activity and Incidents.

**Drive activity** (*Send Drive activity*, on by default, same `admin.reports.audit.readonly` scope — nothing extra to grant): Drive downloads, views, edits, copies, deletions and sharing changes feed Cloud & SaaS Security → **Cloud Apps** (CASB policies) and Data Security → DSPM → **Data Activity**. The activity itself never becomes an alert; only a CASB policy or a data-access alert does. Starts from the first run, no backfill. Needs package 1.2.0 for views/edits/copies/deletions.

## GitHub Audit Logs

Pulls the organisation audit log: membership and team changes, repository creation, deletion and visibility changes, OAuth and GitHub App access, admin actions and, optionally, Git events.

**On the GitHub side**

1. **Plan requirement: GitHub Enterprise Cloud** (including Enterprise Managed Users). The audit-log API doesn't exist for Free, Pro or Team organisations, whatever the token: GitHub answers *404*.
2. The token must belong to an **organisation owner**. Create a dedicated machine user that is an owner if you don't want to tie it to a person.
3. Create a token, either:
   - **Fine-grained token (recommended):** Resource owner = your organisation; Organization permissions → **Administration: Read-only**; set an expiry. If the organisation requires approval for fine-grained tokens, an owner must approve it.
   - **Classic token:** scope **`read:audit_log`** only.
4. If the organisation uses an IP allow list, add your Cy360 server's outbound IP.

**On the Cy360 side**

1. **Marketplace → GitHub Audit Logs → Install → Configure.**
2. Enter the organisation login (as in `github.com/<org>`), the token and the event type: `web` (non-Git events), `git` (Git events) or `all`. `web` is the most useful for security; add `git` if you need clone and push activity.
3. **Test Connection.** A 404 means the organisation isn't on Enterprise Cloud.

**Limits:** polled every 5 minutes, up to 2,000 events per poll (20 pages of 100), oldest first. Events are never delivered twice. GitHub limits this API to 1,750 queries per hour per user and IP. Package 2.0.0 read only 100 events per poll, so update it from Marketplace if yours shows 2.0.0.

## SaaS Posture packages (Okta, GitHub, Slack, Salesforce)

Daily security-setting checks shown on Cloud & SaaS Security → **SaaS Posture**, next to the Microsoft 365 and Google ones (Cloud & SaaS Security licence). Each install is one account on the page; a check its token can't run is listed as *not checked* with what to grant. Read-only.

| Package | Vendor side | Checks |
|---|---|---|
| **Okta** (1.1.0+, the same package as identity context) | an API token of a service user with only the **Read-Only Administrator** role | MFA enrolment required, super admins with a strong factor, ≤ 4 super admins, password length ≥ 12 |
| **GitHub Posture** | a personal access token of an **organisation owner**: classic `read:org`, or fine-grained with organisation *Administration* and *Members* read-only (GitHub shows the 2FA, repository-creation and secret-scanning settings to owners only) | 2FA required, ≤ 5 owners, base permission not write/admin, no public repository creation, secret scanning for new repositories |
| **Slack Posture** | a Slack app installed by an owner/admin with user-token scopes `users:read`, `channels:read`, `groups:read`; paste its **User OAuth Token** (`xoxp-…`) — a bot token can't see 2FA | owners/admins with 2FA, ≤ 5 owners/admins, channels shared with other organisations |
| **Salesforce Posture** | a Connected App (or External Client App) with the **client credentials flow**, `api` scope, and a run-as user with *View Setup and Configuration* and *Manage Users*; enter the My Domain URL, consumer key and secret | users with no MFA method (SSO-only users get MFA at the identity provider — accept the finding there), ≤ 5 users with Modify All Data, no "Password Never Expires" |

## Data activity packages (AWS S3, RDS PostgreSQL)

Who touched which data store, for Data Security → DSPM → **Data Activity** and the data-access alerts. Only names reach Cy360 (bucket, object key, table, the calling principal), never content or SQL. The first run starts from now — no backfill.

**AWS S3 Data Activity**

1. In CloudTrail, edit (or create) a trail: **Data events → S3**, read and write, for all buckets or the sensitive ones. AWS bills data events per 100,000 events.
2. Give a read-only principal `s3:ListBucket` on the trail's log bucket (prefix `AWSLogs/<account>/CloudTrail/`), `s3:GetObject` on its files, and `kms:Decrypt` if the trail uses SSE-KMS.
3. In Cy360: the trail bucket, its prefix, the account ID and the regions to read. Polled every 15 minutes; activity is matched to DSPM's S3 buckets by name.

**RDS PostgreSQL Data Activity (pgaudit)**

1. In the instance's DB parameter group add `pgaudit` to `shared_preload_libraries` and set `pgaudit.log = 'read,write'`; reboot; run `CREATE EXTENSION pgaudit;` in each database. Keep RDS's default `log_line_prefix`.
2. Give a read-only principal `rds:DescribeDBLogFiles` and `rds:DownloadDBLogFilePortion` on the instance — no database login is used.
3. In Cy360: the DB instance identifier, region and endpoint — the same host as DSPM's PostgreSQL connection, so the activity is weighted by that database's sensitivity.

**Windows file servers** are not a package: turn on **File-share audit** in a CyEDR Log Collection policy assigned to the server, and enable the audit subcategory on it: `auditpol /set /subcategory:"Detailed File Share" /success:enable`.

## Checking that data arrives

1. **Marketplace:** the item shows **Active**, not *Needs setup*.
2. **System Health → Integration Health:** the integration is *OK*, with a recent last check and no error. Errors quote the vendor's message, for example *not authorized to perform cloudtrail:LookupEvents*. **Degraded** with a reason means some sources were read and some weren't (for example one Office 365 content type). Fix the permission it names. **Marketplace → Configure** shows the same reason under each instance.
3. **CyDataLake:** filter by the vendor (`aws`, `azure`, `office365`, `github`) for the last hour. Raw events appear here even when none of them became an alert.
4. **Incidents:** alerts from these sources go through correlation like any other source, so quiet periods with no incidents are normal.

## Common errors

| Message | Cause | Fix |
|---|---|---|
| `AccessDeniedException … cloudtrail:LookupEvents` | The IAM user lacks the permission, or a source-IP condition doesn't match | Attach the policy above, and check the server's outbound IP |
| *No signed Marketplace package installed for this azure connector* | An old Azure AD connector, and the Microsoft Entra ID package isn't installed | Install and configure **Microsoft Entra ID**, then delete the old connector |
| `Authentication_RequestFromNonPremiumTenantOrB2CTenant` | Sign-in logs need Entra ID P1/P2 | Expected on free tenants. Directory audits still arrive |
| `Insufficient privileges` / `Authorization_RequestDenied` | Graph permission missing or admin consent not granted | Add the permission and click **Grant admin consent** |
| Office 365 *partial*: *DLP.All: not allowed (403)* | `ActivityFeed.ReadDlp` not granted. The other content types still arrive | Grant it, or remove `DLP.All` from the content types |
| Shared files: Microsoft 365 *not applicable* | No SharePoint Online in the Microsoft tenant | Licence SharePoint Online, or don't use Shared files for that tenant |
| Item listed as *Installed — no SIEM connector configured yet* | Installed in Marketplace but never configured | Open it in Marketplace and click **Configure**, or remove it |
| GitHub *404* | The organisation isn't on GitHub Enterprise Cloud | Upgrade the plan. The API isn't available on other plans |
| GitHub *401* / *403* | Token expired, not an owner, wrong permission, or the org's IP allow list | Re-create the token as an organisation owner with **Administration: Read-only** (or classic `read:audit_log`), and check the allow list |
| `AADSTS7000215` / `invalid_client` | Wrong or expired client secret | Create a new secret and update **Configure** |

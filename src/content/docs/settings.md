# Settings

**Settings** holds all platform configuration as tabs. Some tabs are **install-wide** — they affect every tenant and only the **global administrator** (the built-in *admin* role) can change them. Others are **per tenant** — each tenant's admins set their own values. Tabs only appear when your role and the licence allow them.

![Settings → Updates & Upgrades](/docs-img/settings-updates.jpg)

| Tab | Scope | In one line |
|---|---|---|
| Updates & Upgrades | Install-wide | Update or upgrade Cy360 from the browser |
| License | Install-wide | Edition, limits, modules, licence upload and activation |
| Organization Domain | Install-wide | The hostname and port Cy360 itself runs on |
| Exposure Monitoring | Per tenant | The tenant's attack-surface domain, scan schedule and ownership proof |
| Connected Accounts | Per tenant | Every cloud, SaaS and database account the tenant connected, in one list |
| Data Security | Per tenant | DSPM scanning, connections and in-environment scanners (DSPM licence) |
| Environment Config | Install-wide | Advanced platform configuration variables |
| Secrets Vault | Install-wide | Where Cy360 reads secrets from |
| AI Providers | Per tenant (local LLM install-wide) | Which AI models Cy360's AI features use |
| AI Gateway | Per tenant | AI mode for the tenant: None, Local or Cloud |
| Threat Intelligence (TIM) | Install-wide | Threat-intel enrichment and the EDL blocklist feed |
| MCP Management | Per tenant (server switch install-wide) | Two-way MCP: other tools into Cy360, Cy360 out to other platforms |
| FP Auto-Close | Per tenant | Threshold for closing likely false positives automatically |
| SLA Thresholds | Per tenant | Target response times per severity |
| Network Quarantine (NAC) | Per tenant | The tenant's network access control provider |
| Exposure Recurrence | Per tenant | When a recurring-exposure incident is raised |
| Exposure Ticketing | Per tenant | Jira / ServiceNow / webhook for exposure tickets |
| Scheduler | Install-wide | Scheduled maintenance and backup jobs |
| Users & Roles | Install-wide | Accounts, approvals and custom roles |
| Tenant Management | Install-wide | Tenants, cross-tenant access and SSO domains |
| SSO & Email | Install-wide | Single sign-on providers, SCIM and SMTP |
| Backup & Restore | Install-wide | On-demand backups and restore |
| Knowledge Base | Per tenant | Documents CyMind can cite |

## Updates & Upgrades

- **Run Update** — pulls the latest images for your currently pinned version and recreates containers (`docker compose pull && up -d`). Configuration and data are preserved.
- **Run Upgrade** — checks for the latest release, re-pins to it, pulls the new images and recreates containers. Use it to move to a new version, including major releases. Configuration and data are preserved.

These buttons need the optional self-update sidecar (on by default; see the [Deployment Guide](/docs/docker-deployment)). Without it, the page shows the commands to run on the server. Before each update, container logs are archived on the server for 30 days, and old images are cleaned up afterwards so the disk does not fill.

## License

Shows the customer, days remaining, status, admin/analyst users and EDR agents used versus licensed, CyDataLake retention, AI/TIM integration and the **modules** included. *Licensed assets & seats* lets you see — and suspend — individual agents and seats if you are over the limit.

- **Upload** a renewed `.lic` file — it activates immediately, no restart.
- **Instance activation** — each licence is bound to this installation. Cy360 checks in with CyAssure daily. Without internet access, use **Copy activation request** and **Upload offline activation**. **Check in now** retries immediately.
- Without a licence, Cy360 runs **Community Edition** permanently. If an Enterprise licence lapses or fails validation, a 30-day grace period runs on the last valid entitlement, then the instance falls back to Community limits — data is kept. Over the seat or asset limit, a 30-day grace runs, then the newest extra seats/agents are suspended.

## Organization Domain

The hostname (and port) the platform itself is reached on — used for cookies, SSO and OAuth callback URLs and agent connections. Changing it rewrites the platform configuration and restarts the stack (usually 15–30 seconds). This is not the domain you monitor for attack-surface exposure — that is the next tab.

## Exposure Monitoring

Per tenant: the **exposure domain** the tenant's attack-surface scans monitor, the **scan schedule** (daily, weekly or monthly, hour in UTC, scan type) and **Domain and IP Ownership Verification** (DNS TXT record or website file). Saving creates the tenant's recurring scan job. Changing the domain asks for confirmation because it resets the asset baseline. See [Attack Surface](/docs/attack-surface).

## Connected Accounts

Per tenant: every cloud (AWS, Azure, Google Cloud, Oracle, Hetzner, DigitalOcean), SaaS (Microsoft 365, Google Workspace, Box, Dropbox) and database account the tenant has connected, which modules use each one (Cloud Inventory, Cloud Posture, SaaS Posture, Shared files, DSPM), its last check with any missing permission, and **one on/off switch** that pauses the account for all of them. Credentials are added in the Marketplace (or under Data Security for DSPM databases) and are never shown here.

## Data Security

Per tenant, with the DSPM licence: content scanning (off until you consent), scan mode and interval, sampling budgets, AI document types for data at rest, remediation, connections and in-environment scanners. See [Data Security → DSPM](/docs/data-security#settings-admin).

## Environment Config

Advanced configuration variables in two groups: **Global (.env)** — core platform configuration (domain, OAuth, ports) — and **CySIEM Stack** — correlation-engine settings. Secret values are masked. Most settings have a friendlier tab of their own; use this only when support asks you to or a guide names a variable.

## Secrets Vault

Where Cy360 reads sensitive credentials from: **environment variables** (default), **Infisical** (Universal Auth machine identity), **Azure Key Vault** or **HashiCorp Vault**. Credentials you enter are masked after saving. Also where optional tokens go, such as a personal `GITHUB_TOKEN` for attack-surface code-leak search.

## AI Providers

![Settings → AI Providers](/docs-img/settings-ai-providers.jpg)

Connects Cy360's AI pipeline — CyMind chat, incident enrichment, attack-surface/GRC/report analysis and AI Agents — to models:

- **Local LLM** (global admin) — one or more self-hosted **Ollama** servers on dedicated hardware: reachability, active model, endpoint override and routing strategy, with a live check on every page load.
- **External / Cloud AI Engine** (per tenant) — bring-your-own-key providers: **Anthropic, OpenAI, Google Gemini, Mistral, Groq, DeepSeek, Azure OpenAI**. Each tenant's keys are stored encrypted. Configure two or more so Cy360 can fail over on rate limits. **Test Connection** checks each one.
- **Personal data and external AI** — whether automatic investigations that involve personal data may use external providers (off by default).

Providers are only used when the tenant's **AI Gateway** mode is not *None*.

## AI Gateway

The AI mode for this tenant:

- **None** — AI features are off.
- **Local** — this server calls the providers configured in AI Providers.
- **Cloud** — through CyAssure's CyMind Cloud relay: click *Enable Cloud AI for this tenant* or redeem a setup code.

Requires Enterprise. Gateway Keys for external applications are on AI Security → Sensors & Access.

## Threat Intelligence (TIM)

Enterprise with TIM. Threat-intel enrichment through **CyTIM** (included with Enterprise — it works out of the box) and **EDL / Blocklist Management**: add IPs and domains, set them active, and point your firewall at the EDL feed URL to block them network-wide. The feed token's allowed IPs restrict who can pull it.

## MCP Management

A two-way MCP pipeline, per tenant. **MCP Server** — other tools (Claude Desktop, AI agents, other platforms, scripts) connect to Cy360 with one key per application. Each key has an access level (read, read + propose, full), an optional tool allowlist, a rate limit and an expiry. Turning the server on or off is for the global administrator. **Connected platforms** (with AI Security) — Cy360 connects to other platforms' MCP servers with their own encrypted credentials; reads run, writes wait for an admin. **Approvals** — changes waiting for an admin in both directions. **Scheduled pulls** (with AI Security) — a connected platform's data into CyDataLake. **Activity** — every MCP call. Step-by-step: [MCP Integrations](/docs/mcp-integrations).

## FP Auto-Close

A slider (50–99 %) for the false-positive probability at which incidents are closed automatically:

| FP probability | Result |
|---|---|
| ≥ threshold | **Auto-close** — closed immediately, no analyst review (audited) |
| 40 % – threshold | **Investigating** — held in the ambiguity band and re-evaluated on every new correlated alert |
| < 40 % | **In Review → Case** — advanced to review; high/critical incidents with 3+ alerts open a case automatically |

Lowering the threshold closes more incidents automatically; raising it sends more to analysts. **Save for this tenant** gives the tenant its own value; **Use platform default** goes back to the value the global admin set.

## SLA Thresholds

Target times (in minutes) per severity used for MTTD/MTTA/MTTR and for escalating unattended incidents to the AI Tier 1 queue. Same per-tenant override model as FP Auto-Close.

## Network Quarantine (NAC)

Each tenant's own network access control provider and credentials, used by the *Network Quarantine (NAC)* response action. A quarantine only ever uses the endpoint's own tenant's NAC.

## Exposure Recurrence

Raise a separate **RECURRING** incident, one severity higher, when a fixed exposure finding comes back *N* times within *H* hours (default 3 within 168 hours / 7 days) — the fix isn't sticking. Tenant admins edit; everyone else sees it read-only.

## Exposure Ticketing

The **Jira**, **ServiceNow** or **webhook** target used by *Create ticket* on exposure findings.

## Scheduler

![Settings → Scheduler](/docs-img/settings-scheduler.jpg)

Automated schedules for maintenance tasks — **Docker Maintenance** (cleaning up unused images) and **Automated Backup** — each with its own enable switch and timing. Choose **your timezone**; times are converted to UTC for the server. **Save Schedules** applies them immediately. Recurring scans and the platform's background jobs are listed and controlled by their own pages.

## Users & Roles

- **User management** — tiles for total users, SSO, local, pending approval and users per role. Filter *All / Approved / Pending / Local*. Per user: change the **role**, **Reset PW** (local accounts), **Approve** / **Revoke** (SSO accounts — revoked users are blocked at their next login) and **Delete**.
- **Role management** — built-in roles (*admin*, *analyst*, *viewer*) and **custom roles**: choose the privilege tier, the **pages** the role can open and, per page, the **tabs** it can see. A custom role on the *admin* tier (for example *Tenant Admin*) manages its own tenant only; install-wide tabs can be granted to it view-only.

On Community, one admin/analyst seat is included; viewers do not use a seat.

## Tenant Management

With the Multi-Tenancy module (global admin only): create tenants and their seat allocations, grant users **cross-tenant access**, and map **SSO domains** to tenants so people land in the right tenant when they sign in.

## SSO & Email

- **SSO providers** — Google, Microsoft (Entra ID), generic **OIDC** and **SAML** (paste your IdP's metadata; Cy360 shows its own SP signing certificate). The redirect/callback URL to register in your IdP is shown for each.
- **SCIM** — tokens for your IdP to provision and de-provision users automatically. Revoking a token stops that connector immediately.
- **SMTP / e-mail** — the mail server used for alert e-mails, notifications and support tickets.

## Backup & Restore

![Settings → Backup & Restore](/docs-img/settings-backup.jpg)

**What every backup contains:** platform configuration files (RBAC, module state, AI settings, schedules), environment files, licence files, per-module configuration and a PostgreSQL database dump. Docker images, log files and application code are not included — they are re-deployable.

**Create Backup Now** makes an archive; the list below lets you download or restore one. Schedule automatic backups in the Scheduler tab. Off-site (S3-compatible) replication can also be configured. The raw event store (CyDataLake) and attack-surface scan history are backed up separately — see the [Deployment Guide](/docs/docker-deployment).

## Knowledge Base

Upload documents — runbooks, procedures, network diagrams in text form — that **CyMind** can search and cite when it answers questions. Delete a document to remove it from CyMind's knowledge.

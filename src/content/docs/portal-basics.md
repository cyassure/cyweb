# Portal Basics

Cy360 (CyAssure 360) is one web portal for the whole security programme: detecting and responding to threats, finding weaknesses before attackers do, protecting data and AI use, and proving compliance. This page explains how the portal is organised so the rest of the user guide makes sense.

![The Command Center, the first page you see after logging in](/docs-img/command-center.jpg)

## Signing in

Open your Cy360 address in a browser (for example `https://cy360.yourcompany.com`). You can sign in with:

- **A local account** — e-mail and password, created by an administrator in **Settings → Users & Roles**.
- **Single sign-on** — Google, Microsoft (Entra ID) or any OIDC/SAML provider your administrator has configured in **Settings → SSO & Email**. The first time someone signs in with SSO, an administrator may have to approve the account before it can be used.

Change the default administrator password straight after installation — see the [Deployment Guide](/docs/docker-deployment).

### The first-login Setup Wizard

The first time an administrator signs in, a **Setup Wizard** walks through the essentials. You can skip it and re-run it any time from **Settings → Organization Domain → Run Setup Wizard Again**.

1. **Domains** — the *Organization Domain* and port Cy360 is reached on, and the *Exposure Monitoring Domain* your attack-surface scans will watch.
2. **Verify Domain** — prove you control the exposure domain (DNS TXT record or a file on your website) so scans can run active checks. Skippable, because DNS can take an hour; shown only when Attack Surface is licensed.
3. **CyDataLake** — switch raw-event capture on or off.
4. **Host hardening** — single sign-on in front of the portal (identity-aware proxy), firewall and SSH hardening. Because these change the host itself, the wizard either runs them for you (**Run Now**, when the self-update sidecar is enabled) or gives you the exact `cyassure-setup.sh` command to run over SSH.

## The layout

Every page has the same three areas:

| Area | What it holds |
|---|---|
| **Top bar** | The time and timezone selector, the active tenant (on multi-tenant installs), **Import** (load an attack-surface scan file), your name and role, and **Sign out**. |
| **Sidebar** (left) | Every section and page you are allowed to see, grouped by area. The bottom of the sidebar shows the last attack-surface scan and the Cy360 version. |
| **Page** (centre) | The page itself. Many pages have **tabs** across the top — each tab is described in this guide. |

The round green button in the bottom-right corner opens **CyMind**, the built-in AI assistant (see below).

## The sidebar, section by section

| Section | Pages | What it is for | Guide |
|---|---|---|---|
| **Dashboard & Reports** | Command Center, Dashboard, Reports | Executive overview, benchmark score, MITRE ATT&CK lifecycle, report generation | [Dashboards & Reports](/docs/dashboards-and-reports) |
| **Security Operations** | Security Posture, Incidents, Response, AI Agents, Detection Rules | Day-to-day SOC work: triage, respond, tune | [Incidents](/docs/incidents-and-posture), [Response](/docs/response-and-remediation), [AI Agents](/docs/ai-agents), [Detection Rules](/docs/detection-rules-and-context) |
| ↳ Investigations | Alerts, Threat hunting, Identity Timeline, Sandbox Analysis, Behavior Analysis (UEBA) | Digging into raw evidence | [Investigations](/docs/investigations) |
| ↳ Config | Detection Context | Telling Cy360 what is normal in your environment | [Detection Rules & Context](/docs/detection-rules-and-context) |
| **Vulnerability Management** | Overview, Findings, Remediation Plan, Exceptions, Sources & Policy | One prioritised queue of every vulnerability | [Vulnerability Management](/docs/vulnerability-management) |
| **Attack Surface** | Overview, Discovery, Inventory, Exposures, Digital Risk, Changes, Scans | What an outside attacker can see | [Attack Surface](/docs/attack-surface) |
| **Asset Management** | Network Assets, Cloud Inventory | Every device and cloud server you own | [Asset Management](/docs/asset-management) |
| **Cloud & SaaS Security** | Cloud Posture (CSPM), SaaS Posture (SSPM), Shadow IT, Cloud Apps (CASB) | Exposure and risky settings in clouds and SaaS tenants, and risky file activity | [Cloud & SaaS Security](/docs/cloud-and-saas-security) |
| **Data Security** | Overview, Classification, Data Access & Exposure, AI Data Protection, DSPM ▸, DLP ▸ | Where sensitive data lives, who uses it and where it leaks | [Data Security](/docs/data-security) |
| **Endpoint Defence** | Fleet, Detections, Policies, Groups, Installers | The CyEDR endpoint agent | [Endpoint Defence](/docs/endpoint-defence) |
| **AI Security** | AI Estate, Shadow AI, Threat Activity, Governance, Sensors & Access | Safe use of AI tools and models | [AI Security](/docs/ai-security) |
| **Governance & Compliance** | GRC Setup … GRC Reports | Frameworks, risk register, privacy register, reports | [Governance & Compliance](/docs/governance-and-compliance) |
| **Case Management** | — | Tracked investigations | [Case Management](/docs/case-management) |
| **Marketplace** | — | Integrations and playbooks | [Marketplace](/docs/marketplace) |
| **Settings** | — | Platform configuration | [Settings](/docs/settings) |
| **System Health** | Server Status, Audit Trail, Integration Health, Model Center, AI Routing | Is the platform itself healthy? | [System Health](/docs/system-health) |
| **Notifications**, **Help** | — | Product announcements, version and support | [System Health](/docs/system-health) |

The sidebar is split by two dividers: the top block is the analyst's daily work, the middle block is the security "domains" (vulnerabilities, assets, data, endpoints, AI, compliance), and everything below the last divider is administration.

### Favourites

Click the ☆ next to any page in the sidebar to pin it to **Favourites** at the top. Favourites are stored in your browser, so each person can keep their own shortlist.

### Why can't I see a page?

A page is hidden for one of two reasons:

1. **Your role does not include it.** Administrators decide which pages and tabs each role can see (Settings → Users & Roles). Ask your administrator if you need access.
2. **Your licence does not include its module.** Pages of modules your licence doesn't cover are hidden rather than shown locked. See *Editions and modules* below.

## Roles and permissions

Cy360 has three privilege tiers, and administrators can create custom roles on top of them:

| Tier | Can do |
|---|---|
| **Viewer** | Read the pages granted to the role. Cannot change anything. |
| **Analyst** | Everything a viewer can, plus work incidents, cases, findings and investigations, propose fixes and run scans. |
| **Admin** | Everything an analyst can, plus approve actions and change configuration. |

Only the built-in **admin** role is a *global* administrator. A custom role on the admin tier (for example *Tenant Admin*) manages its own tenant only and can never change install-wide settings such as the licence, updates, secrets or users. Each custom role can also be limited to specific pages and specific tabs within a page.

## Tenants (multi-tenancy)

With the **Multi-Tenancy** module, one Cy360 installation can serve several organisations or business units (for example an MSSP and its customers). Each tenant's data is isolated in the database. If you have access to more than one tenant, a tenant switcher appears in the top bar, and the Command Center lists every tenant you can see with a **Switch** button. Most settings are per tenant; install-wide settings are marked as such in the [Settings](/docs/settings) guide.

## Editions and modules

Cy360 is one product unlocked by a licence file. There is no time-limited trial.

| | Community (free, no licence file) | Enterprise (licence file) |
|---|---|---|
| Admin/analyst users | 1 | Purchased quantity |
| Endpoints / assets | 15 | Purchased quantity |
| Raw event history (CyDataLake) | 15 days | 90 days |
| Threat-intel (CyTIM) and AI integration | — | Included |

**Base modules (every edition):** Asset Management, Endpoint Defence (CyEDR, Security Operations, Case Management, CyDataLake) and Vulnerability Management.

**Add-on modules (Enterprise, each licensed separately):** Attack Surface, Cloud & SaaS Security, AI Security, Governance & Compliance, Data Security Posture Management (DSPM), Privacy Operations, Automation Agents (AI Agents) and Multi-Tenancy.

**DPDP package (India):** Governance & Compliance, DSPM, Cloud & SaaS Security and Privacy Operations, with 365-day log retention (DPDP Rule 6(1)(e)); Significant Data Fiduciaries add AI Security and Attack Surface. See [Privacy Operations](/docs/privacy-operations).

If an Enterprise licence expires or becomes invalid, Cy360 keeps working on the last valid entitlement for a 30-day grace period and then falls back to Community limits. Your data is never deleted. See **Settings → License**.

## CyMind — the AI assistant

![CyMind, the operations assistant, opened from any page](/docs-img/cymind-assistant.jpg)

Click the green button in the bottom-right corner on any page to open **CyMind**. It can see live data from every module you have access to, so you can ask questions such as:

- "What are my three most urgent incidents right now?"
- "Why is the Security Posture score 39?"
- "How do I add a new endpoint?"
- "Open a case for INC-00123."

CyMind explains which page and tab to use, and can prepare actions (open a case, move an incident between queues, propose a fix) — it always asks you to confirm before anything changes. It never approves remediation on its own. CyMind uses the AI providers configured in **Settings → AI Providers** and **Settings → AI Gateway**; if none are configured it will tell you so.

## Common conventions

- **Severity** is always Critical / High / Medium / Low, colour-coded red / orange / yellow / green or blue.
- **Refresh** buttons re-load the data on that page; most pages also refresh by themselves.
- **"How this works"** links on a page expand an explanation right there.
- Tables can usually be **sorted** by clicking a column header and **filtered** with the controls above them.
- Anything that changes something — approving, deleting, changing a status — asks for confirmation and is recorded in the **Audit Trail** with your name.

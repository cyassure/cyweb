# System Architecture & Design

This page explains how Cy360 is built: the components that run on your server, how data flows through them, and the design decisions behind security, multi-tenancy and licensing. It is written for administrators, architects and security reviewers.

## Design principles

1. **Self-hosted, your data stays with you.** Cy360 runs entirely on infrastructure you control. Logs, alerts, scan results and AI processing stay on your server; nothing is copied to a CyAssure-hosted database.
2. **One platform, one data model.** Every module writes into the same incident, asset and finding stores, so a vulnerability, an exposure, a detection and a compliance control can be linked to the same machine and the same person.
3. **Human oversight of automation.** AI agents, auto-close and remediation are bounded by roles, approval workflows, autonomy tiers and full audit.
4. **Additive, explainable scoring.** Every score (incident risk, false-positive probability, vulnerability priority, posture) can be broken down into its factors in the portal.
5. **Signed everything that executes.** Integrations are CyAssure-signed packages and endpoint fixes are signed by your own server.

## Deployment topology

Cy360 is delivered as a set of Docker containers orchestrated with Docker Compose on a Linux host (Ubuntu/Debian recommended). The installer (`cyassure-setup.sh`) brings the stack up and can also prepare and harden the host — TLS, firewall and SSH hardening.

![Cy360 deployment topology: browsers and endpoints connect over HTTPS to the containers on your server; only outbound HTTPS leaves it](/docs-img/architecture-topology.svg)

### Containers

| Container | Role |
|---|---|
| **frontend** | The web portal (React single-page application), served on `APP_PORT`. The browser talks to the API on the same origin under `/api`. |
| **backend** | The REST API and the business logic of every module (assets, vulnerabilities, attack surface, GRC, EDR management, DLP/DSPM, marketplace, settings), the job scheduler and the AI pipeline. |
| **cysiemstack-engine** | The correlation engine: normalises alerts, groups them into incidents, runs UEBA and ML models, scores incidents, runs threat-intel and AI enrichment, threat hunting and the AI triage judge. |
| **db** (PostgreSQL) | The system of record: configuration, assets, incidents, cases, findings, GRC data. Tenant data is protected by row-level security. |
| **redis** | Cache, short-lived queues and shared state between processes. |
| **redpanda** | A Kafka-compatible event bus. Every event is published to it in addition to its normal processing path. |
| **ingest-worker** | Consumes the bus and writes raw events to ClickHouse, committing only after a successful write, and archives old events to cold storage. |
| **clickhouse** | **CyDataLake** — the raw multi-vendor event store behind Investigations → Alerts. |
| **gateway relays** (optional) | The AI Security Gateway's TLS relays for inspecting AI and web traffic from endpoints routed through them. |
| **updater** (optional, on by default) | A small sidecar that performs updates/upgrades and host hardening when you click the buttons in Settings. It is the only container with access to the Docker socket and is reachable only from the backend. |
| **OpenVAS/GVM** (optional, separate stack) | Full vulnerability assessment for the *Deep* attack-surface scan tier. |

### Persistent data on the host

| Location | Holds |
|---|---|
| Docker volume for PostgreSQL | The database |
| Docker volume for ClickHouse | CyDataLake raw events |
| `/opt/cyassure` | Platform state: licence, configuration files, ML models, container-log archive |
| `/var/log/cyassure` | Attack-surface scan history and generated reports |
| `/var/lib/cyassure-agent-packages` | CyEDR agent installers and assets served to endpoints |

All of these survive updates and container re-creation. See the [Deployment Guide](/docs/docker-deployment) for backup commands.

## Data flows

### Detection pipeline

![The detection pipeline: sources, normalisation, correlation and scoring, action — with every raw event kept in CyDataLake](/docs-img/architecture-detection-pipeline.svg)

1. **Collection.** The CyEDR agent sends behavioural detections and telemetry; Marketplace packages poll vendor APIs (cloud audit logs, identity providers, firewalls, SaaS); internal modules emit findings.
2. **Normalisation.** Each event is wrapped into one common alert envelope, and the user and machine are resolved to a canonical identity and asset (so `CORP\jdoe` and `jdoe@corp.com` are the same person).
3. **Correlation.** Alerts are grouped into incidents by person, machine or cloud resource in a time window; correlation rules link multi-step patterns.
4. **Scoring.** Risk score and false-positive probability combine rule confidence, behaviour analytics, ML models, threat-intel hits, kill-chain stage, asset criticality and declared Detection Context. New ML inputs are additive and bounded; strong evidence always overrides benign context.
5. **Enrichment.** MITRE ATT&CK mapping, CyTIM threat-intel lookups, AI narrative and hypotheses, compliance-control mapping.
6. **Action.** Queues, automatic cases, recommended response, AI agents, SOAR.

### Vulnerability pipeline

Software inventory (CyEDR agents and agentless deep scans) is matched against distribution advisories (OSV) and Microsoft's security updates; attack-surface scans and Marketplace sources add external, container, cloud and code findings. Every finding is enriched with CISA KEV and EPSS, prioritised (*cy-priority-v1*) and tracked against SLA in one store. Fixes are proposed to the Remediation workflow and executed by CyEDR.

### Exposure and compliance evidence

Attack-surface, cloud-posture, DSPM, SaaS-sharing and network-segmentation findings raise **exposure incidents** that resolve themselves when the finding disappears. Detections are mapped through MITRE techniques to framework controls; control validators, DSPM and the Processing Register answer GRC questions automatically — never overwriting a person's answer.

## Multi-tenancy

- Tenant data lives in shared tables protected by **PostgreSQL row-level security**: every request runs pinned to its tenant, and the application connects with a least-privilege role so the policies are enforced (visible in System Health → Server Status).
- Per-tenant settings (AI provider keys, NAC credentials, MCP keys, exposure domain, SLA and FP overrides) are stored per tenant, with secrets encrypted per tenant.
- Background jobs that act per tenant run once per tenant, pinned to it.
- **Global administrator** (built-in *admin*) versus **tenant administrators** (custom roles on the admin tier): only the global administrator can change install-wide state such as the licence, updates, secrets, users and roles.

## Security design

| Area | Design |
|---|---|
| **Authentication** | Local accounts, OAuth (Google, Microsoft), OIDC and SAML SSO, SCIM provisioning. Cy360 also acts as an OIDC identity provider for connected tools. Optional identity-aware proxy in front of the portal. |
| **Authorisation** | Three privilege tiers (viewer, analyst, admin), custom roles with page- and tab-level permissions, enforced server-side. |
| **Agents** | Enrolment with expiring, use-limited deployment tokens; per-agent bearer tokens; commands picked up by the agent over outbound HTTPS (no inbound ports on endpoints). |
| **Remediation** | Fix commands are signed by your Cy360 server; the agent trusts the server's key on first use and refuses any other key afterwards; it backs up before changing and restores on failure. High-risk fixes need two administrators. |
| **Integrations** | Every Marketplace package is signed by CyAssure and its signature is re-verified on every load; a connector without a valid signed package does not run. Packages are configured with read-only credentials wherever the vendor allows. |
| **Secrets** | Environment variables, Infisical, Azure Key Vault or HashiCorp Vault. Secrets are masked in the UI and never logged. |
| **Data minimisation** | DLP and DSPM never store sensitive values — only detector, count, confidence and location. SaaS sharing reads metadata only. The fleet heartbeat to CyAssure carries instance metadata only — never logs, scan data or customer data. |
| **Audit** | Every login, configuration change, approval and response action is recorded in the Audit Trail. |
| **Supply chain** | Backend images contain compiled code only; container images are versioned and pinned; self-update can be disabled. |

## AI architecture

All AI features — CyMind chat, incident narratives, attack-surface/GRC/report analysis and AI agents — use **one AI pipeline**:

- **Providers** are configured per tenant: a self-hosted Ollama model and/or bring-your-own-key cloud providers. A router ranks configured providers by quality, cost and latency, fails over on errors and rate limits, and records every decision (System Health → AI Routing).
- **Gateway mode** per tenant: *None*, *Local* (this server calls providers directly) or *Cloud* (through CyAssure's CyMind Cloud relay).
- **Personal data:** agents that handle personal data ask before using external providers; the Forensic Investigator never uses them; automatic investigations follow a per-tenant setting (off by default).
- **ML detection models** run in the correlation engine and are governed in Model Center (shadow by default, readiness checks, poisoning defences, automatic baseline rollback).

## Licensing design

A signed licence file unlocks the Enterprise edition and add-on modules; without one, Community Edition runs permanently. One gate on the API refuses requests for modules the licence does not include, and the portal hides their pages. The licence is bound to the installation and checked in with CyAssure daily (offline activation is supported). Any failure — expiry, tampering, a licence for another installation — starts a 30-day grace period on the last good entitlement before falling back to Community limits. **Data is never deleted and collection never stops because of licensing.**

## Scaling and sizing

A single host runs the whole stack. Sizing depends mainly on event volume (CyDataLake) and the number of endpoints; the [Deployment Guide](/docs/docker-deployment) lists the minimums. The optional OpenVAS stack needs substantial extra memory (8 GB+). Local LLMs should run on dedicated hardware, not on the Cy360 host.

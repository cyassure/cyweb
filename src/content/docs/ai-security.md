# AI Security

Employees paste customer data into chatbots, developers run local models and coding assistants, and teams wire AI agents into business systems. **AI Security** gives you visibility and control over all of it: which AI is in use, what data is sent to it, and who is allowed to use what.

The section has five entries: **AI Estate**, **Shadow AI**, **Threat Activity**, **Governance** and **Sensors & Access**. Shadow AI is free on every edition; the other pages and the **AI Security Gateway** are the Enterprise **AI Security** add-on. Each page has **How this works** links that explain it in place.

## How AI traffic is seen

- **CyEDR agents** see AI applications and processes on endpoints and DNS lookups to AI services.
- The **browser extension** sees AI use in the browser (chat sites, AI features in web apps).
- The **AI Security Gateway** sits between users/applications and AI providers. It inspects prompts and responses, blocks prompt injection and policy violations, detects sensitive data and credentials, and enforces governance policies. Endpoints are routed through it by setting a proxy in their Endpoint Defence policy; applications call it with a Gateway Key.
- **Cloud Sensors** find AI workloads and AI-service use in your cloud accounts.

## AI Estate

![AI Security → AI Estate](/docs-img/ai-estate.jpg)

**What it is.** The inventory of AI applications, models, providers, datasets, endpoints and users seen across your organisation, and the risk they carry.

- **Tiles** — AI assets (and how many your licence covers), the share with an assigned owner, active policies, DLP events in the last 7 days and anomalies.
- **Charts** — assets by type, anomalies by severity, AI security events over 14 days and the top anomaly types.
- **Recent anomalies** and the **asset inventory**, where you assign owners.

**Why it matters.** You cannot govern AI you don't know about. Owners make someone accountable for each AI system — a requirement of the EU AI Act and ISO 42001.

## Shadow AI

![AI Security → Shadow AI](/docs-img/shadow-ai.jpg)

**What it is.** Unapproved AI tools detected through CyEDR process scans, DNS and network telemetry — for example local LLM runners, AI coding assistants and desktop chat apps.

**How to use it.**

- **Tiles** — open findings (new in 7 days), escalated, approved tools, suppressed and unique AI tools. *Tools detected* chips summarise what was found.
- Three views: **By Application**, **Findings** and **Approved AI Tools**. Filter findings by Open / Escalated / Approved / Suppressed / All, or search by tool, host or process. Click a row for the detection detail (the executable and what matched).
- **Actions per finding** — **Approve** (sanctioned tool: no new Shadow AI findings for it), **Escalate** (raise it for investigation), **Whitelist App** and **Suppress**.

Approving an app only stops new Shadow AI findings for it: DLP events, behavioural anomalies and endpoint detections from that app are still reported. *Inspect via AI Gateway* on a high-risk app is advice: route those hosts through the AI Security Gateway by setting a proxy in their endpoint policy.

The list of AI applications Cy360 recognises is managed in [Detection Rules → AI Applications](/docs/detection-rules-and-context#ai-applications).

## Threat Activity

![AI Security → Threat Activity](/docs-img/ai-threat-activity.jpg)

Two tabs, each with severity, 14-day and top-type charts above its event list:

- **DLP Events** — sensitive data sent to AI: personal data, credentials and secrets in prompts or tool output, and policy blocks.
- **Behavioral Anomalies** — unusual AI usage per user: request-rate spikes, oversized payloads, off-hours use. The platform's own service account is excluded; administrators can exclude other service accounts.

## Governance

![AI Security → Governance](/docs-img/ai-governance.jpg)

Two tabs:

- **Policies** — who may use which AI. Each policy has a priority and an action — **allow**, **block** or **require approval** — scoped by user, application, provider, model or data class. Tiles show how many policies are enabled, blocking and requiring approval. With no enabled policy, every request is allowed. **+ New Policy**, **Edit**, enable/disable and **Delete** on each.
- **Approval Queue** — requests held by a *require approval* policy, waiting for a decision.

**Why it matters.** Policies let you allow AI where it is safe (for example an enterprise chatbot with no customer data) while blocking or reviewing risky combinations (customer data to a public model).

## Sensors & Access

Three tabs:

- **Browser Extension** — enrolled browsers and operating systems, and the self-hosted extension package for managed deployment: the extension ID, version, the *ExtensionInstallForcelist* entry to paste into Group Policy or your MDM, the update URL and the enrolment key (shown masked). A step-by-step GPO/MDM guide is under *Deployment guide*.
- **Cloud Sensors** — AI workloads and AI-service use discovered in your cloud accounts (installed from the Marketplace's AI Cloud Sensors category).
- **Gateway Keys** — API keys (`cymk_…`) that authorise external applications and integrations to call the AI Security Gateway. Create a key per application; revoke it to cut that application off.

## Related settings

- **Settings → AI Gateway** — the gateway mode for this tenant (None, Local or Cloud).
- **Settings → AI Providers** — the AI providers (local Ollama, Anthropic, OpenAI, Gemini, Mistral, Groq, DeepSeek, Azure OpenAI) Cy360's own AI features use.
- **Settings → MCP Management** — connect other platforms' MCP servers so Cy360's assistant and AI agents can use them (writes need an admin's approval). See [MCP Integrations](/docs/mcp-integrations).

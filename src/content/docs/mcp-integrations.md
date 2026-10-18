# MCP Integrations

Cy360 speaks the **Model Context Protocol (MCP)** in both directions:

- **Other tools connect to Cy360.** An AI assistant (for example Claude Desktop), an AI agent, another security platform or a script reads Cy360 data, and can propose changes, through Cy360's MCP server.
- **Cy360 connects to other platforms.** Any platform that runs an MCP server can be connected to Cy360. People, the CyMind assistant, AI agents and SOAR flows can then read its data and, with an admin's approval, change things on it. Read tools can also be pulled into CyDataLake on a schedule.

Everything is set up in **Settings → MCP Management**, and everything there belongs to the tenant you are working in. One tenant never sees another tenant's keys, connections, approvals or activity.

| Sub-tab | What it is for | Needs |
|---|---|---|
| **MCP Server** | Keys for the applications that connect to Cy360 | Enterprise |
| **Connected platforms** | Other platforms' MCP servers that Cy360 connects to | Enterprise + AI Security |
| **Approvals** | Changes waiting for an admin, in both directions | Enterprise |
| **Scheduled pulls** | A connected platform's data in CyDataLake on a schedule | Enterprise + AI Security |
| **Activity** | Every MCP tool call, both directions (admins) | Enterprise |

## Part 1 — Let another tool use Cy360

### 1. Turn the MCP server on

The MCP server runs inside the correlation engine and is on by default. A global administrator can switch it off or on under **MCP Server** → *Disable MCP / Enable MCP*. The change applies when the `cysiemstack-engine` container restarts. While the server is off, every request to `/mcp` gets *404*.

Two addresses are shown on the same page, and they serve the same tools with the same keys:

| Transport | Address | Use it for |
|---|---|---|
| Streamable HTTP | `https://<your-cy360-domain>/mcp/stream` | Most current MCP clients and agent frameworks |
| SSE | `https://<your-cy360-domain>/mcp/sse` | Older clients, and Claude Desktop through `mcp-remote` |

### 2. Create a key for each application

Under **MCP API keys**, a tenant admin creates one key per application, for example *Claude Desktop – SOC team* or *SOAR*. Using one key per application means you can limit, watch and revoke each one separately.

| Setting | What it does |
|---|---|
| **Access** | **read** — reads only. **read + propose** — can also propose fixes and configuration changes; an admin approves each one. **full (write)** — can also update incidents and cases directly. |
| **Only these tools** | Optional allowlist. Blank means every tool the access level allows. |
| **Calls/min** | Rate limit for this key. New keys get 120; 0 means no limit. |
| **Expires** | Optional date after which the key stops working. |

The key (`cymk_…`) is shown **once**. Copy it straight into the application. Cy360 stores only a fingerprint of it.

Later, use **Limits** to change a key's access, allowlist, rate or expiry. The change applies to the application's next request. **Revoke** cuts the application off immediately.

Every request must send the key as a header:

```
Authorization: Bearer cymk_...
```

A request without a valid key gets *401*. A key only ever reaches the data of the tenant it was created in.

### 3. Connect the application

**Claude Desktop.** Claude Desktop connects to remote MCP servers through `mcp-remote`. Add this to `claude_desktop_config.json`:

```json
{
  "mcpServers": {
    "cyassure": {
      "command": "npx",
      "args": ["mcp-remote", "https://<your-cy360-domain>/mcp/sse",
               "--header", "Authorization: Bearer cymk_..."]
    }
  }
}
```

**Any client that speaks Streamable HTTP:** set the URL to `https://<your-cy360-domain>/mcp/stream` and add the `Authorization: Bearer cymk_…` header.

**Python (official MCP SDK), or any agent framework that supports MCP:**

```python
from mcp import ClientSession
from mcp.client.sse import sse_client

async with sse_client("https://<your-cy360-domain>/mcp/sse",
                      headers={"Authorization": "Bearer cymk_..."}) as (r, w):
    async with ClientSession(r, w) as session:
        await session.initialize()
        tools = await session.list_tools()
        result = await session.call_tool("list_incidents", {"status": "open"})
```

**MCP Inspector**, to try it by hand: run `npx @modelcontextprotocol/inspector`, choose the SSE transport, enter the address, and add the `Authorization` header.

### What a connected application can do

An application only sees the tools its key allows. The **MCP Server** sub-tab shows the live list with each tool's level.

| Area | Tools | Level |
|---|---|---|
| Incidents & alerts | `get_stats`, `list_incidents`, `search_incidents`, `get_incident`, `get_incident_distribution`, `list_alerts`, `get_alert`, `search_alerts`, `list_campaigns` | read |
| Users & entities | `list_risk_scores`, `list_ueba_users`, `get_ueba_anomalies`, `get_itdr_signals` | read |
| Threat intel & network | `get_threat_intel`, `get_network_quarantine_history`, `list_cloud_clusters` | read |
| Cases | `list_cases`, `get_case`, `summarize_case_operations` | read |
| Assets & vulnerabilities | `list_assets`, `get_asset`, `list_vulnerabilities` | read |
| Endpoints | `list_endpoints`, `list_remediations` | read |
| Compliance | `get_compliance_posture` (needs Governance & Compliance) | read |
| Configuration | `list_config_change_targets`, `get_config_change_request` | read |
| Proposals | `propose_remediation`, `propose_config_change` | propose |
| Changes | `update_incident`, `assign_case`, `update_case_notes` | write |

### Proposing configuration changes

An application with a **read + propose** or **full** key can ask Cy360 to change a setting with `propose_config_change`. **Nothing changes until an admin approves it.** Only these changes can be proposed:

| Target | Change |
|---|---|
| `edr_policy_assign` / `edr_policy_unassign` | Assign or remove an EDR policy on endpoints or groups |
| `edr_policy_update` | Change an EDR policy's description or settings |
| `noise_tuning` | Set how a detection rule is grouped or suppressed |
| `blocklist_add` | Add an IP or domain to the EDL blocklist (starts in shadow mode) |
| `blocklist_set_status` | Change a blocklist entry's status (shadow, active, allowlisted) |

The request appears under **Approvals → Configuration changes proposed by MCP clients**, with the exact change, which application asked, and its reason.

When an admin clicks **Approve**, Cy360 makes the change through the same endpoint the portal button uses, **as that admin**. The admin's own role, licence and tenant rules apply. A proposal can never do more than the admin who approves it could do by hand. The application can check the outcome with `get_config_change_request`. Requests nobody decides expire after 14 days.

## Part 2 — Let Cy360 use another platform

### 1. Connect the platform

Under **Connected platforms → + Connect a platform** (tenant admin), fill in:

- **id** — a short name such as `okta`. It prefixes the platform's tools, so they are called `okta.list_users`, `okta.deactivate_user` and so on.
- **MCP server URL** — the platform's MCP endpoint. **Transport** *auto* tries Streamable HTTP and then SSE; pick one if you know it.
- **Authentication** — the credential the *platform* gave you:

| Option | Sent as |
|---|---|
| Bearer token | `Authorization: Bearer <token>` |
| API key header | your chosen header, e.g. `X-API-Key: <key>` |
| Username + password | HTTP basic authentication |
| OAuth client credentials | Cy360 gets a token from your token URL with the client id and secret, and refreshes it before it expires |
| OAuth sign-in (browser) | You sign in once at the provider; Cy360 keeps the connection signed in (see below) |
| No authentication | nothing |

**OAuth sign-in (browser).** Use this for servers that want you to log in, such as many hosted MCP servers.

1. Choose **OAuth sign-in (browser)** and save the connection. It shows *not signed in*.
2. Click **Sign in**. A window opens at the provider; log in and allow access. The window closes, the connection shows *signed in* with your name, and its tools are listed.
3. From then on Cy360 renews the access itself with the refresh token the provider issued, stored encrypted for this connection. If the provider stops accepting it (for example, access was revoked), the connection shows *sign-in expired*: click **Sign in again**.

Most MCP servers are set up automatically: Cy360 reads the server's OAuth metadata and registers itself. Providers that don't allow automatic registration, such as Google and Microsoft, need an app registered with them first:

1. Register an app (an OAuth client) with the provider and add the **redirect URI** shown in the form, `https://<your-cy360-domain>/api/ai-security/mcp/oauth/callback`.
2. Enter the provider's **authorization URL** and **token URL**, the app's **client id** and **client secret**, and the **scope**.
3. Add **extra parameters** if the provider needs them to issue a refresh token. Google needs `access_type=offline&prompt=consent`; Microsoft needs `offline_access` in the scope.

The sign-in has to finish in the same browser and Cy360 session that started it.

The credential is stored encrypted for this one connection and is never shown again. Cy360 never sends your own Cy360 sign-in to another platform.

When you click **Connect**, Cy360 connects, lists the platform's tools and checks them for risks. A tool description that contains hidden instructions for an AI, or a connection that trusts every tool by default, is flagged. If the platform can't be reached, the connection is still saved and the error is shown; fix it and click **Rescan**.

For safety, Cy360 refuses URLs that point at Cy360's own services, at cloud metadata addresses, or at loopback and link-local addresses, and it never follows redirects. It also connects only to the addresses it checked, so a DNS server that answers differently later can't redirect a connection to an internal address. Internal servers on private addresses are allowed. A platform administrator can refuse those too, with `MCP_CLIENT_ALLOW_PRIVATE_NETWORKS=false`.

### 2. Read tools and write tools

Every tool is either **read** or **write**:

- It is **read** only when the platform itself marks the tool read-only, or an admin marks it read.
- Anything else is **write**, because it could change something on the other platform.

Click **Tools** on a connection to see them. **Mark read / Mark write** overrides the platform's marking, **Block / Allow** turns a single tool off or on, and **Try** runs a tool with arguments you type.

| Who calls | Read tool | Write tool |
|---|---|---|
| Admin, from **Try → Run now** | runs | runs (the admin's click is the approval) |
| Analyst, from **Try** | runs | waits in **Approvals** |
| CyMind assistant | runs | runs if you are an admin, otherwise waits in Approvals |
| AI agents (Tier 1, Tier 2, vulnerability scanner, threat hunter) | runs | waits in Approvals |
| SOAR or a script with a Gateway Key | runs | waits in Approvals |
| Scheduled pull | runs | not allowed |

An approved write runs once, with exactly the arguments that were requested, using the connection's own credential. Write calls nobody decides expire after 7 days.

### 3. Use it

- **CyMind assistant.** Ask it about your connected platforms, for example *"what tools do my connected platforms have?"*, or ask it to look something up. It prepares a confirmation card for the call; nothing runs until you click *Execute*.
- **AI agents.** The Tier 1 and Tier 2 SOC agents, the vulnerability scanner and the threat hunter can see your connected tools and use them during a run.
- **SOAR and scripts.** Call the API with a Gateway Key (AI Security → Sensors & Access). The caller acts like an analyst: it can run reads and queue writes.

```bash
curl -X POST https://<your-cy360-domain>/api/ai-security/mcp/call \
  -H "Authorization: Bearer cymk_<gateway key>" -H "Content-Type: application/json" \
  -d '{"tool": "okta.list_users", "arguments": {"q": "jane"}}'
```

A read answers `200` with the result. A write answers `202` with an `approval_id`.

### 4. Pull data into CyDataLake

Under **Scheduled pulls → + Schedule a pull**:

1. Choose a **read** tool.
2. Set how often to run it (every 5 minutes to once a day) and any fixed arguments.
3. Set **Records path**: where the list of records sits in the tool's JSON result, for example `data.items`. Leave it blank if the whole result is one record.
4. Optionally name the **id**, **time** and **title** fields of a record.

Click **Run now** to test it. Each record becomes one event in CyDataLake under vendor `mcp`, tagged with the connection and tool, so you can search it next to every other source.

MCP is a good fit for data that changes slowly or arrives in small batches, such as users, devices or open tickets. For continuous, high-volume logs that should drive detections, a **Marketplace** integration is still the better choice.

### When a platform changes a tool

Cy360 rescans every connection once a day, and whenever you click **Rescan**. It compares each tool with what it found before. If a tool's description, inputs or annotations changed, or a new tool appeared on a connection that was already set up, that tool is **blocked** and shows *changed — review* or *new — review*. An event also appears under AI Security.

Look at the tool under **Tools**, then click **Allow** if it is still what you expect. This stops a platform from quietly changing what a tool you already trusted does, or what it tells an AI.

## Approvals

While anything waits, admins see **MCP approvals waiting** under **Notifications** (and on the sidebar badge).

**Approvals** lists everything waiting for a tenant admin, in both directions. Analysts can see the list; only admins can decide. Filter by status: *pending*, *applied* or *executed*, *rejected*, *failed*, or *all*. A failed item shows why, for example the error the other platform returned.

## Activity

**Activity** (admins) lists every MCP tool call: when it happened, whether it came *in* to Cy360 or went *out* to a platform, the tool, the key or connection, who made it (person, agent, schedule) and the outcome. Outcomes are *ok*, *error*, *denied*, *rate limited* or *pending approval*.

Arguments are not stored in full. Cy360 keeps a fingerprint and a short preview with secret-looking values hidden. Activity is kept for 90 days.

## How traffic is kept apart

- **Between tenants.** Keys, connections, approvals, pulls and activity are all stored per tenant, and the database itself refuses access across tenants. A key always works as its own tenant. A connection's credential is encrypted so that it only decrypts for that tenant and that connection.
- **Between applications.** Each application has its own key with its own access level, allowlist and rate limit. A session opened with one key can't be used with another. Each connected platform has its own credential, its own rate limit and its own session for every call. Its tools are always called with the connection prefix, so two platforms that both offer a tool such as `block_ip` can't be confused.

## Troubleshooting

| Symptom | Cause and fix |
|---|---|
| Client gets **401** | No key or a wrong, revoked or expired key. Check the `Authorization: Bearer cymk_…` header and the key's status under MCP Server. |
| Client gets **404** on `/mcp` | The MCP server is switched off, or the engine hasn't restarted since it was switched on. |
| Tool answers *needs 'write'* or *not in this MCP key's tool allowlist* | Raise the key's access or edit its allowlist under **Limits**. |
| Tool answers *Rate limit reached* | Raise the key's calls/min, or slow the client down. |
| Connection shows **unreachable** | Click **Tools** to see the error. Check the URL, transport and credential, then **Rescan**. |
| *… is a loopback, link-local, metadata or reserved address* / *belongs to the Cy360 platform's own network* | That address is refused on purpose. Use the platform's real address. |
| Connection shows **not signed in** or **sign-in expired** | Click **Sign in** (or **Sign in again**) on the connection. |
| Sign-in window says *needs a client id* | The provider doesn't allow automatic registration. Register an app with it using the redirect URI shown in the form, then enter its URLs, client id and secret. |
| Sign-in window says *Your Cy360 session was not found* | Finish the sign-in in the same browser you use for Cy360, and stay logged in to Cy360. |
| A tool shows **changed — review** and calls are denied | The platform changed it after you set it up. Review it under **Tools** and click **Allow**. |
| Pull shows **partial** — *records handed to CyDataLake* | CyDataLake is switched off (Settings → CyDataLake). |
| A tool is marked write but only reads | The platform didn't mark it read-only. An admin can click **Mark read**. |

# Troubleshooting

Start with the portal's own health pages, then the server. Most problems fall into one of the areas below; each table lists the symptom, the likely cause and the fix.

## First checks

1. **System Health → Integration Health** — which integrations or core services are **DOWN**, with the exact error. Unhealthy integrations also raise *Platform Health* incidents (Incidents → Security Hygiene).
2. **System Health → Server Status** — CPU, memory and especially **disk**. A full disk is the single most common cause of failures.
3. **System Health → Audit Trail** — filter *Result: failure* to see failed jobs, logins and configuration changes.
4. **Ask CyMind** (green button) — describe the symptom; it can see live status and knows the configuration steps.

## Collecting diagnostics on the server

```bash
docker compose ps                    # every service should be "healthy"
docker compose logs --tail 200 backend
docker compose logs --tail 200 cysiemstack-engine
df -h                                # free disk space
docker system df                     # space used by images and volumes
```

Container logs from before an update are archived for 30 days under `/opt/cyassure/container-logs/<service>/`. Read them with `zcat` or `zgrep`, for example `zgrep -h "Traceback" /opt/cyassure/container-logs/backend/*.log.gz`. Include these when you contact support.

## Installation and access

| Symptom | Likely cause | Fix |
|---|---|---|
| A service stays *unhealthy* in `docker compose ps` | A bad `.env` value, or the database still starting | Read `docker compose logs <service>`; wait ~30 s and re-check; fix the value it complains about and `docker compose up -d` again. |
| Database or event store crash-loops, errors mention *no space left on device* | Disk full, usually old Docker images | Free space (`docker image prune -a` removes images no container uses), then `docker compose up -d`. Enable *Docker Maintenance* in Settings → Scheduler to prevent it. |
| Can't reach the portal on `APP_PORT` | Firewall or security group blocks the port, or the port is already used | Open the port; change `APP_PORT` in `.env` if it clashes. |
| Login page has no Google/Microsoft buttons | OAuth credentials not set | Configure SSO in Settings → SSO & Email (or the `_CLIENT_ID`/`_CLIENT_SECRET` pair in `.env`) and restart the backend. |
| An SSO user can't get in after signing in | New SSO accounts wait for approval | An admin approves the user in Settings → Users & Roles (*Pending* filter). |
| *Permission denied* writing to `/opt/cyassure`, `/var/log/cyassure` or `/var/lib/cyassure-agent-packages` | Directories not owned by UID 999 (the containers' user) | `sudo chown -R 999:999 /opt/cyassure /var/lib/cyassure-agent-packages /var/log/cyassure`. On macOS/Docker Desktop: `sudo chmod -R o+w` on the same paths. |
| Settings → Organization Domain fails with "Permission denied — backend may need write access to .env" | `.env` not writable by the container | Update to the latest image and restart the backend (it repairs this on start); otherwise `chmod o+w .env` next to `docker-compose.yml` and `docker compose up -d backend`. |
| Settings → Update/Upgrade says "self-update is not enabled" | The updater sidecar isn't running | Enable it (see the Deployment Guide) or run `docker compose pull && docker compose up -d` yourself. |
| Enabling self-update created a second stack | `COMPOSE_PROJECT_NAME` doesn't match the real project | Check `docker compose ls`, correct `COMPOSE_PROJECT_NAME`, `docker compose down` the accidental stack, then `up -d`. |
| Portal looks unchanged after an update | Browser cache | Hard-refresh (Ctrl/Cmd + Shift + R). |

## Licence

| Symptom | Likely cause | Fix |
|---|---|---|
| A page or module you bought is missing | Licence not uploaded, or doesn't include that module | Settings → License shows the modules; upload the correct `.lic`. |
| Licence banner: grace period started | Licence expired, invalid, bound to another installation, or check-in failing | Settings → License → **Check in now**. Without internet, use *Copy activation request* / *Upload offline activation*. You have 30 days before Community limits apply; data is kept. |
| "Licensed seat count exceeded" in the Audit Trail | More admin/analyst users or endpoints than licensed | Remove or downgrade users (viewers don't use a seat), retire old agents, or buy more. After 30 days the newest extras are suspended. |
| An endpoint gets HTTP 402 / shows suspended | Over the asset limit after the grace period | Free capacity in Settings → License → *Licensed assets & seats*. |
| "License file problem" on a fresh Community install | Outdated image or a stale file at `/opt/cyassure/cyassure.lic` | Update the image; remove the stale file if you never had an Enterprise licence. |

## Endpoint agents (CyEDR)

| Symptom | Likely cause | Fix |
|---|---|---|
| Install command fails with "Cannot obtain CyEDR agent… check your deployment token and network" | Token expired/used up, endpoint can't reach Cy360, or agent packages not staged | Create a new deployment token; check the endpoint can reach your Cy360 address over HTTPS; update the backend image (it re-stages agent packages on start). |
| Agent installed but not in Fleet | Outbound HTTPS from the endpoint blocked, or wrong server address | Allow HTTPS to your Cy360 hostname; re-run the install command. |
| Fleet shows **LEGACY — REINSTALL** | Endpoint still runs the retired Python agent | Re-run the install command from Endpoint Defence → Installers. |
| Fleet shows **OUTDATED** | Agent waiting for its maintenance window (weekend by default) | Wait, or change the window in an Update Policy. |
| Remediation refused: "agent too old" | Script fixes need agent 0.0.30+ | Let the agent update (or change the Update Policy window), then propose again. |
| macOS endpoint enrolled but sends no process/file events | Full Disk Access not granted, or the agent crash-looping | Grant Full Disk Access through your MDM; check the agent's last exit reason and reinstall if it repeatedly fails to start. |
| Response command stuck in *Pending* | Agent offline or between check-ins | Check the agent's *Last seen* in Fleet; commands run on the next check-in. |
| Interactive Shell won't open | Host not isolated, or you're not an admin | Isolate the host first; the shell is admin-only by design. |
| No OS logs in Alerts | No Log Collection policy assigned | Assign a policy with Log Collection to the endpoints or their group. |

## Incidents and detections

| Symptom | Likely cause | Fix |
|---|---|---|
| Too many duplicate incidents for one noisy rule | Rule fires repeatedly on the same host | Detection Rules → **Noise Tuning**: *Group 24h* or *Context only* for that rule. |
| Known admin tools cause false positives | Cy360 doesn't know they're sanctioned | Detection Context → **Trusted Tools** / **Trusted Networks** / **Host Roles**. |
| An incident was closed automatically and shouldn't have been | AI triage judge or FP auto-close | Reopen it (its audit trail shows why it closed); raise the threshold in Settings → FP Auto-Close if it happens often. |
| No new alerts for 24 hours, and a "SIEM monitoring coverage" exposure incident | Agents or log sources stopped reporting | Check Integration Health and Fleet; the incident resolves when alerts flow again. |
| Threat hunting always shows 0 matches | No entity crossed a rule's threshold, or rules failing | *Run Hunt Now* reports rules run, matches and failures. |
| CyLogic (Sigma) tab empty | Rule corpus not loaded | Click **Refresh Corpus Now**; if still empty, update to the latest images. |

## Vulnerability Management

| Symptom | Likely cause | Fix |
|---|---|---|
| An asset has no findings | No software inventory yet, unsupported OS, or advisory feeds unreachable | Sources & Policy → coverage notes for that asset; make sure the server can reach `api.osv.dev` and `api.msrc.microsoft.com` over HTTPS. |
| Windows host shows no OS CVEs | Update revision unknown | Update the CyEDR agent, or run an agentless WinRM deep scan. |
| Findings marked lower confidence | Matched by keyword search, not a vendor advisory | Confirm the installed version before acting. |
| A patched CVE still open | Inventory not refreshed yet | Wait for the next inventory/6-hour cycle, or **Re-run now** in Sources & Policy; *Verify fix* re-checks one finding. |
| A Marketplace vulnerability source shows nothing | Credentials or permissions | Its last error is under Sources & Policy → Marketplace sources; fix the configuration in Marketplace. |

## Attack Surface scans

| Symptom | Likely cause | Fix |
|---|---|---|
| Only passive checks ran | Domain not verified | Settings → Exposure Monitoring → verify the domain (DNS TXT or website file). |
| Dark-web, Shodan, IP-reputation or code-leak sections empty | CyTIM not configured | Check Settings → Threat Intelligence; the first lines of the scan log say whether CyTIM is configured. |
| Deep scan produced no OpenVAS findings | OpenVAS stack not running, not enabled, or target looked like an IoT device | The Deep tier card on the Scans page states the exact reason. |
| *Launch Scan* fails with a permission error, or past scans vanished after an update | `/var/log/cyassure` not writable or not persisted on an old release | Update to the latest image; fix ownership as in *Installation* above. |
| Every asset suddenly shows *dropped* | The tenant's exposure domain was changed (baseline reset) | Expected; review and re-baseline in Inventory. |

## AI features (CyMind, AI Agents, enrichment)

| Symptom | Likely cause | Fix |
|---|---|---|
| CyMind says AI isn't configured / no AI summaries on incidents | Gateway mode is *None* or no provider | Settings → AI Gateway (Local or Cloud) and Settings → AI Providers. |
| "Local Ollama unreachable" in Integration Health | Local model server down or wrong URL | Check the Ollama server and the endpoint in Settings → AI Providers; or configure an external provider. |
| Agent run ends in ERROR with "429" or "rate limit" | Provider quota exhausted | Add a second provider (automatic failover) or a paid tier. |
| Anthropic test says the key "is not scoped to a workspace" | Key created outside a workspace | Create the key inside a workspace, or set `ANTHROPIC_WORKSPACE_ID` in Settings → Environment Config / Secrets Vault. |
| Personal-data agent asks about external AI and fails with no local model | External AI refused and no local model ready | Allow external providers for that run, or start Ollama and pull the model. |
| Incident enrichment missing even though chat works | The correlation engine hasn't picked up its gateway key | Restart `cysiemstack-engine`; Integration Health shows when it is configured. |

## Integrations and data sources

| Symptom | Likely cause | Fix |
|---|---|---|
| Marketplace item stuck at *Needs setup* | Installed but not configured | **Configure** it with credentials. |
| "No signed Marketplace package installed" on a connector | The connector's package is missing | Install the matching package in Marketplace (for example *Microsoft Entra ID* for Azure AD logs). |
| Marketplace catalog unavailable | CyAssure marketplace service unreachable from your server | Installed items keep working; check outbound HTTPS. |
| Cloud Inventory / Cloud Posture card red | An account's credentials or permissions failed | Marketplace → Cloud Asset Inventory → that account; grant the read-only roles listed on the page. |
| DSPM store shows sensitivity *unknown* | Never content-scanned (scanning off, store set to *never*, or credentials can't read objects) | Data Security → Settings → content scanning; check the store override and credentials. |
| Private-network databases never appear in DSPM | No in-environment scanner | Register and run a scanner (Data Security → Settings → Scanners). |
| Sandbox says "unavailable" | CyTIM not connected or no sandbox provider | Check Settings → Threat Intelligence; the CyTIM operator configures the provider. |

## Getting help

If the steps above don't resolve it, contact [Support](/support) with: your Cy360 version (Help page), the symptom and time it happened, screenshots, and the relevant log lines from `docker compose logs` or the container-log archive. Never send passwords, licence files or API keys.

# Asset Management

**Asset Management** (ITAM) is the single inventory of everything you own on your networks and in your clouds. Every other module hangs off it: incidents link to the asset they happened on, vulnerabilities are prioritised by the asset's criticality, and remediation runs on the asset's agent. It is a base module on every edition.

The section has two pages: **Network Assets** and **Cloud Inventory**.

## Network Assets

![Asset Management → Network Assets](/docs-img/itam-network-assets.jpg)

**What it is.** One record per device — IT endpoints, servers, mobile devices, IoT, OT and network gear — built from every discovery source and merged.

**Why it matters.** Coverage gaps are where attackers hide. Network Assets shows which devices have no agent and no log source (**UNMONITORED**), which devices sit in the wrong network segment, and which are reachable from the internet.

### The summary tiles

Total assets, EDR-covered assets (with the percentage), unmanaged, IoT/OT, internet-exposed, high risk (risk ≥ 75), misplaced (segment violations), stale/gone (unseen for more than 7/30 days) and open Shadow AI findings. The **EDR Coverage** bar shows how many devices came from each source (ARP, EDR, manual, SIEM…) and the split by device class.

### Where device data comes from

Discover scans (nmap), CyEDR agents (the device itself plus its subnet, gateway, Wi-Fi network and ARP neighbours), network-probe agents (mDNS, SNMP), switches and routers polled over SNMP, Meraki and Cisco ISE connectors, Jamf and Intune (managed devices are marked **MDM**), Cloud Inventory, CMDB CSV import and anything pushed with an ingest token. When sources disagree the more authoritative one wins; a value an analyst set by hand or imported from the CMDB is never overwritten by discovery.

### Assets tab

The inventory table. Use the **view presets** — *All*, *IT / Endpoints*, *IoT / OT*, *Network Infra*, *Unmanaged*, *Unknown*, *High Risk*, *Internet-exposed*, *Misplaced* — and the filters (search by IP, host name, MAC, vendor or owner; class; management state; zone; zone type; VLAN; liveness; site; coverage).

Each device shows EDR/SIEM coverage, device class, management state (agent, agentless, MDM, unmanaged, guest), zone and VLAN, switch and port, Wi-Fi network, owner and criticality, a 0–100 risk score with its reasons, an *Internet-exposed* badge and liveness (active; stale after 7 days unseen; gone after 30). The chevron expands location, ownership, IoT risk factors and exposure; clicking the row opens the **asset detail page**.

**Header buttons.** **Discover** scans the configured scan targets (admin). **Import CMDB** loads a CSV with columns such as `ip_address, hostname, mac_address, asset_type, vendor, owner, business_unit, criticality, site, zone, vlan`.

### The asset detail page

One page per device with three tabs:

- **Overview & Inventory** — identity, network location, installed software, ownership. Analysts can set the **owner**, **business unit**, **criticality** (1–5 — it also weights vulnerability priority and attack-surface risk) and, if the automatic class is wrong, a **device-class override**. Buttons for an agentless **Deep Scan** (SSH/WinRM), **SNMP Scan** and **Enrich CVEs**.
- **Security Profile** (when an agent or log source covers the device) — hardening checks (SCA: over 200 checks across Windows, macOS and Linux, covering accounts and passwords, remote access, network and kernel settings, logging and audit policy, malware protection, credential protection, updates, encryption and platform integrity, each with a severity and category you can filter by), vulnerabilities, file-integrity and malware events, MITRE techniques, compliance and alerts. Each item has **Remediate…** — see [Response & Remediation](/docs/response-and-remediation#remediation).
- **EDR Response** (when CyEDR is installed) — the forensic timeline, response commands and applied policies.

The header shows an **UNMONITORED** badge when nothing covers the device — install CyEDR from Endpoint Defence → Installers or connect its log source.

### Network Zones tab

Name each network and set its **zone type** (corporate, guest, secure, OT, DMZ, VPN, public), its CIDRs and/or VLAN IDs, which device classes are allowed, whether unmanaged devices are allowed, and the **policy action** when a device breaks the rules (alert, ticket, or quarantine automatically). A device gets its zone from its VLAN first, then the most specific CIDR. When agents see new gateways, Cy360 suggests new zones for you to approve or reject.

### Subnets & VLANs tab

Register each switch and router (admin; needs an SNMP credential profile from the Settings tab) and click **Poll now** (also re-polled every 6 hours). The probe agent covering that IP walks VLAN names, the MAC address table, LLDP/CDP neighbours, ARP and routes, so every device gets its VLAN and switch port. Meraki and ISE connectors provide the same without SNMP.

### Topology tab

A map of zone → VLAN/subnet → switch → device. Misplaced devices are drawn in red.

### Reachability tab

Which subnets a probe agent can reach (reachable / stale / unmonitored) and a zone-to-zone matrix of **intended** versus **observed** access. **Edit policy** (admin) sets what each zone type may reach — by default guest cannot reach corporate, secure, OT or DMZ; OT cannot reach guest or public; corporate cannot reach OT; secure cannot reach guest. **Run test** (admin): pick source and destination zones; a probe agent inside the source zone tries TCP connections to a few live hosts in the destination. Access that should be blocked but isn't raises an exposure incident (high for secure/OT destinations), which resolves when a later test sees it blocked.

### Segment Actions tab

Devices are flagged **misplaced** by five rules: a device class not allowed in its zone; an unmanaged device in a corporate/secure/OT zone that doesn't allow them; a managed corporate device on a guest or public network; a device first seen in the last 24 hours in a secure zone; and an internet-exposed IoT/OT device. Each raises an exposure incident that resolves when the device moves.

To act, open the device → **Move to segment / Quarantine**: choose move to VLAN, quarantine, block or release, the target and a reason. The dialog shows which executors cover the device (a Meraki or ISE connector with enforcement enabled, then CyEDR isolation, then a change ticket) and a dry-run plan. A **second admin** must approve. Quarantine undoes itself after 24 hours by default; **Rollback** reverses any completed action. Limits: 20 actions an hour per tenant, 3 pending per device.

### Settings tab

| Sub-tab | What you configure |
|---|---|
| **Scan Targets** | Internal subnets for Discover (up to /16), with an optional site and a pinned probe agent. Subnets behind NAT or firewalls need a CyEDR agent there with a *Network Probe* policy. |
| **Deep Scan Credentials** | SSH, WinRM and SNMP (v2c community or v3 user) credential profiles for agentless scans and switch polling. |
| **Network Connectors** | Cisco Meraki (Dashboard API key + organisation ID) and Cisco ISE (MnT + ERS credentials). **Test connection**, **Sync now** (also hourly). Enforcement (VLAN change, quarantine) is off until you enable it per connector. Credentials are encrypted and shown as •STORED•. |
| **Site Egress IPs** | Each site's public NAT addresses, so a device is flagged internet-exposed when the attack-surface scan sees an open port on the site's address that the device also listens on. |
| **Ingest Tokens** | Tokens (shown once) for a CMDB, DHCP/IPAM or other system to push device records to Cy360's ingest API. Revoke a token to cut it off. |

## Cloud Inventory

![Asset Management → Cloud Inventory](/docs-img/itam-cloud-inventory.jpg)

**What it is.** Servers, VMs and Kubernetes clusters discovered through each cloud provider's API — AWS (EC2, EKS), Azure (VMs, AKS), Google Cloud (Compute Engine, GKE), Oracle Cloud, Hetzner and DigitalOcean. It complements the CyEDR agent: it shows which cloud resources **exist**, not what runs inside them.

**How to set it up.** Cloud accounts are configured in **Marketplace → Cloud Asset Inventory → Configure** (several accounts per provider — for example one per GCP project). Grant read-only access: AWS *SecurityAudit*; Azure *Reader* on the subscription; Google *compute.viewer* (+ *container.clusterViewer* for GKE); Oracle *inspect all-resources*; Hetzner a read-only project token; DigitalOcean a read-scope token.

**How to use the page.** Each provider card lists its accounts with their last result and a **Sync** button; **Sync all providers** runs everything (accounts also sync automatically every 4 hours). Tiles show cloud assets, providers connected, VMs/servers, Kubernetes clusters and alarms (an account whose sync failed). The **Discovered assets** table can be filtered by provider and type. Discovered assets join the Network Assets registry, so coverage gaps show up there.

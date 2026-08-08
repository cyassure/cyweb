"""
marketplace-api — CyAssure Marketplace API Service
=======================================================
Companion service to the nginx static container. Shares a Docker volume
so that catalog.json is updated live (no CI rebuild required).

Routes
------
Admin — requires Authorization: Bearer {MARKETPLACE_ADMIN_TOKEN}
  POST /marketplace/api/publish                    CyAdmin pushes full catalog
  GET  /marketplace/api/submissions                List pending contributions
  POST /marketplace/api/submissions/<id>/approve   Approve → add to live catalog
  POST /marketplace/api/submissions/<id>/reject    Reject with reason

Cy360 — requires X-CyAssure-Token: {MARKETPLACE_CATALOG_TOKEN}
  POST /marketplace/api/submissions                Submit a contribution for review
  GET  /marketplace/catalog.json                   Fetch the catalog (see tiering note below)

Environment variables
---------------------
  MARKETPLACE_ADMIN_TOKEN         Secret known only to CyAdmin — gates publish + review
  MARKETPLACE_CATALOG_TOKEN       Shared with all Cy360 instances — gates fetch + submit
  MARKETPLACE_ENTERPRISE_PUBLIC_KEY  PEM public key — verifies the X-CyAssure-Entitlement-Token
                                      header (see "Content tiering" below). Must be the exact
                                      public-key counterpart of whichever private key the
                                      operator's CyAdmin deployment actually signs licenses
                                      with — NOT necessarily any specific value found in a
                                      Cy360 checkout's source tree, since a dev/test keypair
                                      and a production keypair are not interchangeable. If
                                      unset, every Enterprise-tier item is redacted for every
                                      request — fails closed, not open.
  DATA_DIR                        Shared volume path (default: /data)

Content tiering (2026-08-08)
-----------------------------
Every catalog item now carries a `tier` field ("community" or "enterprise",
set by the admin in CyAdmin, defaults to "community"). Community items are
returned in full to everyone. Enterprise items are always *visible* (name,
description, category, icon, vendor, tags, modules_required, estimated_time)
but `config_type`/`steps`/`cysoar_flow` — the fields actually needed to pull
and configure the item — are stripped unless the requester proves Enterprise
entitlement via the X-CyAssure-Entitlement-Token header. See
_verify_entitlement_token()/_apply_tier_redaction() below for the mechanism.

This is why GET /marketplace/catalog.json (this Flask route) is now the
PRIMARY way Cy360 fetches the catalog, not a fallback as previously
documented — redaction is per-request logic keyed off a header, and a
static file served straight off the shared volume by nginx can never do
that. See nginx.conf.template / docs/README.md for the routing change.
"""

import base64
import datetime
import json
import logging
import os
import re
from pathlib import Path

from flask import Flask, jsonify, request

from cryptography.exceptions import InvalidSignature
from cryptography.hazmat.primitives import hashes, serialization
from cryptography.hazmat.primitives.asymmetric import padding

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s  %(levelname)-8s %(message)s",
    datefmt="%Y-%m-%dT%H:%M:%S",
)
log = logging.getLogger("marketplace-api")

app = Flask(__name__)

DATA_DIR         = Path(os.getenv("DATA_DIR", "/data"))
CATALOG_FILE     = DATA_DIR / "catalog.json"
SUBMISSIONS_FILE = DATA_DIR / "submissions.json"
ADMIN_TOKEN      = os.getenv("MARKETPLACE_ADMIN_TOKEN", "")
CATALOG_TOKEN    = os.getenv("MARKETPLACE_CATALOG_TOKEN", "")

_ID_RE = re.compile(r"^[a-z0-9][a-z0-9\-]{1,48}[a-z0-9]$")

# ── Enterprise entitlement verification ────────────────────────────────────────
# Wire format is owned by CyAdmin's licenses/cyassure360.py — do not change
# independently. Token = "<payload_segment>.<signature_segment>", both
# base64url (RFC 4648 §5, no padding). payload_segment decodes to
# {"license_id","type":"enterprise","issued_at","expires_at"}. The signature
# covers the payload_segment's raw STRING bytes, not the decoded JSON —
# verify against exactly what was received on the wire, never re-serialize
# first (a different key order or whitespace would break a signature that
# was never computed over that re-serialized form).

_ENTERPRISE_PUBLIC_KEY_PEM = os.getenv("MARKETPLACE_ENTERPRISE_PUBLIC_KEY", "")
_ENTERPRISE_ONLY_FIELDS    = ("config_type", "steps", "cysoar_flow")

_enterprise_pubkey = None
if _ENTERPRISE_PUBLIC_KEY_PEM:
    try:
        _enterprise_pubkey = serialization.load_pem_public_key(_ENTERPRISE_PUBLIC_KEY_PEM.encode())
    except Exception as exc:
        log.error("MARKETPLACE_ENTERPRISE_PUBLIC_KEY is set but could not be parsed as a PEM "
                  "public key — all Enterprise-tier catalog items will be redacted until this "
                  "is fixed: %s", exc)
else:
    log.warning("MARKETPLACE_ENTERPRISE_PUBLIC_KEY is not set — every Enterprise-tier catalog "
                "item will be redacted for every request until an operator sets it (see this "
                "file's module docstring for what value belongs here).")


def _b64url_decode(s: str) -> bytes:
    pad = "=" * (-len(s) % 4)
    return base64.urlsafe_b64decode(s + pad)


def _verify_entitlement_token(token: str) -> dict | None:
    """Returns the decoded {license_id, type, issued_at, expires_at} dict if
    the token's signature verifies AND it has not expired — otherwise None.
    A missing header, an unparseable token, a bad signature, and an expired
    token are all treated identically (not entitled) — fail closed."""
    if not token or not _enterprise_pubkey:
        return None
    parts = token.split(".")
    if len(parts) != 2:
        return None
    payload_segment, signature_segment = parts
    try:
        signature = _b64url_decode(signature_segment)
        _enterprise_pubkey.verify(
            signature,
            payload_segment.encode(),  # verify over the raw text bytes actually received —
            padding.PKCS1v15(),        # matches `openssl dgst -sha256 -sign` (CyAdmin's signer),
            hashes.SHA256(),           # which defaults to PKCS1v15 padding, not PSS
        )
        payload = json.loads(_b64url_decode(payload_segment))
    except (InvalidSignature, ValueError, TypeError, KeyError):
        return None
    except Exception as exc:
        log.warning("Entitlement token verification error: %s", exc)
        return None

    if payload.get("type") != "enterprise":
        return None
    expires_at = payload.get("expires_at")
    if expires_at:
        try:
            if datetime.date.fromisoformat(expires_at) < datetime.date.today():
                return None
        except ValueError:
            return None  # unparseable expiry — treat as not entitled, don't guess
    return payload


def _apply_tier_redaction(items: list, entitled: bool) -> list:
    """Community items pass through untouched. Enterprise items are always
    kept (never removed from the response — they must stay discoverable to
    everyone) but lose the fields that let anyone actually install/configure
    them unless the caller proved entitlement. `locked` is computed here so
    the caller (Cy360) doesn't need to re-derive tier-vs-edition logic
    itself from a bare tier string."""
    out = []
    for raw in items:
        item = dict(raw)
        item["tier"] = item.get("tier") if item.get("tier") in ("community", "enterprise") else "community"
        if item["tier"] == "enterprise" and not entitled:
            for field in _ENTERPRISE_ONLY_FIELDS:
                item.pop(field, None)
            item["locked"] = True
        else:
            item["locked"] = False
        out.append(item)
    return out


# ── File helpers ──────────────────────────────────────────────────────────────

def _now():
    return datetime.datetime.utcnow().isoformat() + "Z"

def _today():
    return datetime.datetime.utcnow().strftime("%Y-%m-%d")

def _read_catalog():
    try:
        return json.loads(CATALOG_FILE.read_text())
    except (FileNotFoundError, json.JSONDecodeError):
        return {"version": "1.0", "updated": "", "items": []}

def _write_catalog(data):
    DATA_DIR.mkdir(parents=True, exist_ok=True)
    CATALOG_FILE.write_text(json.dumps(data, indent=2, ensure_ascii=False))

def _read_submissions():
    try:
        d = json.loads(SUBMISSIONS_FILE.read_text())
        return d if isinstance(d, dict) else {"submissions": []}
    except (FileNotFoundError, json.JSONDecodeError):
        return {"submissions": []}

def _write_submissions(data):
    DATA_DIR.mkdir(parents=True, exist_ok=True)
    SUBMISSIONS_FILE.write_text(json.dumps(data, indent=2, ensure_ascii=False))


# ── Auth ──────────────────────────────────────────────────────────────────────

def _check_admin():
    if not ADMIN_TOKEN:
        return None
    if request.headers.get("Authorization", "") == f"Bearer {ADMIN_TOKEN}":
        return None
    return jsonify({"error": "Admin token required"}), 403

def _check_catalog_token():
    if not CATALOG_TOKEN:
        return None
    if request.headers.get("X-CyAssure-Token", "") == CATALOG_TOKEN:
        return None
    return jsonify({"error": "Valid marketplace token required"}), 403


# ── Seed on startup ───────────────────────────────────────────────────────────

DATA_DIR.mkdir(parents=True, exist_ok=True)
if not CATALOG_FILE.exists():
    _write_catalog({"version": "1.0", "updated": _today(), "items": []})
    log.info("Seeded empty catalog at %s", CATALOG_FILE)
if not SUBMISSIONS_FILE.exists():
    _write_submissions({"submissions": []})
    log.info("Seeded empty submissions at %s", SUBMISSIONS_FILE)


# ── POST /marketplace/api/publish — CyAdmin pushes catalog ───────────────────

@app.route("/marketplace/api/publish", methods=["POST"])
def publish():
    err = _check_admin()
    if err:
        return err

    body  = request.get_json(silent=True) or {}
    items = body.get("items", [])
    if not isinstance(items, list):
        return jsonify({"error": "items must be an array"}), 400

    catalog = {
        "version": body.get("version", "1.0"),
        "updated": _today(),
        "items":   items,
    }
    _write_catalog(catalog)
    log.info("PUBLISH  items=%d", len(items))
    return jsonify({
        "ok":      True,
        "message": f"Published {len(items)} item(s) to cyassure.eu catalog.",
        "updated": catalog["updated"],
    })


# ── POST /marketplace/api/submissions — Cy360 submits a contribution ─────────

@app.route("/marketplace/api/submissions", methods=["POST"])
def submissions_create():
    err = _check_catalog_token()
    if err:
        return err

    data    = request.get_json(silent=True) or {}
    item_id = (data.get("id") or "").strip()

    if not item_id or not _ID_RE.match(item_id):
        return jsonify({"error": "id must be lowercase alphanumeric + hyphens, 3–50 chars"}), 400
    if not (data.get("name") or "").strip():
        return jsonify({"error": "name is required"}), 400
    if data.get("type") not in ("integration", "playbook"):
        return jsonify({"error": "type must be integration or playbook"}), 400
    if not (data.get("description") or "").strip():
        return jsonify({"error": "description is required"}), 400

    store = _read_submissions()
    existing_ids = {s["id"] for s in store["submissions"]}
    catalog_ids  = {i["id"] for i in _read_catalog().get("items", [])}
    if item_id in existing_ids or item_id in catalog_ids:
        return jsonify({"error": f"ID '{item_id}' already exists"}), 409

    sub = {
        "id":               item_id,
        "name":             (data.get("name") or "").strip(),
        "type":             data.get("type"),
        "description":      (data.get("description") or "").strip(),
        "category":         (data.get("category") or "").strip(),
        "vendor":           (data.get("vendor") or "CyAssure").strip(),
        "icon":             (data.get("icon") or "🔧").strip(),
        "color":            (data.get("color") or "#4d9eff").strip(),
        "tags":             [str(t).strip().lower() for t in (data.get("tags") or []) if str(t).strip()],
        "modules_required": [str(m).strip() for m in (data.get("modules_required") or []) if str(m).strip()],
        "config_type":      data.get("config_type") or None,
        "steps":            [str(s).strip() for s in (data.get("steps") or []) if str(s).strip()],
        "cysoar_flow":      (data.get("cysoar_flow") or "").strip(),
        "submitted_by":     (data.get("submitted_by") or "").strip(),
        "server_url":       (data.get("server_url") or "").strip(),
        "notes":            (data.get("notes") or "").strip(),
        "status":           "pending",
        "submitted_at":     _now(),
    }
    store["submissions"].append(sub)
    _write_submissions(store)
    log.info("SUBMISSION  id=%s  from=%s", item_id, sub["server_url"] or "unknown")
    return jsonify({"ok": True, "message": "Submission received.", "id": item_id}), 201


# ── GET /marketplace/api/submissions — CyAdmin lists pending ─────────────────

@app.route("/marketplace/api/submissions", methods=["GET"])
def submissions_list():
    err = _check_admin()
    if err:
        return err

    store   = _read_submissions()
    pending = [s for s in store["submissions"] if s.get("status") == "pending"]
    return jsonify({"ok": True, "submissions": pending, "count": len(pending)})


# ── POST /marketplace/api/submissions/<id>/approve ────────────────────────────

@app.route("/marketplace/api/submissions/<sub_id>/approve", methods=["POST"])
def submissions_approve(sub_id):
    err = _check_admin()
    if err:
        return err

    store = _read_submissions()
    idx   = next((i for i, s in enumerate(store["submissions"]) if s["id"] == sub_id), None)
    if idx is None:
        return jsonify({"error": "Submission not found"}), 404
    if store["submissions"][idx].get("status") != "pending":
        return jsonify({"error": f"Already {store['submissions'][idx].get('status')}"}), 409

    store["submissions"][idx]["status"]      = "approved"
    store["submissions"][idx]["approved_at"] = _now()
    _write_submissions(store)

    # Promote to live catalog immediately
    sub     = store["submissions"][idx]
    item    = {k: v for k, v in sub.items()
               if k not in ("status", "submitted_at", "approved_at", "submitted_by", "server_url", "notes", "rejection_reason")}
    item["added_at"] = _now()
    catalog = _read_catalog()
    catalog["items"] = [i for i in catalog.get("items", []) if i["id"] != item["id"]]
    catalog["items"].append(item)
    catalog["updated"] = _today()
    _write_catalog(catalog)

    log.info("APPROVE  id=%s  — catalog now %d items", sub_id, len(catalog["items"]))
    return jsonify({"ok": True, "message": f"'{sub['name']}' approved and live in catalog.", "item": item})


# ── POST /marketplace/api/submissions/<id>/reject ─────────────────────────────

@app.route("/marketplace/api/submissions/<sub_id>/reject", methods=["POST"])
def submissions_reject(sub_id):
    err = _check_admin()
    if err:
        return err

    store = _read_submissions()
    idx   = next((i for i, s in enumerate(store["submissions"]) if s["id"] == sub_id), None)
    if idx is None:
        return jsonify({"error": "Submission not found"}), 404

    data   = request.get_json(silent=True) or {}
    reason = (data.get("reason") or "").strip()
    if not reason:
        return jsonify({"error": "A rejection reason is required"}), 400

    store["submissions"][idx]["status"]           = "rejected"
    store["submissions"][idx]["rejected_at"]      = _now()
    store["submissions"][idx]["rejection_reason"] = reason
    _write_submissions(store)

    log.info("REJECT  id=%s  reason=%r", sub_id, reason[:80])
    return jsonify({"ok": True, "message": "Submission rejected."})


# ── GET /marketplace/catalog.json — the catalog fetch (see module docstring: this is ──
# ── now the PRIMARY path, not a nginx-absent fallback, because tier redaction needs  ──
# ── per-request logic a static file can never provide ──────────────────────────────────

@app.route("/marketplace/catalog.json", methods=["GET"])
def serve_catalog_json():
    """Serve the live catalog, per-request redacted for content tiering.

    Token gate matches nginx behaviour: if MARKETPLACE_CATALOG_TOKEN is set,
    request must include X-CyAssure-Token: <token> — this proves "you're a
    legitimate Cy360 instance allowed to read the catalog at all" and is
    unrelated to Enterprise entitlement.

    Separately, X-CyAssure-Entitlement-Token (optional) proves "this
    specific instance is Enterprise-licensed" — see _verify_entitlement_token().
    Community instances simply never send this header (no .lic file to read
    it from), which is itself the "not entitled" signal; no special-casing
    needed for that case.
    """
    if CATALOG_TOKEN:
        provided = request.headers.get("X-CyAssure-Token", "")
        if provided != CATALOG_TOKEN:
            return jsonify({"error": "Valid X-CyAssure-Token required"}), 403

    entitlement = _verify_entitlement_token(request.headers.get("X-CyAssure-Entitlement-Token", ""))
    catalog = _read_catalog()
    items = _apply_tier_redaction(catalog.get("items", []), entitled=entitlement is not None)

    resp = jsonify({
        "version": catalog.get("version", "1.0"),
        "updated": catalog.get("updated", ""),
        "items":   items,
    })
    resp.headers["Cache-Control"] = "no-store"
    resp.headers["Access-Control-Allow-Origin"]  = "*"
    resp.headers["Access-Control-Allow-Headers"] = "X-CyAssure-Token, X-CyAssure-Entitlement-Token"
    return resp


# ── Health ────────────────────────────────────────────────────────────────────

@app.route("/marketplace/api/health", methods=["GET"])
def health():
    catalog     = _read_catalog()
    submissions = _read_submissions()
    pending     = sum(1 for s in submissions.get("submissions", []) if s.get("status") == "pending")
    return jsonify({
        "ok":            True,
        "catalog_items": len(catalog.get("items", [])),
        "pending":       pending,
    })


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5050, debug=False)

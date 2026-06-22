"""
marketplace-api — CyCentra.com Marketplace API Service
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

Cy360 — requires X-CyCentra-Token: {MARKETPLACE_CATALOG_TOKEN}
  POST /marketplace/api/submissions                Submit a contribution for review

Environment variables
---------------------
  MARKETPLACE_ADMIN_TOKEN    Secret known only to CyAdmin — gates publish + review
  MARKETPLACE_CATALOG_TOKEN  Shared with all Cy360 instances — gates fetch + submit
  DATA_DIR                   Shared volume path (default: /data)
"""

import datetime
import json
import logging
import os
import re
from pathlib import Path

from flask import Flask, jsonify, request

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
    if request.headers.get("X-CyCentra-Token", "") == CATALOG_TOKEN:
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
        "message": f"Published {len(items)} item(s) to cycentra.com catalog.",
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
        "vendor":           (data.get("vendor") or "CyCentra").strip(),
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


# ── GET /marketplace/catalog.json — direct catalog fetch (used when nginx is absent) ──

@app.route("/marketplace/catalog.json", methods=["GET"])
def serve_catalog_json():
    """Serve the live catalog.json directly.

    In production nginx handles this from the shared volume.
    This endpoint allows standalone operation (local dev, direct port access).
    Token gate matches nginx behaviour: if MARKETPLACE_CATALOG_TOKEN is set,
    request must include X-CyCentra-Token: <token>.
    """
    if CATALOG_TOKEN:
        provided = request.headers.get("X-CyCentra-Token", "")
        if provided != CATALOG_TOKEN:
            return jsonify({"error": "Valid X-CyCentra-Token required"}), 403

    catalog = _read_catalog()
    resp = jsonify({
        "version": catalog.get("version", "1.0"),
        "updated": catalog.get("updated", ""),
        "items":   catalog.get("items", []),
    })
    resp.headers["Cache-Control"] = "no-store"
    resp.headers["Access-Control-Allow-Origin"]  = "*"
    resp.headers["Access-Control-Allow-Headers"] = "X-CyCentra-Token"
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

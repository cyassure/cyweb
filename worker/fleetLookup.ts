// CyAdmin's Fleet Monitor calls this to show who registered each install. A
// Cy360 install only ever reports its opaque registration ID, so name and
// email stay in the registrations table and fall under its retention and
// deletion rules. Verified registrations only: an unverified email proves nothing.

import { getVerifiedContacts } from "./db";

const MAX_IDS = 50;
const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

function json(data: unknown, status = 200): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

function matches(presented: string, expected: string): boolean {
  const a = new TextEncoder().encode(presented);
  const b = new TextEncoder().encode(expected);
  let diff = a.length ^ b.length;
  for (let i = 0; i < b.length; i++) diff |= (a[i] ?? 0) ^ b[i];
  return diff === 0;
}

export async function handleFleetLookup(request: Request, env: Env): Promise<Response> {
  if (!env.FLEET_LOOKUP_SECRET) return json({ error: "not_found" }, 404);

  const auth = request.headers.get("Authorization") ?? "";
  if (!auth.startsWith("Bearer ") || !matches(auth.slice("Bearer ".length), env.FLEET_LOOKUP_SECRET)) {
    return json({ error: "unauthorized" }, 401);
  }

  let body: { ids?: unknown };
  try {
    body = await request.json();
  } catch {
    return json({ error: "invalid_json" }, 400);
  }

  const { ids } = body;
  if (!Array.isArray(ids) || ids.length > MAX_IDS || !ids.every((id) => typeof id === "string" && UUID.test(id))) {
    return json({ error: "invalid_input" }, 400);
  }

  const rows = await getVerifiedContacts(env.DB, ids as string[]);
  return json({ registrations: Object.fromEntries(rows.map((r) => [r.id, { name: r.name, email: r.email }])) });
}

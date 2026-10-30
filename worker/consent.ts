// Sends each verified registration's consent to the consent ledger in Cy360
// Privacy Operations (POST /api/privacy/public/consent), so a withdrawal
// recorded there can be checked against this database. Sent after the email
// is confirmed, so the ledger only holds addresses their owner controls.
// A failed send stays pending and the daily cron retries it; the download
// never waits on Cy360. Unconfigured = nothing is sent.

const BATCH = 50;

// The privacy notice version the form's consent refers to.
export const CONSENT_NOTICE_VERSION = "1.1";

type Pending = { id: string; email: string };

function configured(env: Env): boolean {
  return Boolean(env.CY360_PRIVACY_URL && env.CY360_PRIVACY_KEY && env.CY360_NOTICE_ID && env.CY360_PURPOSE_ID);
}

export async function syncConsent(db: D1Database, env: Env, now: number): Promise<{ sent: number; pending: number }> {
  if (!configured(env)) return { sent: 0, pending: 0 };
  const { results } = await db
    .prepare(
      `SELECT id, email FROM registrations
        WHERE consent_at IS NOT NULL AND consent_synced_at IS NULL AND verified_at IS NOT NULL
        LIMIT ?1`,
    )
    .bind(BATCH)
    .all<Pending>();

  let sent = 0;
  for (const row of results) {
    const res = await fetch(`${env.CY360_PRIVACY_URL!.replace(/\/+$/, "")}/api/privacy/public/consent`, {
      method: "POST",
      headers: { "Content-Type": "application/json", "X-Cy360-Privacy-Key": env.CY360_PRIVACY_KEY! },
      body: JSON.stringify({
        action: "grant",
        principal: row.email,
        purposes: [env.CY360_PURPOSE_ID],
        notice_id: env.CY360_NOTICE_ID,
        language: "en",
        channel: "web",
      }),
    });
    if (!res.ok) {
      console.error("consent ledger refused a record", res.status);
      break;
    }
    await db.prepare("UPDATE registrations SET consent_synced_at = ?1 WHERE id = ?2").bind(now, row.id).run();
    sent += 1;
  }
  return { sent, pending: results.length - sent };
}

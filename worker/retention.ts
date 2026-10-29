// Retention for website registrations, as published in /privacy-notice:
//   verified registration      deleted 24 months after the last sign-up
//   unverified registration    deleted 12 months after the last sign-up
//   IP address and browser     cleared 12 months after the last sign-up
// Nothing goes sooner than 12 months: DPDP Rules 2025 rule 8(3) requires
// personal data and processing logs to be kept for at least one year.
// Runs daily from the cron trigger in wrangler.jsonc.

const DAY_MS = 24 * 60 * 60 * 1000;
export const VERIFIED_DAYS = 730;
export const UNVERIFIED_DAYS = 365;
export const TECHNICAL_DAYS = 365;

const LAST_SIGNUP = "COALESCE(updated_at, created_at)";

export type PurgeResult = { verified: number; unverified: number; technical: number };

export async function purgeExpired(db: D1Database, now: number): Promise<PurgeResult> {
  const [verified, unverified, technical] = await db.batch([
    db.prepare(`DELETE FROM registrations WHERE verified_at IS NOT NULL AND ${LAST_SIGNUP} < ?1`)
      .bind(now - VERIFIED_DAYS * DAY_MS),
    db.prepare(`DELETE FROM registrations WHERE verified_at IS NULL AND ${LAST_SIGNUP} < ?1`)
      .bind(now - UNVERIFIED_DAYS * DAY_MS),
    db.prepare(`UPDATE registrations SET ip = NULL, user_agent = NULL
                 WHERE ${LAST_SIGNUP} < ?1 AND (ip IS NOT NULL OR user_agent IS NOT NULL)`)
      .bind(now - TECHNICAL_DAYS * DAY_MS),
  ]);
  return {
    verified: verified.meta.changes ?? 0,
    unverified: unverified.meta.changes ?? 0,
    technical: technical.meta.changes ?? 0,
  };
}

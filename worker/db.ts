import { CONSENT_NOTICE_VERSION } from "./consent";
import type { RegistrationInput } from "./validate";

export interface RegistrationRow {
  id: string;
  name: string;
  email: string;
  company: string;
  phone: string | null;
  role: string | null;
  city: string | null;
  country: string | null;
  verify_token: string | null;
  verify_token_expires_at: number | null;
  verified_at: number | null;
  created_at: number;
  ip: string | null;
  user_agent: string | null;
}

const TOKEN_TTL_MS = 24 * 60 * 60 * 1000;

export interface UpsertResult {
  token: string;
  name: string;
  email: string;
}

export async function upsertRegistration(
  db: D1Database,
  input: RegistrationInput,
  meta: { ip: string | null; userAgent: string | null },
): Promise<UpsertResult> {
  const now = Date.now();
  const token = crypto.randomUUID();
  const expiresAt = now + TOKEN_TTL_MS;
  const email = input.email.toLowerCase();

  await db
    .prepare(
      `INSERT INTO registrations
         (id, name, email, company, phone, role, city, country, verify_token, verify_token_expires_at, verified_at, created_at, ip, user_agent, updated_at, consent_at, consent_notice_version)
       VALUES (?1, ?2, ?3, ?4, ?5, ?6, ?7, ?8, ?9, ?10, NULL, ?11, ?12, ?13, ?11, ?11, ?14)
       ON CONFLICT(email) DO UPDATE SET
         name = excluded.name,
         company = excluded.company,
         phone = excluded.phone,
         role = excluded.role,
         city = excluded.city,
         country = excluded.country,
         verify_token = excluded.verify_token,
         verify_token_expires_at = excluded.verify_token_expires_at,
         ip = excluded.ip,
         user_agent = excluded.user_agent,
         updated_at = excluded.updated_at,
         consent_at = excluded.consent_at,
         consent_notice_version = excluded.consent_notice_version,
         consent_synced_at = NULL`,
    )
    .bind(
      crypto.randomUUID(),
      input.name,
      email,
      input.company,
      input.phone || null,
      input.role || null,
      input.city || null,
      input.country || null,
      token,
      expiresAt,
      now,
      meta.ip,
      meta.userAgent,
      CONSENT_NOTICE_VERSION,
    )
    .run();

  return { token, name: input.name, email };
}

export async function getByVerifyToken(db: D1Database, token: string): Promise<RegistrationRow | null> {
  const row = await db
    .prepare("SELECT * FROM registrations WHERE verify_token = ?1")
    .bind(token)
    .first<RegistrationRow>();
  return row ?? null;
}

export async function getVerifiedRegistrationId(db: D1Database, email: string): Promise<string | null> {
  const row = await db
    .prepare("SELECT id FROM registrations WHERE email = ?1 AND verified_at IS NOT NULL")
    .bind(email)
    .first<{ id: string }>();
  return row?.id ?? null;
}

export async function getVerifiedContacts(
  db: D1Database,
  ids: string[],
): Promise<{ id: string; name: string; email: string }[]> {
  if (!ids.length) return [];
  const placeholders = ids.map((_, i) => `?${i + 1}`).join(", ");
  const { results } = await db
    .prepare(`SELECT id, name, email FROM registrations WHERE verified_at IS NOT NULL AND id IN (${placeholders})`)
    .bind(...ids)
    .all<{ id: string; name: string; email: string }>();
  return results;
}

export async function markVerified(db: D1Database, email: string): Promise<void> {
  await db
    .prepare("UPDATE registrations SET verified_at = ?1 WHERE email = ?2")
    .bind(Date.now(), email)
    .run();
}

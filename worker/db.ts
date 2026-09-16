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
         (id, name, email, company, phone, role, city, country, verify_token, verify_token_expires_at, verified_at, created_at, ip, user_agent)
       VALUES (?1, ?2, ?3, ?4, ?5, ?6, ?7, ?8, ?9, ?10, NULL, ?11, ?12, ?13)
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
         user_agent = excluded.user_agent`,
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

export async function markVerified(db: D1Database, email: string): Promise<void> {
  await db
    .prepare("UPDATE registrations SET verified_at = ?1 WHERE email = ?2")
    .bind(Date.now(), email)
    .run();
}

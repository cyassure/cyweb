const COOKIE_NAME = "cy_dl_session";
const SESSION_TTL_MS = 30 * 24 * 60 * 60 * 1000;

export interface SessionData {
  email: string;
  name: string;
}

function toBase64Url(bytes: ArrayBuffer | Uint8Array): string {
  const arr = bytes instanceof Uint8Array ? bytes : new Uint8Array(bytes);
  let binary = "";
  for (const byte of arr) binary += String.fromCharCode(byte);
  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

function fromBase64Url(value: string): Uint8Array {
  const padded = value.replace(/-/g, "+").replace(/_/g, "/").padEnd(value.length + ((4 - (value.length % 4)) % 4), "=");
  const binary = atob(padded);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
  return bytes;
}

async function hmacKey(secret: string): Promise<CryptoKey> {
  return crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign", "verify"],
  );
}

export async function createSessionCookie(secret: string, email: string, name: string): Promise<string> {
  const expires = Date.now() + SESSION_TTL_MS;
  const payloadB64 = toBase64Url(new TextEncoder().encode(JSON.stringify({ email, name, expires })));
  const key = await hmacKey(secret);
  const sig = await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(payloadB64));
  const value = `${payloadB64}.${toBase64Url(sig)}`;
  const maxAge = Math.floor(SESSION_TTL_MS / 1000);
  return `${COOKIE_NAME}=${value}; Path=/; Max-Age=${maxAge}; HttpOnly; Secure; SameSite=Lax`;
}

export async function readSession(secret: string, cookieHeader: string | null): Promise<SessionData | null> {
  if (!cookieHeader) return null;
  const match = cookieHeader.match(new RegExp(`(?:^|;\\s*)${COOKIE_NAME}=([^;]+)`));
  if (!match) return null;

  const [payloadB64, sigB64] = match[1].split(".");
  if (!payloadB64 || !sigB64) return null;

  try {
    const key = await hmacKey(secret);
    const valid = await crypto.subtle.verify(
      "HMAC",
      key,
      fromBase64Url(sigB64),
      new TextEncoder().encode(payloadB64),
    );
    if (!valid) return null;

    const payload = JSON.parse(new TextDecoder().decode(fromBase64Url(payloadB64))) as {
      email?: string;
      name?: string;
      expires?: number;
    };
    if (!payload.email || !payload.expires || Date.now() > payload.expires) return null;
    return { email: payload.email, name: payload.name ?? "" };
  } catch {
    return null;
  }
}

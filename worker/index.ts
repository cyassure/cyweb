import { registrationSchema } from "./validate";
import { upsertRegistration, getByVerifyToken, markVerified } from "./db";
import { sendVerificationEmail } from "./email";
import { createSessionCookie, readSession } from "./session";

function json(data: unknown, status = 200): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

function redirect(location: string, extraHeaders?: HeadersInit): Response {
  return new Response(null, { status: 302, headers: { Location: location, ...extraHeaders } });
}

async function handleRegister(request: Request, env: Env, url: URL): Promise<Response> {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return json({ error: "invalid_json" }, 400);
  }

  const parsed = registrationSchema.safeParse(body);
  if (!parsed.success) {
    return json({ error: "invalid_input", issues: parsed.error.flatten() }, 400);
  }

  const { token, name, email } = await upsertRegistration(env.DB, parsed.data, {
    ip: request.headers.get("CF-Connecting-IP"),
    userAgent: request.headers.get("User-Agent"),
  });

  const verifyUrl = new URL("/api/verify", url.origin);
  verifyUrl.searchParams.set("token", token);

  try {
    await sendVerificationEmail(env, email, name, verifyUrl.toString());
  } catch (err) {
    console.error("verification email failed", err);
    return json({ error: "email_failed" }, 502);
  }

  return json({ status: "pending" }, 202);
}

async function handleVerify(env: Env, url: URL): Promise<Response> {
  const token = url.searchParams.get("token");
  if (!token) return redirect(`${url.origin}/download?verified=0`);

  const row = await getByVerifyToken(env.DB, token);
  if (!row || !row.verify_token_expires_at || Date.now() > row.verify_token_expires_at) {
    return redirect(`${url.origin}/download?verified=0`);
  }

  await markVerified(env.DB, row.email);
  const cookie = await createSessionCookie(env.SESSION_SECRET, row.email, row.name);

  return redirect(`${url.origin}/download?verified=1`, { "Set-Cookie": cookie });
}

async function handleSession(request: Request, env: Env): Promise<Response> {
  const session = await readSession(env.SESSION_SECRET, request.headers.get("Cookie"));
  if (!session) return json({ verified: false });
  return json({ verified: true, name: session.name, email: session.email });
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.pathname === "/api/register" && request.method === "POST") {
      return handleRegister(request, env, url);
    }
    if (url.pathname === "/api/verify" && request.method === "GET") {
      return handleVerify(env, url);
    }
    if (url.pathname === "/api/session" && request.method === "GET") {
      return handleSession(request, env);
    }
    return json({ error: "not_found" }, 404);
  },
} satisfies ExportedHandler<Env>;

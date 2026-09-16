// Sends via Microsoft Graph, using a mailbox in the existing cyassure.eu M365
// tenant, rather than Cloudflare Email Sending — that product requires the
// Workers Paid plan, and this piggybacks on mail infrastructure already paid
// for and already DKIM-authenticated, with zero DNS changes to the zone.

interface GraphTokenResponse {
  access_token: string;
  expires_in: number;
}

async function getGraphAccessToken(env: Env): Promise<string> {
  const tokenUrl = `https://login.microsoftonline.com/${env.MS_GRAPH_TENANT_ID}/oauth2/v2.0/token`;
  const body = new URLSearchParams({
    client_id: env.MS_GRAPH_CLIENT_ID,
    client_secret: env.MS_GRAPH_CLIENT_SECRET,
    scope: "https://graph.microsoft.com/.default",
    grant_type: "client_credentials",
  });

  const res = await fetch(tokenUrl, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: body.toString(),
  });

  if (!res.ok) {
    throw new Error(`graph token request failed: ${res.status} ${await res.text()}`);
  }

  const data = (await res.json()) as GraphTokenResponse;
  return data.access_token;
}

export async function sendVerificationEmail(env: Env, to: string, name: string, verifyUrl: string): Promise<void> {
  const accessToken = await getGraphAccessToken(env);
  const firstName = name.trim().split(/\s+/)[0] || "there";

  const html = `
    <div style="font-family:Inter,system-ui,sans-serif;max-width:480px;margin:0 auto;padding:32px 24px;color:#111;">
      <p style="font-size:15px;">Hi ${escapeHtml(firstName)},</p>
      <p style="font-size:15px;line-height:1.5;">
        Confirm your email to unlock the Cy360 Community edition install command.
      </p>
      <p style="margin:28px 0;">
        <a href="${verifyUrl}" style="background:#0ea5b7;color:#fff;text-decoration:none;padding:12px 24px;border-radius:8px;font-weight:600;font-size:14px;display:inline-block;">
          Confirm &amp; unlock download
        </a>
      </p>
      <p style="font-size:13px;color:#666;">This link expires in 24 hours. If you didn't request this, you can ignore this email.</p>
      <p style="font-size:13px;color:#666;">— CyAssure</p>
    </div>
  `;

  const res = await fetch(
    `https://graph.microsoft.com/v1.0/users/${encodeURIComponent(env.MS_GRAPH_SENDER)}/sendMail`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message: {
          subject: "Confirm your email to download Cy360",
          body: { contentType: "HTML", content: html },
          toRecipients: [{ emailAddress: { address: to } }],
        },
        saveToSentItems: false,
      }),
    },
  );

  if (!res.ok) {
    throw new Error(`graph sendMail failed: ${res.status} ${await res.text()}`);
  }
}

function escapeHtml(value: string): string {
  return value.replace(/[&<>"']/g, (char) => {
    switch (char) {
      case "&":
        return "&amp;";
      case "<":
        return "&lt;";
      case ">":
        return "&gt;";
      case '"':
        return "&quot;";
      default:
        return "&#39;";
    }
  });
}

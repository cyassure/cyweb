// Secrets (set via `wrangler secret put`) aren't declared in wrangler.jsonc,
// so `wrangler types` can't see them — merge them into the generated global
// `Env` interface here instead of editing the generated file.
interface Env {
  SESSION_SECRET: string;
  MS_GRAPH_TENANT_ID: string;
  MS_GRAPH_CLIENT_ID: string;
  MS_GRAPH_CLIENT_SECRET: string;
  /** Mailbox to send verification emails from, e.g. "downloads@cyassure.eu". */
  MS_GRAPH_SENDER: string;
}

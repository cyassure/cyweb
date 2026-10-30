import { afterEach, describe, expect, it, vi } from "vitest";
import { syncConsent } from "./consent";

const env = {
  CY360_PRIVACY_URL: "https://cy360.example/",
  CY360_PRIVACY_KEY: "key",
  CY360_NOTICE_ID: "notice-1",
  CY360_PURPOSE_ID: "download",
} as unknown as Env;

function fakeDb(rows: { id: string; email: string }[]) {
  const updated: unknown[][] = [];
  const db = {
    prepare: (sql: string) => ({
      bind: (...args: unknown[]) => ({
        all: async () => ({ results: rows }),
        run: async () => {
          if (sql.startsWith("UPDATE")) updated.push(args);
        },
      }),
    }),
  };
  return { db: db as unknown as D1Database, updated };
}

describe("syncConsent", () => {
  afterEach(() => vi.unstubAllGlobals());

  it("records a grant and marks the row sent", async () => {
    const fetchMock = vi.fn(async () => new Response("{}", { status: 201 }));
    vi.stubGlobal("fetch", fetchMock);
    const { db, updated } = fakeDb([{ id: "r1", email: "a@example.com" }]);

    expect(await syncConsent(db, env, 1000)).toEqual({ sent: 1, pending: 0 });

    const [url, init] = fetchMock.mock.calls[0] as unknown as [string, RequestInit];
    expect(url).toBe("https://cy360.example/api/privacy/public/consent");
    expect(init.headers).toMatchObject({ "X-Cy360-Privacy-Key": "key" });
    expect(JSON.parse(init.body as string)).toEqual({
      action: "grant",
      principal: "a@example.com",
      purposes: ["download"],
      notice_id: "notice-1",
      language: "en",
      channel: "web",
    });
    expect(updated).toEqual([[1000, "r1"]]);
  });

  it("leaves a refused record pending for the next run", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => new Response("{}", { status: 503 })));
    vi.spyOn(console, "error").mockImplementation(() => {});
    const { db, updated } = fakeDb([
      { id: "r1", email: "a@example.com" },
      { id: "r2", email: "b@example.com" },
    ]);

    expect(await syncConsent(db, env, 1000)).toEqual({ sent: 0, pending: 2 });
    expect(updated).toEqual([]);
  });

  it("does nothing until Cy360 is configured", async () => {
    const fetchMock = vi.fn();
    vi.stubGlobal("fetch", fetchMock);
    const { db } = fakeDb([{ id: "r1", email: "a@example.com" }]);

    expect(await syncConsent(db, {} as Env, 1000)).toEqual({ sent: 0, pending: 0 });
    expect(fetchMock).not.toHaveBeenCalled();
  });
});

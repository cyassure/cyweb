import { describe, it, expect } from "vitest";
import { purgeExpired, VERIFIED_DAYS, UNVERIFIED_DAYS, TECHNICAL_DAYS } from "../../worker/retention";
import { contactSchema } from "../../worker/validate";

const DAY = 24 * 60 * 60 * 1000;

function fakeDb() {
  const statements: { sql: string; args: unknown[] }[] = [];
  const db = {
    prepare(sql: string) {
      const st = { sql, args: [] as unknown[], bind(...a: unknown[]) { st.args = a; return st; } };
      statements.push(st);
      return st;
    },
    async batch(sts: unknown[]) {
      return sts.map((_, i) => ({ meta: { changes: i + 1 } }));
    },
  };
  return { db: db as unknown as D1Database, statements };
}

describe("registration retention", () => {
  it("never deletes anything younger than one year (DPDP Rule 8(3))", () => {
    expect(Math.min(VERIFIED_DAYS, UNVERIFIED_DAYS, TECHNICAL_DAYS)).toBeGreaterThanOrEqual(365);
  });

  it("purges by last sign-up with the published periods", async () => {
    const { db, statements } = fakeDb();
    const now = Date.UTC(2028, 0, 1);
    const r = await purgeExpired(db, now);
    expect(r).toEqual({ verified: 1, unverified: 2, technical: 3 });
    expect(statements[0].sql).toMatch(/DELETE .* verified_at IS NOT NULL AND COALESCE\(updated_at, created_at\) < \?1/s);
    expect(statements[0].args).toEqual([now - 730 * DAY]);
    expect(statements[1].sql).toMatch(/verified_at IS NULL/);
    expect(statements[1].args).toEqual([now - 365 * DAY]);
    expect(statements[2].sql).toMatch(/SET ip = NULL, user_agent = NULL/);
    expect(statements[2].args).toEqual([now - 365 * DAY]);
  });
});

describe("privacy requests", () => {
  it("accepts the privacy destination used by /privacy-notice", () => {
    const ok = contactSchema.safeParse({ name: "A", email: "a@b.in", topic: "Withdraw consent",
      message: "Please act on my request.", destination: "privacy" });
    expect(ok.success).toBe(true);
    expect(contactSchema.safeParse({ name: "A", email: "a@b.in", message: "x", destination: "other" }).success)
      .toBe(false);
  });
});

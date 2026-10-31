import { describe, it, expect } from "vitest";
import { handleFleetLookup } from "../../worker/fleetLookup";

const ID = "3f21faf2-39fd-47a6-a82e-f6bfbcd38430";

function fakeDb(rows: { id: string; name: string; email: string }[]) {
  const seen: { sql: string; args: unknown[] }[] = [];
  const db = {
    prepare(sql: string) {
      const st = {
        bind(...args: unknown[]) {
          seen.push({ sql, args });
          return st;
        },
        async all() {
          return { results: rows };
        },
      };
      return st;
    },
  };
  return { db: db as unknown as D1Database, seen };
}

function lookup(body: unknown, auth = "Bearer s3cret") {
  return new Request("https://cyassure.eu/api/internal/registrations/lookup", {
    method: "POST",
    headers: { Authorization: auth },
    body: typeof body === "string" ? body : JSON.stringify(body),
  });
}

const env = (db: D1Database, secret: string | undefined = "s3cret") =>
  ({ DB: db, FLEET_LOOKUP_SECRET: secret }) as unknown as Env;

describe("fleet registration lookup", () => {
  it("does not exist until the secret is configured", async () => {
    const res = await handleFleetLookup(lookup({ ids: [ID] }), env(fakeDb([]).db, ""));
    expect(res.status).toBe(404);
  });

  it("rejects a missing or wrong secret without touching the database", async () => {
    const { db, seen } = fakeDb([]);
    expect((await handleFleetLookup(lookup({ ids: [ID] }, "Bearer nope"), env(db))).status).toBe(401);
    expect((await handleFleetLookup(lookup({ ids: [ID] }, "Bearer s3cret-longer"), env(db))).status).toBe(401);
    expect((await handleFleetLookup(lookup({ ids: [ID] }, ""), env(db))).status).toBe(401);
    expect(seen).toHaveLength(0);
  });

  it("rejects malformed input", async () => {
    const { db, seen } = fakeDb([]);
    for (const body of ["not json", { ids: "x" }, { ids: ["1 OR 1=1"] }, { ids: Array(51).fill(ID) }]) {
      expect((await handleFleetLookup(lookup(body), env(db))).status).toBe(400);
    }
    expect(seen).toHaveLength(0);
  });

  it("returns only name and email, and queries verified registrations only", async () => {
    const { db, seen } = fakeDb([{ id: ID, name: "Asha", email: "asha@acme.test" }]);
    const res = await handleFleetLookup(lookup({ ids: [ID] }), env(db));
    expect(await res.json()).toEqual({ registrations: { [ID]: { name: "Asha", email: "asha@acme.test" } } });
    expect(seen[0].sql).toContain("verified_at IS NOT NULL");
    expect(seen[0].args).toEqual([ID]);
  });
});

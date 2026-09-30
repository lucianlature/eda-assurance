import assert from "node:assert/strict";
import { cp, readFile } from "node:fs/promises";
import { join } from "node:path";
import { after, describe, it } from "node:test";
import { runNight } from "../src/night.ts";
import { loadQueue, setStatus, upsertItem } from "../src/queue.ts";
import { FIXTURE, tempRepo } from "./helpers.ts";

const cleanups: Array<() => Promise<void>> = [];
after(async () => {
  for (const c of cleanups) await c();
});

async function workspace(): Promise<string> {
  const { root, cleanup } = await tempRepo({});
  cleanups.push(cleanup);
  await cp(FIXTURE, join(root, "fixtures/payments-settled"), { recursive: true });
  return root;
}

describe("queue", () => {
  it("upsert keeps a human decision and refreshes the text", async () => {
    const ws = await workspace();
    const base = { id: "human:x", kind: "human" as const, needs: "lucian" as const, evidence: [] };
    await upsertItem(ws, { ...base, title: "old", detail: "old" });
    await setStatus(ws, "human:x", "later");
    await upsertItem(ws, { ...base, title: "new", detail: "new" });
    const [item] = await loadQueue(ws);
    assert.equal(item?.status, "later");
    assert.equal(item?.detail, "new");
  });
});

describe("night", () => {
  it("queues the fixture EDA-004 and never approves anything", async () => {
    const ws = await workspace();
    await runNight(ws);
    const items = await loadQueue(ws);
    assert.ok(items.length > 0);
    assert.ok(items.every((i) => i.status === "pending"));
    assert.ok(items.every((i) => i.needs === "lucian"));
    assert.ok(items.some((i) => i.id === "finding:payments-settled:EDA-004:payments.settled.v1"));
    assert.match(await readFile(join(ws, "ops/INBOX.md"), "utf8"), /Pending: \d+/);
  });

  it("does not touch the fixture topology", async () => {
    const ws = await workspace();
    const path = join(ws, "fixtures/payments-settled/.eventcontracts/topology.yaml");
    const before = await readFile(path, "utf8");
    await runNight(ws);
    assert.equal(await readFile(path, "utf8"), before);
  });

  it("seeds describe the current public Apache-2.0 distribution", async () => {
    const ws = await workspace();
    await runNight(ws);
    const npm = (await loadQueue(ws)).find((i) => i.id === "human:npm-status");
    assert.ok(npm);
    assert.doesNotMatch(npm.detail, /private|UNLICENSED/);
    const pkg = JSON.parse(await readFile(join(FIXTURE, "../../package.json"), "utf8"));
    assert.equal(pkg.license, "Apache-2.0");
    assert.notEqual(pkg.private, true);
  });
});

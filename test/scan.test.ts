import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { after, describe, it } from "node:test";
import { analyze, scan } from "../src/scan.ts";
import { FIXTURE, tempRepo } from "./helpers.ts";

const cleanups: Array<() => Promise<void>> = [];
after(async () => {
  for (const c of cleanups) await c();
});

async function repo(tree: Record<string, string>): Promise<string> {
  const { root, cleanup } = await tempRepo(tree);
  cleanups.push(cleanup);
  return root;
}

const rules = (fs: Array<{ rule: string }>) => fs.map((f) => f.rule).sort();

describe("analyze on payments-settled", () => {
  it("uses ts-events + fixture-topology and finds EDA-004 for ledger and reporting", async () => {
    const { topology, findings } = await analyze(FIXTURE);
    assert.deepEqual(topology.extractors, ["ts-events", "fixture-topology"]);
    assert.equal(topology.contracts.length, 1);
    const eda004 = findings.filter((f) => f.rule === "EDA-004");
    assert.equal(eda004.length, 2);
    assert.ok(eda004.some((f) => f.detail.includes("ledger-service")));
    assert.ok(eda004.some((f) => f.detail.includes("reporting-worker")));
    assert.ok(findings.some((f) => f.rule === "EDA-INFO-FIXTURE-FLEET"));
  });

  it("scan writes only under --out", async () => {
    const out = await repo({});
    await scan(FIXTURE, out);
    const md = await readFile(join(out, "findings.md"), "utf8");
    assert.match(md, /Breaking field removal/);
    assert.match(await readFile(join(out, "topology.yaml"), "utf8"), /payments\.settled\.v1/);
  });
});

describe("findings", () => {
  it("reports no-fleet info when no topology pins exist", async () => {
    const { findings } = await analyze(await repo({ "README.md": "empty" }));
    assert.deepEqual(rules(findings), ["EDA-INFO-NO-FLEET"]);
  });

  it("flags orphan producer (medium) and orphan consumer (high)", async () => {
    const root = await repo({
      ".eventcontracts/topology.yaml": [
        "contracts:",
        "  - id: order.placed",
        "    producer: shop",
        "  - id: order.shipped",
        "    consumers:",
        "      - service: mailer",
        "        requires: []",
      ].join("\n"),
    });
    const { findings } = await analyze(root);
    const producer = findings.find((f) => f.rule === "EDA-orphan-producer");
    const consumer = findings.find((f) => f.rule === "EDA-orphan-consumer");
    assert.equal(producer?.contract, "order.placed");
    assert.equal(producer?.severity, "medium");
    assert.equal(consumer?.contract, "order.shipped");
    assert.equal(consumer?.severity, "high");
  });

  it("flags a contract bound by services but never defined, once per contract", async () => {
    const root = await repo({
      "services/shop/index.mdx": "---\nid: shop\nsends:\n  - id: ghost.event\n---\n",
      "services/mailer/index.mdx": "---\nid: mailer\nreceives:\n  - ghost.event\n---\n",
    });
    const refs = (await analyze(root)).findings.filter((f) => f.rule === "EDA-undefined-ref");
    assert.equal(refs.length, 1);
    assert.equal(refs[0]?.contract, "ghost.event");
    assert.equal(refs[0]?.severity, "high");
    assert.match(refs[0]?.detail ?? "", /shop sends/);
    assert.match(refs[0]?.detail ?? "", /mailer receives/);
    assert.equal(refs[0]?.evidence.length, 2);
  });

  it("reports an undefined one-sided contract only as undefined-ref, not also as an orphan", async () => {
    const root = await repo({
      "services/mailer/index.mdx": "---\nid: mailer\nreceives:\n  - ghost.event\n---\n",
      "services/shop/index.mdx": "---\nid: shop\nsends:\n  - ghost.sent\n---\n",
    });
    const byContract = (await analyze(root)).findings
      .filter((f) => f.contract)
      .map((f) => `${f.contract}:${f.rule}`)
      .sort();
    assert.deepEqual(byContract, ["ghost.event:EDA-undefined-ref", "ghost.sent:EDA-undefined-ref"]);
  });

  it("does not flag contracts that are defined", async () => {
    const root = await repo({
      "events/order.placed/index.mdx": "---\nid: order.placed\n---\n",
      "services/shop/index.mdx": "---\nid: shop\nsends:\n  - order.placed\n---\n",
    });
    const { findings } = await analyze(root);
    assert.ok(!findings.some((f) => f.rule === "EDA-undefined-ref"));
    assert.ok(!(await analyze(FIXTURE)).findings.some((f) => f.rule === "EDA-undefined-ref"));
  });
});

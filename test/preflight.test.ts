import assert from "node:assert/strict";
import { access } from "node:fs/promises";
import { join } from "node:path";
import { describe, it } from "node:test";
import { worstState } from "../src/github.ts";
import { preflight, renderPreflight } from "../src/preflight.ts";
import { FIXTURE } from "./helpers.ts";

const CONTRACT = "payments.settled.v1";

describe("preflight on payments-settled", () => {
  it("flags the dropped settlementReference as REVIEW / EDA-004", async () => {
    const [r] = await preflight(FIXTURE);
    assert.ok(r);
    assert.equal(r.contract, CONTRACT);
    assert.equal(r.state, "REVIEW");
    assert.equal(r.rule, "EDA-004");
    assert.equal(r.producer, "billing-service");
    assert.deepEqual(r.change, { kind: "removed-required-field", fields: ["settlementReference"] });
    assert.equal(r.fleetSource, "fixture");
    assert.equal(r.rollingWindowSeconds, 252);
    const byService = Object.fromEntries(r.consumers.map((c) => [c.service, c]));
    assert.equal(byService["ledger-service"]?.status, "incompatible");
    assert.equal(byService["ledger-service"]?.deployedCommit, "a3f2c1e");
    assert.equal(byService["reporting-worker"]?.status, "incompatible");
    assert.equal(byService["notifications"]?.status, "compatible");
    assert.deepEqual(r.next, ["dual-publish v2", "redeploy consumers first", "signed exception"]);
  });

  it("passes when the field is kept", async () => {
    const [r] = await preflight(FIXTURE, {
      contract: CONTRACT,
      after: ["paymentId", "amount", "settlementReference"],
    });
    assert.equal(r?.state, "PASS");
    assert.equal(r?.rule, undefined);
    assert.ok(r?.consumers.every((c) => c.status === "compatible"));
  });

  it("passes an additive optional field", async () => {
    const [r] = await preflight(FIXTURE, {
      contract: CONTRACT,
      after: ["paymentId", "amount", "settlementReference", "note"],
    });
    assert.equal(r?.state, "PASS");
  });

  it("returns REVIEW, not PASS, for an unknown contract (silence is not PASS)", async () => {
    const [r] = await preflight(FIXTURE, { contract: "does.not.exist" });
    assert.equal(r?.state, "REVIEW");
    assert.deepEqual(r?.consumers, []);
  });

  it("never produces BLOCK (v0 is advisory)", async () => {
    const results = await preflight(FIXTURE);
    assert.ok(results.every((r) => r.state !== "BLOCK"));
    assert.equal(worstState(results), "REVIEW");
  });

  it("does not write a passport", async () => {
    await preflight(FIXTURE);
    await assert.rejects(access(join(FIXTURE, ".eventcontracts/passport.json")));
  });

  it("renders the enforce line only when enforcing", async () => {
    const results = await preflight(FIXTURE);
    assert.match(renderPreflight(results, { enforce: true }), /CI fails this PR\. No LLM/);
    assert.match(renderPreflight(results), /Advisory only\. No LLM/);
    assert.match(renderPreflight(results), /not live cluster/);
  });
});

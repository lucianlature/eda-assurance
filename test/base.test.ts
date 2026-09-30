import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import { rm, writeFile, mkdir } from "node:fs/promises";
import { dirname, join } from "node:path";
import { after, describe, it } from "node:test";
import { preflight, renderPreflight } from "../src/preflight.ts";
import { tempRepo } from "./helpers.ts";

const cleanups: Array<() => Promise<void>> = [];
after(async () => {
  for (const c of cleanups) await c();
});

const CONTRACT = "orders.placed.v1";
const producer = (fields: string) =>
  `export const CONTRACT = "${CONTRACT}";\nexport interface OrderPlaced {\n${fields}\n}\n`;
const P = "svc/apps/shop/src/events/order-placed.ts";
const C = "svc/apps/ledger/src/consumers/order-placed.handler.ts";

function git(root: string, ...args: string[]): string {
  return execFileSync("git", ["-C", root, "-c", "user.email=t@t", "-c", "user.name=t", ...args], {
    encoding: "utf8",
  }).trim();
}

async function put(root: string, rel: string, body: string): Promise<void> {
  await mkdir(dirname(join(root, rel)), { recursive: true });
  await writeFile(join(root, rel), body, "utf8");
}

/** Repo with a base commit where producer and consumer both require `ref`; returns the nested root `svc/`. */
async function repoAtBase(): Promise<{ repo: string; root: string; baseSha: string }> {
  const { root: repo, cleanup } = await tempRepo({
    [P]: producer("  id: string;\n  ref: string;"),
    [C]: producer("  id: string;\n  ref: string;"),
  });
  cleanups.push(cleanup);
  git(repo, "init", "-q");
  git(repo, "add", ".");
  git(repo, "commit", "-qm", "base");
  return { repo, root: join(repo, "svc"), baseSha: git(repo, "rev-parse", "HEAD") };
}

async function commit(repo: string): Promise<void> {
  git(repo, "add", "-A");
  git(repo, "commit", "-qm", "head");
}

describe("preflight --base", () => {
  it("catches a field dropped from producer and consumer together (head is self-consistent)", async () => {
    const { repo, root, baseSha } = await repoAtBase();
    await put(repo, P, producer("  id: string;"));
    await put(repo, C, producer("  id: string;"));
    await commit(repo);

    const [headOnly] = await preflight(root);
    assert.equal(headOnly?.state, "PASS");

    const [r] = await preflight(root, { base: "HEAD~1" });
    assert.equal(r?.state, "REVIEW");
    assert.equal(r?.rule, "EDA-004");
    assert.deepEqual(r?.change, { kind: "removed-required-field", fields: ["ref"] });
    assert.deepEqual(r?.base, { ref: "HEAD~1", sha: baseSha });
    const ledger = r?.consumers.find((c) => c.service === "ledger");
    assert.equal(ledger?.status, "incompatible");
    assert.equal(ledger?.fromBase, true);

    const md = renderPreflight([r!]);
    assert.match(md, /Base consumers: `[0-9a-f]{7}` \(HEAD~1\), from git history, not live cluster\./);
    assert.match(md, /incompatible \(running base\)/);
  });

  it("passes an additive optional field", async () => {
    const { repo, root } = await repoAtBase();
    await put(repo, P, producer("  id: string;\n  ref: string;\n  note?: string;"));
    await commit(repo);
    const [r] = await preflight(root, { base: "HEAD~1" });
    assert.equal(r?.state, "PASS");
    assert.ok(r?.base);
  });

  it("flags a contract dropped entirely at head while base consumers still receive it", async () => {
    const { repo, root } = await repoAtBase();
    await rm(join(repo, P));
    await rm(join(repo, C));
    await put(repo, "svc/README.md", "moved to v2\n");
    await commit(repo);
    const [r] = await preflight(root, { base: "HEAD~1" });
    assert.equal(r?.contract, CONTRACT);
    assert.equal(r?.state, "REVIEW");
    assert.equal(r?.change.kind, "removed-contract");
    assert.deepEqual(r?.consumers.map((c) => [c.service, c.status, c.fromBase]), [["ledger", "incompatible", true]]);
    assert.match(renderPreflight([r!]), /no longer produced or consumed at head/);
  });

  it("uses the worktree as head, so uncommitted edits are checked against the base", async () => {
    const { repo, root } = await repoAtBase();
    await put(repo, P, producer("  id: string;"));
    await put(repo, C, producer("  id: string;"));
    const [r] = await preflight(root, { base: "HEAD" });
    assert.equal(r?.state, "REVIEW");
  });

  it("falls back to head-only for an unknown ref", async () => {
    const { root } = await repoAtBase();
    const [r] = await preflight(root, { base: "no-such-ref" });
    assert.equal(r?.state, "PASS");
    assert.equal(r?.base, undefined);
  });

  it("falls back to head-only outside a git repo", async () => {
    const { root, cleanup } = await tempRepo({ [P]: producer("  id: string;") });
    cleanups.push(cleanup);
    const results = await preflight(join(root, "svc"), { base: "HEAD" });
    assert.ok(results.every((r) => r.base === undefined));
  });
});

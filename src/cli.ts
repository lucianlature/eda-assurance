#!/usr/bin/env node
import { basename, join, resolve } from "node:path";
import { parseArgs } from "node:util";
import { emitGithub } from "./github.ts";
import { runNight } from "./night.ts";
import { generatePassport } from "./passport.ts";
import { preflight, renderPreflight, type PreflightOpts } from "./preflight.ts";
import { loadQueue, renderInbox, setStatus, writeInbox } from "./queue.ts";
import { scan } from "./scan.ts";
import { ruleTitle } from "./rule-titles.ts";

const { values, positionals } = parseArgs({
  allowPositionals: true,
  options: {
    out: { type: "string", short: "o" },
    contract: { type: "string", short: "c" },
    after: { type: "string" },
    "fail-on": { type: "string" },
  },
});

const command = positionals[0] ?? "scan";
const root = resolve(positionals[1] ?? ".");
const failOn = values["fail-on"] ?? "review";

if (failOn !== "review" && failOn !== "never") {
  console.error("--fail-on must be 'review' or 'never'");
  process.exit(1);
}

function opts(): PreflightOpts {
  const after = values.after
    ?.split(",")
    .map((s) => s.trim())
    .filter((s) => s.length > 0);
  return {
    contract: values.contract,
    after: after && after.length > 0 ? after : undefined,
  };
}

function finish(results: Awaited<ReturnType<typeof preflight>>): void {
  const enforce = failOn === "review";
  const markdown = renderPreflight(results, { enforce });
  console.log(markdown);
  emitGithub(results, markdown, enforce);
  if (enforce && results.some((r) => r.state !== "PASS")) process.exitCode = 2;
}

if (command === "scan") {
  const outDir = resolve(values.out ?? join("reports", basename(root)));
  const { topology, findings } = await scan(root, outDir);
  const actionable = findings.filter((f) => f.severity !== "info");
  console.log(`scanned ${root}`);
  console.log(`extractors: ${topology.extractors.join(", ") || "(none)"}`);
  console.log(`contracts: ${topology.contracts.length}`);
  console.log(`findings: ${actionable.length}`);
  console.log(`wrote ${outDir}/topology.yaml`);
  console.log(`wrote ${outDir}/findings.md`);
  if (actionable.length > 0) {
    console.log("");
    for (const f of actionable) {
      console.log(`- [${f.severity}] ${ruleTitle(f.rule)}${f.contract ? ` ${f.contract}` : ""} (${f.rule})`);
    }
  }
} else if (command === "preflight") {
  finish(await preflight(root, opts()));
} else if (command === "passport") {
  const { path, results } = await generatePassport(root, opts());
  finish(results);
  console.log(`\nwrote ${path}`);
} else if (command === "night") {
  const workspace = resolve(positionals[1] ?? ".");
  const { inbox, scanned, queued } = await runNight(workspace);
  console.log(`night scanned ${scanned} roots, upserted ${queued} queue rows`);
  console.log(`wrote ${inbox}`);
} else if (command === "inbox") {
  const workspace = resolve(positionals[1] ?? ".");
  console.log(renderInbox(await loadQueue(workspace)));
} else if (command === "decide") {
  const id = positionals[1];
  const status = positionals[2];
  if (!id || (status !== "approve" && status !== "reject" && status !== "later")) {
    console.error("Usage: eda-assurance decide <id> <approve|reject|later>");
    process.exit(1);
  }
  const mapped = status === "approve" ? "approved" : status === "reject" ? "rejected" : "later";
  const workspace = resolve(".");
  const item = await setStatus(workspace, id, mapped);
  await writeInbox(workspace, await loadQueue(workspace));
  console.log(`${item.id} → ${item.status}`);
} else {
  console.error(
    "Usage: eda-assurance <scan|preflight|passport|night|inbox> [path] [--contract id] [--after a,b] [--fail-on review|never] [--out dir]",
  );
  process.exit(1);
}

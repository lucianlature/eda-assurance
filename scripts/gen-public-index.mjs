#!/usr/bin/env node
/**
 * Rebuild reports/public/INDEX.md from results.json.
 * Contract-backed = published async contracts (AsyncAPI / EventCatalog).
 * Inferred = code adapters only. Out of scope = no topology for this engine.
 */
import { readFile, writeFile, readdir } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { execSync } from "node:child_process";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const CONTRACT = new Set(["asyncapi", "eventcatalog"]);

function parseExtractors(s) {
  if (!s || s === "(none)") return [];
  return s.split(",").map((x) => x.trim()).filter(Boolean);
}

function tier(r) {
  if (!r.contracts || r.extractors === "(none)") return "out-of-scope";
  const ex = parseExtractors(r.extractors);
  if (ex.some((e) => CONTRACT.has(e))) return "contract";
  return "inferred";
}

function link(slug, github) {
  if (slug === "payments-settled") {
    return "[lucianlature/eda-assurance (fixture)](https://github.com/lucianlature/eda-assurance/tree/main/fixtures/payments-settled)";
  }
  const full = github[slug];
  if (!full) return `\`${slug}\``;
  const display =
    {
      "EventSourcing.NodeJS": "oskardudycz/EventSourcing",
      "AsyncAPI.NET": "LEGO/AsyncAPI",
    }[slug] ?? full;
  return `[${display}](https://github.com/${full})`;
}

const results = JSON.parse(
  await readFile(join(root, "reports/public/results.json"), "utf8"),
);
const github = {};
try {
  for (const name of await readdir(join(root, ".targets"))) {
    try {
      const url = execSync(
        `git -C ${JSON.stringify(join(root, ".targets", name))} remote get-url origin`,
        { encoding: "utf8" },
      ).trim();
      const m = url.match(/github\.com[/:]([^/]+\/[^/.]+)/);
      if (m) github[name] = m[1].replace(/\.git$/, "");
    } catch {
      /* ignore */
    }
  }
} catch {
  /* no .targets */
}
Object.assign(github, {
  "payments-settled": "lucianlature/eda-assurance",
  "EventSourcing.NodeJS": "oskardudycz/EventSourcing",
  "AsyncAPI.NET": "LEGO/AsyncAPI.NET",
  "ocoda-event-sourcing": "ocoda/event-sourcing",
  "cdk-patterns-serverless": "cdk-patterns/serverless",
  "asyncapi-website": "asyncapi/website",
  "vijitail-nestjs-kafka-microservices": "vijitail/nestjs-kafka-microservices",
});

const now = new Date().toISOString().replace(/\.\d+Z$/, "Z");
const byTier = { contract: [], inferred: [], "out-of-scope": [] };
for (const r of results) byTier[tier(r)].push(r);

for (const list of Object.values(byTier)) {
  list.sort(
    (a, b) =>
      b.contracts - a.contracts ||
      b.findings - a.findings ||
      a.slug.localeCompare(b.slug),
  );
}

const withFindings = results.filter((r) => r.findings > 0).length;

function rows(list) {
  return list.map((r) => {
    const ex =
      r.extractors === "(none)" ? "`(none)`" : `\`${r.extractors}\``;
    return `| ${link(r.slug, github)} | ${r.contracts} | ${r.findings} | ${ex} | [findings](${r.slug}/findings.md) · [topology](${r.slug}/topology.yaml) |`;
  });
}

const lines = [
  "# Public scan reports",
  "",
  `Generated ${now}.`,
  "",
  "Engine: `@lucianlature/eda-assurance` (`scan`).",
  "",
  "**Product surface** is the published contract layer (AsyncAPI, EventCatalog, plus Avro/JSON Schema / CloudEvents fixtures when present).",
  "**Adapters** (Nest, KafkaJS, AWS, NATS, pg-listen, domain event types, …) infer topology when no contract exists — best-effort, not the scoreboard.",
  "",
  "Language-agnostic the same way SpecShield is for OpenAPI: gate on the **async contract artifact**. Code extractors are optional adapters for repos that never published one. A silent .NET/MassTransit repo without AsyncAPI is **out of scope**, not an engine gap.",
  "",
  `Batch: **${results.length}** scanned. **${byTier.contract.length}** contract-backed. **${byTier.inferred.length}** inferred-only. **${byTier["out-of-scope"].length}** out of scope. **${withFindings}** with findings.`,
  "",
  "## Contract-backed",
  "",
  "Topology includes AsyncAPI and/or EventCatalog.",
  "",
  "| Repo | Contracts | Findings | Extractors | Report |",
  "| --- | ---: | ---: | --- | --- |",
  ...rows(byTier.contract),
  "",
  "## Inferred (adapters only)",
  "",
  "Useful for TS/Node bootstrap and audits without a published async contract. Not language-agnostic coverage.",
  "",
  "| Repo | Contracts | Findings | Extractors | Report |",
  "| --- | ---: | ---: | --- | --- |",
  ...rows(byTier.inferred),
  "",
  "## Out of scope",
  "",
  "No topology for this engine. Usually: no AsyncAPI/EventCatalog, and no matching adapter (e.g. pure .NET without a published async contract).",
  "",
  "| Repo | Contracts | Findings | Extractors | Report |",
  "| --- | ---: | ---: | --- | --- |",
  ...rows(byTier["out-of-scope"]),
  "",
  "## Scoreboard",
  "",
  "| Outcome | Count |",
  "| --- | ---: |",
  `| Contract-backed | ${byTier.contract.length} |`,
  `| Inferred only | ${byTier.inferred.length} |`,
  `| Out of scope | ${byTier["out-of-scope"].length} |`,
  `| Findings reported | ${withFindings} |`,
  "",
];

await writeFile(join(root, "reports/public/INDEX.md"), lines.join("\n"));
console.log(
  `INDEX: contract=${byTier.contract.length} inferred=${byTier.inferred.length} out-of-scope=${byTier["out-of-scope"].length}`,
);

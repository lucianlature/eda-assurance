import { mkdir, writeFile } from "node:fs/promises";
import { join, relative } from "node:path";
import { stringify } from "yaml";
import { extractAsyncApi } from "./extractors/asyncapi.ts";
import { extractAws } from "./extractors/aws.ts";
import { extractCloudEvents } from "./extractors/cloudevents.ts";
import { extractEventCatalog } from "./extractors/eventcatalog.ts";
import { extractEventSourcing } from "./extractors/event-sourcing.ts";
import { extractFixtureTopology } from "./extractors/fixture-topology.ts";
import { extractKafkaJs } from "./extractors/kafkajs.ts";
import { extractNats } from "./extractors/nats.ts";
import { extractNest } from "./extractors/nest.ts";
import { extractPgListen } from "./extractors/pg-listen.ts";
import { extractTsEvents } from "./extractors/ts-events.ts";
import type {
  Binding,
  Contract,
  ExtractorHit,
  Finding,
  Topology,
} from "./types.ts";
import { ruleTitle } from "./rule-titles.ts";

function rel(root: string, abs: string): string {
  return relative(root, abs).split("\\").join("/");
}

function mergeHits(root: string, hits: ExtractorHit[]): Topology {
  const byId = new Map<string, Topology["contracts"][number]>();
  let rollingWindowSeconds: number | undefined;

  for (const hit of hits) {
    if (hit.rollingWindowSeconds != null) {
      rollingWindowSeconds = hit.rollingWindowSeconds;
    }
    for (const c of hit.contracts) {
      const existing = byId.get(c.id);
      if (!existing) {
        byId.set(c.id, {
          id: c.id,
          kind: c.kind,
          requiredFields: [...c.requiredFields],
          producers: [],
          consumers: [],
          consumerRequires: [],
          sources: [rel(root, c.source)],
        });
      } else {
        existing.sources.push(rel(root, c.source));
        for (const f of c.requiredFields) {
          if (!existing.requiredFields.includes(f)) existing.requiredFields.push(f);
        }
      }
    }
  }

  for (const hit of hits) {
    for (const b of hit.bindings) {
      let row = byId.get(b.contract);
      if (!row) {
        row = {
          id: b.contract,
          kind: "event",
          requiredFields: [],
          producers: [],
          consumers: [],
          consumerRequires: [],
          sources: [rel(root, b.source)],
        };
        byId.set(b.contract, row);
      }
      const bucket = b.role === "producer" ? row.producers : row.consumers;
      if (!bucket.includes(b.service)) bucket.push(b.service);
    }
    for (const req of hit.consumerRequires ?? []) {
      const row = byId.get(req.contract);
      if (!row) continue;
      const already = row.consumerRequires.find((r) => r.service === req.service);
      if (already) {
        for (const f of req.fields) {
          if (!already.fields.includes(f)) already.fields.push(f);
        }
        if (!already.deployedCommit && req.deployedCommit) {
          already.deployedCommit = req.deployedCommit;
        }
      } else {
        row.consumerRequires.push({
          service: req.service,
          fields: [...req.fields],
          deployedCommit: req.deployedCommit,
          source: rel(root, req.source),
        });
      }
    }
  }

  return {
    root,
    extractors: hits.map((h) => h.extractor),
    rollingWindowSeconds,
    contracts: [...byId.values()].sort((a, b) => a.id.localeCompare(b.id)),
  };
}

function eventish(kind: Contract["kind"]): boolean {
  return kind === "event" || kind === "subject";
}

function findingsFrom(
  root: string,
  hits: ExtractorHit[],
  topology: Topology,
): Finding[] {
  const definedEvents = new Set(
    hits
      .flatMap((h) => h.contracts)
      .filter((c) => eventish(c.kind))
      .map((c) => c.id),
  );
  const findings: Finding[] = [];
  const hasDeclaredFleet = hits.some(
    (h) => h.extractor === "fixture-topology" && (h.consumerRequires?.length ?? 0) > 0,
  );

  if (hasDeclaredFleet) {
    findings.push({
      rule: "EDA-INFO-FIXTURE-FLEET",
      severity: "info",
      detail:
        "Consumer field expectations and rolling window come from .eventcontracts/topology.yaml. Those pins are fixture data, not live cluster state.",
      evidence: [".eventcontracts/topology.yaml"],
    });
  } else {
    findings.push({
      rule: "EDA-INFO-NO-FLEET",
      severity: "info",
      detail:
        "No deployed versions available. Rolling-window compatibility (breaking field removal vs live consumers) was not evaluated. This scan is in-repo topology only.",
      evidence: [],
    });
  }

  const bindings: Binding[] = hits.flatMap((h) => h.bindings);

  for (const row of topology.contracts) {
    if (!eventish(row.kind) && !definedEvents.has(row.id)) continue;
    if (!eventish(row.kind)) continue;

    if (row.producers.length > 0 && row.consumers.length === 0) {
      findings.push({
        rule: "EDA-orphan-producer",
        severity: "medium",
        contract: row.id,
        detail: `Event '${row.id}' is published by ${row.producers.join(", ")} but no service in this repo declares a consumer.`,
        evidence: row.sources,
      });
    }
    if (row.consumers.length > 0 && row.producers.length === 0) {
      findings.push({
        rule: "EDA-orphan-consumer",
        severity: "high",
        contract: row.id,
        detail: `Event '${row.id}' is consumed by ${row.consumers.join(", ")} but no service in this repo declares a producer.`,
        evidence: row.sources,
      });
    }

    if (row.requiredFields.length === 0) continue;
    for (const req of row.consumerRequires) {
      const missing = req.fields.filter((f) => !row.requiredFields.includes(f));
      if (missing.length === 0) continue;
      findings.push({
        rule: "EDA-004",
        severity: "high",
        contract: row.id,
        detail: `Removing required field(s) ${missing.map((f) => `\`${f}\``).join(", ")} from '${row.id}' is incompatible with ${req.service} during a rolling deploy${topology.rollingWindowSeconds != null ? ` (~${Math.round(topology.rollingWindowSeconds / 60)} min window)` : ""}. Dual-publish a v2, redeploy this consumer first, or file a signed exception.`,
        evidence: [req.source, ...row.sources],
      });
    }
  }

  for (const b of bindings) {
    const known = topology.contracts.find((c) => c.id === b.contract);
    const defined =
      known &&
      (eventish(known.kind) ||
        known.kind === "command" ||
        known.kind === "query" ||
        definedEvents.has(b.contract) ||
        hits.some((h) => h.contracts.some((c) => c.id === b.contract)));
    if (!defined) {
      findings.push({
        rule: "EDA-undefined-ref",
        severity: "high",
        contract: b.contract,
        detail: `Service '${b.service}' ${b.role === "producer" ? "sends" : "receives"} '${b.contract}', which has no event/command/query definition in this repo.`,
        evidence: [rel(root, b.source)],
      });
    }
  }

  return findings;
}

function renderFindings(findings: Finding[]): string {
  const lines = [
    "# Event-contract scan",
    "",
    `Findings: ${findings.filter((f) => f.severity !== "info").length} (plus ${findings.filter((f) => f.severity === "info").length} info)`,
    "",
  ];
  for (const f of findings) {
    const title = ruleTitle(f.rule);
    const contract = f.contract ? ` — \`${f.contract}\`` : "";
    lines.push(`## ${title}${contract}`);
    lines.push("");
    lines.push(`**${f.severity}.** ${f.detail}`);
    lines.push("");
    lines.push(`Rule id: \`${f.rule}\``);
    if (f.evidence.length > 0) {
      lines.push("");
      for (const e of f.evidence) lines.push(`- \`${e}\``);
    }
    lines.push("");
  }
  return lines.join("\n");
}

export async function analyze(root: string): Promise<{
  topology: Topology;
  findings: Finding[];
}> {
  const hits: ExtractorHit[] = [];
  for (const hit of [
    await extractEventCatalog(root),
    await extractAsyncApi(root),
    await extractAws(root),
    await extractCloudEvents(root),
    await extractEventSourcing(root),
    await extractKafkaJs(root),
    await extractNats(root),
    await extractNest(root),
    await extractPgListen(root),
    await extractTsEvents(root),
    await extractFixtureTopology(root),
  ]) {
    if (
      hit.contracts.length +
        hit.bindings.length +
        (hit.consumerRequires?.length ?? 0) >
      0
    ) {
      hits.push(hit);
    }
  }

  const topology = mergeHits(root, hits);
  const findings = findingsFrom(root, hits, topology);
  return { topology, findings };
}

export async function scan(root: string, outDir: string): Promise<{
  topology: Topology;
  findings: Finding[];
}> {
  const result = await analyze(root);
  await mkdir(outDir, { recursive: true });
  await writeFile(
    join(outDir, "topology.yaml"),
    stringify(result.topology, { lineWidth: 0 }),
    "utf8",
  );
  await writeFile(
    join(outDir, "findings.md"),
    renderFindings(result.findings),
    "utf8",
  );
  return result;
}

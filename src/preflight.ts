import { analyze } from "./scan.ts";
import type { Topology } from "./types.ts";

export type PreflightOpts = {
  contract?: string;
  after?: string[];
};

export type PreflightResult = {
  contract: string;
  producer?: string;
  change: {
    kind: "removed-required-field" | "none";
    fields: string[];
  };
  consumers: Array<{
    service: string;
    handlerExpects: "required" | "unused";
    missing: string[];
    status: "incompatible" | "compatible";
    deployedCommit?: string;
  }>;
  rollingWindowSeconds?: number;
  rule?: "EDA-004";
  state: "PASS" | "REVIEW" | "BLOCK";
  next: Array<
    "dual-publish v2" | "redeploy consumers first" | "signed exception"
  >;
  fleetSource: "fixture" | "extracted";
};

function preflightOne(
  topology: Topology,
  contractId: string,
  after?: string[],
): PreflightResult {
  const row = topology.contracts.find((c) => c.id === contractId);
  const fleetSource = topology.rollingWindowSeconds != null ? "fixture" : "extracted";
  if (!row) {
    return {
      contract: contractId,
      change: { kind: "none", fields: [] },
      consumers: [],
      state: "REVIEW",
      next: [],
      fleetSource,
    };
  }

  const producerFields = after ?? row.requiredFields;
  const consumers = row.consumers.map((service) => {
    const req = row.consumerRequires.find((c) => c.service === service);
    const extra = (req?.fields ?? []).filter((f) => !producerFields.includes(f));
    return {
      service,
      handlerExpects: extra.length > 0 ? ("required" as const) : ("unused" as const),
      missing: extra,
      status: extra.length > 0 ? ("incompatible" as const) : ("compatible" as const),
      deployedCommit: req?.deployedCommit,
    };
  });

  const fields = [...new Set(consumers.flatMap((c) => c.missing))];
  const broken = consumers.some((c) => c.status === "incompatible");

  return {
    contract: row.id,
    producer: row.producers[0],
    change: {
      kind: broken ? "removed-required-field" : "none",
      fields,
    },
    consumers,
    rollingWindowSeconds: topology.rollingWindowSeconds,
    rule: broken ? "EDA-004" : undefined,
    state: broken ? "REVIEW" : "PASS",
    next: broken
      ? ["dual-publish v2", "redeploy consumers first", "signed exception"]
      : [],
    fleetSource,
  };
}

export async function preflight(
  root: string,
  opts: PreflightOpts = {},
): Promise<PreflightResult[]> {
  const { topology } = await analyze(root);
  const ids = opts.contract
    ? [opts.contract]
    : topology.contracts
        .filter((c) => c.kind === "event" || c.kind === "subject")
        .map((c) => c.id);
  return ids.map((id) => preflightOne(topology, id, opts.after));
}

export function renderPreflight(
  results: PreflightResult[],
  opts: { enforce?: boolean } = {},
): string {
  return results
    .map((r) => {
      const lines = [
        `## Event contract preflight — \`${r.contract}\``,
        "",
        `**${r.state}**${r.rule ? ` · ${r.rule}` : ""} · producer \`${r.producer ?? "?"}\``,
      ];
      if (r.change.kind === "removed-required-field") {
        lines.push(
          `Change: removed required field(s) ${r.change.fields.map((f) => `\`${f}\``).join(", ")}.`,
        );
      }
      if (r.rollingWindowSeconds != null) {
        lines.push(
          `Rolling window: ~${Math.round(r.rollingWindowSeconds / 60)} min (${r.fleetSource} topology, not live cluster).`,
        );
      }
      lines.push("", "| Consumer | Expects extra field | Status |", "| --- | --- | --- |");
      for (const c of r.consumers) {
        const extra =
          c.missing.length > 0 ? c.missing.map((f) => `\`${f}\``).join(", ") : "—";
        lines.push(`| ${c.service} | ${extra} | ${c.status} |`);
      }
      if (r.next.length > 0) {
        lines.push("", "Before merging this change, pick one:", ...r.next.map((n) => `- ${n}`));
      }
      lines.push(
        "",
        opts.enforce && r.state !== "PASS"
          ? "CI fails this PR. No LLM was used for this result."
          : "Advisory only. No LLM was used for this result.",
      );
      return lines.join("\n");
    })
    .join("\n\n");
}

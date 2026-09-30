import { materializeBase } from "./git-base.ts";
import { analyze } from "./scan.ts";
import { ruleTitle } from "./rule-titles.ts";
import type { Topology } from "./types.ts";

export type PreflightOpts = {
  contract?: string;
  after?: string[];
  /** Git ref whose consumers are treated as still running during the rollout (e.g. the PR base). */
  base?: string;
};

type ConsumerResult = {
  service: string;
  handlerExpects: "required" | "unused";
  missing: string[];
  status: "incompatible" | "compatible";
  deployedCommit?: string;
  /** Requirement comes from the consumer code at the base ref, not from head or fixture pins. */
  fromBase?: boolean;
};

export type PreflightResult = {
  contract: string;
  producer?: string;
  change: {
    kind: "removed-required-field" | "removed-contract" | "none";
    fields: string[];
  };
  consumers: ConsumerResult[];
  rollingWindowSeconds?: number;
  rule?: "EDA-004";
  state: "PASS" | "REVIEW" | "BLOCK";
  next: Array<
    "dual-publish v2" | "redeploy consumers first" | "signed exception"
  >;
  fleetSource: "fixture" | "extracted";
  base?: { ref: string; sha: string };
};

const NEXT: PreflightResult["next"] = ["dual-publish v2", "redeploy consumers first", "signed exception"];

type Base = { topology: Topology; ref: string; sha: string };

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
    next: broken ? NEXT : [],
    fleetSource,
  };
}

function withBase(
  head: PreflightResult,
  headTopology: Topology,
  base: Base,
  after?: string[],
): PreflightResult {
  const baseRow = base.topology.contracts.find((c) => c.id === head.contract);
  if (!baseRow || baseRow.consumers.length === 0) return head;
  const ref = { ref: base.ref, sha: base.sha };
  const headRow = headTopology.contracts.find((c) => c.id === head.contract);

  if (!headRow) {
    return {
      contract: head.contract,
      producer: baseRow.producers[0],
      change: { kind: "removed-contract", fields: [] },
      consumers: baseRow.consumers.map((service) => ({
        service,
        handlerExpects: "required",
        missing: [],
        status: "incompatible",
        fromBase: true,
      })),
      state: "REVIEW",
      next: NEXT,
      fleetSource: head.fleetSource,
      base: ref,
    };
  }

  const producerFields = after ?? headRow.requiredFields;
  if (producerFields.length === 0) return head;

  const merged = new Map(head.consumers.map((c) => [c.service, c]));
  for (const c of preflightOne(base.topology, head.contract, producerFields).consumers) {
    const current = merged.get(c.service);
    if (!current) {
      merged.set(c.service, { ...c, deployedCommit: undefined, fromBase: true });
    } else if (c.status === "incompatible") {
      const missing = [...new Set([...current.missing, ...c.missing])];
      merged.set(c.service, {
        ...current,
        handlerExpects: "required",
        missing,
        status: "incompatible",
        fromBase: current.status === "compatible" ? true : current.fromBase,
      });
    }
  }

  const consumers = [...merged.values()];
  const fields = [...new Set(consumers.flatMap((c) => c.missing))];
  const broken = consumers.some((c) => c.status === "incompatible");
  return {
    ...head,
    change: { kind: broken ? "removed-required-field" : "none", fields },
    consumers,
    rule: broken ? "EDA-004" : undefined,
    state: broken ? "REVIEW" : "PASS",
    next: broken ? NEXT : [],
    base: ref,
  };
}

async function loadBase(root: string, ref: string): Promise<Base | undefined> {
  let tree;
  try {
    tree = await materializeBase(root, ref);
  } catch (err) {
    const reason = err instanceof Error ? err.message.split("\n")[0] : String(err);
    process.stderr.write(`eda-assurance: base '${ref}' unavailable (${reason}); head-only preflight.\n`);
    return undefined;
  }
  try {
    return { topology: (await analyze(tree.root)).topology, ref, sha: tree.sha };
  } finally {
    await tree.cleanup();
  }
}

const eventish = (c: Topology["contracts"][number]) => c.kind === "event" || c.kind === "subject";

export async function preflight(
  root: string,
  opts: PreflightOpts = {},
): Promise<PreflightResult[]> {
  const { topology } = await analyze(root);
  const base = opts.base ? await loadBase(root, opts.base) : undefined;
  const ids = opts.contract
    ? [opts.contract]
    : [
        ...new Set([
          ...topology.contracts.filter(eventish).map((c) => c.id),
          ...(base?.topology.contracts.filter((c) => eventish(c) && c.consumers.length > 0) ?? []).map((c) => c.id),
        ]),
      ].sort();
  return ids.map((id) => {
    const head = preflightOne(topology, id, opts.after);
    return base ? withBase(head, topology, base, opts.after) : head;
  });
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
        `**${r.state}**${r.rule ? ` · ${ruleTitle(r.rule)}` : ""} · producer \`${r.producer ?? "?"}\``,
      ];
      if (r.change.kind === "removed-required-field") {
        lines.push(
          `Change: removed required field(s) ${r.change.fields.map((f) => `\`${f}\``).join(", ")}.`,
        );
      }
      if (r.change.kind === "removed-contract") {
        lines.push("Change: no longer produced or consumed at head, but consumers at base still receive it.");
      }
      if (r.base) {
        lines.push(
          `Base consumers: \`${r.base.sha.slice(0, 7)}\` (${r.base.ref}), from git history, not live cluster.`,
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
        lines.push(`| ${c.service} | ${extra} | ${c.status}${c.fromBase ? " (running base)" : ""} |`);
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

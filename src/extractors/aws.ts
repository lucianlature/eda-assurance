import { readFile } from "node:fs/promises";
import { basename, relative, sep } from "node:path";
import { parse as parseYaml } from "yaml";
import type {
  Binding,
  Contract,
  ContractKind,
  ExtractorHit,
} from "../types.ts";
import { walk } from "../walk.ts";

function slug(s: string): string {
  return s
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 80);
}

function serviceFromPath(root: string, file: string): string {
  const parts = relative(root, file).split(sep);
  const step = parts.find((p) => /^step[\d_]/i.test(p));
  if (step) return step;

  const pkgs = parts.indexOf("packages");
  if (pkgs !== -1 && parts[pkgs + 1]) return parts[pkgs + 1]!;

  const apps = parts.indexOf("apps");
  if (apps !== -1 && parts[apps + 1]) return parts[apps + 1]!;

  // .../lib/<stack>-stack.ts → stack folder parent
  const lib = parts.lastIndexOf("lib");
  if (lib > 0 && parts[lib - 1]) return parts[lib - 1]!;

  const base = basename(file).replace(/\.(ts|js|ya?ml|json)$/i, "");
  if (base && base !== "index") return slug(base) || "aws-service";
  return "aws-service";
}

function skipPath(file: string): boolean {
  const n = file.split(sep).join("/");
  return (
    n.includes("/cdk.out/") ||
    n.includes("/node_modules/") ||
    n.includes("/dist/") ||
    n.includes("/build/") ||
    n.endsWith(".d.ts")
  );
}

function buildLocals(src: string): {
  strings: Map<string, string>;
  arrays: Map<string, string[]>;
  resources: Map<string, string>;
} {
  const strings = new Map<string, string>();
  const arrays = new Map<string, string[]>();
  const resources = new Map<string, string>();

  for (const m of src.matchAll(
    /(?:export\s+)?const\s+(\w+)\s*=\s*['"]([^'"]+)['"]/g,
  )) {
    strings.set(m[1]!, m[2]!);
  }

  for (const m of src.matchAll(
    /(?:export\s+)?const\s+(\w+)\s*=\s*\[([\s\S]*?)\]/g,
  )) {
    const vals = [...m[2]!.matchAll(/['"]([^'"]+)['"]/g)].map((x) => x[1]!);
    if (vals.length > 0) arrays.set(m[1]!, vals);
  }

  // const x = new sns.Topic(this, "Id" ...) / sqs.Queue
  for (const m of src.matchAll(
    /(?:const|let|var)\s+(\w+)\s*=\s*new\s+(?:\w+\.)?(Topic|Queue)\(\s*this\s*,\s*['"]([^'"]+)['"]/g,
  )) {
    const kind = m[2] === "Topic" ? "sns" : "sqs";
    resources.set(m[1]!, `${kind}:${m[3]}`);
  }

  return { strings, arrays, resources };
}

function resolveString(
  expr: string,
  strings: Map<string, string>,
): string | undefined {
  const t = expr.trim();
  const lit = t.match(/^['"]([^'"]+)['"]$/);
  if (lit?.[1]) return lit[1];
  return strings.get(t);
}

function expandDetailTypes(
  expr: string,
  arrays: Map<string, string[]>,
  strings: Map<string, string>,
): string[] {
  const out: string[] = [];
  const trimmed = expr.trim();

  // ["a", "b"] or ['a']
  if (trimmed.startsWith("[")) {
    for (const m of trimmed.matchAll(/['"]([^'"]+)['"]/g)) out.push(m[1]!);
    // [...mutations] or [...mutations,]
    for (const m of trimmed.matchAll(/\.\.\.\s*(\w+)/g)) {
      const arr = arrays.get(m[1]!);
      if (arr) out.push(...arr);
    }
    return [...new Set(out)];
  }

  const one = resolveString(trimmed, strings);
  if (one) return [one];
  const arr = arrays.get(trimmed);
  if (arr) return [...arr];
  return [];
}

function ensureContract(
  contracts: Contract[],
  seen: Set<string>,
  id: string,
  kind: ContractKind,
  source: string,
): void {
  if (!id || seen.has(id)) return;
  seen.add(id);
  contracts.push({ id, kind, source, requiredFields: [] });
}

function pushBinding(
  bindings: Binding[],
  seen: Set<string>,
  service: string,
  contract: string,
  role: "producer" | "consumer",
  source: string,
): void {
  if (!contract) return;
  const key = `${service}|${contract}|${role}|${source}`;
  if (seen.has(key)) return;
  seen.add(key);
  bindings.push({ service, contract, role, source });
}

function extractTsFile(
  root: string,
  file: string,
  src: string,
  contracts: Contract[],
  bindings: Binding[],
  contractSeen: Set<string>,
  bindingSeen: Set<string>,
): void {
  if (
    !/\bsns\b|\bsqs\b|\bevents\b|EventBridge|PutEvents|PublishCommand|SendMessage|SqsEventSource|SnsEventSource|detailType|DetailType|topicName|queueName/.test(
      src,
    )
  ) {
    return;
  }

  const service = serviceFromPath(root, file);
  const { strings, arrays, resources } = buildLocals(src);

  // SNS Topic constructs
  for (const m of src.matchAll(
    /new\s+(?:\w+\.)?Topic\(\s*this\s*,\s*['"]([^'"]+)['"]\s*(?:,\s*\{([^}]*)\})?/g,
  )) {
    const topicName = m[2]?.match(/topicName\s*:\s*['"]([^'"]+)['"]/)?.[1];
    const id = `sns:${topicName ?? m[1]}`;
    ensureContract(contracts, contractSeen, id, "event", file);
  }

  // SQS Queue constructs
  for (const m of src.matchAll(
    /new\s+(?:\w+\.)?Queue\(\s*this\s*,\s*['"]([^'"]+)['"]\s*(?:,\s*\{([\s\S]*?)\})?\s*\)/g,
  )) {
    const queueName = m[2]?.match(/queueName\s*:\s*['"]([^'"]+)['"]/)?.[1];
    const id = `sqs:${queueName ?? m[1]}`;
    ensureContract(contracts, contractSeen, id, "event", file);
    // Re-bind resource vars that used logical id when queueName differs
    for (const [varName, resId] of resources) {
      if (resId === `sqs:${m[1]}` && queueName) {
        resources.set(varName, id);
      }
    }
  }

  // EventBus named constructs
  for (const m of src.matchAll(
    /new\s+(?:\w+\.)?EventBus\(\s*this\s*,\s*['"]([^'"]+)['"]\s*(?:,\s*\{([^}]*)\})?/g,
  )) {
    const busName = m[2]?.match(/eventBusName\s*:\s*['"]([^'"]+)['"]/)?.[1];
    const id = `eb-bus:${busName ?? m[1]}`;
    ensureContract(contracts, contractSeen, id, "event", file);
  }

  // EventBridge rules: eventPattern detailType / source
  for (const m of src.matchAll(/eventPattern\s*:\s*\{([\s\S]*?)\n\s*\}/g)) {
    const body = m[1] ?? "";
    const detailExpr = body.match(/detailType\s*:\s*([^,\n]+(?:,)?)/)?.[1]
      ?? body.match(/detailType\s*:\s*(\[[\s\S]*?\])/)?.[1];
    const sourceExpr = body.match(/source\s*:\s*(\[[\s\S]*?\])/)?.[1];

    const detailTypes = detailExpr
      ? expandDetailTypes(detailExpr, arrays, strings)
      : [];
    const sources = sourceExpr
      ? expandDetailTypes(sourceExpr, arrays, strings)
      : [];

    if (detailTypes.length > 0) {
      for (const dt of detailTypes) {
        const id = dt;
        ensureContract(contracts, contractSeen, id, "event", file);
        pushBinding(bindings, bindingSeen, service, id, "consumer", file);
      }
    } else if (sources.length > 0) {
      for (const s of sources) {
        const id = `eb:${s}`;
        ensureContract(contracts, contractSeen, id, "event", file);
        pushBinding(bindings, bindingSeen, service, id, "consumer", file);
      }
    }
  }

  // SqsEventSource(queueVar) / SnsEventSource(topicVar)
  for (const m of src.matchAll(
    /new\s+(?:\w+\.)?(SqsEventSource|SnsEventSource)\(\s*(\w+)/g,
  )) {
    const res = resources.get(m[2]!);
    if (!res) continue;
    ensureContract(contracts, contractSeen, res, "event", file);
    pushBinding(bindings, bindingSeen, service, res, "consumer", file);
  }

  // SDK / client PutEvents DetailType literals → producer
  for (const m of src.matchAll(/DetailType\s*:\s*['"]([^'"]+)['"]/g)) {
    const id = m[1]!;
    if (id.includes("${")) continue;
    ensureContract(contracts, contractSeen, id, "event", file);
    pushBinding(bindings, bindingSeen, service, id, "producer", file);
  }

  // source: ["app"] near PutEvents / Entries often producer; catch PutEventsCommand blocks
  for (const m of src.matchAll(
    /PutEvents(?:Command)?\s*\(\s*\{([\s\S]*?)\}\s*\)/g,
  )) {
    const block = m[1] ?? "";
    for (const dt of block.matchAll(/DetailType\s*:\s*['"]([^'"]+)['"]/g)) {
      const id = dt[1]!;
      ensureContract(contracts, contractSeen, id, "event", file);
      pushBinding(bindings, bindingSeen, service, id, "producer", file);
    }
  }

  // SNS Publish with literal TopicArn ending in :topic-name
  for (const m of src.matchAll(
    /TopicArn\s*:\s*['"]([^'"]+)['"]/g,
  )) {
    const arn = m[1]!;
    const name = arn.split(":").pop();
    if (!name || name.includes("$")) continue;
    const id = `sns:${name}`;
    ensureContract(contracts, contractSeen, id, "event", file);
    pushBinding(bindings, bindingSeen, service, id, "producer", file);
  }

  // SQS SendMessage QueueUrl literal
  for (const m of src.matchAll(
    /QueueUrl\s*:\s*['"]([^'"]+)['"]/g,
  )) {
    const url = m[1]!;
    if (url.includes("${") || url.includes("$")) continue;
    const name = url.split("/").pop();
    if (!name) continue;
    const id = `sqs:${name}`;
    ensureContract(contracts, contractSeen, id, "event", file);
    pushBinding(bindings, bindingSeen, service, id, "producer", file);
  }

  // AppSync→EventBridge: forEach over mutation names with requestTemplate → producer
  for (const m of src.matchAll(
    /(\w+)\.forEach\s*\(\s*\(\s*(\w+)\s*\)\s*=>\s*\{([\s\S]*?)\n\s*\}\s*\)/g,
  )) {
    const body = m[3] ?? "";
    if (!/requestTemplate|DetailType|EventBridge|events\./.test(body)) continue;
    const arr = arrays.get(m[1]!);
    if (!arr) continue;
    for (const dt of arr) {
      ensureContract(contracts, contractSeen, dt, "event", file);
      pushBinding(bindings, bindingSeen, service, dt, "producer", file);
    }
  }
}

function isObj(v: unknown): v is Record<string, unknown> {
  return Boolean(v) && typeof v === "object" && !Array.isArray(v);
}

function extractCfnResources(
  file: string,
  service: string,
  doc: Record<string, unknown>,
  contracts: Contract[],
  bindings: Binding[],
  contractSeen: Set<string>,
  bindingSeen: Set<string>,
): void {
  const resources = isObj(doc.Resources) ? doc.Resources : {};
  for (const [, raw] of Object.entries(resources)) {
    if (!isObj(raw)) continue;
    const type = typeof raw.Type === "string" ? raw.Type : "";
    const props = isObj(raw.Properties) ? raw.Properties : {};

    if (type === "AWS::SNS::Topic") {
      const name =
        typeof props.TopicName === "string" ? props.TopicName : undefined;
      const id = name ? `sns:${name}` : undefined;
      if (id) ensureContract(contracts, contractSeen, id, "event", file);
    }

    if (type === "AWS::SQS::Queue") {
      const name =
        typeof props.QueueName === "string" ? props.QueueName : undefined;
      if (name) {
        const id = `sqs:${name}`;
        ensureContract(contracts, contractSeen, id, "event", file);
      }
    }

    if (type === "AWS::Events::Rule") {
      const pattern = props.EventPattern;
      let parsed: unknown = pattern;
      if (typeof pattern === "string") {
        try {
          parsed = JSON.parse(pattern);
        } catch {
          parsed = undefined;
        }
      }
      if (!isObj(parsed)) continue;
      const detailTypes = Array.isArray(parsed["detail-type"])
        ? parsed["detail-type"]
        : Array.isArray(parsed.detailType)
          ? parsed.detailType
          : [];
      const sources = Array.isArray(parsed.source) ? parsed.source : [];
      const dts = detailTypes.filter((x): x is string => typeof x === "string");
      if (dts.length > 0) {
        for (const dt of dts) {
          ensureContract(contracts, contractSeen, dt, "event", file);
          pushBinding(bindings, bindingSeen, service, dt, "consumer", file);
        }
      } else {
        for (const s of sources) {
          if (typeof s !== "string") continue;
          const id = `eb:${s}`;
          ensureContract(contracts, contractSeen, id, "event", file);
          pushBinding(bindings, bindingSeen, service, id, "consumer", file);
        }
      }
    }
  }
}

function extractServerlessEvents(
  file: string,
  service: string,
  doc: Record<string, unknown>,
  contracts: Contract[],
  bindings: Binding[],
  contractSeen: Set<string>,
  bindingSeen: Set<string>,
): void {
  const fns = isObj(doc.functions) ? doc.functions : {};
  for (const [fnName, raw] of Object.entries(fns)) {
    if (!isObj(raw)) continue;
    const events = Array.isArray(raw.events) ? raw.events : [];
    const svc = `${service}/${fnName}`;
    for (const ev of events) {
      if (!isObj(ev)) continue;
      if (typeof ev.sns === "string") {
        const id = `sns:${ev.sns}`;
        ensureContract(contracts, contractSeen, id, "event", file);
        pushBinding(bindings, bindingSeen, svc, id, "consumer", file);
      } else if (isObj(ev.sns) && typeof ev.sns.topicName === "string") {
        const id = `sns:${ev.sns.topicName}`;
        ensureContract(contracts, contractSeen, id, "event", file);
        pushBinding(bindings, bindingSeen, svc, id, "consumer", file);
      }
      if (typeof ev.sqs === "string" && !ev.sqs.includes(":")) {
        const id = `sqs:${ev.sqs}`;
        ensureContract(contracts, contractSeen, id, "event", file);
        pushBinding(bindings, bindingSeen, svc, id, "consumer", file);
      }
      if (isObj(ev.eventBridge)) {
        const pattern = isObj(ev.eventBridge.pattern)
          ? ev.eventBridge.pattern
          : {};
        const dts = Array.isArray(pattern["detail-type"])
          ? pattern["detail-type"]
          : [];
        const sources = Array.isArray(pattern.source) ? pattern.source : [];
        if (dts.some((x) => typeof x === "string")) {
          for (const dt of dts) {
            if (typeof dt !== "string") continue;
            ensureContract(contracts, contractSeen, dt, "event", file);
            pushBinding(bindings, bindingSeen, svc, dt, "consumer", file);
          }
        } else {
          for (const s of sources) {
            if (typeof s !== "string") continue;
            const id = `eb:${s}`;
            ensureContract(contracts, contractSeen, id, "event", file);
            pushBinding(bindings, bindingSeen, svc, id, "consumer", file);
          }
        }
      }
    }
  }
}

async function extractYamlOrJson(
  root: string,
  file: string,
  contracts: Contract[],
  bindings: Binding[],
  contractSeen: Set<string>,
  bindingSeen: Set<string>,
): Promise<void> {
  let raw: string;
  try {
    raw = await readFile(file, "utf8");
  } catch {
    return;
  }
  if (raw.length > 2_000_000) return;
  if (
    !/AWS::SNS::Topic|AWS::SQS::Queue|AWS::Events::Rule|eventBridge:|functions:/.test(
      raw,
    )
  ) {
    return;
  }

  let doc: unknown;
  try {
    doc = file.endsWith(".json") ? JSON.parse(raw) : parseYaml(raw);
  } catch {
    return;
  }
  if (!isObj(doc)) return;

  const service = serviceFromPath(root, file);
  extractCfnResources(
    file,
    service,
    doc,
    contracts,
    bindings,
    contractSeen,
    bindingSeen,
  );
  extractServerlessEvents(
    file,
    service,
    doc,
    contracts,
    bindings,
    contractSeen,
    bindingSeen,
  );
}

export async function extractAws(root: string): Promise<ExtractorHit> {
  const files = await walk(
    root,
    (p) =>
      (p.endsWith(".ts") ||
        p.endsWith(".js") ||
        p.endsWith(".yaml") ||
        p.endsWith(".yml") ||
        p.endsWith(".json")) &&
      !skipPath(p),
  );

  const contracts: Contract[] = [];
  const bindings: Binding[] = [];
  const contractSeen = new Set<string>();
  const bindingSeen = new Set<string>();

  for (const file of files) {
    if (file.endsWith(".ts") || file.endsWith(".js")) {
      let src: string;
      try {
        src = await readFile(file, "utf8");
      } catch {
        continue;
      }
      if (src.length > 1_500_000) continue;
      extractTsFile(
        root,
        file,
        src,
        contracts,
        bindings,
        contractSeen,
        bindingSeen,
      );
    } else {
      await extractYamlOrJson(
        root,
        file,
        contracts,
        bindings,
        contractSeen,
        bindingSeen,
      );
    }
  }

  return { extractor: "aws", contracts, bindings };
}

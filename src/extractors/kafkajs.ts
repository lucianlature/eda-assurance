import { readFile } from "node:fs/promises";
import { basename, relative, sep } from "node:path";
import type {
  Binding,
  ConsumerRequire,
  Contract,
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

  const apps = parts.indexOf("apps");
  if (apps !== -1 && parts[apps + 1]) return parts[apps + 1]!;

  const examples = parts.indexOf("examples");
  if (examples !== -1 && parts[examples + 1]) return parts[examples + 1]!;

  const pkgs = parts.indexOf("packages");
  if (pkgs !== -1 && parts[pkgs + 1]) return parts[pkgs + 1]!;

  // fixtures/avsc/... → avro / schema-registry
  if (parts.includes("fixtures") || parts.includes("avsc")) {
    return "schema-registry";
  }

  const src = parts.indexOf("src");
  if (src !== -1 && parts[src + 1] && !parts[src + 1]!.endsWith(".ts")) {
    const c = parts[src + 1]!;
    if (c !== "lib" && c !== "common") return c;
  }

  const base = basename(file).replace(/\.(ts|js|avsc)$/i, "");
  if (base && base !== "index") return slug(base) || "kafka-service";
  return "kafka-service";
}

function skipPath(file: string): boolean {
  const n = file.split(sep).join("/");
  return (
    n.includes("/node_modules/") ||
    n.includes("/dist/") ||
    n.includes("/build/") ||
    n.includes("/.git/") ||
    n.endsWith(".d.ts")
  );
}

function buildLocals(src: string): Map<string, string> {
  const map = new Map<string, string>();
  for (const m of src.matchAll(
    /(?:export\s+)?const\s+(\w+)\s*=\s*['"]([^'"]+)['"]/g,
  )) {
    map.set(m[1]!, m[2]!);
  }
  return map;
}

function resolveTopic(
  expr: string,
  locals: Map<string, string>,
): string | undefined {
  const t = expr.trim();
  const lit = t.match(/^['"]([^'"]+)['"]$/);
  if (lit?.[1]) return lit[1];
  return locals.get(t);
}

function plausibleTopic(id: string): boolean {
  if (!id || id.length < 2) return false;
  if (id.includes("${") || id.includes("`")) return false;
  // skip regex topic patterns
  if (id.startsWith("^") || id.includes(".*")) return false;
  return true;
}

function ensureContract(
  contracts: Contract[],
  seen: Set<string>,
  id: string,
  source: string,
  requiredFields: string[] = [],
): void {
  if (!plausibleTopic(id) || seen.has(id)) {
    if (seen.has(id) && requiredFields.length > 0) {
      const existing = contracts.find((c) => c.id === id);
      if (existing) {
        for (const f of requiredFields) {
          if (!existing.requiredFields.includes(f)) {
            existing.requiredFields.push(f);
          }
        }
      }
    }
    return;
  }
  seen.add(id);
  contracts.push({
    id,
    kind: "event",
    source,
    requiredFields: [...requiredFields],
  });
}

function pushBinding(
  bindings: Binding[],
  seen: Set<string>,
  service: string,
  contract: string,
  role: "producer" | "consumer",
  source: string,
): void {
  if (!plausibleTopic(contract)) return;
  const key = `${service}|${contract}|${role}|${source}`;
  if (seen.has(key)) return;
  seen.add(key);
  bindings.push({ service, contract, role, source });
}

function looksLikeKafkaJs(src: string): boolean {
  return (
    /from\s+['"]kafkajs['"]/.test(src) ||
    /require\s*\(\s*['"]kafkajs['"]\s*\)/.test(src) ||
    /new\s+Kafka\s*\(/.test(src) ||
    /\.producer\s*\(/.test(src) ||
    /\.consumer\s*\(/.test(src) ||
    /KafkaModule|KafkaService|KafkaAvro/.test(src)
  );
}

function extractKafkaTs(
  root: string,
  file: string,
  src: string,
  contracts: Contract[],
  bindings: Binding[],
  contractSeen: Set<string>,
  bindingSeen: Set<string>,
): void {
  if (!looksLikeKafkaJs(src)) return;

  const service = serviceFromPath(root, file);
  const locals = buildLocals(src);

  // producer.send({ topic: "..." }) / send({ topic: CONST
  for (const m of src.matchAll(
    /\.send\s*\(\s*\{([^}]*?)\btopic\s*:\s*([^,}\n]+)/g,
  )) {
    const id = resolveTopic(m[2] ?? "", locals);
    if (!id) continue;
    ensureContract(contracts, contractSeen, id, file);
    pushBinding(bindings, bindingSeen, service, id, "producer", file);
  }

  // sendBatch({ topicMessages: [{ topic: "..." }] })
  for (const m of src.matchAll(
    /topicMessages\s*:\s*\[([\s\S]*?)\]/g,
  )) {
    for (const t of (m[1] ?? "").matchAll(/\btopic\s*:\s*([^,}\n]+)/g)) {
      const id = resolveTopic(t[1] ?? "", locals);
      if (!id) continue;
      ensureContract(contracts, contractSeen, id, file);
      pushBinding(bindings, bindingSeen, service, id, "producer", file);
    }
  }

  // consumer.subscribe({ topic: "..." })
  for (const m of src.matchAll(
    /\.subscribe\s*\(\s*\{([^}]*?)\btopic\s*:\s*([^,}\n]+)/g,
  )) {
    const id = resolveTopic(m[2] ?? "", locals);
    if (!id) continue;
    ensureContract(contracts, contractSeen, id, file);
    pushBinding(bindings, bindingSeen, service, id, "consumer", file);
  }

  // consumer.subscribe({ topics: ["a", "b"] })
  for (const m of src.matchAll(/\btopics\s*:\s*\[([\s\S]*?)\]/g)) {
    // only when near subscribe
    const idx = m.index ?? 0;
    const window = src.slice(Math.max(0, idx - 80), idx + (m[0]?.length ?? 0));
    if (!/\.subscribe\s*\(/.test(window) && !/subscribe\s*\(/.test(window)) {
      continue;
    }
    for (const lit of (m[1] ?? "").matchAll(/['"]([^'"]+)['"]/g)) {
      const id = lit[1]!;
      ensureContract(contracts, contractSeen, id, file);
      pushBinding(bindings, bindingSeen, service, id, "consumer", file);
    }
    for (const ref of (m[1] ?? "").matchAll(/\b([A-Z_][A-Z0-9_]*)\b/g)) {
      const id = locals.get(ref[1]!);
      if (!id) continue;
      ensureContract(contracts, contractSeen, id, file);
      pushBinding(bindings, bindingSeen, service, id, "consumer", file);
    }
  }

  // Nest/KafkaJS serializer schema maps: { topic: TOPIC_NAME, ... }
  for (const m of src.matchAll(
    /\{\s*topic\s*:\s*([^,}\n]+)[\s\S]{0,120}?value\s*:/g,
  )) {
    const id = resolveTopic(m[1] ?? "", locals);
    if (!id) continue;
    ensureContract(contracts, contractSeen, id, file);
    // schema registration implies both encode (producer) path exists at config level —
    // treat as contract only; bindings come from send/subscribe/@SubscribeTo
  }
}

function isObj(v: unknown): v is Record<string, unknown> {
  return Boolean(v) && typeof v === "object" && !Array.isArray(v);
}

function avroFieldRequired(field: Record<string, unknown>): boolean {
  if ("default" in field) return false;
  const t = field.type;
  if (Array.isArray(t) && t.includes("null")) return false;
  return typeof field.name === "string";
}

function avroRequiredFields(schema: Record<string, unknown>): string[] {
  const fields = Array.isArray(schema.fields) ? schema.fields : [];
  const out: string[] = [];
  for (const f of fields) {
    if (!isObj(f) || typeof f.name !== "string") continue;
    if (avroFieldRequired(f)) out.push(f.name);
  }
  return out;
}

function avroContractId(schema: Record<string, unknown>): string | undefined {
  const name = typeof schema.name === "string" ? schema.name : undefined;
  if (!name) return undefined;
  const ns = typeof schema.namespace === "string" ? schema.namespace : undefined;
  return ns ? `${ns}.${name}` : name;
}

function extractAvsc(
  file: string,
  raw: string,
  contracts: Contract[],
  contractSeen: Set<string>,
): void {
  // skip known-invalid fixtures
  if (file.split(sep).includes("invalid")) return;
  let doc: unknown;
  try {
    doc = JSON.parse(raw);
  } catch {
    return;
  }
  if (!isObj(doc)) return;
  if (doc.type !== "record" && !Array.isArray(doc.fields)) return;
  const id = avroContractId(doc);
  if (!id) return;
  ensureContract(
    contracts,
    contractSeen,
    id,
    file,
    avroRequiredFields(doc),
  );
}

export async function extractKafkaJs(root: string): Promise<ExtractorHit> {
  const files = await walk(
    root,
    (p) =>
      (p.endsWith(".ts") ||
        p.endsWith(".js") ||
        p.endsWith(".avsc") ||
        p.endsWith(".avro")) &&
      !skipPath(p),
  );

  const contracts: Contract[] = [];
  const bindings: Binding[] = [];
  const consumerRequires: ConsumerRequire[] = [];
  const contractSeen = new Set<string>();
  const bindingSeen = new Set<string>();
  const fieldsById = new Map<string, string[]>();

  for (const file of files) {
    let raw: string;
    try {
      raw = await readFile(file, "utf8");
    } catch {
      continue;
    }
    if (raw.length > 1_500_000) continue;

    if (file.endsWith(".avsc") || file.endsWith(".avro")) {
      const before = contracts.length;
      extractAvsc(file, raw, contracts, contractSeen);
      for (const c of contracts.slice(before)) {
        if (c.requiredFields.length > 0) {
          fieldsById.set(c.id, c.requiredFields);
        }
      }
      continue;
    }

    extractKafkaTs(
      root,
      file,
      raw,
      contracts,
      bindings,
      contractSeen,
      bindingSeen,
    );
  }

  for (const b of bindings) {
    if (b.role !== "consumer") continue;
    const fields = fieldsById.get(b.contract);
    if (!fields || fields.length === 0) continue;
    consumerRequires.push({
      contract: b.contract,
      service: b.service,
      fields: [...fields],
      source: b.source,
    });
  }

  return {
    extractor: "kafkajs",
    contracts,
    bindings,
    consumerRequires,
  };
}

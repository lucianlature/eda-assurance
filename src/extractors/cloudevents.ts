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
  const examples = parts.indexOf("examples");
  if (examples !== -1 && parts[examples + 1]) return parts[examples + 1]!;
  const apps = parts.indexOf("apps");
  if (apps !== -1 && parts[apps + 1]) return parts[apps + 1]!;
  const pkgs = parts.indexOf("packages");
  if (pkgs !== -1 && parts[pkgs + 1]) return parts[pkgs + 1]!;
  const src = parts.indexOf("src");
  if (src !== -1 && parts[src + 1] && !parts[src + 1]!.endsWith(".ts")) {
    return parts[src + 1]!;
  }
  const base = basename(file).replace(/\.(ts|js|json)$/i, "");
  return slug(base) || "cloudevents-service";
}

function skipPath(file: string): boolean {
  const n = file.split(sep).join("/");
  return (
    n.includes("/node_modules/") ||
    n.includes("/dist/") ||
    n.includes("/build/") ||
    n.includes("/.git/") ||
    n.endsWith(".d.ts") ||
    n.includes("/package-lock.json") ||
    n.includes("/yarn.lock")
  );
}

function plausibleType(id: string): boolean {
  if (!id || id.length < 2) return false;
  if (id.includes("${") || id === "type" || id === "string") return false;
  // CloudEvent types are usually dotted or reverse-DNS
  return /^[A-Za-z0-9][\w./:-]*$/.test(id);
}

function braceBlock(src: string, openIdx: number): string | undefined {
  if (openIdx < 0 || src[openIdx] !== "{") return undefined;
  let depth = 0;
  for (let i = openIdx; i < src.length; i++) {
    const ch = src[i];
    if (ch === "{") depth++;
    else if (ch === "}") {
      depth--;
      if (depth === 0) return src.slice(openIdx + 1, i);
    }
  }
  return undefined;
}

function dataObjectFields(body: string): string[] {
  const dataKey = body.search(/\bdata\s*:/);
  if (dataKey === -1) return [];
  const after = body.slice(dataKey);
  // data: { ... }
  const obj = after.match(/^\s*data\s*:\s*\{/);
  if (!obj) return [];
  const open = after.indexOf("{");
  const block = braceBlock(after, open);
  if (!block) return [];
  const fields: string[] = [];
  for (const line of block.split("\n")) {
    const m = line.match(/^\s*(\w+)(\??)\s*:/);
    if (!m?.[1] || m[2] === "?") continue;
    if (line.includes("{")) continue;
    fields.push(m[1]);
  }
  return fields;
}

function ensureContract(
  contracts: Contract[],
  seen: Set<string>,
  id: string,
  source: string,
  requiredFields: string[] = [],
): void {
  if (!plausibleType(id)) return;
  if (seen.has(id)) {
    const existing = contracts.find((c) => c.id === id);
    if (!existing) return;
    for (const f of requiredFields) {
      if (!existing.requiredFields.includes(f)) existing.requiredFields.push(f);
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
  if (!plausibleType(contract)) return;
  const key = `${service}|${contract}|${role}|${source}`;
  if (seen.has(key)) return;
  seen.add(key);
  bindings.push({ service, contract, role, source });
}

function looksLikeCloudEventsCode(src: string): boolean {
  return (
    /from\s+['"]cloudevents['"]/.test(src) ||
    /require\s*\(\s*['"]cloudevents['"]\s*\)/.test(src) ||
    /\bnew\s+CloudEvent\s*\(/.test(src) ||
    /\bHTTP\.toEvent\b|\bHTTP\.binary\b|\bHTTP\.structured\b/.test(src) ||
    /\bKafka\.toEvent\b|\bMQTT\.toEvent\b/.test(src) ||
    /["']ce-type["']\s*:/.test(src) ||
    /["']ce-specversion["']\s*:/.test(src)
  );
}

function extractTsJs(
  root: string,
  file: string,
  src: string,
  contracts: Contract[],
  bindings: Binding[],
  contractSeen: Set<string>,
  bindingSeen: Set<string>,
  fieldsById: Map<string, string[]>,
): void {
  if (!looksLikeCloudEventsCode(src)) return;
  const service = serviceFromPath(root, file);

  // new CloudEvent({ type, source, data })
  for (const m of src.matchAll(/\bnew\s+CloudEvent\s*(?:<[^>]*>)?\s*\(\s*\{/g)) {
    const open = (m.index ?? 0) + m[0]!.length - 1;
    const body = braceBlock(src, open);
    if (!body) continue;
    const type = body.match(/\btype\s*:\s*['"]([^'"]+)['"]/)?.[1];
    if (!type) continue;
    const fields = dataObjectFields(body);
    ensureContract(contracts, contractSeen, type, file, fields);
    if (fields.length > 0) fieldsById.set(type, fields);
    pushBinding(bindings, bindingSeen, service, type, "producer", file);
  }

  // Binary mode headers: "ce-type": "..."
  for (const m of src.matchAll(
    /["']ce-type["']\s*:\s*["']([^"']+)["']/gi,
  )) {
    const type = m[1]!;
    ensureContract(contracts, contractSeen, type, file);
    // Prefer consumer when receiving (toEvent nearby), else producer
    const idx = m.index ?? 0;
    const window = src.slice(Math.max(0, idx - 200), idx + 200);
    const role = /\.toEvent\b|receiver|Received/.test(window)
      ? "consumer"
      : "producer";
    pushBinding(bindings, bindingSeen, service, type, role, file);
  }

  // HTTP.toEvent / Kafka.toEvent / MQTT.toEvent → consumer of types in this file
  if (/\.toEvent\s*\(/.test(src)) {
    for (const c of contracts) {
      if (c.source !== file) continue;
      pushBinding(bindings, bindingSeen, service, c.id, "consumer", file);
    }
  }
}

function extractJsonFixture(
  file: string,
  raw: string,
  contracts: Contract[],
  contractSeen: Set<string>,
  fieldsById: Map<string, string[]>,
): void {
  if (!/"specversion"\s*:/.test(raw) || !/"type"\s*:/.test(raw)) return;
  let doc: unknown;
  try {
    doc = JSON.parse(raw);
  } catch {
    return;
  }
  if (!doc || typeof doc !== "object" || Array.isArray(doc)) return;
  const obj = doc as Record<string, unknown>;
  if (typeof obj.specversion !== "string" || typeof obj.type !== "string") {
    return;
  }
  const fields: string[] = [];
  if (obj.data && typeof obj.data === "object" && !Array.isArray(obj.data)) {
    for (const [k, v] of Object.entries(obj.data as Record<string, unknown>)) {
      if (v === null || v === undefined) continue;
      fields.push(k);
    }
  }
  ensureContract(contracts, contractSeen, obj.type, file, fields);
  if (fields.length > 0) fieldsById.set(obj.type, fields);
}

export async function extractCloudEvents(root: string): Promise<ExtractorHit> {
  const files = await walk(
    root,
    (p) =>
      (p.endsWith(".ts") ||
        p.endsWith(".tsx") ||
        p.endsWith(".js") ||
        p.endsWith(".jsx") ||
        p.endsWith(".json")) &&
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

    if (file.endsWith(".json")) {
      extractJsonFixture(file, raw, contracts, contractSeen, fieldsById);
      continue;
    }

    extractTsJs(
      root,
      file,
      raw,
      contracts,
      bindings,
      contractSeen,
      bindingSeen,
      fieldsById,
    );
  }

  for (const b of bindings) {
    if (b.role !== "consumer") continue;
    const fields = fieldsById.get(b.contract);
    if (!fields?.length) continue;
    consumerRequires.push({
      contract: b.contract,
      service: b.service,
      fields: [...fields],
      source: b.source,
    });
  }

  return {
    extractor: "cloudevents",
    contracts,
    bindings,
    consumerRequires,
  };
}

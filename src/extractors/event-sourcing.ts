import { readFile } from "node:fs/promises";
import { basename, relative, sep } from "node:path";
import type {
  Binding,
  ConsumerRequire,
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
  const demo = parts.indexOf("demo");
  if (demo !== -1 && parts[demo + 1]) {
    // demo/blueprint/src/pokemons → pokemons
    const src = parts.indexOf("src", demo);
    if (src !== -1 && parts[src + 1]) return parts[src + 1]!;
    return parts[demo + 1]!;
  }
  const pkgs = parts.indexOf("packages");
  if (pkgs !== -1 && parts[pkgs + 1]) return parts[pkgs + 1]!;
  const apps = parts.indexOf("apps");
  if (apps !== -1 && parts[apps + 1]) return parts[apps + 1]!;
  const e2e = parts.indexOf("e2e");
  if (e2e !== -1 && parts[e2e + 1]) return parts[e2e + 1]!;
  const src = parts.indexOf("src");
  if (src !== -1 && parts[src + 1] && !parts[src + 1]!.endsWith(".ts")) {
    return parts[src + 1]!;
  }
  const base = basename(file).replace(/\.(ts|js)$/i, "");
  return slug(base) || "es-service";
}

function skipPath(file: string): boolean {
  const n = file.split(sep).join("/");
  return (
    n.includes("/node_modules/") ||
    n.includes("/dist/") ||
    n.includes("/build/") ||
    n.includes("/.git/") ||
    // Keep event-catalog .d.ts (e.g. beenion model/eventTypes.d.ts); skip the rest
    (n.endsWith(".d.ts") && !/eventtypes\.d\.ts$/i.test(n) && !/events\.d\.ts$/i.test(n))
  );
}

function plausibleId(id: string): boolean {
  if (!id || id.length < 2) return false;
  if (id.includes("${")) return false;
  // skip castore reserved
  if (id.startsWith("__") && id.endsWith("__")) return false;
  return /^[A-Za-z_][\w.-]*$/.test(id);
}

function ensureContract(
  contracts: Contract[],
  seen: Set<string>,
  id: string,
  kind: ContractKind,
  source: string,
  requiredFields: string[] = [],
): void {
  if (!plausibleId(id)) return;
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
    kind,
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
  if (!plausibleId(contract)) return;
  const key = `${service}|${contract}|${role}|${source}`;
  if (seen.has(key)) return;
  seen.add(key);
  bindings.push({ service, contract, role, source });
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

function jsonSchemaRequired(block: string): string[] {
  const m = block.match(/required\s*:\s*\[([^\]]*)\]/);
  if (!m?.[1]) return [];
  return [...m[1].matchAll(/['"]([^'"]+)['"]/g)].map((x) => x[1]!);
}

function extractPayloadRequired(body: string): string[] {
  const key = body.search(/payloadSchema\s*:/);
  if (key === -1) return [];
  const after = body.slice(key);
  // JSON schema object
  const objOpen = after.search(/payloadSchema\s*:\s*\{/);
  if (objOpen !== -1) {
    const brace = after.indexOf("{", objOpen);
    const block = braceBlock(after, brace);
    if (block) return jsonSchemaRequired(block);
  }
  // z.object({...})
  const zodOpen = after.search(/payloadSchema\s*:\s*z\.object\s*\(/);
  if (zodOpen !== -1) {
    const paren = after.indexOf("(", zodOpen);
    const innerBrace = after.indexOf("{", paren);
    const block = braceBlock(after, innerBrace);
    if (block) return zodObjectRequired(block);
  }
  return [];
}

function zodObjectRequired(block: string): string[] {
  // z.object({ a: z.string(), b: z.string().optional() })
  const fields: string[] = [];
  for (const m of block.matchAll(
    /(\w+)\s*:\s*z\.[\s\S]*?(?=,\s*(?:\w+\s*:|\})|$)/g,
  )) {
    const name = m[1]!;
    const body = m[0] ?? "";
    if (/\.optional\s*\(/.test(body) || /\.nullish\s*\(/.test(body)) continue;
    fields.push(name);
  }
  // simpler line-based fallback
  if (fields.length === 0) {
    for (const line of block.split("\n")) {
      const lm = line.match(/^\s*(\w+)\s*:\s*z\./);
      if (!lm?.[1]) continue;
      if (/\.optional\s*\(|\.nullish\s*\(/.test(line)) continue;
      fields.push(lm[1]);
    }
  }
  return [...new Set(fields)];
}

function emmettDataFields(dataBlock: string): string[] {
  const fields: string[] = [];
  for (const line of dataBlock.split("\n")) {
    const m = line.match(/^\s*(\w+)(\??)\s*:/);
    if (!m?.[1] || m[2] === "?") continue;
    fields.push(m[1]);
  }
  return fields;
}

function looksRelevant(src: string): boolean {
  return (
    /@castore\//.test(src) ||
    /ZodEventType|JSONSchemaEventType|new\s+EventType\s*[<(]/.test(src) ||
    /@event-driven-io\/emmett/.test(src) ||
    /\bEvent\s*<\s*['"]/.test(src) ||
    /\bCommand\s*<\s*['"]/.test(src) ||
    // Beenion-style domain events: type + payload, Events map, reducers
    /\bexport\s+type\s+Events\s*=/.test(src) ||
    /\btype\s*:\s*['"][A-Z][A-Z0-9_]+['"]\s*,[\s\S]{0,120}?\bpayload\s*:/.test(
      src,
    ) ||
    (/\bpayload\s*:[\s\S]{0,120}?\btype\s*:\s*['"][A-Z][A-Z0-9_]+['"]/.test(
      src,
    ) &&
      /\beventTypes\b|\bEventStore\b|\bEvent\b/.test(src)) ||
    (/\bswitch\s*\(\s*\w+\.type\s*\)/.test(src) &&
      /\bcase\s+['"][A-Z][A-Z0-9_]+['"]/.test(src) &&
      /\b(?:e|event|evt)\.payload\b|\beventTypes\b|\bEventStore\b/.test(src))
  );
}

function tsObjectRequiredFields(block: string): string[] {
  const fields: string[] = [];
  for (const line of block.split("\n")) {
    const m = line.match(/^\s*(\w+)(\??)\s*:/);
    if (!m?.[1] || m[2] === "?") continue;
    if (line.includes("{")) continue;
    fields.push(m[1]);
  }
  return fields;
}

function extractEventsTypeMap(
  file: string,
  src: string,
  contracts: Contract[],
  contractSeen: Set<string>,
  fieldsById: Map<string, string[]>,
): void {
  const m = src.match(/\bexport\s+type\s+Events\s*=\s*\{/);
  if (!m || m.index === undefined) return;
  const open = src.indexOf("{", m.index);
  const body = braceBlock(src, open);
  if (!body) return;

  // Top-level keys: NAME: { ... } — nested braces via braceBlock per key
  for (const key of body.matchAll(
    /^\s*([A-Z][A-Z0-9_]*)\s*:\s*\{/gm,
  )) {
    const id = key[1]!;
    const keyOpen = (key.index ?? 0) + key[0]!.lastIndexOf("{");
    const fieldsBlock = braceBlock(body, keyOpen);
    const fields = fieldsBlock ? tsObjectRequiredFields(fieldsBlock) : [];
    ensureContract(contracts, contractSeen, id, "event", file, fields);
    if (fields.length > 0) fieldsById.set(id, fields);
  }
}

function extractFile(
  root: string,
  file: string,
  src: string,
  contracts: Contract[],
  bindings: Binding[],
  contractSeen: Set<string>,
  bindingSeen: Set<string>,
  fieldsById: Map<string, string[]>,
): void {
  if (!looksRelevant(src)) return;
  const service = serviceFromPath(root, file);

  // Domain Events map: export type Events = { LINK_CREATED: { ... }, ... }
  extractEventsTypeMap(file, src, contracts, contractSeen, fieldsById);

  // Castore: new EventType / ZodEventType / JSONSchemaEventType ({ type: 'X', ...})
  for (const m of src.matchAll(
    /new\s+(?:Zod|JSONSchema)?EventType(?:<[^>]*>)?\s*\(\s*\{/g,
  )) {
    const open = (m.index ?? 0) + m[0]!.length - 1;
    const body = braceBlock(src, open);
    if (!body) continue;
    const type = body.match(/\btype\s*:\s*['"]([^'"]+)['"]/)?.[1];
    if (!type || type === "EVENT_TYPE" || type === "TYPE") continue;
    const fields = extractPayloadRequired(body);
    ensureContract(contracts, contractSeen, type, "event", file, fields);
    if (fields.length > 0) fieldsById.set(type, fields);
  }

  // Emmett: export type Foo = Event<'Foo', { a: number }>
  for (const m of src.matchAll(
    /\b(?:type|export\s+type)\s+\w+\s*=\s*Event\s*<\s*['"]([^'"]+)['"]\s*(?:,\s*\{([\s\S]*?)\})?\s*>/g,
  )) {
    const id = m[1]!;
    const fields = m[2] ? emmettDataFields(m[2]) : [];
    ensureContract(contracts, contractSeen, id, "event", file, fields);
    if (fields.length > 0) fieldsById.set(id, fields);
  }

  for (const m of src.matchAll(
    /\b(?:type|export\s+type)\s+\w+\s*=\s*Command\s*<\s*['"]([^'"]+)['"]\s*(?:,\s*\{([\s\S]*?)\})?\s*>/g,
  )) {
    const id = m[1]!;
    const fields = m[2] ? emmettDataFields(m[2]) : [];
    ensureContract(contracts, contractSeen, id, "command", file, fields);
  }

  // Consumers: switch/case 'TYPE' or .with({ type: 'TYPE'
  for (const m of src.matchAll(
    /\.with\s*\(\s*\{\s*type\s*:\s*['"]([^'"]+)['"]/g,
  )) {
    const id = m[1]!;
    ensureContract(contracts, contractSeen, id, "event", file);
    pushBinding(bindings, bindingSeen, service, id, "consumer", file);
  }
  for (const m of src.matchAll(
    /\bcase\s+['"]([A-Z][A-Z0-9_]*)['"]\s*:/g,
  )) {
    // only in files that already look like ES (avoid random switches)
    const id = m[1]!;
    if (
      !contractSeen.has(id) &&
      !/EventType|eventTypes|evolve|EventStore|\b(?:e|event|evt)\.payload\b/.test(
        src,
      )
    ) {
      continue;
    }
    ensureContract(contracts, contractSeen, id, "event", file);
    pushBinding(bindings, bindingSeen, service, id, "consumer", file);
  }

  // Producers: return { type: 'X' ... } satisfies Event / pushEvent / appendToStream
  for (const m of src.matchAll(
    /\btype\s*:\s*['"]([^'"]+)['"]\s*,[\s\S]{0,80}?satisfies\s+\w*Event/g,
  )) {
    const id = m[1]!;
    ensureContract(contracts, contractSeen, id, "event", file);
    pushBinding(bindings, bindingSeen, service, id, "producer", file);
  }
  for (const m of src.matchAll(
    /(?:pushEvent|appendToStream|appendEvent)\s*\([\s\S]{0,200}?\btype\s*:\s*['"]([^'"]+)['"]/g,
  )) {
    const id = m[1]!;
    ensureContract(contracts, contractSeen, id, "event", file);
    pushBinding(bindings, bindingSeen, service, id, "producer", file);
  }

  // Beenion-style: { type: 'LINK_CREATED', payload: { ... } }
  for (const m of src.matchAll(
    /\btype\s*:\s*['"]([A-Z][A-Z0-9_]*)['"]\s*,([\s\S]{0,200}?)\}/g,
  )) {
    const id = m[1]!;
    const window = m[2] ?? "";
    if (!/\bpayload\s*:/.test(window)) continue;
    if (id === "EVENT_TYPE" || id === "TYPE") continue;
    const payloadOpen = window.search(/\bpayload\s*:\s*\{/);
    let fields: string[] = [];
    if (payloadOpen !== -1) {
      const brace = window.indexOf("{", payloadOpen);
      const block = braceBlock(window, brace);
      if (block) fields = tsObjectRequiredFields(block);
    }
    ensureContract(contracts, contractSeen, id, "event", file, fields);
    if (fields.length > 0) fieldsById.set(id, fields);
    pushBinding(bindings, bindingSeen, service, id, "producer", file);
  }

  // Castore commands emitting events: type: 'APPEARED' inside command handlers
  // when file imports @castore and has nextEvents / events: [
  if (/@castore\//.test(src) && /events\s*:\s*\[|nextEvents/.test(src)) {
    for (const m of src.matchAll(/\btype\s*:\s*['"]([A-Z][A-Z0-9_]*)['"]/g)) {
      const id = m[1]!;
      if (id === "EVENT_TYPE" || id === "TYPE") continue;
      if (!contractSeen.has(id)) continue; // only known event types
      pushBinding(bindings, bindingSeen, service, id, "producer", file);
    }
  }
}

export async function extractEventSourcing(
  root: string,
): Promise<ExtractorHit> {
  const files = await walk(
    root,
    (p) => (p.endsWith(".ts") || p.endsWith(".tsx")) && !skipPath(p),
  );

  const contracts: Contract[] = [];
  const bindings: Binding[] = [];
  const consumerRequires: ConsumerRequire[] = [];
  const contractSeen = new Set<string>();
  const bindingSeen = new Set<string>();
  const fieldsById = new Map<string, string[]>();

  for (const file of files) {
    let src: string;
    try {
      src = await readFile(file, "utf8");
    } catch {
      continue;
    }
    if (src.length > 1_500_000) continue;
    extractFile(
      root,
      file,
      src,
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
    extractor: "event-sourcing",
    contracts,
    bindings,
    consumerRequires,
  };
}

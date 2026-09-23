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

  const testIdx = parts.indexOf("test");
  if (testIdx !== -1) return "pg-listen-test";

  const src = parts.indexOf("src");
  if (src !== -1 && parts[src + 1] && !parts[src + 1]!.endsWith(".ts")) {
    return parts[src + 1]!;
  }

  const base = basename(file).replace(/\.(ts|js)$/i, "");
  if (base && base !== "index") return slug(base) || "pg-service";
  return "pg-service";
}

function skipPath(file: string): boolean {
  const n = file.split(sep).join("/");
  return (
    n.includes("/node_modules/") ||
    n.includes("/dist/") ||
    n.includes("/build/") ||
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

function resolveChannel(
  expr: string,
  locals: Map<string, string>,
): string | undefined {
  const t = expr.trim();
  const lit = t.match(/^['"]([^'"]+)['"]$/);
  if (lit?.[1]) return lit[1];
  return locals.get(t);
}

function plausibleChannel(id: string): boolean {
  if (!id || id.length < 1) return false;
  if (id.includes("${") || id.includes("`")) return false;
  // Postgres channel identifiers: letters, digits, underscore, hyphen
  return /^[A-Za-z_][\w.-]*$/.test(id);
}

function ensureContract(
  contracts: Contract[],
  seen: Set<string>,
  id: string,
  source: string,
  requiredFields: string[] = [],
): void {
  if (!plausibleChannel(id)) return;
  if (seen.has(id)) {
    if (requiredFields.length === 0) return;
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
  if (!plausibleChannel(contract)) return;
  const key = `${service}|${contract}|${role}|${source}`;
  if (seen.has(key)) return;
  seen.add(key);
  bindings.push({ service, contract, role, source });
}

/** Channels from `createSubscriber<Events>` / `createPostgresSubscriber<Events>` payload maps. */
function parseSubscriberEventChannels(
  src: string,
): Map<string, string[]> {
  const out = new Map<string, string[]>();
  const typeNames = new Set<string>();
  for (const m of src.matchAll(
    /(?<!function\s)\bcreate(?:Postgres)?Subscriber\s*<\s*(\w+)\s*>\s*\(/g,
  )) {
    typeNames.add(m[1]!);
  }
  if (typeNames.size === 0) return out;

  for (const typeName of typeNames) {
    const re = new RegExp(
      `(?:type|interface)\\s+${typeName}\\s*=\\s*\\{([\\s\\S]*?)\\n\\}`,
    );
    const m = re.exec(src);
    if (!m?.[1]) continue;
    const body = m[1];

    // Object payloads: channel: { field: T }
    for (const ch of body.matchAll(
      /^(\s*)([A-Za-z_][\w-]*)\s*:\s*\{([\s\S]*?)\n\1\}/gm,
    )) {
      const fields: string[] = [];
      for (const f of (ch[3] ?? "").matchAll(/^\s*(\w+)(\??)\s*:/gm)) {
        if (f[2] === "?") continue;
        fields.push(f[1]!);
      }
      out.set(ch[2]!, fields);
    }

    // Scalar payloads at top level only (strip nested objects first)
    const topLevel = body.replace(/\{[^{}]*\}/g, "{}");
    for (const ch of topLevel.matchAll(
      /^\s*([A-Za-z_][\w-]*)\s*:\s*(?:\{\}|string|number|boolean|any|unknown|void)\b/gm,
    )) {
      if (!out.has(ch[1]!)) out.set(ch[1]!, []);
    }
  }
  return out;
}

function looksRelevant(src: string): boolean {
  return (
    /createPostgresSubscriber\s*<|createSubscriber\s*<|from\s+['"]pg-listen['"]/.test(
      src,
    ) ||
    /require\s*\(\s*['"]pg-listen['"]\s*\)/.test(src) ||
    /\.listenTo\s*\(/.test(src) ||
    /\.notifications\.on\s*\(/.test(src) ||
    /\bLISTEN\s+[A-Za-z_]/i.test(src) ||
    /\bNOTIFY\s+[A-Za-z_]/i.test(src) ||
    /pg_notify\s*\(/.test(src)
  );
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
  const locals = buildLocals(src);
  const typed = parseSubscriberEventChannels(src);

  for (const [channel, fields] of typed) {
    ensureContract(contracts, contractSeen, channel, file, fields);
    if (fields.length > 0) fieldsById.set(channel, fields);
  }

  // hub.listenTo("channel")
  for (const m of src.matchAll(/\.listenTo\s*\(\s*([^)]+?)\s*\)/g)) {
    const id = resolveChannel(m[1] ?? "", locals);
    if (!id) continue;
    ensureContract(
      contracts,
      contractSeen,
      id,
      file,
      fieldsById.get(id) ?? typed.get(id) ?? [],
    );
    pushBinding(bindings, bindingSeen, service, id, "consumer", file);
  }

  // hub.notifications.on("channel", ...)
  for (const m of src.matchAll(
    /\.notifications\.on\s*\(\s*([^,)]+)/g,
  )) {
    const id = resolveChannel(m[1] ?? "", locals);
    if (!id) continue;
    ensureContract(
      contracts,
      contractSeen,
      id,
      file,
      fieldsById.get(id) ?? typed.get(id) ?? [],
    );
    pushBinding(bindings, bindingSeen, service, id, "consumer", file);
  }

  // hub.notify("channel", payload?)
  for (const m of src.matchAll(/\.notify\s*\(\s*([^,)]+)/g)) {
    const id = resolveChannel(m[1] ?? "", locals);
    if (!id) continue;
    ensureContract(
      contracts,
      contractSeen,
      id,
      file,
      fieldsById.get(id) ?? typed.get(id) ?? [],
    );
    pushBinding(bindings, bindingSeen, service, id, "producer", file);
  }

  // SQL: LISTEN channel / NOTIFY channel[, ...]
  for (const m of src.matchAll(
    /(?:`|'|")\s*(?:LISTEN|NOTIFY)\s+([A-Za-z_][\w-]*)\b/gi,
  )) {
    const id = m[1]!;
    const isListen = /^listen$/i.test(
      (m[0] ?? "").replace(/[`'"]/g, "").trim().split(/\s+/)[0] ?? "",
    );
    ensureContract(contracts, contractSeen, id, file);
    pushBinding(
      bindings,
      bindingSeen,
      service,
      id,
      isListen ? "consumer" : "producer",
      file,
    );
  }

  // Unquoted template / query strings: LISTEN test / NOTIFY test
  for (const m of src.matchAll(
    /(?:query|queryRaw)\s*\(\s*[`'"]\s*(LISTEN|NOTIFY)\s+([A-Za-z_][\w-]*)/gi,
  )) {
    const kind = m[1]!;
    const id = m[2]!;
    ensureContract(contracts, contractSeen, id, file);
    pushBinding(
      bindings,
      bindingSeen,
      service,
      id,
      /^listen$/i.test(kind) ? "consumer" : "producer",
      file,
    );
  }

  // pg_notify('channel', ...)
  for (const m of src.matchAll(
    /pg_notify\s*\(\s*['"]([^'"]+)['"]/gi,
  )) {
    const id = m[1]!;
    ensureContract(contracts, contractSeen, id, file);
    pushBinding(bindings, bindingSeen, service, id, "producer", file);
  }
}

export async function extractPgListen(root: string): Promise<ExtractorHit> {
  const files = await walk(
    root,
    (p) =>
      (p.endsWith(".ts") || p.endsWith(".js") || p.endsWith(".sql")) &&
      !skipPath(p),
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

    if (file.endsWith(".sql")) {
      const service = serviceFromPath(root, file);
      for (const m of src.matchAll(
        /^\s*(LISTEN|NOTIFY)\s+([A-Za-z_][\w-]*)/gim,
      )) {
        const id = m[2]!;
        ensureContract(contracts, contractSeen, id, file);
        pushBinding(
          bindings,
          bindingSeen,
          service,
          id,
          /^listen$/i.test(m[1]!) ? "consumer" : "producer",
          file,
        );
      }
      for (const m of src.matchAll(
        /pg_notify\s*\(\s*'([^']+)'/gi,
      )) {
        ensureContract(contracts, contractSeen, m[1]!, file);
        pushBinding(
          bindings,
          bindingSeen,
          service,
          m[1]!,
          "producer",
          file,
        );
      }
      continue;
    }

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
    if (!fields || fields.length === 0) continue;
    consumerRequires.push({
      contract: b.contract,
      service: b.service,
      fields: [...fields],
      source: b.source,
    });
  }

  return {
    extractor: "pg-listen",
    contracts,
    bindings,
    consumerRequires,
  };
}

import { readFile } from "node:fs/promises";
import { dirname, extname, join, relative, sep } from "node:path";
import { parse } from "yaml";
import type { Binding, ConsumerRequire, Contract, ExtractorHit, Finding } from "../types.ts";
import { walk } from "../walk.ts";

const SERVICE_INDEX = /[/\\]services[/\\][^/\\]+[/\\]index\.mdx$/;
const EVENT_INDEX = /[/\\]events[/\\][^/\\]+[/\\]index\.mdx$/;
const EVENT_VERSIONED_INDEX = /[/\\]events[/\\][^/\\]+[/\\]versioned[/\\][^/\\]+[/\\]index\.mdx$/;
const COMMAND_INDEX = /[/\\]commands[/\\][^/\\]+[/\\]index\.mdx$/;
const QUERY_INDEX = /[/\\]queries[/\\][^/\\]+[/\\]index\.mdx$/;
const SCHEMA_FILES = ["schema.json", "schema.avro", "schema.avsc", "schema.yml", "schema.yaml"];

type Frontmatter = Record<string, unknown>;

/** Required fields per known version; `null` means the version exists but has no readable schema. */
type EventDef = {
  id: string;
  dir: string;
  version?: string;
  fields: string[] | null;
  versions: Map<string, string[] | null>;
};

type Ref = { id: string; version?: string };

function parseFrontmatter(text: string): Frontmatter | null {
  if (!text.startsWith("---")) return null;
  const close = text.indexOf("\n---", 3);
  if (close === -1) return null;
  const raw = text.slice(4, close);
  const parsed = parse(raw);
  if (!parsed || typeof parsed !== "object") return null;
  return parsed as Frontmatter;
}

function asRef(value: unknown): Ref | undefined {
  if (typeof value === "string") return { id: value };
  if (value && typeof value === "object" && "id" in value) {
    const { id, version } = value as { id: unknown; version?: unknown };
    if (typeof id !== "string") return undefined;
    return { id, version: version == null ? undefined : String(version) };
  }
  return undefined;
}

function refs(list: unknown): Ref[] {
  if (!Array.isArray(list)) return [];
  return list.map(asRef).filter((r): r is Ref => Boolean(r));
}

/** JSON Schema `required`, or Avro record fields without a `default`. */
function requiredFrom(doc: unknown): string[] {
  if (!doc || typeof doc !== "object") return [];
  const d = doc as { required?: unknown; type?: unknown; fields?: unknown };
  if (d.type === "record" && Array.isArray(d.fields)) {
    return d.fields
      .filter((f): f is { name: string } => Boolean(f) && typeof f === "object" && typeof f.name === "string" && !("default" in f))
      .map((f) => f.name);
  }
  return Array.isArray(d.required) ? d.required.filter((x): x is string => typeof x === "string") : [];
}

async function schemaFields(dir: string, schemaPath: unknown): Promise<string[] | null> {
  const candidates = typeof schemaPath === "string" ? [schemaPath] : SCHEMA_FILES;
  for (const name of candidates) {
    let raw: string;
    try {
      raw = await readFile(join(dir, name), "utf8");
    } catch {
      continue;
    }
    try {
      const ext = extname(name).toLowerCase();
      return requiredFrom(ext === ".yml" || ext === ".yaml" ? parse(raw) : JSON.parse(raw));
    } catch {
      return [];
    }
  }
  return null;
}

type Semver = [number, number, number];

function semver(v: string): Semver | undefined {
  const m = /^v?(\d+)\.(\d+)\.(\d+)$/.exec(v.trim());
  return m ? [Number(m[1]), Number(m[2]), Number(m[3])] : undefined;
}

function cmp(a: Semver, b: Semver): number {
  return a[0] - b[0] || a[1] - b[1] || a[2] - b[2];
}

/** Supports exact, latest / x / *, and ^ ~ > >= < <= ranges. `undefined` = unsupported syntax. */
function matcher(pin: string): ((v: Semver) => boolean) | undefined {
  const m = /^(\^|~|>=|<=|>|<)?\s*(.+)$/.exec(pin.trim());
  const base = m?.[2] ? semver(m[2]) : undefined;
  if (!m || !base) return undefined;
  switch (m[1]) {
    case "^":
      return (v) => v[0] === base[0] && cmp(v, base) >= 0;
    case "~":
      return (v) => v[0] === base[0] && v[1] === base[1] && cmp(v, base) >= 0;
    case ">":
      return (v) => cmp(v, base) > 0;
    case ">=":
      return (v) => cmp(v, base) >= 0;
    case "<":
      return (v) => cmp(v, base) < 0;
    case "<=":
      return (v) => cmp(v, base) <= 0;
    default:
      return (v) => cmp(v, base) === 0;
  }
}

type Resolved =
  | { ok: true; version?: string; fields: string[] | null }
  | { ok: false; reason: string };

function resolvePin(def: EventDef, pin?: string): Resolved {
  if (pin == null || pin === "latest" || pin === "x" || pin === "*") {
    return { ok: true, version: def.version, fields: def.fields };
  }
  const match = matcher(pin);
  if (!match) return { ok: false, reason: `version '${pin}' uses unsupported range syntax` };
  const known: Array<[string, string[] | null]> = [
    ...(def.version ? [[def.version, def.fields] as [string, string[] | null]] : []),
    ...def.versions,
  ];
  const hits = known
    .map(([v, fields]) => ({ v, sv: semver(v), fields }))
    .filter((k): k is { v: string; sv: Semver; fields: string[] | null } => Boolean(k.sv) && match(k.sv!))
    .sort((a, b) => cmp(b.sv, a.sv));
  const best = hits[0];
  const listed = known.map(([v]) => v).join(", ") || "none";
  if (!best) return { ok: false, reason: `version '${pin}' matches none of the known versions (${listed})` };
  if (best.fields === null) {
    return { ok: false, reason: `version ${best.v} has no schema, so its required fields cannot be checked` };
  }
  return { ok: true, version: best.v, fields: best.fields };
}

function sharedDepth(a: string, b: string): number {
  const pa = a.split(sep);
  const pb = b.split(sep);
  let i = 0;
  while (i < pa.length && i < pb.length && pa[i] === pb[i]) i++;
  return i;
}

/** Monorepos can hold several catalogs with the same ids; use the definition closest to the service. */
function nearest(defs: EventDef[] | undefined, file: string): EventDef | undefined {
  if (!defs?.length) return undefined;
  return [...defs].sort((a, b) => sharedDepth(b.dir, file) - sharedDepth(a.dir, file))[0];
}

export async function extractEventCatalog(root: string): Promise<ExtractorHit> {
  const files = await walk(root, (p) => p.endsWith(".mdx") || p.endsWith(".md"));
  const contracts: Contract[] = [];
  const bindings: Binding[] = [];
  const consumerRequires: ConsumerRequire[] = [];
  const findings: Finding[] = [];
  const events = new Map<string, EventDef[]>();
  const versioned: Array<{ eventDir: string; version: string; fields: string[] | null }> = [];
  const services: Array<{ file: string; fm: Frontmatter }> = [];

  for (const file of files) {
    const text = await readFile(file, "utf8");
    const fm = parseFrontmatter(text);
    if (!fm || typeof fm.id !== "string") continue;
    const dir = dirname(file);

    if (EVENT_VERSIONED_INDEX.test(file)) {
      if (fm.version != null) {
        versioned.push({
          eventDir: dirname(dirname(dir)),
          version: String(fm.version),
          fields: await schemaFields(dir, fm.schemaPath),
        });
      }
      continue;
    }
    if (EVENT_INDEX.test(file)) {
      const fields = await schemaFields(dir, fm.schemaPath);
      contracts.push({ id: fm.id, kind: "event", source: file, requiredFields: fields ?? [] });
      const def: EventDef = {
        id: fm.id,
        dir,
        version: fm.version == null ? undefined : String(fm.version),
        fields,
        versions: new Map(),
      };
      events.set(fm.id, [...(events.get(fm.id) ?? []), def]);
      continue;
    }
    if (COMMAND_INDEX.test(file) || QUERY_INDEX.test(file)) {
      contracts.push({
        id: fm.id,
        kind: COMMAND_INDEX.test(file) ? "command" : "query",
        source: file,
        requiredFields: (await schemaFields(dir, fm.schemaPath)) ?? [],
      });
      continue;
    }
    if (SERVICE_INDEX.test(file)) services.push({ file, fm });
  }

  for (const v of versioned) {
    const def = [...events.values()].flat().find((d) => d.dir === v.eventDir);
    if (def) def.versions.set(v.version, v.fields);
  }

  for (const { file, fm } of services) {
    const service = fm.id as string;
    for (const ref of refs(fm.sends)) {
      bindings.push({ service, contract: ref.id, role: "producer", source: file });
    }
    for (const ref of refs(fm.receives)) {
      bindings.push({ service, contract: ref.id, role: "consumer", source: file });
      const def = nearest(events.get(ref.id), file);
      if (!def) continue;
      const resolved = resolvePin(def, ref.version);
      if (!resolved.ok) {
        findings.push({
          rule: "EDA-pin-unresolved",
          severity: "medium",
          contract: ref.id,
          detail: `${service} is pinned to '${ref.id}' ${ref.version}, but ${resolved.reason}${def.version ? ` (current ${def.version})` : ""}. Compatibility with this consumer is not verified.`,
          evidence: [relative(root, file), relative(root, join(def.dir, "index.mdx"))],
        });
        continue;
      }
      if (resolved.fields === null) continue;
      consumerRequires.push({
        contract: ref.id,
        service,
        fields: resolved.fields,
        source: file,
        pinnedVersion: resolved.version,
      });
    }
  }

  return { extractor: "eventcatalog", contracts, bindings, consumerRequires, findings };
}

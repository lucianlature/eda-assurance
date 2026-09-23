import { readFile } from "node:fs/promises";
import { basename, relative, sep } from "node:path";
import {
  parseClassRequiredFields,
  parseNamedInterfaceFields,
} from "../parse-interface.ts";
import type {
  Binding,
  ConsumerRequire,
  Contract,
  ContractKind,
  ExtractorHit,
} from "../types.ts";
import { walk } from "../walk.ts";

const SKIP_SERVICE = new Set([
  "building-blocks",
  "common",
  "shared",
  "lib",
  "core",
  "test",
  "tests",
  "e2e",
  "sample",
  "__lib__",
]);

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
  const appsSvc = apps !== -1 ? parts[apps + 1] : undefined;
  if (appsSvc && !SKIP_SERVICE.has(appsSvc)) {
    return appsSvc;
  }

  const modules = parts.indexOf("modules");
  const modulesSvc = modules !== -1 ? parts[modules + 1] : undefined;
  if (modulesSvc && !SKIP_SERVICE.has(modulesSvc)) {
    return modulesSvc;
  }

  // booking-style: src/<service>/src/...
  const srcIdx = parts.indexOf("src");
  if (srcIdx !== -1) {
    const candidate = parts[srcIdx + 1];
    if (
      candidate &&
      !SKIP_SERVICE.has(candidate) &&
      candidate !== "main.ts" &&
      !candidate.endsWith(".ts")
    ) {
      return candidate;
    }
  }

  const base = basename(file).replace(/\.(ts|js)$/, "");
  if (base && base !== "index") return slug(base) || "nest-service";
  return "nest-service";
}

function buildLocalStrings(src: string): Map<string, string> {
  const map = new Map<string, string>();

  for (const m of src.matchAll(
    /(?:export\s+)?const\s+(\w+)\s*=\s*['"]([^'"]+)['"]/g,
  )) {
    map.set(m[1]!, m[2]!);
  }

  for (const m of src.matchAll(
    /(?:export\s+)?const\s+(\w+)\s*=\s*\{([\s\S]*?)\n\s*\};?/g,
  )) {
    const obj = m[1]!;
    for (const entry of m[2]!.matchAll(/(\w+)\s*:\s*['"]([^'"]+)['"]/g)) {
      map.set(`${obj}.${entry[1]}`, entry[2]!);
    }
  }

  for (const m of src.matchAll(
    /(?:export\s+)?enum\s+(\w+)\s*\{([\s\S]*?)\}/g,
  )) {
    const en = m[1]!;
    for (const entry of m[2]!.matchAll(/(\w+)\s*=\s*['"]([^'"]+)['"]/g)) {
      map.set(`${en}.${entry[1]}`, entry[2]!);
    }
  }

  return map;
}

function resolveExpr(
  expr: string,
  locals: Map<string, string>,
): string | undefined {
  const trimmed = expr.trim();
  const lit = trimmed.match(/^['"]([^'"]+)['"]$/);
  if (lit?.[1]) return lit[1];
  return locals.get(trimmed);
}

function plausibleContractId(id: string): boolean {
  if (!id || id.length < 2) return false;
  if (/^[A-Z][A-Za-z0-9]+$/.test(id)) return true;
  if (/[./:]/.test(id)) return true;
  if (id.includes("-") && id.length > 3) return true;
  return id.length >= 6;
}

function kindForDecorator(name: string, id: string): ContractKind {
  if (name === "MessagePattern") return "command";
  if (name === "MessageTopic") return "event";
  const hay = id.toLowerCase();
  if (/\b(command|cmd|rpc)\b/.test(hay)) return "command";
  if (/\b(query|request)\b/.test(hay)) return "query";
  return "event";
}

const EVENT_CLASS_RE =
  /(?:export\s+)?class\s+(\w+)\b[^{]*\b(?:implements\s+[^{]*\b(?:IEvent|DomainEvent|IAggregateEvent)\b|extends\s+\w*DomainEvent\w*)/;

function payloadInterfaceName(src: string, className: string): string | undefined {
  const m = src.match(
    new RegExp(
      `class\\s+${className}\\b[^{]*extends\\s+\\w*DomainEvent\\s*<\\s*(\\w+)\\s*>`,
    ),
  );
  return m?.[1];
}

function extractEventClasses(
  file: string,
  src: string,
): Contract[] {
  const contracts: Contract[] = [];
  const seen = new Set<string>();

  function add(name: string): void {
    if (seen.has(name)) return;
    seen.add(name);
    let fields = parseClassRequiredFields(src, name);
    if (fields.length === 0) {
      const payload = payloadInterfaceName(src, name);
      if (payload) fields = parseNamedInterfaceFields(src, payload);
    }
    contracts.push({
      id: name,
      kind: "event",
      source: file,
      requiredFields: fields,
    });
  }

  for (const m of src.matchAll(new RegExp(EVENT_CLASS_RE.source, "g"))) {
    if (m[1]) add(m[1]);
  }

  // Plain POJO event classes in *.contract.ts (booking express style)
  if (/\.contract\.ts$/.test(file)) {
    for (const m of src.matchAll(/export class (\w+)\b/g)) {
      const name = m[1];
      if (!name || name === "IEvent") continue;
      if (!/(Created|Updated|Deleted|Reserved|Event)$/.test(name)) continue;
      add(name);
    }
  }

  return contracts;
}

function pushBinding(
  bindings: Binding[],
  service: string,
  contract: string,
  role: "producer" | "consumer",
  source: string,
  seen: Set<string>,
): void {
  if (!plausibleContractId(contract)) return;
  const key = `${service}|${contract}|${role}|${source}`;
  if (seen.has(key)) return;
  seen.add(key);
  bindings.push({ service, contract, role, source });
}

function extractBindings(
  file: string,
  src: string,
  service: string,
  locals: Map<string, string>,
  bindings: Binding[],
  seen: Set<string>,
  kinds: Map<string, ContractKind>,
): void {
  const consumerDecorators: Array<{
    name: string;
    kind: ContractKind;
  }> = [
    { name: "EventPattern", kind: "event" },
    { name: "MessagePattern", kind: "command" },
    { name: "MessageTopic", kind: "event" },
    { name: "SubscribeTo", kind: "event" },
    { name: "OnEvent", kind: "event" },
  ];

  for (const dec of consumerDecorators) {
    const re = new RegExp(`@${dec.name}\\(\\s*([^)]+?)\\s*\\)`, "g");
    for (const m of src.matchAll(re)) {
      const id = resolveExpr(m[1] ?? "", locals);
      if (!id) continue;
      kinds.set(id, kindForDecorator(dec.name, id));
      pushBinding(bindings, service, id, "consumer", file, seen);
    }
  }

  for (const m of src.matchAll(/@EventsHandler\(\s*([^)]+?)\s*\)/g)) {
    const args = m[1] ?? "";
    for (const part of args.split(",")) {
      const name = part.trim().match(/^[A-Z]\w*$/)?.[0];
      if (!name) continue;
      kinds.set(name, "event");
      pushBinding(bindings, service, name, "consumer", file, seen);
    }
  }

  for (const m of src.matchAll(
    /(?:client|publisher|proxy)\.emit\s*\(\s*([^,)]+)/gi,
  )) {
    const id = resolveExpr(m[1] ?? "", locals);
    if (!id) continue;
    if (!kinds.has(id)) kinds.set(id, kindForDecorator("EventPattern", id));
    pushBinding(bindings, service, id, "producer", file, seen);
  }

  for (const m of src.matchAll(
    /\.(?:produceSend|produceEmit|send)\s*\(\s*([^,)]+)/g,
  )) {
    const id = resolveExpr(m[1] ?? "", locals);
    if (!id) continue;
    if (!kinds.has(id)) kinds.set(id, "event");
    pushBinding(bindings, service, id, "producer", file, seen);
  }

  for (const m of src.matchAll(
    /publishMessage\s*\(\s*new\s+([A-Z]\w*)/g,
  )) {
    const name = m[1];
    if (!name) continue;
    kinds.set(name, "event");
    pushBinding(bindings, service, name, "producer", file, seen);
  }

  for (const m of src.matchAll(
    /consumeMessage\s*(?:<\s*([A-Z]\w*)\s*>)?\s*\(\s*(?:new\s+([A-Z]\w*)|)/g,
  )) {
    const name = m[1] ?? m[2];
    if (!name) continue;
    kinds.set(name, "event");
    pushBinding(bindings, service, name, "consumer", file, seen);
  }
}

function ensureContractFromBinding(
  contracts: Contract[],
  seen: Set<string>,
  id: string,
  kind: ContractKind,
  source: string,
): void {
  if (seen.has(id)) return;
  seen.add(id);
  contracts.push({ id, kind, source, requiredFields: [] });
}

export async function extractNest(root: string): Promise<ExtractorHit> {
  const files = await walk(
    root,
    (p) =>
      p.endsWith(".ts") &&
      !p.endsWith(".d.ts") &&
      !p.includes(`${sep}node_modules${sep}`),
  );

  const contracts: Contract[] = [];
  const bindings: Binding[] = [];
  const consumerRequires: ConsumerRequire[] = [];
  const contractSeen = new Set<string>();
  const bindingSeen = new Set<string>();
  const fieldsById = new Map<string, string[]>();
  const kinds = new Map<string, ContractKind>();

  // Pass 0: repo-wide string enums / const maps for Topic.X / ENUM_*.Y resolution
  const globals = new Map<string, string>();
  for (const file of files) {
    let src: string;
    try {
      src = await readFile(file, "utf8");
    } catch {
      continue;
    }
    if (src.length > 400_000) continue;
    if (!/\benum\s+\w+|const\s+\w+\s*=\s*\{/.test(src)) continue;
    for (const [k, v] of buildLocalStrings(src)) {
      if (!globals.has(k)) globals.set(k, v);
    }
  }

  // Pass 1: CQRS / DomainEvent contract classes
  for (const file of files) {
    let src: string;
    try {
      src = await readFile(file, "utf8");
    } catch {
      continue;
    }
    if (src.length > 1_500_000) continue;
    if (
      !file.endsWith(".contract.ts") &&
      !/\bIEvent\b|\bDomainEvent\b|\bIAggregateEvent\b|DomainEvent\s*</.test(
        src,
      )
    ) {
      continue;
    }
    for (const c of extractEventClasses(file, src)) {
      if (!contractSeen.has(c.id)) {
        contractSeen.add(c.id);
        contracts.push(c);
      } else if (c.requiredFields.length > 0) {
        const existing = contracts.find((x) => x.id === c.id);
        if (existing) {
          for (const f of c.requiredFields) {
            if (!existing.requiredFields.includes(f)) {
              existing.requiredFields.push(f);
            }
          }
        }
      }
      kinds.set(c.id, "event");
      if (c.requiredFields.length > 0) {
        fieldsById.set(c.id, c.requiredFields);
      }
    }
  }

  // Pass 2: decorators + publish/consume
  for (const file of files) {
    let src: string;
    try {
      src = await readFile(file, "utf8");
    } catch {
      continue;
    }
    if (src.length > 1_500_000) continue;
    if (
      !/@EventPattern\b|@MessagePattern\b|@MessageTopic\b|@SubscribeTo\b|@OnEvent\b|@EventsHandler\b|publishMessage\s*\(|consumeMessage\s*[<(]|\.emit\s*\(|\.produceSend\s*\(|\.produceEmit\s*\(/.test(
        src,
      )
    ) {
      continue;
    }

    const service = serviceFromPath(root, file);
    const locals = new Map([...globals, ...buildLocalStrings(src)]);
    const before = bindings.length;
    extractBindings(
      file,
      src,
      service,
      locals,
      bindings,
      bindingSeen,
      kinds,
    );

    for (const b of bindings.slice(before)) {
      ensureContractFromBinding(
        contracts,
        contractSeen,
        b.contract,
        kinds.get(b.contract) ?? "event",
        file,
      );
    }
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

  return { extractor: "nest", contracts, bindings, consumerRequires };
}


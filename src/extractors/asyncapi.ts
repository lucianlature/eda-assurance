import { readFile } from "node:fs/promises";
import { basename, dirname } from "node:path";
import { parse } from "yaml";
import type {
  Binding,
  ConsumerRequire,
  Contract,
  ContractKind,
  ExtractorHit,
} from "../types.ts";
import { walk } from "../walk.ts";

function isObj(v: unknown): v is Record<string, unknown> {
  return Boolean(v) && typeof v === "object" && !Array.isArray(v);
}

function slug(s: string): string {
  return s
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 80);
}

function parseDoc(raw: string): Record<string, unknown> | null {
  const trimmed = raw.trimStart();
  if (!trimmed.startsWith("{") && !/^asyncapi\s*:/m.test(trimmed.slice(0, 400))) {
    return null;
  }
  try {
    const doc = trimmed.startsWith("{")
      ? (JSON.parse(raw) as unknown)
      : parse(raw);
    if (!isObj(doc) || typeof doc.asyncapi !== "string") return null;
    return doc;
  } catch {
    return null;
  }
}

function resolveRef(
  doc: Record<string, unknown>,
  ref: string,
): unknown {
  if (!ref.startsWith("#/")) return undefined;
  let cur: unknown = doc;
  for (const part of ref.slice(2).split("/")) {
    const key = part.replace(/~1/g, "/").replace(/~0/g, "~");
    if (!isObj(cur) || !(key in cur)) return undefined;
    cur = cur[key];
  }
  return cur;
}

function deref(
  doc: Record<string, unknown>,
  node: unknown,
  depth = 0,
): unknown {
  if (depth > 12 || !isObj(node)) return node;
  if (typeof node.$ref === "string") {
    const target = resolveRef(doc, node.$ref);
    if (target === undefined) return node;
    return deref(doc, target, depth + 1);
  }
  return node;
}

function requiredFromSchema(
  doc: Record<string, unknown>,
  schema: unknown,
  depth = 0,
): string[] {
  if (depth > 12) return [];
  const resolved = deref(doc, schema, 0);
  if (!isObj(resolved)) return [];

  // AsyncAPI multi-format payload: { schemaFormat, schema }
  if (isObj(resolved.schema) || typeof resolved.schema === "string") {
    return requiredFromSchema(doc, resolved.schema, depth + 1);
  }

  if (Array.isArray(resolved.required)) {
    return resolved.required.filter((x): x is string => typeof x === "string");
  }

  // allOf: union required keys that appear on object parts
  if (Array.isArray(resolved.allOf)) {
    const out = new Set<string>();
    for (const part of resolved.allOf) {
      for (const f of requiredFromSchema(doc, part, depth + 1)) out.add(f);
    }
    return [...out];
  }

  return [];
}

function payloadRequired(
  doc: Record<string, unknown>,
  message: unknown,
): string[] {
  const msg = deref(doc, message, 0);
  if (!isObj(msg)) return [];
  return requiredFromSchema(doc, msg.payload, 0);
}

function messageId(
  channelKey: string,
  messageKey: string,
  message: unknown,
): string {
  const msg = isObj(message) ? message : {};
  if (typeof msg.name === "string" && msg.name.length > 0) return msg.name;
  if (typeof msg.messageId === "string" && msg.messageId.length > 0) {
    return msg.messageId;
  }
  if (messageKey && messageKey !== "message") return messageKey;
  return channelKey;
}

function kindFor(id: string, channelKey: string, address: string): ContractKind {
  const hay = `${id} ${channelKey} ${address}`.toLowerCase();
  if (/\b(command|cmd|action|rpc)\b/.test(hay)) return "command";
  if (/\b(query|request)\b/.test(hay)) return "query";
  return "event";
}

function serviceName(doc: Record<string, unknown>, file: string): string {
  const info = isObj(doc.info) ? doc.info : {};
  if (typeof info.title === "string" && info.title.trim()) {
    return slug(info.title) || "asyncapi-service";
  }
  const base = basename(file).replace(/\.(ya?ml|json)$/i, "");
  if (base && !/^asyncapi$/i.test(base)) return slug(base);
  return slug(basename(dirname(file))) || "asyncapi-service";
}

function majorVersion(asyncapi: string): number {
  const m = asyncapi.match(/^(\d+)/);
  return m?.[1] ? Number(m[1]) : 0;
}

function extractV3(
  doc: Record<string, unknown>,
  file: string,
  service: string,
): {
  contracts: Contract[];
  bindings: Binding[];
  consumerRequires: ConsumerRequire[];
} {
  const contracts: Contract[] = [];
  const bindings: Binding[] = [];
  const consumerRequires: ConsumerRequire[] = [];
  const seenContract = new Set<string>();

  const channels = isObj(doc.channels) ? doc.channels : {};
  const operations = isObj(doc.operations) ? doc.operations : {};

  function ensureContract(
    id: string,
    channelKey: string,
    address: string,
    message: unknown,
  ): void {
    if (seenContract.has(id)) return;
    seenContract.add(id);
    contracts.push({
      id,
      kind: kindFor(id, channelKey, address),
      source: file,
      requiredFields: payloadRequired(doc, message),
    });
  }

  for (const [channelKey, channelRaw] of Object.entries(channels)) {
    const channel = deref(doc, channelRaw, 0);
    if (!isObj(channel)) continue;
    const address =
      typeof channel.address === "string" ? channel.address : channelKey;
    const messages = isObj(channel.messages) ? channel.messages : {};
    for (const [messageKey, messageRaw] of Object.entries(messages)) {
      const message = deref(doc, messageRaw, 0);
      const id = messageId(channelKey, messageKey, message);
      ensureContract(id, channelKey, address, message);
    }
  }

  for (const [, opRaw] of Object.entries(operations)) {
    const op = deref(doc, opRaw, 0);
    if (!isObj(op)) continue;
    const action = op.action === "send" || op.action === "receive" ? op.action : null;
    if (!action) continue;
    const channelRef = isObj(op.channel) ? op.channel : null;
    const channelPath =
      typeof channelRef?.$ref === "string" ? channelRef.$ref : "";
    const channelKey = channelPath.split("/").pop() ?? "";
    const channel = deref(doc, op.channel, 0);
    if (!isObj(channel)) continue;
    const address =
      typeof channel.address === "string" ? channel.address : channelKey;
    const channelMessages = isObj(channel.messages) ? channel.messages : {};

    const opMessages = Array.isArray(op.messages) ? op.messages : null;
    const messageEntries: Array<[string, unknown]> = opMessages
      ? opMessages.map((ref, i) => {
          const resolved = deref(doc, ref, 0);
          const key =
            isObj(ref) && typeof ref.$ref === "string"
              ? (ref.$ref.split("/").pop() ?? `msg${i}`)
              : `msg${i}`;
          return [key, resolved];
        })
      : Object.entries(channelMessages);

    const role = action === "send" ? "producer" : "consumer";
    for (const [messageKey, message] of messageEntries) {
      const id = messageId(channelKey, messageKey, message);
      ensureContract(id, channelKey, address, message);
      bindings.push({ service, contract: id, role, source: file });
      if (role === "consumer") {
        const fields = payloadRequired(doc, message);
        if (fields.length > 0) {
          consumerRequires.push({
            contract: id,
            service,
            fields,
            source: file,
          });
        }
      }
    }
  }

  return { contracts, bindings, consumerRequires };
}

function extractV2(
  doc: Record<string, unknown>,
  file: string,
  service: string,
): {
  contracts: Contract[];
  bindings: Binding[];
  consumerRequires: ConsumerRequire[];
} {
  const contracts: Contract[] = [];
  const bindings: Binding[] = [];
  const consumerRequires: ConsumerRequire[] = [];
  const seenContract = new Set<string>();
  const channels = isObj(doc.channels) ? doc.channels : {};

  function takeMessage(
    channelKey: string,
    role: "producer" | "consumer",
    messageNode: unknown,
  ): void {
    const resolved = deref(doc, messageNode, 0);
    const messages: unknown[] = [];
    if (isObj(resolved) && Array.isArray(resolved.oneOf)) {
      messages.push(...resolved.oneOf);
    } else if (resolved) {
      messages.push(resolved);
    }
    for (const [i, message] of messages.entries()) {
      const id = messageId(channelKey, `message${i}`, message);
      if (!seenContract.has(id)) {
        seenContract.add(id);
        contracts.push({
          id,
          kind: kindFor(id, channelKey, channelKey),
          source: file,
          requiredFields: payloadRequired(doc, message),
        });
      }
      bindings.push({ service, contract: id, role, source: file });
      if (role === "consumer") {
        const fields = payloadRequired(doc, message);
        if (fields.length > 0) {
          consumerRequires.push({
            contract: id,
            service,
            fields,
            source: file,
          });
        }
      }
    }
  }

  for (const [channelKey, channelRaw] of Object.entries(channels)) {
    const channel = deref(doc, channelRaw, 0);
    if (!isObj(channel)) continue;
    // AsyncAPI 2: publish = app produces; subscribe = app consumes
    if (isObj(channel.publish) && channel.publish.message !== undefined) {
      takeMessage(channelKey, "producer", channel.publish.message);
    }
    if (isObj(channel.subscribe) && channel.subscribe.message !== undefined) {
      takeMessage(channelKey, "consumer", channel.subscribe.message);
    }
  }

  return { contracts, bindings, consumerRequires };
}

async function extractFile(file: string): Promise<ExtractorHit | null> {
  let raw: string;
  try {
    raw = await readFile(file, "utf8");
  } catch {
    return null;
  }
  if (raw.length > 2_000_000) return null;
  const doc = parseDoc(raw);
  if (!doc) return null;

  const service = serviceName(doc, file);
  const major = majorVersion(String(doc.asyncapi));
  const extracted =
    major >= 3
      ? extractV3(doc, file, service)
      : extractV2(doc, file, service);

  if (
    extracted.contracts.length +
      extracted.bindings.length +
      extracted.consumerRequires.length ===
    0
  ) {
    return null;
  }

  return {
    extractor: "asyncapi",
    contracts: extracted.contracts,
    bindings: extracted.bindings,
    consumerRequires: extracted.consumerRequires,
  };
}

export async function extractAsyncApi(root: string): Promise<ExtractorHit> {
  const files = await walk(
    root,
    (p) =>
      p.endsWith(".yaml") ||
      p.endsWith(".yml") ||
      p.endsWith(".json"),
  );

  const contracts: Contract[] = [];
  const bindings: Binding[] = [];
  const consumerRequires: ConsumerRequire[] = [];

  for (const file of files) {
    // Skip obvious non-spec JSON (package-lock etc.) cheaply by name
    const base = basename(file).toLowerCase();
    if (
      base === "package.json" ||
      base === "package-lock.json" ||
      base === "tsconfig.json" ||
      base.endsWith(".lock.json")
    ) {
      continue;
    }
    const hit = await extractFile(file);
    if (!hit) continue;
    contracts.push(...hit.contracts);
    bindings.push(...hit.bindings);
    consumerRequires.push(...(hit.consumerRequires ?? []));
  }

  return { extractor: "asyncapi", contracts, bindings, consumerRequires };
}

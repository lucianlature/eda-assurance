import { readFile } from "node:fs/promises";
import { relative, sep } from "node:path";
import type { Binding, Contract, ExtractorHit } from "../types.ts";
import { walk } from "../walk.ts";

const SKIP_DIR = new Set(["nats-test", "client", "infra", "common"]);

function serviceFromPath(root: string, file: string): string | undefined {
  const rel = relative(root, file);
  const top = rel.split(sep)[0];
  if (!top || SKIP_DIR.has(top)) return undefined;
  return top;
}

function parseSubjects(src: string): Array<{ name: string; value: string }> {
  const block = src.match(/export enum Subjects \{([\s\S]*?)\}/);
  if (!block?.[1]) return [];
  const out: Array<{ name: string; value: string }> = [];
  for (const line of block[1].split("\n")) {
    const m = line.match(/(\w+)\s*=\s*"([^"]+)"/);
    if (m && m[1] && m[2]) out.push({ name: m[1], value: m[2] });
  }
  return out;
}

function parseDataFields(src: string): string[] {
  const start = src.search(/data:\s*\{/);
  if (start === -1) return [];
  const open = src.indexOf("{", start);
  let depth = 0;
  let end = open;
  for (let i = open; i < src.length; i++) {
    const ch = src[i];
    if (ch === "{") depth++;
    if (ch === "}") {
      depth--;
      if (depth === 0) {
        end = i;
        break;
      }
    }
  }
  const body = src.slice(open + 1, end);
  const fields: string[] = [];
  const parentStack: string[] = [];
  let localDepth = 0;
  for (const line of body.split("\n")) {
    const openObj = line.includes("{");
    const closeObj = line.includes("}");
    const key = line.match(/^\s*(\w+)(\??)\s*:/);
    if (key && key[1] && !openObj) {
      if (key[2] === "?") continue;
      const prefix = parentStack[parentStack.length - 1];
      fields.push(prefix ? `${prefix}.${key[1]}` : key[1]);
    } else if (key && key[1] && openObj) {
      parentStack.push(key[1]);
      localDepth++;
    }
    if (closeObj && localDepth > 0) {
      parentStack.pop();
      localDepth--;
    }
  }
  return fields;
}

function subjectRefs(src: string): string[] {
  return [...src.matchAll(/Subjects\.(\w+)/g)].map((m) => m[1] ?? "").filter(Boolean);
}

export async function extractNats(root: string): Promise<ExtractorHit> {
  const files = await walk(root, (p) => p.endsWith(".ts") && !p.includes("__tests__"));
  const contracts: Contract[] = [];
  const bindings: Binding[] = [];
  const subjectValue = new Map<string, string>();

  for (const file of files) {
    if (!file.endsWith("subjects.ts")) continue;
    if (file.includes(`${sep}nats-test${sep}`)) continue;
    const src = await readFile(file, "utf8");
    for (const s of parseSubjects(src)) {
      subjectValue.set(s.name, s.value);
    }
  }

  for (const file of files) {
    if (file.includes(`${sep}nats-test${sep}`)) continue;
    const src = await readFile(file, "utf8");
    const event = src.match(/export interface (\w+Event)\s*\{/);
    if (!event || !event[1]) continue;
    const subj = src.match(/subject:\s*Subjects\.(\w+)/);
    const id = subj?.[1] ? (subjectValue.get(subj[1]) ?? subj[1]) : event[1];
    contracts.push({
      id,
      kind: "subject",
      source: file,
      requiredFields: parseDataFields(src),
    });
  }

  for (const file of files) {
    if (file.includes(`${sep}nats-test${sep}`)) continue;
    const src = await readFile(file, "utf8");
    const isPublisher = /extends Publisher</.test(src);
    const isListener = /extends Listener</.test(src);
    if (!isPublisher && !isListener) continue;
    const service = serviceFromPath(root, file);
    if (!service) continue;
    const names = subjectRefs(src);
    const name = names[0];
    if (!name) continue;
    const id = subjectValue.get(name) ?? name;
    bindings.push({
      service,
      contract: id,
      role: isPublisher ? "producer" : "consumer",
      source: file,
    });
  }

  return { extractor: "nats-node", contracts, bindings };
}

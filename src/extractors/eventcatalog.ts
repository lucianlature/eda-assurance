import { readFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { parse } from "yaml";
import type { Binding, Contract, ExtractorHit } from "../types.ts";
import { walk } from "../walk.ts";

const SERVICE_INDEX = /[/\\]services[/\\][^/\\]+[/\\]index\.mdx$/;
const EVENT_INDEX = /[/\\]events[/\\][^/\\]+[/\\]index\.mdx$/;
const COMMAND_INDEX = /[/\\]commands[/\\][^/\\]+[/\\]index\.mdx$/;
const QUERY_INDEX = /[/\\]queries[/\\][^/\\]+[/\\]index\.mdx$/;

type Frontmatter = Record<string, unknown>;

function parseFrontmatter(text: string): Frontmatter | null {
  if (!text.startsWith("---")) return null;
  const close = text.indexOf("\n---", 3);
  if (close === -1) return null;
  const raw = text.slice(4, close);
  const parsed = parse(raw);
  if (!parsed || typeof parsed !== "object") return null;
  return parsed as Frontmatter;
}

function asId(value: unknown): string | undefined {
  if (typeof value === "string") return value;
  if (value && typeof value === "object" && "id" in value) {
    const id = (value as { id: unknown }).id;
    if (typeof id === "string") return id;
  }
  return undefined;
}

function refIds(list: unknown): string[] {
  if (!Array.isArray(list)) return [];
  return list.map(asId).filter((id): id is string => Boolean(id));
}

async function requiredFieldsFromSchema(
  docPath: string,
  schemaPath: unknown,
): Promise<string[]> {
  if (typeof schemaPath !== "string") return [];
  try {
    const raw = await readFile(join(dirname(docPath), schemaPath), "utf8");
    const schema = JSON.parse(raw) as { required?: unknown };
    return Array.isArray(schema.required)
      ? schema.required.filter((x): x is string => typeof x === "string")
      : [];
  } catch {
    return [];
  }
}

export async function extractEventCatalog(root: string): Promise<ExtractorHit> {
  const files = await walk(root, (p) => p.endsWith(".mdx") || p.endsWith(".md"));
  const contracts: Contract[] = [];
  const bindings: Binding[] = [];

  for (const file of files) {
    const text = await readFile(file, "utf8");
    const fm = parseFrontmatter(text);
    if (!fm || typeof fm.id !== "string") continue;

    if (EVENT_INDEX.test(file)) {
      contracts.push({
        id: fm.id,
        kind: "event",
        source: file,
        requiredFields: await requiredFieldsFromSchema(file, fm.schemaPath),
      });
      continue;
    }
    if (COMMAND_INDEX.test(file)) {
      contracts.push({
        id: fm.id,
        kind: "command",
        source: file,
        requiredFields: await requiredFieldsFromSchema(file, fm.schemaPath),
      });
      continue;
    }
    if (QUERY_INDEX.test(file)) {
      contracts.push({
        id: fm.id,
        kind: "query",
        source: file,
        requiredFields: await requiredFieldsFromSchema(file, fm.schemaPath),
      });
      continue;
    }

    if (!SERVICE_INDEX.test(file)) continue;
    const service = fm.id;
    for (const id of refIds(fm.sends)) {
      bindings.push({
        service,
        contract: id,
        role: "producer",
        source: file,
      });
    }
    for (const id of refIds(fm.receives)) {
      bindings.push({
        service,
        contract: id,
        role: "consumer",
        source: file,
      });
    }
  }

  return { extractor: "eventcatalog", contracts, bindings };
}

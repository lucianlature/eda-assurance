import { readFile } from "node:fs/promises";
import { relative, sep } from "node:path";
import { parseContractId, parseExportedInterfaceFields } from "../parse-interface.ts";
import type { Binding, ConsumerRequire, Contract, ExtractorHit } from "../types.ts";
import { walk } from "../walk.ts";

function serviceFromApps(root: string, file: string): string | undefined {
  const parts = relative(root, file).split(sep);
  const apps = parts.indexOf("apps");
  if (apps === -1) return undefined;
  return parts[apps + 1];
}

function roleFromPath(file: string): "producer" | "consumer" | undefined {
  const n = file.split(sep).join("/");
  if (n.includes("/src/events/")) return "producer";
  if (n.includes("/src/consumers/") || n.includes("/src/streams/")) return "consumer";
  return undefined;
}

export async function extractTsEvents(root: string): Promise<ExtractorHit> {
  const files = await walk(root, (p) => p.endsWith(".ts"));
  const contracts: Contract[] = [];
  const bindings: Binding[] = [];
  const consumerRequires: ConsumerRequire[] = [];

  for (const file of files) {
    const role = roleFromPath(file);
    if (!role) continue;
    const service = serviceFromApps(root, file);
    if (!service) continue;
    const src = await readFile(file, "utf8");
    const id = parseContractId(src);
    if (!id) continue;
    const fields = parseExportedInterfaceFields(src);

    bindings.push({ service, contract: id, role, source: file });

    if (role === "producer") {
      contracts.push({
        id,
        kind: "event",
        source: file,
        requiredFields: fields,
      });
    } else if (fields.length > 0) {
      consumerRequires.push({
        contract: id,
        service,
        fields,
        source: file,
      });
    }
  }

  return { extractor: "ts-events", contracts, bindings, consumerRequires };
}

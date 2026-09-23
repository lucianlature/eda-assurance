import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { parse } from "yaml";
import type { Binding, ConsumerRequire, Contract, ExtractorHit } from "../types.ts";

type YamlConsumer = {
  service?: string;
  group?: string;
  deployedCommit?: string;
  requires?: string[];
};

type YamlContract = {
  id?: string;
  producer?: string;
  consumers?: YamlConsumer[];
};

type YamlTopology = {
  rollingWindowSeconds?: number;
  contracts?: YamlContract[];
};

export async function extractFixtureTopology(root: string): Promise<ExtractorHit> {
  const path = join(root, ".eventcontracts/topology.yaml");
  let raw: string;
  try {
    raw = await readFile(path, "utf8");
  } catch {
    return { extractor: "fixture-topology", contracts: [], bindings: [] };
  }

  const doc = parse(raw) as YamlTopology;
  const contracts: Contract[] = [];
  const bindings: Binding[] = [];
  const consumerRequires: ConsumerRequire[] = [];

  for (const row of doc.contracts ?? []) {
    if (!row.id) continue;
    contracts.push({
      id: row.id,
      kind: "event",
      source: path,
      requiredFields: [],
    });
    if (row.producer) {
      bindings.push({
        service: row.producer,
        contract: row.id,
        role: "producer",
        source: path,
      });
    }
    for (const c of row.consumers ?? []) {
      if (!c.service) continue;
      bindings.push({
        service: c.service,
        contract: row.id,
        role: "consumer",
        source: path,
      });
      consumerRequires.push({
        contract: row.id,
        service: c.service,
        fields: c.requires ?? [],
        source: path,
        deployedCommit: c.deployedCommit,
      });
    }
  }

  return {
    extractor: "fixture-topology",
    contracts,
    bindings,
    consumerRequires,
    rollingWindowSeconds:
      typeof doc.rollingWindowSeconds === "number"
        ? doc.rollingWindowSeconds
        : undefined,
  };
}

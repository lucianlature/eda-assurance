import assert from "node:assert/strict";
import { readdir, readFile, stat } from "node:fs/promises";
import { join } from "node:path";
import { describe, it } from "node:test";
import { parse } from "yaml";
import { analyze } from "../src/scan.ts";
import type { Topology } from "../src/types.ts";
import { REPO } from "./helpers.ts";

const REPORTS = join(REPO, "reports/public");
const TARGETS = join(REPO, ".targets");

async function isDir(p: string): Promise<boolean> {
  try {
    return (await stat(p)).isDirectory();
  } catch {
    return false;
  }
}

const hasTargets = await isDir(TARGETS);
const names = hasTargets ? (await readdir(REPORTS)).sort() : [];

describe("public corpus snapshot", { skip: hasTargets ? false : "no .targets clones" }, () => {
  for (const name of names) {
    const target = join(TARGETS, name);
    it(name, async (t) => {
      if (!(await isDir(target))) return t.skip("target not cloned");
      let snapshot: Topology;
      try {
        snapshot = parse(await readFile(join(REPORTS, name, "topology.yaml"), "utf8")) as Topology;
      } catch {
        return t.skip("no committed topology.yaml");
      }
      const { topology } = await analyze(target);
      const serialized = JSON.parse(JSON.stringify(topology)) as Topology;
      assert.deepEqual(
        { extractors: serialized.extractors, contracts: serialized.contracts },
        { extractors: snapshot.extractors, contracts: snapshot.contracts },
        `topology drift for ${name}; if intended, rerun scripts/scan-public-targets.mjs`,
      );
    });
  }
});

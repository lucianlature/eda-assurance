import { mkdir, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { preflight, type PreflightOpts, type PreflightResult } from "./preflight.ts";

export async function writePassport(
  root: string,
  results: PreflightResult[],
): Promise<string> {
  const dir = join(root, ".eventcontracts");
  await mkdir(dir, { recursive: true });
  const path = join(dir, "passport.json");
  const body = {
    specVersion: "eda-assurance/v0.1",
    createdAt: new Date().toISOString(),
    results,
  };
  await writeFile(path, `${JSON.stringify(body, null, 2)}\n`, "utf8");
  return path;
}

export async function generatePassport(
  root: string,
  opts: PreflightOpts = {},
): Promise<{ path: string; results: PreflightResult[] }> {
  const results = await preflight(root, opts);
  const path = await writePassport(root, results);
  return { path, results };
}

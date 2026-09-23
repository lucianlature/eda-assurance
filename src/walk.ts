import { readdir } from "node:fs/promises";
import { join } from "node:path";

const SKIP = new Set([
  "node_modules",
  ".git",
  "dist",
  "build",
  "coverage",
  ".next",
  "federated",
]);

export async function walk(
  root: string,
  pred: (absPath: string) => boolean,
): Promise<string[]> {
  const out: string[] = [];

  async function rec(dir: string): Promise<void> {
    let entries;
    try {
      entries = await readdir(dir, { withFileTypes: true });
    } catch {
      return;
    }
    for (const entry of entries) {
      if (SKIP.has(entry.name) || entry.name.startsWith(".")) continue;
      const abs = join(dir, entry.name);
      if (entry.isDirectory()) await rec(abs);
      else if (pred(abs)) out.push(abs);
    }
  }

  await rec(root);
  return out;
}

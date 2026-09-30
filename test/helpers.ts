import { mkdir, mkdtemp, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

export const REPO = resolve(dirname(fileURLToPath(import.meta.url)), "..");
export const FIXTURE = join(REPO, "fixtures/payments-settled");

export type Tree = Record<string, string>;

export async function tempRepo(tree: Tree): Promise<{ root: string; cleanup: () => Promise<void> }> {
  const root = await mkdtemp(join(tmpdir(), "eda-test-"));
  for (const [rel, body] of Object.entries(tree)) {
    const abs = join(root, rel);
    await mkdir(dirname(abs), { recursive: true });
    await writeFile(abs, body, "utf8");
  }
  return { root, cleanup: () => rm(root, { recursive: true, force: true }) };
}

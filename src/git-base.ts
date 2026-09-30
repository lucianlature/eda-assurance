import { execFile } from "node:child_process";
import { mkdtemp, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { promisify } from "node:util";

const run = promisify(execFile);

export type BaseTree = {
  ref: string;
  sha: string;
  root: string;
  cleanup: () => Promise<void>;
};

async function git(cwd: string, args: string[]): Promise<string> {
  const { stdout } = await run("git", ["-C", cwd, ...args], { maxBuffer: 64 * 1024 * 1024 });
  return stdout.trim();
}

/** Extract `root` as it was at `ref` into a temp dir. Throws if `root` is not in a git repo or `ref` is unknown. */
export async function materializeBase(root: string, ref: string): Promise<BaseTree> {
  const sha = await git(root, ["rev-parse", "--verify", `${ref}^{commit}`]);
  const top = await git(root, ["rev-parse", "--show-toplevel"]);
  const prefix = await git(root, ["rev-parse", "--show-prefix"]);
  const dir = await mkdtemp(join(tmpdir(), "eda-base-"));
  const cleanup = () => rm(dir, { recursive: true, force: true });
  try {
    const tar = join(dir, "base.tar");
    await git(top, ["archive", "--format=tar", "-o", tar, sha, "--", prefix || "."]);
    await run("tar", ["-xf", tar, "-C", dir]);
    await rm(tar);
  } catch (err) {
    await cleanup();
    throw err;
  }
  return { ref, sha, root: join(dir, prefix), cleanup };
}

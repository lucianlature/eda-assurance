#!/usr/bin/env node
import { mkdir, readdir, writeFile } from "node:fs/promises";
import { basename, dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { spawn } from "node:child_process";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const targetsDir = join(root, ".targets");
const outRoot = join(root, "reports/public");
const fixture = join(root, "fixtures/payments-settled");

function run(cmd, args, cwd) {
  return new Promise((resolve) => {
    const child = spawn(cmd, args, { cwd, stdio: ["ignore", "pipe", "pipe"] });
    let out = "";
    child.stdout.on("data", (d) => (out += d));
    child.stderr.on("data", (d) => (out += d));
    child.on("close", (code) => resolve({ code: code ?? 1, out }));
  });
}

async function scanOne(dir) {
  const slug = basename(dir);
  const out = join(outRoot, slug);
  await mkdir(out, { recursive: true });
  const started = Date.now();
  const { code, out: log } = await run(
    process.execPath,
    [
      "--experimental-strip-types",
      "--disable-warning=ExperimentalWarning",
      join(root, "src/cli.ts"),
      "scan",
      dir,
      "--out",
      out,
    ],
    root,
  );
  await writeFile(join(out, "scan.log"), log, "utf8");
  const contracts = Number(/contracts: (\d+)/.exec(log)?.[1] ?? "0");
  const findings = Number(/findings: (\d+)/.exec(log)?.[1] ?? "0");
  const extractors = /extractors: (.+)/.exec(log)?.[1]?.trim() ?? "(none)";
  console.log(
    `${slug.padEnd(40)} c=${String(contracts).padStart(4)} f=${String(findings).padStart(3)}  ${extractors}`,
  );
  return {
    slug,
    path: dir,
    exitCode: code,
    ms: Date.now() - started,
    contracts,
    findings,
    extractors,
  };
}

const dirs = [fixture];
for (const name of await readdir(targetsDir)) {
  dirs.push(join(targetsDir, name));
}

const results = [];
for (const dir of dirs) {
  results.push(await scanOne(dir));
}
await mkdir(outRoot, { recursive: true });
await writeFile(join(outRoot, "results.json"), `${JSON.stringify(results, null, 2)}\n`);
console.log(`wrote ${results.length} scans → reports/public/`);
await run(process.execPath, [join(root, "scripts/gen-public-index.mjs")], root);

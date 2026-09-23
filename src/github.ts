import { appendFileSync } from "node:fs";
import type { PreflightResult } from "./preflight.ts";

export function worstState(results: PreflightResult[]): "PASS" | "REVIEW" {
  return results.some((r) => r.state !== "PASS") ? "REVIEW" : "PASS";
}

export function emitGithub(
  results: PreflightResult[],
  markdown: string,
  enforce: boolean,
): void {
  const state = worstState(results);
  const output = process.env.GITHUB_OUTPUT;
  if (output) appendFileSync(output, `state=${state}\n`);
  const summary = process.env.GITHUB_STEP_SUMMARY;
  if (summary) appendFileSync(summary, `${markdown}\n`);
  if (process.env.GITHUB_ACTIONS !== "true") return;
  const kind = enforce ? "error" : "warning";
  for (const r of results) {
    if (r.state === "PASS") continue;
    const broken = r.consumers
      .filter((c) => c.status === "incompatible")
      .map((c) => c.service)
      .join(", ");
    const fields = r.change.fields.join(", ");
    const title = r.rule ?? r.state;
    const detail = fields
      ? `${r.contract}: ${fields} still required by ${broken || "a deployed consumer"}`
      : `${r.contract}: ${r.state}`;
    console.log(`::${kind} title=${title}::${detail}`);
  }
}

import { mkdir, readdir, writeFile } from "node:fs/promises";
import { basename, join } from "node:path";
import { preflight } from "./preflight.ts";
import { loadQueue, upsertItem, writeInbox, type QueueItem } from "./queue.ts";
import { analyze } from "./scan.ts";

async function nightRoots(workspace: string): Promise<string[]> {
  const roots = [join(workspace, "fixtures/payments-settled")];
  try {
    const entries = await readdir(join(workspace, ".targets"), { withFileTypes: true });
    for (const e of entries) {
      if (e.isDirectory() && !e.name.startsWith(".")) {
        roots.push(join(workspace, ".targets", e.name));
      }
    }
  } catch {
    // no local clones
  }
  return roots;
}

const SEEDS: Array<Omit<QueueItem, "createdAt" | "updatedAt" | "status">> = [
  {
    id: "human:npm-status",
    kind: "human",
    needs: "lucian",
    title: "npm 0.0.1 vs private README",
    detail:
      "A public @lucianlature/eda-assurance@0.0.1 PUT succeeded earlier. package.json is now private/UNLICENSED and the README says the engine is not published. Unpublish, ignore, or own the contradiction.",
    evidence: ["package.json", "README.md"],
  },
  {
    id: "human:night-standing-order",
    kind: "human",
    needs: "lucian",
    title: "Standing order: night may keep scanning .targets",
    detail:
      "Night will re-scan local clones and collapse findings into this inbox. No emails. Approve to keep that as the default; reject to fixture-only.",
    evidence: ["ops/CONTRACT.md"],
  },
  {
    id: "human:first-audit",
    kind: "human",
    needs: "lucian",
    title: "First $6–9k audit: inbound only, or wait",
    detail:
      "Night will not contact anyone. If someone asks, the SOW is docs/01-sow.md. Say later if there is no inbound yet.",
    evidence: ["docs/01-sow.md"],
  },
];

export async function runNight(workspace: string): Promise<{
  inbox: string;
  scanned: number;
  queued: number;
}> {
  const roots = await nightRoots(workspace);
  let queued = 0;

  for (const seed of SEEDS) {
    await upsertItem(workspace, seed);
    queued += 1;
  }

  for (const root of roots) {
    const { findings } = await analyze(root);
    const actionable = findings.filter((f) => f.severity !== "info");
    const byRule = new Map<string, typeof actionable>();
    for (const f of actionable) {
      const list = byRule.get(f.rule) ?? [];
      list.push(f);
      byRule.set(f.rule, list);
    }

    for (const [rule, group] of byRule) {
      if (group.length > 3) {
        await upsertItem(workspace, {
          id: `finding:${basename(root)}:${rule}:summary`,
          kind: "finding",
          needs: "lucian",
          title: `${basename(root)}: ${group.length}× ${rule}`,
          detail: group
            .slice(0, 8)
            .map((f) => `${f.contract ?? "—"} — ${f.detail}`)
            .join("\n"),
          evidence: group.flatMap((f) => f.evidence).slice(0, 12),
          target: root,
        });
        queued += 1;
        continue;
      }
      for (const f of group) {
        await upsertItem(workspace, {
          id: `finding:${basename(root)}:${rule}:${f.contract ?? "none"}`,
          kind: "finding",
          needs: "lucian",
          title: `${rule}${f.contract ? ` ${f.contract}` : ""} (${basename(root)})`,
          detail: f.detail,
          evidence: f.evidence,
          target: root,
        });
        queued += 1;
      }
    }

    const reviews = (await preflight(root)).filter((r) => r.state !== "PASS");
    for (const r of reviews) {
      if (!r.rule) continue;
      await upsertItem(workspace, {
        id: `finding:${basename(root)}:${r.rule}:${r.contract}`,
        kind: "finding",
        needs: "lucian",
        title: `${r.state} ${r.rule} ${r.contract}`,
        detail: `Producer ${r.producer ?? "?"}. Missing ${r.change.fields.join(", ") || "—"}. Incompatible: ${r.consumers
          .filter((c) => c.status === "incompatible")
          .map((c) => c.service)
          .join(", ") || "none"}.`,
        evidence: [root],
        target: root,
      });
      queued += 1;
    }
  }

  const items = await loadQueue(workspace);
  const inbox = await writeInbox(workspace, items);
  const logDir = join(workspace, "ops", "log");
  await mkdir(logDir, { recursive: true });
  const stamp = new Date().toISOString().replaceAll(":", "").slice(0, 15);
  await writeFile(
    join(logDir, `night-${stamp}.json`),
    `${JSON.stringify({ scanned: roots, queued, pending: items.filter((i) => i.status === "pending").length }, null, 2)}\n`,
    "utf8",
  );
  return { inbox, scanned: roots.length, queued };
}

import { mkdir, readdir, readFile, writeFile } from "node:fs/promises";
import { join } from "node:path";

export type QueueStatus = "pending" | "approved" | "rejected" | "later";

export type QueueItem = {
  id: string;
  createdAt: string;
  updatedAt: string;
  kind: "finding" | "human";
  status: QueueStatus;
  needs: "lucian" | "night";
  title: string;
  detail: string;
  evidence: string[];
  target?: string;
};

export function opsDir(workspace: string): string {
  return join(workspace, "ops");
}

export function queueDir(workspace: string): string {
  return join(opsDir(workspace), "queue");
}

export async function loadQueue(workspace: string): Promise<QueueItem[]> {
  const dir = queueDir(workspace);
  let names: string[];
  try {
    names = (await readdir(dir)).filter((n) => n.endsWith(".json"));
  } catch {
    return [];
  }
  const items: QueueItem[] = [];
  for (const name of names.sort()) {
    const raw = await readFile(join(dir, name), "utf8");
    items.push(JSON.parse(raw) as QueueItem);
  }
  return items;
}

export async function upsertItem(
  workspace: string,
  item: Omit<QueueItem, "createdAt" | "updatedAt" | "status"> & {
    status?: QueueStatus;
  },
): Promise<QueueItem> {
  const dir = queueDir(workspace);
  await mkdir(dir, { recursive: true });
  const path = join(dir, `${item.id.replaceAll("/", "_")}.json`);
  let existing: QueueItem | undefined;
  try {
    existing = JSON.parse(await readFile(path, "utf8")) as QueueItem;
  } catch {
    existing = undefined;
  }
  const now = new Date().toISOString();
  const next: QueueItem = existing
    ? {
        ...existing,
        title: item.title,
        detail: item.detail,
        evidence: item.evidence,
        target: item.target,
        updatedAt: now,
      }
    : {
        ...item,
        status: item.status ?? "pending",
        createdAt: now,
        updatedAt: now,
      };
  await writeFile(path, `${JSON.stringify(next, null, 2)}\n`, "utf8");
  return next;
}

export function renderInbox(items: QueueItem[]): string {
  const pending = items.filter((i) => i.status === "pending" && i.needs === "lucian");
  const lines = [
    "# Day inbox",
    "",
    `Pending: ${pending.length}. Reply with \`<id> approve|reject|later\`.`,
    "",
  ];
  if (pending.length === 0) {
    lines.push("Nothing waiting. Night will write here.");
    return `${lines.join("\n")}\n`;
  }
  for (const i of pending) {
    lines.push(`## \`${i.id}\``);
    lines.push("");
    lines.push(`**${i.kind}.** ${i.title}`);
    lines.push("");
    lines.push(i.detail);
    if (i.evidence.length > 0) {
      lines.push("");
      for (const e of i.evidence) lines.push(`- \`${e}\``);
    }
    lines.push("");
  }
  return lines.join("\n");
}

export async function setStatus(
  workspace: string,
  id: string,
  status: QueueStatus,
): Promise<QueueItem> {
  const items = await loadQueue(workspace);
  const item = items.find((i) => i.id === id);
  if (!item) throw new Error(`unknown queue id: ${id}`);
  item.status = status;
  item.updatedAt = new Date().toISOString();
  await mkdir(queueDir(workspace), { recursive: true });
  await writeFile(
    join(queueDir(workspace), `${id.replaceAll("/", "_")}.json`),
    `${JSON.stringify(item, null, 2)}\n`,
    "utf8",
  );
  return item;
}

export async function writeInbox(workspace: string, items: QueueItem[]): Promise<string> {
  const path = join(opsDir(workspace), "INBOX.md");
  await mkdir(opsDir(workspace), { recursive: true });
  const body = renderInbox(items);
  await writeFile(path, body, "utf8");
  return path;
}

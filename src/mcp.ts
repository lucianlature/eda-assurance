#!/usr/bin/env node
import { stdin, stdout, stderr } from "node:process";
import { resolve } from "node:path";
import { runNight } from "./night.ts";
import { generatePassport } from "./passport.ts";
import { preflight, renderPreflight, type PreflightOpts } from "./preflight.ts";
import { loadQueue, renderInbox } from "./queue.ts";

type Rpc = {
  jsonrpc: "2.0";
  id?: number | string | null;
  method?: string;
  params?: unknown;
};

function asArgs(params: unknown): Record<string, unknown> | undefined {
  if (!params || typeof params !== "object") return undefined;
  return params as Record<string, unknown>;
}

function optsFrom(args: Record<string, unknown> | undefined): {
  root: string;
  opts: PreflightOpts;
} {
  const rootRaw = args?.root;
  const contract = args?.contract;
  const afterRaw = args?.after;
  const after = Array.isArray(afterRaw)
    ? afterRaw.filter((x): x is string => typeof x === "string")
    : undefined;
  return {
    root: resolve(typeof rootRaw === "string" && rootRaw.length > 0 ? rootRaw : process.cwd()),
    opts: {
      contract: typeof contract === "string" && contract.length > 0 ? contract : undefined,
      after: after && after.length > 0 ? after : undefined,
    },
  };
}

const tools = [
  {
    name: "assurance.preflight_change",
    description:
      "Before editing an event schema, compute consumer blast radius. Returns PASS or REVIEW. Deterministic. No LLM.",
    inputSchema: {
      type: "object",
      properties: {
        contract: {
          type: "string",
          description: "Contract id, e.g. payments.settled.v1. Omit to preflight every event.",
        },
        after: {
          type: "array",
          items: { type: "string" },
          description: "Proposed required field names after the edit. Omit to use the current producer schema.",
        },
        root: {
          type: "string",
          description: "Repo root. Defaults to the workspace cwd. For nested fixtures, pass that directory.",
        },
      },
    },
  },
  {
    name: "assurance.generate_passport",
    description:
      "Write .eventcontracts/passport.json for the current preflight result. Advisory artifact for the PR. Does not overwrite topology.yaml.",
    inputSchema: {
      type: "object",
      properties: {
        contract: { type: "string" },
        after: { type: "array", items: { type: "string" } },
        root: { type: "string" },
      },
    },
  },
  {
    name: "assurance.night_shift",
    description:
      "Night cycle: scan fixtures and .targets, write ops/queue and ops/INBOX.md. Does not push, publish, or email.",
    inputSchema: {
      type: "object",
      properties: {
        root: { type: "string", description: "Workspace root. Defaults to cwd." },
      },
    },
  },
  {
    name: "assurance.day_inbox",
    description: "Show pending items that need Lucian. Deterministic queue, not a model guess.",
    inputSchema: {
      type: "object",
      properties: {
        root: { type: "string" },
      },
    },
  },
];

async function callTool(name: string, args: Record<string, unknown> | undefined) {
  const { root, opts } = optsFrom(args);
  if (name === "assurance.preflight_change") {
    const results = await preflight(root, opts);
    const text = `${renderPreflight(results)}\n\n${JSON.stringify(results, null, 2)}`;
    return { content: [{ type: "text", text }] };
  }
  if (name === "assurance.generate_passport") {
    const { path, results } = await generatePassport(root, opts);
    return {
      content: [{ type: "text", text: `Wrote ${path}\n\n${renderPreflight(results)}` }],
    };
  }
  if (name === "assurance.night_shift") {
    const { inbox, scanned, queued } = await runNight(root);
    return {
      content: [{ type: "text", text: `Night scanned ${scanned} roots, upserted ${queued}. Inbox: ${inbox}` }],
    };
  }
  if (name === "assurance.day_inbox") {
    return { content: [{ type: "text", text: renderInbox(await loadQueue(root)) }] };
  }
  throw new Error(`unknown tool: ${name}`);
}

function write(msg: object): void {
  stdout.write(`${JSON.stringify(msg)}\n`);
}

let chain = Promise.resolve();

function enqueue(rpc: Rpc): void {
  chain = chain.then(() => handle(rpc)).catch((err: unknown) => {
    stderr.write(`${err instanceof Error ? err.stack ?? err.message : String(err)}\n`);
  });
}

async function handle(rpc: Rpc): Promise<void> {
  if (!rpc.method) return;
  if (rpc.method === "initialize") {
    const params = asArgs(rpc.params);
    const protocolVersion =
      typeof params?.protocolVersion === "string" ? params.protocolVersion : "2024-11-05";
    write({
      jsonrpc: "2.0",
      id: rpc.id,
      result: {
        protocolVersion,
        capabilities: { tools: {} },
        serverInfo: { name: "eda-assurance", version: "0.0.1" },
        instructions:
          "Call assurance.preflight_change before editing an event schema. Deterministic. No LLM.",
      },
    });
    return;
  }
  if (rpc.method === "notifications/initialized" || rpc.method === "notifications/cancelled") {
    return;
  }
  if (rpc.method === "tools/list") {
    write({ jsonrpc: "2.0", id: rpc.id, result: { tools } });
    return;
  }
  if (rpc.method === "prompts/list") {
    write({ jsonrpc: "2.0", id: rpc.id, result: { prompts: [] } });
    return;
  }
  if (rpc.method === "resources/list") {
    write({ jsonrpc: "2.0", id: rpc.id, result: { resources: [] } });
    return;
  }
  if (rpc.method === "ping") {
    write({ jsonrpc: "2.0", id: rpc.id, result: {} });
    return;
  }
  if (rpc.method === "tools/call") {
    const params = asArgs(rpc.params);
    try {
      const result = await callTool(
        typeof params?.name === "string" ? params.name : "",
        asArgs(params?.arguments),
      );
      write({ jsonrpc: "2.0", id: rpc.id, result });
    } catch (err) {
      write({
        jsonrpc: "2.0",
        id: rpc.id,
        error: { code: -32000, message: err instanceof Error ? err.message : String(err) },
      });
    }
    return;
  }
  if (rpc.id !== undefined && rpc.id !== null) {
    write({
      jsonrpc: "2.0",
      id: rpc.id,
      error: { code: -32601, message: `Method not found: ${rpc.method}` },
    });
  }
}

let buf = "";
stdin.setEncoding("utf8");
stdin.on("data", (chunk: string) => {
  buf += chunk;
  let nl = buf.indexOf("\n");
  while (nl !== -1) {
    const line = buf.slice(0, nl).trim();
    buf = buf.slice(nl + 1);
    if (line.length > 0) {
      try {
        enqueue(JSON.parse(line) as Rpc);
      } catch {
        stderr.write("eda-assurance mcp: skipped malformed JSON line\n");
      }
    }
    nl = buf.indexOf("\n");
  }
});
stdin.resume();

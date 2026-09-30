import assert from "node:assert/strict";
import { after, describe, it } from "node:test";
import { extractAsyncApi } from "../src/extractors/asyncapi.ts";
import { extractEventCatalog } from "../src/extractors/eventcatalog.ts";
import { extractNats } from "../src/extractors/nats.ts";
import { analyze } from "../src/scan.ts";
import {
  parseClassRequiredFields,
  parseContractId,
  parseExportedInterfaceFields,
} from "../src/parse-interface.ts";
import { tempRepo } from "./helpers.ts";

const cleanups: Array<() => Promise<void>> = [];
after(async () => {
  for (const c of cleanups) await c();
});

async function repo(tree: Record<string, string>): Promise<string> {
  const { root, cleanup } = await tempRepo(tree);
  cleanups.push(cleanup);
  return root;
}

const roles = (bs: Array<{ service: string; contract: string; role: string }>) =>
  bs.map((b) => `${b.service}:${b.role}:${b.contract}`).sort();

describe("parse-interface", () => {
  it("reads required interface fields and skips optional ones", () => {
    const src = "export interface E {\n  id: string;\n  note?: string;\n  amount: Money;\n}";
    assert.deepEqual(parseExportedInterfaceFields(src), ["id", "amount"]);
  });

  it("reads class properties and constructor parameter properties", () => {
    const src = [
      "export class OrderPlaced {",
      "  readonly orderId: string;",
      "  constructor(public readonly total: number, private note?: string) {}",
      "}",
    ].join("\n");
    assert.deepEqual(parseClassRequiredFields(src, "OrderPlaced").sort(), ["orderId", "total"]);
  });

  it("prefers export const CONTRACT over a topic-looking string", () => {
    assert.equal(parseContractId('const t = "a.b"; export const CONTRACT = "x.y.v1";'), "x.y.v1");
    assert.equal(parseContractId('subscribe("orders.created")'), "orders.created");
    assert.equal(parseContractId("no topic here"), undefined);
  });
});

describe("asyncapi extractor", () => {
  it("v2: publish = producer, subscribe = consumer with payload required fields", async () => {
    const root = await repo({
      "api/asyncapi.yaml": [
        "asyncapi: 2.6.0",
        "info: { title: Billing Service, version: 1.0.0 }",
        "channels:",
        "  payments/settled:",
        "    publish:",
        "      message:",
        "        name: PaymentSettled",
        "        payload:",
        "          type: object",
        "          required: [paymentId, amount]",
        "  refunds/issued:",
        "    subscribe:",
        "      message:",
        "        $ref: '#/components/messages/RefundIssued'",
        "components:",
        "  messages:",
        "    RefundIssued:",
        "      name: RefundIssued",
        "      payload: { type: object, required: [refundId] }",
      ].join("\n"),
    });
    const hit = await extractAsyncApi(root);
    assert.deepEqual(roles(hit.bindings), [
      "billing-service:consumer:RefundIssued",
      "billing-service:producer:PaymentSettled",
    ]);
    const settled = hit.contracts.find((c) => c.id === "PaymentSettled");
    assert.deepEqual(settled?.requiredFields, ["paymentId", "amount"]);
    assert.deepEqual(hit.consumerRequires?.[0]?.fields, ["refundId"]);
  });

  it("v3: operations send/receive bind to channel messages; allOf required is merged", async () => {
    const root = await repo({
      "spec.json": JSON.stringify({
        asyncapi: "3.0.0",
        info: { title: "Ledger", version: "1" },
        channels: {
          settled: {
            address: "payments.settled",
            messages: {
              PaymentSettled: {
                payload: {
                  allOf: [{ required: ["paymentId"] }, { required: ["settlementReference"] }],
                },
              },
            },
          },
        },
        operations: {
          onSettled: { action: "receive", channel: { $ref: "#/channels/settled" } },
        },
      }),
    });
    const hit = await extractAsyncApi(root);
    assert.deepEqual(roles(hit.bindings), ["ledger:consumer:PaymentSettled"]);
    assert.deepEqual(hit.consumerRequires?.[0]?.fields.sort(), ["paymentId", "settlementReference"]);
  });

  it("ignores non-AsyncAPI YAML and package.json", async () => {
    const root = await repo({
      "docker-compose.yml": "services:\n  kafka:\n    image: bitnami/kafka\n",
      "package.json": '{"asyncapi":"2.0.0","channels":{}}',
    });
    const hit = await extractAsyncApi(root);
    assert.equal(hit.contracts.length + hit.bindings.length, 0);
  });
});

describe("eventcatalog extractor", () => {
  it("reads events with schema required fields and service sends/receives", async () => {
    const root = await repo({
      "events/OrderPlaced/index.mdx": "---\nid: OrderPlaced\nschemaPath: schema.json\n---\n",
      "events/OrderPlaced/schema.json": JSON.stringify({ required: ["orderId", "total"] }),
      "commands/PlaceOrder/index.mdx": "---\nid: PlaceOrder\n---\n",
      "services/Orders/index.mdx": "---\nid: Orders\nsends:\n  - id: OrderPlaced\nreceives:\n  - PlaceOrder\n---\n",
    });
    const hit = await extractEventCatalog(root);
    const byId = Object.fromEntries(hit.contracts.map((c) => [c.id, c]));
    assert.equal(byId.OrderPlaced?.kind, "event");
    assert.deepEqual(byId.OrderPlaced?.requiredFields, ["orderId", "total"]);
    assert.equal(byId.PlaceOrder?.kind, "command");
    assert.deepEqual(roles(hit.bindings), ["Orders:consumer:PlaceOrder", "Orders:producer:OrderPlaced"]);
  });
});

describe("eventcatalog receiver pins", () => {
  const evt = (dir: string, version: string, required: string[]) => ({
    [`${dir}/index.mdx`]: `---\nid: payment-captured\nversion: ${version}\nschemaPath: schema.json\n---\n`,
    [`${dir}/schema.json`]: JSON.stringify({ required }),
  });
  const receiver = (version?: string) =>
    `---\nid: fulfilment\nreceives:\n  - id: payment-captured${version ? `\n    version: ${JSON.stringify(version)}` : ""}\n---\n`;
  const E = "services/payments/events/payment-captured";

  it("a receiver pinned to an old version requires that version's fields (EDA-004 when current dropped one)", async () => {
    const root = await repo({
      ...evt(E, "2.0.0", ["paymentId"]),
      [`${E}/versioned/1.0.0/index.mdx`]: "---\nid: payment-captured\nversion: 1.0.0\n---\n",
      [`${E}/versioned/1.0.0/schema.json`]: JSON.stringify({ required: ["paymentId", "amount"] }),
      "services/fulfilment/index.mdx": receiver("1.0.0"),
    });
    const hit = await extractEventCatalog(root);
    assert.deepEqual(hit.consumerRequires?.map((r) => [r.service, r.pinnedVersion, r.fields]), [
      ["fulfilment", "1.0.0", ["paymentId", "amount"]],
    ]);
    const { findings } = await analyze(root);
    const eda004 = findings.find((f) => f.rule === "EDA-004");
    assert.match(eda004?.detail ?? "", /`amount`.*fulfilment \(pinned 1\.0\.0\)/);
  });

  it("unpinned and 'latest' receivers require the current version; no finding head-only", async () => {
    for (const pin of [undefined, "latest"]) {
      const root = await repo({ ...evt(E, "2.0.0", ["paymentId"]), "services/fulfilment/index.mdx": receiver(pin) });
      const hit = await extractEventCatalog(root);
      assert.deepEqual(hit.consumerRequires?.[0]?.fields, ["paymentId"]);
      assert.equal(hit.consumerRequires?.[0]?.pinnedVersion, "2.0.0");
      assert.ok(!(await analyze(root)).findings.some((f) => f.rule === "EDA-004"));
    }
  });

  it("resolves ^ ranges to the highest matching version", async () => {
    const root = await repo({
      ...evt(E, "2.0.0", ["paymentId"]),
      [`${E}/versioned/1.2.0/index.mdx`]: "---\nid: payment-captured\nversion: 1.2.0\n---\n",
      [`${E}/versioned/1.2.0/schema.json`]: JSON.stringify({ required: ["paymentId", "ref"] }),
      [`${E}/versioned/1.0.0/index.mdx`]: "---\nid: payment-captured\nversion: 1.0.0\n---\n",
      [`${E}/versioned/1.0.0/schema.json`]: JSON.stringify({ required: ["paymentId"] }),
      "services/fulfilment/index.mdx": receiver("^1.0.0"),
    });
    const [req] = (await extractEventCatalog(root)).consumerRequires ?? [];
    assert.equal(req?.pinnedVersion, "1.2.0");
    assert.deepEqual(req?.fields, ["paymentId", "ref"]);
  });

  it("reads Avro schemas without schemaPath: fields with no default are required", async () => {
    const root = await repo({
      [`${E}/index.mdx`]: "---\nid: payment-captured\nversion: 1.0.0\n---\n",
      [`${E}/schema.avro`]: JSON.stringify({
        type: "record",
        name: "PaymentCaptured",
        fields: [{ name: "paymentId", type: "string" }, { name: "note", type: ["null", "string"], default: null }],
      }),
    });
    const hit = await extractEventCatalog(root);
    assert.deepEqual(hit.contracts[0]?.requiredFields, ["paymentId"]);
  });

  it("uses the nearest definition when a monorepo repeats an id across catalogs", async () => {
    const root = await repo({
      ...evt(`a/${E}`, "1.0.0", ["fromA"]),
      ...evt(`b/${E}`, "1.0.0", ["fromB"]),
      "b/services/fulfilment/index.mdx": receiver("1.0.0"),
    });
    const [req] = (await extractEventCatalog(root)).consumerRequires ?? [];
    assert.deepEqual(req?.fields, ["fromB"]);
  });

  it("reports a pin it cannot verify instead of staying silent", async () => {
    const cases: Array<[string, Record<string, string>, RegExp]> = [
      ["1.0.0", { [`${E}/versioned/1.0.0/index.mdx`]: "---\nid: payment-captured\nversion: 1.0.0\n---\n" }, /1\.0\.0 has no schema/],
      ["0.9.0", {}, /matches none of the known versions \(2\.0\.0\)/],
      ["1.x || 2.x", {}, /unsupported range syntax/],
    ];
    for (const [pin, extra, reason] of cases) {
      const root = await repo({ ...evt(E, "2.0.0", ["paymentId"]), ...extra, "services/fulfilment/index.mdx": receiver(pin) });
      const hit = await extractEventCatalog(root);
      assert.equal(hit.consumerRequires?.length, 0);
      const f = hit.findings?.[0];
      assert.equal(f?.rule, "EDA-pin-unresolved");
      assert.equal(f?.severity, "medium");
      assert.match(f?.detail ?? "", reason);
    }
  });
});

describe("nats extractor", () => {
  it("resolves Subjects enum values and binds publishers / listeners by top-level dir", async () => {
    const root = await repo({
      "common/src/events/subjects.ts": 'export enum Subjects {\n  TicketCreated = "ticket:created",\n}\n',
      "common/src/events/ticket-created-event.ts": [
        'import { Subjects } from "./subjects";',
        "export interface TicketCreatedEvent {",
        "  subject: Subjects.TicketCreated;",
        "  data: {",
        "    id: string;",
        "    price: number;",
        "    note?: string;",
        "  };",
        "}",
      ].join("\n"),
      "tickets/src/publisher.ts":
        "export class P extends Publisher<TicketCreatedEvent> { subject = Subjects.TicketCreated; }",
      "orders/src/listener.ts":
        "export class L extends Listener<TicketCreatedEvent> { subject = Subjects.TicketCreated; }",
    });
    const hit = await extractNats(root);
    assert.equal(hit.contracts[0]?.id, "ticket:created");
    assert.deepEqual(hit.contracts[0]?.requiredFields, ["id", "price"]);
    assert.deepEqual(roles(hit.bindings), [
      "orders:consumer:ticket:created",
      "tickets:producer:ticket:created",
    ]);
  });
});

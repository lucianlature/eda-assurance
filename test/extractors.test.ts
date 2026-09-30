import assert from "node:assert/strict";
import { after, describe, it } from "node:test";
import { extractAsyncApi } from "../src/extractors/asyncapi.ts";
import { extractEventCatalog } from "../src/extractors/eventcatalog.ts";
import { extractNats } from "../src/extractors/nats.ts";
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

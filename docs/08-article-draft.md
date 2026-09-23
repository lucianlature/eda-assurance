# Backwards compatibility is a property of the deployed fleet, not the schema

*Subtitle: Green tests, Avro-compatible, consumer down later anyway.*

```ts
// billing-service — "cleanup," 47 unit tests, schema registry: COMPATIBLE
interface PaymentsSettledV1 {
  paymentId: string;
  amount: Money;
- settlementReference: string;
}
```

That diff looks fine. The field is unused in this service. The registry says the evolution is compatible. CI is green.

Then `ledger-service` and `reporting-worker` — still on the previous image for the next few minutes of the rolling deploy — keep deserializing with `settlementReference` required. Mixed versions. Lag. DLQ. A post-mortem that says we should have caught this.

The registry was not wrong about the document. It was answering a different question.

## Why the registry said yes

Schema registries (Confluent, EventBridge, Apicurio) and tools like `asyncapi diff --type=breaking` ask: can this schema evolve as a document under a chosen compatibility mode.

Removing a field that Avro treats as backward-compatible, or tightening something consumers have already stopped reading in *steady state*, often passes. The registry does not know:

- which consumer groups are still running the old handler
- how long `billing-service` takes to roll
- that the failure is in the mixed-version window, not after everyone has converged

For HTTP/OpenAPI, products like SpecShield already gate on consumer-aware `can-i-deploy`. The same class of check for async events is rarer. The input that makes it language-agnostic is a published async contract (AsyncAPI, EventCatalog, schema artifacts) — not a parser for every messaging framework.

## The question CI should ask

> Can the consumers currently running in production keep processing this event for the next N minutes while the producer rolls?

That needs three inputs the registry does not have:

1. **The change** — field gone, type narrowed, partition key changed, deprecation without grace
2. **The consumer topology** — who still requires what
3. **The rolling window** — how long old and new producers/consumers coexist (from deploy history; a fixture can pin it in YAML)

Same family, different symptoms: compacted-topic key changes, “optional” fields that every consumer still treats as required, dual-write skipped because the cleanup felt small. AsyncAPI’s own guidance already names several of these; the gap is operationalizing them against *what is still live*.

## What a gate looks like when it is not an LLM

`eda-assurance` preflight on the payments fixture returns a structured result — no model in the release-blocking path:

```ts
type PreflightResult = {
  contract: "payments.settled.v1";
  producer: "billing-service";
  change: {
    kind: "removed-required-field";
    field: "settlementReference";
  };
  consumers: Array<{
    service: string;
    handlerExpects: "required" | "unused";
    status: "incompatible" | "compatible";
  }>;
  rollingWindowSeconds: number; // fixture metadata, not a live cluster scrape
  rule: "EDA-004";
  state: "PASS" | "REVIEW" | "BLOCK";
  next: Array<"dual-publish v2" | "redeploy consumers first" | "signed exception">;
};
```

States:

- **PASS** — no protected contract changed in a way that hurts known consumers
- **REVIEW** — contract changed; declare dual-publish, consumer-first deploy, or a signed exception before merge
- **BLOCK** — incompatible with known consumers and no declaration (enforce surface; Cursor stays advisory)

On the fixture, deleting `settlementReference` is **REVIEW**: `ledger-service` and `reporting-worker` incompatible, `notifications` compatible, rolling window ~4 minutes. Keeping the field (or only adding) is **PASS**. CI fails the dangerous PR. No LLM was used for that result.

Try it:

```shell
git clone https://github.com/lucianlature/eda-assurance
cd eda-assurance && npm ci
npm run preflight -- fixtures/payments-settled
# expect REVIEW / exit 2 with --fail-on review

npm run preflight -- fixtures/payments-settled --fail-on review \
  --after paymentId,amount,settlementReference
# expect PASS
```

Or open `fixtures/payments-settled` in Cursor with the plugin, ask to delete the field from `PaymentsSettledV1`, and watch preflight fire before the edit lands.

Cursor plugin is advisory. If the finding is a mess you cannot self-remediate, the repo README has a way to request an audit. I will not DM you.

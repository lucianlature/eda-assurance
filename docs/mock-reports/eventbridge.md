# ❌ AI Change Review — `orders.created` cross-account schema drift

**PR #611** · `orders-service` → `main`
**Authored by:** cursor-agent (assisted by @lucian) · **Requested reviewers:** @orders-owner, @platform-eng
**Detected by:** eventcontracts-action@0.3.1 · **Policy pack:** `eda-assurance@0.3.1`

---

## Summary

This PR changes the `detail` schema of the `orders.created` event published to
the shared `commerce-events` EventBridge bus. The change is a breaking type
change on the `customerId` field, and two of the four cross-account subscriber
Lambdas are pinned to aliases that cannot handle the new payload.

**Merging this PR without remediation will cause DLQ pile-up in the `analytics`
and `fulfilment` accounts within seconds of the first event, with silent event
loss risk once DLQ retention (14 days) expires.**

---

## Impact

**Producer changed**

```
apps/orders-service/src/events/orders-created.ts
- customerId: string   // UUID v4
+ customerId: { id: string; tenantId: string }
```

**Event bus:** `commerce-events` (account `acct-shared-events`, region `eu-west-1`)
**Event source:** `com.acme.orders` · **Detail type:** `orders.created`

**Subscribers detected from EventBridge Schema Registry + Rules API:**

| Rule name | Target account | Target | Alias | Handler pinned to schema version | Status |
| --- | --- | --- | --- | --- | --- |
| `orders-created-to-analytics` | `acct-analytics-prod` | Lambda `orders-ingest` | `live` (v27) | `orders.created@v3` | ❌ Incompatible |
| `orders-created-to-fulfilment` | `acct-fulfilment-prod` | Lambda `receive-order` | `live` (v41) | `orders.created@v3` | ❌ Incompatible |
| `orders-created-to-notifications` | `acct-notifications-prod` | Lambda `email-order-confirm` | `live` (v18) | `orders.created@v4-canary` | ✅ Compatible |
| `orders-created-to-audit-trail` | `acct-security-prod` | Kinesis Firehose → S3 | n/a | schema-less pass-through | ✅ Compatible |

**Aliases have version-pinned deployments; blue/green window is not applicable — subscribers switch atomically per Lambda update, but only when their code is redeployed.**

**Blast radius:** HIGH — 2 of 4 cross-account subscribers cannot deserialize. DLQ retention on both is 14 days, then silent event loss.

---

## Rule violated

**`eda-assurance/EDA-004` — backward-compatible-event-evolution**
**`eda-assurance/EDA-011` — cross-account-schema-registry-sync**

Changing the type of a required field in a published event breaks all
subscribers that have not deployed a compatible handler. Cross-account
subscribers are especially fragile — you cannot force their redeployment,
and DLQ overflow results in silent data loss.

---

## Required before merge (pick one)

**Option A — Versioned event via schema registry (recommended for cross-account)**

1. Register `orders.created@v4` in the shared schema registry (account `acct-shared-events`)
2. Publish both `v3` and `v4` from `orders-service` for ≥14 days (matches DLQ retention)
3. Coordinate with `analytics` and `fulfilment` account owners to deploy handlers accepting v4
4. Track handler-version adoption via schema registry's discovered-schemas API
5. Retire v3 only after 100% subscriber adoption confirmed

**Option B — Backwards-compatible transformation at publish site**

1. Keep `customerId` as string at the event boundary
2. Add `customerTenant` as a new optional field carrying `tenantId`
3. Consumers that need tenancy opt into the new field
4. No breaking change on the wire

**Option C — Coordinated cross-account deployment**

Requires:

- Written commit from `analytics` and `fulfilment` account owners to deploy compatible handlers within 24h window
- Feature flag on producer for rollback capability
- Approval from @platform-eng + both account owners
- Exception `EXC-YYYY-NNN` filed

---

## Agent provenance

**Agent transcript digest:** `sha256:c4d1a8f9...` (Cursor agent session `agent_01j7k2...`)

**Agent read during this task:**

- `apps/orders-service/src/events/orders-created.ts`
- `apps/orders-service/src/domain/customer.ts` (source of the type change)
- 4 handler files in `orders-service`

**Agent did NOT read** (but is affected):

- ⚠️ Cross-account subscriber code — inaccessible from this repo
- ⚠️ Schema registry state — not consulted before proposing type change
- ⚠️ EventBridge rule definitions in Terraform (`infra/eventbridge/*.tf`)

**Tests executed:**

- ✅ Unit: `orders-service` (23/23)
- ✅ Contract test: `orders-created@v4-canary` against notifications handler
- ❌ **Not run:** `orders-created@v3` compatibility check (schema registry breaking-change check)
- ❌ **Not verified:** cross-account subscriber compatibility

---

## Special EventBridge concerns

**⚠️ Silent event loss risk**

Unlike Kafka (where consumer lag is observable and events remain on the log),
EventBridge subscriber failures route to DLQ if configured, and to the void
if not. Confirmed DLQ configuration:

| Rule | DLQ configured? | DLQ retention |
| --- | --- | --- |
| `orders-created-to-analytics` | ✅ SQS `analytics-dlq` | 14 days |
| `orders-created-to-fulfilment` | ✅ SQS `fulfilment-dlq` | 14 days |
| `orders-created-to-notifications` | ✅ SQS `notif-dlq` | 4 days |
| `orders-created-to-audit-trail` | ❌ **NOT CONFIGURED** | — |

**Second finding:** `audit-trail` subscriber has no DLQ. Any deserialization failure results in immediate, silent event loss. This is an independent issue from the current PR and should be filed as an infrastructure fix regardless.

---

## Evidence

- **Subscriber topology:** [`.eventcontracts/topology.yaml`](../.eventcontracts/topology.yaml) — refreshed from EventBridge Rules API + Schema Registry
- **Schema versions:** AWS Schema Registry `commerce-events/orders.created` — v1 through v4-canary
- **Policy source:** [`eda-assurance@0.3.1`](https://github.com/lucianlature/eda-assurance/blob/0.3.1/rules/EDA-004.yaml)
- **Terraform state:** `infra/eventbridge/rules.tf` — 4 rules, 3 with DLQ, 1 without
- **Related ADR:** `docs/adr/019-eventbridge-cross-account.md`

---

## What to do next

Comment `/eventcontracts explain EDA-011` for the cross-account rule rationale.

Comment `/eventcontracts propose v4` and the bot will draft the versioning + schema registry registration PR.

Comment `/eventcontracts fix dlq audit-trail` to file a separate infrastructure PR for the missing DLQ.

---

*This report was generated deterministically from EventBridge API state, schema registry contents, and versioned policy YAML. No LLM was consulted for any release-blocking claim.*

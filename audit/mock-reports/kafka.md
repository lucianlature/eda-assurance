# ❌ AI Change Review — `payments.settled.v1` compatibility break

**PR #842** · `billing-service` → `main`
**Authored by:** claude-code (assisted by @lucian) · **Requested reviewers:** @payments-owner, @platform-owner
**Detected by:** eventcontracts-action@0.3.1 · **Policy pack:** `eda-assurance@0.3.1`

---

## Summary

This PR modifies the `payments.settled.v1` event contract by removing a
required field. The change is Avro-backwards-compatible in isolation, but
the currently deployed consumer fleet cannot process the new payload
during the rolling-deploy window.

**Merging this PR without remediation will cause the `ledger-service` and
`reporting-worker` consumer groups to enter a poll-and-fail loop for
~3-6 minutes during rolling deploy of `billing-service`, resulting in
consumer lag accumulation and potential dead-lettering.**

---

## Impact

**Producer changed**

```text
apps/billing-service/src/events/payments-settled.ts
- interface PaymentsSettledV1 { paymentId: string; amount: Money; settlementReference: string }
+ interface PaymentsSettledV1 { paymentId: string; amount: Money }
```

**Topic:** `payments.settled.v1` · **Cluster:** `prod-east-kafka-01`

**Consumers detected from `.eventcontracts/topology.yaml`** (last refreshed 2h ago from Kafka consumer group metadata):

| Consumer group | Service | Deployed commit | Handler expects field? | Status |
| --- | --- | --- | --- | --- |
| `ledger-consumer-v3` | ledger-service | `a3f2c1e` (deployed 6d ago) | `settlementReference` **required** | ❌ Incompatible |
| `reporting-events` | reporting-worker | `9d1e77b` (deployed 2d ago) | `settlementReference` **required** | ❌ Incompatible |
| `notifications-fanout` | notifications | `7c22ff0` (deployed 4h ago) | Not used | ✅ Compatible |

**Rolling deploy window:** 3-6 minutes (based on last 10 deploys of `billing-service` via ArgoCD)

**Blast radius:** HIGH — 2 of 3 active consumer groups will fail to deserialize during the rolling window.

---

## Rule violated

**`eda-assurance/EDA-004` — backward-compatible-event-evolution**

Removing a required field from an event without a versioned successor
or a dual-publish period creates a mixed-version incompatibility window
during rolling deployment.

---

## Required before merge (pick one)

**Option A — Version the event (recommended for high-blast-radius changes)**

1. Publish `payments.settled.v2` alongside `v1`
2. Dual-publish v1+v2 for ≥1 deploy cycle (minimum 24h in prod)
3. Migrate consumers to v2, verify via consumer lag metric = 0 on v1
4. Deprecate v1 in a follow-up PR

**Option B — Redeploy consumers first**

1. Update `ledger-service` and `reporting-worker` to make `settlementReference` optional
2. Deploy those changes to prod
3. Verify deployed commits via `.eventcontracts/topology.yaml` refresh
4. Then merge this PR

**Option C — Compatibility exception**

Requires signed exception with:

- `EXC-YYYY-NNN` reference
- Approval from @payments-owner + @platform-owner
- Documented rollback plan
- Feature flag on the field removal for revert-in-place capability

---

## Agent provenance

**Agent transcript digest:** `sha256:8a91f3e2...` (Claude Code session `sess_01j5b7...`)

**Agent read during this task:**

- `apps/billing-service/src/events/payments-settled.ts`
- `apps/billing-service/src/events/payments-settled.test.ts`
- `docs/adr/012-event-versioning.md`
- 3 handler files in `billing-service`

**Agent did NOT read** (but is affected by this change):

- ⚠️ `apps/ledger-service/src/consumers/payments-settled.handler.ts` (uses removed field)
- ⚠️ `apps/reporting-worker/src/streams/settlements.ts` (uses removed field)
- ⚠️ Consumer contract in `contracts/ledger-payments.yaml`

**Tests executed by agent:**

- ✅ Unit: `billing-service` (18/18)
- ✅ Integration: `billing-service` (5/5)
- ❌ **Not run:** cross-service contract tests (`ledger-payments-contract`)
- ❌ **Not run:** consumer-side unit tests for `ledger-service`, `reporting-worker`

---

## Evidence

- **Consumer topology:** [`.eventcontracts/topology.yaml`](../.eventcontracts/topology.yaml) — refreshed 2h ago from `kafka-consumer-groups.sh --describe`
- **Policy source:** [`eda-assurance@0.3.1`](https://github.com/lucianlature/eda-assurance/blob/0.3.1/rules/EDA-004.yaml)
- **Deployment history:** ArgoCD app `billing-service` — last 10 deploys, mean rolling window 4m 12s
- **Related ADR:** `docs/adr/012-event-versioning.md` — established v-suffix versioning policy 2024-Q3
- **Prior incident reference:** INC-2026-0187 (`event-schema-break-2026-04`) — same failure pattern, cost 4.5h eng time + 2 days of ledger reconciliation

---

## What to do next

Comment `/eventcontracts explain EDA-004` for the full policy rationale.

Comment `/eventcontracts propose v2` and the bot will draft the versioning PR skeleton.

Comment `/eventcontracts exception` to open an exception workflow with the required approvers auto-tagged.

---

*This report was generated deterministically from AST analysis, consumer group metadata, and versioned policy YAML. No LLM was consulted for any release-blocking claim. Advisory notes (if any) are marked as such.*

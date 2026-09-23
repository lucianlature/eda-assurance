# ❌ AI Change Review — `subscription.status.changed` fanout compat + DLQ risk

**PR #297** · `subscriptions-service` → `main`
**Authored by:** claude-code (assisted by @lucian) · **Requested reviewers:** @subs-owner, @billing-owner
**Detected by:** eventcontracts-action@0.3.1 · **Policy pack:** `eda-assurance@0.3.1`

---

## Summary

This PR changes the payload of the `subscription.status.changed` SNS topic
by transforming `status` from a string enum to a nested object. The change
breaks 3 of 5 SQS consumer queues subscribed to the topic. One of those
queues is a **FIFO queue with `MessageDeduplicationId` derived from the
prior payload shape**, which will additionally cause deduplication
false-positives and message loss even for consumers that later fix their
handlers.

**Merging this PR without remediation will cause immediate DLQ pile-up on 3
consumers, and permanent message loss on the FIFO consumer due to
deduplication ID collision with reprocessed messages.**

---

## Impact

**Producer changed**

```
apps/subscriptions-service/src/events/subscription-status-changed.ts
- status: "active" | "past_due" | "canceled" | "trialing"
+ status: { current: "active" | "past_due" | "canceled" | "trialing"; previous: string; reason?: string }
```

**SNS topic:** `arn:aws:sns:eu-west-1:acct-prod:subscription-status-changed`

**Subscribers detected from SNS ListSubscriptions + SQS QueueAttributes:**

| Subscription | Queue | Type | Handler compatible? | DLQ | Status |
| --- | --- | --- | --- | --- | --- |
| `sub-billing` | `billing-sub-events` | Standard SQS | Expects `status: string` | ✅ 14d retention | ❌ Incompatible |
| `sub-crm-sync` | `crm-sub-events` | Standard SQS | Expects `status: string` | ✅ 7d retention | ❌ Incompatible |
| `sub-analytics` | `analytics-sub-events` | Standard SQS | Reads `Records[*].Sns.Message` verbatim | ✅ 14d retention | ⚠️ Partial (schema-tolerant, but breaks downstream ETL) |
| `sub-emails` | `email-sub-events.fifo` | **FIFO SQS** | Expects `status: string` + uses status in `MessageGroupId` | ✅ 4d retention | ❌ Incompatible + **dedup risk** |
| `sub-audit` | `audit-sub-events` | Standard SQS | Pass-through to S3 | ❌ **No DLQ** | ⚠️ Silent loss risk |

**Blast radius:** HIGH — 3 immediate incompatibilities, 1 partial, 1 with silent-loss risk.

---

## Rules violated

**`eda-assurance/EDA-004` — backward-compatible-event-evolution**
Changing the type of a required field from primitive to object is not backwards-compatible.

**`eda-assurance/EDA-007` — fifo-dedup-key-shape-invariant** ⚠️ *This is the killer*
`email-sub-events.fifo` derives `MessageDeduplicationId` from the `status` field. Changing the field's shape means the deduplication hash changes for semantically identical events, which will silently drop retries and replays that used the old shape.

**`eda-assurance/EDA-012` — dlq-required-for-fanout-subscribers`**
`sub-audit` subscribes to the topic with no DLQ configured — any deserialization failure results in silent event loss.

---

## Required before merge (pick one)

**Option A — Additive-only change (recommended, minimal blast radius)**

1. Keep `status: string` at the SNS payload boundary
2. Add `statusDetail: { previous: string; reason?: string }` as a new optional top-level field
3. Consumers that need the extra context opt into `statusDetail`
4. Zero breaking change, no coordination required

**Option B — Versioned topic**

1. Publish to a new topic: `subscription-status-changed-v2`
2. Dual-publish to `v1` and `v2` for ≥14 days
3. Migrate subscribers one at a time; each subscriber owns its cutover
4. Retire `v1` after 100% subscriber migration confirmed via CloudWatch subscription age metric

**Option C — Coordinated cutover (only if consumers are all in-org and controlled)**

1. Deploy compatible handlers to all 5 subscribers
2. Verify handler deployment via `.eventcontracts/topology.yaml` refresh
3. Update FIFO deduplication key to be shape-invariant (see EDA-007 remediation)
4. Add DLQ to `sub-audit` (independent EDA-012 fix)
5. Then merge this PR under exception `EXC-YYYY-NNN` with signed approvals

---

## Agent provenance

**Agent transcript digest:** `sha256:e2f9c1b4...` (Claude Code session `sess_01j8m4...`)

**Agent read during this task:**

- `apps/subscriptions-service/src/events/subscription-status-changed.ts`
- `apps/subscriptions-service/src/domain/subscription.ts`
- 2 handler tests in `subscriptions-service`

**Agent did NOT read** (but is affected):

- ⚠️ Subscriber handler code (5 downstream services / accounts)
- ⚠️ Terraform SNS subscription definitions (`infra/sns/subscriptions.tf`)
- ⚠️ FIFO deduplication logic in `email-sub-events.fifo` consumer
- ⚠️ Audit queue DLQ misconfiguration (EDA-012)

**Tests executed:**

- ✅ Unit: `subscriptions-service` (14/14)
- ❌ **Not run:** subscriber-side contract tests (none exist)
- ❌ **Not detected:** FIFO dedup shape dependency (EDA-007)

---

## Special SNS/SQS concerns

**⚠️ FIFO deduplication trap (EDA-007)**

If a consumer derives `MessageDeduplicationId` from the payload shape and
the shape changes, replayed or retried messages produce a different
deduplication hash and are treated as new — but any *legitimate retry*
of the old-shape message will now hash differently from what SQS has in
its 5-min dedup window. Result: subtle, silent message loss during the
transition window. This is undetectable without a hash-invariant test.

**⚠️ Silent event loss (EDA-012)**

`sub-audit` has no DLQ. Deserialization failures return an error to SNS,
which retries up to 3 times then discards the message. No metric alerts
on this by default. Recommend filing an independent infrastructure PR
regardless of the current change.

**⚠️ Fanout amplification**

Unlike a single Kafka topic, SNS fanout means each subscriber failure is
independent — a "half-broken" release is common (some subscribers cope,
others don't). This makes gradual rollouts hard to observe without
per-subscriber DLQ monitoring.

---

## Evidence

- **Subscriber topology:** [`.eventcontracts/topology.yaml`](../.eventcontracts/topology.yaml) — refreshed from `aws sns list-subscriptions-by-topic` + `aws sqs get-queue-attributes`
- **FIFO dedup analysis:** `apps/email-service/src/consumers/subscription-status.consumer.ts` line 47 — dedup ID computed from `status` field
- **Policy sources:**
  - [`eda-assurance/EDA-004`](https://github.com/lucianlature/eda-assurance/blob/0.3.1/rules/EDA-004.yaml)
  - [`eda-assurance/EDA-007`](https://github.com/lucianlature/eda-assurance/blob/0.3.1/rules/EDA-007.yaml)
  - [`eda-assurance/EDA-012`](https://github.com/lucianlature/eda-assurance/blob/0.3.1/rules/EDA-012.yaml)
- **Terraform state:** `infra/sns/subscriptions.tf`
- **Related ADR:** `docs/adr/023-async-subscription-events.md`
- **Prior incident:** INC-2026-0104 — `email-sub-events.fifo` dedup collision after unrelated payload change (2026-02)

---

## What to do next

Comment `/eventcontracts explain EDA-007` for the FIFO dedup rule rationale — this is the highest-risk finding.

Comment `/eventcontracts propose additive-only` and the bot will draft Option A as a diff.

Comment `/eventcontracts fix dlq sub-audit` to file the independent DLQ infrastructure fix.

Comment `/eventcontracts exception` to start an exception workflow with the required approvers.

---

*This report was generated deterministically from AWS API state, AST analysis, and versioned policy YAML. No LLM was consulted for any release-blocking claim.*

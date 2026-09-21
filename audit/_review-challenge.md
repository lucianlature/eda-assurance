# Adversarial review — challenge / pre-mortem (genuine pass)

**Method (honest):** first attempt used `screech run --model ollama/deepseek-r1:8b` in "challenge mindset." Result: `Turns: 1 · Tool calls: 0 · Duration: 525.5s · Stop: stop`. The model **never called the `read` tool** — it fabricated the entire review, including specific fake quotes attributed to specific line numbers, from filenames alone. Silent failure at the harness level.

**First manual attempt** (kept in git history) was better but still had two problems: (a) I authored the files earlier in this session, so I "reviewed from memory" instead of reading. That produced some correct claims, one incorrect claim (EventBridge alias notation), and material gaps. (b) The review was scoped to "weakest three" per section, which self-limits.

**This pass:** re-read every file end-to-end. Every claim in this review carries a file + line-number citation and a direct quote. Prior mistakes explicitly corrected under [§8](#8-corrections-to-my-earlier-critique).

Files reviewed:
- [`README.md`](README.md) — 113 lines
- [`00-strategy.md`](00-strategy.md) — 193 lines
- [`01-sow.md`](01-sow.md) — 142 lines
- [`02-interview-tracker.md`](02-interview-tracker.md) — 99 lines
- [`03-linkedin-plan.md`](03-linkedin-plan.md) — 237 lines
- [`04-landing-page.md`](04-landing-page.md) — 197 lines
- [`mock-reports/kafka.md`](mock-reports/kafka.md) — 127 lines
- [`mock-reports/eventbridge.md`](mock-reports/eventbridge.md) — 149 lines
- [`mock-reports/sns-sqs.md`](mock-reports/sns-sqs.md) — 164 lines

---

## 1. Weakest three assumptions

### 1.1 "50% upfront" is not actually upfront

[`01-sow.md`](01-sow.md) line 6:
> **Payment:** 50% upon signature (wire), 50% upon delivery of final report

Then lines 80-83:
> - 50% ($[3,000–4,500]) upon signature — wire transfer, invoiced day 0
> - 50% ($[3,000–4,500]) upon delivery of the final report — invoiced day 14
> - **Net 14 on both invoices**
> - Payment in USD.

Net-14 on the first invoice means the money arrives at day 14 — the same time as the final invoice is issued. In effect, the consultant is floating both halves as receivables, not receiving anything "upfront." Combined with:

- Wire transfer setup for an international vendor typically requires vendor onboarding (2-4 weeks at any org > 20 people)
- Net 14 on the delivery invoice means the second half arrives at day 28

**Realistic cash timeline for a Tier 1 audit signed day 0:**
- Signature: day 0
- Access granted: day 3 (per SOW line 71)
- First invoice paid: day 14
- Delivery: day 14
- Second invoice paid: day 28
- **Total elapsed time to full payment: 4 weeks.**

The [`README.md`](README.md) fast-revenue math line 108 claims "Month 1: 1-2 audits close = $6-18k." Under these payment terms, even one audit signed on day 1 delivers ~$3-4.5k by day 14 and the balance by day 28. Realistic month-1 revenue is *half* of what the math promises, if a client signs on day 1 — which they won't.

**Consequence:** the $10-15k/mo urgency goal in [`00-strategy.md`](00-strategy.md) line 8 is materially undermined by the plan's own payment terms. Not by a small amount — by roughly 50-60%.

### 1.2 The plan claims "distribution is the actual problem" but invests nothing in distribution

[`00-strategy.md`](00-strategy.md) line 118:
> **Distribution is the actual problem, not architecture.** 15 conversations before code. Kill signal is real (see below).

Line 94:
> **LoopBudget failed for distribution, not product.** OSS doesn't fix distribution — it changes the surface. GitHub stars ≠ revenue.

But the tactical files invest zero dollars and roughly 8 hours total in distribution before day 30:
- [`03-linkedin-plan.md`](03-linkedin-plan.md): 4 posts (1/week) + 20 min/day of comment-hunting (line 226). Total content investment: ~10 hrs over 30 days.
- [`04-landing-page.md`](04-landing-page.md) line 194: "Don't add a newsletter signup as the primary CTA" — but there is no email capture at all. No secondary CTA either.
- [`04-landing-page.md`](04-landing-page.md) analytics section line 184: "Track: hero CTA click, SOW download, Calendly bookings. Nothing else." No retargeting, no waitlist, no lead magnet.
- Outreach template ([`README.md`](README.md) lines 56-71): cold DM only. No referral incentive. No follow-up sequence beyond the 3-day nudge.
- No paid distribution anywhere in the plan (no LinkedIn ads, no sponsored content, no paid newsletter placement, no conference speaking slot).

**This is precisely LoopBudget's distribution shape — organic-only, single-channel, no compounding funnel.** The strategy correctly diagnosed the failure and the tactics repeat it.

### 1.3 "2-3 engagements per quarter" doesn't sum to the revenue goal

[`04-landing-page.md`](04-landing-page.md) line 118:
> Based in Bucharest. Working with teams across EU, UK, and US East. Currently taking 2-3 engagements per quarter.

[`03-linkedin-plan.md`](03-linkedin-plan.md) line 44:
> Currently taking 2-3 audit engagements per quarter.

At $6-9k per audit × 2-3/quarter = **$12-27k per quarter = $4-9k per month.**

[`00-strategy.md`](00-strategy.md) line 8:
> **Revenue goal:** stable $10-15k/mo.

The publicly stated capacity is **below the revenue floor.** Either:
- The capacity number needs to increase (4-5 audits/quarter — but at 2 weeks each, that's continuous back-to-back delivery with zero sales bandwidth), OR
- The pricing needs to increase (raise Tier 1 to $10-15k — but that pushes above the "discretionary spend" threshold), OR
- The revenue mix needs Tier 2/3 engagements to make the number work (which the strategy doc line 172 already implies, but the landing page positions Tier 1 as the primary offer).

Either way, the public-facing positioning silently promises numbers that can't reach the private goal.

---

## 2. Pre-mortem — six months from now, this failed

Ranked by likelihood based on real B2B services sales dynamics:

### 2.1 Sales cycle length destroys the runway (most probable)

The plan's outreach template ([`README.md`](README.md) line 56-71) is well-crafted. Cold outreach from a Romanian solo consultant to senior engineers at ICP-fit companies:
- Response rate: 8-15% (of DMs opened) — realistic for warm-ish LinkedIn 1st-degree, worse for cold
- 20 outreach → 3-4 replies → 2-3 calls booked → 1-2 calls actually happen (no-shows are ~30-40% for cold prospects)
- Of the calls: 30-50% will have real pain matching the ICP filter
- Of those with pain: 20-30% convert to paid engagement — but at a 3-8 week sales cycle, not the day-10 close the plan implies

**Realistic month-1 outcome:** 15-20 outreach messages → 4-6 real conversations → 0-1 signed engagement by day 30. Combined with §1.1's payment-terms lag, first cash likely lands day 40-60, not day 14.

The [`00-strategy.md`](00-strategy.md) day-30 milestone (line 170) says "First paid audit delivered ($6-9k banked)." This is optimistic by 2-3 weeks even in a good scenario.

### 2.2 Delivery scope creep destroys the margin

[`01-sow.md`](01-sow.md) deliverable list lines 53-59:
> 1. `event-contract-audit.pdf` — the written report (10-15 pages)
> 2. `topology.yaml` — machine-readable inventory of event contracts + consumers
> 3. `topology.svg` — consumer topology diagram with deployed-version pinning
> 4. `scenarios/*.md` — 5 replayed PRs with detection outcomes and required evidence
> 5. `roadmap.md` — 30/60/90-day plan keyed to available capacity
> 6. 90-min findings review (recorded if requested)

Deliverable #4 ("5 replayed PRs with detection outcomes") is genuinely hard. Replaying a real PR against a policy engine that doesn't exist yet requires:
- Reading the PR diff and understanding its intent
- Extracting the consumer topology at the PR's commit time
- Simulating what a hypothetical CI gate would emit
- Writing that up in a way that's technically credible

At 4-8 hours per PR × 5 PRs = 20-40 hours = **half to a full week** just for #4. Combined with 4-6 engineer interviews (~4-6 hrs of calls + prep + notes), static analysis of 3 repos, report writing, diagram creation, findings review, and one revision: **realistic delivery time is 3-4 weeks, not 2.**

At $6-9k fee for 3-4 weeks: $1,500-2,250/week gross. That's roughly a mid-level contractor rate, below what a senior consultant on this problem should charge.

### 2.3 Access delays blow the timeline

[`01-sow.md`](01-sow.md) line 44 (Method / Week 1):
> Extract deployed versions from k8s / ECS / Lambda alias / deployment history

And line 71 (Constraints):
> Delivery timeline assumes all access is granted within 3 business days of signature.

But the SOW doesn't itemize what "access" actually means:
- k8s cluster credentials — client's platform/SecOps team must approve external contractor
- AWS IAM role with EventBridge/Lambda read — client's SecOps must scope + approve
- CI/CD read access — depends on client's tooling (GitHub Actions API, ArgoCD, CircleCI, Jenkins)
- Deployment history — often in a separate observability platform (Datadog, New Relic, Grafana)

At any enterprise client, "external contractor gets prod-adjacent read access in 3 business days" is best-case. Real timeline: 5-10 business days with SecOps back-and-forth. Under Waterfall SOW terms, this blows the 2-week timeline.

**Mitigation missing from the SOW:** a clause like "If access delays exceed 5 business days, the delivery timeline extends by the equivalent duration, with no fee change."

### 2.4 SpecShield ships AsyncAPI support in Q1-Q2 2027

Verified in [`_review-market.md`](_review-market.md): SpecShield already ships `can-i-deploy` for OpenAPI + Pact with GitHub App + Action + MCP server. To add real async support they'd need a new data model (async contracts ≠ req/resp), integrations for Kafka/SNS/SQS/EventBridge topology, and deployed-fleet detection for messaging systems (much harder than for HTTP — no standard "AsyncAPI Broker" to query). Realistic: **1-2 quarters of engineering, not a sprint** — an earlier version of this review understated it.

But 1-2 quarters is still not a moat. First-mover advantage buys ~3-9 months of lead time and then evaporates. If they see one HN thread this quarter about async event breakage, they'll fund the work — and their $89/mo Team plan repositions a $6-9k audit as expensive.

**The window for first-mover advantage is real but bounded.** The plan needs to convert the window into something that compounds — see [§7](#7-the-single-highest-leverage-change).

### 2.5 One mock is technically wrong; a senior engineer notices in the sales cycle

See [§4](#4-mock-report-technical-accuracy). The SNS/SQS mock has an internal contradiction between `MessageDeduplicationId` and `MessageGroupId`, and inverts the failure mode direction. If a prospect studies this mock (which is the entire point of sending it) and their SNS/SQS expert flags either issue, credibility takes a hit at exactly the wrong moment.

---

## 3. Internal contradictions

### 3.1 Fast-revenue math contradicts the strategy day-90 milestone

[`README.md`](README.md) fast-revenue math lines 106-110:
> - Month 1: 20 outreach → 12-15 conversations → **1-2 audits close** = **$6-18k**
> - Month 2: 1 Tier 2 (case study + design partner) = **+$15-22k**
> - Month 3: first Tier 3 or 2nd Tier 2 = **+$15-40k**

Sum of months 1-3: $36-80k in banked revenue.

[`00-strategy.md`](00-strategy.md) day-90 milestone line 172:
> **Day 90:** OSS repo public. 2-3 paid audits completed ($15-25k banked). One Tier 2 engagement signed ($15-22k). Consulting run-rate approaching $10k/mo.

$15-25k + $15-22k = $30-47k. Different number. Same time horizon. Both files present themselves as ground truth.

Also — "2-3 paid audits completed" at $6-9k = $12-27k, not $15-25k. The strategy doc's own math doesn't sum.

### 3.2 Interview scoring rubric ≠ decision matrix vocabulary

[`02-interview-tracker.md`](02-interview-tracker.md) rubric line 15:
> **COMMIT** | Q6 — pilot in 30 days? | Won't or hedges | "Maybe if you build X" | "Yes send me the link when ready"

Decision matrix line 53:
> `hot ≥ 3` AND `pilot_commits ≥ 3` → **BUILD v0.1 weeks 2-4**

Tracker table columns line 27:
> `... COMMIT TOTAL pilot_commit audit_interest ...`

Three related but distinct terms with no defined relationship:
- **COMMIT** — numeric score 0-2 based on Q6 answer
- **pilot_commit** — separate open-text tracker column, undefined schema
- **pilot_commits** — plural, appears only in the decision matrix

If `pilot_commits` in the matrix means "count of rows where COMMIT=2", then the BUILD threshold triggers on the softest signal in the rubric ("Yes send me the link when ready"). If it means "count of rows where `pilot_commit` = yes", the schema for that column is missing entirely.

Under either reading, the day-10 BUILD decision fires on undefined criteria. This is the exact failure mode the strategy doc warns against on line 118: "15 conversations before code."

### 3.3 "AI-assisted" framing vs the AsyncAPI-plus-deployed-fleet substance

Every customer-facing surface leads with AI:

- [`03-linkedin-plan.md`](03-linkedin-plan.md) headline (option A, line 13): "Helping TS/Node teams ship AI-assisted code without breaking event contracts · 2-week fixed-price audits"
- [`03-linkedin-plan.md`](03-linkedin-plan.md) About line 24-25: "I help engineering teams ship AI-assisted code without breaking their event contracts. / Most teams adopting Cursor, Claude Code, or Copilot..."
- [`03-linkedin-plan.md`](03-linkedin-plan.md) cover image line 69: "AI-assisted code needs event-aware review."
- [`04-landing-page.md`](04-landing-page.md) H1 line 12: "Ship AI-assisted code without breaking event contracts."
- [`04-landing-page.md`](04-landing-page.md) subhead line 15: "adopting Cursor, Claude Code, or Copilot."

But the actual pain (verified in [`_review-market.md`](_review-market.md) and in the mocks themselves) is **deployed-fleet compatibility for async events** — a durable technical trend that exists whether or not the team uses AI coding agents. The AI framing is a wrapper that:

- Ties the pitch to the AI-coding-agent adoption curve (still nascent — 2-4x PR volume is aspirational, not universal)
- Positions the offering adjacent to a crowded market (SpecShield's MCP server, Cognition, Continue, etc.)
- Ages out the moment the AI-coding-agent narrative shifts (12-24 months at most before "AI wrote it" stops being a distinguishing feature)

The strategy doc line 82 correctly identifies:
> **Event-contract assurance is the sharpest wedge.** Not trendy, but real, expensive, and underserved.

But then every customer-facing artifact leads with the *trendy* framing. This is the sharpest self-contradiction in the plan.

### 3.4 SOW says "wire" but README says "under discretionary spend"

[`README.md`](README.md) end-of-Q4 pitch line 88:
> "Look — regardless of whether I ever ship the tool I mentioned, I could give you a concrete audit and a working CI gate in a couple of weeks. Fixed scope, fixed price under $10k."

The implied claim: this is a fast, low-friction decision (i.e. fits under discretionary/P-card budget).

[`01-sow.md`](01-sow.md) payment terms line 80: wire transfer only. Wire = 2-4 week vendor onboarding for a new international vendor at any org > 20 people = not discretionary.

Covered in §1.1 already; noting the contradiction here for completeness.

---

## 4. Mock report technical accuracy

### 4.1 [`mock-reports/kafka.md`](mock-reports/kafka.md)

**Line 34 + 109 — Data source conflation.**

Line 34:
> **Consumers detected from `.eventcontracts/topology.yaml`** (last refreshed 2h ago from Kafka consumer group metadata)

Line 109:
> **Consumer topology:** [`.eventcontracts/topology.yaml`](../.eventcontracts/topology.yaml) — refreshed 2h ago from `kafka-consumer-groups.sh --describe`

`kafka-consumer-groups.sh --describe` returns:
- Consumer group ID
- Assigned partition
- Current offset, log-end offset, lag
- Consumer client ID
- Host (client hostname)

It does NOT return:
- Deployed commit SHA (shown in table line 38: `a3f2c1e (deployed 6d ago)`)
- Handler code expectations (shown in table line 38: `settlementReference **required**`)

Both would need to come from a separate source — k8s pod labels, a service registry, CI metadata, or actual repo introspection. This conflation is a real technical error that a senior Kafka engineer will spot.

**Line 17 — Inverted / imprecise failure mode.**

> Merging this PR without remediation will cause the `ledger-service` and `reporting-worker` consumer groups to enter a **poll-and-fail loop for ~3-6 minutes** during rolling deploy

"Poll-and-fail loop" is imprecise Kafka terminology. Actual behavior on deserialization failure depends on:
- Deserializer used (default `StringDeserializer` doesn't throw on arbitrary bytes; custom deserializers do)
- Error handler configured (`org.apache.kafka.clients.consumer.internals` behavior varies)
- Offset commit strategy (auto-commit vs manual — determines whether the consumer skips the bad message or retries indefinitely)

Realistic descriptions: "deserializer throws + consumer skips to next offset if configured to log-and-continue, OR consumer restarts if configured to fail-fast, OR message routes to a DLT if configured — the audit has not verified error handler config."

**Line 38 — Inconsistent consumer group naming.**

Table shows:
- `ledger-consumer-v3` (versioned)
- `reporting-events` (not versioned)
- `notifications-fanout` (not versioned)

Mixed conventions in the same fictional org. Real Kafka teams do have this inconsistency, but for a curated example it undermines the sense of a coherent policy environment. Minor.

**Line 5, 111, and all subsequent mocks — Nonexistent package.**

> **Detected by:** eventcontracts-action@0.3.1 · **Policy pack:** `eda-assurance@0.3.1`

And the URL `https://github.com/lucianlature/eda-assurance/blob/0.3.1/rules/EDA-004.yaml`.

Neither the package nor the URL exists. A prospect Googling during the sales cycle finds nothing. Two options:
1. Register the GitHub repo now (empty is fine — semver `0.0.1-draft` at least matches "not yet released")
2. Remove the semver and URL from the mocks until the artifact exists

### 4.2 [`mock-reports/eventbridge.md`](mock-reports/eventbridge.md)

**Line 38-41 — Alias notation is actually fine.**

*Correction to my prior review:* I claimed the notation `live (v27)` conflated aliases and versions. Reading again: the column header is `Alias`, and the value reads as "the `live` alias currently pointing at version 27." That's standard Lambda notation. **My earlier critique was wrong.** No fix needed here.

**Line 40 — Causal logic muddy on v4-canary.**

> `orders-created-to-notifications` | ... | `orders.created@v4-canary` | ✅ Compatible

But the change described (line 27-28):
> - customerId: string   // UUID v4
> + customerId: { id: string; tenantId: string }

For v4-canary to already be compatible with the new object shape, v4-canary must already exist in the schema registry *before this PR opens*. If v4-canary exists, then either:
- The PR should just switch the producer from publishing v3 to publishing v4 (additive, no compat break), OR
- v4-canary was invented as a plot device to make one row ✅ Compatible

Under scrutiny, this is unclear. Realistic scenario: v4-canary shouldn't exist yet; the PR is *introducing* v4 as a new schema version. In that case the whole row is compatible for a different reason (the producer publishes v4 alongside v3, and this consumer subscribes only to v4). The mock's causality doesn't hold up.

**Line 27 — The change itself is a bad code review.**

Changing `customerId: string` (UUID) to `customerId: { id: string; tenantId: string }` is a shape change when the equivalent info can be conveyed additively:

```
- customerId: string   // UUID v4
+ customerId: string
+ customerTenantId?: string
```

Any senior reviewer would reject the breaking change before it even reaches the audit's gate. The mock's example works, but only because it presupposes a code reviewer who missed an obviously-preferable additive alternative. A prospect reading the mock may notice this and think "our reviewers wouldn't let this land in the first place."

**Line 42 — "Version-pinned deployments; blue/green window is not applicable" is imprecise.**

> Aliases have version-pinned deployments; blue/green window is not applicable — subscribers switch atomically per Lambda update, but only when their code is redeployed.

Lambda aliases *do* support weighted routing (traffic-shifting between two versions). Blue/green IS applicable if the client uses weighted aliases. This claim assumes atomic-switch deployment only. Fine for many teams; wrong for teams doing canary via alias weights.

**Missing: no prior-incident reference.**

The Kafka mock (line 114) and SNS/SQS mock (line 148) both cite a prior INC-XXXX incident. EventBridge mock has none. Inconsistent quality — either add one or remove them from the others.

### 4.3 [`mock-reports/sns-sqs.md`](mock-reports/sns-sqs.md)

**Lines 13 + 43 + 56 — Internal contradiction: `MessageDeduplicationId` vs `MessageGroupId`.**

Line 13 (Summary):
> One of those queues is a **FIFO queue with `MessageDeduplicationId` derived from the prior payload shape**

Line 43 (queue table):
> **FIFO SQS** | Expects `status: string` + uses status in **`MessageGroupId`**

Line 56 (EDA-007 rule):
> derives **`MessageDeduplicationId`** from the `status` field

These are two DIFFERENT SQS FIFO concepts:
- **`MessageGroupId`** — determines FIFO ordering within a group. Messages with the same group ID are processed in order; different group IDs process in parallel. Changing what feeds this changes ordering guarantees.
- **`MessageDeduplicationId`** — SQS discards duplicates within a 5-minute window based on this ID. Changing what feeds this changes dedup behavior.

Both are legitimately bad to derive from `status`, but for different reasons. The mock uses both terms interchangeably, which is technically wrong. This is the most concrete factual error in any of the mocks — a real SNS/SQS engineer will flag it in 30 seconds.

**Lines 117-120 — Inverted failure mode.**

> If a consumer derives `MessageDeduplicationId` from the payload shape and the shape changes, replayed or retried messages produce a different deduplication hash and are treated as new — but any *legitimate retry* of the old-shape message will now hash differently from what SQS has in its 5-min dedup window. **Result: subtle, silent message loss during the transition window.**

The logic here is backwards. If the dedup hash *differs*, SQS treats the message as **new** and delivers it — the result is **duplicate processing**, not silent loss. The failure mode of shape-derived dedup IDs is duplication, not loss.

(Silent loss can happen with the opposite bug — same dedup ID for genuinely different messages — but that's not what's described.)

**Line 43 — DLQ configuration inconsistent with real-world SNS→SQS DLQ semantics.**

> ✅ 14d retention

DLQ retention on SQS is a queue-level setting on the DLQ itself, not on the source subscription. The mock reads as if retention is a property of the subscription, which is imprecise. Real semantics: SNS delivers to SQS; SQS retries per its `RedrivePolicy` → DLQ (another SQS queue with its own retention). The retention shown applies to the DLQ, not the subscription. Minor phrasing issue but a real SNS/SQS engineer will notice.

**Line 33 — "SNS topic ARN" is well-formed but region + account layout is unusual.**

> `arn:aws:sns:eu-west-1:acct-prod:subscription-status-changed`

`acct-prod` isn't a real AWS account ID (real ones are 12-digit numeric). Fine for a mock, but if a prospect copies this to compare to their own ARN patterns, it looks like the author never wrote real Terraform. Change to a placeholder like `<ACCOUNT-ID>` or an obviously-fake numeric like `000000000000`.

### 4.4 All three mocks — Detection mechanism is hand-waved

Every mock closes with:
> This report was generated deterministically from AST analysis, [source-specific state], and versioned policy YAML. No LLM was consulted for any release-blocking claim.

But none of the mocks describe *how* the specific compatibility issues are actually detected. In particular:

- **Handler expectations** (Kafka mock, line 38: `settlementReference **required**`) — how is this extracted from consumer code? AST parsing every language the consumer is written in? Type inference? Runtime interception?
- **Deployed commit** (Kafka mock: `a3f2c1e (deployed 6d ago)`) — from k8s pod labels? Service registry? Deployment history API?
- **Cross-account Lambda handler pin** (EventBridge mock line 38: `orders.created@v3`) — from Lambda environment variables? Layer metadata? Code introspection?
- **FIFO dedup key derivation** (SNS/SQS mock line 141: `dedup ID computed from status field`) — from AST of the consumer? Static analysis of what feeds `MessageDeduplicationId`? Runtime instrumentation?

Deliverable #4 in the SOW is "5 replayed PRs with detection outcomes." Without a description of how the detection actually works, an audit-buying prospect can reasonably ask: "What does the detection column of the replay actually contain? What if the answer is 'not detectable statically'?" This gap makes the audit's central deliverable feel handwavy.

---

## 5. SOW gaps a real client will ask for

The SOW is well-scoped but missing the following clauses that any legal or procurement review will insert. Better to include them yourself and control the numbers.

Ranked by likelihood of being requested:

1. **Liability cap.** Standard: capped at fees paid. Missing. Client legal will insert one anyway; better to control it.
2. **IP ownership clause.** [`01-sow.md`](01-sow.md) line 76 says "All source code and internal artifacts remain the property of [Company]." But it doesn't reserve consultant's ownership of the policy pack, methods, and pre-existing tools. Missing.
3. **AI tool usage disclosure.** In 2026 every enterprise legal team asks whether client source will be uploaded to an AI service. Missing.
4. **Data handling / GDPR clause.** Any EU client requires a DPA or a substitute. Missing.
5. **Termination for convenience.** "Either party may terminate with 5 business days' notice, fees prorated to work completed." Missing.
6. **Access-delay contingency.** Line 71 assumes access in 3 business days. No fallback if it takes longer. Should extend delivery timeline pro-rata without fee change.
7. **Definition of engineer interviews.** Line 41: "4-6 engineer interviews (staff eng, platform lead, on-call SRE) — 45 min each." Doesn't specify: video vs audio-only, recorded vs live-only, timezone accommodation, whether client books or consultant books, no-show policy.
8. **Definition of "read access."** Line 62: "Read access to 3 repos + CI configs." Missing: GitHub org membership vs deploy key vs client VM? SecOps will ask.
9. **Slack channel alternative.** Line 65 assumes "shared Slack channel or equivalent." Enterprise clients often prohibit guest Slack access. Provide alternatives: Google Meet, email, Teams, client-provided Jira project.
10. **NDA template.** Line 76: "Standard mutual NDA (attached separately, or [Company] template accepted)." No template is attached. Client-side NDAs often contain non-compete or work-product clauses the consultant shouldn't accept blind. Should have a template ready.
11. **Recording consent.** Line 59: "90-min findings review (recorded if requested)." Recording rights depend on jurisdiction; EU generally requires explicit consent. Should be opt-in with a written checkbox.
12. **Tax and invoicing clause.** Romanian consultant billing US client: W-8BEN-E form. Billing EU B2B: VAT reverse-charge under Article 196 of the EU VAT Directive. Missing entirely — will cause invoicing delays with any client's AP team.
13. **Warranty definition.** What is "success"? Currently ambiguous. Should be: "Success is defined as delivery of the six artifacts listed in Deliverables. Value of findings varies by engagement and is not warranted."
14. **Change-control clause.** Line 72 mentions "scope change note may be required" but doesn't define the threshold or process. Better: "Scope changes >4 hours of work require a written change note signed by both parties. Fee adjusts pro-rata."
15. **Third-party AI/tool cost pass-through.** If the audit uses paid services (Firecrawl, Anthropic API, etc.), those costs are either included in the fee or itemized separately. Currently silent.

---

## 6. Competitive risk (integrated with market findings)

Rankings from [`_review-market.md`](_review-market.md), presented for completeness in this document.

Threats within 12 weeks:

1. **SpecShield adds AsyncAPI support** — they already ship the deploy-gate infrastructure for OpenAPI/REST. Adding AsyncAPI/Kafka bindings is a sprint. Watch: their release notes, GitHub issue activity mentioning AsyncAPI/Kafka.
2. **Confluent bundles a `can-i-deploy` equivalent** — they own Kafka + Schema Registry + Streams. Watch: Confluent Cloud release notes, Kafka Summit talks.
3. **AWS EventBridge Schema Registry adds consumer compatibility checks** — they have all the state. Watch: re:Invent Dec 2026.
4. **A coding-agent startup adds "event topology awareness"** — Cognition, Continue, Sourcegraph Cody, etc. Repositions the market from "gate at CI" to "context for the agent." Watch: their product blogs and MCP-adjacent announcements.
5. **EventCatalog ships a `can-i-deploy` plugin** — event-native, open source, active. Watch: eventcatalog.dev blog + GitHub issues.

---

## 7. The single highest-leverage change

**Two-part revision, not one:**

1. **Positioning (60 min of edits):** drop "AI-assisted" framing; adopt async-event framing. Referenced in [§3.3](#33-ai-assisted-framing-vs-the-asyncapi-plus-deployed-fleet-substance) as the sharpest internal contradiction.
2. **Moat strategy (a discipline, not an edit):** stop pretending the async-event wedge is itself the moat. It isn't. It's a **first-mover window of 1-2 quarters** that has to be converted into a real moat before SpecShield (or Confluent, or AWS) closes it.

### 7.1 The 60-minute positioning edit

Six specific strings across four files:

- [`03-linkedin-plan.md`](03-linkedin-plan.md) headline line 13
- [`03-linkedin-plan.md`](03-linkedin-plan.md) About paragraph 1 lines 22-25
- [`03-linkedin-plan.md`](03-linkedin-plan.md) cover image caption line 69
- [`04-landing-page.md`](04-landing-page.md) H1 line 12
- [`04-landing-page.md`](04-landing-page.md) subhead line 15
- [`04-landing-page.md`](04-landing-page.md) Section 5 line 94: "You've adopted or you're piloting Cursor, Claude Code, or Copilot" — this ICP filter becomes a *bonus qualifier*, not a *required* one. Reword to widen the market.

Why this edit is worth doing anyway (even though the async framing itself isn't the moat):

- Rides SpecShield's education wave instead of competing head-on for the REST market
- Removes the AI-fashion dependency — the wedge stops depending on the AI-coding-agent adoption curve
- Widens ICP from "AI-adopting teams" to "any async-event team" — roughly 5-10x TAM
- Positions the offering as complementary to SpecShield ("what they do for REST, we do for async") — potentially a co-marketing story
- Doesn't require changing the mocks, SOW, or interview script

### 7.2 What the actual moats have to be

The strategy doc lines 96-98 already named them correctly, then the tactical files quietly forgot. Restated with honesty about current state:

| Moat candidate | Why it's hard to replicate | Currently exists |
|---|---|---|
| **Fixture corpus** — 30-50 real, reproducible dangerous-PR scenarios across Kafka/SNS/SQS/EventBridge with detection benchmarks | Requires incident scars and real customer contact. Feature-parity code is copyable in a quarter; a curated fixture corpus is not | No — three mocks exist, that's the entire corpus |
| **Policy pack IP** — 30-50 opinionated rules encoding accumulated architectural judgment, each tied to a real failure mode and a remediation playbook | Rules get better with customer contact. A copycat can copy shipped rules but not the taste to author new ones | No — three rules referenced in mocks (EDA-004, 007, 011, 012), unwritten |
| **Deployed-fleet integrations** — the plumbing to k8s / ArgoCD / Lambda aliases / ECS / service registries / consumer-group metadata across every messaging system | Each integration is a mini-project (100-300 hrs). This is the actual defensible engineering surface. SpecShield adding AsyncAPI parsing doesn't get them the deployed-fleet integrations for free | No |
| **Operational orchestration** — dual-publish plans, coordinated deploy sequences, rollback playbooks. Value is in the *sequence*, not the check | Novel enough that it's not sprint-or-quarter work — closer to a year of iteration with real customers | No — mocks describe "Option A/B/C" at a high level; the actual orchestration doesn't exist |
| **Consulting-as-content flywheel** — audits produce anonymized case studies, incident lore, new rules, new fixtures. Content moat for the OSS | Doesn't compound for SpecShield the same way; they're self-serve SaaS with no consulting arm | Not yet, but this is the one the audit business *manufactures* by design |

The uncomfortable read: **there is no moat on day 1**. There is a 1-2 quarter first-mover window and a design intent to convert that window into a corpus + rule library + integrations + customer stories via the audit business.

### 7.3 What this means for the plan

- **Fixture library becomes the OSS commitment**, not "a full CI gate by day 90." This is already in the priority action list ([§9 item 8](#9-what-survives-the-review-unchanged) prompts it). Bumping it earlier: **the fixture library should ship at day 30, not day 90.** Even 5-10 real scenarios published as an OSS repo is more than SpecShield, EventCatalog, or AsyncAPI-diff can point at, and it starts compounding the moat immediately rather than after the first paid audit closes.
- **Every audit's deliverable #4** ("5 replayed PRs") should feed the public fixture library (redacted). This is the flywheel: each audit funds the moat *and* produces the moat.
- **The interview script's Q6** should be reframed. Currently it asks "would you pilot the v0.1 if it existed in 3 weeks" — presupposing a product. Better: "would you contribute a redacted incident to a public fixture library" — starts building the moat before any product exists.
- **The strategy doc's revenue horizon** should acknowledge: months 1-3 are consulting-only; the OSS artifact worth releasing is the fixture library, not a CI gate; the CI gate follows once 3-5 customers have run through the audit and the policy pack is battle-tested.

The plan's structure is right. The self-story about what makes it defensible was wrong. Fixed here.

---

## 8. Corrections to my earlier critique

Fair play — noting where the prior manual review was wrong.

### 8.1 [WRONG] EventBridge alias notation

**Prior claim:** "Lambda aliases are named pointers (e.g. `live`, `canary`, `prod`). Versions are numbered. `v27` is a version, not an alias. The correct phrasing is 'alias `live` pointing to version 27.' The current phrasing conflates the two. Serverless-native engineers will spot this instantly."

**Correction:** Re-reading [`mock-reports/eventbridge.md`](mock-reports/eventbridge.md) line 38-41, the column header is `Alias` and the value reads `live (v27)`. That IS standard shorthand for "alias `live` currently pointing at version 27." The mock is fine as written. My prior critique was wrong.

### 8.2 [PARTIAL] LinkedIn plan is "content play for a product, not lead-gen"

**Prior claim:** "the LinkedIn plan and landing page don't reflect [consulting-first]. They read like a pre-launch content play for a product, not a lead-gen surface for a service."

**Correction:** All four LinkedIn posts explicitly close with a consulting CTA:
- Post 1 line 116: "I'm doing 2-week fixed-price audits for TS/Node teams that want to close this gap before it costs them a Sunday."
- Post 2 line 146: "DM me for a 20-min call — I ask 6 questions"
- Post 3 line 178-179: "I'm doing paid pilot engagements this quarter — 2 slots left."
- Post 4 line 211: "I'm booking 2-week audits for December and January."

The plan IS consulting-first. My prior claim was overstated. What remains valid: the *volume* of distribution investment is thin (4 posts + 10 hrs of comment-hunting over 30 days) — but the *intent* of that content is correctly aimed at consulting.

### 8.3 [PARTIAL] Kafka mock ArgoCD phrasing

**Prior claim:** "ArgoCD reports sync duration, not rolling deploy window. The rolling window is a property of k8s `Deployment.spec.strategy.rollingUpdate` × pod startup time × readiness probe delay. ArgoCD watches; it doesn't set it."

**Correction:** Technically accurate but overstated. ArgoCD orchestrates sync of the `Deployment` object; a team can reasonably interpret "sync duration from ArgoCD's app history" as an approximation of the rolling window, since ArgoCD reports when the sync completed. It's imprecise but not wrong. Downgrading this from "howler" to "phrasing could be tighter." The Kafka mock's more serious issue is the `kafka-consumer-groups.sh` data source conflation (§4.1), which is a real technical error.

---

## 9. What survives the review unchanged

Called out only because withholding would be dishonest. These parts of the plan are well-designed:

- **5×0-2 scoring rubric** ([`02-interview-tracker.md`](02-interview-tracker.md) lines 9-15). Forces per-axis honesty.
- **Kill matrix as a non-optional guardrail** ([`README.md`](README.md) lines 14-18 and [`02-interview-tracker.md`](02-interview-tracker.md) lines 52-56). Non-negotiable decision criteria before code.
- **Interview Q1 as behavioral** ([`README.md`](README.md) line 76). "Walk me through the last incident" separates real pain from politeness.
- **Q1 early-exit rule** ([`README.md`](README.md) line 76, parenthetical): "if they can't answer in 3 min → no pain, thank + end early." Saves consultant time.
- **Three-tier ladder** — Tier 1 audit / Tier 2 build / Tier 3 embedded. Pricing is defensible.
- **"What NOT to build" section** ([`00-strategy.md`](00-strategy.md) lines 154-165). Prevents scope drift.
- **"No LLM in release-blocking claims" positioning** — after this session's Screech hallucination, this positioning is *more* valuable, not less.
- **The kafka mock's Options A/B/C structure** ([`mock-reports/kafka.md`](mock-reports/kafka.md) lines 60-81). Well-scoped, actionable, spans the space from safe to permissive.
- **The SNS/SQS mock's fanout-amplification note** ([`mock-reports/sns-sqs.md`](mock-reports/sns-sqs.md) lines 129-135). Correctly identifies that fanout amplifies half-broken releases — a real distributed-systems failure mode.
- **The "distribution mechanics" section of the LinkedIn plan** ([`03-linkedin-plan.md`](03-linkedin-plan.md) lines 215-222). "First comment with links" and "notify 5-8 people 10 min before posting" are real LinkedIn-algo tactics.

---

## Summary of edits triggered by this review

Priority order:

1. **Positioning rewrite** ([§7](#7-the-single-highest-leverage-change)) — 60 min, 6 strings across 4 files
2. **Payment terms** ([§1.1](#11-50-upfront-is-not-actually-upfront)) — add Stripe/card option for ≤$9k engagements, tighten Net-14 language
3. **Distribution investment** ([§1.2](#12-the-plan-claims-distribution-is-the-actual-problem-but-invests-nothing-in-distribution)) — pick one paid channel (LinkedIn ads OR sponsored newsletter placement) and budget $500-1500 for month 1; add lead magnet / email capture to landing page
4. **Capacity vs revenue reconciliation** ([§1.3](#13-2-3-engagements-per-quarter-doesnt-sum-to-the-revenue-goal)) — either raise capacity number or delete it from public copy; update revenue math to be internally consistent
5. **Mock report technical fixes** ([§4](#4-mock-report-technical-accuracy)):
   - Fix `kafka-consumer-groups.sh` data-source claim
   - Clarify "poll-and-fail loop" phrasing
   - Fix `MessageDeduplicationId` vs `MessageGroupId` inconsistency in SNS/SQS mock
   - Fix inverted "silent loss" direction in SNS/SQS mock
   - Fix EventBridge v4-canary causal logic
   - Register `eda-assurance` GitHub repo (or drop version numbers from mocks)
   - Add prior-incident reference to EventBridge mock (or remove from the other two for consistency)
6. **Interview tracker vocabulary** ([§3.2](#32-interview-scoring-rubric--decision-matrix-vocabulary)) — define `pilot_commit` operationally in the tracker doc; make it distinct from `COMMIT` score
7. **SOW clauses** ([§5](#5-sow-gaps-a-real-client-will-ask-for)) — add liability cap, IP retention, GDPR, termination, access-delay contingency, and 8 other missing clauses before sending to any real client
8. **Fast-revenue math reconciliation** ([§3.1](#31-fast-revenue-math-contradicts-the-strategy-day-90-milestone)) — make [`README.md`](README.md) and [`00-strategy.md`](00-strategy.md) numbers agree

The plan is structurally sound. The revision list is long because the plan is complete enough to have surface area to review — but no single item is a foundation-level rewrite. All fixes are edits, not restarts.

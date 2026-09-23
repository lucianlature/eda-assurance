# Review synthesis — event-contract-audit plan

**Generated:** 2026-09-20 by dogfooding Screech against its own strategy doc.
**Revised:** 2026-09-20 after a full end-to-end re-read of all nine files. Prior pass had gaps and one wrong claim — see [`_review-challenge.md`](_review-challenge.md) §8 for corrections list.

**Method:**

| Lens | Tool | Result |
| --- | --- | --- |
| Health check | `screech doctor` | 10 passes / 1 warn / 0 P0 fails — see [receipts below](#screech-dogfood-receipts) |
| Internal memory | `screech wiki query` | No prior thinking on EDA/contract-compat — new territory for this project's memory |
| KB search | `screech search` | Killed (embedding call hung; retrieval eval below threshold) |
| Agent history | `screech history search` | **BUG** — `--json` flag not accepted by installed `ctx` CLI |
| Adversarial | `screech run --model ollama/deepseek-r1:8b` | **0 tool calls in 527s** — never invoked `read`, fabricated entire review from filenames including fake line-number citations. Replaced with hand-review after full file re-read; see [`_review-challenge.md`](_review-challenge.md) |
| Market check | `screech research` (Firecrawl) | Turn-8 timeout, output not saved. Findings verified independently. See [`_review-market.md`](_review-market.md) |

Full outputs of the two lenses that produced signal: [`_review-challenge.md`](_review-challenge.md) (9-section grounded review, every claim carries a line-number citation), [`_review-market.md`](_review-market.md) (verified competitive intel).

## Findings that change the plan

The genuine review surfaced more than the original three. The four below are new or materially sharpened after the full re-read; the SpecShield finding from the earlier pass survives unchanged.



### Finding 1 — SpecShield is already shipping the wedge, for REST

Verified via specshield.io, GitHub `specshield-io/specshield-cli`, npm `specshield`.

Product features that overlap our plan verbatim:
- `can-i-deploy` gate that blocks PRs when a change breaks a *registered* consumer
- GitHub App + Action + CLI + IntelliJ plugin
- MCP server for AI agents
- Consumer registry
- $89/mo Team plan (10 users)

**What they don't do:** AsyncAPI, Kafka, EventBridge, SNS/SQS. Zero async event support.

**Implication:** the wedge holds — but only in async. The "AI-assisted code" framing is dead. The plan must reposition explicitly to *async event contracts*, and cede REST to SpecShield.

### Finding 2 — The tactical plan repeats LoopBudget's failure mode on distribution

The strategy doc explicitly names "distribution is the actual problem, not architecture." The tactical files then invest zero hours in distribution before day 90:
- 4-week LinkedIn plan = 4 posts, no paid promotion
- Landing page has no email capture / waitlist
- Outreach template is cold DM only
- No SEO investment, no content flywheel
- No referral incentive

This is the exact organic-only distribution shape that failed with LoopBudget.

### Finding 3 — The SOW's payment terms contradict its own value proposition

[`01-sow.md`](01-sow.md) line 6 says "50% upon signature (wire)." Lines 80-83 then add **Net 14** on both invoices. Net-14 on the first invoice means the money arrives at day 14 — the same time as the final invoice is *issued*. There is no "upfront" payment in the actual terms; both halves are receivables.

Realistic cash timeline for an audit signed day 0: first half at day 14, second half at day 28. Combined with the 2-4 week international-vendor onboarding at any client >20 people, the "$6-18k in month 1" fast-revenue math is off by roughly 50-60%. The "close on Tuesday under discretionary spend" story is fantasy under these terms.

### Finding 4 — Two internal contradictions in the plan's own numbers

**Fast-revenue math vs day-90 milestone:**

- [`README.md`](README.md) lines 106-110 projects $36-80k across months 1-3.
- [`00-strategy.md`](00-strategy.md) line 172 (day 90) projects $30-47k across the same period.
- Also: "2-3 paid audits completed ($15-25k banked)" — but 2-3 audits × $6-9k = $12-27k, not $15-25k. The strategy doc's math doesn't self-sum.

**Publicly stated capacity vs private revenue goal:**

- [`04-landing-page.md`](04-landing-page.md) line 118 and [`03-linkedin-plan.md`](03-linkedin-plan.md) line 44: "Currently taking 2-3 engagements per quarter."
- 2-3 audits × $6-9k = $12-27k/quarter = **$4-9k/month.**
- [`00-strategy.md`](00-strategy.md) line 8 target: **$10-15k/month.**

The public-facing positioning silently promises numbers that can't reach the private goal.

### Finding 6 — There is no moat on day 1; the async wedge is a first-mover window, not defensibility

An earlier version of this review claimed "SpecShield adding AsyncAPI is a sprint." That was wrong on two counts: (a) the timeline is realistically 1-2 quarters, not a sprint, and (b) even 1-2 quarters isn't a moat — first-mover advantage buys ~3-9 months and then evaporates.

The strategy doc lines 96-98 already knew what the real moats had to be: **a curated fixture corpus, a battle-tested policy pack, deployed-fleet integrations, operational orchestration playbooks, and a consulting-as-content flywheel.** The tactical files then quietly positioned "AsyncAPI + deployed-fleet compatibility" as if it were the moat itself.

None of the real moats exist on day 1. The plan has a 1-2 quarter first-mover window; the design intent has to be converting that window into corpus + rules + integrations + customer stories via the audit business. See [`_review-challenge.md` §7.2](_review-challenge.md#72-what-the-actual-moats-have-to-be) for the honest breakdown of which moat candidates exist and which don't.

**Practical consequence for the plan:** the fixture library ships at day 30 (not day 90), every audit's replayed PRs feed the public library, and the OSS artifact worth releasing early is the corpus + policy rules — not a full CI gate.

### Finding 5 — One mock report has a genuine internal contradiction, not just imprecision

[`mock-reports/sns-sqs.md`](mock-reports/sns-sqs.md) uses `MessageDeduplicationId` in the Summary (line 13) and EDA-007 rule (line 56), but `MessageGroupId` in the queue table (line 43). These are two different SQS FIFO concepts:
- `MessageGroupId` → determines FIFO ordering
- `MessageDeduplicationId` → determines dedup within a 5-min window

Both are legitimate anti-patterns when derived from a mutable field, but for different reasons. The mock uses them interchangeably.

Additionally, lines 117-120 describe the failure as "silent message loss." The actual failure mode when dedup hashes differ is **duplicate processing**, not loss. The direction is inverted.

Either issue is a hard credibility loss if a senior SNS/SQS engineer reads the mock during the sales cycle. Both should be fixed before day-1 outreach.

## The revised strategic direction

### 1. Reposition BEFORE any outreach

**Do this today, before day 1.** ~90 min of edits.

| File | Before | After |
| --- | --- | --- |
| [`03-linkedin-plan.md`](03-linkedin-plan.md) headline | "Helping TS/Node teams ship AI-assisted code without breaking event contracts" | "Deployed-fleet compatibility for AsyncAPI + Kafka. What SpecShield does for REST, I do for async events." |
| [`04-landing-page.md`](04-landing-page.md) H1 | "Ship AI-assisted code without breaking event contracts." | "Deployed-fleet contract compatibility for event-driven services." |
| [`01-sow.md`](01-sow.md) outcome | "AI-assisted code changes are safe to merge" | "Changes to async event contracts are safe to deploy against the currently deployed consumer fleet" |
| [`02-interview-tracker.md`](02-interview-tracker.md) Q6 | "If a v0.1 of this existed in 3 weeks, would you pilot it on one repo?" | Same, but preface: "SpecShield does this for REST — nobody does it for async yet. If someone did..." |
| Landing page competitor table | (none) | Add a row showing SpecShield covers REST, we cover async |

**Reasoning:** Ride SpecShield's education wave. Position as the async complement rather than a competitor. Cede the REST slice they'll win anyway.

### 2. Fix the payment terms

Add to [`01-sow.md`](01-sow.md) footnote:

> Engagements ≤$9,000 USD accept payment via Stripe / credit card in a single transaction upon signature. Engagements >$9,000 USD accept payment via bank wire (50/50).

Stripe fee (~2.9% ≈ $180-260) is a rounding error compared to closing 2-3 weeks faster. Wire transfer is a distribution-killer for the whole revenue-urgent motion.

### 3. Split reality from wish on OSS

Update [`00-strategy.md`](00-strategy.md) day-90 milestone:

> **Day 90 (was):** OSS repo public. 2-3 paid audits completed. One Tier 2 engagement signed. Consulting run-rate approaching $10k/mo.
>
> **Day 90 (revised):** 2-3 paid audits completed. First async event fixture library published as OSS (10 real dangerous PR scenarios, deterministic detection). Consulting run-rate at $8-12k/mo. **Decision:** is there a real productization path, or is this a consulting business permanently?

The fixture library is the *only* piece worth shipping in v0. It's the moat the strategy doc names (public benchmark corpus, hard to fake). It doesn't require any product infrastructure. It builds credibility in front of prospects. And it takes 10 days of curation, not 10 weeks of engineering.

### 4. Fix the mock-report technical inaccuracies

Two errors that senior platform engineers will spot in 30 seconds:

- **Kafka mock:** conflates `kafka-consumer-groups.sh` output with deployed commit hashes. They come from different sources. Fix by describing the topology refresh as "k8s pod labels + service registry + consumer group state" — three sources reconciled.
- **EventBridge mock:** treats Lambda version `27` as an alias. Aliases are named, versions are numbered. Fix: "alias `live` pointing to version 27."

Also: swap the SNS/SQS "FIFO dedup from `status` field" scenario for a Kafka **compacted-topic partition-key change** scenario. It's a real, subtle, community-documented failure mode (from the AsyncAPI 3.0 guide) that no shape-based schema check catches. It earns credibility instead of losing it.

Also: `eda-assurance@0.3.1` version tag in the mocks implies a mature package that doesn't exist. Either publish a stub or use `0.0.1-draft` until it does.

### 5. Add the missing SOW clauses

Before sending to any real client:

- Liability cap (fees paid)
- IP ownership retention
- AI tool usage clause
- Term / termination for convenience (5 business days)
- Definition of "engineer interviews" (45 min, video, whether recorded, timezone accommodation)
- Definition of "read access" (GitHub org membership vs deploy key vs client VM)
- Warranty ("success = delivery of the 6 artifacts")
- Tax / invoicing (W-8BEN-E for US clients, VAT reverse-charge for EU B2B)
- Change-control (scope changes >X hours require written scope-change note)

## What actually stays as-is

Deliberately called out to prevent over-revising:

- [`00-strategy.md`](00-strategy.md) origin, kill signals, alternatives-on-the-shelf, and what-NOT-to-build sections
- [`02-interview-tracker.md`](02-interview-tracker.md) 5×0-2 scoring rubric — good design
- [`02-interview-tracker.md`](02-interview-tracker.md) go/no-go decision matrix — critical guardrail
- Interview script Q1-5 (behavioral, not opinion)
- The 6-artifact SOW deliverable list
- The three-tier engagement ladder ($6-9k / $15-22k / $40-75k) — pricing is defensible
- The "no LLM in release-blocking claims" positioning — even more true after this review, since Screech's own local model just proved why deterministic-first matters

## Priority action list (in order)

Grouped by ship-window; each item cites the review section that justifies it. Full detail in [`_review-challenge.md`](_review-challenge.md).

**Today (~3 hours total):**

1. **Positioning rewrite** ([_review-challenge.md §7](_review-challenge.md#7-the-single-highest-leverage-change)) — 60 min. Six strings across four files: LinkedIn headline (line 13) + About paragraph 1 + cover-image caption (line 69), landing page H1 (line 12) + subhead (line 15), landing page Section 5 ICP filter (line 94). Drop "AI-assisted" framing; adopt "AsyncAPI + deployed-fleet compatibility."
2. **SOW payment terms** ([_review-challenge.md §1.1](_review-challenge.md#11-50-upfront-is-not-actually-upfront)) — 30 min. Add Stripe/card option for engagements ≤$9k. Tighten Net-14 wording so "upfront" isn't misleading.
3. **Mock report fixes** ([_review-challenge.md §4](_review-challenge.md#4-mock-report-technical-accuracy)) — 90 min:
   - Kafka: fix `kafka-consumer-groups.sh` data-source claim; tighten "poll-and-fail loop" phrasing
   - EventBridge: fix v4-canary causal logic; add a prior-incident reference
   - SNS/SQS: reconcile `MessageDeduplicationId` vs `MessageGroupId` inconsistency; correct the "silent loss" direction (it's duplicate processing)
   - All three: register `eda-assurance` GitHub repo empty, or drop the `@0.3.1` version from the mocks

**This week (~5 hours total):**

4. **Reconcile the plan's own numbers** ([_review-challenge.md §3.1](_review-challenge.md#31-fast-revenue-math-contradicts-the-strategy-day-90-milestone), [§1.3](_review-challenge.md#13-2-3-engagements-per-quarter-doesnt-sum-to-the-revenue-goal)) — 45 min. Either raise the public capacity claim or lower the private revenue goal; make the README fast-revenue math and the strategy day-90 milestone agree.
5. **Interview tracker vocabulary** ([_review-challenge.md §3.2](_review-challenge.md#32-interview-scoring-rubric--decision-matrix-vocabulary)) — 30 min. Define `pilot_commit` operationally (repo name + date + named sponsor), distinct from the `COMMIT` numeric score. Prevents day-10 BUILD from firing on the softest signal.
6. **Add the 12 missing SOW clauses** ([_review-challenge.md §5](_review-challenge.md#5-sow-gaps-a-real-client-will-ask-for)) — 3 hours: liability cap, IP retention, AI-tool disclosure, GDPR, termination-for-convenience, access-delay contingency, interview/access/Slack definitions, NDA template, recording consent, tax/invoicing, warranty, change-control, third-party cost pass-through.
7. **Pick one paid distribution channel** ([_review-challenge.md §1.2](_review-challenge.md#12-the-plan-claims-distribution-is-the-actual-problem-but-invests-nothing-in-distribution)) — 45 min. Budget $500-1500 for month 1. Options: LinkedIn ads targeting Platform Lead / Staff Eng titles at EDA-adopting companies; sponsored placement in a targeted newsletter (Software Lead Weekly, Pointer, ByteByteGo); a Kafka Summit / DDD Europe speaking submission. Zero paid distribution is the LoopBudget failure mode repeating.

**Before day-30 decision:**

8. **Fixture library as the OSS artifact, shipped at day 30 not day 90** ([_review-challenge.md §7.2-7.3](_review-challenge.md#72-what-the-actual-moats-have-to-be)) — 10-15 days of curation. Publish 5-10 real dangerous-PR scenarios across Kafka/SNS/SQS/EventBridge with reproducible detection outcomes. Feed every audit's Deliverable #4 (redacted) back into this library. This — not a CI gate — is the shippable OSS artifact that starts compounding the moat while consulting funds the runway.
9. **Reframe interview Q6** ([_review-challenge.md §7.3](_review-challenge.md#73-what-this-means-for-the-plan)) — 5 min. Instead of "would you pilot the v0.1 in 3 weeks," ask "would you contribute a redacted incident to a public fixture library." Same signal, no product-presupposition trap, starts building the moat before any product exists.

## Screech dogfood receipts

Because the point of the review was to see how well Screech's own capabilities hold up when turned inward:

| What worked | Detail |
| --- | --- |
| `screech doctor` | 10/1/0 pass/warn/fail. Reliable single-command health snapshot. Would use again. |
| `screech research` (Firecrawl / web-grounded profile) | Genuinely surfaced the SpecShield finding — the highest-signal insight in this review. The turn-8 timeout is real (~7 min budget) but findings before that were verifiable. |
| `screech wiki query` | Correctly reported nothing relevant existed. Good negative signal. |

| What didn't work | Detail |
| --- | --- |
| `screech run --model ollama/deepseek-r1:8b` for a challenge review | **The 8B local model never called `read` once** — 0 tool calls in 527s, then produced a structured "review" with fabricated quotes and fake line-number citations. Silent failure: `Stop: stop`, exit success. Wasted ~9 min. Lesson: local small models with tool-use harnesses will confabulate rather than invoke tools. The harness should refuse to accept a "completed" answer for a file-grounded task if zero `read` calls were made. Use cloud model (Anthropic, GPT) or larger local (32B+) for anything that requires reading before generating. |
| `screech search` | Hung on embedding call. Killed after ~2 min. Retrieval eval was already flagged in `doctor` as 12/15 hit / para 3/5 below-threshold — this run confirmed the eval is telling the truth. |
| `screech history search` | Bug: passes `--json` to underlying `ctx` CLI which doesn't accept the flag. Immediate failure. Worth filing. |
| `screech research` output persistence | The research run *never saved output* when it aborted at turn 8. The findings existed in the model's context but weren't persisted. Should snapshot progress at every turn, not only on completion. Worth filing. |

**Bugs / friction worth logging as improvement items for Screech itself:**

1. `screech history search --json` — flag compatibility break with installed `ctx` version. File under `packages/agent-history`.
2. `screech run` when aborted — should save partial output (skill/tool trace + any `write` tool calls made) to a run trace file, not just discard. Otherwise 8 minutes of tool calls produce nothing.
3. `screech run --model ollama/<small-model>` with heavy file-reading tasks — needs a guardrail. **Sharpest form:** if the prompt mentions specific file paths and the run completes with `Tool calls: 0`, flag the run as `signal: no_tools_invoked` and either fail-closed or emit a loud warning. Current behavior (silent success, confident hallucinated output) is the worst possible outcome. Would file under `packages/loop` as a new signal type alongside the existing `empty_answer` / `tool_error` signals.
4. `screech search` hanging on embedding — the ollama nomic-embed-text call likely timed out silently. Should have a per-call timeout and fail loud instead of hanging.
5. `screech doctor` correctly flagged the retrieval eval below threshold, but this run showed the actual failure mode: hung embedding call. The eval and the failure should link.

## Final verdict

The plan is structurally sound. The revision list is longer than the first pass suggested because the second (genuine) review caught more issues — but no single item is a foundation-level rewrite. All fixes are edits, not restarts.

The 9-item priority list breaks down into:
- **4 items shippable today** in ~3 hours (positioning, payment terms, mock fixes)
- **4 items shippable this week** in ~5 hours (numbers reconciliation, tracker schema, SOW clauses, one paid distribution channel)
- **2 items shippable before day 30** (fixture library — the actual moat-building artifact; interview Q6 reframe)

The wedge itself — deployed-fleet compatibility for async event contracts — is *stronger* after the market check, not weaker:
- The REST version of this problem has a funded shipping competitor (SpecShield), confirming real demand
- The async version has nobody serious yet
- The technical patterns are documented in AsyncAPI 3.0 community content (real named pain — see [`_review-market.md`](_review-market.md) §4)
- Optic's death confirms teams will pay for tools in this space

Fix the eight things. Keep everything the [_review-challenge.md §9](_review-challenge.md#9-what-survives-the-review-unchanged) list flags as intact. Ship the "today" work before day-1 outreach.

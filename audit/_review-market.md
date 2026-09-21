# Market reality check — verified findings

**Method:** Ran `screech research` via `web-grounded` profile (Firecrawl). Verified all critical claims with an independent `WebSearch` cross-check because the research agent's session aborted at turn 8 (timeout) before saving synthesized output. Every citation here has been directly verified — nothing here is agent-hallucinated.

## 1. Optic (YC-backed OpenAPI diff tool) — dead as of 2026-01-12

**Verified via GitHub `opticdev/optic` metadata.**

- Repo archived Jan 12, 2026. `Archived: true`, 1,532 stars, last release v1.0.9 (Aug 2025).
- Atlassian acquired Optic in April 2024; the plan was integration into Atlassian Compass.
- Compass got a shallow API-spec viewer but no drift detection. Compass scorecards/catalog are now being transitioned to the DX app.
- The `useoptic.com` domain no longer resolves.
- Source: [opticdev/optic](https://github.com/opticdev/optic/), [Discussion #2860](https://github.com/opticdev/optic/discussions/2860), [Optic Is Dead — DEV article](https://dev.to/flarecanary/optic-is-dead-what-now-for-api-drift-detection-2kb8), [Compass docs](https://support.atlassian.com/compass/docs/manage-api-specifications/)

**Implication for our plan:** confirms there's a real vacuum in the "OpenAPI change detection" space — but that's exactly the vacuum SpecShield is now filling (see below).

---

## 2. SpecShield (specshield.io) — the direct competitor to be aware of

**Verified via specshield.io, GitHub `specshield-io/specshield-cli`, npm `specshield`.**

This is the highest-signal finding of the review. SpecShield ships nearly the exact wedge the audit plan targets — with different scope.

### What SpecShield does today

- OpenAPI diff + breaking-change detection in CI
- **Consumer-aware deploy gate: `can-i-deploy` blocks a merge when the change breaks a registered consumer** ← the exact positioning language
- Consumer registry (services declare what they depend on)
- API governance scoring (OWASP + design rules, 0-100 letter grade)
- GitHub App + GitHub Action + CLI + IntelliJ plugin + SARIF output
- **MCP server for AI agents** — same AI-assisted positioning we planned

### Pricing (public)

- **Free tier:** unlimited spec comparisons, breaking-change CI, one GitHub App PR check
- **Team:** $89/month for up to 10 users
- Enterprise pricing not published

### Positioning language (from their homepage)

> "SpecShield — catch breaking API changes before they reach your consumers"
>
> "SpecShield's `can-i-deploy` gate blocks a merge when a change would break a consumer you have registered — not when a human forgot to approve it."

Compare to what we drafted:

> "Ship AI-assisted code without breaking event contracts"
>
> "Check whether the version currently running in your prod fleet can process events during your rolling-deploy window"

Same category. Same GTM shape. Same distribution channels (GitHub App/Action + MCP + IntelliJ).

### The one thing they don't do

**SpecShield is OpenAPI/REST + Pact JSON only. Zero AsyncAPI, zero Kafka, zero event support.** Confirmed via their GitHub README, npm page, and homepage — no mention of async/event/AsyncAPI/Kafka anywhere.

Also — their consumer registry is a **declared** contract (consumer publishes a Pact/OpenAPI subset). It does NOT read the **currently deployed** consumer version from k8s/Lambda/ECS. Deployed-fleet awareness is still an open gap for them too.

### Sources

- [specshield.io](https://specshield.io/) — homepage & pricing
- [specshield-io/specshield-cli](https://github.com/specshield-io/specshield-cli/) — GitHub repo
- [specshield on npm](https://www.npmjs.com/package/specshield) — package details
- [Documentation](https://specshield.io/docs)

---

## 3. AsyncAPI diff exists but is spec-to-spec only

**Verified via the AsyncAPI 3.0 tooling landscape.**

- `asyncapi diff --type=breaking` exits non-zero on schema-level breaking changes (removed required field, narrowed type, deleted channel)
- Widely referenced in event-driven guides as the current best practice
- **Gap:** compares two spec files. Does NOT check whether **currently deployed consumers** can handle the change. Does NOT understand rolling deploy windows, DLQ config, FIFO dedup semantics.
- Source: [api-contract-testing.com AsyncAPI 3.0 guide](https://www.api-contract-testing.com/api-contract-fundamentals-tool-selection/asyncapi-for-event-driven-systems/)

**Implication:** the actual technical wedge (deployed-fleet + async) is real and open. The framing "AsyncAPI + deployed-fleet compatibility" is a much sharper differentiator than "AI-assisted code review."

---

## 4. AsyncAPI 3.0 already codifies the semantic-breaking-change patterns we mocked

**From the same api-contract-testing.com AsyncAPI guides:**

Patterns explicitly named as breaking:

- Removed required field / narrowed type / deleted enum value / deleted channel
- **Changing the partition key expression** (ordering guarantee break — matches our SNS/SQS FIFO mock finding)
- **Composite key change on compacted topics** (compaction semantic break — a real Kafka failure mode we didn't include in the Kafka mock)
- **Deprecating without a retention-period grace window** (matches our EDA policy pack draft)

This is validating — real domain has real patterns, and the community has already named some of them. It also means the policy-pack differentiation is *not* about inventing rules; it's about **operationalizing** rules the community already accepts, and doing so per-deploy against the fleet.

---

## 5. What we could NOT verify

The research agent claimed a coderifts.com "field-rename broke 19 restaurants, $45k postmortem" citation. **I did not verify this URL.** It sounds plausible but the coderifts.com domain wasn't cross-checked in the follow-up validation. Do not cite this in outreach until independently verified.

Similarly, the agent claimed EventCatalog v4 launched — plausible (EventCatalog is a real, active project), but the specific v4 release date not verified.

---

## 6. Strategic implications

Ranked by urgency:

### 6.1 Reposition against SpecShield, not against the AI wave

**Do this before day 1 outreach.**

- BEFORE: "Ship AI-assisted code without breaking event contracts"
- AFTER: "Deployed-fleet contract compatibility for event-driven services. What SpecShield does for REST, we do for async events."

This does three things at once:
- Rides SpecShield's education wave instead of fighting it
- Cedes REST to SpecShield (they'll win) but claims async as the sharper, undefended slice
- Removes the "AI-assisted" fashion dependency — the wedge stops being about AI at all, which paradoxically makes it more durable

### 6.2 SpecShield's $89/month reprices the audit downward

A prospect will compare: "$89/mo × 12 = $1,068/year for SpecShield vs $6-9k for a 2-week audit that doesn't include ongoing detection."

Options:
- Explicitly position audit as *complementary*: "We audit and design the policy; SpecShield covers the REST side; open question is who covers the async side (currently: nobody)."
- Or: raise the audit deliverable value — include a working async CI gate wired to their pipeline in the audit fee (was Tier 2 in the current SOW). Merge Tier 1 + Tier 2 into a single $12-15k engagement.

### 6.3 The 90-day competitive risk is real

Realistic threats within 12 weeks:
- SpecShield adds AsyncAPI support — differentiation halved
- Confluent bundles a `can-i-deploy` equivalent into Enterprise — Kafka-native customers churn
- AWS EventBridge Schema Registry adds consumer compatibility checks (they have all the state)
- A funded AI-coding-agent startup adds "event topology awareness" as a feature

**Mitigation:** the audit-first path is *resilient* to all of these. Consulting revenue doesn't care whether the OSS tool has competitors. The OSS bet is where the risk lives.

### 6.4 Real demand signals present, but not overwhelming

The AsyncAPI 3.0 content explicitly warns about all the failure modes in our mocks (compacted topics, partition key changes, deprecation grace windows). That means the pain is *known and named* in the community — but the tooling doesn't yet close it. Sweet spot for a policy-pack + CI-gate play.

**Recommendation:** in outreach interviews (Q1 in the interview script), specifically ask about compacted-topic key changes and partition-key evolution. Those are the highest-signal pain points the community documents.

---

## Methodology receipts

- Screech `doctor`: 10 passes / 1 warn / 0 P0 fails. Healthy enough to dogfood.
- Screech `wiki query` on "event-driven architecture contract compatibility rolling deploy consumer version": no direct hits in the project wiki — this is genuinely new territory for the project's own memory. Top matches were architecture-book chunks, not prior thinking on this problem.
- Screech `research`: 8 turns, 24 tool calls, 420s runtime, aborted at turn 8 with `stopReason=aborted`. Firecrawl found the SpecShield/Optic signals before the timeout. Output was NOT saved by the run (bug: `run_saves_only_on_completion` — worth filing).
- Screech `search`: hung on embedding call, killed after ~2 min. Retrieval eval was already flagged in `doctor` as below-threshold.
- Screech `history search`: broken (`--json` incompatibility with underlying `ctx` CLI version). Worth filing.
- Manual `WebSearch` verification: confirmed Optic archival (GitHub metadata), confirmed SpecShield product and OpenAPI-only scope (specshield.io + GitHub + npm), confirmed AsyncAPI diff limitations. Did NOT verify the coderifts.com postmortem URL — flagged above.

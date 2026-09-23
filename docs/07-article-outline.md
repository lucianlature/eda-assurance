# Article outline — first distribution piece

Not a landing page. One technical article, published once it is actually true of the fixture + plugin. Channels after it exists: own site / HN Show HN / r/typescript / AsyncAPI Slack as a comment, not a pitch.

Working title is the claim. Subheads are the argument. Snippet is the hook. Soft CTA is one line at the end, not a funnel.

## Headline (pick at write time)

**A.** Backwards compatibility is a property of the deployed fleet, not the schema.

**B.** Green tests, Avro-compatible, consumer down 40 minutes later.

Lead with A on HN. Lead with B on LinkedIn if you post a shortened cut later.

## Hook snippet (opens the piece, before any thesis)

```ts
// billing-service — "cleanup," 47 unit tests, schema registry: COMPATIBLE
interface PaymentsSettledV1 {
  paymentId: string;
  amount: Money;
- settlementReference: string;
}
```

Then one paragraph of what happens in the rolling window: `ledger-service` still deserializes with `settlementReference` required; mixed versions for ~4 minutes; lag, DLQ, a post-mortem that says "we should have caught this."

Do not invent a dollar figure. The `$340k` line in the LinkedIn draft is unverified. Use time-to-detect + reconciliation work, or a named-but-anonymized incident from a real call if you have one by then.

## Section 1 — Why the registry said yes

Schema registries (Confluent, EventBridge, Apicurio) and `asyncapi diff --type=breaking` answer: can this schema evolve as a document.

Removing an optional field, or a field Avro treats as backward-compatible, is often allowed. The registry does not know:

- which consumer groups are still running the old handler
- how long `billing-service` takes to roll
- that the failure is in the mixed-version window, not in the steady state

One sentence on SpecShield: they already sell this check for OpenAPI (`can-i-deploy` against a registered consumer). They do not do async. Do not dunk. Point, move on. If you mention language: SpecShield is language-agnostic because the input is OpenAPI; the async analogue is AsyncAPI / EventCatalog — not a MassTransit source parser.

## Section 2 — The question CI should ask

> Can the consumers currently running in production keep processing this event for the next N minutes while the producer rolls?

That question needs three inputs the registry does not have:

1. The change (schema + semantic: field gone, type changed, partition key changed)
2. The consumer topology (who still requires what)
3. The rolling window (from deploy history, even if v0 fakes it in YAML)

Compacted-topic key changes and deprecation-without-grace belong here as "same family, different rule" — one paragraph, not a catalogue. Link the AsyncAPI 3.0 guide that already named these; you are operationalizing them, not inventing them.

## Section 3 — What a gate looks like when it is not an LLM

Show the preflight payload from [`06-demo-scenario.md`](06-demo-scenario.md) (the `PreflightResult` JSON), then the three states:

- `PASS` — no protected contract changed
- `REVIEW` — contract changed; declare dual-publish, consumer-first deploy, or exception
- `BLOCK` — incompatible with known consumers, no declaration

One line of discipline: no LLM in any release-blocking claim. Put it here because the HN crowd will assume otherwise.

Close with the fixture: "This exact PR lives in `lucianlature/eda-assurance/fixtures/payments-settled`. Clone it, prompt Cursor to delete the field, watch the preflight fire." That is the Show HN kicker. If the fixture is not public yet, do not publish the article.

## Soft CTA (last line, not a section)

> Cursor plugin is advisory. If the finding is a mess you cannot self-remediate, the repo README has a way to request a 2-week audit. I will not DM you.

## Do not put in this article

- Ontology, Change Passport standard, SLSA, "architecture intelligence"
- Pricing, SOW, Calendly
- "I'm researching this across 15 teams"
- Unverified postmortems (coderifts $45k, the $340k cleanup)
- A competitor table longer than one SpecShield sentence

## Publish checklist

- [x] Fixture preflight: field delete → REVIEW; keep field → PASS (verify again via `ops/NIGHT-PLAN.md`)
- [ ] Night checklist written under `ops/drafts/article-checklist-*.md`
- [ ] Draft reviewed: [`08-article-draft.md`](08-article-draft.md)
- [ ] Headline A used (fleet property); B is subtitle
- [ ] Zero dollar figures you cannot source
- [ ] Show HN title: `Show HN: eda-assurance – catch event-contract breaks the schema registry will approve`
- [ ] Publish only after night P0 is green

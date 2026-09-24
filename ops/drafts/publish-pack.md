# Publish pack — article (2026-09-24)

Article: [`docs/08-article-draft.md`](../../docs/08-article-draft.md)  
Checklist: [`article-checklist-2026-09-24.md`](article-checklist-2026-09-24.md) — **GREEN**  
Repo: **public** (`https://github.com/lucianlature/eda-assurance`)

## Show HN

**Title**

```
Show HN: eda-assurance – catch event-contract breaks the schema registry will approve
```

**Body (paste)**

```
Schema registries answer "is this document evolution valid?" They don't know which consumer versions are still live during a rolling deploy.

eda-assurance maps producers/consumers and fails the PR when a change would break that mixed-version window. Not an LLM gate.

Try the fixture:

  git clone https://github.com/lucianlature/eda-assurance
  cd eda-assurance && npm ci
  npm run preflight -- fixtures/payments-settled
  # REVIEW / exit 2 — settlementReference still required by two consumers

  npm run preflight -- fixtures/payments-settled --fail-on review \
    --after paymentId,amount,settlementReference
  # PASS

Write-up: https://github.com/lucianlature/eda-assurance/blob/main/docs/08-article-draft.md
```

## Other channels (after HN, optional)

- AsyncAPI Slack: comment with fixture link, not a pitch
- r/typescript: same title + first two paragraphs
- LinkedIn: use subtitle as hook ("Green tests, Avro-compatible, consumer down later anyway") — short cut only

## Do not include

Pricing, SOW, Calendly, dollar figures, "researching 15 teams"

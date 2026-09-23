# Night plan — 2026-09-23 → 24

Day goal tomorrow: **publish-ready article + demo proof**. Night supports that. Do **not** expand extractors for corpus vanity.

Read `ops/CONTRACT.md` first. No push, no publish, no email/DM/LinkedIn, no approving queue items.

## Priority order

### P0 — Prove the article checklist (truth)

Article draft: [`docs/08-article-draft.md`](../docs/08-article-draft.md). Outline: [`docs/07-article-outline.md`](../docs/07-article-outline.md).

| Check | Command / action | Pass if |
| --- | --- | --- |
| Dangerous fixture fails | `npm run preflight -- fixtures/payments-settled --fail-on review` | exit **2**, REVIEW, ledger + reporting incompatible |
| Keeping field passes | `node src/cli.ts preflight fixtures/payments-settled --fail-on review --after paymentId,amount,settlementReference` | exit **0**, PASS |
| Additive optional passes | same with `--after paymentId,amount,settlementReference,note` (or similar) | PASS |
| Scan fixture | `npm run scan -- fixtures/payments-settled --out /tmp/eda-fixture` | EDA-004 present; no invented fleet |
| CI locally | `npm run typecheck` | clean |

Write results into `ops/drafts/article-checklist-2026-09-24.md` (pass/fail + exact command output snippets). Flag any lie in the draft vs reality.

### P1 — Demo path polish (no new product surface)

Per [`docs/06-demo-scenario.md`](../docs/06-demo-scenario.md):

- Confirm fixture README one-liners match what night measured
- Confirm rules/skills/commands paths still match the beat sheet
- If preflight Markdown in chat would confuse a stranger, draft a one-paragraph fix under `ops/drafts/` — do not rewrite public README business tone
- **Do not** film, push, or publish

### P2 — Night cycle (standing order)

```shell
node src/cli.ts night
```

- Refresh `ops/INBOX.md`
- Collapse orphan noise into summaries (already preferred)
- Log under `ops/log/night-*.json`

### P3 — Only if P0–P2 done and time left

Code improvements that help **contract-layer** truth or the fixture demo:

- Fixture clarity / preflight copy bugs
- Tests that lock REVIEW vs PASS for payments-settled
- AsyncAPI/EventCatalog extractor bugfixes if a contract-backed target regressed

**Skip:** new language extractors, MassTransit/.NET, corpus expansion, INDEX vanity, LinkedIn/outreach drafts that need Lucian voice.

## Hand off to day (Lucian)

Leave in `ops/INBOX.md` or `ops/drafts/day-handoff-2026-09-24.md`:

1. Article checklist results (P0)
2. Any draft edits needed before publish (factual only)
3. Show HN title suggestion if checklist green:
   `Show HN: eda-assurance – catch event-contract breaks the schema registry will approve`
4. Queue items still `needs: lucian` — do not approve

## Explicit non-goals tonight

- `git push` / `npm publish` / release tags
- Contacting anyone
- Raising REVIEW → merge BLOCK policy
- Overwriting `fixtures/**/.eventcontracts/topology.yaml`

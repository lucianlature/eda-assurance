# Shift contract

The product is a **paid 2-week event-contract audit**. This repo is the engine inside that engagement. It is not a self-serve SaaS and not an LLM gate.

`analyze` / `preflight` are the only sources of truth for compatibility. No model may invent consumers, fleet pins, dollar figures, or a BLOCK.

## Night (autonomous)

May:

- Run `scan` / `preflight` on `fixtures/` and `.targets/`
- Write `ops/queue/*.json` and regenerate `ops/INBOX.md`
- Draft reports under `ops/drafts/`
- Improve extractors, fixtures, tests, and this contract
- Deduplicate and collapse noisy findings (orphans → one summary)

Must not:

- `git push`, `npm publish`, tag a release
- Email, DM, LinkedIn, or file issues on other people's repos
- Overwrite `fixtures/**/.eventcontracts/topology.yaml`
- Claim a live cluster was queried
- Merge a dual-publish or mark a queue item `approved`

Stop at a queue item with `needs: lucian`.

## Day (Lucian)

Only you may:

- Approve / reject inbox items
- Talk to a buyer, send a SOW, take payment
- Push, publish, or list anything public
- Sign an exception or raise REVIEW to a merge BLOCK
- Change this contract

Open `ops/INBOX.md`. Reply with item ids and `approve` / `reject` / `later`.

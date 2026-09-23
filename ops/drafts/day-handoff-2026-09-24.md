# Day handoff — 2026-09-24

Night did not approve, reject, or later any queue item. No publish, no email, no push to main.

## 1. Article checklist

Command checklist is green. Detail and snippets: `ops/drafts/article-checklist-2026-09-24.md`.

## 2. Draft edits before publish

`docs/08-article-draft.md` behavior matches the fixture. Three factual lines do not:

- Sketch `change.field` as `change.fields: string[]`, and mention `fleetSource` (this run: `fixture`).
- Drop or relabel **BLOCK**. The engine emits PASS or REVIEW. CI failure is exit 2 on REVIEW.
- Do not describe `handlerExpects` as a static "this consumer requires the field" flag. It means "still missing on the proposed schema."

Preflight markdown for the dangerous case is clear enough to film (producer, field, ~4 min fixture window, two incompatible consumers, three next steps, no LLM). No replacement paragraph.

## 3. Show HN title

Checklist commands are green, so this is the title once the three lines above are fixed:

`Show HN: eda-assurance – catch event-contract breaks the schema registry will approve`

## 4. Still `needs: lucian` (pending)

- `finding:federation-organization-example:EDA-orphan-producer:summary`
- `finding:payments-settled:EDA-004:payments.settled.v1`
- `human:night-2026-09-23-article`

`human:npm-status`, `human:night-standing-order`, and `human:first-audit` were already `approved`. Night only refreshed `updatedAt` via upsert. Status was left alone.

## Demo paths

`docs/06-demo-scenario.md` still lists a `plugin/` tree (`mcp/preflight.ts`, `skills/safe-event-contract-evolution.md`, `rules/protected-event-preflight.md`). That tree is not in the repo (`plugin/` is empty). The manifest is `.cursor-plugin/plugin.json`, which points at `./rules/`, `./skills/`, `./commands/`, and `./mcp.json`. The tool name `assurance.preflight_change` is implemented in `src/mcp.ts`. Beat sheet intent (rule before edit, REVIEW, dual-publish, passport) still matches `.cursor/rules/protected-event-preflight.mdc` and the preflight output. Do not film until the path list matches the tree you actually open.

## Night cycle

`npm run night` scanned 1 root (`fixtures/payments-settled`). No `.targets/` clones. Inbox pending count went from 2 to 3 because `human:night-2026-09-23-article` was pending and had been left out of the previous inbox. Payments evidence path is this workspace (`/workspace/fixtures/payments-settled`).

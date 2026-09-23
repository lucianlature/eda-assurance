# Article checklist — 2026-09-24

Node v22.22.2 (repo engines ask for `>=22.18`; the image default v22.14.0 cannot load `src/cli.ts`). Commands run from the repo root. No queue item was approved.

| Check | Result |
| --- | --- |
| Dangerous fixture fails | **pass** — exit 2, REVIEW, ledger-service + reporting-worker incompatible, notifications compatible |
| Keeping field passes | **pass** — exit 0, PASS |
| Additive optional passes | **pass** — exit 0, PASS (`note` added) |
| Scan fixture | **pass** — two EDA-004 findings (ledger-service, reporting-worker). notifications not listed. Fleet pins labelled fixture, not a live cluster |
| `npm run typecheck` | **pass** — `tsc --noEmit` clean |

## Dangerous fixture

```shell
npm run preflight -- fixtures/payments-settled --fail-on review
```

Exit **2**.

```markdown
## Event contract preflight — `payments.settled.v1`

**REVIEW** · Breaking field removal · producer `billing-service`
Change: removed required field(s) `settlementReference`.
Rolling window: ~4 min (fixture topology, not live cluster).

| Consumer | Expects extra field | Status |
| --- | --- | --- |
| ledger-service | `settlementReference` | incompatible |
| notifications | — | compatible |
| reporting-worker | `settlementReference` | incompatible |
```

`rollingWindowSeconds` in the fixture pin is **252** (~4 min in the renderer). `fleetSource` is `fixture`.

## Keeping the field

```shell
node src/cli.ts preflight fixtures/payments-settled --fail-on review --after paymentId,amount,settlementReference
```

Exit **0**. State **PASS**. All three consumers compatible. Advisory line, not "CI fails".

## Additive optional

```shell
node src/cli.ts preflight fixtures/payments-settled --fail-on review --after paymentId,amount,settlementReference,note
```

Exit **0**. State **PASS**. Same consumer table as the keep-field run.

## Scan

```shell
npm run scan -- fixtures/payments-settled --out /tmp/eda-fixture
```

Exit **0**. Extractors: `ts-events`, `fixture-topology`. One contract. Two high findings, both `EDA-004` / Breaking field removal on `payments.settled.v1`, one for ledger-service and one for reporting-worker. Info finding `EDA-INFO-FIXTURE-FLEET` states the pins come from `.eventcontracts/topology.yaml`, not live cluster state. No extra services.

## Draft vs engine

Behavioral sentences in `docs/08-article-draft.md` match this run: REVIEW on the dropped field, PASS when the field is kept or an optional field is added, ledger-service and reporting-worker incompatible, notifications compatible, ~4 minute window, exit 2 with `--fail-on review`.

Fix these before publish (wording only; do not change the fixture result):

1. The sketched `PreflightResult` uses `change.field: string`. The engine returns `change.fields: string[]`. It also returns `consumers[].missing`, `consumers[].deployedCommit`, and `fleetSource`. `rule` is omitted on PASS.
2. The draft lists **BLOCK** as a state the gate returns. `src/preflight.ts` types `BLOCK` and never assigns it. The dangerous fixture is **REVIEW** with exit code 2 when `--fail-on review` (also the CLI default).
3. `handlerExpects` is `required` only when the consumer still needs a field the proposed producer schema dropped. On PASS, ledger-service and reporting-worker are `handlerExpects: "unused"` even though the topology pin still requires `settlementReference`. The chat table ("Expects extra field") is the accurate reading.

Fixture README one-liner matches the scan: EDA-004 on ledger-service and reporting-worker, notifications compatible, 252s window.

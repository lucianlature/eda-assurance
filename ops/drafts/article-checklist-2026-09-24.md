# Article checklist — 2026-09-23T1906Z

## Dangerous delete (expect REVIEW / exit 2)
```
## Event contract preflight — `payments.settled.v1`

**REVIEW** · Breaking field removal · producer `billing-service`
Change: removed required field(s) `settlementReference`.
Rolling window: ~4 min (fixture topology, not live cluster).

| Consumer | Expects extra field | Status |
| --- | --- | --- |
| ledger-service | `settlementReference` | incompatible |
| notifications | — | compatible |
| reporting-worker | `settlementReference` | incompatible |

Before merging this change, pick one:
- dual-publish v2
- redeploy consumers first
- signed exception

CI fails this PR. No LLM was used for this result.
exit=2
```

## Keep field (expect PASS / exit 0)
```
## Event contract preflight — `payments.settled.v1`

**PASS** · producer `billing-service`
Rolling window: ~4 min (fixture topology, not live cluster).

| Consumer | Expects extra field | Status |
| --- | --- | --- |
| ledger-service | — | compatible |
| notifications | — | compatible |
| reporting-worker | — | compatible |

Advisory only. No LLM was used for this result.
exit=0
```

## Additive optional (expect PASS / exit 0)
```
## Event contract preflight — `payments.settled.v1`

**PASS** · producer `billing-service`
Rolling window: ~4 min (fixture topology, not live cluster).

| Consumer | Expects extra field | Status |
| --- | --- | --- |
| ledger-service | — | compatible |
| notifications | — | compatible |
| reporting-worker | — | compatible |

Advisory only. No LLM was used for this result.
exit=0
```

## Scan fixture
```
scanned /Users/lucian/Projects/personal/eda-assurance/fixtures/payments-settled
extractors: ts-events, fixture-topology
contracts: 1
findings: 2
wrote /tmp/eda-fixture-night/topology.yaml
wrote /tmp/eda-fixture-night/findings.md

- [high] Breaking field removal payments.settled.v1 (EDA-004)
- [high] Breaking field removal payments.settled.v1 (EDA-004)
```

## Typecheck
```
npm warn Unknown env config "devdir". This will stop working in the next major version of npm. See `npm help npmrc` for supported config options.

> @lucianlature/eda-assurance@0.0.1 typecheck
> tsc --noEmit

```

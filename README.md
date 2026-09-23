# eda-assurance

Fail the PR when an event-schema change breaks consumers that are still running the old code.

Schema registries answer “is this document evolution valid?” They do not know which consumer versions are still live during a rolling deploy. This tool maps producers and consumers and flags changes that would break that mixed-version window.

The paid product is a **2-week event-contract audit** ([`docs/01-sow.md`](docs/01-sow.md)). This repo is the engine used in that engagement: **scan**, **Cursor preflight** (advisory), and **GitHub Action** (enforce). Demo: [`docs/06-demo-scenario.md`](docs/06-demo-scenario.md).

### Product vs adapters

**Product** — the published **contract layer**. Same idea as SpecShield for OpenAPI, for async events:

| Input | Role |
| --- | --- |
| AsyncAPI 2/3 | Primary contract |
| EventCatalog | Primary contract |
| Avro / JSON Schema / CloudEvents fixtures | Contract when present |

Language-agnostic at this boundary: any stack that publishes AsyncAPI (or an EventCatalog) is in scope. A silent MassTransit/.NET repo **without** a published async contract is out of scope — not a missing C# parser.

**Adapters** — best-effort topology when no contract exists (mainly TS/Node today): Nest/CQRS/Kafka topics, AWS EventBridge/SNS/SQS, KafkaJS, NATS, pg-listen, Castore/Emmett and domain `{ type, payload }`, CloudEvents SDK usage, TS event packages. Adapters bootstrap audits; they are not the scoreboard and do not imply multilingual code coverage.

### What it catches

| Kind | Plain English |
| --- | --- |
| Breaking field removal | Producer drops a field that a deployed consumer still requires (the payments-settled fixture) |
| Orphan producer | Something publishes an event nothing in this repo consumes |
| Orphan consumer | Something consumes an event nothing in this repo produces |
| Undefined reference | Code binds to a contract with no schema/definition in the repo |

Rule IDs in reports (`EDA-004`, etc.) are stable machine labels; headings use the plain-English titles above.

```shell
npm run preflight -- fixtures/payments-settled
npm run scan -- <path> --out reports/<name>
npm run passport -- fixtures/payments-settled --contract payments.settled.v1
```

| Target | Layer | Result |
| --- | --- | --- |
| `fixtures/payments-settled` | fixture + ts-events | Producer removed `settlementReference`; ledger + reporting still require it |
| [event-catalog/federation-organization-example](https://github.com/event-catalog/federation-organization-example) | **contract** (EventCatalog, AsyncAPI) | Orphan producers across federated catalogs |
| [saalikmubeen/microservices-architectured-app](https://github.com/saalikmubeen/microservices-architectured-app) | adapter (NATS) | Shared subjects package is consistent |

Public scan corpus (contract-backed vs inferred vs out of scope): [`reports/candidates.md`](reports/candidates.md) · [`reports/public/INDEX.md`](reports/public/INDEX.md).

`scan` writes under `--out` (default `reports/<basename>`). It does not write into `.eventcontracts/`. `preflight` writes nothing. `passport` writes `.eventcontracts/passport.json` only. `--fail-on review` (default) exits 2 when a breaking field removal is found; `--fail-on never` prints and exits 0.

### GitHub Action

```yaml
- uses: lucianlature/eda-assurance@main
  with:
    root: .
    fail-on: review   # or never for annotations only
```

Job summary and `::error` annotations. Output `state` is `PASS` or `REVIEW`. Requires Node 22. No cluster credentials.

### Cursor

MCP tools `assurance.preflight_change` and `assurance.generate_passport`, rule `protected-event-preflight`, skill `safe-event-contract-evolution`, command `/generate-change-passport`. Reload MCP after checkout so `.cursor/mcp.json` attaches. Advisory (`REVIEW`, not `BLOCK`).

### Audit request

Open a GitHub issue with the `audit` template, or email using the contact in the SOW.

```
src/                 scan / preflight / passport / mcp
action.yml           composite Action (enforce)
.github/workflows    typecheck + fixture must fail
reports/             public scan corpus + last outputs
docs/                SOW, strategy, demo notes
.cursor-plugin/      Cursor plugin manifest
rules/ skills/ commands/ mcp.json
fixtures/            payments-settled fixture (breaking field removal)
```

UNLICENSED · private · `@lucianlature/eda-assurance`

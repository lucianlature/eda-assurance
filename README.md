# eda-assurance

Fail the PR when an event-schema change breaks consumers that are still running the old code.

Schema registries answer “is this document evolution valid?” They do not know which consumer versions are still live during a rolling deploy. This tool maps producers and consumers in the repo (and optional fleet pins) and flags changes that would break that mixed-version window.

Supports **scan**, **Cursor preflight** (advisory), and a **GitHub Action** (enforce). Demo walkthrough: [`docs/06-demo-scenario.md`](docs/06-demo-scenario.md).

### Inputs

Topology comes from published event contracts when present, otherwise from best-effort code scan:

| Kind | Sources |
| --- | --- |
| Contracts | AsyncAPI 2/3, EventCatalog, Avro / JSON Schema / CloudEvents fixtures |
| Code | Nest/CQRS/Kafka topics, AWS EventBridge/SNS/SQS, KafkaJS, NATS, pg-listen, Castore/Emmett and domain `{ type, payload }`, CloudEvents SDK usage, TypeScript event packages |

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

| Target | Extractors | Result |
| --- | --- | --- |
| `fixtures/payments-settled` | ts-events + fixture-topology | Producer removed `settlementReference`; ledger + reporting still require it |
| [event-catalog/federation-organization-example](https://github.com/event-catalog/federation-organization-example) | eventcatalog, asyncapi | Orphan producers across federated catalogs |
| [saalikmubeen/microservices-architectured-app](https://github.com/saalikmubeen/microservices-architectured-app) | nats-node | Shared subjects package is consistent |

Public scan corpus: [`reports/candidates.md`](reports/candidates.md) · [`reports/public/INDEX.md`](reports/public/INDEX.md).

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

### Questions

Open a GitHub issue with the `audit` template.

```
src/                 scan / preflight / passport / mcp
action.yml           composite Action (enforce)
.github/workflows    typecheck + fixture must fail
reports/             public scan corpus + last outputs
docs/                demo + article (+ mock reports)
.cursor-plugin/      Cursor plugin manifest
rules/ skills/ commands/ mcp.json
fixtures/            payments-settled fixture (breaking field removal)
```

UNLICENSED · private · `@lucianlature/eda-assurance`

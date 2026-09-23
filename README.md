# eda-assurance

The business is a **2-week paid event-contract audit** ([`docs/01-sow.md`](docs/01-sow.md)). `$6–9k`. I will not DM you. Open a GitHub issue with the `audit` template, or email from the SOW.

The public CLI (`npx @lucianlature/eda-assurance`) is the same engine used inside that engagement: scan, Cursor preflight, GitHub Action. It is a set-diff with a shebang. The audit is the product.

v0 is a **repo scanner**, a **Cursor preflight** (advisory), and a **GitHub Action** (enforce). Same engine. EventCatalog + NATS + TypeScript extractors map topology. A fixture topology + producer/consumer TypeScript fires **EDA-004** (required field gone, deployed consumer still needs it). Sales film: [`docs/06-demo-scenario.md`](docs/06-demo-scenario.md).

```shell
npm run preflight -- fixtures/payments-settled
npm run scan -- <path> --out reports/<name>
npm run passport -- fixtures/payments-settled --contract payments.settled.v1
```

| Target | Extractor | Result |
| --- | --- | --- |
| `fixtures/payments-settled` | ts-events + fixture-topology | **EDA-004** — `settlementReference` dropped, ledger + reporting still require it |
| [event-catalog/federation-organization-example](https://github.com/event-catalog/federation-organization-example) | eventcatalog | 27 orphan producers |
| [saalikmubeen/microservices-architectured-app](https://github.com/saalikmubeen/microservices-architectured-app) | nats-node | 0 findings — shared package is consistent |

Public scan corpus (40+ candidates, batch reports): [`reports/candidates.md`](reports/candidates.md) · [`reports/public/INDEX.md`](reports/public/INDEX.md).

`scan` writes reports under `--out` (default `reports/<basename>`). It does not write into `.eventcontracts/`. `preflight` writes nothing. `passport` writes `.eventcontracts/passport.json` only. `--fail-on review` (default) exits 2 on EDA-004; `--fail-on never` prints and exits 0.

**GitHub Action** — Cursor can ignore REVIEW. CI should not:

```yaml
- uses: lucianlature/eda-assurance@main
  with:
    root: .
    fail-on: review   # or never for annotations only
```

Job summary + `::error` annotations. Output `state` is `PASS` or `REVIEW`. Needs Node 22. No cluster credentials.

**Cursor:** MCP tools `assurance.preflight_change` and `assurance.generate_passport`, rule `protected-event-preflight`, skill `safe-event-contract-evolution`, command `/generate-change-passport`. Reload MCP after checkout so `.cursor/mcp.json` attaches. Advisory (`REVIEW`, not `BLOCK`).

```
src/                 scan / preflight / passport / mcp
action.yml           composite Action (enforce)
.github/workflows    typecheck + fixture must fail
reports/             last scan output
docs/                business / validation notes
.cursor-plugin/      Cursor plugin manifest
rules/ skills/ commands/ mcp.json
fixtures/            payments-settled dangerous-PR fixture (EDA-004)
```

UNLICENSED · private · `@lucianlature/eda-assurance` (not published)

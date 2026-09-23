# v0 demo — 90-second wow

Sales artifact, not a Marketplace listing. Film it for a call recap or a landing-page embed. The fixture is `fixtures/payments-settled`. Static topology file, no k8s, no AWS. If this paragraph is not crisp enough to film, do not show the tool yet.

## The paragraph

A payments engineer opens Cursor on `billing-service` and types: "settlementReference isn't used in this service anymore — delete it from PaymentsSettledV1 and clean up the tests." Before any file is written, the eda-assurance rule fires `assurance.preflight_change` on `payments.settled.v1`. The plugin answers in chat: producer `billing-service`; topic `payments.settled.v1`; three consumers from `.eventcontracts/topology.yaml`; `ledger-service` and `reporting-worker` still require the field at the commits in that file; rolling window 4 minutes; rule EDA-004 = REVIEW. Cursor then proposes dual-publish of `payments.settled.v2` instead of the deletion. `/eda-assurance passport` writes `passport.json` the reviewer can read on the PR. Ninety seconds, fixture repo, zero cluster credentials.

## Beat sheet (what you film)

| t | Actor | What happens |
| --- | --- | --- |
| 0:00 | Dev | Opens `fixtures/payments-settled`. Cursor plugin `lucianlature.eda-assurance` already on. |
| 0:05 | Dev | Prompt: `settlementReference isn't used in billing-service. Remove it from PaymentsSettledV1.` |
| 0:08 | Cursor | Hits the rule: do not edit a protected event schema before `assurance.preflight_change`. |
| 0:12 | Plugin | MCP tool returns the payload below. Chat renders it as the block in [`mock-reports/kafka.md`](mock-reports/kafka.md) Summary + Impact, minus agent-provenance theatre. |
| 0:25 | Dev | Sees two of three consumers marked incompatible. Does not see a green "go ahead and delete." |
| 0:35 | Cursor | Skill `safe-event-contract-evolution` takes over. Proposes Option A from the Kafka mock: add `payments.settled.v2`, dual-publish, leave v1 intact. |
| 0:55 | Dev | Runs command `generate-change-passport`. |
| 1:05 | Plugin | Writes `.eventcontracts/passport.json` + a Markdown check summary. State = `REVIEW`, not `BLOCK` (advisory in v0). |
| 1:30 | Cut | Side-by-side: naive deletion vs dual-publish plan. Caption: schema-compatible, fleet-incompatible. |

If any beat needs live Kafka, Lambda aliases, or a GitHub App, it is out of v0. Cut it.

## What `assurance.preflight_change` returns

One MCP tool. Input is a contract id plus the proposed schema after the edit (or a git diff hunk). Output is this shape, nothing else:

```ts
type PreflightResult = {
  contract: "payments.settled.v1";
  producer: "billing-service";
  change: {
    kind: "removed-required-field";
    field: "settlementReference";
  };
  consumers: Array<{
    service: string;
    handlerExpects: "required" | "unused";
    status: "incompatible" | "compatible";
  }>;
  rollingWindowSeconds: number; // from fixture metadata, not ArgoCD
  rule: "EDA-004";
  state: "PASS" | "REVIEW" | "BLOCK";
  next: Array<"dual-publish v2" | "redeploy consumers first" | "signed exception">;
};
```

v0 sources every field from:

- schema files in the repo (AST / interface diff)
- `.eventcontracts/topology.yaml` (hand-written for the fixture; later: extractors)
- `.eventcontracts/policy/EDA-004.yaml` (one rule)

No LLM. No deployed-commit probe. The Kafka mock's `a3f2c1e (deployed 6d ago)` column is fixture data in the YAML, labelled as such in the report so a senior engineer does not think you scraped `kafka-consumer-groups.sh`.

## v0 plugin contents (stop here)

```
plugin/
  .cursor-plugin/plugin.json
  mcp/preflight.ts          → assurance.preflight_change
  skills/safe-event-contract-evolution.md
  rules/protected-event-preflight.md
  commands/generate-change-passport.md
fixtures/payments-settled/  → the repo in the video
```

Not in the 90-second plugin demo: GitHub Action (shipped as the enforce surface, same engine), audit-bundle zip, telemetry, hosted anything, graph UI, SNS/SQS/EventBridge extractors.

## Pass/fail for the demo itself

The demo works if a stranger watching the video can answer all three:

1. What did the engineer almost do?
2. Why did green tests not save them?
3. What did the plugin force instead?

If they instead remember "AI safety" or "a knowledge graph," the demo failed.

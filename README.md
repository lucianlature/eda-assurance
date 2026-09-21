# eda-assurance

Detect risky event-contract changes in TypeScript before they break downstream services.

Cursor plugin (preflight while the agent edits) and GitHub Action (verify on the PR). Deterministic policy — no LLM in release-blocking claims. Placeholder until v0.

```
plugin/     Cursor plugin + MCP
action/     GitHub Action
fixtures/   public dangerous-PR corpus
audit/      validation plan, SOW, mock PR reports
```

Apache-2.0 · `@lucianlature/eda-assurance`

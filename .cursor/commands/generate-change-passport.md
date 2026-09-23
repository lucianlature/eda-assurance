---
name: generate-change-passport
description: Write .eventcontracts/passport.json from the current event-contract preflight (advisory).
---

# Generate change passport

1. Identify the contract under edit (`CONTRACT` export or topology id). If unclear, preflight every event in the repo.
2. Call `assurance.generate_passport` with that `contract`. Nested fixture: pass its directory as `root`.
3. If the MCP tool is unavailable: `node src/cli.ts passport <root> --contract <id>` from the eda-assurance checkout.
4. Paste the rendered PASS/REVIEW block into chat. Point at the written `passport.json`.
5. Do not overwrite `.eventcontracts/topology.yaml`. Do not claim BLOCK or a live cluster probe.

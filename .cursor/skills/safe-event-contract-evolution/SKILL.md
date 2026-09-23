---
name: safe-event-contract-evolution
description: >-
  Evolve an event contract without breaking consumers still running the old
  handler. Use when removing or renaming a field on an event schema, when
  preflight returns REVIEW or EDA-004, or when the user asks to dual-publish,
  version an event, or generate a change passport.
---

# Safe event-contract evolution

Schema-compatible is not fleet-compatible. A field the producer no longer sends can still be required by a consumer that has not rolled.

## Before any edit

Call `assurance.preflight_change` for the contract. Use that payload. Do not infer consumers from memory.

## If PASS

Make the requested edit.

## If REVIEW (EDA-004)

Do not delete the field from the existing version. Present three options and wait:

1. **Dual-publish v2** (default). Keep `*.v1` intact. Add `*.v2` without the field. Producer emits both during the rolling window. Consumers migrate, then v1 is retired.
2. **Redeploy consumers first.** Ship ledger/reporting (or whoever `status: incompatible`) before the producer drop. Only if the user can sequence deploys.
3. **Signed exception.** Write why the mixed-version window is acceptable. Do not silently skip.

## Dual-publish shape

```ts
export const CONTRACT_V1 = "payments.settled.v1";
export const CONTRACT_V2 = "payments.settled.v2";
```

v1 keeps every field current consumers require. v2 is the reduced payload. Do not "clean up" v1 in the same change.

## Passport

When the user runs `/generate-change-passport` or asks for a PR artifact, call `assurance.generate_passport`. That writes `.eventcontracts/passport.json` only — never overwrite `.eventcontracts/topology.yaml`.

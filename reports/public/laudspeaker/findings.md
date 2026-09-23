# Event-contract scan

Findings: 1 (plus 1 info)

## EDA-INFO-NO-FLEET

**info.** No deployed versions available. Rolling-window compatibility (EDA-004) was not evaluated. This scan is in-repo topology only.

## EDA-orphan-producer — `nodeMovedTo`

**medium.** Event 'nodeMovedTo' is published by api but no service in this repo declares a consumer.

- `packages/server/src/api/dev-mode/dev-mode.service.ts`

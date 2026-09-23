# Event-contract scan

Findings: 1 (plus 1 info)

## No deployed fleet pins

**info.** No deployed versions available. Rolling-window compatibility (breaking field removal vs live consumers) was not evaluated. This scan is in-repo topology only.

Rule id: `EDA-INFO-NO-FLEET`

## Orphan producer — `nodeMovedTo`

**medium.** Event 'nodeMovedTo' is published by api but no service in this repo declares a consumer.

Rule id: `EDA-orphan-producer`

- `packages/server/src/api/dev-mode/dev-mode.service.ts`

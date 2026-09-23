# Event-contract scan

Findings: 1 (plus 1 info)

## No deployed fleet pins

**info.** No deployed versions available. Rolling-window compatibility (breaking field removal vs live consumers) was not evaluated. This scan is in-repo topology only.

Rule id: `EDA-INFO-NO-FLEET`

## Orphan producer — `application`

**medium.** Event 'application' is published by event-broadcast-factory but no service in this repo declares a consumer.

Rule id: `EDA-orphan-producer`

- `packages/runtime/runtimes/runtime-base/src/event-broadcast-factory.ts`

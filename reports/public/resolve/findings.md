# Event-contract scan

Findings: 1 (plus 1 info)

## EDA-INFO-NO-FLEET

**info.** No deployed versions available. Rolling-window compatibility (EDA-004) was not evaluated. This scan is in-repo topology only.

## EDA-orphan-producer — `application`

**medium.** Event 'application' is published by event-broadcast-factory but no service in this repo declares a consumer.

- `packages/runtime/runtimes/runtime-base/src/event-broadcast-factory.ts`

# Event-contract scan

Findings: 1 (plus 1 info)

## EDA-INFO-NO-FLEET

**info.** No deployed versions available. Rolling-window compatibility (EDA-004) was not evaluated. This scan is in-repo topology only.

## EDA-orphan-producer — `test2`

**medium.** Event 'test2' is published by pg-listen-test but no service in this repo declares a consumer.

- `test/integration.test.ts`

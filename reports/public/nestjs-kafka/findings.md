# Event-contract scan

Findings: 1 (plus 1 info)

## EDA-INFO-NO-FLEET

**info.** No deployed versions available. Rolling-window compatibility (EDA-004) was not evaluated. This scan is in-repo topology only.

## EDA-orphan-consumer — `test.topic`

**high.** Event 'test.topic' is consumed by test-controller but no service in this repo declares a producer.

- `test/e2e/app/test.controller.ts`

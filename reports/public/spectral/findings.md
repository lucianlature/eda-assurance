# Event-contract scan

Findings: 1 (plus 1 info)

## EDA-INFO-NO-FLEET

**info.** No deployed versions available. Rolling-window compatibility (EDA-004) was not evaluated. This scan is in-repo topology only.

## EDA-orphan-producer — `lightMeasured`

**medium.** Event 'lightMeasured' is published by streetlights-api but no service in this repo declares a consumer.

- `packages/core/src/__tests__/__fixtures__/streetlights.asyncapi2.json`

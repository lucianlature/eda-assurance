# Event-contract scan

Findings: 1 (plus 1 info)

## No deployed fleet pins

**info.** No deployed versions available. Rolling-window compatibility (breaking field removal vs live consumers) was not evaluated. This scan is in-repo topology only.

Rule id: `EDA-INFO-NO-FLEET`

## Orphan consumer — `message0`

**high.** Event 'message0' is consumed by smartylighting-streetlights-propan-api but no service in this repo declares a producer.

Rule id: `EDA-orphan-consumer`

- `docs/docs_src/quickstart/documentation/example.yaml`

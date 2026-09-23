# Event-contract scan

Findings: 1 (plus 1 info)

## EDA-INFO-NO-FLEET

**info.** No deployed versions available. Rolling-window compatibility (EDA-004) was not evaluated. This scan is in-repo topology only.

## EDA-orphan-consumer — `message0`

**high.** Event 'message0' is consumed by smartylighting-streetlights-propan-api but no service in this repo declares a producer.

- `docs/docs_src/quickstart/documentation/example.yaml`

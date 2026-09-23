# Event-contract scan

Findings: 1 (plus 1 info)

## EDA-INFO-NO-FLEET

**info.** No deployed versions available. Rolling-window compatibility (EDA-004) was not evaluated. This scan is in-repo topology only.

## EDA-orphan-producer — `message0`

**medium.** Event 'message0' is published by streetlights-kafka-api but no service in this repo declares a consumer.

- `test/LEGO.AsyncAPI.Tests/TestData/AsyncApiSchema_InlinedReferences.yml`
- `test/LEGO.AsyncAPI.Tests/TestData/AsyncApiSchema_NoInlinedReferences.yml`

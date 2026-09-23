# Event-contract scan

Findings: 1 (plus 1 info)

## No deployed fleet pins

**info.** No deployed versions available. Rolling-window compatibility (breaking field removal vs live consumers) was not evaluated. This scan is in-repo topology only.

Rule id: `EDA-INFO-NO-FLEET`

## Orphan producer — `message0`

**medium.** Event 'message0' is published by streetlights-kafka-api but no service in this repo declares a consumer.

Rule id: `EDA-orphan-producer`

- `test/LEGO.AsyncAPI.Tests/TestData/AsyncApiSchema_InlinedReferences.yml`
- `test/LEGO.AsyncAPI.Tests/TestData/AsyncApiSchema_NoInlinedReferences.yml`

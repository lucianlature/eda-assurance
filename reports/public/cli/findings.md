# Event-contract scan

Findings: 4 (plus 1 info)

## No deployed fleet pins

**info.** No deployed versions available. Rolling-window compatibility (breaking field removal vs live consumers) was not evaluated. This scan is in-repo topology only.

Rule id: `EDA-INFO-NO-FLEET`

## Orphan producer — `dummyCreated`

**medium.** Event 'dummyCreated' is published by dummy-example-with-all-spec-features-included but no service in this repo declares a consumer.

Rule id: `EDA-orphan-producer`

- `github-action/test/dummy.yml`

## Orphan consumer — `dummyInfo`

**high.** Event 'dummyInfo' is consumed by dummy-example-with-all-spec-features-included but no service in this repo declares a producer.

Rule id: `EDA-orphan-consumer`

- `github-action/test/dummy.yml`

## Orphan consumer — `lightMeasured`

**high.** Event 'lightMeasured' is consumed by streetlights-api, streetlights-mqtt-api, streetlights-kafka-api, asyncapi-app, asyncapi-sample-app but no service in this repo declares a producer.

Rule id: `EDA-orphan-consumer`

- `github-action/test/unoptimized.yml`
- `packages/optimizer/examples/input.yaml`
- `packages/optimizer/examples/output.yaml`
- `test/fixtures/asyncapiTestingScore.yml`
- `test/fixtures/dummyspec/unoptimizedSpec.json`
- `test/fixtures/dummyspec/unoptimizedSpec.yml`
- `test/fixtures/specification-v3-diff.yml`
- `test/fixtures/specification-v3.yml`

## Orphan producer — `message1`

**medium.** Event 'message1' is published by this-is-async-api-with-a-schema-reference but no service in this repo declares a consumer.

Rule id: `EDA-orphan-producer`

- `test/fixtures/dummyspec/apiwithref.json`

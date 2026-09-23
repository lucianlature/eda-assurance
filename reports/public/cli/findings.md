# Event-contract scan

Findings: 4 (plus 1 info)

## EDA-INFO-NO-FLEET

**info.** No deployed versions available. Rolling-window compatibility (EDA-004) was not evaluated. This scan is in-repo topology only.

## EDA-orphan-producer — `dummyCreated`

**medium.** Event 'dummyCreated' is published by dummy-example-with-all-spec-features-included but no service in this repo declares a consumer.

- `github-action/test/dummy.yml`

## EDA-orphan-consumer — `dummyInfo`

**high.** Event 'dummyInfo' is consumed by dummy-example-with-all-spec-features-included but no service in this repo declares a producer.

- `github-action/test/dummy.yml`

## EDA-orphan-consumer — `lightMeasured`

**high.** Event 'lightMeasured' is consumed by streetlights-api, streetlights-mqtt-api, streetlights-kafka-api, asyncapi-app, asyncapi-sample-app but no service in this repo declares a producer.

- `github-action/test/unoptimized.yml`
- `packages/optimizer/examples/input.yaml`
- `packages/optimizer/examples/output.yaml`
- `test/fixtures/asyncapiTestingScore.yml`
- `test/fixtures/dummyspec/unoptimizedSpec.json`
- `test/fixtures/dummyspec/unoptimizedSpec.yml`
- `test/fixtures/specification-v3-diff.yml`
- `test/fixtures/specification-v3.yml`

## EDA-orphan-producer — `message1`

**medium.** Event 'message1' is published by this-is-async-api-with-a-schema-reference but no service in this repo declares a consumer.

- `test/fixtures/dummyspec/apiwithref.json`

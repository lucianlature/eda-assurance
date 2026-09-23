# Event-contract scan

Findings: 11 (plus 1 info)

## EDA-INFO-NO-FLEET

**info.** No deployed versions available. Rolling-window compatibility (EDA-004) was not evaluated. This scan is in-repo topology only.

## EDA-orphan-producer — `costingResponse`

**medium.** Event 'costingResponse' is published by adeo-asyncapi-case-study but no service in this repo declares a consumer.

- `packages/templates/clients/kafka/test/__fixtures__/asyncapi-adeo.yml`

## EDA-orphan-consumer — `disconnect`

**high.** Event 'disconnect' is consumed by slack-websocket-api-client but no service in this repo declares a producer.

- `packages/templates/clients/websocket/test/__fixtures__/asyncapi-slack-client.yml`

## EDA-orphan-producer — `dummyCreated`

**medium.** Event 'dummyCreated' is published by dummy-example-with-all-spec-features-included but no service in this repo declares a consumer.

- `apps/generator/test/docs/dummy.yml`

## EDA-orphan-consumer — `dummyInfo`

**high.** Event 'dummyInfo' is consumed by dummy-example-with-all-spec-features-included but no service in this repo declares a producer.

- `apps/generator/test/docs/dummy.yml`

## EDA-orphan-consumer — `event`

**high.** Event 'event' is consumed by slack-websocket-api-client but no service in this repo declares a producer.

- `packages/templates/clients/websocket/test/__fixtures__/asyncapi-slack-client.yml`

## EDA-orphan-consumer — `MarketUpdateMessage`

**high.** Event 'MarketUpdateMessage' is consumed by gemini-market-data-websocket-api but no service in this repo declares a producer.

- `packages/helpers/test/__fixtures__/asyncapi-websocket-query.yml`

## EDA-orphan-producer — `message1`

**medium.** Event 'message1' is published by this-is-async-api-with-a-schema-reference but no service in this repo declares a consumer.

- `apps/generator/test/docs/apiwithref.json`

## EDA-orphan-consumer — `messageWithDiscriminator`

**high.** Event 'messageWithDiscriminator' is consumed by websocket-components-test-fixture but no service in this repo declares a producer.

- `packages/templates/clients/websocket/test/__fixtures__/asyncapi-websocket-components.yml`

## EDA-orphan-consumer — `MessageWithDiscriminatorNoConst`

**high.** Event 'MessageWithDiscriminatorNoConst' is consumed by gemini-market-data-websocket-api but no service in this repo declares a producer.

- `packages/helpers/test/__fixtures__/asyncapi-websocket-query.yml`

## EDA-orphan-consumer — `MessageWithoutDiscriminator`

**high.** Event 'MessageWithoutDiscriminator' is consumed by gemini-market-data-websocket-api but no service in this repo declares a producer.

- `packages/helpers/test/__fixtures__/asyncapi-websocket-query.yml`

## EDA-orphan-producer — `UserSignedUp`

**medium.** Event 'UserSignedUp' is published by account-service but no service in this repo declares a consumer.

- `apps/generator/test/docs/dummyV3.yml`
- `packages/components/test/__fixtures__/asyncapi-v3.yml`

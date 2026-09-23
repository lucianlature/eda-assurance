# Event-contract scan

Findings: 11 (plus 1 info)

## No deployed fleet pins

**info.** No deployed versions available. Rolling-window compatibility (breaking field removal vs live consumers) was not evaluated. This scan is in-repo topology only.

Rule id: `EDA-INFO-NO-FLEET`

## Orphan producer — `costingResponse`

**medium.** Event 'costingResponse' is published by adeo-asyncapi-case-study but no service in this repo declares a consumer.

Rule id: `EDA-orphan-producer`

- `packages/templates/clients/kafka/test/__fixtures__/asyncapi-adeo.yml`

## Orphan consumer — `disconnect`

**high.** Event 'disconnect' is consumed by slack-websocket-api-client but no service in this repo declares a producer.

Rule id: `EDA-orphan-consumer`

- `packages/templates/clients/websocket/test/__fixtures__/asyncapi-slack-client.yml`

## Orphan producer — `dummyCreated`

**medium.** Event 'dummyCreated' is published by dummy-example-with-all-spec-features-included but no service in this repo declares a consumer.

Rule id: `EDA-orphan-producer`

- `apps/generator/test/docs/dummy.yml`

## Orphan consumer — `dummyInfo`

**high.** Event 'dummyInfo' is consumed by dummy-example-with-all-spec-features-included but no service in this repo declares a producer.

Rule id: `EDA-orphan-consumer`

- `apps/generator/test/docs/dummy.yml`

## Orphan consumer — `event`

**high.** Event 'event' is consumed by slack-websocket-api-client but no service in this repo declares a producer.

Rule id: `EDA-orphan-consumer`

- `packages/templates/clients/websocket/test/__fixtures__/asyncapi-slack-client.yml`

## Orphan consumer — `MarketUpdateMessage`

**high.** Event 'MarketUpdateMessage' is consumed by gemini-market-data-websocket-api but no service in this repo declares a producer.

Rule id: `EDA-orphan-consumer`

- `packages/helpers/test/__fixtures__/asyncapi-websocket-query.yml`

## Orphan producer — `message1`

**medium.** Event 'message1' is published by this-is-async-api-with-a-schema-reference but no service in this repo declares a consumer.

Rule id: `EDA-orphan-producer`

- `apps/generator/test/docs/apiwithref.json`

## Orphan consumer — `messageWithDiscriminator`

**high.** Event 'messageWithDiscriminator' is consumed by websocket-components-test-fixture but no service in this repo declares a producer.

Rule id: `EDA-orphan-consumer`

- `packages/templates/clients/websocket/test/__fixtures__/asyncapi-websocket-components.yml`

## Orphan consumer — `MessageWithDiscriminatorNoConst`

**high.** Event 'MessageWithDiscriminatorNoConst' is consumed by gemini-market-data-websocket-api but no service in this repo declares a producer.

Rule id: `EDA-orphan-consumer`

- `packages/helpers/test/__fixtures__/asyncapi-websocket-query.yml`

## Orphan consumer — `MessageWithoutDiscriminator`

**high.** Event 'MessageWithoutDiscriminator' is consumed by gemini-market-data-websocket-api but no service in this repo declares a producer.

Rule id: `EDA-orphan-consumer`

- `packages/helpers/test/__fixtures__/asyncapi-websocket-query.yml`

## Orphan producer — `UserSignedUp`

**medium.** Event 'UserSignedUp' is published by account-service but no service in this repo declares a consumer.

Rule id: `EDA-orphan-producer`

- `apps/generator/test/docs/dummyV3.yml`
- `packages/components/test/__fixtures__/asyncapi-v3.yml`

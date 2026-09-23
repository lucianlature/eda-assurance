# Event-contract scan

Findings: 7 (plus 1 info)

## No deployed fleet pins

**info.** No deployed versions available. Rolling-window compatibility (breaking field removal vs live consumers) was not evaluated. This scan is in-repo topology only.

Rule id: `EDA-INFO-NO-FLEET`

## Orphan producer — `Low`

**medium.** Event 'Low' is published by pg-service but no service in this repo declares a consumer.

Rule id: `EDA-orphan-producer`

- `examples/generate-go-asyncapi-comments/index.ts`

## Orphan producer — `message1`

**medium.** Event 'message1' is published by cloudevent-example but no service in this repo declares a consumer.

Rule id: `EDA-orphan-producer`

- `test/processors/AsyncAPIInputProcessor/operation_oneof1.json`
- `test/processors/AsyncAPIInputProcessor/operation_oneof2.json`

## Orphan producer — `setParame`

**medium.** Event 'setParame' is published by test but no service in this repo declares a consumer.

Rule id: `EDA-orphan-producer`

- `test/processors/AsyncAPIInputProcessor/operation_with_reply.json`

## Orphan producer — `subscribe.message`

**medium.** Event 'subscribe.message' is published by account-service but no service in this repo declares a consumer.

Rule id: `EDA-orphan-producer`

- `modelina-cli/test/fixtures/asyncapi_v3.json`
- `modelina-cli/test/fixtures/asyncapi_v3.yml`

## Orphan producer — `userSignUpMessage`

**medium.** Event 'userSignUpMessage' is published by signup-service-example-internal but no service in this repo declares a consumer.

Rule id: `EDA-orphan-producer`

- `test/processors/AsyncAPIInputProcessor/basic_v3.json`

## Orphan consumer — `WorkersChangedPublicEvent`

**high.** Event 'WorkersChangedPublicEvent' is consumed by event-bus but no service in this repo declares a producer.

Rule id: `EDA-orphan-consumer`

- `test/processors/AsyncAPIInputProcessor/multiple_messages_in_operation.json`

## Orphan consumer — `WorkersCreatedPublicEvent`

**high.** Event 'WorkersCreatedPublicEvent' is consumed by event-bus but no service in this repo declares a producer.

Rule id: `EDA-orphan-consumer`

- `test/processors/AsyncAPIInputProcessor/multiple_messages_in_operation.json`

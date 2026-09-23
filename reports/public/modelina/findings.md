# Event-contract scan

Findings: 7 (plus 1 info)

## EDA-INFO-NO-FLEET

**info.** No deployed versions available. Rolling-window compatibility (EDA-004) was not evaluated. This scan is in-repo topology only.

## EDA-orphan-producer — `Low`

**medium.** Event 'Low' is published by pg-service but no service in this repo declares a consumer.

- `examples/generate-go-asyncapi-comments/index.ts`

## EDA-orphan-producer — `message1`

**medium.** Event 'message1' is published by cloudevent-example but no service in this repo declares a consumer.

- `test/processors/AsyncAPIInputProcessor/operation_oneof1.json`
- `test/processors/AsyncAPIInputProcessor/operation_oneof2.json`

## EDA-orphan-producer — `setParame`

**medium.** Event 'setParame' is published by test but no service in this repo declares a consumer.

- `test/processors/AsyncAPIInputProcessor/operation_with_reply.json`

## EDA-orphan-producer — `subscribe.message`

**medium.** Event 'subscribe.message' is published by account-service but no service in this repo declares a consumer.

- `modelina-cli/test/fixtures/asyncapi_v3.json`
- `modelina-cli/test/fixtures/asyncapi_v3.yml`

## EDA-orphan-producer — `userSignUpMessage`

**medium.** Event 'userSignUpMessage' is published by signup-service-example-internal but no service in this repo declares a consumer.

- `test/processors/AsyncAPIInputProcessor/basic_v3.json`

## EDA-orphan-consumer — `WorkersChangedPublicEvent`

**high.** Event 'WorkersChangedPublicEvent' is consumed by event-bus but no service in this repo declares a producer.

- `test/processors/AsyncAPIInputProcessor/multiple_messages_in_operation.json`

## EDA-orphan-consumer — `WorkersCreatedPublicEvent`

**high.** Event 'WorkersCreatedPublicEvent' is consumed by event-bus but no service in this repo declares a producer.

- `test/processors/AsyncAPIInputProcessor/multiple_messages_in_operation.json`

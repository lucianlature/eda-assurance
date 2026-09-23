# Event-contract scan

Findings: 2 (plus 1 info)

## No deployed fleet pins

**info.** No deployed versions available. Rolling-window compatibility (breaking field removal vs live consumers) was not evaluated. This scan is in-repo topology only.

Rule id: `EDA-INFO-NO-FLEET`

## Orphan producer — `Message`

**medium.** Event 'Message' is published by faststream but no service in this repo declares a consumer.

Rule id: `EDA-orphan-producer`

- `tests/asyncapi/rabbit/v3_0_0/__snapshots__/test_connection/test_custom.json`
- `tests/asyncapi/rabbit/v3_0_0/__snapshots__/test_naming/TestNaming.test_publisher_with_exchange.json`
- `tests/asyncapi/rabbit/v3_0_0/__snapshots__/test_publisher/TestArguments.test_just_exchange.json`
- `tests/asyncapi/rabbit/v3_0_0/__snapshots__/test_publisher/TestArguments.test_publisher_bindings.json`
- `tests/asyncapi/rabbit/v3_0_0/__snapshots__/test_publisher/TestArguments.test_reusable_exchange.json`
- `tests/asyncapi/rabbit/v3_0_0/__snapshots__/test_publisher/TestArguments.test_useless_queue_bindings.json`

## Orphan consumer — `SubscribeMessage`

**high.** Event 'SubscribeMessage' is consumed by faststream but no service in this repo declares a producer.

Rule id: `EDA-orphan-consumer`

- `tests/asyncapi/rabbit/v3_0_0/__snapshots__/test_arguments/TestArguments.test_subscriber_bindings.json`
- `tests/asyncapi/rabbit/v3_0_0/__snapshots__/test_arguments/TestArguments.test_subscriber_fanout_bindings.json`
- `tests/asyncapi/rabbit/v3_0_0/__snapshots__/test_naming/TestNaming.test_base.json`
- `tests/asyncapi/rabbit/v3_0_0/__snapshots__/test_naming/TestNaming.test_subscriber_with_exchange.json`
- `tests/asyncapi/rabbit/v3_0_0/__snapshots__/test_router/TestRouter.test_prefix.json`

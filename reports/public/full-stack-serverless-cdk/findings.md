# Event-contract scan

Findings: 5 (plus 1 info)

## No deployed fleet pins

**info.** No deployed versions available. Rolling-window compatibility (breaking field removal vs live consumers) was not evaluated. This scan is in-repo topology only.

Rule id: `EDA-INFO-NO-FLEET`

## Orphan consumer — `eb:appsync-events`

**high.** Event 'eb:appsync-events' is consumed by step20_step_functions but no service in this repo declares a producer.

Rule id: `EDA-orphan-consumer`

- `step20_step_functions/step06_invoke_step_function_with_event/lib/step06_invoke_step_function_with_event-stack.ts`

## Orphan consumer — `eb:custom.api`

**high.** Event 'eb:custom.api' is consumed by step15_eventbridge but no service in this repo declares a producer.

Rule id: `EDA-orphan-consumer`

- `step15_eventbridge/Python/eventbridge_with_lambda/lib/cdk-stack.js`

## Orphan consumer — `eb:eru-appsync-events`

**high.** Event 'eb:eru-appsync-events' is consumed by step15_eventbridge, step17_simple_notification_service but no service in this repo declares a producer.

Rule id: `EDA-orphan-consumer`

- `step15_eventbridge/events_from_appsync/lib/events_from_appsync-stack.ts`

## Orphan producer — `order`

**medium.** Event 'order' is published by step15_eventbridge but no service in this repo declares a consumer.

Rule id: `EDA-orphan-producer`

- `step15_eventbridge/eventbridge_with_lambda/lambda/producer.js`

## Orphan consumer — `sqs:testQueue`

**high.** Event 'sqs:testQueue' is consumed by step18_simple_queue_service but no service in this repo declares a producer.

Rule id: `EDA-orphan-consumer`

- `step18_simple_queue_service/python/sqs_to_lambda/lib/sqs_to_lambda-stack.ts`

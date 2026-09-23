# Event-contract scan

Findings: 8 (plus 1 info)

## No deployed fleet pins

**info.** No deployed versions available. Rolling-window compatibility (breaking field removal vs live consumers) was not evaluated. This scan is in-repo topology only.

Rule id: `EDA-INFO-NO-FLEET`

## Orphan producer — `cloudevents.test`

**medium.** Event 'cloudevents.test' is published by spec-1-tests but no service in this repo declares a consumer.

Rule id: `EDA-orphan-producer`

- `test/integration/spec_1_tests.ts`

## Orphan producer — `current.weather`

**medium.** Event 'current.weather' is published by websocket but no service in this repo declares a consumer.

Rule id: `EDA-orphan-producer`

- `examples/websocket/server.js`

## Orphan producer — `emitter.test`

**medium.** Event 'emitter.test' is published by emitter-factory-test but no service in this repo declares a consumer.

Rule id: `EDA-orphan-producer`

- `test/integration/emitter_factory_test.ts`

## Orphan consumer — `example.bad.event`

**high.** Event 'example.bad.event' is consumed by message-test but no service in this repo declares a producer.

Rule id: `EDA-orphan-consumer`

- `test/integration/message_test.ts`

## Orphan producer — `my.event.type`

**medium.** Event 'my.event.type' is published by cloud-event-test but no service in this repo declares a consumer.

Rule id: `EDA-orphan-producer`

- `test/integration/cloud_event_test.ts`

## Orphan consumer — `test.type`

**high.** Event 'test.type' is consumed by message-test but no service in this repo declares a producer.

Rule id: `EDA-orphan-consumer`

- `test/integration/message_test.ts`

## Orphan producer — `weather.error`

**medium.** Event 'weather.error' is published by websocket but no service in this repo declares a consumer.

Rule id: `EDA-orphan-producer`

- `examples/websocket/server.js`

## Orphan producer — `weather.query`

**medium.** Event 'weather.query' is published by websocket but no service in this repo declares a consumer.

Rule id: `EDA-orphan-producer`

- `examples/websocket/client.js`

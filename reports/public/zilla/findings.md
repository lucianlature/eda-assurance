# Event-contract scan

Findings: 2 (plus 1 info)

## No deployed fleet pins

**info.** No deployed versions available. Rolling-window compatibility (breaking field removal vs live consumers) was not evaluated. This scan is in-repo topology only.

Rule id: `EDA-INFO-NO-FLEET`

## Orphan consumer — `event`

**high.** Event 'event' is consumed by asyncapi-eventstore but no service in this repo declares a producer.

Rule id: `EDA-orphan-consumer`

- `examples/asyncapi.mqtt.proxy/etc/specs/mqtt-asyncapi.yaml`
- `examples/asyncapi.sse.kafka.proxy/etc/specs/sse-asyncapi.yaml`
- `examples/asyncapi.sse.proxy/etc/specs/sse-asyncapi.yaml`

## Orphan consumer — `Event`

**high.** Event 'Event' is consumed by eventstore-kafka-api but no service in this repo declares a producer.

Rule id: `EDA-orphan-consumer`

- `examples/asyncapi.sse.kafka.proxy/etc/specs/kafka-asyncapi.yaml`
- `examples/asyncapi.sse.kafka.proxy/etc/specs/sse-asyncapi.yaml`
- `examples/asyncapi.sse.proxy/etc/specs/sse-asyncapi.yaml`

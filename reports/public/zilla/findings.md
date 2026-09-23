# Event-contract scan

Findings: 2 (plus 1 info)

## EDA-INFO-NO-FLEET

**info.** No deployed versions available. Rolling-window compatibility (EDA-004) was not evaluated. This scan is in-repo topology only.

## EDA-orphan-consumer — `event`

**high.** Event 'event' is consumed by asyncapi-eventstore but no service in this repo declares a producer.

- `examples/asyncapi.mqtt.proxy/etc/specs/mqtt-asyncapi.yaml`
- `examples/asyncapi.sse.kafka.proxy/etc/specs/sse-asyncapi.yaml`
- `examples/asyncapi.sse.proxy/etc/specs/sse-asyncapi.yaml`

## EDA-orphan-consumer — `Event`

**high.** Event 'Event' is consumed by eventstore-kafka-api but no service in this repo declares a producer.

- `examples/asyncapi.sse.kafka.proxy/etc/specs/kafka-asyncapi.yaml`
- `examples/asyncapi.sse.kafka.proxy/etc/specs/sse-asyncapi.yaml`
- `examples/asyncapi.sse.proxy/etc/specs/sse-asyncapi.yaml`

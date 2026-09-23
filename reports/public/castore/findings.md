# Event-contract scan

Findings: 3 (plus 1 info)

## No deployed fleet pins

**info.** No deployed versions available. Rolling-window compatibility (breaking field removal vs live consumers) was not evaluated. This scan is in-repo topology only.

Rule id: `EDA-INFO-NO-FLEET`

## Orphan consumer — `COUNTER_DELETED`

**high.** Event 'COUNTER_DELETED' is consumed by command-json-schema, command-zod, core but no service in this repo declares a producer.

Rule id: `EDA-orphan-consumer`

- `packages/command-json-schema/src/command.fixtures.test.ts`

## Orphan producer — `EVENT_TYPE`

**medium.** Event 'EVENT_TYPE' is published by event-storage-adapter-in-memory, event-storage-adapter-postgres but no service in this repo declares a consumer.

Rule id: `EDA-orphan-producer`

- `packages/event-storage-adapter-in-memory/src/adapter.unit.test.ts`

## Orphan consumer — `POKEMON_LEVELED_UP`

**high.** Event 'POKEMON_LEVELED_UP' is consumed by core but no service in this repo declares a producer.

Rule id: `EDA-orphan-consumer`

- `packages/core/src/eventStore/eventStore.fixtures.test.ts`

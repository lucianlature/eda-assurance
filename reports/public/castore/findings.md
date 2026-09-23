# Event-contract scan

Findings: 6 (plus 1 info)

## No deployed fleet pins

**info.** No deployed versions available. Rolling-window compatibility (breaking field removal vs live consumers) was not evaluated. This scan is in-repo topology only.

Rule id: `EDA-INFO-NO-FLEET`

## Orphan consumer — `CAUGHT_BY_TRAINER`

**high.** Event 'CAUGHT_BY_TRAINER' is consumed by pokemons but no service in this repo declares a producer.

Rule id: `EDA-orphan-consumer`

- `demo/blueprint/src/pokemons/eventStore.ts`

## Orphan consumer — `COUNTER_DELETED`

**high.** Event 'COUNTER_DELETED' is consumed by command-json-schema, command-zod, core but no service in this repo declares a producer.

Rule id: `EDA-orphan-consumer`

- `packages/command-json-schema/src/command.fixtures.test.ts`

## Orphan producer — `EVENT_TYPE`

**medium.** Event 'EVENT_TYPE' is published by event-storage-adapter-in-memory, event-storage-adapter-postgres but no service in this repo declares a consumer.

Rule id: `EDA-orphan-producer`

- `packages/event-storage-adapter-in-memory/src/adapter.unit.test.ts`

## Orphan consumer — `POKEMON_APPEARED`

**high.** Event 'POKEMON_APPEARED' is consumed by core but no service in this repo declares a producer.

Rule id: `EDA-orphan-consumer`

- `packages/core/src/eventStore/eventStore.fixtures.test.ts`

## Orphan consumer — `POKEMON_CAUGHT`

**high.** Event 'POKEMON_CAUGHT' is consumed by trainers, core but no service in this repo declares a producer.

Rule id: `EDA-orphan-consumer`

- `demo/blueprint/src/trainers/eventStore.ts`

## Orphan consumer — `POKEMON_LEVELED_UP`

**high.** Event 'POKEMON_LEVELED_UP' is consumed by core but no service in this repo declares a producer.

Rule id: `EDA-orphan-consumer`

- `packages/core/src/eventStore/eventStore.fixtures.test.ts`

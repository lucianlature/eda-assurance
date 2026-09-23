# Event-contract scan

Findings: 13 (plus 1 info)

## No deployed fleet pins

**info.** No deployed versions available. Rolling-window compatibility (breaking field removal vs live consumers) was not evaluated. This scan is in-repo topology only.

Rule id: `EDA-INFO-NO-FLEET`

## Orphan consumer — `CounterDecremented`

**high.** Event 'CounterDecremented' is consumed by esmCompatibility but no service in this repo declares a producer.

Rule id: `EDA-orphan-consumer`

- `src/e2e/esmCompatibility/app/counter.ts`

## Orphan consumer — `CounterIncremented`

**high.** Event 'CounterIncremented' is consumed by esmCompatibility but no service in this repo declares a producer.

Rule id: `EDA-orphan-consumer`

- `src/e2e/esmCompatibility/app/counter.ts`

## Orphan consumer — `CounterSubmitted`

**high.** Event 'CounterSubmitted' is consumed by esmCompatibility but no service in this repo declares a producer.

Rule id: `EDA-orphan-consumer`

- `src/e2e/esmCompatibility/app/counter.ts`

## Orphan producer — `DidSomething`

**medium.** Event 'DidSomething' is published by emmett-postgresql, emmett-sqlite but no service in this repo declares a consumer.

Rule id: `EDA-orphan-producer`

- `src/packages/emmett-postgresql/src/benchmarks/index.ts`

## Orphan producer — `GuestCheckedIn`

**medium.** Event 'GuestCheckedIn' is published by docs, emmett-esdb, emmett-mongodb, emmett-postgresql, emmett-sqlite but no service in this repo declares a consumer.

Rule id: `EDA-orphan-producer`

- `src/docs/guides/consumers/testingConsumers.snippet.ts`

## Orphan producer — `GuestCheckedOut`

**medium.** Event 'GuestCheckedOut' is published by emmett-esdb, emmett-mongodb, emmett-postgresql, emmett-sqlite but no service in this repo declares a consumer.

Rule id: `EDA-orphan-producer`

- `src/packages/emmett/src/workflows/workflow.testHelpers.ts`

## Orphan producer — `ItemAdded`

**medium.** Event 'ItemAdded' is published by emmett but no service in this repo declares a consumer.

Rule id: `EDA-orphan-producer`

- `src/docs/snippets/quickStart/index.ts`

## Orphan producer — `Observed`

**medium.** Event 'Observed' is published by emmett-tests but no service in this repo declares a consumer.

Rule id: `EDA-orphan-producer`

- `src/packages/emmett-tests/src/eventStore/esdb/eventstoreDBEventStore.e2e.spec.ts`

## Orphan producer — `ProductItemAdded`

**medium.** Event 'ProductItemAdded' is published by emmett-esdb, emmett-mongodb, emmett-postgresql, emmett-sqlite but no service in this repo declares a consumer.

Rule id: `EDA-orphan-producer`

- `src/docs/guides/projections/testingProjections.snippet.ts`

## Orphan producer — `ShoppingCartConfirmed`

**medium.** Event 'ShoppingCartConfirmed' is published by emmett-mongodb, emmett-postgresql, emmett-sqlite but no service in this repo declares a consumer.

Rule id: `EDA-orphan-producer`

- `samples/webApi/expressjs-with-esdb/src/shoppingCarts/shoppingCart.ts`

## Orphan producer — `StreamStarted`

**medium.** Event 'StreamStarted' is published by emmett-expressjs, emmett-honojs but no service in this repo declares a consumer.

Rule id: `EDA-orphan-producer`

- `src/packages/emmett-expressjs/src/testing/apiE2ESpecification.int.spec.ts`

## Orphan producer — `test-event`

**medium.** Event 'test-event' is published by emmett-testcontainers but no service in this repo declares a consumer.

Rule id: `EDA-orphan-producer`

- `src/packages/emmett-testcontainers/src/eventStore/eventStoreDBContainer.e2e.spec.ts`

## Orphan producer — `TestEvent`

**medium.** Event 'TestEvent' is published by emmett-sqlite but no service in this repo declares a consumer.

Rule id: `EDA-orphan-producer`

- `src/packages/emmett-postgresql/src/eventStore/schema/readMessagesBatch.int.spec.ts`

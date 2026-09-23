# Event-contract scan

Findings: 22 (plus 1 info)

## No deployed fleet pins

**info.** No deployed versions available. Rolling-window compatibility (breaking field removal vs live consumers) was not evaluated. This scan is in-repo topology only.

Rule id: `EDA-INFO-NO-FLEET`

## Orphan producer — `ANOTHER_EVENT`

**medium.** Event 'ANOTHER_EVENT' is published by tools but no service in this repo declares a consumer.

Rule id: `EDA-orphan-producer`

- `packages/tools/testing-tools/test/aggregate.test.ts`

## Orphan producer — `application`

**medium.** Event 'application' is published by event-broadcast-factory but no service in this repo declares a consumer.

Rule id: `EDA-orphan-producer`

- `packages/runtime/runtimes/runtime-base/src/event-broadcast-factory.ts`

## Orphan producer — `BAD_EVENT`

**medium.** Event 'BAD_EVENT' is published by runtime but no service in this repo declares a consumer.

Rule id: `EDA-orphan-producer`

- `packages/runtime/runtimes/runtime-aws-serverless/test/index.test.ts`

## Orphan producer — `EVENT`

**medium.** Event 'EVENT' is published by core but no service in this repo declares a consumer.

Rule id: `EDA-orphan-producer`

- `packages/core/redux/test/view-model/actions.test.ts`

## Orphan producer — `EVENT_EXTRA`

**medium.** Event 'EVENT_EXTRA' is published by import-export-test but no service in this repo declares a consumer.

Rule id: `EDA-orphan-producer`

- `tests/import-export-sample/import-export.test.ts`

## Orphan producer — `ITEM_CREATED`

**medium.** Event 'ITEM_CREATED' is published by runtime but no service in this repo declares a consumer.

Rule id: `EDA-orphan-producer`

- `packages/runtime/runtimes/runtime-base/test/event-broadcast-factory.test.ts`

## Orphan producer — `LARGE_EVENT`

**medium.** Event 'LARGE_EVENT' is published by index-test but no service in this repo declares a consumer.

Rule id: `EDA-orphan-producer`

- `tests/eventstore-order-events/index.test.ts`

## Orphan producer — `PARALLEL_TYPE`

**medium.** Event 'PARALLEL_TYPE' is published by index-test but no service in this repo declares a consumer.

Rule id: `EDA-orphan-producer`

- `tests/eventstore-parallel-save/index.test.ts`

## Orphan producer — `PARALLEL_TYPE_MIX`

**medium.** Event 'PARALLEL_TYPE_MIX' is published by index-test but no service in this repo declares a consumer.

Rule id: `EDA-orphan-producer`

- `tests/eventstore-parallel-save/index.test.ts`

## Orphan producer — `PARALLEL_TYPE_MIX2`

**medium.** Event 'PARALLEL_TYPE_MIX2' is published by index-test but no service in this repo declares a consumer.

Rule id: `EDA-orphan-producer`

- `tests/eventstore-parallel-save/index.test.ts`

## Orphan producer — `PUSH`

**medium.** Event 'PUSH' is published by tools but no service in this repo declares a consumer.

Rule id: `EDA-orphan-producer`

- `packages/tools/testing-tools/test/read-model.test.ts`

## Orphan producer — `SET`

**medium.** Event 'SET' is published by core, runtime but no service in this repo declares a consumer.

Rule id: `EDA-orphan-producer`

- `packages/core/core/test/get-aggregates-interop-builder.unit.test.ts`

## Orphan producer — `SMALL_EVENT`

**medium.** Event 'SMALL_EVENT' is published by index-test but no service in this repo declares a consumer.

Rule id: `EDA-orphan-producer`

- `tests/eventstore-order-events/index.test.ts`

## Orphan producer — `SOME_EVENT`

**medium.** Event 'SOME_EVENT' is published by core but no service in this repo declares a consumer.

Rule id: `EDA-orphan-producer`

- `packages/core/core/test/get-aggregates-interop-builder.unit.test.ts`

## Orphan producer — `TEST`

**medium.** Event 'TEST' is published by tools but no service in this repo declares a consumer.

Rule id: `EDA-orphan-producer`

- `packages/tools/testing-tools/test/read-model.test.ts`

## Orphan producer — `TEST_COMMAND_EXECUTED`

**medium.** Event 'TEST_COMMAND_EXECUTED' is published by tools but no service in this repo declares a consumer.

Rule id: `EDA-orphan-producer`

- `packages/tools/testing-tools/test/aggregate.test.ts`

## Orphan producer — `TEST1`

**medium.** Event 'TEST1' is published by tools but no service in this repo declares a consumer.

Rule id: `EDA-orphan-producer`

- `packages/tools/testing-tools/test/read-model.test.ts`

## Orphan producer — `TEST2`

**medium.** Event 'TEST2' is published by tools but no service in this repo declares a consumer.

Rule id: `EDA-orphan-producer`

- `packages/tools/testing-tools/test/read-model.test.ts`

## Orphan producer — `TEST3`

**medium.** Event 'TEST3' is published by tools but no service in this repo declares a consumer.

Rule id: `EDA-orphan-producer`

- `packages/tools/testing-tools/test/read-model.test.ts`

## Orphan producer — `TYPE_1`

**medium.** Event 'TYPE_1' is published by index-test but no service in this repo declares a consumer.

Rule id: `EDA-orphan-producer`

- `tests/eventstore-save-load/index.test.ts`

## Orphan producer — `TYPE_2`

**medium.** Event 'TYPE_2' is published by index-test but no service in this repo declares a consumer.

Rule id: `EDA-orphan-producer`

- `tests/eventstore-save-load/index.test.ts`

## Orphan producer — `USER_CREATED`

**medium.** Event 'USER_CREATED' is published by core but no service in this repo declares a consumer.

Rule id: `EDA-orphan-producer`

- `packages/core/core/test/get-aggregates-interop-builder.unit.test.ts`

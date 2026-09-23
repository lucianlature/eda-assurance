# Event-contract scan

Findings: 5 (plus 1 info)

## No deployed fleet pins

**info.** No deployed versions available. Rolling-window compatibility (breaking field removal vs live consumers) was not evaluated. This scan is in-repo topology only.

Rule id: `EDA-INFO-NO-FLEET`

## Orphan consumer — `FelinesController_journal`

**high.** Event 'FelinesController_journal' is consumed by feline but no service in this repo declares a producer.

Rule id: `EDA-orphan-consumer`

- `misc/references/ref.json`
- `misc/references/ref.yaml`

## Orphan producer — `FelinesGateway_createFeline`

**medium.** Event 'FelinesGateway_createFeline' is published by feline but no service in this repo declares a consumer.

Rule id: `EDA-orphan-producer`

- `misc/references/ref.json`
- `misc/references/ref.yaml`

## Orphan consumer — `ms/create/feline`

**high.** Event 'ms/create/feline' is consumed by felines-controller but no service in this repo declares a producer.

Rule id: `EDA-orphan-consumer`

- `sample/felines/felines.controller.ts`

## Orphan consumer — `oneOf_demo_1`

**high.** Event 'oneOf_demo_1' is consumed by feline but no service in this repo declares a producer.

Rule id: `EDA-orphan-consumer`

- `misc/references/ref.json`
- `misc/references/ref.yaml`

## Orphan consumer — `oneOf_demo_2`

**high.** Event 'oneOf_demo_2' is consumed by feline but no service in this repo declares a producer.

Rule id: `EDA-orphan-consumer`

- `misc/references/ref.json`
- `misc/references/ref.yaml`

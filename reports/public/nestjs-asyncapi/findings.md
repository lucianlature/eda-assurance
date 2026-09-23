# Event-contract scan

Findings: 5 (plus 1 info)

## EDA-INFO-NO-FLEET

**info.** No deployed versions available. Rolling-window compatibility (EDA-004) was not evaluated. This scan is in-repo topology only.

## EDA-orphan-consumer — `FelinesController_journal`

**high.** Event 'FelinesController_journal' is consumed by feline but no service in this repo declares a producer.

- `misc/references/ref.json`
- `misc/references/ref.yaml`

## EDA-orphan-producer — `FelinesGateway_createFeline`

**medium.** Event 'FelinesGateway_createFeline' is published by feline but no service in this repo declares a consumer.

- `misc/references/ref.json`
- `misc/references/ref.yaml`

## EDA-orphan-consumer — `ms/create/feline`

**high.** Event 'ms/create/feline' is consumed by felines-controller but no service in this repo declares a producer.

- `sample/felines/felines.controller.ts`

## EDA-orphan-consumer — `oneOf_demo_1`

**high.** Event 'oneOf_demo_1' is consumed by feline but no service in this repo declares a producer.

- `misc/references/ref.json`
- `misc/references/ref.yaml`

## EDA-orphan-consumer — `oneOf_demo_2`

**high.** Event 'oneOf_demo_2' is consumed by feline but no service in this repo declares a producer.

- `misc/references/ref.json`
- `misc/references/ref.yaml`

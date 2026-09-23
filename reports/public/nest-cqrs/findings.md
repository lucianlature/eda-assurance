# Event-contract scan

Findings: 4 (plus 1 info)

## EDA-INFO-NO-FLEET

**info.** No deployed versions available. Rolling-window compatibility (EDA-004) was not evaluated. This scan is in-repo topology only.

## EDA-orphan-consumer — `OrderCreatedEvent`

**high.** Event 'OrderCreatedEvent' is consumed by orders but no service in this repo declares a producer.

- `src/orders/events/impl/order-created.event.ts`

## EDA-orphan-consumer — `OrderDeletedEvent`

**high.** Event 'OrderDeletedEvent' is consumed by orders but no service in this repo declares a producer.

- `src/orders/events/impl/order-deleted.event.ts`

## EDA-orphan-consumer — `OrderFoundEvent`

**high.** Event 'OrderFoundEvent' is consumed by orders but no service in this repo declares a producer.

- `src/orders/events/impl/order-found.event.ts`

## EDA-orphan-consumer — `OrderUpdatedEvent`

**high.** Event 'OrderUpdatedEvent' is consumed by orders but no service in this repo declares a producer.

- `src/orders/events/impl/order-updated.event.ts`

# Event-contract scan

Findings: 4 (plus 1 info)

## No deployed fleet pins

**info.** No deployed versions available. Rolling-window compatibility (breaking field removal vs live consumers) was not evaluated. This scan is in-repo topology only.

Rule id: `EDA-INFO-NO-FLEET`

## Orphan consumer — `OrderCreatedEvent`

**high.** Event 'OrderCreatedEvent' is consumed by orders but no service in this repo declares a producer.

Rule id: `EDA-orphan-consumer`

- `src/orders/events/impl/order-created.event.ts`

## Orphan consumer — `OrderDeletedEvent`

**high.** Event 'OrderDeletedEvent' is consumed by orders but no service in this repo declares a producer.

Rule id: `EDA-orphan-consumer`

- `src/orders/events/impl/order-deleted.event.ts`

## Orphan consumer — `OrderFoundEvent`

**high.** Event 'OrderFoundEvent' is consumed by orders but no service in this repo declares a producer.

Rule id: `EDA-orphan-consumer`

- `src/orders/events/impl/order-found.event.ts`

## Orphan consumer — `OrderUpdatedEvent`

**high.** Event 'OrderUpdatedEvent' is consumed by orders but no service in this repo declares a producer.

Rule id: `EDA-orphan-consumer`

- `src/orders/events/impl/order-updated.event.ts`

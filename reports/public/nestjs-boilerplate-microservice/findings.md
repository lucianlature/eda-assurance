# Event-contract scan

Findings: 4 (plus 1 info)

## No deployed fleet pins

**info.** No deployed versions available. Rolling-window compatibility (breaking field removal vs live consumers) was not evaluated. This scan is in-repo topology only.

Rule id: `EDA-INFO-NO-FLEET`

## Orphan consumer — `UserCreatedEvent`

**high.** Event 'UserCreatedEvent' is consumed by users but no service in this repo declares a producer.

Rule id: `EDA-orphan-consumer`

- `src/modules/users/events/handlers/user-created.handler.ts`

## Orphan consumer — `UserDeletedEvent`

**high.** Event 'UserDeletedEvent' is consumed by users but no service in this repo declares a producer.

Rule id: `EDA-orphan-consumer`

- `src/modules/users/events/handlers/user-deleted.handler.ts`

## Orphan consumer — `UserUpdatedEvent`

**high.** Event 'UserUpdatedEvent' is consumed by users but no service in this repo declares a producer.

Rule id: `EDA-orphan-consumer`

- `src/modules/users/events/handlers/user-updated.handler.ts`

## Orphan consumer — `UserWelcomedEvent`

**high.** Event 'UserWelcomedEvent' is consumed by users but no service in this repo declares a producer.

Rule id: `EDA-orphan-consumer`

- `src/modules/users/events/handlers/user-welcomed.handler.ts`

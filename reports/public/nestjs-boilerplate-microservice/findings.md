# Event-contract scan

Findings: 4 (plus 1 info)

## EDA-INFO-NO-FLEET

**info.** No deployed versions available. Rolling-window compatibility (EDA-004) was not evaluated. This scan is in-repo topology only.

## EDA-orphan-consumer — `UserCreatedEvent`

**high.** Event 'UserCreatedEvent' is consumed by users but no service in this repo declares a producer.

- `src/modules/users/events/handlers/user-created.handler.ts`

## EDA-orphan-consumer — `UserDeletedEvent`

**high.** Event 'UserDeletedEvent' is consumed by users but no service in this repo declares a producer.

- `src/modules/users/events/handlers/user-deleted.handler.ts`

## EDA-orphan-consumer — `UserUpdatedEvent`

**high.** Event 'UserUpdatedEvent' is consumed by users but no service in this repo declares a producer.

- `src/modules/users/events/handlers/user-updated.handler.ts`

## EDA-orphan-consumer — `UserWelcomedEvent`

**high.** Event 'UserWelcomedEvent' is consumed by users but no service in this repo declares a producer.

- `src/modules/users/events/handlers/user-welcomed.handler.ts`

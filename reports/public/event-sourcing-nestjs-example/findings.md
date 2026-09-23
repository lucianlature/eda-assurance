# Event-contract scan

Findings: 1 (plus 1 info)

## EDA-INFO-NO-FLEET

**info.** No deployed versions available. Rolling-window compatibility (EDA-004) was not evaluated. This scan is in-repo topology only.

## EDA-orphan-consumer — `UserCreatedEvent`

**high.** Event 'UserCreatedEvent' is consumed by users but no service in this repo declares a producer.

- `src/users/events/handlers/user-created.handler.ts`

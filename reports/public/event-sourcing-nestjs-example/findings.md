# Event-contract scan

Findings: 1 (plus 1 info)

## No deployed fleet pins

**info.** No deployed versions available. Rolling-window compatibility (breaking field removal vs live consumers) was not evaluated. This scan is in-repo topology only.

Rule id: `EDA-INFO-NO-FLEET`

## Orphan consumer — `UserCreatedEvent`

**high.** Event 'UserCreatedEvent' is consumed by users but no service in this repo declares a producer.

Rule id: `EDA-orphan-consumer`

- `src/users/events/handlers/user-created.handler.ts`

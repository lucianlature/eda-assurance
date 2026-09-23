# Event-contract scan

Findings: 1 (plus 1 info)

## EDA-INFO-NO-FLEET

**info.** No deployed versions available. Rolling-window compatibility (EDA-004) was not evaluated. This scan is in-repo topology only.

## EDA-orphan-consumer — `notifications.send`

**high.** Event 'notifications.send' is consumed by infra but no service in this repo declares a producer.

- `src/infra/messaging/kafka/controllers/notifications.controller.ts`

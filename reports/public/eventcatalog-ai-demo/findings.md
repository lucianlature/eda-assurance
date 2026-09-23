# Event-contract scan

Findings: 2 (plus 1 info)

## No deployed fleet pins

**info.** No deployed versions available. Rolling-window compatibility (breaking field removal vs live consumers) was not evaluated. This scan is in-repo topology only.

Rule id: `EDA-INFO-NO-FLEET`

## Orphan producer — `OrderConfirmed`

**medium.** Event 'OrderConfirmed' is published by order-service but no service in this repo declares a consumer.

Rule id: `EDA-orphan-producer`

- `domains/Orders/services/OrdersService/order-service-asyncapi.yaml`
- `domains/Orders/services/OrdersService/versioned/0.0.2/order-service-asyncapi.yaml`

## Orphan producer — `OrderPlaced`

**medium.** Event 'OrderPlaced' is published by order-service but no service in this repo declares a consumer.

Rule id: `EDA-orphan-producer`

- `domains/Orders/services/OrdersService/order-service-asyncapi.yaml`
- `domains/Orders/services/OrdersService/versioned/0.0.2/order-service-asyncapi.yaml`

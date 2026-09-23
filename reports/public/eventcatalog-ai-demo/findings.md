# Event-contract scan

Findings: 2 (plus 1 info)

## EDA-INFO-NO-FLEET

**info.** No deployed versions available. Rolling-window compatibility (EDA-004) was not evaluated. This scan is in-repo topology only.

## EDA-orphan-producer — `OrderConfirmed`

**medium.** Event 'OrderConfirmed' is published by order-service but no service in this repo declares a consumer.

- `domains/Orders/services/OrdersService/order-service-asyncapi.yaml`
- `domains/Orders/services/OrdersService/versioned/0.0.2/order-service-asyncapi.yaml`

## EDA-orphan-producer — `OrderPlaced`

**medium.** Event 'OrderPlaced' is published by order-service but no service in this repo declares a consumer.

- `domains/Orders/services/OrdersService/order-service-asyncapi.yaml`
- `domains/Orders/services/OrdersService/versioned/0.0.2/order-service-asyncapi.yaml`

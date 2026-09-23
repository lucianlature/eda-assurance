# Event-contract scan

Findings: 64 (plus 1 info)

## No deployed fleet pins

**info.** No deployed versions available. Rolling-window compatibility (breaking field removal vs live consumers) was not evaluated. This scan is in-repo topology only.

Rule id: `EDA-INFO-NO-FLEET`

## Orphan consumer — `CancelOrder`

**high.** Event 'CancelOrder' is consumed by order-service but no service in this repo declares a producer.

Rule id: `EDA-orphan-consumer`

- `examples/default/domains/Ordering/systems/order-management-system/services/OrderService/asyncapi.yml`
- `packages/create-eventcatalog/templates/default/domains/Ordering/systems/order-management-system/services/OrderService/asyncapi.yml`

## Orphan producer — `cart-checked-out`

**medium.** Event 'cart-checked-out' is published by cart-api but no service in this repo declares a consumer.

Rule id: `EDA-orphan-producer`

- `examples/default/domains/Shopping/systems/cart-system/services/CartAPI/events/CartCheckedOut/index.mdx`
- `packages/create-eventcatalog/templates/default/domains/Shopping/systems/cart-system/services/CartAPI/events/CartCheckedOut/index.mdx`

## Orphan consumer — `CreateOrder`

**high.** Event 'CreateOrder' is consumed by order-service but no service in this repo declares a producer.

Rule id: `EDA-orphan-consumer`

- `examples/default/domains/Ordering/systems/order-management-system/services/OrderService/asyncapi.yml`
- `packages/create-eventcatalog/templates/default/domains/Ordering/systems/order-management-system/services/OrderService/asyncapi.yml`

## Orphan producer — `customer-authenticated`

**medium.** Event 'customer-authenticated' is published by oauth-api but no service in this repo declares a consumer.

Rule id: `EDA-orphan-producer`

- `examples/default/domains/Customer/systems/identity-provider/services/OAuthAPI/events/CustomerAuthenticated/index.mdx`
- `packages/create-eventcatalog/templates/default/domains/Customer/systems/identity-provider/services/OAuthAPI/events/CustomerAuthenticated/index.mdx`

## Orphan producer — `customer-registered`

**medium.** Event 'customer-registered' is published by customer-api but no service in this repo declares a consumer.

Rule id: `EDA-orphan-producer`

- `examples/default/domains/Customer/systems/customer-management-system/services/CustomerAPI/events/CustomerRegistered/index.mdx`
- `packages/create-eventcatalog/templates/default/domains/Customer/systems/customer-management-system/services/CustomerAPI/events/CustomerRegistered/index.mdx`

## Orphan producer — `customer-updated`

**medium.** Event 'customer-updated' is published by customer-api but no service in this repo declares a consumer.

Rule id: `EDA-orphan-producer`

- `examples/default/domains/Customer/systems/customer-management-system/services/CustomerAPI/events/CustomerUpdated/index.mdx`
- `packages/create-eventcatalog/templates/default/domains/Customer/systems/customer-management-system/services/CustomerAPI/events/CustomerUpdated/index.mdx`

## Orphan producer — `DeliveryFailed`

**medium.** Event 'DeliveryFailed' is published by ShippingService but no service in this repo declares a consumer.

Rule id: `EDA-orphan-producer`

- `packages/sdk/src/test/catalog-eventcatalog/domains/Orders/services/ShippingService/events/DeliveryFailed/index.mdx`

## Orphan producer — `discount-calculated`

**medium.** Event 'discount-calculated' is published by promotion-service but no service in this repo declares a consumer.

Rule id: `EDA-orphan-producer`

- `examples/default/domains/Shopping/systems/promotion-system/services/PromotionService/events/DiscountCalculated/index.mdx`
- `packages/create-eventcatalog/templates/default/domains/Shopping/systems/promotion-system/services/PromotionService/events/DiscountCalculated/index.mdx`

## Orphan producer — `fraud-check-failed`

**medium.** Event 'fraud-check-failed' is published by fraud-api but no service in this repo declares a consumer.

Rule id: `EDA-orphan-producer`

- `examples/default/domains/Payments/systems/fraud-detection/services/FraudAPI/events/FraudCheckFailed/index.mdx`
- `packages/create-eventcatalog/templates/default/domains/Payments/systems/fraud-detection/services/FraudAPI/events/FraudCheckFailed/index.mdx`

## Orphan producer — `fraud-check-passed`

**medium.** Event 'fraud-check-passed' is published by fraud-api but no service in this repo declares a consumer.

Rule id: `EDA-orphan-producer`

- `examples/default/domains/Payments/systems/fraud-detection/services/FraudAPI/events/FraudCheckPassed/index.mdx`
- `packages/create-eventcatalog/templates/default/domains/Payments/systems/fraud-detection/services/FraudAPI/events/FraudCheckPassed/index.mdx`

## Orphan producer — `inventory-reserved`

**medium.** Event 'inventory-reserved' is published by inventory-service but no service in this repo declares a consumer.

Rule id: `EDA-orphan-producer`

- `examples/default/domains/Fulfilment/systems/inventory-system/services/InventoryService/events/InventoryReserved/index.mdx`
- `packages/create-eventcatalog/templates/default/domains/Fulfilment/systems/inventory-system/services/InventoryService/events/InventoryReserved/index.mdx`

## Orphan producer — `inventory-unavailable`

**medium.** Event 'inventory-unavailable' is published by inventory-service but no service in this repo declares a consumer.

Rule id: `EDA-orphan-producer`

- `examples/default/domains/Fulfilment/systems/inventory-system/services/InventoryService/events/InventoryUnavailable/index.mdx`
- `packages/create-eventcatalog/templates/default/domains/Fulfilment/systems/inventory-system/services/InventoryService/events/InventoryUnavailable/index.mdx`

## Orphan consumer — `InventoryReserved`

**high.** Event 'InventoryReserved' is consumed by orders-service but no service in this repo declares a producer.

Rule id: `EDA-orphan-consumer`

- `packages/create-eventcatalog/templates/asyncapi/asyncapi-files/orders-service.yml`

## Orphan producer — `MultiChannelMessage`

**medium.** Event 'MultiChannelMessage' is published by InventoryService but no service in this repo declares a consumer.

Rule id: `EDA-orphan-producer`

- `packages/core/src/__tests__/migrations/catalog/events/MultiChannelMessage/index.mdx`
- `packages/core/src/__tests__/migrations/message-channels-examples/events/MultiChannelMessage/index.mdx`

## Orphan producer — `order-amended`

**medium.** Event 'order-amended' is published by order-service but no service in this repo declares a consumer.

Rule id: `EDA-orphan-producer`

- `examples/default/domains/Ordering/systems/order-management-system/services/OrderService/events/OrderAmended/index.mdx`

## Orphan producer — `order-archived`

**medium.** Event 'order-archived' is published by order-service but no service in this repo declares a consumer.

Rule id: `EDA-orphan-producer`

- `examples/default/domains/Ordering/systems/order-management-system/services/OrderService/events/OrderArchived/index.mdx`

## Orphan producer — `order-cancelled`

**medium.** Event 'order-cancelled' is published by order-service but no service in this repo declares a consumer.

Rule id: `EDA-orphan-producer`

- `examples/default/domains/Ordering/systems/order-management-system/services/OrderService/events/OrderCancelled/index.mdx`
- `packages/create-eventcatalog/templates/default/domains/Ordering/systems/order-management-system/services/OrderService/events/OrderCancelled/index.mdx`

## Orphan producer — `order-confirmed`

**medium.** Event 'order-confirmed' is published by order-service but no service in this repo declares a consumer.

Rule id: `EDA-orphan-producer`

- `examples/default/domains/Ordering/systems/order-management-system/services/OrderService/events/OrderConfirmed/index.mdx`

## Orphan producer — `order-created`

**medium.** Event 'order-created' is published by order-service but no service in this repo declares a consumer.

Rule id: `EDA-orphan-producer`

- `examples/default/domains/Ordering/systems/order-management-system/services/OrderService/events/OrderCreated/index.mdx`
- `examples/ssr/events/OrderCreated/index.mdx`
- `packages/create-eventcatalog/templates/default/domains/Ordering/systems/order-management-system/services/OrderService/events/OrderCreated/index.mdx`

## Orphan producer — `order-delivery-address-changed`

**medium.** Event 'order-delivery-address-changed' is published by order-service but no service in this repo declares a consumer.

Rule id: `EDA-orphan-producer`

- `examples/default/domains/Ordering/systems/order-management-system/services/OrderService/events/OrderDeliveryAddressChanged/index.mdx`

## Orphan producer — `order-fulfilment-started`

**medium.** Event 'order-fulfilment-started' is published by order-service but no service in this repo declares a consumer.

Rule id: `EDA-orphan-producer`

- `examples/default/domains/Ordering/systems/order-management-system/services/OrderService/events/OrderFulfilmentStarted/index.mdx`

## Orphan producer — `order-hold-released`

**medium.** Event 'order-hold-released' is published by order-service but no service in this repo declares a consumer.

Rule id: `EDA-orphan-producer`

- `examples/default/domains/Ordering/systems/order-management-system/services/OrderService/events/OrderHoldReleased/index.mdx`

## Orphan producer — `order-packed`

**medium.** Event 'order-packed' is published by picking-worker but no service in this repo declares a consumer.

Rule id: `EDA-orphan-producer`

- `examples/default/domains/Fulfilment/systems/warehouse-system/services/PickingWorker/events/OrderPacked/index.mdx`
- `packages/create-eventcatalog/templates/default/domains/Fulfilment/systems/warehouse-system/services/PickingWorker/events/OrderPacked/index.mdx`

## Orphan producer — `order-placed-on-hold`

**medium.** Event 'order-placed-on-hold' is published by order-service but no service in this repo declares a consumer.

Rule id: `EDA-orphan-producer`

- `examples/default/domains/Ordering/systems/order-management-system/services/OrderService/events/OrderPlacedOnHold/index.mdx`

## Orphan producer — `order-status-changed`

**medium.** Event 'order-status-changed' is published by order-service but no service in this repo declares a consumer.

Rule id: `EDA-orphan-producer`

- `examples/default/domains/Ordering/systems/order-management-system/services/OrderService/events/OrderStatusChanged/index.mdx`

## Orphan producer — `OrderArchived`

**medium.** Event 'OrderArchived' is published by order-service but no service in this repo declares a consumer.

Rule id: `EDA-orphan-producer`

- `examples/default/domains/Ordering/systems/order-management-system/services/OrderService/asyncapi.yml`

## Orphan producer — `OrderCancelled`

**medium.** Event 'OrderCancelled' is published by OrdersService, order-service, orders-service but no service in this repo declares a consumer.

Rule id: `EDA-orphan-producer`

- `packages/sdk/src/test/catalog-eventcatalog/domains/Orders/services/OrdersService/events/OrderCancelled/index.mdx`
- `examples/default/domains/Ordering/systems/order-management-system/services/OrderService/asyncapi.yml`
- `packages/create-eventcatalog/templates/asyncapi/asyncapi-files/orders-service.yml`
- `packages/create-eventcatalog/templates/default/domains/Ordering/systems/order-management-system/services/OrderService/asyncapi.yml`

## Orphan producer — `OrderCompleted`

**medium.** Event 'OrderCompleted' is published by order-service, orders-service but no service in this repo declares a consumer.

Rule id: `EDA-orphan-producer`

- `examples/default/domains/Ordering/systems/order-management-system/services/OrderService/asyncapi.yml`
- `packages/create-eventcatalog/templates/asyncapi/asyncapi-files/orders-service.yml`
- `packages/create-eventcatalog/templates/default/domains/Ordering/systems/order-management-system/services/OrderService/asyncapi.yml`

## Orphan producer — `OrderCreated`

**medium.** Event 'OrderCreated' is published by order-service, orders-service but no service in this repo declares a consumer.

Rule id: `EDA-orphan-producer`

- `examples/default/domains/Ordering/systems/order-management-system/services/OrderService/asyncapi.yml`
- `packages/create-eventcatalog/templates/asyncapi/asyncapi-files/orders-service.yml`
- `packages/create-eventcatalog/templates/default/domains/Ordering/systems/order-management-system/services/OrderService/asyncapi.yml`

## Orphan producer — `OrderDeliveryAddressChanged`

**medium.** Event 'OrderDeliveryAddressChanged' is published by order-service but no service in this repo declares a consumer.

Rule id: `EDA-orphan-producer`

- `examples/default/domains/Ordering/systems/order-management-system/services/OrderService/asyncapi.yml`

## Orphan producer — `OrderFulfilmentStarted`

**medium.** Event 'OrderFulfilmentStarted' is published by order-service but no service in this repo declares a consumer.

Rule id: `EDA-orphan-producer`

- `examples/default/domains/Ordering/systems/order-management-system/services/OrderService/asyncapi.yml`

## Orphan producer — `OrderHoldReleased`

**medium.** Event 'OrderHoldReleased' is published by order-service but no service in this repo declares a consumer.

Rule id: `EDA-orphan-producer`

- `examples/default/domains/Ordering/systems/order-management-system/services/OrderService/asyncapi.yml`

## Orphan producer — `OrderPlaced`

**medium.** Event 'OrderPlaced' is published by order-service but no service in this repo declares a consumer.

Rule id: `EDA-orphan-producer`

- `packages/sdk/src/test/catalog-eventcatalog/domains/Orders/services/OrdersService/order-service-asyncapi.yaml`
- `packages/sdk/src/test/catalog-eventcatalog/domains/Orders/services/OrdersService/versioned/0.0.2/order-service-asyncapi.yaml`

## Orphan producer — `OrderPlacedOnHold`

**medium.** Event 'OrderPlacedOnHold' is published by order-service but no service in this repo declares a consumer.

Rule id: `EDA-orphan-producer`

- `examples/default/domains/Ordering/systems/order-management-system/services/OrderService/asyncapi.yml`

## Orphan producer — `OrderStatusChanged`

**medium.** Event 'OrderStatusChanged' is published by order-service but no service in this repo declares a consumer.

Rule id: `EDA-orphan-producer`

- `examples/default/domains/Ordering/systems/order-management-system/services/OrderService/asyncapi.yml`

## Orphan producer — `OrderUpdated`

**medium.** Event 'OrderUpdated' is published by orders-service but no service in this repo declares a consumer.

Rule id: `EDA-orphan-producer`

- `packages/create-eventcatalog/templates/asyncapi/asyncapi-files/orders-service.yml`

## Orphan producer — `OutOfStock`

**medium.** Event 'OutOfStock' is published by InventoryService, NotificationService but no service in this repo declares a consumer.

Rule id: `EDA-orphan-producer`

- `packages/sdk/src/test/catalog-eventcatalog/domains/Orders/services/InventoryService/events/OutOfStock/index.mdx`

## Orphan producer — `PaymentConfirmed`

**medium.** Event 'PaymentConfirmed' is published by payments-service but no service in this repo declares a consumer.

Rule id: `EDA-orphan-producer`

- `packages/create-eventcatalog/templates/asyncapi/asyncapi-files/payment-service.yml`

## Orphan producer — `PaymentFailed`

**medium.** Event 'PaymentFailed' is published by payments-service but no service in this repo declares a consumer.

Rule id: `EDA-orphan-producer`

- `packages/create-eventcatalog/templates/asyncapi/asyncapi-files/payment-service.yml`

## Orphan producer — `PaymentInitiated`

**medium.** Event 'PaymentInitiated' is published by payments-service but no service in this repo declares a consumer.

Rule id: `EDA-orphan-producer`

- `packages/create-eventcatalog/templates/asyncapi/asyncapi-files/payment-service.yml`

## Orphan consumer — `PaymentProcessed`

**high.** Event 'PaymentProcessed' is consumed by NotificationService, ShippingService, orders-service but no service in this repo declares a producer.

Rule id: `EDA-orphan-consumer`

- `packages/create-eventcatalog/templates/asyncapi/asyncapi-files/orders-service.yml`

## Orphan producer — `rating-updated`

**medium.** Event 'rating-updated' is published by rating-aggregator but no service in this repo declares a consumer.

Rule id: `EDA-orphan-producer`

- `examples/default/domains/Reviews/services/RatingAggregator/events/rating-updated/index.mdx`
- `packages/create-eventcatalog/templates/default/domains/Reviews/services/RatingAggregator/events/rating-updated/index.mdx`

## Orphan producer — `refund-processed`

**medium.** Event 'refund-processed' is published by stripe-webhook-endpoint but no service in this repo declares a consumer.

Rule id: `EDA-orphan-producer`

- `examples/default/domains/Payments/systems/stripe/services/StripeWebhookEndpoint/events/RefundProcessed/index.mdx`
- `packages/create-eventcatalog/templates/default/domains/Payments/systems/stripe/services/StripeWebhookEndpoint/events/RefundProcessed/index.mdx`

## Orphan producer — `RefundCompleted`

**medium.** Event 'RefundCompleted' is published by payments-service but no service in this repo declares a consumer.

Rule id: `EDA-orphan-producer`

- `packages/create-eventcatalog/templates/asyncapi/asyncapi-files/payment-service.yml`

## Orphan producer — `RefundInitiated`

**medium.** Event 'RefundInitiated' is published by payments-service but no service in this repo declares a consumer.

Rule id: `EDA-orphan-producer`

- `packages/create-eventcatalog/templates/asyncapi/asyncapi-files/payment-service.yml`

## Orphan producer — `ReturnInitiated`

**medium.** Event 'ReturnInitiated' is published by ShippingService but no service in this repo declares a consumer.

Rule id: `EDA-orphan-producer`

- `packages/sdk/src/test/catalog-eventcatalog/domains/Orders/services/ShippingService/events/ReturnInitiated/index.mdx`

## Orphan producer — `review-helpful-voted`

**medium.** Event 'review-helpful-voted' is published by review-api but no service in this repo declares a consumer.

Rule id: `EDA-orphan-producer`

- `examples/default/domains/Reviews/services/ReviewAPI/events/review-helpful-voted/index.mdx`
- `packages/create-eventcatalog/templates/default/domains/Reviews/services/ReviewAPI/events/review-helpful-voted/index.mdx`

## Orphan producer — `review-rejected`

**medium.** Event 'review-rejected' is published by review-moderation-worker but no service in this repo declares a consumer.

Rule id: `EDA-orphan-producer`

- `examples/default/domains/Reviews/services/ReviewModerationWorker/events/review-rejected/index.mdx`
- `packages/create-eventcatalog/templates/default/domains/Reviews/services/ReviewModerationWorker/events/review-rejected/index.mdx`

## Orphan consumer — `ReviewFlagged`

**high.** Event 'ReviewFlagged' is consumed by review-moderation-worker but no service in this repo declares a producer.

Rule id: `EDA-orphan-consumer`

- `examples/default/domains/Reviews/asyncapi.yml`
- `packages/create-eventcatalog/templates/default/domains/Reviews/asyncapi.yml`

## Orphan producer — `ReviewPublished`

**medium.** Event 'ReviewPublished' is published by review-moderation-worker but no service in this repo declares a consumer.

Rule id: `EDA-orphan-producer`

- `examples/default/domains/Reviews/asyncapi.yml`
- `packages/create-eventcatalog/templates/default/domains/Reviews/asyncapi.yml`

## Orphan producer — `ReviewRejected`

**medium.** Event 'ReviewRejected' is published by review-moderation-worker but no service in this repo declares a consumer.

Rule id: `EDA-orphan-producer`

- `examples/default/domains/Reviews/asyncapi.yml`
- `packages/create-eventcatalog/templates/default/domains/Reviews/asyncapi.yml`

## Orphan consumer — `ReviewSubmitted`

**high.** Event 'ReviewSubmitted' is consumed by review-moderation-worker but no service in this repo declares a producer.

Rule id: `EDA-orphan-consumer`

- `examples/default/domains/Reviews/asyncapi.yml`
- `packages/create-eventcatalog/templates/default/domains/Reviews/asyncapi.yml`

## Orphan producer — `shipment-created`

**medium.** Event 'shipment-created' is published by carrier-tracking-api but no service in this repo declares a consumer.

Rule id: `EDA-orphan-producer`

- `examples/default/domains/Fulfilment/systems/carrier/services/CarrierTrackingAPI/events/ShipmentCreated/index.mdx`
- `packages/create-eventcatalog/templates/default/domains/Fulfilment/systems/carrier/services/CarrierTrackingAPI/events/ShipmentCreated/index.mdx`

## Orphan producer — `shipment-delivered`

**medium.** Event 'shipment-delivered' is published by carrier-tracking-api but no service in this repo declares a consumer.

Rule id: `EDA-orphan-producer`

- `examples/default/domains/Fulfilment/systems/carrier/services/CarrierTrackingAPI/events/ShipmentDelivered/index.mdx`
- `packages/create-eventcatalog/templates/default/domains/Fulfilment/systems/carrier/services/CarrierTrackingAPI/events/ShipmentDelivered/index.mdx`

## Orphan consumer — `shipment-dispatched`

**high.** Event 'shipment-dispatched' is consumed by fulfilment-service but no service in this repo declares a producer.

Rule id: `EDA-orphan-consumer`

- `examples/federation/team-fulfilment/catalog/services/fulfilment-service/index.mdx`

## Orphan producer — `shipment-failed`

**medium.** Event 'shipment-failed' is published by carrier-tracking-api but no service in this repo declares a consumer.

Rule id: `EDA-orphan-producer`

- `examples/default/domains/Fulfilment/systems/carrier/services/CarrierTrackingAPI/events/ShipmentFailed/index.mdx`
- `packages/create-eventcatalog/templates/default/domains/Fulfilment/systems/carrier/services/CarrierTrackingAPI/events/ShipmentFailed/index.mdx`

## Orphan producer — `ShipmentCreated`

**medium.** Event 'ShipmentCreated' is published by ShippingService but no service in this repo declares a consumer.

Rule id: `EDA-orphan-producer`

- `packages/sdk/src/test/catalog-eventcatalog/domains/Orders/services/ShippingService/events/ShipmentCreated/index.mdx`

## Orphan producer — `ShipmentDispatched`

**medium.** Event 'ShipmentDispatched' is published by ShippingService but no service in this repo declares a consumer.

Rule id: `EDA-orphan-producer`

- `packages/sdk/src/test/catalog-eventcatalog/domains/Orders/services/ShippingService/events/ShipmentDispatched/index.mdx`

## Orphan producer — `ShipmentInTransit`

**medium.** Event 'ShipmentInTransit' is published by ShippingService but no service in this repo declares a consumer.

Rule id: `EDA-orphan-producer`

- `packages/sdk/src/test/catalog-eventcatalog/domains/Orders/services/ShippingService/events/ShipmentInTransit/index.mdx`

## Orphan consumer — `Test message`

**high.** Event 'Test message' is consumed by test-asyncapi but no service in this repo declares a producer.

Rule id: `EDA-orphan-consumer`

- `packages/core/eventcatalog/src/__tests__/api/schemas/test-asyncapi.yml`

## Orphan consumer — `TransactionVerified`

**high.** Event 'TransactionVerified' is consumed by payments-service but no service in this repo declares a producer.

Rule id: `EDA-orphan-consumer`

- `packages/create-eventcatalog/templates/asyncapi/asyncapi-files/payment-service.yml`

## Orphan producer — `UserSignedUp`

**medium.** Event 'UserSignedUp' is published by account-service but no service in this repo declares a consumer.

Rule id: `EDA-orphan-producer`

- `packages/core/eventcatalog/src/utils/__tests__/collections/fake-catalog/events/OrderAmended/asyncapi.yml`
- `packages/core/eventcatalog/src/utils/__tests__/collections/fake-catalog/events/OrderAmended/versioned/0.0.1/asyncapi.yml`
- `packages/core/src/__tests__/example-catalog/domains/Payment/asyncapi.yml`
- `packages/core/src/__tests__/example-catalog/domains/Payment/services/ExternalPaymentService/asyncapi.yml`
- `packages/core/src/__tests__/example-catalog/services/PaymentService/asyncapi.yml`

## Orphan producer — `UserSignup`

**medium.** Event 'UserSignup' is published by usservice but no service in this repo declares a consumer.

Rule id: `EDA-orphan-producer`

- `packages/create-eventcatalog/templates/asyncapi/asyncapi-files/user-service.yml`

## Orphan consumer — `UserSubscriptionCancelled`

**high.** Event 'UserSubscriptionCancelled' is consumed by OrdersService but no service in this repo declares a producer.

Rule id: `EDA-orphan-consumer`

- `packages/sdk/src/test/catalog-eventcatalog/domains/Orders/services/OrdersService/index.mdx`

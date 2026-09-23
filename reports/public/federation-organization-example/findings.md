# Event-contract scan

Findings: 36 (plus 1 info)

## No deployed fleet pins

**info.** No deployed versions available. Rolling-window compatibility (breaking field removal vs live consumers) was not evaluated. This scan is in-repo topology only.

Rule id: `EDA-INFO-NO-FLEET`

## Orphan consumer — `CancelOrder`

**high.** Event 'CancelOrder' is consumed by order-service but no service in this repo declares a producer.

Rule id: `EDA-orphan-consumer`

- `orders/domains/Orders/systems/order-management-system/services/OrderService/asyncapi.yml`

## Orphan producer — `cart-checked-out`

**medium.** Event 'cart-checked-out' is published by cart-api but no service in this repo declares a consumer.

Rule id: `EDA-orphan-producer`

- `cart-and-checkout/domains/CartCheckout/systems/cart-system/services/CartAPI/events/CartCheckedOut/index.mdx`

## Orphan producer — `category-changed`

**medium.** Event 'category-changed' is published by category-service but no service in this repo declares a consumer.

Rule id: `EDA-orphan-producer`

- `catalog/domains/Catalog/systems/product-catalog-system/services/CategoryService/events/CategoryChanged/index.mdx`

## Orphan producer — `coupon-redeemed`

**medium.** Event 'coupon-redeemed' is published by coupon-service but no service in this repo declares a consumer.

Rule id: `EDA-orphan-producer`

- `pricing-and-promotions/domains/PricingPromotions/systems/promotion-system/services/CouponService/events/CouponRedeemed/index.mdx`

## Orphan consumer — `CreateOrder`

**high.** Event 'CreateOrder' is consumed by order-service but no service in this repo declares a producer.

Rule id: `EDA-orphan-consumer`

- `orders/domains/Orders/systems/order-management-system/services/OrderService/asyncapi.yml`

## Orphan producer — `customer-address-changed`

**medium.** Event 'customer-address-changed' is published by address-service but no service in this repo declares a consumer.

Rule id: `EDA-orphan-producer`

- `customer-identity/domains/Customer/systems/customer-management-system/services/AddressService/events/CustomerAddressChanged/index.mdx`

## Orphan producer — `customer-authenticated`

**medium.** Event 'customer-authenticated' is published by oauth-api but no service in this repo declares a consumer.

Rule id: `EDA-orphan-producer`

- `customer-identity/domains/Customer/systems/identity-provider/services/OAuthAPI/events/CustomerAuthenticated/index.mdx`

## Orphan producer — `customer-registered`

**medium.** Event 'customer-registered' is published by customer-api but no service in this repo declares a consumer.

Rule id: `EDA-orphan-producer`

- `customer-identity/domains/Customer/systems/customer-management-system/services/CustomerAPI/events/CustomerRegistered/index.mdx`

## Orphan producer — `customer-updated`

**medium.** Event 'customer-updated' is published by customer-api but no service in this repo declares a consumer.

Rule id: `EDA-orphan-producer`

- `customer-identity/domains/Customer/systems/customer-management-system/services/CustomerAPI/events/CustomerUpdated/index.mdx`

## Orphan producer — `deployment-completed`

**medium.** Event 'deployment-completed' is published by delivery-service but no service in this repo declares a consumer.

Rule id: `EDA-orphan-producer`

- `platform/domains/Platform/systems/developer-platform/services/DeliveryService/events/DeploymentCompleted/index.mdx`

## Orphan producer — `discount-calculated`

**medium.** Event 'discount-calculated' is published by promotion-service but no service in this repo declares a consumer.

Rule id: `EDA-orphan-producer`

- `pricing-and-promotions/domains/PricingPromotions/systems/promotion-system/services/PromotionService/events/DiscountCalculated/index.mdx`

## Orphan producer — `fraud-check-failed`

**medium.** Event 'fraud-check-failed' is published by fraud-api but no service in this repo declares a consumer.

Rule id: `EDA-orphan-producer`

- `payments/domains/Payments/systems/fraud-detection/services/FraudAPI/events/FraudCheckFailed/index.mdx`

## Orphan producer — `fraud-check-passed`

**medium.** Event 'fraud-check-passed' is published by fraud-api but no service in this repo declares a consumer.

Rule id: `EDA-orphan-producer`

- `payments/domains/Payments/systems/fraud-detection/services/FraudAPI/events/FraudCheckPassed/index.mdx`

## Orphan producer — `inventory-reserved`

**medium.** Event 'inventory-reserved' is published by inventory-service but no service in this repo declares a consumer.

Rule id: `EDA-orphan-producer`

- `fulfillment/domains/Fulfillment/systems/inventory-system/services/InventoryService/events/InventoryReserved/index.mdx`

## Orphan producer — `inventory-unavailable`

**medium.** Event 'inventory-unavailable' is published by inventory-service but no service in this repo declares a consumer.

Rule id: `EDA-orphan-producer`

- `fulfillment/domains/Fulfillment/systems/inventory-system/services/InventoryService/events/InventoryUnavailable/index.mdx`

## Orphan producer — `order-cancelled`

**medium.** Event 'order-cancelled' is published by order-service but no service in this repo declares a consumer.

Rule id: `EDA-orphan-producer`

- `orders/domains/Orders/systems/order-management-system/services/OrderService/events/OrderCancelled/index.mdx`

## Orphan producer — `order-created`

**medium.** Event 'order-created' is published by order-service but no service in this repo declares a consumer.

Rule id: `EDA-orphan-producer`

- `orders/domains/Orders/systems/order-management-system/services/OrderService/events/OrderCreated/index.mdx`

## Orphan producer — `order-packed`

**medium.** Event 'order-packed' is published by picking-worker but no service in this repo declares a consumer.

Rule id: `EDA-orphan-producer`

- `fulfillment/domains/Fulfillment/systems/warehouse-system/services/PickingWorker/events/OrderPacked/index.mdx`

## Orphan producer — `OrderCancelled`

**medium.** Event 'OrderCancelled' is published by order-service but no service in this repo declares a consumer.

Rule id: `EDA-orphan-producer`

- `orders/domains/Orders/systems/order-management-system/services/OrderService/asyncapi.yml`

## Orphan producer — `OrderCompleted`

**medium.** Event 'OrderCompleted' is published by order-service but no service in this repo declares a consumer.

Rule id: `EDA-orphan-producer`

- `orders/domains/Orders/systems/order-management-system/services/OrderService/asyncapi.yml`

## Orphan producer — `OrderCreated`

**medium.** Event 'OrderCreated' is published by order-service but no service in this repo declares a consumer.

Rule id: `EDA-orphan-producer`

- `orders/domains/Orders/systems/order-management-system/services/OrderService/asyncapi.yml`

## Orphan producer — `price-changed`

**medium.** Event 'price-changed' is published by pricing-service but no service in this repo declares a consumer.

Rule id: `EDA-orphan-producer`

- `pricing-and-promotions/domains/PricingPromotions/systems/promotion-system/services/PricingService/events/PriceChanged/index.mdx`

## Orphan producer — `rating-updated`

**medium.** Event 'rating-updated' is published by rating-aggregator but no service in this repo declares a consumer.

Rule id: `EDA-orphan-producer`

- `central-catalog/domains/Reviews/services/RatingAggregator/events/rating-updated/index.mdx`

## Orphan producer — `refund-processed`

**medium.** Event 'refund-processed' is published by stripe-webhook-endpoint but no service in this repo declares a consumer.

Rule id: `EDA-orphan-producer`

- `payments/domains/Payments/systems/stripe/services/StripeWebhookEndpoint/events/RefundProcessed/index.mdx`

## Orphan producer — `review-helpful-voted`

**medium.** Event 'review-helpful-voted' is published by review-api but no service in this repo declares a consumer.

Rule id: `EDA-orphan-producer`

- `central-catalog/domains/Reviews/services/ReviewAPI/events/review-helpful-voted/index.mdx`

## Orphan producer — `review-rejected`

**medium.** Event 'review-rejected' is published by review-moderation-worker but no service in this repo declares a consumer.

Rule id: `EDA-orphan-producer`

- `central-catalog/domains/Reviews/services/ReviewModerationWorker/events/review-rejected/index.mdx`

## Orphan consumer — `ReviewFlagged`

**high.** Event 'ReviewFlagged' is consumed by review-moderation-worker but no service in this repo declares a producer.

Rule id: `EDA-orphan-consumer`

- `central-catalog/domains/Reviews/asyncapi.yml`

## Orphan producer — `ReviewPublished`

**medium.** Event 'ReviewPublished' is published by review-moderation-worker but no service in this repo declares a consumer.

Rule id: `EDA-orphan-producer`

- `central-catalog/domains/Reviews/asyncapi.yml`

## Orphan producer — `ReviewRejected`

**medium.** Event 'ReviewRejected' is published by review-moderation-worker but no service in this repo declares a consumer.

Rule id: `EDA-orphan-producer`

- `central-catalog/domains/Reviews/asyncapi.yml`

## Orphan consumer — `ReviewSubmitted`

**high.** Event 'ReviewSubmitted' is consumed by review-moderation-worker but no service in this repo declares a producer.

Rule id: `EDA-orphan-consumer`

- `central-catalog/domains/Reviews/asyncapi.yml`

## Orphan producer — `runtime-provisioned`

**medium.** Event 'runtime-provisioned' is published by cloud-runtime-service but no service in this repo declares a consumer.

Rule id: `EDA-orphan-producer`

- `platform/domains/Platform/systems/developer-platform/services/CloudRuntimeService/events/RuntimeProvisioned/index.mdx`

## Orphan producer — `service-scaffolded`

**medium.** Event 'service-scaffolded' is published by service-scaffolder but no service in this repo declares a consumer.

Rule id: `EDA-orphan-producer`

- `platform/domains/Platform/systems/developer-platform/services/ServiceScaffolder/events/ServiceScaffolded/index.mdx`

## Orphan producer — `service-slo-breached`

**medium.** Event 'service-slo-breached' is published by observability-service but no service in this repo declares a consumer.

Rule id: `EDA-orphan-producer`

- `platform/domains/Platform/systems/developer-platform/services/ObservabilityService/events/ServiceSLOBreached/index.mdx`

## Orphan producer — `shipment-created`

**medium.** Event 'shipment-created' is published by carrier-tracking-api but no service in this repo declares a consumer.

Rule id: `EDA-orphan-producer`

- `fulfillment/domains/Fulfillment/systems/carrier/services/CarrierTrackingAPI/events/ShipmentCreated/index.mdx`

## Orphan producer — `shipment-delivered`

**medium.** Event 'shipment-delivered' is published by carrier-tracking-api but no service in this repo declares a consumer.

Rule id: `EDA-orphan-producer`

- `fulfillment/domains/Fulfillment/systems/carrier/services/CarrierTrackingAPI/events/ShipmentDelivered/index.mdx`

## Orphan producer — `shipment-failed`

**medium.** Event 'shipment-failed' is published by carrier-tracking-api but no service in this repo declares a consumer.

Rule id: `EDA-orphan-producer`

- `fulfillment/domains/Fulfillment/systems/carrier/services/CarrierTrackingAPI/events/ShipmentFailed/index.mdx`

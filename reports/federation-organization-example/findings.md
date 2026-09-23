# Event-contract scan

Findings: 27 (plus 1 info)

## EDA-INFO-NO-FLEET

**info.** No deployed versions available. Rolling-window compatibility (EDA-004) was not evaluated. This scan is in-repo topology only.

## EDA-orphan-producer — `cart-checked-out`

**medium.** Event 'cart-checked-out' is published by cart-api but no service in this repo declares a consumer.

- `cart-and-checkout/domains/CartCheckout/systems/cart-system/services/CartAPI/events/CartCheckedOut/index.mdx`

## EDA-orphan-producer — `category-changed`

**medium.** Event 'category-changed' is published by category-service but no service in this repo declares a consumer.

- `catalog/domains/Catalog/systems/product-catalog-system/services/CategoryService/events/CategoryChanged/index.mdx`

## EDA-orphan-producer — `coupon-redeemed`

**medium.** Event 'coupon-redeemed' is published by coupon-service but no service in this repo declares a consumer.

- `pricing-and-promotions/domains/PricingPromotions/systems/promotion-system/services/CouponService/events/CouponRedeemed/index.mdx`

## EDA-orphan-producer — `customer-address-changed`

**medium.** Event 'customer-address-changed' is published by address-service but no service in this repo declares a consumer.

- `customer-identity/domains/Customer/systems/customer-management-system/services/AddressService/events/CustomerAddressChanged/index.mdx`

## EDA-orphan-producer — `customer-authenticated`

**medium.** Event 'customer-authenticated' is published by oauth-api but no service in this repo declares a consumer.

- `customer-identity/domains/Customer/systems/identity-provider/services/OAuthAPI/events/CustomerAuthenticated/index.mdx`

## EDA-orphan-producer — `customer-registered`

**medium.** Event 'customer-registered' is published by customer-api but no service in this repo declares a consumer.

- `customer-identity/domains/Customer/systems/customer-management-system/services/CustomerAPI/events/CustomerRegistered/index.mdx`

## EDA-orphan-producer — `customer-updated`

**medium.** Event 'customer-updated' is published by customer-api but no service in this repo declares a consumer.

- `customer-identity/domains/Customer/systems/customer-management-system/services/CustomerAPI/events/CustomerUpdated/index.mdx`

## EDA-orphan-producer — `deployment-completed`

**medium.** Event 'deployment-completed' is published by delivery-service but no service in this repo declares a consumer.

- `platform/domains/Platform/systems/developer-platform/services/DeliveryService/events/DeploymentCompleted/index.mdx`

## EDA-orphan-producer — `discount-calculated`

**medium.** Event 'discount-calculated' is published by promotion-service but no service in this repo declares a consumer.

- `pricing-and-promotions/domains/PricingPromotions/systems/promotion-system/services/PromotionService/events/DiscountCalculated/index.mdx`

## EDA-orphan-producer — `fraud-check-failed`

**medium.** Event 'fraud-check-failed' is published by fraud-api but no service in this repo declares a consumer.

- `payments/domains/Payments/systems/fraud-detection/services/FraudAPI/events/FraudCheckFailed/index.mdx`

## EDA-orphan-producer — `fraud-check-passed`

**medium.** Event 'fraud-check-passed' is published by fraud-api but no service in this repo declares a consumer.

- `payments/domains/Payments/systems/fraud-detection/services/FraudAPI/events/FraudCheckPassed/index.mdx`

## EDA-orphan-producer — `inventory-reserved`

**medium.** Event 'inventory-reserved' is published by inventory-service but no service in this repo declares a consumer.

- `fulfillment/domains/Fulfillment/systems/inventory-system/services/InventoryService/events/InventoryReserved/index.mdx`

## EDA-orphan-producer — `inventory-unavailable`

**medium.** Event 'inventory-unavailable' is published by inventory-service but no service in this repo declares a consumer.

- `fulfillment/domains/Fulfillment/systems/inventory-system/services/InventoryService/events/InventoryUnavailable/index.mdx`

## EDA-orphan-producer — `order-cancelled`

**medium.** Event 'order-cancelled' is published by order-service but no service in this repo declares a consumer.

- `orders/domains/Orders/systems/order-management-system/services/OrderService/events/OrderCancelled/index.mdx`

## EDA-orphan-producer — `order-created`

**medium.** Event 'order-created' is published by order-service but no service in this repo declares a consumer.

- `orders/domains/Orders/systems/order-management-system/services/OrderService/events/OrderCreated/index.mdx`

## EDA-orphan-producer — `order-packed`

**medium.** Event 'order-packed' is published by picking-worker but no service in this repo declares a consumer.

- `fulfillment/domains/Fulfillment/systems/warehouse-system/services/PickingWorker/events/OrderPacked/index.mdx`

## EDA-orphan-producer — `price-changed`

**medium.** Event 'price-changed' is published by pricing-service but no service in this repo declares a consumer.

- `pricing-and-promotions/domains/PricingPromotions/systems/promotion-system/services/PricingService/events/PriceChanged/index.mdx`

## EDA-orphan-producer — `rating-updated`

**medium.** Event 'rating-updated' is published by rating-aggregator but no service in this repo declares a consumer.

- `central-catalog/domains/Reviews/services/RatingAggregator/events/rating-updated/index.mdx`

## EDA-orphan-producer — `refund-processed`

**medium.** Event 'refund-processed' is published by stripe-webhook-endpoint but no service in this repo declares a consumer.

- `payments/domains/Payments/systems/stripe/services/StripeWebhookEndpoint/events/RefundProcessed/index.mdx`

## EDA-orphan-producer — `review-helpful-voted`

**medium.** Event 'review-helpful-voted' is published by review-api but no service in this repo declares a consumer.

- `central-catalog/domains/Reviews/services/ReviewAPI/events/review-helpful-voted/index.mdx`

## EDA-orphan-producer — `review-rejected`

**medium.** Event 'review-rejected' is published by review-moderation-worker but no service in this repo declares a consumer.

- `central-catalog/domains/Reviews/services/ReviewModerationWorker/events/review-rejected/index.mdx`

## EDA-orphan-producer — `runtime-provisioned`

**medium.** Event 'runtime-provisioned' is published by cloud-runtime-service but no service in this repo declares a consumer.

- `platform/domains/Platform/systems/developer-platform/services/CloudRuntimeService/events/RuntimeProvisioned/index.mdx`

## EDA-orphan-producer — `service-scaffolded`

**medium.** Event 'service-scaffolded' is published by service-scaffolder but no service in this repo declares a consumer.

- `platform/domains/Platform/systems/developer-platform/services/ServiceScaffolder/events/ServiceScaffolded/index.mdx`

## EDA-orphan-producer — `service-slo-breached`

**medium.** Event 'service-slo-breached' is published by observability-service but no service in this repo declares a consumer.

- `platform/domains/Platform/systems/developer-platform/services/ObservabilityService/events/ServiceSLOBreached/index.mdx`

## EDA-orphan-producer — `shipment-created`

**medium.** Event 'shipment-created' is published by carrier-tracking-api but no service in this repo declares a consumer.

- `fulfillment/domains/Fulfillment/systems/carrier/services/CarrierTrackingAPI/events/ShipmentCreated/index.mdx`

## EDA-orphan-producer — `shipment-delivered`

**medium.** Event 'shipment-delivered' is published by carrier-tracking-api but no service in this repo declares a consumer.

- `fulfillment/domains/Fulfillment/systems/carrier/services/CarrierTrackingAPI/events/ShipmentDelivered/index.mdx`

## EDA-orphan-producer — `shipment-failed`

**medium.** Event 'shipment-failed' is published by carrier-tracking-api but no service in this repo declares a consumer.

- `fulfillment/domains/Fulfillment/systems/carrier/services/CarrierTrackingAPI/events/ShipmentFailed/index.mdx`

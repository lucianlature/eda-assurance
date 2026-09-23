# Day inbox

Pending: 3. Reply with `<id> approve|reject|later`.

## `finding:federation-organization-example:EDA-orphan-producer:summary`

**finding.** federation-organization-example: 27× EDA-orphan-producer

cart-checked-out — Event 'cart-checked-out' is published by cart-api but no service in this repo declares a consumer.
category-changed — Event 'category-changed' is published by category-service but no service in this repo declares a consumer.
coupon-redeemed — Event 'coupon-redeemed' is published by coupon-service but no service in this repo declares a consumer.
customer-address-changed — Event 'customer-address-changed' is published by address-service but no service in this repo declares a consumer.
customer-authenticated — Event 'customer-authenticated' is published by oauth-api but no service in this repo declares a consumer.
customer-registered — Event 'customer-registered' is published by customer-api but no service in this repo declares a consumer.
customer-updated — Event 'customer-updated' is published by customer-api but no service in this repo declares a consumer.
deployment-completed — Event 'deployment-completed' is published by delivery-service but no service in this repo declares a consumer.

- `cart-and-checkout/domains/CartCheckout/systems/cart-system/services/CartAPI/events/CartCheckedOut/index.mdx`
- `catalog/domains/Catalog/systems/product-catalog-system/services/CategoryService/events/CategoryChanged/index.mdx`
- `pricing-and-promotions/domains/PricingPromotions/systems/promotion-system/services/CouponService/events/CouponRedeemed/index.mdx`
- `customer-identity/domains/Customer/systems/customer-management-system/services/AddressService/events/CustomerAddressChanged/index.mdx`
- `customer-identity/domains/Customer/systems/identity-provider/services/OAuthAPI/events/CustomerAuthenticated/index.mdx`
- `customer-identity/domains/Customer/systems/customer-management-system/services/CustomerAPI/events/CustomerRegistered/index.mdx`
- `customer-identity/domains/Customer/systems/customer-management-system/services/CustomerAPI/events/CustomerUpdated/index.mdx`
- `platform/domains/Platform/systems/developer-platform/services/DeliveryService/events/DeploymentCompleted/index.mdx`
- `pricing-and-promotions/domains/PricingPromotions/systems/promotion-system/services/PromotionService/events/DiscountCalculated/index.mdx`
- `payments/domains/Payments/systems/fraud-detection/services/FraudAPI/events/FraudCheckFailed/index.mdx`
- `payments/domains/Payments/systems/fraud-detection/services/FraudAPI/events/FraudCheckPassed/index.mdx`
- `fulfillment/domains/Fulfillment/systems/inventory-system/services/InventoryService/events/InventoryReserved/index.mdx`

## `finding:payments-settled:EDA-004:payments.settled.v1`

**finding.** REVIEW EDA-004 payments.settled.v1

Producer billing-service. Missing settlementReference. Incompatible: ledger-service, reporting-worker.

- `/workspace/fixtures/payments-settled`

## `human:night-2026-09-23-article`

**human.** Day: review article draft + night checklist, then publish

Night runs ops/NIGHT-PLAN.md (article checklist, demo polish, night cycle). Day reviews docs/08-article-draft.md against ops/drafts/article-checklist-*.md, then publishes / Show HN. Do not expand extractors.

- `docs/08-article-draft.md`
- `ops/NIGHT-PLAN.md`
- `docs/07-article-outline.md`
- `docs/06-demo-scenario.md`

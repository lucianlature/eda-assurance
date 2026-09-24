# Day inbox

Pending: 63. Reply with `<id> approve|reject|later`.

## `finding:AsyncAPI.NET:EDA-orphan-producer:message0`

**finding.** EDA-orphan-producer message0 (AsyncAPI.NET)

Event 'message0' is published by streetlights-kafka-api but no service in this repo declares a consumer.

- `test/LEGO.AsyncAPI.Tests/TestData/AsyncApiSchema_InlinedReferences.yml`
- `test/LEGO.AsyncAPI.Tests/TestData/AsyncApiSchema_NoInlinedReferences.yml`

## `finding:Propan:EDA-orphan-consumer:message0`

**finding.** EDA-orphan-consumer message0 (Propan)

Event 'message0' is consumed by smartylighting-streetlights-propan-api but no service in this repo declares a producer.

- `docs/docs_src/quickstart/documentation/example.yaml`

## `finding:asyncapi-website:EDA-orphan-producer:costingResponse`

**finding.** EDA-orphan-producer costingResponse (asyncapi-website)

Event 'costingResponse' is published by adeo-asyncapi-case-study but no service in this repo declares a consumer.

- `public/resources/casestudies/adeo/asyncapi.yaml`

## `finding:booking-microservices-expressjs:EDA-orphan-producer:summary`

**finding.** booking-microservices-expressjs: 9× EDA-orphan-producer

AircraftCreated — Event 'AircraftCreated' is published by flight but no service in this repo declares a consumer.
AirportCreated — Event 'AirportCreated' is published by flight but no service in this repo declares a consumer.
BookingCreated — Event 'BookingCreated' is published by booking but no service in this repo declares a consumer.
FlightCreated — Event 'FlightCreated' is published by flight but no service in this repo declares a consumer.
SeatCreated — Event 'SeatCreated' is published by flight but no service in this repo declares a consumer.
SeatReserved — Event 'SeatReserved' is published by flight but no service in this repo declares a consumer.
UserCreated — Event 'UserCreated' is published by identity but no service in this repo declares a consumer.
UserDeleted — Event 'UserDeleted' is published by identity but no service in this repo declares a consumer.

- `src/building-blocks/contracts/flight.contract.ts`
- `src/building-blocks/contracts/flight.contract.ts`
- `src/building-blocks/contracts/booking.contract.ts`
- `src/building-blocks/contracts/flight.contract.ts`
- `src/building-blocks/contracts/flight.contract.ts`
- `src/building-blocks/contracts/flight.contract.ts`
- `src/building-blocks/contracts/identity.contract.ts`
- `src/building-blocks/contracts/identity.contract.ts`
- `src/building-blocks/contracts/identity.contract.ts`

## `finding:booking-microservices-nestjs:EDA-orphan-producer:summary`

**finding.** booking-microservices-nestjs: 8× EDA-orphan-producer

AircraftCreated — Event 'AircraftCreated' is published by flight but no service in this repo declares a consumer.
AirportCreated — Event 'AirportCreated' is published by flight but no service in this repo declares a consumer.
BookingCreated — Event 'BookingCreated' is published by booking but no service in this repo declares a consumer.
FlightCreated — Event 'FlightCreated' is published by flight but no service in this repo declares a consumer.
SeatCreated — Event 'SeatCreated' is published by flight but no service in this repo declares a consumer.
SeatReserved — Event 'SeatReserved' is published by flight but no service in this repo declares a consumer.
UserDeleted — Event 'UserDeleted' is published by identity but no service in this repo declares a consumer.
UserUpdated — Event 'UserUpdated' is published by identity but no service in this repo declares a consumer.

- `src/building-blocks/contracts/flight.contract.ts`
- `src/building-blocks/contracts/flight.contract.ts`
- `src/building-blocks/contracts/booking.contract.ts`
- `src/building-blocks/contracts/flight.contract.ts`
- `src/building-blocks/contracts/flight.contract.ts`
- `src/building-blocks/contracts/flight.contract.ts`
- `src/building-blocks/contracts/identity.contract.ts`
- `src/building-blocks/contracts/identity.contract.ts`

## `finding:castore:EDA-orphan-consumer:COUNTER_DELETED`

**finding.** EDA-orphan-consumer COUNTER_DELETED (castore)

Event 'COUNTER_DELETED' is consumed by command-json-schema, command-zod, core but no service in this repo declares a producer.

- `packages/command-json-schema/src/command.fixtures.test.ts`

## `finding:castore:EDA-orphan-consumer:POKEMON_LEVELED_UP`

**finding.** EDA-orphan-consumer POKEMON_LEVELED_UP (castore)

Event 'POKEMON_LEVELED_UP' is consumed by core but no service in this repo declares a producer.

- `packages/core/src/eventStore/eventStore.fixtures.test.ts`

## `finding:castore:EDA-orphan-producer:EVENT_TYPE`

**finding.** EDA-orphan-producer EVENT_TYPE (castore)

Event 'EVENT_TYPE' is published by event-storage-adapter-in-memory, event-storage-adapter-postgres but no service in this repo declares a consumer.

- `packages/event-storage-adapter-in-memory/src/adapter.unit.test.ts`

## `finding:cdk-patterns-serverless:EDA-orphan-consumer:summary`

**finding.** cdk-patterns-serverless: 7× EDA-orphan-consumer

eb:cdkpatterns.the-eventbridge-etl — Event 'eb:cdkpatterns.the-eventbridge-etl' is consumed by template, typescript but no service in this repo declares a producer.
s3RecordExtraction — Event 's3RecordExtraction' is consumed by template, typescript but no service in this repo declares a producer.
sqs:BigFanTopicAnyOtherStatusSubscriberQueue — Event 'sqs:BigFanTopicAnyOtherStatusSubscriberQueue' is consumed by typescript but no service in this repo declares a producer.
sqs:BigFanTopicStatusCreatedSubscriberQueue — Event 'sqs:BigFanTopicStatusCreatedSubscriberQueue' is consumed by typescript but no service in this repo declares a producer.
sqs:newObjectInLandingBucketEventQueue — Event 'sqs:newObjectInLandingBucketEventQueue' is consumed by typescript but no service in this repo declares a producer.
sqs:Queue — Event 'sqs:Queue' is consumed by typescript but no service in this repo declares a producer.
sqs:RDSPublishQueue — Event 'sqs:RDSPublishQueue' is consumed by typescript but no service in this repo declares a producer.

- `the-eventbridge-etl/python/template.yml`
- `the-eventbridge-etl/python/template.yml`
- `the-big-fan/python/template.yaml`
- `the-big-fan/python/template.yaml`
- `the-eventbridge-etl/typescript/lib/the-eventbridge-etl-stack.ts`
- `the-xray-tracer/typescript/lib/the-sqs-flow-stack.ts`
- `the-scalable-webhook/typescript/lib/the-scalable-webhook-stack.ts`

## `finding:cdk-patterns-serverless:EDA-orphan-producer:data-loaded`

**finding.** EDA-orphan-producer data-loaded (cdk-patterns-serverless)

Event 'data-loaded' is published by load but no service in this repo declares a consumer.

- `the-eventbridge-etl/python/lambda_fns/load/load.js`

## `finding:cdk-patterns-serverless:EDA-orphan-producer:ecs-started`

**finding.** EDA-orphan-producer ecs-started (cdk-patterns-serverless)

Event 'ecs-started' is published by s3sqseventconsumer but no service in this repo declares a consumer.

- `the-eventbridge-etl/python/lambda_fns/extract/s3SqsEventConsumer.js`

## `finding:cli:EDA-orphan-consumer:dummyInfo`

**finding.** EDA-orphan-consumer dummyInfo (cli)

Event 'dummyInfo' is consumed by dummy-example-with-all-spec-features-included but no service in this repo declares a producer.

- `github-action/test/dummy.yml`

## `finding:cli:EDA-orphan-consumer:lightMeasured`

**finding.** EDA-orphan-consumer lightMeasured (cli)

Event 'lightMeasured' is consumed by streetlights-api, streetlights-mqtt-api, streetlights-kafka-api, asyncapi-app, asyncapi-sample-app but no service in this repo declares a producer.

- `github-action/test/unoptimized.yml`
- `packages/optimizer/examples/input.yaml`
- `packages/optimizer/examples/output.yaml`
- `test/fixtures/asyncapiTestingScore.yml`
- `test/fixtures/dummyspec/unoptimizedSpec.json`
- `test/fixtures/dummyspec/unoptimizedSpec.yml`
- `test/fixtures/specification-v3-diff.yml`
- `test/fixtures/specification-v3.yml`

## `finding:cli:EDA-orphan-producer:dummyCreated`

**finding.** EDA-orphan-producer dummyCreated (cli)

Event 'dummyCreated' is published by dummy-example-with-all-spec-features-included but no service in this repo declares a consumer.

- `github-action/test/dummy.yml`

## `finding:cli:EDA-orphan-producer:message1`

**finding.** EDA-orphan-producer message1 (cli)

Event 'message1' is published by this-is-async-api-with-a-schema-reference but no service in this repo declares a consumer.

- `test/fixtures/dummyspec/apiwithref.json`

## `finding:daruma-backend:EDA-orphan-consumer:summary`

**finding.** daruma-backend: 30× EDA-orphan-consumer

BillCurrencyCodeWasChanged — Event 'BillCurrencyCodeWasChanged' is consumed by bill but no service in this repo declares a producer.
BillDateWasChanged — Event 'BillDateWasChanged' is consumed by bill but no service in this repo declares a producer.
BillDebtorWasAdded — Event 'BillDebtorWasAdded' is consumed by bill but no service in this repo declares a producer.
BillDebtorWasRemoved — Event 'BillDebtorWasRemoved' is consumed by bill but no service in this repo declares a producer.
BillMoneyWasChanged — Event 'BillMoneyWasChanged' is consumed by bill but no service in this repo declares a producer.
BillNameWasChanged — Event 'BillNameWasChanged' is consumed by bill but no service in this repo declares a producer.
BillPayerWasAdded — Event 'BillPayerWasAdded' is consumed by bill but no service in this repo declares a producer.
BillPayerWasRemoved — Event 'BillPayerWasRemoved' is consumed by bill but no service in this repo declares a producer.

- `src/bill/domain/event/bill-currency-code-was-changed.event.ts`
- `src/bill/domain/event/bill-date-was-changed.event.ts`
- `src/bill/domain/event/bill-debtor-was-added.event.ts`
- `src/bill/domain/event/bill-debtor-was-removed.event.ts`
- `src/bill/domain/event/bill-money-was-changed.event.ts`
- `src/bill/domain/event/bill-name-was-changed.event.ts`
- `src/bill/domain/event/bill-payer-was-added.event.ts`
- `src/bill/domain/event/bill-payer-was-removed.event.ts`
- `src/bill/domain/event/bill-was-created.event.ts`
- `src/bill/domain/event/bill-was-removed.event.ts`
- `src/transaction/domain/event/debt-transaction-was-created.event.ts`
- `src/transaction/domain/event/debt-transaction-was-removed.event.ts`

## `finding:emmett:EDA-orphan-consumer:CounterDecremented`

**finding.** EDA-orphan-consumer CounterDecremented (emmett)

Event 'CounterDecremented' is consumed by esmCompatibility but no service in this repo declares a producer.

- `src/e2e/esmCompatibility/app/counter.ts`

## `finding:emmett:EDA-orphan-consumer:CounterIncremented`

**finding.** EDA-orphan-consumer CounterIncremented (emmett)

Event 'CounterIncremented' is consumed by esmCompatibility but no service in this repo declares a producer.

- `src/e2e/esmCompatibility/app/counter.ts`

## `finding:emmett:EDA-orphan-consumer:CounterSubmitted`

**finding.** EDA-orphan-consumer CounterSubmitted (emmett)

Event 'CounterSubmitted' is consumed by esmCompatibility but no service in this repo declares a producer.

- `src/e2e/esmCompatibility/app/counter.ts`

## `finding:emmett:EDA-orphan-producer:summary`

**finding.** emmett: 10× EDA-orphan-producer

DidSomething — Event 'DidSomething' is published by emmett-postgresql, emmett-sqlite but no service in this repo declares a consumer.
GuestCheckedIn — Event 'GuestCheckedIn' is published by docs, emmett-esdb, emmett-mongodb, emmett-postgresql, emmett-sqlite but no service in this repo declares a consumer.
GuestCheckedOut — Event 'GuestCheckedOut' is published by emmett-esdb, emmett-mongodb, emmett-postgresql, emmett-sqlite but no service in this repo declares a consumer.
ItemAdded — Event 'ItemAdded' is published by emmett but no service in this repo declares a consumer.
Observed — Event 'Observed' is published by emmett-tests but no service in this repo declares a consumer.
ProductItemAdded — Event 'ProductItemAdded' is published by emmett-esdb, emmett-mongodb, emmett-postgresql, emmett-sqlite but no service in this repo declares a consumer.
ShoppingCartConfirmed — Event 'ShoppingCartConfirmed' is published by emmett-mongodb, emmett-postgresql, emmett-sqlite but no service in this repo declares a consumer.
StreamStarted — Event 'StreamStarted' is published by emmett-expressjs, emmett-honojs but no service in this repo declares a consumer.

- `src/packages/emmett-postgresql/src/benchmarks/index.ts`
- `src/docs/guides/consumers/testingConsumers.snippet.ts`
- `src/packages/emmett/src/workflows/workflow.testHelpers.ts`
- `src/docs/snippets/quickStart/index.ts`
- `src/packages/emmett-tests/src/eventStore/esdb/eventstoreDBEventStore.e2e.spec.ts`
- `src/docs/guides/projections/testingProjections.snippet.ts`
- `samples/webApi/expressjs-with-esdb/src/shoppingCarts/shoppingCart.ts`
- `src/packages/emmett-expressjs/src/testing/apiE2ESpecification.int.spec.ts`
- `src/packages/emmett-testcontainers/src/eventStore/eventStoreDBContainer.e2e.spec.ts`
- `src/packages/emmett-postgresql/src/eventStore/schema/readMessagesBatch.int.spec.ts`

## `finding:event-sourcing-nestjs-example:EDA-orphan-consumer:UserCreatedEvent`

**finding.** EDA-orphan-consumer UserCreatedEvent (event-sourcing-nestjs-example)

Event 'UserCreatedEvent' is consumed by users but no service in this repo declares a producer.

- `src/users/events/handlers/user-created.handler.ts`

## `finding:eventcatalog-ai-demo:EDA-orphan-producer:OrderConfirmed`

**finding.** EDA-orphan-producer OrderConfirmed (eventcatalog-ai-demo)

Event 'OrderConfirmed' is published by order-service but no service in this repo declares a consumer.

- `domains/Orders/services/OrdersService/order-service-asyncapi.yaml`
- `domains/Orders/services/OrdersService/versioned/0.0.2/order-service-asyncapi.yaml`

## `finding:eventcatalog-ai-demo:EDA-orphan-producer:OrderPlaced`

**finding.** EDA-orphan-producer OrderPlaced (eventcatalog-ai-demo)

Event 'OrderPlaced' is published by order-service but no service in this repo declares a consumer.

- `domains/Orders/services/OrdersService/order-service-asyncapi.yaml`
- `domains/Orders/services/OrdersService/versioned/0.0.2/order-service-asyncapi.yaml`

## `finding:eventcatalog:EDA-orphan-consumer:summary`

**finding.** eventcatalog: 10× EDA-orphan-consumer

CancelOrder — Event 'CancelOrder' is consumed by order-service but no service in this repo declares a producer.
CreateOrder — Event 'CreateOrder' is consumed by order-service but no service in this repo declares a producer.
InventoryReserved — Event 'InventoryReserved' is consumed by orders-service but no service in this repo declares a producer.
PaymentProcessed — Event 'PaymentProcessed' is consumed by NotificationService, ShippingService, orders-service but no service in this repo declares a producer.
ReviewFlagged — Event 'ReviewFlagged' is consumed by review-moderation-worker but no service in this repo declares a producer.
ReviewSubmitted — Event 'ReviewSubmitted' is consumed by review-moderation-worker but no service in this repo declares a producer.
shipment-dispatched — Event 'shipment-dispatched' is consumed by fulfilment-service but no service in this repo declares a producer.
Test message — Event 'Test message' is consumed by test-asyncapi but no service in this repo declares a producer.

- `examples/default/domains/Ordering/systems/order-management-system/services/OrderService/asyncapi.yml`
- `packages/create-eventcatalog/templates/default/domains/Ordering/systems/order-management-system/services/OrderService/asyncapi.yml`
- `examples/default/domains/Ordering/systems/order-management-system/services/OrderService/asyncapi.yml`
- `packages/create-eventcatalog/templates/default/domains/Ordering/systems/order-management-system/services/OrderService/asyncapi.yml`
- `packages/create-eventcatalog/templates/asyncapi/asyncapi-files/orders-service.yml`
- `packages/create-eventcatalog/templates/asyncapi/asyncapi-files/orders-service.yml`
- `examples/default/domains/Reviews/asyncapi.yml`
- `packages/create-eventcatalog/templates/default/domains/Reviews/asyncapi.yml`
- `examples/default/domains/Reviews/asyncapi.yml`
- `packages/create-eventcatalog/templates/default/domains/Reviews/asyncapi.yml`
- `examples/federation/team-fulfilment/catalog/services/fulfilment-service/index.mdx`
- `packages/core/eventcatalog/src/__tests__/api/schemas/test-asyncapi.yml`

## `finding:eventcatalog:EDA-orphan-producer:summary`

**finding.** eventcatalog: 54× EDA-orphan-producer

cart-checked-out — Event 'cart-checked-out' is published by cart-api but no service in this repo declares a consumer.
customer-authenticated — Event 'customer-authenticated' is published by oauth-api but no service in this repo declares a consumer.
customer-registered — Event 'customer-registered' is published by customer-api but no service in this repo declares a consumer.
customer-updated — Event 'customer-updated' is published by customer-api but no service in this repo declares a consumer.
DeliveryFailed — Event 'DeliveryFailed' is published by ShippingService but no service in this repo declares a consumer.
discount-calculated — Event 'discount-calculated' is published by promotion-service but no service in this repo declares a consumer.
fraud-check-failed — Event 'fraud-check-failed' is published by fraud-api but no service in this repo declares a consumer.
fraud-check-passed — Event 'fraud-check-passed' is published by fraud-api but no service in this repo declares a consumer.

- `examples/default/domains/Shopping/systems/cart-system/services/CartAPI/events/CartCheckedOut/index.mdx`
- `packages/create-eventcatalog/templates/default/domains/Shopping/systems/cart-system/services/CartAPI/events/CartCheckedOut/index.mdx`
- `examples/default/domains/Customer/systems/identity-provider/services/OAuthAPI/events/CustomerAuthenticated/index.mdx`
- `packages/create-eventcatalog/templates/default/domains/Customer/systems/identity-provider/services/OAuthAPI/events/CustomerAuthenticated/index.mdx`
- `examples/default/domains/Customer/systems/customer-management-system/services/CustomerAPI/events/CustomerRegistered/index.mdx`
- `packages/create-eventcatalog/templates/default/domains/Customer/systems/customer-management-system/services/CustomerAPI/events/CustomerRegistered/index.mdx`
- `examples/default/domains/Customer/systems/customer-management-system/services/CustomerAPI/events/CustomerUpdated/index.mdx`
- `packages/create-eventcatalog/templates/default/domains/Customer/systems/customer-management-system/services/CustomerAPI/events/CustomerUpdated/index.mdx`
- `packages/sdk/src/test/catalog-eventcatalog/domains/Orders/services/ShippingService/events/DeliveryFailed/index.mdx`
- `examples/default/domains/Shopping/systems/promotion-system/services/PromotionService/events/DiscountCalculated/index.mdx`
- `packages/create-eventcatalog/templates/default/domains/Shopping/systems/promotion-system/services/PromotionService/events/DiscountCalculated/index.mdx`
- `examples/default/domains/Payments/systems/fraud-detection/services/FraudAPI/events/FraudCheckFailed/index.mdx`

## `finding:faststream:EDA-orphan-consumer:SubscribeMessage`

**finding.** EDA-orphan-consumer SubscribeMessage (faststream)

Event 'SubscribeMessage' is consumed by faststream but no service in this repo declares a producer.

- `tests/asyncapi/rabbit/v3_0_0/__snapshots__/test_arguments/TestArguments.test_subscriber_bindings.json`
- `tests/asyncapi/rabbit/v3_0_0/__snapshots__/test_arguments/TestArguments.test_subscriber_fanout_bindings.json`
- `tests/asyncapi/rabbit/v3_0_0/__snapshots__/test_naming/TestNaming.test_base.json`
- `tests/asyncapi/rabbit/v3_0_0/__snapshots__/test_naming/TestNaming.test_subscriber_with_exchange.json`
- `tests/asyncapi/rabbit/v3_0_0/__snapshots__/test_router/TestRouter.test_prefix.json`

## `finding:faststream:EDA-orphan-producer:Message`

**finding.** EDA-orphan-producer Message (faststream)

Event 'Message' is published by faststream but no service in this repo declares a consumer.

- `tests/asyncapi/rabbit/v3_0_0/__snapshots__/test_connection/test_custom.json`
- `tests/asyncapi/rabbit/v3_0_0/__snapshots__/test_naming/TestNaming.test_publisher_with_exchange.json`
- `tests/asyncapi/rabbit/v3_0_0/__snapshots__/test_publisher/TestArguments.test_just_exchange.json`
- `tests/asyncapi/rabbit/v3_0_0/__snapshots__/test_publisher/TestArguments.test_publisher_bindings.json`
- `tests/asyncapi/rabbit/v3_0_0/__snapshots__/test_publisher/TestArguments.test_reusable_exchange.json`
- `tests/asyncapi/rabbit/v3_0_0/__snapshots__/test_publisher/TestArguments.test_useless_queue_bindings.json`

## `finding:federation-organization-example:EDA-orphan-consumer:summary`

**finding.** federation-organization-example: 4× EDA-orphan-consumer

CancelOrder — Event 'CancelOrder' is consumed by order-service but no service in this repo declares a producer.
CreateOrder — Event 'CreateOrder' is consumed by order-service but no service in this repo declares a producer.
ReviewFlagged — Event 'ReviewFlagged' is consumed by review-moderation-worker but no service in this repo declares a producer.
ReviewSubmitted — Event 'ReviewSubmitted' is consumed by review-moderation-worker but no service in this repo declares a producer.

- `orders/domains/Orders/systems/order-management-system/services/OrderService/asyncapi.yml`
- `orders/domains/Orders/systems/order-management-system/services/OrderService/asyncapi.yml`
- `central-catalog/domains/Reviews/asyncapi.yml`
- `central-catalog/domains/Reviews/asyncapi.yml`

## `finding:federation-organization-example:EDA-orphan-producer:summary`

**finding.** federation-organization-example: 32× EDA-orphan-producer

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

## `finding:full-stack-serverless-cdk:EDA-orphan-consumer:summary`

**finding.** full-stack-serverless-cdk: 4× EDA-orphan-consumer

eb:appsync-events — Event 'eb:appsync-events' is consumed by step20_step_functions but no service in this repo declares a producer.
eb:custom.api — Event 'eb:custom.api' is consumed by step15_eventbridge but no service in this repo declares a producer.
eb:eru-appsync-events — Event 'eb:eru-appsync-events' is consumed by step15_eventbridge, step17_simple_notification_service but no service in this repo declares a producer.
sqs:testQueue — Event 'sqs:testQueue' is consumed by step18_simple_queue_service but no service in this repo declares a producer.

- `step20_step_functions/step06_invoke_step_function_with_event/lib/step06_invoke_step_function_with_event-stack.ts`
- `step15_eventbridge/Python/eventbridge_with_lambda/lib/cdk-stack.js`
- `step15_eventbridge/events_from_appsync/lib/events_from_appsync-stack.ts`
- `step18_simple_queue_service/python/sqs_to_lambda/lib/sqs_to_lambda-stack.ts`

## `finding:full-stack-serverless-cdk:EDA-orphan-producer:order`

**finding.** EDA-orphan-producer order (full-stack-serverless-cdk)

Event 'order' is published by step15_eventbridge but no service in this repo declares a consumer.

- `step15_eventbridge/eventbridge_with_lambda/lambda/producer.js`

## `finding:generator:EDA-orphan-consumer:summary`

**finding.** generator: 7× EDA-orphan-consumer

disconnect — Event 'disconnect' is consumed by slack-websocket-api-client but no service in this repo declares a producer.
dummyInfo — Event 'dummyInfo' is consumed by dummy-example-with-all-spec-features-included but no service in this repo declares a producer.
event — Event 'event' is consumed by slack-websocket-api-client but no service in this repo declares a producer.
MarketUpdateMessage — Event 'MarketUpdateMessage' is consumed by gemini-market-data-websocket-api but no service in this repo declares a producer.
messageWithDiscriminator — Event 'messageWithDiscriminator' is consumed by websocket-components-test-fixture but no service in this repo declares a producer.
MessageWithDiscriminatorNoConst — Event 'MessageWithDiscriminatorNoConst' is consumed by gemini-market-data-websocket-api but no service in this repo declares a producer.
MessageWithoutDiscriminator — Event 'MessageWithoutDiscriminator' is consumed by gemini-market-data-websocket-api but no service in this repo declares a producer.

- `packages/templates/clients/websocket/test/__fixtures__/asyncapi-slack-client.yml`
- `apps/generator/test/docs/dummy.yml`
- `packages/templates/clients/websocket/test/__fixtures__/asyncapi-slack-client.yml`
- `packages/helpers/test/__fixtures__/asyncapi-websocket-query.yml`
- `packages/templates/clients/websocket/test/__fixtures__/asyncapi-websocket-components.yml`
- `packages/helpers/test/__fixtures__/asyncapi-websocket-query.yml`
- `packages/helpers/test/__fixtures__/asyncapi-websocket-query.yml`

## `finding:generator:EDA-orphan-producer:summary`

**finding.** generator: 4× EDA-orphan-producer

costingResponse — Event 'costingResponse' is published by adeo-asyncapi-case-study but no service in this repo declares a consumer.
dummyCreated — Event 'dummyCreated' is published by dummy-example-with-all-spec-features-included but no service in this repo declares a consumer.
message1 — Event 'message1' is published by this-is-async-api-with-a-schema-reference but no service in this repo declares a consumer.
UserSignedUp — Event 'UserSignedUp' is published by account-service but no service in this repo declares a consumer.

- `packages/templates/clients/kafka/test/__fixtures__/asyncapi-adeo.yml`
- `apps/generator/test/docs/dummy.yml`
- `apps/generator/test/docs/apiwithref.json`
- `apps/generator/test/docs/dummyV3.yml`
- `packages/components/test/__fixtures__/asyncapi-v3.yml`

## `finding:laudspeaker:EDA-orphan-producer:nodeMovedTo`

**finding.** EDA-orphan-producer nodeMovedTo (laudspeaker)

Event 'nodeMovedTo' is published by api but no service in this repo declares a consumer.

- `packages/server/src/api/dev-mode/dev-mode.service.ts`

## `finding:microcks:EDA-004:message0`

**finding.** REVIEW EDA-004 message0

Producer spring-cloud-stream-request-reply-api. Missing person. Incompatible: spring-cloud-stream-request-reply-api.

- `/Users/lucian/Projects/personal/eda-assurance/.targets/microcks`

## `finding:microcks:EDA-orphan-consumer:summary`

**finding.** microcks: 6× EDA-orphan-consumer

lightMeasured — Event 'lightMeasured' is consumed by streetlights-api, streetlights-kafka-api but no service in this repo declares a producer.
message1 — Event 'message1' is consumed by account-service, user-signed-up-avro-api but no service in this repo declares a producer.
receivedUserSignedUp.message — Event 'receivedUserSignedUp.message' is consumed by user-signed-up-api but no service in this repo declares a producer.
serviceChangeEvent — Event 'serviceChangeEvent' is consumed by microcks-events-api-v1-10 but no service in this repo declares a producer.
UserSignupRequest — Event 'UserSignupRequest' is consumed by user-account-service but no service in this repo declares a producer.
UserVerificationRequest — Event 'UserVerificationRequest' is consumed by user-account-service but no service in this repo declares a producer.

- `commons/util/src/test/resources/io/github/microcks/util/asyncapi/streetlights-asyncapi.yaml`
- `webapp/src/test/resources/io/github/microcks/util/asyncapi/streetlights-asyncapi-3.0-dynamic.yaml`
- `webapp/src/test/resources/io/github/microcks/util/asyncapi/streetlights-asyncapi-3.0-static.yaml`
- `webapp/src/test/resources/io/github/microcks/util/asyncapi/streetlights-asyncapi.yaml`
- `commons/util/src/test/resources/io/github/microcks/util/asyncapi/account-service-asyncapi-oneof-2.3.yaml`
- `commons/util/src/test/resources/io/github/microcks/util/asyncapi/user-signedup-avro-asyncapi-oneof-2.3.yaml`
- `commons/util/src/test/resources/io/github/microcks/util/asyncapi/user-signedup-avro-ref-asyncapi-oneof-2.3.yaml`
- `minions/async/src/test/resources/io/github/microcks/minion/async/user-signedup-avro-asyncapi-oneof-2.3.yaml`
- `samples/UserSignedUpAPI-asyncapi-googlepubsub.yml`
- `samples/UserSignedUpAPI-asyncapi-nats.yml`
- `samples/UserSignedUpAPI-asyncapi-sns.yml`
- `samples/UserSignedUpAPI-asyncapi-sqs.yml`

## `finding:microcks:EDA-orphan-producer:summary`

**finding.** microcks: 4× EDA-orphan-producer

echo — Event 'echo' is published by message-sender-api but no service in this repo declares a consumer.
userDeleted — Event 'userDeleted' is published by user-lifecycle-api but no service in this repo declares a consumer.
userSignedOut — Event 'userSignedOut' is published by user-signed-up-api but no service in this repo declares a consumer.
userSignedUp — Event 'userSignedUp' is published by user-signed-up-api, user-signed-up-avro-api, user-lifecycle-api but no service in this repo declares a consumer.

- `minions/async/src/test/resources/io/github/microcks/minion/async/send-message-asyncapi-3.0.yaml`
- `webapp/src/test/resources/io/github/microcks/util/asyncapi/user-lifecycle-asyncapi-3.0-multi-messages.yaml`
- `commons/util/src/test/resources/io/github/microcks/util/asyncapi/user-signedup-asyncapi-oneof-3.0.yaml`
- `commons/util/src/test/resources/io/github/microcks/util/asyncapi/user-signedup-asyncapi-3.0.yaml`
- `commons/util/src/test/resources/io/github/microcks/util/asyncapi/user-signedup-asyncapi-oneof-3.0.yaml`
- `commons/util/src/test/resources/io/github/microcks/util/asyncapi/user-signedup-avro-asyncapi-3.0.yaml`
- `commons/util/src/test/resources/io/github/microcks/util/asyncapi/user-signedup-avro-ref-asyncapi-3.0.yaml`
- `minions/async/src/test/resources/io/github/microcks/minion/async/user-signedup-asyncapi-3.0.yaml`
- `webapp/src/test/resources/io/github/microcks/util/asyncapi/user-lifecycle-asyncapi-3.0-multi-messages.yaml`
- `webapp/src/test/resources/io/github/microcks/util/asyncapi/user-signedup-asyncapi-3.0-avro-absolute-ref.yaml`
- `webapp/src/test/resources/io/github/microcks/util/asyncapi/user-signedup-asyncapi-3.0-avro-ref.yaml`
- `webapp/src/test/resources/io/github/microcks/util/asyncapi/user-signedup-asyncapi-3.0-nameless.yaml`

## `finding:modelina:EDA-orphan-consumer:WorkersChangedPublicEvent`

**finding.** EDA-orphan-consumer WorkersChangedPublicEvent (modelina)

Event 'WorkersChangedPublicEvent' is consumed by event-bus but no service in this repo declares a producer.

- `test/processors/AsyncAPIInputProcessor/multiple_messages_in_operation.json`

## `finding:modelina:EDA-orphan-consumer:WorkersCreatedPublicEvent`

**finding.** EDA-orphan-consumer WorkersCreatedPublicEvent (modelina)

Event 'WorkersCreatedPublicEvent' is consumed by event-bus but no service in this repo declares a producer.

- `test/processors/AsyncAPIInputProcessor/multiple_messages_in_operation.json`

## `finding:modelina:EDA-orphan-producer:summary`

**finding.** modelina: 5× EDA-orphan-producer

Low — Event 'Low' is published by pg-service but no service in this repo declares a consumer.
message1 — Event 'message1' is published by cloudevent-example but no service in this repo declares a consumer.
setParame — Event 'setParame' is published by test but no service in this repo declares a consumer.
subscribe.message — Event 'subscribe.message' is published by account-service but no service in this repo declares a consumer.
userSignUpMessage — Event 'userSignUpMessage' is published by signup-service-example-internal but no service in this repo declares a consumer.

- `examples/generate-go-asyncapi-comments/index.ts`
- `test/processors/AsyncAPIInputProcessor/operation_oneof1.json`
- `test/processors/AsyncAPIInputProcessor/operation_oneof2.json`
- `test/processors/AsyncAPIInputProcessor/operation_with_reply.json`
- `modelina-cli/test/fixtures/asyncapi_v3.json`
- `modelina-cli/test/fixtures/asyncapi_v3.yml`
- `test/processors/AsyncAPIInputProcessor/basic_v3.json`

## `finding:nest-cqrs:EDA-orphan-consumer:summary`

**finding.** nest-cqrs: 4× EDA-orphan-consumer

OrderCreatedEvent — Event 'OrderCreatedEvent' is consumed by orders but no service in this repo declares a producer.
OrderDeletedEvent — Event 'OrderDeletedEvent' is consumed by orders but no service in this repo declares a producer.
OrderFoundEvent — Event 'OrderFoundEvent' is consumed by orders but no service in this repo declares a producer.
OrderUpdatedEvent — Event 'OrderUpdatedEvent' is consumed by orders but no service in this repo declares a producer.

- `src/orders/events/impl/order-created.event.ts`
- `src/orders/events/impl/order-deleted.event.ts`
- `src/orders/events/impl/order-found.event.ts`
- `src/orders/events/impl/order-updated.event.ts`

## `finding:nestjs-asyncapi:EDA-orphan-consumer:summary`

**finding.** nestjs-asyncapi: 4× EDA-orphan-consumer

FelinesController_journal — Event 'FelinesController_journal' is consumed by feline but no service in this repo declares a producer.
ms/create/feline — Event 'ms/create/feline' is consumed by felines-controller but no service in this repo declares a producer.
oneOf_demo_1 — Event 'oneOf_demo_1' is consumed by feline but no service in this repo declares a producer.
oneOf_demo_2 — Event 'oneOf_demo_2' is consumed by feline but no service in this repo declares a producer.

- `misc/references/ref.json`
- `misc/references/ref.yaml`
- `sample/felines/felines.controller.ts`
- `misc/references/ref.json`
- `misc/references/ref.yaml`
- `misc/references/ref.json`
- `misc/references/ref.yaml`

## `finding:nestjs-asyncapi:EDA-orphan-producer:FelinesGateway_createFeline`

**finding.** EDA-orphan-producer FelinesGateway_createFeline (nestjs-asyncapi)

Event 'FelinesGateway_createFeline' is published by feline but no service in this repo declares a consumer.

- `misc/references/ref.json`
- `misc/references/ref.yaml`

## `finding:nestjs-boilerplate-microservice:EDA-orphan-consumer:summary`

**finding.** nestjs-boilerplate-microservice: 4× EDA-orphan-consumer

UserCreatedEvent — Event 'UserCreatedEvent' is consumed by users but no service in this repo declares a producer.
UserDeletedEvent — Event 'UserDeletedEvent' is consumed by users but no service in this repo declares a producer.
UserUpdatedEvent — Event 'UserUpdatedEvent' is consumed by users but no service in this repo declares a producer.
UserWelcomedEvent — Event 'UserWelcomedEvent' is consumed by users but no service in this repo declares a producer.

- `src/modules/users/events/handlers/user-created.handler.ts`
- `src/modules/users/events/handlers/user-deleted.handler.ts`
- `src/modules/users/events/handlers/user-updated.handler.ts`
- `src/modules/users/events/handlers/user-welcomed.handler.ts`

## `finding:nestjs-clean-architecture-example:EDA-orphan-consumer:notifications.send`

**finding.** EDA-orphan-consumer notifications.send (nestjs-clean-architecture-example)

Event 'notifications.send' is consumed by infra but no service in this repo declares a producer.

- `src/infra/messaging/kafka/controllers/notifications.controller.ts`

## `finding:nestjs-kafka:EDA-orphan-consumer:test.topic`

**finding.** EDA-orphan-consumer test.topic (nestjs-kafka)

Event 'test.topic' is consumed by test-controller but no service in this repo declares a producer.

- `test/e2e/app/test.controller.ts`

## `finding:payments-settled:EDA-004:payments.settled.v1`

**finding.** REVIEW EDA-004 payments.settled.v1

Producer billing-service. Missing settlementReference. Incompatible: ledger-service, reporting-worker.

- `/Users/lucian/Projects/personal/eda-assurance/fixtures/payments-settled`

## `finding:pg-listen:EDA-orphan-producer:test2`

**finding.** EDA-orphan-producer test2 (pg-listen)

Event 'test2' is published by pg-listen-test but no service in this repo declares a consumer.

- `test/integration.test.ts`

## `finding:resolve:EDA-orphan-producer:summary`

**finding.** resolve: 22× EDA-orphan-producer

ANOTHER_EVENT — Event 'ANOTHER_EVENT' is published by tools but no service in this repo declares a consumer.
application — Event 'application' is published by event-broadcast-factory but no service in this repo declares a consumer.
BAD_EVENT — Event 'BAD_EVENT' is published by runtime but no service in this repo declares a consumer.
EVENT — Event 'EVENT' is published by core but no service in this repo declares a consumer.
EVENT_EXTRA — Event 'EVENT_EXTRA' is published by import-export-test but no service in this repo declares a consumer.
ITEM_CREATED — Event 'ITEM_CREATED' is published by runtime but no service in this repo declares a consumer.
LARGE_EVENT — Event 'LARGE_EVENT' is published by index-test but no service in this repo declares a consumer.
PARALLEL_TYPE — Event 'PARALLEL_TYPE' is published by index-test but no service in this repo declares a consumer.

- `packages/tools/testing-tools/test/aggregate.test.ts`
- `packages/runtime/runtimes/runtime-base/src/event-broadcast-factory.ts`
- `packages/runtime/runtimes/runtime-aws-serverless/test/index.test.ts`
- `packages/core/redux/test/view-model/actions.test.ts`
- `tests/import-export-sample/import-export.test.ts`
- `packages/runtime/runtimes/runtime-base/test/event-broadcast-factory.test.ts`
- `tests/eventstore-order-events/index.test.ts`
- `tests/eventstore-parallel-save/index.test.ts`
- `tests/eventstore-parallel-save/index.test.ts`
- `tests/eventstore-parallel-save/index.test.ts`
- `packages/tools/testing-tools/test/read-model.test.ts`
- `packages/core/core/test/get-aggregates-interop-builder.unit.test.ts`

## `finding:sdk-javascript:EDA-orphan-consumer:example.bad.event`

**finding.** EDA-orphan-consumer example.bad.event (sdk-javascript)

Event 'example.bad.event' is consumed by message-test but no service in this repo declares a producer.

- `test/integration/message_test.ts`

## `finding:sdk-javascript:EDA-orphan-consumer:test.type`

**finding.** EDA-orphan-consumer test.type (sdk-javascript)

Event 'test.type' is consumed by message-test but no service in this repo declares a producer.

- `test/integration/message_test.ts`

## `finding:sdk-javascript:EDA-orphan-producer:summary`

**finding.** sdk-javascript: 6× EDA-orphan-producer

cloudevents.test — Event 'cloudevents.test' is published by spec-1-tests but no service in this repo declares a consumer.
current.weather — Event 'current.weather' is published by websocket but no service in this repo declares a consumer.
emitter.test — Event 'emitter.test' is published by emitter-factory-test but no service in this repo declares a consumer.
my.event.type — Event 'my.event.type' is published by cloud-event-test but no service in this repo declares a consumer.
weather.error — Event 'weather.error' is published by websocket but no service in this repo declares a consumer.
weather.query — Event 'weather.query' is published by websocket but no service in this repo declares a consumer.

- `test/integration/spec_1_tests.ts`
- `examples/websocket/server.js`
- `test/integration/emitter_factory_test.ts`
- `test/integration/cloud_event_test.ts`
- `examples/websocket/server.js`
- `examples/websocket/client.js`

## `finding:spec:EDA-orphan-consumer:summary`

**finding.** spec: 8× EDA-orphan-consumer

lightMeasured — Event 'lightMeasured' is consumed by application-headers-example, correlation-id-example, streetlights-kafka-api, streetlights-mqtt-api but no service in this repo declares a producer.
outgoingMessage — Event 'outgoingMessage' is consumed by slack-real-time-messaging-api but no service in this repo declares a producer.
ping — Event 'ping' is consumed by kraken-websockets-api but no service in this repo declares a producer.
receiveSumResult — Event 'receiveSumResult' is consumed by rpc-client-example but no service in this repo declares a producer.
subscribe — Event 'subscribe' is consumed by kraken-websockets-api but no service in this repo declares a producer.
sum — Event 'sum' is consumed by rpc-server-example but no service in this repo declares a producer.
testMessages — Event 'testMessages' is consumed by anyof-example, not-example, oneof-example but no service in this repo declares a producer.
unsubscribe — Event 'unsubscribe' is consumed by kraken-websockets-api but no service in this repo declares a producer.

- `examples/application-headers-asyncapi.yml`
- `examples/correlation-id-asyncapi.yml`
- `examples/streetlights-kafka-asyncapi.yml`
- `examples/streetlights-mqtt-asyncapi.yml`
- `examples/streetlights-operation-security-asyncapi.yml`
- `examples/slack-rtm-asyncapi.yml`
- `examples/kraken-websocket-request-reply-message-filter-in-reply-asyncapi.yml`
- `examples/kraken-websocket-request-reply-multiple-channels-asyncapi.yml`
- `examples/rpc-client-asyncapi.yml`
- `examples/kraken-websocket-request-reply-message-filter-in-reply-asyncapi.yml`
- `examples/kraken-websocket-request-reply-multiple-channels-asyncapi.yml`
- `examples/rpc-server-asyncapi.yml`

## `finding:spec:EDA-orphan-producer:summary`

**finding.** spec: 57× EDA-orphan-producer

accountsChanged — Event 'accountsChanged' is published by slack-real-time-messaging-api but no service in this repo declares a consumer.
authRevoke — Event 'authRevoke' is published by notifications but no service in this repo declares a consumer.
botAdded — Event 'botAdded' is published by slack-real-time-messaging-api but no service in this repo declares a consumer.
botChanged — Event 'botChanged' is published by slack-real-time-messaging-api but no service in this repo declares a consumer.
channelArchive — Event 'channelArchive' is published by slack-real-time-messaging-api but no service in this repo declares a consumer.
channelCreated — Event 'channelCreated' is published by slack-real-time-messaging-api but no service in this repo declares a consumer.
channelDeleted — Event 'channelDeleted' is published by slack-real-time-messaging-api but no service in this repo declares a consumer.
channelHistoryChanged — Event 'channelHistoryChanged' is published by slack-real-time-messaging-api but no service in this repo declares a consumer.

- `examples/slack-rtm-asyncapi.yml`
- `examples/operation-security-asyncapi.yml`
- `examples/slack-rtm-asyncapi.yml`
- `examples/slack-rtm-asyncapi.yml`
- `examples/slack-rtm-asyncapi.yml`
- `examples/slack-rtm-asyncapi.yml`
- `examples/slack-rtm-asyncapi.yml`
- `examples/slack-rtm-asyncapi.yml`
- `examples/slack-rtm-asyncapi.yml`
- `examples/slack-rtm-asyncapi.yml`
- `examples/slack-rtm-asyncapi.yml`
- `examples/slack-rtm-asyncapi.yml`

## `finding:specmatic:EDA-orphan-consumer:ping`

**finding.** EDA-orphan-consumer ping (specmatic)

Event 'ping' is consumed by ping-pong-mania but no service in this repo declares a producer.

- `application/src/test/resources/specifications/asyncapi.yaml`

## `finding:spectral:EDA-orphan-producer:lightMeasured`

**finding.** EDA-orphan-producer lightMeasured (spectral)

Event 'lightMeasured' is published by streetlights-api but no service in this repo declares a consumer.

- `packages/core/src/__tests__/__fixtures__/streetlights.asyncapi2.json`

## `finding:springwolf-core:EDA-orphan-consumer:summary`

**finding.** springwolf-core: 26× EDA-orphan-consumer

ExamplePayloadDto — Event 'ExamplePayloadDto' is consumed by springwolf-example-project-cloud-stream but no service in this repo declares a producer.
Foo — Event 'Foo' is consumed by springwolf-core-integration-test but no service in this repo declares a producer.
GooglePubSubPayloadDto — Event 'GooglePubSubPayloadDto' is consumed by springwolf-example-project-cloud-stream but no service in this repo declares a producer.
integer — Event 'integer' is consumed by springwolf-core-integration-test but no service in this repo declares a producer.
io.github.springwolf.core.integrationtests.application.polymorphic.PolymorphicPayloadApplication.Payload — Event 'io.github.springwolf.core.integrationtests.application.polymorphic.PolymorphicPayloadApplication.Payload' is consumed by springwolf-core-integration-test but no service in this repo declares a producer.
io.github.springwolf.core.integrationtests.application.ref.SchemaEnumAsRefApplication.Schemas.MyEnumRoot — Event 'io.github.springwolf.core.integrationtests.application.ref.SchemaEnumAsRefApplication.Schemas.MyEnumRoot' is consumed by springwolf-core-integration-test but no service in this repo declares a producer.
io.github.springwolf.examples.amqp.dtos.ExamplePayloadDto — Event 'io.github.springwolf.examples.amqp.dtos.ExamplePayloadDto' is consumed by springwolf-example-project-amqp but no service in this repo declares a producer.
io.github.springwolf.examples.amqp.dtos.GenericPayloadDtoIo.github.springwolf.examples.amqp.dtos.ExamplePayloadDto — Event 'io.github.springwolf.examples.amqp.dtos.GenericPayloadDtoIo.github.springwolf.examples.amqp.dtos.ExamplePayloadDto' is consumed by springwolf-example-project-amqp but no service in this repo declares a producer.

- `springwolf-examples/springwolf-cloud-stream-example/src/test/resources/asyncapi.json`
- `springwolf-core/src/test/resources/application/asyncapi.fqn.json`
- `springwolf-examples/springwolf-cloud-stream-example/src/test/resources/asyncapi.json`
- `springwolf-core/src/test/resources/application/asyncapi.fqn.json`
- `springwolf-core/src/test/resources/application/asyncapi.polymorphic.json`
- `springwolf-core/src/test/resources/application/asyncapi.ref.json`
- `springwolf-examples/springwolf-amqp-example/src/test/resources/asyncapi.json`
- `springwolf-examples/springwolf-amqp-example/src/test/resources/asyncapi.yaml`
- `springwolf-examples/springwolf-amqp-example/src/test/resources/asyncapi.json`
- `springwolf-examples/springwolf-amqp-example/src/test/resources/asyncapi.yaml`
- `springwolf-examples/springwolf-amqp-example/src/test/resources/asyncapi.json`
- `springwolf-examples/springwolf-amqp-example/src/test/resources/asyncapi.yaml`

## `finding:springwolf-core:EDA-orphan-producer:summary`

**finding.** springwolf-core: 4× EDA-orphan-producer

io.github.springwolf.core.ExamplePayload — Event 'io.github.springwolf.core.ExamplePayload' is published by asyncapi-sample-app but no service in this repo declares a consumer.
io.github.springwolf.examples.kafka.dtos.NestedPayloadDto — Event 'io.github.springwolf.examples.kafka.dtos.NestedPayloadDto' is published by springwolf-example-project-kafka but no service in this repo declares a consumer.
io.github.springwolf.examples.stomp.dtos.AnotherPayloadDto — Event 'io.github.springwolf.examples.stomp.dtos.AnotherPayloadDto' is published by springwolf-example-project-stomp but no service in this repo declares a consumer.
UserSignedUp — Event 'UserSignedUp' is published by account-service but no service in this repo declares a consumer.

- `springwolf-asyncapi/src/test/resources/v3/asyncapi/asyncapi-openapischema.json`
- `springwolf-asyncapi/src/test/resources/v3/asyncapi/asyncapi-openapischema.yaml`
- `springwolf-asyncapi/src/test/resources/v3/asyncapi/asyncapi.json`
- `springwolf-asyncapi/src/test/resources/v3/asyncapi/asyncapi.yaml`
- `springwolf-examples/springwolf-kafka-example/src/test/resources/asyncapi.json`
- `springwolf-examples/springwolf-kafka-example/src/test/resources/asyncapi.openapiv31.json`
- `springwolf-examples/springwolf-kafka-example/src/test/resources/asyncapi.yaml`
- `springwolf-examples/springwolf-stomp-example/src/test/resources/asyncapi.json`
- `springwolf-asyncapi/src/test/resources/v3/model/simple-asyncapi.json`

## `finding:studio:EDA-orphan-consumer:summary`

**finding.** studio: 6× EDA-orphan-consumer

lightMeasured — Event 'lightMeasured' is consumed by streetlights-kafka-api, streetlights-mqtt-api but no service in this repo declares a producer.
LightMeasured — Event 'LightMeasured' is consumed by streetlights-api but no service in this repo declares a producer.
outgoingMessage — Event 'outgoingMessage' is consumed by slack-real-time-messaging-api but no service in this repo declares a producer.
ping — Event 'ping' is consumed by kraken-websockets-api but no service in this repo declares a producer.
subscribe — Event 'subscribe' is consumed by kraken-websockets-api but no service in this repo declares a producer.
unsubscribe — Event 'unsubscribe' is consumed by kraken-websockets-api but no service in this repo declares a producer.

- `apps/studio/src/examples/streetlights-kafka.yml`
- `apps/studio/src/examples/streetlights-mqtt.yml`
- `apps/studio/src/examples/tutorials/invalid.yml`
- `apps/studio/src/examples/real-world/slack-rtm.yml`
- `apps/studio/src/examples/real-world/kraken-api-request-reply-filter.yml`
- `apps/studio/src/examples/real-world/kraken-api-request-reply-filter.yml`
- `apps/studio/src/examples/real-world/kraken-api-request-reply-filter.yml`

## `finding:studio:EDA-orphan-producer:summary`

**finding.** studio: 51× EDA-orphan-producer

accountsChanged — Event 'accountsChanged' is published by slack-real-time-messaging-api but no service in this repo declares a consumer.
botAdded — Event 'botAdded' is published by slack-real-time-messaging-api but no service in this repo declares a consumer.
botChanged — Event 'botChanged' is published by slack-real-time-messaging-api but no service in this repo declares a consumer.
channelArchive — Event 'channelArchive' is published by slack-real-time-messaging-api but no service in this repo declares a consumer.
channelCreated — Event 'channelCreated' is published by slack-real-time-messaging-api but no service in this repo declares a consumer.
channelDeleted — Event 'channelDeleted' is published by slack-real-time-messaging-api but no service in this repo declares a consumer.
channelHistoryChanged — Event 'channelHistoryChanged' is published by slack-real-time-messaging-api but no service in this repo declares a consumer.
channelJoined — Event 'channelJoined' is published by slack-real-time-messaging-api but no service in this repo declares a consumer.

- `apps/studio/src/examples/real-world/slack-rtm.yml`
- `apps/studio/src/examples/real-world/slack-rtm.yml`
- `apps/studio/src/examples/real-world/slack-rtm.yml`
- `apps/studio/src/examples/real-world/slack-rtm.yml`
- `apps/studio/src/examples/real-world/slack-rtm.yml`
- `apps/studio/src/examples/real-world/slack-rtm.yml`
- `apps/studio/src/examples/real-world/slack-rtm.yml`
- `apps/studio/src/examples/real-world/slack-rtm.yml`
- `apps/studio/src/examples/real-world/slack-rtm.yml`
- `apps/studio/src/examples/real-world/slack-rtm.yml`
- `apps/studio/src/examples/real-world/slack-rtm.yml`
- `apps/studio/src/examples/real-world/slack-rtm.yml`

## `finding:ultimate-backend:EDA-orphan-consumer:summary`

**finding.** ultimate-backend: 36× EDA-orphan-consumer

AccessTokenCreatedEvent — Event 'AccessTokenCreatedEvent' is consumed by cqrs but no service in this repo declares a producer.
AccessTokenDeletedEvent — Event 'AccessTokenDeletedEvent' is consumed by cqrs but no service in this repo declares a producer.
EmailVerifiedEvent — Event 'EmailVerifiedEvent' is consumed by cqrs but no service in this repo declares a producer.
ForgotPasswordSentEvent — Event 'ForgotPasswordSentEvent' is consumed by cqrs but no service in this repo declares a producer.
MemberAcceptedInvitationEvent — Event 'MemberAcceptedInvitationEvent' is consumed by cqrs but no service in this repo declares a producer.
MemberInvitedEvent — Event 'MemberInvitedEvent' is consumed by cqrs but no service in this repo declares a producer.
MemberRemovedEvent — Event 'MemberRemovedEvent' is consumed by cqrs but no service in this repo declares a producer.
MemberUpdatedEvent — Event 'MemberUpdatedEvent' is consumed by cqrs but no service in this repo declares a producer.

- `libs/core/src/cqrs/events/impl/access-token/access-token-created.event.ts`
- `libs/core/src/cqrs/events/impl/access-token/access-token-deleted.event.ts`
- `libs/core/src/cqrs/events/impl/account/email-verified.event.ts`
- `libs/core/src/cqrs/events/impl/account/forgot-password-sent.event.ts`
- `libs/core/src/cqrs/events/impl/member/member-accepted-invitation.event.ts`
- `libs/core/src/cqrs/events/impl/member/member-invited.event.ts`
- `libs/core/src/cqrs/events/impl/member/member-removed.event.ts`
- `libs/core/src/cqrs/events/impl/member/member-updated.event.ts`
- `libs/core/src/cqrs/events/impl/card/payment-method-added.event.ts`
- `libs/core/src/cqrs/events/impl/card/payment-method-deleted.event.ts`
- `libs/core/src/cqrs/events/impl/card/payment-method-updated.event.ts`
- `libs/core/src/cqrs/events/impl/plan/plan-created.event.ts`

## `finding:zilla:EDA-orphan-consumer:event`

**finding.** EDA-orphan-consumer Event (zilla)

Event 'Event' is consumed by eventstore-kafka-api but no service in this repo declares a producer.

- `examples/asyncapi.sse.kafka.proxy/etc/specs/kafka-asyncapi.yaml`
- `examples/asyncapi.sse.kafka.proxy/etc/specs/sse-asyncapi.yaml`
- `examples/asyncapi.sse.proxy/etc/specs/sse-asyncapi.yaml`

## `human:night-2026-09-23-article`

**human.** Day: review article draft + night checklist, then publish

Night runs ops/NIGHT-PLAN.md (article checklist, demo polish, night cycle). Day reviews docs/08-article-draft.md against ops/drafts/article-checklist-*.md, then publishes / Show HN. Do not expand extractors.

- `docs/08-article-draft.md`
- `ops/NIGHT-PLAN.md`
- `docs/07-article-outline.md`
- `docs/06-demo-scenario.md`

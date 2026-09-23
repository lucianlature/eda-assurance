# Event-contract scan

Findings: 11 (plus 1 info)

## No deployed fleet pins

**info.** No deployed versions available. Rolling-window compatibility (breaking field removal vs live consumers) was not evaluated. This scan is in-repo topology only.

Rule id: `EDA-INFO-NO-FLEET`

## Orphan producer — `echo`

**medium.** Event 'echo' is published by message-sender-api but no service in this repo declares a consumer.

Rule id: `EDA-orphan-producer`

- `minions/async/src/test/resources/io/github/microcks/minion/async/send-message-asyncapi-3.0.yaml`

## Orphan consumer — `lightMeasured`

**high.** Event 'lightMeasured' is consumed by streetlights-api, streetlights-kafka-api but no service in this repo declares a producer.

Rule id: `EDA-orphan-consumer`

- `commons/util/src/test/resources/io/github/microcks/util/asyncapi/streetlights-asyncapi.yaml`
- `webapp/src/test/resources/io/github/microcks/util/asyncapi/streetlights-asyncapi-3.0-dynamic.yaml`
- `webapp/src/test/resources/io/github/microcks/util/asyncapi/streetlights-asyncapi-3.0-static.yaml`
- `webapp/src/test/resources/io/github/microcks/util/asyncapi/streetlights-asyncapi.yaml`

## Breaking field removal — `message0`

**high.** Removing required field(s) `person` from 'message0' is incompatible with spring-cloud-stream-request-reply-api during a rolling deploy. Dual-publish a v2, redeploy this consumer first, or file a signed exception.

Rule id: `EDA-004`

- `commons/util/src/test/resources/io/github/microcks/util/asyncapi/spring-cloud-stream-asyncapi-nulls.yaml`
- `commons/util/src/test/resources/io/github/microcks/util/asyncapi/account-service-asyncapi-oneof-2.1.yaml`
- `commons/util/src/test/resources/io/github/microcks/util/asyncapi/account-service-asyncapi-oneof-2.3.yaml`
- `commons/util/src/test/resources/io/github/microcks/util/asyncapi/account-service-asyncapi.yaml`
- `commons/util/src/test/resources/io/github/microcks/util/asyncapi/account-service-ref-asyncapi.yaml`
- `commons/util/src/test/resources/io/github/microcks/util/asyncapi/account-service-ref-ref-asyncapi.yaml`
- `commons/util/src/test/resources/io/github/microcks/util/asyncapi/spring-cloud-stream-asyncapi-nulls.yaml`
- `commons/util/src/test/resources/io/github/microcks/util/asyncapi/user-signedup-asyncapi.yaml`
- `commons/util/src/test/resources/io/github/microcks/util/asyncapi/user-signedup-avro-asyncapi-oneof-2.3.yaml`
- `commons/util/src/test/resources/io/github/microcks/util/asyncapi/user-signedup-avro-asyncapi.yaml`
- `commons/util/src/test/resources/io/github/microcks/util/asyncapi/user-signedup-avro-ref-asyncapi-oneof-2.3.yaml`
- `commons/util/src/test/resources/io/github/microcks/util/asyncapi/user-signedup-avro-ref-asyncapi.yaml`
- `commons/util/src/test/resources/io/github/microcks/util/asyncapi/user-signedup-json-ref-asyncapi.yaml`
- `commons/util/src/test/resources/io/github/microcks/util/asyncapi/user-signedup-out-asyncapi.yaml`
- `minions/async/src/test/resources/io/github/microcks/minion/async/user-signedup-avro-asyncapi-oneof-2.3.yaml`
- `webapp/src/test/resources/filled-templates/asyncapi-2.4.yaml`
- `webapp/src/test/resources/io/github/microcks/util/asyncapi/account-service-asyncapi-amqp.yaml`
- `webapp/src/test/resources/io/github/microcks/util/asyncapi/account-service-asyncapi.yaml`
- `webapp/src/test/resources/io/github/microcks/util/asyncapi/api-maintenance.async-api-spec-gh-master.yaml`
- `webapp/src/test/resources/io/github/microcks/util/asyncapi/api-maintenance.async-api-spec-ws-kv.yaml`
- `webapp/src/test/resources/io/github/microcks/util/asyncapi/api-maintenance.async-api-spec-ws.yaml`
- `webapp/src/test/resources/io/github/microcks/util/asyncapi/api-maintenance.async-api-spec.yaml`
- `webapp/src/test/resources/io/github/microcks/util/asyncapi/user-events-asyncapi-2.1.yaml`
- `webapp/src/test/resources/io/github/microcks/util/asyncapi/user-signedup-asyncapi-2.1.yaml`
- `webapp/src/test/resources/io/github/microcks/util/asyncapi/user-signedup-asyncapi-gh-master.yaml`
- `webapp/src/test/resources/io/github/microcks/util/asyncapi/user-signedup-asyncapi-oneliner.json`
- `webapp/src/test/resources/io/github/microcks/util/asyncapi/user-signedup-asyncapi-ws.yaml`
- `webapp/src/test/resources/io/github/microcks/util/asyncapi/user-signedup-asyncapi.json`
- `webapp/src/test/resources/io/github/microcks/util/asyncapi/user-signedup-asyncapi.yaml`
- `webapp/src/test/resources/io/github/microcks/util/asyncapi/user-signedup-avro-asyncapi.yaml`
- `webapp/src/test/resources/io/github/microcks/util/asyncapi/user-signedup-avro-ref-asyncapi.yaml`
- `webapp/src/test/resources/io/github/microcks/util/asyncapi/user-signedup-cloudevents-binary.yaml`
- `webapp/src/test/resources/io/github/microcks/util/asyncapi/user-signedup-cloudevents-structured.yaml`
- `webapp/src/test/resources/io/github/microcks/util/asyncapi/user-signedup-json-ref-asyncapi.yaml`

## Orphan consumer — `message1`

**high.** Event 'message1' is consumed by account-service, user-signed-up-avro-api but no service in this repo declares a producer.

Rule id: `EDA-orphan-consumer`

- `commons/util/src/test/resources/io/github/microcks/util/asyncapi/account-service-asyncapi-oneof-2.3.yaml`
- `commons/util/src/test/resources/io/github/microcks/util/asyncapi/user-signedup-avro-asyncapi-oneof-2.3.yaml`
- `commons/util/src/test/resources/io/github/microcks/util/asyncapi/user-signedup-avro-ref-asyncapi-oneof-2.3.yaml`
- `minions/async/src/test/resources/io/github/microcks/minion/async/user-signedup-avro-asyncapi-oneof-2.3.yaml`

## Orphan consumer — `receivedUserSignedUp.message`

**high.** Event 'receivedUserSignedUp.message' is consumed by user-signed-up-api but no service in this repo declares a producer.

Rule id: `EDA-orphan-consumer`

- `samples/UserSignedUpAPI-asyncapi-googlepubsub.yml`
- `samples/UserSignedUpAPI-asyncapi-nats.yml`
- `samples/UserSignedUpAPI-asyncapi-sns.yml`
- `samples/UserSignedUpAPI-asyncapi-sqs.yml`
- `samples/UserSignedUpAPI-asyncapi-ws.yml`
- `samples/UserSignedUpAPI-asyncapi.yml`

## Orphan consumer — `serviceChangeEvent`

**high.** Event 'serviceChangeEvent' is consumed by microcks-events-api-v1-10 but no service in this repo declares a producer.

Rule id: `EDA-orphan-consumer`

- `api/microcks-asyncapi-v1.10.yaml`

## Orphan producer — `userDeleted`

**medium.** Event 'userDeleted' is published by user-lifecycle-api but no service in this repo declares a consumer.

Rule id: `EDA-orphan-producer`

- `webapp/src/test/resources/io/github/microcks/util/asyncapi/user-lifecycle-asyncapi-3.0-multi-messages.yaml`

## Orphan producer — `userSignedOut`

**medium.** Event 'userSignedOut' is published by user-signed-up-api but no service in this repo declares a consumer.

Rule id: `EDA-orphan-producer`

- `commons/util/src/test/resources/io/github/microcks/util/asyncapi/user-signedup-asyncapi-oneof-3.0.yaml`

## Orphan producer — `userSignedUp`

**medium.** Event 'userSignedUp' is published by user-signed-up-api, user-signed-up-avro-api, user-lifecycle-api but no service in this repo declares a consumer.

Rule id: `EDA-orphan-producer`

- `commons/util/src/test/resources/io/github/microcks/util/asyncapi/user-signedup-asyncapi-3.0.yaml`
- `commons/util/src/test/resources/io/github/microcks/util/asyncapi/user-signedup-asyncapi-oneof-3.0.yaml`
- `commons/util/src/test/resources/io/github/microcks/util/asyncapi/user-signedup-avro-asyncapi-3.0.yaml`
- `commons/util/src/test/resources/io/github/microcks/util/asyncapi/user-signedup-avro-ref-asyncapi-3.0.yaml`
- `minions/async/src/test/resources/io/github/microcks/minion/async/user-signedup-asyncapi-3.0.yaml`
- `webapp/src/test/resources/io/github/microcks/util/asyncapi/user-lifecycle-asyncapi-3.0-multi-messages.yaml`
- `webapp/src/test/resources/io/github/microcks/util/asyncapi/user-signedup-asyncapi-3.0-avro-absolute-ref.yaml`
- `webapp/src/test/resources/io/github/microcks/util/asyncapi/user-signedup-asyncapi-3.0-avro-ref.yaml`
- `webapp/src/test/resources/io/github/microcks/util/asyncapi/user-signedup-asyncapi-3.0-nameless.yaml`
- `webapp/src/test/resources/io/github/microcks/util/asyncapi/user-signedup-asyncapi-3.0-ref.yaml`
- `webapp/src/test/resources/io/github/microcks/util/asyncapi/user-signedup-asyncapi-3.0.yaml`

## Orphan consumer — `UserSignupRequest`

**high.** Event 'UserSignupRequest' is consumed by user-account-service but no service in this repo declares a producer.

Rule id: `EDA-orphan-consumer`

- `minions/async/src/test/resources/io/github/microcks/minion/async/user-signedup-asyncapi-3.0-reply.yaml`
- `webapp/src/test/resources/io/github/microcks/util/asyncapi/user-signedup-asyncapi-3.0-reply.yaml`

## Orphan consumer — `UserVerificationRequest`

**high.** Event 'UserVerificationRequest' is consumed by user-account-service but no service in this repo declares a producer.

Rule id: `EDA-orphan-consumer`

- `minions/async/src/test/resources/io/github/microcks/minion/async/user-signedup-asyncapi-3.0-reply.yaml`
- `webapp/src/test/resources/io/github/microcks/util/asyncapi/user-signedup-asyncapi-3.0-reply.yaml`

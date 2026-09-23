# Event-contract scan

Findings: 30 (plus 1 info)

## No deployed fleet pins

**info.** No deployed versions available. Rolling-window compatibility (breaking field removal vs live consumers) was not evaluated. This scan is in-repo topology only.

Rule id: `EDA-INFO-NO-FLEET`

## Orphan consumer — `ExamplePayloadDto`

**high.** Event 'ExamplePayloadDto' is consumed by springwolf-example-project-cloud-stream but no service in this repo declares a producer.

Rule id: `EDA-orphan-consumer`

- `springwolf-examples/springwolf-cloud-stream-example/src/test/resources/asyncapi.json`

## Orphan consumer — `Foo`

**high.** Event 'Foo' is consumed by springwolf-core-integration-test but no service in this repo declares a producer.

Rule id: `EDA-orphan-consumer`

- `springwolf-core/src/test/resources/application/asyncapi.fqn.json`

## Orphan consumer — `GooglePubSubPayloadDto`

**high.** Event 'GooglePubSubPayloadDto' is consumed by springwolf-example-project-cloud-stream but no service in this repo declares a producer.

Rule id: `EDA-orphan-consumer`

- `springwolf-examples/springwolf-cloud-stream-example/src/test/resources/asyncapi.json`

## Orphan consumer — `integer`

**high.** Event 'integer' is consumed by springwolf-core-integration-test but no service in this repo declares a producer.

Rule id: `EDA-orphan-consumer`

- `springwolf-core/src/test/resources/application/asyncapi.fqn.json`

## Orphan producer — `io.github.springwolf.core.ExamplePayload`

**medium.** Event 'io.github.springwolf.core.ExamplePayload' is published by asyncapi-sample-app but no service in this repo declares a consumer.

Rule id: `EDA-orphan-producer`

- `springwolf-asyncapi/src/test/resources/v3/asyncapi/asyncapi-openapischema.json`
- `springwolf-asyncapi/src/test/resources/v3/asyncapi/asyncapi-openapischema.yaml`
- `springwolf-asyncapi/src/test/resources/v3/asyncapi/asyncapi.json`
- `springwolf-asyncapi/src/test/resources/v3/asyncapi/asyncapi.yaml`

## Orphan consumer — `io.github.springwolf.core.integrationtests.application.polymorphic.PolymorphicPayloadApplication.Payload`

**high.** Event 'io.github.springwolf.core.integrationtests.application.polymorphic.PolymorphicPayloadApplication.Payload' is consumed by springwolf-core-integration-test but no service in this repo declares a producer.

Rule id: `EDA-orphan-consumer`

- `springwolf-core/src/test/resources/application/asyncapi.polymorphic.json`

## Orphan consumer — `io.github.springwolf.core.integrationtests.application.ref.SchemaEnumAsRefApplication.Schemas.MyEnumRoot`

**high.** Event 'io.github.springwolf.core.integrationtests.application.ref.SchemaEnumAsRefApplication.Schemas.MyEnumRoot' is consumed by springwolf-core-integration-test but no service in this repo declares a producer.

Rule id: `EDA-orphan-consumer`

- `springwolf-core/src/test/resources/application/asyncapi.ref.json`

## Orphan consumer — `io.github.springwolf.examples.amqp.dtos.ExamplePayloadDto`

**high.** Event 'io.github.springwolf.examples.amqp.dtos.ExamplePayloadDto' is consumed by springwolf-example-project-amqp but no service in this repo declares a producer.

Rule id: `EDA-orphan-consumer`

- `springwolf-examples/springwolf-amqp-example/src/test/resources/asyncapi.json`
- `springwolf-examples/springwolf-amqp-example/src/test/resources/asyncapi.yaml`

## Orphan consumer — `io.github.springwolf.examples.amqp.dtos.GenericPayloadDtoIo.github.springwolf.examples.amqp.dtos.ExamplePayloadDto`

**high.** Event 'io.github.springwolf.examples.amqp.dtos.GenericPayloadDtoIo.github.springwolf.examples.amqp.dtos.ExamplePayloadDto' is consumed by springwolf-example-project-amqp but no service in this repo declares a producer.

Rule id: `EDA-orphan-consumer`

- `springwolf-examples/springwolf-amqp-example/src/test/resources/asyncapi.json`
- `springwolf-examples/springwolf-amqp-example/src/test/resources/asyncapi.yaml`

## Orphan consumer — `io.github.springwolf.examples.amqp.dtos.GenericPayloadDtoJava.lang.Long`

**high.** Event 'io.github.springwolf.examples.amqp.dtos.GenericPayloadDtoJava.lang.Long' is consumed by springwolf-example-project-amqp but no service in this repo declares a producer.

Rule id: `EDA-orphan-consumer`

- `springwolf-examples/springwolf-amqp-example/src/test/resources/asyncapi.json`
- `springwolf-examples/springwolf-amqp-example/src/test/resources/asyncapi.yaml`

## Orphan consumer — `io.github.springwolf.examples.amqp.dtos.GenericPayloadDtoJava.lang.String`

**high.** Event 'io.github.springwolf.examples.amqp.dtos.GenericPayloadDtoJava.lang.String' is consumed by springwolf-example-project-amqp but no service in this repo declares a producer.

Rule id: `EDA-orphan-consumer`

- `springwolf-examples/springwolf-amqp-example/src/test/resources/asyncapi.json`
- `springwolf-examples/springwolf-amqp-example/src/test/resources/asyncapi.yaml`

## Orphan consumer — `io.github.springwolf.examples.jms.dtos.ExamplePayloadDto`

**high.** Event 'io.github.springwolf.examples.jms.dtos.ExamplePayloadDto' is consumed by springwolf-example-project-jms but no service in this repo declares a producer.

Rule id: `EDA-orphan-consumer`

- `springwolf-examples/springwolf-jms-example/src/test/resources/asyncapi.json`

## Orphan consumer — `io.github.springwolf.examples.kafka.dto.avro.AnotherPayloadAvroDto`

**high.** Event 'io.github.springwolf.examples.kafka.dto.avro.AnotherPayloadAvroDto' is consumed by springwolf-example-project-kafka but no service in this repo declares a producer.

Rule id: `EDA-orphan-consumer`

- `springwolf-examples/springwolf-kafka-example/src/test/resources/asyncapi.json`
- `springwolf-examples/springwolf-kafka-example/src/test/resources/asyncapi.openapiv31.json`
- `springwolf-examples/springwolf-kafka-example/src/test/resources/asyncapi.yaml`
- `springwolf-examples/springwolf-kafka-example/src/main/avro/ExamplePayloadAvroDto.avsc`

## Orphan consumer — `io.github.springwolf.examples.kafka.dto.proto.ExamplePayloadProtobufDto.Message`

**high.** Event 'io.github.springwolf.examples.kafka.dto.proto.ExamplePayloadProtobufDto.Message' is consumed by springwolf-example-project-kafka but no service in this repo declares a producer.

Rule id: `EDA-orphan-consumer`

- `springwolf-examples/springwolf-kafka-example/src/test/resources/asyncapi.json`
- `springwolf-examples/springwolf-kafka-example/src/test/resources/asyncapi.openapiv31.json`
- `springwolf-examples/springwolf-kafka-example/src/test/resources/asyncapi.yaml`

## Orphan consumer — `io.github.springwolf.examples.kafka.dtos.discriminator.VehicleBase`

**high.** Event 'io.github.springwolf.examples.kafka.dtos.discriminator.VehicleBase' is consumed by springwolf-example-project-kafka but no service in this repo declares a producer.

Rule id: `EDA-orphan-consumer`

- `springwolf-examples/springwolf-kafka-example/src/test/resources/asyncapi.json`
- `springwolf-examples/springwolf-kafka-example/src/test/resources/asyncapi.openapiv31.json`
- `springwolf-examples/springwolf-kafka-example/src/test/resources/asyncapi.yaml`
- `springwolf-examples/springwolf-kafka-example/src/test/resources/groups/vehicles.json`

## Orphan consumer — `io.github.springwolf.examples.kafka.dtos.ExamplePayloadDto`

**high.** Event 'io.github.springwolf.examples.kafka.dtos.ExamplePayloadDto' is consumed by springwolf-example-project-kafka but no service in this repo declares a producer.

Rule id: `EDA-orphan-consumer`

- `springwolf-examples/springwolf-kafka-example/src/test/resources/asyncapi.json`
- `springwolf-examples/springwolf-kafka-example/src/test/resources/asyncapi.openapiv31.json`
- `springwolf-examples/springwolf-kafka-example/src/test/resources/asyncapi.yaml`

## Orphan producer — `io.github.springwolf.examples.kafka.dtos.NestedPayloadDto`

**medium.** Event 'io.github.springwolf.examples.kafka.dtos.NestedPayloadDto' is published by springwolf-example-project-kafka but no service in this repo declares a consumer.

Rule id: `EDA-orphan-producer`

- `springwolf-examples/springwolf-kafka-example/src/test/resources/asyncapi.json`
- `springwolf-examples/springwolf-kafka-example/src/test/resources/asyncapi.openapiv31.json`
- `springwolf-examples/springwolf-kafka-example/src/test/resources/asyncapi.yaml`

## Orphan consumer — `io.github.springwolf.examples.kafka.dtos.RequiredAndNullablePayloadDto`

**high.** Event 'io.github.springwolf.examples.kafka.dtos.RequiredAndNullablePayloadDto' is consumed by springwolf-example-project-kafka but no service in this repo declares a producer.

Rule id: `EDA-orphan-consumer`

- `springwolf-examples/springwolf-kafka-example/src/test/resources/asyncapi.json`
- `springwolf-examples/springwolf-kafka-example/src/test/resources/asyncapi.openapiv31.json`
- `springwolf-examples/springwolf-kafka-example/src/test/resources/asyncapi.yaml`

## Orphan consumer — `io.github.springwolf.examples.kafka.dtos.XmlPayloadDto`

**high.** Event 'io.github.springwolf.examples.kafka.dtos.XmlPayloadDto' is consumed by springwolf-example-project-kafka but no service in this repo declares a producer.

Rule id: `EDA-orphan-consumer`

- `springwolf-examples/springwolf-kafka-example/src/test/resources/asyncapi.json`
- `springwolf-examples/springwolf-kafka-example/src/test/resources/asyncapi.openapiv31.json`
- `springwolf-examples/springwolf-kafka-example/src/test/resources/asyncapi.yaml`

## Orphan consumer — `io.github.springwolf.examples.kafka.dtos.YamlPayloadDto`

**high.** Event 'io.github.springwolf.examples.kafka.dtos.YamlPayloadDto' is consumed by springwolf-example-project-kafka but no service in this repo declares a producer.

Rule id: `EDA-orphan-consumer`

- `springwolf-examples/springwolf-kafka-example/src/test/resources/asyncapi.json`
- `springwolf-examples/springwolf-kafka-example/src/test/resources/asyncapi.openapiv31.json`
- `springwolf-examples/springwolf-kafka-example/src/test/resources/asyncapi.yaml`

## Orphan consumer — `io.github.springwolf.examples.sns.dtos.ExamplePayloadDto`

**high.** Event 'io.github.springwolf.examples.sns.dtos.ExamplePayloadDto' is consumed by springwolf-example-project-sns but no service in this repo declares a producer.

Rule id: `EDA-orphan-consumer`

- `springwolf-examples/springwolf-sns-example/src/test/resources/asyncapi.json`

## Orphan consumer — `io.github.springwolf.examples.sqs.dtos.ExamplePayloadDto`

**high.** Event 'io.github.springwolf.examples.sqs.dtos.ExamplePayloadDto' is consumed by springwolf-example-project-sqs but no service in this repo declares a producer.

Rule id: `EDA-orphan-consumer`

- `springwolf-examples/springwolf-sqs-example/src/test/resources/asyncapi.json`

## Orphan producer — `io.github.springwolf.examples.stomp.dtos.AnotherPayloadDto`

**medium.** Event 'io.github.springwolf.examples.stomp.dtos.AnotherPayloadDto' is published by springwolf-example-project-stomp but no service in this repo declares a consumer.

Rule id: `EDA-orphan-producer`

- `springwolf-examples/springwolf-stomp-example/src/test/resources/asyncapi.json`

## Orphan consumer — `io.github.springwolf.examples.stomp.dtos.ExamplePayloadDto`

**high.** Event 'io.github.springwolf.examples.stomp.dtos.ExamplePayloadDto' is consumed by springwolf-example-project-stomp but no service in this repo declares a producer.

Rule id: `EDA-orphan-consumer`

- `springwolf-examples/springwolf-stomp-example/src/test/resources/asyncapi.json`

## Orphan consumer — `javax.money.MonetaryAmount`

**high.** Event 'javax.money.MonetaryAmount' is consumed by springwolf-example-project-kafka but no service in this repo declares a producer.

Rule id: `EDA-orphan-consumer`

- `springwolf-examples/springwolf-kafka-example/src/test/resources/asyncapi.json`
- `springwolf-examples/springwolf-kafka-example/src/test/resources/asyncapi.openapiv31.json`
- `springwolf-examples/springwolf-kafka-example/src/test/resources/asyncapi.yaml`

## Orphan consumer — `lightMeasured`

**high.** Event 'lightMeasured' is consumed by streetlights-kafka-api but no service in this repo declares a producer.

Rule id: `EDA-orphan-consumer`

- `springwolf-asyncapi/src/test/resources/v3/model/streetlights-kafka-asyncapi.json`

## Orphan consumer — `PayloadNotUsed`

**high.** Event 'PayloadNotUsed' is consumed by springwolf-example-project-kafka but no service in this repo declares a producer.

Rule id: `EDA-orphan-consumer`

- `springwolf-examples/springwolf-kafka-example/src/test/resources/asyncapi.json`
- `springwolf-examples/springwolf-kafka-example/src/test/resources/asyncapi.openapiv31.json`
- `springwolf-examples/springwolf-kafka-example/src/test/resources/asyncapi.yaml`

## Orphan consumer — `string`

**high.** Event 'string' is consumed by springwolf-core-integration-test but no service in this repo declares a producer.

Rule id: `EDA-orphan-consumer`

- `springwolf-core/src/test/resources/application/asyncapi.fqn.json`

## Orphan consumer — `StringPayload`

**high.** Event 'StringPayload' is consumed by springwolf-example-project-kafka but no service in this repo declares a producer.

Rule id: `EDA-orphan-consumer`

- `springwolf-examples/springwolf-kafka-example/src/test/resources/asyncapi.json`
- `springwolf-examples/springwolf-kafka-example/src/test/resources/asyncapi.openapiv31.json`
- `springwolf-examples/springwolf-kafka-example/src/test/resources/asyncapi.yaml`

## Orphan producer — `UserSignedUp`

**medium.** Event 'UserSignedUp' is published by account-service but no service in this repo declares a consumer.

Rule id: `EDA-orphan-producer`

- `springwolf-asyncapi/src/test/resources/v3/model/simple-asyncapi.json`

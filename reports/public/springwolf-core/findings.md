# Event-contract scan

Findings: 30 (plus 1 info)

## EDA-INFO-NO-FLEET

**info.** No deployed versions available. Rolling-window compatibility (EDA-004) was not evaluated. This scan is in-repo topology only.

## EDA-orphan-consumer — `ExamplePayloadDto`

**high.** Event 'ExamplePayloadDto' is consumed by springwolf-example-project-cloud-stream but no service in this repo declares a producer.

- `springwolf-examples/springwolf-cloud-stream-example/src/test/resources/asyncapi.json`

## EDA-orphan-consumer — `Foo`

**high.** Event 'Foo' is consumed by springwolf-core-integration-test but no service in this repo declares a producer.

- `springwolf-core/src/test/resources/application/asyncapi.fqn.json`

## EDA-orphan-consumer — `GooglePubSubPayloadDto`

**high.** Event 'GooglePubSubPayloadDto' is consumed by springwolf-example-project-cloud-stream but no service in this repo declares a producer.

- `springwolf-examples/springwolf-cloud-stream-example/src/test/resources/asyncapi.json`

## EDA-orphan-consumer — `integer`

**high.** Event 'integer' is consumed by springwolf-core-integration-test but no service in this repo declares a producer.

- `springwolf-core/src/test/resources/application/asyncapi.fqn.json`

## EDA-orphan-producer — `io.github.springwolf.core.ExamplePayload`

**medium.** Event 'io.github.springwolf.core.ExamplePayload' is published by asyncapi-sample-app but no service in this repo declares a consumer.

- `springwolf-asyncapi/src/test/resources/v3/asyncapi/asyncapi-openapischema.json`
- `springwolf-asyncapi/src/test/resources/v3/asyncapi/asyncapi-openapischema.yaml`
- `springwolf-asyncapi/src/test/resources/v3/asyncapi/asyncapi.json`
- `springwolf-asyncapi/src/test/resources/v3/asyncapi/asyncapi.yaml`

## EDA-orphan-consumer — `io.github.springwolf.core.integrationtests.application.polymorphic.PolymorphicPayloadApplication.Payload`

**high.** Event 'io.github.springwolf.core.integrationtests.application.polymorphic.PolymorphicPayloadApplication.Payload' is consumed by springwolf-core-integration-test but no service in this repo declares a producer.

- `springwolf-core/src/test/resources/application/asyncapi.polymorphic.json`

## EDA-orphan-consumer — `io.github.springwolf.core.integrationtests.application.ref.SchemaEnumAsRefApplication.Schemas.MyEnumRoot`

**high.** Event 'io.github.springwolf.core.integrationtests.application.ref.SchemaEnumAsRefApplication.Schemas.MyEnumRoot' is consumed by springwolf-core-integration-test but no service in this repo declares a producer.

- `springwolf-core/src/test/resources/application/asyncapi.ref.json`

## EDA-orphan-consumer — `io.github.springwolf.examples.amqp.dtos.ExamplePayloadDto`

**high.** Event 'io.github.springwolf.examples.amqp.dtos.ExamplePayloadDto' is consumed by springwolf-example-project-amqp but no service in this repo declares a producer.

- `springwolf-examples/springwolf-amqp-example/src/test/resources/asyncapi.json`
- `springwolf-examples/springwolf-amqp-example/src/test/resources/asyncapi.yaml`

## EDA-orphan-consumer — `io.github.springwolf.examples.amqp.dtos.GenericPayloadDtoIo.github.springwolf.examples.amqp.dtos.ExamplePayloadDto`

**high.** Event 'io.github.springwolf.examples.amqp.dtos.GenericPayloadDtoIo.github.springwolf.examples.amqp.dtos.ExamplePayloadDto' is consumed by springwolf-example-project-amqp but no service in this repo declares a producer.

- `springwolf-examples/springwolf-amqp-example/src/test/resources/asyncapi.json`
- `springwolf-examples/springwolf-amqp-example/src/test/resources/asyncapi.yaml`

## EDA-orphan-consumer — `io.github.springwolf.examples.amqp.dtos.GenericPayloadDtoJava.lang.Long`

**high.** Event 'io.github.springwolf.examples.amqp.dtos.GenericPayloadDtoJava.lang.Long' is consumed by springwolf-example-project-amqp but no service in this repo declares a producer.

- `springwolf-examples/springwolf-amqp-example/src/test/resources/asyncapi.json`
- `springwolf-examples/springwolf-amqp-example/src/test/resources/asyncapi.yaml`

## EDA-orphan-consumer — `io.github.springwolf.examples.amqp.dtos.GenericPayloadDtoJava.lang.String`

**high.** Event 'io.github.springwolf.examples.amqp.dtos.GenericPayloadDtoJava.lang.String' is consumed by springwolf-example-project-amqp but no service in this repo declares a producer.

- `springwolf-examples/springwolf-amqp-example/src/test/resources/asyncapi.json`
- `springwolf-examples/springwolf-amqp-example/src/test/resources/asyncapi.yaml`

## EDA-orphan-consumer — `io.github.springwolf.examples.jms.dtos.ExamplePayloadDto`

**high.** Event 'io.github.springwolf.examples.jms.dtos.ExamplePayloadDto' is consumed by springwolf-example-project-jms but no service in this repo declares a producer.

- `springwolf-examples/springwolf-jms-example/src/test/resources/asyncapi.json`

## EDA-orphan-consumer — `io.github.springwolf.examples.kafka.dto.avro.AnotherPayloadAvroDto`

**high.** Event 'io.github.springwolf.examples.kafka.dto.avro.AnotherPayloadAvroDto' is consumed by springwolf-example-project-kafka but no service in this repo declares a producer.

- `springwolf-examples/springwolf-kafka-example/src/test/resources/asyncapi.json`
- `springwolf-examples/springwolf-kafka-example/src/test/resources/asyncapi.openapiv31.json`
- `springwolf-examples/springwolf-kafka-example/src/test/resources/asyncapi.yaml`
- `springwolf-examples/springwolf-kafka-example/src/main/avro/ExamplePayloadAvroDto.avsc`

## EDA-orphan-consumer — `io.github.springwolf.examples.kafka.dto.proto.ExamplePayloadProtobufDto.Message`

**high.** Event 'io.github.springwolf.examples.kafka.dto.proto.ExamplePayloadProtobufDto.Message' is consumed by springwolf-example-project-kafka but no service in this repo declares a producer.

- `springwolf-examples/springwolf-kafka-example/src/test/resources/asyncapi.json`
- `springwolf-examples/springwolf-kafka-example/src/test/resources/asyncapi.openapiv31.json`
- `springwolf-examples/springwolf-kafka-example/src/test/resources/asyncapi.yaml`

## EDA-orphan-consumer — `io.github.springwolf.examples.kafka.dtos.discriminator.VehicleBase`

**high.** Event 'io.github.springwolf.examples.kafka.dtos.discriminator.VehicleBase' is consumed by springwolf-example-project-kafka but no service in this repo declares a producer.

- `springwolf-examples/springwolf-kafka-example/src/test/resources/asyncapi.json`
- `springwolf-examples/springwolf-kafka-example/src/test/resources/asyncapi.openapiv31.json`
- `springwolf-examples/springwolf-kafka-example/src/test/resources/asyncapi.yaml`
- `springwolf-examples/springwolf-kafka-example/src/test/resources/groups/vehicles.json`

## EDA-orphan-consumer — `io.github.springwolf.examples.kafka.dtos.ExamplePayloadDto`

**high.** Event 'io.github.springwolf.examples.kafka.dtos.ExamplePayloadDto' is consumed by springwolf-example-project-kafka but no service in this repo declares a producer.

- `springwolf-examples/springwolf-kafka-example/src/test/resources/asyncapi.json`
- `springwolf-examples/springwolf-kafka-example/src/test/resources/asyncapi.openapiv31.json`
- `springwolf-examples/springwolf-kafka-example/src/test/resources/asyncapi.yaml`

## EDA-orphan-producer — `io.github.springwolf.examples.kafka.dtos.NestedPayloadDto`

**medium.** Event 'io.github.springwolf.examples.kafka.dtos.NestedPayloadDto' is published by springwolf-example-project-kafka but no service in this repo declares a consumer.

- `springwolf-examples/springwolf-kafka-example/src/test/resources/asyncapi.json`
- `springwolf-examples/springwolf-kafka-example/src/test/resources/asyncapi.openapiv31.json`
- `springwolf-examples/springwolf-kafka-example/src/test/resources/asyncapi.yaml`

## EDA-orphan-consumer — `io.github.springwolf.examples.kafka.dtos.RequiredAndNullablePayloadDto`

**high.** Event 'io.github.springwolf.examples.kafka.dtos.RequiredAndNullablePayloadDto' is consumed by springwolf-example-project-kafka but no service in this repo declares a producer.

- `springwolf-examples/springwolf-kafka-example/src/test/resources/asyncapi.json`
- `springwolf-examples/springwolf-kafka-example/src/test/resources/asyncapi.openapiv31.json`
- `springwolf-examples/springwolf-kafka-example/src/test/resources/asyncapi.yaml`

## EDA-orphan-consumer — `io.github.springwolf.examples.kafka.dtos.XmlPayloadDto`

**high.** Event 'io.github.springwolf.examples.kafka.dtos.XmlPayloadDto' is consumed by springwolf-example-project-kafka but no service in this repo declares a producer.

- `springwolf-examples/springwolf-kafka-example/src/test/resources/asyncapi.json`
- `springwolf-examples/springwolf-kafka-example/src/test/resources/asyncapi.openapiv31.json`
- `springwolf-examples/springwolf-kafka-example/src/test/resources/asyncapi.yaml`

## EDA-orphan-consumer — `io.github.springwolf.examples.kafka.dtos.YamlPayloadDto`

**high.** Event 'io.github.springwolf.examples.kafka.dtos.YamlPayloadDto' is consumed by springwolf-example-project-kafka but no service in this repo declares a producer.

- `springwolf-examples/springwolf-kafka-example/src/test/resources/asyncapi.json`
- `springwolf-examples/springwolf-kafka-example/src/test/resources/asyncapi.openapiv31.json`
- `springwolf-examples/springwolf-kafka-example/src/test/resources/asyncapi.yaml`

## EDA-orphan-consumer — `io.github.springwolf.examples.sns.dtos.ExamplePayloadDto`

**high.** Event 'io.github.springwolf.examples.sns.dtos.ExamplePayloadDto' is consumed by springwolf-example-project-sns but no service in this repo declares a producer.

- `springwolf-examples/springwolf-sns-example/src/test/resources/asyncapi.json`

## EDA-orphan-consumer — `io.github.springwolf.examples.sqs.dtos.ExamplePayloadDto`

**high.** Event 'io.github.springwolf.examples.sqs.dtos.ExamplePayloadDto' is consumed by springwolf-example-project-sqs but no service in this repo declares a producer.

- `springwolf-examples/springwolf-sqs-example/src/test/resources/asyncapi.json`

## EDA-orphan-producer — `io.github.springwolf.examples.stomp.dtos.AnotherPayloadDto`

**medium.** Event 'io.github.springwolf.examples.stomp.dtos.AnotherPayloadDto' is published by springwolf-example-project-stomp but no service in this repo declares a consumer.

- `springwolf-examples/springwolf-stomp-example/src/test/resources/asyncapi.json`

## EDA-orphan-consumer — `io.github.springwolf.examples.stomp.dtos.ExamplePayloadDto`

**high.** Event 'io.github.springwolf.examples.stomp.dtos.ExamplePayloadDto' is consumed by springwolf-example-project-stomp but no service in this repo declares a producer.

- `springwolf-examples/springwolf-stomp-example/src/test/resources/asyncapi.json`

## EDA-orphan-consumer — `javax.money.MonetaryAmount`

**high.** Event 'javax.money.MonetaryAmount' is consumed by springwolf-example-project-kafka but no service in this repo declares a producer.

- `springwolf-examples/springwolf-kafka-example/src/test/resources/asyncapi.json`
- `springwolf-examples/springwolf-kafka-example/src/test/resources/asyncapi.openapiv31.json`
- `springwolf-examples/springwolf-kafka-example/src/test/resources/asyncapi.yaml`

## EDA-orphan-consumer — `lightMeasured`

**high.** Event 'lightMeasured' is consumed by streetlights-kafka-api but no service in this repo declares a producer.

- `springwolf-asyncapi/src/test/resources/v3/model/streetlights-kafka-asyncapi.json`

## EDA-orphan-consumer — `PayloadNotUsed`

**high.** Event 'PayloadNotUsed' is consumed by springwolf-example-project-kafka but no service in this repo declares a producer.

- `springwolf-examples/springwolf-kafka-example/src/test/resources/asyncapi.json`
- `springwolf-examples/springwolf-kafka-example/src/test/resources/asyncapi.openapiv31.json`
- `springwolf-examples/springwolf-kafka-example/src/test/resources/asyncapi.yaml`

## EDA-orphan-consumer — `string`

**high.** Event 'string' is consumed by springwolf-core-integration-test but no service in this repo declares a producer.

- `springwolf-core/src/test/resources/application/asyncapi.fqn.json`

## EDA-orphan-consumer — `StringPayload`

**high.** Event 'StringPayload' is consumed by springwolf-example-project-kafka but no service in this repo declares a producer.

- `springwolf-examples/springwolf-kafka-example/src/test/resources/asyncapi.json`
- `springwolf-examples/springwolf-kafka-example/src/test/resources/asyncapi.openapiv31.json`
- `springwolf-examples/springwolf-kafka-example/src/test/resources/asyncapi.yaml`

## EDA-orphan-producer — `UserSignedUp`

**medium.** Event 'UserSignedUp' is published by account-service but no service in this repo declares a consumer.

- `springwolf-asyncapi/src/test/resources/v3/model/simple-asyncapi.json`

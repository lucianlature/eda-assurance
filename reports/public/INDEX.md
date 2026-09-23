# Public scan reports

Generated 2026-09-23T15:44Z.

Engine: `@lucianlature/eda-assurance` (`scan`). Extractors: EventCatalog, **AsyncAPI 2/3**, NATS TS, TS `apps/*/src/events|consumers|streams`, fixture topology YAML.

Zero findings with extractors `(none)` means **no extractor matched**, not “safe.” NestJS decorators / KafkaJS / Avro-registry-only still need extractors.

Batch: **31** repos scanned. **9** produced topology. **5** had actionable findings.

Candidate shortlist: [`../candidates.md`](../candidates.md).

| Repo | Contracts | Findings | Extractors | Report |
| --- | ---: | ---: | --- | --- |
| [asyncapi/studio](https://github.com/asyncapi/studio) | 63 | 57 | `asyncapi` | [findings](studio/findings.md) · [topology](studio/topology.yaml) |
| [event-catalog/federation-organization-example](https://github.com/event-catalog/federation-organization-example) | 88 | 36 | `eventcatalog, asyncapi` | [findings](federation-organization-example/findings.md) · [topology](federation-organization-example/topology.yaml) |
| [flamewow/nestjs-asyncapi](https://github.com/flamewow/nestjs-asyncapi) | 5 | 4 | `asyncapi` | [findings](nestjs-asyncapi/findings.md) · [topology](nestjs-asyncapi/topology.yaml) |
| [event-catalog/eventcatalog-ai-demo](https://github.com/event-catalog/eventcatalog-ai-demo) | 2 | 2 | `asyncapi` | [findings](eventcatalog-ai-demo/findings.md) · [topology](eventcatalog-ai-demo/topology.yaml) |
| [lucianlature/eda-assurance (fixture)](https://github.com/lucianlature/eda-assurance/tree/main/fixtures/payments-settled) | 1 | 2 | `ts-events, fixture-topology` | [findings](payments-settled/findings.md) · [topology](payments-settled/topology.yaml) |
| [saalikmubeen/microservices-architectured-app](https://github.com/saalikmubeen/microservices-architectured-app) | 6 | 0 | `nats-node` | [findings](microservices-architectured-app/findings.md) · [topology](microservices-architectured-app/topology.yaml) |
| [boostercloud/booster](https://github.com/boostercloud/booster) | 2 | 0 | `nats-node` | [findings](booster/findings.md) · [topology](booster/topology.yaml) |
| [meysamhadeli/booking-microservices-expressjs](https://github.com/meysamhadeli/booking-microservices-expressjs) | 1 | 0 | `nats-node` | [findings](booking-microservices-expressjs/findings.md) · [topology](booking-microservices-expressjs/topology.yaml) |
| [bitloops/ddd-hexagonal-cqrs-es-eda](https://github.com/bitloops/ddd-hexagonal-cqrs-es-eda) | 1 | 0 | `nats-node` | [findings](ddd-hexagonal-cqrs-es-eda/findings.md) · [topology](ddd-hexagonal-cqrs-es-eda/topology.yaml) |
| [oskardudycz/EventSourcing.NodeJS](https://github.com/oskardudycz/EventSourcing.NodeJS) | 0 | 0 | `(none)` | [findings](EventSourcing.NodeJS/findings.md) · [topology](EventSourcing.NodeJS/topology.yaml) |
| [danilop/ServerlessByDesign](https://github.com/danilop/ServerlessByDesign) | 0 | 0 | `(none)` | [findings](ServerlessByDesign/findings.md) · [topology](ServerlessByDesign/topology.yaml) |
| [event-catalog/backstage-eventcatalog-demo](https://github.com/event-catalog/backstage-eventcatalog-demo) | 0 | 0 | `(none)` | [findings](backstage-eventcatalog-demo/findings.md) · [topology](backstage-eventcatalog-demo/topology.yaml) |
| [domagojk/beenion](https://github.com/domagojk/beenion) | 0 | 0 | `(none)` | [findings](beenion/findings.md) · [topology](beenion/topology.yaml) |
| [meysamhadeli/booking-microservices-nestjs](https://github.com/meysamhadeli/booking-microservices-nestjs) | 0 | 0 | `(none)` | [findings](booking-microservices-nestjs/findings.md) · [topology](booking-microservices-nestjs/topology.yaml) |
| [castore-dev/castore](https://github.com/castore-dev/castore) | 0 | 0 | `(none)` | [findings](castore/findings.md) · [topology](castore/topology.yaml) |
| [kafkajs/confluent-schema-registry](https://github.com/kafkajs/confluent-schema-registry) | 0 | 0 | `(none)` | [findings](confluent-schema-registry/findings.md) · [topology](confluent-schema-registry/topology.yaml) |
| [AdrianLopezGue/daruma-backend](https://github.com/AdrianLopezGue/daruma-backend) | 0 | 0 | `(none)` | [findings](daruma-backend/findings.md) · [topology](daruma-backend/topology.yaml) |
| [event-driven-io/emmett](https://github.com/event-driven-io/emmett) | 0 | 0 | `(none)` | [findings](emmett/findings.md) · [topology](emmett/topology.yaml) |
| [ArkerLabs/event-sourcing-nestjs](https://github.com/ArkerLabs/event-sourcing-nestjs) | 0 | 0 | `(none)` | [findings](event-sourcing-nestjs/findings.md) · [topology](event-sourcing-nestjs/topology.yaml) |
| [diego3g/flowly](https://github.com/diego3g/flowly) | 0 | 0 | `(none)` | [findings](flowly/findings.md) · [topology](flowly/topology.yaml) |
| [event-catalog/flowmart-schema-registry](https://github.com/event-catalog/flowmart-schema-registry) | 0 | 0 | `(none)` | [findings](flowmart-schema-registry/findings.md) · [topology](flowmart-schema-registry/topology.yaml) |
| [panacloud-modern-global-apps/full-stack-serverless-cdk](https://github.com/panacloud-modern-global-apps/full-stack-serverless-cdk) | 0 | 0 | `(none)` | [findings](full-stack-serverless-cdk/findings.md) · [topology](full-stack-serverless-cdk/topology.yaml) |
| [glandjs/gland](https://github.com/glandjs/gland) | 0 | 0 | `(none)` | [findings](gland/findings.md) · [topology](gland/topology.yaml) |
| [0xb4lamx/nestjs-boilerplate-microservice](https://github.com/0xb4lamx/nestjs-boilerplate-microservice) | 0 | 0 | `(none)` | [findings](nestjs-boilerplate-microservice/findings.md) · [topology](nestjs-boilerplate-microservice/topology.yaml) |
| [rob3000/nestjs-kafka](https://github.com/rob3000/nestjs-kafka) | 0 | 0 | `(none)` | [findings](nestjs-kafka/findings.md) · [topology](nestjs-kafka/topology.yaml) |
| [andywer/pg-listen](https://github.com/andywer/pg-listen) | 0 | 0 | `(none)` | [findings](pg-listen/findings.md) · [topology](pg-listen/topology.yaml) |
| [cloudevents/sdk-javascript](https://github.com/cloudevents/sdk-javascript) | 0 | 0 | `(none)` | [findings](sdk-javascript/findings.md) · [topology](sdk-javascript/topology.yaml) |
| [aleios-cloud/sls-test-tools](https://github.com/aleios-cloud/sls-test-tools) | 0 | 0 | `(none)` | [findings](sls-test-tools/findings.md) · [topology](sls-test-tools/topology.yaml) |
| [zhuravlevma/typescript-ddd-architecture](https://github.com/zhuravlevma/typescript-ddd-architecture) | 0 | 0 | `(none)` | [findings](typescript-ddd-architecture/findings.md) · [topology](typescript-ddd-architecture/topology.yaml) |
| [SamHatoum/typescript-event-sourcing](https://github.com/SamHatoum/typescript-event-sourcing) | 0 | 0 | `(none)` | [findings](typescript-event-sourcing/findings.md) · [topology](typescript-event-sourcing/topology.yaml) |
| [juicycleff/ultimate-backend](https://github.com/juicycleff/ultimate-backend) | 0 | 0 | `(none)` | [findings](ultimate-backend/findings.md) · [topology](ultimate-backend/topology.yaml) |

## Signal vs silence

| Outcome | Count | Meaning |
| --- | ---: | --- |
| Topology extracted | 9 | At least one extractor fired |
| No topology | 22 | Still need Nest/KafkaJS/etc. |
| Actionable findings | 5 | Orphans or EDA-004 |


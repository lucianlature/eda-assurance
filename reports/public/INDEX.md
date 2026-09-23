# Public scan reports

Generated 2026-09-23T17:46:36Z.

Engine: `@lucianlature/eda-assurance` (`scan`). Extractors: EventCatalog, **AsyncAPI 2/3**, **Nest**, **AWS EventBridge/SNS/SQS**, **KafkaJS/Avro**, **pg-listen/NOTIFY**, NATS, TS events, fixture topology.

Zero findings with extractors `(none)` means **no extractor matched**, not “safe.” Remaining silence is mostly ES frameworks / libs / empty clones.

Batch: **31** repos scanned. **21** produced topology. **13** had findings.

Candidate shortlist: [`../candidates.md`](../candidates.md).

| Repo | Contracts | Findings | Extractors | Report |
| --- | ---: | ---: | --- | --- |
| [event-catalog/federation-organization-example](https://github.com/event-catalog/federation-organization-example) | 88 | 36 | `eventcatalog, asyncapi` | [findings](federation-organization-example/findings.md) · [topology](federation-organization-example/topology.yaml) |
| [asyncapi/studio](https://github.com/asyncapi/studio) | 63 | 57 | `asyncapi` | [findings](studio/findings.md) · [topology](studio/topology.yaml) |
| [juicycleff/ultimate-backend](https://github.com/juicycleff/ultimate-backend) | 36 | 36 | `nest` | [findings](ultimate-backend/findings.md) · [topology](ultimate-backend/topology.yaml) |
| [AdrianLopezGue/daruma-backend](https://github.com/AdrianLopezGue/daruma-backend) | 30 | 30 | `nest` | [findings](daruma-backend/findings.md) · [topology](daruma-backend/topology.yaml) |
| [panacloud-modern-global-apps/full-stack-serverless-cdk](https://github.com/panacloud-modern-global-apps/full-stack-serverless-cdk) | 26 | 5 | `aws` | [findings](full-stack-serverless-cdk/findings.md) · [topology](full-stack-serverless-cdk/topology.yaml) |
| [meysamhadeli/booking-microservices-expressjs](https://github.com/meysamhadeli/booking-microservices-expressjs) | 10 | 9 | `nats-node, nest` | [findings](booking-microservices-expressjs/findings.md) · [topology](booking-microservices-expressjs/topology.yaml) |
| [zhuravlevma/typescript-ddd-architecture](https://github.com/zhuravlevma/typescript-ddd-architecture) | 10 | 0 | `nest` | [findings](typescript-ddd-architecture/findings.md) · [topology](typescript-ddd-architecture/topology.yaml) |
| [meysamhadeli/booking-microservices-nestjs](https://github.com/meysamhadeli/booking-microservices-nestjs) | 9 | 8 | `nest` | [findings](booking-microservices-nestjs/findings.md) · [topology](booking-microservices-nestjs/topology.yaml) |
| [flamewow/nestjs-asyncapi](https://github.com/flamewow/nestjs-asyncapi) | 7 | 5 | `asyncapi, nest` | [findings](nestjs-asyncapi/findings.md) · [topology](nestjs-asyncapi/topology.yaml) |
| [saalikmubeen/microservices-architectured-app](https://github.com/saalikmubeen/microservices-architectured-app) | 6 | 0 | `nats-node` | [findings](microservices-architectured-app/findings.md) · [topology](microservices-architectured-app/topology.yaml) |
| [0xb4lamx/nestjs-boilerplate-microservice](https://github.com/0xb4lamx/nestjs-boilerplate-microservice) | 5 | 4 | `nest` | [findings](nestjs-boilerplate-microservice/findings.md) · [topology](nestjs-boilerplate-microservice/topology.yaml) |
| [event-catalog/flowmart-schema-registry](https://github.com/event-catalog/flowmart-schema-registry) | 5 | 0 | `kafkajs` | [findings](flowmart-schema-registry/findings.md) · [topology](flowmart-schema-registry/topology.yaml) |
| [event-catalog/eventcatalog-ai-demo](https://github.com/event-catalog/eventcatalog-ai-demo) | 4 | 2 | `asyncapi, kafkajs` | [findings](eventcatalog-ai-demo/findings.md) · [topology](eventcatalog-ai-demo/topology.yaml) |
| [rob3000/nestjs-kafka](https://github.com/rob3000/nestjs-kafka) | 3 | 1 | `kafkajs, nest` | [findings](nestjs-kafka/findings.md) · [topology](nestjs-kafka/topology.yaml) |
| [andywer/pg-listen](https://github.com/andywer/pg-listen) | 2 | 1 | `pg-listen` | [findings](pg-listen/findings.md) · [topology](pg-listen/topology.yaml) |
| [boostercloud/booster](https://github.com/boostercloud/booster) | 2 | 0 | `nats-node` | [findings](booster/findings.md) · [topology](booster/topology.yaml) |
| [kafkajs/confluent-schema-registry](https://github.com/kafkajs/confluent-schema-registry) | 2 | 0 | `kafkajs` | [findings](confluent-schema-registry/findings.md) · [topology](confluent-schema-registry/topology.yaml) |
| [lucianlature/eda-assurance (fixture)](https://github.com/lucianlature/eda-assurance/tree/main/fixtures/payments-settled) | 1 | 2 | `ts-events, fixture-topology` | [findings](payments-settled/findings.md) · [topology](payments-settled/topology.yaml) |
| [bitloops/ddd-hexagonal-cqrs-es-eda](https://github.com/bitloops/ddd-hexagonal-cqrs-es-eda) | 1 | 0 | `nats-node` | [findings](ddd-hexagonal-cqrs-es-eda/findings.md) · [topology](ddd-hexagonal-cqrs-es-eda/topology.yaml) |
| [ArkerLabs/event-sourcing-nestjs](https://github.com/ArkerLabs/event-sourcing-nestjs) | 1 | 0 | `nest` | [findings](event-sourcing-nestjs/findings.md) · [topology](event-sourcing-nestjs/topology.yaml) |
| [cloudevents/sdk-javascript](https://github.com/cloudevents/sdk-javascript) | 1 | 0 | `kafkajs` | [findings](sdk-javascript/findings.md) · [topology](sdk-javascript/topology.yaml) |
| [event-catalog/backstage-eventcatalog-demo](https://github.com/event-catalog/backstage-eventcatalog-demo) | 0 | 0 | `(none)` | [findings](backstage-eventcatalog-demo/findings.md) · [topology](backstage-eventcatalog-demo/topology.yaml) |
| [domagojk/beenion](https://github.com/domagojk/beenion) | 0 | 0 | `(none)` | [findings](beenion/findings.md) · [topology](beenion/topology.yaml) |
| [castore-dev/castore](https://github.com/castore-dev/castore) | 0 | 0 | `(none)` | [findings](castore/findings.md) · [topology](castore/topology.yaml) |
| [event-driven-io/emmett](https://github.com/event-driven-io/emmett) | 0 | 0 | `(none)` | [findings](emmett/findings.md) · [topology](emmett/topology.yaml) |
| [oskardudycz/EventSourcing.NodeJS](https://github.com/oskardudycz/EventSourcing.NodeJS) | 0 | 0 | `(none)` | [findings](EventSourcing.NodeJS/findings.md) · [topology](EventSourcing.NodeJS/topology.yaml) |
| [diego3g/flowly](https://github.com/diego3g/flowly) | 0 | 0 | `(none)` | [findings](flowly/findings.md) · [topology](flowly/topology.yaml) |
| [glandjs/gland](https://github.com/glandjs/gland) | 0 | 0 | `(none)` | [findings](gland/findings.md) · [topology](gland/topology.yaml) |
| [danilop/ServerlessByDesign](https://github.com/danilop/ServerlessByDesign) | 0 | 0 | `(none)` | [findings](ServerlessByDesign/findings.md) · [topology](ServerlessByDesign/topology.yaml) |
| [aleios-cloud/sls-test-tools](https://github.com/aleios-cloud/sls-test-tools) | 0 | 0 | `(none)` | [findings](sls-test-tools/findings.md) · [topology](sls-test-tools/topology.yaml) |
| [SamHatoum/typescript-event-sourcing](https://github.com/SamHatoum/typescript-event-sourcing) | 0 | 0 | `(none)` | [findings](typescript-event-sourcing/findings.md) · [topology](typescript-event-sourcing/topology.yaml) |

## Signal vs silence

| Outcome | Count | Meaning |
| --- | ---: | --- |
| Topology extracted | 21 | At least one extractor fired |
| No topology | 10 | ES frameworks / generators / empty |
| Findings reported | 13 | Orphans, EDA-004, or info |

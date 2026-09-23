# Public scan candidates

Generated 2026-09-23. Sourced from GitHub search (EventCatalog, AsyncAPI, Kafka/NATS/NestJS/CQRS/event-sourcing/microservices). 55 selected from 1046 unique hits after noise filter.

GitLab public search via API returned mostly empty / 400 for these queries in this environment; list is GitHub-heavy. Add GitLab targets when discovery works.

## How to read tiers

- **A** — high signal for an event-contract gate (apps, catalogs, demos).
- **B** — adjacent tooling / docs platforms; useful context, weaker scan ROI today.
- **batchScan** — shallow-cloned and run through `eda-assurance scan` in this pass.

| # | Tier | Stars | Repo | Why | Extractors (hint) | Batch |
| --- | --- | ---: | --- | --- | --- | --- |
| 1 | A | 2905 | [juicycleff/ultimate-backend](https://github.com/juicycleff/ultimate-backend) | Multi tenant SaaS starter kit with cqrs graphql microservice architecture, apoll | ts-events? | yes |
| 2 | A | 1445 | [bitloops/ddd-hexagonal-cqrs-es-eda](https://github.com/bitloops/ddd-hexagonal-cqrs-es-eda) | Complete working example of using Domain Driven Design (DDD), Hexagonal Architec | ts-events? | yes |
| 3 | A | 631 | [0xb4lamx/nestjs-boilerplate-microservice](https://github.com/0xb4lamx/nestjs-boilerplate-microservice) | Nestjs Microservice boilerplate: apply DDD, CQRS, and Event Sourcing within an e | ts-events? | yes |
| 4 | A | 569 | [saalikmubeen/microservices-architectured-app](https://github.com/saalikmubeen/microservices-architectured-app) | Event-driven microservices architectured e-commerce app created using Express.js | nats,ts-events? | yes |
| 5 | A | 508 | [oskardudycz/EventSourcing.NodeJS](https://github.com/oskardudycz/EventSourcing.NodeJS) | Examples and Tutorials of Event Sourcing in NodeJS | ts-events? | yes |
| 6 | A | 297 | [meysamhadeli/booking-microservices-nestjs](https://github.com/meysamhadeli/booking-microservices-nestjs) | Practical microservices, built with Nestjs, CQRS, Vertical Slice Architecture, E | ts-events? | yes |
| 7 | A | 293 | [meysamhadeli/booking-microservices-expressjs](https://github.com/meysamhadeli/booking-microservices-expressjs) | Practical microservices, built with Node.Js, CQRS, Vertical Slice Architecture, | ts-events? | yes |
| 8 | A | 263 | [domagojk/beenion](https://github.com/domagojk/beenion) | Example project using Event Sorucing and CQRS patterns | ts-events? | yes |
| 9 | A | 216 | [diego3g/flowly](https://github.com/diego3g/flowly) | Flowly helps you document your event driven architecture across your team. | probe | yes |
| 10 | A | 213 | [asyncapi/studio](https://github.com/asyncapi/studio) | Visually design your AsyncAPI files and event-driven architecture. | asyncapi-pending | list-only |
| 11 | A | 172 | [zhuravlevma/typescript-ddd-architecture](https://github.com/zhuravlevma/typescript-ddd-architecture) | Typescript DDD architecture for nest.js with saga, subdomains, clean architectur | ts-events? | yes |
| 12 | A | 5311 | [asyncapi/spec](https://github.com/asyncapi/spec) | The AsyncAPI specification allows you to create machine-readable definitions of | asyncapi-pending | list-only |
| 13 | A | 3265 | [aspnetrun/run-aspnetcore-microservices](https://github.com/aspnetrun/run-aspnetcore-microservices) | Microservices on .NET platforms used ASP.NET Web API, Docker, RabbitMQ, MassTran | ts-events? | yes |
| 14 | A | 1076 | [asyncapi/generator](https://github.com/asyncapi/generator) | Use your AsyncAPI definition to generate literally anything. Markdown documentat | asyncapi-pending | list-only |
| 15 | A | 772 | [reimagined/resolve](https://github.com/reimagined/resolve) | Full stack CQRS, DDD, Event Sourcing framework for Node.js | ts-events? | list-only |
| 16 | A | 539 | [event-driven-io/emmett](https://github.com/event-driven-io/emmett) | Emmett - a Node.js library taking your event-driven applications back to the fut | probe | list-only |
| 17 | A | 530 | [meysamhadeli/booking-modular-monolith](https://github.com/meysamhadeli/booking-modular-monolith) | A practical Modular Monolith architecture with the latest technologies and archi | ts-events? | yes |
| 18 | A | 2 | [event-catalog/eventcatalog-ai-demo](https://github.com/event-catalog/eventcatalog-ai-demo) | Demo application that let's you talk to your EventCatalog using AI. Ask question | eventcatalog | yes |
| 19 | A | 1 | [event-catalog/backstage-eventcatalog-demo](https://github.com/event-catalog/backstage-eventcatalog-demo) | Backstage demo with EventCatalog integrations | eventcatalog | yes |
| 20 | A | 448 | [asyncapi/modelina](https://github.com/asyncapi/modelina) | A library for generating typed models based on inputs such as AsyncAPI, OpenAPI, | asyncapi-pending | list-only |
| 21 | A | 423 | [AntonioFalcaoJr/EventualShop](https://github.com/AntonioFalcaoJr/EventualShop) | A state-of-the-art distributed system using Reactive DDD as uncertainty modeling | ts-events? | yes |
| 22 | A | 403 | [cloudevents/sdk-javascript](https://github.com/cloudevents/sdk-javascript) | JavaScript/TypeScript SDK for CloudEvents | ts-events? | list-only |
| 23 | A | 276 | [castore-dev/castore](https://github.com/castore-dev/castore) | Making Event Sourcing easy 😎 | ts-events? | list-only |
| 24 | A | 273 | [asyncapi/cli](https://github.com/asyncapi/cli) | CLI to work with your AsyncAPI files. You can validate them and in the future us | asyncapi-pending | list-only |
| 25 | A | 270 | [ocoda/event-sourcing](https://github.com/ocoda/event-sourcing) | An event-sourcing library for NestJS | ts-events? | list-only |
| 26 | A | 268 | [SamHatoum/typescript-event-sourcing](https://github.com/SamHatoum/typescript-event-sourcing) | Domain Driven Design, Event Sourcing & Command Query Responsibility Segregation | ts-events? | yes |
| 27 | A | 234 | [flamewow/nestjs-asyncapi](https://github.com/flamewow/nestjs-asyncapi) | NestJS AsyncAPI module - generate documentation of your event-based services usi | asyncapi-pending,ts-events? | list-only |
| 28 | A | 227 | [ArkerLabs/event-sourcing-nestjs](https://github.com/ArkerLabs/event-sourcing-nestjs) | NestJS module for implementing Event Sourcing | ts-events? | yes |
| 29 | A | 196 | [thangchung/northwind-dotnet](https://github.com/thangchung/northwind-dotnet) | A full-stack .NET 6 Microservices build on Minimal APIs and C# 10 | probe | yes |
| 30 | A | 170 | [kafkajs/confluent-schema-registry](https://github.com/kafkajs/confluent-schema-registry) | is a library that makes it easier to interact with the Confluent schema registry | ts-events? | list-only |
| 31 | A | 163 | [mehmetozkaya/EshopModularMonoliths](https://github.com/mehmetozkaya/EshopModularMonoliths) | Modular Monoliths on .NET used ASP.NET Web API, Docker, PostgreSQL, Redis, Rabbi | ts-events? | yes |
| 32 | A | 151 | [AdrianLopezGue/daruma-backend](https://github.com/AdrianLopezGue/daruma-backend) | 🎎  Shared Expense Manager (Backend) - NestJS+DDD+CQRS+Event Sourcing  🎎 | ts-events? | yes |
| 33 | A | 144 | [asyncapi/parser-js](https://github.com/asyncapi/parser-js) | AsyncAPI parser for Javascript (browser-compatible too). | asyncapi-pending | list-only |
| 34 | A | 140 | [glandjs/gland](https://github.com/glandjs/gland) | lightweight, designed around Event-Driven Systems. | probe | list-only |
| 35 | A | 139 | [rob3000/nestjs-kafka](https://github.com/rob3000/nestjs-kafka) | NestJS integration with KafkaJS | ts-events? | list-only |
| 36 | A | 7803 | [MassTransit/MassTransit](https://github.com/MassTransit/MassTransit) | Distributed Application Framework for .NET | probe | yes |
| 37 | A | 5349 | [ag2ai/faststream](https://github.com/ag2ai/faststream) | Asynchronous Python framework for event-driven services. A thin client for Kafka | nats,asyncapi-pending,ts-events? | list-only |
| 38 | A | 2350 | [cdk-patterns/serverless](https://github.com/cdk-patterns/serverless) | This is intended to be a repo containing all of the official AWS Serverless arch | ts-events? | list-only |
| 39 | A | 2048 | [microcks/microcks](https://github.com/microcks/microcks) | The open source, cloud native tool for API Mocking and Testing. Microcks is a Cl | probe | list-only |
| 40 | A | 1719 | [aklivity/zilla](https://github.com/aklivity/zilla) | 🦎 A lightweight, multi-protocol gateway for event-driven applications and AI age | ts-events? | list-only |
| 41 | A | 370 | [twzhangyang/RestAirline](https://github.com/twzhangyang/RestAirline) | DDD+CQRS+EventSourcing+Hypermedia API+ASP.NET Core 3.1+Masstransit+terraform+doc | ts-events? | yes |
| 42 | A | 360 | [LEGO/AsyncAPI.NET](https://github.com/LEGO/AsyncAPI.NET) | The AsyncAPI.NET SDK contains a useful object model for AsyncAPI documents in .N | asyncapi-pending | yes |
| 43 | A | 351 | [springwolf/springwolf-core](https://github.com/springwolf/springwolf-core) | Automated documentation for event-driven applications built with Spring Boot | probe | list-only |
| 44 | A | 224 | [asyncapi/saunter](https://github.com/asyncapi/saunter) | Saunter is a code-first AsyncAPI documentation generator for dotnet. | asyncapi-pending | list-only |
| 45 | A | 0 | [event-catalog/federation-organization-example](https://github.com/event-catalog/federation-organization-example) | Example of how EventCatalog Federation would work in an organization across many | eventcatalog | yes |
| 46 | A | 635 | [andywer/pg-listen](https://github.com/andywer/pg-listen) | 📡 PostgreSQL LISTEN &  NOTIFY for node.js that finally works. | probe | list-only |
| 47 | A | 447 | [boostercloud/booster](https://github.com/boostercloud/booster) | Booster Framework | probe | list-only |
| 48 | A | 421 | [thangchung/practical-dotnet-aspire](https://github.com/thangchung/practical-dotnet-aspire) | The practical .NET Aspire builds on the coffeeshop app business domain | probe | yes |
| 49 | A | 289 | [danilop/ServerlessByDesign](https://github.com/danilop/ServerlessByDesign) | A visual approach to serverless development. Think. Build. Repeat. | probe | yes |
| 50 | A | 219 | [panacloud-modern-global-apps/full-stack-serverless-cdk](https://github.com/panacloud-modern-global-apps/full-stack-serverless-cdk) | Learn to Build Full-Stack Serverless Apps and APIs using AWS Cloud Development K | probe | yes |
| 51 | A | 195 | [aleios-cloud/sls-test-tools](https://github.com/aleios-cloud/sls-test-tools) | Custom Jest Assertions for Serverless integration testing. | probe | list-only |
| 52 | A | 0 | [event-catalog/flowmart-schema-registry](https://github.com/event-catalog/flowmart-schema-registry) | (force-include) | eventcatalog | yes |
| 53 | A | 397 | [specmatic/specmatic](https://github.com/specmatic/specmatic) | Eliminate API integration headaches with Specmatic's no-code AI-powered API deve | probe | list-only |
| 54 | B | 2904 | [event-catalog/eventcatalog](https://github.com/event-catalog/eventcatalog) | Documentation tool built for software architecture. Document your domains, servi | eventcatalog | list-only |
| 55 | B | 378 | [DocHubTeam/DocHub](https://github.com/DocHubTeam/DocHub) | Управление архитектурой как кодом | probe | yes |

## Reports

Per-repo output lives under `reports/public/<slug>/` (`findings.md`, `topology.yaml`). Index: [`public/INDEX.md`](public/INDEX.md).

Rescan:

```shell
node scripts/scan-public-targets.mjs
```

Making these world-readable requires this GitHub repository to be **public**.

---

## Expansion 2026-09-23 (corpus growth)

Shallow-cloned and scanned additional targets. Local clones live under `.targets/` (gitignored). Rescan: `node scripts/scan-public-targets.mjs`.

| Slug | GitHub | Contracts | Extractors |
| --- | --- | ---: | --- |
| eventcatalog | [event-catalog/eventcatalog](https://github.com/event-catalog/eventcatalog) | 124 | `eventcatalog, asyncapi, kafkajs, nats-node` |
| federation-organization-example | [event-catalog/federation-organization-example](https://github.com/event-catalog/federation-organization-example) | 88 | `eventcatalog, asyncapi` |
| spec | [asyncapi/spec](https://github.com/asyncapi/spec) | 81 | `asyncapi, kafkajs` |
| ocoda-event-sourcing | [ocoda/event-sourcing](https://github.com/ocoda/event-sourcing) | 74 | `nest` |
| studio | [asyncapi/studio](https://github.com/asyncapi/studio) | 63 | `asyncapi` |
| springwolf-core | [springwolf/springwolf-core](https://github.com/springwolf/springwolf-core) | 41 | `asyncapi, kafkajs` |
| ultimate-backend | [juicycleff/ultimate-backend](https://github.com/juicycleff/ultimate-backend) | 36 | `nest` |
| daruma-backend | [AdrianLopezGue/daruma-backend](https://github.com/AdrianLopezGue/daruma-backend) | 30 | `nest` |
| full-stack-serverless-cdk | [panacloud-modern-global-apps/full-stack-serverless-cdk](https://github.com/panacloud-modern-global-apps/full-stack-serverless-cdk) | 26 | `aws` |
| generator | [asyncapi/generator](https://github.com/asyncapi/generator) | 23 | `asyncapi` |
| microcks | [microcks/microcks](https://github.com/microcks/microcks) | 19 | `asyncapi, kafkajs, nats-node` |
| cdk-patterns-serverless | [cdk-patterns/serverless](https://github.com/cdk-patterns/serverless) | 18 | `aws` |
| northwind-dotnet | [thangchung/northwind-dotnet](https://github.com/thangchung/northwind-dotnet) | 16 | `kafkajs` |
| cli | [asyncapi/cli](https://github.com/asyncapi/cli) | 12 | `asyncapi` |
| booking-microservices-expressjs | [meysamhadeli/booking-microservices-expressjs](https://github.com/meysamhadeli/booking-microservices-expressjs) | 10 | `nats-node, nest` |
| typescript-ddd-architecture | [zhuravlevma/typescript-ddd-architecture](https://github.com/zhuravlevma/typescript-ddd-architecture) | 10 | `nest` |
| booking-microservices-nestjs | [meysamhadeli/booking-microservices-nestjs](https://github.com/meysamhadeli/booking-microservices-nestjs) | 9 | `nest` |
| modelina | [asyncapi/modelina](https://github.com/asyncapi/modelina) | 9 | `asyncapi, pg-listen` |
| asyncapi-website | [asyncapi/website](https://github.com/asyncapi/website) | 9 | `asyncapi, kafkajs, nats-node` |
| zilla | [aklivity/zilla](https://github.com/aklivity/zilla) | 8 | `asyncapi, kafkajs` |
| nestjs-asyncapi | [flamewow/nestjs-asyncapi](https://github.com/flamewow/nestjs-asyncapi) | 7 | `asyncapi, nest` |
| microservices-architectured-app | [saalikmubeen/microservices-architectured-app](https://github.com/saalikmubeen/microservices-architectured-app) | 6 | `nats-node` |
| nestjs-boilerplate-microservice | [0xb4lamx/nestjs-boilerplate-microservice](https://github.com/0xb4lamx/nestjs-boilerplate-microservice) | 5 | `nest` |
| flowmart-schema-registry | [event-catalog/flowmart-schema-registry](https://github.com/event-catalog/flowmart-schema-registry) | 5 | `kafkajs` |
| nest-cqrs | [ngaxavi/nest-cqrs](https://github.com/ngaxavi/nest-cqrs) | 4 | `nest` |
| eventcatalog-ai-demo | [event-catalog/eventcatalog-ai-demo](https://github.com/event-catalog/eventcatalog-ai-demo) | 4 | `asyncapi, kafkajs` |
| faststream | [ag2ai/faststream](https://github.com/ag2ai/faststream) | 4 | `asyncapi, kafkajs` |
| laudspeaker | [laudspeaker/laudspeaker](https://github.com/laudspeaker/laudspeaker) | 3 | `nats-node, nest` |
| nestjs-kafka | [rob3000/nestjs-kafka](https://github.com/rob3000/nestjs-kafka) | 3 | `kafkajs, nest` |
| spectral | [stoplightio/spectral](https://github.com/stoplightio/spectral) | 3 | `asyncapi` |
| vijitail-nestjs-kafka-microservices | [vijitail/nestjs-kafka-microservices](https://github.com/vijitail/nestjs-kafka-microservices) | 3 | `nest` |
| pg-listen | [andywer/pg-listen](https://github.com/andywer/pg-listen) | 2 | `pg-listen` |
| specmatic | [specmatic/specmatic](https://github.com/specmatic/specmatic) | 2 | `asyncapi` |
| booster | [boostercloud/booster](https://github.com/boostercloud/booster) | 2 | `nats-node` |
| confluent-schema-registry | [kafkajs/confluent-schema-registry](https://github.com/kafkajs/confluent-schema-registry) | 2 | `kafkajs` |
| nestjs-kafka-microservices | [mguay22/nestjs-kafka-microservices](https://github.com/mguay22/nestjs-kafka-microservices) | 2 | `nest` |
| ts-microservice-demo | [wowhy/ts-microservice-demo](https://github.com/wowhy/ts-microservice-demo) | 2 | `nats-node, nest` |
| AsyncAPI.NET | [LEGO/AsyncAPI](https://github.com/LEGO/AsyncAPI) | 1 | `asyncapi` |
| event-sourcing-nestjs-example | [ArkerLabs/event-sourcing-nestjs-example](https://github.com/ArkerLabs/event-sourcing-nestjs-example) | 1 | `nest` |
| nestjs-clean-architecture-example | [alexmarqs/nestjs-clean-architecture-example](https://github.com/alexmarqs/nestjs-clean-architecture-example) | 1 | `nest` |
| Propan | [Lancetnik/Propan](https://github.com/Lancetnik/Propan) | 1 | `asyncapi` |
| resolve | [reimagined/resolve](https://github.com/reimagined/resolve) | 1 | `pg-listen` |
| ddd-hexagonal-cqrs-es-eda | [bitloops/ddd-hexagonal-cqrs-es-eda](https://github.com/bitloops/ddd-hexagonal-cqrs-es-eda) | 1 | `nats-node` |
| event-sourcing-nestjs | [ArkerLabs/event-sourcing-nestjs](https://github.com/ArkerLabs/event-sourcing-nestjs) | 1 | `nest` |
| MassTransit | [MassTransit/MassTransit](https://github.com/MassTransit/MassTransit) | 1 | `kafkajs` |
| parser-js | [asyncapi/parser-js](https://github.com/asyncapi/parser-js) | 1 | `asyncapi` |
| sdk-javascript | [cloudevents/sdk-javascript](https://github.com/cloudevents/sdk-javascript) | 1 | `kafkajs` |
| ack-nestjs-boilerplate-kafka | [andrechristikan/ack-nestjs-boilerplate-kafka](https://github.com/andrechristikan/ack-nestjs-boilerplate-kafka) | 0 | `(none)` |
| backstage-eventcatalog-demo | [event-catalog/backstage-eventcatalog-demo](https://github.com/event-catalog/backstage-eventcatalog-demo) | 0 | `(none)` |
| beenion | [domagojk/beenion](https://github.com/domagojk/beenion) | 0 | `(none)` |
| booking-modular-monolith | [meysamhadeli/booking-modular-monolith](https://github.com/meysamhadeli/booking-modular-monolith) | 0 | `(none)` |
| castore | [castore-dev/castore](https://github.com/castore-dev/castore) | 0 | `(none)` |
| DocHub | [DocHubTeam/DocHub](https://github.com/DocHubTeam/DocHub) | 0 | `(none)` |
| emmett | [event-driven-io/emmett](https://github.com/event-driven-io/emmett) | 0 | `(none)` |
| EshopModularMonoliths | [mehmetozkaya/EshopModularMonoliths](https://github.com/mehmetozkaya/EshopModularMonoliths) | 0 | `(none)` |
| event-nest | [NickTsitlakidis/event-nest](https://github.com/NickTsitlakidis/event-nest) | 0 | `(none)` |
| EventSourcing.NodeJS | [oskardudycz/EventSourcing](https://github.com/oskardudycz/EventSourcing) | 0 | `(none)` |
| EventualShop | [AntonioFalcaoJr/EventualShop](https://github.com/AntonioFalcaoJr/EventualShop) | 0 | `(none)` |
| flowly | [diego3g/flowly](https://github.com/diego3g/flowly) | 0 | `(none)` |
| gland | [glandjs/gland](https://github.com/glandjs/gland) | 0 | `(none)` |
| nestjs-clean-architecture | [CollatzConjecture/nestjs-clean-architecture](https://github.com/CollatzConjecture/nestjs-clean-architecture) | 0 | `(none)` |
| practical-dotnet-aspire | [thangchung/practical-dotnet-aspire](https://github.com/thangchung/practical-dotnet-aspire) | 0 | `(none)` |
| RestAirline | [twzhangyang/RestAirline](https://github.com/twzhangyang/RestAirline) | 0 | `(none)` |
| saunter | [asyncapi/saunter](https://github.com/asyncapi/saunter) | 0 | `(none)` |
| ServerlessByDesign | [danilop/ServerlessByDesign](https://github.com/danilop/ServerlessByDesign) | 0 | `(none)` |
| sls-test-tools | [aleios-cloud/sls-test-tools](https://github.com/aleios-cloud/sls-test-tools) | 0 | `(none)` |
| standard-webhooks | [standard-webhooks/standard-webhooks](https://github.com/standard-webhooks/standard-webhooks) | 0 | `(none)` |
| typescript-event-sourcing | [SamHatoum/typescript-event-sourcing](https://github.com/SamHatoum/typescript-event-sourcing) | 0 | `(none)` |

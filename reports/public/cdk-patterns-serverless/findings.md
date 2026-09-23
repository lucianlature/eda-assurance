# Event-contract scan

Findings: 9 (plus 1 info)

## No deployed fleet pins

**info.** No deployed versions available. Rolling-window compatibility (breaking field removal vs live consumers) was not evaluated. This scan is in-repo topology only.

Rule id: `EDA-INFO-NO-FLEET`

## Orphan producer — `data-loaded`

**medium.** Event 'data-loaded' is published by load but no service in this repo declares a consumer.

Rule id: `EDA-orphan-producer`

- `the-eventbridge-etl/python/lambda_fns/load/load.js`

## Orphan consumer — `eb:cdkpatterns.the-eventbridge-etl`

**high.** Event 'eb:cdkpatterns.the-eventbridge-etl' is consumed by template, typescript but no service in this repo declares a producer.

Rule id: `EDA-orphan-consumer`

- `the-eventbridge-etl/python/template.yml`

## Orphan producer — `ecs-started`

**medium.** Event 'ecs-started' is published by s3sqseventconsumer but no service in this repo declares a consumer.

Rule id: `EDA-orphan-producer`

- `the-eventbridge-etl/python/lambda_fns/extract/s3SqsEventConsumer.js`

## Orphan consumer — `s3RecordExtraction`

**high.** Event 's3RecordExtraction' is consumed by template, typescript but no service in this repo declares a producer.

Rule id: `EDA-orphan-consumer`

- `the-eventbridge-etl/python/template.yml`

## Orphan consumer — `sqs:BigFanTopicAnyOtherStatusSubscriberQueue`

**high.** Event 'sqs:BigFanTopicAnyOtherStatusSubscriberQueue' is consumed by typescript but no service in this repo declares a producer.

Rule id: `EDA-orphan-consumer`

- `the-big-fan/python/template.yaml`

## Orphan consumer — `sqs:BigFanTopicStatusCreatedSubscriberQueue`

**high.** Event 'sqs:BigFanTopicStatusCreatedSubscriberQueue' is consumed by typescript but no service in this repo declares a producer.

Rule id: `EDA-orphan-consumer`

- `the-big-fan/python/template.yaml`

## Orphan consumer — `sqs:newObjectInLandingBucketEventQueue`

**high.** Event 'sqs:newObjectInLandingBucketEventQueue' is consumed by typescript but no service in this repo declares a producer.

Rule id: `EDA-orphan-consumer`

- `the-eventbridge-etl/typescript/lib/the-eventbridge-etl-stack.ts`

## Orphan consumer — `sqs:Queue`

**high.** Event 'sqs:Queue' is consumed by typescript but no service in this repo declares a producer.

Rule id: `EDA-orphan-consumer`

- `the-xray-tracer/typescript/lib/the-sqs-flow-stack.ts`

## Orphan consumer — `sqs:RDSPublishQueue`

**high.** Event 'sqs:RDSPublishQueue' is consumed by typescript but no service in this repo declares a producer.

Rule id: `EDA-orphan-consumer`

- `the-scalable-webhook/typescript/lib/the-scalable-webhook-stack.ts`

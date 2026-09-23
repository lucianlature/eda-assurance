# Event-contract scan

Findings: 9 (plus 1 info)

## EDA-INFO-NO-FLEET

**info.** No deployed versions available. Rolling-window compatibility (EDA-004) was not evaluated. This scan is in-repo topology only.

## EDA-orphan-producer — `data-loaded`

**medium.** Event 'data-loaded' is published by load but no service in this repo declares a consumer.

- `the-eventbridge-etl/python/lambda_fns/load/load.js`

## EDA-orphan-consumer — `eb:cdkpatterns.the-eventbridge-etl`

**high.** Event 'eb:cdkpatterns.the-eventbridge-etl' is consumed by template, typescript but no service in this repo declares a producer.

- `the-eventbridge-etl/python/template.yml`

## EDA-orphan-producer — `ecs-started`

**medium.** Event 'ecs-started' is published by s3sqseventconsumer but no service in this repo declares a consumer.

- `the-eventbridge-etl/python/lambda_fns/extract/s3SqsEventConsumer.js`

## EDA-orphan-consumer — `s3RecordExtraction`

**high.** Event 's3RecordExtraction' is consumed by template, typescript but no service in this repo declares a producer.

- `the-eventbridge-etl/python/template.yml`

## EDA-orphan-consumer — `sqs:BigFanTopicAnyOtherStatusSubscriberQueue`

**high.** Event 'sqs:BigFanTopicAnyOtherStatusSubscriberQueue' is consumed by typescript but no service in this repo declares a producer.

- `the-big-fan/python/template.yaml`

## EDA-orphan-consumer — `sqs:BigFanTopicStatusCreatedSubscriberQueue`

**high.** Event 'sqs:BigFanTopicStatusCreatedSubscriberQueue' is consumed by typescript but no service in this repo declares a producer.

- `the-big-fan/python/template.yaml`

## EDA-orphan-consumer — `sqs:newObjectInLandingBucketEventQueue`

**high.** Event 'sqs:newObjectInLandingBucketEventQueue' is consumed by typescript but no service in this repo declares a producer.

- `the-eventbridge-etl/typescript/lib/the-eventbridge-etl-stack.ts`

## EDA-orphan-consumer — `sqs:Queue`

**high.** Event 'sqs:Queue' is consumed by typescript but no service in this repo declares a producer.

- `the-xray-tracer/typescript/lib/the-sqs-flow-stack.ts`

## EDA-orphan-consumer — `sqs:RDSPublishQueue`

**high.** Event 'sqs:RDSPublishQueue' is consumed by typescript but no service in this repo declares a producer.

- `the-scalable-webhook/typescript/lib/the-scalable-webhook-stack.ts`

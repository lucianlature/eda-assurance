# Event-contract scan

Findings: 1 (plus 1 info)

## No deployed fleet pins

**info.** No deployed versions available. Rolling-window compatibility (breaking field removal vs live consumers) was not evaluated. This scan is in-repo topology only.

Rule id: `EDA-INFO-NO-FLEET`

## Orphan producer — `costingResponse`

**medium.** Event 'costingResponse' is published by adeo-asyncapi-case-study but no service in this repo declares a consumer.

Rule id: `EDA-orphan-producer`

- `public/resources/casestudies/adeo/asyncapi.yaml`

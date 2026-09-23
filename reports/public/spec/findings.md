# Event-contract scan

Findings: 65 (plus 1 info)

## No deployed fleet pins

**info.** No deployed versions available. Rolling-window compatibility (breaking field removal vs live consumers) was not evaluated. This scan is in-repo topology only.

Rule id: `EDA-INFO-NO-FLEET`

## Orphan producer — `accountsChanged`

**medium.** Event 'accountsChanged' is published by slack-real-time-messaging-api but no service in this repo declares a consumer.

Rule id: `EDA-orphan-producer`

- `examples/slack-rtm-asyncapi.yml`

## Orphan producer — `authRevoke`

**medium.** Event 'authRevoke' is published by notifications but no service in this repo declares a consumer.

Rule id: `EDA-orphan-producer`

- `examples/operation-security-asyncapi.yml`

## Orphan producer — `botAdded`

**medium.** Event 'botAdded' is published by slack-real-time-messaging-api but no service in this repo declares a consumer.

Rule id: `EDA-orphan-producer`

- `examples/slack-rtm-asyncapi.yml`

## Orphan producer — `botChanged`

**medium.** Event 'botChanged' is published by slack-real-time-messaging-api but no service in this repo declares a consumer.

Rule id: `EDA-orphan-producer`

- `examples/slack-rtm-asyncapi.yml`

## Orphan producer — `channelArchive`

**medium.** Event 'channelArchive' is published by slack-real-time-messaging-api but no service in this repo declares a consumer.

Rule id: `EDA-orphan-producer`

- `examples/slack-rtm-asyncapi.yml`

## Orphan producer — `channelCreated`

**medium.** Event 'channelCreated' is published by slack-real-time-messaging-api but no service in this repo declares a consumer.

Rule id: `EDA-orphan-producer`

- `examples/slack-rtm-asyncapi.yml`

## Orphan producer — `channelDeleted`

**medium.** Event 'channelDeleted' is published by slack-real-time-messaging-api but no service in this repo declares a consumer.

Rule id: `EDA-orphan-producer`

- `examples/slack-rtm-asyncapi.yml`

## Orphan producer — `channelHistoryChanged`

**medium.** Event 'channelHistoryChanged' is published by slack-real-time-messaging-api but no service in this repo declares a consumer.

Rule id: `EDA-orphan-producer`

- `examples/slack-rtm-asyncapi.yml`

## Orphan producer — `channelJoined`

**medium.** Event 'channelJoined' is published by slack-real-time-messaging-api but no service in this repo declares a consumer.

Rule id: `EDA-orphan-producer`

- `examples/slack-rtm-asyncapi.yml`

## Orphan producer — `channelLeft`

**medium.** Event 'channelLeft' is published by slack-real-time-messaging-api but no service in this repo declares a consumer.

Rule id: `EDA-orphan-producer`

- `examples/slack-rtm-asyncapi.yml`

## Orphan producer — `channelMarked`

**medium.** Event 'channelMarked' is published by slack-real-time-messaging-api but no service in this repo declares a consumer.

Rule id: `EDA-orphan-producer`

- `examples/slack-rtm-asyncapi.yml`

## Orphan producer — `channelRename`

**medium.** Event 'channelRename' is published by slack-real-time-messaging-api but no service in this repo declares a consumer.

Rule id: `EDA-orphan-producer`

- `examples/slack-rtm-asyncapi.yml`

## Orphan producer — `channelUnarchive`

**medium.** Event 'channelUnarchive' is published by slack-real-time-messaging-api but no service in this repo declares a consumer.

Rule id: `EDA-orphan-producer`

- `examples/slack-rtm-asyncapi.yml`

## Orphan producer — `chatMessage`

**medium.** Event 'chatMessage' is published by gitter-streaming-api but no service in this repo declares a consumer.

Rule id: `EDA-orphan-producer`

- `examples/gitter-streaming-asyncapi.yml`

## Orphan producer — `commandsChanged`

**medium.** Event 'commandsChanged' is published by slack-real-time-messaging-api but no service in this repo declares a consumer.

Rule id: `EDA-orphan-producer`

- `examples/slack-rtm-asyncapi.yml`

## Orphan producer — `connectionError`

**medium.** Event 'connectionError' is published by slack-real-time-messaging-api but no service in this repo declares a consumer.

Rule id: `EDA-orphan-producer`

- `examples/slack-rtm-asyncapi.yml`

## Orphan producer — `dndUpdated`

**medium.** Event 'dndUpdated' is published by slack-real-time-messaging-api but no service in this repo declares a consumer.

Rule id: `EDA-orphan-producer`

- `examples/slack-rtm-asyncapi.yml`

## Orphan producer — `dndUpdatedUser`

**medium.** Event 'dndUpdatedUser' is published by slack-real-time-messaging-api but no service in this repo declares a consumer.

Rule id: `EDA-orphan-producer`

- `examples/slack-rtm-asyncapi.yml`

## Orphan producer — `emailDomainChanged`

**medium.** Event 'emailDomainChanged' is published by slack-real-time-messaging-api but no service in this repo declares a consumer.

Rule id: `EDA-orphan-producer`

- `examples/slack-rtm-asyncapi.yml`

## Orphan producer — `emojiAdded`

**medium.** Event 'emojiAdded' is published by slack-real-time-messaging-api but no service in this repo declares a consumer.

Rule id: `EDA-orphan-producer`

- `examples/slack-rtm-asyncapi.yml`

## Orphan producer — `emojiRemoved`

**medium.** Event 'emojiRemoved' is published by slack-real-time-messaging-api but no service in this repo declares a consumer.

Rule id: `EDA-orphan-producer`

- `examples/slack-rtm-asyncapi.yml`

## Orphan producer — `fileChange`

**medium.** Event 'fileChange' is published by slack-real-time-messaging-api but no service in this repo declares a consumer.

Rule id: `EDA-orphan-producer`

- `examples/slack-rtm-asyncapi.yml`

## Orphan producer — `fileCommentAdded`

**medium.** Event 'fileCommentAdded' is published by slack-real-time-messaging-api but no service in this repo declares a consumer.

Rule id: `EDA-orphan-producer`

- `examples/slack-rtm-asyncapi.yml`

## Orphan producer — `fileCommentDeleted`

**medium.** Event 'fileCommentDeleted' is published by slack-real-time-messaging-api but no service in this repo declares a consumer.

Rule id: `EDA-orphan-producer`

- `examples/slack-rtm-asyncapi.yml`

## Orphan producer — `fileCommentEdited`

**medium.** Event 'fileCommentEdited' is published by slack-real-time-messaging-api but no service in this repo declares a consumer.

Rule id: `EDA-orphan-producer`

- `examples/slack-rtm-asyncapi.yml`

## Orphan producer — `fileCreated`

**medium.** Event 'fileCreated' is published by slack-real-time-messaging-api but no service in this repo declares a consumer.

Rule id: `EDA-orphan-producer`

- `examples/slack-rtm-asyncapi.yml`

## Orphan producer — `fileDeleted`

**medium.** Event 'fileDeleted' is published by slack-real-time-messaging-api but no service in this repo declares a consumer.

Rule id: `EDA-orphan-producer`

- `examples/slack-rtm-asyncapi.yml`

## Orphan producer — `filePublic`

**medium.** Event 'filePublic' is published by slack-real-time-messaging-api but no service in this repo declares a consumer.

Rule id: `EDA-orphan-producer`

- `examples/slack-rtm-asyncapi.yml`

## Orphan producer — `fileShared`

**medium.** Event 'fileShared' is published by slack-real-time-messaging-api but no service in this repo declares a consumer.

Rule id: `EDA-orphan-producer`

- `examples/slack-rtm-asyncapi.yml`

## Orphan producer — `fileUnshared`

**medium.** Event 'fileUnshared' is published by slack-real-time-messaging-api but no service in this repo declares a consumer.

Rule id: `EDA-orphan-producer`

- `examples/slack-rtm-asyncapi.yml`

## Orphan producer — `goodbye`

**medium.** Event 'goodbye' is published by slack-real-time-messaging-api but no service in this repo declares a consumer.

Rule id: `EDA-orphan-producer`

- `examples/slack-rtm-asyncapi.yml`

## Orphan producer — `groupArchive`

**medium.** Event 'groupArchive' is published by slack-real-time-messaging-api but no service in this repo declares a consumer.

Rule id: `EDA-orphan-producer`

- `examples/slack-rtm-asyncapi.yml`

## Orphan producer — `groupClose`

**medium.** Event 'groupClose' is published by slack-real-time-messaging-api but no service in this repo declares a consumer.

Rule id: `EDA-orphan-producer`

- `examples/slack-rtm-asyncapi.yml`

## Orphan producer — `groupHistoryChanged`

**medium.** Event 'groupHistoryChanged' is published by slack-real-time-messaging-api but no service in this repo declares a consumer.

Rule id: `EDA-orphan-producer`

- `examples/slack-rtm-asyncapi.yml`

## Orphan producer — `groupJoined`

**medium.** Event 'groupJoined' is published by slack-real-time-messaging-api but no service in this repo declares a consumer.

Rule id: `EDA-orphan-producer`

- `examples/slack-rtm-asyncapi.yml`

## Orphan producer — `groupLeft`

**medium.** Event 'groupLeft' is published by slack-real-time-messaging-api but no service in this repo declares a consumer.

Rule id: `EDA-orphan-producer`

- `examples/slack-rtm-asyncapi.yml`

## Orphan producer — `groupMarked`

**medium.** Event 'groupMarked' is published by slack-real-time-messaging-api but no service in this repo declares a consumer.

Rule id: `EDA-orphan-producer`

- `examples/slack-rtm-asyncapi.yml`

## Orphan producer — `groupOpen`

**medium.** Event 'groupOpen' is published by slack-real-time-messaging-api but no service in this repo declares a consumer.

Rule id: `EDA-orphan-producer`

- `examples/slack-rtm-asyncapi.yml`

## Orphan producer — `groupRename`

**medium.** Event 'groupRename' is published by slack-real-time-messaging-api but no service in this repo declares a consumer.

Rule id: `EDA-orphan-producer`

- `examples/slack-rtm-asyncapi.yml`

## Orphan producer — `groupUnarchive`

**medium.** Event 'groupUnarchive' is published by slack-real-time-messaging-api but no service in this repo declares a consumer.

Rule id: `EDA-orphan-producer`

- `examples/slack-rtm-asyncapi.yml`

## Orphan producer — `heartbeat`

**medium.** Event 'heartbeat' is published by gitter-streaming-api, kraken-websockets-api but no service in this repo declares a consumer.

Rule id: `EDA-orphan-producer`

- `examples/gitter-streaming-asyncapi.yml`
- `examples/kraken-websocket-request-reply-message-filter-in-reply-asyncapi.yml`
- `examples/kraken-websocket-request-reply-multiple-channels-asyncapi.yml`

## Orphan producer — `hello`

**medium.** Event 'hello' is published by slack-real-time-messaging-api but no service in this repo declares a consumer.

Rule id: `EDA-orphan-producer`

- `examples/slack-rtm-asyncapi.yml`

## Orphan producer — `imClose`

**medium.** Event 'imClose' is published by slack-real-time-messaging-api but no service in this repo declares a consumer.

Rule id: `EDA-orphan-producer`

- `examples/slack-rtm-asyncapi.yml`

## Orphan producer — `imCreated`

**medium.** Event 'imCreated' is published by slack-real-time-messaging-api but no service in this repo declares a consumer.

Rule id: `EDA-orphan-producer`

- `examples/slack-rtm-asyncapi.yml`

## Orphan producer — `imMarked`

**medium.** Event 'imMarked' is published by slack-real-time-messaging-api but no service in this repo declares a consumer.

Rule id: `EDA-orphan-producer`

- `examples/slack-rtm-asyncapi.yml`

## Orphan producer — `imOpen`

**medium.** Event 'imOpen' is published by slack-real-time-messaging-api but no service in this repo declares a consumer.

Rule id: `EDA-orphan-producer`

- `examples/slack-rtm-asyncapi.yml`

## Orphan consumer — `lightMeasured`

**high.** Event 'lightMeasured' is consumed by application-headers-example, correlation-id-example, streetlights-kafka-api, streetlights-mqtt-api but no service in this repo declares a producer.

Rule id: `EDA-orphan-consumer`

- `examples/application-headers-asyncapi.yml`
- `examples/correlation-id-asyncapi.yml`
- `examples/streetlights-kafka-asyncapi.yml`
- `examples/streetlights-mqtt-asyncapi.yml`
- `examples/streetlights-operation-security-asyncapi.yml`

## Orphan producer — `manualPresenceChange`

**medium.** Event 'manualPresenceChange' is published by slack-real-time-messaging-api but no service in this repo declares a consumer.

Rule id: `EDA-orphan-producer`

- `examples/slack-rtm-asyncapi.yml`

## Orphan producer — `marketData`

**medium.** Event 'marketData' is published by gemini-market-data-websocket-api but no service in this repo declares a consumer.

Rule id: `EDA-orphan-producer`

- `examples/websocket-gemini-asyncapi.yml`

## Orphan producer — `memberJoinedChannel`

**medium.** Event 'memberJoinedChannel' is published by slack-real-time-messaging-api but no service in this repo declares a consumer.

Rule id: `EDA-orphan-producer`

- `examples/slack-rtm-asyncapi.yml`

## Orphan producer — `objectWithKey`

**medium.** Event 'objectWithKey' is published by oneof-example but no service in this repo declares a consumer.

Rule id: `EDA-orphan-producer`

- `examples/oneof-asyncapi.yml`

## Orphan producer — `objectWithKey2`

**medium.** Event 'objectWithKey2' is published by oneof-example but no service in this repo declares a consumer.

Rule id: `EDA-orphan-producer`

- `examples/oneof-asyncapi.yml`

## Orphan consumer — `outgoingMessage`

**high.** Event 'outgoingMessage' is consumed by slack-real-time-messaging-api but no service in this repo declares a producer.

Rule id: `EDA-orphan-consumer`

- `examples/slack-rtm-asyncapi.yml`

## Orphan consumer — `ping`

**high.** Event 'ping' is consumed by kraken-websockets-api but no service in this repo declares a producer.

Rule id: `EDA-orphan-consumer`

- `examples/kraken-websocket-request-reply-message-filter-in-reply-asyncapi.yml`
- `examples/kraken-websocket-request-reply-multiple-channels-asyncapi.yml`

## Orphan consumer — `receiveSumResult`

**high.** Event 'receiveSumResult' is consumed by rpc-client-example but no service in this repo declares a producer.

Rule id: `EDA-orphan-consumer`

- `examples/rpc-client-asyncapi.yml`

## Orphan producer — `requestSum`

**medium.** Event 'requestSum' is published by rpc-client-example but no service in this repo declares a consumer.

Rule id: `EDA-orphan-producer`

- `examples/rpc-client-asyncapi.yml`

## Orphan producer — `root`

**medium.** Event 'root' is published by slack-real-time-messaging-api but no service in this repo declares a consumer.

Rule id: `EDA-orphan-producer`

- `examples/slack-rtm-asyncapi.yml`

## Orphan producer — `sendSumResult`

**medium.** Event 'sendSumResult' is published by rpc-server-example but no service in this repo declares a consumer.

Rule id: `EDA-orphan-producer`

- `examples/rpc-server-asyncapi.yml`

## Orphan consumer — `subscribe`

**high.** Event 'subscribe' is consumed by kraken-websockets-api but no service in this repo declares a producer.

Rule id: `EDA-orphan-consumer`

- `examples/kraken-websocket-request-reply-message-filter-in-reply-asyncapi.yml`
- `examples/kraken-websocket-request-reply-multiple-channels-asyncapi.yml`

## Orphan consumer — `sum`

**high.** Event 'sum' is consumed by rpc-server-example but no service in this repo declares a producer.

Rule id: `EDA-orphan-consumer`

- `examples/rpc-server-asyncapi.yml`

## Orphan producer — `systemStatus`

**medium.** Event 'systemStatus' is published by kraken-websockets-api but no service in this repo declares a consumer.

Rule id: `EDA-orphan-producer`

- `examples/kraken-websocket-request-reply-message-filter-in-reply-asyncapi.yml`
- `examples/kraken-websocket-request-reply-multiple-channels-asyncapi.yml`

## Orphan consumer — `testMessages`

**high.** Event 'testMessages' is consumed by anyof-example, not-example, oneof-example but no service in this repo declares a producer.

Rule id: `EDA-orphan-consumer`

- `examples/anyof-asyncapi.yml`
- `examples/not-asyncapi.yml`
- `examples/oneof-asyncapi.yml`

## Orphan consumer — `unsubscribe`

**high.** Event 'unsubscribe' is consumed by kraken-websockets-api but no service in this repo declares a producer.

Rule id: `EDA-orphan-consumer`

- `examples/kraken-websocket-request-reply-message-filter-in-reply-asyncapi.yml`
- `examples/kraken-websocket-request-reply-multiple-channels-asyncapi.yml`

## Orphan producer — `UserSignedUp`

**medium.** Event 'UserSignedUp' is published by account-service but no service in this repo declares a consumer.

Rule id: `EDA-orphan-producer`

- `examples/simple-asyncapi.yml`

## Orphan producer — `UserSignup`

**medium.** Event 'UserSignup' is published by asyncapi but no service in this repo declares a consumer.

Rule id: `EDA-orphan-producer`

- `scripts/validation/base-doc-combined.json`

# Event-contract scan

Findings: 36 (plus 1 info)

## No deployed fleet pins

**info.** No deployed versions available. Rolling-window compatibility (breaking field removal vs live consumers) was not evaluated. This scan is in-repo topology only.

Rule id: `EDA-INFO-NO-FLEET`

## Orphan consumer — `AccessTokenCreatedEvent`

**high.** Event 'AccessTokenCreatedEvent' is consumed by cqrs but no service in this repo declares a producer.

Rule id: `EDA-orphan-consumer`

- `libs/core/src/cqrs/events/impl/access-token/access-token-created.event.ts`

## Orphan consumer — `AccessTokenDeletedEvent`

**high.** Event 'AccessTokenDeletedEvent' is consumed by cqrs but no service in this repo declares a producer.

Rule id: `EDA-orphan-consumer`

- `libs/core/src/cqrs/events/impl/access-token/access-token-deleted.event.ts`

## Orphan consumer — `EmailVerifiedEvent`

**high.** Event 'EmailVerifiedEvent' is consumed by cqrs but no service in this repo declares a producer.

Rule id: `EDA-orphan-consumer`

- `libs/core/src/cqrs/events/impl/account/email-verified.event.ts`

## Orphan consumer — `ForgotPasswordSentEvent`

**high.** Event 'ForgotPasswordSentEvent' is consumed by cqrs but no service in this repo declares a producer.

Rule id: `EDA-orphan-consumer`

- `libs/core/src/cqrs/events/impl/account/forgot-password-sent.event.ts`

## Orphan consumer — `MemberAcceptedInvitationEvent`

**high.** Event 'MemberAcceptedInvitationEvent' is consumed by cqrs but no service in this repo declares a producer.

Rule id: `EDA-orphan-consumer`

- `libs/core/src/cqrs/events/impl/member/member-accepted-invitation.event.ts`

## Orphan consumer — `MemberInvitedEvent`

**high.** Event 'MemberInvitedEvent' is consumed by cqrs but no service in this repo declares a producer.

Rule id: `EDA-orphan-consumer`

- `libs/core/src/cqrs/events/impl/member/member-invited.event.ts`

## Orphan consumer — `MemberRemovedEvent`

**high.** Event 'MemberRemovedEvent' is consumed by cqrs but no service in this repo declares a producer.

Rule id: `EDA-orphan-consumer`

- `libs/core/src/cqrs/events/impl/member/member-removed.event.ts`

## Orphan consumer — `MemberUpdatedEvent`

**high.** Event 'MemberUpdatedEvent' is consumed by cqrs but no service in this repo declares a producer.

Rule id: `EDA-orphan-consumer`

- `libs/core/src/cqrs/events/impl/member/member-updated.event.ts`

## Orphan consumer — `PaymentMethodAddedEvent`

**high.** Event 'PaymentMethodAddedEvent' is consumed by cqrs but no service in this repo declares a producer.

Rule id: `EDA-orphan-consumer`

- `libs/core/src/cqrs/events/impl/card/payment-method-added.event.ts`

## Orphan consumer — `PaymentMethodDeletedEvent`

**high.** Event 'PaymentMethodDeletedEvent' is consumed by cqrs but no service in this repo declares a producer.

Rule id: `EDA-orphan-consumer`

- `libs/core/src/cqrs/events/impl/card/payment-method-deleted.event.ts`

## Orphan consumer — `PaymentMethodUpdatedEvent`

**high.** Event 'PaymentMethodUpdatedEvent' is consumed by cqrs but no service in this repo declares a producer.

Rule id: `EDA-orphan-consumer`

- `libs/core/src/cqrs/events/impl/card/payment-method-updated.event.ts`

## Orphan consumer — `PlanCreatedEvent`

**high.** Event 'PlanCreatedEvent' is consumed by cqrs but no service in this repo declares a producer.

Rule id: `EDA-orphan-consumer`

- `libs/core/src/cqrs/events/impl/plan/plan-created.event.ts`

## Orphan consumer — `PlanDeletedEvent`

**high.** Event 'PlanDeletedEvent' is consumed by cqrs but no service in this repo declares a producer.

Rule id: `EDA-orphan-consumer`

- `libs/core/src/cqrs/events/impl/plan/plan-deleted.event.ts`

## Orphan consumer — `PlanUpdatedEvent`

**high.** Event 'PlanUpdatedEvent' is consumed by cqrs but no service in this repo declares a producer.

Rule id: `EDA-orphan-consumer`

- `libs/core/src/cqrs/events/impl/plan/plan-updated.event.ts`

## Orphan consumer — `ProjectCreatedEvent`

**high.** Event 'ProjectCreatedEvent' is consumed by cqrs but no service in this repo declares a producer.

Rule id: `EDA-orphan-consumer`

- `libs/core/src/cqrs/events/impl/project/project-created.event.ts`

## Orphan consumer — `ProjectDeletedEvent`

**high.** Event 'ProjectDeletedEvent' is consumed by cqrs but no service in this repo declares a producer.

Rule id: `EDA-orphan-consumer`

- `libs/core/src/cqrs/events/impl/project/project-deleted.event.ts`

## Orphan consumer — `ProjectUpdatedEvent`

**high.** Event 'ProjectUpdatedEvent' is consumed by cqrs but no service in this repo declares a producer.

Rule id: `EDA-orphan-consumer`

- `libs/core/src/cqrs/events/impl/project/project-updated.event.ts`

## Orphan consumer — `StripeUserCreatedEvent`

**high.** Event 'StripeUserCreatedEvent' is consumed by cqrs but no service in this repo declares a producer.

Rule id: `EDA-orphan-consumer`

- `libs/core/src/cqrs/events/impl/billing/stripe-user-created.event.ts`

## Orphan consumer — `StripeUserDeletedEvent`

**high.** Event 'StripeUserDeletedEvent' is consumed by cqrs but no service in this repo declares a producer.

Rule id: `EDA-orphan-consumer`

- `libs/core/src/cqrs/events/impl/billing/stripe-user-deleted.event.ts`

## Orphan consumer — `StripeUserUpdatedEvent`

**high.** Event 'StripeUserUpdatedEvent' is consumed by cqrs but no service in this repo declares a producer.

Rule id: `EDA-orphan-consumer`

- `libs/core/src/cqrs/events/impl/billing/stripe-user-updated.event.ts`

## Orphan consumer — `SubscriptionCanceledEvent`

**high.** Event 'SubscriptionCanceledEvent' is consumed by cqrs but no service in this repo declares a producer.

Rule id: `EDA-orphan-consumer`

- `libs/core/src/cqrs/events/impl/subscription/subscription-canceled.event.ts`

## Orphan consumer — `SubscriptionChangedEvent`

**high.** Event 'SubscriptionChangedEvent' is consumed by cqrs but no service in this repo declares a producer.

Rule id: `EDA-orphan-consumer`

- `libs/core/src/cqrs/events/impl/subscription/subscription-changed.event.ts`

## Orphan consumer — `SubscriptionCreatedEvent`

**high.** Event 'SubscriptionCreatedEvent' is consumed by cqrs but no service in this repo declares a producer.

Rule id: `EDA-orphan-consumer`

- `libs/core/src/cqrs/events/impl/subscription/subscription-created.event.ts`

## Orphan consumer — `TenantCreatedEvent`

**high.** Event 'TenantCreatedEvent' is consumed by cqrs but no service in this repo declares a producer.

Rule id: `EDA-orphan-consumer`

- `libs/core/src/cqrs/events/impl/tenant/tenant-created.event.ts`

## Orphan consumer — `TenantRemovedEvent`

**high.** Event 'TenantRemovedEvent' is consumed by cqrs but no service in this repo declares a producer.

Rule id: `EDA-orphan-consumer`

- `libs/core/src/cqrs/events/impl/tenant/tenant-removed.event.ts`

## Orphan consumer — `TenantUpdatedEvent`

**high.** Event 'TenantUpdatedEvent' is consumed by cqrs but no service in this repo declares a producer.

Rule id: `EDA-orphan-consumer`

- `libs/core/src/cqrs/events/impl/tenant/tenant-updated.event.ts`

## Orphan consumer — `UserCreatedEvent`

**high.** Event 'UserCreatedEvent' is consumed by cqrs but no service in this repo declares a producer.

Rule id: `EDA-orphan-consumer`

- `libs/core/src/cqrs/events/impl/user/user-created.event.ts`

## Orphan consumer — `UserDeletedEvent`

**high.** Event 'UserDeletedEvent' is consumed by cqrs but no service in this repo declares a producer.

Rule id: `EDA-orphan-consumer`

- `libs/core/src/cqrs/events/impl/user/user-deleted.event.ts`

## Orphan consumer — `UserLoggedInEvent`

**high.** Event 'UserLoggedInEvent' is consumed by cqrs but no service in this repo declares a producer.

Rule id: `EDA-orphan-consumer`

- `libs/core/src/cqrs/events/impl/account/user-loggedin.event.ts`

## Orphan consumer — `UserPasswordUpdatedEvent`

**high.** Event 'UserPasswordUpdatedEvent' is consumed by cqrs but no service in this repo declares a producer.

Rule id: `EDA-orphan-consumer`

- `libs/core/src/cqrs/events/impl/account/user-password-updated.event.ts`

## Orphan consumer — `UserRegisteredEvent`

**high.** Event 'UserRegisteredEvent' is consumed by cqrs but no service in this repo declares a producer.

Rule id: `EDA-orphan-consumer`

- `libs/core/src/cqrs/events/impl/account/user-registered.event.ts`

## Orphan consumer — `UserUpdatedEvent`

**high.** Event 'UserUpdatedEvent' is consumed by cqrs but no service in this repo declares a producer.

Rule id: `EDA-orphan-consumer`

- `libs/core/src/cqrs/events/impl/user/user-updated.event.ts`

## Orphan consumer — `VerificationEmailSentEvent`

**high.** Event 'VerificationEmailSentEvent' is consumed by cqrs but no service in this repo declares a producer.

Rule id: `EDA-orphan-consumer`

- `libs/core/src/cqrs/events/impl/account/verification-email-sent.event.ts`

## Orphan consumer — `WebhookCreatedEvent`

**high.** Event 'WebhookCreatedEvent' is consumed by cqrs but no service in this repo declares a producer.

Rule id: `EDA-orphan-consumer`

- `libs/core/src/cqrs/events/impl/webhook/webhook-created.event.ts`

## Orphan consumer — `WebhookDeletedEvent`

**high.** Event 'WebhookDeletedEvent' is consumed by cqrs but no service in this repo declares a producer.

Rule id: `EDA-orphan-consumer`

- `libs/core/src/cqrs/events/impl/webhook/webhook-deleted.event.ts`

## Orphan consumer — `WebhookUpdatedEvent`

**high.** Event 'WebhookUpdatedEvent' is consumed by cqrs but no service in this repo declares a producer.

Rule id: `EDA-orphan-consumer`

- `libs/core/src/cqrs/events/impl/webhook/webhook-updated.event.ts`

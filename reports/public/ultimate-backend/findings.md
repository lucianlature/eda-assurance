# Event-contract scan

Findings: 36 (plus 1 info)

## EDA-INFO-NO-FLEET

**info.** No deployed versions available. Rolling-window compatibility (EDA-004) was not evaluated. This scan is in-repo topology only.

## EDA-orphan-consumer — `AccessTokenCreatedEvent`

**high.** Event 'AccessTokenCreatedEvent' is consumed by cqrs but no service in this repo declares a producer.

- `libs/core/src/cqrs/events/impl/access-token/access-token-created.event.ts`

## EDA-orphan-consumer — `AccessTokenDeletedEvent`

**high.** Event 'AccessTokenDeletedEvent' is consumed by cqrs but no service in this repo declares a producer.

- `libs/core/src/cqrs/events/impl/access-token/access-token-deleted.event.ts`

## EDA-orphan-consumer — `EmailVerifiedEvent`

**high.** Event 'EmailVerifiedEvent' is consumed by cqrs but no service in this repo declares a producer.

- `libs/core/src/cqrs/events/impl/account/email-verified.event.ts`

## EDA-orphan-consumer — `ForgotPasswordSentEvent`

**high.** Event 'ForgotPasswordSentEvent' is consumed by cqrs but no service in this repo declares a producer.

- `libs/core/src/cqrs/events/impl/account/forgot-password-sent.event.ts`

## EDA-orphan-consumer — `MemberAcceptedInvitationEvent`

**high.** Event 'MemberAcceptedInvitationEvent' is consumed by cqrs but no service in this repo declares a producer.

- `libs/core/src/cqrs/events/impl/member/member-accepted-invitation.event.ts`

## EDA-orphan-consumer — `MemberInvitedEvent`

**high.** Event 'MemberInvitedEvent' is consumed by cqrs but no service in this repo declares a producer.

- `libs/core/src/cqrs/events/impl/member/member-invited.event.ts`

## EDA-orphan-consumer — `MemberRemovedEvent`

**high.** Event 'MemberRemovedEvent' is consumed by cqrs but no service in this repo declares a producer.

- `libs/core/src/cqrs/events/impl/member/member-removed.event.ts`

## EDA-orphan-consumer — `MemberUpdatedEvent`

**high.** Event 'MemberUpdatedEvent' is consumed by cqrs but no service in this repo declares a producer.

- `libs/core/src/cqrs/events/impl/member/member-updated.event.ts`

## EDA-orphan-consumer — `PaymentMethodAddedEvent`

**high.** Event 'PaymentMethodAddedEvent' is consumed by cqrs but no service in this repo declares a producer.

- `libs/core/src/cqrs/events/impl/card/payment-method-added.event.ts`

## EDA-orphan-consumer — `PaymentMethodDeletedEvent`

**high.** Event 'PaymentMethodDeletedEvent' is consumed by cqrs but no service in this repo declares a producer.

- `libs/core/src/cqrs/events/impl/card/payment-method-deleted.event.ts`

## EDA-orphan-consumer — `PaymentMethodUpdatedEvent`

**high.** Event 'PaymentMethodUpdatedEvent' is consumed by cqrs but no service in this repo declares a producer.

- `libs/core/src/cqrs/events/impl/card/payment-method-updated.event.ts`

## EDA-orphan-consumer — `PlanCreatedEvent`

**high.** Event 'PlanCreatedEvent' is consumed by cqrs but no service in this repo declares a producer.

- `libs/core/src/cqrs/events/impl/plan/plan-created.event.ts`

## EDA-orphan-consumer — `PlanDeletedEvent`

**high.** Event 'PlanDeletedEvent' is consumed by cqrs but no service in this repo declares a producer.

- `libs/core/src/cqrs/events/impl/plan/plan-deleted.event.ts`

## EDA-orphan-consumer — `PlanUpdatedEvent`

**high.** Event 'PlanUpdatedEvent' is consumed by cqrs but no service in this repo declares a producer.

- `libs/core/src/cqrs/events/impl/plan/plan-updated.event.ts`

## EDA-orphan-consumer — `ProjectCreatedEvent`

**high.** Event 'ProjectCreatedEvent' is consumed by cqrs but no service in this repo declares a producer.

- `libs/core/src/cqrs/events/impl/project/project-created.event.ts`

## EDA-orphan-consumer — `ProjectDeletedEvent`

**high.** Event 'ProjectDeletedEvent' is consumed by cqrs but no service in this repo declares a producer.

- `libs/core/src/cqrs/events/impl/project/project-deleted.event.ts`

## EDA-orphan-consumer — `ProjectUpdatedEvent`

**high.** Event 'ProjectUpdatedEvent' is consumed by cqrs but no service in this repo declares a producer.

- `libs/core/src/cqrs/events/impl/project/project-updated.event.ts`

## EDA-orphan-consumer — `StripeUserCreatedEvent`

**high.** Event 'StripeUserCreatedEvent' is consumed by cqrs but no service in this repo declares a producer.

- `libs/core/src/cqrs/events/impl/billing/stripe-user-created.event.ts`

## EDA-orphan-consumer — `StripeUserDeletedEvent`

**high.** Event 'StripeUserDeletedEvent' is consumed by cqrs but no service in this repo declares a producer.

- `libs/core/src/cqrs/events/impl/billing/stripe-user-deleted.event.ts`

## EDA-orphan-consumer — `StripeUserUpdatedEvent`

**high.** Event 'StripeUserUpdatedEvent' is consumed by cqrs but no service in this repo declares a producer.

- `libs/core/src/cqrs/events/impl/billing/stripe-user-updated.event.ts`

## EDA-orphan-consumer — `SubscriptionCanceledEvent`

**high.** Event 'SubscriptionCanceledEvent' is consumed by cqrs but no service in this repo declares a producer.

- `libs/core/src/cqrs/events/impl/subscription/subscription-canceled.event.ts`

## EDA-orphan-consumer — `SubscriptionChangedEvent`

**high.** Event 'SubscriptionChangedEvent' is consumed by cqrs but no service in this repo declares a producer.

- `libs/core/src/cqrs/events/impl/subscription/subscription-changed.event.ts`

## EDA-orphan-consumer — `SubscriptionCreatedEvent`

**high.** Event 'SubscriptionCreatedEvent' is consumed by cqrs but no service in this repo declares a producer.

- `libs/core/src/cqrs/events/impl/subscription/subscription-created.event.ts`

## EDA-orphan-consumer — `TenantCreatedEvent`

**high.** Event 'TenantCreatedEvent' is consumed by cqrs but no service in this repo declares a producer.

- `libs/core/src/cqrs/events/impl/tenant/tenant-created.event.ts`

## EDA-orphan-consumer — `TenantRemovedEvent`

**high.** Event 'TenantRemovedEvent' is consumed by cqrs but no service in this repo declares a producer.

- `libs/core/src/cqrs/events/impl/tenant/tenant-removed.event.ts`

## EDA-orphan-consumer — `TenantUpdatedEvent`

**high.** Event 'TenantUpdatedEvent' is consumed by cqrs but no service in this repo declares a producer.

- `libs/core/src/cqrs/events/impl/tenant/tenant-updated.event.ts`

## EDA-orphan-consumer — `UserCreatedEvent`

**high.** Event 'UserCreatedEvent' is consumed by cqrs but no service in this repo declares a producer.

- `libs/core/src/cqrs/events/impl/user/user-created.event.ts`

## EDA-orphan-consumer — `UserDeletedEvent`

**high.** Event 'UserDeletedEvent' is consumed by cqrs but no service in this repo declares a producer.

- `libs/core/src/cqrs/events/impl/user/user-deleted.event.ts`

## EDA-orphan-consumer — `UserLoggedInEvent`

**high.** Event 'UserLoggedInEvent' is consumed by cqrs but no service in this repo declares a producer.

- `libs/core/src/cqrs/events/impl/account/user-loggedin.event.ts`

## EDA-orphan-consumer — `UserPasswordUpdatedEvent`

**high.** Event 'UserPasswordUpdatedEvent' is consumed by cqrs but no service in this repo declares a producer.

- `libs/core/src/cqrs/events/impl/account/user-password-updated.event.ts`

## EDA-orphan-consumer — `UserRegisteredEvent`

**high.** Event 'UserRegisteredEvent' is consumed by cqrs but no service in this repo declares a producer.

- `libs/core/src/cqrs/events/impl/account/user-registered.event.ts`

## EDA-orphan-consumer — `UserUpdatedEvent`

**high.** Event 'UserUpdatedEvent' is consumed by cqrs but no service in this repo declares a producer.

- `libs/core/src/cqrs/events/impl/user/user-updated.event.ts`

## EDA-orphan-consumer — `VerificationEmailSentEvent`

**high.** Event 'VerificationEmailSentEvent' is consumed by cqrs but no service in this repo declares a producer.

- `libs/core/src/cqrs/events/impl/account/verification-email-sent.event.ts`

## EDA-orphan-consumer — `WebhookCreatedEvent`

**high.** Event 'WebhookCreatedEvent' is consumed by cqrs but no service in this repo declares a producer.

- `libs/core/src/cqrs/events/impl/webhook/webhook-created.event.ts`

## EDA-orphan-consumer — `WebhookDeletedEvent`

**high.** Event 'WebhookDeletedEvent' is consumed by cqrs but no service in this repo declares a producer.

- `libs/core/src/cqrs/events/impl/webhook/webhook-deleted.event.ts`

## EDA-orphan-consumer — `WebhookUpdatedEvent`

**high.** Event 'WebhookUpdatedEvent' is consumed by cqrs but no service in this repo declares a producer.

- `libs/core/src/cqrs/events/impl/webhook/webhook-updated.event.ts`

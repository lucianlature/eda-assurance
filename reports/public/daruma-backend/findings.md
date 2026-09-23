# Event-contract scan

Findings: 30 (plus 1 info)

## No deployed fleet pins

**info.** No deployed versions available. Rolling-window compatibility (breaking field removal vs live consumers) was not evaluated. This scan is in-repo topology only.

Rule id: `EDA-INFO-NO-FLEET`

## Orphan consumer — `BillCurrencyCodeWasChanged`

**high.** Event 'BillCurrencyCodeWasChanged' is consumed by bill but no service in this repo declares a producer.

Rule id: `EDA-orphan-consumer`

- `src/bill/domain/event/bill-currency-code-was-changed.event.ts`

## Orphan consumer — `BillDateWasChanged`

**high.** Event 'BillDateWasChanged' is consumed by bill but no service in this repo declares a producer.

Rule id: `EDA-orphan-consumer`

- `src/bill/domain/event/bill-date-was-changed.event.ts`

## Orphan consumer — `BillDebtorWasAdded`

**high.** Event 'BillDebtorWasAdded' is consumed by bill but no service in this repo declares a producer.

Rule id: `EDA-orphan-consumer`

- `src/bill/domain/event/bill-debtor-was-added.event.ts`

## Orphan consumer — `BillDebtorWasRemoved`

**high.** Event 'BillDebtorWasRemoved' is consumed by bill but no service in this repo declares a producer.

Rule id: `EDA-orphan-consumer`

- `src/bill/domain/event/bill-debtor-was-removed.event.ts`

## Orphan consumer — `BillMoneyWasChanged`

**high.** Event 'BillMoneyWasChanged' is consumed by bill but no service in this repo declares a producer.

Rule id: `EDA-orphan-consumer`

- `src/bill/domain/event/bill-money-was-changed.event.ts`

## Orphan consumer — `BillNameWasChanged`

**high.** Event 'BillNameWasChanged' is consumed by bill but no service in this repo declares a producer.

Rule id: `EDA-orphan-consumer`

- `src/bill/domain/event/bill-name-was-changed.event.ts`

## Orphan consumer — `BillPayerWasAdded`

**high.** Event 'BillPayerWasAdded' is consumed by bill but no service in this repo declares a producer.

Rule id: `EDA-orphan-consumer`

- `src/bill/domain/event/bill-payer-was-added.event.ts`

## Orphan consumer — `BillPayerWasRemoved`

**high.** Event 'BillPayerWasRemoved' is consumed by bill but no service in this repo declares a producer.

Rule id: `EDA-orphan-consumer`

- `src/bill/domain/event/bill-payer-was-removed.event.ts`

## Orphan consumer — `BillWasCreated`

**high.** Event 'BillWasCreated' is consumed by bill but no service in this repo declares a producer.

Rule id: `EDA-orphan-consumer`

- `src/bill/domain/event/bill-was-created.event.ts`

## Orphan consumer — `BillWasRemoved`

**high.** Event 'BillWasRemoved' is consumed by bill but no service in this repo declares a producer.

Rule id: `EDA-orphan-consumer`

- `src/bill/domain/event/bill-was-removed.event.ts`

## Orphan consumer — `DebtTransactionWasCreated`

**high.** Event 'DebtTransactionWasCreated' is consumed by transaction but no service in this repo declares a producer.

Rule id: `EDA-orphan-consumer`

- `src/transaction/domain/event/debt-transaction-was-created.event.ts`

## Orphan consumer — `DebtTransactionWasRemoved`

**high.** Event 'DebtTransactionWasRemoved' is consumed by transaction but no service in this repo declares a producer.

Rule id: `EDA-orphan-consumer`

- `src/transaction/domain/event/debt-transaction-was-removed.event.ts`

## Orphan consumer — `DepositTransactionWasCreated`

**high.** Event 'DepositTransactionWasCreated' is consumed by transaction but no service in this repo declares a producer.

Rule id: `EDA-orphan-consumer`

- `src/transaction/domain/event/deposit-transaction-was-created.event.ts`

## Orphan consumer — `DepositTransactionWasRemoved`

**high.** Event 'DepositTransactionWasRemoved' is consumed by transaction but no service in this repo declares a producer.

Rule id: `EDA-orphan-consumer`

- `src/transaction/domain/event/deposit-transaction-was-removed.event.ts`

## Orphan consumer — `GroupCurrencyCodeWasChanged`

**high.** Event 'GroupCurrencyCodeWasChanged' is consumed by group but no service in this repo declares a producer.

Rule id: `EDA-orphan-consumer`

- `src/group/domain/event/group-currency-code-was-changed.event.ts`

## Orphan consumer — `GroupNameWasChanged`

**high.** Event 'GroupNameWasChanged' is consumed by group but no service in this repo declares a producer.

Rule id: `EDA-orphan-consumer`

- `src/group/domain/event/group-name-was-changed.event.ts`

## Orphan consumer — `GroupWasCreated`

**high.** Event 'GroupWasCreated' is consumed by group but no service in this repo declares a producer.

Rule id: `EDA-orphan-consumer`

- `src/group/domain/event/group-was-created.event.ts`

## Orphan consumer — `GroupWasRemoved`

**high.** Event 'GroupWasRemoved' is consumed by group but no service in this repo declares a producer.

Rule id: `EDA-orphan-consumer`

- `src/group/domain/event/group-was-removed.event.ts`

## Orphan consumer — `MemberNameWasChanged`

**high.** Event 'MemberNameWasChanged' is consumed by member but no service in this repo declares a producer.

Rule id: `EDA-orphan-consumer`

- `src/member/domain/event/member-name-was-changed.event.ts`

## Orphan consumer — `MemberWasCreated`

**high.** Event 'MemberWasCreated' is consumed by member, transaction but no service in this repo declares a producer.

Rule id: `EDA-orphan-consumer`

- `src/member/domain/event/member-was-created.event.ts`

## Orphan consumer — `MemberWasRegisteredAsUser`

**high.** Event 'MemberWasRegisteredAsUser' is consumed by member but no service in this repo declares a producer.

Rule id: `EDA-orphan-consumer`

- `src/member/domain/event/member-was-registered-as-user.event.ts`

## Orphan consumer — `MemberWasRemoved`

**high.** Event 'MemberWasRemoved' is consumed by member, transaction but no service in this repo declares a producer.

Rule id: `EDA-orphan-consumer`

- `src/member/domain/event/member-was-removed.event.ts`

## Orphan consumer — `RecurringBillPeriodWasChanged`

**high.** Event 'RecurringBillPeriodWasChanged' is consumed by recurringBill but no service in this repo declares a producer.

Rule id: `EDA-orphan-consumer`

- `src/recurringBill/domain/event/recurring-bill-period-was-changed.event.ts`

## Orphan consumer — `RecurringBillWasCreated`

**high.** Event 'RecurringBillWasCreated' is consumed by recurringBill but no service in this repo declares a producer.

Rule id: `EDA-orphan-consumer`

- `src/recurringBill/domain/event/recurring-bill-was-created.event.ts`

## Orphan consumer — `RecurringBillWasRemoved`

**high.** Event 'RecurringBillWasRemoved' is consumed by recurringBill but no service in this repo declares a producer.

Rule id: `EDA-orphan-consumer`

- `src/recurringBill/domain/event/recurring-bill-was-removed.event.ts`

## Orphan consumer — `TransferTransactionWasCreated`

**high.** Event 'TransferTransactionWasCreated' is consumed by transaction but no service in this repo declares a producer.

Rule id: `EDA-orphan-consumer`

- `src/transaction/domain/event/transfer-transaction-was-created.event.ts`

## Orphan consumer — `TransferTransactionWasRemoved`

**high.** Event 'TransferTransactionWasRemoved' is consumed by transaction but no service in this repo declares a producer.

Rule id: `EDA-orphan-consumer`

- `src/transaction/domain/event/transfer-transaction-was-removed.event.ts`

## Orphan consumer — `UserNameWasChanged`

**high.** Event 'UserNameWasChanged' is consumed by user but no service in this repo declares a producer.

Rule id: `EDA-orphan-consumer`

- `src/user/domain/event/user-name-was-changed.event.ts`

## Orphan consumer — `UserPaypalWasChanged`

**high.** Event 'UserPaypalWasChanged' is consumed by user but no service in this repo declares a producer.

Rule id: `EDA-orphan-consumer`

- `src/user/domain/event/user-paypal-was-changed.event.ts`

## Orphan consumer — `UserWasCreated`

**high.** Event 'UserWasCreated' is consumed by user but no service in this repo declares a producer.

Rule id: `EDA-orphan-consumer`

- `src/user/domain/event/user-was-created.event.ts`

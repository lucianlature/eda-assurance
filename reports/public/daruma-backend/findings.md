# Event-contract scan

Findings: 30 (plus 1 info)

## EDA-INFO-NO-FLEET

**info.** No deployed versions available. Rolling-window compatibility (EDA-004) was not evaluated. This scan is in-repo topology only.

## EDA-orphan-consumer — `BillCurrencyCodeWasChanged`

**high.** Event 'BillCurrencyCodeWasChanged' is consumed by bill but no service in this repo declares a producer.

- `src/bill/domain/event/bill-currency-code-was-changed.event.ts`

## EDA-orphan-consumer — `BillDateWasChanged`

**high.** Event 'BillDateWasChanged' is consumed by bill but no service in this repo declares a producer.

- `src/bill/domain/event/bill-date-was-changed.event.ts`

## EDA-orphan-consumer — `BillDebtorWasAdded`

**high.** Event 'BillDebtorWasAdded' is consumed by bill but no service in this repo declares a producer.

- `src/bill/domain/event/bill-debtor-was-added.event.ts`

## EDA-orphan-consumer — `BillDebtorWasRemoved`

**high.** Event 'BillDebtorWasRemoved' is consumed by bill but no service in this repo declares a producer.

- `src/bill/domain/event/bill-debtor-was-removed.event.ts`

## EDA-orphan-consumer — `BillMoneyWasChanged`

**high.** Event 'BillMoneyWasChanged' is consumed by bill but no service in this repo declares a producer.

- `src/bill/domain/event/bill-money-was-changed.event.ts`

## EDA-orphan-consumer — `BillNameWasChanged`

**high.** Event 'BillNameWasChanged' is consumed by bill but no service in this repo declares a producer.

- `src/bill/domain/event/bill-name-was-changed.event.ts`

## EDA-orphan-consumer — `BillPayerWasAdded`

**high.** Event 'BillPayerWasAdded' is consumed by bill but no service in this repo declares a producer.

- `src/bill/domain/event/bill-payer-was-added.event.ts`

## EDA-orphan-consumer — `BillPayerWasRemoved`

**high.** Event 'BillPayerWasRemoved' is consumed by bill but no service in this repo declares a producer.

- `src/bill/domain/event/bill-payer-was-removed.event.ts`

## EDA-orphan-consumer — `BillWasCreated`

**high.** Event 'BillWasCreated' is consumed by bill but no service in this repo declares a producer.

- `src/bill/domain/event/bill-was-created.event.ts`

## EDA-orphan-consumer — `BillWasRemoved`

**high.** Event 'BillWasRemoved' is consumed by bill but no service in this repo declares a producer.

- `src/bill/domain/event/bill-was-removed.event.ts`

## EDA-orphan-consumer — `DebtTransactionWasCreated`

**high.** Event 'DebtTransactionWasCreated' is consumed by transaction but no service in this repo declares a producer.

- `src/transaction/domain/event/debt-transaction-was-created.event.ts`

## EDA-orphan-consumer — `DebtTransactionWasRemoved`

**high.** Event 'DebtTransactionWasRemoved' is consumed by transaction but no service in this repo declares a producer.

- `src/transaction/domain/event/debt-transaction-was-removed.event.ts`

## EDA-orphan-consumer — `DepositTransactionWasCreated`

**high.** Event 'DepositTransactionWasCreated' is consumed by transaction but no service in this repo declares a producer.

- `src/transaction/domain/event/deposit-transaction-was-created.event.ts`

## EDA-orphan-consumer — `DepositTransactionWasRemoved`

**high.** Event 'DepositTransactionWasRemoved' is consumed by transaction but no service in this repo declares a producer.

- `src/transaction/domain/event/deposit-transaction-was-removed.event.ts`

## EDA-orphan-consumer — `GroupCurrencyCodeWasChanged`

**high.** Event 'GroupCurrencyCodeWasChanged' is consumed by group but no service in this repo declares a producer.

- `src/group/domain/event/group-currency-code-was-changed.event.ts`

## EDA-orphan-consumer — `GroupNameWasChanged`

**high.** Event 'GroupNameWasChanged' is consumed by group but no service in this repo declares a producer.

- `src/group/domain/event/group-name-was-changed.event.ts`

## EDA-orphan-consumer — `GroupWasCreated`

**high.** Event 'GroupWasCreated' is consumed by group but no service in this repo declares a producer.

- `src/group/domain/event/group-was-created.event.ts`

## EDA-orphan-consumer — `GroupWasRemoved`

**high.** Event 'GroupWasRemoved' is consumed by group but no service in this repo declares a producer.

- `src/group/domain/event/group-was-removed.event.ts`

## EDA-orphan-consumer — `MemberNameWasChanged`

**high.** Event 'MemberNameWasChanged' is consumed by member but no service in this repo declares a producer.

- `src/member/domain/event/member-name-was-changed.event.ts`

## EDA-orphan-consumer — `MemberWasCreated`

**high.** Event 'MemberWasCreated' is consumed by member, transaction but no service in this repo declares a producer.

- `src/member/domain/event/member-was-created.event.ts`

## EDA-orphan-consumer — `MemberWasRegisteredAsUser`

**high.** Event 'MemberWasRegisteredAsUser' is consumed by member but no service in this repo declares a producer.

- `src/member/domain/event/member-was-registered-as-user.event.ts`

## EDA-orphan-consumer — `MemberWasRemoved`

**high.** Event 'MemberWasRemoved' is consumed by member, transaction but no service in this repo declares a producer.

- `src/member/domain/event/member-was-removed.event.ts`

## EDA-orphan-consumer — `RecurringBillPeriodWasChanged`

**high.** Event 'RecurringBillPeriodWasChanged' is consumed by recurringBill but no service in this repo declares a producer.

- `src/recurringBill/domain/event/recurring-bill-period-was-changed.event.ts`

## EDA-orphan-consumer — `RecurringBillWasCreated`

**high.** Event 'RecurringBillWasCreated' is consumed by recurringBill but no service in this repo declares a producer.

- `src/recurringBill/domain/event/recurring-bill-was-created.event.ts`

## EDA-orphan-consumer — `RecurringBillWasRemoved`

**high.** Event 'RecurringBillWasRemoved' is consumed by recurringBill but no service in this repo declares a producer.

- `src/recurringBill/domain/event/recurring-bill-was-removed.event.ts`

## EDA-orphan-consumer — `TransferTransactionWasCreated`

**high.** Event 'TransferTransactionWasCreated' is consumed by transaction but no service in this repo declares a producer.

- `src/transaction/domain/event/transfer-transaction-was-created.event.ts`

## EDA-orphan-consumer — `TransferTransactionWasRemoved`

**high.** Event 'TransferTransactionWasRemoved' is consumed by transaction but no service in this repo declares a producer.

- `src/transaction/domain/event/transfer-transaction-was-removed.event.ts`

## EDA-orphan-consumer — `UserNameWasChanged`

**high.** Event 'UserNameWasChanged' is consumed by user but no service in this repo declares a producer.

- `src/user/domain/event/user-name-was-changed.event.ts`

## EDA-orphan-consumer — `UserPaypalWasChanged`

**high.** Event 'UserPaypalWasChanged' is consumed by user but no service in this repo declares a producer.

- `src/user/domain/event/user-paypal-was-changed.event.ts`

## EDA-orphan-consumer — `UserWasCreated`

**high.** Event 'UserWasCreated' is consumed by user but no service in this repo declares a producer.

- `src/user/domain/event/user-was-created.event.ts`

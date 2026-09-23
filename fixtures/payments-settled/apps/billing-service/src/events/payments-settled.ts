export const CONTRACT = "payments.settled.v1";

export type Money = { currency: string; minor: number };

// After: settlementReference removed. Schema-compatible in isolation.
// Consumers still running the old handler are not.
export interface PaymentsSettledV1 {
  paymentId: string;
  amount: Money;
}

export function publishPaymentsSettled(event: PaymentsSettledV1): void {
  void event;
}

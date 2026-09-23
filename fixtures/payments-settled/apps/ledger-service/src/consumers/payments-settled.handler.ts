export const CONTRACT = "payments.settled.v1";

export type Money = { currency: string; minor: number };

// Deployed handler (pin a3f2c1e). Still requires the field the producer just dropped.
export interface PaymentsSettledV1 {
  paymentId: string;
  amount: Money;
  settlementReference: string;
}

export function handlePaymentsSettled(event: PaymentsSettledV1): void {
  void event.settlementReference;
}

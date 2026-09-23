export const CONTRACT = "payments.settled.v1";

export type Money = { currency: string; minor: number };

// Deployed handler (pin 9d1e77b).
export interface PaymentsSettledV1 {
  paymentId: string;
  amount: Money;
  settlementReference: string;
}

export function projectSettlement(event: PaymentsSettledV1): void {
  void event.settlementReference;
}

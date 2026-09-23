export const CONTRACT = "payments.settled.v1";

export type Money = { currency: string; minor: number };

export interface PaymentsSettledV1 {
  paymentId: string;
  amount: Money;
}

export function notifyPayment(event: PaymentsSettledV1): void {
  void event.paymentId;
}

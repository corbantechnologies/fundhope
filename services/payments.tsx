import { apiActions } from "@/tools/api";

interface Payment {
  donation_reference: string;
  phone_number: string;
}

export const makePayment = async (data: Payment) => {
  await apiActions.post(`/api/v1/payments/donation-pay/`, data);
};

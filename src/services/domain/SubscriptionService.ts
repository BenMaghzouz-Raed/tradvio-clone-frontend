import http from "@/lib/http";

export const createPaymentSession = (params: { subscription_id: string }) => {
  return http.post(
    `/subscription/create-checkout-session/${params.subscription_id}`
  );
};

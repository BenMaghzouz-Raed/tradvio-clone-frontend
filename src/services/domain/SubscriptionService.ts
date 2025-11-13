import http from "@/lib/http";

export const createStripePaymentSession = (params: {
  subscription_id: string;
}) => {
  return http.post(
    `/subscription/stripe/create-checkout-session/${params.subscription_id}`
  );
};

export const createPaypalOrder = (params: { subscription_id: string }) => {
  return http.post(
    `/subscription/paypal/create-order/${params.subscription_id}`
  );
};

export const capturePaypalOrder = (params: { orderId: string }) => {
  return http.post(`/subscription/paypal/capture-order/${params.orderId}`);
};

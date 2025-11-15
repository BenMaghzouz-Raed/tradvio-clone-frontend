import httpClient from "@/lib/http";
import { AddSubscriptionPlanFormValues } from "@/validation/subscription-plan-validation";

export const getSubscriptionPlans = () => {
  return httpClient.get("/subscription-plan");
};

export const addSubscriptionPlan = (values: AddSubscriptionPlanFormValues) => {
  return httpClient.post("/subscription-plan", values);
};

export const activateSubscriptionPlan = (planId: string) => {
  return httpClient.patch(`/subscription-plan/${planId}/activate`);
};

export const disactivateSubscriptionPlan = (planId: string) => {
  return httpClient.patch(`/subscription-plan/${planId}/disactivate`);
};

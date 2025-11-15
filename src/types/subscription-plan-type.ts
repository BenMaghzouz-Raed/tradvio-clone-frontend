/* eslint-disable @typescript-eslint/no-explicit-any */
export type BillingIntervalType = "month" | "year";

export interface ISubscriptionPlan {
  plan_id: string;
  name: string;
  description: string;
  price: number;
  currency: string;
  billing_interval: BillingIntervalType;
  features: any;
  is_active: boolean;
  created_at: Date;
  updated_at: Date;
}

export interface ISubscriptionPlanCreate {
  name: string;
  description: string;
  price: number;
  currency: string;
  billing_interval: BillingIntervalType;
  features: any;
  is_active: boolean;
}

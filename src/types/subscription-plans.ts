export interface SubscriptionPlan {
  id: string;
  name: string;
  price: number;
  description: string;
  features: { label: string; available: boolean }[];
  billing_interval: "month" | "year";
}

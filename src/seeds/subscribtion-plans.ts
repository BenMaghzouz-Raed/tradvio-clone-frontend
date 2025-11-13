import { SubscriptionPlan } from "@/types/subscription-plans";

export const billingPlans: SubscriptionPlan[] = [
  {
    id: "70b022c5-77dc-4893-8788-2322cb2951b0",
    name: "Basic",
    price: 9,
    description: "Perfect for individuals getting started.",
    billing_interval: "month",
    features: [
      { label: "Up to 5 Analytics per hour", available: true },
      { label: "10GB storage", available: true },
      { label: "Basic support", available: true },
      { label: "Advanced analytics", available: false },
      { label: "Team collaboration", available: false },
      { label: "Priority support", available: false },
    ],
  },
  {
    id: "53d051bb-2b09-49a1-8c30-daf5d779c0de",
    name: "Professional",
    price: 29,
    description: "Best for growing teams and businesses.",
    billing_interval: "year",
    features: [
      { label: "Unlimited Analysis", available: true },
      { label: "100GB storage", available: true },
      { label: "Priority support", available: true },
      { label: "Advanced analytics", available: true },
      { label: "Team collaboration", available: true },
      { label: "API access", available: false },
    ],
  },
];

export interface BillingPlan {
  id: string;
  name: string;
  price: number;
  description: string;
  features: { label: string; available: boolean }[];
  buttonText: string;
  billing_interval: "month" | "year";
}

export const billingPlans: BillingPlan[] = [
  {
    id: "basic",
    name: "Basic — $9/month",
    price: 9,
    description: "Perfect for individuals getting started.",
    buttonText: "Get Started",
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
    id: "professional",
    name: "Professional — $29/month",
    price: 29,
    description: "Best for growing teams and businesses.",
    buttonText: "Upgrade Now",
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
  {
    id: "enterprise",
    name: "Enterprise — $99/month",
    price: 99,
    description: "For large organizations with advanced needs.",
    buttonText: "Contact Sales",
    billing_interval: "month",
    features: [
      { label: "Unlimited Analysis", available: true },
      { label: "Unlimited storage", available: true },
      { label: "24/7 premium support", available: true },
      { label: "Advanced analytics", available: true },
      { label: "Team collaboration", available: true },
      { label: "Full API access", available: true },
    ],
  },
];

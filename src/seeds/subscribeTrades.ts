export interface BillingHistory {
  date: string;
  description: string;
  amount: string;
  status: string;
  action: string;
}

export interface BillingPlan {
  id: string;
  name: string;
  price: string;
  description: string;
  features: { label: string; available: boolean }[];
  buttonText: string;
}

export const billingData: BillingHistory[] = [
  {
    date: "Dec 15, 2024",
    description: "Professional Plan - Monthly",
    amount: "$29.00",
    status: "Paid",
    action: "",
  },
  {
    date: "Nov 15, 2024",
    description: "Professional Plan - Monthly",
    amount: "$29.00",
    status: "Paid",
    action: "",
  },
  {
    date: "Oct 15, 2024",
    description: "Professional Plan - Monthly",
    amount: "$29.00",
    status: "Paid",
    action: "",
  },
];

export const billingPlans: BillingPlan[] = [
  {
    id: "basic",
    name: "Basic — $9/month",
    price: "$9/month",
    description: "Perfect for individuals getting started.",
    buttonText: "Get Started",
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
    price: "$29/month",
    description: "Best for growing teams and businesses.",
    buttonText: "Upgrade Now",
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
    price: "$99/month",
    description: "For large organizations with advanced needs.",
    buttonText: "Contact Sales",
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

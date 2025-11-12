import { useState } from "react";
import { Card } from "@/components/ui/card";
import SubscribeDetails from "./components/SubscriptionDetails";
import BillingPlanCard from "./components/BillingPlanCard";
import Settings from "./components/Settings";
import Usage from "./components/Usage";
import { billingPlans } from "@/seeds/subscribeTrades";

export default function Subscription() {
  const [selectedPlan, setSelectedPlan] = useState<string>("professional");

  return (
    <div className="space-y-4">
      <Card className="text-sm bg-[#FAFAF9] p-4 space-y-6">
        <h1 className="text-2xl font-semibold mb-2">Current Plan</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <SubscribeDetails />
          <Usage />
          <Settings />
        </div>
        <div>
          <h2 className="text-xl font-semibold mb-3">Available Plans</h2>
          <div className="grid md:grid-cols-3 gap-4">
            {billingPlans.map((plan) => (
              <BillingPlanCard
                key={plan.id}
                plan={plan}
                {...plan}
                isSelected={selectedPlan === plan.id}
                onSelect={() => setSelectedPlan(plan.id)}
              />
            ))}
          </div>
        </div>
      </Card>
    </div>
  );
}

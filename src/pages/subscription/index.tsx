import { Card } from "@/components/ui/card";
import SubscribeDetails from "./components/SubscriptionDetails";
import BillingPlansCard from "./components/BillingPlanCard";
import Settings from "./components/Settings";
import Usage from "./components/Usage";

export default function Subscription() {
  return (
    <div className="space-y-4">
      <Card className="text-sm bg-[#FAFAF9] p-4 space-y-6">
        <h1 className="text-2xl font-semibold mb-2">Current Plan</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <SubscribeDetails />
          <Usage />
          <Settings />
        </div>

        <BillingPlansCard />
      </Card>
    </div>
  );
}

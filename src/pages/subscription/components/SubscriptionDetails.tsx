import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function SubscriptionDetails() {
  return (
    <Card className="text-[#44403C] bg-[#FAFAF9]">
      <CardHeader className="pb-1">
        <CardTitle className="text-base">Plan Details</CardTitle>
      </CardHeader>
      <CardContent className="space-y-1.5">
        <div className="flex justify-between">
          <span>Plan</span>
          <span className="font-medium rounded-full bg-[#1C1917] text-white px-2 py-0.5">
            Professional
          </span>
        </div>
        <div className="flex justify-between">
          <span>Status</span>
          <span className="text-[#22C55E] bg-[#F0FDF4] font-medium">
            Active
          </span>
        </div>
        <div className="flex justify-between">
          <span>Next Billing</span>
          <span>Jan 15, 2025</span>
        </div>
        <div className="flex justify-between">
          <span>Amount</span>
          <span>$29.00</span>
        </div>
      </CardContent>
    </Card>
  );
}

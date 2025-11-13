import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check, X } from "lucide-react";
import { SubscriptionPlan } from "@/types/subscription-plans";

interface BillingPlanCardProps {
  plan: SubscriptionPlan;
  isSelected?: boolean;
  onSelect?: () => void;
}

export default function BillingPlanCard({
  plan,
  isSelected = false,
  onSelect,
}: BillingPlanCardProps) {
  const formattedPrice = `$${plan.price}`;
  const title = plan.name.split("—")[0].trim();

  return (
    <Card
      id={plan.id}
      className={`transition-all ${
        isSelected ? "border-[#1C1917] shadow-md" : ""
      }`}
    >
      <CardHeader className="pb-2 text-center">
        <CardTitle className="text-xl font-semibold">{title}</CardTitle>
        <div className="flex justify-center items-end mt-1 mb-2">
          <span className="font-title font-bold text-4xl leading-10">
            {formattedPrice}
          </span>
          <span className="font-body font-normal text-lg leading-7 ml-1 text-gray-600">
            /{plan.billing_interval}
          </span>
        </div>
      </CardHeader>

      <CardContent className="space-y-2">
        <p className="text-sm text-muted-foreground">{plan.description}</p>

        <ul className="space-y-1 text-sm">
          {plan.features.map((feature, index) => (
            <li
              key={index}
              className={`flex items-center gap-2 ${
                feature.available ? "text-black" : "text-gray-400"
              }`}
            >
              {feature.available ? (
                <Check size={14} className="text-green-600" />
              ) : (
                <X size={14} />
              )}
              {feature.label}
            </li>
          ))}
        </ul>

        <Button
          className={`cursor-pointer w-full mt-3 transition-all ${
            !isSelected
              ? "bg-[#44403C] hover:bg-[#292524] shadow-md text-[#FAFAF9]"
              : "bg-[#F5F5F4] hover:bg-[#E7E5E4] text-[#44403C]"
          }`}
          onClick={onSelect}
        >
          Subscribe Now
        </Button>
      </CardContent>
    </Card>
  );
}

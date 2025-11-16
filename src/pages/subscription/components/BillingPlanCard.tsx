import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check, X } from "lucide-react";
import { Feature, ISubscriptionPlan } from "@/types/subscription-plan-type";
import { FEATURES_LABELS_MAP } from "@/pages/admin-panel/components/subscription-plan/columns";
import { Skeleton } from "@/components/ui/skeleton";

interface BillingPlanCardProps {
  plan: ISubscriptionPlan;
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
      id={plan.plan_id}
      className={`flex flex-col justify-between transition-all ${
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
          {Object.keys(plan.features).map((key, index) => (
            <li
              key={index}
              className={`flex items-center gap-2 ${
                plan.features[key] ? "text-black" : "text-gray-400"
              }`}
            >
              {plan.features[key] ? (
                <Check size={14} className="text-green-600" />
              ) : (
                <X size={14} />
              )}
              {FEATURES_LABELS_MAP[key as Feature]}
            </li>
          ))}
        </ul>
      </CardContent>
      <CardFooter>
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
      </CardFooter>
    </Card>
  );
}

export function BillingPlanCardLoader() {
  return (
    <Card className="transition-all">
      <CardHeader className="pb-2 text-center">
        <CardTitle className="text-xl font-semibold">
          <Skeleton className="w-full h-12" />
        </CardTitle>
        <div className="flex justify-center items-end mt-1 mb-2">
          <Skeleton className="w-full h-8" />
        </div>
      </CardHeader>

      <CardContent className="space-y-2">
        <p className="text-sm text-muted-foreground">
          <Skeleton className="w-full h-30" />
        </p>

        <ul className="space-y-1 text-sm">
          {[1, 2, 3, 4, 5].map((index) => (
            <li key={index} className="flex items-center gap-2">
              <Skeleton className="h-8 w-8" />
              <Skeleton className="h-8 w-full" />
            </li>
          ))}
        </ul>
        <Skeleton className="h-10 w-full" />
      </CardContent>
    </Card>
  );
}

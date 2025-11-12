"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check, X } from "lucide-react";
import { billingPlans } from "@/seeds/subscribeTrades.ts";

export default function BillingPlansGrid() {
  const [selectedPlan, setSelectedPlan] = useState<string>("professional");

  return (
    <div>
      <h2 className="text-xl font-semibold mb-3">Available Plans</h2>
      <div className="grid md:grid-cols-3 gap-4">
        {billingPlans.map((plan) => (
          <Card
            key={plan.id}
            id={plan.id}
            className={`cursor-pointer transition-all ${
              selectedPlan === plan.id ? "border-[#1C1917] shadow-md" : ""
            }`}
            onClick={() => setSelectedPlan(plan.id)}
          >
            <CardHeader className="pb-2 text-center">
              <CardTitle className="text-xl font-semibold">
                {plan.id.charAt(0).toUpperCase() + plan.id.slice(1)}
              </CardTitle>
              <div className="flex justify-center items-end mt-1 mb-2">
                <span className="font-title font-bold text-4xl leading-10">
                  {plan.price.split("/")[0]}
                </span>
                <span className="font-body font-normal text-lg leading-7 ml-1 text-gray-600">
                  /month
                </span>
              </div>
            </CardHeader>
            <CardContent className="space-y-2">
              <p className="text-sm text-muted-foreground">
                {plan.description}
              </p>
              <ul className="space-y-1 text-sm">
                {plan.features.map((feature, i) => (
                  <li
                    key={i}
                    className={`flex items-center gap-2 ${
                      feature.available ? "text-black" : "text-gray-400"
                    }`}
                  >
                    {feature.available && (
                      <Check size={14} className="text-green-600" />
                    )}
                    {!feature.available && <X size={14} />} {feature.label}
                  </li>
                ))}
              </ul>
              <Button
                className={`cursor-pointer w-full mt-3 transition-all ${
                  selectedPlan === plan.id
                    ? "bg-[#44403C] hover:bg-[#292524] shadow-md text-[#FAFAF9]"
                    : "bg-[#F5F5F4] hover:bg-[#E7E5E4] text-[#44403C]"
                }`}
              >
                {plan.buttonText}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

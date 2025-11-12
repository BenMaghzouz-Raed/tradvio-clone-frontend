"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import DataTable from "@/components/data-table";
import { ColumnDef } from "@tanstack/react-table";
import { Progress } from "@/components/ui/progress";
import { Check, X, CreditCard } from "lucide-react";

import {
  billingData,
  billingPlans,
  BillingHistory,
} from "@/seeds/subscribeTrades.ts";

const billingColumns: ColumnDef<BillingHistory>[] = [
  {
    accessorKey: "date",
    header: () => <span className="text-[#78716C]">DATE</span>,
  },
  {
    accessorKey: "description",
    header: () => <span className="text-[#78716C]">DESCRIPTION</span>,
  },
  {
    accessorKey: "amount",
    header: () => <span className="text-[#78716C]">AMOUNT</span>,
  },
  {
    accessorKey: "status",
    header: () => <span className="text-[#78716C]">STATUS</span>,
  },
  {
    accessorKey: "action",
    header: "Action",
    cell: ({ row }) => {
      return row.original.action ? (
        <div className="flex justify-center">{row.original.action}</div>
      ) : null;
    },
  },
];

export default function Subscription() {
  const [selectedPlan, setSelectedPlan] = useState<string>("professional");

  return (
    <div className="space-y-4">
      <Card className="text-sm bg-[#FAFAF9] p-4 space-y-6">
        <h1 className="text-2xl font-semibold mb-2">Current Plan</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 ">
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

          {/* Usage */}
          <Card className="text-[#44403C] bg-[#FAFAF9]">
            <CardHeader className="pb-1">
              <CardTitle className="text-base">Usage</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <div className="flex justify-between text-sm">
                  <span>Projects</span>
                  <span>8 / unlimited</span>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-4">
                  <span>Storage</span>
                  <span>45GB / 100GB</span>
                </div>
                <Progress value={45} className="[&>div]:bg-[#1C1917]" />
              </div>
            </CardContent>
          </Card>

          {/* Settings */}
          <Card className="text-[#44403C] bg-[#FAFAF9]">
            <CardHeader className="pb-1">
              <CardTitle className="text-base">Settings & Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button
                variant="outline"
                className="w-full bg-[#F5F5F4] cursor-pointer hover:bg-[#E7E5E4]"
              >
                <CreditCard /> Update Payment Method
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Billing Plans */}
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

        <div>
          <Card>
            <CardHeader className="text-xl">
              <CardTitle>Billing History</CardTitle>
            </CardHeader>

            <CardContent>
              <DataTable
                columns={billingColumns}
                data={billingData}
                loading={false}
              />
            </CardContent>
          </Card>
        </div>
      </Card>
    </div>
  );
}

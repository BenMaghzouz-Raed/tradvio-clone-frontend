import { useEffect, useState } from "react";
import SubscribeDetails from "./components/SubscriptionDetails";
import BillingPlanCard from "./components/BillingPlanCard";
import Settings from "./components/Settings";
import Usage from "./components/Usage";
import { billingPlans } from "@/seeds/subscribtion-plans";
import { PaymentModal } from "./components/PaymentModal";
import { SubscriptionPlan } from "@/types/subscription-plans";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import { getOrThrow } from "@/config";
import { useSearchParams } from "react-router-dom";
import { toastNotification } from "@/lib/toast";

export default function Subscription() {
  const [selectedPlan, setSelectedPlan] = useState<SubscriptionPlan>();
  const [paymentModalOpen, setPaymentModalOpen] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    if (
      searchParams.get("payment_success") &&
      searchParams.get("payment_success") == "true"
    ) {
      toastNotification({
        type: "success",
        message: "your payment was successful",
      });
      setSearchParams({});
    }

    if (
      searchParams.get("payment_success") &&
      searchParams.get("payment_success") == "false"
    ) {
      toastNotification({
        type: "error",
        message: "something went wrong, please try again later",
      });
      setSearchParams({});
    }
  }, []);

  return (
    <PayPalScriptProvider
      options={{
        clientId: getOrThrow("PAYPAL_CLIENT_ID"),
      }}
    >
      <div className="space-y-4">
        <PaymentModal
          open={paymentModalOpen}
          setOpen={setPaymentModalOpen}
          subscription={selectedPlan!}
        />
        <div className="text-sm bg-[#FAFAF9] p-4 space-y-6">
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
                  onSelect={() => {
                    setSelectedPlan(plan);
                    setPaymentModalOpen(true);
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </PayPalScriptProvider>
  );
}

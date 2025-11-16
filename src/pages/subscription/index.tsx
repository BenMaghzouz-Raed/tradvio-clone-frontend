/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import SubscribeDetails from "./components/SubscriptionDetails";
import BillingPlanCard, {
  BillingPlanCardLoader,
} from "./components/BillingPlanCard";
import Settings from "./components/Settings";
import Usage from "./components/Usage";
import { PaymentModal } from "./components/PaymentModal";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import { getOrThrow } from "@/config";
import { useSearchParams } from "react-router-dom";
import { toastNotification } from "@/lib/toast";
import { getSubscriptionPlans } from "@/services/domain/SubscriptionPlanService";
import { ISubscriptionPlan } from "@/types/subscription-plan-type";

export default function Subscription() {
  const [selectedPlan, setSelectedPlan] = useState<ISubscriptionPlan>();
  const [paymentModalOpen, setPaymentModalOpen] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const [plans, setPlans] = useState<ISubscriptionPlan[]>([]);
  const [loading, setLoading] = useState(true);

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

  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await getSubscriptionPlans();
      setPlans(res.data);
    } catch (err: any) {
      toastNotification({
        type: "error",
        message: err.message,
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
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
              {!loading
                ? plans.map((plan) => (
                    <BillingPlanCard
                      key={plan.plan_id}
                      plan={plan}
                      {...plan}
                      onSelect={() => {
                        setSelectedPlan(plan);
                        setPaymentModalOpen(true);
                      }}
                    />
                  ))
                : [1, 2, 3].map((index) => (
                    <BillingPlanCardLoader key={index} />
                  ))}
            </div>
          </div>
        </div>
      </div>
    </PayPalScriptProvider>
  );
}

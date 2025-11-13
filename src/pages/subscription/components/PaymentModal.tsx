/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { toastNotification } from "@/lib/toast";
import { formatAmount } from "@/lib/utils";
import {
  capturePaypalOrder,
  createPaypalOrder,
  createStripePaymentSession,
} from "@/services/domain/SubscriptionService";
import { SubscriptionPlan } from "@/types/subscription-plans";
import { useState } from "react";
import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";

type PaymentMethod = "PAYPAL" | "STRIPE";

export function PaymentModal({
  subscription,
  open,
  setOpen,
}: {
  subscription: SubscriptionPlan;
  open: boolean;
  setOpen: (state: boolean) => void;
}) {
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>();
  const [{ isPending, isResolved, isRejected }] = usePayPalScriptReducer();

  const reset = () => {
    setPaymentMethod(undefined);
    setStep(1);
  };

  const handleStripePayment = async () => {
    if (!subscription) {
      toastNotification({
        type: "error",
        message: "You need to select a plan first",
      });
      return;
    }

    try {
      const res: any = await createStripePaymentSession({
        subscription_id: subscription.id,
      });
      window.open(res.url);
      reset();
      setOpen(false);
    } catch (err: any) {
      toastNotification({
        type: "error",
        message: err.message,
      });
    }
  };

  const handlePaypalPayment = async () => {
    if (!subscription) {
      toastNotification({
        type: "error",
        message: "You need to select a plan first",
      });
      return;
    }
    try {
      const res = await createPaypalOrder({ subscription_id: subscription.id });
      console.log(res);
    } catch (err: any) {
      toastNotification({
        type: "error",
        message: err.message,
      });
    }
  };

  const handleNext = async () => {
    setLoading(true);
    if (paymentMethod === "STRIPE") {
      await handleStripePayment();
      setPaymentMethod(undefined);
      setOpen(false);
    } else if (paymentMethod === "PAYPAL") {
      await handlePaypalPayment();
      setStep((prev) => prev + 1);
    }
    setLoading(false);
  };

  if (!subscription) return null;

  return (
    <Dialog
      open={open}
      onOpenChange={() => {
        setOpen(!open);
        setPaymentMethod(undefined);
      }}
    >
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Subscribe</DialogTitle>
          <DialogDescription>
            Select the {subscription.name} plan for a full{" "}
            {subscription.billing_interval} for only{" "}
            {formatAmount(subscription.price)}
          </DialogDescription>
        </DialogHeader>
        {step == 1 && (
          <div>
            <RadioGroup
              onValueChange={(value) =>
                setPaymentMethod(value as PaymentMethod)
              }
              value={paymentMethod}
            >
              <Card
                className="flex flex-row items-center gap-10 py-6 px-16 cursor-pointer"
                onClick={() => setPaymentMethod("PAYPAL")}
              >
                <RadioGroupItem
                  value="PAYPAL"
                  id="r1"
                  className="cursor-pointer"
                />
                <div className="flex gap-4">
                  <img src="/images/paypal-logo.png" className="h-8" />
                  <Label className="cursor-pointer" htmlFor="r1">
                    Paypal
                  </Label>
                </div>
              </Card>
              <Card
                className="flex flex-row items-center gap-10 py-6 px-16 cursor-pointer"
                onClick={() => setPaymentMethod("STRIPE")}
              >
                <RadioGroupItem
                  className="cursor-pointer"
                  value="STRIPE"
                  id="r2"
                />
                <div className="flex gap-4">
                  <img src="/images/stripe-logo.png" className="h-8" />
                  <Label className="cursor-pointer" htmlFor="r2">
                    Stripe
                  </Label>
                </div>
              </Card>
            </RadioGroup>
          </div>
        )}
        <DialogFooter className="w-full flex sm:justify-center">
          {paymentMethod === "PAYPAL" ? (
            isPending ? (
              <p> Loading paypal</p>
            ) : isRejected ? (
              <p>Failed to load paypal</p>
            ) : (
              isResolved && (
                <PayPalButtons
                  style={{ layout: "vertical" }}
                  createOrder={async () => {
                    const res: any = await createPaypalOrder({
                      subscription_id: subscription.id,
                    });
                    return res.id;
                  }}
                  onApprove={async (data) => {
                    await capturePaypalOrder({ orderId: data.orderID });
                    toastNotification({
                      type: "error",
                      message: "Payment successful! 🎉",
                    });
                  }}
                  onError={(err) => {
                    console.log("**** err: ", err);
                    toastNotification({
                      type: "error",
                      message: "Something went wrong. Please try again. ☹️",
                    });
                  }}
                />
              )
            )
          ) : (
            <Button
              disabled={!paymentMethod || loading}
              loading={loading}
              className="w-full cursor-pointer"
              onClick={() => handleNext()}
            >
              Pay Now
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

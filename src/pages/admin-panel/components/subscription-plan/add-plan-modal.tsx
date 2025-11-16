/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Form } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { toastNotification } from "@/lib/toast";
import { addSubscriptionPlan } from "@/services/domain/SubscriptionPlanService";
import {
  BillingIntervalType,
  Feature,
  FEATURE_LIST,
} from "@/types/subscription-plan-type";
import {
  AddSubscriptionPlanFormValues,
  addSubscriptionPlanSchema,
} from "@/validation/subscription-plan-validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { ReactNode, useState } from "react";
import { useForm } from "react-hook-form";
import { FEATURES_LABELS_MAP } from "./columns";

export default function AddPlanModal({
  open,
  setOpen,
  children,
}: {
  open: boolean;
  setOpen: (state: boolean) => void;
  children: ReactNode;
}) {
  const form = useForm<AddSubscriptionPlanFormValues>({
    resolver: zodResolver(addSubscriptionPlanSchema),
    defaultValues: {
      name: "",
      description: "",
      billing_interval: undefined,
      currency: undefined,
      price: undefined,
      features: {
        analyse_charts: false,
        get_analysis_history: false,
        get_trade_recommedations: false,
      },
      is_active: true,
    },
  });

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (values: AddSubscriptionPlanFormValues) => {
    console.log(values);

    try {
      setLoading(true);
      const plan = await addSubscriptionPlan(values);
      toastNotification({
        message: `the ${plan.data.name} was added succesfull`,
        type: "success",
      });
      form.reset();
      setOpen(false);
    } catch (err: any) {
      toastNotification({
        type: "error",
        message: err.message,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>

      <DialogContent className="sm:max-w-[450px] md:max-w-[600px] max-h-[90vh] overflow-auto">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)}>
            <DialogHeader>
              <DialogTitle>Add a new subscription plan</DialogTitle>
              <DialogDescription>
                Add more options for your users to subscribe.
              </DialogDescription>
            </DialogHeader>

            <div className="flex flex-col gap-4 mt-6">
              <div>
                <Label className="mb-2 block">Name</Label>
                <Input
                  required
                  type="text"
                  placeholder="e.g. basic"
                  {...form.register("name")}
                />
                {form.formState.errors.name && (
                  <p className="text-sm text-red-400 mt-1">
                    {form.formState.errors.name.message}
                  </p>
                )}
              </div>
              <div>
                <Label className="mb-2 block">Description</Label>
                <Textarea
                  rows={4}
                  required
                  {...form.register("description")}
                  placeholder="Access essential trading insights and basic analysis tools to support your day-to-day investment decisions."
                  onChange={(e) => form.setValue("description", e.target.value)}
                />
                {form.formState.errors.description && (
                  <p className="text-sm text-red-400 mt-1">
                    {form.formState.errors.description.message}
                  </p>
                )}
              </div>
              <div>
                <Label className="mb-2 block">Price</Label>
                <Input
                  type="number"
                  placeholder="10"
                  {...form.register("price", { valueAsNumber: true })}
                />
              </div>
              <div>
                <Label className="mb-2 block">Period</Label>
                <Select
                  required
                  onValueChange={(value) =>
                    form.setValue(
                      "billing_interval",
                      value as BillingIntervalType
                    )
                  }
                >
                  <SelectTrigger className="w-full cursor-pointer">
                    <SelectValue
                      placeholder={
                        form.formState.defaultValues?.billing_interval
                      }
                      className="w-fit"
                    />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem className="cursor-pointer" value="month">
                        Month
                      </SelectItem>
                      <SelectItem className="cursor-pointer" value="year">
                        Year
                      </SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
                {form.formState.errors.billing_interval && (
                  <p className="text-sm text-red-400 mt-1">
                    {form.formState.errors.billing_interval.message}
                  </p>
                )}
              </div>
              <div>
                <Label className="mb-2 block">Currency</Label>
                <Select
                  required
                  onValueChange={(value) =>
                    form.setValue("currency", value as BillingIntervalType)
                  }
                >
                  <SelectTrigger className="w-full cursor-pointer">
                    <SelectValue
                      placeholder={
                        form.formState.defaultValues?.billing_interval
                      }
                      className="w-fit"
                    />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem className="cursor-pointer" value="USD">
                        USD
                      </SelectItem>
                      <SelectItem className="cursor-pointer" value="EUR">
                        EUR
                      </SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
                {form.formState.errors.currency && (
                  <p className="text-sm text-red-400 mt-1">
                    {form.formState.errors.currency.message}
                  </p>
                )}
              </div>
              <Card className="p-4">
                <Label>Select Available features</Label>
                {FEATURE_LIST.map((item) => (
                  <div className="flex gap-4">
                    <Checkbox
                      onCheckedChange={(state) =>
                        form.setValue(`features.${item}`, state as boolean)
                      }
                      defaultChecked={form.getValues().features[item]}
                      className="cursor-pointer"
                      id={item}
                    />
                    <Label className="cursor-pointer" htmlFor={item}>
                      {FEATURES_LABELS_MAP[item as Feature]}
                    </Label>
                  </div>
                ))}
              </Card>
              <div className="flex gap-4">
                <Checkbox
                  defaultChecked={form.formState.defaultValues?.is_active}
                  onCheckedChange={(state) =>
                    form.setValue("is_active", state as boolean)
                  }
                  id="is_active"
                  className="cursor-pointer"
                />
                <Label htmlFor="is_active" className="cursor-pointer">
                  Do you want this Plan to be active by default ?
                </Label>
              </div>
            </div>

            <DialogFooter className="mt-6">
              <DialogClose asChild>
                <Button
                  loading={loading}
                  className="cursor-pointer"
                  variant="outline"
                  onClick={() => setOpen(false)}
                  type="reset"
                >
                  Cancel
                </Button>
              </DialogClose>
              <Button
                variant="default"
                loading={loading}
                type="submit"
                className="cursor-pointer"
              >
                Add Plan
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Textarea } from "@/components/ui/textarea";
import { createTrade } from "@/services/domain/TradeService";
import { ITrade } from "@/types/trade";
import {
  AddTradeFormValues,
  addTradeSchema,
} from "@/validation/trade-validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { DialogTrigger } from "@radix-ui/react-dialog";
import { ChevronDownIcon, Check } from "lucide-react";
import React, { ReactNode, useMemo, useState, useEffect, useRef } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { cn } from "@/lib/utils";
import { toastNotification } from "@/lib/toast";

export default function TradeModal({
  trade,
  open,
  setOpen,
  children,
  onSuccess,
  onError,
  initialValues,
}: {
  trade?: ITrade;
  open: boolean;
  setOpen: (state: boolean) => void;
  children: ReactNode;
  onSuccess: () => void;
  onError: (err: any) => void;
  initialValues?: Partial<AddTradeFormValues>;
}) {
  const [loading, setLoading] = useState(false);
  const form = useForm<AddTradeFormValues>({
    resolver: zodResolver(addTradeSchema),
    defaultValues: {
      source: "MANUAL",
      quantity: 1,
      outcome: "NOT_TAKEN",
      entry_time: new Date(),
      exit_time: new Date(),
      trade_date: new Date(),
      trade_type: "LONG",
    },
  });

  const onAddTrade: SubmitHandler<AddTradeFormValues> = async (values) => {
    try {
      setLoading(true);
      console.log("[TradeModal] onAddTrade submit handler invoked", values);
      const symbol = (values.symbol || "").trim();
      if (!symbol) {
        toastNotification({ type: "error", message: "Symbol is required" });
        setLoading(false);
        return;
      }
      if (!values.quantity || values.quantity <= 0) {
        toastNotification({ type: "error", message: "Quantity must be greater than 0" });
        setLoading(false);
        return;
      }
      // Backend expects SWING/SCALP for trade_type; omit UI Long/Short to stay compatible
      const { trade_type: _position, ...rest } = values as any;
      const toIso = (d: any) => (d instanceof Date ? d.toISOString() : d);
      const payload: any = {
        ...rest,
        symbol,
        entry_time: toIso(rest.entry_time),
        exit_time: toIso(rest.exit_time),
        trade_date: toIso(rest.trade_date ?? new Date()),
      };
      await createTrade(payload);
      onSuccess?.();
      setOpen(false);
    } catch (err: any) {
      toastNotification({ type: "error", message: err?.message || "Failed to add trade" });
      onError?.(err);
    } finally {
      setLoading(false);
    }
  };


  const entryTime = useMemo(
    () => form.getValues().entry_time,
    [form.watch("entry_time")]
  );
  const exitTime = useMemo(
    () => form.getValues().exit_time,
    [form.watch("exit_time")]
  );
  const tradeDate = useMemo(
    () => form.getValues().trade_date,
    [form.watch("trade_date")]
  );

  const outcome = form.watch("outcome");
  const tradeType = form.watch("trade_type");
  const entryPrice = form.watch("entry_price");
  const exitPrice = form.watch("exit_price");
  const profitLoss = form.watch("profit_loss");
  const profitEditedRef = useRef(false);

  const onInvalid = (errors: any) => {
    const firstKey = Object.keys(errors || {})[0] as string | undefined;
    const first = firstKey ? (errors as any)[firstKey] : undefined;
    const msg =
      (first && (first.message as string)) || "Please fill required fields";
    toastNotification({ type: "error", message: msg });
    console.error("Trade form validation failed:", errors);
  };

  // unify submit handler to avoid generics mismatch in TS
  const submit = form.handleSubmit(onAddTrade as any, onInvalid as any);

  // apply initial values when opening
  useEffect(() => {
    if (open && initialValues) {
      Object.entries(initialValues).forEach(([k, v]) => {
        // @ts-ignore
        form.setValue(k as any, v as any, { shouldDirty: true });
      });
    }
  }, [open]);

  // auto-calc profit/loss as entry - exit unless user edited it
  useEffect(() => {
    const a = typeof entryPrice === "number" && !Number.isNaN(entryPrice);
    const b = typeof exitPrice === "number" && !Number.isNaN(exitPrice);
    if (!profitEditedRef.current && a && b) {
      const diff = Number((exitPrice - entryPrice).toFixed(6));
      form.setValue("profit_loss", diff as any, { shouldDirty: true, shouldValidate: false });
    }
    // reset manual flag if both cleared
    if (!a && !b) {
      profitEditedRef.current = false;
    }
  }, [entryPrice, exitPrice]);

  // segmented button item
  const SegItem = ({
    value,
    label,
    current,
    onClick,
    color = "",
  }: {
    value: string;
    label: string;
    current: string;
    onClick: () => void;
    color?: string;
  }) => {
    const active = current === value;
    return (
      <Button
        type="button"
        variant={active ? "default" : "outline"}
        className={cn("cursor-pointer rounded-full px-4", active && color)}
        aria-pressed={active}
        onClick={onClick}
      >
        {active && <Check className="mr-1 h-4 w-4" />} {label}
      </Button>

    );
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>

      <DialogContent className="sm:max-w-[720px] md:max-w-[960px] max-h-[90vh] overflow-auto">
        <form noValidate onSubmit={submit}>
          <DialogHeader>
            <DialogTitle>{trade ? "Edit Trade" : "Record New Trade"}</DialogTitle>
            {!trade && (
              <DialogDescription>
                Log your trade details to track performance and improve your edge.
              </DialogDescription>
            )}
          </DialogHeader>

          {/* Responsive two-column layout */}
          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Left column */}
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Label className="mb-2 block">Entry Price</Label>
                  <Input
                    type="number"
                    step="any"
                    placeholder="e.g. 123.45"
                    {...form.register("entry_price", { valueAsNumber: true })}
                  />
                  {form.formState.errors.entry_price && (
                    <p className="text-sm text-red-400 mt-1">
                      {form.formState.errors.entry_price.message}
                    </p>
                  )}
                </div>
                <div>
                  <Label className="mb-2 block">Entry Time</Label>
                  <Popover modal={true}>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        id="date"
                        className="justify-between font-normal w-full"
                      >
                        {entryTime ? entryTime.toLocaleDateString() : "Select entry time"}
                        <ChevronDownIcon />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="overflow-hidden p-0 w-auto" align="start">
                      <Calendar
                        mode="single"
                        selected={entryTime!}
                        captionLayout="dropdown"
                        onSelect={(date) => {
                          form.setValue("entry_time", date!);
                        }}
                      />
                    </PopoverContent>
                  </Popover>
                  {form.formState.errors.entry_time && (
                    <p className="text-sm text-red-400 mt-1">
                      {form.formState.errors.entry_time.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Label className="mb-2 block">Exit Price</Label>
                  <Input
                    type="number"
                    step="any"
                    placeholder="e.g. 125.67"
                    {...form.register("exit_price", { valueAsNumber: true })}
                  />
                  {form.formState.errors.exit_price && (
                    <p className="text-sm text-red-400 mt-1">
                      {form.formState.errors.exit_price.message}
                    </p>
                  )}
                </div>
                <div>
                  <Label className="mb-2 block">Exit Time</Label>
                  <Popover modal={true}>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        id="date"
                        className="justify-between font-normal w-full"
                      >
                        {exitTime ? exitTime.toLocaleDateString() : "Select exit time"}
                        <ChevronDownIcon />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto overflow-hidden p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={exitTime}
                        captionLayout="dropdown"
                        onSelect={(date) => {
                          form.setValue("exit_time", date!);
                        }}
                      />
                    </PopoverContent>
                  </Popover>
                  {form.formState.errors.exit_time && (
                    <p className="text-sm text-red-400 mt-1">
                      {form.formState.errors.exit_time.message}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <Label className="mb-2 block">Profit / Loss</Label>
                <Input
                  type="number"
                  step="any"
                  placeholder="Optional"
                  value={typeof profitLoss === "number" ? profitLoss : (profitLoss ?? "")}
                  onChange={(e) => {
                    profitEditedRef.current = true;
                    const v = e.target.value;
                    if (v === "") {
                      form.setValue("profit_loss", undefined as any, { shouldDirty: true });
                    } else {
                      const num = Number(v);
                      if (!Number.isNaN(num)) {
                        form.setValue("profit_loss", num as any, { shouldDirty: true });
                      }
                    }
                  }}
                />
                {form.formState.errors.profit_loss && (
                  <p className="text-sm text-red-400 mt-1">
                    {form.formState.errors.profit_loss.message}
                  </p>
                )}
              </div>

              <div>
                <Label className="mb-2 block">Trading Notes</Label>
                <Textarea
                  placeholder="What was your thought process? What emotions did you experience?"
                  rows={4}
                  {...form.register("trading_notes")}
                />
                {form.formState.errors.trading_notes && (
                  <p className="text-sm text-red-400 mt-1">
                    {form.formState.errors.trading_notes.message}
                  </p>
                )}
              </div>
            </div>

            {/* Right column */}
            <div className="space-y-5">
              <div>
                <Label className="mb-2 block">Outcome</Label>
                <div className="flex flex-wrap gap-2">
                  <SegItem
                    value="WIN"
                    label="Win"
                    current={outcome}
                    onClick={() => form.setValue("outcome", "WIN", { shouldDirty: true })}
                    color="bg-emerald-600 hover:bg-emerald-600 text-white"
                  />
                  <SegItem
                    value="LOSS"
                    label="Loss"
                    current={outcome}
                    onClick={() => form.setValue("outcome", "LOSS", { shouldDirty: true })}
                    color="bg-rose-600 hover:bg-rose-600 text-white"
                  />
                  <SegItem
                    value="NOT_TAKEN"
                    label="Not taken"
                    current={outcome}
                    onClick={() => form.setValue("outcome", "NOT_TAKEN", { shouldDirty: true })}
                    color="bg-slate-700 hover:bg-slate-700 text-white"
                  />
                </div>
                <input type="hidden" {...form.register("outcome")} />
                {form.formState.errors.outcome && (
                  <p className="text-sm text-red-400 mt-1">
                    {form.formState.errors.outcome.message}
                  </p>
                )}
              </div>

              <div>
                <Label className="mb-2 block">Trade Type</Label>
                <div className="flex flex-wrap gap-2">
                  <SegItem
                    value="LONG"
                    label="Long Position"
                    current={tradeType || "LONG"}
                    onClick={() => form.setValue("trade_type", "LONG", { shouldDirty: true })}
                    color="bg-indigo-600 hover:bg-indigo-600 text-white"
                  />
                  <SegItem
                    value="SHORT"
                    label="Short Position"
                    current={tradeType || "LONG"}
                    onClick={() => form.setValue("trade_type", "SHORT", { shouldDirty: true })}
                    color="bg-amber-600 hover:bg-amber-600 text-white"
                  />
                </div>
                {form.formState.errors.trade_type && (
                  <p className="text-sm text-red-400 mt-1">
                    {form.formState.errors.trade_type.message}
                  </p>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Label className="mb-2 block">Quantity</Label>
                  <Input
                    type="number"
                    min={1}
                    {...form.register("quantity", { valueAsNumber: true })}
                    required
                  />
                  {form.formState.errors.quantity && (
                    <p className="text-sm text-red-400 mt-1">
                      {form.formState.errors.quantity.message}
                    </p>
                  )}
                </div>
                <div>
                  <Label className="mb-2 block">Symbol</Label>
                  <Input {...form.register("symbol")} required />
                  {form.formState.errors.symbol && (
                    <p className="text-sm text-red-400 mt-1">
                      {form.formState.errors.symbol.message}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <Label className="mb-2 block">Trade Date</Label>
                <Popover modal={true}>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      id="date"
                      className="w-full justify-between font-normal"
                    >
                      {tradeDate ? tradeDate.toLocaleDateString() : "Select trade date"}
                      <ChevronDownIcon />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto overflow-hidden p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={tradeDate}
                      captionLayout="dropdown"
                      onSelect={(date) => {
                        form.setValue("trade_date", date!);
                      }}
                    />
                  </PopoverContent>
                </Popover>
                {form.formState.errors.trade_date && (
                  <p className="text-sm text-red-400 mt-1">
                    {form.formState.errors.trade_date.message}
                  </p>
                )}
              </div>
            </div>
          </div>

          <DialogFooter className="mt-6">
            <DialogClose asChild>
              <Button
                loading={loading}
                className="cursor-pointer"
                variant="outline"
                onClick={() => setOpen(false)}
                type="button"
              >
                Cancel
              </Button>
            </DialogClose>
            <Button
              variant="default"
              loading={loading}
              type="button"
              className="cursor-pointer"
              data-testid="add-trade-btn"
              onClick={() => {
                submit();
              }}
            >
              {trade ? "Save Changes" : "Add Trade"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

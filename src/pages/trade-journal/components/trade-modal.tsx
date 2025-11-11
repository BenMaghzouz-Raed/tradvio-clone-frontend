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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { createTrade } from "@/services/domain/TradeService";
import { ITrade } from "@/types/trade";
import {
  AddTradeFormValues,
  addTradeSchema,
} from "@/validation/trade-validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { DialogTrigger } from "@radix-ui/react-dialog";
import { ChevronDownIcon } from "lucide-react";
import { ReactNode, useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";

export default function TradeModal({
  trade,
  open,
  setOpen,
  children,
  onSuccess,
  onError,
}: {
  trade?: ITrade;
  open: boolean;
  setOpen: (state: boolean) => void;
  children: ReactNode;
  onSuccess: () => void;
  onError: (err: any) => void;
}) {
  const [loading, setLoading] = useState(false);
  const form = useForm<AddTradeFormValues>({
    resolver: zodResolver(addTradeSchema),
    defaultValues: {
      entry_price: undefined,
      entry_time: undefined,
      exit_price: undefined,
      exit_time: undefined,
      outcome: undefined,
      profit_loss: undefined,
      profit_percent: undefined,
      quantity: undefined,
      source: "MANUAL",
      symbol: undefined,
      trade_date: undefined,
      trade_type: undefined,
      trading_notes: undefined,
    },
  });

  const onAddTrade = async (values: AddTradeFormValues) => {
    try {
      setLoading(false);
      await createTrade(values);
      onSuccess();
    } catch (err: any) {
      onError(err);
    } finally {
      form.reset();
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

  useEffect(() => {
    console.log(form.formState.errors);
  }, [form.formState.errors]);
  return (
    <Dialog open={open} onOpenChange={() => setOpen(!open)}>
      <DialogTrigger asChild>{children}</DialogTrigger>

      <DialogContent className="sm:max-w-[425px] md:max-w-[500px] overflow-scroll">
        <form onSubmit={form.handleSubmit(onAddTrade)}>
          <DialogHeader>
            <DialogTitle>
              {trade ? "Edit Trade" : "Recored new Trade"}
            </DialogTitle>
            {!trade && (
              <DialogDescription>
                Document your trade details to track performance and improve
                your trading psychology
              </DialogDescription>
            )}
          </DialogHeader>
          <div className="grid gap-6">
            <div className="flex justify-between gap-4">
              <div className="flex-grow">
                <Label className="mb-2">Entry Price</Label>
                <Input
                  type="number"
                  {...form.register("entry_price", { valueAsNumber: true })}
                />
                {form.formState.errors.entry_price && (
                  <p className="text-sm text-red-400 mt-1">
                    {form.formState.errors.entry_price.message}
                  </p>
                )}
              </div>
              <div className="flex-grow">
                <Label className="mb-2">Entry Time</Label>
                <Popover modal={true}>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      id="date"
                      className="justify-between font-normal w-full"
                    >
                      {entryTime
                        ? entryTime.toLocaleDateString()
                        : "select entry time"}
                      <ChevronDownIcon />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent
                    className="overflow-hidden p-0 w-full"
                    align="start"
                  >
                    <Calendar
                      required
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
            <div className="flex justify-between gap-4">
              <div className="flex-grow">
                <Label className="mb-2">Exit Price</Label>
                <Input
                  type="number"
                  {...form.register("exit_price", { valueAsNumber: true })}
                  required
                />
                {form.formState.errors.exit_price && (
                  <p className="text-sm text-red-400 mt-1">
                    {form.formState.errors.exit_price.message}
                  </p>
                )}
              </div>
              <div className="flex-grow">
                <Label className="mb-2">Exit Time</Label>
                <Popover modal={true}>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      id="date"
                      className="justify-between font-normal w-full"
                    >
                      {exitTime
                        ? exitTime.toLocaleDateString()
                        : "select exit time"}
                      <ChevronDownIcon />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent
                    className="w-full overflow-hidden p-0"
                    align="start"
                  >
                    <Calendar
                      required
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
              <Label className="mb-2">Outcome</Label>
              <div>
                <RadioGroup
                  required
                  value={form.getValues().outcome}
                  className="flex justify-evenly"
                  onValueChange={(value) =>
                    form.setValue("outcome", value as "WIN" | "LOSS")
                  }
                >
                  <div className="flex items-center gap-3">
                    <RadioGroupItem
                      className="cursor-pointer"
                      value="WIN"
                      id="r1"
                    />
                    <Label htmlFor="r1" className="cursor-pointer">
                      Win
                    </Label>
                  </div>
                  <div className="flex items-center gap-3">
                    <RadioGroupItem
                      className="cursor-pointer"
                      value="LOSS"
                      id="r2"
                    />
                    <Label className="cursor-pointer" htmlFor="r2">
                      Loss
                    </Label>
                  </div>
                </RadioGroup>
                {form.formState.errors.outcome && (
                  <p className="text-sm text-red-400 mt-1">
                    {form.formState.errors.outcome.message}
                  </p>
                )}
              </div>
            </div>
            <div className="flex justify-between gap-4">
              <div className="flex-grow">
                <Label className="mb-2">Profit & Loss</Label>
                <Input
                  type="number"
                  {...form.register("profit_loss", { valueAsNumber: true })}
                  required
                />
                {form.formState.errors.profit_loss && (
                  <p className="text-sm text-red-400 mt-1">
                    {form.formState.errors.profit_loss.message}
                  </p>
                )}
              </div>
              <div className="flex-grow">
                <Label className="mb-2">Profit Percent %</Label>
                <Input
                  step="any"
                  required
                  max={1.0}
                  min={0.0}
                  type="number"
                  {...form.register("profit_percent", { valueAsNumber: true })}
                />
                {form.formState.errors.profit_percent && (
                  <p className="text-sm text-red-400 mt-1">
                    {form.formState.errors.profit_percent.message}
                  </p>
                )}
              </div>
            </div>
            <div className="flex justify-between gap-4">
              <div className="flex-grow">
                <Label className="mb-2">Quantity</Label>
                <Input
                  type="number"
                  {...form.register("quantity", { valueAsNumber: true })}
                  required
                />
                {form.formState.errors.quantity && (
                  <p className="text-sm text-red-400 mt-1">
                    {form.formState.errors.quantity.message}
                  </p>
                )}
              </div>
              <div className="flex-grow">
                <Label className="mb-2">Symbol</Label>
                <Input {...form.register("symbol")} required />
                {form.formState.errors.symbol && (
                  <p className="text-sm text-red-400 mt-1">
                    {form.formState.errors.symbol.message}
                  </p>
                )}
              </div>
            </div>
            <div className="flex justify-between gap-4">
              <div className="flex-grow">
                <Label className="mb-2">Trade Date</Label>
                <Popover modal={true}>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      id="date"
                      className="w-full justify-between font-normal"
                    >
                      {tradeDate
                        ? tradeDate.toLocaleDateString()
                        : "select trade date"}
                      <ChevronDownIcon />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent
                    className="w-auto overflow-hidden p-0"
                    align="start"
                  >
                    <Calendar
                      required
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
              <div className="flex-grow">
                <Label className="mb-2">Trade Type</Label>
                <RadioGroup
                  required
                  value={form.getValues().trade_type}
                  className="flex justify-evenly mt-5"
                  onValueChange={(value) =>
                    form.setValue("trade_type", value as "LONG" | "SHORT")
                  }
                >
                  <div className="flex items-center gap-3">
                    <RadioGroupItem
                      className="cursor-pointer"
                      value="SHORT"
                      id="r1"
                    />
                    <Label htmlFor="r1" className="cursor-pointer">
                      Short
                    </Label>
                  </div>
                  <div className="flex items-center gap-3">
                    <RadioGroupItem
                      className="cursor-pointer"
                      value="LONG"
                      id="r2"
                    />
                    <Label className="cursor-pointer" htmlFor="r2">
                      Long
                    </Label>
                  </div>
                </RadioGroup>
                {form.formState.errors.trade_type && (
                  <p className="text-sm text-red-400 mt-1">
                    {form.formState.errors.trade_type.message}
                  </p>
                )}
              </div>
            </div>
            <div>
              <Label className="mb-2">Trading Notes</Label>
              <Textarea
                placeholder="What was your thought process? What emotions did you experience?"
                required
                rows={3}
                name="trading_notes"
                onChange={(e) => form.setValue("trading_notes", e.target.value)}
              />
              {form.formState.errors.trading_notes && (
                <p className="text-sm text-red-400 mt-1">
                  {form.formState.errors.trading_notes.message}
                </p>
              )}
            </div>
          </div>
          <DialogFooter className="mt-4">
            <DialogClose asChild>
              <Button
                loading={loading}
                className="cursor-pointer"
                variant="outline"
                onClick={() => setOpen(false)}
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
              Add Trade
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

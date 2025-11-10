/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Form, FormField } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Upload from "@/components/upload";
import { toastNotification } from "@/lib/toast";
import { cn } from "@/lib/utils";
import { analyseGraph } from "@/services/domain/AnalysisService";
import { ROUTES } from "@/services/http/LinksService";
import { TradeType } from "@/types/trade";
import {
  AnalyseChartFormValues,
  analyseChartSchema,
} from "@/validation/analysis-validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { BrainCog, Grid, RefreshCw } from "lucide-react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

const TRADE_TYPE_TIME_FRAMES_MAP: Record<
  TradeType,
  { label: string; value: string }[]
> = {
  SWING: [
    { label: "1-Hour", value: "1-h" },
    { label: "4-Hour", value: "4-h" },
    { label: "Daily", value: "d" },
    { label: "Weekly", value: "w" },
  ],
  SCALP: [
    { label: "1-Min", value: "1-m" },
    { label: "2-Min", value: "2-m" },
    { label: "5-Min", value: "5-m" },
  ],
};

export default function AnalysisForm({
  className = "",
  setAnalysisResult,
  setLoading,
  loading,
  reAnalyse,
}: {
  className?: string;
  setAnalysisResult: (result: any) => void;
  setLoading: (state: boolean) => void;
  loading: boolean;
  reAnalyse: boolean;
}) {
  const analyseChartForm = useForm({
    resolver: zodResolver(analyseChartSchema),
    defaultValues: {
      image: undefined,
      account_balance: 10000,
      risk_per_trade_percent: 1,
      stop_loss_points: 13.5,
      take_profit_points: 24.28,
      trading_type: "SWING",
      timeframe: "1-h",
    },
  });

  const onSubmit = async (data: AnalyseChartFormValues) => {
    const formData = new FormData();
    Object.entries(data).forEach((entry) =>
      formData.append(entry[0], entry[1] as Blob)
    );
    try {
      setLoading(true);
      const result = await analyseGraph(formData);
      setAnalysisResult(result);
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
    <Card className={cn("w-fit p-4 gap-2", className)}>
      <Form {...analyseChartForm}>
        <form onSubmit={analyseChartForm.handleSubmit(onSubmit)}>
          <FormField
            control={analyseChartForm.control}
            name="image"
            render={({ fieldState }) => (
              <>
                <Upload
                  name="image"
                  label="Upload Chart Image"
                  className="w-full h-50 mb-8"
                  onChange={(e) =>
                    analyseChartForm.setValue("image", e.target.files![0])
                  }
                />
                {fieldState.error && (
                  <p className="text-red-500 text-xs mt-1">
                    {fieldState.error.message}
                  </p>
                )}
              </>
            )}
          />
          <span className="text-gray sm:text-sm text-xs">
            Trading Type (
            {analyseChartForm.getValues().trading_type === "SCALP"
              ? "Scalp"
              : "Swing"}
            )
          </span>
          <FormField
            control={analyseChartForm.control}
            name="trading_type"
            render={({ field, fieldState }) => (
              <>
                <div className="flex justify-between gap-2">
                  <Button
                    className={cn(
                      "flex-grow",
                      field.value === "SCALP" && "cursor-pointer"
                    )}
                    disabled={field.value === "SWING"}
                    variant={field.value === "SWING" ? "ghost" : "outline"}
                    onClick={() =>
                      analyseChartForm.setValue("trading_type", "SWING")
                    }
                  >
                    <Grid /> Swing Trading
                  </Button>
                  <Button
                    className={cn(
                      "flex-grow",
                      field.value === "SWING" && "cursor-pointer"
                    )}
                    disabled={field.value === "SCALP"}
                    variant={field.value === "SWING" ? "outline" : "ghost"}
                    onClick={() =>
                      analyseChartForm.setValue("trading_type", "SCALP")
                    }
                  >
                    <BrainCog /> Scalp Trading
                  </Button>
                </div>
                {fieldState.error && (
                  <p className="text-red-500 text-xs mt-1">
                    {fieldState.error.message}
                  </p>
                )}
              </>
            )}
          />

          <span className="text-gray sm:text-sm text-xs">Risk Parameters</span>
          <div className="flex flex-col">
            <div className="flex justify-between gap-2">
              <div className="flex-grow">
                <span className="text-[#BDBDBD] sm:text-sm text-xs">
                  Account Balance ($)
                </span>
                <FormField
                  control={analyseChartForm.control}
                  name="account_balance"
                  render={({ field, fieldState }) => (
                    <>
                      <Input placeholder="200" type="number" {...field} />
                      {fieldState.error && (
                        <p className="text-red-500 text-xs mt-1">
                          {fieldState.error.message}
                        </p>
                      )}
                    </>
                  )}
                />
              </div>
              <div className="flex-grow">
                <span className="text-[#BDBDBD] sm:text-sm text-xs">
                  Risk Per Trade (%)
                </span>
                <FormField
                  control={analyseChartForm.control}
                  name="risk_per_trade_percent"
                  render={({ field, fieldState }) => (
                    <>
                      <Input
                        {...field}
                        prefix="$"
                        placeholder="1.0"
                        type="number"
                        max={1.0}
                        min={0.0}
                        required
                      />
                      {fieldState.error && (
                        <p className="text-red-500 text-xs mt-1">
                          {fieldState.error.message}
                        </p>
                      )}
                    </>
                  )}
                />
              </div>
            </div>
            <div className="flex justify-between gap-2">
              <div className="flex-grow">
                <span className="text-[#BDBDBD] sm:text-sm text-xs">
                  Stop Loss (Points)
                </span>
                <FormField
                  control={analyseChartForm.control}
                  name="stop_loss_points"
                  render={({ field, fieldState }) => (
                    <>
                      <Input
                        {...field}
                        prefix="$"
                        placeholder="200"
                        type="number"
                      />
                      {fieldState.error && (
                        <p className="text-red-500 text-xs mt-1">
                          {fieldState.error.message}
                        </p>
                      )}
                    </>
                  )}
                />
              </div>
              <div className="flex-grow">
                <span className="text-[#BDBDBD] sm:text-sm text-xs">
                  Take Profit (Points)
                </span>
                <FormField
                  control={analyseChartForm.control}
                  name="take_profit_points"
                  render={({ field, fieldState }) => (
                    <>
                      <Input
                        {...field}
                        prefix="$"
                        placeholder="200"
                        type="number"
                      />
                      {fieldState.error && (
                        <p className="text-red-500 text-xs mt-1">
                          {fieldState.error.message}
                        </p>
                      )}
                    </>
                  )}
                />
              </div>
            </div>
          </div>
          <span className="text-gray sm:text-sm text-xs">Chart Timeframe</span>
          <FormField
            control={analyseChartForm.control}
            name="timeframe"
            render={({ fieldState }) => (
              <>
                <Select
                  onValueChange={(e) =>
                    analyseChartForm.setValue("timeframe", e)
                  }
                >
                  <SelectTrigger className="w-full ">
                    <SelectValue placeholder="Select a Time Frame" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Time Frame</SelectLabel>
                      {TRADE_TYPE_TIME_FRAMES_MAP[
                        analyseChartForm.getValues().trading_type
                      ].map((timeFrame) => (
                        <SelectItem value={timeFrame.value}>
                          {timeFrame.label}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
                {fieldState.error && (
                  <p className="text-red-500 text-xs mt-1">
                    {fieldState.error.message}
                  </p>
                )}
              </>
            )}
          />

          <div className="flex gap-2 mt-4">
            {reAnalyse ? (
              <Button
                variant="outline"
                onClick={() => analyseChartForm.handleSubmit(onSubmit)}
                loading={loading}
                disabled={loading}
              >
                <RefreshCw />
                Re-Analyze
              </Button>
            ) : (
              <Link to={`/${ROUTES.HELP.path}`}>
                <Button className="flex-grow" variant="outline">
                  Seek Help
                </Button>
              </Link>
            )}
            <Button
              type="submit"
              className="flex-grow bg-purple-500"
              loading={loading}
              disabled={loading}
            >
              Analyze Chart
            </Button>
          </div>
        </form>
      </Form>
    </Card>
  );
}

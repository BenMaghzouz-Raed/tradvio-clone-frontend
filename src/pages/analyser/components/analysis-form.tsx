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
import {
  AnalyseChartFormValues,
  analyseChartSchema,
} from "@/validation/analysis-validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { BrainCog, Grid, RefreshCw } from "lucide-react";
import { useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

const TRADE_TYPE_TIME_FRAMES_MAP: Record<
  "SWING" | "SCALP",
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
  showUpload = true,
  imageFile,
  previewUrl,
}: {
  className?: string;
  setAnalysisResult: (result: any) => void;
  setLoading: (state: boolean) => void;
  loading: boolean;
  reAnalyse: boolean;
  showUpload?: boolean;
  imageFile?: File | null;
  previewUrl?: string | null;
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
    Object.entries(data).forEach((entry) => {
      if (entry[0] === "image") return; // handle below
      formData.append(entry[0], entry[1] as Blob);
    });
    const img = imageFile ?? (data.image as unknown as File | undefined);
    if (img) formData.append("image", img);
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

  const tradingType = useMemo(
    () => analyseChartForm.getValues().trading_type,
    [analyseChartForm.watch("trading_type")]
  );
  const timeframe = useMemo(
    () => analyseChartForm.getValues().timeframe,
    [analyseChartForm.watch("timeframe")]
  );

  // reflect external image into RHF for validation
  useEffect(() => {
    if (imageFile) {
      analyseChartForm.setValue("image", imageFile as any, {
        shouldValidate: true,
        shouldDirty: true,
      });
    }
  }, [imageFile]);

  return (
    <Card className={cn("w-fit p-4 gap-2 relative", className)}>
      <Form {...analyseChartForm}>
        <form onSubmit={analyseChartForm.handleSubmit(onSubmit)}>
          {showUpload && (
            <FormField
              control={analyseChartForm.control}
              name="image"
              render={({ fieldState }) => (
                <>
                  <Upload
                    name="image"
                    label="Upload Chart Image"
                    className={cn(
                      "transition-all duration-500 ease-in-out",
                      loading
                        ? "absolute right-4 -top-6 w-48 h-28 sm:w-56 sm:h-32 z-20 shadow-md ring-1 ring-black/5 rounded-md"
                        : "w-full h-50 mb-8"
                    )}
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
          )}

          {/* floating preview when loading */}
          {loading && !showUpload && previewUrl && (
            <div className="absolute right-4 -top-6 w-48 h-28 sm:w-56 sm:h-32 z-20 rounded-md overflow-hidden shadow-md ring-1 ring-black/5 transition-transform duration-300 ease-out">
              <img src={previewUrl} alt="chart preview" className="w-full h-full object-cover" />
            </div>
          )}
          <span className="text-gray sm:text-sm text-xs">
            Trading Type ({tradingType === "SCALP" ? "Scalp" : "Swing"})
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
                      <Input
                        placeholder="200"
                        type="number"
                        {...field}
                        onChange={(e) => field.onChange(e.target.valueAsNumber)}
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
                  Risk Per Trade (%)
                </span>
                <FormField
                  control={analyseChartForm.control}
                  name="risk_per_trade_percent"
                  render={({ field, fieldState }) => (
                    <>
                      <Input
                        {...field}
                        onChange={(e) => field.onChange(e.target.valueAsNumber)}
                        prefix="$"
                        placeholder="1.0"
                        type="number"
                        max={1.0}
                        min={0.0}
                        required
                        step="any"
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
                        onChange={(e) => field.onChange(e.target.valueAsNumber)}
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
                        onChange={(e) => field.onChange(e.target.valueAsNumber)}
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
                  value={timeframe}
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
                      {TRADE_TYPE_TIME_FRAMES_MAP[tradingType].map(
                        (timeFrame) => (
                          <SelectItem value={timeFrame.value}>
                            {timeFrame.label}
                          </SelectItem>
                        )
                      )}
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
                type="button"
                variant="outline"
                onClick={analyseChartForm.handleSubmit(onSubmit)}
                loading={loading}
                disabled={loading}
              >
                {!loading && <RefreshCw />}
                Re-Analyze
              </Button>
            ) : (
              <Link to={`/${ROUTES.HELP.path}`}>
                <Button className="flex-grow" variant="outline">
                  Seek Help
                </Button>
              </Link>
            )}
            {!reAnalyse ? (
              <Button
                type="submit"
                className="flex-grow bg-purple-500"
                loading={loading}
                disabled={loading}
              >
                Analyze Chart
              </Button>
            ) : (
              <Button
                className="flex-grow bg-purple-500"
                onClick={() =>
                  console.log("implement addition to trade journal")
                }
                loading={loading}
                disabled={loading}
              >
                Add to Trade Journal
              </Button>
            )}
          </div>
        </form>
      </Form>
    </Card>
  );
}

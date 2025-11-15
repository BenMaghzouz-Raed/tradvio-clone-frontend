import * as z from "zod";

// TODO: add condition on what the timeframe should be based on the trading_type
export const analyseChartSchema = z
  .object({
    image: z
      .instanceof(File, { error: "this field must be an image" })
      .refine((file) => !file || file.size > 0, "Image file cannot be empty"),
    symbol: z.string().min(1, "Symbol/Pattern is required").optional(),
    trading_type: z.enum(["SWING", "SCALP"], {
      error: "trade type must be swing or scalp ",
    }),
    account_balance: z.number({ error: "account balance must be a number" }),
    stop_loss_points: z.number({ error: "stop loss must be a number" }),
    take_profit_points: z.number({ error: "take profit must be a number" }),
    risk_per_trade_percent: z
      .number({ error: "risk per trade must be a number" })
      .max(1, "risk per trade must be a percentage 0.0 ... 1.0"),
    timeframe: z.string({ error: "time frame is required" }),
  })
  .required()
  .superRefine((data, ctx) => {
    let allowed: readonly string[] = [];

    switch (data.trading_type) {
      case "SCALP":
        allowed = ["1-m", "2-m", "5-m"];
        break;
      case "SWING":
        allowed = ["1-h", "4-h", "d", "w"];
        break;
    }

    if (!allowed.includes(data.timeframe)) {
      ctx.addIssue({
        path: ["timeframe"],
        code: z.ZodIssueCode.custom,
        message: `Invalid timeframe for trading type "${
          data.trading_type
        }". Allowed: ${allowed.join(", ")}`,
      });
    }
  });

export type AnalyseChartFormValues = z.infer<typeof analyseChartSchema>;

import * as z from "zod";

// TODO: add condition on what the timeframe should be based on the trading_type
export const analyseChartSchema = z.object({
  image: z
    .instanceof(File)
    .optional()
    .refine((file) => !file || file.size > 0, "Image file cannot be empty"),
  trading_type: z.enum(["SWING", "SCALP"]),
  account_balance: z.number(),
  stop_loss_points: z.number(),
  take_profit_points: z.number(),
  risk_per_trade_percent: z
    .number()
    .max(1, "risk per trade must be a percentage 0.0 ... 1.0"),
  timeframe: z.string(),
});

export type AnalyseChartFormValues = z.infer<typeof analyseChartSchema>;

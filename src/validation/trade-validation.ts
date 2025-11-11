import * as z from "zod";

export const addTradeSchema = z
  .object({
    entry_price: z.number(),
    entry_time: z.date(),
    exit_price: z.number(),
    exit_time: z.date(),
    outcome: z.enum(["WIN", "LOSS"]),
    profit_loss: z.number(),
    profit_percent: z.number(),
    quantity: z.number(),
    source: z.enum(["MANUAL"]),
    symbol: z.string(),
    trade_date: z.date(),
    trade_type: z.enum(["LONG", "SHORT"]),
    trading_notes: z.string(),
  })
  .required();

export type AddTradeFormValues = z.infer<typeof addTradeSchema>;

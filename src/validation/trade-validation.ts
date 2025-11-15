import * as z from "zod";

export const addTradeSchema = z
  .object({
    // optional execution fields (user can edit before saving)
    entry_price: z.number().optional(),
    entry_time: z.date().optional(),
    exit_price: z.number().optional(),
    exit_time: z.date().optional(),

    // required per feedback
    outcome: z.enum(["WIN", "LOSS", "NOT_TAKEN"]),
    quantity: z.number(),

    // optional P&L (prefilled from AI suggested values if available)
    profit_loss: z.number().optional(),
    profit_percent: z.number().optional(),

    // meta
    source: z.literal("MANUAL").default("MANUAL"),

    symbol: z.string(),
    trade_date: z.date().optional(),
    // backend accepts SWING|SCALP|BOTH on create; allow string here and let backend normalize
    trade_type: z.enum(["LONG", "SHORT"]).optional(),

    trading_notes: z.string().optional(),
  });

export type AddTradeFormValues = z.infer<typeof addTradeSchema>;

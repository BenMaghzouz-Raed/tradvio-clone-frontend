import * as z from "zod";

export const addSubscriptionPlanSchema = z
  .object({
    name: z.string().max(100, "name can't be longer than 100 charaters"),
    description: z.string(),
    price: z.number(),
    currency: z.string(),
    billing_interval: z.enum(["month", "year"]),
    features: z.object({
      analyse_charts: z.boolean(),
      get_analysis_history: z.boolean(),
      get_trade_recommedations: z.boolean(),
    }),
    is_active: z.boolean(),
  })
  .required();

export type AddSubscriptionPlanFormValues = z.infer<
  typeof addSubscriptionPlanSchema
>;

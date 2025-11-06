import * as z from "zod";

export const loginSchema = z.object({
  username: z.string(),
  password: z.string(),
});

export const registerSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  username: z.string().min(8, "Username must be at least 8 characters"),
  email: z.string().email("Enter a valid email"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  timezone: z
    .string()
    .regex(
      new RegExp(/^UTC([+-](0?[0-9]|1[0-2]))?$/i),
      "Enter a valid timezone"
    ),
  avatarUrl: z.string().url(),
});

export type LoginFormValues = z.infer<typeof loginSchema>;
export type RegisterFormValues = z.infer<typeof registerSchema>;

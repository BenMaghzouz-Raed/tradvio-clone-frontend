import * as z from "zod";
const passwordRule = z
  .string()
  .min(8, "Password must be at least 8 characters long");

export const loginSchema = z.object({
  username: z.string(),
  password: z.string(),
});

export const registerSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  username: z.string().min(8, "Username must be at least 8 characters"),
  email: z.string().email("Enter a valid email"),
  password: passwordRule,
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

export const profileSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  gender: z.enum(["Men", "Women"]),
  country: z.string().min(1, "Country is required"),
  language: z.string().optional(),
  timeZone: z.string().optional(),
});

export const securitySchema = z
  .object({
    currentPassword: z.string().min(1, "Current password required"),
    newPassword: passwordRule,
    confirmPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

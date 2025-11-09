import * as z from "zod";
const passwordRule = z
  .string()
  .min(8, "Password must be at least 8 characters long");

export const loginSchema = z.object({
  username: z
    .string()
    .min(3, "Username or email must be at least 3 characters")
    .refine((value) => {
      // Allow either email format or username format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(value) || value.length >= 3;
    }, "Please enter a valid username or email address"),
  password: passwordRule,
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

export const resetPasswordSchema = z
  .object({
    newPassword: registerSchema.shape.password,
    confirmPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export const profileSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  username: z.string().min(8, "Username must be at least 8 charaters"),
  timeZone: z.string().optional(),
});

export const updatePasswordSchema = z
  .object({
    currentPassword: z.string().min(1, "Current password required"),
    newPassword: passwordRule,
    confirmPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export const forgotPasswordSchema = z.object({
  email: z.email(),
});

export type ResetPasswordFormValues = z.infer<typeof resetPasswordSchema>;
export type LoginFormValues = z.infer<typeof loginSchema>;
export type RegisterFormValues = z.infer<typeof registerSchema>;
export type ProfileFormValues = z.infer<typeof profileSchema>;
export type UpdatePasswordFormValues = z.infer<typeof updatePasswordSchema>;
export type ForgotPasswordFormValues = z.infer<typeof forgotPasswordSchema>;

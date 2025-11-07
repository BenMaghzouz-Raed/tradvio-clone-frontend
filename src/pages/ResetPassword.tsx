"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import MarketingHighlight from "@/components/marketing-highlights";

import { resetPasswordSchema, ResetPasswordFormValues } from "@/lib/validation";

export default function ResetPassword() {
  const form = useForm<ResetPasswordFormValues>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      newPassword: "",
      confirmPassword: "",
    },
  });

  const onSubmit = (values: ResetPasswordFormValues) => {
    console.log("Password reset successful:", values);
  };

  return (
    <div className="flex min-h-screen text-white">
      {/* LEFT SIDE  */}
      <div className="hidden lg:flex w-1/2 relative items-center justify-center bg-[url('/images/background_image.jpeg')] bg-cover bg-center">
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 p-8 rounded-2xl max-w-lg">
          <h1 className="text-5xl font-bold mb-6 leading-tight">
            Reset your password <br /> and get back in.
          </h1>
          <div className="flex flex-wrap gap-2">
            <MarketingHighlight label="AI-Powered Trade Plans" />
            <MarketingHighlight label="Integrated Risk Management" />
            <MarketingHighlight label="Next-Gen Trade Journal" />
          </div>
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="w-full lg:w-1/2 flex items-center justify-center bg-black">
        <Card className="w-[400px] bg-neutral-900 text-white border-none">
          <CardHeader>
            <CardTitle className="text-center text-2xl">
              Reset Password
            </CardTitle>
            <p className="text-center text-sm text-neutral-400 mt-2">
              Enter and confirm your new password.
            </p>
          </CardHeader>

          <CardContent>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              {/* New Password */}
              <div className="space-y-1">
                <label className="text-sm text-neutral-300 block">
                  New Password
                </label>
                <Input
                  type="password"
                  placeholder="********"
                  className="bg-neutral-800 border-neutral-700 text-white"
                  {...form.register("newPassword")}
                />
                {form.formState.errors.newPassword && (
                  <p className="text-sm text-red-400 mt-1">
                    {form.formState.errors.newPassword.message}
                  </p>
                )}
              </div>

              {/* Confirm Password */}
              <div className="space-y-1">
                <label className="text-sm text-neutral-300 block">
                  Confirm Password
                </label>
                <Input
                  type="password"
                  placeholder="********"
                  className="bg-neutral-800 border-neutral-700 text-white"
                  {...form.register("confirmPassword")}
                />
                {form.formState.errors.confirmPassword && (
                  <p className="text-sm text-red-400 mt-1">
                    {form.formState.errors.confirmPassword.message}
                  </p>
                )}
              </div>

              <Button type="submit" variant="default" className="w-full">
                Reset Password
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

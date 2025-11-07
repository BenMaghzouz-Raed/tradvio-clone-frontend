import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { resetPasswordSchema, ResetPasswordFormValues } from "@/lib/validation";

export default function Form() {
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
    <Card className="w-[400px] bg-neutral-900 text-white border-none">
      <CardHeader>
        <CardTitle className="text-center text-2xl">Reset Password</CardTitle>
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
  );
}

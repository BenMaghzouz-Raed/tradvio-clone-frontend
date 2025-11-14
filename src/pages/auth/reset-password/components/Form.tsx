import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  resetPasswordSchema,
  ResetPasswordFormValues,
} from "@/validation/auth-validation";
import { useNavigate, useSearchParams } from "react-router-dom";
import { resetPassword } from "@/services/domain/AuthService";
import { toastNotification } from "@/lib/toast";
import { useState } from "react";
import { ROUTES } from "@/services/http/LinksService";
import { Label } from "@/components/ui/label";

export default function Form() {
  const form = useForm<ResetPasswordFormValues>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      newPassword: "",
      confirmPassword: "",
    },
  });
  const [searchParams] = useSearchParams();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onSubmit = async (values: ResetPasswordFormValues) => {
    if (!searchParams.get("token") || !searchParams.get("selector")) return;
    try {
      setLoading(true);
      await resetPassword({
        selector: searchParams.get("selector")!,
        token: searchParams.get("token")!,
        new_password: values.newPassword,
      });
      toastNotification({
        type: "success",
        message: "You password was successfully reset",
      });
      navigate(`/${ROUTES.LOGIN.path}`);
    } catch (err) {
      toastNotification({
        type: "error",
        message: "something went wrong please try again later",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto grid w-[350px] gap-6">
      <div className="grid gap-2 text-center">
        <h1 className="text-3xl font-bold">Reset Password</h1>
        <p className="text-balance text-muted-foreground">
          Enter and confirm your new password.
        </p>
      </div>
      <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">
        <div className="grid gap-2">
          <Label htmlFor="newPassword">New Password</Label>
          <Input
            id="newPassword"
            type="password"
            placeholder="********"
            required
            {...form.register("newPassword")}
          />
          {form.formState.errors.newPassword && (
            <p className="text-sm text-red-400 mt-1">
              {form.formState.errors.newPassword.message}
            </p>
          )}
        </div>
        <div className="grid gap-2">
          <Label htmlFor="confirmPassword">Confirm Password</Label>
          <Input
            id="confirmPassword"
            type="password"
            placeholder="********"
            {...form.register("confirmPassword")}
          />
          {form.formState.errors.confirmPassword && (
            <p className="text-sm text-red-400 mt-1">
              {form.formState.errors.confirmPassword.message}
            </p>
          )}
        </div>
        <Button
          loading={loading}
          type="submit"
          className="w-full"
          disabled={!searchParams.get("selector") || !searchParams.get("token")}
        >
          Reset Password
        </Button>
      </form>
    </div>
  );
}

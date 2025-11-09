import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  ForgotPasswordFormValues,
  forgotPasswordSchema,
} from "@/validation/auth-validation";
import { Label } from "@/components/ui/label";
import { Link } from "react-router-dom";
import { ROUTES } from "@/services/http/LinksService";

export default function Form() {
  const form = useForm<ForgotPasswordFormValues>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = (values: ForgotPasswordFormValues) => {
    console.log("Forgot password submitted:", values);
  };
  return (
    <div className="mx-auto grid w-[350px] gap-6">
      <div className="grid gap-2 text-center">
        <h1 className="text-3xl font-bold">Forgot Password</h1>
        <p className="text-balance text-muted-foreground">
          Enter your email to reset your password
        </p>
      </div>
      <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">
        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="m@example.com"
            required
            {...form.register("email")}
          />
          {form.formState.errors.email && (
            <p className="text-sm text-red-400 mt-1">
              {form.formState.errors.email.message}
            </p>
          )}
        </div>
        <Button type="submit" className="w-full">
          Send Reset Link
        </Button>
      </form>
      <div className="text-center text-sm">
        Remember your password?{" "}
        <Link to={`/${ROUTES.LOGIN.path}`} className="underline">
          Login
        </Link>
      </div>
    </div>
  );
}

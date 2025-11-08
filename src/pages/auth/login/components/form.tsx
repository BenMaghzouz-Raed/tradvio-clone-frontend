/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  loginSchema,
  type LoginFormValues,
} from "@/validation/auth-validation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";
import { ROUTES } from "@/services/LinksService";
import { useAuth } from "@/hooks/use-auth";
import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Icons } from "@/components/icons";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Spinner } from "@/components/ui/spinner";

export default function Form() {
  const { login } = useAuth();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const onSubmit = async (values: LoginFormValues) => {
    try {
      setError("");
      setIsLoading(true);
      await login(values.username, values.password);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="mx-auto grid w-[350px] gap-6">
      <div className="grid gap-2 text-center">
        <h1 className="text-3xl font-bold">Login</h1>
        <p className="text-balance text-muted-foreground">
          Enter your email below to login to your account
        </p>
      </div>
      {error && (
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      <div className="grid gap-4">
        <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="username">Username or Email</Label>
            <Input
              id="username"
              placeholder="username"
              required
              {...form.register("username")}
            />
            {form.formState.errors.username && (
              <p className="text-sm text-red-400 mt-1">
                {form.formState.errors.username.message}
              </p>
            )}
          </div>
          <div className="grid gap-2">
            <div className="flex items-center">
              <Label htmlFor="password">Password</Label>
              <Link
                to={`/${ROUTES.FORGOT_PASSWORD.path}`}
                className="ml-auto inline-block text-sm underline"
              >
                Forgot your password?
              </Link>
            </div>
            <Input
              id="password"
              type="password"
              required
              {...form.register("password")}
            />
            {form.formState.errors.password && (
              <p className="text-sm text-red-400 mt-1">
                {form.formState.errors.password.message}
              </p>
            )}
          </div>
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading && <Spinner />} Login
          </Button>
        </form>
        <Button
          variant="outline"
          className="w-full"
          disabled={isLoading}
          onClick={() => {
            setIsLoading(true);
          }}
        >
          {isLoading ? (
            <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <Icons.google className="mr-2 h-4 w-4" />
          )}{" "}
          Login with Google
        </Button>
      </div>
      <div className="text-center text-sm">
        Don't have an account?{" "}
        <Link to={`/${ROUTES.REGISTER.path}`} className="underline">
          Sign up
        </Link>
      </div>
    </div>
  );
}

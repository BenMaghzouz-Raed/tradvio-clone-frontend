/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  registerSchema,
  type RegisterFormValues,
} from "@/validation/auth-validation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { register } from "@/services/domain/AuthService";
import { ROUTES } from "@/services/LinksService";
import { Link, useNavigate } from "react-router-dom";
import { toastNotification } from "@/lib/toast";
import { Label } from "@/components/ui/label";
import { Icons } from "@/components/icons";

export default function Form() {
  const [loading, setLaoding] = useState(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const navigate = useNavigate();
  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      username: "",
      email: "",
      password: "",
      timezone: "UTC",
      avatarUrl:
        "https://img.freepik.com/vecteurs-libre/illustration-du-jeune-homme-souriant_1308-174669.jpg",
    },
  });

  const onSubmit = async (values: RegisterFormValues) => {
    setLaoding(true);
    try {
      await register({
        ...values,
        avatar_url: values.avatarUrl,
        email: values.email,
        first_name: values.firstName,
        last_name: values.lastName,
      });
      toastNotification({
        message: "Account created succefully",
        type: "success",
      });
      navigate(`/${ROUTES.LOGIN.path}`);
    } catch (err: any) {
      toastNotification({
        message: err.message,
        type: "error",
      });
    } finally {
      setLaoding(false);
    }
  };

  return (
    <div className="mx-auto grid w-[350px] gap-6">
      <div className="grid gap-2 text-center">
        <h1 className="text-3xl font-bold">Sign Up</h1>
        <p className="text-balance text-muted-foreground">
          Enter your information to create an account
        </p>
      </div>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="grid gap-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="first-name">First name</Label>
              <Input
                id="first-name"
                placeholder="Max"
                required
                {...form.register("firstName")}
              />
              {form.formState.errors.firstName && (
                <p className="text-sm text-red-400 mt-1">
                  {form.formState.errors.firstName.message}
                </p>
              )}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="last-name">Last name</Label>
              <Input
                id="last-name"
                placeholder="Robinson"
                required
                {...form.register("lastName")}
              />
              {form.formState.errors.lastName && (
                <p className="text-sm text-red-400 mt-1">
                  {form.formState.errors.lastName.message}
                </p>
              )}
            </div>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="username">Username</Label>
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
          <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              {...form.register("password")}
            />
            {form.formState.errors.password && (
              <p className="text-sm text-red-400 mt-1">
                {form.formState.errors.password.message}
              </p>
            )}
          </div>
          <Button type="submit" className="w-full" disabled={loading}>
            {loading && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />}
            Create an account
          </Button>
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
            Sign up with Google
          </Button>
        </div>
      </form>
      <div className="text-center text-sm">
        Already have an account?{" "}
        <Link to={`/${ROUTES.LOGIN.path}`} className="underline">
          Sign in
        </Link>
      </div>
    </div>
  );
}

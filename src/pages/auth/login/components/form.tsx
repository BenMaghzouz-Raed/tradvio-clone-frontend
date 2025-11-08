/* eslint-disable @typescript-eslint/no-explicit-any */
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { loginSchema, type LoginFormValues } from "@/lib/validation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Link } from "react-router-dom";
import { ROUTES } from "@/services/LinksService";
import { useAuth } from "@/hooks/use-auth";

export default function Form() {
  const { login, loading } = useAuth();
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const onSubmit = async (values: LoginFormValues) => {
    login(values.username, values.password);
  };

  return (
    <Card className="w-[400px] bg-neutral-900 text-white border-none">
      <CardHeader>
        <CardTitle className="text-center text-2xl">Log In</CardTitle>
      </CardHeader>

      <CardContent>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          {/* EMAIL */}
          <div className="space-y-1">
            <label className="text-sm text-neutral-300 block">Username</label>
            <Input
              placeholder="username"
              className="bg-neutral-800 border-neutral-700 text-white"
              {...form.register("username")}
            />
            {form.formState.errors.username && (
              <p className="text-sm text-red-400 mt-1">
                {form.formState.errors.username.message}
              </p>
            )}
          </div>

          {/* PASSWORD */}
          <div className="space-y-1">
            <label className="text-sm text-neutral-300 block">Password</label>
            <Input
              type="password"
              placeholder="********"
              className="bg-neutral-800 border-neutral-700 text-white"
              {...form.register("password")}
            />
            {form.formState.errors.password && (
              <p className="text-sm text-red-400 mt-1">
                {form.formState.errors.password.message}
              </p>
            )}
          </div>

          {/* REMEMBER DEVICE */}
          <div className="flex items-center space-x-2">
            <Checkbox
              id="remember"
              className="border-neutral-700 data-[state=checked]:bg-[#8B5CF6] data-[state=checked]:border-[#8B5CF6]"
            />
            <label
              htmlFor="remember"
              className="text-sm text-neutral-400 leading-none cursor-pointer"
            >
              Remember this device
            </label>
          </div>

          {/* BUTTON */}
          <Button
            disabled={loading}
            type="submit"
            variant="default"
            className="w-full cursor-pointer"
          >
            Log In
          </Button>

          {/* SEPARATOR */}
          <div className="flex items-center gap-2">
            <div className="flex-1 h-px bg-neutral-700"></div>
            <span className="text-sm text-neutral-500">or</span>
            <div className="flex-1 h-px bg-neutral-700"></div>
          </div>
        </form>
        <div className="mt-2 text-sm text-neutral-400 cursor-pointer text-center hover:underline">
          <Link to={`/${ROUTES.REGISTER.path}`}>Create and Account</Link>
        </div>
      </CardContent>
    </Card>
  );
}

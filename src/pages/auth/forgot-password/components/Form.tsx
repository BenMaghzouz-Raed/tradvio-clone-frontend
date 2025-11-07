import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  ForgotPasswordFormValues,
  forgotPasswordSchema,
} from "@/lib/validation";

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
    <Card className="w-[400px] bg-neutral-900 text-white border-none">
      <CardHeader>
        <CardTitle className="text-center text-2xl">Forgot Password</CardTitle>
      </CardHeader>

      <CardContent>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          {/* EMAIL */}
          <div className="space-y-1">
            <label className="text-sm text-neutral-300 block">
              Email Address
            </label>
            <Input
              placeholder="you@example.com"
              className="bg-neutral-800 border-neutral-700 text-white"
              {...form.register("email")}
            />
            {form.formState.errors.email && (
              <p className="text-sm text-red-400 mt-1">
                {form.formState.errors.email.message}
              </p>
            )}
          </div>

          {/* SUBMIT BUTTON */}
          <Button
            type="submit"
            variant="default"
            className="w-full cursor-pointer"
          >
            Send Reset Link
          </Button>

          <p className="text-sm text-center text-neutral-400 mt-2">
            We’ll send a reset link to your email if it exists in our system.
          </p>
        </form>
      </CardContent>
    </Card>
  );
}

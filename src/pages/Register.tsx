import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { registerSchema, type RegisterFormValues } from "@/lib/validation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import MarketingHighlight from "@/components/marketing-highlights";
import { useState } from "react";
import { register } from "@/services/domain/AuthService";
import { Link, useNavigate } from "react-router-dom";
import { ROUTES } from "@/services/LinksService";
import { useAuth } from "@/hooks/use-auth";

export default function Register() {
  const [loading, setLaoding] = useState(false);
  const navigate = useNavigate();

  useAuth();

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
      navigate(`/${ROUTES.LOGIN.path}`);
    } catch (err) {
      // TODO: change to toast
      console.log(err);
    } finally {
      setLaoding(false);
    }
  };

  return (
    <div className="flex min-h-screen text-white">
      {/* LEFT SIDE */}
      <div className="hidden lg:flex w-1/2 relative items-center justify-center bg-[url('/images/background_image.jpeg')] bg-cover bg-center">
        <div className="absolute inset-0 bg-black/50"></div>

        <div className="relative z-10 p-8 rounded-2xl max-w-lg">
          <h1 className="text-5xl font-bold mb-6 leading-tight">
            Navigate the <br /> Markets with <br /> Confidence
          </h1>

          <div className="flex flex-wrap gap-2">
            <MarketingHighlight label="AI-Powered Trade Plans" />
            <MarketingHighlight label="Integrated Risk Management" />
            <MarketingHighlight label="Next-Gen Trade Journal" />
            <MarketingHighlight label="Customer Support" />
          </div>
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="w-full lg:w-1/2 flex items-center justify-center bg-black">
        <Card className="w-[400px] bg-neutral-900 text-white border-none">
          <CardHeader>
            <CardTitle className="text-center text-2xl">Register</CardTitle>
          </CardHeader>

          <CardContent>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              {/* FIRST & LAST NAME */}
              <div className="flex space-x-2">
                <div className="w-1/2 space-y-1">
                  <label className="text-sm text-neutral-300 block">
                    First Name
                  </label>
                  <Input
                    placeholder="John"
                    className="bg-neutral-800 border-neutral-700 text-white"
                    {...form.register("firstName")}
                  />
                  {form.formState.errors.firstName && (
                    <p className="text-sm text-red-400 mt-1">
                      {form.formState.errors.firstName.message}
                    </p>
                  )}
                </div>

                <div className="w-1/2 space-y-1">
                  <label className="text-sm text-neutral-300 block">
                    Last Name
                  </label>
                  <Input
                    placeholder="Doe"
                    className="bg-neutral-800 border-neutral-700 text-white"
                    {...form.register("lastName")}
                  />
                  {form.formState.errors.lastName && (
                    <p className="text-sm text-red-400 mt-1">
                      {form.formState.errors.lastName.message}
                    </p>
                  )}
                </div>
              </div>

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

              {/* Username */}
              <div className="space-y-1">
                <label className="text-sm text-neutral-300 block">
                  Username
                </label>
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
                <label className="text-sm text-neutral-300 block">
                  Password
                </label>
                <Input
                  type="password"
                  placeholder="********"
                  className="bg-neutral-800 border-neutral-700 text-white"
                  {...form.register("password")}
                />
                <span className="text-[12px] font-[400] text-[#999999]">
                  At least 8 characters, with numbers and symbols.
                </span>
                {form.formState.errors.password && (
                  <p className="text-sm text-red-400 mt-1">
                    {form.formState.errors.password.message}
                  </p>
                )}
              </div>

              {/* REMEMBER CHECKBOX */}
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

              {/* SUBMIT BUTTON */}
              <Button
                disabled={loading}
                type="submit"
                variant="default"
                className="w-full cursor-pointer"
              >
                Register
              </Button>

              {/* SEPARATOR */}
              <div className="flex items-center gap-2">
                <div className="flex-1 h-px bg-neutral-700"></div>
                <span className="text-sm text-neutral-500">or</span>
                <div className="flex-1 h-px bg-neutral-700"></div>
              </div>
            </form>
            <div className="mt-2 text-sm text-neutral-400 cursor-pointer text-center hover:underline">
              <Link to={`/${ROUTES.LOGIN.path}`}>Already have an account</Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

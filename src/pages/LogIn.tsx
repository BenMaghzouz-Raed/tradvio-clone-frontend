
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { loginSchema, type LoginFormValues } from "@/lib/validation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import MarketingHighlight from "@/components/marketing-highlights";

export default function LogIn() {
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (values: LoginFormValues) => {
    console.log(values);
  };

  return (
    <div className="flex min-h-screen text-white">
      {/* LEFT SIDE */}
      <div
        style={{
          backgroundImage: "url('/images/background_image.jpeg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        className="hidden lg:flex w-1/2 relative items-center justify-center"
      >
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
            <CardTitle className="text-center text-2xl">Log In</CardTitle>
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
              <Button type="submit" variant="default" className="w-full cursor-pointer">
                Log In
              </Button>

              {/* SEPARATOR */}
              <div className="flex items-center gap-2">
                <div className="flex-1 h-px bg-neutral-700"></div>
                <span className="text-sm text-neutral-500">or</span>
                <div className="flex-1 h-px bg-neutral-700"></div>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

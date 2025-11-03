"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useController } from "react-hook-form";
import React from "react";

const Checkbox: React.FC<React.InputHTMLAttributes<HTMLInputElement>> = ({
  id,
  ...props
}) => (
  <input
    id={id}
    type="checkbox"
    className="w-4 h-4 rounded bg-neutral-800 border-neutral-700 text-indigo-600"
    {...props}
  />
);

const Form: React.FC<any> = ({ children }) => <>{children}</>;

const FormControl: React.FC<any> = ({ children }) => <>{children}</>;

const FormItem: React.FC<any> = ({ children }) => (
  <div className="space-y-1">{children}</div>
);

const FormLabel: React.FC<any> = ({ children }) => (
  <label className="text-sm text-neutral-300 block">{children}</label>
);

const FormMessage: React.FC<{ children?: React.ReactNode }> = ({ children }) =>
  children ? <p className="text-sm text-red-400 mt-1">{children}</p> : null;


const FormField: React.FC<{
  control: any;
  name: string;
  render: (props: { field: any; fieldState: any }) => React.ReactNode;
}> = ({ control, name, render }) => {
  const controller = useController({ name, control });
  return <>{render({ field: controller.field, fieldState: controller.fieldState })}</>;
};
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FcGoogle } from "react-icons/fc";

const formSchema = z.object({
  email: z.string().email("Enter a valid email"),
  password: z.string().min(8, "At least 8 characters"),
});

export default function LogIn() {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log(values);
  };

  return (
    <div className="flex min-h-screen text-white">
      {/* Left side */}
      <div
        style={{
          backgroundImage: "url('/images/background_image.jpeg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        className="hidden lg:flex w-1/2 relative items-center justify-center"
      >
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/50"></div>

        {/* Content */}
        <div className="relative z-10 p-8 rounded-2xl max-w-lg">
          <h1 className="text-5xl font-bold mb-6 leading-tight">
            Navigate the <br /> Markets with <br /> Confidence
          </h1>
          <div className="flex flex-wrap gap-2">
            <span
              className="text-sm px-4 py-2 rounded-full"
              style={{
                background:
                  "linear-gradient(180deg, rgba(255, 255, 255, 0.15) 10%, rgba(255, 255, 255, 0.075) 100%)",
              }}
            >
              AI-Powered Trade Plans
            </span>
            <span
              className="text-sm px-4 py-2 rounded-full"
              style={{
                background:
                  "linear-gradient(180deg, rgba(255, 255, 255, 0.3) 0%, rgba(255, 255, 255, 0.075) 100%)",
              }}
            >
              Integrated Risk Management
            </span>
            <span
              className="text-sm px-4 py-2 rounded-full"
              style={{
                background:
                  "linear-gradient(180deg, rgba(255, 255, 255, 0.3) 0%, rgba(255, 255, 255, 0.075) 100%)",
              }}
            >
              Next-Gen Trade Journal
            </span>
            <span
              className="text-sm px-4 py-2 rounded-full"
              style={{
                background:
                  "linear-gradient(180deg, rgba(255, 255, 255, 0.3) 0%, rgba(255, 255, 255, 0.075) 100%)",
              }}
            >
              Customer Support
            </span>
          </div>
        </div>
      </div>

      {/* Right side */}
      <div className="w-full lg:w-1/2 flex items-center justify-center bg-black">
        <Card className="w-[400px] bg-neutral-900 text-white border-none">
          <CardHeader>
            <CardTitle className="text-center text-2xl ">
              Create Account
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4"
              >
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field,fieldState }) => (
                    <FormItem>
                      <FormLabel>Email Address</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="you@example.com"
                          className="bg-neutral-800 border-neutral-700 text-white"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage>{fieldState?.error?.message}</FormMessage>

                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="password"
                  render={({ field, fieldState }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          placeholder="********"
                          className="bg-neutral-800 border-neutral-700 text-white"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage>{fieldState?.error?.message}</FormMessage>
                    </FormItem>
                  )}
                />

                <div className="flex items-center space-x-2">
                  <Checkbox id="remember" />
                  <label
                    htmlFor="remember"
                    className="text-sm text-neutral-400 leading-none"
                  >
                    Remember this device
                  </label>
                </div>

                <Button
                  type="submit"
                  className="w-full bg-indigo-600 hover:bg-indigo-700 rounded bg-[#8B5CF6] py-2"
                >
                  Create Account
                </Button>

                <div className="flex items-center gap-2">
                  <div className="flex-1 h-px bg-neutral-700"></div>
                  <span className="text-sm text-neutral-500">or</span>
                  <div className="flex-1 h-px bg-neutral-700"></div>
                </div>

                <Button
                  variant="outline"
                  type="button"
                  className="w-full bg-neutral-800 border-neutral-700 text-white hover:bg-neutral-700"
                >
                  <FcGoogle className="mr-2 text-lg" />
                  Sign up with Google
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

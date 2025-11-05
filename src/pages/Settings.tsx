"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ChevronDown } from "lucide-react";
import { Form } from "@/components/ui/form";
import FormField from "@/components/form/form-field";
import { profileSchema, securitySchema } from "@/lib/validation";

export default function Settings() {
  const profileForm = useForm({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      gender: "Men",
      country: "Tunisia",
      language: "",
      timeZone: "",
    },
  });

  const securityForm = useForm({
    resolver: zodResolver(securitySchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  const handleProfileSubmit = (data: z.infer<typeof profileSchema>) => {
    console.log("Profile updated:", data);
  };

  const handleSecuritySubmit = (data: z.infer<typeof securitySchema>) => {
    console.log("Password updated:", data);
  };

  return (
    <div className="min-h-screen">
      <div className="flex items-center gap-4 mb-8">
        <Avatar className="h-16 w-16">
          <AvatarImage src="/avatars/person.png" alt="Profile" />
          <AvatarFallback>AS</AvatarFallback>
        </Avatar>
        <div>
          <h2 className="text-lg font-semibold">Actadium by Shadon</h2>
          <p className="text-sm text-gray-500">Luisalivery@gmail.com</p>
        </div>
      </div>

      {/* PROFILE SECTION - Minimal design */}
      <Form {...profileForm}>
        <form
          onSubmit={profileForm.handleSubmit(handleProfileSubmit)}
          className="space-y-4 mb-12"
        >
          {/* First Name & Last Name Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={profileForm.control}
              name="firstName"
              render={({ field }) => (
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-3 block">
                    First Name
                  </label>
                  <Input
                    placeholder="Your first name"
                    {...field}
                    className="w-full border-gray-300 focus:border-purple-500  bg-[#F9F9F9]"
                  />
                </div>
              )}
            />

            <FormField
              control={profileForm.control}
              name="lastName"
              render={({ field }) => (
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-3 block">
                    Last Name
                  </label>
                  <Input
                    placeholder="Your last name"
                    {...field}
                    className="w-full border-gray-300 focus:border-purple-500  bg-[#F9F9F9]"
                  />
                </div>
              )}
            />
          </div>

          {/* Gender & Country Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={profileForm.control}
              name="gender"
              render={({ field }) => (
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-3 block">
                    Gender
                  </label>
                  <div className="relative">
                    <select
                      {...field}
                      className={`w-full px-3 py-2 appearance-none border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-[#F9F9F9] ${
                        !field.value ? "text-gray-400" : "text-gray-900"
                      }`}
                    >
                      <option value="" disabled hidden>
                        Select gender
                      </option>
                      <option value="Men">Men</option>
                      <option value="Women">Women</option>
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500 pointer-events-none" />
                  </div>
                </div>
              )}
            />

            <FormField
              control={profileForm.control}
              name="country"
              render={({ field }) => (
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-3 block">
                    Country
                  </label>
                  <div className="relative">
                    <select
                      {...field}
                      className={`w-full px-3 py-2 appearance-none border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-[#F9F9F9] ${
                        !field.value ? "text-gray-400" : "text-gray-900"
                      }`}
                    >
                      <option value="" disabled hidden>
                        Select country
                      </option>
                      <option value="Tunisia">Tunisia</option>
                      <option value="USA">USA</option>
                      <option value="UK">UK</option>
                      <option value="France">France</option>
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500 pointer-events-none" />
                  </div>
                </div>
              )}
            />
          </div>

          {/* Language & Time Zone Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={profileForm.control}
              name="language"
              render={({ field }) => (
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-3 block">
                    Language
                  </label>
                  <Input
                    placeholder="Choose a language"
                    {...field}
                    className="w-full border-gray-300 focus:border-purple-500  bg-[#F9F9F9]"
                  />
                </div>
              )}
            />

            <FormField
              control={profileForm.control}
              name="timeZone"
              render={({ field }) => (
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-3 block">
                    Time Zone
                  </label>
                  <Input
                    placeholder="Time Zone"
                    {...field}
                    className="w-full border-gray-300 focus:border-purple-500  bg-[#F9F9F9]"
                  />
                </div>
              )}
            />
          </div>

          {/* Submit Button */}
          <div className="flex justify-end pt-6">
            <Button
              type="submit"
              className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-2 cursor-pointer"
            >
              Edit
            </Button>
          </div>
        </form>
      </Form>

      {/* Separator */}
      <div className="border-t border-gray-200 my-8"></div>

      {/* SECURITY SECTION - Minimal design */}
      <div className="w-full sm:w-1/2">
        <h2 className="text-lg font-semibold mb-6">Security Settings</h2>

        <Form {...securityForm}>
          <form
            onSubmit={securityForm.handleSubmit(handleSecuritySubmit)}
            className="space-y-4"
          >
            <FormField
              control={securityForm.control}
              name="currentPassword"
              render={({ field, fieldState }) => (
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-3 block">
                    Current Password
                  </label>
                  <Input
                    type="password"
                    placeholder="Current Password"
                    {...field}
                    className={`border-gray-300 focus:border-purple-500 bg-[#F9F9F9] ${
                      fieldState.error ? "border-red-500" : ""
                    }`}
                  />
                  {fieldState.error && (
                    <p className="text-red-500 text-xs mt-1">
                      {fieldState.error.message}
                    </p>
                  )}
                </div>
              )}
            />

            <FormField
              control={securityForm.control}
              name="newPassword"
              render={({ field, fieldState }) => (
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-3 block">
                    New Password
                  </label>
                  <Input
                    type="password"
                    placeholder="New Password"
                    {...field}
                    className={`border-gray-300 focus:border-purple-500 bg-[#F9F9F9] ${
                      fieldState.error ? "border-red-500" : ""
                    }`}
                  />
                  {fieldState.error && (
                    <p className="text-red-500 text-xs mt-1">
                      {fieldState.error.message}
                    </p>
                  )}
                </div>
              )}
            />

            <FormField
              control={securityForm.control}
              name="confirmPassword"
              render={({ field, fieldState }) => (
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-3 block">
                    Confirm New Password
                  </label>
                  <Input
                    type="password"
                    placeholder="Confirm New Password"
                    {...field}
                    className={`border-gray-300 focus:border-purple-500 bg-[#F9F9F9] ${
                      fieldState.error ? "border-red-500" : ""
                    }`}
                  />
                  {fieldState.error && (
                    <p className="text-red-500 text-xs mt-1">
                      {fieldState.error.message}
                    </p>
                  )}
                </div>
              )}
            />

            <div className="flex justify-end pt-4">
              <Button
                type="submit"
                className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-2 cursor-pointer"
              >
                Update Password
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}

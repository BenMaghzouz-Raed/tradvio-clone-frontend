/* eslint-disable @typescript-eslint/no-explicit-any */
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form } from "@/components/ui/form";
import FormField from "@/components/form/form-field";
import {
  UpdatePasswordFormValues,
  updatePasswordSchema,
} from "@/validation/auth-validation";
import { useState } from "react";
import { changePassword } from "@/services/domain/AuthService";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "@/services/http/LinksService";
import { toastNotification } from "@/lib/toast";

export default function UpdatePasswordForm() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const securityForm = useForm({
    resolver: zodResolver(updatePasswordSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  const handleSecuritySubmit = async (data: UpdatePasswordFormValues) => {
    try {
      setLoading(true);
      await changePassword({
        current_password: data.currentPassword,
        new_password: data.newPassword,
      });
      toastNotification({
        type: "success",
        message: "Password changed succesfully",
      });
      navigate(`/${ROUTES.LOGIN.path}`);
    } catch (err: any) {
      toastNotification({
        type: "error",
        message: err.message,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
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
                  disabled={loading}
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
                  disabled={loading}
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
              disabled={loading}
              type="submit"
              className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-2 cursor-pointer"
            >
              Update Password
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}

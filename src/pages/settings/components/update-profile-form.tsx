import { Button } from "@/components/ui/button";
import { Form, FormField } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ProfileFormValues, profileSchema } from "@/validation/auth-validation";
import { IUser } from "@/types/user-types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useAuth } from "@/hooks/use-auth";
import { useState } from "react";
import { updateCurrentUser } from "@/services/domain/AuthService";
import { toastNotification } from "@/lib/toast";

export default function UpdateProfileForm({
  currentUser,
}: {
  currentUser: IUser;
}) {
  const { refresh } = useAuth();
  const [loading, setLaoding] = useState(false);

  const profileForm = useForm({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      firstName: currentUser?.first_name,
      lastName: currentUser?.last_name,
      timeZone: currentUser?.timezone,
      username: currentUser?.username,
    },
  });

  const handleProfileSubmit = async (data: ProfileFormValues) => {
    try {
      setLaoding(true);
      await updateCurrentUser({
        first_name: data.firstName,
        last_name: data.lastName,
        username: data.username,
        timezone: data.timeZone!,
      });
      toastNotification({
        type: "success",
        message: "Profile updated successfully",
      });
      refresh();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      toastNotification({
        type: "error",
        message: err.message,
      });
    } finally {
      setLaoding(false);
    }
  };

  return (
    <Form {...profileForm}>
      <form
        onSubmit={profileForm.handleSubmit(handleProfileSubmit)}
        className="space-y-4 mb-12"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={profileForm.control}
            name="firstName"
            render={({ field, fieldState }) => (
              <div>
                <label className="text-sm font-medium text-gray-700 mb-3 block">
                  First Name
                </label>
                <Input
                  required
                  placeholder="Your first name"
                  {...field}
                  className="w-full border-gray-300  bg-[#F9F9F9]"
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
            control={profileForm.control}
            name="lastName"
            render={({ field, fieldState }) => (
              <div>
                <label className="text-sm font-medium text-gray-700 mb-3 block">
                  Last Name
                </label>
                <Input
                  required
                  placeholder="Your last name"
                  {...field}
                  className="w-full border-gray-300  bg-[#F9F9F9]"
                />
                {fieldState.error && (
                  <p className="text-red-500 text-xs mt-1">
                    {fieldState.error.message}
                  </p>
                )}
              </div>
            )}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={profileForm.control}
            name="username"
            render={({ field, fieldState }) => (
              <div>
                <label className="text-sm font-medium text-gray-700 mb-3 block">
                  Username
                </label>
                <Input
                  required
                  {...field}
                  className="w-full border-gray-300  bg-[#F9F9F9]"
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
            control={profileForm.control}
            name="timeZone"
            render={({ field, fieldState }) => (
              <div>
                <label className="text-sm font-medium text-gray-700 mb-3 block">
                  Time Zone
                </label>
                <Select
                  required
                  {...field}
                  onValueChange={(e) => field.onChange(e)}
                >
                  <SelectTrigger className="w-full ">
                    <SelectValue placeholder="Select a Time zone" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="UTC-8">UTC-8</SelectItem>
                      <SelectItem value="UTC-7">UTC-7</SelectItem>
                      <SelectItem value="UTC-6">UTC-6</SelectItem>
                      <SelectItem value="UTC-5">UTC-5</SelectItem>
                      <SelectItem value="UTC">UTC</SelectItem>
                      <SelectItem value="UTC+1">UTC+1</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
                {fieldState.error && (
                  <p className="text-red-500 text-xs mt-1">
                    {fieldState.error.message}
                  </p>
                )}
              </div>
            )}
          />
        </div>

        {/* Submit Button */}
        <div className="flex justify-end pt-6">
          <Button
            loading={loading}
            type="submit"
            className="bg-primary text-white px-8 py-2 cursor-pointer"
          >
            Edit
          </Button>
        </div>
      </form>
    </Form>
  );
}

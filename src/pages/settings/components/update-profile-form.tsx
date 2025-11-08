import FormField from "@/components/form/form-field";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
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
import { UserType } from "@/types/user-types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

export default function UpdateProfileForm({
  currentUser,
}: {
  currentUser: UserType;
}) {
  const profileForm = useForm({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      firstName: currentUser?.first_name,
      lastName: currentUser?.last_name,
      gender: "Men",
      country: "Tunisia",
      language: "English",
      timeZone: currentUser?.timezone,
    },
  });

  const handleProfileSubmit = (data: ProfileFormValues) => {
    console.log("Profile updated:", data);
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={profileForm.control}
            name="gender"
            render={({ field }) => (
              <div>
                <label className="text-sm font-medium text-gray-700 mb-3 block">
                  Gender
                </label>
                <Select {...field} onValueChange={(e) => field.onChange(e)}>
                  <SelectTrigger className="w-full ">
                    <SelectValue placeholder="Select a fruit" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="Men">Men</SelectItem>
                      <SelectItem value="Women">Women</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
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
                <Select {...field} onValueChange={(e) => field.onChange(e)}>
                  <SelectTrigger className="w-full ">
                    <SelectValue placeholder="Select a fruit" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="Tunisia">Tunisia</SelectItem>
                      <SelectItem value="USA">USA</SelectItem>
                      <SelectItem value="UK">UK</SelectItem>
                      <SelectItem value="France">France</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            )}
          />
        </div>

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
                  disabled
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
                <Select {...field} onValueChange={(e) => field.onChange(e)}>
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
  );
}

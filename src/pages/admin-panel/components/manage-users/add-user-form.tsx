import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  addUserSchema,
  type AddUserFormValues,
} from "@/validation/auth-validation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toastNotification } from "@/lib/toast";
import { Icons } from "@/components/icons";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function AddUserForm({ onSuccess }: { onSuccess?: () => void }) {
  const [loading, setLoading] = useState(false);

  const form = useForm<AddUserFormValues>({
    resolver: zodResolver(addUserSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      username: "",
      email: "",
      password: "",
      timezone: "UTC",

      role: "user",
    },
  });

  const onSubmit = async (values: AddUserFormValues) => {
    setLoading(true);
    try {
      console.log("Form submitted with:", values);

      toastNotification({
        message: "Form submitted successfully (no backend call yet).",
        type: "success",
      });

      form.reset();
      if (onSuccess) onSuccess();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      toastNotification({
        message: err.message || "Something went wrong.",
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="grid gap-2">
          <Label htmlFor="first-name">First name</Label>
          <Input id="first-name" {...form.register("firstName")} />
          {form.formState.errors.firstName && (
            <p className="text-sm text-red-400">
              {form.formState.errors.firstName.message}
            </p>
          )}
        </div>

        <div className="grid gap-2">
          <Label htmlFor="last-name">Last name</Label>
          <Input id="last-name" {...form.register("lastName")} />
          {form.formState.errors.lastName && (
            <p className="text-sm text-red-400">
              {form.formState.errors.lastName.message}
            </p>
          )}
        </div>
      </div>

      <div className="grid gap-2">
        <Label htmlFor="username">Username</Label>
        <Input id="username" {...form.register("username")} />
        {form.formState.errors.username && (
          <p className="text-sm text-red-400">
            {form.formState.errors.username.message}
          </p>
        )}
      </div>

      <div className="grid gap-2">
        <Label htmlFor="email">Email</Label>
        <Input id="email" type="email" {...form.register("email")} />
        {form.formState.errors.email && (
          <p className="text-sm text-red-400">
            {form.formState.errors.email.message}
          </p>
        )}
      </div>

      <div className="grid gap-2">
        <Label htmlFor="password">Password</Label>
        <Input id="password" type="password" {...form.register("password")} />
        {form.formState.errors.password && (
          <p className="text-sm text-red-400">
            {form.formState.errors.password.message}
          </p>
        )}
      </div>

      <div className="grid gap-2">
        <Label htmlFor="role">Role</Label>
        <Select
          onValueChange={(value) =>
            form.setValue("role", value as "admin" | "user")
          }
          defaultValue={form.getValues("role")}
        >
          <SelectTrigger id="role">
            <SelectValue placeholder="Select a role" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="user">User</SelectItem>
            <SelectItem value="admin">Admin</SelectItem>
          </SelectContent>
        </Select>

        {form.formState.errors.role && (
          <p className="text-sm text-red-400">
            {form.formState.errors.role.message}
          </p>
        )}
      </div>
      <div className="flex justify-end">
        <Button
          type="submit"
          className=" text-[black] bg-[#d5d1d1] w-20 flex items-center justify-center mr-2 hover:bg-gray-400 cursor-pointer"
        >
          Cancel
        </Button>
        <Button
          type="submit"
          className="w-20 flex items-center justify-center cursor-pointer"
          disabled={loading}
        >
          {loading && <Icons.spinner className="h-4 w-4 animate-spin mr-2" />}
          Add User
        </Button>
      </div>
    </form>
  );
}

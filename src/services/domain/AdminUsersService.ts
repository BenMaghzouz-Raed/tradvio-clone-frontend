import http from "@/lib/http";
import type { IUser } from "@/types/user-types";
import type { AddUserFormValues } from "@/validation/auth-validation";

type ApiEnvelope<T> = {
  status: "ok" | "error";
  code: number;
  message?: string;
  data?: T;
  error?: { detail: string; status_code?: number };
};

export async function listUsers(): Promise<IUser[]> {
  const res = (await http.get("/admin/users")) as ApiEnvelope<IUser[]>;
  return (res.data ?? []) as IUser[];
}

export async function createUser(values: AddUserFormValues): Promise<IUser> {
  const payload = {
    email: values.email,
    username: values.username,
    password: values.password,
    first_name: values.firstName || null,
    last_name: values.lastName || null,
    timezone: values.timezone || "UTC",
    role: values.role || "user",
  };
  const res = (await http.post("/admin/users", payload)) as ApiEnvelope<IUser>;
  return res.data as IUser;
}

export async function updateUser(
  user_id: string,
  values: Partial<
    Pick<
      AddUserFormValues,
      "firstName" | "lastName" | "username" | "email" | "timezone" | "role" | "password"
    >
  > & { status?: "active" | "suspended" | "deleted" }
): Promise<IUser> {
  const payload: Record<string, unknown> = {};
  if (values.email !== undefined) payload.email = values.email;
  if (values.username !== undefined) payload.username = values.username;
  if (values.firstName !== undefined) payload.first_name = values.firstName;
  if (values.lastName !== undefined) payload.last_name = values.lastName;
  if (values.timezone !== undefined) payload.timezone = values.timezone;
  if (values.role !== undefined) payload.role = values.role;
  if (values.status !== undefined) payload.status = values.status;
  if (values.password !== undefined && values.password) payload.password = values.password;

  const res = (await http.patch(`/admin/user/${user_id}`, payload)) as ApiEnvelope<IUser>;
  return res.data as IUser;
}

export async function deleteUser(user_id: string): Promise<void> {
  await http.delete(`/admin/user/${user_id}`);
}

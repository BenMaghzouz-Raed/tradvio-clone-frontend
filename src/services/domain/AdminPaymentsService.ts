import http from "@/lib/http";

export type AdminSubscription = {
  id: string;
  user_id: string;
  plan_name: string;
  status: string; // "active" | ...
  start_date?: string;
  end_date?: string | null;
  price?: number;
  profit?: number;
};

export async function listAllSubscriptions(): Promise<AdminSubscription[]> {
  // Backend returns a plain list of subscriptions
  const res = (await http.get("/admin/payments")) as AdminSubscription[];
  return Array.isArray(res) ? res : [];
}

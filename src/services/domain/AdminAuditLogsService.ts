import http from "@/lib/http";
import type { ILog } from "@/types/log-type";

type ApiEnvelope<T> = {
  status: "ok" | "error";
  code: number;
  message?: string;
  data?: T;
  error?: { detail: string; status_code?: number };
};

// Backend currently returns a plain list (not Envelope) for /admin/Audit_Logs
export async function listAuditLogs(): Promise<ILog[]> {
  const res = (await http.get("/admin/Audit_Logs")) as ILog[] | ApiEnvelope<ILog[]>;
  // If backend later wraps with Envelope, handle both shapes gracefully
  if (Array.isArray(res)) return res as ILog[];
  const env = res as ApiEnvelope<ILog[]>;
  return (env.data ?? []) as ILog[];
}

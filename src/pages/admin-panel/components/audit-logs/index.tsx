import { ILog, LogAction } from "@/types/log-type";
import { useEffect, useMemo, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { listAuditLogs } from "@/services/domain/AdminAuditLogsService";
import { CircleAlert, CircleCheck, CircleX, TriangleAlert } from "lucide-react";
import { formatDate } from "@/lib/utils";

function actionColor(action: LogAction | string | undefined) {
  switch (action) {
    case "POST":
      return { bubble: "bg-green-100 text-green-600", icon: <CircleCheck className="w-4 h-4" /> };
    case "PATCH":
      return { bubble: "bg-yellow-100 text-yellow-600", icon: <TriangleAlert className="w-4 h-4" /> };
    case "DELETE":
      return { bubble: "bg-red-100 text-red-600", icon: <CircleX className="w-4 h-4" /> };
    default:
      return { bubble: "bg-blue-100 text-blue-600", icon: <CircleAlert className="w-4 h-4" /> };
  }
}

function describeValues(values: unknown): string {
  if (!values) return "";
  if (typeof values === "string") return values;
  try {
    const obj = values as Record<string, unknown>;
    const pairs = Object.entries(obj).map(([k, v]) => `${k}: ${String(v)}`);
    return pairs.join(", ");
  } catch {
    try {
      return JSON.stringify(values);
    } catch {
      return String(values);
    }
  }
}

export default function AuditLogs() {
  const [rows, setRows] = useState<ILog[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const data = await listAuditLogs();
        setRows(data);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    void load();
  }, []);

  const items = useMemo(() => rows, [rows]);

  return (
    <Card className="shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between pb-4">
        <CardTitle className="text-lg text-neutral-800">Audit Logs</CardTitle>
      </CardHeader>

      <CardContent className="p-0">
        {loading ? (
          <div className="p-6 text-sm text-neutral-500">Loading...</div>
        ) : (
          <ul className="divide-y divide-neutral-100">
            {items.map((log) => {
              const color = actionColor(log.action);
              const userName = log.user?.username || "Unknown User";
              const userEmail = log.user?.email ? ` (${log.user.email})` : "";
              const description = describeValues(log.values);
              const entity = log.entity_type || "-";
              const ip = log.ip_address || "-";
              const created = log.created_at ? formatDate(new Date(log.created_at)) : "-";

              return (
                <li key={log.log_id} className="flex justify-between items-start p-4">
                  <div className="flex items-start gap-3">
                    <span className={`w-8 h-8 rounded-full flex items-center justify-center ${color.bubble}`}>
                      {color.icon}
                    </span>
                    <div>
                      <p className="font-medium text-neutral-800">
                        {log.action} • {entity}
                      </p>
                      {description ? (
                        <p className="text-sm text-neutral-500 break-words max-w-[52ch]">{description}</p>
                      ) : null}
                      <div className="mt-1 flex flex-wrap items-center gap-2 text-xs text-neutral-500">
                        <span>by {userName}{userEmail}</span>
                        <span className="px-2 py-0.5 bg-neutral-100 rounded">IP {ip}</span>
                        {log.entity_id ? (
                          <span className="px-2 py-0.5 bg-neutral-100 rounded">ID {log.entity_id}</span>
                        ) : null}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <time className="text-xs text-neutral-400 whitespace-nowrap">{created}</time>
                    <div className="w-2 h-2 rounded-full bg-[#3B82F6]" />
                  </div>
                </li>
              );
            })}
            {items.length === 0 && !loading ? (
              <li className="p-6 text-sm text-neutral-500">No audit logs available.</li>
            ) : null}
          </ul>
        )}
      </CardContent>
    </Card>
  );
}

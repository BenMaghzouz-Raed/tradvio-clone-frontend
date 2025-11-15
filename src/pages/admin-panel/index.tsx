import StatsCard from "@/components/stats-card";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ManageUsers from "./components/manage-users";
import AuditLogs from "./components/audit-logs";
import Security from "./components/security";
import GeneralSettings from "./components/general-settings";
import { useEffect, useMemo, useState } from "react";
import { listUsers } from "@/services/domain/AdminUsersService";
import { listAuditLogs } from "@/services/domain/AdminAuditLogsService";
import { listAllSubscriptions } from "@/services/domain/AdminPaymentsService";
import { Users, UserPlus, ReceiptText, FileBarChart2 } from "lucide-react";

export default function AdminPanel() {
  const tabs = [
    {
      title: "Manage Users",
      component: <ManageUsers />,
      key: "manageUsers",
    },
    {
      title: "Audit Logs",
      component: <AuditLogs />,
      key: "auditLogs",
    },
    {
      title: "Subscription Plans",
      component: <Card>subscription plan</Card>,
      key: "subscriptionPlan",
    },
    { title: "Security", component: <Security />, key: "security" },
    {
      title: "General Settings",
      component: <GeneralSettings />,
      key: "generalSettings",
    },
  ];

  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState<any[]>([]);
  const [logs, setLogs] = useState<any[]>([]);
  const [subs, setSubs] = useState<any[]>([]);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const [u, l, s] = await Promise.all([
          listUsers(),
          listAuditLogs(),
          listAllSubscriptions(),
        ]);
        setUsers(u || []);
        setLogs(l || []);
        setSubs(s || []);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const stats = useMemo(() => {
    const totalUsers = users.length;
    const last7d = new Date();
    last7d.setDate(last7d.getDate() - 7);
    const newUsers = users.filter((u) => new Date(u.created_at) >= last7d).length;
    const activeSubs = subs.filter((s) => String(s.status).toLowerCase() === "active").length;
    const auditLast7d = logs.filter((l) => new Date(l.created_at) >= last7d).length;
    return { totalUsers, newUsers, activeSubs, auditLast7d };
  }, [users, subs, logs]);

  return (
    <main className="space-y-6">
      <div className="flex flex-wrap justify-around gap-4 mb-4">
        <StatsCard label="Total Users" value={String(stats.totalUsers)} icon={<Users className="h-5 w-5" />} />
        <StatsCard label="New Users (7d)" value={String(stats.newUsers)} icon={<UserPlus className="h-5 w-5" />} variant="success" />
        <StatsCard label="Active Subscriptions" value={String(stats.activeSubs)} icon={<ReceiptText className="h-5 w-5" />} />
        <StatsCard label="Audit Events (7d)" value={String(stats.auditLast7d)} icon={<FileBarChart2 className="h-5 w-5" />} />
      </div>

      <Tabs defaultValue="auditLogs">
        <div className="relative">
          <TabsList
            className="
              flex w-full overflow-x-auto scrollbar-hide
              whitespace-nowrap justify-start
              border-b border-border rounded-md
            "
          >
            {tabs.map((tab) => (
              <TabsTrigger
                key={tab.key}
                value={tab.key}
                className="flex-shrink-0 px-4"
              >
                {tab.title}
              </TabsTrigger>
            ))}
          </TabsList>
        </div>

        {tabs.map((tab) => (
          <TabsContent key={tab.key} value={tab.key}>
            {tab.component}
          </TabsContent>
        ))}
      </Tabs>
    </main>
  );
}

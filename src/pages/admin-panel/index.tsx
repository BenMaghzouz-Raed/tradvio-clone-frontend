import StatsCard from "@/components/stats-card";
import Notifications from "./components/notifications";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ManageUsers from "./components/manage-users";
import AuditLogs from "./components/audit-logs";
import { logs } from "@/seeds/logs";

export default function AdminPanel() {
  const tabs = [
    { title: "Overview", component: <Notifications />, key: "overview" },
    {
      title: "Manage Users",
      component: <ManageUsers />,
      key: "manageUsers",
    },
    {
      title: "Audit Logs",
      component: <AuditLogs data={logs} />,
      key: "auditLogs",
    },
    {
      title: "Subscription Plans",
      component: <Card>subscription plan</Card>,
      key: "subscriptionPlan",
    },
    { title: "Security", component: <Card>security</Card>, key: "security" },
    {
      title: "General Settings",
      component: <Card>general settings</Card>,
      key: "generalSettings",
    },
  ];

  return (
    <main className="space-y-6">
      <div className="flex flex-wrap justify-around gap-4 mb-4">
        <StatsCard label="Total Users" value="10" />
        <StatsCard label="New Users" value="3" />
        <StatsCard label="Subscribed Users" value="4" />
        <StatsCard label="Total Trade Analysis" value="60%" />
      </div>

      <Tabs defaultValue="overview">
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

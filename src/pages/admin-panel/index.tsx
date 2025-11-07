import StatsCard from "@/components/stats-card";
import Notifications from "./components/notifications";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function AdminPanel() {
  const tabs = [
    { title: "Overview", component: <Notifications />, key: "overview" },
    {
      title: "Manage Users",
      component: <Card>ManageUser card</Card>,
      key: "manageUsers",
    },
    {
      title: "Audit Logs",
      component: <Card>audit logs card</Card>,
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
      {/* Stats Section */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        <StatsCard label="Total Users" value="10" />
        <StatsCard label="New Users" value="3" />
        <StatsCard label="Subscribed Users" value="4" />
        <StatsCard label="Total Trade Analysis" value="60%" />
      </section>

      <Tabs defaultValue="overview">
        <TabsList>
          {tabs.map((tab) => (
            <TabsTrigger value={tab.key}>{tab.title}</TabsTrigger>
          ))}
        </TabsList>
        {tabs.map((tab) => (
          <TabsContent value={tab.key}>{tab.component}</TabsContent>
        ))}
      </Tabs>
    </main>
  );
}

import { Outlet } from "react-router";
import { AppHeader } from "./app-header";
import { SidebarProvider } from "./ui/sidebar";
import { AppSidebar } from "./app-sidebar";
import { useRoute } from "@/hooks/use-route";

export function AppLayout() {
  const route = useRoute();
  return (
    <SidebarProvider>
      <AppSidebar />
      <div className="min-h-screen flex flex-col w-full ~bg-muted/50">
        <AppHeader title={route?.title} />
        <div className="w-full flex flex-grow flex-col">
          <div className="flex flex-grow flex-col sm:px-8 sm:py-4 px-4 py-2">
            <Outlet />
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
}

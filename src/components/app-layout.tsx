import { Outlet } from "react-router";
import { AppHeader } from "./app-header";
import { SidebarProvider, SidebarTrigger } from "./ui/sidebar";
import { AppSidebar } from "./app-sidebar";
import { useRoute } from "@/hooks/use-route";

export function AppLayout() {
  const route = useRoute();

  return (
    <SidebarProvider>
      <AppSidebar />
      <div className="min-h-screen flex flex-col w-full ~bg-muted/50">
        <AppHeader title={route?.title!} />
        <div className="w-full max-w-7xl flex flex-grow flex-col">
          <div className="flex flex-grow flex-col p-4">
            <Outlet />
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
}

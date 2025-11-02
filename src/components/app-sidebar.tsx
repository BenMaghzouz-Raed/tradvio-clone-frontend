import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { ROUTES } from "@/services/LinksService";
import Dashboard from "./icons/dashboard";
import Analyser from "./icons/analyser";
import Journal from "./icons/journal";
import History from "./icons/history";
import Subscription from "./icons/susbscription";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { useRoute } from "@/hooks/use-route";

const SIDEBAR_MENU_ITEMS = [
  {
    title: ROUTES.DASHBOARD.title,
    url: ROUTES.DASHBOARD.path,
    icon: Dashboard,
  },
  {
    title: ROUTES.ANALYSER.title,
    url: ROUTES.ANALYSER.path,
    icon: Analyser,
  },
  { title: ROUTES.JOURNAL.title, url: ROUTES.JOURNAL.path, icon: Journal },
  { title: ROUTES.HISTORY.title, url: ROUTES.HISTORY.path, icon: History },
  {
    title: ROUTES.SUBSCRIPTION.title,
    url: ROUTES.SUBSCRIPTION.path,
    icon: Subscription,
  },
];

export function AppSidebar() {
  // TODO: change the background of active item based on useRoute
  const route = useRoute();

  return (
    <Sidebar>
      <SidebarHeader className="border-b-white border-b-1 py-2">
        <h1 className="text-white my-1">Brand Logo</h1>
      </SidebarHeader>
      <SidebarContent className="pt-3">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {SIDEBAR_MENU_ITEMS.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    className={cn(
                      "hover:bg-card-foreground active:bg-card-foreground",
                      route?.path === item.url && "bg-card-foreground"
                    )}
                  >
                    <Link to={item.url}>
                      <item.icon />
                      <span className="text-white">{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter></SidebarFooter>
    </Sidebar>
  );
}

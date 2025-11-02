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
import Help from "./icons/help";
import Settings from "./icons/settings";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import Options from "./icons/options";

// TODO: change to using useAuth (getting actual user)
const CURRENT_USER = {
  image: "/avatars/person.png",
  email: "Luissilvery@gmail.com",
  firstName: "Actadium",
  lastName: "by Shadcn",
};

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
  // TODO: change the help link
  const route = useRoute();

  return (
    <Sidebar>
      <SidebarHeader className="border-b-white border-b-1 py-2">
        <Link to={ROUTES.DASHBOARD.path} className="cursor-pointer w-fit">
          <h1 className="text-white my-1">Brand Logo</h1>
        </Link>
      </SidebarHeader>
      <SidebarContent className="pt-3 justify-between">
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
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem key={"settings"}>
                <SidebarMenuButton
                  asChild
                  className={cn(
                    "hover:bg-card-foreground active:bg-card-foreground",
                    route?.path === "settings" && "bg-card-foreground"
                  )}
                >
                  <Link to={ROUTES.SETTINGS.path}>
                    <Settings />
                    <span className="text-white">{ROUTES.SETTINGS.title}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>

              <SidebarMenuItem key={"help"}>
                <SidebarMenuButton
                  asChild
                  className={cn(
                    "hover:bg-card-foreground active:bg-card-foreground",
                    route?.path === "help" && "bg-card-foreground"
                  )}
                >
                  <Link to={ROUTES.SETTINGS.path}>
                    <Help />
                    <span className="text-white">{ROUTES.SETTINGS.title}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="mb-8">
        {/* maybe this should be a link to profile  */}
        <div className="flex items-center justify-between px-2">
          <div className="flex gap-2">
            <Avatar>
              <AvatarImage src={CURRENT_USER.image} />
            </Avatar>
            <div>
              <h3 className="text-white font-semibold text-sm">{`${CURRENT_USER.firstName} ${CURRENT_USER.lastName}`}</h3>
              <h4 className="text-white font-normal text-xs">
                {CURRENT_USER.email}
              </h4>
            </div>
          </div>
          <Popover>
            <PopoverTrigger>
              <Options />
            </PopoverTrigger>
            <PopoverContent>this is content to be filled</PopoverContent>
          </Popover>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}

/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */
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
import { CircleQuestionMark } from "lucide-react";
import { ROUTES } from "@/services/LinksService";
import { Link, useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import { useRoute } from "@/hooks/use-route";
import { Avatar } from "./ui/avatar";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Button } from "./ui/button";
import { logout } from "@/services/domain/AuthService";
import { useAuth } from "@/hooks/use-auth";
import InitialsAvatar from "./initials-avatar";
import {
  ChartBar,
  EllipsisVertical,
  FileArchive,
  FileClock,
  LayoutDashboard,
  Settings,
  Users,
} from "lucide-react";

const SIDEBAR_MENU_ITEMS = [
  {
    title: ROUTES.DASHBOARD.title,
    url: ROUTES.DASHBOARD.path,
    icon: LayoutDashboard,
  },
  {
    title: ROUTES.ANALYSER.title,
    url: ROUTES.ANALYSER.path,
    icon: ChartBar,
  },
  {
    title: ROUTES.JOURNAL.title,
    url: ROUTES.JOURNAL.path,
    icon: FileArchive,
  },
  { title: ROUTES.HISTORY.title, url: ROUTES.HISTORY.path, icon: FileClock },
  {
    title: ROUTES.SUBSCRIPTION.title,
    url: ROUTES.SUBSCRIPTION.path,
    icon: Users,
  },
];

export function AppSidebar() {
  // TODO: change the help link
  const route = useRoute();
  const { currentUser } = useAuth();
  const navigate = useNavigate();

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
                      <item.icon color="white" />
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
              <SidebarMenuItem key={"admin"}>
                <SidebarMenuButton
                  asChild
                  className={cn(
                    "hover:bg-card-foreground active:bg-card-foreground",
                    route?.path === "help" && "bg-card-foreground"
                  )}
                >
                  <Link to={ROUTES.ADMIN.path}>
                    <CircleQuestionMark color="white" />
                    <span className="text-white">{ROUTES.ADMIN.title}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>

              <SidebarMenuItem key={"settings"}>
                <SidebarMenuButton
                  asChild
                  className={cn(
                    "hover:bg-card-foreground active:bg-card-foreground",
                    route?.path === "settings" && "bg-card-foreground"
                  )}
                >
                  <Link to={ROUTES.SETTINGS.path}>
                    <Settings color="white" />
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
                    <CircleQuestionMark color="white" />
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
              <InitialsAvatar
                firstName={currentUser?.first_name!}
                lastName={currentUser?.last_name!}
              />
            </Avatar>
            <div>
              <h3 className="text-white font-semibold text-sm">{`${currentUser?.first_name} ${currentUser?.last_name}`}</h3>
              <h4 className="text-white font-normal text-xs">
                {currentUser?.email}
              </h4>
            </div>
          </div>
          <Popover>
            <PopoverTrigger>
              <EllipsisVertical
                className="cursor-pointer w-4 h-4"
                color="white"
              />
            </PopoverTrigger>
            <PopoverContent className="p-1">
              <div>
                <Button
                  className="w-full cursor-pointer"
                  variant="ghost"
                  onClick={() =>
                    logout().then(() => navigate(`/${ROUTES.LOGIN.path}`))
                  }
                >
                  Logout
                </Button>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}

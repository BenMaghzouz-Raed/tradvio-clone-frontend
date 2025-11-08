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
import { CircleQuestionMark, ShieldUser } from "lucide-react";
import { ROUTES } from "@/services/LinksService";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { useRoute } from "@/hooks/use-route";
import { Avatar } from "./ui/avatar";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Button } from "./ui/button";
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
import { v4 as uuidv4 } from "uuid";
import { useAuth } from "@/hooks/use-auth";

const SIDEBAR_MENU_ITEMS = [
  {
    route: ROUTES.DASHBOARD,
    icon: LayoutDashboard,
  },
  {
    route: ROUTES.ANALYSER,
    icon: ChartBar,
  },
  {
    route: ROUTES.JOURNAL,
    icon: FileArchive,
  },
  { route: ROUTES.HISTORY, icon: FileClock },
  {
    route: ROUTES.SUBSCRIPTION,
    icon: Users,
  },
];

const SIDEBAR_SECODARY_MENU_ITEMS = [
  {
    route: ROUTES.ADMIN,
    icon: ShieldUser,
  },
  {
    route: ROUTES.HELP,
    icon: CircleQuestionMark,
  },
  {
    route: ROUTES.SETTINGS,
    icon: Settings,
  },
];

export function AppSidebar() {
  // TODO: change the help link
  const route = useRoute();
  const { currentUser, logout } = useAuth();

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
              {SIDEBAR_MENU_ITEMS.map(
                (item) =>
                  item.route.roles.includes(currentUser?.role!) && (
                    <SidebarMenuItem key={uuidv4()}>
                      <SidebarMenuButton
                        asChild
                        className={cn(
                          "hover:bg-card-foreground active:bg-card-foreground",
                          route?.path === item.route.path &&
                            "bg-card-foreground"
                        )}
                      >
                        <Link to={item.route.path}>
                          <item.icon color="white" />
                          <span className="text-white">{item.route.title}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  )
              )}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {SIDEBAR_SECODARY_MENU_ITEMS.map((item) =>
                item.route.roles.includes(currentUser?.role!) ? (
                  <SidebarMenuItem key={uuidv4()}>
                    <SidebarMenuButton
                      asChild
                      className={cn(
                        "hover:bg-card-foreground active:bg-card-foreground",
                        route?.path === item.route.path && "bg-card-foreground"
                      )}
                    >
                      <Link to={item.route.path}>
                        <item.icon color="white" />
                        <span className="text-white">{item.route.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ) : null
              )}
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
                  onClick={() => logout()}
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

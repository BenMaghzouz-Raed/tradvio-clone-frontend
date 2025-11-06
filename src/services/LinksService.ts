import { RouteType } from "@/types/route-type";

export const ROUTES: {
  LOGIN: RouteType;
  REGISTER: RouteType;
  DASHBOARD: RouteType;
  ANALYSER: RouteType;
  HISTORY: RouteType;
  JOURNAL: RouteType;
  SETTINGS: RouteType;
  SUBSCRIPTION: RouteType;
} = {
  LOGIN: {
    path: "login",
    title: undefined,
    authenticated: false,
    role: undefined,
  },
  REGISTER: {
    path: "register",
    title: undefined,
    authenticated: false,
    role: undefined,
  },
  DASHBOARD: {
    path: "",
    title: "Dashboard",
    authenticated: true,
    role: "user",
  },
  ANALYSER: {
    path: "analyser",
    title: "Trade Analyzer",
    authenticated: true,
    role: "user",
  },
  HISTORY: {
    path: "history",
    title: "Analysis History",
    authenticated: true,
    role: "user",
  },
  JOURNAL: {
    path: "journal",
    title: "Trade Journal",
    authenticated: true,
    role: "user",
  },

  SETTINGS: {
    path: "settings",
    title: "Settings",
    authenticated: true,
    role: "user",
  },
  SUBSCRIPTION: {
    path: "subscribe",
    title: "Subscription Plan",
    authenticated: true,
    role: "user",
  },
};

export const getRoute = (pathname: string) => {
  return Object.values(ROUTES).find(
    (item) => item.path === pathname || `/${item.path}` === pathname
  );
};

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
    protected: false,
    role: undefined,
  },
  REGISTER: {
    path: "register",
    title: undefined,
    protected: false,
    role: undefined,
  },
  DASHBOARD: {
    path: "",
    title: "Dashboard",
    protected: true,
    role: "user",
  },
  ANALYSER: {
    path: "analyser",
    title: "Trade Analyzer",
    protected: true,
    role: "user",
  },
  HISTORY: {
    path: "history",
    title: "Analysis History",
    protected: true,
    role: "user",
  },
  JOURNAL: {
    path: "journal",
    title: "Trade Journal",
    protected: true,
    role: "user",
  },

  SETTINGS: {
    path: "settings",
    title: "Settings",
    protected: true,
    role: "user",
  },
  SUBSCRIPTION: {
    path: "subscribe",
    title: "Subscription Plan",
    protected: true,
    role: "user",
  },
};

export const getRoute = (pathname: string) => {
  return Object.values(ROUTES).find(
    (item) => item.path === pathname || `/${item.path}` === pathname
  );
};

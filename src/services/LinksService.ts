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
  LOGIN: { path: "login", title: undefined, authenticated: false },
  REGISTER: { path: "register", title: undefined, authenticated: false },
  DASHBOARD: { path: "", title: "Dashboard", authenticated: true },
  ANALYSER: { path: "analyser", title: "Trade Analyzer", authenticated: true },
  HISTORY: { path: "history", title: "Analysis History", authenticated: true },
  TRADEJOURNAL: { path: "journal", title: "Trade Journal", authenticated: true },

  SETTINGS: {
    path: "settings",
    title: "Settings",
    authenticated: true,
  },
  SUBSCRIPTION: {
    path: "subscribe",
    title: "Subscription Plan",
    authenticated: true,
  },
};

export const getRoute = (pathname: string) => {
  return Object.values(ROUTES).find(
    (item) => item.path === pathname || `/${item.path}` === pathname
  );
};

import { RouteType } from "@/types/route-type";

export const ROUTES: {
  LOGIN: RouteType;
  ADMIN: RouteType;
  REGISTER: RouteType;
  DASHBOARD: RouteType;
  ANALYSER: RouteType;
  HISTORY: RouteType;
  JOURNAL: RouteType;
  SETTINGS: RouteType;
  SUBSCRIPTION: RouteType;
  FORGOT_PASSWORD: RouteType;
  RESET_PASSWORD: RouteType;
} = {
  LOGIN: {
    path: "login",
    title: undefined,
    protected: false,
    roles: [],
  },
  REGISTER: {
    path: "register",
    title: undefined,
    protected: false,
    roles: [],
  },
  FORGOT_PASSWORD: {
    path: "forgot-password",
    title: "Forgot Password",
    protected: false,
    roles: [],
  },
  RESET_PASSWORD: {
    path: "reset-password",
    title: "Reset Password",
    protected: false,
    roles: [],
  },
  DASHBOARD: {
    path: "",
    title: "Dashboard",
    protected: true,
    roles: ["user", "admin"],
  },
  ANALYSER: {
    path: "analyser",
    title: "Trade Analyzer",
    protected: true,
    roles: ["user", "admin"],
  },
  HISTORY: {
    path: "history",
    title: "Analysis History",
    protected: true,
    roles: ["user", "admin"],
  },
  JOURNAL: {
    path: "journal",
    title: "Trade Journal",
    protected: true,
    roles: ["user", "admin"],
  },

  SETTINGS: {
    path: "settings",
    title: "Settings",
    protected: true,
    roles: ["user", "admin"],
  },
  SUBSCRIPTION: {
    path: "subscribe",
    title: "Subscription Plan",
    protected: true,
    roles: ["user", "admin"],
  },
  ADMIN: {
    path: "admin",
    title: "Admin Panel",
    protected: true,
    roles: ["admin"],
  },
};

export const getRoute = (pathname: string) => {
  return Object.values(ROUTES).find(
    (item) => item.path === pathname || `/${item.path}` === pathname
  );
};

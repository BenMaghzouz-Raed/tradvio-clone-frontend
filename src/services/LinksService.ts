export const ROUTES = {
  LOGIN: { path: "/login", title: null },
  REGISTER: { path: "/register", title: null },
  DASHBOARD: { path: "/", title: "Dashboard" },
  ANALYSER: { path: "analyser", title: "Trade Analyzer" },
  HISTORY: { path: "history", title: "Analysis History" },
  JOURNAL: { path: "journal", title: "Trade Journal" },
  SUBSCRIPTION: { path: "subscribe", title: "Subscription Plan" },
};

export const getRoute = (pathname: string) => {
  return Object.values(ROUTES).find(
    (item) => item.path === pathname || `/${item.path}` === pathname
  );
};

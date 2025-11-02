export const ROUTES = {
  LOGIN: { path: "login", title: null, authenticated: false },
  REGISTER: { path: "register", title: null, authenticated: false },
  DASHBOARD: { path: "", title: "Dashboard", authenticated: true },
  ANALYSER: { path: "analyser", title: "Trade Analyzer", authenticated: true },
  HISTORY: { path: "history", title: "Analysis History", authenticated: true },
  JOURNAL: { path: "journal", title: "Trade Journal", authenticated: true },
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

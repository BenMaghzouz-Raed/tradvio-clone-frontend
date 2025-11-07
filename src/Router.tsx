import { Routes, Route } from "react-router-dom";
import { AppLayout } from "./components/app-layout";
import NotMatch from "./pages/NotMatch";
import Dashboard from "./pages/dashboard";
import Analyser from "./pages/analyser";
import History from "./pages/History";
import { ROUTES } from "./services/LinksService";
import Register from "./pages/Register";
import Subscription from "./pages/Subscription";
import LogIn from "./pages/login/LogIn";
import Settings from "./pages/Settings";
import TradeJournal from "./pages/trade-journal";

export default function Router() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route path={ROUTES.DASHBOARD.path} element={<Dashboard />} />
        <Route path={ROUTES.ANALYSER.path} element={<Analyser />} />
        <Route path={ROUTES.HISTORY.path} element={<History />} />
        <Route path={ROUTES.JOURNAL.path} element={<TradeJournal />} />
        <Route path={ROUTES.SUBSCRIPTION.path} element={<Subscription />} />
        <Route path={ROUTES.SETTINGS.path} element={<Settings />} />
      </Route>
      <Route path={ROUTES.LOGIN.path} element={<LogIn />} />
      <Route path={ROUTES.REGISTER.path} element={<Register />} />
      <Route path="*" element={<NotMatch />} />
    </Routes>
  );
}

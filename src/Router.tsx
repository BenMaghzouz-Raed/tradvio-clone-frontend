import { Routes, Route } from "react-router-dom";
import { AppLayout } from "./components/app-layout";
import NotMatch from "./pages/NotMatch";
import Dashboard from "./pages/dashboard";
import Analyser from "./pages/analyser";
import History from "./pages/history";
import { ROUTES } from "./services/LinksService";
import Register from "./pages/auth/register";
import Subscription from "./pages/subscription";
import LogIn from "./pages/auth/login";
import Settings from "./pages/settings";
import TradeJournal from "./pages/trade-journal";
import AdminPanel from "./pages/admin-panel";
import ForgotPassword from "./pages/auth/forgot-password";
import ResetPassword from "./pages/auth/reset-password";

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
        <Route path={ROUTES.ADMIN.path} element={<AdminPanel />} />
      </Route>
      <Route path={ROUTES.FORGOTPASSWORD.path} element={<ForgotPassword />} />
      <Route path={ROUTES.RESETPASSWORD.path} element={<ResetPassword />} />
      <Route path={ROUTES.LOGIN.path} element={<LogIn />} />
      <Route path={ROUTES.REGISTER.path} element={<Register />} />
      <Route path="*" element={<NotMatch />} />
    </Routes>
  );
}

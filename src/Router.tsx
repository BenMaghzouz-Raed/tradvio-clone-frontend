import { Routes, Route } from "react-router-dom";
import { AppLayout } from "./components/app-layout";
import NotMatch from "./pages/NotMatch";
import Dashboard from "./pages/Dashboard";
import Analyser from "./pages/Analyser";
import History from "./pages/History";
import Journal from "./pages/Journal";
import { ROUTES } from "./services/LinksService";
import LogIn from "./pages/Login";
import Register from "./pages/Register";
import Subscription from "./pages/Subscription";

export default function Router() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route path={ROUTES.DASHBOARD.path} element={<Dashboard />} />
        <Route path={ROUTES.ANALYSER.path} element={<Analyser />} />
        <Route path={ROUTES.HISTORY.path} element={<History />} />
        <Route path={ROUTES.JOURNAL.path} element={<Journal />} />
        <Route path={ROUTES.SUBSCRIPTION.path} element={<Subscription />} />
        <Route path={ROUTES.LOGIN.path} element={<LogIn />} />
        <Route path={ROUTES.REGISTER.path} element={<Register />} />
        <Route path="*" element={<NotMatch />} />
      </Route>
    </Routes>
  );
}

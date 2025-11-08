import { BrowserRouter, HashRouter } from "react-router";
import { ThemeProvider } from "./contexts/ThemeContext";
import Router from "./Router";
import { ToastProvider } from "./providers/ToastProvider";

const AppRouter =
  import.meta.env.VITE_USE_HASH_ROUTE === "true" ? HashRouter : BrowserRouter;

export default function App() {
  return (
    <ThemeProvider>
      <ToastProvider>
        <AppRouter>
          <Router />
        </AppRouter>
      </ToastProvider>
    </ThemeProvider>
  );
}

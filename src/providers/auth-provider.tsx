/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { UserType } from "@/types/user-types";
import { useState, useEffect, ReactNode } from "react";
import {
  getCurrentUser,
  login as loginCall,
  logout as logoutCall,
  refresh,
} from "@/services/domain/AuthService";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "@/services/LinksService";
import { toastNotification } from "@/lib/toast";
import { useRoute } from "@/hooks/use-route";
import { AuthContext, AuthContextType } from "@/contexts/auth-context";

export function AuthProvider({ children }: { children: ReactNode }) {
  const [currentUser, setCurrentUser] = useState<UserType | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const route = useRoute();

  const protectRoute = (user?: UserType) => {
    if (!route?.protected && user) {
      navigate(`/${ROUTES.DASHBOARD.path}`);
    } else if (
      user?.role &&
      !route?.roles.includes(user?.role!) &&
      route?.protected
    ) {
      navigate(`/${ROUTES.DASHBOARD.path}`);
    } else if (!user && route?.protected) {
      navigate(`/${ROUTES.LOGIN.path}`);
    }
  };

  // TODO: enhance this part
  const fetchUser = async () => {
    getCurrentUser()
      .then((res) => {
        setCurrentUser(res.data.user);
        protectRoute(res.data.user);
      })
      .catch(() => {
        refresh()
          .then(() => {
            getCurrentUser()
              .then((res) => {
                setCurrentUser(res.data.user);
                protectRoute(res.data.user);
              })
              .catch(() => {
                protectRoute(undefined);
              });
          })
          .catch(() => {
            protectRoute(undefined);
          });
      });
  };

  // TODO: add a timer to fetch user every minute or so
  useEffect(() => {
    fetchUser().then(() => setLoading(false));
  }, []);

  async function login(username: string, password: string) {
    try {
      setLoading(true);
      const response = await loginCall({ username, password });
      localStorage.setItem(
        import.meta.env.VITE_ACCESS_TOKEN_TAG || "access_token",
        response.data.access_token
      );
      navigate(`/${ROUTES.DASHBOARD.path}`);
    } catch (err: any) {
      toastNotification({
        message: err.message,
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  }

  async function logout() {
    await logoutCall();
    localStorage.removeItem(
      import.meta.env.VITE_ACCESS_TOKEN_TAG || "access_token"
    );
    navigate(`/${ROUTES.LOGIN.path}`);
    return;
  }

  const value: AuthContextType = {
    currentUser,
    login,
    logout,
    isAuthenticated: !!currentUser,
    loading,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { IUser } from "@/types/user-types";
import { useState, useEffect, ReactNode } from "react";
import {
  getCurrentUser,
  login as loginCall,
  logout as logoutCall,
  refresh,
} from "@/services/domain/AuthService";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "@/services/http/LinksService";
import { toastNotification } from "@/lib/toast";
import { useRoute } from "@/hooks/use-route";
import { AuthContext, AuthContextType } from "@/contexts/auth-context";
import { getOrThrow } from "@/config";

export function AuthProvider({ children }: { children: ReactNode }) {
  const [currentUser, setCurrentUser] = useState<IUser | null>(null);

  const navigate = useNavigate();
  const route = useRoute();

  const protectRoute = (user?: IUser) => {
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
    //fetchUser().then(() => setLoading(false));
    setCurrentUser({
      avatar_url: "",
      first_name: "nacef",
      last_name: "rhayem",
      role: "admin",
      username: "nacefrhayem",
      email: "nacefrhayem@gmail.com",
      timezone: "UTC",
      user_id: "user_id",
      email_verified: true,
      created_at: new Date(),
      last_login: new Date(),
      status: "active",
      updated_at: new Date(),
    });
  }, []);

  async function login(username: string, password: string) {
    try {
      const response = await loginCall({ username, password });
      localStorage.setItem(
        getOrThrow<string>("ACCESS_TOKEN_TAG") || "access_token",
        response.data.access_token
      );
      await fetchUser();
      navigate(`/${ROUTES.DASHBOARD.path}`);
    } catch (err: any) {
      toastNotification({
        message: err.message,
        type: "error",
      });
    }
  }

  async function logout() {
    await logoutCall();
    localStorage.removeItem(
      getOrThrow<string>("ACCESS_TOKEN_TAG") || "access_token"
    );
    setCurrentUser(null);
    navigate(`/${ROUTES.LOGIN.path}`);
    return;
  }

  const value: AuthContextType = {
    currentUser,
    login,
    logout,
    isAuthenticated: !!currentUser,
    refresh: fetchUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

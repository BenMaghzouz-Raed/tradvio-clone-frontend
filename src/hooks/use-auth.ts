import { getCurrentUser, refresh } from "@/services/domain/AuthService";
import { useEffect, useState } from "react";
import { useRoute } from "./use-route";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "@/services/LinksService";
import { UserType } from "@/types/user-types";

export function useAuth() {
  const [currentUser, setCurrentUser] = useState<UserType | undefined>(
    undefined
  );
  const route = useRoute();
  const navigate = useNavigate();

  const protectRoute = (user?: UserType) => {
    console.log({ user, route });
    if (!route?.protected && user) {
      navigate(`/${ROUTES.DASHBOARD.path}`);
    } else if (user?.role != route?.role && route?.protected) {
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
                console.log("refreshing failed");
                protectRoute(undefined);
              });
          })
          .catch((err) => {
            console.log(err);
            protectRoute(undefined);
          });
      });
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return { currentUser };
}

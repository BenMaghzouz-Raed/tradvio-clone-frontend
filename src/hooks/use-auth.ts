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

  const protectRoute = (user: UserType) => {
    if (user?.role != route?.role && route?.authenticated) {
      navigate(`/${ROUTES.LOGIN.path}`);
    } else if (!route?.authenticated) {
      navigate(`/${ROUTES.DASHBOARD.path}`);
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
                navigate(`/${ROUTES.LOGIN.path}`);
              });
          })
          .catch((err) => {
            console.log(err);
            navigate(`/${ROUTES.LOGIN.path}`);
          });
      });
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return { currentUser };
}

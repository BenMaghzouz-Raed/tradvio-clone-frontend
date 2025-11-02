import { getRoute } from "@/services/LinksService";
import { useLocation } from "react-router-dom";

export function useRoute() {
  const location = useLocation();
  return getRoute(location.pathname);
}

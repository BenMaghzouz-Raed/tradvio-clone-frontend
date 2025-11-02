import { Button } from "./ui/button";
import PlusCircle from "./icons/plus-circl";
import { Link } from "react-router-dom";
import { ROUTES } from "@/services/LinksService";
import { useRoute } from "@/hooks/use-route";

export function AppHeader() {
  const route = useRoute();

  if (!(route && route.title)) {
    return;
  }
  return (
    <div className="bg-background sticky top-0 z-50 border-b flex justify-between px-8 py-1">
      <h1 className="flex items-center font-semibold">{route.title}</h1>
      <Link to={ROUTES.ANALYSER.path}>
        <Button variant="default" className="cursor-pointer">
          <PlusCircle /> Upload Chart for AI Analysis
        </Button>
      </Link>
    </div>
  );
}

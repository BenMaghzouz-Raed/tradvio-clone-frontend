import { Button } from "./ui/button";
import PlusCircle from "./icons/plus-circl";
import { Link } from "react-router-dom";
import { ROUTES } from "@/services/LinksService";
import { useIsMobile } from "@/hooks/use-mobile";
import { SidebarTrigger } from "./ui/sidebar";

export function AppHeader({ title }: { title: string }) {
  const isMobile = useIsMobile();

  return (
    <div className="bg-background sticky top-0 z-50 border-b flex justify-between pr-8 pl-4 pb-1 pt-2">
      <div className="flex items-center gap-1">
        <SidebarTrigger />
        <h1 className="flex items-center font-semibold">{title}</h1>
      </div>
      <Link to={ROUTES.ANALYSER.path}>
        <Button variant="default" className="cursor-pointer">
          <PlusCircle /> {!isMobile && "Upload Chart for AI Analysis"}
        </Button>
      </Link>
    </div>
  );
}

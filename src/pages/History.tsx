import { useAuth } from "@/hooks/use-auth";

export default function History() {
  useAuth();

  return <div>this is history page</div>;
}

import { useAuth } from "@/hooks/use-auth";

export default function Settings() {
  useAuth();
  return <div>this is settings page</div>;
}

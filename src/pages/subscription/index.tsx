import { useAuth } from "@/hooks/use-auth";

export default function Subscription() {
  useAuth();
  return <div>this is subscription plan page</div>;
}

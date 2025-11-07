import { useAuth } from "@/hooks/use-auth";
import Form from "./components/form";
import { AuthLayout } from "@/components/auth-layout";

export default function LogIn() {
  useAuth();

  return (
    <AuthLayout
      title="Navigate the Markets with Confidence"
      highlights={[
        "AI-Powered Trade Plans",
        "Integrated Risk Management",
        "Next-Gen Trade Journal",
        "Customer Support",
      ]}
    >
      <Form />
    </AuthLayout>
  );
}

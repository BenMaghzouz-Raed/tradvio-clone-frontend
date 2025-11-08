import Form from "./components/Form";
import { AuthLayout } from "@/components/auth-layout";

export default function Register() {
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

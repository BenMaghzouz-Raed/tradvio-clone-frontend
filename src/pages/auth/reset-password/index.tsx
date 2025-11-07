import Form from "./components/Form";
import { AuthLayout } from "@/components/auth-layout";

export default function ResetPassword() {
  return (
    <AuthLayout
      title="Reset your password and get back in."
      highlights={[
        "AI-Powered Trade Plans",
        "Integrated Risk Management",
        "Next-Gen Trade Journal",
      ]}
    >
      <Form />
    </AuthLayout>
  );
}

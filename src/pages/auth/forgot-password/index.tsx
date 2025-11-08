import Form from "./components/Form";
import { AuthLayout } from "@/components/auth-layout";

export default function ForgotPassword() {
  return (
    <AuthLayout
      title="Regain Access to Your Account"
      highlights={[
        "Secure Password Reset",
        "Instant Email Notifications",
        "24/7 Support",
      ]}
    >
      <Form />
    </AuthLayout>
  );
}
